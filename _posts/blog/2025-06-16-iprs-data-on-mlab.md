---
layout: blog
title: "IP Route Survey (IPRS) data published in M-Lab"
author: "Timur Friedman, Saied Kazemi, Elena Nardi"
date: 2025-06-16
breadcrumb: blog
categories:
  - data
  - partnership
  - bigquery
  - traceroute
  - announcement
---

We are excited to announce that the Dioptra research group at Sorbonne University is making its [IP Route Survey (IPRS) available on M-Lab](https://www.measurementlab.net/tests/iprs/). <!--more-->

[IPRS](https://iprs.dioptra.io/) is an initiative to continuously monitor IP-level routing across the internet. This is done through the regular collection of traceroute-style measurements from multiple vantage points towards a significant portion of the internet's routable address blocks. IPRS consists of distributed route traces from, currently, 10 vantage points to all routable IPv4 prefixes.The survey is conducted by the [Dioptra](https://dioptra.io/) research group at [Sorbonne](https://www.sorbonne-universite.fr/en/) University's [LIP6](https://www.lip6.fr/?LANG=en) computer science laboratory.

IPRS is similar to CAIDA’s Archipelago ([Ark](https://www.caida.org/projects/ark/)) data, consisting of multipath route traces. The data is available in the **iprs1** schema, designed to be consistent with **scamper1** schema used for M-Lab's existing large collection of traceroutes. We hope that the compatible formats will make it easier for researchers to use both datasets.

With the IPRS data, you can get a broader picture of routes through the internet at times when particular M-Lab tests were being performed. This could be useful if you are examining anomalies, for instance, to better understand if those anomalies were restricted to the path over which tests were run, or were part of a broader phenomenon.

IPRS data is gathered using the [Iris](https://iris.dioptra.io/#/) infrastructure, the [Zeph](https://github.com/dioptra-io/zeph) and [Diamond-Miner](https://github.com/dioptra-io/diamond-miner) algorithms, and the [Caracal](https://github.com/dioptra-io/caracal) prober as described in [*Zeph & Iris map the internet: A resilient reinforcement learning approach to distributed IP route tracing*](https://dl.acm.org/doi/10.1145/3523230.3523232), an ACM SIGCOMM Computer Communication Review article from 2022\. This work was funded by the French Ministry of Armed Forces on a cybersecurity grant.

For purposes of economizing storage space and processing on M-Lab's BigQuery, we provide a subset of the data. The entire set and historical data from early 2021, IPv6 data, and other datasets, are available upon request from Dioptra.  Specifically, Dioptra has provided the following two tables:

* **iprs\_data1** IPRS data (a representative subset of all IPRS data)  
* **iprs\_index1** an index of all IPRS meatada data

You can access IPRS data and metadata in the BigQuery tables **iprs\_data1** and **iprs\_index1** in the **sorbonne** dataset.  For details on how IPRS data was converted from Iris native format to be compatible with **scamper1**, please see the [Data](https://www.measurementlab.net/data/) page.

We encourage you to test this new dataset and write to us at [iprs@dioptra.io](mailto:iprs@dioptra.io) with your feedback\!