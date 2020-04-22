---
layout: blog
title: "NDT JavaScript Integrations - Update to Include Recent ndt-server Bug Fix"
author: "Chris Ritzo"
date: 2020-04-22
breadcrumb: blog
categories:
  - bug
  - upgrades
  - developer
---

A bug fix was recently deployed to M-Lab's NDT JavaScript client code resolving user support reports of consistently higher than expected upload measurements reported in the browser for tests run via speed.measurementlab.net. M-Lab recommends that any third parties who integrate the NDT test in JavaScript to check and/or update their client code if their integration is based on M-Lab's JavaScript test in the [speed.measurementlab.net codebase](https://github.com/m-lab/mlab-speedtest){:target="_blank"}.<!--more-->

M-Lab [users reported](https://github.com/m-lab/ndt-server/issues/281){:target="_blank"} that repeated tests on both speed.measurementlab.net and their own integration of NDT (which is based on the speed.measurementlab.net code), returned randomly higher than expected upload speeds. M-Lab staff responded to the issue, identifying a race condition in the client-side code that updates the visual display with values during the upload test. While correct measurement values continued to be stored in the database, clients may have been presented with inaccurate upload speeds in the browser.

A fix was [deployed to `mlab-speedtest`](https://github.com/m-lab/mlab-speedtest/pull/21/files){:target="_blank"} and a [separate fix to the ndt5 JavaScript client provided by `ndt-server`](https://github.com/m-lab/ndt-server/pull/283){:target="_blank"}.

M-Lab encourages third-party developers whose integration is based on the NDT JavaScript code in our `mlab-speedtest` repository, to [review this pull request](https://github.com/m-lab/mlab-speedtest/pull/21/files){:target="_blank"}, and adjust their JavaScript integration to integrate this fix.

For questions or support, please email us at support@measurementlab.net.
