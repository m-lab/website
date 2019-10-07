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
need to assess whether or not it is a performance regression, relative to the
old platform.  As long as we can be sure the performance of the new platform
does not constitute a regression, then we can roll out the new platform to
2/3rds of the fleet, redo this analysis in a pro-forma way to make sure nothing
has gone wrong after the 1/3rd to 2/3rds rollout, and then roll out the new
platform to the remaining nodes around the world.

<!--more-->

Because M-Lab data is used to derive local conditions around the world, we want
to make sure that, at every site around the world, the new platform does not
perform worse than the old platform.  To define "worse" more explicitly, we
first need to establish a per-site "noise floor".  Some regions of the world and
some sites experience highly variable Internet performance, so whether a worse
performance is statistically significant depends on the base level of variation
that naturally occurs at that site.

More concretely, for every site, we would like to be certain, at the 95% level
or above, that the performance data gathered on the new platform is not worse
(lower bandwidth, higher latency) than the old platform at that same site.

We are in a situation that is an almost textbook case for statistical analaysis:
1. We have a lot of data
2. We have a question of interest (is the new platform at least as performant as
   the old platform?)
3. We have a default action (roll out the new platform to 2/3rds of the fleet)

In developing an analysis, we want to be congnizant of a few important facts:
1. Internet performance is differently variable in different regions of the
   world.
2. Not all machines at a site are used equally. In particular, we know of some
   NDT clients which will ONLY run a test to `ndt.iupui.mlab1.lax03` and would
   never run a test to `ndt.iupui.mlab2.lax03` or `ndt.iupui.mlab3.lax03`.
3. The kubernetes platform is not rolled out to any `mlab1` machines.

Our needs and our constraints lead to the following per-site analysis method to
decide whether the new platform is not a regression at a given site:

Let us assume that for this site, the 'mlab2' machine uses PlanetLab, vservers,
and web100 (a PL machine) and the `mlab3' machine uses Kubernetes, Docker, and tcp-info (a k8s machine).
1. Calculate the mean and median download, upload, and latency experienced by
   all NDT clients that connected to `mlab2` or `mlab3` during the month of
   September.  If the mean and median for the new platform are both not worse
   than the mean and median for the old platform, then we are done.  The
   performance of the new platform at that site does not constitute a
   regression.
2. If either of the mean or median upload speed, download speed, or RTT have
   regressed, then we calculate a "noise floor" for the site by doing the same
   analysis for January, February, ..., June of 2019.  During those months, all
   the `mlab3` machines were controlled by the old platform and as such, our
   monthly variation between sample means establishes a "noise floor".  We then
   compare the new difference (between the new and old) to the established noise
   floor (between the old and the old) to see whether it is within historical
   norms.  If we are 95% confident that the new performance differential is
   within historical norms, then we can conclude that the new performance at the
   site does not constitue a regression.
3. If the regression in performance is outside of historical norms, we conduct
   an investigation to discover why.

Armed with this analysis method, we set about investigating M-Lab's Bigquery NDT
data.  We begin by calculating a maximum per-client performance to each machine
at the site, to prevent any
individual network endpoint from contributing too much to the final analysis.
We then compare the mean and median of these "monthly bests" between the PL and
k8s.

Measurement lab has 128 sites with k8s nodes:
{akl01, ams03, ams04, ams05, ams08, arn02, arn03, arn04, arn05, arn06, ath03,
atl02, atl03, atl04, atl07, atl08, bcn01, beg01, bom01, bom02, bru01, bru02,
bru03, bru04, cpt01, del01, den02, den04, den05, den06, dfw02, dfw03, dfw05,
dfw07, dfw08, dub01, fln01, fra01, fra02, fra03, fra04, fra05, gru01, gru02,
gru03, gru04, ham02, hnd02, hnd03, iad02, iad03, iad04, iad05, iad06, jnb01,
lax02, lax03, lax04, lax05, lax06, lga03, lga04, lga05, lga06, lga08, lhr02,
lhr03, lhr04, lhr05, lis01, lis02, lju01, maa01, maa02, mad02, mad03, mad04,
mia02, mia03, mia04, mia05, mia06, mil02, mil03, mil04, mil05, mnl01, nbo01,
nuq02, nuq03, nuq04, nuq06, nuq07, ord02, ord03, ord04, ord05, ord06, par02,
par03, par04, par05, prg02, prg03, prg04, prg05, sea02, sea03, sea04, sea07,
sea08, sin01, svg01, syd02, syd03, tgd01, tnr01, tpe01, trn01, tun01, vie01,
wlg02, yqm01, yul02, yvr01, ywg01, yyc02, yyz02}

We use the following query to discover, for each site, the performance for the
k8s machine and the PL machine that is not an mlab1:

```
```

Out of this list, XXX show a performance that is not worse according to the
standard set forth in step 1. That leaves the following YYY sites requiring us
to go to analysis stage 2: {}

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
