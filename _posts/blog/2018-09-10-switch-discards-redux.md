---
layout: blog
title: "Switch discard investigation for early 2018"
author: "Stephen Soltesz"
date: 2018-09-10
breadcrumb: blog
categories:
  - data
  - data analysis
  - bigquery
  - research
  - microbursts
  - switch discard
  - performance
---

On February 1st, 2018, during a regular data quality review, we identified an
increase in switch discards at sites with 10Gbps equipment connected to 1Gbps
uplinks. We used our [switch telemetry
data](https://www.measurementlab.net/blog/disco-dataset/) to assess whether
there were any negative consequences for tests contained in our SideStream or NDT data sets, and
then we used the same data sets to determine whether our remediation strategy
had any negative effects. In both cases, we found no observable effects,
indicating that everything was below the noise floor for Internet performance data.

<!--more-->

Our methods are open, and can be seen in the [report](/data/docs/analysis/discard-analysis-2018/), which is itself an iPython
notebook to aid others in reviewing and reproducing our results.

The report:
* describes the cause of switch discards.
* describes the switch configuration changes made to prevent switch discards.
* describes the analysis used to conclude that the configuration change was positive.
* describes how to determine whether experiment data was affected by switch discards.

The report: [HTML](/data/docs/analysis/discard-analysis-2018/), [PDF](/publications/discard-analysis-2018.pdf), [ipynb](https://github.com/m-lab/m-lab.github.io/raw/master/notebooks/discard-analysis-2018.ipynb)
