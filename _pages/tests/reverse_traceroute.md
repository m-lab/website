---
layout: page
permalink: /tests/reverse_traceroute/
title: "Reverse Traceroute"
breadcrumb: tests
---

# Reverse Traceroute

Reverse traceroute measures the network path back to a user from selected network endpoints, and provides a rich source of information on network routing and topology.

Please cite this data set as follows: **The M-Lab Reverse Traceroute Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/reverse_traceroute**


## **Reverse Traceroute**

Whenever a user runs a speed test on M-Lab, the system also launches a traceroute to the user from the M-Lab server serving the speed test. This traceroute provides visibility into the **forward path**—how traffic travels from the server to the client. In many scenarios, however, understanding only the forward path is not enough. Because Internet paths are usually **asymmetric**, diagnosing performance issues often requires visibility into both directions, including the reverse path from the client back to the server.

Unfortunately, M-Lab’s measurements are browser-based and do not have the necessary permissions to run traceroute from the user’s device. This prevents collecting reverse path information using conventional methods. In fact, this problem is widespread and has been known for decades—in most situations, someone trying to understand the Internet can measure the path from their host to the remote destination, but cannot measure the path back.

To address this limitation, the Reverse Traceroute group —led by Ethan Katz-Bassett (Columbia University) and including Italo Cunha (UFMG), Kevin Vermeulen (CNRS), Dave Choffnes (Northeastern University), and Loqman Salamatian (Columbia University)— has spent more than a decade developing and operating **reverse traceroute (RevTr)**, a distributed system that measures the reverse path without needing control over the client. We will describe the basics of the technique below, and curious readers can learn more in the original [RevTr 1.0 paper](https://www.measurementlab.net/publications/reverse-traceroute.pdf) (NSDI ‘10) and the [RevTr 2.0 follow-up](https://hal.science/hal-03788618/file/internet-scale-revtr.pdf) (IMC’ 22), which is the version currently integrated with M-Lab.

Reverse traceroute measurements have now been integrated into M-Lab. As of today, roughly **25% of everyday NDT speed tests** are paired with a reverse traceroute, enabling a more complete view of the end-to-end network path. 

This documentation is intended for network researchers and engineers familiar with traceroute and IP routing. It walks through how to access and interpret reverse traceroute data from M-Lab, and includes example queries and code snippets to help you get started. Reverse traceroutes can be powerful but also a bit tricky; this documentation aims to make them approachable and useful.

## **Crash Course on Reverse Traceroute**

To understand how reverse traceroute reconstructs the reverse path from a client D back to the server S, it is helpful to look at the different techniques it uses:

**Strategy 1. Measuring reverse paths using known atlas data.**

RevTr maintains a set of traceroutes from multiple **RIPE probes** to the server S. These paths are stored in a global atlas of known forward paths.  Because Internet routing is generally destination-based, once RevTr discovers that the reverse path from D intersects a known atlas path, it can assume the remainder of the route back to the server S follows that atlas path. In addition, destination-based routing allows RevTr to reconstruct paths hop by hop (using Strategies 2, 3, and 4 described later): if the path from D is observed to pass through a particular router, RevTr can then measure the return path starting from that router. So, RevTr works by measuring the path hop-by-hop from D until it intersects a path in its atlas, stitching together the path back to S. As reverse hops are discovered, RevTr checks whether any of them match routers already seen in existing traceroute paths from other vantage points. If a match is found, RevTr assumes the remainder of the reverse path follows the known route from that router back to the server. This strategy avoids the need to probe each hop individually and leverages prior measurements alongside existing traceroutes to fill in the rest of the path.

**Strategy 2. Building a Record-Route (RR) atlas.**

To support reverse path reconstruction via intersections with known paths, RevTr builds a Record-Route (RR) atlas. After running traceroutes to the server S, RevTr sends RR pings (i.e., pings with the Record-Route option enabled) to each hop along those paths. These RR pings reveal which router interfaces appear on the return path from that hop back to the vantage point. Because RR pings often expose different interfaces than standard traceroutes, they enrich the atlas with other interfaces. 

Strategies 3 and 4 will rely on this atlas: whenever RevTr discovers a new hop using RR pings (sent directly or via spoofing), it checks whether that hop appears in the RR atlas to determine if it has intersected a known path and can stop further probing.

**Strategy 3. Record-Route (RR) pings from the server.**

To measure a reverse hop from an IP address not in its atlas, RevTr attempts to discover the reverse path by sending a Record-Route ping directly from the server to the target address. This IP option asks routers to record their IP addresses in the packet header. The target copies the Record-Route header into its response, allowing routers along the reverse path to record their IP addresses. However, the header has limited space (only 9 slots), so when the forward path is long, the header fills before any reverse hops can be recorded, limiting the coverage of this technique.

**Strategy 4. Spoofed RR pings from nearby vantage points.**

To overcome the header space limitation, RevTr uses nearby vantage points to send RR pings with the server’s IP address set as the source. This technique, known as *spoofing*, is performed responsibly, with the consent and approval of all parties involved. These vantage points are geographically or topologically closer to the target, so their forward path is shorter, leaving more room in the RR header for capturing return hops. Because the source is spoofed, the target will reply to the source, revealing hops along the reverse path. Each time a new reverse hop is revealed, that hop becomes the new target, and RevTr uses RR pings (spoofed if the target is more than 8 hops from the server) to build the path incrementally back from the client towards the server until it intersects a traceroute in RevTr’s atlas.

**Strategy 5. Fallback inference using partial path symmetry.**

When a target R is not within range of any RevTr vantage point (or does not respond to RR pings), RevTr falls back on a heuristic that assumes the unknown hop is symmetric between forward and reverse paths. It runs a forward traceroute from the server to R and assumes the last hop R’ is traversed symmetrically. If it also fails to measure a reverse hop from R’, it then assumes the last two hops are traversed symmetrically, and so on. Our analysis reveals that a small number of assumptions of symmetry are unlikely to introduce significant errors if they are within the same network, but that RevTR is less trustworthy when a path requires many assumptions of symmetry or assumptions that traverse network boundaries.

In the final reverse path, each discovered hop is labeled with a `hop_type` field indicating which technique was used to measure that hop. 

The figure below illustrates how these different techniques come together to uncover the reverse path.

<img src="{{ site.baseurl }}/images/revtr_methodology.png" alt="Reverse traceroute methodology"/>

### ​​​​**Figure Walkthrough**

We can understand the basics of how RevTR works by walking through an example of measuring the reverse path from a client D back to the server S. 

**(a) Atlas construction:** RevTr begins by collecting traceroutes from multiple vantage points (V1, V2, V3) to the server S. These paths are stored in a global **atlas of known forward paths**.  
**(b) RR atlas construction:** Vantage points send Record-Route pings to each hop seen along the traceroute path to the server S. These pings record the path back from each router (e.g., R4, R5), building a Record-Route atlas from known intermediate hops.   
**(c) Failed direct RR ping:** The server S tries to send a Record-Route (RR) ping to the client D, hoping routers on the return path will fill in their addresses. But the packet fills with forward path hops before it even reaches D, so no reverse path info is captured.  
**(d) Spoofed RR ping from a closer vantage point:** A nearby vantage point V3, sends an RR ping that spoofs the server’s IP. Because it’s closer to D, fewer hops are needed on the forward path, leaving room in the RR header for one or more hops on the reverse path. This step reveals router R1.  
**(e) Hop-by-hop probing:** Another vantage point close to R1 now sends a spoofed RR ping. This step reveals additional reverse hops R2 and R3. RevTr continues this hop-by-hop probing to trace the path back toward the server.  
**(f) Path completion via atlas:** Once a discovered router overlaps with a known path in either atlas (say from R4 to S from the **traceroute atlas (a)**), RevTr assumes the rest of the reverse path follows that atlas path.

**Accessing RevTr Data in BigQuery**

Before analyzing reverse traceroute results, the first step is gaining access to the data. M-Lab collects raw reverse traceroute measurements and makes them publicly available through BigQuery. Subscribe to M-Lab’s BigQuery datasets via the access [instructions](https://www.measurementlab.net/data/docs/bq/quickstart/). The reverse traceroute measurements are stored in the **measurement-lab.revtr_raw** project.

The main table, **revtr1**, contains one row per reverse traceroute, with metadata about the client and vantage points, as well as the measured reverse path. Additional tables in the project support the construction of these paths, as discussed earlier, by providing intermediate measurements:

* **trace1**: Stores traceroutes from M-Lab servers to clients. These are always run first and serve as a baseline for reverse path construction.  
* **traceatlas1**: Contains a global atlas of traceroutes from diverse RIPE Atlas probes to M-Lab servers. RevTr uses this atlas to identify path intersections and stitch together partial reverse paths.  
* **ping1**: Includes both standard pings and Record-Route pings. These are used to estimate latency and, in the case of RR, to reveal intermediate hops along the reverse path.  
* **rankedspoofers1**: Ranks available vantage points by proximity to the target, helping the system select the best vantage point for each spoofed RR probe.

You will not need all of these tables for most use cases, but they’re useful for debugging, validation, or deeper analysis of path construction. Feel free to contact us if you’re working on a project that requires one of those.

### Interpreting RevTr Paths: Hop Types and Measurement Methods

One of the intricacies of working with reverse traceroute data is that multiple techniques are used to measure hops along the reverse path, with the hops stitched together into the full path. As a result, RevTr includes metadata that captures how each hop was discovered via the `raw.revtr_hops.hop_type` field.

Different measurement techniques vary in reliability. For example, hops revealed via Record-Route pings or traceroute intersections are generally more trustworthy than those inferred by assuming interdomain symmetry. To ensure that a recovered path meets the reliability standards of your analysis, you should always inspect the `hop_type` values before drawing conclusions.

The table below summarizes the hop types supported in RevTr and their interpretation. These are described in detail in Sections 3 and 4 of the [RevTr 2.0 paper](https://dl.acm.org/doi/10.1145/3517745.3561422), 

| Type | Name | Description |
| ----- | ----- | ----- |
| 1 | Destination | The destination hop (i.e., the NDT client). |
| 2 | Assume Symmetry (**Deprecated**) | Assumes symmetry on the hop of a forward traceroute*. (Strategy 5)* |
| 3 | Intersected Traceroute | Hop matched a forward traceroute from a vantage point to the M-Lab server (source), using the traceroute atlas. RevTr assumes the reverse path follows this known route back to the source. *(Strategy 1)* |
| 4 | Intersected Record-Route Atlas | Hop matches an IP seen in a record-route probe in the RevTr atlas (cached forward measurements from many vantage points to the M-Lab server, the “source”). When there is a match, RevTr fills in the path from that hop back to the source using the atlas data. *(Strategy 2)* |
| 5 | Record-Route | Hop revealed directly using IP Record-Route option. *(Strategy 3)* |
| 6 | Spoofed Record-Route | Hop revealed using spoofed Record-Route packets. *(Strategy 4)* |
| 11 | Assume Symmetry (Intradomain) | Symmetry assumed within the same AS—generally safe. (*Strategy 5)* |
| 12 | Assume Symmetry (Interdomain) | Symmetry assumed across ASes—less reliable and should be treated with caution. (*Strategy 5)* |

For most applications, we recommend using only hop types 1–11 (excluding type 2) and treating type 12 with caution, since it relies on interdomain symmetry. Type 2 was deprecated in April 2025 and replaced by types 11 and 12. For older data that includes type 2, check whether the hop before it belongs to a different AS. If so, treat it like type 12 (less reliable). If it’s within the same AS, treat it like type 11 (generally safe).

---

### A Note on Hop Type 4: Intersected Record-Route Atlas

As a heads-up, paths that include hop type 4 require a bit of extra care. These hops are flagged when a Record-Route packet intersects with a measurement from the traceroute atlas. Because Record-Route packets often expose a different set of router interfaces than those observed in traceroute measurements, and because we cannot always determine which IP addresses belong to the same physical router (a process known as alias resolution), it is not always clear which specific hop in the path was actually intersected. As a result, RevTr may return a short *sequence* of hops, where it lacks a clear indication as to which hop was the intersection point  (This scenario is described in more detail in Figure 3 of the [Revtr 2.0 paper](https://dl.acm.org/doi/10.1145/3517745.3561422)). These segments are marked as `hop_type=4` in the reverse path. The presence of `hop_type = 4` hops can introduce apparent anomalies—for example, loops in the AS path or geographic path—due to uncertainty in which IP address the Record-Route packet truly intersects.

**Our recommendation**:

If you encounter a reverse path with a loop in the AS-level or geographic path, check whether a hop type 4 hop is responsible. If so, we recommend **removing just the hop type 4 hop(s) that create the loop**, while keeping the rest of the path intact. Our [first query](#query-1:) does exactly this. 

---

### Fallback Probes Within the Destination ASN

One of the challenges in running reverse traceroute is that some end hosts drop probes, either because they are behind NATs or firewalls, or because they silently discard ICMP and Record-Route packets. As a result, some measurements fail to recover any usable information about the reverse path.

To address this, RevTr includes a fallback mechanism to still extract some information when the host is not responsive. When a measurement to a target IP address fails, the system examines the forward traceroute collected from the M-Lab server to the target IP address. If it finds a responsive hop that belongs to the same ASN as the original target, it re-issues a reverse traceroute directed at that alternative IP address. The idea is that even if the exact end-host is not responsive, another IP address within the same AS may provide enough visibility to reconstruct a meaningful portion of the reverse path.

These retries are flagged with `raw.is_try_from_destination_AS = TRUE`*,* and `raw.ids_revtr_from_destination_AS` lists the UUIDs of the measurements that triggered the fallback. In practice, these retries often yield high-quality data—especially when the responsive IP address is nearby in topology or geography—but users should assess whether this substitution is acceptable for their specific analysis goals.

---

### Breakdown of the **revtr1** table

| Field Name | Type | Mode | Description |
| ----- | ----- | ----- | ----- |
| date | DATE | NULLABLE | Date when the reverse traceroute measurement was archived (**Required as a filter in all queries**.) |
| archiver.Version | STRING | NULLABLE | Version of the archiving system used to process/store the data. |
| archiver.GitCommit | STRING | NULLABLE | Git commit hash corresponding to the RevTr version. |
| archiver.ArchiveURL | STRING | NULLABLE | Cloud Storage path to the raw JSONL file containing the measurement. |
| archiver.Filename | STRING | NULLABLE | Local file path where the raw measurement was originally written on the archiver machine. |
| raw.date | INTEGER | NULLABLE | UNIX timestamp when the reverse traceroute was executed. |
| raw.dst | STRING | NULLABLE | Destination of the client for the reverse traceroute measurement. |
| raw.fail_reason | STRING | NULLABLE | Reason why the reverse traceroute failed, if applicable (e.g., timeout, unresponsive traceroute). There are 16 possible failure codes, each corresponding to a specific flag returned by [scamper](https://launchpad.net/~matthewluckie/+archive/ubuntu/scamper). |
| raw.id | INTEGER | NULLABLE | Unique identifier for this reverse traceroute attempt. |
| raw.label | STRING | NULLABLE | Label for the test context (e.g., ndt_revtr_sidecar indicating it’s paired with an NDT test). |
| raw.uuid | STRING | NULLABLE | M-Lab’s NDT ID associated with the reverse traceroute |
| raw.revtr_hops | RECORD | REPEATED | List of hops on the reverse path, including location, RTT, TTL, and IP metadata. |
| raw.revtr_hops.hop_ip | STRING | NULLABLE | IP address of the hop. |
| raw.revtr_hops. hop_number | INTEGER | NULLABLE | Hop index in the reverse path. |
| raw.revtr_hops. hop_type | INTEGER | NULLABLE | Encodes the type of hop or the technique used to discover it  |
| raw.revtr_hops. measurement_id | INTEGER | NULLABLE | Unique identifier for the measurement associated with measuring this hop. |
| raw.revtr_hops.rtt | INTEGER | NULLABLE | Round-trip time to this hop in microseconds. |
| raw.revtr_hops.rtt_measurement_id | INTEGER | NULLABLE | Unique identifier for the RTT measurement associated with this hop. |
| raw.revtr_hops.cidr | STRING | NULLABLE | CIDR block to which this hop’s IP address belongs. |
| raw.revtr_hops.asn | INT | NULLABLE | Autonomous System Number (ASN) associated with the hop IP. |
| raw.revtr_hops.geolocation_ipinfo. city | STRING | NULLABLE | Inferred city for this hop (geolocation). |
| raw.revtr_hops.geolocation_ipinfo. country | STRING | NULLABLE | Country code (ISO-2) of the hop. |
| raw.revtr_hops.geolocation_ipinfo. lat | FLOAT | NULLABLE | Latitude of the hop’s inferred location. |
| raw.revtr_hops.geolocation_ipinfo. lng  | FLOAT | NULLABLE | Longitude of the hop’s inferred location. |
| raw.runtime | INT | NULLABLE | Total runtime of the reverse traceroute measurement in microseconds. |
| raw.src | STRING | NULLABLE | Source IP initiating the reverse traceroute (typically the server). |
| raw.stop_reason | STRING | NULLABLE | Reason why the measurement was stopped (can be either ‘REACHES’ or ‘FAILED’)  |
| raw.is_try_from_destination_AS | BOOLEAN | NULLABLE | Indicates whether this reverse traceroute attempt is a retry directed at a different hop within the destination AS. This typically occurs when the original target was unresponsive, but another hop from the same AS was discovered via forward traceroute and selected as a fallback. |
| raw.ids_revtr_from_destination_AS | RECORD | REPEATED | Identifiers of the original reverse traceroute attempts that triggered this fallback measurement. These IDs trace the lineage of the retry logic used to probe alternative hops in the destination AS. |
| raw.revtr_id | INTEGER | NULLABLE | Internal ID in RevTr system.  |

---

### A few queries to get you started

#### Query 1: {#query-1:}

This query retrieves all reverse traceroute measurements from a given date where the path successfully reaches the client’s IP address (`raw.stop_reason = 'REACHES'`and `raw.is_try_from_destination_AS = FALSE)`, does not contain suspicious loops induced by stitching of a traceroute and a Record-Route packet (a loop caused by `hop_type = 4`), and does not rely on interdomain symmetry (`hop_type = 12`):

```sql
SELECT
  date,
  raw
FROM
  `measurement-lab.revtr_raw.revtr1`
WHERE
  DATE(date) = @day --- replace the day
  AND raw.stop_reason = 'REACHES'
  AND raw.is_try_from_destination_AS = FALSE
  AND NOT EXISTS (
    SELECT 1
    FROM UNNEST(raw.revtr_hops) AS hop
    WHERE hop.hop_type = 12
  )
  AND NOT EXISTS (
    SELECT 1
    FROM UNNEST(raw.revtr_hops) AS outer_hop
    WHERE EXISTS (
      SELECT 1
      FROM UNNEST(raw.revtr_hops) AS inner_hop
      WHERE outer_hop.geolocation_ipinfo.city = inner_hop.geolocation_ipinfo.city
        AND outer_hop.hop_number < inner_hop.hop_number - 1
        AND (
          SELECT COUNT(DISTINCT mid.geolocation_ipinfo.city)
          FROM UNNEST(raw.revtr_hops) AS mid
          WHERE mid.hop_number > outer_hop.hop_number
            AND mid.hop_number < inner_hop.hop_number
            AND mid.geolocation_ipinfo.city IS NOT NULL
            AND mid.geolocation_ipinfo.city != outer_hop.geolocation_ipinfo.city
        ) > 0
        AND (outer_hop.hop_type = 4 OR inner_hop.hop_type = 4)
    )
  )
```

#### Query 2:

This query computes a breakdown of reverse traceroute failures by reason. It returns the total number of measurements per day, the count of each failure reason, and the fraction that each reason represents. 

```sql
WITH daily_data AS (
  SELECT
    DATE(date) AS day,
    raw.fail_reason,
    COUNT(raw.uuid) AS total_occurrences
  FROM
    `measurement-lab.revtr_raw.revtr1`
  WHERE
    date BETWEEN @date AND @end_date --- update the dates
  GROUP BY
    day,
    raw.fail_reason
),
daily_totals AS (
  SELECT
    day,
    SUM(total_occurrences) AS total_occurrences_per_day
  FROM
    daily_data
  GROUP BY
    day
),
aggregated_results AS (
  SELECT
    d.day,
    ARRAY_AGG(STRUCT(
      d.fail_reason,
      d.total_occurrences,
      d.total_occurrences / dt.total_occurrences_per_day AS fraction_total
    )) AS failure_stats
  FROM
    daily_data d
  JOIN
    daily_totals dt
  ON
    d.day = dt.day
  GROUP BY
    d.day
)
SELECT
  ar.day,
  STRUCT(
    failure_stats AS failure_statistics,
    total_occurrences_per_day AS total_measurements
  ) AS daily_summary
FROM
  aggregated_results ar
JOIN
  daily_totals dt
ON
  ar.day = dt.day
ORDER BY
  day;
```

#### Query 3:

This query matches forward and reverse measurements for a given ID. 

```sql
WITH RevtrTrace AS (
  SELECT
    t1.raw AS revtr_data,
    t2.raw AS trace_data,
    t1.date AS revtr_date,
    t1.raw.uuid AS revtr_uuid
  FROM
    `measurement-lab.revtr_raw.revtr1` AS t1
  CROSS JOIN UNNEST(t1.raw.revtr_hops) AS hop WITH OFFSET AS hop_number
  JOIN
    `measurement-lab.revtr_raw.trace1` AS t2
  ON
    hop.measurement_id = t2.raw.revtr_measurement_id
  WHERE
    t1.date = @date AND
    t2.date = @date --- update with code
)
SELECT * FROM RevtrTrace
```

