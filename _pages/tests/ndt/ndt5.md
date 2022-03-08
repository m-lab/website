---
layout: page
permalink: /tests/ndt/ndt5/
title: "ndt5 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt5 Protocol - NDT (Network Diagnostic Tool)

The ndt5 protocol in the [ndt-server][ndt5-server]{:target="_blank"} supports
many NDT clients which used the previous NDT server based on web100. As a part
of M-Lab's platform upgrade in 2019, [ndt-server][ndt-server]{:target="_blank"}
replaced the web100 based ndt4 protocol with the ndt5 protocol based on [TCP
INFO][tcp-info]{:target="_blank"}. New client integrations are encouraged to use
the [ndt7 protocol][ndt7-clients]{:target="_blank"}.

NDT data collected before **2019-07-19** used the Web100 Linux kernel patch for
TCP instrumentation. This data can be found in the [NDT web100 dataset]({{
site.baseurl }}/tests/ndt/web100).

NDT data using the ndt5 protocol collected on or after **2019-07-19** uses
[tcp-info][tcp-info]{:target="_blank"} for all TCP instrumentation and is
available in both [raw format in Google Cloud Storage][cloud-storage]{:target="_blank"}
and in [queryable format in BigQuery][bqtable]{:target="_blank"}.

[ndt5-server]: https://github.com/m-lab/ndt-server/tree/master/ndt5/
[ndt-server]: https://github.com/m-lab/ndt-server/
[tcp-info]: {{ site.baseurl }}/tests/tcp-info
[cloud-storage]: https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt
[bqtable]: https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=ndt5&page=table
[ndt7-clients]: {{ site.baseurl }}/tests/ndt/#source-code

## ndt5 BigQuery Schema

<div class="table-responsive" markdown="1">
{% include schema_ndt5resultrowv2.md %}
</div>
