---
layout: page
title: "Utilization - BigQuery Schema"
permalink: /data/docs/bq/schema/utilization/
breadcrumb: data
---

# Utilization BigQuery Schema

Since June 2016, M-Lab has collected high resolution switch telemetry for each M-Lab server and site uplink and published it as the DIScard COllection (a.k.a. DISCO) dataset. We publish this data in the `utilization` dataset in the `switch` BigQuery View(s).

## Switch BigQuery Views

* [measurement-lab.utilization.switch](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=utilization&t=switch&page=table){:target="_blank"}

## Switch Schema - measurement-lab.utilization.switch

### Switch - measurement-lab.base_tables.switch

The switch table schema (also known as "DISCO", named after the "DIScard COllection" service that records the switch data).

<div class="table-responsive" markdown="1">

| Field name                                          |     Type     |  Description                                                                                                      |
|:----------------------------------------------------|:------------:|:----------------------------------------------|
| `partition_date`                                    | `date`  |  The day (in UTC) in which the data was loaded. |
| `test_id`                                           |  `string`    |  ID of the test. It represents the Google Cloud Storage path, M-Lab server, and file name of log that contains the data generated during the test (e.g. `2019/02/09/mlab1.yul02.measurement-lab.org/20190209T23:00:00-to-20190210T00:00:00-switch.json.gz`). |
| `task_filename`                                     | `string`     |  The raw data file in Google Cloud Storage from which the test row was parsed. |
| `parse_time`                                        | `timestamp`  |  Timestamp of when test data was parsed into BigQuery from Google Cloud Storage. |
| `parser_version`                                    | `string`     |  A link to the tagged version of the M-Lab ETL parser which processed the test row. |
| `log_time`                                          | `timestamp`  |  Never set for the switch data. The sample.timestamp should be used instead for the sample collection time. |
| `sample`                                            | `record`     |  A repeated record with the value and timestamp of each 10 second observation. Typically, there will be 360 samples per hour. Due to system maintenance, or machine restarts, some intervals may contain more or less samples. |
| `sample.timestamp`                                  | `timestamp`  |  Timestamp of the beginning of the 10 second time bin. |
| `sample.value`                                      | `float`      |  Delta value of the `metric` during this 10 second time bin. |
| `metric`                                            | `string`     |  The canonical metric name for samples, e.g. `switch.discards.uplink.tx` |
| `hostname`                                          | `string`     |  The fully qualified domain name of the machine that collected the data, e.g. `mlab2.abc01.measurement-lab.org`. |
| `experiment`                                        | `string`     |  The fully qualified domain name of the switch that produced the data, e.g. `s1.abc01.measurement-lab.org`. |

</div>
