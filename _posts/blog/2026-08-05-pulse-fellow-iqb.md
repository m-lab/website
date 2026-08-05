---
layout: blog
title: "IQB Meets Reliability: New Research on M-Lab’s Internet Quality Barometer"
author: "Pavlos Sermpezis, Zeynep Arslan"
date: 2026-08-05
breadcrumb: blog
categories:
  - community
  - research
  - announcement
---
 
Measurement Lab (M-Lab) is excited to announce that [Zeynep Arslan](https://www.linkedin.com/in/zeynep-arslan-17908b7b/) (M-Lab Research Fellow, affiliated with the Sorbonne Université) was awarded an Internet Society Pulse fellowship to conduct research exploring  the stability and reliability of the [Internet Quality Barometer (IQB) framework](https://www.measurementlab.net/blog/iqb/).<!--more-->

The IQB is a composite index that translates speed test measurements (including M-Lab's NDT measurements) — download and upload throughput, latency, and packet loss — into a single, interpretable score for assessing  Internet quality. Since its initial development, the framework has been made publicly available alongside an [open-source code library](https://github.com/m-lab/iqb) and a [preliminary sensitivity analysis](https://arxiv.org/abs/2606.11040) that explored variation in IQB scores depending on methodological choices. This new research builds directly on those findings.

## The Problem

Policy decisions on infrastructure investment, funding eligibility, and regulatory classification increasingly depend on Internet quality metrics. Yet the stability of those metrics under varying methodological approaches has not been systematically tested — especially for countries with heterogeneous infrastructure, where the stakes of getting measurement right are highest.

Preliminary findings from the IQB's analysis identified that measurement aggregation configurations, use-case definitions, and data sparsity all meaningfully impact scores. But a systematic evaluation connecting these sensitivities to real-world infrastructure and market conditions was beyond the scope of that initial study.

## The Research

The work is structured around four interconnected questions:

* Does IQB score volatility vary by development context? And, do countries with uneven infrastructure shift more dramatically in rankings across threshold choices?   
* Where are the policy-relevant tipping points at which a country crosses minimum or high-quality classification boundaries?   
* Do use-case profiles need contextual adaptation for different development settings?   
* Does the urban–rural gap explain score instability at the national level?

To answer these questions, the research will calculate IQB scores under different configurations at both country and city levels, conduct bootstrap resampling to establish minimum measurement requirements, design and evaluate context-specific use-case profiles, and correlate IQB scores against external indicators including GDP per capita, ITU broadband penetration, and ISP market concentration.

## Why It Matters

If methodological choices produce less stable scores for countries with heterogeneous networks or fragmented markets, policymakers in those regions are operating with a disadvantage — and potentially being misrepresented by the very tools designed to help them. This research aims to ensure that the IQB, and the resilience assessments it informs, accurately reflect ground-level conditions.

Findings will be contributed back to the IQB open-source repository, shared with the M-Lab community, and made available to support Internet Society Pulse Country Reports and the Internet Resilience Index.

If you are interested in this research workstream and want to join forces with, drop us a message at [iqb@measurementlab.net](mailto:iqb@measurementlab.net)

## About Zeynep Arslan 

Zeynep is a researcher at Sorbonne Université focusing on mapping global network topology and routing patterns. With nearly a decade in industry, working in Consulting, FinTech and HealthTech, she is interested in the intersection of distributed systems, data visualization, and the way networks shape how information moves around the world.