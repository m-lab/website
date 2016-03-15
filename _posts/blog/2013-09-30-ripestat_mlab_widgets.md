---
layout: blog
title: "Explore M-Lab's data using the new RIPEstat widgets"
author: "Tiziana Refice, Vasco Asturiano, Robert Kisteleki"
breadcrumb: blog
categories:
  - visualization
  - data analysis
  - ripe
---

# Explore M-Lab's data using the new RIPEstat widgets

Are you the kind of person who wonders…

{:.circle-list}
- *What’s the bandwidth distribution among Internet users within a specific country or network?*
- *How are active users of a specific network geographically spread?*
- *How are active users spread within a specific IP address block?*

<!--more-->

It’s your lucky day! It’s now possible to investigate these and similar questions using two new [RIPEstat](https://stat.ripe.net/) widgets, which provide unique and compelling ways to visualize M-Lab's data. RIPEstat is a web-based interface developed by the [RIPE NCC](http://www.ripe.net/), featuring visualization widgets and data APIs dedicated to making sense of Internet data. RIPEstat now includes:

{:.circle-list}
- The **[Observed Network Activity widget](https://stat.ripe.net/widget/network-activity)**, which shows the distribution of actively used IP addresses within a specific country or network, during a user-defined time period. An IP address is considered “active” if it originated an [NDT]({{ site.baseurl }}/tools/ndt/) test.
- The **[Observed Bandwidth Capacity widget](https://stat.ripe.net/widget/bandwidth)**, which shows the bandwidth distribution within a specific country or network during a user-defined time period, as measured by NDT.

As a random example, check out the bandwidth distribution in Germany (the top chart) and the distribution of active users within 193.0.0.0/10 (the bottom chart).

These widgets are a great example of the power of open network data, like M-Lab’s.

Want more? Go for it!

{:.circle-list}
- **Query the RIPEstat widgets** from the RIPEstat web site at <https://stat.ripe.net/widget/network-activity> and <https://stat.ripe.net/widget/bandwidth>.
- **Embed the RIPEstat widgets** in your own web site. (See the [instructions](https://stat.ripe.net/index/documentation/interfaces-apis).)
- **Directly access the M-Lab data**, for free - about [800TB and growing]({{ site.baseurl }}/state/)! (See [instructions](https://code.google.com/p/m-lab/wiki/HowToAccessMLabData).)

For more information about the widget, see the [RIPEstat launch blogpost](https://labs.ripe.net/Members/vastur/visualising-bandwidth-capacity-in-ripestat-using-m-lab-data).