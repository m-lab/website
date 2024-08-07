---
layout: blog
title: M-Lab to the Cloud
author: "Lai Yi Ohlsen"
date: 2022-07-27
breadcrumb: blog
categories:
  - cloud
  - platform
  - announcement

---

M-Lab is excited to announce “M-Lab to the Cloud”, beginning with our pilot deployment of NDT servers on cloud infrastructure.<!--more-->

## Background and Motivation 

Since our launch in 2009, M-Lab’s server-side software has been deployed on physical, bare metal machines. At the time, cloud storage and computing were only beginning to develop, but over the past decade the relevance of cloud technologies to Internet measurement has only increased.

As of June 2022, M-Lab is proud to announce that we are expanding our infrastructure into the cloud. Our motivations include:
* **Measure more Internet paths.**  Increasingly, users depend on services hosted in Cloud providers. By including Cloud providers as part of M-Lab's measurement platform, we will measure more paths representative of users' experience. Measuring these paths benefits researchers who use our data to derive insights about the quality of user experience, as well as end users who use our tests to better understand the quality of their connection. 
* **Flexible deployments.** Cloud deployments offer more flexibility and ease when deploying new servers and change the cost/benefit considerations for factors when considering a new location.
* **Alternate deployment models for measurement services.** Hosting measurements on cloud services may introduce novel approaches to measurement not possible with bare metal alone. We look forward to collaborating with the Internet Research community to discover what new measurements become possible with cloud architecture. 

## Pilot Deployment

As a first step, we’ve deployed a pilot deployment of NDT into Google Cloud. At the time of this announcement, a small percentage (less than 10%) of NDT clients in a few select regions are directed to cloud nodes , while the majority are sent to bare-metal servers, as part of a strategy known as Canary Testing. We will describe our particular methodology in more detail in a follow-up blog post, but the general idea is to compare results from clients that were sent to cloud servers with results generated by bare-metal servers and look for any significant differences that would prevent us from deploying these servers on a wider scale. 

## Call for Collaborators

We are using Google Cloud Platform as an initial test target, due to our team’s familiarity with GCP. However, our next target is test deployments within other cloud providers such as Amazon Web Services and Microsoft Azure. We are seeking partners to support our efforts either monetarily and/or with expertise in these services. 
