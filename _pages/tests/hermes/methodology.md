---
layout: page
permalink: /tests/hermes/methodology/
title: "HERMES Methodology"
breadcrumb: tests
---

> **DRAFT — for review, not published.** Thresholds and parameters below come from the HERMES paper and blog post. Anything marked _[confirm]_ needs checking against the deployed pipeline before publication.

# HERMES Methodology

This page describes how HERMES turns M-Lab NDT measurements into performance events with localization evidence, stage by stage. For each stage it names the fields that stage produces, so you can trace any value in the published data back to the step that computed it.

For what HERMES is, start at the [overview]({{ site.baseurl }}/tests/hermes/). For field definitions, see the [schema]({{ site.baseurl }}/tests/hermes/schema/).

## The pipeline in one view

| Stage | Question it answers | Fields it produces |
| --- | --- | --- |
| 1. Grouping | Which measurements are comparable to each other? | `client.group_label`, `client.grouping_granularity`, `client.geo_source` |
| 2. Baselines | What is normal for this group? | `performance.baseline.*` |
| 3. Detection | Did this group's performance actually change? | `performance.anomaly.*`, `performance.tests.*`, `performance.analysis_day.*` |
| 4. Path enrichment | Which networks and places did these connections traverse? | `server_to_client_path.hops`, `client_to_server_path.hops`, all path summaries |
| 5. Localization | Which segments are associated with the change? | `attribution_method` and `confidence_tier` in `mlab-collaboration.hermes_union.events_explained_daily` (not in `events_enriched`) |
| 6. Targeted measurement | Can ambiguity be reduced by measuring more? | Additional paths folded into stage 4 |

## 1. Grouping

A single slow speed test says almost nothing about the network. It may reflect the user's Wi-Fi, their device, background traffic on their connection, or their service plan — conditions that vary independently between households. Congestion or failure in shared infrastructure behaves differently: it changes many connections at once.

HERMES therefore analyzes **groups**, not measurements. A group is:

* one **access network**, identified by its Autonomous System Number;
* in one **metropolitan area**;
* testing against one **M-Lab site**.

Holding all three roughly constant means the group's measurements share a network, a location, and a destination, and are therefore likely to traverse much of the same infrastructure. Grouping does not eliminate local noise. It makes changes in shared infrastructure separable from isolated problems.

How much data a group needs before its comparison can be trusted is a tuning choice, and HERMES leaves it to you. The published tables carry every group HERMES could compare; the statistical tests themselves run once a group has more than two measurements both on the analysis day and in its baseline. We recommend requiring at least **25 measurements** from at least **5 distinct client IPs**, the threshold used in the HERMES paper:

```sql
AND quality.measurement_count_per_site >= 25
AND quality.unique_ip_count_per_site >= 5
```

Raise it to trade coverage for confidence, or lower it to see sparser groups at the cost of noisier results. Independently of that choice, HERMES caps the share of a group's baseline that any single IP can contribute (at 40%), so that one enthusiastic tester cannot define a group's behaviour, and excludes measurements whose location metadata is inconsistent.

**City and metro periods.** Groups for analysis dates from 2025-08-01 to 2026-07-31 were formed at city granularity using MaxMind geolocation; groups from 2026-08-01, and backfilled dates through 2025-07-31, are formed at metro granularity using IPinfo. `client.grouping_granularity` and `client.geo_source` record which regime a row belongs to. See the [schema changelog]({{ site.baseurl }}/tests/hermes/schema/#changelog).

## 2. Baselines

There is no universal threshold for "normal" latency or throughput. Performance that is unremarkable in one network and location would be a serious degradation in another. HERMES therefore compares each group against **itself**, not against other groups or against an absolute standard.

The baseline is built from the group's measurements over the seven days before the analysis date and is stored alongside every row, so the comparison HERMES made is visible in the data rather than implied:

* `performance.baseline.ndt_rtt_ms`, `.download_mbps`, `.upload_mbps`, `.loss_rate` — the group's medians
* `performance.baseline.measurement_count`, `.unique_client_ip_count` — what those medians rest on

Always read a baseline next to its sample size. A baseline built from the minimum admissible sample is a much weaker reference than one built from thousands of measurements, and the data tells you which you have.

## 3. Detection

HERMES looks for two signals:

* **Increased latency** — data takes longer to make a round trip, so interactive applications feel delayed or unstable.
* **Reduced throughput** — less data moves per unit time, disrupting streaming, large downloads, and other high-capacity uses.

Rather than thresholding a single summary statistic, HERMES asks whether the **distribution** of a group's measurements has changed relative to its baseline, using several tests that fail in different ways:

* **Mann-Whitney U** — a rank-based test that asks whether one distribution is systematically shifted from the other. It makes no assumption of normality, which matters because throughput distributions are not normal.
* **Welch's *t*** — a difference-of-means test that does not assume equal variances.
* **Wasserstein distance** — a measure of how much probability mass would have to move to turn one distribution into the other. It captures changes in shape that a shift-only test can miss.

The pipeline also records, per group, the verdict itself (`performance.anomaly.rtt_significant` and its download and upload counterparts), the share of the day's measurements that fall outside the baseline (`performance.anomaly.rtt_anomalous_sample_fraction` and counterparts), and the movement of the median (`performance.anomaly.rtt_difference_ms` and counterparts).

An event is reported when the change is statistically supported **and** large enough and widespread enough to matter. Statistical significance alone is not sufficient: with enough measurements, a change too small for any user to notice will be significant.

> The individual test results are in `performance.tests`: Mann-Whitney U for RTT, download, and upload, Welch's *t* for RTT, and Wasserstein distance for download and upload. When either sample exceeds 20,000 measurements the tests are skipped and report a `p_value` of `1e-10`; see the [schema]({{ site.baseurl }}/tests/hermes/schema/#the-performance-record).

## 4. Path enrichment

Detection says *that* a group degraded. Localization needs to know *where* its traffic went, which means turning raw traceroute hops into hops with networks and places attached.

HERMES annotates every hop of both paths with its AS and organization, IXP membership where applicable, a geographic location, and a reverse DNS name, and records the provenance of each annotation and a set of plausibility checks alongside it.

**This is one stage of HERMES, not the product.** It is documented in full in [Traceroute enrichment]({{ site.baseurl }}/tests/hermes/methodology/path-enrichment/), including data sources, the trustworthiness checks, and the known limitations.

If traceroutes themselves are unfamiliar, [Introduction to traceroutes]({{ site.baseurl }}/learn/traceroute/) covers what they measure and how they mislead.

## 5. Localization

Unlike most transportation networks, Internet paths are not negotiated end to end. Each network independently decides how to forward the traffic it carries, so the route from the server to the user and the route back may differ. HERMES uses both: the scamper path measured from the M-Lab server toward the user, and, where available, a reverse traceroute from the user back toward the server.

This matters more than it might appear. In the evaluation reported in the [HERMES paper](https://doi.org/10.1145/3789240.3829129){:target="_blank"}, **half of the links implicated in performance events could be identified only by considering both directions**. Among anomalous paths, the user-to-server route was geographically longer than the server-to-user route in 72% of cases, and at least twice as long in 10%. These figures describe the data analyzed for the paper and may change as HERMES accumulates more measurements.

HERMES combines two forms of evidence:

**What changed over time?** Paths observed during the degradation are compared with paths seen during normal periods for the same group. This surfaces a new detour, a link that disappeared, or a shift to a different interconnection.

**What distinguishes affected users?** Affected and unaffected connections are compared to find segments that appear repeatedly on degraded paths and rarely on healthy ones. This can expose congestion even when the route itself never changed — the case a purely temporal comparison misses.

The two are computed in parallel and combined. Each event is then classified:

* **Localized** — the evidence supports a specific segment.
* **Ambiguous** — several candidate segments are equally consistent with the evidence.
* **Unresolved** — the available path measurements cannot distinguish between candidates at all.

The classification is published in `mlab-collaboration.hermes_union.events_explained_daily`, one row per event, rather than in `events_enriched`. There, a `confidence_tier` of `strong` or `path_local` corresponds to localized, `weak` to ambiguous, and a NULL `attribution_method` to unresolved.

**HERMES reports association, not causation.** It identifies the segments best supported by the available evidence. Establishing what actually happened, or who was positioned to fix it, requires provider telemetry, maintenance records, contractual relationships, or evidence of physical damage — none of which HERMES has.

## 6. Targeted measurement

Sometimes the paths already collected cannot distinguish between candidate segments. In those cases HERMES can issue a small number of additional traceroutes and reverse traceroutes, chosen specifically to separate the remaining candidates.

In the HERMES evaluation these targeted measurements reduced ambiguity by **47% on average** and resolved **31%** of previously ambiguous cases to a single likely link.

## How well does this work?

No comprehensive catalog of Internet performance incidents exists, so there is no ground truth to score against. The HERMES paper instead compares against several independent sources:

* **Cloud-scale monitoring.** A reimplementation of Blame-IT, a peer-reviewed monitoring system, running on denser measurements from a large cloud provider, detected 91.4% of HERMES events. Where both systems detected an event, the identified path segment agreed in 94.5% of cases.
* **Provider incident reports.** HERMES detected 25 of 27 documented incidents and identified a source consistent with the report in 23.
* **Operator and user reports.** HERMES surfaced roughly ten times as many publicly discussed performance problems as the public observatories compared against.

Agreement across independent sources is evidence that sparse public measurements can identify meaningful events without private operational data. It is not a measure of completeness, and it should not be read as one.

## Further reading

* [HERMES: Repurposing User-Driven Speed Tests to Monitor the Internet](https://doi.org/10.1145/3789240.3829129){:target="_blank"} — the ACM SIGCOMM 2026 paper, and the authoritative description of the method.
* [github.com/m-lab/hermes](https://github.com/m-lab/hermes/){:target="_blank"} — the pipeline source, including the SQL that produces every field.
* [The Internet Can Be Up and Still Fail: Introducing HERMES]({{ site.baseurl }}/blog/hermes/) — a narrative introduction with worked examples.
