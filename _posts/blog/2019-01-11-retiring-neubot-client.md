---
layout: blog
title: "Retiring the Neubot Client"
author: "Simone Basso"
date: 2019-01-11
breadcrumb: blog
categories:
  - neubot
---

[Neubot](https://www.neubot.org/){:target="_blank"} hasn’t been updated [in a while](https://github.com/neubot/neubot/releases){:target="_blank"}, but, we decided to keep it available [because there were still many active users](http://streaming.polito.it/neubot/). Now the time has come to say goodbye to the Neubot client, because too much time has passed since the latest release. **We recommend all users to remove Neubot from their computers**, as explained below. If you are interested in running similar tests, you should check out the project I am now working on, called [OONI Probe](https://ooni.torproject.org/){:target="_blank"}.<!--more-->

Before getting into the details of why we’re retiring Neubot, let me explain how to uninstall it from your computer. Then I’ll explain our motivations and provide further technical details.

## Uninstalling Neubot from your computer

Depending on the operating system, the proper procedure varies.

### Windows

There is an uninstaller, just make sure you run it and you’re good.

### Debian and Ubuntu

Perform the following steps:

1. `sudo apt-get autoremove --purge neubot`
2. `sudo apt-key del F68D1AAD`

These instructions were tested on a Docker container running Ubuntu Trusty. The first instruction will remove the Neubot package. The second instruction will remove the GPG key that the original uninstall script forgot to remove from the system.

### Mac OS

Neubot for Mac OS also installs an [uninstall.sh](https://github.com/neubot/neubot-port-macosx/blob/master/MacOS/basedir-skel/versiondir-skel/uninstall.sh){:target="_blank"} script. We can confirm that installing Neubot on Mac OS 10.11.6 El Capitan and then running this script correctly uninstall Neubot.

Otherwise, the minimal manual steps to uninstall Neubot are:

1. `sudo launchctl stop org.neubot`
2. `sudo launchctl unload /Library/LaunchDaemons/org.neubot.plist`
3. `sudo launchctl stop org.neubot.notifier`
4. `sudo launchctl unload /Library/LaunchAgents/org.neubot.notifier.plist`
5. `sudo rm -f /Library/LaunchDaemons/org.neubot.plist`
6. `sudo rm -f /Library/LaunchAgents/org.neubot.notifier.plist`

The first command stops the Neubot daemon. The second command disables the automatic execution of the Neubot daemon at startup. The third command stops the Neubot notifier. It may fail if no user is currently graphically logged in; just ignore that. The fourth command disables the automatic execution of the Neubot notifier when you graphically log in. The fifth and sixth commands remove the Neubot daemon and notifier from the system directories.

## Why now?

This change has been triggered by recent technical discussions, after which I skimmed through the client code base and realised how much work would be needed to make it current. The server is much more under control, and I believe that part of it will somehow survive (see below). The client, however, is significantly more complex to hack on. In particular, the automatic updates mechanism that I designed and implemented in 2011 is an annoying obstacle to perform the radical refactoring that the code base desperately needs.

So, I approached my former Nexa colleagues proposing that either they find someone who could maintain the client, or we collaborate on retiring it for good. (I could not take this decision alone because Neubot is a Nexa product that I just happened to implement and do research on.) We considered also the possibility of implementing a final, “suicide like” automatic update that uninstalled Neubot from the users’ computers. But that required precisely hacking on the most complex part of the codebase. So, we decided to retire Neubot instead.

## Technical Details

As mentioned above, the possibility of implementing a “suicide like” automatic update has been ruled out because it entailed too much, error prone development work. As a second best, we did decide to implement a graceful shutdown procedure, where we’ll gradually pull the plug of components, and where we’ll try to prevent putting current users at risk for a reasonable amount of time (a few years after this blog post has been posted).

Specifically, here’s what is going to happen in the first quarter of 2019:

1. You should uninstall Neubot from your computer at your earliest convenience;
2. Measurement Lab will flag Neubot as a retired tool in its website;
3. Nexa will remove all download links from Neubot.org and, in addition to publishing this blog post, will also clearly flag the tool as retired in the download page;
4. When Measurement Lab migrates to the new Docker-based platform, Simone will not update the Neubot server to run on such platform. Measurement Lab will then update its mlab-ns tool to stop advertising Neubot servers. Simone will also shut down the Neubot central server. In the period of time in which these changes are being implemented, the Neubot client will work inconsistently. After that, it will not work at all.
5. Simone will apply for a new Measurement Lab experiment called DASH that will contain just the server side implementation of Neubot’s DASH test, which is also implemented in Measurement Kit and runnable through OONI mobile apps. If this experiment is approved, Simone will deploy the botticelli implementation of Neubot’s DASH server as a Docker based contained on the new Measurement Lab platform;
6. After Neubot stops working, Nexa will freeze the Neubot.org blog, and any other dynamic website that may be related to Neubot, replacing it with a static copy. Simone will freeze the main GitHub repository, as well as any other inactive repository, and will make sure that the Nexa Center has ownership of the organisation;
7. Simone will notify TopIX that the central server (i.e. master.neubot.org) could now be decommissioned. Since this is contacted by all Neubot clients, Nexa will reconfigure that domain to serve a static page from, e.g., its Apache instance. Additionally Nexa will ensure that this domain will be online and owned by Nexa until December, 2023;
8. Simone will wipe his copies of the Neubot update keys;
9. Nexa will make sure that the [releases.neubot.org](https://releases.neubot.org/){:target="_blank"} domain (which is used to implement Neubot automatic updates) will be online and owned by Nexa until December, 2023, to ensure that it cannot be squatted by someone else and used to push malicious Neubot updates (in the event that Simone’s update keys have been compromised or that an attack allows to override the verification of the update’s signature).
10. Nexa will close the mailing list. The archives will be kept.

## OONI Probe

If I may suggest a replacement for Neubot, please consider installing [OONI Probe](https://ooni.torproject.org/install/){:target="_blank"} (which I currently work on). It is a project that originally focused on network censorship only, but has since also included network performance tests. OONI Probe is powered by the [Measurement Kit](https://github.com/measurement-kit/measurement-kit){:target="_blank"} library that I started contributing to when I was still working at Nexa.

We are rolling out new native OONI Probe desktop apps in 2019 that will have some Neubot-like capabilities (such as running the DASH test). Moreover, I am working on a replacement of the NDT network performance test that aims to yield a quick estimate of your network speed, which was one of the design goals of the SpeedTest test originally implemented in Neubot.

We hope the new OONI Probe tests meet your Neubot needs. Thanks so much to everyone who has run and contributed to Neubot all these years!