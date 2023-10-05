---
layout: blog
title: "Wehe data is now available in BigQuery"
author: "Dave Choffnes, Phillipa Gill, Zeinab Shmeis, Katherine Townsend, Lai Yi Ohlsen"
date: 2023-09-28
breadcrumb: blog
categories:
  - Wehe
  - data
  - BigQuery 
---

M-Lab and the Wehe team are pleased to announce that Wehe data is available for open access in BigQuery. <!--more-->


# Wehe data is now in BigQuery 

Since 2020 the M-Lab platform has hosted the Wehe measurement service with a shared interest in measuring net neutrality. We are happy to announce as of September 2023 Wehe data is being automatically published to M-Lab’s public BigQuery. 


## About Wehe

The Wehe mobile application is available on iOS and Android and allows users to detect whether or not various applications are being throttled by their ISP. In other words, Wehe can tell you if your network provider is likely giving different download/upload speeds to different services (e.g., video streaming, videoconferencing, etc.) 

Wehe uses your device to exchange Internet traffic recorded from real, popular apps like YouTube and Spotify—effectively making it look as if you are using those apps. As a result, if an Internet service provider (ISP) tries to slow down YouTube, Wehe would see the same behavior. We then send the same app's Internet traffic, but replacing the content with something that doesn’t match any real app (we call this _inverted_), which prevents the ISPs from classifying the traffic as belonging to the app. The hypothesis is that the inverted traffic will not cause an ISP to conduct application-specific differentiation (e.g., throttling or blocking), but the original recorded traffic will. The Wehe app repeats these tests several times to rule out factors that would lead to incorrect conclusions (e.g., bad network conditions) and tell you at the end whether your ISP is giving different performance to an app's network traffic. 

Since 2020, the French telecommunications regulator ARCEP has [integrated Wehe as their official tool](https://en.arcep.fr/news/press-releases/view/n/open-internet-211220.html) to verify compliance with net neutrality regulations. The Wehe team’s findings have been published in peer-reviewed conferences, covered by popular press (e.g., [Motherboard](https://www.vice.com/en/article/j5vn9k/apple-blocking-net-neutrality-app-wehe) and [Bloomberg](https://www.bloomberg.com/news/articles/2019-08-19/wireless-carrier-throttling-of-online-video-is-pervasive-study)) and made available to regulators such as the [FCC](https://www.google.com/url?q=https://www.commerce.senate.gov/services/files/E4FB6E39-28F0-4328-902A-04F5F511825C&sa=D&source=docs&ust=1695859869686243&usg=AOvVaw035JXPubMC8oJAZQK7RAK1), FTC, and State of California, as well as Canada’s CRTC.  


## Research Opportunities

Beyond providing individual users with insight about their Internet connection, analyzing Wehe data at scale can provide insight into net neutrality violations regionally and across the world. Researchers can ask questions such as: 



* Which ISPs in a given region are showing evidence of content-based traffic differentiation? 
* Which applications are affected by differential treatment from my ISP? Which ones are not?
* When applications are throttled, how are they slowed down? 
* How has an ISP’s treatment of a specific application changed over time?
* Are these network management practices in response to overloads, or instead present 24/7 and throughout the entire service area for a country?

The following papers overview the Wehe measurement technique and findings of running the application in practice:



* Fangfan Li, Arian Niaki, David Choffnes, Phillipa Gill, Alan Mislove. **A Large-Scale Analysis of Deployed Traffic Differentiation Practices**. In _Proc. of SIGCOMM_, August 2019. ([Paper](https://wehe.meddle.mobi/wehepaper.html))
* Arash Molavi Kakhki, Abbas Razaghpanah, Hyungjoon Koo, Anke Li, Rajeshkumar Golani, David Choffnes, Phillipa Gill, and Alan Mislove. **Identifying Traffic Differentiation in Mobile Networks**. In _Proceedings of the 15th ACM Internet Measurement Conference (IMC'15)_, Tokyo, Japan, October 2015. ([Paper PDF](http://david.choffnes.com/pubs/imc095-molavi-kakhkiA.pdf), [Poster](http://david.choffnes.com/pubs/differentiation_sigcomm14_SRCposter.pdf), [Presentation slides](http://david.choffnes.com/pubs/differentiation_sigcomm14_SRCtalk.pdf))

The Wehe project has also published several other papers covering their findings and specialized measurement techniques:



* Z. Shmeis, M. Abdullah, P. Nikolopoulos, K. Argyraki, D. Choffnes, P. Gill **Localizing Traffic Differentiation. **To appear in Proceedings of the ACM Internet Measurement Conference (IMC), 2023. ([Website](https://nal-epfl.github.io/WeHeY/))
* Fangfan Li, Abbas Razaghpanah, Arash Molavi Kakhki, Arian Akhavan Niaki, David Choffnes, Phillipa Gill, Alan Mislove. **lib·erate, (n): A library for exposing (traffic-classification) rules and avoiding them efficiently**. In _Proceedings of the 17th ACM Internet Measurement Conference (IMC'17)_, London, UK, November 2017. ([PDF](https://david.choffnes.com/pubs/liberate-imc17.pdf))
* David Choffnes, Phillipa Gill, Alan Mislove. **An Empirical Evaluation of Deployed DPI Middleboxes and Their Implications for Policymakers**. In _Proceedings of the 45th Research Conference on Communications, Information and Internet Policy_, Washington, D.C., September 2017. ([PDF](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2941535)) 
* Fangfan Li, Arash Molavi Kakhki, David Choffnes, Phillipa Gill, and Alan Mislove. **Classifiers Unclassified: An Efficient Approach to Revealing IP-Traffic Classification Rules**. In _Proceedings of the 16th ACM Internet Measurement Conference (IMC'16)_, Santa Monica, CA, November 2016. ([PDF](https://david.choffnes.com/pubs/ClassifiersUnclassified-IMC16.pdf), [Code and data](http://dd.meddle.mobi/classifier.html))

If you’d like support using Wehe data in your research, please [feel free to reach out](mailto:hello@measurementlab.net). 


## How to access the data

New Wehe test data is added daily to M-Lab’s public BigQuery. 



* To get access to all M-Lab data, including Wehe, see our [BigQuery quick start page](https://www.measurementlab.net/data/docs/bq/quickstart/). 
* For more sample queries and schema documentation, see the [Wehe data documentation page](https://www.measurementlab.net/tests/wehe/#wehe-data-in-bigquery). 
* For more details about how Wehe works, see [Wehe’s Technical Documentation](https://wehe.meddle.mobi/td_details.html), written for both technical and non-technical audiences. 


## Community Call 

To learn more about Wehe, please join us at our monthly M-Lab community call on October 5th, 2023 at 11am EDT (link to registration)[https://us02web.zoom.us/j/81069975204?pwd=VVdTOFVYTElVc1huQVVSUzJERXdndz09]. The call will be recorded for those who cannot attend. 


## Acknowledgement 

Thank you to everyone on the M-Lab and Wehe team who made this latest iteration of our collaboration possible, in particular Cristina Leon and Zeinab Shmeis for their work on making Wehe autoloadable to BigQuery!  