import logging
import os
from watchfiles import Change, watch
import hashlib
from typing import Callable

logger = logging.getLogger(__name__)

HandlerType = Callable[[str, str], None]

def insensitive_in(val, val_list):
    cval = val.casefold()
    for ele in val_list:
        if ele.casefold() == cval: return True
    return False
 

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
        last_hash = self.update_map.get(file, '')
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

