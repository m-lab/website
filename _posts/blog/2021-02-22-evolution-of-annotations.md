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


Like any quality research instrument, the M-Lab platform receives continual
monitoring, maintenance, and upgrades, to ensure it is working as expected and
evolves to improve. When we talk about "the M-Lab platform", we're referring to
many pieces of hardware and software that provides the measurement services you
use, processes the results, and makes that data available in various formats.

[roadmap]:
[gardener]:
[uuid-annotator]:

your observation that this is not documented coherently anywhere yet is good. I want that to be in a design doc motivating the changes to the annotation-service for the etl pipeline normalization effort. So, I'll make sure that's in there.
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
Thanks for this. I think it might be relevant to draft this into a blog post about the history of our annotation services and formats, with a mind toward explaining what work is happening now. 