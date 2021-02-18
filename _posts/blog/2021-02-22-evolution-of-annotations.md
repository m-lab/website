---
layout: blog
title: "Evolution of M-Lab's Data Annotations"
author: "Chris Ritzo, Stephen Soltesz"
date: 2021-02-22
breadcrumb: blog
categories:
  - research
  - data
  - pipeline
---

In our recent [roadmap post][roadmap], we shared a list of milestones that the team is
working on this and last quarter. Our Datatype migration and Standardized
Columns milestone references the [gardener service][gardener], which maintains and
reprocesses M-Lab data, as well as the [UUID annotator][uuid-annotator], that
generates and saves per-connection metadata as annotations to user-conducted
measurements. This post provides more detailed information about how these
services have annotated measurements in the past and present, and expands on
what current work is happening now as mentioned in our roadmap post.<!--more-->

[roadmap]: {{ site.baseurl }}/blog/roadmap-update/
[gardener]: https://github.com/m-lab/etl-gardener
[uuid-annotator]: https://github.com/m-lab/annotation-service

When you choose to run one of the tests M-Lab provides, you're first connected
to one of our available servers nearest to you, through which the measurement is
conducted. That server collects the measurement, but actually not much else. As
measurements are collected, the IP address is used to provide _annotations_ that
provide more context and usefulness to research and analysis.

The values each of our [tests][tests] collect varies depending on the
measurement service, but as an example, the NDT performance test collects:

* the packet headers collected during the test, used to calculate the
  measurement values
* the measurement values you see at the end of the test
* the IP address assigned by your ISP to your router, modem, or other premise device

[tests]: {{ site.baseurl }}/tests/

## Evolution of M-Lab Annotations

Over our history, the M-Lab platform has changed quite a bit. Our post last year,
[Evolution of NDT][ndt-evolution], discussed changes to the NDT measurement
service over time, and touched on changes to our server instrumentation.
Similarly, how we have annotated measurements has evolved as well.

[ndt-evolution]: {{ site.baseurl }}/blog/evolution-of-ndt/

### Current work

A big part of what makes our data useful are the 
your observation that this is not documented coherently anywhere yet is good. I
want that to be in a design doc motivating the changes to the annotation-service
for the etl pipeline normalization effort. So, I'll make sure that's in there.

### 

9:40
regarding how to describe what's happening, I'd say:
geo annotations for ndt7 measurements are created by the uuid-annotator at measurement time.
these annotations are joined with ndt7 measurements by gardener during daily or batch parsing.
The uuid-annotator uses the maxmind geo2 db. But, so does the annotation-service starting in late 2017. Unfortunately, the annotation-service is not using all of the geo2 fields. (@roberto is working on fixing this).
9:41
So, it's fair to say that only ndt7 is fully annotated using the maxmind geo2 data currently.

critzo  9:44 AM
Thank you @soltesz. To go further, could you confirm or correct this:
The annotation-service is being replaced by gardener.
It currently annotates ndt5 and web100 datatypes, also using Maxmind Geo2, but does not use all available fields as gardener does

soltesz  9:48 AM
The parser+annotation-service pair for geo annotations is being replaced by uuid-annotator+gardener. -- annotations occur at time of measurement instead of during parsing.
that's right. And, pre-2017 the annotation-service is using  maxmind geo1 format.

critzo  9:50 AM
Thanks for this. I think it might be relevant to draft this into a blog post
about the history of our annotation services and formats, with a mind toward
explaining what work is happening now. 

Yes, uuid-annotator is basically the replacement for annotation-service.
11:36
Yes, uuid-annotator is used for the ndt7 datatype, and will soon be for other datatypes.
11:36
Yes, the uuid-annotator uses the geo2 maxmind database.


pre aug 2017 		first gen maxmind GeoIP format 1 
			(internal to google pipeline)
aug 2017 - march 2020	annotation-service deployed, uses maxmind Geolite2
March 2020		UUID annotator introduced.
			Clients are identified at the time they connect to 
			our servers.

Goals/Tasks:
- retire annotation service
- reconcile geo1 - geo2 region names
- fix server geolocation information returned by annotation service

