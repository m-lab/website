---
layout: page
permalink: /tests/hermes/examples/
title: "HERMES Example Queries and Tutorials"
breadcrumb: tests
---

> **DRAFT — for review, not published.** None of the queries on this page have been run against the live tables yet. They are structurally correct against the documented schema, but every one needs to be executed and its scanned-byte figure recorded before publication.

# HERMES Example Queries and Tutorials

Queries here run against `mlab-collaboration.hermes_union.events_enriched`, the stable published interface. See [Access and QuickStart]({{ site.baseurl }}/tests/hermes/quickstart/) for access and cost, and the [schema]({{ site.baseurl }}/tests/hermes/schema/) for what each field means.

Every query filters on `partition_date`. On a table this size that filter is not an optimization, it is the difference between scanning a day and scanning years.

## Find degraded groups in one network on one day

Which of a network's monitored groups performed worst against their own baselines?

```sql
SELECT
  client.metro,
  server.site,
  ip_version,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  ANY_VALUE(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  ANY_VALUE(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  ANY_VALUE(performance.anomaly.rtt_anomalous_sample_fraction) AS share_anomalous,
  LOGICAL_OR(performance.anomaly.rtt_significant) AS rtt_significant
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date  -- the day's own measurements
  AND client.asn = 174
GROUP BY client.metro, server.site, ip_version
HAVING measurements >= 25
ORDER BY rtt_difference_ms DESC
```

`rtt_difference_ms` is the group's median RTT on the analysis day minus its baseline median, as computed by HERMES. With the `measurement_time` filter, `rtt_ms - baseline_rtt_ms` is usually close to it, but it is not guaranteed to match: `rtt_ms` here is computed only over the rows in the table. `rtt_significant` is HERMES's verdict for the group. `share_anomalous` is the fraction of the day's measurements more than 5 ms above the baseline median. A large difference with a small anomalous share usually means a few very bad measurements; a large difference with a large share means the whole group moved.

## Track one group over time

Once a group looks interesting, look at it across days rather than at one day in isolation. This is how you tell a sustained degradation from a noisy day.

```sql
SELECT
  partition_date,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  ANY_VALUE(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  APPROX_QUANTILES(performance.download_mbps, 100)[SAFE_ORDINAL(50)] AS download_mbps,
  ANY_VALUE(performance.baseline.download_mbps) AS baseline_download_mbps,
  LOGICAL_OR(performance.anomaly.rtt_significant) AS rtt_significant
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date BETWEEN "2025-07-01" AND "2025-07-08"
  AND DATE(measurement_time) = partition_date
  AND client.asn = 174
  AND client.metro = "Chicago-Illinois-US"
  AND server.site = "ord06"
  AND ip_version = "v4"
GROUP BY partition_date
ORDER BY partition_date
```

This query scans about 100 GB, because each day in the range is a separate partition. Widen the date range with that in mind, and dry-run first.

## Read the AS path without unnesting hops

`as_path`, `country_path`, `metro_path`, and `ixp_path` are precomputed, so most path questions do not require touching the hop arrays.

```sql
SELECT
  server_to_client_path.as_path,
  client_to_server_path.as_path,
  server_to_client_path.detour_ratio,
  client_to_server_path.detour_ratio,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND client.asn = 174
  AND client.metro = "Chicago-Illinois-US"
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
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND client.asn = 174
  AND ARRAY_LENGTH(client_to_server_path.hops) > 0
  AND server_to_client_path.geodesic_distance_km >= 50  -- see below
GROUP BY client.metro
ORDER BY client_to_server_detour DESC
```

The `geodesic_distance_km` floor matters. When client and server are only a few kilometres apart, any detour through a distant interconnection point divides by a tiny number, and ratios in the thousands appear that say more about the denominator than the route. Filtering on the straight-line distance keeps the ratio meaningful.

Always read the detour ratios next to the geolocation coverage. A path where only a third of hops could be geolocated will report a distance, and that distance is a lower bound built from the hops that happened to be placed.

## Find the countries traffic passed through

A useful shape for detour investigations: which countries appear on a group's paths, and how often.

```sql
SELECT
  country,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes_union.events_enriched`,
  UNNEST(client_to_server_path.country_path) AS country
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND client.asn = 174
  AND client.metro = "Chicago-Illinois-US"
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
FROM `mlab-collaboration.hermes_union.events_enriched`,
  UNNEST(server_to_client_path.hops) AS hop
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
  AND client.metro = "Chicago-Illinois-US"
  AND measurement_id = "ndt-g4nnh_1748758813_00000000002BF861" -- REPLACE_WITH_A_MEASUREMENT_ID
ORDER BY hop.ttl
```

`distance_rtt_check` is the check worth reading first: it says whether the measured RTT to this hop is consistent with where the hop was geolocated. When it is not, the geolocation is more likely wrong than the physics.

## Restrict to trustworthy paths

Before any claim about *where* a problem sits, filter on path quality:

```sql
SELECT COUNT(*) AS trustworthy_measurements
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND quality.reaches_client                         -- the trace got to the user
  AND NOT server_to_client_path.loop_detected        -- no AS reappears after another AS
  AND NOT server_to_client_path.unresponsive_within_as  -- no hidden stretch inside an AS
  AND server_to_client_path.geolocation_coverage >= 0.5
  AND NOT quality.is_virtual
```

These filters reduce your sample substantially. On 2025-07-04 they keep 9.4% of the day's measurements, mostly because only 22.7% of traces reach the client itself; requiring only `quality.reaches_client_asn` instead keeps 28.1%. That is the point: they trade coverage for the ability to say something specific about a network segment. Loops are rare (0.7% of paths), while a hidden stretch inside an AS is common (29.5%), so decide whether your question needs the latter filter before applying it.

## Get the statistical test outputs

The verdicts in `performance.anomaly` rest on the test results in `performance.tests`. Like the baseline, they are properties of the group, not of the individual measurement, so they repeat on every row of a group and `ANY_VALUE` reads them:

```sql
SELECT
  client.metro,
  server.site,
  ip_version,
  ANY_VALUE(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  LOGICAL_OR(performance.anomaly.rtt_significant) AS rtt_significant,
  ANY_VALUE(performance.tests.mann_whitney.rtt.p_value) AS mann_whitney_p,
  ANY_VALUE(performance.tests.welch_t.rtt.p_value) AS welch_t_p,
  ANY_VALUE(performance.tests.welch_t.rtt.analysis_day_mean) AS analysis_day_mean_rtt_ms,
  ANY_VALUE(performance.tests.welch_t.rtt.baseline_mean) AS baseline_mean_rtt_ms,
  ANY_VALUE(performance.tests.wasserstein.download.distance) AS download_wasserstein_distance,
  ANY_VALUE(performance.tests.wasserstein.download.p_value) AS download_wasserstein_p
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.asn = 174
GROUP BY client.metro, server.site, ip_version
HAVING mann_whitney_p IS NOT NULL  -- only groups large enough to test
ORDER BY rtt_difference_ms DESC
```

The tests are NULL for groups too small to test, which is why the query drops them. A `p_value` of exactly `1e-10` with a zero statistic means the group was too large to test (more than 20,000 measurements on one side), not that the evidence was overwhelming.

## Tutorial: working through one event

This walkthrough follows one real degradation from detection to the evidence behind its localization: T-Mobile US (AS21928) IPv6 users in the Seattle metro area, testing against the M-Lab site `sea03`, on 18 and 19 September 2026. The figures quoted were retrieved on 2026-09-30. Step 1 scans about 14 GB, step 2 about 85 GB, and step 3 about 30 GB.

### 1. Find the event

Start from one network on one day, and list the groups HERMES found significantly degraded, largest first:

```sql
SELECT
  client.metro,
  server.site,
  ip_version,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  ANY_VALUE(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  ANY_VALUE(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2026-09-18"
  AND DATE(measurement_time) = partition_date
  AND client.asn = 21928
  AND performance.anomaly.rtt_significant
GROUP BY client.metro, server.site, ip_version
ORDER BY measurements DESC
LIMIT 10
```

The top row is the Seattle group testing against `sea03` over IPv6: 758 measurements that day, with a median RTT of 49.8 ms against a baseline of 22.8 ms, a difference of about 27 ms.

### 2. Confirm the change is sustained, and check the sample

A detection on one day can be noise. Look at the group's daily verdicts around the event. The baseline and anomaly fields are properties of the group, so they repeat on every row and `ANY_VALUE` reads them:

```sql
SELECT
  partition_date,
  ANY_VALUE(performance.baseline.measurement_count) AS baseline_measurements,
  ANY_VALUE(performance.baseline.unique_client_ip_count) AS baseline_client_ips,
  ANY_VALUE(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  ANY_VALUE(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  ANY_VALUE(performance.anomaly.rtt_anomalous_sample_fraction) AS share_anomalous,
  LOGICAL_OR(performance.anomaly.rtt_significant) AS rtt_significant
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date BETWEEN "2026-09-16" AND "2026-09-21"
  AND client.asn = 21928
  AND client.metro = "Seattle-Washington-US"
  AND server.site = "sea03"
  AND ip_version = "v6"
GROUP BY partition_date
ORDER BY partition_date
```

| Date | RTT difference (ms) | Share anomalous | Significant |
| --- | --- | --- | --- |
| 2026-09-16 | +0.4 | 0.30 | no |
| 2026-09-17 | +4.1 | 0.48 | no |
| 2026-09-18 | +27.0 | 0.86 | **yes** |
| 2026-09-19 | +25.7 | 0.87 | **yes** |
| 2026-09-20 | +3.8 | 0.49 | no |
| 2026-09-21 | −7.4 | 0.12 | no |

The degradation lasted two days, with a visible onset on the 17th that stayed below HERMES's threshold. The baseline rests on about 4,700 measurements from about 3,650 distinct client IPs, far above the 25-measurement, 5-IP level recommended in the [methodology]({{ site.baseurl }}/tests/hermes/methodology/#1-grouping), so it is a strong reference.

Note what happens afterwards. The baseline rises from 22.8 ms to 29.8 ms by the 21st, because the event days are now inside the seven-day baseline window, and the following days appear *better* than baseline. Read negative differences just after an event with that in mind.

### 3. Compare the paths before and during

Did the route change, or did the same route get slower? Compare the AS paths of the day's own measurements on a normal day and on the event day:

```sql
SELECT
  partition_date,
  ARRAY_TO_STRING(ARRAY(
    SELECT CAST(asn AS STRING)
    FROM UNNEST(server_to_client_path.as_path) AS asn WITH OFFSET i
    WHERE i = 0 OR asn != server_to_client_path.as_path[OFFSET(i - 1)]
    ORDER BY i), " > ") AS server_to_client_as_path,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  COUNTIF(ARRAY_LENGTH(client_to_server_path.hops) > 0) AS with_reverse_path,
  COUNTIF(quality.reaches_client_asn) AS reaching_client_asn
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date IN ("2026-09-11", "2026-09-18")
  AND DATE(measurement_time) = partition_date
  AND client.asn = 21928
  AND client.metro = "Seattle-Washington-US"
  AND server.site = "sea03"
  AND ip_version = "v6"
GROUP BY partition_date, server_to_client_as_path
ORDER BY partition_date, measurements DESC
```

On 11 September, 689 of 699 measurements took GTT (3257) then Cogent (174), with a median RTT of 21.3 ms. On 18 September all 758 took the same route, with a median of 49.8 ms. **The route did not change; the same route got slower.** That points to congestion somewhere along it rather than a detour.

The other two columns set the limits of what the paths can tell you. `with_reverse_path` is zero on both days: no reverse traceroute exists for these IPv6 measurements, so only the server-to-client direction is available. `reaching_client_asn` is also zero: the traces end inside Cogent and never reach T-Mobile's network.

### 4. See where HERMES localized it

Within this group, every measurement used the same path, so affected and unaffected measurements cannot be told apart by route. HERMES's localization therefore compares across groups, looking for the segment that degraded groups share and healthy groups do not. For this event it attributes the degradation to the interdomain link between Cogent (AS174) and GTT (AS3257) in Seattle, with strong confidence. The localization output is not yet part of `events_enriched`.

### 5. State what the evidence supports, and what it does not

The evidence supports this: for two days, T-Mobile IPv6 users in Seattle testing against `sea03` saw their median RTT roughly double, over a route that did not change, and the segment most strongly associated with the degradation is the Cogent–GTT interconnection in Seattle.

It does not support:

* that Cogent or GTT **caused** the degradation, or which of them could have fixed it. HERMES reports association, not responsibility;
* anything about the **reverse direction**, which was not measured;
* anything about **T-Mobile's own network** or the last mile, which the traces never reached;
* anything about **other destinations**, whose paths may not cross this link.
