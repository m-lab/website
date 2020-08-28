---
layout: blog
title: "The majority of NDT clients have migrated to ndt7"
author: "Lai Yi Ohlsen, Stephen Soltesz"
date: 2020-08-27
breadcrumb: blog
categories:
  - ndt
  - ndt7
---

Over the past month, M-Lab has published a series of blog posts about ndt7. As of Thursday, August 13th, 2020 roughly 90% of NDT clients using secure websockets have completed the migration from ndt5 to ndt7.<!--more-->

* [Introducing ndt7]({{ site.baseurl }}/blog/ndt7-introduction)
* [Migrating NDT clients to ndt7]({{ site.baseurl }}/blog/migrating-ndt-clients-to-ndt7)
* [Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt)

Below is a screenshot of our internal monitoring for test traffic on August 14th, 2020, showing the ndt7 test count (green, above) in relation to the ndt5 test count (yellow, below).

![NDT Protocol Test Rates (Up, Down)]({{ site.baseurl }}/images/blog/2020-08-27-ndt7/image1.png)

## Migration Checklist

In our [migration announcement]({{ site.baseurl }}/blog/migrating-ndt-clients-to-ndt7/), we pledged to complete the tasks below prior to the majority migration.

✅ **The ndt7 data will be published to measurement-lab.raw_ndt.ndt7.**

You can access the published data via BigQuery in the [measurement-lab.raw_ndt.ndt7](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=raw_ndt&t=ndt7&page=table){:target="_blank"} table.

✅ **The ndt7 tables will have complete documentation on the M-Lab website.**

On our website we provide general information about NDT, the ndt5 and ndt7 protocols, and documentation of each protocol’s schema - the fields, data types, and descriptions that are stored in BigQuery. The [NDT page on our website]({{ site.baseurl }}/tests/ndt/) includes:

* NDT’s history
* Descriptions of NDT protocols, including [ndt5]({{ site.baseurl }}/tests/ndt/ndt5) and [ndt7]({{ site.baseurl }}/tests/ndt/ndt5)
* A list of all BigQuery tables and views for NDT protocols, and how to access them
* Access to the pre-filtered “Helpful” and “Faithful” NDT tables/views that we have designed to suit specific use cases in the M-Lab community

✅ **The ndt7 data will be included in the NDT unified views.**

You can access the NDT unified views in BigQuery

* [measurement-lab.ndt.unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}
* [measurement-lab.ndt.unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){:target="_blank"}

✅ **As the migration advances, there will be less ndt5 data and more ndt7 data**

```~sql
SELECT date, IF(node._Instruments="tcpinfo", "ndt5", node._Instruments) AS instruments, COUNT(*) AS total
FROM `measurement-lab.ndt.unified_downloads`
WHERE date > date("2020-07-01") AND date < date("2020-08-24")
GROUP BY date, instruments
ORDER BY date
```

![Graph of the query results above, showing decreasing ndt5 measurements and increasing ndt7 measurements]({{ site.baseurl }}/images/blog/2020-08-27-ndt7/image2.png)

✅ **The charts in the analysis will be reproducible using public tables**

In our entry criteria analysis, we used scatter plots comparing ndt5 and ndt7 performance for the same clients before and after migration. Below we provide example queries using the unified download views to recreate that analysis.

| ![Scatter plot comparing ndt5 and ndt7, reporting client download bandwidth]({{ site.baseurl }}/images/blog/2020-08-27-ndt7/image3.png) | ![Scatter plot comparing ndt5 and ndt7, reporting client minRTT]({{ site.baseurl }}/images/blog/2020-08-27-ndt7/image4.png) |

The left plot reports client download bandwidth in Mbps. The right plot reports client minRTT in milliseconds. In both plots, ndt5 metrics are plotted using the x-axis, and ndt7 metrics using the y-axis. Samples are restricted to clients having both 1 measurement before and after the pilot migration and minRTT measurements below 25 msec. In the minRTT subplot, ndt5 clients are much more likely to have higher minRTT values than ndt7 clients.

```~sql
-- Compare ndt5 measurements during the week before the 10% ndt7 pilot to ndt7
-- measurements during the week after the 10% pilot.
WITH ndt7 AS (
  SELECT
    client.IP as ClientIP,
    a.TestTime,
    a.UUID,
    a.CongestionControl,
    server.Site AS site,
    a.MeanThroughputMBPS as speed,
    a.MinRTT as MinRTT,
  FROM
    `measurement-lab.ndt.unified_downloads`
  WHERE
    -- Because only ndt7 uses BBR, this uniquely selects for ndt7 measurements.
    a.CongestionControl = "bbr"
),
ndt7_clients AS (
  SELECT
    site,
    clientIP,
    COUNT(uuid) AS tests,
    EXP(avg(LN(speed))) AS speed,
    EXP(avg(LN(minRTT))) AS minRTT,
    MAX(MinRTT)/MIN(MinRTT) AS rttSpread,
  FROM
    ndt7
  WHERE
        -- The week after the pilot begins.
        DATE(TestTime) BETWEEN "2020-07-08" AND "2020-07-15"
    AND speed > .01
    AND minRTT > 0
  GROUP BY
    site, clientIP
),
ndt5 AS (
  SELECT
    server.Site as site,
    id,
    client.IP as clientIP,
    a.TestTime as TestTime,
    a.MeanThroughputMbps as speed,
    a.MinRTT as MinRTT,
  FROM
    `measurement-lab.ndt.unified_downloads`
  WHERE
    -- Because ndt5 uses CUBIC, this uniquely selects for ndt5 measurements.
    a.CongestionControl = "cubic"
),
ndt5_clients AS (
  SELECT
    site, clientIP, COUNT(id) AS tests,
    EXP(avg(LN(speed))) AS speed,
    -- This adds some fuzz to the integer minRTT to enhance plotting
    EXP(avg(LN(minRTT)))+IF(COUNT(id) = 1,.6*RAND()-.3,0) AS minRTT,
    MAX(MinRTT)/MIN(MinRTT) AS rttSpread,
  FROM
    ndt5
  WHERE
        -- The week before the pilot begins.
        DATE(TestTime) BETWEEN "2020-07-01" AND "2020-07-08"
    AND speed > .01
    AND minRTT > 0
  GROUP BY
    site, clientIP
)

SELECT
  ndt5_clients.speed as ndt5_speed,
  ndt5_clients.minRTT as ndt5_minrtt,
  ndt7_clients.speed as ndt7_speed,
  ndt7_clients.minRTT as ndt7_minrtt,
  MOD(ABS(FARM_FINGERPRINT(ndt5_clients.clientIP)),100) AS rand,
FROM
  ndt5_clients JOIN ndt7_clients ON (
        ndt5_clients.clientIP = ndt7_clients.clientIP
    AND ndt5_clients.site = ndt7_clients.site
  )
WHERE
  -- Limit results to clients that had a single test with ndt5 and ndt7.
  -- This attempts to limit the influence of IPs with multiple clients,
  -- such as carrier-grade NATs.
      ndt5_clients.tests = 1
  AND ndt7_clients.tests = 1
  -- Limit results to clients with a small MinRTT.
  AND ndt5_clients.minRTT BETWEEN 0 and 25
  AND ndt7_clients.minRTT BETWEEN 0 and 25
```

<br/><br/>
✅ **Publish advice for working with the longitudinal history of all NDT data**

In our [Evolution of NDT blog post]({{ site.baseurl }}/blog/evolution-of-ndt), we introduced the nuances of comparing the NDT datasets across significant transitions. Each dataset is internally consistent. Until more research is completed, comparisons of measurements across transition points should be done with care.

When using data across significant transitions, please indicate the transition in your representation of the data. For example, November 2019 for the platform migration with ndt5 and August 2020 for the migration to ndt7.

## Final notes

Next, we will continue to develop the NDT7 JavaScript reference client. We will update our blog and mailing list once it is complete. If you are interested in integrating NDT7 using Javascript before the reference client is complete, please feel free to reach out to support@measurementlab.net for support. NDT7 clients must use the [Locate API v2]({{ site.baseurl }}/develop/locate-v2/).

We will implement an “early exit” feature, which will allow an ndt7 test to terminate as soon as BBR metrics indicate an optimal rate (e.g. using pacing gain).

We will continue to support ndt5 for the near future. When we decide on a definitive date to stop supporting ndt5, we will give the NDT client integration community an ample amount of notice and time to prepare.

The [Evolution of NDT]({{ site.baseurl }}/blog/evolution-of-ndt) introduces a list of open questions that we intend to investigate as transparently as possible and we invite the M-Lab community to help us do so collaboratively. You can read more about our initial ideas and provide feedback on them [by completing this brief survey](https://docs.google.com/forms/d/e/1FAIpQLScIbL03mHmAu1xO_vIaNNjBHLqrMGi3fdyKGiVms270nH3Vcg/viewform){:target="_blank"}. You can also reach out to us directly at support@measurementlab.net.
