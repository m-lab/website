---
layout: page
permalink: /tests/ndt/views/examples/
title: "NDT Unified Views Example Queries"
breadcrumb: tests
---

# NDT Unified Views Example Queries

## Download Tests in a Date Range from a Location Using Annotated Fields

```~sql
SELECT
  date,
  a.UUID,
  a.MeanThroughputMbps,
  a.MinRTT,
  a.LossRate,
  client.Geo.city,
  client.Geo.postalCode,
  client.Geo.latitude,
  client.Geo.longitude,
  client.Network.ASNumber
FROM
  `measurement-lab.ndt.unified_downloads`
WHERE 
  date BETWEEN "2021-01-01" AND "2021-03-31"
  AND client.Geo.city = "Baltimore"
  AND client.Geo.countryCode = "US"
ORDER BY client.Geo.postalCode ASC, a.MeanThroughputMbps DESC
```

<br>
## Count of Download Tests by Postal Code in a Date Range

```~sql
SELECT
  COUNT(*) AS test_count,
  client.Geo.postalCode AS zip_code
FROM
  `measurement-lab.ndt.unified_downloads`
WHERE 
  date BETWEEN "2021-01-01" AND "2021-03-31"
  AND client.Geo.city = "Baltimore"
  AND client.Geo.countryCode = "US"
GROUP BY zip_code
ORDER BY zip_code
```

<br>
## Count of Download Tests and Basic Statisics in a Date Range, in Specific Postal Codes

```~sql
SELECT
  client.Geo.postalCode AS zip_code,
  client.Network.ASNumber AS ASN,
  COUNT(*) AS sample_size,
  MIN(a.MeanThroughputMbps) AS download_MIN,
  APPROX_QUANTILES(a.MeanThroughputMbps, 100) [SAFE_ORDINAL(25)] AS download_Q25,
  APPROX_QUANTILES(a.MeanThroughputMbps, 100) [SAFE_ORDINAL(50)] AS download_MED,
  AVG(a.MeanThroughputMbps) AS download_AVG,
  APPROX_QUANTILES(a.MeanThroughputMbps, 100) [SAFE_ORDINAL(75)] AS download_Q75,
  MAX(a.MeanThroughputMbps) AS download_MAX
FROM
  `measurement-lab.ndt.unified_downloads`
WHERE 
  date BETWEEN "2021-01-01" AND "2021-03-31"
  AND client.Geo.city = "Baltimore"
  AND client.Geo.countryCode = "US"
  AND client.Geo.postalCode IN ("21224", "21217")
GROUP BY zip_code, ASN
ORDER BY zip_code, ASN
```

<br>
## Selecting Download and Upload Tests in the Same Result Set, Using Sub-Queries

```~sql
WITH 
downloads AS (
  SELECT
    "download" AS test_direction,
    date,
    a.UUID,
    a.MeanThroughputMbps,
    a.MinRTT,
    a.LossRate,
    client.Geo.city,
    client.Geo.postalCode,
    client.Geo.latitude,
    client.Geo.longitude,
    client.Network.ASNumber
  FROM
    `measurement-lab.ndt.unified_downloads`
  WHERE 
    date BETWEEN "2021-01-01" AND "2021-03-31"
    AND client.Geo.city = "Baltimore"
    AND client.Geo.countryCode = "US"
),
uploads AS (
  SELECT
    "upload" AS test_direction,
    date,
    a.UUID,
    a.MeanThroughputMbps,
    a.MinRTT,
    a.LossRate,
    client.Geo.city,
    client.Geo.postalCode,
    client.Geo.latitude,
    client.Geo.longitude,
    client.Network.ASNumber
  FROM
    `measurement-lab.ndt.unified_uploads`
  WHERE 
    date BETWEEN "2021-01-01" AND "2021-03-31"
    AND client.Geo.city = "Baltimore"
    AND client.Geo.countryCode = "US"
)
SELECT * FROM downloads
UNION ALL (SELECT * FROM uploads)
ORDER BY date, postalCode
```