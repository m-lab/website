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

![schema_1]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema1.png)

![schema_2]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema2.png)

![schema_3]({{ site.baseurl }}/images/blog/2019-08-01-traceroute/schema3.png)

The new BigQuery table preserves all information in legacy tables, with better Geolocation annotation coverage using time-based Maxmind databases. The Geolocation annotation rate for traceroute source and destination are 100%. For traceroute tests since 2017, the Geolocation annotation rate for hops almost doubled from ~20% in legacy BigQuery table, to >40% in current BigQuery table. The ASN annotation rate is about 97%.

Here are the sample BigQuery to access the table with new schema:


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

Count rate of source and destination IP being annotated with Geolocation information:

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

Count how many hops was in “New York” per day.

SELECT
ts,
COUNTIF(hop_ip IS NOT NULL) AS total_hops,
COUNTIF(hop_city = 'New York' ) AS num_ny_hops

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


4. Count how many hops was in a specific ASN:

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


5. The annotation rate of ASN for hops:

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

