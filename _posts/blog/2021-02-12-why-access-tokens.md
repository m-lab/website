---
layout: blog
title: "Requiring access tokens for ndt7"
author: "Stephen Soltesz"
date: 2021-02-12
breadcrumb: blog
categories:
  - ndt
  - ndt7
---

Performing a measurement with ndt7 on the M-Lab platform now requires an
access token issued by the Locate API v2.
<!--more-->

## Update

The [original plan][ndt7tokens] to require access tokens for ndt7 was
rescheduled to 2021-02. This was to allow time for existing deployments to
update their clients.

[ndt7tokens]: {{ site.baseurl }}/blog/ndt7-access-tokens

Clients supported by M-Lab already use the Locate API v2 and provide access
tokens to the ndt7 server automatically.

* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go)
* [ndt7-js](https://github.com/m-lab/ndt7-js)

Clients supported by the community support the Locate API v2 to some degree.
Your help improving them would be welcome.

* [ndt7-client-ios](https://github.com/m-lab/ndt7-client-ios) - [open PR][1]
* [ndt7-client-android](https://github.com/m-lab/ndt7-client-android) - supported

[1]: https://github.com/m-lab/ndt7-client-ios/pull/77

## Why this matters

Most measurements are run by people at random times during the day. The
random distribution, means no single machine receives too many tests at any
one time. As well, the Locate API randomizes results within a geographic
region, further helping distribute load across available servers.

However, a growing number of automated clients run on very regular schedules.
As well, some clients target a small number of specific machines. Ultimately,
when many clients run a measurement at the same time to the same server, they
degrade user experience and measurement quality for their own and other
measurements. See the image below.

![hourly-tests]({{ site.baseurl }}/images/blog/2021-02-12-why-access-tokens/hourly-tests.png)

We believe this behavior is the accidental and unfortunate result of
non-randomized scheduling.

If you are building automated testing, please review and follow our best
practices for [client scheduling][scheduling].

[scheduling]: https://www.measurementlab.net/develop/#best-practices-on-test-scheduling-and-frequency

## Questions

If you have questions, please [let us know][email].

[email]: mailto:support@measurementlab.net
