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
    - 
Or install and configure Python and Visual Studio tools manually:

Install the current version of Python from the Microsoft Store.

Install Visual C++ Build Environment: For Visual Studio 2019 or later, use the Desktop development with C++ workload from Visual Studio Community. For a version older than Visual Studio 2019, install Visual Studio Build Tools with the Visual C++ build tools option.