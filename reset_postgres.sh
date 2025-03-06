docker rm $(docker ps -a | awk ' / teramis-postgres / { print $1 }')
docker rmi $(docker images -a | awk ' /teramis-postgres / { print $3 }')
