---
layout: page
permalink: /data/
title: "Data"
page-title: "M-Lab Data"
menu-item: true
breadcrumb: data
---

# Overview

M-Lab publishes its test data in two forms:

* Google Cloud Storage
  * M-Lab publishes raw output from its measurement tools on Google Cloud Storage as file archives.
  * See [M-Lab Google Cloud Storage documentation]({{ site.baseurl }}/data/docs/gcs) for more information.
* Google BigQuery
  * M-Lab parses data for a subset of its tools and publishes the data on BigQuery so that users can run SQL queries on the data.
  * See [M-Lab BigQuery QuickStart]({{ site.baseurl }}/data/docs/bq/quickstart) for more information.

There is typically at least a 24-hour delay between data collection and data publication.

## Links to Raw Data for M-Lab Tests

### Active Tests

* [M-Lab Collectd](https://console.developers.google.com/storage/browser/m-lab/utilization/){:target="_blank"}
  * mlab-collectd is a monitoring tool for M-Lab slices, which collects resource utilization information about all M-Lab servers.
  * More information is available on [Github](https://github.com/m-lab/collectd-mlab){:target="_blank"}.
* [Neubot](https://console.developers.google.com/storage/browser/m-lab/neubot/){:target="_blank"}
  * Neubot measures the Internet in order to gather data useful to study broadband performance, network neutrality, and Internet censorship.
  * More information is available at [Nexa Center](https://neubot.nexacenter.org/){:target="_blank"} and [Github](https://github.com/neubot){:target="_blank"}.
* [NDT](https://console.developers.google.com/storage/browser/m-lab/ndt/){:target="_blank"}
  * Network Diagnostic Tool (NDT) measures characteristics of a TCP connection under heavy load.
  * More information is available at [Internet2](http://software.internet2.edu/ndt/){:target="_blank"} and [Github](https://github.com/ndt-project/ndt){:target="_blank"}.
* [NPAD](https://console.developers.google.com/storage/browser/m-lab/npad/){:target="_blank"}
  * Network Path and Application Diagnosis (NPAD) diagnoses issues in a network path that can degrade network performance.
  * More information is available at [UCAR](https://web.archive.org/web/20180714140225/https://www.ucar.edu/npad/){:target="_blank"} and [Github](https://github.com/npad/npad){:target="_blank"}.
* [OONI](https://console.developers.google.com/storage/browser/m-lab/ooni/){:target="_blank"}
  * OONI measures censorship, surveillance, and traffic manipulation on the Internet.
  * More information is available at [OONI](https://ooni.torproject.org/){:target="_blank"}
* [Paris Traceroute](https://console.developers.google.com/storage/browser/m-lab/paris-traceroute/){:target="_blank"}
  * Paris Traceroute maps network topology between two points on the Internet.
  * More information is available at [Paris Traceroute](http://www.paris-traceroute.net/){:target="_blank"}
* [SamKnows](https://www.samknows.com/){:target="_blank"}
  * The SamKnows performance testing platform is used by the USA's Federal Communications Commission (FCC), European Commission, UK government (Ofcom), Brazilian government (Anatel), Singapore's IDA and other government-backed studies worldwide.
  * SamKnows infrastructure includes off-net test servers hosted by M-Lab, and the M-Lab and SamKnows teams coordinate regularly to support the various regulatory reporting periods of data collection conducted by SamKnows.
* [SideStream](https://console.developers.google.com/storage/browser/m-lab/sidestream/){:target="_blank"}
  * SideStream collects TCP state information about completed TCP connections on a system.
  * More information is available on [Github](https://github.com/npad/sidestream){:target="_blank"}.

### Inactive Tests

* [Glasnost](https://console.developers.google.com/storage/browser/m-lab/glasnost/){:target="_blank"} (**deprecated**)
  * Glasnost detects prioritization or censorship of network traffic.
  * More information is available at [MPI SWS](http://broadband.mpi-sws.org/transparency/bttest-mlab.php){:target="_blank"} and [Github](https://github.com/marcelscode/glasnost){:target="_blank"}.
* [pathload2](https://console.developers.google.com/storage/browser/m-lab/pathload2/){:target="_blank"} (**deprecated**)
  * **M-Lab no longer supports this tool, but its archived data are available on GCS. For similar measurements with a current and supported tool, see NDT.**
  * Pathload2 measures the available bandwidth of an Internet connection.
  * More information is available at [https://code.google.com/p/pathload2-gatech/](https://code.google.com/p/pathload2-gatech/){:target="_blank"}.
* [ShaperProbe](https://console.developers.google.com/storage/browser/m-lab/shaperprobe/){:target="_blank"} (**deprecated**)
  * **M-Lab no longer supports this tool, but its archived data are available on GCS.**
  * ShaperProbe detected prioritization of network traffic.

## Data License and Citing M-Lab Data

All data collected by M-Lab tests are available to the public without restriction under a [No Rights Reserved Creative Commons Zero Waiver](http://creativecommons.org/about/cc0){:target="_blank"}.

Please cite M-Lab data sets as follows:

The M-Lab *test name* Data Set, *date range used*. *M-Lab test URL*

For example:

The M-Lab NDT Data Set 2009-02-11–2015-12-21. [https://measurementlab.net/tests/ndt]({{ site.baseurl }}/tests/ndt)
