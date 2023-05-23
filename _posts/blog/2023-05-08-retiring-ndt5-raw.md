---
layout: blog
title: "Ending support for ndt5+raw protocol and mlab-ns"
author: "Stephen Soltesz"
date: 2023-05-08
breadcrumb: blog
categories:
  - platform
  - ndt
  - ndt5
  - announcement
---

After January 2024, M-Lab will no longer support the legacy ndt5+raw protocol or
mlab-ns.appspot.com service. There are alternatives available for migration now.
<!--more-->

## Summary

For the last three years, ndt7 and the Locate v2 API have served the vast
majority of measurements to M-Lab. And, throughout that time, we have maintained
support for the ndt5+raw protocol and the mlab-ns.appspot.com location service
for backward compatibility with legacy clients. After January 2024, that support
will end.

We recommend that you begin transitioning to ndt7 and the Locate v2 API as soon
as possible to ensure that you have enough time to migrate existing clients and
avoid any disruption.

We are deeply grateful for the time and effort already taken to integrate with
the M-Lab platform. And, we understand that this may be disruptive for you and
your users and apologize for any inconvenience this may cause. We will continue
to provide support and assistance during the migration period.

If you have any questions or concerns, please let us know.

## Why is this necessary?

We created ndt5 as part of the [platform migration][migration] to preserve
backward compatibility for clients dating back to the beginning of M-Lab and the
web100 platform, 2009 to 2019. In 2020, we [introduced ndt7][intro] with the
[Locate v2 API][locatev2] as a successor to ndt5, which addressed many
limitations; ndt7 is a simple protocol (single connection), uses standard ports
(80, 443), uses modern congestion control (BBR), and supports admission control
natively.

For ndt7 clients, we [required admission control][required]. The ndt5+ws and
ndt5+wss protocols also support admission control but are not yet required.
Unfortunately, the ndt5+raw protocol (since it was developed before modern web
standards) cannot support admission control in a backward compatible way. The
only remaining clients of mlab-ns.appspot.com are those using ndt5+raw.

Finally, since M-Lab added [virtual servers][ttc] from [Google Cloud][gcp] to
the platform, and because Cloud servers operate with a different cost structure
for egress traffic, we must enforce admission control for all clients to these
servers. So, virtual servers have already disabled the ndt5+raw protocol and
require access tokens for ndt5+ws and ndt5+wss. By retiring the ndt5+raw
protocol, we can require admission control for all clients on all server types,
and retire mlab-ns.appspot.com.

## Migration to ndt7+ws and ndt7+wss

Today, M-Lab supports multiple official and unofficial [ndt7 clients][clients].

* https://github.com/m-lab/ndt7-js (official, javascript)
* https://github.com/m-lab/ndt7-client-go (official, golang)
* https://github.com/m-lab/ndt7-client-ios (unofficial, swift)
* https://github.com/m-lab/ndt7-client-android (unofficial, kotlin)
* https://github.com/m-lab/ndt7-client-android-java (unofficial, java)

All of these clients use the Locate v2 API, so support admission control
natively and require no customizations.

## Migration to Locate v2 API

If you have developed a custom client, consider sharing your work publicly so
others can benefit from a reusable and verifiable open source test client. We
would be happy to add a link to help others find you work.

If your custom client depends on mlab-ns.appspot.com, you can find guidance for
[migrating to the Locate v2 API here][locatev2].

## Let us know

If you have exceptional concerns about the retirement of ndt5+raw or
mlab-ns.appspot.com, [please let us know](mailto:support@measurementlab.net).

[clients]: https://github.com/m-lab/ndt-server#clients
[intro]: {{ site.baseurl }}/blog/ndt7-introduction
[evolution]: {{ site.baseurl }}/blog/evolution-of-ndt
[required]: {{ site.baseurl }}/blog/ndt7-access-tokens
[locatev2]: {{ site.baseurl }}/develop/locate-v2/
[gcp]: {{ site.baseurl }}/blog/virtual-sites-gcp/
[ttc]: {{ site.baseurl }}/blog/2022-mlab-to-the-cloud/
[migration]: {{ site.baseurl }}/blog/the-platform-has-landed/
