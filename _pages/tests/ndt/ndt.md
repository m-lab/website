---
layout: page
permalink: /tests/ndt/
title: "NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# NDT (Network Diagnostic Tool)

NDT is a single stream performance measurement of a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}. NDT measures "single stream performance" or "bulk transport capacity". NDT reports upload and download speeds and latency metrics.

## Run an NDT Test

If you are interested in running an NDT test, please visit our standalone speed test site: [https://speed.measurementlab.net](https://speed.measurementlab.net){:target="_blank"}

## History

From 2009-2019, M-Lab has run the default [NDT server](https://github.com/ndt-project/ndt/){:target="_blank"} originally [developed by Internet2](https://software.internet2.edu/ndt/){:target="_blank"}. This version uses the [web100 linux kernel extension](https://dl.acm.org/citation.cfm?id=956993.957002){:target="_blank"} for gathering data points about the TCP connection.

In Nov. 2019, M-Lab launched a completely re-written [ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}, that provides the **ndt5** and **ndt7** protocols. After launching the updated server, the web100 kernel instrumentation was retired in favor of using [TCP_INFO](https://github.com/m-lab/tcp-info/){:target="_blank"}. NDT data collected by the `web100` protocol will remain in the M-Lab data archive and in BigQuery, along with NDT data from the `ndt5` and `ndt7` protocols.

## NDT Testing Protocols

As a part of our transition from the web100 version of NDT server to the new platform, M-Lab has named specific protocol versions for the original server and the new one we are now using.

* [web100]({{ site.baseurl }}/tests/ndt/web100) is the protocol refering to data collected by the current NDT server
* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) is a new NDT protocol designed to be backward compatible with past NDT clients
* [ndt7]({{ site.baseurl }}/tests/ndt/ndt7) is a new NDT protocol that uses TCP BBR where available in the network, and operates on TLS port 443 or via port 80, and uses TCP_INFO instrumentation for TCP statistics

## Source code

**NDT Server**
* [web100 historical ndt](https://github.com/ndt-project/ndt/){:target="_blank"}
* [ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}

**NDT Reference Clients**
* [ndt5-client-go](https://github.com/m-lab/ndt5-client-go){:target="_blank"}
* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go){:target="_blank"}
* [ndt7-js](https://github.com/m-lab/ndt7-js/){;target="_blank"}

## Citing the M-Lab NDT Dataset

Please cite the NDT data set as follows: **The M-Lab NDT Data Set, &lt;date range used&gt; https://measurementlab.net/tests/ndt**

or, in [BibTeX](https://en.wikipedia.org/wiki/BibTeX){:target="_blank"} format:

```bibtex
@misc{mlab,
        author="{Measurement Lab}",
        title="The {M}-{L}ab {NDT} Data Set",
        year="(2009-02-11 -- 2015-12-21)",
        howpublished="\url{https://measurementlab.net/tests/ndt}",

        comment="Depending on if you used viz.measurementlab.net, bigquery, or the raw data, please use one of the following notes:",
        note="Bigquery table {\tt measurement-lab.ndt.download}",
        note1="Google cloud storage {\tt gs://archive-measurement-lab/ndt}",
        note2="Data visualization system \url{https://viz.measurementlab.net}",
}
```

## Policies & Support Information

NDT is maintained by Measurement Lab, and is governed by the [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/).

Get support for NDT emailing [support@measurementlab.net](mailto:support@measurementlab.net).

## Data Collected by NDT

When you run NDT, the IP address provided by your Internet Service Provider will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote Internet research. NDT does not collect any information about you as an Internet user.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand what data is collected and how data is used before initiating a test.

## NDT Data in Raw Format

Data collected by NDT is available in raw format in Google Cloud Storage: [https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"}.

Advanced users may also be interested in obtaining raw M-Lab test data for detailed analyses. For example, TCP packet captures are conducted for each NDT test, and are only available in M-Lab’s raw data archives. Details on how M-Lab publishes test data in raw form is provided on our [Google Cloud Storage documentation page]({{ site.baseurl }}/data/docs/gcs).

## NDT Data in BigQuery

To make NDT data more readily available for research and analysis, M-Lab parses all NDT data into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/data/bq/quickstart/).

## Current BigQuery Tables/Views

Data collected by NDT is provided in multiple ways, each suited to specific segments of our community.

* **Faithful Views**
  * The base tables/views for each NDT data type, providing direct access to the unfiltered NDT data and the TCP INFO and Traceroute data associated with NDT tests.
  * Faithful views will be of interest mostly to researchers interested in all testing conditions and results.

* **Helpful Views**
  * A set of tables/views derived from "Faithful Views" that are pre-filtered to only provide the most commonly used fields, and which only show tests that meet our current, best understanding of test completeness and research quality. More details on what consititutes "research quality" is listed below in the Helpful Views section.
  * **The helpful views should be the starting point for most people**.

### Faithful Views

* [measurement-lab.ndt.ndt5](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=ndt5&page=table){:target="_blank"}
  * NDT data collected using the [ndt5 protocol]({{ site.basurl }}/tests/ndt/ndt5) on or after 2019-07-19, using tcp-info for all TCP metrics.
  * [ndt5 description and schema]({{ site.baseurl }}/tests/ndt/ndt5/#ndt5-bigquery-schema)
* [measurement-lab.ndt.web100](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=web100&page=table){:target="_blank"}
  * NDT data collected using the [web100 protocol]({{ site.baseurl }}/tests/ndt/web100), using the web100 Linux kernel patch for all TCP metrics.
  * `web100` is root BigQuery view from which all current "Helpful" views are derived.
  * [web100 description and schema]({{ site.baseurl }}/tests/ndt/web100/)
* [measurement-lab.ndt.ndt7 (coming soon)](#)
  * NDT data collected using the ndt7 protocol using tcp-info for all TCP metrics.
  * [ndt7 description and schema]({{ site.baseurl }}/tests/ndt/ndt7/#ndt7-bigquery-schema)
* [measurement-lab.ndt.tcpinfo](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=tcpinfo&page=table){:target="_blank"}
* [measurement-lab.ndt.traceroute](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=traceroute&page=table){:target="_blank"}

### Helpful Views

* [measurement-lab.ndt.unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}
* [measurement-lab.ndt.unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){:target="_blank"}
  * The _unified_downloads_ and _unified_uploads_ views provide our current best understanding of all NDT download and upload data across the entire platform over all time.
  * These views filter all tests present in the "Faithful" views to only tests that meet a standard of research quality as defined by our team:
    * At least 8 KB of data was transferred
    * Test duration was between 9 and 60 seconds
    * Congestion was detected
    * Tests with NULL results excluded
    * Tests from M-Lab Operations and Management infrastructure excluded
