---
layout: page
title: Calculating Common Metrics
permalink: /data/docs/bq/ndtmetrics/
breadcrumb: data
---

# Calculating Common Metrics for NDT Data

Commonly reported metrics such as upload or download speed, are calculated from data fields saved by the Network Diagnostic Tool. This document explains how those calculations are made in more detail.

The most commonly reported metrics are: _Download Throughput (Mbps)_, _Upload Throughput (Mbps)_, _Round Trip Time (ms)_. This page provides recommended queries for these metrics, limiting results to only valid tests. For the purposes of research, we consider valid NDT tests to be those that:

* Have exchanged more than 8 KB of data
* Have a test duration greater than 9 seconds and less than 15 seconds
* TCP congestion was greater than 0
* Were in a congestion limited state for at least 80% of the test duration
* Congestion has been caused by the client for less than 20% of the test duration
* Traffic queuing on the switch was not present at the time of the test

For each metric, this section includes the BigQuery queries used to compute the metrics. All the queries include conditions to filter out incomplete or invalid test results. Please note that the queries below are examples intended to illustrate how to calculate metrics during the query, and only return the first 100 results from the United States between 2017-01-01 and 2017-01-02. See [BigQuery Schema]({{ site.baseurl }}/data/docs/bq/schema) for additional fields that can be selected, as well as [BigQuery Examples]({{ site.baseurl }}/data/docs/bq/examples) for additional filtering options.

## NDT BigQuery Fields, Units, Formulas and Queries

Internet 2's NDT protocol specifies how to calculate these metrics using the data collected by the NDT test. NDT saves each of the variables that go into these metrics separately, and the values for each are important to know when calculating things like download and upload throughput, and displaying them in the desired format.

### Units of Measure, Converting to megabits per second (Mbps)

In the formulas and examples below, it is important to note the units of measure that NDT uses for fields that represent data sent and received, as well as for fields representing durations.

* **Data sent/recevied** fields are a count of **bytes**
* **Duration** fields are saved in **microseconds**

The formula below shows how we convert our final values to Mbps when calculating Download or Upload throughput, using **8** as a multiplier in our BigQuery clauses:

```bash
1 byte/microsecond * 8 bits/byte =
8 bits/microsecond * (1 / 1,000,000) megabits/bit =
8 / 1,000,000 megabits/microsecond * 1,000,000 microseconds/second =
8 megabits/second => 8 Mbps
```

## Download throughput

Download throughput is computed for every server-to-client test as the ratio of the data transmitted during the test and the duration of the test. Results of tests that ended during **slow start** are excluded.

Download throughput is calculated using this formula within the query:

```sql
8 *
(web100_log_entry.snap.HCThruOctetsAcked /
 (web100_log_entry.snap.SndLimTimeRwin +
 web100_log_entry.snap.SndLimTimeCwnd +
 web100_log_entry.snap.SndLimTimeSnd))
```

The complete BigQuery example is:

```sql
#standardSQL
SELECT
  8 * (web100_log_entry.snap.HCThruOctetsAcked /
    (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd)) AS download_Mbps
FROM
  `measurement-lab.ndt.recommended`
WHERE
  partition_date BETWEEN '2017-01-01' AND '2017-08-28'
  AND connection_spec.data_direction = 1
  AND web100_log_entry.snap.HCThruOctetsAcked >= 8192
  AND (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd) >= 9000000
  AND (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd) < 600000000
  AND web100_log_entry.snap.CongSignals > 0
  AND (web100_log_entry.snap.State = 1 OR
    (web100_log_entry.snap.State >= 5 AND
    web100_log_entry.snap.State <= 11))
  LIMIT 100
```

## Upload throughput

Upload throughput is computed for every client-to-server test as the ratio of the data transmitted during the test and the duration of the test.

It is not possible to exclude results of tests that ended during slow start, because the web100 variable `web100_log_entry.snap.CongSignals` is not updated during client-to-server tests.

Upload throughput is calculated using this formula within the query:

```sql
8 * (web100_log_entry.snap.HCThruOctetsReceived/web100_log_entry.snap.Duration) AS upload_Mbps
```

The complete BigQuery example is:

```sql
#standardSQL
SELECT
 8 * (web100_log_entry.snap.HCThruOctetsReceived/web100_log_entry.snap.Duration) AS upload_Mbps
FROM
  `measurement-lab.ndt.recommended`
WHERE
  connection_spec.client_geolocation.country_code = 'US'
  AND partition_date BETWEEN '2017-01-01' AND '2017-01-02'
  AND connection_spec.data_direction = 0
  AND web100_log_entry.snap.HCThruOctetsReceived >= 8192
  AND web100_log_entry.snap.Duration >= 9000000
  AND web100_log_entry.snap.Duration < 600000000
  AND (web100_log_entry.snap.State = 1
      OR (web100_log_entry.snap.State >= 5
      AND web100_log_entry.snap.State <= 11))
  LIMIT 100
```

### Alternate BigQuery Views for Only Valid Download & Upload Tests

Note that in the queries above for Upload and Download throughput, the example uses the BigQuery View, `measurement-lab.ndt.recommended`, and filters for valid **download** tests using `WHERE ...` statements used to filter for acceptable TCP parameters indicating such. This method would provide researchers with the ability to tune their queries to investigate tests with specific values.

Alternately, M-Lab provides BigQuery views that apply the parameters for valid upload and download tests. For researchers interested in using what M-Lab considers valid tests for research, the examples above can be simplified by querying the appropriate view:

**Download Throughput:**

```sql
#standardSQL
SELECT
  8 * (web100_log_entry.snap.HCThruOctetsAcked /
    (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd)) AS download_Mbps
FROM
  `measurement-lab.ndt.downloads`
WHERE
  partition_date BETWEEN '2017-01-01' AND '2017-08-28'
  LIMIT 100
```

**Upload Throughput:**

```sql
#standardSQL
SELECT
 8 * (web100_log_entry.snap.HCThruOctetsReceived/web100_log_entry.snap.Duration) AS upload_Mbps
FROM
  `measurement-lab.ndt.uploads`
WHERE
  connection_spec.client_geolocation.country_code = 'US'
  AND partition_date BETWEEN '2017-01-01' AND '2017-01-02'
  LIMIT 100
```

## Round Trip Time (RTT)

Server-to-client RTT is affected by TCP congestion. As a consequence, there are (at least) 2 ways to estimate the RTT using web100 data. These 2 ways provide different, non-equivalent information about the user connection.

### Server-client **(time) distance**

* Estimated using the **minimum RTT** measured during the test, which most likely happened before the test reached congestion.
* This value is reported by the web100 variable `web100_log_entry.snap.MinRTT`
* However, using this variable has the drawback that it might underestimate the connection RTT, because it might be measured in the SYC ACK exchange or some other tiny transaction which, for low speed links, does not represent the typical RTT for the full data segment.
* Note that using `PreCongSumRTT/PreCongCountRTT` does not provide a more accurate estimate, because both `PreCongSumRTT` and `PreCongCountRTT` are recorded right before the first congestion signal, which, in the worst case, occurs when the receiver queue is already full, which affects the RTT.

### Server-client **latency during data transfers** (with congestion)

* Estimated using the **average RTT**, uniformly averaged over an entire test.
* This value can be computed as `web100_log_entry.snap.SumRTT/web100_log_entry.snap.CountRTT`
* In this case, it makes sense to exclude results of tests with **10 or fewer round trip time samples**, because there are not enough samples to accurately estimate the RTT. This condition is expressed in BigQuery with:`web100_log_entry.snap.CountRTT > 10`

Given that the NDT server updates the web100 variables `web100_log_entry.snap.MinRTT` and `web100_log_entry.snap.CountRTT` only when it receives an acknowledgement and given that, during client-to-server tests the NDT server receives an ack only during the 3-way-handshake, RTT values are computed only for server-to-client tests.

The complete BigQuery example is:

```sql
#standardSQL
SELECT
  web100_log_entry.snap.MinRTT AS min_rtt
FROM
  `measurement-lab.ndt.recommended`
WHERE
  connection_spec.client_geolocation.country_code = 'US'
  AND partition_date BETWEEN '2017-01-01' AND '2017-01-02'
  AND connection_spec.data_direction = 1
  AND web100_log_entry.snap.HCThruOctetsAcked >= 8192
  AND (web100_log_entry.snap.SndLimTimeRwin +
       web100_log_entry.snap.SndLimTimeCwnd +
       web100_log_entry.snap.SndLimTimeSnd) >= 9000000
  AND (web100_log_entry.snap.SndLimTimeRwin +
       web100_log_entry.snap.SndLimTimeCwnd +
       web100_log_entry.snap.SndLimTimeSnd) < 600000000
  AND web100_log_entry.snap.CountRTT > 10
  AND (web100_log_entry.snap.State = 1
       OR (web100_log_entry.snap.State >= 5
       AND web100_log_entry.snap.State <= 11))
  LIMIT 100
```

The above example using the `ndt_downloads` BigQuery view:

```sql
#standardSQL
SELECT
  web100_log_entry.snap.MinRTT AS min_rtt
FROM
  `measurement-lab.ndt.downloads`
WHERE
  connection_spec.client_geolocation.country_code = 'US'
  AND partition_date BETWEEN '2017-01-01' AND '2017-01-02'
  LIMIT 100
```

## Packet Retransmission Rate

NDT keeps track of the number of packets retransmitted during a test, in the web100 variable `web100_log_entry.snap.SegsRetrans`.

Packet retransmission is computed as the ratio between the re-transmitted data packets and all the transmitted data packets. Packets with zero length payload (e.g. pure ACKs) are not part of the retransmission calculation.
`web100_log_entry.snap.SegsRetrans/web100_log_entry.snap.DataSegsOut`

Given that the NDT server updates the web100 variables `web100_log_entry.snap.SegsRetrans` and `web100_log_entry.snap.DataSegsOut` only when sending data, **packet retransmission is only estimated for server-to-client or download tests**.

It is also possible to also measure the byte retransmission, as `web100_log_entry.snap.OctetsRetrans/web100_log_entry.snap.DataOctetsOut`

The complete BigQuery query is:

```sql
#standardSQL
SELECT
 web100_log_entry.connection_spec.remote_ip AS remote_ip,
 web100_log_entry.connection_spec.local_ip AS local_ip,
 (web100_log_entry.snap.SegsRetrans / web100_log_entry.snap.DataSegsOut) AS packet_retransmission_rate
FROM
  `measurement-lab.ndt.downloads`
LIMIT 100
```

## Network-limited Time Ratio and Client-limited Time Ratio

An NDT test can be in 3 different states. Each state represents different conditions that limit the data sent by the server to the client.

* **network-limited**, when the network is congested.
  * The web100 variable `web100_log_entry.snap.SndLimTimeCwnd` reports the time spent in this state.
* **receiver-limited**, when the receiver (client) limits the data that can be received.
  * The web100 variable `web100_log_entry.snap.SndLimTimeRwin` reports the time spent in this state.
* **server-limited**, when the server limits the data that can be sent.
  * The web100 variable `web100_log_entry.snap.SndLimTimeSnd` reports the time spent in this state.
  * This state can happen because
    * The uplink is congested. Note however that M-Lab servers are intentionally over provisioned to minimize this case.
    * The server cannot send as much data as the network and the receiver would allow, in specific phases of the tests. This usually happens during [TCP slow start](https://en.wikipedia.org/wiki/TCP_congestion_control#Slow_start){:target="_blank"}, especially with fast networks and high values of initial window.
    * The server cannot send as much data as the network and the receiver would allow, during the whole test. This can happen for specific TCP configurations. However, this kind of configuration is disabled by default on M-Lab servers.

The complete BigQuery query to compute network-limited time is:

```sql
#standardSQL
SELECT
 web100_log_entry.connection_spec.remote_ip,
 web100_log_entry.connection_spec.local_ip,
 web100_log_entry.snap.SndLimTimeCwnd /
   (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd) AS network_limited_time
FROM
  `measurement-lab.ndt.recommended`
WHERE
 connection_spec.data_direction = 1
 AND web100_log_entry.snap.HCThruOctetsAcked >= 8192
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) >= 9000000
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) < 600000000
 AND (web100_log_entry.snap.State = 1
     OR (web100_log_entry.snap.State >= 5
         AND web100_log_entry.snap.State <= 11))
LIMIT 100
```

The complete BigQuery query to compute receiver-limited time is:

```sql
#standardSQL
SELECT
 web100_log_entry.connection_spec.remote_ip AS remote_ip,
 web100_log_entry.connection_spec.local_ip AS local_ip,
 web100_log_entry.snap.SndLimTimeRwin /
   (web100_log_entry.snap.SndLimTimeRwin +
    web100_log_entry.snap.SndLimTimeCwnd +
    web100_log_entry.snap.SndLimTimeSnd) AS receiver_limited_time
FROM
  `measurement-lab.ndt.recommended`
WHERE
 connection_spec.data_direction = 1
 AND web100_log_entry.snap.HCThruOctetsAcked >= 8192
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) >= 9000000
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) < 600000000
 AND (web100_log_entry.snap.State = 1
      OR (web100_log_entry.snap.State >= 5
          AND web100_log_entry.snap.State <= 11))
LIMIT 100
```

## Receiver Window Scale

The [receiver window scale](https://en.wikipedia.org/wiki/TCP_window_scale_option){:target="_blank"} is the value negotiated at the beginning of a TCP connection to scale the receiver window size. The receive window size is the maximum amount of received data that can be buffered at one time on the receiving side of a TCP connection.

The value of receiver window scale depends on the type and the version of the client's operating system. As a consequence, the distribution of receiver window scale values shows the distribution of operating systems among NDT users.

The receiver window scale of a test is the value of the web100 variable `web100_log_entry.snap.WinScaleRcvd`. As described in the [web100 variable definition](https://cloud.google.com/bigquery/docs/tcp-kis.txt){:target="_blank"}, the valid values of `web100_log_entry.snap.WinScaleRcvd` are (-1 .. 14), where -1 means that the receiver did not request any value.

The complete BigQuery query is:

```sql
#standardSQL
SELECT
 web100_log_entry.connection_spec.remote_ip AS remote_ip,
 web100_log_entry.connection_spec.local_ip AS local_ip,
 web100_log_entry.snap.WinScaleRcvd
FROM
 `measurement-lab.ndt.recommended`
WHERE
 connection_spec.data_direction = 1
 AND web100_log_entry.snap.HCThruOctetsAcked >= 8192
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) >= 9000000
 AND (web100_log_entry.snap.SndLimTimeRwin +
      web100_log_entry.snap.SndLimTimeCwnd +
      web100_log_entry.snap.SndLimTimeSnd) < 600000000
 AND web100_log_entry.snap.WinScaleRcvd >= -1
 AND web100_log_entry.snap.WinScaleRcvd <= 14
 AND (web100_log_entry.snap.State = 1
      OR (web100_log_entry.snap.State >= 5
          AND web100_log_entry.snap.State <= 11))
LIMIT 100
```
