---
layout: blog
title: "Modernizing the M-Lab Platform"
author: "Chris Ritzo"
date: 2018-01-24
breadcrumb: blog
categories:
  - upgrades
  - virtualization
  - kernel
  - tcp-info
  - bbr
  - web100
  - platform
---

When the M-Lab platform was initially launched in 2009, the software and operating system running on our servers used the best available boot management, virtualization, and kernel-level measurement instrumentation available. In the years since M-Lab’s initial launch, the state of system administration has improved dramatically. In 2017, the M-Lab team began work to upgrade the platform to adopt modern and flexible system administration components. This post provides a roadmap of that work.
<!--more-->

## M-Lab Now

All M-Lab servers today are hosted either in well-connected data centers or within the research and education networks of contributing partner institutions. Each location has at least one "pod" which consists of 3-4 servers and one switch, connected directly to an upstream transit provider. Each M-Lab pod has between 1-10 Gbps upstream connectivity.

Today, each M-Lab server boots up into a custom-compiled version of Linux 2.6.32. This customized kernel from the 2.6 LTS branch of the Linux kernel has two main patches that are required for our systems: vserver (for containerization) and Web100 (for several of our experiments). M-Lab servers' current kernel, virtualization, and operating system is based on [PlanetLab](https://www.planet-lab.org/).

* vserver was a pioneering technology that enabled multiple virtualized environments to run on one kernel. The idea of providing that level of process and environmental isolation was and is a good one, but the vserver implementation of that idea was rejected by the Linux kernel community in favor of userspace virtualization tools like LXC, libvirt, and Docker. However, Planet Lab was designed and built before the community had developed these alternatives, and so the platform is dependent on vserver, and therefore an older kernel.
* Web100 is a kernel patch that provides access to a rich set of information on the TCP stack. Using Web100, it is possible to finely track the evolution of TCP state over time on active connections. This capability is used by multiple experiments that we run, such as NDT and SideStream, so our kernels need Web100 support built in. Web100 is no longer in active development, and the most recent kernel version supported by Web100 is Linux 2.6.35.

## Updating the M-Lab Platform

We are in the process of upgrading and updating M-Lab's hardware, software, and upstream bandwidth. Planning and managing a full platform upgrade for M-Lab requires multiple dependent sub-projects:

### Hardware & Bandwidth Upgrades

An M-Lab pod contains one switch and four servers. We have 129 active pods around the world. Maintaining the hardware and software running at each site and turning up new sites represents a large fraction of the system administration work performed on M-Lab.

In 2016 M-Lab began a hardware refresh across the platform consisting of:

* Switches and servers capable of 10 Gbps connections and iPXE network booting
* Newer servers with faster processing power and more storage

The M-Lab operations team identified suitable switches, servers, and network cards in early summer 2016. After testing, M-Lab determined that the Juniper QFX 5100 series switch and Dell R630 series servers would be the most appropriate hardware to support the new specification. M-Lab operations is now testing an additional replacement switch for locations where the Internet is less mature, and available uplink connectivity is likely to not exceed 1Gbps.

Upgrades to nearly all locations in the United States were completed by mid-2017. Additionally, over 30 new sites in Europe have been added in 2017, and M-Lab operations is now beginning hardware upgrades for our sites elsewhere in the world. Where possible, our new sites in Europe will have 10 Gb connectivity. Beginning in Spring 2018, we will upgrade hardware at our existing locations worldwide, and increase connectivity to each location where possible.

### Open Source ETL Pipeline

In late summer 2017, we moved to a new open source data acquisition and ETL pipeline for ingesting data into Google Cloud Storage and BigQuery. The pipeline code for [acquisition](https://github.com/m-lab/scraper) and [ETL](https://github.com/m-lab/etl) is available in GitHub and is now in production for NDT. It currently supports geographic annotations and will support ASN annotation this year. Our development team is currently experimenting with new efficient schemas for NDT and Paris Traceroute. Look for more on the open source ETL pipeline transition in an upcoming blog post.

### Monitoring and Alerting

M-Lab operations currently uses several tools to monitor our infrastructure, and to alert us when something needs to be addressed. Nagios and the other open source tools we use for monitoring have been our mainstay for several years, but many have inadequate visualization and alerting capabilities. We’ve begun transitioning our monitoring and alerting platform to [Prometheus](http://prometheus.io/), which will provide monitoring for all of our sites, switches, machines, containers, and servers. As of this writing, we are running Prometheus in parallel with Nagios, and development is proceeding to transition from Nagios entirely in early 2018.

### Remote Boot Management and Server Provisioning

The design process and initial development of [ePoxy](https://github.com/m-lab/epoxy), a safe network bootloader and API, began in 2015. ePoxy is a replacement for the Planet Lab network bootloader used by M-Lab to load authenticated operating systems and virtualization containers securely across the Internet. Our development team has confirmed that ePoxy can be used to deploy an M-Lab server’s current operating system (Centos) and vserver virtualization containers. We also tested deployment of a container running [CoreOS](https://coreos.com/), which M-Lab intends to use as the base operating system on our servers after this platform upgrade is completed. The move to ePoxy will remove M-Lab's boot-time dependency on Planet Lab and therefore addresses one reason that M-Lab remains on an older Linux kernel. We anticipate continuing to use PlanetLab's identity-management systems on our updated platform.

### Move to a Modern Kernel and TCP_INFO

To remove M-Lab’s reliance on Web100, M-Lab plans to transition its hosted experiments to use the netlink socket and the TCP_INFO. Basing our measurements on TCP_INFO kernel instrumentation will allow M-Lab to support the latest version of TCP (called [BBR TCP](https://queue.acm.org/detail.cfm?id=3022184){:target="_blank"}) that will allow download tests to converge much more quickly at high speeds. M-Lab has confirmed that the current TCP_INFO implementation in modern kernels provides equivalent measurements of the TCP stack. Work is beginning now to refactor or turn down all M-Lab tools that use web100 to use TCP_INFO, including: NDT, Sidestream, NPAD, and the Paris-Traceroute wrapper. Once this work is completed, we’ll test these new tools on our platform’s testing infrastructure while keeping web100 on all production servers.

The requirement to migrate to TCP_INFO is currently blocking the move to new kernels, so that must be done before we start trying to deploy new kernels. New virtualization techniques depend on new kernels, and so we can't usefully start setting up new virtualization techniques until we have new kernels and have moved to TCP_INFO.

Our work plan for TCP_INFO is:

* Migrate the Paris Traceroute wrapper (aka Rollins) to TCP_INFO (done)
* Migrate the SideStream test to TCP_INFO (in progress)
* Migrate NDT to or re-write NDT for TCP_INFO  (in progress)
* Build both vserver and Docker versions of the resulting binaries (Q2, 2018)
* Update the ETL pipeline and database schema to support TCP_INFO data (Q3, 2018)

### Standard, Modern Virtualization Techniques

Planet Lab’s vserver technology has been largely supplanted by more modern systems. We have Docker for virtualization, isolation, and as a standard way of specifying a program to be run and the environment in which to run it, and Kubernetes as our deployment system.

As soon as we can upgrade our kernels, we will migrate our experiments from vserver to Docker containers. Docker is a better technology than vserver, it doesn't require kernel patches, and is more widely used. Vserver is not included in the mainline Linux kernel and requires many patches and workarounds.

## Conclusion

We hope that this overview of our platform modernization project has been informative. Because of the size and scope of the project, we plan subsequent posts to detail each major sub-project outlined here in more detail. As we do so, we’ll update this post as well with links to the subsequent blog posts and a changelog note. More to come as we harden our next generation platform and look to plan migration from the current platform. To follow this progress, please sign up for our [Operations list](https://groups.google.com/a/measurementlab.net/forum/#!forum/ops).

Thanks for your interest in M-Lab! If you have questions or comments, please reach out to us at [support@measurementlab.net](mailto:support@measurementlab.net).
