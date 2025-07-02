---
layout: page
permalink: /status/
title: "M-Lab Platform Status"
audience: statusmap
breadcrumb: data
---

# M-Lab Platform Status

M-Lab places server infrastructure for conducting tests in diverse location around the world. Since 2008, we have sought hosting in well connected data centers where ISPs interconnect with one another to have high performance access to as many users as possible from as few locations as possible. In 2022, we also began incoporating [virtual servers in cloud networks]({{ site.baseurl }}/blog/2022-mlab-to-the-cloud/#m-lab-to-the-cloud) into the platform, [starting with Google Cloud]({{ site.baseurl }}/blog/virtual-sites-gcp/#m-lab-to-the-cloud:-virtual-sites-in-all-google-cloud-regions). Additionally, in 2025 we began to pilot a new "host-managed" deployment model that permits any interested network provider to stand up a server and run M-Lab's software services to become part of the global platform. For these host-managed deployments, M-Lab does not manage or control the servers in any way.

Each physical M-Lab "site" consists of 3-4 servers and one switch, connected directly to an upstream provider. Virtual sites include 1 or more virtual servers proportionate to demand. In large metro areas, we prefer to place multiple sites to obtain diversity in transit and routes. Host-managed deployments may consist of physical and/or virtual machines, and may be located in a diversity of locations and networks, including transit, research and education, as well as last-mile ISP networks.

If you are a network provider interested in hosting an M-Lab measurement site, please [review our requirements]({{ site.baseurl }}/contribute/#host-or-sponsor-an-m-lab-measurement-site) and fill out our [Infrastructure Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLSe1wXKfQ0VIt_hZFatCwCaoOeeDpRv3JZDM_eAmIaksMuwB4g/viewform?usp=sf_link).

## Infrastructure Map
<p>
The M-Lab infrastructure map displays basic information about platform servers around the world. Clusters of M-Lab servers are displayed as dark-blue and light-blue circles with a count of servers in the center. Clicking on a cluster will display a pop up with info about each server in the cluster. Single small dots show locations with only one server. Clicking on a single marker will display a pop up with info about that server. Double-click on the map to zoom in, or scroll in and out to zoom.
<div id="map" class="map leaflet-container" style="height: 500px; width:100%; position:relative;"></div>
</p>

<script>
{% include infrastructure-map.js %}
</script>

## M-Lab Locate Service

The Locate Service and API provides consistent, expected measurement quality for M-Lab
clients. The Locate API is a GCP hosted service that "locates" the best M-Lab
server for a user request. For different use cases, "best" could mean different
things. See [USAGE.md](https://github.com/m-lab/locate/blob/main/USAGE.md) and
the documents below for hints on supported queries.

- Homepage: <https://locate.measurementlab.net/>
- Usage: [USAGE.md](https://github.com/m-lab/locate/blob/main/USAGE.md)
- Design doc: [M-Lab Locate v2](https://docs.google.com/document/d/1az-4Fojf_0REQopCyA9WDS54ZNILQDuTc5SnWkbozbE/view)
- Mailing list: [discuss@measurementlab.net](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss)
