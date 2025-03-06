# Script expected to be sourced by postgres initialization process
# 
# Because it's sourced, we can expect the functions that are
# present in the postgres entrypoint to be available for us.
#
#    Author: J. Dale Gonzalez
#    Date: March 6, 2025

newUser="${PGUSER:-teramis}"     # New user to be created
newDb="${PGDATABASE:-teramis}" # Database name to be created

docker_process_sql=psql
# Check if the user already exists

userAlreadyExists="$(
POSTGRES_DB= docker_process_sql --dbname postgres --set user="${newUser}" --tuples-only <<-'EOSQL'
    SELECT 1 FROM pg_roles WHERE rolname = :'user' ;
EOSQL
)"

if [ -z "$userAlreadyExists" ]; then
   docker_process_sql --dbname postgres --set user="$newUser" --set pwd="$PGPASSWORD" <<-'EOSQL'
       CREATE USER :"user" WITH PASSWORD :'pwd' ;
EOSQL
   printf '\n' 
else
   echo "User: ${newUser} already exists."
fi

teramisDbExists="$(
   POSTGRES_DB= docker_process_sql --dbname postgres --set db="$newDb" --tuples-only <<-'EOSQL'
       SELECT 1 FROM pg_database WHERE datname = :'db' ;
EOSQL
)"

if [ -z "$teramisDbExists" ]; then
   POSTGRES_DB= docker_process_sql --dbname postgres --set db="$newDb" <<-'EOSQL'
       CREATE DATABASE :"db" ;
EOSQL
	printf '\n'
else
   echo "Database: ${newDb} already exists"
fi

POSTGRES_DB= docker_process_sql --dbname $newDb --set user="$newUser" <<-'EOSQL'
   ALTER SCHEMA public OWNER TO :"user" ;
   GRANT ALL PRIVILEGES ON SCHEMA public TO :"user" ;
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO :"user" ;
   ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO :"user" ;
EOSQL

POSTGRES_DB= POSTGRES_USER= docker_process_sql --dbname $newDb --username $newUser -f ./teramis_db_init.sql.tm