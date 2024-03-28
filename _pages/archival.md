---
layout: page
title: Archival Data
permalink: /data/docs/archival-data/
breadcrumb: data
---

# Archival Data
M-Lab publishes all data it collects in raw form as archives on Google Cloud Storage (GCS) at the following location:

[https://console.developers.google.com/storage/browser/archive-measurement-lab/](https://console.developers.google.com/storage/browser/archive-measurement-lab/){:target="_blank"}

## Acceptable Use Policy

Access to the M-Lab raw data archives requires accepting the [Acceptable Use Agreement](https://docs.google.com/forms/d/e/1FAIpQLSfDGsEqfE3Lh3qtRSMy621O_bzBMZtnrw5sDgR42tGWpymJ2w/viewform). Accepting this agreement helps the M-Lab team ensure responsible use of our data resources and better understand data usage needs and patterns. If you have any questions or need support accessing the data, contact M-Lab for support: [support@measurementlab.net](mailto:support@measurementlab.net).

User Responsibilities:

* Authenticated access: Your email address is required to access M-Lab's data, and usage will be monitored by the M-Lab team.
* Responsible Resource Use: M-Lab has been collecting large amounts of data since 2008. Please exercise caution when using the raw data by refraining from executing large downloads or attempting to download the entire M-Lab public archive. Such actions can put excessive strain on resources and impact accessibility for others. M-Lab monitors usage and may remove access without warning if it is excessive.

## File Layout

All M-Lab files are packaged and compressed in [.tar format](https://en.wikipedia.org/wiki/Tar_%28computing%29){:target="_blank"}. They are placed in folders and named according to the following schema:

`[tool]/[YYYY]/[MM]/[DD]/[YYYYMMDD]T[HHMMSS]-[server]-[tool]-[file index].tgz`

* `tool`: The measurement tool that generated the data
* `YYYYMMDDTHHMMSS`: Start of the time window in which the data were collected
* `server`: M-Lab server that collected the data
* `file index`: Index of the file

This means that each compressed .tgz file contains all the data collected during a single day, by a single tool running on a single M-Lab server.

If the data collected during one day by one tool on one server are more than 1 GB (uncompressed), the files are split into multiple compressed .tgz files of up to 1 GB in size.

For example, the compressed .tgz file `20090218T000000Z-mlab1-lga01-ndt-0000.tgz` contains the first 1 GB of data collected by all the NDT tests that were served by the M-Lab server mlab1-lga01 on Feb 18, 2009.

## Accessing Data Programmatically

### Accessing Data with `gsutil`

The easiest way to access M-Lab data on GCS programmatically is by using the [`gsutil`](https://cloud.google.com/storage/docs/gsutil) command-line utility.

Authorization is required to run `gsutil` commands.

Users who have accepted the [Acceptable Use Agreement](https://docs.google.com/forms/d/e/1FAIpQLSfDGsEqfE3Lh3qtRSMy621O_bzBMZtnrw5sDgR42tGWpymJ2w/viewform) can run the `gcloud auth login $ACCOUNT` command to obtain access through an interactive workflow.

Fully programmatic (non-interactive) access requires a service account. Contact [support@measurementlab.net](mailto:support@measurementlab.net) if you need to request one. Please include a justification and a contact email in your message. M-Lab staff will provide you with an account ID and a credentials key file. The file will be needed for authorization.

~~~ shell
# Authorize access.
$ gcloud auth login --cred-file=$CREDENTIALS_FILE

# List the contents of the M-Lab NDT data in GCS.
$ gsutil ls -l gs://archive-measurement-lab/

# Copy a file from GCS locally.
$ gsutil cp gs://archive-measurement-lab/ndt/2009/02/18/20090218T000000Z-mlab1-lga01-ndt-0000.tgz .
~~~

### Accessing Data With Common HTTP Tools

The URLs shown in [M-Lab's GCS web interface](https://console.developers.google.com/storage/browser/archive-measurement-lab/){:target="_blank"} require the user to be logged in, which can present challenges when attempting to access the data with common HTTP utilities like `curl` or `wget`.

To access M-Lab files programatically, you will need to generate an OAuth 2.0 [access token](https://cloud.google.com/iam/docs/create-short-lived-credentials-direct#gcloud_2). The access token and the project will need to be passed in the request headers.

Additionally, you will need to replace `storage.cloud.google.com` with `storage.googleapis.com` in GCS URLs.

For example, if the URL of a raw NDT archive on the GCS web application is:

[https://storage.cloud.google.com/archive-measurement-lab/ndt/2018/11/01/20181101T000001Z-mlab3-lga07-ndt-0000.tgz](https://storage.cloud.google.com/archive-measurement-lab/ndt/2018/11/01/20181101T000001Z-mlab3-lga07-ndt-0000.tgz)

The request will be:

~~~ shell
 curl -H "X-Goog-User-Project: measurement-lab" -H "Authorization: Bearer $TOKEN" https://storage.googleapis.com/archive-measurement-lab/ndt/2018/11/01/20181101T000001Z-mlab3-lga07-ndt-0000.tgz
~~~

### GCS File Index

A list of all M-Lab files in GCS is available at:

[https://storage.googleapis.com/archive-measurement-lab/list/all_mlab_tarfiles.txt.gz](https://storage.googleapis.com/archive-measurement-lab/list/all_mlab_tarfiles.txt.gz)

This file provides gs:// URLs to M-Lab data.