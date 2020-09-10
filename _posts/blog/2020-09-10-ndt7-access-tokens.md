---
layout: blog
title: "Requiring access tokens for ndt7"
author: "Stephen Soltesz"
date: 2020-09-10
breadcrumb: blog
categories:
  - ndt
  - ndt7
---

Starting October 7th, 2020, the ndt7 server on the M-Lab platform will
require access tokens issued by the Locate API v2 to run a
measurement.<!--more-->

## Migration

With the [ndt7 migration][ndt7migration], clients began using access tokens.
However, the NDT server does not yet *require* access tokens. On October 7th,
we will require ndt7 clients to provide access tokens when running a
measurement.

The [Locate API v2][locatev2] issues signed [JSON web tokens][rfc7519]
(access tokens) that the target service verifies.

All officially supported clients use the Locate API v2 and provide access
tokens to the ndt7 server automatically.

* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go)
* [ndt7-js](https://github.com/m-lab/ndt7-js)

Third-party clients should migrate to the Locate API v2 to use access tokens
too.

[ndt7migration]: {{ site.baseurl }}/blog/migrating-ndt-clients-to-ndt7
[locatev2]: {{ site.baseurl }}/develop/locate-v2
[rfc7519]: https://tools.ietf.org/html/rfc7519

## Get Access Tokens

To get an access token for ndt7, query the Locate API. Each result includes a
set of URL templates as key and a complete URL as the value which includes
the access token.

```sh
curl https://locate.measurementlab.net/v2/nearest/ndt/ndt7
{
  "results": [
    {
      "machine": "mlab2-lga05.measurement-lab.org",
      "location": {
        "city": "New York",
        "country": "US"
      },
      "urls": {
        "wss:///ndt/v7/download": "wss://ndt-mlab2-lga05.measurement-lab.org/ndt/v7/download?access_token=.",
        "wss:///ndt/v7/upload": "wss://ndt-mlab2-lga05.measurement-lab.org/ndt/v7/upload?access_token=.",
      }
    },
    {
      ...
    }
  ]
}
```

## Use Access Tokens

Clients do not have to interpret access tokens. Clients are only responsible
for delivering the access token to the target service. For ndt7, the HTTP
request parameters include the access token value, and are delivered
automatically by typical HTTP or websocket libraries when making a
connection.

## Questions

If you have questions, please [let us know][email].

[email]: mailto:support@measurementlab.net
