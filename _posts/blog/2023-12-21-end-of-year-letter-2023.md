---
layout: blog
title: "2023 Year in Review"
author: "Lai Yi Ohlsen, Georgia Bullen"
date: 2023-12-21
breadcrumb: blog
categories:
  - annual-review
---

2023 was a big year! Here’s a summary of what we were up to and what's coming up next. <!--more-->

## Executive Summary

In 2023 we:
* Published three new datasets to BigQuery: Wehe, Reverse Traceroute and Cloudflare’s speed test and AIM data. 
* Expanded the virtual presence of the platform and developed MSAK, a tool for prototyping throughput performance measurements.  
* Began new partnerships with Cloudflare and Dioptra, hosted monthly Community Calls and presented M-Lab and the importance of open Internet Measurement data at 10+ conferences, gatherings and webinars. 

 
In 2024 we plan to:
* Increase the number of virtual sites and diversify cloud providers, pursue client integration partnerships and make it easier to contribute infrastructure to the M-Lab platform.
* Enable calibrated measurements by increasing the number of client vantage points, redefine Internet Quality, and build out our Research and Technical Advisory Committee. 

You can support M-Lab in the following ways:
* Donate data or resources 
* Partner with us
* Include our data and tools in your research
* Sponsor a site


## Year in Review

Measurement & Data

We introduced the [autoloading pipeline](https://github.com/m-lab/autoloader) in April with the announcement of [our partnership with Cloudflare](https://www.measurementlab.net/blog/cloudflare-aimscoredata-announcement/). Since then, the autoloading pipeline now publishes 10 new data types from Reverse Traceroute, Wehe, and Measurement Swiss Army Knife (MSAK) services, and the host environment.



* **Cloudflare’s speed test and AIM Data is now [published in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&ws=!1m4!1m3!3m2!1smlab-cloudflare!2sspeedtest)**. Aggregated Internet Measurement (AIM) is a new format for displaying Internet quality in a way that makes sense to end users of the Internet while keeping the underlying data that network engineers need to make it better. Every Cloudflare speed test produces an AIM Score and each test result is published to BigQuery for longitudinal analysis at scale. You can read more about AIM [here](https://blog.cloudflare.com/aim-database-for-internet-quality/). 
* **Wehe data is now [published in BigQuery](https://console.cloud.google.com/bigquery?project=measurement-lab&ws=!1m4!1m3!3m2!1smeasurement-lab!2swehe_raw)**.The Wehe application allows users to detect whether various applications are being throttled. Wehe has run on the M-Lab platform since 2020, and now the [data is published](https://www.measurementlab.net/blog/wehe-bigquery-announcement/) via the autoloading pipeline. Learn more about Wehe from the October [community call](https://www.youtube.com/watch?v=fHDsBKle1lQ).
* **More Reverse Traceroute data is being collected and [published to BigQuery.](https://console.cloud.google.com/bigquery?project=measurement-lab&ws=!1m4!1m3!3m2!1smeasurement-lab!2srevtr_raw)**. Reverse traceroute, which constructs traceroutes from a client to an M-Lab server, has run on M-Lab for over a decade. Recently, M-Lab & the reverse traceroute team are generating reverse traceroutes for 1% of NDT measurements, which are then available in BigQuery. Combined with the traceroute datasets this provides forward and reverse path information for NDT tests. Look forward to announcements and more information soon.

Platform
* **Over 30% of our traffic measures performance to Cloud servers.** In the 15 years since M-Lab started, the Internet has changed significantly! In 2022, we started introducing testing to cloud servers to better measure performance aligned with the most common user experience. After completing a comparative analysis to ensure that there would be no adverse effects on the data, we began migrating an increasing amount of traffic. Learn more from our update at the September [community call](https://youtu.be/fcC2qSmMIy8?si=tA3ikfpVadoBjzip&t=1365). 
* **We started using Terraform for our automated Cloud management**. Terraform, an infrastructure as code tool, will enable us to better support current and future partnerships.
* **Measurement Swiss Army Knife (MSAK) [launched this year](https://www.measurementlab.net/blog/introducing-msak/)**. This new measurement service provides multi-stream throughput and UDP latency measurements -- the first open UDP latency measurement of its kind on the platform. The [Go client](https://github.com/m-lab/msak/tree/main/cmd/msak-client) is available now, with the javascript client available soon. Learn more about MSAK from the July [community call](https://www.youtube.com/watch?v=Lvo-nlX5YeM&t=1s).

Community Engagement
* We started a **partnership with Dioptra,** an Internet cartography research group within the Networks and Performance Analysis (NPA) team at the LIP6 computer science laboratory in Paris, France, to support our mutual efforts in open Internet measurement research. 
* Every month we hosted our **community calls** to share work from M-Lab, its partners, and the broader community — holding space to talk about changes in the Internet measurement ecosystem, provide updates from M-Lab, and get your input on M-Lab’s plans for the future. You can find recordings of every call on our [YouTube channel](https://www.youtube.com/channel/UCjNJYE8LXwUGhv1k8YWuOLQ). 
* We **co-organized 2 community events** including the Internet Measurement Conference Hackathon with [OONI](https://ooni.org/), [ISOC](https://pulse.internetsociety.org/), [Censored Planet](https://censoredplanet.org/) and [IODA](https://ioda.inetintel.cc.gatech.edu/) as well as the [Bridging the Digital Divide](https://www.law.berkeley.edu/research/bclt/bcltevents/bridging-the-divide-answering-internet-policy-questions-with-cutting-edge-network-measurement-algorithms-datasets-and-platforms/) led by Arpit Gupta of UCSD and Tejas Narechania of UC Berkeley. 
* We were invited to present about M-Lab and open Internet Measurement data at **10+ conferences, gatherings and webinars** including [New York Federal Reserve’s Northeast State Broadband Convening](https://www.newyorkfed.org/newsevents/events/regional_outreach/2023/0914-2023), National Science Foundation’s [Long-term Research Directions in Wired Networking Community Workshop](https://wired23.github.io/), [RightsCon](https://www.rightscon.org/program/#session-list), Domos AI’s [Understanding Latency](https://www.understandinglatency.com/), ready.net’s’s [Broadband Summit](https://summit.broadband.io/), [Splintercon](https://splintercon.net/), [Open Data Day](https://www.eventbrite.com/e/open-data-dayweek-data-visualizing-global-internet-speed-quality-tickets-565562361247), [Africa Digital Skills Conference](https://africadigitalskillsconference.org/) and more. 

Broadband Mapping 
* Ready.net’s [broadband.money](https://broadband.money/), Breaking Point Solutions’ [OptiExpress](https://sites.google.com/site/breakingpointsolutionsllc/home), Exactly Labs [broadbandmapping.com](https://broadbandmapping.com/explore?state=eyJnZW9zcGFjZU5hbWVzcGFjZSI6IkNPVU5USUVTIiwic3BlZWRUeXBlIjoiRG93bmxvYWQiLCJjYWxlbmRhclR5cGUiOiJUaGlzIHllYXIiLCJwcm92aWRlciI6eyJpZCI6IiIsIm9yZ2FuaXphdGlvbiI6IkFsbCBwcm92aWRlcnMiLCJhc24iOiIifSwic2VsZWN0ZWRHZW9zcGFjZSI6bnVsbCwic2VsZWN0ZWRTcGVlZEZpbHRlcnMiOlsiVU5TRVJWRUQiLCJVTkRFUlNFUlZFRCIsIlNFUlZFRCJdLCJ6b29tIjozLCJjZW50ZXIiOls0NS41NjYyOTYsLTk3LjI2NDU0N10sInNlbGVjdGVkR2Vvc3BhY2VJZCI6bnVsbCwiaXNFeHBsb3JhdGlvblBvcG92ZXJPcGVuIjpmYWxzZSwiYXJlU3BlZWRGaWx0ZXJzT3BlbiI6ZmFsc2V9), Georgia Tech’s [CellWatch](https://sites.gatech.edu/cellwatch/about/) and others integrated M-Lab data and tools into their responses to the FCC’s Broadband Data Collection initiative. 


## Looking Ahead

For the next year, we’ve defined the following priorities – 

Platform 
* **Increase the number of virtual sites and diversify cloud providers.** To ensure that our platform represents the diversity of locations where user’s content is stored, we’ll continue pursuing partnerships with new cloud and content providers. 
* **Client integration partnerships.** Much of M-Lab’s data is generated by people using tools created by partners external to M-Lab, or “client integrations” as we refer to them on the team. In 2023, we’re thinking about how these integrations can be better scaled and managed, and contribute to the sustainability of the M-Lab platform. 
* **Making it easier to contribute infrastructure to the M-Lab platform.** We’re working on techniques to minimize site hosts requirements and more easily add a wider diversity of vantage points. 

     


Measurement & Data
* **Enable calibrated measurements by increasing the number of client vantage points**. Building on projects such as [Murakami](https://www.measurementlab.net/blog/murakami/) and [Netrics](https://internetequity.org/), our team will work to develop easy-to-use, “out-of-the-box” measurement solutions capable of measuring consistently overtime, running multiple test frameworks and differentiating between Wi-Fi and the service provider network by measuring from the access point directly. 

Research & Community
* **Redefine Internet Quality**. Users of NDT data often consider “speed” as a proxy for the quality of an Internet connection. However, there is a growing consensus in the Internet research community that alternative metrics such as latency, jitter, and packet loss should also be considered, especially when advising policy makers and advocates. We'll convene the M-Lab community to answer: What does it mean to have quality Internet? What should a globally recognized rubric for Internet quality include? And how can we measure it using open data and methodologies?
* **Foster & Support more open Internet measurement research.** Over the last year, we’ve heard lots of good ideas for research come up in conversation with community members and even our team internally. We want to find ways to help make the research happen, e.g. in partnership with sponsor organizations, supporting researchers who propose novel ways of using M-Lab data and tools in their research, sharing the research needs we’ve heard and having ourselves to prompt the community to help answer these questions.
    * Our first fellowship program supported by [cPacket](https://www.cpacket.com/) will open for applications in March 2024. If you are a researcher interested in applying, watch out for an announcement on our blog. 
* **More collaborations with the open Internet measurement community.** 2023 brought a lot of opportunities to work with our peers in the open Internet measurement world, such as OONI, IODA, Censored Planet and more. Over the next year, we’ll work to continue this momentum by organizing more convenings to identify shared challenges, research interests and complementary solutions.  
* **Build out our Research and Technical Advisory Committee.** Originally founded as a research consortium, M-Lab has always benefited from a generous community of experts to help guide the vision and strategy of the project. In the next year, we’ll work to scale and formalize our community of experts into more formalized committees. If you are interested in being considered, please reach out to [hello@measurementlab.net](mailto:hello@measurementlab.net). 


## Thank You

2023 wouldn’t be complete without thanking the folks that helped to make it happen. 



* After a year of leadership, Katherine Townsend has moved on from her role as Director. We thank her for her contributions over 2023. 
* Thank you to our measurement, data and research partners including: 
    * Thank you to the [Wehe](https://wehe.meddle.mobi/) team (Dave Choffnes, Zeinab Shmeis, and Phillipa Gill), the Reverse Traceroute team (Ethan Katz-Bassett, Kevin Vermulen) for their work getting Wehe and Reverse Traceroute data, respectively, into BigQuery. 
    * Thank you to Timur Friedman and the Dioptra team for their long engagement with M-Lab and their work to publish Internet scale route trace datasets from [Iris](https://iris.dioptra.io/#/).
* Thank you to our infrastructure partners including: 
    * [ISC](https://www.isc.org/) who has sponsored M-Lab sites for over a decade and helped provide the first minimal site configuration, which will serve as a template for more sites in the future. 
    * Cogent, Hurricane Electric, Transteloco and Vodafone who continue to support infrastructure in over 20 sites globally. 
    * [RNP](https://www.rnp.br/), for working with M-Lab to bring the world's fifth-largest digital population to NDT servers hosted in all 27 of Brazil's federal units, with fast and reliable connectivity to major Internet exchange points (IXPs) throughout the country. 
* On behalf of the Internet Measurement Conference Hackathon organizers (OONI, IODA, Censored Planet and Internet Society), we’d like to thank Google for arranging the conference room and lunch for the event, Google Jigsaw for the hackathon prizes, and Internet Society for the hackathon dinner. 
* OONI, IODA, Censored Planet, Internet Society and Cloudflare Radar for our ongoing collaborations.
* Finally, we thank all the supporting partners, client integrators, analysts, developers, and users who run measurements every day around the world. Without your help, curiosity, and proof, we could not fulfill our shared mission to measure the Internet, save the data, and make it universally accessible and useful. 


## Get Involved

**Donate Data**. As ever, testing your Internet is the easiest and best way to get involved with M-Lab — every time you measure your internet with one of the M-Lab hosted tests, you are helping to make it possible for us to improve the internet. 

**Donate Resources**. We also welcome tax-deductible donations of all sizes via our fiscal sponsor, [Code for Science & Society](https://donorbox.org/measurement-lab). If you have technical assets, such as cloud resources or other technical infrastructure that might benefit M-Lab, reach out and we’d love to discuss more!

**Partner with us.** The M-Lab team is here to help, and can support projects that need to work with the internet measurement data, or are interested in integrating the platform or generally thinking about ways to approach internet measurement.

**More ways to contribute**. Let’s talk about ways to partner on open internet data, new metrics, diversifying testing infrastructure and more. If you’re interested in ways to get involved with any of the efforts mentioned above, specifically:  
* Contributing to the M-Lab platform as a cloud or content provider 
* Sponsoring a researcher to use M-Lab data
* Using M-Lab data in your research and letting us know
* Joining our Research and Technical Advisory Committee 
* Being involved in our Internet Society Research grant defining Internet Quality 

Reach out to [hello@measurementlab.net](mailto:hello@measurementlab.net) — we’d love to chat and see what we can do next year and the years to come. 