from enum import StrEnum
import traceback
import psycopg
from cuid2 import cuid_wrapper
import argparse
import csv
import json
import os
import fcntl
import re
import sys
from datetime import datetime, timedelta
from typing import Callable, List, Union
import logging

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
                cursor.execute(
                    """
                    INSERT INTO "ScanResult" (
                        id,
                        "scanId",
                        hash,
                        file_path,
                        mime_type,
                        bsize,
                        processed,
                        errored,
                        match,
                        confidence
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    """,
                    (
                        cuid_generator(),
                        scan_id,
                        row['Hash'],
                        row['Filepath'],
                        row['MimeType'],
                        int(row['Bsize']),
                        row['Processed'].upper().strip() == "TRUE",
                        row['Error'].upper().strip() == "TRUE",
                        match_string_to_array(row['Match']),
                        confidence_string_to_enum(row['Confidence'])
                    )
                )

        logger.info(f"Created {rows} results for scan: '{scan_id}'")

    return rows

def dict_to_insert_sql(table:str, dct:dict) -> str:

    str = f'INSERT INTO "{table}" ('
    vals = ()

    for k, v in dct.items():
        str += f'"{k}", '
        vals += (v,)

    str = str.rstrip(', ') + ') VALUES (' + ', '.join(['%s'] * len(dct)) + ')'

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
            cursor.execute(*dict_to_insert_sql("CrawlError", {
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
            
            cursor.execute(*dict_to_insert_sql("ScanError", {
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


def existing_item_map(cursor, agent_id: str, table: str) -> dict:
    sql = \
    f"""
        SELECT id, result_folder FROM "{table}" WHERE "agentId" = '{agent_id}'
    """
    existing = cursor.execute(sql)
    map = { folder: id  for id, folder in existing.fetchall() } if existing else {}

    if not map:
        logger.info(f"No existing {table}s for '{agent_id}'.  Importing all.")
    else:
        count = len(map.values())
        logger.info(f"Agent {agent_id} has {count} {table}s.  Importing new.")

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


def json_from_queue(source):
    empty_json = {'targets': []}
    
    # If the file is missing or empty, just move on.
    if not os.path.isfile(source) or os.path.getsize(source) == 0:
        return empty_json
    
    with open(source) as file:
        try:
            json_data = json.load(file)
        except json.JSONDecodeError as e:
            # If the file is corrupt, there is little 
            # we can do, short of returning no status and hoping things
            # ultimately sync back up.
            logger.error(f"Decode error reading '{source}'")
            logger.error(e)
            return empty_json
        
        return json_data

def set_agent_status(cursor, source:str, id: str):
    """
    Set's the agent status to either IDLE or ERRORED depending
    on the current state of the queue.json file.

    The agent has one aggregate status and yet the targets
    file can contain more than one entry.  We'll set the 
    agent's status as follows...

    If ANY entries in queue are in status "errored", the
    agent is in the status "ERRORED".  

    If ALL of the entries in the queue are "scanned", the
    agent is in the status "IDLE".

    Otherwise, the agent is in the status "SCANNING". 
    
    Eventually, we may/could add the intermediate "CRAWLING"
    status.
    """

    # We're not going to bother checking the lock file 
    # since we only read this queue.  We don't write it.
    status = Status.IDLE

    queue_file = os.path.join(source, 'queue.json')
    json_data = json_from_queue(queue_file)
    new_targets = []
    for target in json_data.get('targets', []):
        targ_stat = target.get('status','').strip().upper()
        if targ_stat == 'QUEUED':
            new_targets.append(target)
            if status == Status.IDLE: status = Status.SCANNING  
        elif targ_stat.startswith('ERROR:'):
            logger.error(f"Agent '{id}' '{targ_stat}'")
            status = Status.ERRORED

    cursor.execute(
        f"""
        UPDATE "Agent" SET status = '{status}' WHERE id = '{id}'
        """
    )
                
    logger.info(f"Set agent: '{id}' status to: '{status}'")

    # If we can get the lock file, we'll update the queue.  
    # Otherwise, we'll update it next time.
    if remove_lock := get_lock(source):
        try:
            with open(queue_file, 'w') as file:
                json.dump({'targets': new_targets}, file, indent=2)
        except e:
            logger.error(e)
        finally:
            if remove_lock: remove_lock()

    return status

def sync_agent_results(cursor, agent_id, source: str):
    """
    Processes all the scan/crawl folders in this agent directory and
    puts them in the database if we don't have them already.

    We're only looking for folders newer than the newest scan
    we've already got.
    """

    logger.info(f"Looking for scans from agent: '{agent_id}'")
    
    root = os.path.join(source, 'results')
    scan_map = existing_item_map(cursor, agent_id, 'Scan')
    crawl_map = existing_item_map(cursor, agent_id, 'Crawl')

    # There could be an optimization here where we check the count in the db
    # against the count in the folder and skip if they match BUT, that could
    # lead to tough to debug errors if someone deletes a folder and adds a new one.
    # We would catch it the next time the counts were different though so maybe 
    # that's OK.
    for entry in os.listdir(root):
        folder = os.path.join(root, entry)
        create_crawl_from_directory(cursor, agent_id, entry, folder, crawl_map)
        create_scan_from_directory(cursor, agent_id, entry, folder, scan_map)
    
    # If got here, we've processed all the current results for the agent
    # And we know the agent is no longer scanning or crawling
    set_agent_status(cursor, source, agent_id)

def write_scan_to_db(cursor, agent_id:str, folder: str, source:str) -> str:
    """
    Reads the scan_stats.txt file and creates a Scan from it.
    """

    # TODO: Put a unique contraint on agentId and result_folder

    with open(os.path.join(source, 'scan_stats.txt'), 'r') as file:

        lines = file.readlines()

        scan = {
            'id': cuid_generator(),
            'result_folder': folder,
            'root_path': "",
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

        scan["agentId"] = agent_id
        cursor.execute(*dict_to_insert_sql("Scan", scan
        
        ))
        return scan['id']

args_extractor_re = re.compile(r"CMD Settings: *\(Directory: ([^ ,]*), *Use History: *([TtRrUuEeFfAaLlSsEe]*)\)")
def write_crawl_to_db(cursor, agent_id:str, folder, source) -> str:

    with open(os.path.join(source, 'crawl_dump.json'), 'r') as file:
        json_data = json.load(file)
        crawl_id = cuid_generator()
        # Rename the parts of json we need changed.
        json_data['id'] = crawl_id
        json_data['agentId'] = agent_id
        json_data['result_folder'] = folder
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

    cursor.execute(*dict_to_insert_sql("Crawl", json_data))

    rows = 0
    for k, v in hash_map.items():
        rows += 1
        cursor.execute(*dict_to_insert_sql("CrawlHash", {
            "hash": str(k),
            "crawlId": crawl_id,
            "file_paths": v['fps'],
            "bsize": v['bsize'],
            "format": v['fmt']
        }))

    logger.info(f"Created {rows} results for crawl: '{crawl_id}'")

    return crawl_id

def create_thing_from_directory(cursor, thing:str, agent_id:str, folder:str, source: str, map: dict, 
    write_thing_fn:callable, write_results_fn:callable, write_errors_fn:callable) -> str:

    id = map.get(folder, None)
    if not id:
        id = write_thing_fn(cursor, agent_id, folder, source)
        logging.info(f"Created {thing}: '{id}' from: '{folder}' for Agent: '{agent_id}'.")
    else:
        logger.info(f"Skipping {thing} '{folder}'.  It exists as ID: {id}")

    created_rows = 0
    if write_results_fn is not None: created_rows += write_results_fn(cursor, id, source)
    if write_errors_fn is not None: created_rows  += write_errors_fn(cursor, id, source)

    return (id, created_rows)

def create_scan_from_directory(cursor, agent_id:str, folder:str, source: str, scan_map):
    """
    Reads a text file and writes the values in the database.
    """
    return create_thing_from_directory(
        cursor, 'Scan', agent_id, folder, source, scan_map,
        write_scan_to_db,
        create_scan_results_from_directory,
        create_scan_errors_from_directory
    )

def create_crawl_from_directory(cursor, agent_id:str, folder:str, source: str, crawl_map) -> dict:
    """
    Reads a JSON file and creates a crawl dict from it
    """
    return create_thing_from_directory(
        cursor, 'Crawl', agent_id, folder, source, crawl_map,
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
    args = parser.parse_args()

    return args

def perform_init(conn):
    """
    Initializes the database.

    :param conn: The database connection.
    """
    conn.execute('DELETE FROM "Scan";')
    conn.execute('DELETE FROM "Crawl";')
    conn.execute('DELETE FROM "Agent";')

def create_agent(cursor, agent_id, info_file, log_file):
    
    agent_data = agent_from_machine_info(info_file, log_file)
    
    if agent_data['id'] != agent_id:
        logger.warning(
            f"Machine ID in json ({agent_data['id']}) doesn't match directory '{agent_id}'.  Using '{agent_id}' as ID."
        )
        agent_data['id'] = agent_id

    cursor.execute(*dict_to_insert_sql("Agent", agent_data))

    return agent_data['id']

def sync_agent_and_db(conn, source: str):
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
            if os.path.isdir(folder):
                
                info_file = os.path.join(folder, 'machine_info.json')
                log_file = os.path.join(folder, 'teramis.log')
                if not os.path.isfile(info_file):
                    logger.info(f'Skipping folder: "{folder}".  No machine_info.json')
                    continue
                
                # This is an agent folder, so we'll add it to the list of found
                # ones.  After we finish, we'll compare the list of agents we
                # found with the ones we have in the DB.  The lists should match.
                # If there is something in the db that is missing from the ones
                # we found, we'll mark the agent as "Missing".

                found_agents.append(entry)
                
                # We only create the agent the first time the file appears
                # If we've already got this agent, we're not going to recreate
                # it.  We will look for newer Scans and Crawls
                if entry in existing_agents:
                    logger.info(f"Skipping Agent: '{entry}'.  Agent already exists.")
                    agent_id = entry
                else:
                    agent_id = create_agent(cursor, entry, info_file, log_file)
                
                sync_agent_results(cursor, agent_id, folder)

        ## TODO: Check found_agents[] against existing_agents and mark
        ##       as missing any that are in existing but not in found.

    conn.commit()

def perform_sync(args):
    """
    Imports data from the given date.

    :param import_date: The date to import data from.
    """
    connect_string = f"postgresql://{args.user}:{args.password}@{args.host}:{args.port}/{args.database}"

    with psycopg.connect(connect_string) as conn:

        if args.init:
            logger.info("Initializing the database.")
            perform_init(conn)

        if not args.no_import:
            logger.info("Importing data.")
            sync_agent_and_db(conn, args.target)

        # Cleanup the agent status.

if __name__ == '__main__':

    logging.basicConfig(level=logging.INFO)
    args = get_arguments()

    # If we're already running, we don't want to run again.
    if os.path.exists('teramis_importer.lock'):
        logger.error("Already running.  Exiting.")
        sys.exit(1)

    exit_code = 0

    try:
        with open('teramis_importer.lock', 'x') as lock_file:
            lock_file.write('locked')

        perform_sync(args)
        logger.info("Import complete.")

    except Exception as e:
        logger.error(e)
        logger.error(traceback.format_exc())
        exit_code = 2

    finally:
        os.remove('teramis_importer.lock')

    sys.exit(exit_code)