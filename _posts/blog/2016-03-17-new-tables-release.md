---
layout: blog
title: "Making it Easier to Use M-Lab Data"
author: "Michael Lynch"
date: 2016-03-17
breadcrumb: blog
categories:
  - bigquery
  - gcs
  - performance
  - data
---

In January, M-Lab launched a beta test of new BigQuery tables for M-Lab data. Today, M-Lab is pleased to announce that the beta test was successful. The new, faster-performing tables will be M-Lab's new standard BigQuery tables.

Before we move on to specifics, when we say faster performing, we mean a *lot* faster. As in, **certain queries that used to take over 2 hours now complete in 8 seconds**. That means that playing with the data just became a lot more fun.

To help users dig in to this data as quickly and seamlessly as possible, M-Lab has consolidated all of its data documentation and updated it to show how to take advantage of the new tables.

<!--more-->

## New M-Lab BigQuery Tables

The new M-Lab BigQuery tables will be the new default tables that M-Lab uses in tools and documentation.

These tables are:

* `plx.google:m_lab.ndt.all`
* `plx.google:m_lab.npad.all`
* `plx.google:m_lab.sidestream.all`
* `plx.google:m_lab.paris_traceroute.all`

These tables offer a tremendous amount of improvements over our legacy per-month tables, including performance improvements by orders of magnitude. These benefits are detailed in M-Lab's [previous blog post]({{ site.baseurl }}/blog/bigquery-performance-improvements/).

M-Lab will continue to support and update the legacy tables, but these tables are deprecated and will not see future development. To migrate your legacy queries to take advantage of M-Lab's new, faster tables, please refer to the [Legacy Migration Guide]({{ site.baseurl }}/data/docs/bq/legacymigration) for details.

## Overhauled Data Documentation

M-Lab has massive amounts of data available for researchers, but many of our users have reported difficulty finding or using documentation about our data. To address this, today M-Lab is publishing consolidated documentation, updated to cover M-Lab's new BigQuery tables. You can view this documentation under the ["Data" tab]({{ site.baseurl }}/data/) of the M-Lab web site.

This documentation covers everything that our users need to work with our data, including:

* Getting free, instant access to M-Lab data
* Downloading M-Lab data in raw form from Google Cloud Storage
* Searching through the entire M-Lab dataset using BigQuery
* Citing M-Lab data for research papers

We hope you enjoy this new documentation and we welcome any feedback you have about it at [support@measurementlab.net](mailto:support@measurementlab.net).
