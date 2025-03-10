from enum import StrEnum
import traceback
import psycopg
from cuid2 import cuid_wrapper
import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime, timedelta
from typing import Callable, List, Union
import logging
import socket
import hashlib

from watchfiles import Change, watch

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
cuid_generator: Callable[[], str] = cuid_wrapper()

class Status(StrEnum):
    IDLE = 'IDLE'
    CRAWLING = 'CRAWLING'
    SCANNING = 'SCANNING'
    ERRORED = 'ERRORED'
    MISSING = 'MISSING'
    STOPPED = 'STOPPED'
    
class Severity(StrEnum):
    HINT = 'HINT'
    WARNING = 'WARNING'
    ERROR = 'ERROR'
    FATAL = 'FATAL'

class Confidence(StrEnum):
    HIGH = 'HIGH'
    MEDIUM = 'MEDIUM'
    LOW = 'LOW'
    NONE = 'NONE'

def insensitive_in(val, val_list):
    cval = val.casefold()
    for ele in val_list:
        if ele.casefold() == cval: return True
    return False
 
HandlerType = Callable[[str, str], None]
class TeramisEventHandler():

    def __init__(self, target:str, results_handler: HandlerType, status_handler):
        self.target = target
        self.results_handler = results_handler
        self.status_handler = status_handler
        self.update_map = {}

        super().__init__()

    def start_watching(self): 

        for changes in watch(self.target):
            for change in changes:
                change_type, file = change
                if change_type == Change.added:
                    self.on_created(file)
                elif change_type == Change.modified:
                    self.on_modified(file)
                elif change_type == Change.deleted:
                    # We don't handle deleted.
                    pass

    def update_hash(self, file:str):
        # Keep the dictionary of file hashes from 
        # getting too big.  We're only interested
        # in preventing successive identical updated.
        if len(self.update_map) > 100:
            dict.pop(next(iter(self.update_map)))

        with open(file, 'rb') as f:
            last_hash = hashlib.file_digest(f,'md5').hexdigest()

        self.update_map[file] = last_hash

    def hash_changed(self, file: str) -> bool:
        last_hash = self.update_map.get(file, '');
        if not last_hash: return True
        with open(file, 'rb') as f:
            cur_hash = hashlib.file_digest(f,'md5').hexdigest()
            return cur_hash != last_hash
        
    def is_agent_path(self, source, files, event_type = 'created'):
        head, tail = os.path.split(source)
        if insensitive_in(tail.strip(), files):
            rest, agent_id = os.path.split(head)
            if rest == self.target:
                logger.info(f"'{tail}' {event_type} for agent: '{agent_id}'")
                return (head, tail, agent_id)

        return (None, None, None)
    

    def launch_handler(self, source:str, agent_folder: str, trigger_file:str, agent_id: str, handler: HandlerType):
        if self.hash_changed(source):
            logger.info("Lauching handler")
            try:
                handler(agent_folder, trigger_file, agent_id)
                self.update_hash(source)
            except Exception as e:
                logger.error("Error in handler")
                logger.error(e)
        else:
            logger.info(f"Not processing unchanged file '{source}'")
            
    def on_created(self, src_path):
        # We're not monitoring for any changed file.  We're only looking for 
        # changes to the files in the array passed to is_agent_path.  Changes
        # to some files might mean a partially completed activity that we don't
        # want to sync.
        logger.info(f"File created: {src_path}")
        agent_folder, trigger_file, agent_id = self.is_agent_path(src_path, ['queue.json','machine_info.json', 'checkin.json'])
        if agent_folder and agent_id:
            handler = self.status_handler if trigger_file == 'checkin.json' else self.results_handler 
            self.launch_handler(src_path, agent_folder, trigger_file, agent_id, handler)
    
    def on_modified(self, src_path):
        # We're not monitoring for any changed file.  We're only looking for 
        # changes to the files in the array passed to is_agent_path.  Changes
        # to some files might mean a partially completed activity that we don't
        # want to sync.
        logger.info(f"File modified: {src_path}")
        agent_folder, trigger_file, agent_id = \
            self.is_agent_path(src_path, ['queue.json','machine_info.json','checkin.json'], 'modified')
        if agent_folder and agent_id:
            handler = self.status_handler if trigger_file == 'checkin.json' else self.results_handler 
            self.launch_handler(src_path, agent_folder, trigger_file, agent_id, handler)


def is_file_older(file_path, date_to_compare):
    """
    Checks if a file's modification time is older than a given date.
    If the file doesn't exist, we assume it's older.  If the date
    isn't given, we assume it's newer
    Args:
        file_path (str): The path to the file.
        date_to_compare (datetime.datetime): The date to compare against.

    Returns:
        bool: True if the file is newer than the date, False otherwise.
              Returns False if the file does not exist.
    """
    if not os.path.exists(file_path):
        return True
    if date_to_compare is None:
        return False
    
    file_modification_time = datetime.fromtimestamp(os.path.getmtime(file_path))
    return file_modification_time <= date_to_compare

def is_file_newer(file_path, date_to_compare):
    """
    Checks if a file's modification time is newer than a given date.

    Args:
        file_path (str): The path to the file.
        date_to_compare (datetime.datetime): The date to compare against.

    Returns:
        bool: True if the file is newer than the date, False otherwise.
              Returns False if the file does not exist.
    """
    if not os.path.exists(file_path):
        return False
    if date_to_compare is None:
        return True
    
    file_modification_time = datetime.fromtimestamp(os.path.getmtime(file_path))
    return file_modification_time > date_to_compare

def agent_from_machine_info(info_file: str, log_file:str) -> Union[dict, None]:
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


bytes_to_gig_ratio   = 1e+9
bytes_to_meg_ratio   = 1e+6
bytes_to_kb_ratio    = 1e+3
def gigs_from_string(str: str) -> float:
    """
    Converts a string to a float.
    """
    # 1.64 GB per second
    # 19.48 MB per second
    # 414.49 KB per second
    pieces = str.strip().split(' ')
    val = float(pieces[0])
    um = pieces[1].upper()
    if um == 'B':    val /=  bytes_to_gig_ratio
    elif um == 'KB': val = ((val * bytes_to_kb_ratio) / bytes_to_gig_ratio)
    elif um == 'MB': val = ((val * bytes_to_meg_ratio) / bytes_to_gig_ratio)
    elif um == 'GB': pass
    return float(val)

def match_string_to_array(str: str) -> List[str]:
    """
    Converts a string to a list of strings.
    """
    pstr = re.sub(r'^\[|\]$', '', str.strip())
    return [
        x for x in re.split(r'^"|", "|"$', pstr) if x
    ]

def confidence_string_to_enum(str: str) -> Confidence:
    """
    Converts a string to a Confidence enum.
    """
    str = str.strip().upper()
    return {
        'HIGH': Confidence.HIGH,
        'MED': Confidence.MEDIUM,
        'LOW': Confidence.LOW,
        'NONE': Confidence.NONE
    }.get(str, Confidence.HIGH)

def status_string_to_enum(str: str) -> Status:
    """
    Converts a string to a Status enum.
    """

    str = str.strip().upper()
    if str.startswith('ERROR'): return Status.ERRORED
    if str.startswith('SCANNING'): return Status.SCANNING
    if str == 'STOPPED': return Status.STOPPED
    return Status.IDLE

def get_newest_date(cursor, id:dict, table:str, date_field: str = "updated_at") -> Union[datetime, None]:
    """
    Pulls a the newest date field from a table so that we can use it to
    determine what's different in the file system.
    """
    k, v = list(id.items())[0]
    newest_result = cursor.execute(
        f"""
        SELECT updated_at FROM "{table}" WHERE "{k}" = '{v}'
        ORDER BY "{date_field}" DESC
        LIMIT 1
        """
    ).fetchone()
    newest_date = newest_result[0] if newest_result else None
    return newest_date

def create_scan_results_from_directory(cursor, scan_id: str, source: str) -> int:
    """
    Reads a text file and writes the values in the database.
    """
    output_foldler = os.path.join(source, 'output')
    rows = 0
    for entry in os.listdir(output_foldler):
        file_name = os.path.join(output_foldler, entry)
        
        if not os.path.isfile(file_name):
            logger.info(f"Skipping '{entry}' - not a file.")
            continue
        
        if not entry.startswith('results') or not entry.endswith('.csv'):
            logger.info(f"Skipping file: '{entry}'.  Doesn't match results*.csv")
            continue
    
        # If the results file is older than the newest result for this scan,
        # We'll assume we're already processed it.  If for some reason we're
        # wrong, we can force the import by touching the file and re-running.
        newest_date = get_newest_date(cursor, {'scanId': scan_id}, "ScanResult")
        
        if not is_file_newer(file_name, newest_date):
            logger.info(f"Skipping {file_name} for scan: '{scan_id}' - It's older than '{newest_date}'")
            continue

        with open(file_name, 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                rows += 1
                cursor.execute(*insert_sql("ScanResult", {
                    "id":         cuid_generator(),
                    "scanId":     scan_id,
                    "hash":       row['Hash'],
                    "file_path":  row['Filepath'],
                    "mime_type":  row['MimeType'],
                    "bsize":      int(row['Bsize']),
                    "processed":  row['Processed'].upper().strip() == "TRUE",
                    "errored":    row['Error'].upper().strip() == "TRUE",
                    "match":      match_string_to_array(row['Match']),
                    "confidence": confidence_string_to_enum(row['Confidence'])
                }))

        logger.info(f"Created {rows} results for scan: '{scan_id}'")

    return rows

def insert_sql(table:str, dct:dict, no_conflict = False) -> str:

    str = f'INSERT INTO "{table}" ('
    vals = ()

    for k, v in dct.items():
        str += f'"{k}", '
        vals += (v,)

    str = str.rstrip(', ') + ') VALUES (' + ', '.join(['%s'] * len(dct)) + ')'

    if no_conflict: str += ' ON CONFLICT DO NOTHING'

    return (str, vals)

def create_crawl_errors_from_directory(cursor, crawl_id: str, source: str) -> int:
    """
    Reads a the crawl_errors.txt file and writes the values in the database.
 
    If the errors.log file is older than the newest row in the ScanError
    table, the file will not be processed. 
    
    Returns: Int: The number of rows created
    """
    rows = 0
    
    # If the errors file is older than the newest result for this crawl,
    # We'll assume we're already processed it.  If for some reason we're
    # wrong, we can force the import by touching the file and re-running.
    newest_date = get_newest_date(cursor, {'crawlId': crawl_id}, "CrawlError")
    path = os.path.join(source, 'crawl_errors.txt')
    if not is_file_newer(path, newest_date):
        logger.info(f"Skipping errors for crawl: '{crawl_id}'. Errors are older than '{newest_date}'")
        return rows

    with open(path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            rows += 1
            parts = line.split(":", 1)
            if len(parts) < 2:
                logger.warning(f"Error line '{line}' is not formatted correctly.")
                continue
                        
            error_name = parts[0]
            error_desc = ""
            file_name = parts[1]
            cursor.execute(*insert_sql("CrawlError", {
                "id":cuid_generator(),
                "crawlId":crawl_id,
                "error_name":error_name.strip(),
                "error_desc":error_desc.strip(),
                "file":file_name.strip()

            }))

        logger.info(f"Created {rows} errors for crawl: '{crawl_id}'")

    return rows

def error_str_to_enum(val:str) -> Severity:
    return {
        'HINT': Severity.HINT,
        'WARNING': Severity.WARNING,
        'ERROR': Severity.ERROR,
        'FATAL': Severity.FATAL
    }.get(val.upper(), Severity.WARNING)

def create_scan_errors_from_directory(cursor, scan_id: str, source: str) -> int:
    """
    Reads a the errors.log file and writes the values in the database.
 
    If the errors.log file is older than the newest row in the ScanError
    table, the file will not be processed. 
    
    Returns: Int: The number of rows created
    """

    # If the errors file is older than the newest result for this scan,
    # We'll assume we're already processed it.  If for some reason we're
    # wrong, we can force the import by touching the file and re-running.
    newest_date = get_newest_date(cursor, {'scanId': scan_id}, "ScanError")
    rows = 0
    path = os.path.join(source, 'errors.log')
    if not is_file_newer(path, newest_date):
        logger.info(f"Skipping errors for scan: '{scan_id}'. Errors are older than '{newest_date}'")
        return rows
    
    with open(path, 'r') as file:
        lines = file.readlines()
        for line in lines:
            rows += 1
            parts = line.split(" - ")
            
            if len(parts) < 3:
                logger.warning(f"Error line '{line}' is not formatted correctly.")
                continue
            
            name, desc = parts[2].split(':', 1)
            file = desc if name == 'Timeout' or len(parts) < 4 else parts[3]
            
            cursor.execute(*insert_sql("ScanError", {
                 "id":          cuid_generator(),
                 "scanId":      scan_id,
                 "occurred_at": datetime.fromisoformat(parts[0]),
                 "severity":    error_str_to_enum(parts[1]),
                 "error_name":  name.strip(),
                 "error_desc":  "" if name == 'Timeout' or len(parts) < 4 else desc.strip(),
                 "file":        file.strip()
            }))

        logger.info(f"Created {rows} errors for scan: '{scan_id}'")

    return rows


def add_folder_to_target(target_id:str, root:str, folder:str, crawl_id:str, scan_id:str, map:dict) -> dict:

    existing = map.get(root)
    if existing:
        item = existing['folders'].get(folder,None)
       
        if not item: 
            existing['folders'][folder] = {}
            item = existing['folders'][folder]

        # If crawl_id is unset, we'll set it to blank.  Then, if a value is passed in, we'll
        # override the blank value.
        if not item.get('crawl_id'): item['crawl_id'] = crawl_id
        elif crawl_id: item['crawl_id'] = crawl_id
        if not item.get('scan_id'): item['scan_id'] = scan_id
        elif scan_id: item['scan_id'] = scan_id

    else:
        map[root] = {
            'id': target_id,
            'folders': {folder:{'scan_id': scan_id, 'crawl_id': crawl_id}}
        }

    return map[root]

def existing_target_map(cursor, agent_id: str) -> dict:
    sql = \
    f"""
         SELECT "Target".id AS id, roots, "Crawl".id as crawl_id, "Scan".id as scan_id, "Crawl".result_folder AS folder
           FROM "Target"
      LEFT JOIN "Crawl" ON "Crawl"."targetId"   = "Target".id
      LEFT JOIN "Scan"  ON "Scan".result_folder = "Crawl".result_folder AND "Crawl"."targetId" = "Scan"."targetId"
     WHERE "agentId" = '{agent_id}'
    """
    existing = cursor.execute(sql)

    map = {}
    for id, roots, crawl_id, scan_id, folder in existing.fetchall():
        for root in roots:
            add_folder_to_target(id, root, folder, crawl_id, scan_id, map)

    count = len(map)
    if not map:
        logger.info(f"No existing Targets for '{agent_id}'.  Importing all.")
    else:
        logger.info(f"Agent {agent_id} has {count} Targets.  Importing new.")

    return map


def existing_item_map(cursor, target_id: str, table: str) -> dict:
    sql = \
    f"""
        SELECT id, result_folder FROM "{table}" WHERE "targetId" = '{target_id}'
    """
    existing = cursor.execute(sql)
    map = { folder: id  for id, folder in existing.fetchall() } if existing else {}

    if not map:
        logger.info(f"No existing {table}s for '{target_id}'.  Importing all.")
    else:
        count = len(map.values())
        logger.info(f"Agent {target_id} has {count} {table}s.  Importing new.")

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


def json_from_file(source, empty):
    
    # If the file is missing or empty, just move on.
    if not os.path.isfile(source) or os.path.getsize(source) == 0:
        return empty
    
    with open(source) as file:
        try:
            json_data = json.load(file)
        except json.JSONDecodeError as e:
            # If the file is corrupt, there is little 
            # we can do, short of returning no status and hoping things
            # ultimately sync back up.
            logger.error(f"Decode error reading '{source}'")
            logger.error(e)
            return empty
        
        return json_data


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

    if queue_data:
        target_settings = { 
            t['root']: t.get('settings', default_settings) 
            for t in queue_data.get('targets',[]) 
        }
        cleanup_agent_queue(source, queue_data)
    else:
        target_settings = {}

    root = os.path.join(source, 'results')

    existing_targets = existing_target_map(cursor, agent_id)

    # There could be an optimization here where we check the count in the db
    # against the count in the folder and skip if they match BUT, that could
    # lead to tough to debug errors if someone deletes a folder and adds a new one.
    # We would catch it the next time the counts were different though so maybe 
    # that's OK.
    for entry in os.listdir(root):
        folder = os.path.join(root, entry)
        _id, _created_rows, root_path = create_crawl_from_directory(
            cursor, agent_id, entry, folder, "",
            existing_targets, target_settings, default_settings
        )
        create_scan_from_directory(cursor, agent_id, entry, folder,
            root_path, existing_targets, target_settings, default_settings
        )
    
def targeted_string_to_date(targeted: str) -> datetime:
    format_string ="%Y_%m_%d_%H_%M_%S"
    try:
        return datetime.strptime(targeted, format_string)
    except Exception:
        logger.warning(f"Couldn't covert '{targeted}' to a date using '{format_string}'.  Returning current time.")
        return datetime.now()
    
def write_scan_to_db(cursor, target_id:str, folder: str, source:str) -> str:
    """
    Reads the scan_stats.txt file and creates a Scan from it.
    """
    with open(os.path.join(source, 'scan_stats.txt'), 'r') as file:

        lines = file.readlines()

        scan = {
            'id': cuid_generator(),
            'result_folder': folder,
            'root_path': "",
            'targeted_date': targeted_string_to_date(folder),
            'matches': 0,
            'timeouts': 0,
            'gigs_per_second': 0,
        }

        for line in lines:
            tag, value = line.split(':', 1)
            tag = tag.strip()
            value = value.strip()
            if tag == "":
                if value:
                    logger.warning(f"Ignoring value '{value}' with no label.")
            elif tag == 'Root Directory':
                scan['root_path'] = value
            elif tag == 'Start Time':
                scan['start_time'] = datetime.fromisoformat(value)
            elif tag == 'End Time':
                scan['end_time'] = datetime.fromisoformat(value)
            elif tag == 'Matches':
                scan['matches'] = int(value)
            elif tag == 'Timeout':
                scan['timeouts'] = int(value)
            elif tag == 'Scan Rate':
                scan['gigs_per_second'] = gigs_from_string(value)
            elif tag in ['Duration', 'Errors']:
                pass
            else:
                logger.warning(f"Unmatched Scan key '{tag}'")

        scan["targetId"] = target_id
        cursor.execute(*insert_sql("Scan", scan))
        return scan['id']

args_extractor_re = re.compile(r"CMD Settings: *\(Directory: ([^ ,]*), *Use History: *([TtRrUuEeFfAaLlSsEe]*)\)")
def write_crawl_to_db(cursor, target_id:str, folder, source) -> str:

    with open(os.path.join(source, 'crawl_dump.json'), 'r') as file:
        json_data = json.load(file)
        crawl_id = cuid_generator()
        # Rename the parts of json we need changed.
        json_data['id'] = crawl_id
        json_data['targetId'] = target_id
        json_data['result_folder'] = folder
        json_data['targeted_date'] = targeted_string_to_date(folder)
        json_data['unsupported_files'] = json_data.pop('unsupported')

    hash_map = json_data.pop('hash_map', {})
    json_data.pop('duration',None)
    json_data.pop('errors',None)
    json_data.pop('predated', None)
    json_data.pop('permission_err', None)

    # Grab the log file and look for the line we need.
    # If we can't find the teramis.log, we'll just accept that we
    # don't know the crawl arguments.
    log_path = os.path.join(source, 'teramis.log')
    json_data['use_history'] = True

    if not os.path.isfile(log_path):
        logger.warning(f"Can't find '{log_path}'. Not setting arguments.")
    else: 
        with open(os.path.join(source, 'teramis.log'), 'r') as file:
            lines = file.readlines()
            for line in lines:
                parts = line.split(" - ")
                if len(parts) < 3:
                    logger.warning(f"teramis.log '{line}' is not formatted as expected.")
                    continue
                
                if parts[2].startswith('CMD Settings: '):
                    args = args_extractor_re.match(parts[2])
                    if not args:
                        logger.warning(f"Couldn't get arguments from teramis.log.  Format change?")
                        continue
                    json_data['use_history'] = args[2].strip().upper() == 'TRUE'

    cursor.execute(*insert_sql("Crawl", json_data))

    rows = 0
    for k, v in hash_map.items():
        rows += 1
        cursor.execute(*insert_sql("CrawlHash", {
            "hash": str(k),
            "crawlId": crawl_id,
            "file_paths": v['fps'],
            "bsize": v['bsize'],
            "format": v['fmt']
        }))

    logger.info(f"Created {rows} results for crawl: '{crawl_id}'")

    return crawl_id

def root_from_folder(source:str) -> str:
    """
    Extracts to the root path from the crawl_dump.json and returns it.
    We need the path to know if this is an existing Target or a new
    Target for the agent.
    """
    crawl_json = os.path.join(source, 'crawl_dump.json')
    if os.path.isfile(crawl_json):
        json_data = json_from_file(crawl_json,{'root_path':''})
        return json_data.get('root_path', '')

    return ''

def create_new_target(cursor, agent_id:str, root_path:str, target_settings:dict, default_settings: dict) -> str:
    """
    Creates a new Target for this agent and returns the ID.
    """
    logger.info(f"Creating new target.  Root: {root_path}")
    settings = target_settings.get(root_path, default_settings)
    new_target = {
        'id': cuid_generator(),
        'roots': [root_path],
        **settings,
        'agentId': agent_id
    }
    cursor.execute(*insert_sql("Target", new_target))
    return new_target['id']

def create_thing_from_directory(cursor, thing:str, agent_id:str, folder:str, source: str,
    root_path, existing_targets:dict, target_settings:dict, default_settings:dict,
    write_thing_fn:callable, write_results_fn:callable, write_errors_fn:callable) -> str:
    """
    Optionally creates a target for the agent and a Crawl or a Scan
    """
    
    if not root_path: root_path = root_from_folder(source)
    # At this point, if we don't have a root path, it's an error and we have to
    # just ignore this folder.
    if not root_path:
        logger.warning(f"Can't determine root for '{source}'.  Ignoring this folder")
        return (None, 0, root_path)
    
    # Check to see if we've ever seen this root before.
    existing_info = existing_targets.get(root_path, None)

    target_id = existing_info['id'] if existing_info else None
    if not target_id:
        target_id = create_new_target(cursor, agent_id, root_path, target_settings, default_settings)

    existing_info = add_folder_to_target(target_id, root_path, folder, '', '', existing_targets)

    crawl_id = existing_info['folders'][folder]['crawl_id']
    scan_id = existing_info['folders'][folder]['scan_id']
    id = crawl_id if thing == 'Crawl' else scan_id

    if not id:
        id = write_thing_fn(cursor, target_id, folder, source)
        logging.info(f"Created {thing}: '{id}' from: '{folder}' for Agent: '{agent_id}', Target: {target_id}.")
        if thing == 'Crawl': crawl_id = id
        else: scan_id = id
        add_folder_to_target(target_id, root_path, folder, crawl_id, scan_id, existing_targets)
    else:
        logger.info(f"Skipping {thing} '{folder}'.  It exists as ID: {id}")

    created_rows = 0
    if write_results_fn is not None: created_rows += write_results_fn(cursor, id, source)
    if write_errors_fn is not None: created_rows  += write_errors_fn(cursor, id, source)

    return (id, created_rows, root_path)

def create_scan_from_directory(cursor, agent_id:str, folder:str, source: str,
    root_path, existing_targets:dict, target_settings:dict, default_settings:dict
) -> dict:
    """
    Reads a text file and writes the values in the database.
    """
    return create_thing_from_directory(
        cursor, 'Scan', agent_id, folder, source, root_path,
        existing_targets, target_settings, default_settings,
        write_scan_to_db,
        create_scan_results_from_directory,
        create_scan_errors_from_directory
    )

def create_crawl_from_directory(cursor, agent_id:str, folder:str, source: str,
    root_path, existing_targets:dict, target_settings:dict, default_settings:dict
) -> dict:
    """
    Given an agent_id, the folder with the data and a list of existing
    targets with whatever settings they may have, optionally creates
    a new target and new crawl
    """
    return create_thing_from_directory(
        cursor, 'Crawl', agent_id, folder, source, root_path,
        existing_targets, target_settings, default_settings,
        write_crawl_to_db,
        None,
        create_crawl_errors_from_directory
    )

def last_import_file_path() -> str:
    """
    Returns the path to the last import file.
    """
    return os.path.join(os.path.dirname(__file__), 'last_import')

def get_arguments():
    """
    Sets up the argument parser and grabs the passed in arguments.

    :return: The parsed arguments from the command line
    """
    parser = argparse.ArgumentParser(
        description="Imports any files that have changed since the last import."
    )
    parser.add_argument(
        "-d", "--database",
        help="The database to connect to.",
        dest="database",
        default=os.getenv("PGDATABASE","teramis")
    )
    parser.add_argument(
        "-H", "--host",
        help="The host to connect to.",
        dest="host",
        default=os.getenv("PGHOST","localhost")
    )
    parser.add_argument(
        "-i", "--init",
        help="Initialize the database",
        dest="init",
        default=False,
        action='store_true'
    )
    parser.add_argument(
        "-n", "--no-import",
        help="Skip attempting to import the data.",
        dest="no_import",
        default=False,
        action='store_true'
    )
    parser.add_argument(
        "-p", "--port",
        help="The port to connect to.",
        dest="port",
        default=os.getenv("PGPORT","5432")
    )
    parser.add_argument(
        "-t", "--target",
        help="The target folder to scan for data",
        dest="target",
        default=os.getenv("TERAMIS_SCAN_TARGET", os.path.join(os.path.dirname(__file__), 'teramis'))
    )
    parser.add_argument(
        "-U", "--user",
        help="The database user to connect as.",
        dest="user",
        default=os.getenv("PGUSER","teramis")
    )
    parser.add_argument(
        "-W", "--password",
        help="The password to connect with.",
        dest="password",
        default=os.getenv("PGPASSWORD","teramis")
    )
    parser.add_argument(
        "-w", "--watch",
        help="Watch for filesystem changes after cranking up.",
        dest="watch",
        default=False,
        action='store_true'
    )
    
    args = parser.parse_args()
    watch_env = os.getenv("TERAMIS_WATCH","False").strip().upper()
    
    args.watch = args.watch or watch_env == "TRUE" or watch_env == "1"
    return args

def perform_init(conn):
    """
    Initializes the database.

    :param conn: The database connection.
    """
    with conn.cursor() as cursor:
        cursor.execute('DELETE FROM "ScanError"')
        cursor.execute('DELETE FROM "ScanResult"')
        cursor.execute('DELETE FROM "Scan"')
        cursor.execute('DELETE FROM "CrawlError"')
        cursor.execute('DELETE FROM "CrawlHash"')
        cursor.execute('DELETE FROM "Crawl"')
        cursor.execute('DELETE FROM "Target"')
        cursor.execute('DELETE FROM "Agent"')

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
        log_file = os.path.join(folder, 'teramis.log')
        if not os.path.isfile(info_file):
            logger.info(f'Skipping folder: "{folder}".  No machine_info.json')
            return
        
        # We only create the agent the first time the file appears
        # If we've already got this agent, we're not going to recreate
        # it.  We will look for newer Scans and Crawls
        agent_data = agent_from_machine_info(info_file, log_file)
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
        logger.info("Proocessing already running.  Exiting.")
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
