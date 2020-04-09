---
layout: page
permalink: /tests/traceroute/
title: "Traceroute"
breadcrumb: tests
---

# Traceroute

For every connection to an M-Lab server, the Traceroute core service collects network path information from our server back to the client IP that initiated the connection. M-Lab uses the [Scamper](https://www.caida.org/tools/measurement/scamper/){:target="_blank"} traceroute tool provided by the [Center for Applied Internet Data Analysis, CAIDA](https://www.caida.org){:target="_blank"}. The Scamper Traceroute tool has been in use by M-Lab since the fourth quarter of 2019 (Q42019). Prior to Q42019, M-Lab used the [Paris Traceroute]({{ site.baseurl }}/tests/paris_traceroute) tool for this core service.

## Source code

* [https://www.caida.org/tools/measurement/scamper/](https://www.caida.org/tools/measurement/scamper/){:target="_blank"}

## Citing the M-Lab Traceroute Dataset

Please cite this data set as follows: **The M-Lab Traceroute Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/traceroute**

## Traceroute Data in Raw Format

Data collected by Traceroute is available in raw format in Google Cloud Storage for each hosted measurement service:

* M-Lab Host Server - [https://console.cloud.google.com/storage/browser/archive-measurement-lab/host/traceroute/](https://console.cloud.google.com/storage/browser/archive-measurement-lab/host/traceroute/){:target="
_blank"}
* NDT - [https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/traceroute/](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/traceroute/){:target="
_blank"}
* Neubot - [https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot/traceroute/?project=measurement-lab](https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot/traceroute/){:target="
_blank"}
* WeHe- [https://console.cloud.google.com/storage/browser/archive-measurement-lab/wehe/traceroute/?project=measurement-lab](https://console.cloud.google.com/storage/browser/archive-measurement-lab/wehe/traceroute/){:target="
_blank"}

## Traceroute Data in BigQuery

M-Lab parses all Traceroute data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/docs/bq/quickstart/).

BigQuery Tables/Views/Schema(s) for Traceroute Data:

* M-Lab Host Server Traceroute data - [measurement-lab.aggregate.traceroute](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=aggregate&t=traceroute&page=table){:target="_blank"}
* NDT Traceroute data - [measurement-lab.ndt.traceroute](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&p=measurement-lab&d=ndt&t=tcpinfo&page=table){:target="_blank"}

## Traceroute Schema

The table below describes the fields in: `measurement-lab.aggregate.traceroute`.

<div class="table-responsive" markdown="1">
Coming soon.
</div>