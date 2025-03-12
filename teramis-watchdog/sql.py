
from datetime import datetime
import logging
from typing import Union

from utils import (
    default_target_name,
    root_from_folder,
    add_folder_to_target,
    cuid_generator
)

from enum import StrEnum

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

def error_str_to_enum(val:str) -> Severity:
    return {
        'HINT': Severity.HINT,
        'WARNING': Severity.WARNING,
        'ERROR': Severity.ERROR,
        'FATAL': Severity.FATAL
    }.get(val.upper(), Severity.WARNING)


logger = logging.getLogger(__name__)

def insert_sql(table:str, dct:dict, no_conflict = False) -> str:
    """
    Takes the name of a table and a dict of key-values and creates
    an insert statement and list of values that can be passed to 
    pyscopg for execution.
    """
    str = f'INSERT INTO "{table}" ('
    vals = ()

    for k, v in dct.items():
        str += f'"{k}", '
        vals += (v,)

    str = str.rstrip(', ') + ') VALUES (' + ', '.join(['%s'] * len(dct)) + ')'

    if no_conflict: str += ' ON CONFLICT DO NOTHING'

    return (str, vals)

def newest_target_for_agent(cursor, agent_id):
    sql = \
    f"""
    SELECT t.id AS id, root, c.id AS crawl_id, s.id AS scan_id, c.result_folder AS folder
    FROM "Target" t
    JOIN "AgentsToTarget" at ON at."targetId" = t.id AND at."agentId" = '{agent_id}'
    LEFT JOIN 
        (SELECT *, row_number() OVER (PARTITION BY "targetId" ORDER BY targeted_date DESC) rn FROM "Crawl") c
    ON t.id = c."targetId" AND rn = 1
    LEFT JOIN "Scan" s ON s."targetId" = t.id AND s.result_folder = c.result_folder
    """
    existing = cursor.execute(sql)
    return existing

def targets_for_agent(cursor, agent_id):
    sql = \
    f"""
    SELECT t.id AS id, root, c.id AS crawl_id, s.id AS scan_id, c.result_folder AS folder
    FROM "Target" t
    JOIN "AgentsToTarget" at ON at."targetId" = t.id AND at."agentId" = '{agent_id}'
    LEFT JOIN "Crawl" c ON c."targetId" = t.id
    LEFT JOIN "Scan" s ON s."targetId" = t.id AND s.result_folder = c.result_folder
    """
    existing = cursor.execute(sql)
    return existing


def create_new_target(cursor, agent_id:str, root_path:str, target_settings:dict, default_settings: dict) -> str:
    """
    Creates a new Target for this agent and returns the ID.
    """
    logger.info(f"Creating new target.  Root: {root_path}")
    settings = target_settings.get(root_path, default_settings)
    target_id = cuid_generator()
    new_target = {
        'id': target_id,
        'root': root_path,
        'name': default_target_name(root_path),
        **settings
    }
    cursor.execute(*insert_sql("Target", new_target))
    cursor.execute(*insert_sql("AgentsToTarget", {'agentId': agent_id, 'targetId': target_id}))
    return new_target['id']

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

def get_target_id(root: str, existing_targets: dict) -> str:
    return existing_targets.get('targets', {}).get(root, None)

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
    target_info = get_target_id(root_path, existing_targets)
    if not target_info:
        target_id = create_new_target(cursor, agent_id, root_path, target_settings, default_settings)
    else:
        target_id = target_info['id']

    _, existing_folder = add_folder_to_target(target_id, root_path, folder, '', '', existing_targets)

    crawl_id = existing_folder['crawl_id']
    scan_id = existing_folder['scan_id']
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
        cursor.execute('DELETE FROM "AgentsToTarget"')
        cursor.execute('DELETE FROM "Target"')
        cursor.execute('DELETE FROM "Agent"')

