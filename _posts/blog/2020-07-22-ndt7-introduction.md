---
layout: blog
title: "Introducing ndt7"
author: "Lai Yi Ohlsen, Matt Mathis, Stephen Soltesz, Simone Basso"
date: 2020-07-22
breadcrumb: blog
categories:
  - ndt
  - ndt7
  - research
  - bbr
  - tcp-info
  - platform
  - kernel
---

The new ndt7 protocol for the [Network Diagnostic Tool
(NDT)][ndt]{:target="_blank"} is now generally available on the M-Lab
platform. Since 2009, NDT has been the premier TCP performance measurement
service test hosted by M-Lab. During its history on the platform, NDT has
produced the largest test volume to date, spanning the longest history. Since
late 2018, M-Lab has worked with researcher [Simone
Basso][simone]{:target="_blank"} to develop the ndt7 protocol and archival
data format.<!--more-->

The ndt7 protocol measures the application-level download or upload
performance using WebSockets over a single TCP connection. The ndt7 protocol
answers the question of how fast you could pull/push data from your device to
a typically-nearby, well-provisioned web server by means of commonly-used web
technologies. This is not necessarily a measurement of your last mile speed.
Rather it is a measurement of what performance is possible with your device,
your current internet connection (landline, Wi-Fi, 4G, etc.), the
characteristics of your ISP and possibly of other ISPs in the middle, and the
server being used. The ndt7 protocol allows clients to measure “goodput”: the
speed measured at application level, without including the overheads of
WebSockets, TLS, TCP/IP, and link layer headers. The ndt7 protocol also
allows clients to report “throughput” because the protocol also includes
kernel-level information from TCP_INFO.

A design goal of the ndt7 protocol was to be able to build clients that are
simple and easy to maintain over time. For example, a complete Go language
ndt7 client can be implemented in just 151 lines, and a complete JavaScript
client can be implemented in just 122 lines. We are publishing two reference
client implementations here:

* [github.com/m-lab/ndt7-client-go][ndt7-client-go]{:target="_blank"}
* [github.com/m-lab/ndt7-js][ndt7-js]{:target="_blank"} (in progress)

On the M-Lab platform, ndt7 uses BBR TCP. BBR is a new congestion control
algorithm that uses the network more efficiently. It does so by explicitly
measuring the two most important network parameters: the maximum bandwidth
and minimum roundtrip time. BBR uses these parameters to precisely model
network behavior, making it much more efficient than prior TCP
implementations. These parameters also happen to be the most important from a
measurement standpoint, which is why we expect BBR to revolutionize Internet
measurement.

Because of the benefits of BBR and simplicity of the ndt7 protocol, ndt7 will
be the preferred protocol for new integrations. We have begun the process of
migrating existing clients to the ndt7 protocol and initial analysis of the
performance benefits of BBR is extremely promising. We will soon share more
information about current migrations and how this will improve our data and
affect longitudinal analysis.

For a recent introduction to BBR see: [TCP BBR - Exploring TCP congestion
control | by Andree Toonk][morebbr]{:target="_blank"}

[ndt]: {{ site.baseurl }}/tests/ndt/
[simone]: https://github.com/bassosimone
[morebbr]: https://medium.com/@atoonk/tcp-bbr-exploring-tcp-congestion-control-84c9c11dc3a9
[ndt7-client-go]: https://github.com/m-lab/ndt7-client-go
[ndt7-js]: https://github.com/m-lab/ndt7-js
