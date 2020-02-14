---
layout: page
permalink: /tests/ndt/
title: "NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# NDT (Network Diagnostic Tool)

NDT is a single stream performance measurement of a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}. NDT measures "single stream performance" or "bulk transport capacity". NDT reports upload and download speeds and latency metrics, and attempts to determine what problems limit speeds.

## Run an NDT Test

If you are interested in running an NDT test, please visit our standalone speed test site: [https://speed.measurementlab.net](https://speed.measurementlab.net){:target="_blank"}

## History

From 2009-2019, M-Lab has run the default [NDT server](https://github.com/ndt-project/ndt/){:target="_blank"} originally [developed by Internet2](https://software.internet2.edu/ndt/){:target="_blank"}. This version uses the [web100 linux kernel extension](https://dl.acm.org/citation.cfm?id=956993.957002){:target="_blank"} for gathering data points about the TCP connection.

By the end of 2019, M-Lab will launch a completely re-written [ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}, providing the ndt5 and ndt7 protocols. M-Lab also will transition hosted experiments to use the netlink socket and [TCP_INFO](https://github.com/m-lab/tcp-info/){:target="_blank"} kernel instrumentation in 2019, replacing our reliance on Web100. The web100 version of server will be decommissioned on M-Lab once `ndt-server` has been tested and launched. M-Lab will retain data collected while it was in production is available in the `web100` tables referenced below.

## NDT Testing Protocols

As a part of our transition from the web100 version of NDT server to the new platform, M-Lab has named specific protocol versions for the current server and the new one we are testing.

* [web100]({{ site.baseurl }}/tests/ndt/web100) is the protocol refering to data collected by the current NDT server
* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) is a new NDT protocol designed to be backward compatible with current clients
* ndt7 is a new NDT protocol that operates solely over TLS port 443, and will provide new measurement methods and capabilities

## Source code

* [web100 historical ndt](https://github.com/ndt-project/ndt/){:target="_blank"}
* [ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}

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

M-Lab BigQuery tables/views for NDT data are in transition as of Sept. 2019, as the team completes our [Global Pilot of the M-Lab 2.0 platform]({{ site.baseurl }}/blog/global-pilot-entry/). Below we provide two lists of BigQuery tables/views: our current tables and views, and those which M-Lab will transition to by the end of the global pilot.

## Current BigQuery Tables/Views

* **Helpful tables/views** - a set of tables/views that are pre-filtered for commonly used queries, and are derived from the "faithful" tables/views
  * [measurement-lab.ndt.downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=downloads&page=table){:target="_blank"}
    * A subset view of all NDT download tests from `measurement-lab.ndt.recommended` where:
      * At least 8 KB of data was transferred
      * Test duration was between 9 and 60 seconds
      * Congestion was detected

  * [measurement-lab.ndt.uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=uploads&page=table){:target="_blank"}
    * A subset view of all NDT upload tests from `measurement-lab.ndt.recommended` where a sensible total number of bytes was received (8192)

  * [measurement-lab.ndt.recommended](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=recommended&page=table){:target="_blank"}
    * A subset view of all NDT upload and download tests from `measurement-lab.ndt.web100` where:
      * TCP end state is sensible
      * Test duration was between 9 and 60 seconds
    * except:
      * Internal M-Lab end-to-end monitoring tests
      * Tests marked as blacklisted

## Planned BigQuery Tables/Views (Post M-Lab 2.0 Global Pilot)

* **Faithful tables/views** - the base tables/views for each NDT data type
  * [measurement-lab.ndt.web100](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=web100&page=table){:target="_blank"}
    * NDT data collected using the [web100 protocol]({{ site.baseurl }}/tests/ndt/web100), using the web100 Linux kernel patch for all TCP metrics.
    * `web100` is root BigQuery view from which all current "Helpful" views are derived.
    * [web100 description and schema]({{ site.baseurl }}/tests/ndt/web100/)
  * [measurement-lab.ndt.ndt5](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=ndt5&page=table){:target="_blank"}
    * NDT data collected using the [ndt5 protocol]({{ site.basurl }}/tests/ndt/ndt5) on or after 2019-07-19, using tcp-info for all TCP metrics.
    * [ndt5 description and schema]({{ site.baseurl }}/tests/ndt/schemas/faithful/ndt5)
  * ndt7 (coming soon)
    * NDT data collected using the ndt7 protocol using tcp-info for all TCP metrics.
    * _ndt7 description and schema_
