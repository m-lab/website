---
layout: page
permalink: /tests/hermes/quickstart/
title: "HERMES Access and QuickStart"
breadcrumb: tests
---

> **DRAFT — for review, not published.** The access section below records an unresolved decision and must not ship until it is settled. Byte figures marked _[measure]_ are placeholders.

# HERMES Access and QuickStart

This page takes you from no access to one successful, inexpensive query against the HERMES data. For what HERMES is and what the fields mean, start at the [HERMES overview]({{ site.baseurl }}/tests/hermes/) and the [table schema]({{ site.baseurl }}/tests/hermes/schema/).

## Getting access

> **Unresolved — do not publish this page until this section is written.**
> HERMES currently lives in the `mlab-collaboration` project, where access is granted per user. That is not the path the rest of M-Lab's data uses: for `measurement-lab` datasets, subscribing to the M-Lab Discuss group grants query access and M-Lab pays for the queries. Two options:
>
> 1. **Publish into `measurement-lab`.** The existing [BigQuery QuickStart]({{ site.baseurl }}/data/docs/bq/quickstart/) then applies unchanged, and this section becomes a link to it. This is the option consistent with calling HERMES a first-class M-Lab data product.
> 2. **Document access by request.** Keep the data where it is and state plainly that access is granted on request, with the contact address and what to expect.

## Which table to query

HERMES publishes two tables. Unless you need the raw statistical test outputs, use the stable interface:

```
mlab-collaboration.hermes.events_enriched
```

Its fields are organised into `client`, `server`, `performance`, `server_to_client_path`, `client_to_server_path`, and `quality` records, and its names are a contract. The underlying `mlab-collaboration.hermes_union.events_with_as_and_geoloc` table has 75 flat columns and is documented in the [schema]({{ site.baseurl }}/tests/hermes/schema/) for people who need it.

## Before you run anything: cost

This is the part of HERMES that differs most from the rest of M-Lab's data. The underlying table holds billions of rows and tens of terabytes. BigQuery bills on bytes scanned, and a query written the way you would write one against a small table can scan a very large fraction of it.

Three habits, in order of importance:

**1. Always filter on `partition_date`.** The table is partitioned by day. A query without a `partition_date` predicate scans every day HERMES has ever produced. A query with one scans only the days you asked for.

```sql
WHERE partition_date = "2025-07-04"
-- or
WHERE partition_date BETWEEN "2025-07-01" AND "2025-07-08"
```

**2. Select only the columns you need.** BigQuery is columnar; `SELECT *` on a row containing two arrays of annotated hops is dramatically more expensive than selecting six scalar fields. Reach for the `hops` arrays only when you are actually going to read them.

**3. Dry-run before you run.** A dry run costs nothing and tells you exactly what the query will scan.

In the Cloud Console, the validator in the top right of the query editor shows the estimate before you press Run. From the command line:

```
bq query --dry_run --use_legacy_sql=false 'SELECT ...'
```

If the estimate surprises you, the usual cause is a missing `partition_date` filter.

## Your first query

Which networks and metro areas does HERMES have data for on a given day, and how many measurements does each group carry?

```sql
SELECT
  client.asn,
  client.as_name,
  client.metro,
  client.country_code,
  server.site,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.country_code = "US"
GROUP BY client.asn, client.as_name, client.metro, client.country_code, server.site
HAVING measurements >= 25
ORDER BY measurements DESC
LIMIT 50
```

Scans roughly _[measure]_ for one day.

Each row is one monitored group: an access network, in a metro area, testing against one M-Lab site. Groups are the unit HERMES analyzes — a performance change is only interesting when it shows up across a group rather than in one connection.

## Your second query: what degraded

Now compare each group's performance against its own baseline:

```sql
SELECT
  client.asn,
  client.as_name,
  client.metro,
  server.site,
  COUNT(*) AS measurements,
  AVG(performance.ndt_rtt_ms) AS rtt_ms,
  AVG(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  AVG(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  AVG(performance.download_mbps) AS download_mbps,
  AVG(performance.baseline.download_mbps) AS baseline_download_mbps
FROM `mlab-collaboration.hermes.events_enriched`
WHERE partition_date = "2025-07-04"
  AND client.country_code = "US"
GROUP BY client.asn, client.as_name, client.metro, server.site
HAVING measurements >= 25
ORDER BY rtt_difference_ms DESC
LIMIT 25
```

The comparison that matters is between `performance.ndt_rtt_ms` and `performance.baseline.ndt_rtt_ms`, not between one group and another. Networks and locations differ enormously in what is normal for them; HERMES is built on the change, not the level.

From here, [Example queries and tutorials]({{ site.baseurl }}/tests/hermes/examples/) goes on to the network paths.

## Coverage and update schedule

* **Earliest data available:** _[confirm]_
* **Latest data available:** _[confirm]_
* **Update cadence:** the pipeline runs daily. _[confirm the lag between measurement and publication]_
* **Continuity:** _[confirm whether coverage is unbroken across the full range]_

A gap in coverage and a period of stable performance look identical in a query result. If you are making a claim about a date range, check that HERMES actually has data for it.

## Getting help

Questions about the data are welcome on the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/g/discuss){:target="_blank"} or by email to [support@measurementlab.net](mailto:support@measurementlab.net).
