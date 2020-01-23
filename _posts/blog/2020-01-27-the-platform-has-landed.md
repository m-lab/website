---
layout: blog
title: "The 2.0 Platform Has Landed -- Thank you!"
author: "Stephen Soltesz"
date: 2020-01-27
breadcrumb: blog
categories:
  - platform
  - community
---

After years of planning and steady development, the new M-Lab 2.0 platform has
landed. We want to express special thanks to those who have supported the
project and helped us get here.<!--more-->

## Landing

We shared our plans for [Modernizing the M-Lab Platform][1] and our progress
in [M-Lab 2.0 Platform Migration Update][2], demonstrated comparable
performance in the new platform in [M-Lab 2.0 Platform: Global Pilot
Entry][3] and [M-Lab 2.0 Platform: Global Pilot Success][4]. The new M-Lab is
based on docker, kubernetes, and runs on stock Linux kernels. It leverages
kernel APIs and virtualization technologies that did not exist when the first
M-Lab was built and provides unprecedented transparency and reproducibility.

Now we're running new and backward compatible measurement services, with
plans to add more soon:

* [NDT]({{site.baseurl}}/tests/ndt/)
* [Neubot]({{site.baseurl}}/tests/neubot/)
* [WeHe](https://dd.meddle.mobi/)

These primary measurement services run alongside core service and sidecar
containers that collect additional instrumentation from tcp-info,
packet-headers, traceroute-caller, and switch utilization.

Increasingly, we are focused on accessibility of these new datatypes such as
in [NDT Dataset, Tables, & Views][5]. Look forward to more updates soon!

## Thank you

We could not have done this alone.

From 2009 through 2019, [PlanetLab][6] kept the web100- and vserver-based
M-Lab platform running. This included building custom kernels to fix bugs and
support each new generation of hardware. This included keeping the boot
servers running through certificate updates, server failures, and major
upgrades. Special thanks to Michael Wawrzoniak for his years of support to
M-Lab, and to Larry Peterson for his early vision and long term institutional
support.

Thanks to [isc.org](https://isc.org) and
[greenhost.net](https://greenhost.net/) for providing M-Lab with
primary/secondary DNS resolution for millions of clients around the world.

Thanks to [New America's Open Technology Institute][8] for leadership and
support over the years.

Thanks to the FCC and SamKnows for conducting the [Measuring Broadband
America][9] survey using M-Lab's open measurement platform and promoting
standards for open methods.

Thanks to the dozens of [Supporting Partners][10], site hosts, and transit
providers that make the Internet observable. Your contributions are timely
and enduring.

And, thank you so much to our users for running billions of speed tests every
year. Each one helps inform network research and public policy with real
data. Thank you for reporting successes, problems, and helping us broaden our
use-cases over time.

Thank you!

[1]: {{ site.baseurl }}/blog/modernizing-mlab
[2]: {{ site.baseurl }}/blog/mlab-20-platform-migration-update
[3]: {{ site.baseurl }}/blog/global-pilot-entry
[4]: {{ site.baseurl }}/blog/global-pilot-success
[5]: {{ site.baseurl }}/blog/platform-transition-ndt-dataset-tables-views
[6]: https://www.planet-lab.org/
[8]: https://www.newamerica.org/oti/
[9]: https://www.fcc.gov/general/measuring-broadband-america
[10]: https://www.measurementlab.net/who/#supporting-partners
