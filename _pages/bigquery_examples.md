---
layout: page
title: "BigQuery Examples"
permalink: /data/docs/bq/examples/
breadcrumb: data
---

# BigQuery Examples

The examples below query the M-Lab data in various ways to demonstrate effective use of the M-Lab BigQuery data set. Please note that the examples presented here assume prior knowledge of database query languages such as [SQL](https://en.wikipedia.org/wiki/SQL){:target="_blank"} and some knowledge of computer networking terms and concepts such as [subnets](https://en.wikipedia.org/wiki/Subnetwork){:target="_blank"} and [IP addresses](https://en.wikipedia.org/wiki/IP_address){:target="_blank"}.

## Basic Counting: How Many Users?

Let's start with something simple. How many distinct users (distinct IPs, for simplicity) have ever run an **NDT** test?

~~~sql
#standardSQL
SELECT
  COUNT(DISTINCT web100_log_entry.connection_spec.remote_ip) AS num_clients
FROM
  `measurement-lab.release.ndt_all`
WHERE
  web100_log_entry.connection_spec.remote_ip IS NOT NULL;
~~~

**Result (_last updated 1/25/2018_):**

| num_clients |
|-------------|
| 154370043   |

## Computing Statistics Over Time: How Many Users Per Day?

By slightly modifying the previous query, it is possible to compute how the number of users changed over time.

~~~sql
#standardSQL
SELECT
  partition_date AS day,
  COUNT(DISTINCT web100_log_entry.connection_spec.remote_ip) AS num_clients
FROM
  `measurement-lab.release.ndt_all`
WHERE
  web100_log_entry.connection_spec.remote_ip IS NOT NULL
GROUP BY
  day
ORDER BY
  day ASC;
~~~

**Result**

|    day      | num_clients |
|-------------|-------------|
| 2009-02-18  |           1 |
| 2009-02-21  |          31 |
| 2009-02-22  |         115 |
| 2009-02-23  |          73 |
| 2009-02-24  |         105 |
| ...         |         ... |
| 2018-01-24  |      379663 |
| 2018-01-25  |      189486 |
+-------------+-------------+

## Dealing with IP Addresses: How Many Users from Distinct Subnets?

BigQuery supports various functions to parse IP addresses in different formats. You can use such functions to aggregate the number of users per subnet and to compute how many subnets have ever initiated a test.

The query that follows aggregates the client IP addresses into /24s and counts the number of unique /24s that have ever initiated at least one NDT test.

`PARSE_IP(remote_ip) & INTEGER(POW(2, 32) - POW(2, 32 - 24))` computes a [bit-wise](https://en.wikipedia.org/wiki/Bitwise_operation){:target="_blank"} AND between web100_log_entry.connection_spec.remote_ip and 255.255.255.0. The [BigQuery Query Reference](https://cloud.google.com/bigquery/query-reference#ipfunctions){:target="_blank"} describes the `PARSE_IP` and `FORMAT_IP` functions.

We have to distinguish between IPv4 addresses and IPv6 addresses. We do this using the connection_spec.client_af which will be equal to 10 for IPv6 addresses, and 0 or 2 for IPv4 ones.

~~~sql
#standardSQL
CREATE TEMPORARY FUNCTION computeSubnet(ip STRING, ipType INT64)
RETURNS STRING
AS (
  IF(NET.SAFE_IP_FROM_STRING(ip) IS NOT NULL,
    CASE
      -- IPv4
      WHEN (ipType = 0) OR (ipType = 2) THEN
        NET.IP_TO_STRING(NET.IP_TRUNC(NET.SAFE_IP_FROM_STRING(ip), 24))
      -- IPv6
      WHEN (ipType = 10) AND (LENGTH(ip) > 48) THEN
        NET.IP_TO_STRING(NET.IP_TRUNC(NET.SAFE_IP_FROM_STRING(ip), 48))
      ELSE
        NULL
    END,
  NULL)
);
 
SELECT
  COUNT(DISTINCT computeSubnet(web100_log_entry.connection_spec.remote_ip, connection_spec.client_af)) AS num_subnets
 
FROM
  `measurement-lab.release.ndt_all`;
~~~

**Result**
 
| num_subnets |
|-------------|
| 5234754     |
+-------------+

## Comparing NDT and NPAD Tests: How Many Users Have Run Both NDT and NPAD tests?

This query computes the number of distinct IP addresses that have run tests using both NDT and NPAD. The inner query (in parentheses beginning with the second SELECT statement) is an inner join between the NDT and NPAD tables containing the rows where the remote IP field in both tables match.

The outer query simply counts the number of results from the inner query (i.e., the number of rows with matching remote IP addresses).

~~~sql
SELECT
  COUNT(*) AS num_ip_addresses
FROM
  (
  SELECT
    npad.web100_log_entry.connection_spec.remote_ip,
  FROM
    plx.google:m_lab.npad.all AS npad
  JOIN
    plx.google:m_lab.npad.all AS ndt
  ON
    (npad.web100_log_entry.connection_spec.remote_ip =
     ndt.web100_log_entry.connection_spec.remote_ip)
  GROUP BY
    npad.web100_log_entry.connection_spec.remote_ip
  )
~~~

**Result**

|num_ip_addresses|
|----------------|
|           74535|
+----------------+

## Computing Distributions of Tests Across Users: How Many Users Have Run a Certain Number of Tests?

Some IP addresses may have many initiated tests, while others may have only a few tests. To assess the representation of each IP address, we can classify the IP address based on the number of tests it has initiated.

* The query that follows computes the number of NDT tests initiated by each client IP address, groups the IP addresses by the number of tests run, and returns the number of IP addresses in each group.
* The inner query (in parentheses beginning with the second SELECT statement) calculates the number of NDT tests that each client performed. The query uses the `GROUP BY` clause to collapse all the rows with the same `remote_ip` address. The [BigQuery Query Reference](https://cloud.google.com/bigquery/docs/query-reference#groupby){:target="_blank"} describes the `GROUP BY` command.
* The outer query transforms the results of the inner query by grouping each client according to the number of tests it performed, and then calculating the number of clients in each bucket.

~~~sql
#standardSQL
SELECT
  num_tests,
  COUNT(*) AS num_clients
FROM
  (
  SELECT COUNT(*) AS num_tests,
 
    web100_log_entry.connection_spec.remote_ip AS remote_ip
  FROM
    `measurement-lab.release.ndt_all`
  WHERE
    partition_date >= '2017-01-01'
    AND partition_date <= '2017-12-31'
  GROUP BY remote_ip
 
  )
GROUP BY
  num_tests
ORDER BY
  num_tests ASC;
~~~

**Result**
 
|num_tests|num_clients|
|---------|-----------|
| 1       | 2475002   |
| 2       | 15446047  |
| 3       | 1489116   |
| ...     | ...       |
| 30941   | 1         |
| 109399  | 1         |
| 339105  | 1         |
+---------+-----------+
