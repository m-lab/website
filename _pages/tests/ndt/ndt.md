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

Originally developed at [Internet2](https://github.com/ndt-project/){:target="_blank"}, M-Lab has hosted NDT since our founding in 2009, and helped maintain and develop NDT for most of its history on the M-Lab platform. Over the last decade, there are three primary themes that have driven the evolution of NDT: standard kernel instrumentation, advances in TCP congestion control, and protocols and ports to support more clients. For more information, please see our blog post discussing the [Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt/).

## NDT Testing Protocols

As a part of our transition from the web100 version of NDT server to the new platform, M-Lab has named specific protocol versions for the original server and the new one we are now using.

* [web100]({{ site.baseurl }}/tests/ndt/web100) is the protocol refering to data collected by the current NDT server
  * Relied on the web100 kernel module for tcp statistics
  * Collected using the original version of NDT server
  * Used the Reno TCP congestion control algorithm
  * Retired in November 2019
* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) is a new NDT protocol designed to be backward compatible with past NDT clients
  * Relies on tcp-info for tcp statistics
  * Collected using M-Lab's re-written ndt-server, which follows the legacy NDT protocol to support existing NDT clients that use it
  * Uses the Cubic TCP congestion control algorithm
* [ndt7]({{ site.baseurl }}/tests/ndt/ndt7) is a new NDT protocol that uses TCP BBR where available, operates on standard HTTP(S) ports (80, 443), and uses TCP_INFO instrumentation for TCP statistics
  * Relies on tcp-info for tcp statistics
  * Collected using M-Lab's re-written ndt-server
  * Uses the BBR TCP congestion control algorithm, falling back to Cubic when BBR is not available in the client operating system

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
  * In BigQuery, Faithful Views are provided in datasets prepended with `raw_`
  * **Faithful views will be of interest mostly to researchers interested in all testing conditions and results**.

* **Helpful Views**
  * A set of tables/views derived from "Faithful Views" that are pre-filtered to only provide the most commonly used fields, and which only show tests that meet our current, best understanding of test completeness and research quality. More details on what constitutes "research quality" is listed below in the Helpful Views section.
  * In BigQuery, Helpful Views are provided in datasets labelled for each experiment (see the next sections of this document).
  * **Helpful views should be the starting point for most people**.

### Faithful Views

* measurement-lab.raw_ndt.ndt5 (coming soon)
  * Contains NDT data collected using the [ndt5 protocol]({{ site.basurl }}/tests/ndt/ndt5) on or after 2019-07-19, using tcp-info for all TCP metrics.
  * [ndt5 description and schema]({{ site.baseurl }}/tests/ndt/ndt5/#ndt5-bigquery-schema)
* measurement-lab.raw_ndt.ndt7 (coming soon)
  * Contains NDT data collected using the [ndt7 protocol]({{ site.basurl }}/tests/ndt/ndt5) using tcp-info for all TCP metrics.
  * [ndt7 description and schema]({{ site.baseurl }}/tests/ndt/ndt7/#ndt7-bigquery-schema)
* measurement-lab.raw_ndt.tcpinfo (coming soon)
  * Contains tcp-info data associated with all NDT measurements.
  * General [tcp-info description and schema]({{ site.basurl }}/tests/tcp-info)
* measurement-lab.raw_ndt.traceroute (coming soon)
  * Contains traceroute data associated with all NDT measurements.
  * General [tcp-info description and schema]({{ site.basurl }}/tests/traceroute)
* measurement-lab.raw_ndt.web100 (future)
  * Contains historical NDT data collected using the [web100 protocol]({{ site.baseurl }}/tests/ndt/web100), using the web100 Linux kernel patch for all TCP metrics.
  * [web100 description and schema]({{ site.baseurl }}/tests/ndt/web100/)

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

## Understanding and Using NDT Unified Views

The presenation of NDT data in the **unified views** described here represents
M-Lab's strategy for preserving test data as collected and annotated, and
curating views of that data to be used for attempting to answer various research
questions. To aide understanding of this strategy and how to use NDT unified
views, please see the links below:

* [Why and how of NDT unified views](unified-views-why)
* [Migrating from previous to current NDT unified views](migrate-queries-unified-views)
* [Creating Custom Unified Views or Subqueries for your own research](custom-views-subqueries)
* [Example Queries](example-queries)

[unified-views-why]: 
[migrate-queries-unified-views]:
[custom-views-subqueries]:
[example-queries]:

## Source Code

**NDT Server**
* [web100 historical ndt](https://github.com/ndt-project/ndt/){:target="_blank"}
* [ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}

**NDT Reference Clients**
* [ndt5-client-go](https://github.com/m-lab/ndt5-client-go){:target="_blank"}
* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go){:target="_blank"}
* [ndt7-js](https://github.com/m-lab/ndt7-js/){:target="_blank"}

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