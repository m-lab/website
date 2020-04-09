---
layout: page
title: "M-Lab Dataset Schemas and Changelog"
permalink: /data/docs/bq/schema/
breadcrumb: data
---

# M-Lab Dataset Schemas and Changelog

## How Data is Collected

* Each M-Lab test consists of a **client** and a **server**.
* Whenever an M-Lab user starts a test, the client and server interact to measure different aspects of that user's connection.
* A single user request triggers one or more **tests** (e.g., client-to-server test, server-to-client test).
* For each test, a server collects a **log**, and the test can be uniquely identified by its log filename.
* Timestamp fields are stored in our schema in UTC
* Time only fields are stored in milliseconds (ms)

## M-Lab Hosted BigQuery Datasets, Tables, and Views

M-Lab publishes BigQuery tables and views for tests that have implemented a parser in our [ETL pipeline](https://github.com/m-lab/etl){:target="_blank"}. The following list provides links to schema pages for each test we publish to BigQuery. Additionally, M-Lab publishes some datasets for M-Lab "Core Services and Platform Data", that provide information about the M-Lab platform infrastructure. Please visit the page for each dataset's schema for more information.

### Measurement Data (Active Tests)

* [Network Diagnostic Tool (NDT)]({{ site.base_url }}/data/docs/bq/schema/ndt)

### Current M-Lab Core Services and Platform Data

* [Switch Utilization]({{ site.base_url }}/data/docs/bq/schema/utilization)
* [TCP INFO]({{ site.base_url }}/tests/tcp-info/)
* [Traceroute]({{ site.base_url }}/data/docs/bq/schema/traceroute)

### Retired Core Services and Platform Data for Historical Analysis

* [Sidestream]({{ site.base_url }}/data/docs/bq/schema/sidestream)

## M-Lab BigQuery Schemas - Changelog

### [v5] - 2020-04

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