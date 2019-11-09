---
layout: blog
title: "Running Your Own ndt-server and Clients"
author: "Chris Ritzo"
date: 2019-10-31
breadcrumb: blog
categories:
  - platform
  - research
  - data
  - kernel
  - open-source
  - performance
  - tcp-info
  - ndt-server
---

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

* Upgrade linux kernel to use the latest TCP compression algo, BBR:
  * Download from: http://kernel.ubuntu.com/~kernel-ppa/mainline/
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
* "Full Stack" `ndt-server`, with M-Lab recommended "sidecar" services: tcp_info and traceroute
https://github.com/m-lab/ndt-server/tree/master/fullstack`ndt-server` plus

Once the server is up, then also demo how to run NDT client tests from a Docker container to your local server.

### Standalone ndt-server setup

* Get the `ndt-server` source code, generate TLS certs, setup folders:

```~bash
git clone https://github.com/m-lab/ndt-server.git
cd ndt-server
```

* Create folders for your certs and data: `install -d certs datadir`
* Generate local self-signed certs for testing: `./gen_local_test_certs.bash`
  * This command saves these files: `certs/cert.pem` and `certs/key.pem`
* Pull and run the latest `ndt-server` image from Measurement Lab's dockerhub:

```~bash
$ docker run -d --network=host              \
           --volume `pwd`/certs:/certs:ro   \
           --volume `pwd`/datadir:/datadir  \
           --read-only                      \
           --user `id -u`:`id -g`           \
           --cap-drop=all                   \
           measurementlab/ndt-server:latest \
           -cert /certs/cert.pem            \
           -key /certs/key.pem              \
           -datadir /datadir                \
           -ndt7_addr 192.168.1.123:4443    \
           -ndt5_addr 192.168.1.123:3001    \
           -ndt5_wss_addr 192.168.1.123:3010

2820cd8907550a55fdb5663b6b5718184359d86ab371f277b8f2e8b49fa6562e
$
```

Here we're starting the container in daemon mode. You can also To see the container's running logs, either start it without `-d` or follow the container's running logs:

* Get the container's ID:

```~bash
$ docker ps
CONTAINER ID        IMAGE                COMMAND                  CREATED             STATUS              PORTS               NAMES
45fec501b4ec        measurementlab/ndt   "/start.sh -cert /ce…"   3 hours ago         Up 3 hours                              lucid_cartwright9
```

* Follow the logs: `docker logs --follow 45fec501b4ec`

The NDT server is now running on the local network. By default, it provides several web URLs:

* To get information about the server, visit: `http://192.168.1.123:3001/`
* To run tests using the available NDT protocols:
  * ndt5, TCP - The original NDT protocol: http://192.168.1.123:3001/static/widget.html
  * ndt5, TLS using secure websockets: https://192.168.1.123:3010/static/widget.html
  * ndt7, TLS using secure websockets, and using TCP BBR compression where it is enabled: https://192.168.1.123/static/ndt7.html

If you're following the container logs, visit the URLs above, run each test, and watch the logs on the server side.

If you want to have the container start automatically when dockerd starts (always run ndt-server across reboots), ensure your docker daemon is enabled `sudo systemctl enable docker`, then use the `--restart=always` flag with docker:

```~bash
$ docker run -d --restart=always       \
           --network=host              \
           --publish 443:4443          \
...
```

### Standalone ndt-server Test Data

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

You can also run `ndt-server` with the same "sidecar" services that M-Lab runs on our production servers: `tcp_info` and `traceroute`.

* Get the `ndt-server` source code, generate TLS certs, setup folders:

```~bash
git clone https://github.com/m-lab/ndt-server.git
cd ndt-server
```

* Create folders for your certs and data: `install -d certs datadir`
* Generate local self-signed certs for testing: `./gen_local_test_certs.bash`
  * This command saves these files: `certs/cert.pem` and `certs/key.pem`

When running `ndt-server` Full Stack, we use a different mount point in the container for saving data:

* ```--volume `pwd`/datadir:/var/spool/ndt``` replaces ```--volume `pwd`/datadir:/datadir```

Then run our "fullstack" container, `measurementlab/ndt`:

```~bash
docker run --network=host                \
           --volume `pwd`/certs:/certs:ro   \
           --volume `pwd`/datadir:/var/spool/ndt  \
           --volume `pwd`/var-local:/var/local \
           --user `id -u`:`id -g`           \
           --cap-drop=all                   \
        measurementlab/ndt                  \
           -cert /certs/cert.pem            \
           -key /certs/key.pem              \
           -datadir /datadir                \
           -ndt7_addr 192.168.1.123:4443    \
           -ndt5_addr 192.168.1.123:3001    \
           -ndt5_wss_addr 192.168.1.123:3010
```

docker run --network=host                           --volume `pwd`/certs:/certs:ro              --volume `pwd`/datadir:/var/spool/ndt             --volume `pwd`/var-local:/var/local            --user `id -u`:`id -g`                      --cap-drop=all                           critzo/ndt:testing                             -cert /certs/cert.pem                       -key /certs/key.pem                         -datadir /var/spool/ndt                           -ndt7_addr 192.168.1.123:4443               -ndt5_addr 192.168.1.123:3001               -ndt5_wss_addr 192.168.1.123:3010

### Full Stack ndt-server Data

When running `ndt-server` with tcpinfo and traceroute, additional directories are saved in your data folder.

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

## Running Tests from NDT Client Docker Containers

Ok, great, so now we have an `ndt-server` running. We can test with browser clients- yay! But what if we also want to:

* run tests not in browser, but on the command line?
* run NDT from a container?
* automatically run multiple tests to our new server?

### libndt

```~bash
############################
# Sample libndt Dockerfile #
############################
FROM arm32v7/alpine:3.10
MAINTAINER Measurement Lab Support <support@measurementlab.net>

RUN apk add --update build-base gcc cmake libressl-dev curl-dev git linux-headers

# Download and build libndt.
RUN git clone https://github.com/measurement-kit/libndt.git
WORKDIR /libndt

RUN cmake .
RUN cmake --build . -j $(nproc)

RUN ["/bin/sh"]
```

```~bash
docker run -it libndt:latest
/libndt #

## Original NDT protocol (ndt5)
/libndt # ./libndt-client --upload --json --batch 192.168.1.123

## ndt5 over TLS
/libndt # ./libndt-client --upload --json --websocket --tls --insecure --batch 192.168.1.123

## ndt7 over TLS
/libndt # ./libndt-client --upload --json --websocket --ndt7 --port 4443 --tls --insecure --batch 192.168.1.123
```
