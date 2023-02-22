---
layout: blog
title: "Running Your Own ndt-server"
author: "Chris Ritzo"
date: 2019-11-26
breadcrumb: blog
categories:
  - data
  - open-source
  - performance
  - tcp-info
  - ndt-server
---

If you've followed the M-Lab blog over the past year and a half, you'll know that we've been engineering and testing a massive upgrade to our server software and how it's managed and deployed \[[1]({{ site.baseurl }}/blog/modernizing-mlab)\] \[[2]({{ site.baseurl }}/blog/mlab-20-platform-migration-update)\] \[[3]({{ site.baseurl }}/blog/global-pilot-entry/)\] \[[4]({{ site.baseurl }}/blog/global-pilot-success/)\]. That's been a ton of work, and our team is excited to now complete the migration from the PLC/vserver platform to the new k8s stack.

We expect some great derivative outcomes of migrating to Docker and Kubernetes both for ourselves in managing the platform and measurement tests we host, and for the community as well. In particular, the NDT server was completely rewritten in _Golang_, and being fully "dockerized" the server is now portable and usable outside of the M-Lab platform by others. This is really exciting because not only can M-Lab use our tools to measure the public Internet, but _anyone_ can run our server now to measure their network privately using the same methods and tools. This post kicks off a series of blogs that will demonstrate various ways to use M-Lab server and client tools, starting with `ndt-server`.<!--more-->

To illustrate the use of _ndt-server_ outside of the M-Lab context, I put together this post as a demo so others might take _ndt-server_ for a test drive in their networks. I've used a publicly available [ndt fullstack](https://github.com/m-lab/ndt-server/tree/master/fullstack){:target="_blank"} Docker image for NDT from [M-Lab's Dockerhub](https://hub.docker.com/repository/docker/measurementlab/ndt){:target="_blank"}. The fullstack image provides the _ndt-server_ container, and all of the "sidecar" container services that M-Lab uses on our servers to gather rich data from client tests: _tcp-info_, _traceroute_, _uuid_, and _packet header captures_.

Important to note here is that every network that might run their own _ndt-server_ will have unique needs and configurations. The demo assumes that you have a basic understanding of installing and configuring linux systems, are comfortable with the command line, and can make configurations to your network, such as setting a static IP address for the server. The hardware used in this demo doesn't mean we recommend it for production use. Lastly, our _fullstack_ image should be considered a demo at this time, not intended for production use **_yet_**. As we complete our production rollout of the new platform, the fullstack image will be improved to make it more production ready. In the meantime, if you give this demo a try yourself and need help, reach out to us at [support@measurementlab.net](mailto:support@measurementlab.ndt).

## Setup and run an ndt-server on Ubuntu 18.04 LTS

* Install host OS, secure to your liking. I used:
  * Ubuntu 18.04.3 server, amd64
  * Intel NuC 6i5SYH
* Ensure your server is reachable on your network in the desired way, by hostname or IP address.
  * In this example, I assigned my server a static IP address (192.168.1.123) on the local network.
* Install docker:
  * `sudo apt install docker.io`
  * `sudo usermod -aG docker $USER`
* Logout of the current session, then log back in
* Upgrade linux kernel to use the latest TCP compression algorithm, BBR:
  * Download from: [http://kernel.ubuntu.com/~kernel-ppa/mainline/](http://kernel.ubuntu.com/~kernel-ppa/mainline/){:target="_blank"}
    * linux-headers-5.2.0-050200_5.2.0-050200.201907231526_all.deb
    * linux-headers-5.2.0-050200-generic_5.2.0-050200.201907231526_amd64.deb
    * linux-image-unsigned-5.2.0-050200-generic_5.2.0-050200.201907231526_amd64.deb
    * linux-modules-5.2.0-050200-generic_5.2.0-050200.201907231526_amd64.deb
  * Install downloaded kernel files: `sudo dpkg -i *.deb`
  * Reboot the machine, and once logged back in, confirm the kernel was upgraded:
    * `uname -r` should display: `5.2.0-050200-generic`
  * Enable `tcp_bbr` since ndt7 works much better with it
    * `sudo modprobe tcp_bbr`

## Running ndt-server

You can either use M-Lab provided, pre-built Docker images for `ndt-server` or build Docker images yourself locally.

In this post, I'll focus on running ndt-server in two ways:

* "Standalone" `ndt-server`, with test results saved as JSON
* "Full Stack" `ndt-server`, with M-Lab recommended "sidecar" services: `tcp_info`, `traceroute`, `uuid`, and `packet-headers`.

Once the server is up, then also demo how to run NDT client tests from a Docker container to your local server.

## Standalone ndt-server setup

* Get the `ndt-server` source code, generate TLS certs, setup folders:
`git clone https://github.com/m-lab/ndt-server.git && cd ndt-server`
* Create folders for your certs and data: `install -d certs datadir`
* Generate local self-signed certs for testing: `./gen_local_test_certs.bash`
  * This command saves these files: `certs/cert.pem` and `certs/key.pem`
* Pull and run the latest `ndt-server` image from Measurement Lab's dockerhub:

```~bash
docker run -d --network=host                    \
           --volume `pwd`/certs:/certs:ro       \
           --volume `pwd`/datadir:/datadir      \
           --read-only                          \
           --user `id -u`:`id -g`               \
           --cap-drop=all                       \
           measurementlab/ndt-server:latest     \
           -cert /certs/cert.pem                \
           -key /certs/key.pem                  \
           -datadir /datadir                    \
           -ndt7_addr :4443                     \
           -ndt5_addr :3001                     \
           -ndt5_wss_addr :3010                 \
           -ndt7_addr_cleartext :8080

2820cd8907550a55fdb5663b6b5718184359d86ab371f277b8f2e8b49fa6562e

```

Here we're starting the container in daemon mode. You can also To see the container's running logs, either start it without `-d` or follow the container's running logs:

* Get the container's ID:

```~bash
docker ps
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS               NAMES
45fec501b4ec        measurementlab/ndt   "/start.sh -cert /ce…"   3 hours ago         Up 3 hours                              lucid_cartwright9
```

* Follow the logs: `docker logs --follow 45fec501b4ec`

The NDT server is now running on the local network. By default, it provides several web URLs:

* To get information about the server, visit: `http://192.168.1.123:3001/`
* To run tests using the available NDT protocols:
  * ndt5, TCP - The original NDT protocol: `http://192.168.1.123:3001/static/widget.html`
  * ndt5, TLS using secure websockets: `https://192.168.1.123:3010/static/widget.html`
  * ndt7, TLS using secure websockets, and using TCP BBR compression where it is enabled: `https://192.168.1.123/static/ndt7.html`

If you're following the container logs, visit the URLs above, run each test, and watch the logs on the server side.

If you want to have the container start automatically when dockerd starts (always run ndt-server across reboots), ensure your docker daemon is enabled `sudo systemctl enable docker`, then use the `--restart=always` flag with docker:

```~bash
docker run -d --restart=always       \
           --network=host              \
           --publish 443:4443          \
...
```

## Standalone ndt-server Test Data

Test data is saved in the `datadir` you identified when running the container. When running `ndt-server` standalone, each test file is saved in JSON format for `ndt5` protocol tests, and in compressed JSON for `ndt7` protocol tests. The `ndt-server` will automatically archive tests by protocol, year, month, and day using the folder structure below:

```~bash
datadir/
├── ndt5
│   └── 2019
│       └── 10
│           └── 25
│               ├── <server-hostname>_1572034442_unsafe_0000000000000001.json
│               └── <server-hostname>_1572034442_unsafe_0000000000000008.json
└── ndt7
    ├── download
    │   └── 2019
    │       └── 10
    │           └── 25
    │               ├── ndt7-download-20191025T203455.101736523Z.<server-hostname>_1572034442_unsafe_0000000000000004.json.gz
    │               └── ndt7-download-20191025T205802.003865215Z.<server-hostname>_1572034442_unsafe_0000000000000006.json.gz
    └── upload
        └── 2019
            └── 10
                └── 25
                    ├── ndt7-upload-20191025T203505.276601201Z.<server-hostname>_1572034442_unsafe_0000000000000005.json.gz
                    └── ndt7-upload-20191025T205812.218866596Z.<server-hostname>_1572034442_unsafe_0000000000000007.json.gz
```

Note that the word "unsafe" will appear in the filename. That is because there is a little extra setup to do to get Universally Unique Identifiers (UUIDs) working in a truly threadsafe manner. Fortunately, you can also run "Full Stack" `ndt-server`, which includes setting up UUIDs, and runs additional services to gather richer network information about tests.

## "Full Stack" ndt-server setup

You can also run `ndt-server` with the same "sidecar" services that M-Lab runs on our production servers: `tcp_info`, `traceroute`, `uuid`, and `packet-headers`.

* Get the `ndt-server` source code, generate TLS certs, setup folders: `git clone https://github.com/m-lab/ndt-server.git && cd ndt-server`
* Create folders for your certs and data: `install -d certs datadir`
* Generate local self-signed certs for testing: `./gen_local_test_certs.bash`
  * This command saves these files: `certs/cert.pem` and `certs/key.pem`

* When running the `ndt-server` Full Stack image, we need a mount point in the container for saving data:

* ```--volume `pwd`/datadir:/var/spool/ndt``` replaces ```--volume `pwd`/datadir:/datadir```

Then run our "fullstack" container, `measurementlab/ndt`:

```~bash
docker run --network=host                \
           --volume `pwd`/certs:/certs:ro   \
           --volume `pwd`/datadir:/var/spool/ndt  \
           --volume `pwd`/var-local:/var/local \
           --user `id -u`:`id -g`       \
           --cap-drop=all               \
        measurementlab/ndt              \
           -cert /certs/cert.pem        \
           -key /certs/key.pem          \
           -datadir /datadir            \
           -ndt7_addr :4443             \
	   -ndt7_addr_cleartext :8080   \
           -ndt5_addr :3001             \
           -ndt5_wss_addr :3010
```

## Full Stack ndt-server Data

When running `ndt-server` with `tcp_info`, `traceroute`, `uuid`, and `packet-headers`, additional directories are saved in your data folder.

```~bash
datadir/
├── ndt5
│   └── 2019
│       └── 10
│           └── 26
│               ├── <server-hostname>_1572037865_000000000000012C.json
│               ├── <server-hostname>_1572037865_0000000000000136.json
│               ├── <server-hostname>_1572037865_000000000000015C.json
│               └── <server-hostname>_1572037865_0000000000000161.json
├── ndt7
│   ├── download
│   │   └── 2019
│   │       └── 10
│   │           └── 26
│   │               ├── ndt7-download-20191026T164853.221070367Z.<server-hostname>_1572037865_0000000000000140.json.gz
│   │               └── ndt7-download-20191026T170605.189847388Z.<server-hostname>_1572037865_000000000000016A.json.gz
│   └── upload
│       └── 2019
│           └── 10
│               └── 26
│                   ├── ndt7-upload-20191026T164903.238360825Z.<server-hostname>_1572037865_0000000000000142.json.gz
│                   ├── ndt7-upload-20191026T170515.143972291Z.<server-hostname>_15720
...
├── tcpinfo
│   └── 2019
│       └── 10
│           ├── 25
│           │   ├── <server-hostname>_1572037865_0000000000000067.00000.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00001.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00002.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00003.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00016.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00017.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00018.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00019.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00020.jsonl.zst
│           │   ├── <server-hostname>_1572037865_0000000000000067.00021.jsonl.zst
...
└── traceroute

```

## Wrap up

Ok, great, so now we have an `ndt-server` running. We can test with browser clients- yay! You can now use M-Lab's `ndt-server` and associated services just like we do. In fact, we've already collaborated with people interested in using this open source tool to assess their networks.

This demo gets an `ndt-server` up and running and collecting test data from clients using it on the network. But there's obviously more to it than that. M-Lab test results get pushed to our [data archive]() and [BigQuery datasets]() by way of our [ETL pipeline](). You probably want to do things with your data as well.

As we continue making the `ndt-server` fullstack image more production ready, I'll post an update that demonstrates the use of [pusher](), our solution to getting data from an `ndt-server` to a Google Cloud Storage bucket.

Of course, not everyone needs to run their own server. You may want a better way to automatically test your connection using an NDT client. You might also want to:

* run tests on the command line
* run an NDT client from a container
* automatically run multiple tests to M-Lab servers, or your own `ndt-server`

Fortunately, all this is possible and then some. In my next demo post, I'll demo how to use two of our supported command line client libraries, [_libndt_](https://github.com/measurement-kit/libndt/){:target="_blank"} and [_ndt7-client-go_](https://github.com/m-lab/ndt7-client-go){:target="_blank"}, and also demo _[Murakami](https://github.com/m-lab/murakami){:target="_blank"}_ an automated test runner container with some really great features. Stay tuned!
