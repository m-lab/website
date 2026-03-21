---
layout: blog
title: "ARC of Research pt. 3: Peak/Non-Peak Hours"
author: "Chris Ritzo"
date: 2022-02-21
breadcrumb: blog
categories:
  - ndt
  - bigquery
  - data
  - gis
  - tutorial
---

In the previous “ARC of Research” post, we explored NDT and Ookla for Good
public data by postal code and demonstrated several recommendations for analysis
and aggregation of NDT data: aggregate by ASN or provider, use a limited time
frame, aggregate using an appropriate geographic area, and provide additional
metrics besides median and average. Here we will look at the final
recommendation from that post: separating aggregations for peak and off-peak
times.<!--more-->

Our last post, [Exploring Data Sources Relevant to Our Questions]({{
site.baseurl }}/blog/arc-research-pt2/), we left off
with a look at aggregate NDT measurements by ASN in the Maryland postal code, 21837.
Of the ASNs we looked at, Comcast was the only provider we know to be
providing fixed home service. We were also viewing aggregate data over a three
month period. We’ll next explore this same data for Comcast, but breaking down
the analysis to see aggregate metrics by hour of the day, and specific ranges of
hours corresponding to peak and off-peak hours as defined by the FCC. 

As in previous posts in this series, we’ve prepared a [Colab
Notebook](https://colab.research.google.com/drive/16qBzJk9VE-blOBxdFdn-GzABx2o8PjZv?usp=sharing)
to demonstrate and run queries and graph the results for our exploration. We
begin this notebook with the final query and graph from part 2, then move on to
examples of how to segment tests by hour of the day and aggregate by peak and
off-peak hours.

## Separating aggregations for peak and off-peak times

Up to this point we’ve been working with a selection of NDT tests submitted in
Q3 2020 from users IP geolocated in Maryland, USA, in postal code 21837. We’ll
now build on that by looking at aggregations of tests taken only during specific
hours of the day. Why would we do this?

In its annual Measuring Broadband America study, the [US Federal Communications
Commission defines peak
hours](https://www.fcc.gov/reports-research/reports/measuring-broadband-america/measuring-fixed-broadband-eleventh-report)
as the days and times when, “more people tend to
use their broadband Internet connections, giving rise to greater potential for
network congestion and degraded user performance.” The FCC defines peak
hours as “weeknights between 7:00 p.m. to 11:00 p.m. local time at the
subscriber’s location”, and explains that, “[f]ocusing on peak usage period
provides the most useful information because it demonstrates what performance
users can expect when the Internet in their local area experiences the highest
demand from users.”

Though NDT isn’t measuring the same thing as the FCC’s MBA program's tests, we’ll
borrow the FCC’s definition of peak hours here as we look at NDT tests from this
postal code in Q3 2020. But first, we need to understand how to convert NDT’s
field TestTime to the local time for each test.

So far in our example queries, we’ve used two fields that identify a date or time:
```
…
WHERE
    date IS NOT NULL
    AND EXTRACT(QUARTER FROM TIMESTAMP(a.TestTime)) = 3
…
```

* `date` is the field which partitions the NDT unified views, and is derived
  from the date when the test row was parsed from raw storage to BigQuery. M-Lab
  requires some date filter on this field for queries to encourage query efficiency.
* `TestTime` is the specific time when the test was started. We’ve used it to
  obtain the quarter of the year. 

To aggregate by time of day when NDT tests were conducted, we need to know that
date, time, and timestamp fields in NDT results are saved in UTC or Coordinated
Universal Time. So we need to adjust the `TestTime` to its local time. If we
want to include only tests between 7:00pm and 11:00pm local time, Monday through
Friday, we need to make this adjustment in our selection and aggregation. To do
this we’ll need a way to look up the timezone. We’ll use an SQL function similar
to how we pulled the quarter, but using the function’s TimeZone option. For
example, to get the quarter in which a test was run, adjusted for the local time
zone in Maryland we could use:

`EXTRACT(QUARTER FROM TIMESTAMP(a.TestTime, ‘America/New_York’)) AS quarter `

But where do we find the field TimeZone for every test in a given selection?
Here we’ll introduce some of BigQuery’s GIS functions using the IP address
geolocated latitude and longitude for each test, and a table defining the
geographies of time zones worldwide. We’ve [touched on GIS and geographies in the
past]({{ site.baseurl }}/blog/exploring-geographic-limits-of-ip-geolocation/),
and recently published a post on [how to work with them in BigQuery]({{
site.baseurl }}/blog/#). For now, you just need to know that we downloaded a set
of [shapefiles that define the time zones of the
world](https://github.com/evansiroky/timezone-boundary-builder), and when loaded
into a BigQuery table: `measurement-lab.geographies.timezones`. We can then use
the latitude and longitude of each NDT test to determine the time zone in which
each test’s IP address was located.

There are two fields we’ll use in `measurement-lab.geographies.timezones`:

* **WKT** - Well Known Text - The name is standard in the GIS world, and refers to a
  format defining a shape, polygon, or geographic area as a series of latitude
  and longitude points
* **tzid** - Timezone ID - This is the field we’ll use to adjust `TestTime`. It’s in
  a format that may look familiar if you’ve worked at all with time zones, for
  example: “America/New_York”

We’ll then use the NDT latitude and longitude for each test, to determine which
timezone the test was located in according t Maxmind using the following
addition to our query at the end of the WHERE statement:

```
  AND ST_WITHIN(
    ST_GeogPoint(
      client.Geo.Longitude,
      client.Geo.Latitude
    ), timezones.WKT
  )
```

## [Example 1 - Adjusting Coordinated Universal Time (UTC) to the Local Timezone](https://www.google.com/url?q=https://colab.research.google.com/drive/16qBzJk9VE-blOBxdFdn-GzABx2o8PjZv?authuser%3D1%23scrollTo%3DKJLZ6eLZGs5y%26line%3D1%26uniqifier%3D1&sa=D&source=docs&ust=1645096559546100&usg=AOvVaw07XNScLajbndqsTXZcUAbw)

We first use a sub-query to select the timezone information using:

```
WITH
timezones AS (
  SELECT WKT, tzid AS TimeZone
  FROM `measurement-lab.geographies.timezones`
),
```

Then in our SELECT statements for download and upload tests, we’ve added a few
fields we’ll need later to demonstrate how to adjust `TestTime` in various ways:

```
  a.TestTime AS TestTime_UTC,
  TimeZone,
  DATETIME(a.TestTime, TimeZone) AS TestTime_local,
  EXTRACT(HOUR FROM TIME(a.TestTime, TimeZone)) AS hour_localtime,
  EXTRACT(DAYOFWEEK FROM DATETIME(a.TestTime, TimeZone)) AS weekday_local
```

In our FROM statement, we add the named sub-query, _timezones_, so we can select
field from it:

```
FROM `measurement-lab.ndt.unified_downloads`, timezones
```

And finally, in the WHERE statement, we filter to the timezone of each test,
using two GIS functions to identify the timezone in which each NDT test’s
latitud and longitude is located:

```
  AND ST_WITHIN(
    ST_GeogPoint(
      client.Geo.Longitude,
      client.Geo.Latitude
    ), timezones.WKT
  )
```

To learn more about the BigQuery functions used here, please visit:
https://cloud.google.com/bigquery/docs/reference/standard-sql/time_functions
https://cloud.google.com/bigquery/docs/reference/standard-sql/datetime_functions
https://cloud.google.com/bigquery/docs/reference/standard-sql/geography_functions 

## [Example 2 - Filter Tests to Those Conducted in Peak Hours, Local Time Adjusted](https://colab.research.google.com/drive/1GBUMQp0nWvoZ5sT4geEGfhCzlGPvcBwl#scrollTo=mpx1hAY-BzTq&line=1&uniqifier=1)

Now that we’ve adjusted `TestTime` to local time in our selection of tests, we
can limit our results to only those conducted on weekdays between 7:00pm -
11:00pm in Example 2.

To filter the tests in our upload and download selection to only those conducted
in peak hours we can use two fields we added to the previous query,
`hour_localtime` and `weekday_local` within the sub-queries
`ndt_dl_metrics_postalcode` and `ndt_ul_metrics_postalcode`. Below is the
sub-query that calculates download test metrics:


```
…
ndt_dl_metrics_postalcode AS (
 SELECT
   TimeZone,
   PostalCode,
   ASNumber,
   ASName,
   COUNT(DISTINCT(IP)) AS dl_unique_ips,
   COUNT(*) AS dl_samples,
   ROUND(APPROX_QUANTILES(download_Mbps, 100) [SAFE_ORDINAL(10)],3) AS download_Q10,
   ROUND(AVG(download_Mbps),3) AS ndt_download_avg,
   ROUND(AVG(download_Mbps) * (SELECT COUNT(*) FROM ndt_dl_tests) /
     (SELECT COUNT(*) FROM ndt_dl_tests),3) AS ndt_dl_wt_mean,
   ROUND(APPROX_QUANTILES(download_Mbps, 100) [SAFE_ORDINAL(50)],3) AS download_MED, 
   ROUND(APPROX_QUANTILES(download_Mbps, 100) [SAFE_ORDINAL(95)],3) AS download_Q95  
 FROM ndt_dl_tests
 WHERE
   weekday_local IN (2, 3, 4, 5, 6)
   AND hour_localtime IN (19, 20, 21, 22, 23)
 GROUP BY TimeZone, PostalCode, ASNumber, ASName
),
…
```

We’ve limited the aggregation to include only tests in peak hour using the two
lines in the WHERE statement:

```
…
 WHERE
   weekday_local IN (2, 3, 4, 5, 6)
   AND hour_localtime IN (19, 20, 21, 22, 23)
```
 
We’ve also simplified the overall query and made it more efficient by moving the
calculation of weighted averages into these sub-queries rather than having them
in separate ones. Note that the calculation of weighted average also includes
additional in-line sub-queries:
 
```
…
   ROUND(AVG(download_Mbps) * (SELECT COUNT(*) FROM ndt_dl_tests) /
     (SELECT COUNT(*) FROM ndt_dl_tests),3) AS ndt_dl_wt_mean,
…
```

We can also compare metrics for peak hours to off-peak hours very easily, which
we’ve done in Example 3 by adding additional sub-queries for off-peak
aggregation. Example 3 also adds the field `timeGrouping`, and summarizes the
peak and off-peak metrics as separate rows in the end result to facilitate
grouping and graphing them separately. You can review the differences in the
final graph of the colab notebook. We can see some interesting results for peak
and off peak metrics in Q3 2020 for Comcast in 21837 in the chart below. 

![NDT Peak/Off-Peak Comparison of Comcast Users in Maryland Postal Code 21837 in
Q3 2020]({{ site.baseurl }}/images/blog/2022-02-21-arc-research3/peak-off-peak-21837.png)

At first glance we can see the metrics for off-peak times are oddly the same.
The peak hours graphs show some variation. In the Colab notebook, we can hover
over each bar to reveal the rounded throughput measured, and view the tables
below showing the number of samples and the number of unique IP addresses that
produced the sample. This reveals a very small number of tests and IP addresses:

![Example 3 - Number of Tests and Unique IPs in Peak Hours]({{ site.baseurl }}/images/blog/2022-02-21-arc-research3/21837-peak-num_samples_ips.png)
![Example 3 - Number of Tests and Unique IPs in Off-Peak Hours]({{ site.baseurl
}}/images/blog/2022-02-21-arc-research3/21837-off-peak_num_samples_ips.png)

This should make it clear that we don’t have enough data in the sample from
enough unique users to really trust these results to be generalizable across the
entire postal code for the entire quarter. We need more data from more users.
How much more is a question that needs to be answered before proceeding with a
real world analysis. Why are there so few tests from 21837 in the NDT dataset
for Q3 2020? Looking it up on a map likely explains this- we chose this postal
code specifically because it was likely to have low population density.

For the sake of comparison then, let’s repeat this analysis with a more
populated area. [Example
4](https://colab.research.google.com/drive/16qBzJk9VE-blOBxdFdn-GzABx2o8PjZv?authuser=1#scrollTo=0FH_BNSnOCIF)
and its accompanying graph repeat this query for postal code 21216, which covers
several neighborhoods in Baltimore’s west side. The results are shown in the
graph below which can be explored in more detail in our notebook.

![NDT Peak/Off-Peak Comparison of Comcast Users in Maryland Postal Code 21216 in
Q3 2020]({{ site.baseurl }}/images/blog/2022-02-17-arc-research3/peak-off-peak-21216.png)
![Example 4 - Number of Tests and Unique IPs in Peak Hours]({{ site.baseurl }}/images/blog/2022-02-21-arc-research3/21216-peak-num_samples_ips.png)
![Example 4 - Number of Tests and Unique IPs in Off-Peak Hours]({{ site.baseurl
}}/images/blog/2022-02-21-arc-research3/21216-off-peak-num_samples_ips.png)

## Wrapping up

This post discussed how to aggregate NDT data more specifically using a single
ISP in a single postal code, within a limited day range (Q3 2020), and with
separate metrics for peak and off peak hours.

In the next post in this series, we’ll dig deeper into these examples by
introducing the concept of sample distributions, and examine the distribution of
our samples to determine how “normal” they are, or if additional breakdowns or
distinctions would improve them.

