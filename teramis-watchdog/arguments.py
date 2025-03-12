import argparse
import os

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

