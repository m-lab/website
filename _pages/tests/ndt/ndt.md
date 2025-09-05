---
layout: page
permalink: /tests/ndt/
title: "NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# NDT (Network Diagnostic Tool)

NDT is a single stream performance measurement of a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}). NDT reports upload and download speeds and latency metrics.

## Run an NDT Test

If you are interested in running an NDT test, please visit our site: [https://speed.measurementlab.net](https://speed.measurementlab.net){:target="_blank"}

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

As a part of our transition from the web100 version of NDT server to the new
platform, M-Lab named specific protocol versions for the original server and
the new one we are now using. We now refer to these as "datatypes" for the NDT test.

* [web100]({{ site.baseurl }}/tests/ndt/web100) is the protocol referring to data collected by the original NDT server
  * Relied on the web100 kernel module for TCP statistics
  * Collected using the [original version of NDT server](https://github.com/m-lab/ndt)
  * Used the Reno TCP congestion control algorithm
  * Ran from 2009-02-18 to 2019-11-20
* [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) is an NDT protocol designed to be backward compatible with legacy NDT clients
  * Relies on [tcp-info][tcp-info] for TCP statistics
  * Collected using [ndt-server][ndt-server], which follows the legacy NDT protocol to support existing NDT clients that use it
  * Uses the Cubic TCP congestion control algorithm
  * Started 2019-07-18 and continues to present.
* [ndt7]({{ site.baseurl }}/tests/ndt/ndt7) is an NDT protocol that uses TCP BBR where available, operates on standard HTTP(S) ports (80, 443)
  * Relies on [tcp-info][tcp-info] for TCP statistics
  * Collected using [ndt-server][ndt-server]
  * Uses the BBR TCP congestion control algorithm, falling back to Cubic when BBR is not available on the client side
  * Client supports an [opt-in data transfer limit]({{ site.baseurl }}/blog/short-ndt/#introducing-data-transfer-limits-to-ndt)
  * Started 2020-02-18 and continues to present.

[ndt-server]: https://github.com/m-lab/ndt-server
[tcp-info]: {{ site.baseurl }}/tests/tcp-info


## Data Collected by NDT

When you run NDT, the IP address provided by your Internet Service Provider will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote Internet research. NDT does not collect any information about you as an Internet user.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand what data is collected and how data is used before initiating a test.

## Unparsed Raw NDT Data in GCS

All of the raw data and log files from the measurement fleet are archived in
their original format and available in [Google Cloud Storage](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"}.
As our parsing and analysis algorithms improve, M-Lab periodically reprocesses
all of this archived data.

Generally, BigQuery rows indicate the locations of the raw data from which they
were derived. Dedicated users can reconstruct our analysis and in principle
fully replicate our parsers. The raw data also includes TCP packet captures
(.pcap files) for most NDT tests, however the pcap files are not indexed in
BigQuery yet. Details on how M-Lab publishes test data in raw form are provided
on our [Google Cloud Storage documentation page]({{ site.baseurl }}/data/docs/gcs).

## NDT Data in BigQuery

To make NDT data more readily available for research and analysis, M-Lab parses
all NDT data into BigQuery tables and views, and makes query access available
for free (subject to a 10TB per user per day quota) by subscription to a Google Group.
Find out more about how to get access on our [BigQuery QuickStart page]({{ site.baseurl }}/quickstart/),
and see [Quota Strategies](#quota-strategies) for tips on managing usage efficiently.

Note that we sometimes use the terms "table" and "view" interchangeably: they
reflect different internal implementations, but due to billing and access controls
everything documented here as a table is actually presented as a view.

The presentation of NDT data in a series of datasets and views in BigQuery represents M-Lab's strategy
for data curation, providing a cleaned and filtered view of test results that can
be used to attempt answering the most common research questions of our
community requiring known good test results. By also preserving raw test data as
collected and annotated, and curating views in intermediate steps, we can also
support users whose research is concerned with unfiltered or non-curated tests.

<span style="color:black;">**We now publish three series of Datasets in BigQuery containing Views for NDT
data. These datasets and views mirror the processing stages of our ETL pipeline:**</span>

<div class="table-responsive" markdown="1">

| Dataset | Description |
|:--------|:------------|
| `measurement-lab.ndt.*` | [Unified Views](#unified-views) in the `ndt` dataset present a **stable, long term supported unified schema for all ndt datatypes** (web100, ndt5, ndt7), and filter to only provide tests meeting our team's current understanding of completeness & research quality as well as removing rows resulting from M-Lab's operations and monitoring systems. |
| `measurement-lab.ndt_intermediate.*` | [Extended Views](#extended-views) in the `ndt_intermediate` dataset join raw measurements with annotations, and remap column names across all ndt datatypes (web100, ndt5, ndt7) to provide a common schema for use in the Unified Views. **M-Lab does not guarantee long term supported schemas for Views in the ndt_intermediate dataset.** Researchers using these views should be aware that breaking schema changes in future releases may affect your queries. |
| `measurement-lab.ndt_raw.*` | [Raw Views](#raw-views) in the `ndt_raw` dataset provide a 1-to-1 mapping of tests contained in GCS archives to test rows. |

</div>

## Unified Views

NDT Unified Views are published in the `ndt` dataset, and are designed to easily
support studies of the evolution of the Internet performance by geopolitical regions.

<span style="color:black;">**Unified Views should be the starting point for most people.**</span>

**NDT Unified Views:**

* Use a standardized schema across all ndt datatypes (ndt7, ndt5 and web100)
* Present computed performance metrics (i.e. data rate, loss rate,
  min RTT and more in the future)
* Have **separate views for upload and download** because the test details and data
  processing are different for each direction
* Are strict subsets (rows and columns removed) of the union of the
  Extended Views
* Are curated to only include tests that meet our current, best understanding of
  completeness and research quality:
  * At least 8 KB of data was transferred (extends below 9.6 kbits/second)
  * Test duration was between 9 and 60 seconds
  * For downloads, some form of network congestion was detected (i.e. tests with
    only non-network bottleneck are excluded)
  * Tests with parser errors and NULL results are excluded
  * Tests from M-Lab Operations and Management (OAM) infrastructure are excluded
* Also called "Helpful Views" in past documentation and blog posts

In BigQuery, unified views are prepended with `unified_`:
  * [measurement-lab.ndt.unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}
  * [measurement-lab.ndt.unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){:target="_blank"}

Unified views with suffixes resembling dates (i.e. `unified_uploads_20201026x`)
are provided to support differential A/B testing across processing changes. They
give researchers a easy way to detect if our changes have any affect on
downstream research results.

For more background on unified views see the blog posts below, noting that some
of the terminology has evolved slightly since the blog posts.

* [Using M-Lab Data in Broadband Advocacy and Policy]({{ site.baseurl }}/blog/mlab-data-policy-advocacy/)
* [M-Lab Roadmap Update - Q4 2020]({{ site.baseurl }}/blog/roadmap-update/)
* [Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt/)
* [Introducing ndt7]({{ site.baseurl }}/blog/ndt7-introduction/)
* [Long Term Supported Schemas Using Standardized BigQuery Columns]({{ site.baseurl }}/blog/long-term-schema-support-standard-columns/)
* [NDT Unified Views Now Published]({{ site.baseurl }}/blog/new-ndt-unified-views/)

## Extended Views

NDT Extended Views are published in the `ndt_intermediate` dataset, and
contain every row from the raw views, with added columns
describing everything that we know about the data.

<span style="color: black;">**Custom unified views based on the NDT Extended Views
should be the starting point for nearly all alternative analyses of M-Lab
data.**</span>

For guidance and examples please see: [Creating Custom Unified Views or Subqueries for Your Own
Research][custom-views-subqueries]

**NDT Extended Views:**

* Have no filters applied but every row is labeled with the selection criteria
  used by the unified views
* Contain calculated metrics and other standard columns such as: data rate,
  loss rate, minimum RTT, etc.
* Are joined with geographical annotations
* In the Future will be joined with traceroute and other data sets such as platform load
  telemetry and Internet health indicators
* Have schemas are supersets of the unified view schema and raw tables schemas,
  differing per experiment and raw parser version
* Are designed to support user-implemented [Custom Unified Views]({{
  site.baseurl }}/tests/ndt/views/custom/)
* In BigQuery, extended views are in the dataset `measurement-lab.ndt_intermediate`:
  * `measurement-lab.ndt_intermediate.extended_ndt7_downloads`
  * `measurement-lab.ndt_intermediate.extended_ndt7_uploads`
  * `measurement-lab.ndt_intermediate.extended_ndt5_downloads`
  * `measurement-lab.ndt_intermediate.extended_ndt5_uploads`
  * `measurement-lab.ndt_intermediate.extended_web100_downloads`
  * `measurement-lab.ndt_intermediate.extended_web100_uploads`

[custom-views-subqueries]: {{ site.baseurl }}/tests/ndt/views/custom

## Raw Views

NDT Raw Views are published in the `ndt_raw` dataset, and provide a 1-to-1
mapping of tests contained in our [Google Cloud Storage
archives](https://console.developers.google.com/storage/browser/archive-measurement-lab/)
to test rows, and are the closest representation of archived raw test data that
has been parsed and imported into BigQuery.

<span style="color:black;">**NDT Raw Views are provided for completeness and transparency but are no longer recommended for general use.**</span>

**NDT Raw Views:**

* Include one row for every unique test that can be parsed, even if truncated or partially corrupted
* Contain a small number of added columns indicating parse errors and (_future_)
  metrics computed directly from the snap logs (web100 or tcp-info)
* The schemas reflect the original structure of the archived raw data and differ per tool and parser version
* They are subject to breaking changes
* Also called "faithful views" in past documentation and blog posts
* With names ending in `_legacy` were generated by an older parser version and
  are slated to be replaced in the future
* In BigQuery, raw views are in the dataset 'measurement-lab.ndt_raw`:
  * `measurement-lab.ndt_raw.ndt7`
  * `measurement-lab.ndt_raw.ndt5_legacy`
  * `measurement-lab.ndt_raw.web100_legacy`
  * `measurement-lab.ndt_raw.tcpinfo_legacy`
  * `measurement-lab.ndt_raw.paris1_legacy`
  * `measurement-lab.ndt_raw.annotation`

## Example Queries and Updating Past Queries

If you need examples or assistance updating past research queries to use our
current BigQuery Views, please review the pages below:

* [Migrating Queries from Previous to Current NDT Unified Views][migrate-queries-unified-views]
* [NDT Unified Views Example Queries][example-queries]

[migrate-queries-unified-views]: {{ site.baseurl }}/tests/ndt/views/migrate
[example-queries]: {{ site.baseurl }}/tests/ndt/views/examples

## Quota Strategies

While the [Unified Views](#unified-views) (`ndt.unified_uploads`
and `ndt.unified_downloads`) are the recommended long-term supported views,
they are also significantly more resource-intensive — queries against them
typically consume **10–20× more quota** than queries against the underlying
raw tables.

A good compromise, especially during the exploration phase of a project, is
to query the `ndt.ndt7` table (for data from 2020 onward) or the `ndt5` and
`web100` tables (for earlier periods). These tables use a schema very similar
to the unified views, and on large windows of analysis (aggregations of thousands
of samples or more) they produce results that are statistically almost identical.

One important difference is that the raw tables contain **both upload and download
measurements**. These can be separated using the `raw` field attributes. For
example, in ndt7 filtering with:
* `raw.Download.UUID IS NOT NULL` selects only download tests
* `raw.Upload.UUID IS NOT NULL` selects only upload tests

This approach allows researchers to conserve their daily quota while still
producing high-quality, reproducible results.

## Source Code

**NDT Server**
* [Current ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"}
* [web100 historical ndt](https://github.com/ndt-project/ndt/){:target="_blank"}

**NDT Reference Clients**
* [ndt5-client-go](https://github.com/m-lab/ndt5-client-go){:target="_blank"}
* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go){:target="_blank"}
* [ndt7-js](https://github.com/m-lab/ndt7-js/){:target="_blank"}

**NDT Community-Supported Clients**
* https://github.com/m-lab/ndt7-client-ios (swift)
* https://github.com/m-lab/ndt7-client-android (kotlin)
* https://github.com/m-lab/ndt7-client-android-java (java)
* https://github.com/measurement-kit/libndt/blob/master/single_include/libndt.hpp (c++, missing [Locate v2][locatev2] support, help welcome)

[locatev2]: https://github.com/m-lab/locate/blob/master/USAGE.md

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
<br>
## Policies & Support Information

NDT is maintained by Measurement Lab, and is governed by the [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/).

For support with NDT please email [support@measurementlab.net](mailto:support@measurementlab.net).

## Changelog for NDT Schemas in BigQuery

Generally, schemas for all M-Lab datasets are published as [tagged releases in
the etl-schema
repository](https://github.com/m-lab/etl-schema/releases) on Github.
This section outlines changes specific to NDT schemas over time.

### [v3.17] - https://github.com/m-lab/etl-schema/releases/tag/v3.17

* Renames publicly available datasets to mirror naming in our ETL process, and
  aligns alphabetical names of NDT datasets in BigQuery for better readability.
  * `ndt_intermediate` renamed. Previously named `intermediate_ndt`.
  * `ndt_raw` renamed. Previously named `raw_ndt`.
* Renames views in the `raw_ndt` dataset, adding the suffix, `_legacy` to raw
  views of data collected using now deprecated or legacy parsers and/or kernel
  instrumentation.
* Minor bug fixes to "Unified Views" in the `ndt` dataset.
  * `BQ_SAFE` operators were added to queries that generate NDT Unified Views
    to force any rows with corrupted geographic annotated fields to be
    expressed as NULLs.
  * Congestion Control Algorithm (CCA) for upload tests were reporting the
    server's Congestion Control Algorithm as the client's CCA. This was
    partially a legacy bug of the old web100 based tooling, that reported
    upload and download results in the same row. Upload tests will no longer
    contain the client CCA since it is not currently passed to the server at test time.
* Version numbers dropped from this changelog, and moving forward will transition to
providing detailed release notes on Github releases, replacing this changelog.

### [v3.11.0](https://github.com/m-lab/etl-schema/releases/tag/v3.11.0) - 2020-04

* Following the M-Lab 2.0 platform upgrade completed in November 2019
  * NDT data from the now deprecated web100 based [ndt](https://github.com/m-lab/ndt/) has been archived in the dataset `measurement-lab.ndt.web100`
  * NDT data from the new, TCP INFO based [ndt-server](https://github.com/m-lab/ndt-server/) is now provided in `measurement-lab.ndt.ndt5`
  * associated TCP INFO data for all ndt5 tests is now provided in `measurement-lab.ndt.tcpinfo`
* Views from web100 ndt are now deprecated, superceded by new "unified" views
  * The following Views provide access only to data from the web100 legacy platform:
    * `measurement-lab.ndt.recommended`
    * `measurement-lab.ndt.downloads`
    * `measurement-lab.ndt.uploads`
* Unified views of all NDT data published
  * Two new historical views of all NDT data are now available, and provide only NDT tests that meet our [criteria] for valid, research quality tests.
    * `measurement-lab.ndt.unified_downloads`
    * `measurement-lab.ndt.unified_uploads`

### [v4] - 2019-05

* In previous [release convention]({{ site.baseurl }}/blog/etl-pipeline/#new-etl-pipeline-and-transition-to-new-bigquery-tables) a hierarchy of releases, release candidates “rc”, versioned release candidates, and versioned intermediate views were published, but they will cease being updated with new data starting May 6, 2019.
* BigQuery datasets named after M-Lab measurement services & data types.
* Each measurement service (ndt, traceroute, sidestream, utilization) will have a corresponding BigQuery dataset and view in the `measurement-lab` project, managed by our [data reprocessing service](https://github.com/m-lab/etl-gardener){:target="_blank"}.
* LegacySQL support is now deprecated, but a single LegacySQL view of the legacy data may be kept for historical purposes.
* Only StandardSQL is supported in any new views of the comprehensive reprocessed data.
* Views that combine legacy tables and recently parsed data will no longer be offered.
* Historically, Paris Traceroute data was collected for every measurement service. For this data type, a view in the `aggregate` dataset is now provided.
* Over the next year, M-Lab will restructure the traceroute schema to support reprocessing using the [Gardener service](https://github.com/m-lab/etl-gardener), and to unify the schema for historical and future data collection by [Scamper](https://www.caida.org/tools/measurement/scamper/){:target="_blank"}.

### [v3.1.1] - 2018-07

* Publish official Switch tables from the DISCO dataset.

Published **tables** and views are:

* **measurement-lab.legacy.ndt** (data ~ 2015-01-01 - 2017-05-10)
* **measurement-lab.legacy.ndt_pre2015** (data ~ 2009-02-18 - 2014-12-31)
* **measurement-lab.base_tables.ndt**
* **measurement-lab.base_tables.switch**

* **measurement-lab.rc**
* **measurement-lab.release_v3_1**
* **measurement-lab.release**
  * _measurement-lab.release.ndt_all_
  * _measurement-lab.release.ndt_all_legacysql_
  * _measurement-lab.release.ndt_downloads_
  * _measurement-lab.release.ndt_downloads_legacysql_
  * _measurement-lab.release.ndt_uploads_
  * _measurement-lab.release.ndt_uploads_legacysql_

### [v3.1] - 2018-02

* First official release of v3 tables, with all historical data re-parsed, and annotated with geolocation metadata.

### [v3.0.2] - 2017-12

* Standardized the naming scheme for BigQuery table and view names to be consistent with new semantic versioning.
* All tables and views must be queried using StandardSQL, except for views with “legacysql” in the name.
* Views for tests other than NDT may be published in the future using the same format:
  * `<test>_all_<version>` (standardSQL)
  * `<test>_all_legacysql_<version>`
* Complete documentation for tables, views, the contents of views, and what data they limit (where applicable) will be published on this page.
* Views will be published concurrently with new table schemas, such that all table versions will have corresponding views.
* Previous versions of our tables will be referenced by versions 1.0, 2.0, etc. in our documentation but actual table names will not be changed.
* Re-ran historical annotations for traceroute, npad, and sidestream data due to a bug where some geolocation annotations was not present in all past test data.

### [v3.0.1] - 2017-10

* The schema for v3.0.1 tables was updated, removing an alpha feature called deltas, which attempted to log the differences between test snaplogs instead of the final test values. This feature will be revisited in future schema updates.
* Newly released data annotation engine added geolocation and some metadata to tests from 2016 to present.
* Published a series of beta BigQuery views for NDT data,  to allow data queries across both v2 and v3.0.x tables.
* Published traceroute and sidestream table to replace v2 versions, migrated data, re-annotated data.

### [v3] - 2017-05

* Began publication to new date partitioned table and updated schema to support the new, open source, ETL pipeline.
* Data publication to v2 tables stopped at this time.

### [v2.1] - 2016-11

* The field `blacklist_flags` was added to v2 per project "fast tables", and  historical data from 201001-01 to 2015-10-02 was re-parsed to add this annotation, due to a [switch discard issue related to traffic microbursts]({{ site.baseurl }}/blog/traffic-microbursts-and-their-effect-on-internet-measurement/).

### [v2] - 2016-03

* Began the publication of per project "fast tables" for NDT, NPAD, Paris Traceroute, and Sidestream.
  * `plx.google:m_lab.ndt.all`
  * `plx.google:m_lab.npad.all`
  * `plx.google:m_lab.paris-traceroute.all`
* Continued the publication of v1 monthly tables, and published a [migration guide]({{ site.baseurl }}/data/docs/bq/legacymigration/).
* Deprecated fields in v2 "fast tables":
  * `type`
  * `project`
  * `web100_log_entry.is_last_entry`
  * `web100_log_entry.group_name`
