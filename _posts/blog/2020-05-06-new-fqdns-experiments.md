---
layout: blog
title: "New FQDNs for Experiments"
author: "Nathan Kinkade"
date: 2020-05-06
breadcrumb: blog
categories:
  - platform
---

If you have integrated NDT into a client that does not use our Locate Service, please be aware of the following upgrade. If your NDT client uses our Locate Service, you should not notice a change.

Fully Qualified Domain Names for M-Lab experiments will be changing soon.<!--more--> The new names will replace all non-subdomain-designating dots with dashes, and will also include a Google Cloud Project name.  For example:

`ndt.iupui.mlab1.den04.measurement-lab.org`

... will become:

`ndt-iupui-mlab1-den04.mlab-oti.measurement-lab.org`

The underlying IPs will not be changing, and the non-GCP-project-decorated FQDNs will continue to resolve for a while longer (but not forever). For those using the M-Lab Locate Service (currently known as “mlab-ns”), this transition should be transparent, as it will do the right thing for you. For those hard-coding FQDNs in client integrations, please consider switching to the Locate Service. If not possible, then please take this change into account in your code. The new names already resolve.

Regarding changing dots to dashes, this is more consistent with what dots in a FQDN are supposed to designate (a subdomain), and also allows for easier use of wildcard TLS certificates, which do not expand across dots. Indeed, the Locate Service has been returning experiment names with dashes instead of dots for `/ndt_ssl` queries for quite a long time.

In general, this change is being made as part of a larger effort to fully utilize more of the platform nodes for production traffic, and to make the system more flexible for internal operations. Currently, there is a hard-coded assumption that mlab[1-3] nodes are for production, and that mlab4 nodes are for staging. Under this model a full 25% of platform nodes are reserved for pre-production testing, which is more than needed. We will be moving to a system where the node class will be defined in system configurations, which will give us much more flexibility as the platform continues to grow.

Clients that hard-code servers do not benefit from updates to our Locate Service and risk gaps in end user experience. Please reach out at support@measurementlab.net if you have any questions about how to migrate your integration.
