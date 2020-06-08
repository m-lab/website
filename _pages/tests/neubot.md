---
layout: page
permalink: /tests/neubot/
title: "Neubot"
breadcrumb: tests
---

# Neubot Experiment & Dash Streaming Test

The Neubot experiment was originally developed as a free software Internet bot developed and maintained by the Nexa Center for Internet & Society, that gathered network performance data useful to investigate network neutrality. The original Neubot client was [retired in January 2019](http://www.neubot.org/2019/01/retiring-neubot-client.html){:target="_blank"}.

M-Lab continues to host Neubot's DASH streaming test, one of the original suite of Neubot tests.

## DASH Test

DASH is designed to measure the quality of tested networks by emulating a video streaming player. This test is called DASH because it uses the DASH ([Dynamic Adaptive Streaming over HTTP](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP){:target="_blank"}) streaming technique.

DASH can be useful to understand the baseline streaming performance of a specific network connection. It measures video-related metrics as well as network metrics that are key to understand the reason of performance issues.

When you run the test, it emulates the streaming of a thirty-second video from an M-Lab server. The video is divided in fifteen two seconds segments. When the client requests a video segment, it must also specify the video quality (e.g., SD, HD, Super HD). The higher the request quality, the bigger the returned segment. During the streaming, the client seeks to use the higher quality that does not load the network, creating queues, so that the streaming can continue smoothly.

The player is simple in that it does not employ algorithms that real players (e.g. YouTube, Netflix) implement to keep the streaming quality stable and to avoid stalls. This simplicity is, however, key to understanding the contribution of the network to streaming quality, which otherwise could be masked by smart players’ behavior.

As a result, it is expected that real players will be generally faster than this test, because they implement more optimization techniques. However, if the [throttling of video is caused by congestion at interconnection points](https://arstechnica.com/tech-policy/2010/12/comcastlevel3/){:target="_blank"}, this test may result faster when the network path from the client to the M-Lab server does not pass through the congested interconnection point.

## Source code

* [Neubot M-Lab Server & Client](https://github.com/m-lab/dash){:target="_blank"}

## Citing the M-Lab Neubot Dataset

Please cite this data set as follows: **The M-Lab Neubot - Dash Data Set, &lt;date range used&gt;. https://measurementlab.net/tests/neubot**

## Policies & Support Information

* **Get more information** at [http://www.neubot.org/](http://www.neubot.org/){:target="_blank"}.
* **Neubot Privacy Policy**: [https://github.com/neubot/dash/blob/master/PRIVACY.md](https://github.com/neubot/dash/blob/master/PRIVACY.md){:target="_blank"}

## Data Collected by DASH in Raw Format

Data collected by Neubot's DASH test while hosted on M-Lab is available in raw format at [https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot/dash](https://console.cloud.google.com/storage/browser/archive-measurement-lab/dash){:target="_blank"}.

## Data Collected by Neubot in Raw Format

Data collected by Neubot while hosted on M-Lab is available in raw format at [https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot](https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot){:target="_blank"}.

## Neubot & DASH Data in BigQuery

Neubot and DASH test data are not published to BigQuery at this time.
