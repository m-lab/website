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

We deployed [the new M-Lab platform to 1/3rd of the M-Lab fleet](/blog/global-pilot-entry), and now we
need to assess whether or not it is a performance regression, relative to the
old platform.  As long as we can be sure the performance of the new platform
does not constitute a regression, then we can roll out the new platform and be
confident that we have not made anything worse.

<!--more-->

We found that no site saw worse performance on the new
platform as compared to the old platform. As such, we are rolling ahead with the
new M-Lab platform worldwide, with a small exception for our US sites, where we
are keeping the old platform running for the duration of the FCC's [Measuring Broadband
America Program](https://www.fcc.gov/general/measuring-broadband-america){:target="_blank"} quiet period in support of a long-term project partner.

In an effort to allow others to reproduce our work, we put everything in the
following
Jupyter notebook (also available for [direct download](https://github.com/m-lab/m-lab.github.io/raw/master/notebooks/2019-10-14-pilot-assessment.ipynb):

{% jupyter_notebook "/notebooks/2019-10-14-pilot-assessment.ipynb" %}
