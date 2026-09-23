---
layout: page
permalink: /tests/hermes/examples/
title: "HERMES Example Queries and Tutorials"
breadcrumb: tests
---

> **DRAFT — for review, not published.** None of the queries on this page have been run against the live tables yet. They are structurally correct against the documented schema, but every one needs to be executed and its scanned-byte figure recorded before publication.

# HERMES Example Queries and Tutorials

Queries here run against `mlab-collaboration.hermes.events_enriched`, the stable published interface. See [Access and QuickStart]({{ site.baseurl }}/tests/hermes/quickstart/) for access and cost, and the [schema]({{ site.baseurl }}/tests/hermes/schema/) for what each field means.

Every query filters on `partition_date`. On a table this size that filter is not an optimization, it is the difference between scanning a day and scanning years.

## Find degraded groups in one network on one day

Which of a network's monitored groups performed worst against their own baselines?

```sql
SELECT
  client.metro,
  server.site,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  AVG(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  AVG(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  AVG(performance.anomaly.rtt_ratio) AS share_anomalous
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
GROUP BY client.metro, server.site
HAVING measurements >= 25
ORDER BY rtt_difference_ms DESC
```

`rtt_difference_ms` is the group's median RTT minus its baseline median. `share_anomalous` is the fraction of the group's measurements that were individually flagged. A large difference with a small anomalous share usually means a few very bad measurements; a large difference with a large share means the whole group moved.

## Track one group over time

Once a group looks interesting, look at it across days rather than at one day in isolation. This is how you tell a sustained degradation from a noisy day.

```sql
SELECT
  partition_date,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  AVG(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  APPROX_QUANTILES(performance.download_mbps, 100)[SAFE_ORDINAL(50)] AS download_mbps,
  AVG(performance.baseline.download_mbps) AS baseline_download_mbps
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date BETWEEN "2025-07-01" AND "2025-07-08"
  AND client.asn = 174
  AND client.metro = "Chicago"
GROUP BY partition_date
ORDER BY partition_date
```

## Read the AS path without unnesting hops

`as_path`, `country_path`, `metro_path`, and `ixp_path` are precomputed, so most path questions do not require touching the hop arrays.

```sql
SELECT
  server_to_client_path.as_path,
  client_to_server_path.as_path,
  server_to_client_path.detour_ratio,
  client_to_server_path.detour_ratio,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
  AND client.metro = "Chicago"
  AND quality.reaches_client_asn
GROUP BY 1, 2, 3, 4
ORDER BY measurements DESC
LIMIT 20
```

A group whose paths were stable shows one dominant AS path per direction. A routing change shows as a new path appearing and the old one disappearing.

## Compare the two directions

Internet paths are not symmetric. The path from the M-Lab server to a user and the path back are chosen independently, and a degradation may be visible in only one of them.

```sql
SELECT
  client.metro,
  AVG(server_to_client_path.distance_km) AS server_to_client_km,
  AVG(client_to_server_path.distance_km) AS client_to_server_km,
  AVG(server_to_client_path.geodesic_distance_km) AS straight_line_km,
  AVG(server_to_client_path.detour_ratio) AS server_to_client_detour,
  AVG(client_to_server_path.detour_ratio) AS client_to_server_detour,
  AVG(server_to_client_path.geolocation_coverage) AS s2c_geo_coverage,
  AVG(client_to_server_path.geolocation_coverage) AS c2s_geo_coverage
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
  AND ARRAY_LENGTH(client_to_server_path.hops) > 0
GROUP BY client.metro
ORDER BY client_to_server_detour DESC
```

Always read the detour ratios next to the geolocation coverage. A path where only a third of hops could be geolocated will report a distance, and that distance is a lower bound built from the hops that happened to be placed.

## Find the countries traffic passed through

A useful shape for detour investigations: which countries appear on a group's paths, and how often.

```sql
SELECT
  country,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes.events_enriched`,
  UNNEST(client_to_server_path.country_path) AS country
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
  AND client.metro = "Chicago"
GROUP BY country
ORDER BY measurements DESC
```

## Unnest the hops

When the summaries are not enough, read the hops themselves. This is the most expensive shape on the page — filter hard first.

```sql
SELECT
  hop.ttl,
  hop.ip,
  hop.rdns_name,
  hop.asn,
  hop.as_name,
  hop.ixp,
  hop.city,
  hop.country_code,
  hop.geo_source,
  hop.geo_score,
  hop.cumulative_distance_km,
  hop.fiber_lower_bound_rtt_ms,
  hop.distance_rtt_check
FROM `mlab-collaboration.hermes.events_enriched`,
  UNNEST(server_to_client_path.hops) AS hop
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
  AND client.metro = "Chicago"
  AND measurement_id = "REPLACE_WITH_A_MEASUREMENT_ID"
ORDER BY hop.ttl
```

`distance_rtt_check` is the check worth reading first: it says whether the measured RTT to this hop is consistent with where the hop was geolocated. When it is not, the geolocation is more likely wrong than the physics.

## Restrict to trustworthy paths

Before any claim about *where* a problem sits, filter on path quality:

```sql
SELECT ...
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND quality.reaches_client                       -- the trace got to the user
  AND NOT server_to_client_path.loop_detected      -- no routing loop
  AND NOT server_to_client_path.unresponsive_within_as
  AND server_to_client_path.geolocation_coverage >= 0.5
  AND NOT quality.is_virtual
```

These filters reduce your sample, sometimes substantially. That is the point: they trade coverage for the ability to say something specific about a network segment.

## Get the statistical test outputs

The published view exposes anomaly ratios and differences but not the underlying test results _[confirm]_. For those, join back to the operational table:

```sql
SELECT
  partition_date,
  src_asn,
  src_metro,
  dst_site,
  ANY_VALUE(mann_whitney_latency) AS mann_whitney_latency,
  ANY_VALUE(mann_whitney_throughput) AS mann_whitney_throughput,
  ANY_VALUE(t_test_latency) AS t_test_latency,
  ANY_VALUE(wasserstein_throughput_result) AS wasserstein_throughput,
  ANY_VALUE(difference_latency) AS rtt_difference_ms
FROM `mlab-collaboration.hermes_union.events_with_as_and_geoloc`
WHERE partition_date = "2025-07-04"
  AND src_asn = 174
GROUP BY partition_date, src_asn, src_metro, dst_site
ORDER BY rtt_difference_ms DESC
```

The test results are properties of the group, not of the individual measurement, so they repeat across every row in a group — hence `ANY_VALUE` rather than an aggregate.

## Tutorial: working through one event

_[To write.]_ An end-to-end walkthrough of a single degradation, in the shape a real investigation takes:

1. Find the group and confirm the change is sustained rather than a single bad day.
2. Check the sample: how many measurements, how many distinct client IPs, does the baseline rest on enough data.
3. Compare the AS paths during and before the event, in both directions.
4. Identify what appears on degraded paths and not on healthy ones.
5. Check path quality and geolocation coverage before naming any segment.
6. State what the evidence supports — and what it does not.
