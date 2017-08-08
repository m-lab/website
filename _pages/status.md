---
layout: page
permalink: /status/
title: "M-Lab Platform Status"
breadcrumb: data
---

# M-Lab Platform Status

M-Lab places server infrastructure for conductingt tests in diverse location around the world. Typically we seek hosting in well connected data centers where ISPs interconnect with one another. Each M-Lab "pod" consists of 3-4 servers and one switch, connected directly to an upstream provider. In large metro areas, we attempt to place multiple pods to obtain diversity in transit and routes.

## Infrastructure Map

<p><iframe src="https://mlab-ns.appspot.com/admin/map/ipv4/all" width="100%" height="660" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" align="left"></iframe></p>

## Server Status

<p><iframe src="https://mlab-ns.appspot.com/admin/sliver_tools" width="100%" height="400" frameborder="0" marginwidth="0" marginheight="0" scrolling="yes"></iframe></p>

## M-Lab Naming Service

M-Lab Naming Service (mlab-ns) is a distributed service based on Google AppEngine that ‘routes’ test requests from M-Lab measurement tools’ clients to the best M-Lab servers. "Best" is defined by different, client-defined policies. Selecting the proper server for a given measurement is critical to ensure that measurement tests collect robust and meaningful data.

- Homepage: <http://mlab-ns.appspot.com/>
- [M-Lab NS Design
  document](https://docs.google.com/a/google.com/document/d/1eJhS75EZHDLmC6exggStr_b1euiR24_MVBJc1L6eH2c/view)
- Mailing list:
  [discuss@measurementlab.net](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss)
