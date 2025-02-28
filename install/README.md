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