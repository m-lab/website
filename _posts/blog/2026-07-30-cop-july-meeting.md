---
layout: blog
title: "Connectivity CoP — July Session Recap"
author: "Jonah Duckles"
date: 2026-07-30
breadcrumb: blog
categories:
  - event
  - community
  - research
  - education
---

On July 23, 2026, M-Lab and Giga hosted the monthly Connectivity Community of Practice (CoP) call. Hunter Thompson, Director of Telecommunications and Connectivity for the Vermont Department of Public Service, walked the group through Vermont's Mobile Wireless Drive Test Program, and the community shared updates on the IQB-Edu framework, M-Lab's historical stats dataset, a new QoE measurements design document, and UNHCR's cellular data work in displacement contexts.

<!-- more --> 

Fifteen people participated in the call, from a wide swath of internet measurement perspectives, including: international development, independent consultants, and researchers.

## Community updates

**IQB-Edu notebook updated.** Pavlos Sermpezis (M-Lab) shared an update to the [IQB-Edu policy linkage notebook](https://mybinder.org/v2/gh/unicef/giga-mlab-school-connectivity-cop/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fmaterials%2F2026-05-IQB-Edu%2Fnotebooks%2FIQB_Edu_Policy_Linkage.ipynb) ([source on GitHub](https://github.com/unicef/giga-mlab-school-connectivity-cop/blob/main/materials/2026-05-IQB-Edu/notebooks/IQB_Edu_Policy_Linkage.ipynb)), now runnable for Moldova. The goal is a framework flexible enough to tune for other countries and education contexts.

**Monthly stats data, 2009-2026.** M-Lab's [historical stats dataset](https://measurementlab.net/data/stats) — 18GB, broken out by country, subdivision, and ASN, for both upload and download tests — is available now, with example Jupyter notebooks coming soon.

**QoE measurements design document.** M-Lab and Giga co-authored a first public draft spec'ing out Quality of Experience measurements for schools ([blog post](https://www.measurementlab.net/blog/cop-qoe-design-document/), [design document](https://github.com/unicef/giga-mlab-school-connectivity-cop/blob/main/materials/qoe-measurements-design.md)) and are asking the community whether the measurement set is adequate, what's missing, and what default scheduling makes sense.

**Cellular data capture in forced displacement contexts.** John Warnes of the UNHCR Innovation Accelerator gave an overview of UNHCR's work capturing connectivity data in refugee and displacement settings. Related resources: [Refugee Connectivity](https://refugeeconnectivity.org/), the [Rwanda Connectivity and Digital Work Report 2026](https://www.unhcr.org/innovation/sites/default/files/2026-06/Rwanda-Connectivity-and-Digital-Work-Report-2026.pdf), and [testing findings on access and barriers to connectivity](https://unhcr-cfr-dev.unhcr-cwh-test2.un-icc.cloud/our-insights/reports/access-and-barriers-connectivity-and-digital-work-refugees-and-host). Drive tests in the camps combine both driving and walking, depending on terrain and road access.

## Vermont's Mobile Wireless Drive Test Program

🛝 [Slides (PDF)](https://drive.google.com/file/d/16QSHtGGR-d08ElYVck83jlVP6KZ1sC3h/view?usp=sharing) / [Slides (PPTX)](https://publicservice.vermont.gov/sites/dps/files/documents/2026%20M-Labs%20presentation.pptx)  
📃 [Mobile Wireless Drive Test program page](https://publicservice.vermont.gov/telecommunications-and-connectivity/mobile-wireless-drive-test)   
📃 [MDT mobile experience map](https://experience.arcgis.com/experience/d3b962e63255456f822a83a8978cbf0f/)   
📃 [Tower locations](https://publicservice.vermont.gov/telecommunications-and-connectivity/tower-locations)

Hunter Thompson presented the state's drive test program for mapping mobile wireless coverage.

The state publishes its results publicly and uses them to push providers toward better service. Coverage quality is color-coded on the [mobile experience map](https://experience.arcgis.com/experience/d3b962e63255456f822a83a8978cbf0f/): red means no results, yellow (poor) covers 0-5 Mbps, light green (good) covers 5-25 Mbps, and dark green (great) is 25 Mbps and above.

Thompson noted the test kit itself has evolved over time and now runs on a custom Android app; as a state employee he wasn't sure the software could be shared publicly. The program is expanding to use M-Lab endpoints so it can run tests year-round. A participant also flagged that the UK's move of emergency services radio traffic to LTE included its own coverage-checking effort, with [background here](https://www.gov.uk/government/publications/the-emergency-services-mobile-communications-programme/emergency-services-network#about-the-emergency-services-network), as a possible parallel data source / approach to study.

## What's next

These CoP calls happen regularly, with room on the agenda for 5-minute community updates on connectivity projects and M-Lab data research — email [jonah@measurementlab.net](mailto:jonah@measurementlab.net) if you'd like a slot. On the community announcements front, several attendees are weighing a trip to IGF in December — reach out on the mailing list if you're planning to be there and want to connect.

[Join the Group](https://groups.google.com/a/measurementlab.net/g/connectivity-cop/about) for discussions and further announcements of activities  
[CoP GitHub](https://www.google.com/url?q=https://github.com/unicef/giga-mlab-school-connectivity-cop&sa=D&source=docs&ust=1785186130122568&usg=AOvVaw1Dx942J2OVkus9N72miPh_)  
[About the CoP](https://www.measurementlab.net/blog/cop-launch/)  

---

_As the world's largest open collection of Internet performance data, M-Lab provides powerful, real-world telemetry that helps illuminate how networks actually perform. Through this collaboration, we're working with Giga to strengthen how connectivity is measured and understood for public facilities, especially schools, using open measurement approaches that reflect on-the-ground conditions._

_Giga is a joint initiative of UNICEF and the International Telecommunication Union (ITU), working to connect every school to the internet and every young person to information, opportunity, and choice. Through its global focus on school connectivity, Giga supports governments and partners with data, technical expertise, and financing tools to accelerate meaningful access to the internet for education._
