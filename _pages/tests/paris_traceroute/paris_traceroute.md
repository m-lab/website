---
layout: page
permalink: /tests/paris_traceroute/
title: "Paris Traceroute"
breadcrumb: tests
---

# Paris Traceroute

Paris Traceroute collects network path information for every connection used by the measurement tests running on the M-Lab platform. In addition to the route and network topology data provided by regular traceroute, Paris Traceroute detects load balancing, noting when a transmission is split between two paths. Like SideStream, Paris Traceroute runs when another M-Lab test makes a connection with the platform.

More information about Paris Traceroute is available at: [http://www.paris-traceroute.net](http://www.paris-traceroute.net/){:target="_blank"}.

## Source code

* [https://paris-traceroute.net/download/](https://paris-traceroute.net/download/
){:target="_blank"}

## Citing the M-Lab Paris Traceroute Dataset

Please cite this data set as follows: **The M-Lab Paris Traceroute Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/paris_traceroute**

## Paris Traceroute Data in Raw Format

Data collected by Paris Traceroute is available in raw format in Google Cloud Storage: [https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/](https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/){:target="_blank"}.

## Paris Traceroute Data in BigQuery

M-Lab parses all Paris Traceroute data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/docs/bq/quickstart/).

BigQuery Tables/Views/Schema(s) for Paris Traceroute Data:

* [Paris Traceroute data in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=aggregate&t=traceroute&page=table){:target="_blank"}
* [Paris Traceroute schema]({{ site.baseurl }}/tests/paris_traceroute/schema)
