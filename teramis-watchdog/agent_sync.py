import time
import traceback
import psycopg
import json
import os
import sys
from datetime import datetime, timedelta
from typing import Union
import logging
import socket

from event_handler import TeramisEventHandler
from utils import is_file_older, json_from_file, add_folder_to_target
from arguments import get_arguments
from sql import insert_sql, targets_for_agent, Status, status_string_to_enum, perform_init
from scans import create_scan_from_directory
from crawls import create_crawl_from_directory

"""
Scans a target directory that is expected to contain Teramis scan agent data and
and brings the database in sync with whatever changes have been made since the
last time this was run.

* <target>           - The path to where we're supposed to scan.  Set in the env or passed in. 
* <agent_guid>       - The unique ID of the agent. eg. 'cb56adf0-35de-4dd2-a20e-386a0f2e0af4'
* <YYYY_MM_DD_HH_SS> - The date and time that the scan or crawl was run. eg. '2025_02_28_22_07_24'

A complete path to the deepest file in the structure will look something like:
...teramis/cb56adf0-35de-4dd2-a20e-386a0f2e0af4/results/2025_02_28_22_07_24/output/results.csv

matches.log, and crawl_stats.text are not currently processed. 

The full structure is as follows:

<target>
├── <agent_guid>
│   ├── machine_info.json
│   ├── queue.json
│   └── results
│       ├── <YYYY_MM_DD_HH_MM_SS>
│       │   ├── output
│       │   │   ├── results[_1].csv
│       │   │   .
│       │   │   .
│       │   │   .       
│       │   │   └── results[_n].csv
│       │   ├── crawl_dump.json
│       │   ├── crawl_stats.text
│       │   ├── errors.log
│       │   ├── matches.log
│       │   ├── scan_stats.txt
│       │   └── teramis.log
│       .
│       .
│       .
│       └── <YYYY_MM_DD_HH_MM_SS>
│           ├── output
│           │   ├── results[_1].csv
│           │   .
│           │   .
│           │   .       
│           │   └── results[_n].csv
│           ├── crawl_dump.json
│           ├── crawl_stats.text
│           ├── errors.log
│           ├── matches.log
│           ├── scan_stats.txt 
│           └── teramis.log
.
.
.   
└── [agent_guid]
    ├── machine_info.json
    ├── queue.json
    └── results
        ├── <YYYY_MM_DD_HH_MM_SS>
        │   ├── output
        │   │   ├── results[_1].csv
        │   │   .
        │   │   .
        │   │   .       
        │   │   └── results[_n].csv
        │   ├── crawl_dump.json
        │   ├── crawl_stats.text
        │   ├── errors.log
        │   ├── matches.log
        │   ├── scan_stats.txt
        │   └── teramis.log
        .
        .
        .
        └── <YYYY_MM_DD_HH_MM_SS>
            ├── output
            │   ├── results[_1].csv
            │   .
            │   .
            │   .       
            │   └── results[_n].csv
            ├── crawl_dump.json
            ├── crawl_stats.text
            ├── errors.log
            ├── matches.log
            ├── scan_stats.txt
            └── teramis.log
"""

logger = logging.getLogger(__name__)

def agent_from_machine_info(info_file: str) -> Union[dict, None]:
    """
    Parses a JSON file and a log file and returns the agent dictionary
    The json file is expected to be machine_info.json.  We only need one
    line out of the log file - the one that describes the options used 
    for the last crawl/scan
    """
    with open(info_file, 'r') as file:
        json_data = json.load(file)
        # Rename the keys to match the DB
        json_data['id']           = json_data.pop('Machine UUID')
        json_data['name']         = json_data.pop('Hostname')
        json_data['location']     = json_data.pop('IP Address')
        json_data['os']           = json_data.pop('OS')
        json_data['os_version']   = json_data.pop('OS Version')
        json_data['arch']         = json_data.pop('Architecture')
        json_data['processor']    = json_data.pop('Processor')
        json_data['cores']        = json_data.pop('CPU Cores')
        json_data['logical_cpus'] = json_data.pop('Logical CPUs')
        json_data['ram_gb']       = json_data.pop('RAM (GB)')

    return json_data

def existing_target_map(cursor, agent_id: str) -> dict:
    """ 
    Loads all of the paths we've seen for this agent into a dict, keyed by path.  It has the path, the ID of
    the target and the most recent scan from this agent. We can use this to determine which of the folders
    in the agent directory we've already seen.
    """

    existing = targets_for_agent(cursor, agent_id)

    map = {
        "folders": {},        
        "targets": {}        
    }
    for id, root, crawl_id, scan_id, folder in existing.fetchall():
        add_folder_to_target(id, root, folder, crawl_id, scan_id, map)
    count = len(map['targets'])
    if not map:
        logger.info(f"No existing Targets for Agent: {agent_id}.")
    else:
        logger.info(f"{count} existing Targets for Agent: {agent_id}")

    return map


def get_lock(source):
    lock = os.path.join(source, 'queue.lock')
    now = datetime.now()
    five_minutes_ago = now - timedelta(minutes=5)
    if not os.path.isdir(lock) or is_file_older(lock, five_minutes_ago):
        ### Our lock.
        os.makedirs(lock, exist_ok=True)
        os.utime(lock)
        def remove(): os.rmdir(lock)
        return remove

    logger.info(f"Couldn't get lock '{lock}'")
    return None

def cleanup_agent_queue(source:str, json_data: dict):
    """
    Removes the items that are in the queue that have been
    processed either successfully or in error by the agents.
    """
    queue_file = os.path.join(source, 'queue.json')
    new_targets = []
    for target in json_data.get('targets', []):
        # Once, I managed to stick something that wasn't an object
        # in the targets array.  It's not valid, so we'll move on
        if type(target) != dict: continue
        targ_stat = target.get('status','').strip().upper()
        if targ_stat == 'QUEUED':
            new_targets.append(target)

    # If we can get the lock file, we'll update the queue.  
    # Otherwise, we'll update it next time.
    if remove_lock := get_lock(source):
        try:
            with open(queue_file, 'w') as file:
                json.dump({'targets': new_targets}, file, indent=2)
        except Exception as e:
            logger.error(e)
        finally:
            if remove_lock: remove_lock()


def set_agent_status(cursor, source:str, id: str):
    """
    Set's the agent status to either IDLE or CRAWLING, SCANNING,
    ERRORED based on the current state of the agent_status.json and
    checkin.json files.   We'll also clean up any items in the queue
    that have been handled.
    """

    # We don't need to bother with lock files since we
    # only read these files.
    checkin_info = json_from_file(os.path.join(source, 'checkin.json'), {'status':'Idle'})
    base_status = status_string_to_enum(checkin_info.get('status','Idle'))
    # If we're scanning, we could be either scanning or crawling based 
    # on the value in agent_status.json
    if base_status != Status.SCANNING:
        status = base_status
    else:
        agent_info = json_from_file(os.path.join(source, 'agent_status.json'),{'task':'Stopped'})
        status = Status.CRAWLING if agent_info.get('task', '').strip().upper().startswith('CRAWLING') else Status.SCANNING

    # We could optimize the number of writes by either including
    # "Status != 'new_Status'" on the UPDATE.  We could do an
    # initial read and skip the write if the reads match.  BUT
    # By updating the status one way or another, the updated_at
    # field will be the last check-in time for the agent.
    cursor.execute(
    f"""
    UPDATE "Agent" SET status = '{status}' WHERE id = '{id}'
    """
    )
                
    logger.info(f"Set agent: '{id}' status to: '{status}'")
    if status == Status.ERRORED: logger.error(checkin_info.get('status'))
    
    return status

def something_to_sync(agent_folder:str, target_file: str) -> bool:
    json_data = json_from_file(os.path.join(agent_folder, target_file), {'targets':[]})
    for target in json_data.get('targets', []):
        if target.get('status','queued') != 'queued': return True
    
    return False

def sync_agent_results(cursor, agent_id, agent_data, source: str):
    """
    Processes all the scan/crawl folders in this agent directory and
    puts them in the database if we don't have them already.

    We're only looking for folders newer than the newest scan
    we've already got.
    """

    logger.info(f"Looking for scans from agent: '{agent_id}'")
    
    default_settings = {
        "skip_completed": False,
        "max_workers": agent_data.get('Logical CPUs', 2) - 1,
        "mem_thresh": 95,
        "use_history": True,
        "default_timeout": 5        
    }

    # If we've got a queue.json file, we might have settings for each
    # of the targets that we're processing.  We'll use those settings
    # if we have them.  Otherwise, we'll use default settings.
    queue_data = json_from_file(os.path.join(source, 'queue.json'), {'targets': []})
    target_settings = {}
    if queue_data:
        target_settings = { 
            t['root']: t.get('settings', default_settings) 
            for t in queue_data.get('targets',[]) 
        }
        cleanup_agent_queue(source, queue_data)

    root = os.path.join(source, 'results')
    if not os.path.isdir(root):
        logger.warning(f"Results folder '{root}' missing for agent: '{agent_id}.  Skipping.")
        return

    # When we know that we're working from data that has already
    # been sync'd, (ie. updating one agent due to a file change)
    # we can just get the newest folder and look only at folders
    # newer. TODO: Do this
    existing_targets = existing_target_map(cursor, agent_id)
    for entry in os.listdir(root):
        folder = os.path.join(root, entry)
        _id, _created_rows, root_path = create_crawl_from_directory(
            cursor, agent_id, entry, folder, "",
            existing_targets, target_settings, default_settings
        )
        create_scan_from_directory(cursor, agent_id, entry, folder,
            root_path, existing_targets, target_settings, default_settings
        )
    
def last_import_file_path() -> str:
    """
    Returns the path to the last import file.
    """
    return os.path.join(os.path.dirname(__file__), 'last_import')

def create_agent(cursor, agent_id, agent_data):
        
    if agent_data['id'] != agent_id:
        logger.warning(
            f"Machine ID in json ({agent_data['id']}) doesn't match directory '{agent_id}'.  Using '{agent_id}' as ID."
        )
        agent_data['id'] = agent_id

    cursor.execute(*insert_sql("Agent", agent_data, no_conflict=True))

    return agent_data['id']

def sync_agent_and_db(cursor, arg_agent_id:str, folder: str, existing_agents:list[str]):

    if os.path.isdir(folder):
        
        info_file = os.path.join(folder, 'machine_info.json')
        if not os.path.isfile(info_file):
            logger.info(f'Skipping folder: "{folder}".  No machine_info.json')
            return
        
        # We only create the agent the first time the file appears
        # If we've already got this agent, we're not going to recreate
        # it.  We will look for newer Scans and Crawls
        agent_data = agent_from_machine_info(info_file)
        if arg_agent_id in existing_agents:
            logger.info(f"Skipping Agent: '{arg_agent_id}'.  Agent already exists.")
            agent_id = arg_agent_id
        else:
            agent_id = create_agent(cursor, arg_agent_id, agent_data)
        
        sync_agent_results(cursor, agent_id, agent_data, folder)

        return agent_id
    
    else:
        logger.warning(f"Bad path '{folder}' passed to sync_agent_and_db")

    return None

def sync_agent_folders_and_db(conn, source: str):
    """
    Creates any agents that aren't already in the database from the
    machine_info.json file stored in their directory.
    """
    existing_results = conn.execute('SELECT id FROM "Agent"')
    existing_agents = [ itm[0] for itm in existing_results ] if existing_results else []
    found_agents = []
    with conn.cursor() as cursor:
        for entry in os.listdir(source):
            folder = os.path.join(source, entry)
            if (agent_id := sync_agent_and_db(cursor, entry, folder, existing_agents)):
                # This was an agent folder, so we'll add it to the list of found
                # agents.  After we finish, we'll compare the list of agents we
                # found with the ones we have in the DB.  The lists should match.
                # If there is something in the db that is missing from the ones
                # we found, we'll mark the agent as "Missing".
                found_agents.append(agent_id)
                set_agent_status(cursor, folder, entry)

        ## TODO: Check found_agents[] against existing_agents and mark
        ##       as missing any that are in existing but not in found.

def sync_agent_status(conn, agent_folder:str, _:str, agent_id:str):

    try:

        with conn.cursor() as cursor:
            set_agent_status(cursor, agent_folder, agent_id)
        conn.commit()

        logger.info(f'Status change for agent: {agent_id} complete.')

    except Exception as e:
        conn.rollback()
        logger.error(traceback.format_exc())

def sync_one_agent(conn, agent_folder:str, trigger_file: str, agent_id:str):
    """
    Called by the update event handler to handle changes for a single
    agent.  TODO: The move might be to scan all agents every time any
    agent changes to that we clean up as we go in the case of race conditions. 
    """

    # If the trigger file is the queue, we only need to do a sync if 
    # we have new results.
    if trigger_file == 'queue.json' and not something_to_sync(agent_folder, trigger_file):
        logger.info(f"{trigger_file} changed for agent: {agent_id} but there's nothing to sync")
        return
    
    try:

        with conn.cursor() as cursor:
            sync_agent_and_db(cursor, agent_id, agent_folder, [])
        conn.commit()

        logger.info(f'Update for agent: {agent_id} complete.')

    except Exception as e:
        conn.rollback()
        logger.error(traceback.format_exc())

def perform_sync(args, connect_string):
    """
    Imports data from the given date.

    :param import_date: The date to import data from.
    """

    exit_code = 0

    # Try to get the lock-file and bail if we can't
    try: 
        with open('teramis_importer.lock', 'x') as lock_file:
            lock_file.write('locked')
    except FileExistsError as e:
        logger.info("Process already running.  Exiting.")
        return 1
    
    try:

        with psycopg.connect(connect_string) as conn:

            if args.init:
                logger.info("Initializing the database.")
                perform_init(conn)

            if not args.no_import:
                logger.info("Importing data.")
                sync_agent_folders_and_db(conn, args.target)
            
            conn.commit()

        logger.info("Import complete.")

    except Exception as e:
        logger.error(traceback.format_exc())
        exit_code = 2
        conn.rollback()
    finally:
        os.remove('teramis_importer.lock')

    return exit_code

def get_host_ip(hostname):
    try:
        ip_address = socket.gethostbyname(hostname)
        return ip_address
    except socket.gaierror as e:
        return f"Error resolving hostname: {e}"

def wait_for_connect(connect_string):
    """
    Waits until the user cancels or postgres is available.

    On a fresh install, postgres in docker will start as the postgres user, 
    do initialization and then shut the server down and restart it in 
    authenticated mode.  What this means is that we can be started
    before there is a connection available.   This function will 
    sleep loop until the connnection is there.
    """
    logger.info("Testing the connection.")
    def connection_refused(e):
        msg = str(e).strip()
        return msg.startswith("connection failed: ") and not "FATAL:" in msg
    max_count = 10
    count = 0
    while True:
        try:
            with psycopg.connect(connect_string) as conn:
                conn.execute("SELECT 1")
                logger.info("Connected")
                return True
        except psycopg.OperationalError as e:
            if not count > max_count and connection_refused(e):
                count += 1
                logger.info(e)
                logger.info(f"Waiting to connect. {max_count - count} retries remaining.")
                time.sleep(3)
            else:
                logger.error(e)
                return False
        except Exception as e:
            logger.error(e)
            return False
        
if __name__ == '__main__':

    logging.basicConfig(level=logging.INFO)
    args = get_arguments()

    # If we're already running, we don't want to run again.
    if os.path.exists('teramis_importer.lock'):
        logger.error("Already running.  Exiting.")
        sys.exit(1)

    exit_code = 0
    connect_string = f"postgresql://{args.user}:{args.password}@{args.host}:{args.port}/{args.database}"

    logger.info(f'PGHOST: {args.host}')
    logger.info(f'PGDATABASE: {args.database}')
    logger.info(get_host_ip(args.host))
    logger.info(f"TERAMIS_SCAN_TARGET: '{args.target}'")
    # If the target folder is missing, we'll try to create it
    # This will also cause us to fail if we can't write to the
    # location - which is good because we want to die early

    try:
        os.makedirs(args.target, exist_ok=True)
    except Exception as e:
        logger.error(f"Can't create target '{args.target}'")
        #logger.error(e)
        sys.exit(5)

    if not wait_for_connect(connect_string):
        sys.exit(6)

    exit_code = perform_sync(args, connect_string)

    if args.watch and exit_code == 0:

        with psycopg.connect(connect_string) as conn:

            def results_callback(agent_folder: str, trigger_file:str, agent_id:str): 
                sync_one_agent(conn, agent_folder, trigger_file, agent_id)
            def status_callback(agent_folder: str, trigger_file: str, agent_id: str):
                sync_agent_status(conn, agent_folder, trigger_file, agent_id)

            logger.info(f"Watching '{args.target}'")
            event_handler = TeramisEventHandler(args.target, results_callback, status_callback)
            event_handler.start_watching()

    logger.info("Exiting")
    sys.exit(exit_code)
