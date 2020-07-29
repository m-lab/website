---
layout: page
permalink: /develop/locate-v2/
title: "Locate API v2"
page-title: "Locate API v2"
breadcrumb: contribute
---

# Locate API v2

The Locate API v2 provides consistent, expected measurement quality for M-Lab
clients. The Locate API v2 provides complete, client usable URLs for
measurement services. This means service ports, URL paths, and required HTTP
parameters are already embedded in the reply.

## TL;DR Find Nearby Measurement Services

The Locate API v2 currently supports two measurement services, with others
planned:

* ndt/ndt5
* ndt/ndt7
* wehe/replay (planned)
* neubot/dash (planned)

The measurement service name (e.g. "ndt") and type (e.g. "ndt7") are the last
two part of the Locate API v2 request URL. For example:

* [https://locate.measurementlab.net/v2/nearest/ndt/ndt7][locate-ndt7]

On success, this request returns a JSON response with a `result` array. Each
result includes the target `machine`, `location`, and a set of complete
service URLs (`urls`).

Clients may add additional HTTP parameters to the service URL. However,
clients should not remove any existing parameters. In particular, the Locate
API v2 includes an `access_token=` parameter that is validated by the target
service. Access tokens are the primary mechanism for ensuring that clients
route requests through the Locate API so that global load balancing is
possible, and consistent, expected measurement quality is achieved.

```json
{
  "results": [
    {
      "machine": "mlab2-lga05.mlab-oti.measurement-lab.org",
      "location": {
        "city": "New York",
        "country": "US"
      },
      "urls": {
        "wss:///ndt/v7/download": "wss://ndt-mlab2-lga05.mlab-oti.measurement-lab.org/ndt/v7/download?access_token={{token}}",
        "wss:///ndt/v7/upload": "wss://ndt-mlab2-lga05.mlab-oti.measurement-lab.org/ndt/v7/upload?access_token={{token}}",
      }
    },
    {
      ...
    }
  ]
}
```

[locate-ndt7]: https://locate.measurementlab.net/v2/nearest/ndt/ndt7

## Learning More About the Locate API v2

* [USAGE.md][locate-usage] is a technical overview of the Locate API's
  capabilities and usage.

* [Locate API Developer Portal][developer-locate] is a browser-based "API
  explorer" user interface that documents resource types and allows developers
  to experiment with real API requests and responses.

> NOTE: to access the Locate API Developer Portal your Google account must be
a member of the [api-announce@measurementlab.net][api-announce] mailing list.

When accessing the developer portal, you will be asked to login and grant
permissions to the app. These permissions only verify that you are a member
of the above group.

![locate-developer-iam](/images/developer/locate-developer-iam.png){:height="30%" width="30%"}
**Grant the developer portal permissions to verify that your account is a**
**member of the api-announce@ group**

[locate-usage]: https://github.com/m-lab/locate/blob/master/USAGE.md
[developer-locate]: https://developer-locate.measurementlab.net/
[api-announce]: https://groups.google.com/a/measurementlab.net/g/api-announce

