---
layout: page
title: "Network Diagnostic Tool (NDT) - BigQuery Schema"
permalink: /data/docs/bq/schema/ndt/
breadcrumb: data
---

# Network Diagnostic Tool (NDT) BigQuery Schema

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

## NDT Schema - measurement-lab.ndt.recommended

<div class="table-responsive" markdown="1">

| Field name                                           |     Type     |  Description                              |
| :----------------------------------------------------|:------------:|:------------------------------------------|
| `partition_date`                                    | `date`  |  The day (in UTC) in which the data was loaded. For more precise datetime or timestamp of each test, use the field `web100_log_entry.log_time` |
| `test_id`                                           |  `string`    |  ID of the test. It represents the filename of the log that contains the data generated during the test (e.g. `20090819T02:01:04.507508000Z_189.6.232.77:3859.c2s_snaplog.gz`). |
| `task_filename`                                      | `string`     |  The raw data file in Google Cloud Storage from which the test row was parsed. |
| `parse_time`                                         | `timestamp`  |  The timestamp of when test data was parsed into BigQuery from Google Cloud Storage. |
| `parser_version`    | `string` | A link to the tagged version of the M-Lab ETL parser which processed the test row. |
| `log_time`                                           | `timestamp`  |  The timestamp of when test log was created (in seconds since Unix epoch). This is derived from the "Date/Time" field in the .meta file (Prefer the `web100_log_entry.log_time` field, as it is more reliable). |
| `blacklist_flags`                                    |  `integer` |  Deprecated field formerly used to store blacklist flags. Superceded by `anomalies.blacklist_flags`. |
| `anomalies`                                          | `record`  | A sub-record section containing anomalies fields. |
| `anomalies.no_meta`                                  | `boolean` | If a test record did not contain a metadata file, this field is set to 1. |
| `anomalies.snaplog_error`                            | `boolean` | If there are errors in the snaplogs for a test, this field is set to 1. |
| `anomalies.num_snaps`                                | `integer` | A count of the number of snaplogs captured during a given test. |
| `anomalies.blacklist_flags`                          | `integer` | Used to mark test results that could be impacted by site configuration issues, or otherwise to communicate potentially relevant information about the state of the platform at the time of the test. |
| `connection_spec`                                   | `record`    | Sub-record section containing fields describing the client which initiated a test and the M-Lab server through which the test was conducted. |
| `connection_spec.client_af`                          | `integer`   |  Address family of the client's IP address. (This field is **optional**.)<br>AF_UNSPEC = `0`<br>AF_INET (IPv4) = `2`<br>AF_INET6 (IPv6) = `10` |
| `connection_spec.client_application`                 | `string`    |  Client application that ran the test. (This field is **optional**.) |
| `connection_spec.client_browser`                     | `string`    |  Client's browser. (This field is **optional**.) |
| `connection_spec.client_hostname`                    | `string`    |  Client's hostname. (This field is **optional**.) |
| `connection_spec.client_ip`                          | `string`    |  IP address of the user's client. (This field is **optional**. It's preferable to use `web100_log_entry.connection_spec.remote_ip`.) |
| `connection_spec.client_kernel_version`              | `string`    |  Client's kernel version. (This field is **optional**.) |
| `connection_spec.client_os`                          | `string`    |  Client's operating system. (This field is **optional**.) |
| `connection_spec.client_version`                     | `string`    |  Client's version. (This field is **optional**.) |
| `connection_spec.data_direction`                     | `integer` |  Direction of the data sent during the test:<br>CLIENT_TO_SERVER (upload) = `0`<br>SERVER_TO_CLIENT (download) = `1` |
| `connection_spec.server_af`                          | `integer` |  Address family of the server's IP address. (This field is **optional**. It's preferable to use `web100_log_entry.connection_spec.local_af`.)<br>AF_UNSPEC = `0`<br>AF_INET (IPv4) = `2`<br>AF_INET6 (IPv6) = `10` |
| `connection_spec.server_hostname`                    | `string`    |  The hostname of the M-Lab server that received this test. (This field is **optional**.) |
| `connection_spec.server_ip`                          | `string`    |  The M-Lab server's IP address. (This field is **optional**. It's preferable to use `web100_log_entry.connection_spec.local_ip`.) |
| `connection_spec.server_kernel_version`              | `string`    |  The M-Lab server's kernel version. (This field is **optional**.) |
| `connection_spec.tls`                                | `boolean` |                                        |
| `connection_spec.websockets`                         | `boolean` |                                        |
| `connection_spec.client_geolocation`                 | `record`  | Sub-record section containing geolocation annotations for the client that initiated the test. Geolocation fields extracted from open dataset created by MaxMind and available at [www.maxmind.com](https://www.maxmind.com). (These fields are **optional**.)|
| `client_geolocation.area_code`                       | `integer` |  |
| `client_geolocation.city`                            | `string`    |                                        |
| `client_geolocation.continent_code`                  | `string`    |                                        |
| `client_geolocation.country_code`                    | `string`    |                                        |
| `client_geolocation.country_code3`                   | `string`    |                                        |
| `client_geolocation.country_name`                    | `string`    |                                        |
| `client_geolocation.latitude`                        | `float`     |                                        |
| `client_geolocation.longitude`                       | `float`     |                                        |
| `client_geolocation.metro_code`                      | `integer` |                                        |
| `client_geolocation.postal_code`                     | `string`    |                                        |
| `client_geolocation.region`                          | `string`    |                                        |
| `client_geolocation.radius`                          | `string`    |                                        |
| `connection_spec.server_geolocation`                 | `record`  | Sub-record section containing geolocation annotations for the M-Lab server that received the test. Geolocation fields extracted from open dataset created by MaxMind and available at [www.maxmind.com](https://www.maxmind.com). (These fields are **optional**.)
| `server_geolocation.area_code`                       | `integer` |                                        |
| `server_geolocation.city`                            | `string`    |                                        |
| `server_geolocation.continent_code`                  | `string`    |                                        |
| `server_geolocation.country_code`                    | `string`    |                                        |
| `server_geolocation.country_code3`                   | `string`    |                                        |
| `server_geolocation.country_name`                    | `string`    |                                        |
| `server_geolocation.latitude`                        | `float`     |                                        |
| `server_geolocation.longitude`                       | `float`     |                                        |
| `server_geolocation.metro_code`                      | `integer` |                                        |
| `server_geolocation.postal_code`                     | `string`    |                                        |
| `server_geolocation.region`                          | `string`    |                                        |
| `server_geolocation.radius`                          | `string`    |                                        |
| `connection_spec.client.network`                          | `record`    | Sub-record section containing fields about the client network from which the test was conducted. |
| `connection_spec.client.network.asn`                 | `string` | The Autonomous System Number (ASN) of the client network where this test originated. |
| `connection_spec.server.network`                          | `record`    | Sub-record section containing fields about the server network through which the test was conducted. |
| `connection_spec.server.network.iata_code`                 | `string` | The IATA airport code nearest to the M-Lab server through which this test was conducted. |
| `connection_spec.server.network.asn`                 | `string` | The Autonomous System Number (ASN) of the server network through which this test was conducted. |
| `web100_log_entry`                                   | `record`  | Sub-record section containing the web100 variables collected during the test. See [tcp-kis.txt](https://cloud.google.com/bigquery/docs/tcp-kis.txt){:target="_blank"} for more information about these fields. |
| `web100_log_entry.log_time`                          | `integer` |                                        |
| `web100_log_entry.version`                           | `string`    |                                        |
| `web100_log_entry.connection_spec.local_af`          | `integer` | IPv4 = `0`<br>IPv6 = `1` |
| `web100_log_entry.connection_spec.local_ip`          | `string`    |                                        |
| `web100_log_entry.connection_spec.local_port`        | `integer` |                                        |
| `web100_log_entry.connection_spec.remote_ip`         | `string`    |                                        |
| `web100_log_entry.connection_spec.remote_port`       | `integer` |                                        |
| `web100_log_entry.snap`               | `record` |                                        |
| `web100_log_entry.snap.AbruptTimeouts`               | `integer` |                                        |
| `web100_log_entry.snap.ActiveOpen`                   | `integer` |                                        |
| `web100_log_entry.snap.CERcvd`                       | `integer` |                                        |
| `web100_log_entry.snap.CongAvoid`                    | `integer` |                                        |
| `web100_log_entry.snap.CongOverCount`                | `integer` |                                        |
| `web100_log_entry.snap.CongSignals`                  | `integer` |                                        |
| `web100_log_entry.snap.CountRTT`                     | `integer` |                                        |
| `web100_log_entry.snap.CurAppRQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.CurAppWQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.CurCwnd`                      | `integer` |                                        |
| `web100_log_entry.snap.CurMSS`                       | `integer` |                                        |
| `web100_log_entry.snap.CurRTO`                       | `integer` |                                        |
| `web100_log_entry.snap.CurReasmQueue`                | `integer` |                                        |
| `web100_log_entry.snap.CurRetxQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.CurRwinRcvd`                  | `integer` |                                        |
| `web100_log_entry.snap.CurRwinSent`                  | `integer` |                                        |
| `web100_log_entry.snap.CurSsthresh`                  | `integer` |                                        |
| `web100_log_entry.snap.CurTimeoutCount`              | `integer` |                                        |
| `web100_log_entry.snap.DSACKDups`                    | `integer` |                                        |
| `web100_log_entry.snap.DataSegsIn`                   | `integer` |                                        |
| `web100_log_entry.snap.DataSegsOut`                  | `integer` |                                        |
| `web100_log_entry.snap.DupAcksIn`                    | `integer` |                                        |
| `web100_log_entry.snap.DupAcksOut`                   | `integer` |                                        |
| `web100_log_entry.snap.Duration`                     | `integer` |                                        |
| `web100_log_entry.snap.ECN`                          | `integer` |                                        |
| `web100_log_entry.snap.FastRetran`                   | `integer` |                                        |
| `web100_log_entry.snap.HCDataOctetsIn`               | `integer` |                                        |
| `web100_log_entry.snap.HCDataOctetsOut`              | `integer` |                                        |
| `web100_log_entry.snap.HCThruOctetsAcked`            | `integer` |                                        |
| `web100_log_entry.snap.HCThruOctetsReceived`         | `integer` |                                        |
| `web100_log_entry.snap.LimCwnd`                      | `integer` |                                        |
| `web100_log_entry.snap.LimRwin`                      | `integer` |                                        |
| `web100_log_entry.snap.LocalAddress`                 | `string`    |                                        |
| `web100_log_entry.snap.LocalAddressType`             | `integer` |                                        |
| `web100_log_entry.snap.LocalPort`                    | `integer` |                                        |
| `web100_log_entry.snap.MSSRcvd`                      | `integer` |                                        |
| `web100_log_entry.snap.MaxAppRQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.MaxAppWQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.MaxMSS`                       | `integer` |                                        |
| `web100_log_entry.snap.MaxRTO`                       | `integer` |                                        |
| `web100_log_entry.snap.MaxRTT`                       | `integer` |                                        |
| `web100_log_entry.snap.MaxReasmQueue`                | `integer` |                                        |
| `web100_log_entry.snap.MaxRetxQueue`                 | `integer` |                                        |
| `web100_log_entry.snap.MaxRwinRcvd`                  | `integer` |                                        |
| `web100_log_entry.snap.MaxRwinSent`                  | `integer` |                                        |
| `web100_log_entry.snap.MaxSsCwnd`                    | `integer` |                                        |
| `web100_log_entry.snap.MaxSsthresh`                  | `integer` |                                        |
| `web100_log_entry.snap.MinMSS`                       | `integer` |                                        |
| `web100_log_entry.snap.MinRTO`                       | `integer` |                                        |
| `web100_log_entry.snap.MinRTT`                       | `integer` |                                        |
| `web100_log_entry.snap.MinRwinRcvd`                  | `integer` |                                        |
| `web100_log_entry.snap.MinRwinSent`                  | `integer` |                                        |
| `web100_log_entry.snap.MinSsthresh`                  | `integer` |                                        |
| `web100_log_entry.snap.Nagle`                        | `integer` |                                        |
| `web100_log_entry.snap.NonRecovDA`                   | `integer` |                                        |
| `web100_log_entry.snap.OctetsRetrans`                | `integer` |                                        |
| `web100_log_entry.snap.OtherReductions`              | `integer` |                                        |
| `web100_log_entry.snap.PostCongCountRTT`             | `integer` |                                        |
| `web100_log_entry.snap.PostCongSumRTT`               | `integer` |                                        |
| `web100_log_entry.snap.PreCongSumCwnd`               | `integer` |                                        |
| `web100_log_entry.snap.PreCongSumRTT`                | `integer` |                                        |
| `web100_log_entry.snap.QuenchRcvd`                   | `integer` |                                        |
| `web100_log_entry.snap.RTTVar`                       | `integer` |                                        |
| `web100_log_entry.snap.RcvNxt`                       | `integer` |                                        |
| `web100_log_entry.snap.RcvRTT`                       | `integer` |                                        |
| `web100_log_entry.snap.RcvWindScale`                 | `integer` |                                        |
| `web100_log_entry.snap.RecInitial`                   | `integer` |                                        |
| `web100_log_entry.snap.RemAddress`                   | `string`    |                                        |
| `web100_log_entry.snap.RemPort`                      | `integer` |                                        |
| `web100_log_entry.snap.RetranThresh`                 | `integer` |                                        |
| `web100_log_entry.snap.SACK`                         | `integer` |                                        |
| `web100_log_entry.snap.SACKBlocksRcvd`               | `integer` |                                        |
| `web100_log_entry.snap.SACKsRcvd`                    | `integer` |                                        |
| `web100_log_entry.snap.SampleRTT`                    | `integer` |                                        |
| `web100_log_entry.snap.SegsIn`                       | `integer` |                                        |
| `web100_log_entry.snap.SegsOut`                      | `integer` |                                        |
| `web100_log_entry.snap.SegsRetrans`                  | `integer` |                                        |
| `web100_log_entry.snap.SendStall`                    | `integer` |                                        |
| `web100_log_entry.snap.SlowStart`                    | `integer` |                                        |
| `web100_log_entry.snap.SmoothedRTT`                  | `integer` |                                        |
| `web100_log_entry.snap.SndInitial`                   | `integer` |                                        |
| `web100_log_entry.snap.SndLimBytesCwnd`              | `integer` |                                        |
| `web100_log_entry.snap.SndLimBytesRwin`              | `integer` |                                        |
| `web100_log_entry.snap.SndLimBytesSender`            | `integer` |                                        |
| `web100_log_entry.snap.SndLimTimeCwnd`               | `integer` |                                        |
| `web100_log_entry.snap.SndLimTimeRwin`               | `integer` |                                        |
| `web100_log_entry.snap.SndLimTimeSnd`                | `integer` |                                        |
| `web100_log_entry.snap.SndLimTransCwnd`              | `integer` |                                        |
| `web100_log_entry.snap.SndLimTransRwin`              | `integer` |                                        |
| `web100_log_entry.snap.SndLimTransSnd`               | `integer` |                                        |
| `web100_log_entry.snap.SndMax`                       | `integer` |                                        |
| `web100_log_entry.snap.SndNxt`                       | `integer` |                                        |
| `web100_log_entry.snap.SndUna`                       | `integer` |                                        |
| `web100_log_entry.snap.SndWindScale`                 | `integer` |                                        |
| `web100_log_entry.snap.SpuriousFrDetected`           | `integer` |                                        |
| `web100_log_entry.snap.StartTimeStamp`               | `integer` |                                        |
| `web100_log_entry.snap.StartTimeUsec`                | `integer` |                                        |
| `web100_log_entry.snap.State`                        | `integer` |                                        |
| `web100_log_entry.snap.SubsequentTimeouts`           | `integer` |                                        |
| `web100_log_entry.snap.SumRTT`                       | `integer` |                                        |
| `web100_log_entry.snap.TimeStamps`                   | `integer` |                                        |
| `web100_log_entry.snap.Timeouts`                     | `integer` |                                        |
| `web100_log_entry.snap.WinScaleRcvd`                 | `integer` |                                        |
| `web100_log_entry.snap.WinScaleSent`                 | `integer` |                                        |
| `web100_log_entry.snap.X_OtherReductionsCM`          | `integer` |                                        |
| `web100_log_entry.snap.X_OtherReductionsCV`          | `integer` |                                        |
| `web100_log_entry.snap.X_Rcvbuf`                     | `integer` |                                        |
| `web100_log_entry.snap.X_Sndbuf`                     | `integer` |                                        |
| `web100_log_entry.snap.X_dbg1`                       | `integer` |                                        |
| `web100_log_entry.snap.X_dbg2`                       | `integer` |                                        |
| `web100_log_entry.snap.X_dbg3`                       | `integer` |                                        |
| `web100_log_entry.snap.X_dbg4`                       | `integer` |                                        |
| `web100_log_entry.snap.X_rcv_ssthresh`               | `integer` |                                        |
| `web100_log_entry.snap.X_wnd_clamp`                  | `integer` |                                        |
| `web100_log_entry.deltas`                  | `record` | Placeholder subrecord where M-Lab may add intermediate snaplog changes to `web100_log_entry` fields that take place over the course of each test. Currenly, only the final `web100_log_entry.snap` field values are stored in the above record section of the schema. |

</div>
