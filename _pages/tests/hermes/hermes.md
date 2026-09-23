---
layout: page
permalink: /tests/hermes/
title: "HERMES"
breadcrumb: tests
---

> **DRAFT — for review, not published.** Items marked _[confirm]_ are read from the HERMES pipeline source and still need checking against the live tables.

# HERMES

HERMES is an M-Lab data product that identifies when groups of Internet users experience a statistically significant drop in performance, and reports the parts of the network most closely associated with that drop.

The Internet fails in more ways than going offline. A network can stay reachable while latency rises or throughput falls far enough to make video calls, streaming, and interactive applications unusable. Observatories that watch reachability and routing generally do not register these degradations. HERMES is built to register them, using measurements that M-Lab has collected and published openly for years.

HERMES has been running since August 2024. It is described in the ACM SIGCOMM 2026 paper [HERMES: Repurposing User-Driven Speed Tests to Monitor the Internet](https://doi.org/10.1145/3789240.3829129){:target="_blank"}, and its full analysis output is published in BigQuery for anyone to query.

## How HERMES works, briefly

HERMES takes M-Lab [NDT]({{ site.baseurl }}/tests/ndt/) measurements — throughput, round-trip time, and loss from user-initiated speed tests — and groups them by access network (ASN), metropolitan area, and the M-Lab site the test ran against. Grouping holds the user's network, location, and test destination roughly constant, so a change that appears across the whole group is unlikely to be one household's Wi-Fi.

For every group with enough data, HERMES compares current performance against that group's own recent baseline and applies statistical tests to decide whether the distribution of measurements really changed. There is no universal threshold for "normal" latency or throughput; what matters is whether a group is performing substantially worse than it usually does.

When a group has degraded, HERMES examines the network paths its measurements traversed — the path measured from the M-Lab server toward the user, and, where available, the reverse path from the user back toward the server — to identify the network segments the affected connections have in common. It reports the segments best supported by the evidence, and labels each event as localized, ambiguous, or unresolved. HERMES does not assert that a particular network caused a degradation.

Every one of these steps leaves its inputs and outputs in the published data, so you can reproduce, audit, or disagree with any conclusion HERMES reaches instead of accepting a summary score.

> **HERMES also provides an annotated traceroute dataset.** Annotating traceroute hops with AS, geolocation, and interconnection information is one stage of the HERMES pipeline. That stage is documented separately in [Traceroute enrichment]({{ site.baseurl }}/tests/hermes/methodology/path-enrichment/); the product described on this page is the performance analysis that consumes it.

## Questions HERMES can help you investigate

* Did performance for a particular network, in a particular metro area, change on a particular day — by how much, measured against what baseline, and with what statistical support?
* When performance degraded, which ASes, interconnections, and geographic locations appeared on the affected paths but not on the unaffected ones?
* Did the path toward the user and the path back from the user change in the same way? Roughly half of the links implicated in performance events are visible in only one direction.
* How did a flood, storm, or cable cut affect usable connectivity in a region, in cases where networks stayed reachable throughout?
* Does a recurring problem cluster around a specific metro area, transit provider, or interconnection point over months?
* Is a slowdown one user's problem, or is it shared across a network and location?

## The published data

HERMES publishes one row per NDT measurement that belongs to a monitored group _[confirm]_, carrying everything HERMES computed around that measurement: the group's baseline, how far the measurement sits from it, both directions of the annotated network path, and the metadata that says how much weight the path evidence deserves.

Two tables expose it. Start with the first.

```
mlab-collaboration.hermes.events_enriched
```

The **stable published interface**. Each row is organised into six records — `client`, `server`, `performance`, `server_to_client_path`, `client_to_server_path`, and `quality` — with names that describe what the fields mean. It also derives things you would otherwise have to compute: AS, country, metro, and IXP paths; hop counts and geolocation coverage; the direct geodesic distance between endpoints and the resulting detour ratio. Column names here are a contract and will not change under you.

```
mlab-collaboration.hermes_union.events_with_as_and_geoloc
```

The **underlying operational table**: 75 flat columns, written directly by the pipeline. Use it when you need the raw statistical test outputs, which the published interface does not currently expose _[confirm]_, or when you are working with the pipeline itself.

What a row contains, in either form:

| Group | What it holds |
| --- | --- |
| **Measurement** | The NDT observation itself: round-trip time, download and upload throughput, loss rate, and the RTT measured by the accompanying traceroute. |
| **Client and server** | Who and where: the client's ASN and AS name, city, metro, region and country; the M-Lab site the test ran against, its AS and location; and how the client was grouped and geolocated. |
| **Baseline and deviation** | What this group normally does — median RTT, download, upload, and loss over the preceding window, the sample sizes those medians rest on — and how far this day sits from them. |
| **Statistical output** | Whether the change is real and how large: Mann-Whitney U and Welch's *t* results for latency and throughput, Wasserstein distance results, and per-group anomaly ratios and counts. |
| **Network paths** | Both directions, hop by hop: address, reverse DNS name, RTTs, AS number and organization, IXP membership, geolocation, and the provenance of every annotation — plus AS, country, metro, and IXP path summaries and distances. |
| **Path trustworthiness** | Whether the path evidence should be believed: whether the trace reached the client or its AS, whether hops are consistent with the speed of light in fiber, whether the path loops or goes unresponsive inside an AS, and the status of the reverse-traceroute system for that measurement. |

The full field-by-field reference for both is in the [HERMES table schema]({{ site.baseurl }}/tests/hermes/schema/).

## Start here

**If you want to query the data:** [Access and quickstart]({{ site.baseurl }}/tests/hermes/quickstart/) covers getting access, the cost controls that matter on a table this size, and your first query.

**If you want to see what HERMES found:** the [HERMES dashboard](https://hermes-dashboard.org/){:target="_blank"} shows detected events and their supporting evidence without writing any SQL.

**If you want worked analyses:** [Example queries and tutorials]({{ site.baseurl }}/tests/hermes/examples/) walks through finding degraded groups, reconstructing an event, and comparing the two directions of a path.

**If you want to know how a field was computed:** [Methodology]({{ site.baseurl }}/tests/hermes/methodology/) explains each stage of the pipeline and links to the detailed documentation for grouping, detection, path enrichment, and localization.

**If traceroutes are new to you:** [Introduction to traceroutes]({{ site.baseurl }}/learn/traceroute/) explains what a traceroute is, what it can tell you, and the ways it can mislead.

## Coverage and limits

HERMES inherits the properties of the measurements it is built on, and those properties bound what it can say.

* **The testing population is not a random sample.** NDT tests are user-initiated, and people are more likely to run one when they already suspect a problem. HERMES is useful for surfacing incidents; it is not a survey of Internet performance.
* **Coverage varies by network, location, and time.** HERMES only reports on a group when enough measurements exist to support a comparison. No detected event can mean stable performance *or* insufficient evidence — it is not proof that a network was healthy.
* **Daily resolution favors sustained degradations.** The default comparison is daily, which is robust against short-term noise but may miss incidents lasting minutes or hours.
* **Paths to M-Lab are not paths to everywhere.** Routing is destination-dependent. A degradation on the path to an M-Lab server may not affect every application, and a problem on another path may not appear here.
* **Localization identifies association, not responsibility.** HERMES can point to segments strongly associated with a degradation. Establishing cause, or operational or legal responsibility, requires evidence HERMES does not have.

HERMES analyzes M-Lab's public measurements in aggregate and does not attempt to identify individual test participants. Anyone working with the underlying NDT data should follow M-Lab's [Privacy Policy]({{ site.baseurl }}/privacy/).

## Source code and citation

The pipeline is open source at [github.com/m-lab/hermes](https://github.com/m-lab/hermes/){:target="_blank"}.

Please cite the HERMES dataset as: **The M-Lab HERMES Dataset, &lt;date range used>. https://measurementlab.net/data/hermes**

If you use HERMES in research, please also cite the paper:

```
Loqman Salamatian, Kevin Vermeulen, Dave Choffnes, Ethan Katz-Bassett, and
Phillipa Gill. 2026. HERMES: Repurposing User-Driven Speed Tests to Monitor
the Internet. In ACM SIGCOMM 2026 Conference (SIGCOMM '26).
https://doi.org/10.1145/3789240.3829129
```

## Improving what HERMES can see

HERMES can only observe where M-Lab measurements exist. Hosting an M-Lab server increases measurement coverage in a region and exposes paths and interconnections that would otherwise be sparsely observed. ISPs, network operators, universities, and other eligible organizations can contribute infrastructure through M-Lab's [host-managed server program]({{ site.baseurl }}/contribute/host-managed/).
