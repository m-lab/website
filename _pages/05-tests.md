---
layout: page
permalink: /tests/
title: "Tests"
page-title: "M-Lab Tests"
menu-item: true
breadcrumb: tests
grid-section:
  - group-heading: "Current Tests"
    group-description: ""
    group-list-class: "l-grid l-3col"
    grid-items:
      - link: "/tests/ndt/"
        image: "ndt.png"
        img_attribution: ""
        heading: "NDT (Network Diagnostic Tool)"
        desc: "Tests your connection speed, and provides a sophisticated diagnosis of problems limiting speed."
      - link: "/tests/neubot/"
        image: "neubot.png"
        img_attribution: ""
        heading: "Neubot DASH"
        desc: "DASH is designed to measure the quality of tested networks by emulating a video streaming player."
      - link: "/tests/reverse_traceroute/"
        image: "arrow-swoop.png"
        img_attribution: ""
        heading: "Reverse Traceroute"
        desc: "Measures the network path back to a user from selected network endpoints."
      - link: "/tests/wehe/"
        image: "wehe.png"
        img_attribution: ""
        heading: "WeHe"
        desc: "Wehe uses your device to exchange Internet traffic recorded from real, popular apps like YouTube and Spotify, and attempts to tell you whether your ISP is giving different performance to an app's network traffic."
  - group-heading: "Current M-Lab Core Services"
    group-description: ""
    group-list-class: "l-grid l-3col"
    grid-items:
      - link: "/tests/pcap/"
        image: "pcap.png"
        img_attribution: "Created by Jo Santos from Noun Project"
        heading: "Packet Headers"
        desc: "Collects packet headers for all incoming TCP flows and saves each stream of packet captures into a per-stream .pcap file."
      - link: "/tests/tcp-info/"
        image: "tcpinfo.png"
        img_attribution: "Created by Pravin Unagar from Noun Project"
        heading: "TCP INFO"
        desc: "Collects statistics about the TCP connections running on the M-Lab platform using tcp-info."
      - link: "/tests/traceroute/"
        image: "traceroute.png"
        img_attribution: "Created by Popular from Noun Project"
        heading: "Traceroute"
        desc: "Collects network path information for every connection to the M-Lab platform."
      - link: "/tests/iprs/"
        image: "iprs.png"
        img_attribution: "Sorbonne University"
        heading: "IPRS"
        desc: "The IP Route Survey (IPRS) continuously monitors IP-level routing across the internet."
  - group-heading: "Retired Tests"
    group-description: "Tests in this section were once hosted with M-Lab but have since been retired. The data collected by these tests while they were hosted on with M-Lab remains available. Please see each individual test's page for more information."
    group-list-class: "l-grid l-3col"
    grid-items:
      - link: "/tests/bismark/"
        image: "neubot.png"
        heading: "BISmark"
        desc: "Allowed people to host a home router that also tests network performance over time."
      - link: "/tests/glasnost/"
        image: "glasnost.png"
        heading: "Glasnost"
        desc: "Glasnost tested for application-specific blocking or throttling, and was decommissioned on 07/07/2017. The source code is still available."
      - link: "/tests/npad/"
        image: "npad.png"
        heading: "NPAD (Network Path &amp; Application Diagnostics)"
        desc: "Diagnosed common problems that impact last-mile broadband networks."
      - link: "/tests/ooni/"
        image: "ooni.png"
        heading: "OONI Probe"
        desc: "Measured specific use cases of network interference."
      - link: "/tests/mobiperf/"
        image: "mobile.png"
        heading: "MobiPerf"
        desc: "Measured network performance on mobile platforms."
      - link: "/tests/pathload2/"
        image: "pathload2.png"
        heading: "Pathload2"
        desc: "Tested the available bandwidth of an Internet connection until it was decommissioned from the M-Lab platform on 12/21/2012. However, the data and source code are still available."
      - link: "/tests/samknows/"
        image: "samknows.png"
        heading: "SamKnows"
        desc: "M-Lab hosted the off-net servers for SamKnows performance testing used in the FCC's Measuring Broadband America Program from 2009-2019."
      - link: "/tests/shaperprobe/"
        image: "arrow-swoop.png"
        heading: "Shaperprobe"
        desc: "Shaperprobe attempted to measure traffic shaping. Shaperpobe was decommissioned from the M-Lab fleet on 5/11/2015."
      - link: "/tests/windrider/"
        image: "mobile.png"
        heading: "Windrider"
        desc: "Attempted to detect whether a mobile provider was performing application or service specific differentiation until it was decommissioned on 01/17/2013. The source code is still available."
  - group-heading: "Retired M-Lab Core Services"
    group-description: ""
    group-list-class: "l-grid l-3col"
    grid-items:
      - link: "/tests/sidestream/"
        image: "sidestream.png"
        heading: "SideStream"
        desc: "Collected web100 statistics about the TCP connections running on the M-Lab 1.0 platform."
      - link: "/tests/paris_traceroute/"
        image: "arrow-swoop.png"
        heading: "Paris Traceroute"
        desc: "Collected network path information for every connection to the M-Lab 1.0 platform."

---

# Internet Measurement Tests

M-Lab hosts a number of measurement tests, allowing you to check for everything from network speed and latency to blocking and throttling. Explore them below, and run a test to learn more about your connection.

All tests hosted on M-Lab only perform active measurements. This means that tests only run when people decide to run them. They do not passively monitor your connection. M-Lab hosted tests do not download or upload files to or from your device. Instead tests measure the way in which the network responds to a synthetic stream of data that is generated by the individual test specifically for the purpose of measurement. The tests do not collect information about your other Internet traffic, such as your emails or web searches, or any personally identifiable information.

* All data collected will be made publicly available, including the IP addresses that users use to connect to the test.
* All data collected is stored and published indefinitely.
* M-Lab cannot delete the data associated with individual user tests once it has been collected.
* All tests are open source and created and maintained by researchers.

Please review M-Lab’s [Privacy Policy]({{ site.baseurl }}/privacy) before initiating any measurement test and contact us at [privacy@measurementlab.net](mailto:privacy@measurementlab.net) if you have any questions regarding these terms.

## Using and Troubleshooting M-Lab Tests

If you need help or have questions about using M-Lab tests, you can search our answers to commonly asked questions through our [support website](https://support.measurementlab.net/help/en-us){:target="_blank"}, or email us at [support@measurementlab.net](mailto:support@measurementlab.net) and our team will get back to you.
