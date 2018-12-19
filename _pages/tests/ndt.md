---
layout: page
permalink: /tests/ndt/
title: "NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# NDT (Network Diagnostic Tool)

NDT (Network Diagnostic Tool) provides a sophisticated speed and diagnostic test suitable for both the novice and the network researcher. NDT reports upload and download speeds and attempts to determine what problems limit speeds. It also provides detailed diagnostic reporting on what it finds. While the diagnostic messages are most useful for expert users, they can also help novice users by allowing them to provide detailed trouble reports to their network administrator.

When you run the test, you'll be connected to a Measurement Lab (M-Lab) server and your IP address will be collected along with your measurement results. M-Lab conducts the test and publishes all test results to promote internet research. Published information includes each device’s IP address, but doesn’t include information about you as an Internet user.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) to understand how data is used before initiating a test.

NOTE: If the test does not run or takes longer than 30 seconds, please read the FAQ entry, "[How do I report issues with M-Lab tests]({{ site.baseurl }}/faq/#how-do-i-report-issues-with-m-lab-tests)"

<div class="embed-responsive embed-responsive-4by3 ndt-iframe"><iframe src="{{ site.baseurl }}/p/ndt-ws.html" align="middle" class="embed-responsive-item"></iframe></div>

Please cite this data set as follows: **The M-Lab NDT Data Set, &lt;date range used&gt; https://measurementlab.net/tests/ndt**

**Data** collected by NDT is available:

* in raw format at [https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt){:target="_blank"}.

* in BigQuery at [https://www.measurementlab.net/data/bq/quickstart/]({{ site.baseurl }}/data/bq/quickstart/).

**Source code** is available at [https://github.com/ndt-project/ndt/](https://github.com/ndt-project/ndt/){:target="_blank"}.

## Illustration of how NDT works

The illustration below provides an overview of how NDT works. To learn more about NDT, **get more information** at [http://software.internet2.edu/ndt/](http://software.internet2.edu/ndt/){:target="_blank"}.

![Illustration of the NDT test protocol]({{ site.baseurl }}/images/tests/ndt_explanation.png)
