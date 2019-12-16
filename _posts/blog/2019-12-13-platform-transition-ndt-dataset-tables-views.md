---
layout: blog
title: "Platform Transition Update - NDT Dataset, Tables, & Views"
author: "Chris Ritzo"
date: 2019-12-13
breadcrumb: blog
categories:
  - data
  - ndt
  - schema
---

If you've been following our blog over the last few months, you know M-Lab has been working toward a complete server platform upgrade. In September and October, we paused our platform upgrade to support the United States Federal Communications Commission's (FCC) annual Measuring Broadband America program (MBA). For many years, FCC contractor SamKnows has used the M-Lab platform for the "off-net" measurements in the MBA program. Once the official end of the MBA data collection period was announced, the M-Lab team began upgrading the remaining servers in our fleet. As of November 20, 2019, all M-Lab servers are now managed by Kubernetes, running Docker container services for all experiments.

This transition has greatly improved our platform management, this post addresses the short term impact on downstream data users and applications, and outlines a temporary solution and our longer term for new NDT tables/views.<!--more-->

## Change in NDT data publishing dataset, tables, and views

During the staged rolling upgrade to `ndt-server`, NDT test data were published to two different datasets. Our ETL pipeline made NDT tests collected by the `web100` version of the NDT server available in these BigQuery Views:

* `measurement-lab.ndt.recommended`
* `measurement-lab.ndt.downloads`
* `measurement-lab.ndt.uploads`
* `measurement-lab.ndt.web100`

As of Nov. 20, 2019, all new test data is being published to:

* `measurement-lab.ndt.ndt5`

And a new view has been created, which stores `tcpinfo` values, and client / server metadata:

* `measurement-lab.ndt.tcpinfo`

## Current impact of tcpinfo transition on queries

Having the transition to the new `ndt-server` completed is an accomplishment that our team is celebrating. However, we still have a little more work to do. If you've tried to query `ndt.web100`, `ndt.recommended`, `ndt.downloads`, or `ndt.uploads` recently, you may have noticed a decrease in test volume through November, with no results after November 20.

To see the impact of this transition in test counts, we can run a query to count the number of tests in each table per day over the timeline of the platform transition, roughly 2019-07-01 through 2019-11-20:

```~sql
#standardSQL
WITH
ndt_web100 AS (
  SELECT count(*) AS cnt_web100, partition_date AS web100_date
  FROM `measurement-lab.ndt.recommended`
  WHERE partition_date >= '2019-07-01'
  GROUP BY partition_date
),
ndt5_tcpinfo AS (
  SELECT count(*) AS cnt_ndt5, partition_date AS ndt5_date
  FROM `measurement-lab.ndt.ndt5`
  WHERE partition_date >= '2019-07-01'
  GROUP BY partition_date
)
SELECT * FROM ndt_web100
JOIN ndt5_tcpinfo ON ndt_web100.web100_date = ndt5_tcpinfo.ndt5_date
ORDER BY web100_date
```

The query results show decreasing daily test counts in `measurement-lab.ndt.recommended` and increasing daily test counts in `measurement-lab.ndt.ndt5` between 2019-07-18 and 2019-11-20.

Our new canonical table for `ndt5` data is `measurement-lab.ndt.ndt5`, but currently only test data is present there-- it doesn't yet contain annotated fields parsed by our annotation service. So in the short term, to query for client geographic fields or other metadata, you must query both tables to get NDT results from `measurement-lab.ndt.ndt5` and some test metadata from `measurement-lab.ndt.tcpinfo` using the `UUID` field.

Additionally, the platform change from `web100` to `tcp_info` will likely require some changes to your queries. There are big differences in the values collected by `web100` and `tcp_info`. We have attempted to map the most common metrics and fields from each in the table below. If there are `web100` values that you previously used that are not listed below, please let us know.

## Updating your queries with data from ndt5 with tcpinfo views

To illustrate the changes brought on by the transition to `tcp_info` and the current status of the `ndt5` view, we present a before/after query below.

**Upload results using previous `web100` BigQuery views:**

```~sql
#standardSQL
SELECT
  test_id,
  FORMAT_TIMESTAMP('%F %H:%m:%S', log_time) AS UTC_date_time,
  connection_spec.client_ip,
  connection_spec.client_geolocation.latitude AS client_latitude,
  connection_spec.client_geolocation.longitude AS client_longitude,
  connection_spec.client_geolocation.country_code AS country_code,
  connection_spec.client_geolocation.region AS region,
  connection_spec.client_geolocation.city AS city,
  connection_spec.client_geolocation.postal_code AS postal_code,
  8 * web100_log_entry.snap.HCThruOctetsReceived/web100_log_entry.snap.Duration AS uploadThroughput,
  web100_log_entry.snap.Duration AS duration,
  web100_log_entry.snap.HCThruOctetsReceived AS HCThruOctetsRecv
FROM `measurement-lab.ndt.uploads`
WHERE
  partition_date BETWEEN '2019-11-01' AND '2019-11-02'
  AND connection_spec.client_geolocation.country_code = 'US'
  AND connection_spec.client_geolocation.region IN ('OR', 'WA','ID')
ORDER BY partition_date ASC, log_time ASC
```

<br>
**Equivalent Query for Upload results using `ndt5` and `tcpinfo` BigQuery views:**

```~sql
#standardSQL
SELECT
  ndt5.ParseInfo.TaskFileName AS test_id,
  TIMESTAMP_SECONDS(ndt5.log_time) AS UTC_date_time,
  ndt5.result.ClientIP AS client_ip,
  tcpinfo.Client.Geo.latitude AS client_latitude,
  tcpinfo.Client.Geo.longitude AS client_longitude,
  tcpinfo.Client.Geo.country_code AS country_code,
  tcpinfo.Client.Geo.region AS region,
  tcpinfo.Client.Geo.city AS city,
  tcpinfo.Client.Geo.postal_code AS postal_code,
  ndt5.result.C2S.MeanThroughputMbps AS uploadThroughput,
  TIMESTAMP_DIFF(ndt5.result.C2S.EndTime, ndt5.result.C2S.StartTime, MICROSECOND) AS duration,
  tcpinfo.FinalSnapshot.TCPInfo.BytesReceived AS HCThruOctetsRecv,
  ndt5.result.C2S.UUID AS test_UUID
FROM
  `measurement-lab.ndt.ndt5` ndt5,
  `measurement-lab.ndt.tcpinfo` tcpinfo
WHERE
  ndt5.partition_date BETWEEN '2019-11-01' AND '2019-11-02'
  AND ndt5.result.C2S.UUID = tcpinfo.UUID
  AND tcpinfo.Client.Geo.country_code = 'US'
  AND tcpinfo.Client.Geo.region IN ('OR', 'WA','ID')
ORDER BY ndt5.partition_date ASC, ndt5.log_time ASC
```

<br>
**Download results using previous `web100` BigQuery views:**

```~sql
#standardSQL
SELECT
  test_id,
  FORMAT_TIMESTAMP('%F %H:%m:%S', log_time) AS UTC_date_time,
  connection_spec.client_ip,
  connection_spec.client_geolocation.latitude AS client_latitude,
  connection_spec.client_geolocation.longitude AS client_longitude,
  connection_spec.client_geolocation.country_code AS country_code,
  connection_spec.client_geolocation.region AS region,
  connection_spec.client_geolocation.city AS city,
  connection_spec.client_geolocation.postal_code AS postal_code,
  8 * web100_log_entry.snap.HCThruOctetsAcked/ (
    web100_log_entry.snap.SndLimTimeRwin + web100_log_entry.snap.SndLimTimeCwnd + web100_log_entry.snap.SndLimTimeSnd) AS downloadThroughput,
  web100_log_entry.snap.Duration AS duration,
  web100_log_entry.snap.HCThruOctetsReceived AS HCThruOctetsRecv
FROM `measurement-lab.ndt.uploads`
WHERE
  partition_date BETWEEN '2019-11-01' AND '2019-11-02' AND
  connection_spec.client_geolocation.country_code = 'US' AND
  connection_spec.client_geolocation.region IN ('OR', 'WA','ID')
ORDER BY partition_date ASC, log_time ASC
```

<br>
**Equivalent Query for Download results using `ndt5` and `tcpinfo` BigQuery views:**

```~sql
#standardSQL
SELECT
  ndt5.ParseInfo.TaskFileName AS test_id,
  TIMESTAMP_SECONDS(ndt5.log_time) AS UTC_date_time,
  ndt5.result.ClientIP AS client_ip,
  tcpinfo.Client.Geo.latitude AS client_latitude,
  tcpinfo.Client.Geo.longitude AS client_longitude,
  tcpinfo.Client.Geo.country_code AS country_code,
  tcpinfo.Client.Geo.region AS region,
  tcpinfo.Client.Geo.city AS city,
  tcpinfo.Client.Geo.postal_code AS postal_code,
  ndt5.result.S2C.MeanThroughputMbps AS downloadThroughput,
  TIMESTAMP_DIFF(ndt5.result.S2C.EndTime, ndt5.result.S2C.StartTime, MICROSECOND) AS duration,
  tcpinfo.FinalSnapshot.TCPInfo.BytesReceived AS HCThruOctetsRecv,
  ndt5.result.S2C.UUID AS test_UUID
FROM
  `measurement-lab.ndt.ndt5` ndt5,
  `measurement-lab.ndt.tcpinfo` tcpinfo
WHERE
  ndt5.partition_date BETWEEN '2019-11-01' AND '2019-11-02'
  AND ndt5.result.S2C.UUID = tcpinfo.UUID
  AND tcpinfo.Client.Geo.country_code = 'US'
  AND tcpinfo.Client.Geo.region IN ('OR', 'WA','ID')
ORDER BY ndt5.partition_date ASC, ndt5.log_time ASC
```

<br>
## What's next?

By the end of January 2020, the M-Lab team will create and update the schema for `measurement-lab.ndt.ndt5`, providing unified views of NDT data collected before and after our transition to the new `ndt-server`. Until that time, we encourage users of our datasets to either use a JOIN to retrieve metadata for NDT tests results, and to wait for the updated `ndt5` schema to update their queries or applications that query for M-Lab data.

If you have questions or concerns with these changes or need assistance transitioning your queries, please reach out via support@measurementlab.net.