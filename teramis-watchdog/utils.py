from datetime import datetime
import json
import logging
import os
from typing import Callable

from cuid2 import cuid_wrapper

cuid_generator: Callable[[], str] = cuid_wrapper()

logger = logging.getLogger(__name__)

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


def file_delimiter(file_path):
    backslash = file_path.count(r"\\")
    forwardslash = file_path.count("/")
    return "\\" if backslash >= forwardslash else "/"

def default_target_name(file_path):
    """
    Converts an arbitrarily long file path into a short "front of path"..."back of path"
    that can be used as the name for a location.
    """
    delim = file_delimiter(file_path)
    pieces = file_path.split(delim)
    not_empty_pieces = len([t for t in pieces if t])
    if not_empty_pieces < 3: return file_path
    # Grab the front 2 non-empty parts and the last non-empty
    # part and stitch them together with the delim.
    name = ""
    stiched = 0
    for piece in pieces:
        name += (piece + delim)
        if piece: stiched += 1
        if stiched > 1: break
    name += ("..." + delim + pieces[-1])
    return name

def json_from_file(source, empty):
    """
    Returns parsed json from a source or the default "empty" value
    in the event that the file is missing, empty or can't be 
    decoded.
    """    
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

def add_folder_to_target(target_id:str, root:str, folder:str, crawl_id:str, scan_id:str, map:dict) -> dict:
    """
    Builds or adds to a dictionary that maps the result folders we've previously processed and
    the target paths we've previously processed.

    Shape looks like:
    {
        "folders": {
            "2025_02_28_19_53_21": {
                "scan_id": "h85oh66eqp5bqjzw0ig3oyvu",
                "crawl_id": "arvr174pmsty9n0l6b8qo8ge"
            },
            "2025_02_28_22_09_35": {
                "scan_id": "uviua0dhb7ceha4qyciqehx2",
                "crawl_id": "sl6rv90rl9ik5pup7ndixu77"
            }
        },
        "targets": {
            "C:\\Users\\ladmin\\Downloads\\lib_test_data\\all_type": {
                "id": "ufhbtpkw0rictlity7nm3dll"
            },
            "\\\\10.1.2.5\\e\\lib_test_data\\all_type": {
                "id": "khbjfvk9kef7utrbmhj5wusy"
            }
        }
    }
    """
    ### If we've seen the folder before but somehow don't have the
    ### matching target, we'll fix it up but it's an error and we'll
    ### warn.
    if not (folders := map.get('folders', None)): 
        map['folders'] = {}
        folders = map['folders']

    if not (existing_folder := folders.get(folder, None)):
        folders[folder] = {"scan_id":'', "crawl_id": ''}
        existing_folder = folders[folder]

    if not existing_folder.get('crawl_id'): existing_folder['crawl_id'] = crawl_id
    if not existing_folder.get('scan_id'): existing_folder['scan_id'] = scan_id

    if not (targets := map.get('targets', None)):
        map['targets'] = {}
        targets = map['targets']

    if not (existing_target := targets.get(root, None)):
        targets[root] = {'id': target_id}

    return (existing_target, existing_folder)

def targeted_string_to_date(targeted: str) -> datetime:
    format_string ="%Y_%m_%d_%H_%M_%S"
    try:
        return datetime.strptime(targeted, format_string)
    except Exception:
        logger.warning(f"Couldn't covert '{targeted}' to a date using '{format_string}'.  Returning current time.")
        return datetime.now()
    