---
layout: page
permalink: /learn/
title: "Learn"
page-title: "Learn"
menu-item: true
---

* Table of Contents
{:toc}

# Learning Resources

This section of our site provides educational information about the Internet, M-Lab, and related services, terms and technologies.

## How the Internet Works

Whenever we use a computer, a smartphone, tablet or other connected device to go online, we’re accessing our content and services via a collection of networks owned and operated by many organizations and companies across the world. The Internet is an interconnected mesh of separate networks. From a US consumer’s perspective, we buy Internet service, and once it’s hooked up, our ISP (say Verizon, Comcast or Time Warner) lets us connect with everything on the web. To be able to provide us this vast access, our individual ISP must connect to the rest of the Internet. This happens via “interconnection.” Our ISP connects to other, less well-known ISPs that we refer to as transit providers. The points at which transit providers and access ISPs meet and exchange traffic are called “interconnection.” What this means is that the performance we get to our favorite sites and services is determined by many factors, including the relationship between our access ISP and the transit ISPs that it interconnects with.

![M-Lab and the Internet]({{ site.baseurl }}/images/learn/internetInfographic.png)

M-Lab choses the locations of its measurement points carefully, placing them inside transit ISPs that interconnect with many other ISPs. This provides a representative location at which it’s possible to measure representative performance as experienced by end-users. In other words, when you run an M-Lab test, the measurement of your connection replicates the experience you have many times daily -- crossing the boundaries of networks and infrastructure owners to download a webpage, or access a file, etc.. This ability to get whatever is hosted on the Internet, from anywhere connected to the Internet, is fundamental to how the Internet functions. Without it, the Internet is not longer in inter-network, and is instead an intra-network.

![How an M-Lab test works]({{ site.baseurl }}/images/learn/mlabInfographic.png)

### Additional Resources
{:.no_toc}

* [The Internet is Serious Business](http://welcometocup.org/Projects/UrbanInvestigations/TheInternetIsSeriousBusiness)
* [Learn Networking Basics](https://commotionwireless.net/docs/cck/networking/learn-networking-basics/)
* [How the Internet Sees You: An Illustrated Guide](https://www.youtube.com/watch?v=Oqd6S5av5eg)

## Definitions of Terms

### Infrastructure
{:.no_toc}

#### Access ISP or Access Network
{:.no_toc}

An access ISP is the Internet Service Provider that you interact with the most. They connect people’s homes and charge a monthly fee for Internet service. To connect their networks and customers to the rest of the Internet, they either directly interconnect with transit ISPs or pay one or more transit ISPs to carry their traffic.

#### Inter-eXchange Points (IXPs)
{:.no_toc}

The physical locations where ISPs exchange Internet traffic (interconnect) between their networks.

#### Interconnection
{:.no_toc}

An interconnection is where different ISPs connect their respective networks to one another. All of these interconnection taken together make it possible to access content anywhere on the Internet. Many interconnections are private, where only two ISPs meet, while others are shared Inter-eXchange Points (IXPs) where many ISPs connect to each other.

#### Measurement Point
{:.no_toc}

An M-Lab node, consisting of three specially configured servers connected to a Transit ISP. When you run an M-Lab test, your computer connects to the closest M-Lab measurement point, which coordinates the test you’re running and collects the data for that test.

#### Transit ISP or Transit Network
{:.no_toc}

A transit ISP is a kind of “meta-ISP”, which provides long-distance carrying of packets, usually to other ISPs instead of to consumers directly. Transit ISPs are the organizations which lay undersea cables and dig trenches across mountain ranges, and then charge ISPs to carry traffic through those links. Transit ISPs are similar to the long distance shipping companies that move big containers -- they aren’t the company that brings the Internet into your house, but they do the transportation between cities, regions, countries, and across the ocean. Sometimes transit ISPs are also called “Tier 1 ISPs”, because those top-tier ISPs can usually get traffic to anywhere in the world.

### Tools and Tests
{:.no_toc}

#### Network Diagnostic Tool (NDT)
{:.no_toc}

A sophisticated speed and diagnostic test suitable for both the novice and the network researcher, NDT reports upload and download speeds, attempts to determine what problems limited those speeds, and provides detailed diagnostic reporting on what it found.

### Metrics
{:.no_toc}

#### Download Throughput (Megabits per second, abbreviated Mbps)
{:.no_toc}

How much data can be downloaded (server to user computer) per unit of time. Note that networking capacity is generally measured in bits per second, while application file sizes are generally measured in bytes, which are 8 bit each. So for example downloading a 1 megabyte photo image in 10 seconds would be 8 Megabits per second or 8 Mbps.

#### Packet Retransmission Rate
{:.no_toc}

The fraction of packets (bundles of Internet data) that need to be sent more than once to deliver complete data. A big part of the Internet's robustness comes from its ability to repair missing data by having it retransmitted. Data can be lost due to congestion or other problems in the network. The repair process normally has no explicit symptoms except it does take time and hurts performance. The retransmission rate is a measure of how much difficulty the network is having delivering the data in the first place, and provides clues as to how much the attached computers had to slow down to repair the losses.

#### Round Trip Time (Milliseconds, ms)
{:.no_toc}

How much data can be downloaded (server to user computer) per unit of time. Note that networking capacity is generally measured in bits per second, while application file sizes are generally measured in bytes, which are 8 bit each. So for example downloading a 1 megabyte photo image in 10 seconds would be 8 Megabits per second or 8 Mbps. How much time does it take for a packet to go from point A to point B and back. The shorter the time, the better. Minimum: the minimum latency measured in transmissions from the server to the client, reported in milliseconds. Normally, this is a good indication of physical path distance, except when there is high load. ISPs with smaller RTTs are probably better connected to other ISPs, meaning that they have more interconnections in more widely distributed geographic locations. Average: the average latency of data transfers from the server to the client. This is calculated as the sum of round trip times sampled during the test against the number of samples, reported in milliseconds.Comparing Average and Minimum RTTs provides an estimate of the average delay caused by queuing traffic in the network.

#### Upload Throughput (Megabits per second, Mbps)
{:.no_toc}

How much data can be uploaded (user computer to Internet server) per unit of time.