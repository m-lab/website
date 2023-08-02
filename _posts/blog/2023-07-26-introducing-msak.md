---
layout: blog
title: "Introducing MSAK (Measurement Swiss-Army Knife)"
author: "Roberto D'Auria"
date: 2023-07-26
breadcrumb: blog
categories:
  - platform
  - announcement
---

Since its inception, M-Lab's flagship **bulk transport capacity** (BTC) measurement protocol, NDT, has always been using a single TCP stream. While this allowed us to get detailed diagnostic data about the user's connection, over time many have expressed concerns about the ability of the single-stream approach to also effectively fill the link and double as a measurement of **link capacity**. <!--more-->

NDT data is also frequently compared to Internet speed test services with a substantially different server placement model (usually much closer to the end user, often on the same network as the user's ISP), which makes apples-to-apples comparisons harder. We determined that a multi-stream measurement hosted on the M-Lab platform could provide the missing data to understand the effective impact of multiple streams on throughput measurements and, at the same time, provide a platform to experiment with and shape the next generation of NDT versions.

In addition to this, the FCC's **[mobile broadband measurement program](https://www.fcc.gov/general/measuring-mobile-broadband-performance)** explicitly requires that the measurement happens over 3 concurrent streams. By supporting multi-stream measurements, we will be able to fulfill the FCC's requirements.

As a result of these considerations, we are excited to introduce our newest M-Lab hosted experiment: Measurement Swiss-Army Knife, or MSAK.

## Throughput testing

MSAK provides a WebSocket-based throughput testing protocol with a variety of client-configurable options, including the number of streams, stream start time, congestion control algorithm used, and test duration.

This combination of options will allow us to test the relative performance of single and multi-stream and, by allowing different stream to go to different M-Lab servers, in many cases also allows measuring link capacity.

## Latency testing

MSAK also provides a client-initiated UDP-based latency testing protocol, which measures latency by sending small UDP packets at a fast rate that is comparable with real-time UDP-based protocols. By running this test, the client will know its latency, jitter, and packet loss.

This is the first UDP-based latency test available on the M-Lab platform, and while not a complete solution, it is part of a longer-term strategy to measure more dimensions of the user's Internet experience, including the quality of audio and video conferencing and the effects of bufferbloat on latency.

## Summary

MSAK is under active development, and the best way to stay up-to-date is by following its [official GitHub repository](https://github.com/m-lab/msak). Our first milestone is to support Georgia Tech's CellWatch app for mobile measurement. A JavaScript client library for the throughput protocol is planned and will enable us to provide a multi-stream option on [our official speedtest](https://speed.measurementlab.net).

To learn more about the technical design, you can watch the official presentation at our community call in July ([recording](https://youtu.be/Lvo-nlX5YeM)) ([slides](https://docs.google.com/presentation/d/1IbqMhmBwP2ul0Y7I-haIICc3tTjHsuRAKofzR5J-0gM/edit#slide=id.g255b8295bce_1_63))
