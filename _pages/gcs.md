# Overview
M-Lab publishes all data it collected in raw form as archives on Google Cloud Storage (GCS).

* M-Lab GCS Bucket Root: [https://console.developers.google.com/storage/browser/m-lab/](https://console.developers.google.com/storage/browser/m-lab/)

# File Layout

All M-Lab files are packaged up in compressed tarballs. They are placed in folders and named according to the following schema:

`[tool]/[YYYY]/[MM]/[DD]/[YYYYMMDD]T[HHMMSS]-[server]-[tool]-[file index].tgz`

 * `tool`: The measurement tool that that generated the data.
 * `YYYYMMDDTHHMMSS`: Start of the time window in which the data was collected.
 * `server`: M-Lab server that collected the data.
 * `file index`: Index of the file.

This means that each tarball contains all the data collected during a single day, by a single tool running on a single M-Lab server.

If the data collected during one day by one tool on one server are more than 1GB (uncompressed), the files are split into multiple tarballs of up to 1 GB in size.

For example, the tarball `20090218T000000Z-mlab1-lga01-ndt-0000.tgz` contains the first 1 GB of data collected by all the NDT tests that were served by the M-Lab server mlab1-lga01 on Feb 18, 2009.

# Project Data

Direct links to each M-Lab project's raw data are available below:

* [Glasnost](https://console.developers.google.com/storage/browser/m-lab/glasnost/)
  * Glasnost detects prioritization or censorship of network traffic.
  * More information is available at [MPI SWS](http://broadband.mpi-sws.org/transparency/bttest-mlab.php) and [Github](https://github.com/marcelscode/glasnost).
* [NDT](https://console.developers.google.com/storage/browser/m-lab/ndt/)
  * Network Diagnostic Tool (NDT) measures characteristics of a TCP connection under heavy load.
  * More information is available at [Internet2](http://software.internet2.edu/ndt/) and [Github](https://github.com/ndt-project/ndt).
* [Neubot](https://console.developers.google.com/storage/browser/m-lab/neubot/)
  * Neubot measures the Internet in order to gather data useful to study broadband performance, network neutrality, and Internet censorship.
  * More information is available at [Nexa Center](https://neubot.nexacenter.org/) and [Github](https://github.com/neubot).
* [NPAD](https://console.developers.google.com/storage/browser/m-lab/npad/)
  * Network Path and Application Diagnosis (NPAD) diagnoses issues in a network path that can degrade network performance.
  * More information is available at [UCAR](http://www.ucar.edu/npad/) and [Github](https://github.com/npad/npad).
* [OONI](https://console.developers.google.com/storage/browser/m-lab/ooni/)
  * OONI measures censorship, surveillance and traffic manipulation on the Internet.
  * More information is available at [OONI](https://ooni.torproject.org/)
* [Paris Traceroute](https://console.developers.google.com/storage/browser/m-lab/paris-traceroute/)
  * Paris Traceroute maps network topology between two points on the Internet.
  * More information is available at [Paris Traceroute](http://www.paris-traceroute.net/).
* [pathload2](https://console.developers.google.com/storage/browser/m-lab/pathload2/) (*deprecated*)
  * *M-Lab no longer supports this tool, but its archived data is available on GCS. For similar measurements with a current and supported tool, see NDT.*
  * Pathload2 measures the available bandwidth of an Internet connection. 
  * More information is available at [https://code.google.com/p/pathload2-gatech/](https://code.google.com/p/pathload2-gatech/).
* [Shaperprobe](https://console.developers.google.com/storage/browser/m-lab/shaperprobe/) (*deprecated*)
  * *M-Lab no longer supports this tool, but its archived data is available on GCS.*
  * Shaperprobe detects prioritization of network traffic.
  * More information is available at [ShaperProbe](http://netinfer.net/diffprobe/shaperprobe.html)
* [SideStream](https://console.developers.google.com/storage/browser/m-lab/sidestream/)
  * SideStream collects TCP state information about completed TCP connections on a system.
  * More information is available on [Github](https://github.com/npad/sidestream).
* [mlab-collectd](https://console.developers.google.com/storage/browser/m-lab/utilization/)
  * mlab-collectd is a monitoring tool for M-Lab slices that collects resource utilization information about all M-Lab servers.
  * More information is available on [Github](https://github.com/m-lab/collectd-mlab).

# Accessing Data Programmatically

## Accessing Data with `gsutil`

The easiest way to access M-Lab data on GCS programmatically is by using the [`gsutil`](https://cloud.google.com/storage/docs/gsutil) command line utility.

```shell
# List the contents of the M-Lab NDT data in GCS.
$ gsutil ls -l gsutil ls -l gs://m-lab/

# Copy a file from GCS locally.
$ gsutil cp gs://m-lab/ndt/2009/02/18/20090218T000000Z-mlab1-lga01-ndt-0000.tgz .
```

## Accessing Data with Common HTTP Tools

The URLs shown in [M-Lab's GCS web interface](https://console.developers.google.com/storage/browser/m-lab/) require the user to be logged in, which can present challenges when attempting to access the data with common HTTP utilities like `curl` or `wget`.

You can access M-Lab files programmatically by replacing:

`storage.cloud.google.com/m/cloudstorage/b`

with

`storage.googleapis.com`

in any GCS URL.

For example, if the URL of a raw NDT archive on the GCS Web application is:

[https://storage.cloud.google.com/m/cloudstorage/b/m-lab/o/ndt/2015/12/28/20151228T000000Z-mlab1-lga04-ndt-0001.tgz](https://storage.cloud.google.com/m/cloudstorage/b/m-lab/o/ndt/2015/12/28/20151228T000000Z-mlab1-lga04-ndt-0001.tgz)

You can access it without authentication via this URL:

[https://storage.googleapis.com/m-lab/ndt/2015/12/28/20151228T000000Z-mlab1-lga04-ndt-0001.tgz](https://storage.googleapis.com/m-lab/ndt/2015/12/28/20151228T000000Z-mlab1-lga04-ndt-0001.tgz)

## GCS File Index

A list of all M-Lab files in GCS is available at:

[https://storage.googleapis.com/m-lab/list/all_mlab_tarfiles.txt.gz](https://storage.googleapis.com/m-lab/list/all_mlab_tarfiles.txt.gz)

This file provides `gs://` URLs to M-Lab data. To convert these URLs to `https://` URLs (compatible with common HTTP tools) you can convert the file using the following bash script:

```shell
$ curl https://storage.googleapis.com/m-lab/list/all_mlab_tarfiles.txt.gz | gunzip | \
while read; do echo ${REPLY/gs:\/\//https://storage.googleapis.com/}; done
```
