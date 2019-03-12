---
layout: blog
title: "M-Lab 2.0 Platform Migration Update"
author: "Stephen Soltesz"
date: 2019-03-12
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

Last year, we outlined our plans to [Modernize the M-Lab
Platform][modernize]{:target="_blank"}. This year, we’re bringing them to
life. Here’s a summary of why the platform update is so valuable and what you
can expect throughout the year.

[modernize]: {{site.baseurl}}/blog/modernizing-mlab
<!--more-->

## Advantages

Developing new tools for the modern M-Lab platform is easier than ever. If
the tool runs in a [Docker container][docker]{:target="_blank"} (with or
without `--net=host`), then it can run on M-Lab. Github repos connected to
[Dockerhub.com][dockerhub]{:target="_blank"} build fresh containers on new
tags. And, with approval from M-Lab staff, kubernetes will safely automate
the rollout.

Faster, automated deployments tightly couple the measurement tool source code
to the binary docker image, to the version running in production, to the data
collected, and to the rows in BigQuery. The only way to get code to run on
the platform is to build from an open source repository, ensuring that all
code on the M-Lab platform is open source. We can also archive every single
binary image that has been run on the platform, aiding in the reproduction
and verification of past results. This new level of openness, transparency,
and reproducibility is, to our knowledge, without precedent in the Internet
measurement space.

[docker]: https://www.docker.com/resources/what-container
[dockerhub]: https://hub.docker.com/

## Longitudinal Analysis

From 2009-2019, M-Lab NDT and Sidestream measurements have used the
[web100][web100]{:target="_blank"} data type. From 2019 forward, the modern
platform will collect the [tcp-info][tcpinfo]{:target="_blank"} data type for
all TCP connections.

We will preserve the ability to perform longitudinal analysis on our 10+
years of network measurements. During the beginning of our production
deployment milestone, we will collect and compare measurements from the
legacy and new platforms. For slower clients, their performance should not
change. We expect a large population of clients to have the same behavior on
the old and new platform. For the subset of clients that perform better on
the new platform, we will provide a way of calibrating past data to be
comparable to the new.

[web100]: https://cloud.google.com/bigquery/docs/tcp-kis.txt
[tcpinfo]: https://github.com/m-lab/tcp-info/blob/master/nl-proto/tcpinfo.proto

## Upcoming Milestones

### Canary deployment begins (in progress)

Right now, we’re bringing together the last 9 months of work starting with a
quarter of the physical platform. Historically, a fourth of the platform
served as a “spare” machine at every site (~120 machines). Starting with the
Kubernetes platform, a small fraction of clients that opt-in to using the
[M-Lab location service][mlabns]{:target="_blank"} will be directed to these
“canary” machines. With a small fraction of real traffic, we will validate
that everything works as intended end to end.

[mlabns]: https://mlab-ns.appspot.com

### Production deployment begins (target end of Q2)

Once the canary deployment is stable and represents most of the functionality
we need, we will begin deployments to a third of the production platform
(~120 machines). At this point, we will be running a “hybrid platform”
consisting of both legacy and modern software platform. During this time, we
will collect A/B data for cross validation. As well, all experiments that are
ready to deploy to the new platform can be deployed as well.

### Production deployment completes (target mid-Q3)

Once all operational challenges are resolved, all A/B data collected, and all
measurement tools that we will continue supporting on the new platform have
containerized versions available, we will complete the update to the
Kubernetes-based platform.
