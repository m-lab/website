---
layout: blog
title: "Accessing Traceroute Data and Format Change RFC Results"
author: "Saied Kazemi"
date: 2022-02-02
breadcrumb: blog
categories:
  - traceroute
---

Two recent disucssions on Traceroute on our [M-Lab Discuss
group](https://groups.google.com/a/measurementlab.net/g/discuss) provided
clarity on how to access Traceroute data in BigQuery, as well as solicited
feedback from the community on proposed changes to the traceroute output
format.<!--more-->

## Accessing Traceroute Data

It seems like there is some confusion about accessing M-Lab's recent traceroutes
due to a change in its datatype name.

Up until early September 2021, MDA traceroutes were archived in Google Cloud
Storage (GCS) as `traceroute` datatype.  Since then, they are archived as
`scamper1` datatype without any changes to the content.

You can visit the links below to access traceroute archives obtained by the
`host`, `ndt`, and `neubot` experiments (replace `$experiment` accordingly).

* **Before 2021-09-11**: https://console.cloud.google.com/storage/browser/archive-measurement-lab/`$experiment`/traceroute
* **After 2021-09-11**: https://console.cloud.google.com/storage/browser/archive-measurement-lab/`$experiment`/scamper1

We will soon update the Traceroute page on M-Lab's website to cover the name
change and also provide links to `scamper1` datatype.

## Traceroute Format Change RFC Results

Thanks to everyone who provided feedback to our Traceroute RFC.  We are glad
that the community is finding M-Lab's traceroute data useful and is actively
using it.

Based on the feedback we have received, we will continue to collect MDA
traceroutes as before and archive them as `scamper1` datatype.

We are eager to hear from you how you use traceroute data. In particular, we
appreciate you letting us know:

* Do you use the traceroute archives in GCS or do you query traceroute data in
  BigQuery?
* What tools do you use to analyze traceroute data?
* What dashboards, reports, citations, etc. have you created?

Your answers will help us further improve our traceroute collection and archival processes.

Our team is organizing a meeting to discuss these topics and how to best
implement them to suit the needs of our community. If you would like to also be
included in this discussion re: MDA traceroutes, have recommendations for others
to include, or have feedback about the use of our traceroute data more broadly
-- please reply on the appropriate discussion thread listed below, or email
laiyi@measurementlab.net

* [Accessing Traceroute Data](https://groups.google.com/a/measurementlab.net/g/discuss/c/ztCKgktajLE/m/fLgd-SXMFgAJ)
* [Traceroute RFC - request for
  feedback](https://groups.google.com/a/measurementlab.net/g/discuss/c/dJGAkaISdgk/m/etSxhiZjAQAJ)
