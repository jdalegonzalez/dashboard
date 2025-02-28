
deploy_dir='./deploy'

if [ -d $deploy_dir ]; then
	echo "Removing existing deploy directory '${deploy_dir}'"
	rm -rf $deploy_dir 
fi

echo "Creating deploy directory '${deploy_dir}'"
mkdir $deploy_dir 

if [ ! -d ./.next ]; then
	echo "Can't find the .next folder.  Please build."
	exit 1
fi

echo "Copying the build folders"
cp -r ./.next $deploy_dir
cp -r ./node_modules $deploy_dir
cp ./package.json $deploy_dir
cp ./.env* $deploy_dir

# I wish this would work because it creates a 
# much smaller bundle but it doesn't support
# the dynamic features of the site.
#echo "Copying the built files"
#cp -r ./.next $deploy_dir 
#cp -r ./.next/static $deploy_dir/.next/standalone
#cp -r ./public $deploy_dir/.next/standalone

echo "You should be able to start the server by: 'cd ./next/standalone && node server.js'"
