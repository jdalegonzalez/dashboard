import csv
from datetime import datetime
import logging
import os
import re
from typing import List

from sql import (
    create_thing_from_directory,
    get_newest_date,
    insert_sql,
    confidence_string_to_enum,
    error_str_to_enum
)

from utils import (
    gigs_from_string,
    is_file_newer,
    cuid_generator,
    targeted_string_to_date
)

logger = logging.getLogger(__name__)

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

def match_string_to_array(str: str) -> List[str]:
    """
    Converts a string to a list of strings.
    """
    pstr = re.sub(r'^\[|\]$', '', str.strip())
    return [
        x for x in re.split(r'^"|", "|"$', pstr) if x
    ]


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
        # We'll assume we've already processed it.  If for some reason we're
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

