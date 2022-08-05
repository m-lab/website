---
layout: blog
title: "Release notes for Unified Views with exposed Row Filters"
author: "Matt Mathis"
date: 2022-08-05
breadcrumb: blog
categories:
  - bigquery
  - research
  - data
---

Monday August 15th we will be updating the NDT unified views to provide
researchers with access to the row filter logic used to exclude rows that are
not believed to be representative measurements of network performance.   This
change enables interested researchers to better understand MLab’s data filtering
and to easily craft alternate filters to verify our assumptions, or to filter
data to address questions other than network throughput.

<!--more-->

The “nofilter” versions of the unified views compute and expose all of the
predicate columns used to select rows, but don't remove anything.

The new unified views are also faster, but there are still opportunities for
further improvement.

## Changes to the schema

The schema for the new unified views are forward compatible with the current
production views.  Existing queries using fully supported features (i.e. no
fields starting with underscore) should run without modification.

The new unified views also expose additional metadata, which is not yet
documented.    The metadata includes implementation details for the client,
server, parser and wire protocol; locations of raw data, and in some cases,
pointers to the source code.

## Changes to the data

The new unified download view has new default row filter logic that does not
exclude flows with non-network bottlenecks, as suggested by Dave Clark [1].   In
the past we considered flows that exhibited non-network bottlenecks (most often
due to CPU or buffering limits at the client) to be non-representative of the
network performance, and so they were excluded from the results.  This turns out
to introduce a sample bias against faster networks.

In the spirit of exposing the row filter logic, both versions of the row filters
are available, side-by-side in a single query as described below.

This release does not change any of the values for a.MeanThroughputMbps or other
data values, and only increases the number of rows, i.e. tests considered to be
valid.

## Prereleases

Prerelease versions of the new unified views are available for testing.
Researchers using non-standard columns, custom unified views, or who are
concerned about changes to the data are encouraged to test with the prototype
unified views.   See: [Release notes for new prototype unified views][prototype]

[prototype]: https://docs.google.com/document/d/1WvwEcaD6hVtI6ZcpoIHR8SnaTnfX8Pn03QZBJE15-nU/

The simpleset test is to edit `FROM` lines and replace:

* `measurement-lab.ndt.unified_downloads` with `mlab-collaboration.mm_preproduction.unified_downloads`

then, your queries should just run.

## Comparing the Data across changes

The nofilter versions of the unified views provide the columns IsValidBest and
IsValid2021, which are the new and old row selection predicates, respectively.
These can be used to replicate legacy queries or to implement differential
queries.  For example:

```sql
SELECT
  COUNT (*) AS TotalRows,
  COUNTIF (IsValidBest) AS ValidBestRows,
  COUNTIF (IsValid2021) AS Valid2021Rows,
  COUNTIF (IsValidBest != IsValid2021) AS DeltaRows
FROM
  `mlab-collaboration.mm_preproduction.unified_downloads_nofilter` -- before Aug 15th
  -- `measuremement-lab.ndt.unified_downloads_nofilter` -- after Aug 15th
WHERE
  date = '2022-02-15'
  AND (IsValidBest OR IsValid2021)
```

Note that IsValid2021 is a reconstruction of the production unified views as of
early 2022.    The reconstruction matches very closely: averaging within 1 row
per day for the first 12+ years of the project.  (Mismatches are most likely
corner cases, such as tests that straddle midnight).  In 2022 we started testing
NDT in Google Cloud, and have since discovered that the 2021 production views
inappropriately exclude some NDT tests from GCP because the tests used RFC1918
addresses (net 10/8, etc).  This bug has not been reconstructed in IsValid2021,
but only affects a small sample of data from virtual servers running in canary
mode.   The new isValidBest is correct for this data.

## Upcoming work

We still need to update the documentation.   Since the new views are backwards
compatible with the old views, the old documentation is still technically
correct, but does not adequately describe how to make use of the new filter
logic or improved metadata.  Expect these documents to be updated in waves over
the next couple of months.

## References

[1] Clark, David D. and Wedeman, Sara, Measurement, Meaning and Purpose:
Exploring the M-Lab NDT Dataset (August 2, 2021). Available at SSRN:
https://ssrn.com/abstract=3898339 or http://dx.doi.org/10.2139/ssrn.3898339
