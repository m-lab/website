---
layout: page
permalink: /tests/paris_traceroute/
title: "Paris Traceroute"
breadcrumb: tests
---

# Paris Traceroute

Paris Traceroute was used by M-Lab to collect network path information for every connection used by the measurement tests running on the M-Lab platform until the fourth quarter of 2019 (Q42019). At that time, M-Lab replaced Paris-traceroute with the [Scamper](https://www.caida.org/tools/measurement/scamper/){:target="_blank"} traceroute tool provided by the [Center for Applied Internet Data Analysis, CAIDA](https://www.caida.org){:target="_blank"}. In addition to the route and network topology data provided by regular traceroute, Paris Traceroute detected load balancing, noting when a transmission was split between two paths.

More information about Paris Traceroute is available at: [http://www.paris-traceroute.net](http://www.paris-traceroute.net/){:target="_blank"}.

## Source code

* [https://paris-traceroute.net/download/](https://paris-traceroute.net/download/
){:target="_blank"}

## Citing the M-Lab Paris Traceroute Dataset

Please cite this data set as follows: **The M-Lab Paris Traceroute Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/paris_traceroute**

## Paris Traceroute Data in Raw Format

Data collected by Paris Traceroute remains available in raw format in Google Cloud Storage: [https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/](https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/){:target="_blank"}.

## Paris Traceroute Data in BigQuery

M-Lab parsed all Paris Traceroute data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/docs/bq/quickstart/).

BigQuery Tables/Views/Schema(s) for Paris Traceroute Data:

* [Paris Traceroute data in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=aggregate&t=traceroute&page=table){:target="_blank"}
