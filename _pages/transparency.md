---
layout: page
permalink: /transparency/
title: "Transparency"
breadcrumb: visualizations
accordion:
  - heading: "Network neutrality map using Glasnost data"
  - heading: "Deep packet inspection using Glasnost data"
---

# Transparency

Transparency visualizations showcase ways in which people have used M-Lab data to expose what's going on under the hood. From ISP throttling to deep packet inspection, we invite those interested to shed sunlight, and we highlight the results here.

{% capture accordion_entry_1 %}

A research team in France analyzed M-Lab's Glasnost data to create an intelligible global ranking of net neutrality.

<p><iframe class="customIframe" style="font-size: 11px; line-height: 24px;" src="http://netneutralitymap.org/#" name="customIframe_0" width="800" height="400" frameborder="0" marginwidth="800" marginheight="400"></iframe></p>

For more information, go to http://netneutralitymap.org.

{% endcapture %}

{% capture accordion_entry_2 %}

A cross-disciplinary team at the Syracuse University School of Information Studies and TU Delft dug into M-Lab's glasnost data to determine not only what percentage of ISPs were throttling traffic, but how many were using deep packet inspection to fascilitate this throttling.

![ISP throttling chart]({{ site.baseurl}}/images/visualizations/isp-throttle.png)

<p><iframe class="customIframe" src="https://oj0ijfii34kccq3ioto7mdspc7r2s7o9-ss-opensocial.googleusercontent.com/gadgets/ifr?up_title=US-ISP+%25+OF+POSITIVE&amp;up_initialstate=%7B%22orderedByY%22:false,%22iconType%22:%22VBAR%22,%22xZoomedIn%22:false,%22showTrails%22:false,%22yZoomedIn%22:false,%22xZoomedDataMin%22:0,%22yLambda%22:1,%22xAxisOption%22:%222%22,%22yZoomedDataMax%22:0.7000000000000001,%22uniColorForNonSelected%22:false,%22playDuration%22:15000,%22yZoomedDataMin%22:0,%22time%22:%222008-04-01%22,%22dimensions%22:%7B%22iconDimensions%22:%5B%22dim0%22%5D%7D,%22colorOption%22:%22_UNIQUE_COLOR%22,%22duration%22:%7B%22timeUnit%22:%22Q%22,%22multiplier%22:1%7D,%22iconKeySettings%22:%5B%5D,%22sizeOption%22:%22_UNISIZE%22,%22xZoomedDataMax%22:13,%22xLambda%22:1,%22orderedByX%22:true,%22nonSelectedAlpha%22:0.4,%22yAxisOption%22:%222%22%7D&amp;up__table_query_url=https://docs.google.com/spreadsheet/tq?range%3D1%253A105%26gid%3D0%26key%3D0Ap0t5QFGv6cZdFBFdU1DNk16ei05X282WFByV1Q1Qnc%26pub%3D1&amp;url=http://www.google.com/ig/modules/motionchart.xml&amp;spreadsheets=spreadsheets&amp;parent=http://www.google.com" name="customIframe_0" width="800" height="400" frameborder="0" marginwidth="800" marginheight="400"></iframe></p>

For a full description of the study and more results, go to [http://dpi.ischool.syr.edu/MLab-Data.html](http://dpi.ischool.syr.edu/MLab-Data.html).

{% endcapture %}

{% include accordion.html %}