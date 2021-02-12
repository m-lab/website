---
layout: page
permalink: /tests/ndt/views/custom/
title: "Creating Custom Unified Views or Subqueries for Your Own Research"
breadcrumb: tests
---

# Creating Custom Unified Views or Subqueries for Your Own Research

[NDT Unified Views]() and the [statistics pipeline]() provide researchers with
data optimized for studying the evolution of Internet performance organized by
geopolitical boundaries. These views pre-filter NDT tests for completeness and
our current, best understanding of "research quality". 

In this document we introduce methodology for researchers to efficiently address
alternative questions without becoming overly sensitive to changes M-Lab's
BigQuery presentation of NDT data for more general inquiries.

Custom unified views are built from **extended views**, which are a maximal
presentation of all M-Lab raw data: every measurement (raw row) and every
intermediate column is represented in the extended views. The unified views are
one, carefully curated, set of choices for filtering the data. This document
describes some techniques that might be used to implement alternate choices.

## Structure of the NDT Unified Views

The Unified Views are a `UNION` of selected fields from the three NDT datatypes,
with a filter applied to only show completed, valid test results [according to
our current, best understanding]({{ site.baseurl }}/tests/ndt/#helpful-views).

**Processing Steps in the Production of NDT Unified Views:**

0. Precursor - Extended views: every row (including non-representative measurements), every column, of which only a subset of the columns are standard
1. Filter columns on top level STRUCT names to the subset that are standard
2. Union across data sets
3. Filter rows using columns that were computed in an earlier step

If we inspect the _Details_ for the NDT Unified Download View, the query that
produces it is shown:

```~sql
SELECT * EXCEPT (filter)
FROM (
    -- 2020-03-12 to present
    SELECT id, date, a, filter, node, client, server,
    FROM `measurement-lab.intermediate_ndt.extended_ndt7_downloads`
 UNION ALL
    -- 2019-07-18 to present
    SELECT id, date, a, filter, node, client, server,
    FROM `measurement-lab.intermediate_ndt.extended_ndt5_downloads`
 UNION ALL
    -- 2009-02-18 to 2019-11-20
    SELECT id, date, a, filter, node, client, server,
    FROM `measurement-lab.intermediate_ndt.extended_web100_downloads`
)
WHERE filter.IsValidBest
```

## How to Create Custom Unified Views or Subqueries

The basic approach to creating a custom unified view is to replicate our
unified view, and make 3 parallel edits to step 1, to add a new derived column
with identical semantics to each data set.

M-Lab does not allow users to create views within our GCP project, but if you are
using BigQuery within your own GCP project, you can copy one of our unified
views as a starting point. **Note that you will be billed by Google for this.**

* Select an M-Lab NDT Unified View, i.e.
  [`measurement-lab.ndt.unified_downloads`](https://console.cloud.google.com/bigquery?project=measurement-lab&authuser=0&p=measurement-lab&d=ndt&t=unified_downloads&page=table)
* Click the "COPY VIEW" button, and select your GCP project, dataset, and enter
  a table name for the copied view.

## Example - Custom unified view to explore WScale  

Note that this example includes both subexpressions to canonicalize the new
column and WHERE clauses to eliminate rows with invalid values.

If you want to change the row selection, write 3 different expressions for a new
filter column (most likely at the top level and not within the filter STRUCT).

```~sql
# Tabulating Window Scale by year
WITH 
CustomUnifiedView AS (
	SELECT * EXCEPT (filter)
	FROM (
		SELECT id, date, a, filter, node, client, server,
		_internal202010.lastsample.TCPInfo.WScale & 0xF AS WScale
		FROM `measurement-lab.intermediate_ndt.extended_ndt7_downloads`
	UNION ALL
		-- 2019-07-18 to present
		SELECT id, date, a, filter, node, client, server,
		_internal202010.S2C.TCPInfo.WScale & 0xF AS WScale
		FROM `measurement-lab.intermediate_ndt.extended_ndt5_downloads`
		WHERE _internal202010.S2C.TCPInfo.WScale IS NOT NULL
	UNION ALL
		-- 2009-02-18 to 2019-11-20
		SELECT id, date, a, filter, node, client, server,
		greatest (_internal202010.web100_log_entry.snap.SndWindScale, 0) AS WScale
		FROM `measurement-lab.intermediate_ndt.extended_web100_downloads`
		# 3 corrupted values in 2017
		WHERE _internal202010.web100_log_entry.snap.SndWindScale <= 14 
		)
	WHERE filter.IsValidBest 
)
# The remaining part of this query is one example of a research query using the above custom "unified view" as expressed in a sub-query.

SELECT 
	EXTRACT(year FROM date) AS year,
	WScale,
	COUNT (*) AS tests,
FROM CustomUnifiedView
WHERE date > '2009-01-01'
GROUP BY year, WScale
ORDER BY year, WScale
```

![Graph displaying WSCALE by year]({{ site.baseurl }}/images/tests/custom-unified-views-wscale-year.png)

## Future-proofing Your Custom Unified Views or Subqueries

All columns outside of the documented standard columns are subject to future
changes. If a column name starts with an underscore, we already have plans to
change it. If the name also contains something that looks like a date code or
version tag, the column (or structure) is explicitly temporary and likely to be
updated frequently as we evolve the underlying schemas.

To future proof custom unified views, researchers are strongly encouraged to
maintain a strong separation between data grooming in their custom unified view,
and their research logic in subordinate queries. All of the columns presented by
the custom unified view should be standardised either by the researcher or by
M-Lab.

If the separation is done well, researchers can track internal changes to
M-Lab's schema with single line changes to their custom unified views, for
example to update a column name or location in the schema.
