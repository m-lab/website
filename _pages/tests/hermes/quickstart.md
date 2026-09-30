---
layout: page
permalink: /tests/hermes/quickstart/
title: "HERMES Access and QuickStart"
breadcrumb: tests
---

# HERMES Access and QuickStart

This page takes you from no access to one successful, inexpensive query against the HERMES data. For what HERMES is and what the fields mean, start at the [HERMES overview]({{ site.baseurl }}/tests/hermes/) and the [table schema]({{ site.baseurl }}/tests/hermes/schema/).

## Getting access

HERMES is published in BigQuery in the `mlab-collaboration.hermes_union` dataset. Access works the same way as for the rest of M-Lab's data: subscribe to the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/g/discuss){:target="_blank"} with a Google account, then query the tables from that account. The [BigQuery QuickStart]({{ site.baseurl }}/data/docs/bq/quickstart/) walks through the steps.

The lookup tables HERMES uses for annotation (IP-to-AS, geolocation, reverse DNS), in the `mlab-collaboration.hermes` dataset, are available on request: email [support@measurementlab.net](mailto:support@measurementlab.net).

## Which table to query

Query the stable interface:

```
mlab-collaboration.hermes_union.events_enriched
```

Its fields are organised into `client`, `server`, `performance`, `server_to_client_path`, `client_to_server_path`, and `quality` records, and its names are a contract. It exposes every column of the underlying operational table, so it is the only table you need.

## Before you run anything: cost

This is the part of HERMES that differs most from the rest of M-Lab's data. The underlying table holds billions of rows and tens of terabytes. BigQuery bills on bytes scanned, and a query written the way you would write one against a small table can scan a very large fraction of it.

Three habits, in order of importance:

**1. Always filter on `partition_date`.** The tables are partitioned by day, and every partitioned table in `hermes_union` requires a `partition_date` filter: BigQuery rejects a query without one rather than scanning every day HERMES has ever produced. With the filter, a query scans only the days you asked for.

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

If the estimate surprises you, the usual cause is a wide `partition_date` range or a `SELECT` that reaches into the `hops` arrays.

## Your first query

Which networks and metro areas does HERMES have data for on a given day, and how many measurements does each group carry?

```sql
SELECT
  client.asn,
  client.as_name,
  client.metro,
  client.country_code,
  server.site,
  ip_version,
  COUNT(*) AS measurements
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND client.country_code = "US"
GROUP BY client.asn, client.as_name, client.metro, client.country_code, server.site, ip_version
HAVING measurements >= 25
ORDER BY measurements DESC
LIMIT 50
```

Scans roughly 10GB to 15GB for one day.

In the result of this query, each row is one group: an access network, in a metro area, testing against one M-Lab site over one IP version. Groups are the unit HERMES analyzes — a performance change is only interesting when it shows up across a group rather than in one connection.

## Your second query: what degraded

Now compare each group's performance against its own baseline:

```sql
SELECT
  client.asn,
  client.as_name,
  client.metro,
  server.site,
  ip_version,
  COUNT(*) AS measurements,
  APPROX_QUANTILES(performance.ndt_rtt_ms, 100)[SAFE_ORDINAL(50)] AS rtt_ms,
  ANY_VALUE(performance.baseline.ndt_rtt_ms) AS baseline_rtt_ms,
  ANY_VALUE(performance.anomaly.rtt_difference_ms) AS rtt_difference_ms,
  LOGICAL_OR(performance.anomaly.rtt_significant) AS rtt_significant,
  APPROX_QUANTILES(performance.download_mbps, 100)[SAFE_ORDINAL(50)] AS download_mbps,
  ANY_VALUE(performance.baseline.download_mbps) AS baseline_download_mbps
FROM `mlab-collaboration.hermes_union.events_enriched`
WHERE partition_date = "2025-07-04"
  AND DATE(measurement_time) = partition_date
  AND client.country_code = "US"
GROUP BY client.asn, client.as_name, client.metro, server.site, ip_version
HAVING measurements >= 25
ORDER BY rtt_difference_ms DESC
LIMIT 25
```

The comparison that matters is between `performance.ndt_rtt_ms` and `performance.baseline.ndt_rtt_ms`, not between one group and another. Networks and locations differ enormously in what is normal for them; HERMES is built on the change, not the level.

From here, [Example queries and tutorials]({{ site.baseurl }}/tests/hermes/examples/) goes on to the network paths.

## Coverage and update schedule

* **Earliest data available:** 2025-02-21. A backfill is extending coverage further back, toward 2025-01-25.
* **Latest data available:** normally the previous day, once the daily run has completed.
* **Update cadence:** the pipeline runs daily at 15:00 UTC and processes the previous day, so a day's data is normally available by the evening (UTC) of the following day.
* **Continuity:** coverage is daily with these gaps: 2025-02-24, 2025-02-26 to 2025-02-27, 2025-03-01, 2025-03-07 to 2025-03-14, and 2025-08-26 to 2025-08-31. The method changes at 2025-08-01 and 2026-08-01 also matter for any range crossing them; see the [schema changelog]({{ site.baseurl }}/tests/hermes/schema/#changelog).

A gap in coverage and a period of stable performance look identical in a query result. If you are making a claim about a date range, check that HERMES actually has data for it.

## Getting help

Questions about the data are welcome on the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/g/discuss){:target="_blank"} or by email to [support@measurementlab.net](mailto:support@measurementlab.net).
