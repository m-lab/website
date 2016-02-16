---
layout: page
permalink: /tools/paris_traceroute/
title: "Paris Traceroute"
breadcrumb: tests
---

# Paris Traceroute

Paris Traceroute collects paris-traceroute traces for every TCP connection used by the measurement tools running on the M-Lab platform. In addition to the existing route and topology data provided by regular traceroute, Paris Traceroute detects load balancing, noting when a transmission is split between two pathes. Like Sidestream, Paris Traceroute runs when another M-Lab tool makes a TCP connection with the platform.

**Data** collected by paris-traceroute is available...

- in raw format at <https://storage.cloud.google.com/m-lab/paris-traceroute>
- via an SQL interface (see <https://github.com/m-lab/mlab-wikis/blob/master/BigQueryMLabDataset.md>).

**More information** at [http://www.paris-traceroute.net](http://www.paris-traceroute.net/).