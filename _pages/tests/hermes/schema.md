---
layout: page
permalink: /tests/hermes/schema/
title: "HERMES Table Schema"
breadcrumb: tests
---

> **DRAFT — for review, not published.** Field names and structure below are read from the HERMES pipeline source (`create_events_enriched.sql` and `04_mapping_union.sql` in `m-lab/hermes`). Types and modes are derived from the pipeline DDLs and SQL, not read from the live tables; confirm them against `INFORMATION_SCHEMA.COLUMNS` before this page is published.

# HERMES Table Schema

HERMES publishes two tables. Which one you want depends on whether you need the raw statistical test outputs.

| Table | Use it for |
| --- | --- |
| [`mlab-collaboration.hermes.events_enriched`](#events_enriched) | Almost everything. Nested, clearly named, stable, with path summaries precomputed. |
| [`mlab-collaboration.hermes_union.events_with_as_and_geoloc`](#events_with_as_and_geoloc) | The raw statistical test outputs, and pipeline work. 75 flat columns, historical names. |

## What a row is

A row is **one NDT measurement that belongs to a monitored group** _[confirm]_, carried together with everything HERMES computed around it.

A row is **not** an event. A performance event is a property of a group — an access network, in a metro area, testing against one M-Lab site, on one day — and it is expressed across the many rows belonging to that group. To reason about events, aggregate by the group key:

```sql
GROUP BY partition_date, client.asn, client.metro, server.site
```

Both tables are partitioned by `partition_date`. `partition_date` is the **analysis date**, not necessarily the date the underlying traceroute was measured: path measurements are drawn from a lookback window and attached to the day being analyzed.

## Field summary

Every field in both tables, in one place. Dotted names are nested record fields, addressed in SQL exactly as written here. The sections after this one explain what the records are for and how to read them.

### `events_enriched`

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| measurement_id | STRING | NULLABLE | Identifier of the NDT measurement this row describes. |
| measurement_time | TIMESTAMP | NULLABLE | When the measurement was taken. |
| partition_date | DATE | NULLABLE | HERMES analysis date (**required as a filter in all queries**). |
| ip_version | STRING | NULLABLE | IP version of the measurement. A string, not a number. |
| client | RECORD | NULLABLE | The user side of the measurement, and how it was grouped. |
| client.ip | STRING | NULLABLE | Client IP address. |
| client.asn | INT64 | NULLABLE | Client autonomous system number. |
| client.as_name | STRING | NULLABLE | Client AS name. |
| client.city | STRING | NULLABLE | Client city. |
| client.region | STRING | NULLABLE | Client state or region. |
| client.metro | STRING | NULLABLE | Client metropolitan area. |
| client.country_code | STRING | NULLABLE | Client country, ISO-2. |
| client.latitude | FLOAT64 | NULLABLE | Client latitude. |
| client.longitude | FLOAT64 | NULLABLE | Client longitude. |
| client.grouping_granularity | STRING | NULLABLE | Whether the group was formed at `city` or `metro` granularity. Rows predating the change are projected as `city`. |
| client.group_label | STRING | NULLABLE | Label of the group this measurement belongs to. |
| client.geo_source | STRING | NULLABLE | Which source placed the client: `maxmind` or `ipinfo`. |
| client.client_name | STRING | NULLABLE | The client software that ran the measurement, where known. |
| server | RECORD | NULLABLE | The M-Lab side of the measurement. |
| server.ip | STRING | NULLABLE | M-Lab server IP address. |
| server.asn | INT64 | NULLABLE | AS hosting the M-Lab site. |
| server.site | STRING | NULLABLE | M-Lab site name. |
| server.city | STRING | NULLABLE | M-Lab site city. |
| server.region | STRING | NULLABLE | Not populated; always NULL. |
| server.metro | STRING | NULLABLE | M-Lab site metropolitan area, taken from the server's own hop on the path. |
| server.country_code | STRING | NULLABLE | M-Lab site country, ISO-2. |
| server.latitude | FLOAT64 | NULLABLE | M-Lab site latitude. |
| server.longitude | FLOAT64 | NULLABLE | M-Lab site longitude. |
| server.geo_source | STRING | NULLABLE | Always `server_metadata`: server locations come from M-Lab's records, not IP geolocation. |
| performance | RECORD | NULLABLE | The measurement, its baseline, and its deviation from that baseline. |
| performance.ndt_rtt_ms | FLOAT64 | NULLABLE | Round-trip time measured by NDT, in milliseconds. |
| performance.download_mbps | FLOAT64 | NULLABLE | Download throughput, in Mbps. |
| performance.upload_mbps | FLOAT64 | NULLABLE | Upload throughput, in Mbps. |
| performance.loss_rate | FLOAT64 | NULLABLE | Packet loss rate. |
| performance.traceroute_rtt_ms | FLOAT64 | NULLABLE | Round-trip time measured by the accompanying traceroute, in milliseconds. |
| performance.baseline | RECORD | NULLABLE | What this group normally does, over the preceding window. |
| performance.baseline.ndt_rtt_ms | FLOAT64 | NULLABLE | Group's median RTT over the baseline window. |
| performance.baseline.download_mbps | FLOAT64 | NULLABLE | Group's median download throughput over the baseline window. |
| performance.baseline.upload_mbps | FLOAT64 | NULLABLE | Group's median upload throughput over the baseline window. |
| performance.baseline.loss_rate | FLOAT64 | NULLABLE | Group's median loss rate over the baseline window. |
| performance.baseline.measurement_count | INT64 | NULLABLE | Measurements the baseline rests on. Read every baseline next to this. |
| performance.baseline.unique_client_ip_count | INT64 | NULLABLE | Distinct client IPs the baseline rests on. |
| performance.anomaly | RECORD | NULLABLE | How far this day sits from the baseline. |
| performance.anomaly.rtt_ratio | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on RTT. |
| performance.anomaly.rtt_count | INT64 | NULLABLE | Count of those measurements. |
| performance.anomaly.download_ratio | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on download throughput. |
| performance.anomaly.download_count | INT64 | NULLABLE | Count of those measurements. |
| performance.anomaly.upload_ratio | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on upload throughput. |
| performance.anomaly.upload_count | INT64 | NULLABLE | Count of those measurements. |
| performance.anomaly.loss_ratio | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on loss. |
| performance.anomaly.rtt_difference_ms | FLOAT64 | NULLABLE | Current median minus baseline median, RTT. |
| performance.anomaly.download_difference_mbps | FLOAT64 | NULLABLE | Current median minus baseline median, download. |
| performance.anomaly.upload_difference_mbps | FLOAT64 | NULLABLE | Current median minus baseline median, upload. |
| server_to_client_path | RECORD | NULLABLE | The path measured from the M-Lab server toward the client, by scamper. |
| server_to_client_path.direction | STRING | NULLABLE | Always `server_to_client`. |
| server_to_client_path.measurement_method | STRING | NULLABLE | Always `scamper`. |
| server_to_client_path.distance_km | FLOAT64 | NULLABLE | Distance along the path, summed between geolocated hops. |
| server_to_client_path.geodesic_distance_km | FLOAT64 | NULLABLE | Straight-line distance between client and server. |
| server_to_client_path.detour_ratio | FLOAT64 | NULLABLE | `distance_km / geodesic_distance_km`. Read it next to `geolocation_coverage`. |
| server_to_client_path.total_hop_count | INT64 | NULLABLE | Hops in the path. |
| server_to_client_path.responsive_hop_count | INT64 | NULLABLE | Hops that returned an address. |
| server_to_client_path.geolocated_hop_count | INT64 | NULLABLE | Hops that could be geolocated. |
| server_to_client_path.geolocation_coverage | FLOAT64 | NULLABLE | `geolocated_hop_count / total_hop_count`. |
| server_to_client_path.loop_detected | BOOL | NULLABLE | Whether the path revisits an AS. |
| server_to_client_path.unresponsive_within_as | BOOL | NULLABLE | Whether a run of hops inside one AS failed to respond. |
| server_to_client_path.as_path | INT64 | REPEATED | ASes traversed, in path order. |
| server_to_client_path.country_path | STRING | REPEATED | Countries traversed, in path order. |
| server_to_client_path.metro_path | STRING | REPEATED | Metro areas traversed, in path order. |
| server_to_client_path.ixp_path | STRING | REPEATED | IXPs traversed, in path order. |
| server_to_client_path.hops | RECORD | REPEATED | The annotated hops, ordered by TTL. |
| server_to_client_path.hops.ttl | INT64 | NULLABLE | Time-to-live at which this hop replied. |
| server_to_client_path.hops.ip | STRING | NULLABLE | Hop address. |
| server_to_client_path.hops.rtt_ms | FLOAT64 | NULLABLE | Round-trip time to this hop, in milliseconds. A single value, not an array. |
| server_to_client_path.hops.asn | INT64 | NULLABLE | AS the hop address belongs to. |
| server_to_client_path.hops.as_name | STRING | NULLABLE | AS organization name. |
| server_to_client_path.hops.peeringdb_name | STRING | NULLABLE | PeeringDB name for the AS, where matched. |
| server_to_client_path.hops.ixp | STRING | NULLABLE | IXP the hop address belongs to, where matched. |
| server_to_client_path.hops.rdns_name | STRING | NULLABLE | Reverse DNS name of the hop address. |
| server_to_client_path.hops.latitude | FLOAT64 | NULLABLE | Inferred hop latitude. |
| server_to_client_path.hops.longitude | FLOAT64 | NULLABLE | Inferred hop longitude. |
| server_to_client_path.hops.city | STRING | NULLABLE | Inferred hop city. |
| server_to_client_path.hops.region | STRING | NULLABLE | Not populated; always NULL. |
| server_to_client_path.hops.metro | STRING | NULLABLE | Inferred hop metropolitan area. |
| server_to_client_path.hops.country_code | STRING | NULLABLE | Inferred hop country, ISO-2. |
| server_to_client_path.hops.clli | STRING | NULLABLE | CLLI code derived from the hostname, where present. |
| server_to_client_path.hops.geo_source | STRING | NULLABLE | Which source placed this hop. |
| server_to_client_path.hops.geo_score | FLOAT64 | NULLABLE | Confidence in the placement. `-1` means private or unplaced, not low confidence. |
| server_to_client_path.hops.geo_partition_date | DATE | NULLABLE | Geolocation snapshot used for this hop. |
| server_to_client_path.hops.ixp_partition_date | DATE | NULLABLE | IXP data snapshot used for this hop. |
| server_to_client_path.hops.segment_distance_km | FLOAT64 | NULLABLE | Distance from the previous geolocated hop. |
| server_to_client_path.hops.cumulative_distance_km | FLOAT64 | NULLABLE | Distance travelled to this hop, in measured order. |
| server_to_client_path.hops.remaining_distance_km | FLOAT64 | NULLABLE | Distance still to travel to the far endpoint. |
| server_to_client_path.hops.propagation_speed_km_s | FLOAT64 | NULLABLE | Propagation speed assumed by the plausibility check: 200,000 km/s. |
| server_to_client_path.hops.fiber_lower_bound_rtt_ms | FLOAT64 | NULLABLE | Lowest RTT physically possible to this hop at that speed. |
| server_to_client_path.hops.distance_rtt_check | STRING | NULLABLE | `Above threshold` or `Below threshold`. A string, not a boolean. |
| server_to_client_path.hops.above_baseline_flag | STRING | NULLABLE | Per-hop latency relative to the path's baseline, e.g. `Within baseline`. A string, not a boolean. |
| server_to_client_path.hops.increasing_latency_flag | STRING | NULLABLE | Whether latency rises at this hop, e.g. `Stable/Decreasing`. A string, not a boolean. |
| server_to_client_path.hops.baseline_consistency_flag | STRING | NULLABLE | Whether the path as a whole is consistent with its baseline, `True` or `False` as text. |
| server_to_client_path.hops.facilities | RECORD | REPEATED | Colocation facilities near the hop. Currently always empty. |
| client_to_server_path | RECORD | NULLABLE | The path measured from the client back toward the server, by reverse traceroute. |

`client_to_server_path` carries every field listed above for `server_to_client_path`, with `direction` = `client_to_server` and `measurement_method` = `reverse_traceroute`, plus the fields below. Its hops do not carry `baseline_consistency_flag`.

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| client_to_server_path.revtr | RECORD | NULLABLE | Metadata about the reverse traceroute measurement itself. |
| client_to_server_path.revtr.measurement_id | INT64 | NULLABLE | Reverse traceroute identifier. |
| client_to_server_path.revtr.system_label | STRING | NULLABLE | Which reverse traceroute system produced the path. |
| client_to_server_path.revtr.stop_reason | STRING | NULLABLE | Why the measurement stopped. |
| client_to_server_path.revtr.fail_reason | STRING | NULLABLE | Why the measurement failed, where it did. |
| client_to_server_path.revtr.tried_from_client_as | BOOL | NULLABLE | Whether a vantage point in the client's AS was attempted. |
| client_to_server_path.hops.revtr_hop_type | INT64 | NULLABLE | How this reverse hop was obtained. See the [reverse traceroute hop types]({{ site.baseurl }}/tests/reverse_traceroute/). |
| client_to_server_path.hops.uses_interdomain_symmetry | BOOL | NULLABLE | Whether this hop relies on an assumption of interdomain path symmetry. Treat these hops with caution. |
| client_to_server_path.hops.is_fishy_type_4 | BOOL | NULLABLE | Reverse traceroute's own flag for a suspect hop. |

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| round_trip_distance_km | FLOAT64 | NULLABLE | Combined distance of both directions. |
| quality | RECORD | NULLABLE | Whether this row's evidence should be trusted. |
| quality.is_consistent | BOOL | NULLABLE | Whether the measurement's location metadata is self-consistent. |
| quality.reaches_client | BOOL | NULLABLE | Whether the path measurement reached the client. |
| quality.is_virtual | BOOL | NULLABLE | Whether the path shows signs of being virtual or tunnelled. |
| quality.reaches_client_asn | BOOL | NULLABLE | Whether the path measurement at least reached the client's AS. |
| quality.total_windows | INT64 | NULLABLE | Analysis windows contributing to this group. |
| quality.unique_ip_count_per_site | INT64 | NULLABLE | Distinct client IPs in this group and site. |
| quality.measurement_count_per_site | INT64 | NULLABLE | Measurements in this group and site. |

### `events_with_as_and_geoloc`

The 75 flat columns of the operational table. Fields the published view renames are noted.

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| id | STRING | NULLABLE | NDT measurement identifier. View: `measurement_id`. |
| src | STRING | NULLABLE | Client IP address. View: `client.ip`. |
| dst | STRING | NULLABLE | M-Lab server IP address. View: `server.ip`. |
| start | INT64 | NULLABLE | Measurement start, UNIX seconds. View: `measurement_time`, as a TIMESTAMP. |
| window_start | TIMESTAMP | NULLABLE | Start of the analysis window this row was attached to. |
| partition_date | DATE | NULLABLE | HERMES analysis date (**required as a filter in all queries**). |
| ip_version | STRING | NULLABLE | IP version of the measurement. |
| ndt_rtt | FLOAT64 | NULLABLE | Round-trip time measured by NDT, in milliseconds. |
| ndt_throughput | FLOAT64 | NULLABLE | Download throughput, in Mbps. |
| ndt_loss_rate | FLOAT64 | NULLABLE | Packet loss rate. |
| median_upload_throughput | FLOAT64 | NULLABLE | Upload throughput, in Mbps. |
| traceroute_rtt | FLOAT64 | NULLABLE | Round-trip time measured by the accompanying traceroute. |
| src_asn | INT64 | NULLABLE | Client autonomous system number. |
| src_asn_name | STRING | NULLABLE | Client AS name. |
| src_city | STRING | NULLABLE | Client city. |
| src_state | STRING | NULLABLE | Client state or region. |
| src_metro | STRING | NULLABLE | Client metropolitan area. |
| src_country | STRING | NULLABLE | Client country, ISO-2. |
| src_lat | FLOAT64 | NULLABLE | Client latitude. |
| src_lon | FLOAT64 | NULLABLE | Client longitude. |
| src_group_label | STRING | NULLABLE | Label of the group this measurement belongs to. NULL on rows predating group provenance. |
| detection_granularity | STRING | NULLABLE | Granularity the group was formed at. NULL or `maxmind_city` on historical rows. |
| client_geo_source | STRING | NULLABLE | Which source placed the client. NULL on historical rows. |
| client_name | STRING | NULLABLE | The client software that ran the measurement. |
| dst_site | STRING | NULLABLE | M-Lab site name. |
| dst_asn | INT64 | NULLABLE | AS hosting the M-Lab site. |
| dst_city | STRING | NULLABLE | M-Lab site city. |
| dst_country | STRING | NULLABLE | M-Lab site country, ISO-2. |
| dst_lat | FLOAT64 | NULLABLE | M-Lab site latitude. |
| dst_lon | FLOAT64 | NULLABLE | M-Lab site longitude. |
| baseline_median_rtt | FLOAT64 | NULLABLE | Group's median RTT over the baseline window. |
| baseline_median_throughput | FLOAT64 | NULLABLE | Group's median download throughput over the baseline window. |
| baseline_median_upload_throughput | FLOAT64 | NULLABLE | Group's median upload throughput over the baseline window. |
| baseline_median_loss | FLOAT64 | NULLABLE | Group's median loss rate over the baseline window. |
| number_of_measurements_baseline | INT64 | NULLABLE | Measurements the baseline rests on. |
| number_of_unique_src_ips_baseline | INT64 | NULLABLE | Distinct client IPs the baseline rests on. |
| unique_ip_count_per_site | INT64 | NULLABLE | Distinct client IPs in this group and site. |
| measurement_count_per_site | INT64 | NULLABLE | Measurements in this group and site. |
| total_windows | INT64 | NULLABLE | Analysis windows contributing to this group. |
| city_median_rtt | FLOAT64 | NULLABLE | Median RTT across the client's city, for context. |
| city_oneth_percentile_rtt | FLOAT64 | NULLABLE | 1st percentile RTT across the client's city. |
| city_tenth_percentile_rtt | FLOAT64 | NULLABLE | 10th percentile RTT across the client's city. |
| city_ninetyth_percentile_rtt | FLOAT64 | NULLABLE | 90th percentile RTT across the client's city. |
| city_median_throughput | FLOAT64 | NULLABLE | Median download throughput across the client's city. |
| city_ninetyth_percentile_throughput | FLOAT64 | NULLABLE | 90th percentile download throughput across the client's city. |
| mann_whitney_latency | FLOAT64 | NULLABLE | Mann-Whitney U test result for latency against the baseline. Not exposed by the view. |
| mann_whitney_throughput | FLOAT64 | NULLABLE | Mann-Whitney U test result for download throughput. Not exposed by the view. |
| mann_whitney_upload_throughput | FLOAT64 | NULLABLE | Mann-Whitney U test result for upload throughput. Not exposed by the view. |
| t_test_latency | FLOAT64 | NULLABLE | Welch's *t* test result for latency. Not exposed by the view. |
| wasserstein_throughput_result | FLOAT64 | NULLABLE | Wasserstein distance result for download throughput. Not exposed by the view. |
| wasserstein_upload_throughput_result | FLOAT64 | NULLABLE | Wasserstein distance result for upload throughput. Not exposed by the view. |
| anomaly_ratio_rtt | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on RTT. |
| anomaly_rtt_count | INT64 | NULLABLE | Count of those measurements. |
| anomaly_ratio_throughput | FLOAT64 | NULLABLE | Fraction flagged anomalous on download throughput. |
| anomaly_throughput_count | INT64 | NULLABLE | Count of those measurements. |
| anomaly_ratio_upload_throughput | FLOAT64 | NULLABLE | Fraction flagged anomalous on upload throughput. |
| anomaly_upload_throughput_count | INT64 | NULLABLE | Count of those measurements. |
| anomaly_loss_ratio | FLOAT64 | NULLABLE | Fraction flagged anomalous on loss. |
| difference_latency | FLOAT64 | NULLABLE | Current median minus baseline median, RTT. |
| difference_throughput | FLOAT64 | NULLABLE | Current median minus baseline median, download. |
| difference_upload_throughput | FLOAT64 | NULLABLE | Current median minus baseline median, upload. |
| forward_updated_node_details | RECORD | REPEATED | Annotated hops of the server-to-client path. View: `server_to_client_path.hops`. |
| reverse_updated_node_details | RECORD | REPEATED | Annotated hops of the client-to-server path. View: `client_to_server_path.hops`. |
| forward_distance | FLOAT64 | NULLABLE | Distance along the server-to-client path. |
| reverse_distance | FLOAT64 | NULLABLE | Distance along the client-to-server path. |
| both_way_distance | FLOAT64 | NULLABLE | Combined distance of both directions. |
| is_consistent | BOOL | NULLABLE | Whether the measurement's location metadata is self-consistent. |
| reach_dest | BOOL | NULLABLE | Whether the path measurement reached the client. View: `quality.reaches_client`. |
| is_reaching_dst_asn | BOOL | NULLABLE | Whether it at least reached the client's AS. View: `quality.reaches_client_asn`. |
| is_virtual | BOOL | NULLABLE | Whether the path shows signs of being virtual or tunnelled. |
| forward_loop | BOOL | NULLABLE | Whether the server-to-client path revisits an AS. |
| reverse_loop | BOOL | NULLABLE | Whether the client-to-server path revisits an AS. |
| forward_unresponse_within_AS | BOOL | NULLABLE | Unresponsive run inside one AS, server-to-client. |
| reverse_unresponsive_within_AS | BOOL | NULLABLE | Unresponsive run inside one AS, client-to-server. |
| revtr_id | INT64 | NULLABLE | Reverse traceroute identifier. |
| revtr_system_label | STRING | NULLABLE | Which reverse traceroute system produced the path. |
| revtr_stop_reason | STRING | NULLABLE | Why the reverse traceroute stopped. |
| revtr_fail_reason | STRING | NULLABLE | Why the reverse traceroute failed, where it did. |
| is_try_from_destination_AS | BOOL | NULLABLE | Whether a vantage point in the client's AS was attempted. |

The hop records `forward_updated_node_details` and `reverse_updated_node_details` carry the pre-rename field names: `addr`, `rtts`, `associated_asn`, `associated_org`, `associated_peeringdb_name`, `associated_ixp`, `place`, `cc`, `score`, `speed_of_internet_fiber`, and `facilities_info`. The view's equivalents are listed in the `events_enriched` table above.

<a name="events_enriched"></a>

## `mlab-collaboration.hermes.events_enriched`

The stable published interface. Field names here are a contract; the underlying table's names are not. Every field is listed in the [field summary](#field-summary) above — this section explains what the six records are for and how to read them.

Because HERMES measures in both directions with two different tools, the path records name the direction they were actually measured in rather than borrowing traceroute's "forward" and "reverse". `server_to_client_path` is scamper, measured from the M-Lab server. `client_to_server_path` is reverse traceroute, measured back toward the server. Hop order and RTT vantage point are preserved as measured in both.

### `client` and `server`

The two endpoints of the measurement. Beyond location, `client` carries how the measurement was grouped: `group_label` names the group, `grouping_granularity` says whether that group was formed at city or metro level, and `geo_source` says which database placed the client. Those three are what let you tell measurements from before and after the [2026-08-01 change](#changelog) apart, and they are the fields to group on when you span it.

`server.geo_source` is always `server_metadata`. M-Lab server locations come from M-Lab's own records rather than IP geolocation, so they are not subject to the caveats that apply to the hop locations further down.

### `performance`

The measurement itself, the group's baseline, and the distance between them.

The comparison that matters is between `performance.*` and `performance.baseline.*` — not between one group and another. Networks and locations differ enormously in what is normal for them, and HERMES is built on the change, not the level.

Read every baseline next to `baseline.measurement_count` and `baseline.unique_client_ip_count`. A baseline resting on the minimum admissible sample is a far weaker reference than one resting on thousands of measurements, and the row tells you which you have.

The `anomaly` record holds two different kinds of number. The `*_ratio` and `*_count` fields say how much of the group was affected; the `*_difference_*` fields say how far the group's median moved. A large difference with a small ratio usually means a few very bad measurements, while a large difference with a large ratio means the whole group moved.

> **The statistical test outputs are not in this view** _[confirm]_. Mann-Whitney U, Welch's *t*, and Wasserstein results are written to the underlying table but are not currently projected into `events_enriched`. If your analysis depends on the test results rather than the anomaly ratios, query [`events_with_as_and_geoloc`](#events_with_as_and_geoloc).

### `server_to_client_path` and `client_to_server_path`

Both records carry the same fields, distinguished by `direction` and `measurement_method`. `client_to_server_path` adds a `revtr` record describing the reverse traceroute measurement itself — which system produced the path, why it stopped, why it failed, and whether a vantage point in the client's AS was attempted.

`as_path`, `country_path`, `metro_path`, and `ixp_path` answer most path questions without unnesting `hops`, and they are far cheaper to query. Reach for the hop array only when you need per-hop detail.

`detour_ratio` is `distance_km / geodesic_distance_km`: how much further traffic travelled than the straight line between endpoints. Always read it next to `geolocation_coverage`. A path where a third of hops could be geolocated still reports a distance, and that distance is a lower bound assembled from the hops that happened to be placed — not a measurement of the route.

### `hops`

One record per hop, ordered by TTL, carrying the hop's address and RTT alongside everything HERMES inferred about it: its network, its organization and PeeringDB name, IXP membership, a location, and a reverse DNS name.

A geolocated hop is an inference, not an observation. `geo_source`, `geo_score`, `geo_partition_date`, and `distance_rtt_check` exist so you can judge how much to trust each one. `distance_rtt_check` is the most useful of these: it compares the measured RTT against the lowest RTT physically possible for the geolocated distance, and when the measurement beats physics, the geolocation is wrong rather than the physics.

Two things to watch when filtering. The per-hop flags — `distance_rtt_check`, `above_baseline_flag`, `increasing_latency_flag`, `baseline_consistency_flag` — are strings with fixed values, not booleans, so they need string comparisons. And `geo_score` uses `-1` to mean private or unplaced rather than low confidence, so it should be excluded rather than averaged.

The reverse path's hops carry three fields the forward path's do not: `revtr_hop_type`, `uses_interdomain_symmetry`, and `is_fishy_type_4`. The middle one matters most — a hop inferred by assuming interdomain path symmetry is weaker evidence than one measured directly. They do not carry `baseline_consistency_flag`.

For how each annotation is produced and where it fails, see [Traceroute enrichment]({{ site.baseurl }}/tests/hermes/methodology/path-enrichment/).

### `quality`

Whether this row's evidence should be trusted at all, and how much data stands behind the group.

A path that never reached the client, or reached only its AS, still carries useful information — but it cannot support a claim about the last mile. Filter on `quality` before drawing any conclusion about where a problem sits.

<a name="events_with_as_and_geoloc"></a>

## `mlab-collaboration.hermes_union.events_with_as_and_geoloc`

The operational table underneath the view: 75 flat columns, written directly by the pipeline. Query it when you need the statistical test outputs, or when you are working on HERMES itself.

Its column names are historical, and several of them describe the data inaccurately. The published view exists partly to correct that, so the mapping below is also the list of names worth being careful with.

### What the view corrects, beyond renaming

Four of these are not cosmetic. If you query the operational table directly, they are yours to handle.

**`forward_` and `reverse_` do not describe the endpoints.** Scamper's "forward" path is measured *from the M-Lab server toward the client*; reverse traceroute's "reverse" path is measured *from the client toward the server*. The view names each path by the direction it was actually measured in, and exposes `direction` and `measurement_method` on both, rather than reversing arrays and misrepresenting where the RTTs were taken.

**`speed_of_internet_fiber` is not a speed.** It is a calculated lower-bound round-trip time in milliseconds, derived from the hop's distance at an assumed 200,000 km/s. The view exposes it as `fiber_lower_bound_rtt_ms` and records the assumed speed separately as `propagation_speed_km_s`.

**Cumulative distance ran the wrong way on reverse paths.** The operational table accumulated reverse-path distance in descending TTL order. The view recomputes it in measured order, so `cumulative_distance_km` increases along the exposed path for both directions, and adds `segment_distance_km` for the hop-to-hop step.

**Grouping provenance is NULL on historical rows.** Rows written before the provenance columns existed have NULL `detection_granularity`, `src_group_label`, and `client_geo_source`. The view projects those as `city`, the legacy city label, and `maxmind` — the known historical facts — rather than rewriting the physical table. Querying the operational table directly, you must handle the NULLs yourself.

### Legacy name map

| Operational table | Published view |
| ----- | ----- |
| `id` | `measurement_id` |
| `start` | `measurement_time` (INT64 UNIX seconds becomes a TIMESTAMP) |
| `src` | `client.ip` |
| `dst` | `server.ip` |
| `src_asn` | `client.asn` |
| `src_asn_name` | `client.as_name` |
| `src_city` | `client.city` |
| `src_state` | `client.region` |
| `src_metro` | `client.metro` |
| `src_country` | `client.country_code` |
| `src_lat`, `src_lon` | `client.latitude`, `client.longitude` |
| `src_group_label` | `client.group_label` (falls back to `src_city`) |
| `detection_granularity` | `client.grouping_granularity` (normalized) |
| `client_geo_source` | `client.geo_source` (normalized) |
| `dst_asn` | `server.asn` |
| `dst_site` | `server.site` |
| `dst_city` | `server.city` |
| `dst_country` | `server.country_code` |
| `dst_lat`, `dst_lon` | `server.latitude`, `server.longitude` |
| `ndt_rtt` | `performance.ndt_rtt_ms` |
| `ndt_throughput` | `performance.download_mbps` |
| `median_upload_throughput` | `performance.upload_mbps` |
| `ndt_loss_rate` | `performance.loss_rate` |
| `traceroute_rtt` | `performance.traceroute_rtt_ms` |
| `baseline_median_rtt` | `performance.baseline.ndt_rtt_ms` |
| `baseline_median_throughput` | `performance.baseline.download_mbps` |
| `baseline_median_upload_throughput` | `performance.baseline.upload_mbps` |
| `baseline_median_loss` | `performance.baseline.loss_rate` |
| `number_of_measurements_baseline` | `performance.baseline.measurement_count` |
| `number_of_unique_src_ips_baseline` | `performance.baseline.unique_client_ip_count` |
| `anomaly_ratio_rtt`, `anomaly_rtt_count` | `performance.anomaly.rtt_ratio`, `.rtt_count` |
| `anomaly_ratio_throughput`, `anomaly_throughput_count` | `performance.anomaly.download_ratio`, `.download_count` |
| `anomaly_ratio_upload_throughput`, `anomaly_upload_throughput_count` | `performance.anomaly.upload_ratio`, `.upload_count` |
| `anomaly_loss_ratio` | `performance.anomaly.loss_ratio` |
| `difference_latency` | `performance.anomaly.rtt_difference_ms` |
| `difference_throughput` | `performance.anomaly.download_difference_mbps` |
| `difference_upload_throughput` | `performance.anomaly.upload_difference_mbps` |
| `forward_*` | `server_to_client_path.*` |
| `reverse_*` | `client_to_server_path.*` |
| `forward_distance`, `reverse_distance` | `…_path.distance_km` |
| `forward_loop`, `reverse_loop` | `…_path.loop_detected` |
| `forward_unresponse_within_AS`, `reverse_unresponsive_within_AS` | `…_path.unresponsive_within_as` |
| `forward_updated_node_details`, `reverse_updated_node_details` | `…_path.hops` |
| `both_way_distance` | `round_trip_distance_km` |
| `reach_dest` | `quality.reaches_client` |
| `is_reaching_dst_asn` | `quality.reaches_client_asn` |
| `revtr_id` | `client_to_server_path.revtr.measurement_id` |
| `revtr_system_label` | `client_to_server_path.revtr.system_label` |
| `revtr_stop_reason` | `client_to_server_path.revtr.stop_reason` |
| `revtr_fail_reason` | `client_to_server_path.revtr.fail_reason` |
| `is_try_from_destination_AS` | `client_to_server_path.revtr.tried_from_client_as` |

Within the hop records:

| Operational hop field | Published hop field |
| ----- | ----- |
| `addr` | `ip` |
| `rtts` | `rtt_ms` |
| `associated_asn` | `asn` |
| `associated_org` | `as_name` |
| `associated_peeringdb_name` | `peeringdb_name` |
| `associated_ixp` | `ixp` |
| `place` | `city` |
| `cc` | `country_code` |
| `score` | `geo_score` |
| `distance_to_destination_km` | `remaining_distance_km` |
| `speed_of_internet_fiber` | `fiber_lower_bound_rtt_ms` |
| `facilities_info` | `facilities` |
| `hop_type` *(reverse only)* | `revtr_hop_type` |
| `is_interdomain_symmetry` *(reverse only)* | `uses_interdomain_symmetry` |

`ttl`, `rdns_name`, `latitude`, `longitude`, `metro`, `clli`, `geo_source`, `geo_partition_date`, `ixp_partition_date`, `cumulative_distance_km`, `distance_rtt_check`, `above_baseline_flag`, `increasing_latency_flag`, `baseline_consistency_flag`, and `is_fishy_type_4` keep their names. `is_interdomain_symmetry` and `is_fishy_type_4` are written with a `FALSE` default, so they are never NULL.

The view also adds fields the operational table does not have at all: `direction`, `measurement_method`, `segment_distance_km`, `geodesic_distance_km`, `detour_ratio`, `total_hop_count`, `responsive_hop_count`, `geolocated_hop_count`, `geolocation_coverage`, `as_path`, `country_path`, `metro_path`, and `ixp_path`.

## Changelog

### 2026-08-01 — client grouping and geolocation source changed

Client grouping moved from **city** to **metro** granularity, and the client geolocation source moved from **MaxMind** to **IPinfo**. Both changed on the same date.

This affects any analysis spanning 2026-08-01. Group counts and event counts shift at the boundary for methodological reasons, not because the Internet changed. In `events_enriched`, `client.grouping_granularity` and `client.geo_source` tell you which regime a row belongs to; rows from before the change are projected as `city` and `maxmind`. In the underlying table the corresponding historical columns are NULL.

If your query spans the boundary, group on `client.group_label` together with `client.grouping_granularity` rather than assuming one key applies throughout.

_[confirm the exact effect on event counts before publishing, and state the direction and rough magnitude]_
