---
layout: blog
title: "Update to M-Lab Policies"
author: "Chris Ritzo"
date: 2019-07-19
breadcrumb: blog
categories:
  - policies
  - gdpr
  - privacy
---

Earlier this month, M-Lab published updates to our [policies]({{ site.baseurl }}/policies/) after completing a comprehensive review to ensure our compliance with the EU General Data Protection Regulation (GDPR) and in preparation for the [M-Lab 2.0 platform modernization update]({{ site. baseurl }}/blog/mlab-20-platform-migration-update/) that will be rolled out this fall. This post outlines the changes and additions to our policies for the general public, for experiment developers hosting tests on the M-Lab platform, and for partners who provide hosting for M-Lab servers.<!--more-->

## Why we've updated our policies

### Legal compliance for new privacy regulations

M-Lab is considered by civil society organizations to be one of the most privacy conscious Internet measurement initiatives. But as an open platform intended to support research and improve public understanding of Internet service on a global scale, M-Lab must back that claim up by having policies that demonstrate our compliance with data privacy and protection laws. In May 2018, one of the world's strongest consumer data protection regulations went into effect in the European Union. The EU's General Data Protection Regulation (GDPR), aims primarily to give control to individuals over their personal data and to simplify the regulatory environment for international business by unifying the regulation within the EU.[\[1\]](http://data.consilium.europa.eu/doc/document/ST-9565-2015-INIT/en/pdf){:target="_blank"}. The regulation requires that organizations providing services or doing business within the EU put in place technical and organizational measures to implement the GDPR's data protection principles. Similar laws in specific states or cities in the US are either being considered or have been passed, such as the [California Consumer Privacy Act (CCPA)](https://www.oag.ca.gov/privacy/ccpa){:target="_blank"} and the [Stop Hacks and Improve Electronic Data Security Handling (SHIELD) Act](https://www.nysenate.gov/legislation/bills/2019/s5642){:target="_blank"} in New York.

As mentioned, M-Lab already has a great respect for users' privacy. For example we don't collect the exact location where you run a test because doing so in some countries or contexts might put you at risk. Instead we use the location of the nearest ISP infrastructure that provides you with an IP address. In advance of the GDPR's implementation last year, M-Lab reviewed our privacy and acceptable use policies with an eye toward GDPR compliance. We used to have one policy which covered both privacy and acceptable use. In July 2018 we split these two into separate documents, to more effectively cover each. Our current privacy policy published on July 1, 2019, directly addresses all aspects of GDPR compliance with recommendations from an external consulting firm versed in the GDPR law. For the general public using M-Lab tests, the privacy and acceptable use policies detail what is needed to assert your rights under the GDPR.

## Additional policies and agreements for M-Lab Experiment Developers and Core Infrastructure Partners

The M-Lab community also involves third-party contributors and partners who either use or help support the measurement platform, so we've added new agreements and requirements for these specific contributions, partnerships, or uses:

* Experiment Developers
* M-Lab Core Infrastructure Partners

When M-Lab [upgrades to our modernized platform later this year]({{ site.baseurl }}/blog/mlab-20-platform-migration-update/), we will require new agreements and policies for our experiment developers and core infrastructure partners.

### Experiment Developers

Experiment developers are typically academic researchers who wish to study the conditions of Internet service by hosting their network measurement experiment code on the M-Lab platform infrastructure. An experiment developer must apply to host with M-Lab, and our [Experiment Review and Design Committee]({{ site.baseurl }}/who/#experiment-review-committee) reviews these applications for approval.

#### Policy Changes for Experiment Developers - Memorandum of Undestanding (MoU) and Experiment Privacy Policy

To host experiments on the M-Lab platform, historically the only requirement was to receive the approval of our former steering committee. However, to continue hosting on the newly upgraded platform later this year, M-Lab will require experiment developers to sign a Memorandum of Understanding (MoU) which formalizes our relationship, expectations, and responsibilities to one another. Additional technical and policy requirements will be necessary as well, which are described in detail in [Memorandum of Understanding for Experiment Developers]({{ site.baseurl }}/experimenter-mou/) and [Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

In summary, when M-Lab 2.0 launches later this year experiment developers hosting with M-Lab will be required to:

* Complete a [Memorandum of Understanding]({{ site.baseurl }}/experimenter-mou/) with M-Lab and follow our [Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/)
* Remain in compliance with the M-Lab privacy policy and acceptable use policy
* Complete a data processing and joint data controller agreement with M-Lab if the experiment data is processed and stored by M-Lab
* Provide a publicly accessible privacy policy for the experiment, outlining compliance with GDPR

#### Technical Changes for Experiment Developers

Along with the new policy requirements, M-Lab also will require technical changes for experiment developers hosting on the M-Lab 2.0 platform. These technical changes were communicated to current experiment developers hosting tests with M-Lab in early 2019, and our team has been working directly with developers who intend to make the transition to the new platform. A summary of the technical requirements of experiments hosted on M-Lab 2.0 is provided below.

**Experiment Requirements**

* **The experiment must run in a Docker container**
  Experiment developers must provide an openly available code repository to M-Lab staff with the source code to build a Docker container for the experiment.
* **The container life-cycle will be managed by M-Lab staff**
  To ensure that M-Lab staff can audit software running on the production platform, apply emergency updates if necessary, and maintain production deployment SLOs, M-Lab staff manage the complete container lifecycle. Experiment Developers are required to provide the M-Lab team with access to the experiment source code (which must be openly licensed) and the build process must be automated.
* **Access to production machines and containers will be limited to M-Lab staff**
  Experiment Developers will not have direct access to production servers or individual containers running in the production kubernetes cluster. Experimenters will develop using local docker containers and the M-Lab team will work with Experiment Developers to test working containers on non-production testing infrastructure.
* **Containers will be allocated dedicated public IP addresses**
  Experiments will be allocated one IPv4 address and one IPv6 address per machine (if IPv6 is available at that site).
* **Resource allocations will be applied per experiment**
  To safeguard the platform and ensure that any one experiment on the platform does not interfere with measurements of all experiments, each experiment will be assigned resource allocations that will limit the maximum resource utilization over a short time period.

  Default Resource Allocations:

  * CPU: 1 core
  * RAM: 1GB
  * Disk space: 20GB
  * Disk I/O: 10%
  * Network bandwidth: 100 Mbps Avg over 5 min

  Based on the available capacity and experiment requirements, default allocations may be adjusted on a case-by-case basis. However, M-Lab expects that these allocations will be sufficient for most experiments that pace clients in such a way to respect the resource utilization limits.

### Core Infrastructure Partners

M-Lab Core Infrastructure Partners (also referred to as site hosts) are organizations and companies who provide some combination of rackspace, transit, IP addresses, and/or remote support for locations where M-Lab hosts our servers. With this policy update, hosting partners in the EU will now have more complete information on M-Lab's policies and procedures covering the rights of EU citizens under the GDPR. M-Lab has always maintained a memorandum of understanding with these partners, and as a part of our organizational transition to Code for Science and Society, we will require an updated MoU noting the organizational change. The current copy of our [Memorandum of Understanding for M-Lab Site Hosts]({{ site.baseurl }}/site-host-mou/) can be found on our [policies page]({{ site.baseurl }}/policies/).

## Update to M-Lab - Conceptual & Technical Scope & Policies

Finally, we have also updated [M-Lab's Conceptual & Technical Scope & Policies]({{ site.baseurl }}/mlab-scope/), which was formerly an outline of our founding vision. This working document outlines the general motivations, organization, and technical specification for the Measurement Lab platform, and has been updated to reflect the current technical state of the project, our updated organizational status, and our recent policy updates.
