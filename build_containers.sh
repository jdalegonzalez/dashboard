docker build -f ./Dockerfile.postgres -t teramis-postgres:latest .
docker build -f ./Dockerfile.gui      -t teramis-gui:latest .
docker build -f ./Dockerfile.watchdog -t teramis-watchdog:latest .