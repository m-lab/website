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
