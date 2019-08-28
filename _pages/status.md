---
layout: page
permalink: /status/
title: "M-Lab Platform Status"
audience: statusmap
breadcrumb: data
---

# M-Lab Platform Status

M-Lab places server infrastructure for conducting tests in diverse location around the world. Typically we seek hosting in well connected data centers where ISPs interconnect with one another. Each M-Lab "pod" consists of 3-4 servers and one switch, connected directly to an upstream provider. In large metro areas, we attempt to place multiple pods to obtain diversity in transit and routes.

## Infrastructure Map
<p>
The M-Lab infrastructure map displays information about our server pods around the world. Clusters of M-Lab pods are displayed as dark-blue and light-blue circles with a count of pods in the center. Clicking on a cluster will display a pop up with info about each pod in the cluster. Single small dots show locations with only one server. Clicking on a single pod will display a pop up with info about that pod. Double-click on the map to zoom in, or scroll in and out to zoom.
<div id="map" class="map leaflet-container" style="height: 500px; width:100%; position:relative;"></div>
</p>

{% include infrastructure-map.js %}

## M-Lab Naming Service

M-Lab Naming Service (mlab-ns) is a distributed service based on Google AppEngine that ‘routes’ test requests from M-Lab measurement tools’ clients to the best M-Lab servers. "Best" is defined by different, client-defined policies. Selecting the proper server for a given measurement is critical to ensure that measurement tests collect robust and meaningful data.

- Homepage: <http://mlab-ns.appspot.com/>
- [M-Lab NS Design
  document](https://docs.google.com/a/google.com/document/d/1eJhS75EZHDLmC6exggStr_b1euiR24_MVBJc1L6eH2c/view)
- Mailing list:
  [discuss@measurementlab.net](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss)
