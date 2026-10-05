---
layout: blog
title: "Connectivity CoP — September Session Recap"
author: "Jonah Duckles"
date: 2026-09-28
breadcrumb: blog
categories:
  - event
  - community
  - research
  - education
---

On September 23, 2026, M-Lab and Giga hosted the monthly Connectivity Community of Practice (CoP) call. Vipul Bhavsar of Giga presented the MVP of Giga Meter v3, Loqman Salamatian introduced the Giga Traceroutes dashboard, and attendees worked through a hands-on tutorial on M-Lab's Monthly Stats dataset.

<!--more-->

Ten participants joined from universities, research networks, and nonprofits across the US, Europe, Africa, and New Zealand.

## Community updates

**Giga Meter v3 MVP.** Vipul Bhavsar (Giga) shared an MVP of Giga Meter v3, the next generation of the school connectivity measurement platform ([slides](https://giga-meter.ddns.net/docs/Giga-Meter-v3-Architecture.pdf)). 

**Giga Traceroutes.** Loqman Salamatian (Assistant Professor, University of Maryland / M-Lab) walked the group through the [Giga Traceroutes dashboard](https://giga-traceroutes.measurementlab.net/), which visualizes the network paths between M-Lab servers and schools (slide deck [PDF](https://drive.google.com/file/d/1g9JNPZ-cAF0-YDq788auVEcjISDwFSVw/view?usp=sharing)).

* The traceroutes include some extra metadata beyond a typical M-Lab test
* All traceroutes currently run from the M-Lab server to the client. Giga Meter v3 will add client-side traceroutes, giving both directions, but that isn't in place yet.
* Raw data is downloadable from the dashboard (select a country, then the "Download raw data" button). M-Lab also plans to publish tutorials on accessing the data in BigQuery soon.

## Monthly Stats Data

The second topic was a hands-on tutorial on M-Lab's [Monthly Stats dataset](https://www.measurementlab.net/data/stats/) — pre-computed summaries of global speed test results covering download speed, upload speed, latency, and packet loss across countries, regions, cities, and internet providers. The interactive [notebooks](https://github.com/m-lab/mlab-notebooks/tree/main/monthlystats) run in the browser with no local setup, and show how to compare ISP performance, track connectivity trends over time, and explore aggregate speed test data for specific regions, ISPs, and cities.

**Resources**
🛝 [Monthly Stats tutorial slides](https://github.com/m-lab/mlab-notebooks/blob/main/monthlystats/slides/index.pdf)
🔗 [Notebook source (GitHub)](https://github.com/m-lab/mlab-notebooks/tree/main/monthlystats)
📃 [Monthly Stats data page](https://www.measurementlab.net/data/stats/)

## What's next

The monthly CoP calls reserve several 5-minute slots for community updates on connectivity projects and M-Lab data research. These are a good place to share challenges, ideas, and request feedback — email [jonah@measurementlab.net](mailto:jonah@measurementlab.net) if you'd like a slot.

[Join the Group](https://forms.gle/SBrd63EgMja1owDt8) for discussions and further announcements of activities
[CoP GitHub](https://github.com/unicef/giga-mlab-school-connectivity-cop) — one-stop place for all CCoP information: meeting notes and resources
[About the CoP](https://www.measurementlab.net/blog/cop-launch/)

---

_As the world's largest open collection of Internet performance data, M-Lab provides powerful, real-world telemetry that helps illuminate how networks actually perform. Through this collaboration, we're working with Giga to strengthen how connectivity is measured and understood for public facilities, especially schools, using open measurement approaches that reflect on-the-ground conditions._

_Giga is a joint initiative of UNICEF and the International Telecommunication Union (ITU), working to connect every school to the internet and every young person to information, opportunity, and choice. Through its global focus on school connectivity, Giga supports governments and partners with data, technical expertise, and financing tools to accelerate meaningful access to the internet for education._
