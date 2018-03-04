#!/bin/bash

FORK_URL="https://github.com/critzo/m-lab.github.io"
UPSTREAM_URL="https://github.com/m-lab/m-lab.github.io"
mkdir mlab-website
cd mlab-website
git clone --recursive $FORK_URL 
cd m-lab.github.io
git remote add upstream $UPSTREAM_URL
rm -rf .git/hooks/
cd .git && ln -s -f ../_hooks hooks && cd ../../
vagrant up
