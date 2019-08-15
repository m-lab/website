---
layout: page
permalink: /tests/ndt/
title: "NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# NDT (Network Diagnostic Tool)

NDT is a single stream performance measurement of a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}. NDT measures "single stream performance" or "bulk transport capacity". NDT reports upload and download speeds and latency metrics, and attempts to determine what problems limit speeds.

## History

From 2009-2019, M-Lab ran the default [NDT server](ndt-legacy){:target="_blank"} originally [developed by Internet2](i2){:target="_blank"}. This version used the [web100 linux kernel extension](web100linux){:target="_blank"} for gathering data points about the TCP connection. The web100 version of server has been decommissioned on M-Lab as of ##date##. However, data collected while it was in production is available in the `web100` tables referenced below.

In 2019, M-Lab launched a completely re-written [ndt-server](ndt-server){:target="_blank"}, providing the ndt5 and ndt7 protocols. M-Lab also transitioned hosted experiments to use the netlink socket and [TCP_INFO](tcp-info){:target="_blank"} kernel instrumentation in 2019, replacing our reliance on Web100.

[i2]: https://software.internet2.edu/ndt/
[web100linux]: https://dl.acm.org/citation.cfm?id=956993.957002
[ndt-legacy]: https://github.com/ndt-project/ndt/
[ndt-server]: https://github.com/m-lab/ndt-server
[tcp-info]: https://github.com/m-lab/tcp-info/

## NDT Testing Protocols

* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5)
* [ndt7]({{ site.baseurl }}/tests/ndt/ndt7)
* [web100]({{ site.baseurl }}/tests/ndt/web100) (legacy ndt, deprecated)

## Source code

* [web100 legacy ndt](ndt-legacy){:target="_blank"}
* [ndt-server](ndt-server){:target="_blank"}
* ndt reference clients
  * [Go](https://github.com/m-lab/ndt7-client-go){:target="_blank"}
  * [JavaScript](https://github.com/m-lab/ndt7-client-javascript){:target="_blank"}
  * [iOS](https://github.com/m-lab/ndt7-client-ios){:target="_blank"}
  * [Android](https://github.com/m-lab/ndt7-client-android){:target="_blank"}

## Citing the M-Lab NDT Dataset

Please cite the NDT data set as follows: **The M-Lab NDT Data Set, &lt;date range used&gt; https://measurementlab.net/tests/ndt**

## Data Collected by NDT

When you run NDT, the IP address provided by your Internet Service Provider will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote Internet research. NDT does not collect any information about you as an Internet user.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand what data is collected and how data is used before initiating a test.

## Accessing NDT Data

### Raw Format

Data collected by NDT is available in raw format in Google Cloud Storage: [https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"}.

Advanced users may also be interested in obtaining raw M-Lab test data for detailed analyses. For example, TCP packet captures are conducted for each NDT test, and are only available in M-Lab’s raw data archives. Details on how M-Lab publishes test data in raw form is provided on our [Google Cloud Storage documentation page]({{ site.baseurl }}/data/docs/gcs).

### BigQuery

To make NDT data more readily available for research and analysis, M-Lab parses all NDT data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/bq/quickstart/).

M-Lab provides two sets of BigQuery tables/views for NDT data:

* **Helpful tables/views** - _brief description_
  * downloads - [NDT downloads in BigQuery](ndt-downloads-helpful){:target="_blank"} \| [ndt downloads schema](ndt-downloads-schema)
    * A subset view of all NDT download tests from `measurement-lab.ndt.recommended` where:
      * At least 8 KB of data was transferred
      * Test duration was between 9 and 60 seconds
      * Congestion was detected
  * uploads - [NDT uploads in BigQuery](ndt-uploads-helpful){:target="_blank"} \| [ndt uploads schema](ndt-uploads-schema)
    * A subset view of all NDT upload tests from `measurement-lab.ndt.recommended` where:
    * A sensible total number of bytes was received (8192)
  * recommended - [NDT recommended in BigQuery](ndt-recommended-helpful){:target="_blank"} \| [ndt recommended schema](ndt-recommended-schema)
    * A subset view of all NDT upload and download tests from `measurement-lab.ndt.web100` where:
      * TCP end state is sensible
      * Test duration was between 9 and 60 seconds
    * except:
      * Internal M-Lab end-to-end monitoring tests
      * Tests not marked as blacklisted

[ndt-downloads-helpful]: https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=downloads&page=table
[ndt-downloads-schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5
[ndt-uploads-helpful]: https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=uploads&page=table
[ndt-uploads-schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5
[ndt-recommended-helpful]: https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=recommended&page=table
[ndt recommended schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5

* **Faithful tables/views** - _brief description_
  * ndt5 - [ndt5 in BigQuery](ndt5faithful){:target="_blank"} \| [ndt5 schema](ndt5schema)
    * _description_
  * ndt7 - [ndt7 in BigQuery](ndt7faithful){:target="_blank"} \| [ndt7 schema](ndt5schema)
    * _description_
  * web100 (legacy ndt) - [web100 in BigQuery](web100faithful){:target="_blank"} \| [web100 schema](web100schema)
    * _description_

[ndt5faithful]: https://console.cloud.google.com/bigquery?project=mlab-oti&p=mlab-oti&d=base_tables&t=result&page=table
[ndt5schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5
[ndt7faithful]: https://console.cloud.google.com/bigquery?project=mlab-oti&p=mlab-oti&d=base_tables&t=result&page=table
[ndt7schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5
[web100faithful]: https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=web100&page=table
[web100schema]: {{ site.baseurl }}/data/docs/bq/schema/ndt5
