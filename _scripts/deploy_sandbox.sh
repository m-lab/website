#!/usr/bin/env bash
set -e # halt script on error

scp -i _deploy_key -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -rp _site/* root@35.208.229.232:/var/www/html/
