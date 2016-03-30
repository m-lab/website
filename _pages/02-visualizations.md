---
layout: page
permalink: /visualizations/
title: "Visualizations"
page-title: "Performance"
menu-item: true
breadcrumb: visualizations
---

# Visualizations of network performance

M-Lab's **open measurement data** means that developers and researchers
don't have to ask permission before doing meaningful analysis. Below are
some ways in which smart people have turned open data into powerful
visualizations.

## Broadband performance statistics using NDT data
<p><iframe class="customIframe" style="font-size: 11px; line-height: 24px;" src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=m&amp;strail=false&amp;bcs=d&amp;nselm=s&amp;met_s=number_of_tests&amp;scale_s=lin&amp;ind_s=false&amp;met_c=download_throughput&amp;scale_c=lin&amp;ind_c=false&amp;ifdim=country&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;xMax=180&amp;xMin=-180&amp;yMax=-79.97571094413946&amp;yMin=84.17339026552769&amp;mapType=t&amp;icfg&amp;iconSize=0.5" name="customIframe_0" width="960" height="500" frameborder="0" marginwidth="960" marginheight="500"></iframe></p>

The charts presented in this section visualize data collected by M-Lab's Network Diagnostic Tool ([NDT]({{ site.baseurl }}/tools/ndt/)).  Of the many metrics collected by NDT, these charts visualize just a small subset (such as **download throughput**, **upload throughput**, **round trip time**, and **packet retransmission**).

The metrics are aggregated by

- **Geography** (country -&gt; region -&gt; city)
- **Internet Service Provider** (ISP)
- **Vantage point** (i.e., M-Lab site)

A chart can visualize one or more metrics at different levels of aggregation at the same time. Below there are a few examples of how metrics and aggregation criteria can be combined to provide interesting visualizations. If you're interested, you can find a detailed description of how the aggregated statistics are computed at [https://code.google.com/p/m-lab/wiki/PDEChartsNDT](https://code.google.com/p/m-lab/wiki/PDEChartsNDT).

## Global map of median download throughput

Each bubble corresponds to a country. When you mouse over any bubble, the chart displays the name of the corresponding country.  The color of any bubble represents the median download throughput of a country, while the size of the bubble is proportional to the number of tests run in that country.

<p><iframe src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=m&amp;strail=false&amp;bcs=d&amp;nselm=s&amp;met_s=number_of_tests&amp;scale_s=lin&amp;ind_s=false&amp;met_c=download_throughput&amp;scale_c=lin&amp;ind_c=false&amp;ifdim=country&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;xMax=180&amp;xMin=-180&amp;yMax=-79.97571094413946&amp;yMin=84.17339026552769&amp;mapType=t&amp;icfg&amp;iconSize=0.5" width="960" height="500" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></p>

## Timeline of median download throughput of arbitrary selected countries and cities

<p><iframe class="customIframe" src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=l&amp;strail=false&amp;bcs=d&amp;nselm=h&amp;met_y=download_throughput&amp;scale_y=lin&amp;ind_y=false&amp;rdim=country&amp;idim=country:40:208:250:276&amp;idim=city:36_nsw_sydney&amp;idim=region:840_ca:840_ny&amp;ifdim=country&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;icfg" name="customIframe_2" width="960" height="500" frameborder="0" marginwidth="960" marginheight="500"></iframe></p>

## Bar chart of median download throughput of countries world-wide

Each bar corresponds to a country. When you mouse over any bar, the chart displays the name of the corresponding country.  The length of any bar represents the median download throughput of a contry, while the color of the bar represents the number of tests run in that country.

<p><iframe class="customIframe" src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=c&amp;strail=false&amp;bcs=d&amp;nselm=s&amp;met_y=download_throughput&amp;scale_y=lin&amp;ind_y=false&amp;idim=country:36:40:208:203:250:276:300:56&amp;ifdim=country&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;icfg" name="customIframe_4" width="960" height="500" frameborder="0" marginwidth="960" marginheight="500"></iframe></p>

## Packet retransmission vs. download throughput for ISPs in the US

Each bubble corresponds to an ISP. When you mouse over any bar, the chart displays the name of the corresponding ISP.
The size of any bubble is proportional to the number of tests run in that ISP, while the color of the bubble represents the RTT of that ISP.

<p><iframe class="customIframe" src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=b&amp;strail=false&amp;bcs=d&amp;nselm=s&amp;met_s=number_of_tests&amp;scale_s=lin&amp;ind_s=false&amp;met_y=download_throughput&amp;scale_y=log&amp;ind_y=false&amp;met_x=segretrans_datasegsout&amp;scale_x=log&amp;ind_x=false&amp;met_c=rtt&amp;scale_c=lin&amp;ind_c=false&amp;ifdim=country_isp:country:840&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;icfg&amp;iconSize=0.5" name="customIframe_5" width="960" height="500" frameborder="0" marginwidth="960" marginheight="500"></iframe></p>

## Network- versus client-limited tests

Each bubble corresponds to a country. When you mouse over any bubble, the chart displays the name of the corresponding country.  The color of any bubble represents the median download throughput of a country, while the size of the bubble is proportional to the number of tests run in that country.  Bubbles at the top left correspond to countries where throughput is mostly limited by network congestion, while bubbles at the bottom right correspond to countries where throughput is mostly limited by the user's device.

<p><iframe class="customIframe" src="https://www.google.com/publicdata/embed?ds=e9krd11m38onf_&amp;ctype=b&amp;strail=false&amp;bcs=d&amp;nselm=s&amp;met_s=number_of_tests&amp;scale_s=lin&amp;ind_s=false&amp;met_c=download_throughput&amp;scale_c=lin&amp;ind_c=false&amp;met_y=network_limited&amp;scale_y=lin&amp;ind_y=false&amp;met_x=receiver_limited&amp;scale_x=lin&amp;ind_x=false&amp;ifdim=country&amp;hl=en_US&amp;dl=en_US&amp;ind=false&amp;icfg&amp;iconSize=0.5" name="customIframe_6" width="960" height="500" frameborder="0" marginwidth="960" marginheight="500"></iframe></p>

## Packet loss video using NDT data

View a quick and dreamy video showing packet loss, as measured by M-Lab's NDT.

<p><iframe class="customIframe" src="https://docs.google.com/file/d/0B0dPEIVgbGveU1JjcnU3LXNNYXM/preview" name="customIframe_0" width="800" height="400" frameborder="0" marginwidth="800" marginheight="400"></iframe></p>

If you're inspired to learn more, and maybe want to create your own, go to:  [http://dominichamon.com/blog/2012/12/visualizing-m-lab-data-with-bigquery-part-two/](http://dominichamon.com/blog/2012/12/visualizing-m-lab-data-with-bigquery-part-two/).
