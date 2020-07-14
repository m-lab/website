---
layout: blog
title: "Long Term Supported Schemas Using Standardized BigQuery Columns"
author: "Chris Ritzo"
date: 2020-07-14
breadcrumb: blog
categories:
  - data
  - bigquery
  - schema
---

Following the M-Lab platform upgrade in Nov. 2019, the development team began a series of follow up projects to enable access to NDT data for various audiences with differing needs. The first step in that process was [the publication of "unified views"]({{ site.baseurl }}/blog/new-ndt-unified-views/), which present the most commonly used fields in NDT data, and only show tests that meet our current, best understanding of test completeness. This was one step toward [Long Term Support of stable schemas]({{ site.baseurl }}/blog/new-ndt-unified-views/#long-term-support) for our tables and views in BigQuery. In other words, a lot of work is happening in the background to support long term support for standard BigQuery columns across all M-Lab datasets.<!--more-->

## Motivations for Standard Columns

The primary goal of standard columns is long term support (LTS) for our users. As we make changes to the M-Lab platform, and specifically our [ETL pipeline](https://github.com/m-lab/etl){:target="_blank"} that parses collected test data from our archive into BigQuery tables, our team is seeking to provide table and view schemas on which our community can depend. To make this happen, our team is working on "Standard, Top-level BigQuery Columns" for all M-Lab platform datatypes, from which stable, LTS schemas for tables and views will be derived. The most immediate, recognizable outcome of this work are the [unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){target:"_blank"} and [unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){target:"_blank"} views that we blogged about in May.

## Enabling Standard, LTS Tables and Views

Several sub-projects are in progress that will enable M-Lab to provide Standard Columns across our datatypes, and provide LTS schemas for the M-Lab tables and views that you use.

### Universal Gardener Service

Our [etl-gardener](https://github.com/m-lab/etl-gardener/){:target="_blank"} service provides services for maintaining and reprocessing M-Lab data. This service is being simplified to create a single deployment across our internal projects, and reduce the number of components in the original pipeline to just the parsers, the gardener service, and job state in Datastore.

### Uniform Naming of Services and Data Types

To simplify documentation and understanding of M-Lab data from collection to publication, our team has designed a strategy to consistently use the same name to M-Lab measurement services, their datatypes, and related resources throughout the platform. From Kubernetes DaemonSets, DNS, local data collection, GCS archive folders, ETL TaskQueues and parsers, BQ datasets and table names, we will use uniform names. 

You’ve already seen some of the outcomes of this uniform naming strategy. For example, we now publish the dataset `measurement-lab.ndt` instead of `measurement-lab.release.ndt`. Our DNS names for the NDT measurement service are also changing to reflect this approach. For example, historically our experiment DNS names were derived from the PlanetLab slice name, machine name, and the M-Lab infrastructure domain. So “iupui_ndt” (PlanetLab name) running on machine “mlab1” at site “iad0t” became “ndt.iupui.mlab1.iad01.measurement-lab.org”. On the new Kubernetes M-Lab platform we will adopt short names that represent only the canonical experiment name, such as “ndt-mlab1-iad01.mlab-oti.measurement-lab.org”.

### Auto-generated Schema Documentation

We’re planning to update and expand our documentation on how to use M-Lab data, and part of that will be auto-generating schema documentation for our website. We currently are generating the schemas found on our landing pages for each test, and as our Standard Columns strategy is implemented these schemas will match exactly what you find in our datasets on BigQuery.

### Column-based Partitioning in BigQuery

Today we use partitioning based on measurement time. We would like to move to column based partitioning to align partitions on timestamps from data rather than timestamps from upload archives (which can be different and cause partition skew). Additionally, we expect that column-based partitioning will make your queries more efficient.

## Conclusion

We hope that this post provides some hints about the large amount of work happening in the background to make our data more accessible and easier to use. Please check back for future updates on these projects, and contact us if you have questions or need help.
