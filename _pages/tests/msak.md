---
layout: page
permalink: /tests/msak/
title: "MSAK"
breadcrumb: tests
---

# MSAK (Measurement Swiss-Army Knife)

MSAK is a measurement service hosted by M-Lab that implements two different test protocols:

* **throughput**: A configurable Websocket-based throughput measurement protocol capable of multi-stream tests. Its design is partially based on M-Lab's single-stream measurement protocol, [NDT](ndt/ndt.md). Configurable parameters currently include:
  * Number of streams
  * Congestion control algorithm
  * Test duration
  * Per-stream byte limit
* **latency**: A UDP-based latency measurement protocol.

## Run an MSAK throughput test

If you are interested in running an MSAK test, please visit our
[official speedtest](https://speed.measurementlab.net){:target="_blank"}.

We also provide a standalone Go client on the [Github repository](https://github.com/m-lab/msak/){:target="_blank"}.

## Data collected by MSAK

When you run MSAK, the IP address provided by your Internet Service Provider will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote Internet research.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand what data is collected and how data is used before initiating a test.

## Raw data in Google Cloud Storage

All of the raw data and log files from the measurement fleet are archived in
their original format and publicly available:

* [throughput and latency results](https://console.cloud.google.com/storage/browser/archive-measurement-lab/autoload/v1/msak){:target="_blank"}
* [sidecar data](https://console.cloud.google.com/storage/browser/archive-measurement-lab/msak){:target="_blank"}, including tcpinfo snapshots
and PCAPs

Details on how M-Lab publishes test data in raw form are provided on our
[Google Cloud Storage documentation page]({{ site.baseurl }}/data/docs/gcs).

## MSAK data in BigQuery

To make MSAK data more readily available for research and analysis, M-Lab loads
it into BigQuery tables and views, and makes query access available for free by
subscription to a Google Group. The MSAK data is available in the following datasets:

* measurement-lab.msak
* measurement-lab.msak_raw

Find out more about how to get access on our
[BigQuery QuickStart page]({{ site.baseurl }}/quickstart/).

## Source code

* [MSAK server & client](https://github.com/m-lab/msak){:target="_blank"}
