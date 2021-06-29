---
layout: blog
title: "Updates to ndt7"
author: "Lai Yi Ohlsen, Stephen Soltesz"
date: 2021-06-29
breadcrumb: blog
categories:
  - ndt7
  - ndt-server
---

In the past month we’ve made several improvements to ndt-server, ndt7-client-js,
and ndt7-client-go. If you have any questions about the following, please
comment on the relevant Github issues.<!--more-->

## ndt7-client-js

**Early termination of upload test on Firefox**
**Affects:** Firefox users testing with m-lab/ndt7-js < 0.0.4
**Behavior:** When an ndt7 test is run from the Firefox browser, the upload test
terminates and the UI hangs. 
**Cause:** The browser waits to send all the data in its buffer before closing
the WebSocket connection. After 15 seconds (5 seconds after the upload test
ended) the server forcefully terminates the connection, causing a broken pipe. 
**Fix:** The client now terminates the upload worker after 10s, because after
NDT sends data for 10s, there is no need to send the remaining data in the buffer. 
**PR:** https://github.com/m-lab/ndt7-js/pull/18/files
**Status:** Fixed, Deployed to Production 
**Notes:** Some users described this bug as blocking migrating from ndt5 to
ndt7. If you are currently using ndt5, we highly encourage you to migrate to
ndt7. 

**Upload test in Safari overloads buffer**
**Affects:** Safari users testing with m-lab/ndt7-js < 0.0.4
**Behavior:** Client crashes just after the beginning of the upload test
**Cause:** bufferedAmount isn't updated immediately after a sock.send() and thus causes:
  * the send loop to spin extremely fast at the beginning (when messages are small)
  * too many sock.send() in a very short time
  * the test itself crashing with a Failed to send WebSocket frame error because
    it tried sending more data than the WS buffer can contain
**Fix:** 
  * By removing the loop in the uploader function no more than one send() can
    happen in a single call to uploader(), and this slightly slows down the
    beginning of the upload. It also changes the logic from: _“on each call to
    uploader(), completely fill the buffer”_ to: _on each call to uploader(),
    queue one more message if the buffer is not full already._
  * Changing the maximum buffer size to 8 * 8MB - 1 byte ~= 64M. The maximum
    size for the WebSocket buffer is 100MB. By reducingmaxMessageSize from 16M
    to 8M we keep the buffer size below that value and also have some overhead
    for when bufferedAmount is updated late. 
**Status:** Fixed, Deployed to Production 
**PR:** [https://github.com/m-lab/ndt7-js/pull/45](https://github.com/m-lab/ndt7-js/pull/45)

**Safari download tests are rate limited**
**Affects:** Safari users testing with m-lab/ndt7-js < 0.0.4
**Behavior:** Safari users with high capacity connections do not receive the
highest results possible, depending on their CPU performance
**Cause:**
We are not certain of the cause, but we have a couple hypotheses.
  * Interprocess communication. Safari has at least two processes: one managing
    the rendering of the Javascript engine and one managing the network.
    Communication between these two processes could be running slower than the
    network, thereby creating a bottleneck in the download test. 
  * Network queue 
    **Status:** We are continuing to research this behavior and are compiling
    information to submit to Apple’s WebKit team. 
    **Note:** Our hypothesis is that this behavior would be encountered by other
    speed tests that run from WebKit based browsers. If you have also
    encountered similar symptoms with another test/client and would like to
    discuss, please reach out to support@measurementlab.net.

## ndt-server

**ndt-server stops download message scaling unexpectedly**
**Affects:** Initially discovered on low resource embedded clients with
high-capacity connectivity. 
**Behavior:** During the download test, the message scaling stops at 64 KB per
message, rather than the expected 1 MB, which results in more small messages
being sent than intended by the protocol design. Because of this, client CPU
demand is higher due to the large number of messages received.
**Cause:** The previous code stopped scaling messages at 64 KB, rather than the
expected 1 MB. 
**Fix:** ndt-server now continues scaling messages until 1 MB. 
**PR:** [https://github.com/m-lab/ndt-server/pull/331](https://github.com/m-lab/ndt-server/pull/331)
**Status:** Fixed. We are currently canary testing. 
**Note:** No significant differences have been observed on canary servers. We
will publish our analysis in July.

## ndt7-client-go

**NDT Go client memory allocation**
**Affects:** Low resource embedded clients with high-capacity connectivity 
**Behavior:** The ndt7-client-go was allocating memory for incoming WebSocket
messages during the download test, causing unnecessary garbage collection and
CPU usage, which ultimately affected download performance on CPU-constrained
devices.
**Cause:** Reading the content of binary WebSocket messages into a temporary buffer.
**Fix:** Discarding all the incoming binary WS messages.
**PR:** [https://github.com/m-lab/ndt7-client-go/pull/63](https://github.com/m-lab/ndt7-client-go/pull/63)
**Status:** Fixed, Deployed to Production 
 
**NDT Go client TLS performance**
**Affects:** Low resource embedded clients with high-capacity connectivity 
**Behavior:** Running ndt7-client-go on some embedded devices results in
noticeably slower performance when TLS is enabled.
**Cause:** On devices lacking a dedicated AES instruction set in the CPU,
encryption is done via a pure Go implementation, which causes non-negligible
overhead. Defaulting to WSS (Secure WebSocket) exacerbates the problem since the
user has to explicitly configure the client to use WS to avoid incurring such
overhead (-scheme=ws)
**Fix:** The client is now able to detect if the CPU features AES instructions
and, if not, defaults to non-encrypted WebSocket connections. Additionally,
building the server with Go >= 1.16 adds an automatic preference for faster
crypto suites whenever the client does not explicitly signal AES support, which
improves performance on embedded devices even when -scheme=wss is enforced. We
still recommend that these clients do not use WSS.
**PR:** [https://github.com/m-lab/ndt7-client-go/pull/62](https://github.com/m-lab/ndt7-client-go/pull/62)
**Status:** Fixed on the client, pending canary testing on the new ndt-server (see above) 
