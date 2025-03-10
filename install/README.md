# Building the distribution
There is a script in the root directory of the project folder called `create_install.sh`.  Assuming the build machine has been configured correctly, can reach an instance of the database, and has access to docker, this script will build the necessary artifacts and stick the bundle in the install folder.  Any developer machine will need these prequisites met as well.

# Installing

## With Docker
We have a containerized version of the app that includes the GUI, a Postgres DB and the process that watches for file-system changes.  If docker-engine on a linux system is already installed, all that has to happen putting the distro someplace, changing a couple of configuration settings in the docker-compose.yaml file and calling docker compose up.  The detailed instructions are as follows

### Windows
* Note that on Windows systems, Docker Desktop requires a WSL2 installation.  What that means is that even on a Windows box, 
* Make sure the system has the latest WSL2 installed.  If the machine has internet access, open up powershell and type `wsl --update`.  If the machine does not have internet access, manually download the necessary files and copy them to the target machine.  The file locations and instructions for doing a manual update/install are [here.](https://learn.microsoft.com/en-us/windows/wsl/install-manual)

* Optionally install the Windows version of Docker Desktop.  There have been some reported challenges monitoring a file-system on the Windows side for changes from the WSL2 side.  If that is a problem on the target system, the docker process may need to be launched from the Windows side using Docker Desktop.  We can't distribute Docker Desktop because it would require a license from us.  However, the company providing the machine can go [here](https://docs.docker.com/desktop/setup/install/windows-install/) to download it.

### Linux
* Use the package manager of the linux system to download and install docker if it isn't already.

### Common

* Start the docker engine.  In Windows systems, this is done by launching docker desktop.  On linux systems, it's usually done using `sudo systemctl start docker`

* Download the teramis.tar.gz file, copy it to the desired location and untar it. Inside are three archices, the docker-compose.yaml file and t_install.sh.  The t_install.sh file will load the tar files into the docker engine.

* Run the t_install.sh files to load the three docker containers into the docker engine or manually run `docker load <file.tar>` on each of the tar files that were extracted.

* Change at least NEXT_PUBLIC_COMPANY_NAME, TERAMIS_SCAN_TARGET, PGPASSWORD, and POSTGRES_PASSWORD.  Alternatively, there are shell environment variables that can be set that will provide these values.  The easiest way to make sure the necessary environment variables are set is to create an .env file in the same directory as the docker-compose.yaml file.  The .env file has the format `ENV_NAME="env values"`, each one on a line by itself.  There are examples of these files in the root directory of the folder.  There are other environment variables in the docker-compose.yaml file that can be changed as desired, eg. the name of the teramis database user, the port that the database exposes, etc...  All of these can be set in the .env file.  Setting these values using the .env file is preferable because the docker-compose.yaml file might change in subsequent releases.
    - `NEXT_PUBLIC_COMPANY_NAME`: This is the name of the company that is running this instance of the GUI.  The "NEXT_PUBLIC_" prefix is necessary to make the web-server expose the value to the client.  This value shows up in the title-bar of the GUI.  If `TERAMIS_COMPANY_NAME` is set in the environment, the docker-compose.yaml file will use that value.
    - `TERAMIS_SCAN_TARGET`: This is the directory that the agents will put their files in.  We use that directory as the mechanism for communication between the GUI and agents.  The layout of the directory and purpose of the files is documented in the agent_sync.py file.  This value is currently expected to come from the environment.  It can be hard coded in the docker-compose.yaml file if needed.  Look for the section labeled "volumes" and the line that starts with `${TERAMIS_SCAN_TARGET}` and replace `${TERAMIS_SCAN_TARGET}` with a hard-coded path to the desired directory.  DO NOT change TERAMIS_SCAN_TARGET in any other place in the docker-compose.yaml file.  Once the volume map is created, the rest of the containers can use the hard-coded path to the volume inside the container.
    - `PGPASSWORD`: This is the password for the teramis user in the database.  It can be hard-coded in the docker-compose.yaml file or set in the environment.
    - `POSTGRES_PASSWORD`: This is the password of the database super-user.  It is the user that is created by default by postgres on initial install and then leveraged to create the teramis user.  It can be set in the environment with the variable  `PG_SUPERUSER_PASSWORD`.
    - `TERAMIS_DB_DIR`: (Optional).  The database directory that Postgres writes to is mounted from the host file-system into the container.  This mount allows the data to be preserved even if the container is deleted and recreated.  The default location is one level above the GUI folder but can be changed.
* Run `docker compose up`.  The three components will all be started.  The database will be created if it doesn't exist and any files currently in the target folder will be automatically imported.  The GUI will be up and running on port 8080.  (unless this port was changed in the docker-compose.yaml file)



## Without Docker
The system can be installed without Docker but it's a little more challenging and will be harder to update.  The following are the Dockerless instructions

#### Install Postgresql
* Download a version of postgresql for the OS you're targeting.  At the time of this writing, the latest is 17.4.  You can find a [list here.](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
    - [Postgresql For Windows 17.4](https://sbp.enterprisedb.com/getfile.jsp?fileid=1259402)
    - For ease of installation, I've put that file in this folder.

* Run the installation program that you downloaded.
    - When you do the install, set the admin password to something you'll remember.  You're going to need it to run the script that creates our user.

- Run the postgres.ps1 PowerShell script from this directory. This will create the necessary user and write out a .env file that you'll need to add to the webserver.
    - It also tries to download postgres and auto-install it if it's missing but the download fails in our environment because we block most external sites and the scripted install fails for a reason I haven't investigated.


#### Install nodejs and NextJs

* Install NodeJs
    - You'll find a windows binary for NodeJs here: [node-v22.14.0-x64.msi](https://nodejs.org/en)
    - Again, for ease of install, I've included the msi in this directory
    - You can select the option to auto-install dependencies, but it will likely fail as well because of our restricted access.
    - For what it's worth, I don't think the dependencies is necessary since we're not going to be building on the box.
    - To install the dependencies manually (If necessary):
        - Install the current version of Python Here is [3.13](https://www.python.org/ftp/python/3.13.0/python-3.13.0-amd64.exe). As per usual, I've put the file in this folder.
        - Install Visual C++ Build Environment: For Visual Studio 2019 or later, use the Desktop development with C++ workload from Visual Studio Community. For a version older than Visual Studio 2019, install Visual Studio Build Tools with the Visual C++ build tools option.

#### Unpack the server components
* Get the build bundle and unzip it in the desired directory.
    - Once we have a repository for this, we can just assume it will always live there.  Perhaps sharepoint.  We can configure github to build and store the deploy file
    - For now, download the deploy.tar.gz file from the location we've chosen.  I put one in the install directory on this machine
    - move the downoaded file to the folder you want the server to live in.  I set this up as `C:\Users\ladmin\projects\teramis-gui` but it doesn't have to be that.
    - cd to the directory where the server lives.
    - in powershell, `tar -xvzf deploy.tar.gz .`
    - HOWEVER, for now, I'm manually building, moving to sharepoint, then downloading to this folder.
* Copy the remaining config file to the folder where you unzipped the server
    - delete any .env files that are in the deployed directory
    - copy the .env file from the install directory to the folder where the server was unzipped. 

#### Start the server
* Open up a powershell window and do the following:
    - cd to the place where you unbundled the server parts.  eg. `cd C:\Users\ladmin\projects\teramis-gui`
    - launch the server with the command `npm start`
    - You should see console output indicating that the server is up and running.
    - Test that everything is OK by browsing to `http://localhost:3000`

#### Set the server up to run as a service
I have done a little research on how to do this but don't have detailed instructions yet.  For right now
We have to manually start up and stop the webserver.  Once we're happy with how things work, we can wrap
the web server up in a windows service.  Alternatively, if we move all of this to linux, the steps for
running something as a service are much more straight forward.