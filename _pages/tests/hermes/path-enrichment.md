---
layout: page
permalink: /tests/hermes/methodology/path-enrichment/
title: "HERMES Traceroute Enrichment"
breadcrumb: tests
---

> **DRAFT — for review, not published.** Data sources and behaviours below are read from the HERMES pipeline source. Items marked _[confirm]_ need checking before publication.

# Traceroute Enrichment

> Traceroute enrichment is **one stage** of the HERMES pipeline. It produces the annotated paths that HERMES uses as evidence when localizing a performance degradation; it is not the HERMES data product. For the product, see the [HERMES overview]({{ site.baseurl }}/tests/hermes/); for the stage's place in the pipeline, see the [methodology]({{ site.baseurl }}/tests/hermes/methodology/).

A raw traceroute hop is an IP address and some round-trip times. On its own that cannot answer "which network was this, and where was it?" — the questions localization depends on. This page describes how HERMES turns each hop into an annotated hop, which sources it uses, how it records where each annotation came from, and how it flags annotations that are probably wrong.

If traceroutes are unfamiliar, read [Introduction to traceroutes]({{ site.baseurl }}/learn/traceroute/) first.

## Inputs

HERMES enriches two path measurements per NDT test, where both are available.

**The path from the M-Lab server toward the client** comes from M-Lab's own [traceroute]({{ site.baseurl }}/tests/traceroute/) core service. For every TCP connection to an M-Lab server, `traceroute-caller` runs `scamper` back toward the client and publishes the result as the `scamper1` datatype. HERMES consumes this, together with M-Lab's `hopannotation` data.

**The path from the client back toward the server** comes from [reverse traceroute]({{ site.baseurl }}/tests/reverse_traceroute/). Reverse paths cannot be measured directly from the server, so they are inferred using vantage points and IP options. This is an inference, and HERMES keeps the reverse-traceroute system's own metadata about it in the row: which system produced the path, why the measurement stopped, why it failed where it did, whether a vantage point in the client's AS was attempted, and per-hop, whether the hop relies on an assumption of interdomain path symmetry.

Note that "forward" and "reverse" in traceroute vocabulary do not describe the endpoints. The published schema names the directions as measured — `server_to_client_path` and `client_to_server_path` — and preserves each path's measured hop order and RTT vantage point rather than reversing arrays and implying RTTs originated somewhere they did not.

## What gets attached to a hop

| Annotation | Fields |
| --- | --- |
| **Network** | `asn`, `as_name`, `peeringdb_name` |
| **Interconnection** | `ixp` |
| **Location** | `latitude`, `longitude`, `city`, `region`, `metro`, `country_code`, `clli` |
| **Naming** | `rdns_name` |
| **Provenance** | `geo_source`, `geo_score`, `geo_partition_date`, `ixp_partition_date` |
| **Geometry** | `segment_distance_km`, `cumulative_distance_km`, `remaining_distance_km` |
| **Plausibility** | `propagation_speed_km_s`, `fiber_lower_bound_rtt_ms`, `distance_rtt_check`, `above_baseline_flag`, `increasing_latency_flag`, `baseline_consistency_flag` |

Every geographic annotation carries its source and a confidence score alongside it. That pairing is deliberate: a hop location is an inference, and a dataset that presents inferences without their provenance invites them to be read as observations.

## Data sources

Two distinct mappings place a hop in the network: one puts the address in an autonomous system, the other recognises it as an interconnection fabric. They come from different sources and fail in different ways, so they are worth keeping apart when reading a path.

| Mapping | Source | Fields | Where HERMES stores it |
| --- | --- | --- | --- |
| IP → AS | CAIDA IP-to-prefix mapping | `asn` | `hermes.unified_ip_to_as`, `hermes.unified_ip_to_as_ipv6` |
| IP → IXP | PeeringDB and EuroIX | `ixp` | `ix_data.ixp_members` |
| AS → organization and PeeringDB name | PeeringDB and CAIDA AS Rank | `as_name`, `peeringdb_name` | `hermes.as_metadata` |
| IP → geolocation | IPinfo, RIPE IPmap, and HOIHO | `latitude`, `longitude`, `city`, `metro`, `country_code` | `hermes.unified_ip_to_geoloc`, `…_ipv6` |
| IP → hostname | zDNS | `rdns_name` | `hermes.unified_ip_to_rdns`, `…_ipv6` |
| Hostname → location | HOIHO | `clli`, and contributes to placement | folded into the geolocation tables |

Because the AS and IXP mappings are independent, a hop can carry one without the other: an address may resolve to an AS with no IXP match, or sit in an IXP peering LAN whose address the prefix mapping attributes to the IXP operator rather than to either peer. Read `asn` and `ixp` together rather than treating one as a fallback for the other.

Client geolocation moved from MaxMind to IPinfo on 2026-08-01. Rows carry `client.geo_source` so you can tell which source placed a given client. See the [schema changelog]({{ site.baseurl }}/tests/hermes/schema/#changelog).

## Trustworthiness checks

Enrichment can be wrong. These checks exist so that consumers can tell when it probably is, rather than having to assume it never is.

### Speed of light

Signals in fiber propagate at roughly **200,000 km/s** — about two thirds of the speed of light in vacuum. This bounds how quickly a reply can come back from a given distance.

For each hop, HERMES records the assumed propagation speed (`propagation_speed_km_s`) and the resulting lower bound on RTT (`fiber_lower_bound_rtt_ms`), then compares that bound against the RTT actually measured. `distance_rtt_check` reports the result.

When a measured RTT is *lower* than physics allows for the geolocated distance, the physics is not wrong: the geolocation is. This is the single most useful signal for spotting a bad hop location.

> In the operational table this bound is stored in a column named `speed_of_internet_fiber`. Despite the name it is a lower-bound RTT in milliseconds, not a speed. The published view exposes it truthfully as `fiber_lower_bound_rtt_ms` and records the assumed speed separately.

### Distance accumulation

`segment_distance_km` is the distance from the previous geolocated hop, `cumulative_distance_km` the distance travelled so far in measured order, and `remaining_distance_km` the distance still to go. Together with the endpoints' straight-line separation, these give the path's `detour_ratio`.

A detour ratio well above 1 means traffic travelled substantially further than it needed to — often the visible signature of a rerouting event. Read it alongside `geolocation_coverage`: a distance computed from a path where only a third of hops could be placed is a lower bound assembled from the hops that happened to be geolocated, not a measurement of the route.

### Latency behaviour along the path

`above_baseline_flag` and `increasing_latency_flag` describe how each hop's latency behaves relative to the path's own baseline, and `baseline_consistency_flag` summarizes whether the path as a whole is consistent with its baseline. These distinguish a path that is uniformly slower from one where latency jumps at a specific hop.

### Path-level flags

Carried on the path records rather than per hop:

* `loop_detected` — the path revisits an AS, which usually indicates a routing problem or a measurement artifact.
* `unresponsive_within_as` — a run of hops inside one AS failed to respond, so that AS's internal path is invisible.
* `reaches_client` / `reaches_client_asn` — whether the measurement got all the way to the client, or only as far as its AS.
* `is_virtual` — the path shows signs of being a virtual or tunnelled route rather than the physical topology.
* `geolocation_coverage` — what fraction of hops could be geolocated at all.

Filter on these before any claim about where a problem sits. A path that never reached the client cannot support a statement about the last mile.

## Limitations

These are properties of traceroute and of IP annotation generally, not defects in HERMES. They bound what any path-based localization can conclude.

**Unresponsive hops.** Routers may be configured not to reply, or to rate-limit replies. A gap in a path is not an absence of infrastructure; it is an absence of information. `responsive_hop_count` and `total_hop_count` tell you how much of the path you are actually seeing.

**Third-party addresses.** A router may reply from an interface that belongs to a different network than the one carrying the traffic, which can attribute a hop to the wrong AS and place it in the wrong location. This is a well-known source of error in AS-level path inference from traceroute.

**Prefix mapping gives the prefix's origin AS, not the interface's operator.** `asn` comes from a longest-match lookup in a BGP-derived IP-to-prefix table. That answers "which AS originates the prefix containing this address", which is usually but not always the network operating the router that replied — point-to-point links, address space lent between networks, and the third-party case above all break the equivalence.

**Geolocation error.** IP geolocation is inference from allocation records, hostnames, and latency, not observation. Error at the city level is common, and infrastructure addresses are harder to place than residential ones. `geo_score` and `distance_rtt_check` are the fields to consult; `geo_source` tells you which method was responsible.

**Load balancing.** Consecutive probes may take different paths through a load-balanced network, so a single traceroute is one sample of a set of possible routes.

**A hop's RTT is not a link's latency.** RTT to a hop is a round trip that includes the return path from that hop, which may differ entirely from the path back from the destination. Rising RTT at a hop does not localize a problem to that hop by itself — which is precisely why HERMES combines path evidence across many measurements rather than reading a single traceroute.

## Source

The enrichment stage is implemented in `04_mapping_union.sql` and the `hermes.enrichment` package in [github.com/m-lab/hermes](https://github.com/m-lab/hermes/){:target="_blank"}.
