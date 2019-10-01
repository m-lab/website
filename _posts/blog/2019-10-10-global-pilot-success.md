---
layout: blog
title: "M-Lab 2.0 Platform: Global Pilot Assessment"
author: "Peter Boothe"
date: 2019-10-10
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

We deployed [the new M-Lab platform to 1/3rd of the M-Lab fleet](), and now we
need to assess whether it is working better than the old platform was.  As soon
as we can be sure the performance of the new platform does not constitute a
regression, then we can roll out the new platform to 2/3rds of the fleet, redo
this analysis in a pro-forma way to make sure nothing has gone wrong, and then
roll out the new platform to the remaining nodes around the world.

<!--more-->

This question is in one of the classic forms suitable for statistical analysis.
We have lots of data and a single highly consequential decision to make.  We
have a default action (continue to roll out the new platform) and we would like
to be at least 95% confident that this is will not cause a performance
regression, or else we will change away from our default action and not roll out
the new platform.  The authors have spent years creating the new platform and
each written thousands of lines of code in support of it, so we are trying to
use statistics to ensure that our desire to see our code being used does not
blind us to new problems.  If this analysis shows that we should not yet do the
rollout, then (after we fix the discovered problems) in future months we will
have to up our certainty level, or we could reasonably be accused of
[p-hacking](https://xkcd.com/882/) across time.

As long as we can be more than 95% confident that the new platform is not worse
than the old platform, we should continue the rollout.  In order to do this
analysis, we need to define "the new platform", "the old platform", and "worse":

* **the new platform** is all of our kubernetes-controlled machines.  Every
  M-Lab site (like `lga04.measurement-lab.org`, abbreviated to `lga04`) has 4
  machines behind a single switch connected to (usually) a 10Gb uplink.  The
  machines behind the switch are named `mlab1.lga04`, `mlab2.lga04`,
  `mlab3.lga04`, and `mlab4.lga04`.  Historically the `mlab4` machines have been
  used primarily for development and do not receive much (or any) production
  traffic.  We have put the `mlab3` machine at every site under kubernetes
  control and made it run the new software stack.  Each of these machines has
  been serving production traffic for 2+ months now, providing us with a lot of
  data.
* **the old platform** is all of our `mlab2` machines around the world. We know
  that some subset of NDT clients has been hardcoded to only send traffic to
  `mlab1` machines, which means that `mlab1` NDT traffic and `mlab3` NDT traffic
  is difficult to compare in an apples-to-apples manner.  On the other hand, we
  know of no clients which systematically have a prefence between `mlab2` and
  `mlab3` machines, so we restrict our analysis of the PlanetLab-based platform
  to just the `mlab2` machines.
* **worse** is a relative measure of performance experienced by clients.  The
  platform is worse for measurement clients if RTT is systematically elevated,
  download or upload speeds are systematically depressed, or error rates have
  systematically increased.  So, when we want to ensure that the platform is not
  worse, we have to gain confidence levels for each of these measurements such
  that our total confidence that the platform as a whole has not gotten worse is
  at least 95%.

So, let us examine the performance distributions on the `mlab2` nodes (which are
running the old platform) and the `mlab3` nodes (which are running the new
platform).  We do this by loading the NDT results for download, upload, and RTT
for each set into R, and then calculating a PDF kernel for each distribution.
The new kernel should not be to the left of the old one - if it is, then we have
"work to do" to explain the difference, either by appealing to a (yet to be
determined) noise floor and/or by showing that the difference is not
statistically significant at the relevant level.  (Each of the below images is
linked to a .PDF file that contains a vector graph of the plot as well as all
the SQL code and R code required to reproduce the image.)

[![Download distribution]({{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/download_distribution.png)](download)
[![Upload distribution]({{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/upload_distribution.png)](upload)
[![MinRTT distribution]({{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/minrtt_distribution.png)](minrtt)

[download]: {{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/download_distribution-2019-09.pdf
[upload]:   {{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/upload_distribution_2019-09.pdf
[minrtt]:   {{ site.baseurl }}/images/blog/2019-10-10-global-pilot-success/minrtt_distribution_2019-09.pdf

From the images above, we can see that each distribution is better for the new
platform as compared to the old, which lends zero weight to the idea that the
new platform is worse, which gives us a high level of confidence that the new
platform is not worse.
