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

Following the M-Lab platform upgrade in Nov. 2019, the development team began a series of follow up projects to enable access to NDT data for various audiences with differing needs. The first step in that process was [the publication of "unified views"]({{ site.baseurl }}/blog/new-ndt-unified-views/), which present the most commonly used fields in NDT data, and only show tests that meet our current, best understanding of test completeness. This was one step toward [Long Term Support of stable schemas]({{ site.baseurl }}/blog/new-ndt-unified-views/#long-term-support) for our tables and views in BigQuery.<!--more-->

## Motiviations for Standard Columns

As we make changes to the M-Lab platform, and specifically our ETL pipeline that parses collected test data into our archive and to BigQuery tables, our team has sought to improve our ability to provide long term supported table and view schemas on which our community can depend. To make this happen, our team is working on "Standard, Top-level BigQuery Columns" for all M-Lab platform datatypes, from which stable LTS schemas for tables and views will be derived. The most immediate, recognizable outcome of this work are the [unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){target:"_blank"} and [unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){target:"_blank"} views that we blogged about in May.

## Background and Requirements for Standard Columns and LTS Schema Support

