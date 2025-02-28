from enum import Enum
import random
import psycopg
from cuid2 import cuid_wrapper
import argparse
import csv
import json
import os
import re
import sys
from datetime import datetime
from typing import Callable, List, Tuple, Union
import logging
from pathlib import Path

logger = logging.getLogger(__name__)
cuid_generator: Callable[[], str] = cuid_wrapper()

class Status(Enum):
    IDLE = 'IDLE'
    CRAWLING = 'CRAWLING'
    SCANNING = 'SCANNING'
    ERRORED = 'ERRORED'

class Severity(Enum):
    HINT = 'HINT'
    WARNING = 'WARNING'
    ERROR = 'ERROR'
    FATAL = 'FATAL'

class Confidence(Enum):
    HIGH = 'HIGH'
    MEDIUM = 'MEDIUM'
    LOW = 'LOW'
    NONE = 'NONE'

def agent_id() -> str:
    return cuid_generator()

def agent_name() -> str:
    """
    Returns a fake machine name.
    """
    def ele(arr: List[str]) -> str:
        ndx = int(os.urandom(1)[0]) % len(arr)
        return arr[ndx]
    location = ele(['CLOUD-', 'DATACENTER-', 'LOCAL-', 'US-EAST1C-', 'ZONE-5-', 'CA-WEST-'])
    machine = ele(['SERVER-', 'VM-', 'IMAGE-', 'WORKSTATION-'])
    id = os.urandom(2).hex()
    return f"{location}{machine}{id}"

def fake_mac_address() -> str:
    return "02:00:00:%02x:%02x:%02x" % (random.randint(0, 255),
                             random.randint(0, 255),
                             random.randint(0, 255))

def location() -> str:
    """
    Returns a fake location.
    """
    return fake_mac_address()

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

def agent_from_directory(source: str) -> Union[dict, None]:
    """
    Reads a text file and creates an agent dict from it
    """
    path = os.path.join(source, 'crawl_stats.txt')
    with open(path, 'r') as file:
        lines = file.readlines()
        agent = {
            'id': agent_id(),
            'name': agent_name(),
            'location': fake_mac_address(),
            'path': "",
            'status': Status.IDLE
        }
    
        for line in lines:
            tag, value = line.split(':', 1)
            tag = tag.strip()
            value = value.strip()
            if tag == "":
                if value:
                    logger.warning(f"Found a value without a key '{value}'")
            elif tag == 'Root Directory':
                agent['path'] = value
            elif tag in ['Start Time', 'End Time', 'Duration', 'Throughput', 'Root Size', 'Directories', 'Files', 'Unsupported', 'Unique Files', 'Largest File', 'Extensions', 'Errors']:
                pass
            else:
                logger.warning(f"Unmatched Agent key '{tag}'")
    
    return agent


def gigs_from_string(str: str) -> float:
    """
    Converts a string to a float.
    """
    # 1.64 GB per second
    val = str.strip().split(' ')[0]
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

def create_scan_results_from_directory(cursor, scan: dict, source: str):
    """
    Reads a text file and writes the values in the database.
    """
    with open(os.path.join(source, 'output', 'results.csv'), 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            cursor.execute(
                """
                INSERT INTO "ScanResult" (
                    id,
                    \"scanId\",
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
                    scan['id'],
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

def create_scan_errors_from_directory(cursor, scan: dict, source: str):
    """
    Reads a text file and writes the values in the database.
    """

    with open(os.path.join(source, 'errors.log'), 'r') as file:
        lines = file.readlines()
        for line in lines:
            
            parts = line.split(" - ")
            
            error_str_to_enum = lambda str: {
                'HINT': Severity.HINT,
                'WARNING': Severity.WARNING,
                'ERROR': Severity.ERROR,
                'FATAL': Severity.FATAL
            }.get(str.upper(), Severity.WARNING)
            
            if len(parts) < 3:
                logger.warning(f"Error line '{line}' is not formatted correctly.")
                continue
            
            name, desc = parts[2].split(':', 1)
            file = desc if name == 'Timeout' or len(parts) < 4 else parts[3]
            
            cursor.execute(
                """
                INSERT INTO "ScanError" (
                    "id",
                    \"scanId\",
                    occurred_at,
                    severity,
                    error_name,
                    error_desc,
                    file
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                """,
                (
                    cuid_generator(),
                    scan['id'],
                    datetime.fromisoformat(parts[0]),
                    error_str_to_enum(parts[1]),
                    name.strip(),
                    "" if name == 'Timeout' or len(parts) < 4 else desc.strip(),
                    file.strip()
                )
            )

def create_scan_from_directory(cursor, agent: dict, source: str):
    """
    Reads a text file and writes the values in the database.
    """
    with open(os.path.join(source, 'scan_stats.txt'), 'r') as file:
        lines = file.readlines()

        scan = {
            'id': cuid_generator(),
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

        cursor.execute(
            """
            INSERT INTO "Scan" (
                id,
                root_path,
                matches,
                timeouts,
                gigs_per_second,
                "agentId"
            )
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                scan['id'],
                scan['root_path'],
                scan['matches'],
                scan['timeouts'],
                scan['gigs_per_second'],
                agent['id']
            )
        )

    create_scan_errors_from_directory(cursor, scan, source)
    create_scan_results_from_directory(cursor, scan, source)


def create_crawl_from_directory(cursor, agent: dict, source: str) -> dict:
    """
    Reads a JSON file and creates a crawl dict from it
    """
    with open(os.path.join(source, 'crawl_dump.json'), 'r') as file:

        json_data = json.load(file)
        crawl_id = cuid_generator()
        cursor.execute(
            """
            INSERT INTO "Crawl" (
                id,
                \"agentId\",
                root_path,
                file_count,
                dir_count,
                total_size,
                scan_size,
                largest_file_path, 
                largest_file_size,
                extensions,
                start_time,
                end_time,
                throughput,
                unsupported_files
            ) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                crawl_id,
                agent['id'],
                json_data['root_path'],
                json_data['file_count'],
                json_data['dir_count'],
                json_data['total_size'],
                json_data['scan_size'],
                json_data['largest_file_path'],
                json_data['largest_file_size'],
                json_data['extensions'],
                json_data['start_time'],
                json_data['end_time'],
                json_data['throughput'],
                json_data['unsupported']
            )
        )

        for k, v in json_data['hash_map'].items():
            cursor.execute(
                """
                INSERT INTO "CrawlHash" (
                    \"crawlId\",
                    hash,
                    file_paths,
                    bsize,
                    format
                )
                VALUES (%s, %s, %s, %s, %s)
                """,
                (
                    crawl_id,
                    k,
                    v['fps'],
                    v['bsize'],
                    v['fmt']
                )
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
        "-D", "--date", 
        type=datetime.fromisoformat,
        help="Look for files newer than this datetime (in ISO format).  If blank, the app will look for files newer than the 'last_import' file in this folder",
        dest='import_date',
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
        default=os.getenv("scan_target", os.path.dirname(__file__))
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

    if args.import_date is None:
        last_file = last_import_file_path()
        if os.path.exists(last_file):
            timestamp = os.path.getmtime(last_file)
            args.import_date = datetime.fromtimestamp(timestamp)            

    return args

def perform_init(conn):
    """
    Initializes the database.

    :param conn: The database connection.
    """
    conn.execute('DELETE FROM "Scan";')
    conn.execute('DELETE FROM "Crawl";')
    conn.execute('DELETE FROM "Agent";')

def agent_from_directories(conn, source: str) -> dict:
    """
    Creates an agent from the given directory.
    """
    for entry in os.listdir(source):
        folder = os.path.join(source, entry)
        if os.path.isdir(folder):
            agent_data = agent_from_directory(folder)
            with conn.cursor() as cursor:
                
                cursor.execute(
                    'INSERT INTO "Agent" (id, name, location, path, status) VALUES (%s, %s, %s, %s, %s)',
                    (agent_data['id'], agent_data['name'], agent_data['location'], agent_data['path'], agent_data['status'].value)
                )

                create_crawl_from_directory(cursor, agent_data, folder)
                create_scan_from_directory(cursor, agent_data, folder)

            conn.commit()

def perform_import(args):
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
            print("Importing data.")
            agent_from_directories(conn, os.path.join(args.target, "results"))

            # perform_import(conn, args.import_date)

if __name__ == '__main__':
    logging.basicConfig(filename='teramis_importer.log', level=logging.INFO)
    args = get_arguments()
    if args.import_date:
        logger.info(f"Importing data newer than {args.import_date.isoformat()}")
    else:
        logger.info("Importing all data.")

    # If we're already running, we don't want to run again.
    if os.path.exists('teramis_importer.lock'):
        logger.error("Already running.  Exiting.")
        sys.exit(1)

    try:
        with open('teramis_importer.lock', 'x') as lock_file:
            lock_file.write('locked')
        perform_import(args)
        logger.info("Import complete.")
        if not args.no_import: Path(last_import_file_path()).touch()
    except Exception as e:
        logger.error(f"Error: {e}")
        sys.exit(2)
    finally:
        os.remove('teramis_importer.lock')

    sys.exit(0)