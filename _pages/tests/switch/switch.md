---
layout: page
title: "Switch (DISCO) - BigQuery Schema"
permalink: /tests/switch/
breadcrumb: tests
---

# Switch (DISCO) BigQuery Schema

Since June 2016, M-Lab has collected high resolution switch telemetry for each M-Lab server and site uplink and published it as the DIScard COllection (a.k.a. DISCO) dataset. We publish this data in the `utilization` dataset in the `switch` BigQuery View(s).

## Source Code

The switch dataset is produced by the M-Lab Collectd monitoring tool, which can be found on Github: [https://github.com/m-lab/collectd-mlab](https://github.com/m-lab/collectd-mlab){:target="_blank"}.

## Switch (DISCO) Data in Raw Format

Switch (DISCO) data in raw format can be found in Google Cloud Storage: [https://console.developers.google.com/storage/browser/archive-measurement-lab/switch/](https://console.developers.google.com/storage/browser/archive-measurement-lab/switch/){:target="_blank"}.

## Switch (DISCO) Data in BigQuery

M-Lab parses all switch data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/docs/bq/quickstart/).

BigQuery Tables/Views for Switch Data:

* [Switch \(DISCO\) data in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=utilization&t=switch&page=table){:target="_blank"}
