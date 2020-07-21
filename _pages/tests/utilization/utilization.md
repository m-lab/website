---
layout: page
title: "Utilization Dataset"
permalink: /tests/utilization/
breadcrumb: tests
---

# Utilization Dataset

Since June 2016, M-Lab has collected high resolution switch telemetry for each M-Lab server and site uplink and published it as the `utilization` dataset, with one datatype table: `switch`.

## Utilization Data in Raw Format

Utilization data in raw format can be found in Google Cloud Storage: [https://console.developers.google.com/storage/browser/archive-measurement-lab/switch/](https://console.developers.google.com/storage/browser/archive-measurement-lab/utilization/){:target="_blank"}.

## Utilization Data in BigQuery

M-Lab parses all _switch_ utilization data into BigQuery, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/docs/bq/quickstart/).

BigQuery Tables/Views for Switch Data:

* [measurement-lab.utilization.switch](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=utilization&t=switch&page=table){:target="_blank"}

## Switch BigQuery Schema

{% include schema_switch.html %}

## Source Code

The switch dataset is produced by the M-Lab Collectd monitoring tool, which can be found on Github: [https://github.com/m-lab/collectd-mlab](https://github.com/m-lab/collectd-mlab){:target="_blank"}.
