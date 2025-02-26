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
    - To install the dependencies manually:
        - Install the current version of Python Here is [3.13](https://www.python.org/ftp/python/3.13.0/python-3.13.0-amd64.exe). As per usual, I've put the file in this folder.
        - Install Visual C++ Build Environment: For Visual Studio 2019 or later, use the Desktop development with C++ workload from Visual Studio Community. For a version older than Visual Studio 2019, install Visual Studio Build Tools with the Visual C++ build tools option.
    - For what it's worth, installing the dependencies may not be necessary since we're not going to be building on the box.

* Get the build bundle and unzip it in the desired directory.
    - Once we have a repository for this, we can just assume it will always live there.  Perhaps sharepoint.  We'll configure github to build and deploy.
    - HOWEVER, for now, I'm manually building, moving to sharepoint, then downloading to this folder.