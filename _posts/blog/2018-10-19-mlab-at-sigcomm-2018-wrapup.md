---
layout: blog
title: "SIGCOMM 2018 Hackathon Outcomes"
author: "Chris Ritzo"
date: 2018-10-25
breadcrumb: blog
categories:
  - event
  - community
  - bigquery
  - research
  - data
  - performance
---

![SIGCOMM Hackathon - M-Lab Participants Working]({{ site.baseurl }}/images/blog/sigcomm2018-2ndplacewinners.png)

M-Lab had the pleasure of attending the first ever [SIGCOMM hackathon](http://conferences.sigcomm.org/sigcomm/2018/hackathon.html) on August 25, 2018, at the Nokia Skypark headquarters in Budapest, Hungary. The hackathon, sponsored by Nokia, DECIX, and Netflix, invited network research faculty, students, and industry professionals from around the world to form teams and develop tools, new features or analyses during the Saturday following the SIGCOMM conference. <!--more-->We proposed the projects below, and team members Georgia Bullen and I attended and supported hackathon attendees who chose to work on them.

## M-Lab Project ideas

* [Project 1: ASN Annotation](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-1-easy-asn-annotation)
* [Project 2: SignalSearcher](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-2-mediumadvanced-signalsearcher)
* [Project 3: Paris Traceroute Data Analysis](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-3-advanced-paris-traceroute-data-analysis)
* [Project 4: NDTjs Mock Testing Environment](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-4-medium----ndtjs-mock-testing-environment)
* [Project 5: Extend the M-Lab Viz Platform](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-5-medium----extend-the-m-lab-viz-platform)
* [Project 6: Browser Extension](https://github.com/acmsigcomm18hackathon/hackathonprojects/wiki/MeasurementLab#project-6-easy----browser-extension)

Approximately 15 of the participants chose to work with M-Lab on projects around the Paris Traceroute dataset and the M-Lab Annotation Service. One group built on their previous work examining data from RIPE atlas probes to produce a method of analysis and code for comparing routes gathered by Paris Traceroute with those gathered by RIPE probes. Their ultimate goal was to characterize similar routes or vantage points so as to simplify the choice of which RIPE probes to use for their research. Another group examined M-Lab annotation-service code, suggested methods for improving its efficiency, and prototyped an algorithm that could be used to add the Autonomous System Name and number as an annotated field derived from an individual test's IP address. A few other groups worked with the Paris Traceroute data to develop a method for easily ordering the hops and combining them with the corresponding NDT measurements.

![SIGCOMM Hackathon - M-Lab Participants Working]({{ site.baseurl }}/images/blog/sigcomm2018-hacking.png)

At the end of the day, all of the teams presented their projects to other hackathon attendees and a panel of judges, who asked questions and provided a critical review of their approach. Two of the teams working with M-Lab tied for second place!

![SIGCOMM Hackathon - M-Lab Participants Working]({{ site.baseurl }}/images/blog/sigcomm2018-presenting.png)

Our groups were awesome to work with, and the collaboration they exhibited exemplified the values of the open source community. Coming from all over the world, and having mostly never worked together before, it was exciting to see the diversity of thought and expertise in our participants. The ideas and code they produced during the hackathon were very useful to the M-Lab team. The insights gained through this experience will result in substantive improvements to our documentation and processes around cultivating open source contributions. M-Lab was honored to be a part of the first ever SIGCOMM hackathon, and we thank the organizers for inviting us to participate. We also wish to offer the participants who worked with us our gratitude and thanks, and wish each of them well.

Check out the participants’ work:

* [Paris Traceroute/RIPE Atlas Vantage Point Similarity](https://github.com/pgigis/vantage-point-similarity)
* [Associating Paris Traceroute and NDT Test Data](https://nemelor.wordpress.com/2018/08/28/access-to-mlab-traceroute-data-from-google-bigquery/)
* [Annotating ASN and Annotation Optimization Methods](https://github.com/twabulldogg/annotation-service)
