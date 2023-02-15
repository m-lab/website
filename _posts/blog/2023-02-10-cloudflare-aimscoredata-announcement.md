---
layout: blog
title: "Announcement: M-Lab is now providing Cloudflare AIM data for free and open access"
author: "Lai Yi Ohlsen"
date: 2023-02-10
breadcrumb: blog
categories:
  - partnership
  - data
  - bigquery
  - AIM
  - cloudflare
---

Want to know more about your Internet connection? M-Lab is proud to announce that we are now hosting Cloudflare’s Aggregated Internet Measurement (AIM) dataset, which puts network quality in an end-user context.<!--more-->


![logos]({{ site.baseurl }}/images/blog/2023-02-cloudflare/logos.jpeg){: width="750"}



M-Lab’s mission is to measure the Internet, save the data, and make it universally accessible and useful. Today we are excited to announce that as part of that mission, we are providing free and open access to a new dataset from Cloudflare that was designed with the end-user in mind. 

## What is AIM? 

AIM was designed to address the following scenario many of you have either experienced previously or may be experiencing right now: you go visit your family for the holidays and you turn on the WiFi, notice Netflix isn’t loading as fast as it normally does, and you try to figure out why. The first thing you do is you go to speed.cloudflare.com, fast.com, speedtest.net, or even type “speed test” into Google Chrome to measure your Internet. When you do that, you get something that looks like this:


![IMC 2022 participants]({{ site.baseurl }}/images/blog/2023-02-cloudflare/speedtest-example.png){: width="750"}

If you want to see what that looks like for you, try it yourself here. But what do those numbers mean?  What is bandwidth and how does it make your Netflix experience better?  What is jitter and how does it impact your Zoom calls?  What is responsiveness and how does it make your League of Legends game better?  There are so many numbers on a speed test page and they are all supposedly very important, but the one thing that isn’t immediately clear is: how do these numbers explain why I can’t watch the newest season of Love is Blind?  Do they even explain that at all?

To help answer this, Cloudflare is launching the Aggregated Internet Measurement (AIM) initiative: a new format for displaying Internet quality in a way that makes sense to end users of the Internet while keeping the underlying data that network engineers need to make it better. 

Interested? We highly recommend reading the full blog post [on Cloudflare’s website](https://blog.cloudflare.com/aim-database-for-internet-quality/). 

## How do I access the data? 
If you already have access to M-Lab’s free and open database, good news, you already have access to AIM data! If you don’t, all you have to do is follow the instructions on our [BigQuery quick start page](https://www.measurementlab.net/data/docs/bq/quickstart/).

From there, you can follow this [example CoLab](https://colab.research.google.com/drive/1xgc-7L1Okr04MSjsYJfiFeUN0Gu05bpQ?usp=sharing) to run queries for both M-Lab’s NDT and Cloudflare’s AIM. 

## A bright future for Internet quality
A fundamental part of M-Lab’s vision has always been to bridge gaps between consumers, industry, research, policymaking and more. We are excited to support Cloudflare's aligned organizational vision of improving the Internet by providing data that can be used across these audiences. 

Figuring out what your Internet is good for shouldn’t require you to become a networking expert; that’s what we’re here for. With AIM and our collaborators at Cloudflare, we want to be able to tell you what your Internet can do and use that information to help make the Internet better for everyone.



