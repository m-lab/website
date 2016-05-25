---
layout: blog
title: "Traffic Microbursts and their Effect on Internet Measurement"
author: "Collin Anderson"
breadcrumb: blog
categories:
  - bigquery
  - gcs
  - performance
  - data
---

# Traffic Microbursts and their Effect on Internet Measurement

In August 2015, M-Lab was notified of potential degradation of site performance by a measurement partner based on discrepancies compared to results for their own servers. After a full investigation these patterns were found to have been caused by the unique confluence of several specific conditions. Interim remediation measures were taken in early October 2015, and the resolution of the degradation was confirmed by the partner and others. Due to these administrative actions, the episode, which we are calling the “switch discard issue,” has not affected testing conducted in the United States (the region impacted by this problem) since October 11, 2015, and thus measurements after this period are not affected by the incident. M-Lab has also conducted an evaluation of data collected during the time period in which the issue occurred, and has taken steps to remove affected measurements from its dataset. This incident will not affect use of its dataset, past or present, as a result. <!--more-->

M-Lab is committed to open data and operations, and this includes transparently disclosing issues it discovers. This document was drafted to help users, partners, and stakeholders better understand an issue that M-Lab believes is relevant to the operation of network infrastructure generally, about which we have seen little research.

This document does the following:

* outlines the technical causes behind instances of calibration anomalies and their implications for Internet infrastructure management overall;
* describes measures taken by M-Lab to prevent further issues;
* discusses several strong forward-looking techniques to provide ongoing calibration monitoring;
* describes measures taken to prepare M-Lab infrastructure for the next generation of consumer networks; and,
* reproduces past research conducted by M-Lab, using unaffected data, in order to provide updated analysis and confirm the continued validity of our previous findings


A full accounting can be found in our incident report available here:
[Traffic Microbursts and their Effect on Internet Measurement (PDF)]({{ site.baseurl }}/publications/SwitchDiscardNotice-Final-20160525.pdf){:.download-link .paper-download target="_blank"}