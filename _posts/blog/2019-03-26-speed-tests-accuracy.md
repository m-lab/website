---
layout: blog
title: "How fast is my Internet? Speed Tests, Accuracy, NDT & M-Lab"
author: "Peter Boothe, Georgia Bullen"
date: 2019-03-26
breadcrumb: blog
categories:
  - speed
  - accuracy
---

**‘How fast is my Internet?’**

It seems like a simple question, but in fact there are several ways to approach the question and no one correct way to answer it. Given that there are so many different methods used to measure Internet speed, it’s not surprising that we get emails asking about people’s Internet connection speeds almost every day. There’s actually an area of academic study around this question — the [Internet Measurement Community](https://www.sigcomm.org/events/imc-conference){:target="_blank"}, which strives to develop scientifically rigorous methodologies that can be used to measure different aspects of Internet connectivity.<!--more-->

A question we are often asked is, “Why are M-Lab’s results different than other speed tests?”

The simple answer is that M-Lab uses a specific measurement tool and testing protocol that was developed by network researchers at Internet2. There’s a lot more to it, so we’ve developed a [FAQ]({{ site.baseurl }}/faq/#why-are-my-m-lab-results-different-from-other-speed-tests), but we also thought it would be worthwhile to dig a little deeper and write about our work measuring Internet speed, the importance of accuracy and disclosure, and why openness and methodological transparency matters.

At M-Lab, we believe that to best understand Internet connectivity, you need transparent and open measurement tools, open data, and multiple different types of measurements that assess different aspects of broadband speed. M-Lab is an open platform available to scientific and research community, we welcome anyone wishing to develop additional measurement tests that create a diverse array of open, peer-reviewed measurements for the community to analyze.

**Internet “Speed”**

There is no one definition of what people might mean when they say "Internet speed". Several academics in the Internet Measurement field have [outlined several different existing methods]({{ site.baseurl }}/publications/#understanding-broadband-speed-measurements) or have tried specific methods like measuring [broadband performance from the gateway]({{ site.baseurl }}/publications/#broadband-internet-performance-a-view-from-the-gateway).  Consumers want a speed test to determine whether they are “getting what they pay for.” Though the US Federal Communications Commission has set an official definition  “broadband” (i.e., 25 Mbps download & 3 Mbps upload speed), to our knowledge no agency has set standards for how those benchmarks ought to be **verified** or **measured**. In fact, the debate over the establishment of an open and transparent measurement protocol is itself a highly contentious (often all too political) unto itself.

The notion that all “speed tests” should report roughly the same results is widely held. However, because various speed tests use differing methodologies to measure different aspects of broadband speed (for example, the speed within your local provider’s network vs. the speed to the Internet outside of your ISP’s own system), the results can differ. In our [FAQ]({{ site.baseurl }}/faq/#why-are-my-m-lab-results-different-from-other-speed-tests), we explain how our server placement and testing methodology works and how our testing protocol can affect our results.

M-Lab servers are located outside of ISP last mile networks, and therefore tests from consumers traverse the locations (the “peering points”) where ISPs connect their networks to the rest of the Internet. In contrast, many popular speed tests (especially those financially supported by the ISPs themselves) are frequently hosted at the edge and often inside the ISP’s networks, so their measurements anecdotally are usually higher than NDT hosted on M-Lab. In much the same way that the speed within your home or office network can be much faster than your Internet connection, the speed within an ISPs network may be faster than your connection to the rest of the Internet. Independent speeds tests looking at speeds outside of an ISP’s network (i.e., to the Internet as a whole) often tend to generally agree, which is why M-Lab measurements are on-par with Akamai's measurements (Akamai also utilizes a testing methodology whose server architecture is similar to M-Lab’s). On the other hand, many of the speed tests that you see in various app stores, are simply downloading a file from a server on a content delivery network that is often located within a local ISP’s network — which, while an important thing to measure, is only part of the story.

The main “speed test” M-Lab uses (and which over 1 million people a day run) is called the Network Diagnostic Tool (NDT). NDT is actually more than a “speed” test, it was designed originally to measure a variety of different network connection variables to help diagnose network issues. In the NDT design, both “single stream” and “multi-stream” testing is possible (as we’ll explain later, the number of streams is another key factor distinguishing the speed test methodology and the corner cases in which a test return faster results). NDT is an [open source](https://github.com/ndt-project/ndt){:target="_blank"} project, and so can be hosted by anyone wishing to run an NDT server on their network. M-Lab runs NDT as one of the experiments on all of our over 500 servers around the world.

M-Lab’s NDT test uses a single stream test because it more accurately measures a connection's capacity for "bulk transport" (as defined in IETF’s [RFC 3148](https://tools.ietf.org/html/rfc3148){:target="_blank"}, if you’d like to learn more about that standard). Therefore it would be most precise to say that M-Lab's NDT test measures "single stream performance" or "bulk transport capacity". The results of multi-stream tests conversely would be described as "aggregate capacity", describing measurements where the level of aggregation is specified and bound, for example: "100 Mb/s aggregate capacity using 4 streams." Many other tests use a multi-stream test, however, because their measurement tools are proprietary and closed source, we cannot verify what specific protocols or standards they are following (if any).

**Let’s get Technical.**

The two main design choices that characterize M-Lab's hosted NDT test — server placement at Internet exchange points and a single stream test protocol — leverage specific strengths and contain inherent limitations vis-a-vis many other Internet speed tests. To make the technical discussion below make some sense, we need to establish some terms of art:

* The “bottleneck bandwidth speed” along an Internet path is the data rate which causes congestion on the slowest link on a network path. Generally speaking, a higher bottleneck bandwidth speed is better, because it allows more data to be downloaded per second.
* The "latency" is the time it takes for a single packet to travel from a server to a client and back. In other contexts, "latency" is sometimes called "ping time" or "round trip time". Generally speaking, lower latency is better, because it makes network-based applications more responsive.

NDT's accuracy depends in large part on a combination of the properties of the network being measured, as well as the definition of "Internet speed" under consideration. Setting aside the definition of "Internet speed" for later, the accuracy of NDT can be described as follows:

* If the bottleneck bandwidth speed on a path is **low** then, regardless of latency, NDT gets an accurate result for most reasonable definitions of "Internet speed".
* If the bottleneck bandwidth speed is **high** and latency is **low**, then NDT gets an accurate result for most reasonable definitions of "Internet speed".
* If the bottleneck bandwidth speed is **high** and latency is **high**, then, depending on the definition of "Internet speed" in question, NDT may return a result that is thought to be lower than other measurements or may return a result that is thought to be accurate. However, this "low measurement" is an accurate reflection of the fact that even if you buy gigabit Internet access, you very rarely can actually download anything at a gigabit per second.

NDT essentially measures how fast a file can be downloaded along a full Internet path via a single download stream, and, as such, its measurements precisely and accurately mirrors the user experience of accessing files on the Internet. But this is only one reasonable definition of Internet speed.

For **high bandwidth** links with **high latency**, the accuracy of NDT depends on what you think "Internet speed" is:

* If you think "Internet speed" is "the speed at which I can download a thing", then NDT is accurate.
* If you think "Internet speed" is "the maximum sum total of bits I can push across the local link, although the flows may need to be spread around to different locations so in order to actually achieve that level of saturation" then NDT’s results would likely be systematically lower.

Therefore, the differences among testing regimes is the greatest when link speeds and latency are both high, and these different regimes are implicitly based on different underlying assumptions around the term "Internet speed".

Another cause of divergence between testing regimes is NDT's single stream.  When using a single stream, the measurement system reacts more strongly to spurious packet loss ("noise"). A typical case where a user may want to run a speed test is when they think that their Internet connection is not performing well. This perceived underperformance may be caused by poor Wi-Fi signal, congestion within their ISP’s network, or congestion between ISPs. A multi-stream speed test is less sensitive to spurious packet loss than a single-stream speed test. When noise causes one connection to slow down, other connections can ramp up their download speeds to "fill in the space" left by the injured connection. Therefore, a single stream test is more helpful to confirm performance issues across a path than a multiple stream test. A multiple stream test is likely to provide a  result that mirrors the maximum stream connection speed and hides the problem. This is another way in which in which differences among testing regimes are magnified due to differing definitions of "Internet speed".

Over the last 10 years, M-Lab has welcomed a variety of open source Internet measurement tests onto its open platform. M-Lab has donated its infrastructure to the research community in pursuit of open science, requiring only that tests be open source, methodologies be transparent, and the data collected be open and freely available to others in this research community. Every measurement that our users make is a contribution to the scientific community, and helps researchers, policy makers, and individuals study connectivity issues, analyze edge cases, solve problems, and contribute to improving the Internet as a whole.

In 2019, we have been working to [upgrade]({{ site.baseurl}}/blog/modernizing-mlab/) the [platform]({{ site.baseurl }}/blog/mlab-20-platform-migration-update/) and roll out a new version of NDT. This new version, which we have been calling [ndt7](https://github.com/m-lab/ndt-server/tree/master/ndt7){:target="_blank"}, uses BBR-based TCP flows to improve performance in high-latency, high-bandwidth cases.

In keeping with M-Lab's commitment to openness, the code (still under development) for this new service can be found in the ndt7 subdirectory of [https://github.com/m-lab/ndt-server](https://github.com/m-lab/ndt-server){:target="_blank"} and we welcome peer review and programming assistance from scientists and network researchers.

Want to help improve the internet? Run a [test]({{ site.baseurl }}/tests/). Work with the [data]({{ site.baseurl }}/data/). [Integrate]({{ site.baseurl }}/develop/) the tests into your software. [Reach out](mailto:support@measurementlab.net), we’re happy to help!
