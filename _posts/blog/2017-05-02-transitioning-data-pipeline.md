---
layout: blog
title: "Transitioning to a New Backend Pipeline and Data Availability"
author: "Chris Ritzo"
date: 2017-05-02
breadcrumb: blog
categories:
  - bigquery
  - data
  - data analysis
  - gcs
  - performance
  - pipeline
  - research
---

# Transitioning to a New Backend Pipeline and Data Availability
{% include post-meta.html %}

M-Lab data is collected from distributed experiments hosted on servers all over the world, processed in a pipeline, and published for free in both raw and parsed (structured) formats. The back end processing component for this has served us well for many years, but it's been showing its age recently. As M-Lab collects an increasing amount of data thanks to new partnerships, we have been concerned that it will not be as reliable.<!--more-->

To address this, we've been working on replacing the aging back-end system with a new cloud based pipeline that will be able to process much higher data volumes with greater transparency and lower latency. As part of the switch from the old pipeline to the new one, we will have a period of time where data will not be published in a regular and timely interval. All data will be published, but we anticipate a period during the transition where data from April 21 to the end of May will not be published until June 1st. Data published before that time will remain available, and experiments will still function as expected despite the delay in data publication. Experiments that collect data through their own independent pipelines will not be affected. We expect that when this transition is complete, experiment data will be published in both raw and parsed formats with no more than 1 day of latency.

We will continue to update you on additional developments on the transition and look forward to posting more exciting information about our new cloud based pipeline.
