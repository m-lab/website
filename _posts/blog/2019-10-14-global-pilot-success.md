---
layout: blog
title: "M-Lab 2.0 Platform: Global Pilot Assessment"
author: "Peter Boothe"
date: 2019-10-14
breadcrumb: blog
categories:
  - platform
  - research
  - data
  - kernel
  - open-source
  - performance
  - tcp-info
---

We deployed [the new M-Lab platform to 1/3rd of the M-Lab fleet](/data/docs/analysis/2019-10-14-pilot-assessment/), and now we
need to assess whether or not it is a performance regression, relative to the
old platform.  As long as we can be sure the performance of the new platform
does not constitute a regression, then we can roll out the new platform and be
confident that we have not made anything worse.

<!--more-->

In an effort to allow others to reproduce our work, we put everything in the
following
Jupyter notebook:

{% jupyter_notebook "/notebooks/2019-10-14-pilot-assessment.ipynb" %}
