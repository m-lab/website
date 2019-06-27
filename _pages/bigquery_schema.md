---
layout: page
title: "BigQuery Schemas"
permalink: /data/docs/bq/schema/
breadcrumb: data
---

# BigQuery Schemas

## Background

* Each M-Lab test consists of a **client** and a **server**.
* Whenever an M-Lab user starts a test, the client and server interact to measure different aspects of that user's connection.
* A single user request triggers one or more **tests** (e.g., client-to-server test, server-to-client test).
* For each test, a server collects a **log**, and the test can be uniquely identified by its log filename.
* Timestamp fields are stored in our schema in UTC
* Time only fields are stored in milliseconds (ms)

## M-Lab Hosted BigQuery Datasets, Tables, and Views

M-Lab publishes BigQuery tables and views for tests that have implemented a parser in our [ETL pipeline](https://github.com/m-lab/etl){:target="_blank"}. The following list provides links to schema pages for each test we publish to BigQuery. Please visit the page for each dataset's schema for more information.

* [Network Diagnostic Tool (NDT)]({{ site.base_url }}/data/docs/bq/schema/ndt)
* [Paris Traceroute]({{ site.base_url }}/data/docs/bq/schema/traceroute)
* [Sidestream]({{ site.base_url }}/data/docs/bq/schema/sidestream)

Additionally, M-Lab publishes the following datasets that provide information about M-Lab platform infrastructure.

* [Utilization]({{ site.base_url }}/data/docs/bq/schema/utilization)

## Datasets Hosted by Third-Party Researchers

Researchers who host their tests on the M-Lab platform have the option to host test results on M-Lab infrastructure as described in the previous section, or to host that data elsewhere. The M-Lab hosted tests below do not provide their data on M-Lab infrastructure. Please consult each project's website or contact their maintainers for information about these tests' schemas.

* [BISmark]({{site.baseurl}}/tests/bismark) - [Project BISmark website](http://projectbismark.net/){:target="_blank"}
* [MobiPerf]({{site.baseurl}}/tests/mobiperf) - [MobiPerf website](http://www.mobiperf.com/){:target="_blank"}
* [SamKnows]({{site.baseurl}}/tests/samknows) - [SamKnows website](https://www.samknows.com/){:target="_blank"}

## BigQuery Datasets Named Using M-Lab Measurement Services & Data Types

Datasets in the `measurement-lab` project in BigQuery are named for each measurement service, and views within each dataset contain data relevant to that service. Prior to May 2019, M-Lab published versioned tables and views in a dataset called `release`. The transition in our naming of datasets, tables, and views is [discussed on our blog]({{ site.baseurl }}/blog/bq-datasets). In brief, the table below summarizes our old and new datasets and tables/views as discussed on the blog.

<div class="table-condensed" markdown="1">

| Measurement Service | Old Datasets and Views          | New Datasets and Views        |
|:--------------------------|:------------------------------|:-------------------|
| NDT                 | * measurement-lab.base_tables.ndt<br>* measurement-lab.release.ndt_all<br>* measurement-lab.release.ndt_downloads<br>* measurement-lab.release.ndt_uploads<br>                      |* measurement-lab.ndt.web100<br>* measurement-lab.ndt.recommended<br>*  measurement-lab.ndt.downloads<br>* measurement-lab.ndt.uploads         |
| Paris Traceroute    |* measurement-lab.base_tables.traceroute |* measurement-lab.aggregate.traceroute  |
| Sidestream          |* measurement-lab.base_tables.sidestream |* measurement-lab.sidestream.web100 |
| Switch              |* measurement-lab.base_tables.switch |* measurement-lab.utilization.switch |

</div>

## M-Lab BigQuery Schemas - Changelog

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

### [v2.1] - 2016-11

* The field `blacklist_flags` was added to v2 per project "fast tables", and  historical data from 201001-01 to 2015-10-02 was re-parsed to add this annotation, due to a [switch discard issue related to traffic microbursts]({{ site.baseurl }}/blog/traffic-microbursts-and-their-effect-on-internet-measurement/).

### [v3] - 2017-05

* Began publication to new date partitioned table and updated schema to support the new, open source, ETL pipeline.
* Data publication to v2 tables stopped at this time.

### [v3.0.1] - 2017-10

* The schema for v3.0.1 tables was updated, removing an alpha feature called deltas, which attempted to log the differences between test snaplogs instead of the final test values. This feature will be revisited in future schema updates.
* Newly released data annotation engine added geolocation and some metadata to tests from 2016 to present.
* Published a series of beta BigQuery views for NDT data,  to allow data queries across both v2 and v3.0.x tables.
* Published traceroute and sidestream table to replace v2 versions, migrated data, re-annotated data.

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

### [v3.1] - 2018-02

* First official release of v3 tables, with all historical data re-parsed, and annotated with geolocation metadata.

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

### [v4] - 2019-05

* In previous [release convention]({{ site.baseurl }}/blog/etl-pipeline/#new-etl-pipeline-and-transition-to-new-bigquery-tables) a hierarchy of releases, release candidates “rc”, versioned release candidates, and versioned intermediate views were published, but they will cease being updated with new data starting May 6, 2019.
* BigQuery datasets named after M-Lab measurement services & data types.
* Each measurement service (ndt, traceroute, sidestream, utilization) will have a corresponding BigQuery dataset and view in the `measurement-lab` project, managed by our [data reprocessing service](https://github.com/m-lab/etl-gardener){:target="_blank"}.
* LegacySQL support is now deprecated, but a single LegacySQL view of the legacy data may be kept for historical purposes.
* Only StandardSQL is supported in any new views of the comprehensive reprocessed data.
* Views that combine legacy tables and recently parsed data will no longer be offered.
* Historically, Paris Traceroute data was collected for every measurement service. For this data type, a view in the `aggregate` dataset is now provided.
* Over the next year, M-Lab will restructure the traceroute schema to support reprocessing using the [Gardener service](https://github.com/m-lab/etl-gardener), and to unify the schema for historical and future data collection by [Scamper](https://www.caida.org/tools/measurement/scamper/){:target="_blank"}.
