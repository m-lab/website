---
layout: page
permalink: /status/
title: "M-Lab Platform Status"
audience: statusmap
breadcrumb: data
---

# M-Lab Platform Status

M-Lab places server infrastructure for conducting tests in diverse location around the world. Since 2008, we have sought hosting in well connected data centers where ISPs interconnect with one another to have high performance access to as many users as possible from as few locations as possible. In 2022, we also began incoporating [virtual servers in cloud networks]({{ site.baseurl }}/blog/2022-mlab-to-the-cloud/#m-lab-to-the-cloud) into the platform, [starting with Google Cloud]({{ site.baseurl }}/blog/virtual-sites-gcp/#m-lab-to-the-cloud:-virtual-sites-in-all-google-cloud-regions).  

Each physical M-Lab "site" consists of 3-4 servers and one switch, connected directly to an upstream provider. Virtual sites include 1 or more virtual servers proportionate to demand. In large metro areas, we prefer to place multiple sites to obtain diversity in transit and routes.

If you are a service provider interested in hosting an M-Lab Measurement site, please [review our requirements]({{ site.baseurl }}/contribute/#host-or-sponsor-an-m-lab-measurement-site) and [reach out](mailto:hello@measurementlab.net). 

## Infrastructure Map
<p>
The M-Lab infrastructure map displays information about our server pods around the world. Clusters of M-Lab pods are displayed as dark-blue and light-blue circles with a count of pods in the center. Clicking on a cluster will display a pop up with info about each pod in the cluster. Single small dots show locations with only one server. Clicking on a single pod will display a pop up with info about that pod. Double-click on the map to zoom in, or scroll in and out to zoom.
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
