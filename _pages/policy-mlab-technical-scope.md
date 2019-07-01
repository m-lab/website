---
layout: page
permalink: /mlab-scope/
title: "M-Lab - Conceptual & Technical Scope & Policies"
---

# M-Lab - Conceptual & Technical Scope & Policies

Measurement Lab (M-Lab) is an open, distributed server platform on which researchers can deploy Internet measurement tools. The goal of M-Lab to advance research and empower the public with useful information about the characteristics of their broadband connections. By enhancing Internet transparency, we aim to help sustain a healthy, innovative Internet.

This working document outlines the general motivations, organization, and technical specification for the Measurement Lab platform.

**Document history**

* Version 2.0 2019-07-01 (this document)
* [Version 1.0 2009-01-28]({{ site.baseurl }}/publications/mlab-founding-vision.pdf) (archived)

## 1. Measurement Lab Defined

M-Lab is an open, distributed server platform on which participating researchers can deploy Internet measurement tools.

### 1.1 Background and Motivation

In order to study the Internet, researchers have developed a variety of network measurement tests, which allow people to measure varying aspects of their connection. These tests generate a pre-determined communication between a client and a server instrumented with software that emulates Internet application protocols. As purpose-built experiments, the tests do not monitor a user’s other, normal Internet traffic.

In 2008, Vint Cerf and others at Google initiated conversations with network researchers to learn more about the challenges to effective research in this area and discuss ways to address them. Researchers identified several problems, including the lack of widely-deployed servers and connectivity that can be used for active network measurement tools. Deploying their own servers in a variety of locations is expensive and impractical. Due to limited server resources, only a limited number of users can run tests at a given time.

In addition, researchers lack the means to easily share large data sets with one another. Thus, was difficult for researchers to build new experiments on previous network measurement experiments, compare or independently verify results, or publicize data.

M-Lab was founded by New America Foundation’s Open Technology Institute (OTI), Princeton University’s PlanetLab Consortium, Google Inc., and academic researchers in order to help address these barriers to research. M-Lab is now led by teams based at Code for Science & Society; New America’s Open Technology Institute; Google, Inc; Princeton University’s PlanetLab; and supported by partners around the world.

### 1.2 Goals

The goal of M-Lab is to advance network research and empower the public with useful information about the characteristics of their broadband connections. By enhancing transparency, we aim to help sustain a healthy, innovative Internet.

M-Lab deploys server infrastructure and connectivity for active network measurement tools, and dedicates sufficient resources on these servers to vetted and approved tests so that they can conduct accurate measurements.

M-Lab is intended as an open platform, defined by the following objectives:

* Support as wide an array of Internet measurement tools as possible.
* Make all data collected through M-Lab publicly available and licensed in the public domain.
* All researchers’ server-side and client side source code and tools are required to be published under an [OSI-approved license](https://opensource.org/licenses){:target="_blank"}, and operated in a way that allows third-parties to develop client-side integrations of their software.

M-Lab operates as a community-based effort. In order for M-Lab to achieve its objectives, it relies on the support and participation of additional companies, institutions, and researchers. M-Lab welcomes the support of other companies and researchers who would like to help expand the platform and ensure its growth and success.

### 1.3 Scope

Measurement Lab is jointly developed by staff teams at Code for Science & Society, Google Inc., and external open source contributors. M-Lab’s operations, administration, and maintenance (OA&M) framework is a managed Kubernetes cluster, with each experiment running as a daemonset. These daemonsets are deployed to physical servers using Docker containers. M-Lab’s platform is designed to:

* Provide passive server-side resources for client-initiated active network measurement of Internet users’ broadband connections.
* Provide resource allocation on each server that will ensure sufficient bandwidth and machine resources.

We limit oversubscription of server infrastructure and network resources using a default server resource allocation to each experiment. See section 2.3.1 of this document for more information.

Each measurement site location is referred to as a “pod”, consisting of a switch and four servers. Pods are connected to between 1Gbps and 10Gbps direct transit. Each server currently in use has the following resources:

* ModelName : Intel(R) Xeon(R) CPU E5-2640 v3 @ 2.60GHz
* Sockets : 2
* Cores/Socket : 8
* Threads/Core : 2
* TotalCores : 16
* TotalThreads : 32

Three of the four servers will serve production traffic, and the fourth server will be reserved for testing.

M-Lab will only be used for active network measurements and will not collect or store data from passive monitoring of users’ other Internet traffic.

### 1.4 Roles

Participants in M-Lab serve a number of roles.

* **Core Infrastructure Partners**: Companies, academic institutions, and other organizations provide and host servers (“sites”), and provide them with connectivity.
* **Software Environment, OA&M**: M-Lab staff manage the entire OA&M infrastructure and lifecycle:
  * Management and maintenance of the OS/VM software on all servers.
  * Packaging and distribution of experiments to Docker containers on all servers
  * Responding to patches, need for reboots, etc.
  * Acting as point of first contact for parties having questions about the activities of M-Lab.
* **Measurement Experiment Developers**: Individual researchers create active Internet measurement experiments that run on the servers (instrumented versions of application protocols). Researchers whose experiments are approved and meet M-Lab’s open access goals (described below, section 2) then coordinate with M-Lab staff to package, test, and deploy their experiment container to M-Lab infrastructure.
* **Data Hosting, Analysis, and Other Resources**: Organizations and institutions can contribute to M-Lab by providing data aggregation and publishing resources and by collecting and archiving data from M-Lab’s servers (“repository”). They might also provide other technical resources, such as computing resources for data analysis. Other contributions might include the integration of experiments’ client side code into web properties, software, or hardware products, using M-Lab as a platform-as-a-service.
* **Management & Organization**: Measurement Lab is sponsored project of [Code for Science & Society](https://codeforscience.org/){:target="_blank"} (CS&S), a US-based 501(c)(3) nonprofit supporting open collaboration in public interest technology through fiscal sponsorship and other programs supporting sustainable open source. M-Lab is overseen by an advisory board at CS&S, who, define and implement the platform’s policies and processes in light of the project’s objectives in consultation with M-Lab management staff. Operationally, M-Lab is led by teams working for CS&S; Google, Inc.; Princeton University’s PlanetLab; and is supported by partners around the world. Together, these organizations comprise the “Measurement Lab Consortium” or MLC. Organizationally, M-Lab maintains several committees that advise on various aspects of M-Lab operations, notably, the [Experiment Review Committee]({{ site.baseurl }}/who/#experiment-review-committee), who review applications for new measurement experiments.
* **User and researcher outreach**: M-Lab directs users to the various experiments running on the platform, through a public facing website, mailing list, and other means. M-Labalso seeks to actively engage the research community in order to extend the platform and its usefulness to a wide variety of audiences.

## 2. Organization, Policies and Processes

### 2.1 Organization

Measurement Lab is sponsored project of [Code for Science & Society](https://codeforscience.org/){:target="_blank"} (CS&S), a US-based 501(c)(3) nonprofit supporting open collaboration in public interest technology through fiscal sponsorship and other programs supporting sustainable open source. M-Lab is overseen by an advisory board at CS&S, who, define and implement the platform’s policies and processes in light of the project’s objectives in consultation with M-Lab management staff. Operationally, M-Lab is led by teams working for CS&S; Google, Inc.; Princeton University’s PlanetLab; and is supported by partners around the world. Together, these organizations comprise the “Measurement Lab Consortium” or MLC.

### 2.2 Policies

#### 2.2.1 Privacy Policy
M-Lab is committed to preserving user privacy, and publishes an extensive Privacy Policy on our website: [https://measurementlab.net/privacy/]({{ site.baseurl }}/privacy/).

#### 2.2.2 General Data Protection Regulation (GDPR) Compliance Policy

M-Lab provides complete details of our compliance with the European Union’s General Data Protection Regulation (GDPR) in our Privacy Policy. In summary, with respect to GDPR, M-Lab is primarily a data controller (GDPR Art. 4.7) insofar as we determine the means and purposes of the data collected by a test hosted on our infrastructure and make it public under our the test’s methodology. For running tests developed by third-party researchers (further “experimenters”), M-Lab takes the role of joint controller with the experimenter, insofar as the experimenter leverages M-Lab tools to process and host the data resulting from their experiment. Some experimenters may choose to not leverage M-Lab tools for this purpose, in which case they are sole data controllers, with M-Lab simply hosting experiment code and not data. We recommend reading the privacy policy found on the website of each experimenter’s website for complete information. Links to experimenters’ websites can be found on our pages describing each M-Lab hosted test. All M-Lab hosted tests are listed on our [tests page]({{ site.baseurl }}/tests).

#### 2.2.3 Acceptable Use Policy

Accompanying the M-Lab Privacy Policy, M-Lab publishes an Acceptable Use Policy on our website: [https://measurementlab.net/aup/]({{ site.baseurl }}/aup)

#### 2.2.4 Open Access Policy

M-Lab works to ensure that access to our data and source code is open, in accordance with the strategic goals documented above, in adherence to policies that balance the interests of primary research investigators to publish their results first, as well as the broader research community’s interest in independently verifying published results and accessing data.

#### 2.2.5 Data Access Policy

Data obtained using M-Lab are required to be placed in the public domain as soon as it is reasonably feasible. There is one exception for new experiments. New experiment developers may embargo data for the shorter of two periods:

1. until a research paper is published utilizing data from the experiment as run on the M-Lab platform or
2. one year from the time of the experiment’s initial launch.

After this initial optional embargo period the exception is over, and afterward all data must be released immediately.

#### 2.2.6 Software/Protocol Access Policy

M-Lab is an open platform for research, and consistent with M-Lab’s objectives, all experiments using M-Lab are required to publish their source code for client and server software such that it can be reviewed by third parties. The software running the experiment must be released under an [OSI-approved license](https://opensource.org/licenses){:target="_blank"}. Ideally, this would be implemented as read-only access to source code management systems such as Github or Gitlab so that changes over time can be tracked.

In order to encourage independent innovation of data collection on the client side (and broaden the base of clients generating measurement data on the M-Lab server side), it is a goal that third-party developers be able to use M-Lab for their clients and measurements, even if they themselves did not create the server-side code. For example, independently-developed client software may want to incorporate M-Lab client code for interacting with M-Lab servers and integrate the resulting client-side measurements with other measurement data.

Toward that end, the communication protocols between clients and servers should be documented and licensed for intellectual property (IP) granted in a manner that allows client code to be developed and to communicate with M-Lab servers, independent of the researchers who created the server-side tool.

#### 2.2.7 Third-Party Client Resource Utilization Policy

The client-side code for M-Lab hosted experiments is required to be open source and M-Lab encourages third party developers to use this code to provide measurement data and services, leveraging the M-Lab platform as a service for Internet measurement.

Third party companies or organizations interested in developing custom client applications that leverage the M-Lab platform are encouraged to first contact us to establish communication and support channels, and to understand our policies for such development.

For software or hardware client integrations, each individual client instance should test no more than four times per day, and should not test at exact scheduled times. Rather, clients should use a [Poisson process](https://en.wikipedia.org/wiki/Poisson_point_process){:target="_blank"} to randomize test start times. We provide a general [developer guide]({{ site.baseurl }}/develop/) as a starting point, which includes links to all relevant policies and provides recommended best practices.

M-Lab reserves the right to apply resource utilization requirements on third party client integrations, using methods such as request rules in the mlab-ns location service, API keys, or other means.

### 2.3 Processes

#### 2.3.1 Server Resource Allocation

The M-Lab platform is finite: a finite number of sites, operational machines at each site, available capacity per machine, and switch uplink capacity. Experiments are assigned “resource allocations” that limit the maximum resource utilization over some short time period.

Default Resource Allocations:

* CPU: 1 core
* RAM: 1GB
* Disk space: 20GB
* Disk I/O: 10%
* Network bandwidth: 100 Mbps Avg over 5 min

Limited CPU and Network bandwidth are the most likely to interfere with measurements. Therefore care must be taken to pace clients in such a way to respect resource utilization limits. Based on the available capacity and experiment requirements, default allocations may be adjusted. If you need more, let us know. We are always interested in expanding available platform resources for all experiments through third-party donations.

These limits safeguard the platform and all other experiments on the platform that operate within resource limits.

Complete details can be found in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

#### 2.3.2 Adding New Experiments to the M-Lab Platform

Measurement Lab (M-Lab) is an open platform for research, and welcomes the involvement of new participants. Experiment Developers must first apply to host their tool on the M-Lab platform. Experiments are vetted by the Experiment Design and Review Committee for their potential usefulness for Internet users and research, differentiation from other experiments, and other factors prior to approval and deployment. The Experiment Design and Review Committee and/or the M-Lab team will provide feedback to the Experiment Developer, and may ask for modifications to be made to ensure the experiment meets all requirements and expectations.

In the interests of managing the use of resources and steering the mission of the project, any experiment running on M-Lab must adhere to the following underlying principles, unless waived by the Experiment Design and Review Committee due to unusual circumstances:

* The experiment being used must be open-source.
* The experiment must produce server-side data.
* The data must be released into the public domain.
* The measurement must be client-initiated.
* Experiments must only perform “active measurements”.
* Experiments must not collect personally identifying information on M-Lab infrastructure.
* Experiments are subject to operational auditing and tracing.
* Experimenters must document compliance as Data Controllers under GDPR, and publish a privacy policy publicly on the Internet.

Complete details on M-Lab’s policies, procedures, and requirements for reviewing and approving new experiments applying for hosting on the M-Lab platform may be found in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

#### 2.3.3 Decommissioning Experiments

In the event that an Experiment Developer wishes to retire an experiment, M-Lab will expect to coordinate on timing and communications to users with as much advance notice as possible. Typically decommissioning will be scheduled during the [Memorandum of Understanding (MoU)]({{ site.baseurl }}/experimenter-mou/) renewal process if an Experiment Developer indicates a desire to discontinue hosting. However, decommissioning an experiment outside of this cycle is possible on a case by case basis.

Complete information on the experiment decommissioning process and policies can be found in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

#### 2.3.4 Adding New M-Lab Server Locations

M-Lab will add new server pod locations as the operations staff determine need. Additionally, new core infrastructure partners may offer the resources to host new M-Lab server pods in desired locations. These offers will be reviewed on a case by case basis, giving preference to locations which align with our operational plans for expansion or upgrades.

M-Lab is not a network operator-- our measurement servers have connectivity to existing transit operators. M-Lab core infrastructure partners help us measure with increased geographic and topological fidelity, by hosting or sponsoring hosting costs for measurement collection servers in new locations and in new networks. Core infrastructure partners include open IXPs, transit providers, and corporate or individual donors. Donations are tax deductible, and may be in-kind or monetary. All arrangements of this nature are governed by a Memorandum of Understanding between the donor and M-Lab.

Each new M-Lab server pod requires:

* 5U rack space and power for four servers and a switch
* one /26 IPv4 block, and optionally a /64 IPv6 block.
* upstream connectivity of 1 Gbps, preferably burstable to 10 Gbps, but flexible depending on the average regional consumer speed
* remote hands support for the deployment lifecycle
* commitment of 3 years via [Memorandum of Understanding (MoU)]({{ site.baseurl }}/site-host-mou/), renewable at the time of expiry

#### 2.3.5 Decommissioning M-Lab Servers

M-Lab operations will manage the entire lifecycle of server pod deployments, from deployment to decommissioning. For server pods provided by core infrastructure partners, 90 days notice is required if the partner desires to discontinue contributing this resource to M-Lab. If the core infrastructure partner is providing rackspace and power in a shared hosting location, M-Lab’s MoU asks for remote hands support to be provided to unrack, disconnect, and prepare all M-Lab provided equipment for retrieval.

## 3. Technical Specification of M-Lab Server Platform

### 3.1 Initial Server Configuration

M-Lab server pod placements are deployed in two configurations: a full rack with four pods per rack, or a single pod in shared rackspace. Each pod requires 5 1U rack positions.

#### 3.1.1 Bill of Materials

Table 1 gives the bill of materials required to build a site.

<div class="table-responsive" markdown="1">

| Item  | Qty. | Rack Space | Description         |
| ----- | ---- | ---------- | ------------------- |
| 1     | 4    | 4 x 1U     | Server hardware (with rack-mount kit), dual-processor, octo-core |
| 2     | 1    | 1U         | Rack switch |
| 3     | 2    |            | Rack mountable PDU |
| 4     | 6    |            | Ethernet cables, Cat5e or better<br>
(4 used between servers & switch)<br>
(2 used between switch & PDUs) |
| 5     | 4    |            | Fiber patch cables (servers to switch) |
| 5     | 8    |            | Power cords (server to PDU) |
| 6     | 2    |            | Power cord (switch to PDU) |

</div>

_Table 1_

### 3.2 Site Requirements

#### 3.2.1 Physical Requirements

##### 3.2.1.1 Rack Space

The installation of a single M-Lab server pod requires 6 contiguous 1U rack positions on a standard, 19-inch, 2-post rack. In many cases, M-Lab deploys a full rack with between 4-5 server pods. Servers will be required to have center-mount hardware. Lighter components (rack switch, PDU) may have front-mount hardware. M-Lab provides this openly accessible [diagram of the rack elevation for both single and multiple M-Lab pod deployments](https://docs.google.com/spreadsheets/d/19NXYhuRpH0KXAyRGYo827fBZQVyc8Bl3GNatdiwqT7g/edit#gid=0){:target="_blank"}.

##### 3.2.1.2 Power

One AC outlet is required, but two are preferred. The recommended server option has a 670W power supply, requiring a (standard) 20A circuit to support 4 nodes and a rack switch.

##### 3.2.1.3 Cooling

Required.

##### 3.2.1.4 Site-supplied Hardware

A fiber patch cable of sufficient length to connect the upstream ISP to the rack switch must be provided by the site host. Additionally, for initial deployment site hosts may need a serial console cable to perform initial switch configurations, tools for mounting server rack mount hardware, and a crash cart or suitable means of connecting individual equipment to a monitor and keyboard in the case advanced troubleshooting is required.

#### 3.2.2 Logical Requirements

##### 3.2.2.1 IP Address Space and Bandwidth

Each M-Lab server pod requires one /26 IPv4 block, and optionally a /64 IPv6 block. Upstream connectivity must be at least 1 Gbps, preferably burstable to 10 Gbps, but this is flexible depending on the average regional consumer speed and will be reviewed on a case by case basis.

M-Lab servers may send to the broadcast address and/or collect packet traces. The subnet and associated L2 broadcast domain should be dedicated to the site’s servers and switch.

##### 3.2.2.2 DNS

DNS zones mapping to the provided IP addresses for each server pod will be maintained by M-Lab operations.

##### 3.2.2.3 Firewall and ACL Considerations

The M-Lab subnet should not be firewalled or otherwise constrained. This specifically includes TCP, UDP, and ICMP, but any Internet protocol packet should be allowed in and out.
