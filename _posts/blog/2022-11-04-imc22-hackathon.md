---
layout: blog
title: "M-Lab Hackathon at IMC 2022"
author: "Lai Yi Ohlsen, Cristina Leon"
date: 2022-11-02
breadcrumb: blog
categories:
  - event
  - data
  - hackathon
---

On Monday, October 24th, 2022, M-Lab had the pleasure of hosting a Hackathon at the 2022 Internet Measurement Conference hosted in Nice, France. Both the hackathon and the conference itself were great opportunities to connect with other researchers and consider how M-Lab can be a resource to the Internet measurement research community. 

![IMC 2022 participants]({{ site.baseurl }}/images/blog/2022-11-imc-hackathon/imc-participants.png){: width="750"}


We hosted 23 participants at our hackathon from a wide range of regions and universities. After a brief overview of M-Lab and how to use our data, participants were asked to identify interesting and important signals in M-Lab’s dataset, which includes NDT data, traceroute data and more. Such signals are compelling to us because they have the potential to be used as training for anomaly detection tools and could also help us identify instances where changes in the data are due to our tools and platform, rather than the network itself. 

## Results

In only 90 minutes of hacking, our participants came up with some impressive results. 

Our winning submission was by Gautam Akiwate of USCB in which he identified disparities in network performance by continent using NDT data. He organized his submission into six key findings including the following:  


![IMC 2022 participants]({{ site.baseurl }}/images/blog/2022-11-imc-hackathon/akiwate-analysis.png){: width="750"}



You can view all key findings and the underlying queries in the full CoLab [here](https://colab.research.google.com/drive/1xIJZcvyu5UrZ7Vry5gTW4A20BzMAkGhD?usp=sharing#scrollTo=dr8d57Ouh2Wj). 

Honorable mentions included



* Ramakrishnan Sundara Raman and Reethika Ramesh who looked at [NDT data across the Russian conflict in Ukraine](https://colab.research.google.com/drive/1DISBnHBP3URGs2QUdAYofpOzHu91WC4p). 
* Rashna Kumar and Hendrik Cceh looked at [differences between IPv4 and IPv6 NDT results](https://colab.research.google.com/drive/196P1Hk2IRmzzDU2VKd4q_VaZRmiaAjFc#scrollTo=R7pSs9CVLh5p). 
* Maite Gonzalez Mendoza and Diego Madariaga examined (NDT results before, during and after[ Hurricane Ian](https://colab.research.google.com/drive/1gDHkkTIc8ZDb6Q0pspd-sWmFeLYKolXN?usp=sharing).  

## Resources



* Slides from our presentation giving an overview of M-Lab’s platform and measurement services can be found [here](https://docs.google.com/presentation/d/1DHhGcpCMTbSJE0QKO6ZTSnIPFixLxxBXwZLkqv0wdJA/edit#slide=id.g1622e8431c8_0_0). 
* Our SIGCOMM/IMC [tutorial](https://colab.sandbox.google.com/drive/1lTIPsI9tMepsnPoTamaDAw_8-J0BWwl_?usp=sharing) is also a great resource for getting started with NDT and Traceroute data (light experience with Python and SQL required). 

##  Future Events

The M-Lab team really enjoyed our time at IMC and look forward to future events with the academic measurement community. If you'd like to participate in future hackathons, have us host a hackathon at your event, or co-organize an event with your organization, please feel free to reach out to [info@measurementlab.net](mailto:info@measurementlab.net). 

Thank you to the IMC organizers and conference venue for your help and hospitality while organizing this event! 
