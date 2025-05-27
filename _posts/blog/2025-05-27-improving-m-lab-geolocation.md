---
layout: blog
title: "How M-Lab Determines User Location and Selects Servers"
author: "Loqman Salamatian, Phillipa Gill"
date: 2025-05-27
breadcrumb: blog
categories:
  - data
  - accuracy
  - research
  - community
---


This blog post describes the two geolocation systems M-Lab uses for server selection and data annotation and how researchers can leverage metadata about the server selection to identify potentially erroneous client geolocation results in the annotated data. <!--more-->

<div style="background-color: #E7F1FF; padding: 10px;">
  This post was contributed by a member of the M-Lab community. 
  We value input from our community and invite others to share their insights on internet measurement, research, and related topics. 
  <p>Interested in contributing? Please email us at <strong>hello@measurementlab.net</strong>.</p>
</div>
<br>

## Geolocation at Test Time

The user’s location for server selection is determined using **metadata from the HTTP request**, including the IP address and other client hints provided by **Google’s App Engine**. This method offers a relatively accurate view of where the user is, and it’s used to make sure the test runs against an appropriate nearby server.

## Geolocation in the Public Dataset

When test results are stored in BigQuery, M-Lab uses a different system to determine location: **MaxMind’s GeoLite2 database**. The processing pipeline applies this annotation within a few hours of each test using a fresh copy of the MaxMind database. This database maps IP addresses to cities and countries, but it may be less accurate in certain contexts, especially for mobile users, VPNs, or users behind NATs. Specifically, [MaxMind reports accuracies of 99.8% and 66% at the country and city levels,](https://support.maxmind.com/hc/en-us/articles/4407630607131-Geolocation-Accuracy) respectively. 

Depending on the type of research being done with the data, country-level accuracy may be sufficient, but other applications benefit from identifying erroneous geolocation results at finer granularities. Below, we describe how to leverage these two geolocation systems to identify potentially incorrect client geolocation results in the BigQuery data.

## Identifying Geolocation Inconsistencies

Recall, there are two geolocation systems in play:

* **Google/App Engine geolocation**: Used at test time to select a server.  
* **MaxMind geolocation**: Used in the dataset to report user location.

This can lead to inconsistencies between where the test was *served* and where the user *appears* to be in the data that we can leverage to identify potentially incorrect client geolocation in the BigQuery data.

Specifically, we recommend looking at cases where the “metro\_rank”[^1] field is 0 (indicating that the **Locate API** served it to the closest site). You can then compute the nearest server metro to the client location published in BigQuery. If the nearest server metro does not match the metro of the server that was used for the test, this indicates a potential discrepancy between the geolocation result of the Locate API (used for server selection) and the one of MaxMind (used to annotate the data). Note that this does not tell you which geolocation result was *correct,* but it indicates a potential error in the client geolocation that can be filtered for applications that are sensitive to the specific client location.

The SQL below gives an example of performing this process.

## Query to Select Consistent Geolocations

The following query identifies and keeps only the client IPs that show consistent geolocation behavior across server selection and reporting. 

```
-- Replace ${DAY} with your date of choice in 'YYYY-MM-DD' format, e.g., '2025-05-01'
-- This query filters for client IPs that are located close to their nearest M-Lab server
-- and are likely not affected by test location inconsistencies.

WITH All_Client_Locations AS (
  -- Step 1: Get all unique client locations (by city + state + country),
  -- along with their lat/lon on the given day
  SELECT DISTINCT
  CONCAT(client.Geo.City, '-', client.Geo.Subdivision1ISOCode, '-', client.Geo.CountryCode) AS client_city,
  client.Geo.Latitude  AS client_lat,
  client.Geo.Longitude AS client_lon
  FROM `measurement-lab.ndt.ndt7`
  WHERE
  date = '${DAY}' -- 🟡 Replace this with your desired date
  AND client.Geo.Latitude IS NOT NULL
  AND client.Geo.Longitude IS NOT NULL
),

All_Server_Locations AS (
  -- Step 2: Get all unique server locations with valid lat/lon and city
  SELECT DISTINCT
  server.Geo.City     AS server_city,
  server.Geo.Latitude   AS server_lat,
  server.Geo.Longitude  AS server_lon
  FROM `measurement-lab.ndt.ndt7`
  WHERE
  date = '${DAY}' -- 🟡 Replace this with your desired date
  AND server.Geo.Latitude IS NOT NULL
  AND server.Geo.Longitude IS NOT NULL
  AND server.Geo.City IS NOT NULL
),

MinDistancesPerCity AS (
  -- Step 3: For each client city, compute the great-circle distance to its closest server
  SELECT
  c.client_city,
  MIN(ST_DISTANCE(
      ST_GEOGPOINT(c.client_lon, c.client_lat),
      ST_GEOGPOINT(s.server_lon, s.server_lat)
  ) / 1000) AS min_gcd_km -- convert meters to kilometers
  FROM All_Client_Locations c
  CROSS JOIN All_Server_Locations s
  GROUP BY c.client_city
),

DistanceCalc AS (
  -- Step 4: For each test, calculate:
  -- - the distance from client to server
  -- - the metro rank
  -- - the client type (e.g., ist or not)
  SELECT
  CONCAT(client.Geo.City, '-', client.Geo.Subdivision1ISOCode, '-', client.Geo.CountryCode) AS client_city,
  raw.ClientIP AS client_ip,
  ST_DISTANCE(
    ST_GEOGPOINT(client.Geo.Longitude, client.Geo.Latitude),
    ST_GEOGPOINT(server.Geo.Longitude, server.Geo.Latitude)
  ) / 1000 AS gcd_km,
  cm.Value AS metro_rank,
  (
    SELECT cm2.Value
    FROM UNNEST(ndt.raw.Download.ClientMetadata) AS cm2
    WHERE cm2.Name = 'client_name'
  ) AS client_type
  FROM `measurement-lab.ndt.ndt7` ndt
  CROSS JOIN UNNEST(ndt.raw.Download.ClientMetadata) cm
  WHERE
  date = '${DAY}' -- 🟡 Replace this with your desired date
  AND cm.Name = 'metro_rank'
),

FilteredIPs AS (
  -- Step 5: Keep tests where:
  -- - the distance from client to chosen server is within 250km of the *nearest* server
  -- - OR the client is not of type 'ist' (e.g., from a automated tool)
  SELECT
  d.client_ip,
  md.min_gcd_km
  FROM DistanceCalc d
  JOIN MinDistancesPerCity md
  ON d.client_city = md.client_city
  WHERE
  (
    ABS(d.gcd_km - md.min_gcd_km) < 250
    AND d.metro_rank IN ('0', '1')
  )
  OR (d.client_type != 'ist')
),

ConsistentIPs AS (
  -- Step 6: Return only the unique set of IPs that passed the filter
  SELECT DISTINCT client_ip
  FROM FilteredIPs
)

-- Final result: set of IPs that have geolocation + test location consistency
SELECT
  *
FROM ConsistentIPs
```

## Impact of Filtering on Dataset Size

The effectiveness of our filtering depends on how many servers are available nearby. Figure 1 defines the region in which each server is the nearest server. In dense regions, cells are small and the filter can finely distinguish between client locations; in sparse regions (e.g., much of Africa), large cells group many cities under the same server, making the filter less selective.

<!-- ![Image]({{ site.baseurl }}/images/blog/2025-05-improving-m-lab-geolocation/voronoi-partition-m-lab-servers.png) -->
<img src="{{ site.baseurl }}/images/blog/2025-05-improving-m-lab-geolocation/voronoi-partition-m-lab-servers.png" alt="Voronoi M-lab servers" style="width: 100%; height: auto;" />
**Figure 1\.** Voronoi partition of the globe overlaid on M-Lab server locations. Each colored cell shows the region of longitude/latitude space closest to its red-dot server by great-circle distance.

To assess the impact of filtering, we computed the number of unique client IPs retained versus removed when applying the consistency criteria on the 1st of April 2025\. The filter excludes 18% of the measured IPs in Africa to 7.88% in South America. These results highlight a trade-off: while filtering improves geolocation reliability, it also reduces coverage, potentially in regions where measurement density is already limited. Therefore, users should really run these queries only if their results hinge on accurate geolocations. 

| Continent | Total IPs | Consistent IPs | Removed IPs | % Removed |
| :---: | :---: | :---: | :---: | :---: |
| Africa | 112,293 | 91,605 | 20,688 | 18.42% |
| Asia | 1,123,951 | 933,007 | 190,944 | 16.99% |
| Europe | 526,951 | 463,247 | 63,704 | 12.09% |
| Oceania | 58,656 | 52,316 | 6,340 | 10.81% |
| North America | 519,671 | 465,723 | 53,948 | 10.38% |
| South America | 127,903 | 117,822 | 10,081 | 7.88% |

## About the authors

**Loqman Salamatian** is a Ph.D. candidate in Computer Science at Columbia University, advised by Professors Ethan Katz-Bassett, Vishal Misra, and Daniel Rubenstein. His research focuses on Internet measurement, topology inference, and the relationship between virtual and geographical aspects of network structure. While grounded in theory and mathematical modeling, his work emphasizes building systems that leverage these foundations to uncover hidden properties and dynamics of the Internet.

**Phillipa Gill** is a research scientist at Google. Her research interests include network measurement, BGP security, broadband connectivity and network operations. She was previously a faculty member at the University of Massachusetts – Amherst and Stony Brook University.

[^1]:  The metro\_rank flag can be found ndt.raw.Download.ClientMetadata array