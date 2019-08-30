---
layout: page
permalink: /tests/ndt/ndt5/
title: "ndt5 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt5 Protocol - NDT (Network Diagnostic Tool)

The ndt5 protocol in [ndt-server](https://github.com/m-lab/ndt-server/tree/master/ndt5/){:target="_blank"} supports the many NDT clients which use the previous web100 legacy NDT server. As a part of M-Lab's platform upgrade in 2019, [ndt-server](https://github.com/m-lab/ndt-server/){:target="_blank"} replaced the former web100 based ndt4 protocol with the ndt5 protocol, and added the ndt7 protocol for future client use. New clients are encouraged to use the [ndt7 protocol]({{ site.baseurl }}/tests/ndt/ndt7).

NDT data collected before **2019-07-19** used the Web100 Linux kernel patch for TCP statistics. This data can be found in the [NDT web100 (legacy) dataset]({{ site.baseurl }}/tests/ndt/web100).

NDT data using the ndt5 protocol collected on or after **2019-07-19** uses [tcp-info]({{ site.baseurl }}/learn) for all TCP metrics.

More details about the ndt5 protocol can be found in the [README for ndt5 on Github](https://github.com/m-lab/ndt-server/tree/master/ndt5#ndt5-metrics){:target="_blank"}.

## Additional ndt5 Resources

* [ndt5 in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=ndt5&page=table){:target="_blank"}
* [ndt5 schema]({{ site.baseurl }}/tests/ndt/schemas/faithful/ndt5)