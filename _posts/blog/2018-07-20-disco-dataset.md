---
layout: blog
title: "New DISCO switch telemetry dataset"
author: "Stephen Soltesz"
date: 2018-07-20
breadcrumb: blog
categories:
  - data
  - data analysis
  - bigquery
  - research
  - microbursts
  - switch discard
  - performance
---

Since June 2016, M-Lab has collected high resolution switch telemetry for
each M-Lab server and site uplink.

Originally designed to detect switch discards from
[server traffic microbursts][microbursts], we now support the *DIS*card *CO*llection
(a.k.a. DISCO) dataset as a standard M-Lab BigQuery table:
[`measurement-lab.base_tables.switch`][switch-schema]

[microbursts]: {{site.baseurl}}/blog/traffic-microbursts-and-their-effect-on-internet-measurement
[switch-schema]: {{site.baseurl}}/data/docs/bq/schema/#switch---measurement-labbase_tablesswitch

## DISCO Metrics

To see the complete list of DISCO metrics, run the following
[query](https://console.cloud.google.com/bigquery?project=measurement-lab):

```sql
#standardSQL
SELECT
    metric
FROM
    `measurement-lab.base_tables.switch*`
GROUP BY
    metric
ORDER BY
    metric ASC
```

DISCO metric names use a common structure: `switch.<type>.<source>.<direction>`.

DISCO collects seven standard metric types: packets sent by broadcast,
packets discarded by the switch, packet errors, packets sent by multicast,
octet counts (e.g. bytes), pause frames (for Ethernet flow control), and
unicast packets.

DISCO collects metrics for two sources: machine `local` and switch `uplink`.
The "local" metrics report values from the switch port attached to the
machine collecting the switch data, e.g. `hostname = "mlab1.sea02.measurement-lab.org"`.
So there will be "local" metrics for each machine at a site. The "uplink"
metrics report values from the switch port attached to the uplink router,
outside M-Lab's administrative domain. Each machine collects these so there
is some built-in redunancy.

Finally, a DISCO metric indicates whether the value is for data received (`rx`)
by the port or transferred (`tx`) from the port. Note that the data direction
is relative the the switch port. So, for example, a "download" test will show
up on the `switch.unicast.local.rx` followed by the `switch.unicast.uplink.tx`.

All `sample.value`s are counts over the 10 second window starting at the given `sample.timestamp`.

| Metric Name | Description |
|:------------|:------------|
| switch.broadcast.local.rx | Broadcast packets received by the machine switch port. |
| switch.broadcast.local.tx | Broadcast packets transmitted by the machine switch port. |
| switch.broadcast.uplink.rx | Broadcast packets received by the uplink switch port. |
| switch.broadcast.uplink.tx | Broadcast packets transmitted by the uplink switch port. |
| switch.discards.local.rx | Packets discarded while received by the machine switch port. |
| switch.discards.local.tx | Packets discarded while transmitted by the machine switch port. |
| switch.discards.uplink.rx | Packets discarded while received by the uplink switch port. |
| switch.discards.uplink.tx | Packets discarded while transmitted by the uplink switch port. |
| switch.errors.local.rx | Packet errors received by the machine switch port. |
| switch.errors.local.tx | Packet errors transmitted by the machine switch port. |
| switch.errors.uplink.rx | Packet errors received by the uplink switch port. |
| switch.errors.uplink.tx | Packet errors transmitted by the uplink switch port. |
| switch.multicast.local.rx | Multicast packets received by the machine switch port. |
| switch.multicast.local.tx | Multicast packets transmitted by the machine switch port. |
| switch.multicast.uplink.rx | Multicast packets received by the uplink switch port. |
| switch.multicast.uplink.tx | Multicast packets transmitted by the uplink switch port. |
| switch.octets.local.rx | Bytes received by the machine switch port. |
| switch.octets.local.tx | Bytes transmitted by the machine switch port. |
| switch.octets.uplink.rx | Bytes received by the uplink switch port. |
| switch.octets.uplink.tx | Bytes transmitted by the uplink switch port. |
| switch.pause.local.rx | Pause frames received by the machine switch port. |
| switch.pause.local.tx | Pause frames transmitted by the machine switch port. |
| switch.pause.uplink.rx | Pause frames received by the uplink switch port. |
| switch.pause.uplink.tx | Pause frames transmitted by the uplink switch port. |
| switch.unicast.local.rx | Unicast packets received by the machine switch port. |
| switch.unicast.local.tx | Unicast packets transmitted by the machine switch port. |
| switch.unicast.uplink.rx | Unicast packets received by the uplink switch port. |
| switch.unicast.uplink.tx | Unicast packets transmitted by the uplink switch port. |

## Example Queries

The switch [schema][switch-schema] takes advantage of [record arrays][bigquery-arrays].
So, queries that uses the `sample.value` or `sample.timestamp` columns must handle
the array records appropriately.

[bigquery-arrays]: https://cloud.google.com/bigquery/docs/reference/standard-sql/arrays#flattening-arrays

### Daily Average Download Rates

The following query calculates the per-day, per-host average data output rate
from sites in the DFW metro area. The native `sample.value` is a 10-second
counter delta. So, to calculate the per-second rate, we must divide by 10.
And, the unit of `switch.octets.uplink.tx` metric is bytes, so we must multiply
by 8 to convert to bits.

```sql
#standardSQL
SELECT
  TIMESTAMP_TRUNC(sample.timestamp, DAY) AS day,
  hostname,
  metric,
  8 * ROUND(AVG(sample.value) / 1e6, 1) / 10 AS mbps
FROM
  `measurement-lab.base_tables.switch*`,
  UNNEST(sample) AS sample
WHERE
  metric = "switch.octets.uplink.tx"
  AND hostname LIKE "%mlab1.dfw%"
GROUP BY
  day,
  hostname,
  metric
ORDER BY
  day
```

### Daily 99th Percentile Discard Rate

The following query calculates the 99th percentile packet discard rate per day.
Because we want a per-second rate, we must divide `sample.value` by 10. And,
we use `APPROX_QUANTILES` in part to exclude extreme values caused by erroneous
samples in the raw data.

```sql
#standardSQL
SELECT
  TIMESTAMP_TRUNC(sample.timestamp, DAY) AS day,
  hostname,
  metric,
  APPROX_QUANTILES(sample.value / 10, 100)[OFFSET(99)] AS pps
FROM
  `measurement-lab.base_tables.switch*`,
  UNNEST(sample) AS sample
WHERE
  metric = "switch.discards.uplink.tx"
  AND hostname LIKE "%mlab1.dfw%"
GROUP BY
  day,
  hostname,
  metric
ORDER BY
  day
```

### Percentage of Download Traffic Per-machine

Of the data leaving a site, this query roughly estimates the percentage
attributed to each machine. The percentage may change, for example, when one
machine is offline and traffic is diverted to another.

For simplicity, this query looks at a single site over time. For most of the
history, mlab-ns was using the "first online server" policy, so mlab1 sees
about 100% of traffic during that time. However after June 1st, 2018, the
mlab-ns server selection algorithm was changed to "random online server", and
the ratios approach 1/3.

```sql
#standardSQL
SELECT
  day,
  100 * mlab1_total/uplink_total as mlab1,
  100 * mlab2_total/uplink_total as mlab2,
  100 * mlab3_total/uplink_total as mlab3
FROM (
SELECT
  TIMESTAMP_TRUNC(sample.timestamp, DAY) AS day,
  SUM(IF(metric = "switch.octets.local.rx" AND hostname like "%mlab1%", sample.value, 0)) as mlab1_total,
  SUM(IF(metric = "switch.octets.local.rx" AND hostname like "%mlab2%", sample.value, 0)) as mlab2_total,
  SUM(IF(metric = "switch.octets.local.rx" AND hostname like "%mlab3%", sample.value, 0)) as mlab3_total,
  SUM(IF(metric = "switch.octets.uplink.tx" AND hostname like "%mlab1%", sample.value, 0)) as uplink_total
FROM
  `mlab-sandbox.base_tables.switch*`,
  UNNEST(sample) AS sample
WHERE
  (metric = "switch.octets.uplink.tx" OR metric = "switch.octets.local.rx")
  AND hostname LIKE "%yyz%"
GROUP BY
  day
)
WHERE
  uplink_total > 0
ORDER BY
  day
```
