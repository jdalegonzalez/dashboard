# PowerShell Script to Install PostgreSQL on Windows
<#
.SYNOPSIS
    .
.DESCRIPTION
    .
.PARAMETER pgHost
    The url or IP address of the PostgreSQL server. Default is "localhost".
.PARAMETER pgPort
    The port number of the PostgreSQL server. Default is "5432".
.PARAMETER pgDatabase
    The name of the PostgreSQL database. Default is "postgres".
.PARAMETER pgAdminUser
    The username of the PostgreSQL admin user. Default is "postgres".
.PARAMETER pgAdminPassword
    The password of the PostgreSQL admin user. If not provided, the script will prompt for it.
.PARAMETER teramisPassword
    The password for the new user to be created. If not provided, the script will prompt for it.
.PARAMETER verifyPassword
    The verification of the password for the new user. If not provided, the script will prompt for it.
.PARAMETER companyName
    The name of the company. If not provided, the script will prompt for it.
.EXAMPLE
    C:\PS> .\install\postgres.ps1 -pgHost "localhost" -pgPort "5432" -pgDatabase "postgres" -pgAdminUser "postgres" -pgAdminPassword "password" -teramisPassword "password" -verifyPassword "password" -companyName "Teramis"
.NOTES
    Author: J. Dale Gonzalez
    Date: February 26, 2025
#>
param (
    [string]$pgHost = "localhost",
    [string]$pgPort = "5432",
    [string]$pgDatabase = "postgres",
    [string]$pgAdminUser = "postgres",
    [string]$pgAdminPassword = $( Read-Host "Enter the password for the postgres user" ),
    [string]$teramisPassword = $( Read-Host "Enter a new password for the teramis user" ),
    [string]$verifyPassword = $( Read-Host "Verify the password for the teramis user" ),
    [string]$companyName = $( Read-Host "Enter the company name")
)

if ($teramisPassword -ne $verifyPassword) {
    Write-Host "Passwords do not match. Please try again."
    Exit
}

# Define PostgreSQL version and installer URL
$pgMajor = "17"  # Change to the desired version
$pgMinor = "4"   # Change to the desired version
$pgVersion = "$pgMajor.$pgMinor"
$pgInstallerUrl = "https://get.enterprisedb.com/postgresql/postgresql-$pgVersion-1-windows-x64.exe"
$installerPath = "$env:USERPROFILE\Downloads\postgresql-installer.exe"

[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\PostgreSQL\$pgMajor\bin", "Machine") 
$env:Path += ";C:\Program Files\PostgreSQL\$pgMajor\bin"

# Maybe we're lucky and we already have a PostgreSQL installation.
# Check if PostgreSQL is already installed
if (-not (Get-Command "psql" -ErrorAction SilentlyContinue)) {

    Write-Host "PostgreSQL is not installed. Proceeding with the installation..."

    # Download the PostgreSQL installer
    # We can't do the download in heavily controlled environments but
    # we can hope that they can do the download themselves and then
    # run us.  (This can error)
    Write-Host "Downloading PostgreSQL installer..."
    try {
        Invoke-WebRequest -Uri $pgInstallerUrl -OutFile $installerPath
    } catch {
        Write-Host "Failed to download PostgreSQL installer."
    }

    # Check if the installer was downloaded
    if (Test-Path $installerPath) {
        Write-Host "PostgreSQL installer downloaded successfully."
        
        # Run the installer silently (with default options)
        Write-Host "Running the PostgreSQL installer..."
        Start-Process -FilePath $installerPath -ArgumentList "/SILENT" -Wait

        # Check if the installation was successful
        if (Get-Command "psql" -ErrorAction SilentlyContinue) {
            Write-Host "PostgreSQL installation successful."
            Remove-Item -Path $installerPath -Force
        } else {
            Write-Host "PostgreSQL installation failed. Please check the logs."
        }

        # Clean up the installer file
    } else {
        Write-Host "Failed to download PostgreSQL installer. Please try again."
        Exit
    }

}

$newUser = "teramis"            # New user to be created
$newDb = "teramis"          # Database name to be created

# Connection string for psql
$psqCheckCmd = "psql -h $pgHost -p $pgPort -U $pgAdminUser -d $pgDatabase -tXAc"
$psqlCmd  = "psql -h $pgHost -p $pgPort -U $pgAdminUser -d $pgDatabase -c"
$psqlCmd2 = "psql -h $pgHost -p $pgPort -U $pgAdminUser -d $newDb -c"

# Set environment variable for password to avoid password prompt
$env:PGPASSWORD = $pgAdminPassword

# Check if the user already exists
$checkUserCmd = "SELECT 1 FROM pg_roles WHERE rolname='$newUser';"
$userExists = Invoke-Expression "$psqCheckCmd `"$checkUserCmd`""
if ($userExists -eq 1) {
    Write-Host "User '$newUser' already exists. Skipping user creation."
}
else {
    Write-Host "User '$newUser' does not exist. Creating user..."
    $createUserCmd = "CREATE USER $newUser WITH PASSWORD '$teramisPassword';"
    Invoke-Expression "$psqlCmd `"$createUserCmd`""
    Write-Host "User '$newUser' created."    
}

# Check if the database already exists
$checkDbCmd = "SELECT 1 FROM pg_database WHERE datname='$newDb';"
$dbExists = Invoke-Expression "$psqCheckCmd `"$checkDbCmd`""
if ($dbExists -eq 1) {
    Write-Host "Database '$newDb' already exists. Skipping database creation."
}
else {
    Write-Host "Database '$newDb' does not exist. Creating database..."
    $createDbCmd = "CREATE DATABASE $newDb WITH OWNER $newUser;"
    Invoke-Expression "$psqlCmd `"$createDbCmd`""
    Write-Host "Database '$newDb' created."
}

# Make the teramis user the owner of the teramis schema
$newSchema = "public"
$alterSchemaCmd = "ALTER SCHEMA $newSchema OWNER TO $newUser;"
Invoke-Expression "$psqlCmd2 `"$alterSchemaCmd`""
Write-Host "Schema '$newSchema' is now owned by user '$newUser'."

# Grant all privileges on the schema to the teramis user
$grantSchemaCmd = "GRANT ALL PRIVILEGES ON SCHEMA $newSchema TO $newUser;"
Invoke-Expression "$psqlCmd2 `"$grantSchemaCmd`""
Write-Host "User '$newUser' has full rights on schema '$newSchema'."

# Grant full rights on all tables within the schema
$grantTableRightsCmd = "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA $newSchema TO $newUser;"
Invoke-Expression "$psqlCmd2 `"$grantTableRightsCmd`""

# Grant future table privileges
$grantFutureRightsCmd = "ALTER DEFAULT PRIVILEGES IN SCHEMA $newSchema GRANT ALL PRIVILEGES ON TABLES TO $newUser;"
Invoke-Expression "$psqlCmd2 `"$grantFutureRightsCmd`""

Write-Host "User '$newUser' created, database '$newDb' created, and full rights granted."

$scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
$sqlFile = "$scriptPath\migration.sql"
Write-Host "Creating the tables..."
$env:PGPASSWORD = $teramisPassword
$psqlFileCmd  = "psql -h $pgHost -p $pgPort -U $newUser -d $newDb -f"
Invoke-Expression "$psqlFileCmd `"$sqlFile`""
Write-Host "Tables created."

$authSecret = [guid]::NewGuid().ToString()
# Backup the .env file if it exists
$envBackupPath = ".env.bak"
if (Test-Path $envBackupPath) {
    Remove-Item -Path $envBackupPath -Force
}
if (Test-Path ".env") {
    Move-Item -Path ".env" -Destination $envBackupPath
}

# Create the .env file with the connection details
$envFilePath = ".env"
$envContent = @"
PGHOST=$pgHost
PGPORT=$pgPort
PGDATABASE=$newDb
PGUSER=$newUser
PGPASSWORD=$teramisPassword
NEXT_PUBLIC_URL="http://localhost:3000" # change as necessary
NEXTAUTH_URL="http://localhost:3000"    # change as necessary
NEXTAUTH_SECRET="$authSecret"
NEXT_PUBLIC_COMPANY_NAME="$companyName"   # change as appropriate
DATABASE_URL="postgresql://`${PGUSER}:`${PGPASSWORD}@`${PGHOST}:`${PGPORT}/`${PGDATABASE}"
"@
Set-Content -Path $envFilePath -Value $envContent
