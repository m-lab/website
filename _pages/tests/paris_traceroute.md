---
layout: page
permalink: /tests/paris_traceroute/
title: "Paris Traceroute"
breadcrumb: tests
---

# Paris Traceroute

Paris Traceroute collects network path information for every connection used by the measurement tests running on the M-Lab platform. In addition to the route and network topology data provided by regular traceroute, Paris Traceroute detects load balancing, noting when a transmission is split between two paths. Like SideStream, Paris Traceroute runs when another M-Lab test makes a connection with the platform.

Please cite this data set as follows: The M-Lab Paris Traceroute Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/paris_traceroute

**Data** collected by Paris Traceroute is available:

* in raw format at [https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/](https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute/){:target="_blank"}.

* in BigQuery at [{{ site.baseurl }}/data/bq/quickstart/]({{site.baseurl}}/data/bq/quickstart/).

**Get more information** at [http://www.paris-traceroute.net](http://www.paris-traceroute.net/){:target="_blank"}.