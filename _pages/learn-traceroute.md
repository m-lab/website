---
layout: page
permalink: /learn/traceroute/
title: "Introduction to Traceroutes"
breadcrumb: learn
---

> **DRAFT — for review, not published.**

# Introduction to Traceroutes

When you load a web page, your data does not travel in a straight line to the server. It passes through a sequence of routers, often crossing several independent networks along the way. A **traceroute** is a measurement that tries to reveal that sequence.

Traceroutes are one of the most useful tools in Internet measurement, and one of the easiest to misread. This page explains what a traceroute measures, how to read one, and the specific ways it can mislead you.

## What a traceroute measures

Every packet on the Internet carries a counter called **time to live**, or TTL. Each router that forwards the packet decreases the counter by one. If the counter reaches zero, the router discards the packet and sends back an error message saying so.

This mechanism exists to stop packets circulating forever when routing goes wrong. Traceroute repurposes it as a measurement tool.

To find the first router on the path, traceroute sends a packet with its TTL set to 1. The first router decrements it to zero, discards the packet, and reports the error — revealing its own address. To find the second router, traceroute sends a packet with TTL 2, and so on, walking outward one hop at a time until the packets reach their destination.

Each step yields two things: the address of the router that replied, and how long the round trip took.

## Reading the output

A traceroute is usually printed as a numbered list. Each line is one **hop**:

```
 1  192.168.1.1              1.4 ms
 2  100.64.0.1              12.8 ms
 3  ae-2.bar1.chicago.example.net    14.1 ms
 4  * * *
 5  ae-11.core1.newyork.example.net  38.6 ms
 6  203.0.113.42            41.2 ms
```

The number is the TTL, which is the hop's position along the path. The address, and its hostname where one exists, identify the router that replied. The time is the round trip to that router and back.

Hostnames are often informative. Operators frequently encode a city, a facility, or a role into router names — `chicago` and `newyork` above are typical — and this is one of the main ways Internet paths get geographically located.

Line 4 shows `* * *`: no reply. That is common, and it is the first thing worth understanding properly.

## What a traceroute cannot tell you

Traceroute is an inference tool. Almost every line of its output can be wrong in a specific, known way.

**A silent hop is not a missing router.** Many routers are configured not to reply to TTL-expired packets, or to rate-limit replies so heavily that most go unanswered. A `* * *` line means *no information*, not *nothing there*. Long runs of silence are ordinary inside networks that decline to respond.

**The address you see may belong to a different network.** A router has multiple interfaces, and it may reply from an interface facing a network other than the one your traffic is using. If you attribute that address to its owner, you can attribute the hop to the wrong network, and place it in the wrong city. This is one of the main sources of error in building AS-level paths from traceroutes.

**Consecutive probes may take different paths.** Networks routinely spread traffic across multiple equal-cost routes. A single traceroute samples one of several possible paths, and naive traceroute output can even interleave hops from different routes into a sequence that no packet ever took. Tools designed for this, such as Paris traceroute and scamper's multipath detection, control which route each probe follows — which is why M-Lab uses them.

**A hop's round-trip time is not a link's latency.** The time reported for a hop is a *round* trip: out to that router and back. The return leg may travel a completely different route than the rest of your measurement. A jump in RTT at one hop can be caused by something on the return path from that router, not by the hop itself.

**Some infrastructure is invisible.** Layer-2 switches, and MPLS tunnels configured not to expose their internals, forward traffic without appearing as hops. A path can cross substantial infrastructure that no traceroute will ever show.

**RTT is not monotonic, and that is not always an error.** Later hops sometimes report lower times than earlier ones — because of the asymmetric return paths above, or because routers deprioritize generating error messages relative to forwarding real traffic.

## Paths are not symmetric

This is the single most consequential thing to know about Internet paths, and it is not intuitive.

The route your data takes to a server and the route the reply takes back are chosen **independently**. Unlike a road journey, an Internet path is not negotiated end to end. Each network along the way decides for itself how to forward the traffic it receives, based on its own routing policy, its business relationships, and its own view of the Internet.

So a traceroute you run measures the path *to* a destination. It does not tell you the path *back*, and the two routinely differ — sometimes crossing different countries, different transit providers, and different interconnections.

This matters for diagnosis. If your connection is slow, the problem may be on a path your traceroute never shows you. Measuring only one direction means seeing at most half the picture.

Measuring the reverse path is harder, because you cannot run a traceroute from a machine you do not control. Techniques exist — [reverse traceroute]({{ site.baseurl }}/tests/reverse_traceroute/) uses distributed vantage points and IP options to infer it — but the result is an inference, and it comes with its own caveats.

## Why traceroutes are worth the trouble

Given all of that, traceroute remains one of the few ways to see inside the Internet's structure at all.

* **Locating problems.** End-to-end measurements tell you performance changed. Paths give you candidate locations for *where*.
* **Understanding topology.** Traceroutes at scale reveal how networks interconnect, which exchange points they meet at, and where the infrastructure carrying most traffic actually sits.
* **Detecting change.** Comparing paths over time exposes reroutes, failures, and shifts in interconnection that end-to-end numbers alone would not explain.
* **Studying resilience.** When infrastructure is damaged, paths show where traffic went instead — and whether the fallback route was adequate.

The right posture is to treat a traceroute as evidence rather than as ground truth, and to combine many of them rather than relying on one.

## Traceroutes at M-Lab

M-Lab collects traceroutes continuously and publishes them openly.

* [**Traceroute**]({{ site.baseurl }}/tests/traceroute/) — for every TCP connection to an M-Lab server, M-Lab runs a traceroute from the server back toward the client using `scamper`, and publishes it as the `scamper1` datatype along with per-hop annotations.
* [**Reverse traceroute**]({{ site.baseurl }}/tests/reverse_traceroute/) — measures the path back from a client toward M-Lab, filling in the direction a server-side traceroute cannot see.
* [**IPRS**]({{ site.baseurl }}/tests/iprs/) — a continuous survey of IP-level routing across the Internet.

[**HERMES**]({{ site.baseurl }}/tests/hermes/) is one system built on these measurements. It combines M-Lab speed test data with both directions of the network path to detect performance degradations and identify the network segments associated with them — an example of the "combine many traceroutes rather than trusting one" posture in practice.
