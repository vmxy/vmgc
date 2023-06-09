#!/bin/bash

source /etc/profile
cd /app

if [ ! -f "/app/server.js" ]; then
    mv -f /root/app/package.json /app
    mv -f /root/app/server.js /app
    mv -f /root/app/dist /app
    mv -f /root/app/node_modules /app
    cp  /root/restart.sh /app
    
fi

#if [ ! -d "/app/dist" ]; then
#    ln -s /root/app/dist /app/dist
#fi

#npm install

pm2 stop server && pm2 delete server
pm2 flush
pm2 start /app/server.js --name server --max-memory-restart 500M --cron-restart="0 3 * * *"

pm2 log
