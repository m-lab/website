---
layout: page
permalink: /tests/ndt/ndt7/
title: "ndt7 Protocol - NDT (Network Diagnostic Tool)"
breadcrumb: tests
---

# ndt7 Protocol - NDT (Network Diagnostic Tool)

The ndt7 protocol is a new NDT protocol version provided by in [ndt-server](https://github.com/m-lab/ndt-server/){:target="_blank"}. ndt7 is a non-backwards comparible redesign of [the original NDT network performance measurement protocol](https://github.com/ndt-project/ndt){:target="_blank"}. ndt7 is based on WebSocket and TLS, and takes advantage of [TCP BBR](https://queue.acm.org/detail.cfm?id=3022184){:target="_blank"}.

NDT data using the ndt7 protocol has been collected since **##DATE##** using [tcp-info](https://github.com/m-lab/tcp-info){:target="_blank"} for all TCP metrics.

More details about the ndt7 protocol can be found in the [ndt7 protocol specification on Github](https://github.com/m-lab/ndt-server/blob/master/spec/ndt7-protocol.md){:target="_blank"}.

[Details about the ndt7 data format](https://github.com/m-lab/ndt-server/blob/master/spec/data-format.md){:target="_blank"} can also be found on Github.
