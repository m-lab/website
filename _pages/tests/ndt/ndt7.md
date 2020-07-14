---
layout: page
permalink: /tests/ndt/ndt7/
title: "ndt7 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt7 Protocol - NDT (Network Diagnostic Tool)

ndt7 is a new protocol in [ndt-server](https://github.com/m-lab/ndt-server/tree/master/ndt7/){:target="_blank"} that uses TCP BBR where available and collects TCP statistics using TCP_INFO.

ndt7 test data has been collected since **2020-02-18** using [tcp-info]({{ site.baseurl }}/tests/tcp-info/) for all TCP metrics. Data from the ndt7 test will be made available in both raw format in Google Cloud Storage and in queryable format in BigQuery in the third quarter of 2020.

More details about the ndt7 protocol can be found in the [ndt7 protocol specification on Github](https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md){:target="_blank"}. Additional information about the [ndt7 data format](https://github.com/m-lab/ndt-server/blob/master/spec/data-format.md){:target="_blank"} is also available on Github.

## ndt7 BigQuery Schema

<div class="table-responsive" markdown="1">
{% include schema_ndt7resultrow.md %}
</div>
