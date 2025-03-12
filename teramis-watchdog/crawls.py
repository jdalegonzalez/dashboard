import json
import logging
import os
import re
from sql import create_thing_from_directory, get_newest_date, insert_sql
from utils import cuid_generator, is_file_newer, targeted_string_to_date

logger = logging.getLogger(__name__)

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

