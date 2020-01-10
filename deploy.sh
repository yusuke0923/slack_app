echo 'start to deploy'
rsync -ra . --exclude './node_modules' yoshitani0923@153.126.209.67:~/project/myapp/. --verbose --delete-excluded
echo 'end to deploy'


