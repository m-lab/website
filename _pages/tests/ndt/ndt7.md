---
layout: page
permalink: /tests/ndt/ndt7/
title: "ndt7 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt7 Protocol - NDT (Network Diagnostic Tool)

The ndt7 protocol in [ndt-server](https://github.com/m-lab/ndt-server/tree/master/ndt7/){:target="_blank"} supports the many NDT clients which use the previous web100 legacy NDT server. As a part of M-Lab's platform upgrade in 2019, [ndt-server](https://github.com/m-lab/ndt-server/){:target="_blank"} replaced the former web100 based ndt4 protocol with the ndt5 protocol, and added the ndt7 protocol for future client use. New clients will be encouraged to use the ndt7 protocol when completed reference clients are available for all major integrations.

ndt7 test data has been collected since **YYYY-MM-DD** uses [tcp-info]({{ site.baseurl }}/tests/tcp-info/) for all TCP metrics is available in both [raw format in Google Cloud Storage](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"} and in [queryable format in BigQuery](#){:target="_blank"}.

More details about the ndt7 protocol can be found in the [ndt7 protocol specification on Github](https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md){:target="_blank"}. Additional information about the [ndt7 data format](https://github.com/m-lab/ndt-server/blob/master/spec/data-format.md){:target="_blank"} is also available on Github.

## ndt7 BigQuery Schema

<div class="table-responsive" markdown="1">
{% include schema_ndtresultrow.md %}
</div>
