---
layout: blog
title: "Using M-Lab Data in Broadband Advocacy and Policy"
author: "Lai Yi Ohlsen, Greg Russell, Stephen Soltesz"
date: 2021-02-17
breadcrumb: blog
categories:
  - research
  - policy
  - advocacy
---

For researchers, policy makers, governing bodies, advocacy groups, or anyone who
wants to understand M-Lab data and how it compares to other internet measurement
data sets, M-Lab has begun to develop recommendations for appropriate use of our
data in their analyses and reports.<!--more-->

## Motivation

Measurement Lab’s mission is to measure the Internet, save the data, and make it
universally accessible and useful. Our goal is to measure a user’s whole
experience of the Internet and how effectively it supports them day to day. To
improve the Internet, we need to model how it behaves for the user in their
everyday lives. Furthermore, these models should be built on transparent and
verifiable data and methods to ensure that users, policy makers, advocates,
researchers and anyone else with an interest in the future of the Internet, can
make decisions with the same information. 

## Key Takeaways

* Different goals are best served by different data sources.  No single source
  is best for all purposes. Many insights arise only when comparing and
  contrasting multiple data sources.
* The Internet is the interconnection of many independent networks. The portion
  of this topology that is measured is a function of client and measurement
  server placement. 
  * People measuring to a server within their access ISP's network will assess
    only that ISP's network, not the user's connection to the Internet. This
    server placement is called “on-net”
  * People measuring to a server within a transit provider that "peers" with the
    access ISP will assess the approximate path to content outside of the access
    network. Because the path includes an interconnection, this measurement may
    also assess the quality of the peering between the access ISP and transit
    provider. This server placement is called “off-net”
  * The FCC MBA Program Technical Index notes, "The use of both on-net and
    off-net nodes provides a measure of confidence in the test results.”
* M-Lab data is an excellent source for researchers who want: 
  * open data and transparent methodology
  * to measure the interconnections between independent networks (the
    “inter” part of the Internet)
  * full access to extensive, detailed data, rather than broad generalizations
    i.e.:
    * break down by ISP, time of day, day of week, IP subnets
    * break down across different destination transit providers.
* Compare M-Lab data to other data sources when researchers:
  * want to measure the last mile connection
  * are interested in exhaustive data on a specific ISP and
    * have access to (and trust) proprietary internal data
    * using proprietary data works for your needs
  * need controlled or verified client demographic, connectivity, or geolocation
    data
* When analyzing and illustrating data:
  * Don’t oversimplify
    * Aggregate by ISP in addition to time/date and location
    * Be aware and illustrate multimodal distributions
  * Use histogram and logarithmic scales
  * Take into account, and compensate for, client bias and population drift

## Research Considerations

As with any data-driven research initiative, researchers using M-Lab’s NDT
dataset should first consider whether or not our methodology meets the
expectations of their use case. Measurement services on the M-Lab platform are
an excellent source if you are looking to measure the “inter” part of the
Internet or the interconnections between providers. By running an exclusively
off-net platform, M-Lab measures more than the last-mile network by design.
M-Lab data will work best for researchers who are looking to represent the full
path from a user to the backbone of the Internet. Complementary datasets such as
Ookla’s speedtest.net provide data from servers as near in network distance to
the user as possible, likely within the user’s access network, and are better
suited for researchers looking to only measure the last-mile connection.

M-Lab data is freely available, open source, large, and longitudinal. Anyone can
sign up to gain access to the data via BigQuery at no cost. All of the software
that runs our platform, pipeline and measurement services (i.e. all of the code
that generates M-Lab data) is open for review on GitHub. Users have access to
the full history of data, as well as pre-filtered views that only show tests
that meet our team’s current, best understanding of test completeness and
research quality. By providing open source for all components, M-Lab offers an
exhaustive view into the provenance of all collected and published data.

Also, researchers are encouraged to use M-Lab's data as a public benchmark to
compare other performance datasets. For example, if a researcher has proprietary
performance data for a single ISP or content provider, they can compare this to
open NDT data to assess whether their clients perform at least as well as M-Lab
clients from similar network or geographic locations. Or, a network provider
could compare their known topology to open traceroute data to compare predicted
and actual routes.

## Analysis Recommendations

### Don’t oversimplify

Keep in mind that mean and medians summarize more complex underlying
distributions. If the underlying distribution is a single narrow peak,
interpretation is easy, but if it is multimodal, or has long tails or high skew,
it is less obvious how to interpret a mean or median.

Multimodal distributions usually appear because there are several distinct
populations in the underlying data.  Breaking down data on dimensions like
ASNumber, peak/off-peak, or urban/rural will often allow for clearer
interpretation.

In particular, individual ISPs may serve different market niches, implement
services using different technologies, or have differing levels of
infrastructure investment. Different ISPs operating in the same geographic area
may therefore have very different performance characteristics.

Peak/off-peak distinctions are often useful to identify regions or ISPs where
peak traffic exceeds some internal infrastructure capacity.  Peak hour
end-to-end throughput may not match last mile throughput, or off-hour
throughput, due to queuing at internal switches during peak traffic times.

### Use histograms and logarithmic scales

Histograms can clearly illustrate more complex distributions, with long tails,
or multiple groupings of fast or slow clients.  When providing geographic
visualizations, a complementary histogram can provide greater detail about a
single geographic area.

Internet performance ranges over many orders of magnitude, and, just as sound
levels are measured in dB, internet performance is best represented on log
scales. Using linear scales or linear averages over-weights the fastest
measurements (or the largest MinRTT values).

If you do wish to calculate averages, and have done your due diligence to
account for factors like client bias, sample size, etc. then the average should
be calculated in logarithmic space (also known as the geometric mean), and
histograms should use logarithmically spaced buckets, usually with 2 to 5
buckets per order of magnitude depending on how many samples are available and
how much detail is useful.

### Take into account, and compensate for, client bias and population drift

Everything changes - sometimes all at once. Trends in the data evolve from a
combination of:
* Internet evolution
* Client population changes
* M-Lab platform or service changes ([e.g. shifting from Cubic to BBR congestion
  control]({{ site.baseurl }}/blog/evolution-of-ndt/))

In aggregate, any change (to the Internet, client population, or service
software) may lead to improving or declining performance measurements. For
example, improvement in an area may mean the network is getting better, or it
may mean a few very fast clients are running a lot of tests, or that households
with fewer options are being squeezed out.  Declining overall performance
measurements may mean an oversubscribed interconnection point, or actually
reflect growth in service in low income markets or rural areas where service is
slower.

Researchers should look at client population changes when comparing statistics
across different time periods (whether means, medians, or histograms)
<sup>[1](#footnotes)</sup>. Aggregate statistics may reflect actual network evolution, or
may be dominated by growth in a specific population of clients (e.g. from one
fast growing ISP), or changes in the testing behavior of existing clients (e.g.
through increased awareness or automated testing).

<hr style="width:200px;" id="footnotes">

**[ 1 ]** The most common way client populations have been identified in research has been using the IP address. This is an imperfect method, and both our team and other researchers are actively working to develop [other methods that can be more precise](https://arxiv.org/abs/1901.07059).
