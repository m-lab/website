---
layout: blog
title: "NDT JavaScript Integrations - Update to Include Recent ndt-server Bug Fix"
author: "Chris Ritzo"
date: 2020-04-20
breadcrumb: blog
categories:
  - bug
  - upgrades
  - developer
---

A bug fix was recently deployed to `ndt-server` and to speed.measurementlab.net, resolving a support issue reporting consistently higher than expected upload measurements. On the client side, this change may require third parties who integrate the NDT test to update their client code.<!--more-->

M-Lab [users reported](https://github.com/m-lab/ndt-server/issues/281){:target="_blank"} that repeated tests on both speed.measurementlab.net and their own integration of NDT (which is based on the speed.measurementlab.net code), returned consistently higher upload speeds than expected. M-Lab staff responded to the issue, identifying a race condition in the server-side code that updates the client with values in the "client to server" or upload test. While correct measurement values continued to be stored in the database, clients may have been presented with inaccurate upload speeds in the browser.

A fix was [deployed to `ndt-server`](https://github.com/m-lab/ndt-server/pull/283){:target="_blank"} and a [separate fix to the NDT client](https://github.com/m-lab/mlab-speedtest/pull/21/files){:target="_blank"} used on speed.measurementlab.net.

M-Lab encourages third-party developers who are using NDT JavaScript code in their integrations, to [review the pull request to speed.measurementlab.net](https://github.com/m-lab/mlab-speedtest/pull/21/files){:target="_blank"}, and adjust their JavaScript integration to integrate this fix.

For questions or support, please email us at support@measurementlab.net.
