---
layout: page
permalink: /tests/ndt/views
title: "How NDT Views Are Derived and Published"
breadcrumb: tests
---

# How NDT Views Are Derived and Published
## @@@@ remove this page?  Alternatively move the lower half of ndt.md to here.

* Mostly drawn from blog post with some slight language changes.
* Change “useful” to curated (short form) and/or unified and calibrated longitudinal views of our entire dataset (long form)

We now publish two series of BigQuery Views for NDT data: "Faithful" and "Helpful". [As described on the NDT page][ndt-page]:

[ndt-page]: {{ site.baseurl }}/tests/ndt/#current-bigquery-tablesviews

Faithful Views:

* Faithful Views are the base tables/views for each NDT data type, providing
  direct access to the unfiltered NDT data and the TCP INFO and Traceroute data
  associated with NDT tests.
* In BigQuery, Faithful Views are provided in datasets prepended with **raw_**
* **Faithful views will be of interest mostly to researchers interested in all
  testing conditions and results.**

Helpful Views:

* A set of tables/views derived from “Faithful Views” that are pre-filtered to
  only provide the most commonly used fields, and which only show tests that
  meet our current, best understanding of test completeness and research
  quality. More details on what constitutes “research quality” is listed on the
  NDT page linked above.
* In BigQuery, Helpful Views are provided in datasets labelled for each
  experiment.
* **Helpful views should be the starting point for most people.**
