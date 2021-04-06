---
layout: page
title: "M-Lab Dataset Schemas and Changelog"
permalink: /data/docs/bq/schema/
breadcrumb: data
---

# M-Lab Dataset Schemas and Changelog

## How Data is Collected

* Each M-Lab test consists of a **client** and a **server**.
* Whenever an M-Lab user starts a test, the client and server interact to measure different aspects of that user's connection.
* A single user request triggers one or more **tests** (e.g., client-to-server test, server-to-client test).
* For each test, a server collects a **log**, and the test can be uniquely identified by its log filename.
* Timestamp fields are stored in our schema in UTC
* Time only fields are stored in milliseconds (ms)

## M-Lab Hosted BigQuery Datasets, Tables, and Views

M-Lab publishes BigQuery tables and views for tests that have implemented a parser in our [ETL pipeline](https://github.com/m-lab/etl){:target="_blank"}. The following list provides links to schema pages for each test we publish to BigQuery. Additionally, M-Lab publishes some datasets for M-Lab "Core Services and Platform Data", that provide information about the M-Lab platform infrastructure. Please visit the page for each dataset's schema for more information.

### Measurement Data (Active Tests)

* [Network Diagnostic Tool (NDT)]({{ site.base_url }}/tests/ndt)
  * [web100 protocol schema]({{ site.baseurl }}/tests/ndt/web100/#web100-ndt-bigquery-schema)
  * [ndt5 protocol schema]({{ site.baseurl }}/tests/ndt/ndt5/#ndt5-bigquery-schema)
  * [ndt7 protocol schema]({{ site.baseurl }}/tests/ndt/ndt7/#ndt7-bigquery-schema)

### Current M-Lab Core Services and Platform Data

* [Switch Utilization]({{ site.base_url }}/data/docs/bq/schema/utilization)
* [TCP INFO]({{ site.base_url }}/tests/tcp-info/)
* [Traceroute]({{ site.base_url }}/data/docs/bq/schema/traceroute)

### Retired Core Services and Platform Data for Historical Analysis

* [Sidestream]({{ site.base_url }}/data/docs/bq/schema/sidestream)
