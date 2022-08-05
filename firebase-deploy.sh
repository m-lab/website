#!/usr/bin/env bash

set -e
tmpfile=$( mktemp )
echo "${SERVICE_ACCOUNT_mlab_oti}" > $tmpfile

set -x
export GOOGLE_APPLICATION_CREDENTIALS=$tmpfile
firebase use mlab-oti && firebase deploy --only hosting
