---
layout: blog
title: "Showing Missing Data in Line Charts"
author: "Georgia Bullen"
date: 2016-10-04
breadcrumb: blog
categories:
  - dataviz
  - visualization
  - observatory
  - data
  - open source
---

The M-Lab team has been working with [Bocoup’s Data Visualization](https://bocoup.com/services/datavis) team to overhaul our visualizations and give all of you better support in exploring all of the Measurement Lab data. Look for more about that soon -- and reach out via support@measurementlab.net if you are interested in helping with testing and user feedback!

![Line Animation GIF](https://static.bocoup.com/blog/showing-missing-data-in-line-charts/feature_image.gif)

M-Lab has lots of data, but depending on how you slice the data, you might end up with too small of a sample size on a given day in a given location. As part of designing the [Observatory]({{ site.baseurl }}/observatory/) visualization, we came up with the idea of using dotted lines to show that we didn’t have a large enough sample size to assert the data value, but that leaving out the data would be incorrect as well. The Bocoup Team took that further and developed a new d3 plugin, [d3-line-chunked](https://github.com/pbeshai/d3-line-chunked), which allows you to easily visualize gaps in your data and has good animation support.

[Read More over on the Bocoup blog.](https://bocoup.com/weblog/showing-missing-data-in-line-charts) <!--more-->