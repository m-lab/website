---
layout: page
permalink: /develop/locate-v1/
title: "Locate API v1"
page-title: "Locate API v1"
breadcrumb: contribute
---

# Locate API v1

*DEPRECATED: the Locate API v1 (a.k.a. "mlab-ns") is deprecated. New projects*
*should adopt the Locate API v2. If you are using the Locate API v1 please*
*prepare to migrate to the Locate API v2. These notes are preserved for*
*reference*

NOTE: these instructions are for the deprecated Locate API v1. Please use the [Locate API v2]({{ site.baseurl }}/develop/locate-v2) for new integrations.

## How to select an M-Lab server for testing

Client developers are welcome to use any production M-Lab site according to their preference and testing plans. However, developers should keep in mind that certain servers can encounter disruption or administrative maintenance with short to no notice. Planning should allow for changes in availability for servers. The easiest and recommended way to deal with changing server availability is to use our directory service.

We provide a directory service named [Locate](https://locate.measurementlab.net/admin/map/ipv4/all) (also historically referred to as mlab-ns) that provides structured data on the availability of servers on the platform. By default, the Locate service provides the client with the address of one of the servers geographically closest to the user. However, other information is available within the Locate service based on the parameters provided to the API, including a list of all available servers. Applications should not cache values returned by mlab-ns for a long time; we recommended that maintainers’ applications query the service in real time to ensure the availability of any server and to monitor for new servers on the platform. This is important whether or not a client bases its selection of geographic closeness. At a minimum, we recommend applications invalidate their cache and query the Locate service again when the connection fails to a server name cached from an old response.

For more information on using the Locate service, please refer to the [M-Lab NS Design Document](https://github.com/m-lab/mlab-ns/blob/master/DESIGN_DOC.md).

## Using the M-Lab Locate Service (mlab-ns) for Server Selection

M-Lab encourages developers to use the M-Lab Locate Service (mlab-ns) to route all client requests to the closest available M-Lab server. mlab-ns is a distributed service hosted on Google AppEngine that ‘routes’ HTTP requests for tests hosted on M-Lab to the closest available server, according to different policies. See the [M-Lab NS Design Document](https://github.com/m-lab/mlab-ns/blob/master/DESIGN_DOC.md) for the original list of requirements for mlab-ns.

The Locate service is enabled for the following M-Lab tests:

* NDT, NDT SSL
* Neubot DASH
* WeHe

In a typical scenario, an app or web-based NDT implementation will make a call to the locate service to determine which M-Lab server is closest and available to the user to conduct the test. Calls to the locate service should at a minimum include the tool name within the path, for example: https://locate.measurementlab.net/ndt

A response in JSON format is returned which the application then uses to provide the client a server to use to conduct the test:

```json
{"city": "Washington_DC", "url": "http://ndt.iupui.mlab1.iad05.measurement-lab.org:7123", "ip": ["4.35.238.203"], "fqdn": "ndt.iupui.mlab1.iad05.measurement-lab.org", "site": "iad05", "country": "US"}
```

When the request arrives to the locate service, the geolocation of the user is automatically included in the HTTP headers by the Google AppEngine infrastructure. The Locate service logs are not governed by M-Lab's open-data policy. Queries to the Locate service may be sent prior to acquiring user consent to run the actual test. Using the location from AppEngine, Locate service selects the nearest available M-Lab server and redirects the user to the corresponding URL. Additional query parameters are available, which are detailed in the [M-Lab NS Design Document](https://github.com/m-lab/mlab-ns/blob/master/DESIGN_DOC.md).
