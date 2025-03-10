pnpm run -s create-init-sql > ./teramis_db_init.sql.tm 
npx prisma generate
npx prisma generate --sql
./build_containers.sh
mkdir -p install/docker-install

docker save teramis-gui:latest > install/docker-install/teramis-gui.tar
docker save teramis-watchdog:latest > install/docker-install/teramis-watchdog.tar
docker save teramis-postgres:latest > install/docker-install/teramis-postgres.tar
cp ./docker-compose.yaml install/docker-install

cd install/docker-install

echo "echo \"Loading teramis-gui.tar\""      > t_install.sh
echo "docker load -i teramis-gui.tar"       >> t_install.sh
echo "echo \"Loading teramis-watchdog.tar\"">> t_install.sh
echo "docker load -i teramis-watchdog.tar"  >> t_install.sh
echo "echo \"Loading teramis-postgres.tar\"">> t_install.sh
echo "docker load -i teramis-postgres.tar"  >> t_install.sh
echo "cat .env"                             >> t_install.sh

chmod +x ./t_install.sh

echo "echo \"Loading teramis-gui.tar\""      > t_install.ps1
echo "docker load -i teramis-gui.tar"       >> t_install.ps1
echo "echo \"Loading teramis-watchdog.tar\"">> t_install.ps1
echo "docker load -i teramis-watchdog.tar"  >> t_install.ps1
echo "echo \"Loading teramis-postgres.tar\"">> t_install.ps1
echo "docker load -i teramis-postgres.tar"  >> t_install.ps1
echo "cat .env.sample"                      >> t_install.ps1

echo "#########################################################"          > .env.sample
echo "#                                                       #"         >> .env.sample
echo "# .env.sample                                           #"         >> .env.sample
echo "#                                                       #"         >> .env.sample
echo "# Settings for the Teramis GUI.  Please change before   #"         >> .env.sample
echo "# launching and save as .env                            #"         >> .env.sample
echo "#                                                       #"         >> .env.sample
echo "#########################################################"         >> .env.sample
echo                                                                     >> .env.sample
echo "PGUSER=teramis"                                                    >> .env.sample
echo "PGDATABASE=teramis"                                                >> .env.sample
echo                                                                     >> .env.sample
echo "# Set PGPASSWORD to some value before launching."                  >> .env.sample
echo "# The PGUSER will be created using it."                            >> .env.sample
echo "PGPASSWORD= "                                                      >> .env.sample
echo                                                                     >> .env.sample
echo "# Set PG_SUPERUSER_PASSWORD to some value before launching."       >> .env.sample
echo "# The postgres user will be created using it."                     >> .env.sample
echo "PG_SUPERUSER_PASSWORD= "                                           >> .env.sample
echo                                                                     >> .env.sample
echo "TERAMIS_DB_DIR=\"./data\""                                         >> .env.sample
echo "# Set TERAMIS_COMPANY_NAME to your company name before launching." >> .env.sample
echo "TERAMIS_COMPANY_NAME= "                                            >> .env.sample
echo                                                                     >> .env.sample
echo "# Set TERAMIS_SCAN_TARGET to the location where the agents "       >> .env.sample
echo "# write before launching."                                         >> .env.sample
echo "TERAMIS_SCAN_TARGET=  "                                            >> .env.sample  

tar -cvzf ../teramis.tar.gz .
