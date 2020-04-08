---
layout: blog
title: "Recent updates regarding the SamKnows experiment"
author: "Lai Yi Ohlsen"
date: 2020-04-08
breadcrumb: blog
categories:
  - platform
  - open source
  - community
---

Measurement Lab (M-Lab) has been a supportive partner of the FCC’s Measuring Broadband America program since its beginning due to the program’s commitment to openness, open data and transparency which aligns closely with M-Lab’s mission around open data and open source internet measurement. Measurement Lab began hosting the SamKnows server-side measurement tools in 2009.

As of February 14, 2020, Measurement Lab is unable to host the SamKnows experiment due to SamKnows’ decision to not comply with M-Lab’s long-standing open source requirements. To ensure and encourage transparency for the MBA program, we are publishing this post to document the timeline leading up to that decision.<!--more-->

## Overview of M-Lab Platform Upgrade, 2018 - 2020

From 2008 to 2019, the M-Lab platform used Princeton’s Planet Lab’s vserver technology to manage its infrastructure of off-net servers in Tier 1 data centers around the world. On January 24, 2018 M-Lab published its [plan]({{ site.baseurl }}/blog/modernizing-mlab/) to modernize the platform with several upgrades, including the use of Kubernetes and Docker.

The upgrade implemented a technical enforcement of our longstanding commitment to open source by requiring an open source Docker container to run on the platform. The technical requirement was outlined in an Experiment Developer MoU. All experiments were asked to sign the MoU to formalize their usage of the M-Lab platform’s resources.

Due to the significance of the upgrade, the details were discussed with the SamKnows team starting in January 2018. No technical issues were raised throughout 2018 during regularly scheduled meetings or asynchronous communications. Measurement Lab set a deadline of March 22, 2019 for an open source container to be provided which would have allowed for a six month testing period before the September 2019 MBA measurement period. In February 2019, SamKnows management communicated opposition to an open source version of their test, citing a threat to their business model. The March 22, 2019 deadline passed without an open source container from SamKnows.

In March 2019, Measurement Lab made its transition from New America’s Open Technology Institute to being a fiscally sponsored project of Code for Science and Society.

On April 8, 2019 M-Lab shared drafts of an Experiment Developer MoU and a final version on June 28, 2019. All experiments were asked to sign the agreement to formalize their usage of the M-Lab platform’s resources. The MoU outlined the technical requirement for an open source Docker container. From July 2019 to August 2019, SamKnows communicated delays in their legal department’s review of the document. They requested clarification on the terms of the agreement, which M-Lab responded to in a timely manner.

In August 2019, SamKnows had not provided a signed MoU or open source container. Measurement Lab agreed to delay the upgrade of their United States production servers to accommodate the SamKnows experiment during the 2019 MBA measurement period. In November 2019, after the MBA measurement period closed, Measurement Lab completed its platform upgrade. During and after the measurement period, SamKnows continued to delay the delivery of an open source docker container, citing upper management decisions and legal reviews. In December 2019, it was restated by SamKnows staff members that no there were no technical issues standing in the way.

On February 14, 2020, SamKnows notified Measurement Lab that they were unwilling to provide an open source server and as a result Measurement Lab is not able to host the SamKnows experiment for the upcoming 2020 Measuring Broadband America program.

## Summary

Measurement Lab’s open source requirement has existed since 2008, and aligns with the [FCC’s published commitment](https://www.fcc.gov/general/measuring-broadband-america-open-methodology){:target="_blank"} to transparency and open source code in the MBA Program. The new platform software enforces M-Lab’s open source requirement at a technical level, and the lack of an open source server prevents us from hosting the SamKnows experiment.

Participants in the MBA program should be notified that SamKnows’ decision to not use M-Lab’s off-net servers will result in changes to the infrastructure used in testing. The change should be reflected in the public resources that describes the program’s [open testing methodology](https://www.fcc.gov/general/measuring-broadband-america-open-methodology){:target="_blank"}.

Should SamKnows choose to provide an open source server, we remain open to hosting it on M-Lab infrastructure around the country and around the world. M-Lab’s commitment is to the Measuring Broadband America program and its open source principles. We are able and willing to host any open source test, SamKnows or otherwise.
