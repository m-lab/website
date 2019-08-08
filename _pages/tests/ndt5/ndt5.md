---
layout: page
permalink: /tests/ndt/ndt5
title: "ndt5 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests/ndt
---

# ndt5 Protocol - NDT (Network Diagnostic Tool)

## Equivalent BigQuery and Web100 Field Types

NDT data collected by M-Lab has historically used the Web100 Linux kernel patch to provides access to a rich set of TCP information for each NDT test. The file [tcp-kis.txt](https://cloud.google.com/bigquery/docs/tcp-kis.txt){:target="_blank"} defines each Web100 variable with a specific [SNMP type](http://tools.ietf.org/html/rfc4898){:target="_blank"}. The table below shows how to map each SNMP type to a BigQuery type.

<div class="table-responsive" markdown="1">

| BigQuery Type |  Corresponding SNMP Type |
| ------------- | -------------------------|
| `integer`     |  `Integer32`, `Integer`, `INTEGER`, `Gauge32`, `ZeroBasedCounter32`, `Unsigned32`, `Unsigned16`, `Counter32`, `ZeroBasedCounter64` |
| `string`      |  `Ip_Address`            |
| `bool`        |  `TruthValue`            |

</div>

## Blacklist Flags Field

The field `blacklist_flags` was used to mark test affected by the "switch discard issue" [identified in 2015-2016]({{ site.baseurl }}/blog/traffic-microbursts-and-their-effect-on-internet-measurement). M-Lab NDT data from 2010-01-01 to 2015-10-02 was marked using this field. M-Lab may use the field for other use cases in the future for tests potentially impacted by site configuration issues, or otherwise communicate potentially relevant information about the state of the platform at the time of the test.

Since the NDT v3.1 schema, a sub-record has been present in NDT views, `anomalies`, which contains an equivalent field, `anomalies.blacklist_flags`.

Currently, the following values are present in NDT data from 2010-01-01 to 2015-10-02 in these fields:

<div class="table-responsive" markdown="1">

| Field Name | Value | Description |
| ---------- | ----- | ----------- |
| `blacklist_flags` or `anomalies.blacklist_flags` | `0` or `NULL` | unaffected tests |
| | `1` | tests affected by switch discards |
| | `2` | tests not shown to be unaffected by switch discards |

</div>