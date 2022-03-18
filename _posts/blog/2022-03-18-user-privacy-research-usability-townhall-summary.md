---
layout: blog
title: "Request for Comments - User Privacy & Research Usability"
author: "Lai Yi Ohlsen"
date: 2022-03-18
breadcrumb: blog
categories:
  - community
  - privacy
  - research
---

On March 16 we hosted a town hall discussion regarding M-Lab’s collection of IP addresses and asked for feedback on potential alternatives. We are accepting comments on the techniques we proposed until April 1.  <!--more-->


## Request for Comments - due Friday, April 1, 2022

To ensure our design is as well-informed as possible, please submit your feedback on the techniques we proposed during the Town Hall to laiyi@measurementlab.net before April 1, 2022. Any amount or format is appreciated. 

## Recording

<iframe width="560" height="315" src="https://www.youtube.com/embed/7KXElRtnfGM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Slides used during the presentation can be found [here](https://docs.google.com/presentation/d/1_WCtz3BjbUbCC0m1K2LoOVcfcTaDAYRIBCh14XI54Mw/edit#slide=id.g8dc385d038_0_802).

## Summary 
* The collection of IP addresses poses a set of challenges for some while also enabling research for others. 
    * For example, we need to be able to dedupe clients, which IP addresses enable us to do. 
* We proposed an inventory of partial techniques to redact IP addresses which could be combined in various ways to provide more than one complete solution, with slightly different properties (e.g. the addition of more annotations).
* We can make use of BigQuery’s column-specific Access Control Level (ACL)  capabilities.  
* We are also considering Acceptable Use Agreements that could also be used to grant access to redacted data. 
* Risks include: IP address leaking; significantly weakening traceroute research; and a series of IPv4 and IPv6 related risks. 
* Research that  might be adversely affected by this change includes: understanding shared IP addresses; understanding IP stability; M-Lab’s own system validation; and use of curated clients. 

## Points shared by participants during discussion
* Could the policy test users agree to be modified to use a tiered approach? 
* Acceptable Use Agreements. 
    * No objections.  
    * Acceptable Use Agreements are considered to be typical. 
    * There has been success with a layered approach (e.g. open, public, private).  
* A client integrator who collects additional PII said the removal would not affect their use case (since they are collecting all the information they need on their own). 
* IP geolocation is important for researchers. “Unredacted is always better than redacted.”
* HTML5 geolocation is flawed. 
* Regardless of what modifications are made, researchers will want to know how the dataset will be changed. 
* We should consider how the OONI project handles PII. 
* Has there been any discussion around browser measurements from Apple devices which use the new [private relay scheme](https://www.apple.com/privacy/docs/)?
    * Not yet.  

## Links Shared
* [What is considered personal data under the EU GDPR?](https://gdpr.eu/eu-gdpr-personal-data/)
* [Apple’s Private Relay Scheme](https://www.apple.com/privacy/docs/)
* [Small web application to test performance and privacy through proxies](https://speed.leading-edge.io/index.html)
* [IP Geolocation Database Stability and Implications for Network Research](https://hal.archives-ouvertes.fr/hal-03419874/document)