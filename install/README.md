# Building the distribution
There is a script in the root directory of the project folder called `create_install.sh`.  Assuming the build machine has been configured correctly, can reach an instance of the database, and has access to docker, this script will build the necessary artifacts and stick the bundle in the install folder.  Any developer machine will need these prequisites met as well.

# Installing

## With Docker
We have a containerized version of the app that includes the GUI, a Postgres DB and the process that watches for file-system changes.  If docker-engine on a linux system is already installed, all that has to happen putting the distro someplace, changing a couple of configuration settings in the docker-compose.yaml file and calling docker compose up.  The detailed instructions are as follows

### Windows
* Make sure that the Windows system is configured to support WSL2.  
  - Open the Control Panel (not Settings) and navigate to "Programs" and then "Programs and Features". 
  - Click on "Turn Windows features on or off" on the left side. 
  - Scroll down and ensure that the following features are checked:
    - Virtual Machine Platform 
    - Windows Subsystem for Linux 
    - Optionally (and potentially beneficial): Hyper-V 
  - Click "OK" and follow the on-screen instructions to enable the features. 
  - Check for Hyper-V Dependencies (if needed):
  - Hyper-V Platform -> Hyper-V Hypervisor 
  - Hyper-V Services 
  - Restart your computer after enabling Hyper-V components. 
* Make sure the system has the latest WSL2 installed.  If the machine has internet access, open up powershell and type `wsl --update`.  If the machine does not have internet access, manually download the necessary files and copy them to the target machine.  The file locations and instructions for doing a manual update/install are [here.](https://learn.microsoft.com/en-us/windows/wsl/install-manual) They include command-line instructions for completing the steps listed above.

* Optionally install the Windows version of Docker Desktop.  There have been some reported challenges monitoring a file-system on the Windows side for changes from the WSL2 side.  If that is a problem on the target system, the docker process may need to be launched from the Windows side using Docker Desktop.  We can't distribute Docker Desktop because it would require a license from us.  However, the company providing the machine can go [here](https://docs.docker.com/desktop/setup/install/windows-install/) to download it.

* Note that on Windows systems, Docker Desktop requires a WSL2 installation.  What that means is that even on a Windows box, we may not need Docker Desktop.

### Linux
* Use the package manager of the linux system to download and install docker if it isn't already.

### Common

* Start the docker engine.  In Windows systems, this is done by launching docker desktop.  On linux systems, it's usually done using `sudo systemctl start docker`

* Download the teramis.tar.gz file, copy it to the desired location and untar it. `tar -xvzf teramis.tar.gz`.
    - Inside are three archives teramis-postgres.tar, teramis-gui.tar and teramis-watchdog.tar, the docker-compose.yaml file, t_install.sh (for linux systems) and t_install.ps1 for windows systems.

* Run the t_install.sh (or t_install.ps1) files to load the three docker containers into the docker engine or manually run `docker load <file.tar>` on each of the tar files that were extracted.  The script will create a .env file based on the .env.sample if one doesn't already exist and then open up .env.sample in an editor so that the configuration settings can be adjusted.

* Edit the .env file, set `PGPASSWORD`, `PG_SUPERUSER_PASSWORD`, `TERAMIS_COMPANY_NAME`, `TERAMIS_SCAN_TARGET` and optionally change `TERAMIS_DB_DIR`
    - `TERAMIS_SCAN_TARGET`: This is the directory that the agents will put their files in.  We use that directory as the mechanism for communication between the GUI and agents.  The layout of the directory and purpose of the files is documented in the agent_sync.py file.  This value is currently expected to come from the environment. For windows, this value must be surrounded by quotes and backslashes have to be doubled. ie `TERAMIS_SCAN_TARGET="D:\\teramis"`
    - `PGPASSWORD`: This is the password for the teramis user in the database.
    - `PG_SUPERUSER_PASSWORD`: This is the password of the database super-user.  It is the user that is created by default by postgres on initial install and then leveraged to create the teramis user.
    - `TERAMIS_DB_DIR`: (Optional).  The database directory that Postgres writes to is mounted from the host file-system into the container.  This mount allows the data to be preserved even if the container is deleted and recreated.  The default location is one level above the GUI folder but can be changed.
    - `TERAMIS_COMPANY_NAME`: (Optional).  The name of the company that this install is for. The value of this shows up in the header of the GUI.

* There are other environment variables in the docker-compose.yaml file that can be changed as desired, eg. the name of the teramis database user, the port that the database exposes, etc...  All of these can be set in the .env file.

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