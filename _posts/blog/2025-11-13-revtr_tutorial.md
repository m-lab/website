---
layout: blog
title: "A Hands-On Tutorial with Reverse Traceroute"
author: "Loqman Salamatian"
date: 2025-11-13
breadcrumb: blog
categories:
  - data
  - community
  - research
  - bigquery
  - traceroute
---

Internet paths are often asymmetric: packets from A to B usually take a different route than packets in the reverse direction from B to A. This post walks through a reproducible case study using **Reverse Traceroute (RevTr)** to compare forward and reverse paths for NDT speed tests.<!--more--> We’ll show how to:

1. Select a test where both the forward and reverse traceroutes reached their destinations.  
2. Pull the data directly from BigQuery.  
3. Visualize where and how the two directions differ.

This post focuses on the workflow: how to pull tests, line up forward and reverse traceroutes, and compare them. If you want a more detailed walk-through of the Reverse Traceroute output itself: what each entry in the table means, how to interpret its output, and how to understand the details of the technique, please refer to the [detailed documentation of the reverse traceroute dataset](https://www.measurementlab.net/tests/reverse_traceroute/).

---

## **Why do forward and reverse paths differ?**

Internet routing is **policy-driven**. Business relationships, peering choices, and traffic-engineering decisions can send return traffic through a completely different set of networks or cities than the forward path. For example, traffic from a device in NYC to a device in LA may flow through Chicago and Denver, while traffic on the way back from LA to NYC may flow through Dallas and Atlanta. To properly diagnose performance problems, it’s essential to see **both directions**.

---

## **Data sources**

In this case study, we’ll use:

* **NDT speed tests** collected by M-Lab.  
* **Reverse paths** (client → server) from the RevTr system, stored in BigQuery at  
   *measurement-lab.revtr_raw.revtr1.*  
* **Forward traceroutes** (server → client) from  
   *Measurement-lab.revtr_raw.trace1.*  
* **Hop annotations** collected by M-Lab.

---

## **What the notebook does**

Not every NDT test has a reverse traceroute — in fact, only about 25% do. We’ll focus on that subset and:

1. Pick a day and select tests where both forward and reverse paths reach their destinations.  
2. Extract hop-by-hop IP addresses and map to AS numbers, geolocation, and RTT from the source.  
3. Compare forward and reverse directions by looking at:  
   * **AS-path overlap** (common subsequences).  
   * **Geographic path length** (sum of great-circle distances).  
   * **Map overlays** to see where the paths diverge.

---

## **What to look for**

When you visualize the two directions, ask:

* Where do the AS paths diverge?  
* Does one direction cross different cities than the other?  
* Is one direction significantly longer in kilometers or showing higher RTT growth?  
* Do you notice any suspicious geographic loops that could indicate policy quirks?

---

### **Try it yourself**

The notebook cells below are ready to run:

* It will find a candidate test with both directions.  
* Fetch and parse the paths.  
* Compute overlap metrics.  
* Generate simple visualizations (AS-level, geographic, and RTT-based).

If the first run does not yield an interesting pair of paths, simply change the index (or the date) and try again.

[RevTr_UseCase.ipynb](https://colab.research.google.com/drive/12KET9GAtRJU0ZSGGxikxrVNF3wzAUcRL?usp=sharing)

