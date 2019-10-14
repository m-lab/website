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

We deployed [the new M-Lab platform to 1/3rd of the M-Lab fleet](), and now we
need to assess whether or not it is a performance regression, relative to the
old platform.  As long as we can be sure the performance of the new platform
does not constitute a regression, then we can roll out the new platform and be
confident that we have not made anything worse.

<!--more-->

Because M-Lab data is used to derive local conditions around the world, we want
to make sure that, at every site around the world, the new platform does not
perform worse than the old platform.  To define "worse" more explicitly, we
first need to establish a per-site "noise floor".  Some regions of the world and
some sites experience highly variable Internet performance, so whether a worse
performance is statistically significant depends on the base level of variation
that naturally occurs at that site.

For every site we created a q-q plot to compare upload and dowload performance, and we also calculated the expected performance at each site.  An [ipython notebook containing the full analysis](/data/docs/analysis/2019-10-14-pilot-analysis) is available, but we reproduce one figure here:

```txt
                   akl01
                   ams03
                   ams04
                   ams05 atl08
                   ams08 bru01
                   ath03 bru03
                   beg01 den02
                   bom01 dfw03
                   bom02 dfw07
                   bru02 dub01 arn03
                   bru04 fln01 arn04
                   cpt01 fra03 atl02
                   fra01 iad02 atl03
                   fra02 iad03 atl04
                   fra04 iad04 atl07
                   ham02 iad05 den04
                   lhr02 iad06 den05
                   lhr03 lga03 dfw02
                   lhr04 lga04 dfw05
                   lhr05 lga06 dfw08
                   lis01 lga08 lax02
                   lju01 lis02 lax03
                   mad03 mia04 lax04
                   mad04 mia06 lax05
                   mil02 mnl01 lax06
                   mil03 nuq02 mia02
                   mil05 nuq03 mia03
                   nbo01 nuq04 mia05
                   par04 nuq06 nuq07
             jnb01 prg02 ord06 ord02
             mad02 prg03 sea02 ord03
             mil04 prg04 sea04 ord04 arn02
             par02 prg05 sea08 ord05 arn05
             par03 syd02 sin01 sea07 bcn01
             par05 syd03 svg01 tgd01 hnd02
             tnr01 tpe01 trn01 wlg02 sea03       lga05
             vie01 tun01 yyz02 yvr01 ywg01 yqm01 yyc02
|-----|-----|-----|-----|-----|-----|-----|-----|-----|-----|
   80%   90%  100%  110%  120%  130%  140%  150%  160%  170%
 Each site's new download performance as a percentage of old
```

From just this chart, we can see that no site saw worse performance on the new
platform as compared to the old platform. As such, we are rolling ahead with the
new M-Lab platform worldwide, with a small exception for our US sites, where we
are keeping the old platform running for the duration of the Measuring Broadband
America Act quiet period in support of a long-term project partner.
