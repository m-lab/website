---
layout: blog
title: "Announcing improved performance for M-Lab BigQuery data"
author: "Chris Ritzo"
breadcrumb: blog
categories:
  - bigquery
  - performance
  - data
---

# Announcing improved performance for M-Lab BigQuery data

Today, M-Lab is happy to announce the public beta of new M-Lab BigQuery tables. These tables provide substantially improved performance and reduce the difficulty of writing BigQuery SQL.

<!--more-->

## **Per-project partitioning**

<div>
While M-Lab's historical BigQuery tables have been partitioned by month (e.g. <span style="font-family: monospace,monospace;">m\_lab.2016\_01</span>), the new tables are partitioned by M-Lab project:
</div>
- plx.google:m\_lab.ndt.all
- plx.google:m\_lab.npad.all
- plx.google:m\_lab.sidestream.all
- plx.google:m\_lab.paris\_traceroute.all

Each table contains data for a single M-Lab project (NDT, NPAD, SideStream, or Paris Traceroute) across all time. This makes it much easier to write queries over long time ranges, as changing the time interval no longer requires changing the specified BigQuery table.

## **No intermediate snapshots**

Our per-month tables contain every web100 snapshot from each test log.  This has led to user confusion in the past, as most M-Lab users are only interested in the last web100 snapshot (i.e. the final TCP state of the connection).

Our new tables exclude intermediate web100 snapshots, allowing users to
write simpler SQL queries with fewer pitfalls.

## **Performance Gains**

In our tests, we've observed improvements of 2.5x speed for simple, common queries. For queries that perform heavy computation on the server (e.g. computing the number of unique client IPs per day), we see much more stunning improvements, with queries performing 1000x faster in some
cases.

## **Migration Guide**

We've published a migration guide to help convert your existing M-Lab BigQuery SQL to take advantage of the new, faster tables. Our data schema has not changed, so converting existing queries is easy and straightforward: <https://github.com/m-lab/mlab-wikis/blob/master/MigratingToFastTables.md>
