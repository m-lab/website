---
layout: blog
title: "New ETL Pipeline, Transition to New BigQuery Tables"
author: "Chris Ritzo"
date: 2017-12-18
breadcrumb: blog
categories:
  - pipeline
  - bigquery
  - schema
---

# New ETL Pipeline, Transition to New BigQuery Tables
{% include post-meta.html %}

Since early summer, the M-Lab team has been working on an updated, open source pipeline, which pulls raw data from our servers, saves it to Google Cloud Storage, and then parses it into our BigQuery tables. The team is particularly excited about this update because it means that the pipeline no longer relies on closed source libraries.<!--more-->

The new open source ETL pipeline is one project in a larger initiative to update all components of the M-Lab platform. In this post, we’ll talk about our expected timeline for transitioning to our new tables and invite you to explore the new BigQuery tables, schema, metadata, and table features. We’ll also discuss future planned updates to the tables and their schemas, as we continue work to modernize and update the M-Lab platform software stack.

## Transitioning to New BigQuery Tables - Current Status and Anticipated Timeline

If you’ve been querying our data in the latter half of this year, you may have noticed that data in our current BigQuery table for NDT stops around the end of April 2017. At that point, as a part of our pipeline work, our team paused data publication and began parsing new test data into a new table with an updated schema and new BigQuery features.

The table `plx.google:m_lab.ndt.all` contains data up to May 10, 2017, and we have ceased publishing new data to it. New data is streaming into our new NDT table located at `measurement-lab:public.ndt`.

The old “fast table” data has also been copied to a pair of cloud BigQuery tables:

* [measurement-lab:legacy.ndt](https://bigquery.cloud.google.com/table/measurement-lab:legacy.ndt) and
* [measurement-lab:legacy.ndt_pre2015](https://bigquery.cloud.google.com/table/measurement-lab:legacy.ndt_pre2015).

These tables contain the identical data to the `plx.google:m_lab.ndt.all` table, but with a schema that includes the new fields in the new `measurement-lab:public.ndt` table. The table had to be split in two because we are using "date partitioned tables" to improve query efficiency and ease of updates.  The table `measurement-lab:legacy.ndt` contains all data from January 1, 2015 to May 10, 2017, and the table `measurement-lab:legacy.ndt_pre2015` contains all data prior to 2015.

## Implementing Table Versioning and Corresponding BigQuery Views

While working on completing the transition to new tables, we've standardized on version numbers for our past and current table schemas. This versioning will also apply to BigQuery Views, to ensure data users will have clarity on what version of our tables is being queried over time as schemas are updated.

A complete version history and changelog for our NDT, NPAD, Paris Traceroute, and Sidestream tables is published under [Data > Docs > BigQuery Schema]({{ site.baseurl }}/data/docs/bq/schema/).

For our upcoming v3.1 table/schema release, the following tables and views will be published in the `measurement-lab:public` project:

* **measurement-lab.legacy.ndt** (data ~ 2015-01-01 - 2017-05-10)
* **measurement-lab.legacy.ndt_pre2015** (data ~ 2009-02-18 - 2014-12-31)
* **measurement-lab.public.ndt_v3.1** (data ~ 2017-05-01 - present)
* All NDT data views:
  * ndt_all_v3.1​ (data ~ 2009-02-18 - present)
  * ndt_all_current​ (data ~ 2009-02-18 - present)
  * ndt_all_legacysql_v3.1​ (data ~ 2009-02-18 - present)
* Separate views for NDT download and upload tests:
  * ndt_downloads_v3.1 (data ~ 2009-02-18 - present)
  * ndt_uploads_v3.1 (data ~ 2009-02-18 - present)
* **measurement-lab.public.traceroute_v3.1** (data ~ 2017-09-08 - present)
* **measurement-lab.public.sidestream_v3.1** (data ~ 2017-09-08 - present)
* **measurement-lab.public.npad_v3.1** (data ~ 2009-02-18 - present)

The NDT table views provide a superset schema of the old and new tables, and queries that worked on the old table should generally work without change on the new views. The views above ending in `_legacy` require you to use [legacySQL](https://cloud.google.com/bigquery/query-reference){:target="_blank"} queries, and those labeled with `(standardSQL)` require you to use [standardSQL](https://cloud.google.com/bigquery/sql-reference/index){:target="_blank"} queries. Additionally, the views which include '_uploads_' or '_downloads_' provide a subset of NDT data that are valid, completed tests which meet the critera described on our page, [Calculating Common Metrics]({{ site.baseurl }}/data/docs/bq/ndtmetrics/). We highly recommend using standardSQL as this will be required to query all M-Lab tables in the future.

Our v3.1 tables will go into production for NDT, Paris Traceroute, Sidestream and NPAD in January 2018. Additionally, we will complete work on our [annotation service](https://github.com/m-lab/annotation-service){:target="_blank"}, which will provide the blacklist_flags field, which tags test rows where infrastructure or other issues may have occurred. The annotation service provides geolocation information for all tests and has been developed as a separate service to be extensible for adding different types of metadata in the future.

## Summary of v3.1 Table/Schema and Feature Changes

There are a number of key differences between our current tables and the new tables.

### Only Final NDT Test Values are Queryable

Like the NDT Fast Table, the NDT v3.1 table will save only the last test row with the final results. An NDT typical test consists of about 1000 "snapshots" that are collected while running. These were previously available in the legacy tables, but not the fast table database. M-Lab saves all NDT test snapshots and final test results in our raw data archive, and we are experimenting with a repeated record format for a potential future update to the table schema.

### Anomalies

Fields in the `anomalies` section are being used to annotate anything that is unusual about the test files themselves (not the data). For example, the `no_meta` field indicates that the *.meta file was missing and the `num_snaps` field indicates the number of snapshots used, if there were fewer or more than normally expected. If `num_snaps` > 2800, then only the first 2800 snapshots are processed and reflected in the row.

## Additional Table/Schema Changes and Features

v3.1 will update the field `log_time` to an actual ‘timestamp’ formatted field. Due to a subtle rounding behavior in the new pipeline, values for `log_time` are +/- one second different than in the legacy tables, but our testing indicates that this should not affect analysis of the results.

Additionally, two new fields will be added in the table schema for v3.1:

* `task_filename` - the `gs://` archive file in [M-Lab's Google Cloud Storage bucket](https://console.cloud.google.com/storage/browser/archive-mlab-oti){:target="_blank"} where the record originated
* `parse_time` - indicates when the data row was parsed from raw storage

v3.1 tables are partitioned by day. This will not affect queries across multiple days, but can be used to interact with the dataset more efficiently. See Google's [BigQuery documentation on querying date-partitioned tables](https://cloud.google.com/bigquery/docs/querying-partitioned-tables){:target="_blank"} for more information.

### Additional Benefits from New Open Source Pipeline

Quality Assurance for NDT is built into the pipeline parser in that the new pipeline truncates the test after 14 seconds, which exceeds the expected duration of the NDT test, effectively removing data from tests that stall or were likely incomplete.

The publication latency between tests being conducted and their availability on M-Lab’s cloud services with the new ETL pipeline is approximately one day.  Data is scraped and uploaded with a two to four hour latency window for busy sites, with a cleanup upload occurring at 8am UTC the next day. Busy sites and experiments should see a greatly reduced publication latency, and less-used sites and experiments should still see a latency of under 36 hours. This is a substantial improvement compared to the previous pipeline.

The new open source, cloud based pipeline will make it easier to add new M-Lab hosted experiments to BigQuery tables. M-Lab will be publishing more documentation on how to utilize the new pipeline for experiments that would like to take advantage of our cloud resources. Code is available at [https://github.com/m-lab/etl](https://github.com/m-lab/etl){:target="_blank"} in the default, "integration" branch.

### Future Work on the Horizon

Once the v3.1 tables are launched, M-Lab will continue working on our platform update, which will include a major change in 2018 in our next table version. One main focus of our broader platform update involves re-instrumenting all experiments and server software from web100 to tcp_info, which we expect to be completed in Q3 - Q4, 2018. This is a major platform change which has been in the planning phases for M-Lab for some time, and will be implemented with great care to maintain the longitudinal validity of our data. We also plan to extend the table annotation service provide the _Autonomous System Name (ASN)_ of the network from which each test originated in upcoming versions. M-Lab uses the open _IP to AS database_ provided by Maxmind to correlate users' IP addresses to the ISP over which tests are conducted. M-Lab will also account for the date each test was run and the version of the Maxmind database for the corresponding month when re-parsing historical records new table versions.

Lastly, legacy monthly (v1) and Fast tables (v2) will be sunsetted at the end of June 2018, which we hope provides researchers and other data users enough time to transition to using the new tables. These tables will still remain in our storage for historical record, but will no longer be supported after June 2018.

