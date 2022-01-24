---
layout: blog
title: "Revisiting National Broadband Datasets and Maps"
author: "Chris Ritzo"
date: 2022-01-24
breadcrumb: blog
categories:
  - ndt
  - ookla
  - data
  - statistics
---

When thinking about broadband in the United States, the first thing people
likely think about is whether their connection is fast enough-- are they
getting the speeds they need to do business, go to school, etc. The dominance of
“speed” in assessing broadband service goes all the way to the top- the FCC
defines broadband according to the achievable download and upload speeds to the
Internet. But generic speed test measurements only go so far in observing a
connection’s performance, and M-Lab and the research community are working to
expand the concept of broadband measurement beyond basic speeds.<!--more-->

To illustrate why we’re suggesting new approaches to measurement are needed,
let’s take a look at some recent examples of national level aggregate data that
communities are using to inform their planning for new infrastructure dollars.
One starting point is the [NTIA’s Indicators of Broadband Need map](https://broadbandusa.maps.arcgis.com/apps/webappviewer/index.html?id=ba2dcd585f5e43cba41b7c1ebf2a43d0), which we
[wrote about this summer](https://www.measurementlab.net/blog/ntia/). Our goal with that post was to provide context and
provenance of the different data sources presented in the map, since each
represents a different type of measurement of an Internet connection. While we
are pleased to have NDT data from M-Lab represented in the map, there are some
issues with the presentation that could make this data confusing at a basic
level, and at worst could lead to incorrect conclusions.

Our post from July 2021 discussed the various data sources in the NTIA Indicators map
in relation to the FCC’s current definition for a broadband connection-- one
that advertises 25 Mbps download and 3 Mbps upload speeds to the Internet. In
most ISP’s terms of service, those speeds are the maximum possible speeds, not
those that we should expect to receive 24/7/365. So when we look at the NTIA
map, we can easily compare some of the most common broadband data sources, but
there are some questions that are worth exploring further:

* Why are **median** upload and download speeds presented instead of the average maximum speeds?
* What are the speeds broken down by provider in the map? Why aren’t those included?
* The NTIA map provides aggregate data for one six month period, and they plan to provide additional 2 quarter time periods following the FCC’s Form 477 release cycle. Considering that networks likely change more frequently, why are other, smaller time periods like quarter or month not available?

## NTIA’s Data Source for NDT Statistics

NTIA is using aggregate NDT data from M-Lab using an approach very similar to
our own [Statistics Pipeline Service](https://github.com/m-lab/stats-pipeline/), which provides aggregate statistics for NDT
tests which follow [our team’s recommendations for working with NDT data](https://www.measurementlab.net/blog/mlab-data-policy-advocacy/). The
statistics can be accessed using an [API](https://github.com/m-lab/stats-pipeline/blob/master/docs/api-structure.md), or within our [public BigQuery tables](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=statistics&page=dataset) in
the dataset, `measurement-lab.statistics`. For each day, we provide a histogram
of measured download and upload speeds, and overall daily statistics. As of this
writing, the statistics pipeline service provides this data from Jan. 1, 2020 to
present.

## Including other metrics than median

What people are really wanting to compare when they look at the NTIA map is
whether their locale is meeting the FCC’s broadband standard in light of the
agency’s Form 477 reported data about availability of service. But when we’re
talking about the standard and “getting what you paid for”, the map may lead to
wrong assumptions.

The advertised speeds of providers’ service tiers are not guaranteed, but are
the speeds up to which your service can perform. As we [explained in our post](https://www.measurementlab.net/blog/ntia/#different-platforms-and-their-measurements-tell-us-different-things), an
Ookla speed test most closely aligns with the advertised speeds that your
connection may reach. NDT is a diagnostic test that measures using a single TCP
stream. The single stream “speed” metric doesn’t measure the connection’s link
capacity, but rather how well a single TCP stream can take advantage of that
capacity. While M-Lab researchers have suggested that the ndt7 protocol may be
able to also provide a link capacity metric, Ookla is currently more suitable to
directly measure link capacity. 

If I were to run an Ookla test a few times a day over a month or two from my
home network, I could have a fairly accurate representation of upload and
download speed that is tied to the service that my ISP delivers in their last
mile network [^1]. I could also run an NDT test to see an accurate representation of
TCP’s performance to the geographically nearest M-Lab server outside of my ISP’s
network. I could look at the trend in tests over time and might look at the
average of maximum measurements for each day over the two months. 

But the example above is only useful to me as an individual- I know my ISP,
connection plan, cost, etc. Which is why reporting something other than median
speeds in the NTIA tools would be helpful. For example, the query NTIA is using
includes the minimum, median, and maximum aggregate upload and download
measurements, but also includes the 10th, 25th, 75th, and 90th percentiles.
M-Lab’s [stats-pipeline](https://github.com/m-lab/stats-pipeline) currently provides the 25th and 75th percentile
aggregations, and [we’ll be adding others](https://github.com/m-lab/stats-pipeline/issues/71) in upcoming releases to support data
integrations like the NTIA directly in the future.

While M-Lab has also published median speeds from NDT, we no longer recommend
looking at only median or average in the context of advertised broadband speeds.
In the past, M-Lab used the median metric because of its use within the FCC’s
Measuring Broadband America Program (MBA) reporting of (among other metrics) the
ratio of weighted median speeds to advertised speeds for participating ISPs
[^2]. The median of measurements can be representative of the performance
achieved
by a sampling of tests, but while [researchers can infer the speed tiers of
testers over a sample of NDT tests](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3898339), M-Lab doesn’t know directly the tiers of
service for people running them. Additionally, crowdsourced measurements (NDT
and those of other platforms), while having large volumes of tests are also more
challenging to use when selecting a representative sample. Unless we are
collecting NDT data from known clients, as is possible with
_[Murakami](https://www.measurementlab.net/blog/murakami/)_, a representative
sample can be difficult to gather. 

## Aggregation by provider

In its current form, the NTIA is providing aggregate speeds from NDT and Ookla
for geographic areas. While this might give us a general idea of Internet
service as measured by these tools in a county, state, or territory, it also is
not very specific. Including aggregation by provider in each geography and time
period would better represent the service of individual ISPs instead of all of
them together.

While aggregating by provider is desirable, it is not available in NTIA’s public
map. We don’t have access to NTIA’s private tool for state and tribal broadband
offices, but Ookla data at the provider level may be available within it since
Ookla does market this data in their product offerings.

M-Lab publishes aggregate data by provider by default, using the [Autonomous
System Number](https://en.wikipedia.org/wiki/Autonomous_system_%28Internet%29) and Name (ASN) of the company using each IP address at the time
tests are run. While NTIA doesn’t include this aggregate by ASN in their tools,
it is [available in our statistics
pipeline](https://github.com/m-lab/stats-pipeline/blob/master/docs/api-structure.md#available-geographies-and-asn-aggregations),
and presented on our available [DataStudio reports](https://www.measurementlab.net/visualizations/).

M-Lab recommends that analyses always include breakdown by ASN for NDT data,
unless there is a specific reason to not do so, since it more accurately
reflects the measured performance of each individual provider. **It’s worth
mentioning that we have started to decline support requests that contradict
these recommendations.**

In 2020, an organization asked M-Lab to provide aggregate data for regions
within countries in the European Union for the year 2019. The request was for
aggregate NDT data for each region over the entire year without breakdown by ASN
or provider. Because we did not think this would accurately represent either the
state of broadband service as measured by NDT, we declined to continue
contributing data to the initiative. We have also declined requests to endorse
reports that rank countries across the world by the speeds that NDT measures.
Our data remains publicly available, so these organizations could perform their
own queries and analysis if they desire, but we strongly encourage the use of
the appropriate methods to ensure analyses and conclusions are sound.

## Aggregate by smaller time periods

The NTIA tools provide NDT and other data sources aggregated in a single 6 month
time block: January 1, 2019 through June 30, 2019. NTIA also plans to provide
additional snapshots of aggregate data over additional time periods, following
the release pattern of the FCC’s Form 477 data. While it makes sense to look at
the same time periods for all data sources, being able to select a different
date range for data sources that aren’t bound to the twice annual Form 477
release can provide deeper insights. Networks can change a lot over 6 months,
particularly if they’re being upgraded or when infrastructure investments are
getting rolled out. Being able to slice data collected before and after such
events would be helpful to communities. Ookla’s public data is released in one
quarter time periods, and more granularity is available from their product
offerings. M-Lab makes all individual NDT test data available, so literally any
time period is possible. 

## Conclusion

While M-Lab encourages research with our data and with other broadband data
sources, we also are increasing our capacities internally to support and conduct
research; providing clearer analyses and recommendations for people conducting
analyses with our data; explaining our test results and providing context to end
users who conduct tests; and engaging with the research community to determine
gaps in measurements that would better inform an ecosystem of Internet
measurement research.

We know people will continue to use M-Lab data for their analyses, and want to
support them as best we can. As a start to that, we’ll be following up on many
of the ideas presented here, and on [our initial recommendations for analysis](https://www.measurementlab.net/blog/mlab-data-policy-advocacy/)
published last year, with a series of posts on how to approach working
with our crowdsourced NDT data. Our research team is also working on new methods
to improve the NDT statistics provided in our statistics pipeline. 

<hr style="width:200px;" id="footnotes">

[^1]:  An ndt7 test will use BBR. You can read more about BBR, congestion
    control algorithms and the evolution of NDT here:
    [https://www.measurementlab.net/blog/evolution-of-ndt/#evolution-of-ndt](https://www.measurementlab.net/blog/evolution-of-ndt/#evolution-of-ndt)

[^2]: [https://www.fcc.gov/reports-research/reports/measuring-broadband-america/measuring-fixed-broadband-tenth-report/#_Toc43144657](https://www.fcc.gov/reports-research/reports/measuring-broadband-america/measuring-fixed-broadband-tenth-report/#_Toc43144657)

