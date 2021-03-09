---
layout: blog
title: "Evolution of M-Lab's Geographic and Network Annotations"
author: "Chris Ritzo"
date: 2021-02-22
breadcrumb: blog
categories:
  - research
  - data
  - pipeline
---

In our recent [roadmap post][roadmap], we shared a list of milestones that the team is
working on this and last quarter. Our Datatype migration and Standardized
Columns milestone references the [gardener service][gardener], which maintains and
reprocesses M-Lab data, as well as the [UUID annotator][uuid-annotator], that
generates and saves per-connection metadata as annotations to user-conducted
measurements. This post provides more detailed information about how these
services have annotated measurements with geographic and network information in
the past and present, and expands on what current work is happening now as
mentioned in our roadmap post.<!--more-->

[roadmap]: {{ site.baseurl }}/blog/roadmap-update/
[gardener]: https://github.com/m-lab/etl-gardener
[uuid-annotator]: https://github.com/m-lab/annotation-service

## Evolution of Annotations

Over our history, the M-Lab platform has changed quite a bit. Our post last year,
[Evolution of NDT][ndt-evolution], discussed changes to the NDT measurement
service over time, and touched on changes to our server instrumentation.
Similarly, how we have annotated measurements has evolved over this time as well.

[ndt-evolution]: {{ site.baseurl }}/blog/evolution-of-ndt/

When you choose to run one of the tests M-Lab provides, you're first connected
to one of our available servers nearest to you, through which the measurement is
conducted. That server collects the measurement, but actually not much else. As
measurements are collected, the IP address is used to provide _annotations_ that
provide more context and usefulness to research and analysis.

A big part of what makes NDT data interesting and useful are the annotated
fields allowing people to explore and aggregate by geography. 

The values each of our [tests][tests] collect varies depending on the
measurement service, but as an example, the NDT performance test collects:

* the packet headers collected during the test, used to calculate the
  measurement values
* the measurement values you see at the end of the test
* the IP address assigned by ISPs to routers, modems, or other on-premises devices

[tests]: {{ site.baseurl }}/tests/

The table below describes the historical changes to geographic annotations from
2009 to the present, as well as changes to the two sources of TCP statistics
used by M-Lab servers over our history:

| **Geo Annotations** | Dates in use | **TCP Statistics Source** | Dates in use |
|:-------------------:|:------------:|:-------------------------:|:------------:|
| **geo1, annotation-service** | 2009-01 - 2017-08 | web100 | 2009-01 -
2019-11 |   |
| **geo2, annotation-service** | 2017-09 - 2020-02 | tcpinfo | 2019-11 -
present | 
| **geo2, uuid-annotator**     | 2020-03 - present |  |  |

For Geo annotations, there are three time periods of interest:
* 2009-01 to 2017-08 - maxmind geo1 from annotation-service
* 2017-09 to 2020-02 - maxmind geo2 from annotation-service
* 2020-03 to present - maxmind geo2 from uuid-annotator

and for the Platform's TCP Statistics, there are two time periods of interest:
* 2009-01 to 2019-11 - web100 platform
* 2019-06 to present - tcpinfo platform

**geo1** annotations were provided on **web100** datatypes between 2009-01 and
2017-08, using the **[annotation-service][anno-service]**. This service sourced
geographic annotations for IP addresses from the Maxmind GeoLite Legacy database
edition, and IP address information from the [Routeviews dataset][routeviews].
Maxmind [discontinued in 2019-01][geolite-legacy]. Relevant to annotations of
M-Lab data, the **Region** field in Maxmind GeoLite Legacy used the [FIPS-10-4 standard][fips].

**geo2** annotations were provided on the **ndt5** datatype between 2017-09 and
2020-02, also using the **[annotation-service][anno-service]**. This change
replaced **geo1**, and uses IP geolocation data from the [Maxmind GeoLite2
dataset][geolite2] and IP address information from the [Routeviews dataset][routeviews]. The
Maxmind GeoLite2 dataset uses the [ISO 3166-2 standard][iso3166]
for the principle subdivisions within a country. For more information, see [this
update from Maxmind][maxmind-update].

[geolite-legacy]: https://support.maxmind.com/geolite-legacy-discontinuation-notice/
[anno-service]: https://github.com/m-lab/annotation-service
[geolite2]: https://dev.maxmind.com/geoip/geoip2/geolite2/
[fips]: https://en.wikipedia.org/wiki/FIPS_10-4
[iso3166]: https://en.wikipedia.org/wiki/ISO_3166-2
[routeviews]: http://www.routeviews.org/routeviews/
[maxmind-update]: https://dev.maxmind.com/geoip/geoip2/whats-new-in-geoip2/

In 2020-03, the **uuid-annotator** service was launched, providing annotations
for the **ndt7** datatype, using the Maxmind Geolite2 dataset, and IP address
information from the [Routeviews dataset][routeviews]. The uuid-annotator will
eventually replace the **[annotation-service][anno-service]** entirely. The
**uuid-annotator** also provides previously unused fields from Maxmind Geolite2,
such as the ISO 3166-2 second level subdivisions within a country, AS Name to
complement AS Number, and the accuracy radius of the IP address geolocation.

## Current Milestones In Support of Long Term Supported Schemas Using Standard BigQuery Columns

To enable our goal of [long term schema support][lts] and consistent annotations across
our archives, our team is working now to migrate the remaining datatypes
(tcpinfo, ndt5, ndt.web100, traceroute1, traceroute2, sidestream) from
the **annotation-service** to the **uuid-annotator**. One part of this process
is reconciling or mapping FIPS-10-4 and ISO 3166-2 subdivision codes, and
adding support in the [gardener service][gardner] to re-annotate correct ISO
codes in the ISO standard fields in our schemas. Accurate annotations for our servers are
also being added as well. For data collected prior to 2020-03, a process of
exporting synthetic uuid annotations and UUIDs is being designed, so that we can
preserve the original and the new measurement annotations, and retire the
annotation-service.

[lts]: https://www.measurementlab.net/blog/long-term-schema-support-standard-columns/
[gardener]: https://github.com/m-lab/etl-gardener/

## Wrap up

We hope that this post provides more detail on some items in our roadmap that
the team is currently working on completing. As always, if you have
questions please reach out on support@measurementlab.net.
