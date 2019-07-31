---
layout: page
title: "NDT 5 BigQuery Schema"
permalink: /data/docs/bq/schema/ndt5/
breadcrumb: data
---

# NDT 5 BigQuery Schema

NDT is a single stream performance measurement of a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}. Therefore it would be most precise to say that M-Lab's NDT test measures "single stream performance" or "bulk transport capacity". NDT reports upload and download speeds and attempts to determine what problems limit speeds.

## NDT BigQuery Views

* [measurement-lab.ndt.recommended](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=recommended&page=table){:target="_blank"}
  * A subset view of all NDT upload and download tests from `measurement-lab.ndt.web100` where:
    * TCP end state is sensible
    * Test duration was between 9 and 60 seconds
  * except:
    * Internal M-Lab end-to-end monitoring tests
    * Tests not marked as blacklisted

* [measurement-lab.ndt.downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=downloads&page=table){:target="_blank"}
  * A subset view of all NDT download tests from `measurement-lab.ndt.recommended` where:
    * At least 8 KB of data was transferred
    * Test duration was between 9 and 60 seconds
    * Congestion was detected

* [measurement-lab.ndt.uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=uploads&page=table){:target="_blank"}
  * A subset view of all NDT upload tests from `measurement-lab.ndt.recommended` where:
    * A sensible total number of bytes was received (8192)

* [measurement-lab.ndt.web100](https://console.cloud.google.com/bigquery?project=measurement-lab&folder&organizationId=433637338589&p=measurement-lab&d=ndt&t=web100&page=table){:target="_blank"}
  * A root view that all other views in the `ndt` dataset are derived from.

## Common Metrics

Commonly reported metrics such as upload or download speed are calculated from individual fields saved by the Network Diagnostic Tool. See our page on [calculating common metrics from NDT data]({{ site.baseurl }}/data/docs/bq/ndtmetrics/) for more information.

## Equivalent BigQuery and Web100 Field Types

NDT data collected by M-Lab has historically used the Web100 Linux kernel patch to provides access to a rich set of TCP information for each NDT test. The file [tcp-kis.txt](https://cloud.google.com/bigquery/docs/tcp-kis.txt){:target="_blank"} defines each Web100 variable with a specific [SNMP type](http://tools.ietf.org/html/rfc4898){:target="_blank"}. The table below shows how to map each SNMP type to a BigQuery type.

<div class="table-responsive" markdown="1">

| BigQuery Type |  Corresponding SNMP Type |
| ------------- | -------------------------|
| `integer`     |  `Integer32`, `Integer`, `INTEGER`, `Gauge32`, `ZeroBasedCounter32`, `Unsigned32`, `Unsigned16`, `Counter32`, `ZeroBasedCounter64` |
| `string`      |  `Ip_Address`            |
| `bool`        |  `TruthValue`            |

</div>

## Transition from Web100 to TCP_INFO Kernel Instrumentation

In 2019, M-Lab will transition its hosted experiments to use the netlink socket and TCP_INFO kernel instrumentation, replacing our reliance on Web100.

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

## NDT 5 Schema - measurement-lab.ndt5.??

{% include schema_ndt5.html %}