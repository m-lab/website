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

M-Lab has always committed to provide traceroute data for the tests running on M-Lab platform. Since we launched new platform in 2019 Q4, the new traceroute binary, Scamper, replaced Paris Traceroute on all our servers. Our BigQuery table for traceroute now has unified schema to cover both the legacy Paris Traceroute test data and new Scamper data. This blog is to analyze the difference between the legacy data and new data.

The legacy data and new data are merged in the same BigQuery table mlab-oti.base_tables.traceroute. The easiest way to tell the difference between them is to check the uuid field. The legacy data has empty uuid field while the new data has a value like “neubot-sb9zt_1576697510_0000000000006A41”.

First we would like to check the test volume change. We observed significant increase in number of tests per day due to improvement of the traceroute caller code in Jan, 2020.

Before the Scamper launch, the average number of tests for 2019/03 is 6710952. After the Scamper launch, we reached 10 million traceroute tests per day for the first time in Jan. 2020. The drop in late 2019 was caused by some Scamper bug. After we fixed the problem with Scamper author at the end of 2019, the number of traceroute tests bounced back dramatically.

![tests_change]({{ site.baseurl }}/images/blog/tests.png)

![hops_change]({{ site.baseurl }}/images/blog/hop.png)
