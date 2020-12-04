---
layout: page
permalink: /site-host-mou/
title: "Memorandum of Understanding for M-Lab Site Hosts"
breadcrumb: "about"
---

# Memorandum of Understanding for M-Lab Site Hosts

This is the standard agreement between Measurement Lab and organizations contributing to M-Lab by providing rackspace, IP, transit, and power to host M-Lab servers (Host Entity). M-Lab is a fiscally sponsored project of Code for Science & Society. This MOU is an agreement between Code for Science & Society and the Host Entity, relevant to Measurement Lab Site Hosting responsibilities. This agreement is non-negotiable, and is signed by the Host Entity as authorized by their host organization and  an authorized member of the Measurement Lab team, and an officer of Code for Science and Society, Inc.

## Memorandum of Understanding - Measurement Lab, M-Lab Host Entity

**Measurement Lab (M-Lab)** is a distributed server platform for deploying Internet measurement tools. M-Lab is designed to empower the public with useful information about broadband connections. All uses of M-Lab should be consistent with this high-level goal.

This document describes the roles and responsibilities of the **Measurement Lab** (M-Lab) **team** and the **Host Entity**. The M-Lab team defines the software environment, operates, and supports the platform infrastructure on which experiments are hosted and run; and the Host Entity, that provides services to one or more M-Lab servers.

In addition to the terms outlined in this document, the Host Entity and Measurement Lab understand that the terms of the following M-Lab policies apply to the data collected by the M-Lab platform infrastructure to be hosted by the Host Entity. Additional policies of individual experimenters may also apply to the data collected by their experiments on M-Lab infrastructure.

* [M-Lab Conceptual & Technical Scope & Policies]({{ site.baseurl }}/mlab-scope/)
* [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/)
* [M-Lab Acceptable Use Policy]({{ site.baseurl }}/aup/)

### M-Lab Responsibilities

The M-Lab team provides the base operating system and provisioning service for M-Lab servers. This software enforces constraints on application programs and user access.

M-Lab maintains an administrative access to all servers and switches hosted by the Host Entity. M-Lab will run pcap collection on all servers, will inspect packet logs, and collect detailed tcp-info metrics on all connections to each server and virtual container to enable relating packets to all experiments.

The M-Lab team will take the following steps to ensure the security and integrity of the software running on each server:

* No users other than the M-Lab team have root access to M-Lab servers.
* Monitoring software may be installed on all servers to provide an audit trail in the event of a security breach.
* Respond to security issues and potential security breaches in a timely manner.

The M-Lab team maintains all aspects of M-Lab servers, manages the experiments provided by researchers, and are responsible for system and package updates, security, etc.

* The M-Lab team has established guidelines for provisioning experiments on M-Lab servers with vetted, scalable measurement tools provided by Internet researchers. Researchers apply to host their tool on the M-Lab platform, and an experiment review committee vets the tool for its potential usefulness for Internet users, its differentiation with other tools, and other factors prior to approval and deployment. Currently, it is M-Lab’s policy to support only active measurement tools in which end-users explicitly opt-in.
* The M-Lab team also has established guidelines for archiving and accessing data collected on M-Lab servers.
Each M-Lab hosting location consists of one or more “pods”, which includes an enterprise class switch and four enterprise-class servers.
  * The M-Lab team provides to the Host Entity all pod hardware, cables, etc. and ships the equipment to the Host Entity’s specified address, including negotiating customs and import in the destination country. In the event that the Host Entity provides any hardware or cables, an amendment to this agreement with a list of hardware and the assigned owners will accompany this MoU.
  * The M-Lab team coordinates with Host Entity staff to complete installation, setup, and configuration of all pods, initially and in the event of an upgrade, periodic maintenance, or future decommissioning.

**M-Lab does not**:

* Run or manage an Autonomous System (ASN)
* Make routing decisions or make BGP announcements
* Allow site-to-site testing or use of our servers as passive vantage points
* Allow non-client initiated measurements to be conducted

### Host Entity Responsibilities

Hosting an M-Lab pod supports M-Lab’s research goals through the provision of services and resources.

In particular, host entities are expected to do the following:

* Provide a full /26 IPv4 address block.
* Provide a /64 IPv6 address block, where available.
* IP subnets assigned to the M-Lab equipment may not be shared with other local network resources.
* Provide a minimum of 1 Gbps to an upstream provider, preferably up to 10 Gbps where available.
* Place the pod directly connected to upstream transit cross-connects. M-Lab pods may not be placed behind local firewalls or inside a network DMZ. Filtering traffic into and out of M-Lab pods is not allowed. Site hosts should take reasonable steps to isolate their M-Lab servers from the rest of their institution's computer systems, with a preference for secure rackspace dedicated to the M-Lab infrastructure.
* Assist the M-Lab operations team with the installation, setup, and configuration of M-Lab pods, initially and in the case of a hardware upgrade.
* When an M-Lab pod is decommissioned, unplug, unrack, and box up equipment, and provide access to an M-Lab logistics vendor to retrieve decommissioned equipment.
* Allow the M-Lab operations team to administer the servers, including having root access to install and maintain the operating system, and set up research and measurement tools.
* Local administrators do not have access to M-Lab servers’ operating system or software environment, but do have physical access and serve as a point of contact for remote assistance to the M-Lab team.
* Host entities must define a point of contact that can be contacted to provide remote assistance when needed.
* Forward complaints from external system administrators to the M-Lab team.
* Communicate any security incidents that may impact M-Lab as quickly as possible to the M-Lab support address ([support@measurementlab.net](mailto:support@measurementlab.net)).

Host entities may withdraw from M-Lab at any time, but are expected to give M-Lab at least 90 days notice. In the event a hosting site wishes to withdraw from M-Lab, the M-Lab team will coordinate removal and reassignment of all equipment provided. The host entity contacts will be expected to coordinate with M-Lab in the decommissioning of hardware, for tasks such as unplugging, unracking and shipping decommissioned equipment.

### Signatures

**For Host Entity:**

Name:

Designation:

E-mail address:

Organization:

Physical Address:

Signature:

Date:

**For Measurement Lab:**

Name:

Designation:

E-mail address:

Organization: **Measurement Lab**

Physical Address:

**3439 SE HAWTHORNE BLVD, #247**
**Portland, OR 97214-5048**

Signature:

Date:
