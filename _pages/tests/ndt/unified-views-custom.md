---
layout: page
permalink: /tests/ndt/unified-views/custom/
title: "Creating Custom Unified Views or Subqueries for Your Own Research"
breadcrumb: tests
---

[This section follows "Multi-Track Views of NDT data in M-Lab Nov/Dec 2020 Community Calls"]

[NDT Unified Views]() and the [statistics pipeline]() provide researchers with the data optimized for studying the evolution of Internet performance organized by geopolitical boundaries.

In this document we introduce methodology for researchers to efficiently address alternative questions without becoming overly sensitive to changes M-Lab's BigQuery presentation of the data that still are in flux.

Custom unified views are built from **extended views**, which are a maximal
presentation of all M-Lab raw data: every measurement (raw row) and every
intermediate column is represented in the extended views. The unified views are one, carefully curated, set of choices for filtering the data. This document describes some techniques that might be used to implement alternate choices.

## Structure of the unified views
(Slides 35-38)
The current extended views are only about a dozen lines of code.

**Processing steps:**

0. Precursor - Extended views: every row (including non-representative measurements), every column, of which only a subset of the columns are standard
1. Filter columns on top level STRUCT names to the subset that are standard
2. Union across data sets
3. Filter rows using columns that were computed in an earlier step

## How to Create Custom Unified Views or Subqueries

The basic approach to creating a custom unified view is to replicate the our unified view, and make 3 parallel edits to step 1, to add a new derived column with identical semantics to each data set.

[add text describing copy and create subqueries]

See slide Custom unified view to explore WScale  Note that this example includes both subexpressions to canonicalize the new column and WHERE clauses to eliminate rows with invlaid values.

If you want to change the row selection, write 3 different expressions for a new filter column (most likely at the top level and not within the filter STRUCT).

## Future-proofing Your Custom Unified Views or Subqueries

All columns outside of the documented standard columns are subject to future changes.  If a column name starts with an underscore, we already have plans to change it.  If the name also contains something that looks like a date code or version tag, the column (or structure) is explicitly temporary and likely to be updated frequently as we evolve the underlying schemas.

To future proof custom unified views, researchers are strongly encouraged to maintain a strong separation between data grooming in their custom unified view, and their research logic in subordinate queries. All of the columns presented by the custom unified view should be standardised either by the researcher or by M-Lab.

If the separation is done well, researchers can track internal changes to M-Lab's schema with single line changes to their custom unified views, for example to update a column name or location in the schema.
