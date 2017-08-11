---
layout: blog
title: "BBR TCP and Measurement Lab"
author: "Georgia Bullen"
date: 2016-11-30
breadcrumb: blog
categories:
  - tcp
  - bbr
  - traffic congestion
---

# BBR TCP and Measurement Lab
{% include post-meta.html %}

## What is TCP?

Since the beginning of the its existence, the internet has expanded in scope, traffic, content, and a myriad of other ways. The protocols that make up the internet’s backbone have mostly remained the same since they were developed in the 1980s. The Transmission Control Protocol (TCP) was one of the first networking protocols defined during the internet’s development, and specifies how data should be transmitted and received. TCP implementations, initially developed in the 1980’s, attempted to discover the right rate at which to send data by constantly trying to send more until reaching the point that not all of the data arrived at its destination, and then backing off on the amount being sent.<!--more--> Multiple TCP connections would share links, because each connection's attempts to use more and more bandwidth would end up with each claiming part of the available bandwidth. For over 30 years, TCP has been how everyone connects to services on the internet, and its canonical implementation has been held up as the gold standard method for how network capacity can be shared amongst competing users. [Recently, a group of Google researchers, including TCP pioneer Van Jacobson, developed a better algorithm for congestion control](https://research.google.com/pubs/pub45646.html){:target="_blank"}. BBR, or Bottleneck Bandwidth and RTT (Round-Trip Time), directly measures and models the network bottleneck in order to determine the right rate at which to send data. It uses analytical math, instead of the more traditional "guess and check" method used by older implementations of TCP. This modeling-based approach can more fully exploit existing network capabilities, leading to increased connection bandwidth without needing to upgrade network hardware. This represents a critical upgrade for today’s internet which handles exponentially increasing amounts of data.

## How Does BBR Make the Internet Work Better?

BBR prevents traffic congestion by measuring how fast the network can actually deliver data, and then using that rate to construct a model of the network's capabilities. This model is then used to determine how much data can be sent at a time. By using this model (and repeatedly re-measuring to verify that the model remains correct) BBR-based TCP can transmit data at the right rate without causing congestion and loss of in-flight data. Even more, this model indicates that there is a lot of spare network capacity that older implementations of TCP are unable to utilize. By discovering this available capacity and making it available for use, BBR unlocks network capabilities that have always existed, but have never before been easily used.  Using BBR TCP means that the right rate of traffic transmission is much more quickly discovered and that less traffic has to be re-sent. Additionally, the BBR TCP rate is frequently faster than the rate discovered by older TCP implementations. This makes for a faster everything -- measurement, connection, etc., and increases accuracy of measurement.  Additionally, this update can be implemented on just the server side, and so doesn’t require patches for individual browsers or smartphones. The move to BBR-based TCP has already started to happen without most of us even noticing.

## How Does BBR Affect Measurement Lab

M-Lab is already planning to do the work on the platform side to support BBR based TCP measurement, which will allow for more accurate and faster speed tests at the scale that M-Lab already supports.

A BBR-based version of our NDT speed test should allow users to more accurately determine their network download capacity, and should allow them to do so in network contexts (high-latency networks, networks with high packet loss) that were previously infeasible for accurate testing. The more accurate version of NDT should be rolled out transparently to users - the main difference they will notice is that their download speed might improve. We will also be working with partners to develop new testing clients which should be able to determine correct download speeds in much less time than the 10-second test interval that NDT currently requires. We do this in an effort to continue to measure the end-to-end capacity available to internet users - the rollout of BBR-based TCP on servers across the internet means that we need it on our servers as well. Because BBR-based TCP implementations have different internals from older TCP implementations, the schema for our saved TCP data will change correspondingly. We will work with our data partners to ensure a smooth transition from the old-style results to the new ones. Right now, there are more than 250,000 download speed tests performed against M-Lab's software infrastructure every day. Thanks to BBR, those tests are all going to get an upgrade.