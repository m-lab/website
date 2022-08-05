#!/usr/bin/env bash

set -e
tmpdir=$( mktemp -d )
echo "${SERVICE_ACCOUNT_mlab_oti}" > $tmpdir/sa.json

set -x
export GOOGLE_APPLICATION_CREDENTIALS=$tmpdir/sa.json
firebase use mlab-oti && firebase deploy --only hosting
