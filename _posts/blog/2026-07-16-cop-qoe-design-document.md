---
layout: blog
title: "RFC: Design Document on Quality of Experience Measurements for Schools"
author: "Simone Basso"
date: 2026-07-16
breadcrumb: blog
categories:
  - community 
  - announcement
  - design
  - qoe
  - research
---

<img src="{{ site.baseurl }}/images/blog/2026-02-26-giga-mlab-cop/giga_x_m-lab.jpg" alt="Giga M-Lab"/> 

We are excited to announce [the first public draft of a design document][dd]
describing Quality of Experience (QoE) measurements for schools. This design
document has been co-authored by M-Lab and [Giga][giga] staff members as
part of our collaboration to strengthen how connectivity is measured and
understood for public facilities, and especially schools. We encourage
all members of the [Connectivity Community of Practice (CoP)][cop-launch] to review, provide feedback, and
contribute to our initial design.<!--more-->

[cop-launch]: https://www.measurementlab.net/blog/giga-mlab-cop/
[dd]: https://github.com/unicef/giga-mlab-school-connectivity-cop/blob/main/materials/qoe-measurements-design.md
[giga]: https://giga.global/
[qoe]: https://en.wikipedia.org/wiki/Quality_of_experience

## Background

Measurement Lab (M-Lab) runs the world's largest open collection of
internet performance data and provides real-world telemetry that helps
illuminate how networks actually perform. [Giga][giga] is a joint
initiative by [UNICEF][unicef] and the [ITU][itu] aiming to connect every
school to the internet and every young person worldwide to information,
opportunity, and choice.

[unicef]: https://www.unicef.org/
[itu]: https://www.itu.int/

The [Connectivity Community of Practice (CoP)][cop-launch], launched by M-Lab and Giga, brings together researchers, network
engineers, implementers, and policymakers, to advance network measurement
approaches for public facilities with specific focus on schools. The CoP
goals include supporting the design of network measurements that are
technically rigorous, globally comparable, and practical for real-world
connectivity contexts and underserved regions.

[cop-launch-event]: https://www.measurementlab.net/blog/cop-launch/

Currently, [Giga][giga] measures schools using the [Giga Meter][giga-meter]
computer program, which schools can install to periodically run network
measurements including M-Lab's flagship network performance test,
[ndt7][ndt7].

Part of the CoP's [research agenda][cop-research-agenda] is to extend and improve upon the
measurements currently performed by [Giga Meter][giga-meter].

This effort produced [a draft design document][dd] that today we are
opening up and sharing with our community 
for additional comments, feedback, and suggestions.

[giga-meter]: https://meter.giga.global/
[ndt7]: https://www.measurementlab.net/tests/ndt/ndt7/
[cop-research-agenda]: https://github.com/unicef/giga-mlab-school-connectivity-cop/blob/main/research_agenda.md

## Design Document Overview

The [draft design document][dd]'s main objective is to perform additional
network measurements for surfacing network metrics related to the QoE. 
The basic idea is the following:

1. [ndt7][ndt7] collects network metrics including [tcp-info][tcp-info]
providing a baseline of the expected network performance for a single
user (who, in the context of the collaboration with [Giga][giga], is a
student in a school facility).

[tcp-info]: https://www.measurementlab.net/tests/tcp-info/

2. However, [ndt7][ndt7] exercises the network under a bulk transfer
regime (e.g. how fast can I download software updates or how fast
can I start streaming a video?) and additional internet usage regimes
exist, including the latency-bound (e.g. resolving domain names using
the DNS and browsing the web) and real-time (e.g. audio or video
calls using the internet) regimes.

3. Therefore, while [ndt7][ndt7] helps to characterize the envelope,
additional network measurements could pinpoint how the internet
connection behaves under different stress regimes.

To this end, the design document introduces additional network
measurements including:

1. DNS (over UDP and HTTPS) lookups towards public resolvers.

2. The fetching of web resources relevant for education (including
collecting the time spent in the DNS, TCP, and TLS stages before
getting the actual resource itself).

3. TCP streaming at set speeds (e.g. 5 Mbit/s).

4. Multi-stream tests using [MSAK][msak].

[msak]: https://www.measurementlab.net/blog/introducing-msak/

The plan is to co-develop this set of extra measurements side by
side with [Giga Meter][giga-meter], taking advantage of planned
improvements that should allow for scheduling this kind of extra
measurements through the day. In other words, the design document
defines the measurement plane and [Giga Meter][giga-meter] will
be the control plane for scheduling the measurements.

## Prototype

An initial prototype implementing part of the design document is
available at [bassosimone/sonda][bassosimone/sonda].

[bassosimone/sonda]: https://github.com/bassosimone/sonda

## Asks for the CoP

In light of the above context, we are now asking the CoP to
review the design document providing feedback and comments. In doing
this exercise, one should keep in mind that the design document is
focused only on the measurement capabilities and that Giga Meter
will provide the control layer, as mentioned above.

Beyond doing a review of the document text itself, we are specifically
asking the CoP the following questions:

1. Do you find the set of measurements adequate?

2. Is there any specific detail that we missed in speccing out the
measurements and that may provide undesired bias?

3. Is there any other measurement you would suggest?

4. Which scheduling would you recommend as default for the proposed
set of measurements?

5. Is there anything else that our questions above do not cover
and do you think it is important that we take into account?

You can share your feedback directly by opening an issue on the [CoP GitHub
repository][cop-repo] or by emailing
[connectivity-cop@measurementlab.net](mailto:connectivity-cop@measurementlab.net).

[pr9]: https://github.com/unicef/giga-mlab-school-connectivity-cop/pull/9
[cop-repo]: https://github.com/unicef/giga-mlab-school-connectivity-cop

Thank you for your time!

