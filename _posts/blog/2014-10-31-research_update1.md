---
layout: blog
title: "Research Updates: Beginning to Observe Network Management Practices as a Third Party"
author: "Collin Anderson"
date: 2014-10-31
breadcrumb: blog
categories:
  - research
  - tos
  - interconnection
---

Prior to the publication of our recent report, [ISP Interconnection and its Impact on Consumer Internet Performance]({{ site.baseurl }}/publications/isp-interconnection-impact.pdf), we shared review copies with members of the research community, broadening the set of eyes on our methods and challenging our assertions. We received valuable feedback that allowed us to improve what we published, along with a list of research questions that we will be exploring and documenting over the coming months in our Research Updates series of blog posts adding insights to Research Reports.

<!--more-->

One of the most common questions from reviewers was the change in performance in late February 2014 for AT&T, CenturyLink, Comcast, Time Warner Cable, and Verizon traffic across U.S. Cogent sites. As a graph included in the published report demonstrates (Figure 7), the data shows a sharp remediation in performance across all Access ISP networks in February 2014 for Cogent hosted sites. (The graph covers Los Angeles, but this pattern was repeated across all Cogent hosted sites.)

![Median download throughput achieved by customers of AT&T, CenturyLink, Comcast, Time Warner Cable, and Verizon in the Los Angeles area when connecting across Transit ISP Cogent, January 2014 to September 2014]({{ site.baseurl }}/images/blog/blog1-graph.png)

This February 2014 time period is notable because the sharp remediation occurs across all affected Access ISPs simultaneously. This is observed despite published media reports that business decisions in 2014 to alleviate congestion between ISPs, transit networks, and major content providers did not happen simultaneously. Based on the M-Lab data, it was not possible to determine the cause of this event in our recent report. However, since this remediation represents an important event related to business decisions and traffic patterns, we chose to present it here to the research community in the first of our follow-up posts.

In the interest of further investigating this sharp change, we began to audit the raw **_ndttrace_** log files retained after the NDT test (and available in *[BigStore](https://console.developers.google.com/storage/m-lab/ndt/)*) to see if we could observe patterns that could help explain the sharp performance change.

And, we found something. In the course of this investigation, researchers identified a shift in the marking of the standard ‘type of service’ (ToS) IP header field of incoming packet. This change began February 2014, and correlated with the increased performance observed across Cogent hosted sites. This field is typically used to indicate to routers along the path of a network what the priority and policy for handling the traffic should be. In the case of measurements against M-Lab servers, this field was set to a value that corresponds to ‘Immediate’ priority.

Using the New York Cogent site as an indicator, at the beginning of February 2014, only a tenth of sampled incoming measurements to M-Lab endpoint servers observed packets with a marked ToS field. On February 20, 2014, this number increased to 30% and within five days, this number increased to around 94% of measurements. As Figure 7 demonstrates, a similar increase in download throughput across sites occur at this time. Based on preliminary samples from October 2014, it appears that this quality of service policy continues.

Below we show an example of the ToS field in the IP header of packets received from a Verizon FIOS customers on February 28, 2014 from the data we extracted. Those wishing to explore this more fully are welcome to access the NDT data archives from [BigStore](https://console.developers.google.com/storage/m-lab/ndt/). Each M-Lab site should have an extensive sample of ndttrace files.

```text
    16:21:09.973746 IP (tos 0x48, ttl 55, id 23787, offset 0, flags [DF], proto TCP (6), length 1500)
        pool-108-41-239-212.nycmny.fios.verizon.net.57090 > 38.106.70.160.40047: Flags [P.], seq 3337041:3338489, ack 0, win 8235, options [nop, nop,TS[|tcp]>
             0x0000:  4548 05dc 5ceb 4000 3706 17e1 6c29 efd4  EH..\.@.7...l)..
             0x0010:  266a 46a0 df02 9c6f 241b 4941 fb8f 03bf  &jF....o$.IA....
             0x0020:  8018 202b f194 0000 0101 080a            ...+........
```

![Example of ToS field in the IP header of packets received from a Verizon FIOS customers on February 28, 2014 from the data we extracted]({{ site.baseurl }}/images/blog/blog1-image2.png){:.inherit-width width="100%"}<br />
What does this indicate? It indicates that the recovery from the degradation in performance observed prior to February 2014 may not have been experienced by all consumers.

Why this was applied to M-Lab traffic, or if it was applied more broadly, or if it was applied across all traffic is not clear. What this finding highlights is that network management and the differences in treatment of traffic is instrumental to the performance of consumer access. More importantly it reaffirms the importance of transparency and open data in providing the public with a clear understanding of Internet performance.

We will be exploring this topic and others in upcoming research, looking across the data in the US and elsewhere to see if we can observe other patterns in the IP headers, routes or other data artifacts, and when and if we do, working to understand how these correlate with observed changes in performance.

Collin Anderson, on behalf of M-Lab researchers

---

> ***Footnote:** Since the publication of this blogpost, an informative discussion has occurred* *[on the Measurement Lab mailing list](https://groups.google.com/a/measurementlab.net/forum/#%21topic/discuss/vcQnaZJO6nQ)regarding the scope of this network management policy and operational decisions behind its implementation. M-Lab is committed to reproducible and open research on network performance that can be derived from measurement, which often limit our ability to interrogate questions of why a policy is in place. We are happy to see that open data has lead to extensive conversations by not only a small community of network researchers or policy advocates, but the broader public and even network operators. We look forward to expanding this research over the course of the next year and appreciate the feedback we have received from a diversity of voices.*
