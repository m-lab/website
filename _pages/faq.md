---
layout: page
permalink: /faq/
title: "FAQ"
sub-nav: true
breadcrumb: "about"
accordion-quick-links: true
quick-links-section:
  - column:
    - group-heading: "General Questions"
    - group-heading: "I am an internet user and I want to test my connection"
  - column:
    - group-heading: "I am a researcher"
    - group-heading: "I am a company or institution"
    - group-heading: "Contact MLab"
gq-accordion: 
  - heading: "What and who are M-lab's supporting partners?"
  - heading: "What's M-Lab's origin story?"
  - heading: "Who's behind M-Lab? Can I get involved?"
  - heading: "What is M-Lab, and why?"
iu-accordion: 
  - heading: "How can I troubleshoot the NDT speed test?"
  - heading: "A test isn't working. Whom do I contact?"
  - heading: "What data will be collected when I run a test?"
  - heading: "Will these tests monitor my private Internet activity, like email, browsing, search?"
  - heading: "Are the measurement results always right?"
  - heading: "What measurement tests can I run?"
researcher-accordion: 
  - heading: "Can I deploy a new tool on the M-Lab platform?"
company-accordion: 
  - heading: "How can I get involved?"
contact-accordion: 
  - heading: "How can I contact M-Lab?"
---

{:.general-questions}
# General questions

{% capture accordion_entry_1 %}
Supporting partners are companies and institutions that have committed resources to M-Lab, either in the form of server infrastructure, funding, data storage/analysis, staffing, or other services dedicated to furthering M-Lab's goals. Check out our [list of supporting partners]({{ site.baseurl }}/who/).
{% endcapture %}

{% capture accordion_entry_2 %}
In 2008, [Vint Cerf](http://www.google.com/corporate/execs.html#vint) initiated conversations with network researchers to learn more about challenges to the effective study of broadband networks. Researchers identified several problems, including a lack of widely-deployed servers and ample connectivity to support active network measurement tools, and an inability to easily share large data sets with one another. M-Lab was founded by these researchers to help address these problems.
{% endcapture %}
 
{% capture accordion_entry_3 %}
M-Lab was [founded](http://measurementlab.net/who) by the New America Foundation's Open Technology Institute (OTI), the PlanetLab Consortium, Google Inc. and a large body of academic researchers. The founding researchers collectively make up the steering committee that leads development of M-Lab's organizational policies. M-Lab is a community-based effort. We currently receive assistance from M-Lab [supporting partners]({{ site.baseurl }}/who/), and we welcome others who would like to contribute to the platform's growth and success. In order for M-Lab to achieve its objectives, it relies on the participation of additional companies, institutions and researchers. Learn how to [get involved]({{ site.baseurl }}/contribute/).
{% endcapture %}

{% capture accordion_entry_4 %}
Measurement Lab (M-Lab) is an open, distributed server platform for researchers to deploy Internet measurement tools. If you're an Internet user, [the tools]({{ site.baseurl }}/tests/) running on M-Lab servers can help you test your broadband connection, including measuring its speed and evaluating the performance of certain applications. When you run a test, you will also provide valuable data back to researchers. The goal of M-Lab is to advance research and empower the public with useful information about their broadband connections. By enhancing Internet transparency, we aim to help sustain a healthy, innovative Internet.
{% endcapture %}

{% include accordion.html acc_section = "gq" %}

{:.i-am-an-internet-user-and-i-want-to-test-my-connection}
# I am an internet user and I want to test my connection

{% capture accordion_entry_1 %}
Troubleshoot NDT

We're sorry to hear that our test is not working for you.  The NDT test should take less than 60 seconds, so if it's taking longer than that there is something wrong.  These are a few steps you can take to troubleshoot the situation

Our current NDT client test allows you to run NDT using Java or Websockets.  M-Lab recommends the Websockets version of NDT. If you experience issues running NDT, please contact us at <support@measurementlab.net>
{% endcapture %}

{% capture accordion_entry_2 %}
You can find how to contact each researcher through the links on the [Tools page]({{ site.baseurl }}/tests/), or you can can contact the M-Lab operations team on our [contacts page]({{ site.baseurl }}/contact/).
{% endcapture %}

{% capture accordion_entry_3 %}
It depends on the tool you run; you can see our summaries [here]({{ site.baseurl }}/tests/).

Note that all tools currently running on M-Lab collect a user's IP address.
{% endcapture %}

{% capture accordion_entry_4 %}
Absolutely not.

Each tool generates and sends synthetic data back and forth between your computer and an M-Lab server. The tools collect data related to the particular communication "flows" generated by the client-server test. **The tools do not collect information about your other Internet traffic such as your emails and Web searche**s, unless you provide it in response to a specific request (such as a form that asks you to provide your email address as well). This could happen if a researcher offers a client-server tests that uses M-Lab, combined with separate components that measure other Internet traffic and do not rely on M-Lab. These tools will only report the client-server test data back to M-lab and will not report any data about your other Internet traffic back to the M-Lab servers. That data will go directly to the researcher responsible for the tool.
{% endcapture %}

{% capture accordion_entry_5 %}
The tools aim to be as accurate as possible, but because they measure complex issues using very specific methodologies and assumptions, there may also be other limitations to what can be interpreted based on the results; for instance, a slower than expected speed might be the result of the testing server being far from your computer, or a number of processes running in the background on your machine, rather than a problem with your ISP. The tests can help you get a sense of performance across specific parameters, and work with an expert, network administrator, or technical support to mitigate or clarify any apparent problems. If you have questions about the tools themselves, you should direct them to the researcher responsible for the tool.
{% endcapture %}

{% capture accordion_entry_6 %}
Right now, users can access 12 tools to measure their broadband connection speed, analyze application performance, and run diagnostics. They range in complexity from Novice (suitable for anyone) to Expert (suitable for professional network administrators and those with considerable networking experience). Check out [the current tools.]({{ site.baseurl }}/tests/)
{% endcapture %}

{% include accordion.html acc_section = "iu" %}

{:.i-am-a-researcher}
# I am a researcher

{% capture accordion_entry_1 %}
If you're interested in deploying a tool, please first read [our document]({{ site.baseurl }}/publications/how-to-deploy-mlab-site.pdf) outlining M-Lab's requiremetns and procedures for accepting new tools on the platform.

You can then prepare an application and [contact]({{ site.baseurl }}/contact/) the M-Lab Operations Committee, who will review the application and help guide you through the process.
{% endcapture %}

{% include accordion.html acc_section = "researcher" %}

{:.i-am-a-company-or-institution}
# I am a company or institution 

{% capture accordion_entry_1 %}
Companies and institutions can help in a number of key ways, including:

-   Provide servers for the platform and purchase
    network connectivity.
-   Provide resources for data hosting, aggregation and publication.
-   Provide data analysis resources.
-   Embed an M-Lab client-side tool in an application or service.
-   Provide funding to support the above.

If you'd like to get involved as an M-Lab supporting partner, [contact]({{ site.baseurl }}/contact/) the M-lab steering committee and join the [public mailing list](https://groups.google.com/a/measurementlab.net/forum/?fromgroups#!forum/discuss).
{% endcapture %}

{% include accordion.html acc_section = "company" %}

{:.contact-mlab}
# Contact MLab

{% capture accordion_entry_1 %}
You can [contact us here.]({{ site.baseurl }}/contact/)
{% endcapture %}

{% include accordion.html acc_section = "contact" %}
