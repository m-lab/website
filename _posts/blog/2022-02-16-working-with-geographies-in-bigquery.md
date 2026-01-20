---
layout: blog
title: "Working with Geographies in BigQuery"
author: "Chris Ritzo"
date: 2022-02-16
breadcrumb: blog
categories:
  - ndt
  - bigquery
  - data
  - GIS
  - tutorial
---

In this tutorial we will document our own use of GIS techniques to explore and
analyze our datasets that contain location information. BigQuery’s GIS functions
allow the use of GIS techniques within the database query. Geographies are
typically defined in “shapefiles”, which define the boundaries of a geographic
area as a series of latitude and longitude points making up the area’s
perimeter. M-Lab uses GIS functions to prepare some aggregations of NDT data in
our [stats-pipeline](https://github.com/m-lab/stats-pipeline/) for geographies
such as [US County](https://datastudio.google.com/s/rM4_hclXQKc). This technique
is generally useful for subsetting data points that fall within any geography or
within overlapping geographies. This post walks through the process of importing
shapefiles into BigQuery tables.<!--more-->

We want to first acknowledge that working with geographic information systems is
a complex subject in its own right, and mapping tools and techniques, while
overlapping with general data analysis skills, are a wholly separate field of
expertise. This post is intended to document our own use of GIS techniques to
explore and analyze our datasets that contain location information, for example
some [queries used in our statistics
API](https://github.com/m-lab/stats-pipeline/tree/master/statistics/queries).

When working with geographic areas, we can first look for available areas
defined in geometry fields in the BigQuery Public Datasets Program. For example,
M-Lab uses their table, `bigquery-public-data.geo_us_boundaries.counties`, to
aggregate NDT data by US County in the statistics API mentioned above. But
unfortunately their datasets aren’t intended to be comprehensive, and are more
of a sample public resource for people wanting to learn or try BigQuery on the
way to using and paying for Google Cloud products. The geographic datasets in
BigQuery’s Public Datasets are also mostly US centric, and don’t include global
geographies, or those specific to many local and even regional areas. 

## From Shapefiles to BigQuery Tables

There are many sources of geographic information systems (GIS) shapefiles, and
usually they’re used in GIS software such as ArcGIS or QGIS. BigQuery and other
databases like Postgres support GIS functions if the columns in them are point
or polygon geometries. But if we don’t have geographies in BigQuery or Postgres
datasets already, we need to convert and/or load them. We did this recently with
the community statistical areas of Baltimore, Maryland for a post last year
about IP geolocation, and with the European Commission broadband mapping
initiative’s NUTS geography areas, a topic that was [recently discussed](https://groups.google.com/a/measurementlab.net/g/discuss/c/iX-EcJqT1Ys/m/iJmqVQVvAwAJ) on our
discussion group.

In these cases, if we have a source of shapefiles defining the boundaries of
specific geographies, we can convert and load them into new BigQuery tables, and
then use the imported boundaries and metadata in our queries of other datasets.
**Note that if you are loading geographies as BigQuery tables, you’ll need your
own GCP project and items in this post related to Google storage and BigQuery
will incur costs to your project.**

### Converting Shapefiles and Loading as BigQuery Tables

The shapefile is a format developed by ESRI, the maker of GIS software, ArcGIS,
which defines geographic areas with a series of polygons. At a basic level, a
shapefile consists of the outline of a state, country, region, province, county,
etc. defined as a series of latitude and longitude coordinates, along with
additional metadata fields about each shape. To effectively use geographic
information from shapefiles in BigQuery, we need to convert them to a format
suitable for importing as a table. I’ve found the workflow below to work
consistently with shapefiles from various sources:

* **Convert SHP to CSV:**
  The GDAL project includes a utility to work with geography files of various
  formats called `ogr2ogr`. We can use the command below to convert any
  shapefile to CSV, which we can then import as a BigQuery table. 
  `ogr2ogr -f "CSV" <csv output filename>.csv <shapefile input filename>.shp -nlt MULTIPOLYGON -lco GEOMETRY=AS_WKT`
* **Upload CSV to GCS:**
  Converted shapefiles can exceed the file size limits for uploading directly into BigQuery. If we have a Google Cloud Storage bucket, we can upload our CSV there first using the Google Cloud SDK tool `gsutil`, or via the website.
  `gsutil cp <converted shapefile>.csv gs://critzo/GIS/`
* **Get the field names in the file to use for the BigQuery table schema:**
  BigQuery’s import tool can auto detect the schema from a source file when you upload it to import as a new table, but it’s better to specify it. I use the `head` command below to list the names of the columns in my file, and in the next step define their datatypes in the schema when I import the file.
  `head -n 1<converted shapefile>.csv`
  Below is an example of the output when I recently converted a shapefile provided by the [Ookla for Good program](https://www.ookla.com/ookla-for-good):
  ```
  WKT,quadkey,avg_d_kbps,avg_u_kbps,avg_lat_ms,tests,devices
  ```
* **Create import table from CSV in GCS**
  The list of columns in our CSV can be used to specify the schema for our new BigQuery table. For each, we add a colon and the datatype for the column:
  ```
  WKT:STRING,quadkey:INTEGER,avg_d_kbps:INTEGER,avg_u_kbps:INTEGER,avg_lat_ms:INTEGER,tests:INTEGER,devices:INTEGER
  ```

  GIS folks will likely note that I’m importing the field `WKT` or Well Known
  Text as STRING and not as GEOGRAPHY. We do want to end up with the field WKT as
  type GEOGRAPHY, and I’ll use a query in the next step to change it to that
  datatype, while also using a function to make the geography field valid. In my
  experience, this method has resulted in few, if any import errors.

  To import the CSV from GCS into our table, select the dataset where you want
  the new table to be, and click the icon to create a new table. Then in the
  import table dialog, select your uploaded file in GCS, provide a table name,
  and provide the schema for the table. You can use the GUI to add the schema
  and select each field’s datatype from a list, or use the “Edit as text” toggle
  to type in the field names and datatypes a list, or use the “Edit as text”
  toggle to type in the field names and datatypes as I’ve described above.
  
  ![Create Table icon in BigQuery]({{ site.baseurl
  }}/images/blog/2022-02-16-working-with-geographies-in-bq/create-table-bq.png)
  ![Create Table dialog box in BigQuery]({{ site.baseurl
  }}/images/blog/2022-02-16-working-with-geographies-in-bq/create-table-bq-2.png)
  
* **Convert imported data to correct formats:**
  Once the new table has been created, we can us a query to convert the WKT
  field to a GEOGRAPHY datatype. The query below was used to convert the
  previously mentioned Ookla public data:
  ```
  SELECT ST_GEOGFROMTEXT(WKT, make_valid => TRUE) AS geometry,
  quadkey, avg_d_kbps, avg_u_kbps, avg_lat_ms, devices FROM `mlab-sandbox.ookla_public.import_2020_Q1_fixed`
  ```
  You can either specify in the query settings to overwrite the existing table
  or save the results as a new table. You can also just run the query and then
  click “Save results” in the UI.

## Using Imported Geographies in Analyses with Other Datasets

Once we have the geographic data from our shapefile in a BigQuery, we can begin
using it with other datasets. Returning to the examples mentioned earlier, one
of the queries in our post, [Exploring NDT Data by Geography in Baltimore
City]({{ site.baseurl }}/blog/exploring-geographic-limits-of-ip-geolocation/#digging-deeper---what-else-can-m-labs-ndt-data-tell-us-about-baltimore-community-areas)
demonstrates the use of a couple [geography
functions](https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions)
to identify the statistical
area within the city for each NDT test in the selection. The Baltimore post
explores the limits of IP address geolocation in NDT tests, so as geographies
get smaller aggregations of NDT data by those geographies get less accurate. New
data collected with precise geolocation via GPS or other technologies can
overcome this limitation. The same is true for the European Union geographies
mentioned previously. The EU defines the [NUTS
classification](https://ec.europa.eu/eurostat/web/nuts/background) which stands
for Nomenclature of territorial units for statistics, representing EU country
geographies at three levels:

* NUTS 1: major socio-economic regions
* NUTS 2: basic regions for the application of regional policies
* NUTS 3: small regions for specific diagnoses

These examples use geographies that define geopolitical boundaries, but others
use a more general standard. For example, I mentioned the Ookla for Good public
datasets which I’ve explored using GIS functions [in a recent post]({{
site.baseurl }}/blog/arc-research-pt2/). In their [archive](https://registry.opendata.aws/speedtest-global-performance/)
and on [Github](https://github.com/teamookla/ookla-open-data), they provide this description:

  This dataset provides global fixed broadband and mobile (cellular) network
  performance metrics in zoom level 16 web mercator tiles (approximately 610.8
  meters by 610.8 meters at the equator). 

The Ookla public data breaks up the globe into blocks of “approximately 610.8
meters by 610.8 meters at the equator” instead of geopolitical areas like census
blocks, regions, counties, countries, etc. To use this data with geopolitical
geographies, we can query to find the tiles that intersect between the two.
