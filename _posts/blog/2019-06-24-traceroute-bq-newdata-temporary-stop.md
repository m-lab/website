---
layout: blog
title: "Traceroute BigQuery Table New Data Temporarily Halted for Schema Change"
author: "Ya Chang"
date: 2019-06-24
breadcrumb: blog
categories:
  - data
  - data-analysis
  - community
---

 M-Lab is working on replacing the current traceroute BigQuery table with new schema, which will put all hops of one test in one row of BigQuery table. The new table will have all the information in the current table but make the search of hops within one test much easier. To make this happen, we will stop the new data feed of current traceroute BigQuery table from last June to early July, 2019. The details of new schema will be updated once the conversion of all data to BQ tables with new schema is completed and available to public.