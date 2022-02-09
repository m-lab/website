---
layout: blog
title: "Analysis Recommendations in Context - ARC of Research pt. 1: Asking the Right Questions"
author: "Chris Ritzo"
date: 2022-02-09
breadcrumb: blog
categories:
  - ndt
  - bigquery
  - data
---

A while back, our team [published some analysis recommendations]({{ site.baseurl
}}/blog/mlab-data-policy-advocacy/) for anyone
working with our data from the Network Diagnostic Tool (NDT), comparing it to
other Internet measurement data sets, and drawing conclusions or inferences
about the data. These recommendations are intended to provide guidance about
analyzing crowdsourced data, because we know that it’s easy for analyses to end
up with what looks like a striking comparison or finding, but that may not
actually be supported by the underlying measurements or data. But because
recommendations are only that, we’re now beginning a series of posts to unpack
those recommendations with some context and examples. First, we’ll recap our
previous recommendations post with more context, and finish with an example that
we’ll continue working with in subsequent posts.<!--more-->

Since M-Lab started operations back in 2009, we’ve had many audiences. For some
of those audiences such as academic or industry researchers, the recommendations
made may be familiar. But for audiences that may not have training in
statistics, we hope the examples shown in this and in future posts will help
illustrate the need for more detailed and nuanced research when it comes to
looking at any dataset, but more specifically when analyzing our archives of
M-Lab’s open data.

## Recommendations about NDT data from M-Lab and comparing NDT data to other, similar data sources

Our previous post focused on differentiating what NDT measures on the M-Lab
platform, from similar datasets produced by other platforms. We wrote a [whole
other post about different data sources and what they measure or represent]({{
site.baseurl }}/blog/ntia/), so
if you haven’t read it, please take a look. 

If we have a question we’re hoping to answer with data, the question should be
clearly defined and the data we select to attempt to answer the question should
contain suitable measurements that can answer it. 

For example, while measurements from the NDT test and from Ookla’s Speedtest.net
both contain metrics like _download speed, upload speed, and latency_, that
doesn’t mean that we should expect them to be the same. In fact, we don't expect
that because of differing methodologies and different network paths covered by
these tools.

### What questions can NDT data help answer?

The D in NDT stands for diagnostic. Although it does report “speed” metrics,
this speed is more like the rate at which we can upload a single large video or
series of photos, or download the same. There are actually many metrics
available in NDT results that Internet researchers continue to examine. **For
example, the single stream “speed” metric doesn’t measure link capacity, but
rather how well a single TCP stream can take advantage of that capacity** [^1].
Other metrics concerning the latency of a connection may also be released as our
researchers uncover them. 

NDT measures how well the Transmission Control Protocol (TCP) performs over your
network, through your ISP’s network, to an available M-Lab server in the nearest
[Internet peering point](https://en.wikipedia.org/wiki/Peering) where they are
hosted. Peering points are essentially data centers where different network
operators interconnect between their respective networks for the purposes of
exchanging traffic.  Single-stream measurements do not attempt to emulate a
browser, but do reflect the performance of the basic building block for nearly
all applications, that is, the single streams themselves. Multiple TCP streams
will be more sensitive to loss than single streams, which is why NDT
measurements reflect an unaugmented model of TCP’s behavior. Single
stream-measurements like NDT do not measure link capacity, but a measurement of
TCP’s performance. In this sense NDT is a baseline measurement for a
connection’s performance.

But this baseline performance isn’t the same as measuring how much total “speed”
you’re able to get over the connection, which is often called link capacity.
When people ask whether they’re “getting the speeds they pay for” over their
Internet connection, they’re looking for the maximum rate that can be uploaded
or downloaded through their connection. 

Some questions/topics that NDT data can help answer then are:

* Measuring the interconnections between independent networks
* Identifying the bottleneck between users and the Internet
* Aggregate break down by ISP, time of day, day of week, IP address subnets
* Aggregate break down across different destination transit providers

## Analyzing and illustrating any data

Next, let’s review the analysis recommendations our team made back in Feb. 2021:

* Don’t oversimplify too early in your analysis
  * Aggregate by ISP in addition to time, date and location
  * Be aware of and illustrate [multimodal distributions](https://en.wikipedia.org/wiki/Normal_distribution)
* Use histograms and logarithmic scales
* Take into account, and compensate for, client bias and population drift**

These recommendations cover a lot of ground! We’ll start with some ideas for not over simplifying in this post, and follow up with more details on the others in subsequent articles.

## Don’t oversimplify _too early_ in your analysis

When working with data of any sort, we want to get to a point in our analyses
where we can explain what the data is telling us in a simple and straightforward
way. In the original post, we suggested “Don’t Oversimplify”, but really we do
want to eventually simplify, just not “too early” in the research. In a desire
to get a simple summary metric, particularly when that metric is intended to be
used as ground truth for some decision, it’s important to not rush to the goal
line before considering as many of the issues with the underlying data itself as
we can.

In our analysis recommendations post we talked about several topics relating to
the care one needs to take when producing simple aggregate statistics like mean
and median, which is critical when the analysis seeks a summary metric. Here are
some example research questions that might help guide our inquiry:

* **A state official interested in how broadband is performing in different
  regions of their state might ask:** 
  What are the median download speeds for zip codes in my state?
* **To research how well an ISP is performing, an analyst might ask:*
  What is the average latency of subscribers to a specific ISP in the first two quarters of 2020?
* **And to better understand how the Internet performs depending on what country
  someone’s in, a journalist might ask:**
  How did each country rank when it comes to upload and download speeds last year? 

First, it’s important to acknowledge that each of these questions are legitimate
things that people want to know. Each example research question describes the
specific thing that someone wants to answer. We don’t want to discourage anyone
from asking questions. But we also want to help ensure that the right follow-up
questions are asked to help get to a defensible answer. At face value, each of
these _could be answered_ by queries to our archive for basic summary statistics
of NDT data, but _should it be_ or _can it be answered by NDT_?

The short answer, with the above framing of the example questions, is probably
not. In each of the examples above, a metric is desired to help understand what
measurements demonstrate about broadband connections. But as we wrote in our
[post about different broadband datasets presented by the NTIA]({{ site.baseurl
}}/blog/ntia/), when most people ask these sorts of questions, they are asking
in relation to the service level that they’re subscribed plans advertise, or
whether in general service as measured is above or below the FCC’s standard for
broadband. NDT doesn’t measure either of those things.

**NDT is a diagnostic test that measures using a single TCP stream. The single
stream “speed” metric doesn’t measure link capacity, but rather how well a
single TCP stream can take advantage of that capacity.**

This distinction illustrates why we should interrogate any assumptions in our
research questions and get as specific as possible. If our desired metric
doesn’t align with what the instrument measures, we can still look at the
measurements, but the metrics don’t answer our questions correctly.

Below we’ve made some suggested updates to our example research questions, and
added a second question that separates what could be answered by Ookla data and
what could alternately be answered by NDT data:

|     | **Answered by Ookla** | **Answered by NDT** |
|:-------------------:|:-------------------------:|:------------:|
| **A state official interested in how broadband is performing in different regions of their state might ask:** | How did aggregate download speeds per ISP in each zip code in my state compare with the national broadband standard? | How did the TCP protocol perform per ISP in each zip code in my state when testing beyond ISP last mile networks? |
| **To research how well an ISP is performing, an analyst could ask:** | What is the average latency between an ISP’s subscribers to a location near the edge of their ISP’s network in the first two quarters of 2020? | What is the average latency between an ISP’s subscribers and a geographically nearest location outside that ISP’s network in the first two quarters of 2020? |
| **And to better understand how the Internet performs depending on what country someone’s in, a journalist might ask:** | <span class="red">How did each country rank when it comes to upload and download speeds last year?</span> | <span class="red">How did each country rank when it comes to upload and download speeds last year?</span>|

In the first question we’ve added “per ISP” to segment the analysis by provider,
and specific text that better describes what each dataset can tell us. Question
two adds a time boundary of six months, but doesn’t include a geographic
specification. To refine further, we could add time boundaries to question one,
which we might want to do so our analysis aligns with the results with the time
scales of other datasets. For example Ookla’s aggregate public data is released
per quarter and the FCC’s Form 477 data is released every six months. Question
two could be refined by referencing geographic boundaries of interest. Combining
them, we might arrive at a workable starting point for our analyses:

1. How did aggregate download speeds and latency per ISP in each zip code in my state compare with the national broadband standard in 2020?
2. How did the TCP protocol perform per ISP in each zip code in my state when testing beyond ISP last mile networks in 2020?

<br />
You’ll note that the third research question is unchanged, and <span class="red">highlighted it in
red</span>. The reason is to illustrate a question that is way too broad to be adequately answered by either dataset. We could produce a ranking of aggregate
speeds for all ISPs together in a country over an entire year with NDT or Ookla
data, but the result wouldn’t tell us much about the real state of service in
each country. 

This discussion and refining of the questions we’re asking is meant to
demonstrate the importance of designing question that are specific, and
understanding the available data source(s) enough to confirm which can
potentially answer them.

In the next post in this series, we’ll dig deeper into the questions we’ve
refined here and walk through an example exploration of Ookla and NDT data.

[^1]: Clark, David; Wedeman, Sara, [Measurement, Meaning and Purpose: Exploring the M-Lab NDT Dataset](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3898339)