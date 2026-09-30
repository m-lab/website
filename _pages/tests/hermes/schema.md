---
layout: page
permalink: /tests/hermes/schema/
title: "HERMES Table Schema"
breadcrumb: tests
---

> **DRAFT — for review, not published.** Field names and structure below are read from the HERMES pipeline source (`create_events_enriched.sql` and `04_mapping_union.sql` in `m-lab/hermes`). Types and modes are derived from the pipeline DDLs and SQL, not read from the live tables; confirm them against `INFORMATION_SCHEMA.COLUMNS` before this page is published.

# HERMES Table Schema

HERMES publishes one interface for analysis, `events_enriched`, a view that carries every column of the table underneath it under clear, stable names. The underlying operational table is documented at the end of this page only as a reference for translating older queries.

| Table | Use it for |
| --- | --- |
| [`mlab-collaboration.hermes_union.events_enriched`](#events_enriched) | Everything. Nested, clearly named, stable, with path summaries precomputed. |
| [`mlab-collaboration.hermes_union.events_with_as_and_geoloc`](#events_with_as_and_geoloc) | Translating queries written against the pipeline's original column names, several of which are misleading (see the [legacy name map](#legacy-name-map)). 79 flat columns, all exposed by the view. |

## What a row is

A row is **one NDT measurement that has an accompanying traceroute and belongs to a group HERMES analyzed on that date**, carried together with everything HERMES computed around it. A group is the set of measurements from one access network (ASN), in one metro area, against one M-Lab site, over one IP version (see [Grouping]({{ site.baseurl }}/tests/hermes/methodology/#1-grouping)). Rows are written for every analyzed group, not only for groups that degraded; whether a group degraded is recorded in the `performance.anomaly` fields.

A row is **not** an event. A performance event is a property of a group — an access network, in a metro area, testing against one M-Lab site, on one day — and it is expressed across the many rows belonging to that group. To reason about events, aggregate by the group key:

```sql
GROUP BY partition_date, client.asn, client.metro, server.site, ip_version
```

Both tables are partitioned by `partition_date`. The field `partition_date` is the **analysis date**, not necessarily the date the underlying traceroute was measured: path measurements are drawn from a lookback window and attached to the day being analyzed. The field that records when the measurement itself was taken is `measurement_time`.

That lookback has a consequence for every count and per-measurement statistic. Each partition carries the measurements from the analysis date **and the seven days before it**, so one measurement typically appears in eight consecutive partitions, and only about one row in eight belongs to the analysis date itself. The group-level fields (`performance.baseline.*`, `performance.anomaly.*`) are computed from the right data and repeat on every row of the group. But `COUNT(*)`, or a median of `performance.ndt_rtt_ms`, over a whole partition mixes a week of measurements. To work with the analysis date's own measurements, add:

```sql
AND DATE(measurement_time) = partition_date
```

Do not use that filter to deduplicate across a range of dates without thinking it through: a measurement is attached to a date only if its group was analyzed that day, so the filter drops groups that were not analyzed on the day they were measured.

## Field summary

Every field in both tables, in one place. Dotted names are nested record fields, addressed in SQL exactly as written here. The sections after this one explain what the records are for and how to read them.

### Fields of the events_enriched table

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| measurement_id | STRING | NULLABLE | Identifier of the NDT measurement this row describes. |
| measurement_time | TIMESTAMP | NULLABLE | When the measurement was taken. |
| traceroute_hour | TIMESTAMP | NULLABLE | When the accompanying traceroute started, truncated to the hour. |
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
| performance.baseline.measurement_count | FLOAT64 | NULLABLE | Measurements the baseline rests on. Read every baseline next to this. |
| performance.baseline.unique_client_ip_count | FLOAT64 | NULLABLE | Distinct client IPs the baseline rests on. |
| performance.anomaly | RECORD | NULLABLE | How far this day sits from the baseline. |
| performance.anomaly.rtt_anomalous_sample_fraction | FLOAT64 | NULLABLE | Fraction of the group's measurements on the analysis date with RTT more than 5 ms above the baseline median. NULL when the group was too small to test. |
| performance.anomaly.rtt_significant | BOOL | NULLABLE | HERMES's RTT verdict for the group: Welch's *t* or Mann-Whitney U p < 0.05, **and** the day's median RTT at least 5 ms above the baseline median. |
| performance.anomaly.download_anomalous_sample_fraction | FLOAT64 | NULLABLE | Fraction of the group's measurements on the analysis date with download throughput below the baseline median. |
| performance.anomaly.download_significant | BOOL | NULLABLE | HERMES's download verdict for the group: Welch's *t*, Mann-Whitney U, **and** Wasserstein p < 0.05, **and** the day's median at least 20% below the baseline median. |
| performance.anomaly.upload_anomalous_sample_fraction | FLOAT64 | NULLABLE | Fraction of the group's measurements on the analysis date with upload throughput below the baseline median. |
| performance.anomaly.upload_significant | BOOL | NULLABLE | HERMES's upload verdict, with the same gate as download, evaluated only when the group has at least 10 upload samples on the day and 25 in the baseline. |
| performance.anomaly.loss_ratio | FLOAT64 | NULLABLE | Despite the name, HERMES's 0/1 loss verdict for the group, not a fraction. |
| performance.anomaly.rtt_difference_ms | FLOAT64 | NULLABLE | The group's median RTT on the analysis date minus its baseline median. |
| performance.anomaly.download_difference_mbps | FLOAT64 | NULLABLE | The group's median download throughput on the analysis date minus its baseline median. |
| performance.anomaly.upload_difference_mbps | FLOAT64 | NULLABLE | The group's median upload throughput on the analysis date minus its baseline median. |
| performance.tests | RECORD | NULLABLE | The statistical test results behind the `*_significant` verdicts. Group-level, and NULL for groups too small to test. |
| performance.tests.mann_whitney | RECORD | NULLABLE | Mann-Whitney U tests of the analysis day against the baseline, with sub-records `rtt`, `download`, and `upload`. |
| performance.tests.mann_whitney.rtt.u_statistic | FLOAT64 | NULLABLE | The U statistic, the smaller of the two samples' U values (two-sided). |
| performance.tests.mann_whitney.rtt.z_score | FLOAT64 | NULLABLE | Normal approximation of U, with continuity correction. |
| performance.tests.mann_whitney.rtt.p_value | FLOAT64 | NULLABLE | Two-sided p-value. |
| performance.tests.mann_whitney.rtt.expected_u | FLOAT64 | NULLABLE | Expected U under the null hypothesis. |
| performance.tests.mann_whitney.rtt.u_standard_deviation | FLOAT64 | NULLABLE | Standard deviation of U under the null hypothesis, corrected for ties. |
| performance.tests.welch_t | RECORD | NULLABLE | Welch's *t* test of the analysis day against the baseline. Only `rtt` is available. |
| performance.tests.welch_t.rtt.t_statistic | FLOAT64 | NULLABLE | The *t* statistic: positive when the analysis-day mean is higher. |
| performance.tests.welch_t.rtt.degrees_of_freedom | FLOAT64 | NULLABLE | Welch–Satterthwaite degrees of freedom. |
| performance.tests.welch_t.rtt.p_value | FLOAT64 | NULLABLE | Two-sided p-value. |
| performance.tests.welch_t.rtt.analysis_day_mean | FLOAT64 | NULLABLE | Mean RTT on the analysis day. |
| performance.tests.welch_t.rtt.baseline_mean | FLOAT64 | NULLABLE | Mean RTT over the baseline window. |
| performance.tests.welch_t.rtt.analysis_day_standard_error | FLOAT64 | NULLABLE | Standard error of the analysis-day mean. |
| performance.tests.welch_t.rtt.baseline_standard_error | FLOAT64 | NULLABLE | Standard error of the baseline mean. |
| performance.tests.wasserstein | RECORD | NULLABLE | Wasserstein distance tests, with sub-records `download` and `upload`. |
| performance.tests.wasserstein.download.distance | FLOAT64 | NULLABLE | Wasserstein distance between the analysis-day and baseline distributions. |
| performance.tests.wasserstein.download.p_value | FLOAT64 | NULLABLE | p-value for that distance. |
| performance.analysis_day | RECORD | NULLABLE | The group's distribution on the analysis day, over all of its NDT measurements that day, including those without a traceroute. Group-level. |
| performance.analysis_day.rtt_p01_ms | FLOAT64 | NULLABLE | 1st percentile RTT. |
| performance.analysis_day.rtt_p10_ms | FLOAT64 | NULLABLE | 10th percentile RTT. |
| performance.analysis_day.rtt_median_ms | FLOAT64 | NULLABLE | Median RTT. |
| performance.analysis_day.rtt_p90_ms | FLOAT64 | NULLABLE | 90th percentile RTT. |
| performance.analysis_day.download_median_mbps | FLOAT64 | NULLABLE | Median download throughput. |
| performance.analysis_day.download_p90_mbps | FLOAT64 | NULLABLE | 90th percentile download throughput. |
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
| server_to_client_path.loop_detected | BOOL | NULLABLE | Whether an AS reappears on the path after a *different* AS (A B A). Consecutive hops in the same AS do not count, and hops with no ASN are ignored. NULL when the path has no hops. |
| server_to_client_path.unresponsive_within_as | BOOL | NULLABLE | Whether an AS reappears after one or more hops with no ASN (A … A): hops that did not reply, or replied from an address that could not be mapped, so part of that AS's internal path is unknown. NULL when the path has no hops. |
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

`performance.tests.mann_whitney.download` and `.upload` carry the same fields as `.rtt`; `performance.tests.wasserstein.upload` carries the same fields as `.download`.

On `client_to_server_path`, `loop_detected` and `unresponsive_within_as` use the same definitions but describe the reverse path **as measured**, before HERMES removes ambiguous hops and truncates the path at the first AS re-entry. A loop therefore never appears in the published reverse hops, and these two flags are how you learn that one was measured. They are NULL for analysis dates processed before this definition was introduced.

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
| quality.unique_ip_count_per_site | FLOAT64 | NULLABLE | Distinct client IPs in this group and site. |
| quality.measurement_count_per_site | FLOAT64 | NULLABLE | Measurements in this group and site. |

### Fields of the events_with_as_and_geoloc table

The 79 flat columns of the operational table, each with the view field that exposes it.

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| id | STRING | NULLABLE | NDT measurement identifier. View: `measurement_id`. |
| src | STRING | NULLABLE | Client IP address. View: `client.ip`. |
| dst | STRING | NULLABLE | M-Lab server IP address. View: `server.ip`. |
| start | INT64 | NULLABLE | Measurement start, UNIX seconds. View: `measurement_time`, as a TIMESTAMP. |
| window_start | TIMESTAMP | NULLABLE | Traceroute start, truncated to the hour. View: `traceroute_hour`. |
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
| city_median_rtt | FLOAT64 | NULLABLE | Median RTT for the detection group on the analysis day, not the city. View: `performance.analysis_day.rtt_median_ms`. |
| city_oneth_percentile_rtt | FLOAT64 | NULLABLE | 1st percentile RTT for the detection group on the analysis day, not the city. View: `performance.analysis_day.rtt_p01_ms`. |
| city_tenth_percentile_rtt | FLOAT64 | NULLABLE | 10th percentile RTT for the detection group on the analysis day, not the city. View: `performance.analysis_day.rtt_p10_ms`. |
| city_ninetyth_percentile_rtt | FLOAT64 | NULLABLE | 90th percentile RTT for the detection group on the analysis day, not the city. View: `performance.analysis_day.rtt_p90_ms`. |
| city_median_throughput | FLOAT64 | NULLABLE | Median download throughput for the detection group on the analysis day, not the city. View: `performance.analysis_day.download_median_mbps`. |
| city_ninetyth_percentile_throughput | FLOAT64 | NULLABLE | 90th percentile download throughput for the detection group on the analysis day, not the city. View: `performance.analysis_day.download_p90_mbps`. |
| mann_whitney_latency | RECORD | NULLABLE | Mann-Whitney U test result for latency against the baseline. View: `performance.tests.mann_whitney.rtt`. |
| mann_whitney_throughput | RECORD | NULLABLE | Mann-Whitney U test result for download throughput. View: `performance.tests.mann_whitney.download`. |
| mann_whitney_upload_throughput | RECORD | NULLABLE | Mann-Whitney U test result for upload throughput. View: `performance.tests.mann_whitney.upload`. |
| t_test_latency | RECORD | NULLABLE | Welch's *t* test result for latency. View: `performance.tests.welch_t.rtt`. |
| wasserstein_throughput_result | RECORD | NULLABLE | Wasserstein distance result for download throughput. View: `performance.tests.wasserstein.download`. |
| wasserstein_upload_throughput_result | RECORD | NULLABLE | Wasserstein distance result for upload throughput. View: `performance.tests.wasserstein.upload`. |
| anomaly_ratio_rtt | FLOAT64 | NULLABLE | Fraction of the group's measurements flagged anomalous on RTT. |
| anomaly_rtt_count | INT64 | NULLABLE | Not a count: HERMES's 0/1 RTT verdict for the group. View: `performance.anomaly.rtt_significant`. |
| anomaly_ratio_throughput | FLOAT64 | NULLABLE | Fraction flagged anomalous on download throughput. |
| anomaly_throughput_count | INT64 | NULLABLE | Not a count: HERMES's 0/1 download verdict for the group. View: `performance.anomaly.download_significant`. |
| anomaly_ratio_upload_throughput | FLOAT64 | NULLABLE | Fraction flagged anomalous on upload throughput. |
| anomaly_upload_throughput_count | INT64 | NULLABLE | Not a count: HERMES's 0/1 upload verdict for the group. View: `performance.anomaly.upload_significant`. |
| anomaly_loss_ratio | FLOAT64 | NULLABLE | Despite the name, HERMES's 0/1 loss verdict for the group. |
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
| forward_loop | BOOL | NULLABLE | Server-to-client AS loop. Written with an incorrect definition before the fix; the view recomputes it for every date. View: `server_to_client_path.loop_detected`. |
| reverse_loop | BOOL | NULLABLE | Client-to-server AS loop, on the path as measured. Incorrect before the fix, so the view exposes it only from the fix onward. View: `client_to_server_path.loop_detected`. |
| forward_unresponse_within_AS | BOOL | NULLABLE | Server-to-client gap inside an AS. Written with an incorrect definition before the fix; the view recomputes it for every date. View: `server_to_client_path.unresponsive_within_as`. |
| reverse_unresponsive_within_AS | BOOL | NULLABLE | Client-to-server gap inside an AS, on the path as measured. Incorrect before the fix, so the view exposes it only from the fix onward. View: `client_to_server_path.unresponsive_within_as`. |
| revtr_id | INT64 | NULLABLE | Reverse traceroute identifier. |
| revtr_system_label | STRING | NULLABLE | Which reverse traceroute system produced the path. |
| revtr_stop_reason | STRING | NULLABLE | Why the reverse traceroute stopped. |
| revtr_fail_reason | STRING | NULLABLE | Why the reverse traceroute failed, where it did. |
| is_try_from_destination_AS | BOOL | NULLABLE | Whether a vantage point in the client's AS was attempted. |

The hop records `forward_updated_node_details` and `reverse_updated_node_details` carry the pre-rename field names: `addr`, `rtts`, `associated_asn`, `associated_org`, `associated_peeringdb_name`, `associated_ixp`, `place`, `cc`, `score`, `speed_of_internet_fiber`, and `facilities_info`. The view's equivalents are listed in the `events_enriched` table above.

<a name="events_enriched"></a>

## How to read the events_enriched table

The stable published interface. Field names here are a contract; the underlying table's names are not. Every field is listed in the [field summary](#field-summary) above — this section explains what the six records are for and how to read them.

Because HERMES measures in both directions with two different tools, the path records name the direction they were actually measured in rather than borrowing traceroute's "forward" and "reverse". `server_to_client_path` is scamper, measured from the M-Lab server. `client_to_server_path` is reverse traceroute, measured back toward the server. Hop order and RTT vantage point are preserved as measured in both.

### The client and server records

The two endpoints of the measurement. Beyond location, `client` carries how the measurement was grouped: `group_label` names the group, `grouping_granularity` says whether that group was formed at city or metro level, and `geo_source` says which database placed the client. Those three are what let you tell measurements from the city and metro periods (see the [changelog](#changelog)) apart, and they are the fields to group on when you span it.

`server.geo_source` is always `server_metadata`. M-Lab server locations come from M-Lab's own records rather than IP geolocation, so they are not subject to the caveats that apply to the hop locations further down.

### The performance record

The measurement itself, the group's baseline, and the distance between them.

The comparison that matters is between `performance.*` and `performance.baseline.*` — not between one group and another. Networks and locations differ enormously in what is normal for them, and HERMES is built on the change, not the level.

Read every baseline next to `baseline.measurement_count` and `baseline.unique_client_ip_count`. A baseline resting on the minimum admissible sample is a far weaker reference than one resting on thousands of measurements, and the row tells you which you have.

The `anomaly` record holds three different kinds of value. The `*_significant` fields are HERMES's verdict: whether the group's change passed the statistical tests and the size gate. The `*_anomalous_sample_fraction` fields say how much of the group was affected; the `*_difference_*` fields say how far the group's median moved. A large difference with a small fraction usually means a few very bad measurements, while a large difference with a large fraction means the whole group moved. `loss_ratio` is, despite its name, a 0/1 verdict like the `*_significant` fields.

`tests` holds the results behind the verdicts: Mann-Whitney U for RTT, download, and upload; Welch's *t* for RTT; and Wasserstein distance for download and upload. `analysis_day` holds the group's RTT and download percentiles over every NDT measurement that day, which is the distribution the verdict was reached on. A median you compute over this view's rows will differ from it, because rows exist only for measurements with a traceroute and include the lookback week.

> **Very large groups are not actually tested.** When either the analysis-day or the baseline sample has more than 20,000 measurements, the test implementations return a `p_value` of `1e-10` and zeros in every other field, without running the test. Treat a `p_value` of exactly `1e-10` with a zero statistic as "not tested", not as overwhelming evidence.

### The path records

Both records carry the same fields, distinguished by `direction` and `measurement_method`. `client_to_server_path` adds a `revtr` record describing the reverse traceroute measurement itself — which system produced the path, why it stopped, why it failed, and whether a vantage point in the client's AS was attempted.

`as_path`, `country_path`, `metro_path`, and `ixp_path` answer most path questions without unnesting `hops`, and they are far cheaper to query. Reach for the hop array only when you need per-hop detail.

`detour_ratio` is `distance_km / geodesic_distance_km`: how much further traffic travelled than the straight line between endpoints. Always read it next to `geolocation_coverage`. A path where a third of hops could be geolocated still reports a distance, and that distance is a lower bound assembled from the hops that happened to be placed — not a measurement of the route.

### The hops arrays

One record per hop, ordered by TTL, carrying the hop's address and RTT alongside everything HERMES inferred about it: its network, its organization and PeeringDB name, IXP membership, a location, and a reverse DNS name.

A geolocated hop is an inference, not an observation. `geo_source`, `geo_score`, `geo_partition_date`, and `distance_rtt_check` exist so you can judge how much to trust each one. `distance_rtt_check` is the most useful of these: it compares the measured RTT against the lowest RTT physically possible for the geolocated distance, and when the measurement beats physics, the geolocation is wrong rather than the physics.

Two things to watch when filtering. The per-hop flags — `distance_rtt_check`, `above_baseline_flag`, `increasing_latency_flag`, `baseline_consistency_flag` — are strings with fixed values, not booleans, so they need string comparisons. And `geo_score` uses `-1` to mean private or unplaced rather than low confidence, so it should be excluded rather than averaged.

The reverse path's hops carry three fields the forward path's do not: `revtr_hop_type`, `uses_interdomain_symmetry`, and `is_fishy_type_4`. The middle one matters most — a hop inferred by assuming interdomain path symmetry is weaker evidence than one measured directly. They do not carry `baseline_consistency_flag`.

For how each annotation is produced and where it fails, see [Traceroute enrichment]({{ site.baseurl }}/tests/hermes/methodology/path-enrichment/).

### The quality record

Whether this row's evidence should be trusted at all, and how much data stands behind the group.

A path that never reached the client, or reached only its AS, still carries useful information — but it cannot support a claim about the last mile. Filter on `quality` before drawing any conclusion about where a problem sits.

<a name="events_with_as_and_geoloc"></a>

## How to read the events_with_as_and_geoloc table

The operational table underneath the view: 79 flat columns, written directly by the pipeline. The view exposes every one of them, so there is no need to query this table for analysis. This section exists to translate queries written against its original names.

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
| `anomaly_ratio_rtt`, `anomaly_rtt_count` | `performance.anomaly.rtt_anomalous_sample_fraction`, `.rtt_significant` (BOOL) |
| `anomaly_ratio_throughput`, `anomaly_throughput_count` | `performance.anomaly.download_anomalous_sample_fraction`, `.download_significant` (BOOL) |
| `anomaly_ratio_upload_throughput`, `anomaly_upload_throughput_count` | `performance.anomaly.upload_anomalous_sample_fraction`, `.upload_significant` (BOOL) |
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

From 2026-08-01, client grouping moved from **city** to **metro** granularity, and the client geolocation source moved from **MaxMind** to **IPinfo**. Both changed on the same date.

Dates added later by backfill were computed with the new method, so the published data has three periods by `partition_date`:

| Analysis dates | Grouping | Client geolocation |
| --- | --- | --- |
| Through 2025-07-31 (backfilled) | metro | IPinfo |
| 2025-08-01 to 2026-07-31 | city | MaxMind |
| From 2026-08-01 | metro | IPinfo |

This affects any analysis spanning 2025-08-01 or 2026-08-01. Group counts and event counts shift at those boundaries for methodological reasons, not because the Internet changed. In `events_enriched`, `client.grouping_granularity` and `client.geo_source` tell you which regime a row belongs to; city-period rows are projected as `city` and `maxmind`, and have no `client.metro`. In the underlying table the corresponding columns are NULL for the city period.

If your query spans the boundary, group on `client.group_label` together with `client.grouping_granularity` rather than assuming one key applies throughout.

Expect detected event counts to roughly halve at the boundary, from about 2,900 to about 1,450 per day, because metro groups aggregate measurements that city groups split apart. That drop reflects the change in grouping, not a change in network performance.
