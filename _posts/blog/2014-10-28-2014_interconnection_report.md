---
layout: blog
title: "ISP Interconnection and its Impact on Consumer Internet Performance: Introducing A New M-Lab Consortium Technical Report"
author: "Chris Ritzo"
breadcrumb: blog
categories: 
  - research
  - interconnection
  - consumer internet
  - performance 
---

# ISP Interconnection and its Impact on Consumer Internet Performance: Introducing A New M-Lab Consortium Technical Report

![Sample graph from this report.]({{ site.baseurl }}/images/blog/cogent-from-lax-diurnal.png){:.pull-right}

We are happy to announce the release of a long-term collaborative research effort using M-Lab’s data to understand how interconnection impacts end-user performance. The report, [ISP Interconnection and its Impact on Consumer Internet Performance]({{ site.baseurl }}/publications/M-Lab_Interconnection_Study_US.pdf) examines years of network measurement data from across the United States to determine the effects of network interconnection on the Internet performance of customers subscribing to specific access ISPs. Alongside this report, we are also pleased to release the [Internet Observatory]({{ site.baseurl }}//observatory) – a dynamic data visualization tool that will allow consumers, policymakers, and researchers to better understand the impact of ISP relationships on their own Internet access and performance. The Internet Observatory will be updated regularly, allowing future monitoring and comparison against past performance.

<!--more-->

In researching our report, we found clear evidence that interconnection between major US access ISPs (AT&T, Comcast, CenturyLink, Time Warner Cable, and Verizon) and transit ISPs Cogent, Level 3, and potentially XO was correlated directly with degraded consumer performance throughout 2013 and into 2014 (in some cases, ongoing as of publication). Degraded performance was most pronounced during peak use hours, which points to insufficient capacity and congestion as a causal factor. Further, by noting patterns of performance degradation for access/transit ISP pairs that were synchronized across locations, we were able to conclude that in many cases degradation was not the result of major infrastructure failures at any specific point in a network, but rather connected with the business relationships between ISPs.

This research was conducted over the course of months by a large collaborative of researchers from within M-Lab and externally. Part of our commitment to open data and reproducible Internet science stems from our conviction that the sum of multiple perspectives produces better, richer interpretations, and thus improves our collective understanding more powerfully.

To help facilitate review, reproduction, and expansion of this work, M-Lab is providing the research community with [Telescope](https://github.com/m-lab/telescope) a tool designed to make extraction of raw measurements simple and to allow easy reproduction of this and future research. Beyond telescope, and in keeping with our core principles, M-Lab makes its full dataset and methodological documentation [available in the public domain](https://console.developers.google.com/storage/m-lab/interconnection-study-2014/) Please review, revise, and join the discussion on our [research discuss mailing list](https://groups.google.com/a/measurementlab.net/forum/?fromgroups#!forum/discuss).

Submitted by Chris Ritzo, on behalf of the M-Lab Consortium and all of the researchers who dedicated countless hours to understanding M-Lab data and crafting this report.
