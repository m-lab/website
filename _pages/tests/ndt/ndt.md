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

Originally developed at
[Internet2](https://github.com/ndt-project/){:target="_blank"}, M-Lab has hosted
NDT since our founding in 2009, and helped maintain and develop NDT for most of
its history on the M-Lab platform. Over the last decade, there are three primary
themes that have driven the evolution of NDT: standard kernel instrumentation,
advances in TCP congestion control, and protocols and ports to support more
clients.
For more information, please see our blog post discussing the
[Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt/).

## NDT Testing Protocols

As a part of our transition from the web100 version of NDT server to the new platform, M-Lab has named specific protocol versions for the original server and the new one we are now using.

* [web100]({{ site.baseurl }}/tests/ndt/web100) is the protocol referring to data collected by the original NDT server
  * Relied on the web100 kernel module for TCP statistics
  * Collected using the original version of NDT server
  * Used the Reno TCP congestion control algorithm
  * Ran from 2009-02-18 to 2019-11-20.  The evolution to ndt5 was driven by staged server upgrades
* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) is a new NDT server designed to be backward compatible with past NDT clients
  * Relies on tcp-info for TCP statistics
  * Collected using M-Lab's re-written ndt-server, which follows the legacy NDT protocol to support existing NDT clients that use it
  * Uses the Cubic TCP congestion control algorithm
  * Started 2019-07-18 and continues to present.   The evolution to ndt7 is driven by client upgrades and is expected to have a very long tail
* [ndt7]({{ site.baseurl }}/tests/ndt/ndt7) is a new NDT protocol that uses TCP BBR where available, operates on standard HTTP(S) ports (80, 443)
  * Relies on tcp-info for TCP statistics
  * Collected using M-Lab's re-written ndt-server
  * Uses the BBR TCP congestion control algorithm, falling back to Cubic when BBR is not available in the client operating system
  * Started 2020-02-18

## Data Collected by NDT

When you run NDT, the IP address provided by your Internet Service Provider will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote Internet research. NDT does not collect any information about you as an Internet user.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand what data is collected and how data is used before initiating a test.

## Unparsed Raw NDT Data in GCS

All of the raw data and log files from the measurement fleet are archived in
their original format and available in [Google Cloud Storage](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"}.
As our parsing and analysis algorithms improve, M-Lab periodically reprocesses
all of this archived data.

Generally BigQuery rows indicate the locations of the raw data from which they
were derived. Dedicated users can reconstruct our analysis and in principle
fully replicate our parsers.  The raw data also includes TCP packet captures
(.pcap files) for most NDT tests, however the pcap files are not indexed in
BigQuery yet.  Details on how M-Lab publishes test data in raw form are provided
on our [Google Cloud Storage documentation page]({{ site.baseurl }}/data/docs/gcs).

## NDT Data in BigQuery

To make NDT data more readily available for research and analysis, M-Lab parses
all NDT data into BigQuery tables and views, and makes query access available
for free by subscription to a Google Group. Find out more about how to get
access on
our [BigQuery QuickStart page]({{ site.baseurl }}/data/bq/quickstart/).

Note that we sometimes use the terms "table" and "view" interchangeably: they
reflect different internal implementations, but due to billing and access controls
everything documented here as a table is actually presented as a view.

## Unified Views

The presentation of NDT data in the **unified views** described here represents
M-Lab's strategy for preserving test data as collected and annotated, and
curating views of that data to be used for attempting to answer various research
questions. To aide understanding of this strategy and how to use NDT unified
views, please see the links below:

* [How NDT Views Are Derived and Published][ndt-views]
* [Migrating Queries from Previous to Current NDT Unified Views][migrate-queries-unified-views]
* [NDT Unified Views Example Queries][example-queries]

[ndt-views]: {{ site.baseurl }}/tests/ndt/views
[migrate-queries-unified-views]: {{ site.baseurl }}/tests/ndt/views/migrate
[example-queries]: {{ site.baseurl }}/tests/ndt/views/examples

* NDT Unified Views are a set of views designed to easily support studies of the evolution of the
  Internet performance by geopolitical regions
* **Unified Views should be the starting point for most people**.
* Also called "Helpful Views" in some documentation
* They present computed performance metrics (e.g. data rate, loss rate,
  min RTT and more in the future)
* Use Standardized schema
* Upload and download are separated because the test details and data
  processing are different for each direction
* Assembled from all three ndt data sets (ndt7, ndt5 and web100)
* They are strict subsets (rows and columns removed) of the union of the
  Extended Views
* Curated to only include tests that meet our current, best understanding of
  correctness:
  * At least 8 KB of data was transferred (extends below 9.6 kbits/second)
  * Test duration was between 9 and 60 seconds
  * For downloads, some form of network congestion was detected (i.e. tests with only non-network bottleneck are excluded)
  * Tests with parser errors and NULL results are excluded
  * Tests from M-Lab Operations and Management (OAM) infrastructure are excluded

* In BigQuery, unified views are prepended with `unified_`:
  * [measurement-lab.ndt.unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}
  * [measurement-lab.ndt.unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){:target="_blank"}
* Unified views with suffixes resembling date codes are to support differential
  A/B testing across processing changes. They give researchers a easy way to
  detect if our canges have any affect on downstream research results.

For more background on unified views see the blogposts below, noting that some
of the terminology has evolved slightly since the blog posts.

* [Using M-Lab Data in Broadband Advocacy and Policy]({{ site.baseurl }}/blog/mlab-data-policy-advocacy/)
* [M-Lab Roadmap Update - Q4 2020]({{ site.baseurl }}/blog/roadmap-update/)
* [Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt/)
* [Introducing ndt7]({{ site.baseurl }}/blog/ndt7-introduction/)
* [Long Term Supported Schemas Using Standardized BigQuery Columns]({{ site.baseurl }}/blog/long-term-schema-support-standard-columns/)
* [NDT Unified Views Now Published]({{ site.baseurl }}/blog/new-ndt-unified-views/)

## Extended Views
  * Maximal: every row from the raw tables with added columns describing everything that we know about the data
  * No filters have been applied but every row is labeled with the selection criteria used by the unified views
  * Calculated metrics and other standard columns have been added: data rate, loss rate, minimum RTT, etc
  * Joined with geographical annotations
  * [Future] joined with traceroute and other data sets such as platform load telemetry and Internet health indicators
  * Schemas are supersets of the unified view schema and raw tables schemas; They differs per tool and raw parser version
  * Designed to support user implemented [Custom Universal Views]({{
    site.baseurl }}/tests/ndt/views/custom/)
  * In BigQuery, extended views are in the dataset measurement-lab.ndt_intermediate:
    * measurement-lab.ndt_intermediate.extended_ndt7_downloads
    * measurement-lab.ndt_intermediate.extended_ndt7_uploads
    * measurement-lab.ndt_intermediate.extended_ndt5_downloads
    * measurement-lab.ndt_intermediate.extended_ndt5_uploads
    * measurement-lab.ndt_intermediate.extended_web100_downloads
    * measurement-lab.ndt_intermediate.extended_web100_uploads
  * **The starting point for nearly all alternative analysis of M-Lab data should be private custom unified views built on Extended Views**
    * For guidance and examples please see: [Creating Custom Unified Views or Subqueries for Your Own Research][custom-views-subqueries]

[custom-views-subqueries]: {{ site.baseurl }}/tests/ndt/views/custom
  
## Raw Tables
  * The archived raw data parsed and imported into BigQuery
  * **They are provided for pedantic completeness but are no longer recommended for general use**
  * Also called "faithful views" in some documentation
  * Includes one row for every unique test that can be parsed, even if truncated or partially corrupted
  * Small number of added columns indicating parse errors and [future] metrics computed directly from the snap logs (web100 or tcp-info)
  * Currently web100 and ndt5 use the legacy parser
  * The schemas reflect the original structure of the archived raw data and differ per tool and parser version
  * They are subject to breaking changes
  * In BigQuery, Raw tables are provided in datasets appended with `_raw`.
    Tables appended with the string `_legacy` in their names were generated by
    the older parser and are slated to being completely replaced in the future:
    * measurement-lab.ndt_raw.ndt7 - [ndt7 description and schema]({{ site.baseurl }}/tests/ndt/ndt7/#ndt7-bigquery-schema)
    * measurement-lab.ndt_raw.legacy_ndt5 - [ndt5 description and schema]({{ site.baseurl }}/tests/ndt/ndt5/#ndt5-bigquery-schema)
    * measurement-lab.ndt_raw.legacy_web100 - [web100 description and schema]({{ site.baseurl }}/tests/ndt/web100/)
    * measurement-lab.ndt_raw.tcpinfo - [tcp-info description and schema]({{ site.basurl }}/tests/tcp-info)
    * measurement-lab.ndt_raw.traceroute - [traceroute description and schema]({{ site.basurl }}/tests/traceroute)
    * measurement-lab.ndt_raw.annotation - annotation description and schema
      (coming soon)

## Source Code

**NDT Server**
* [Current ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}
* [web100 historical ndt](https://github.com/ndt-project/ndt/){:target="_blank"}

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
}
```

## Policies & Support Information

NDT is maintained by Measurement Lab, and is governed by the [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/).

For support with NDT please email [support@measurementlab.net](mailto:support@measurementlab.net).
