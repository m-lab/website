---
layout: blog
title: "Upcoming M-Lab Community Call discussing Latency, Bufferbloat, Responsiveness"
author: "Lai Yi Ohlsen"
date: 2021-10-29
breadcrumb: blog
categories:
  - governance
  - experiment review committee
---

The M-Lab Experiment Review Committee met on October 21, 2021. The following is
a summary of our discussion.<!--more-->

We gave an update on the transitions M-Lab has made since the Experiment Review
Committee (ERC) last met.

* Moved to CS&S from New America’s OTI as a step towards the project being
  openly governed through committees such as the ERC.
* Platform upgrade to container based management which notably improves the
  process of onboarding and maintaining experiments.
* Continued to collect a significant amount of test volume and add more server
  locations globally.

We discussed the goals of the M-Lab ERC. 

* Review experiment proposals and guide curation of what runs on the M-Lab platform
  * Including reviewing current experiments to ensure they’re meeting criteria
    and/or there’s not a “better” experiment that measures the same thing.
* Help the M-lab project avoid scientific pitfalls.
* Champion the M-Lab project and assist in outreach for experiment proposals.

We discussed and agreed upon the following guidelines for committee member
participation and improvement:

* ERC will review proposals quarterly and provide feedback. The feedback could
  include no requested changes, suggested changes or required changes.
* New members to the committee will be asked to serve a 3 year term and then
  will have the chance to renew.
* A number of current members are open to serving 1-2 more years to stagger
  turnover (i.e. not all current committee members leaving at the same time).
* Recruiting members to have greater racial, gender, and geographic diversity is
  a priority for the committee.
* ERC membership should reflect the kind of experiments we want to solicit.
  Members should have a participation commitment to ensure a level of
  consistency.

We discussed interest in soliciting experiments that can provide or make
progress towards the following capabilities:

* Identifying how the user is connecting e.g. 5G, satellite, etc., while also
  protecting user privacy.
* Identifying the bottleneck i.e., is the throughput limited at a peering point,
  the home wi-fi network, etc.
* Measuring the performance outside of throughput e.g. a suite of latency
  measurements: ping times, DNS lookup times, latency under load (for whatever
  that comes to be defined), etc.
* Querying metadata about the experiment e.g. what version of the experiment
  produced the result?
* Measuring the reliability of a connection e.g. how stable over time.

The following criteria were discussed as a rubric for the approval of new experiments:

* Want to minimize functional duplication e.g. more than one test that attempts
  to measure the same metrics.
  * Tests should not interfere with one another.
* Information should be shareable to the public i.e. our open source and open
  data requirement should continue to be held.
* Should have a stated public interest goal that extends beyond enabling a
  particular business interest.
* The M-Lab Operations team has an action item to provide a concrete list of
  platform constraints for experiments.
