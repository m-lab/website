---
layout: blog
title: "New Traceroute Table Available to public"
author: "Ya Chang"
date: 2019-08-01
breadcrumb: blog
categories:
  - data
  - traceroute
  - community
---

Everyone wants traceroute data in BigQuery has quick easy way to reconstruct the path of hops for the same test for years. But the schema designed many years ago put the hops of the same test in different rows, which made this task particularly hard.

To address this need from many of our partners and researchers, M-Lab is delightful to announce that BigQuery tables of traceroute data with new schema is available to public now. The new schema has one test per row, and all hops of this test inside the same row. 

Here is the new schema, which also adds ASn annotation for traceroute source, destination and hops:
