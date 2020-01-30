---
layout: blog
title: "New Traceroute Binary on M-Lab platform"
author: "Ya Chang"
date: 2020-01-20
breadcrumb: blog
categories:
  - data
  - paris-traceroute
  - traceroute
  - community

M-Lab has always committed to provide traceroute data for the tests running on M-Lab platform. Since we launched [new platform](https://www.measurementlab.net/blog/global-pilot-success/#m-lab-2.0-platform:-global-pilot-assessment) in 2019 Q4, the new traceroute binary, [Scamper](https://www.caida.org/tools/measurement/scamper/), replaced [Paris Traceroute](https://paris-traceroute.net/) on all our servers. Our BigQuery table for traceroute now has unified [schema](https://www.measurementlab.net/blog/traceroute-bq-newdata-available/#new-traceroute-table-and-schema-now-available) to cover both the legacy Paris Traceroute test data and new Scamper data. This blog is to analyze the difference between the legacy data and new data.

The legacy data and new data are merged in the same BigQuery table mlab-oti.base_tables.traceroute. The easiest way to tell the difference between them is to check the uuid field. The legacy data has empty uuid field while the new data has a value like “neubot-sb9zt_1576697510_0000000000006A41”.

First we would like to check the test volume change. We observed significant increase in number of tests per day due to improvement of the traceroute caller code in Jan, 2020.

Before the Scamper launch, the average number of tests for 2019/03 is 6710952. After the Scamper launch, we reached 10 million traceroute tests per day for the first time in Jan. 2020. The drop in late 2019 was caused by some Scamper bug. After we fixed the problem with Scamper author at the end of 2019, the number of traceroute tests bounced back dramatically.

~~~sql
SELECT
ts,
COUNT(*) AS num

FROM (
SELECT
  DATE(TestTime) as ts
FROM `mlab-oti.base_tables.traceroute`
WHERE
DATE(_PARTITIONTIME) BETWEEN DATE("2019-01-01") AND DATE("2020-01-31")
)

GROUP BY ts
ORDER BY ts ASC
~~~

![tests_change]({{ site.baseurl }}/images/blog/tests.png)

For number of hops in all those tests, we observed the drop of hops during platform rollout process as well due to the same reason described above. After we launched the fixed Docker image in early Jan, 2020, the number of hops jump back and expected to recover over time.

~~~sql
SELECT
ts,
COUNTIF(hop_ip IS NOT NULL) AS total_hops

FROM (
SELECT
  DATE(TestTime) as ts,
  hops.Source.IP AS hop_ip,
FROM  `mlab-oti.batch.traceroute` as traceroute,
     UNNEST(traceroute.Hop) as hops
WHERE

DATE(_PARTITIONTIME) BETWEEN DATE("2019-01-01") AND DATE("2020-01-31")

)

GROUP BY ts
ORDER BY ts ASC

~~~

![hops_change]({{ site.baseurl }}/images/blog/hop.png)
