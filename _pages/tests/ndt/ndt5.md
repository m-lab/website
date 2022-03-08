---
layout: page
permalink: /tests/ndt/ndt5/
title: "ndt5 Data - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt5 Data - NDT (Network Diagnostic Tool)

Since M-Lab's platform upgrade in 2019, the ndt5 protocol continues to support
many NDT clients that used earlier [NDT protocol versions][ndt-evolution].
Measurements from the ndt5 protocol are based on [TCP INFO][tcp-info]
instrumentation.

*NOTE*: New client integrations are strongly encouraged to use the [ndt7
protocol][ndt7-clients]{:target="_blank"} for better support, ease of
integraiton, and client performance.

* [ndt5 raw data in Cloud Storage][ndt5-storage]

[ndt-evolution]: {{ site.baseurl }}/blog/evolution-of-ndt/
[ndt5-server]: https://github.com/m-lab/ndt-server/tree/master/ndt5/
[ndt-server]: https://github.com/m-lab/ndt-server/
[tcp-info]: {{ site.baseurl }}/tests/tcp-info
[ndt5-storage]: https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/ndt5
[ndt5-table]: https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=ndt5&page=table
[ndt7-clients]: {{ site.baseurl }}/tests/ndt/#source-code

## ndt5 BigQuery Schema

* [ndt5 parsed & annotated dataset in BigQuery][ndt5-table]

<div class="table-responsive" markdown="1">
{% include schema_ndt5resultrowv2.md %}
</div>
