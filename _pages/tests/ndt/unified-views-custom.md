---
layout: page
permalink: /tests/ndt/views/custom/
title: "Creating Custom Unified Views or Subqueries for Your Own Research"
breadcrumb: tests
---

# Creating Custom Unified Views or Subqueries for Your Own Research

[NDT Unified Views]({{ site.baseurl }}/tests/ndt/#unified-views) and the [statistics pipeline](https://github.com/m-lab/stats-pipeline/#statistics-pipeline-service) are optimized to provide
researchers curated data to optimally support studies of the
evolution of Internet performance organized by geopolitical boundaries.

However, some researchers with unique research goals might want to filter the data differently than presented in the Unified Views. So, in this document we describe how to create Custom Unified Views to efficiently address alternative research questions.

## Background

**Structure of the NDT Unified Views**

Unified views are are built on [extended views]({{ site.baseurl }}/tests/ndt/#extended-views), which are a
maximal presentations of all M-Lab raw data: every measurement (raw row) is annotated with everything we know about the data, including filter flags, Geo labels, etc.

The Unified Views are a `UNION` of selected fields from all three NDT data types, with a filter applied to only present completed, valid test results [according to our current, best understanding]({{ site.baseurl }}/tests/ndt/#unified-views). 

To create the Unified Views, we complete the following steps as the last part of our data processing pipeline: 

1. Create the extended views, which contain every row and every column
1. Filter columns to a standardized subset
1. Union across data sets (columns must have exactly matching types)
1. Filter rows using filter flags that were computed in some earlier step  
<br>
Unified views can be customized to provide different data by simply replacing the last
processing step, step 4, with different filters. We describe how to do so in the next section.  
<br>

## Create your own Custom Unified view

1. Open the NDT Unified Download View [`measurement-lab.ndt.unified_downloads`](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table) or the NDT Unified Upload View [`measurement-lab.ndt.unified_uploads`](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table) in the BigQuery console,  and then open the _Details_ tab. You will see an SQL query that starts with the following:     


	```~sql
	WITH
	UnifiedExtendedDownloads AS (
	SELECT *,
	```   
	<br>
1. Copy the entire query, starting with the lines above.  

1. Remove the following section:     

	```~sql
	SELECT * EXCEPT ( filter )
	FROM UnifiedExtendedDownloads
	WHERE IsValidBest
	```  
	<br>
1. Modify the query to include or exclude results based on your custom criteria.  
<br>

## In Practice

For demonstrations of how custom unified views can be used in your research, please see [these examples in CoLab](https://colab.research.google.com/drive/1i0XGPeMcvr2ZPO6EMIh86mNWPS0qzbit#scrollTo=G3o4Ati2WspD). 

## Future-proofing Your Custom Unified Views or Subqueries

All columns outside of the documented standard columns in unified views are subject to future
changes. If a column name starts with an underscore, we already have plans to
change it. If the name also contains something that looks like a date code or
version tag, the column (or structure) is explicitly temporary and likely to be
updated frequently as we evolve the underlying schemas.

To future proof custom unified views, researchers are strongly encouraged to
maintain clean separation between data grooming in their custom unified view,
and their research logic in subordinate queries. All of the columns presented by
the custom unified view should be standardized either by the researcher themselves or by
following MLab standard views.

Note that we plan to overhaul the row filtering logic in the future.

Researchers are encouraged to monitor and track changes to published unified views.

If the separation is done well, researchers can track future changes to
M-Lab's schema with single line changes to their custom unified views, for
example to update a column name or location within the schemas.
