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

To make our traceroute data in BigQuery more useful, researchers have sought an easy [way to reconstruct the path of hops][1]{:target="_blank"} for the same test. This task was particularly hard because the schema, which was designed many years ago, put the hops of the same test in different rows.

To address this need from many of our partners and researchers, M-Lab is delighted to announce that the `traceroute` BigQuery table in the `aggregate` dataset is now available to the public. The new `traceroute` schema has one test per row, and all hops for a single test are inside the same row.<!--more-->

[1]: https://nemelor.wordpress.com/2018/08/28/access-to-mlab-traceroute-data-from-google-bigquery/

Here is the new schema, which also adds ASN annotation for traceroute source, destination, and hops:

![schema_1]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema1.png)

![schema_2]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema2.png)

![schema_3]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema3.png)

The new BigQuery table preserves all information that was in the previous table, `measurement-lab.base_tables.traceroute`, with better geo-location annotation coverage using time-based Maxmind databases. The geo-location annotation rate for traceroute source and destination are 100%. For traceroute tests since 2017, the geo-location annotation rate for hops almost doubled from ~20% in the BigQuery table, to >40% in current BigQuery table. The ASN annotation rate is about 97%.

## Sample Queries

Here are some sample queries to access the `traceroute` table with the new schema:

### Count how many traceroute tests per day given a time range

~~~sql
SELECT
  ts,
  COUNT(*) AS num
FROM (
  SELECT
    DATE(TestTime) as ts
  FROM `measurement-lab.aggregate.traceroute`
  WHERE
  DATE(TestTime) BETWEEN DATE("2016-01-01") AND DATE("2018-06-30")
)
GROUP BY ts
ORDER BY ts DESC
~~~

### Count rate of source and destination IP being annotated with Geolocation information

~~~sql
SELECT
  ts,
  COUNTIF(s_long IS NOT NULL AND s_lant IS NOT NULL) / COUNT(*) AS s_geo_success_rate,
  COUNTIF(d_long IS NOT NULL AND d_lant IS NOT NULL) / COUNT(*) AS d_geo_success_rate
FROM (
  SELECT
    DATE(TestTime) as ts,
    Source.Geo.longitude AS s_long,
    Source.Geo.latitude AS s_lant,
    Destination.Geo.longitude AS d_long,
    Destination.Geo.latitude AS d_lant
  FROM `measurement-lab.aggregate.traceroute`
  WHERE
    DATE(TestTime) BETWEEN DATE("2016-11-01") AND DATE("2016-11-30")
)
GROUP BY ts
ORDER BY ts DESC
~~~

### Count how many hops were in “New York” per day.

~~~sql
SELECT
  ts,
  COUNTIF(hop_ip IS NOT NULL) AS total_hops,
  COUNTIF(hop_city = 'New York' ) AS num_ny_hops\
FROM (
  SELECT
    DATE(TestTime) as ts,
    Parseinfo.TaskFileName,
    hops.Source.IP AS hop_ip,
    hops.Source.City AS hop_city,
    hops.Source.CountryCode AS hop_country
  FROM
    `measurement-lab.aggregate.traceroute` AS traceroute,
    UNNEST(traceroute.Hop) as hops
  WHERE
    DATE(TestTime) BETWEEN DATE("2017-08-01") AND DATE("2017-08-31")
)
GROUP BY ts
ORDER BY ts DESC
~~~

### Count how many hops were in a specific ASN

~~~sql
SELECT
  ts,
  COUNTIF(hop_ip IS NOT NULL) AS total_hops,
  COUNTIF(hop_asn = 15169 ) AS num_asn_hops
FROM (
  SELECT
    DATE(TestTime) as ts,
    hops.Source.IP AS hop_ip,
    hops.Source.ASN AS hop_asn
  FROM
    `measurement-lab.aggregate.traceroute` AS traceroute,
    UNNEST(traceroute.Hop) as hops
  WHERE
  DATE(TestTime)  BETWEEN DATE("2017-08-01") AND DATE("2017-08-31")
)
GROUP BY ts
ORDER BY ts DESC
~~~

### Count the annotation rate of ASN for hops

~~~sql
SELECT
  ts,
  COUNTIF(hop_ip IS NOT NULL) AS total_hops,
  COUNTIF(hop_asn <> 0 )/COUNTIF(hop_ip IS NOT NULL) AS rate_asn_hops
FROM (
  SELECT
    DATE(TestTime) as ts,
    hops.Source.IP AS hop_ip,
    hops.Source.ASN AS hop_asn
  FROM
    `measurement-lab.aggregate.traceroute` AS traceroute,
    UNNEST(traceroute.Hop) as hops
  WHERE
    DATE(TestTime)  BETWEEN DATE("2017-08-01") AND DATE("2017-08-31")
)
GROUP BY ts
ORDER BY ts DESC
~~~
