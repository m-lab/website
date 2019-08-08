---
layout: page
permalink: /data/
title: "Data"
page-title: "M-Lab Data"
menu-item: true
breadcrumb: data
---

# Overview

Measurement data from many experiments hosted on M-Lab are processed via the ETL pipeline and published in two forms:

* Google Cloud Storage
  * M-Lab publishes raw output from many measurement tests on Google Cloud Storage as file archives.
  * See [M-Lab Google Cloud Storage documentation]({{ site.baseurl }}/data/docs/gcs) for more information.
* Google BigQuery
  * M-Lab parses data for a subset of tests and publishes the data on BigQuery so that users can run SQL queries on the data.
  * See [M-Lab BigQuery QuickStart]({{ site.baseurl }}/data/docs/bq/quickstart) for more information.

Some M-Lab hosted tests do not use our ETL pipeline. Data for these tests are published independently by the test developers.

There is typically at least a 24-hour delay between data collection and data publication. Below we provide links to data for our **Active tests** and archival data from **Inactive tests**.

M-Lab also publishes public data sets about the M-Lab Platform, listed below.

## Measurement Data (Active Tests)

* [BISmark]({{site.baseurl}}/tests/bismark)
  * BISmark measures Internet service provider (ISP) performance and traffic inside home networks.
  * BISmark data is not processed by the M-Lab ETL Pipeline.
  * More information is available on the [Project BISmark website](http://projectbismark.net/){:target="_blank"} and on the [Project BISmark Open Development Portal](http://projectbismark.github.io/){:target="_blank"}
  * [BISmark Raw Data](http://uploads.projectbismark.net/){:target="_blank"}
* [MobiPerf]({{site.baseurl}}/tests/mobiperf)
  * MobiPerf is an open source application for measuring network performance on mobile platforms.
  * MobiPerf data is not processed by the M-Lab ETL Pipeline.
  * More information is available on the [MobiPerf website](http://www.mobiperf.com/){:target="_blank"}
  * [MobiPerf Raw Data](https://console.cloud.google.com/storage/browser/openmobiledata_public){:target="_blank"}
* [NDT]({{site.baseurl}}/tests/ndt)
  * Network Diagnostic Tool (NDT) measures characteristics of a TCP connection under heavy load.
  * NDT data is processed by the M-Lab ETL Pipeline.
  * More information is available at [Internet2](http://software.internet2.edu/ndt/){:target="_blank"} and [GitHub](https://github.com/ndt-project/ndt){:target="_blank"}.
  * [NDT Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/ndt/){:target="_blank"} - [NDT BigQuery Dataset](https://bigquery.cloud.google.com/dataset/measurement-lab:release)
* [NPAD]({{site.baseurl}}/tests/npad)
  * Network Path and Application Diagnosis (NPAD) diagnoses issues in a network path that can degrade network performance.
  * NPAD data is processed by the M-Lab ETL Pipeline.
  * More information is available from archived [UCAR](https://web.archive.org/web/20180714140225/https://www.ucar.edu/npad/){:target="_blank"} pages and [GitHub](https://github.com/npad/npad){:target="_blank"}.
  * [NPAD Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/npad/){:target="_blank"}
* [OONI]({{site.baseurl}}/tests/ooni)
  * OONI measures censorship, surveillance, and traffic manipulation on the Internet.
  * OONI data is not processed by the M-Lab ETL Pipeline.
  * More information is available at [OONI](https://ooni.torproject.org/){:target="_blank"}
  * [OONI Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/ooni/){:target="_blank"}
* [Paris Traceroute]({{site.baseurl}}/tests/paris_traceroute)
  * Paris Traceroute maps network topology between two points on the Internet.
  * Paris Traceroute data is processed by the M-Lab ETL Pipeline.
  * More information is available at [Paris Traceroute](http://www.paris-traceroute.net/){:target="_blank"}
  * [Paris Traceroute Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/paris-traceroute/){:target="_blank"} - [Paris Traceroute BigQuery Dataset](https://bigquery.cloud.google.com/table/measurement-lab:base_tables.traceroute){:target="_blank"}
* [Reverse Traceroute]({{site.baseurl}}/tests/reverse_traceroute)
  * Reverse traceroute measures the network path back to a user from selected network endpoints, and provides a rich source of information on network routing and topology.
  * Reverse Traceroute data is not processed by the M-Lab ETL Pipeline.
  * More information is available at [Reverse Traceroute](https://research.cs.washington.edu/networking/astronomy/reverse-traceroute.html){:target="_blank"}
  * [Reverse Traceroute Raw Data](https://console.cloud.google.com/storage/browser/m-lab_revtr){:target="_blank"}
* [SamKnows]({{site.baseurl}}/tests/samknows)
  * The SamKnows performance testing platform is used by the USA's Federal Communications Commission (FCC), European Commission, UK government (Ofcom), Brazilian government (Anatel), Singapore's IDA and other government-backed studies worldwide.
  * SamKnows infrastructure includes off-net test servers hosted by M-Lab, and the M-Lab and SamKnows teams coordinate regularly to support the various regulatory reporting periods of data collection conducted by SamKnows.
  * SamKnows data is not processed by the M-Lab ETL Pipeline.
  * More information is available at the [SamKnows website](https://www.samknows.com/){:target="_blank"}
* [SideStream]({{site.baseurl}}/tests/sidestream)
  * SideStream collects TCP state information about completed TCP connections on a system.
  * Sidestream data is processed by the M-Lab ETL Pipeline.
  * More information is available on [Github](https://github.com/npad/sidestream){:target="_blank"}.
  * [Sidestream Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/sidestream/){:target="_blank"} - [Sidestream BigQuery Dataset](https://bigquery.cloud.google.com/dataset/measurement-lab:sidestream){:target="_blank"}

## Measurement Data (Platform Data)

* [M-Lab Collectd](https://github.com/m-lab/collectd-mlab){:target="_blank"}
  * M-Lab Collectd is a monitoring tool for M-Lab slices, which collects resource utilization information about all M-Lab servers.
  * More information is available on [Github](https://github.com/m-lab/collectd-mlab){:target="_blank"}.
  * [M-Lab Collectd Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/utilization/){:target="_blank"}.
* [M-Lab DISCO Switch Telemetry Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/switch/){:target="_blank"}
  * Since June 2016, M-Lab has collected high resolution switch telemetry for each M-Lab server and site uplink and published it as the **DIS**card **CO**llection (a.k.a. DISCO) dataset.
  * More information is available in the [blog post announcing this dataset]({{site.baseurl}}/blog/disco-dataset/#new-disco-switch-telemetry-dataset) provides more information about the DISCO dataset.
  * [M-Lab DISCO Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/switch/){:target="_blank"} - [M-Lab DISCO BigQuery Dataset](https://bigquery.cloud.google.com/table/measurement-lab:base_tables.switch){:target="_blank"}

## Historical Data Sets (e.g. Retired Tests)

* [Glasnost]({{site.baseurl}}/tests/glasnost)
  * Glasnost detected prioritization or censorship of network traffic.
  * More information is available at [MPI SWS](http://broadband.mpi-sws.org/transparency/bttest-mlab.php){:target="_blank"} and [GitHub](https://github.com/marcelscode/glasnost){:target="_blank"}.
  * [Glasnost Raw Data (archived)](https://console.developers.google.com/storage/browser/archive-measurement-lab/glasnost/){:target="_blank"}
* [Neubot]({{site.baseurl}}/tests/neubot)
  * Neubot measured the Internet in order to gather data useful to study broadband performance, network neutrality, and Internet censorship.
  * More information is available at [Nexa Center](https://neubot.nexacenter.org/){:target="_blank"} and [GitHub](https://github.com/neubot){:target="_blank"}.
  * [Neubot Raw Data](https://console.developers.google.com/storage/browser/archive-measurement-lab/neubot/){:target="_blank"}
* [Pathload2]({{site.baseurl}}/tests/pathload2)
  * Pathload2 measured the available bandwidth of an Internet connection.
  * More information is available at [https://code.google.com/p/pathload2-gatech/](https://code.google.com/p/pathload2-gatech/){:target="_blank"}.
  * [Pathload2 Raw Data (archived)](https://console.developers.google.com/storage/browser/archive-measurement-lab/pathload2/){:target="_blank"}
* [ShaperProbe]({{site.baseurl}}/tests/shaperprobe)
  * ShaperProbe detected prioritization of network traffic.
  * [Shaperprobe Raw Data (archived)](https://console.developers.google.com/storage/browser/archive-measurement-lab/shaperprobe/){:target="_blank"}
* [Windrider]({{site.baseurl}}/tests/windrider)
  * WindRider attempted to detect whether your mobile provider was performing application- or service-specific differentiation.

## Data License and Citing M-Lab Data

All data collected by M-Lab tests are available to the public without restriction under a [No Rights Reserved Creative Commons Zero Waiver](http://creativecommons.org/about/cc0){:target="_blank"}.

Please cite M-Lab data sets as follows:

The M-Lab *test name* Data Set, *date range used*. *M-Lab test URL*

For example:

The M-Lab NDT Data Set 2009-02-11–2015-12-21. [https://measurementlab.net/tests/ndt]({{ site.baseurl }}/tests/ndt)
