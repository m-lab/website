---
layout: page
title: "Host-Managed Documentation"
permalink: /contribute/host-managed/
breadcrumb: contribute
---

# Setting up a host-managed server

## Register with M-Lab

The first step in becoming an M-Lab site host is to complete the [Infrastructure Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLSejtmZJrW8BPuuhjG4FlGm0fFmN3cW6onvLsCxkd3UnECVd9Q/viewform?usp=dialog), which includes agreeing to [M-Lab’s Acceptable Use Policy](https://www.measurementlab.net/aup/), [Privacy Policy](https://www.measurementlab.net/privacy/), and the Technical Requirements listed below.

M-Lab will review your submission and confirm that you qualify to become an M-Lab site host.  Under some circumstances we may suggest drafting a Memorandum of Understanding (MoU) if, for example, you contribute more than 10 servers or are exceptional in some other way.   Once you qualify, M-Lab will provide you with an API key and other information necessary to build and configure measurement servers.

If a host-managed deployment does not appear to be the best way for your organization to contribute to M-Lab, consider [other options](https://www.measurementlab.net/contribute/).

## Serving Requirements

In order to maintain the highest data quality we require all measurement servers
to:

- Have at least four 2 GHz CPUs with 4GB RAM (Intel class).  More is better, especially at a busy site.
- They can be either physical or virtual machines but should not have significant shared workloads on the underlying hardware.
- Must run some reasonably up-to-date version of Linux that supports the tcp_bbr kernel module and Docker.
  - At this time we are not aware of any restrictions on distro
  - M-Lab has tested with Ubuntu and Debian.
- One static IPv4 and one static IPv6 address.  The IPv6 address can be waived in  rare regions where IPv6 is not adequately deployed.
- A 10 GB/s uplink, unless the local infrastructure does not generally support it, in which case the uplink should be at least twice as fast as readily available consumer grade connections or 1 Gb/s, whichever is faster.  (e.g. if there are 1 Gb/s consumer grade connections, the server should have at least 2 Gb/s.)
- The server can be behind a firewall, but must have the following ports open:
  - 80 (unecrypted NDT tests)
  - 443 (encrypted NDT tests)
  - 9990-9999 (monitoring)

## Operational Requirements

In order to assure the ongoing data quality we require all host organizations
to:

- Keep their contact information at M-Lab up-to-date.
- Monitor email from <host-managed@measurementlab.net>, the host management list.
- Respond to email requests from the M-Lab team.
- Keep the operating system up-to-date by applying system updates as needed.
- Keep M-Lab software up-to-date by reinstalling it as requested.  (We are planning to further automate this process).
- Provide their own server health monitors and alerts.
- Monitor traffic volumes and server loads, and adjust the serving probability as necessary.

## Deploying the software

The first step is cloning this repository to the machine. It doesn't matter where on the machine the repository is located:

```shell
git clone https://github.com/m-lab/autonode
cd autonode
```

The software services run in Docker containers, which are deployed using Docker
Compose. This, of course, implies that the machine must have [Docker
installed](https://docs.docker.com/engine/install/). The root of the repository contains
[the Docker Compose configuration
file](https://github.com/m-lab/autonode/blob/main/docker-compose.yml), which is named *docker-compose.yml*.

The Docker Compose file should *not* be modified. Any required, user-configurable
settings should be set in [the environment variable
file](https://github.com/m-lab/autonode/blob/main/env), named simply *env*. The *env* file is
fairly well commented, but here is an outline of the variables and what sort of
values they should have:

- **ORGANIZATION**: the organization name assigned to you by M-Lab after you register.
- **API_KEY**: the API key that M-Lab provides you after you register.
- **IATA**: the 3-character [IATA
  code](https://www.iata.org/en/publications/directories/code-search/) of the
  nearest airport. If the nearest airport doesn't have an IATA code, then find
  the nearest one that does. M-Lab will work with you on the proper value for
  this variable.
- **PROBABILITY**: this is the probability that M-Lab's load balancing service
  ([Locate Service](https://github.com/m-lab/locate)) will send a test to your
  server. The M-Lab platform gets many millions of tests per day. Depending on
  where your server is located, its resources, and the speed of the machine's
  uplink, the test volume could possible overwhelm the machine and/or your
  network. You can modify this to suit your needs, either increasing or
  decreasing the traffic load as necessary.   This is the preffered mechanism for regulating server load.
- **INTERFACE_NAME**: the NDT server needs to know the name of the primary network
  interface on the machine (e.g., eth0, enp114s0, etc.)
- **UPLINK**: the speed of the machine's connection to the Internet.
- **INTERFACE_MAXRATE**: when the bitrate on the interface exceeds this value the NDT server will start refusing connections.  INTERFACE_MAXRATE is intended to limit the load during flash crowds to prevent the server from saturating its own uplink which would result in inaccurate measurements of other portions of the path.  In the absence of other nearby network bottlenecks the recommended value is 70% of the uplink capacity.   You may set it lower, for example to limit serving costs, but if you do so, please adjust the probability down to avoid sending unnecessary errors to users.
- **IPV4**: the public IPv4 address of the primary network interface.
- **IPV6**: the public IPv6 address of the primary network interface.
- **TYPE**: the type of the machine, either "physical" or "virtual".

Once you have filled in values for all of the environment variable is the env
file, these steps should be performed:

```shell
# Recommended: add "tcp_bbr" to /etc/modules so that it gets loaded on each reboot.
sudo modprobe tcp_bbr

# Verify the environment and credentials are working, then manually shutdown with ctrl-C.
docker compose --profile check-config --env-file env up

# Start the ndt service in the background. This will restart automatically on reboot.
docker compose --profile ndt --env-file env up -d
```

If there were no errors, then your machine should start receiving production
M-Lab tests within less than a minute.

## Test volume and probability

It is important to note that your M-Lab node will receive traffic from many networks, not just your own. The M-Lab [Locate Service](https://github.com/m-lab/locate), which all clients query to get a list of servers to test against, will generally direct clients to the geographically closest server. This is true for your own users, as well as users on other networks. If your server is the only M-Lab server for a large region, depending on various factors it may attract a significant amount of test traffic.

The *PROBABILITY* environment variable is designed to allow you to modify how often the Locate Service directs traffic to your server. This can help you reduce the load on your server and network. However, it is **important to note** that the probability will apply to your own network users as well.
M-Lab explicitly does not use network topology or measurements (e.g. RTT) to select servers.

Once you have modified the value of the *PROBABILITY* variable in the env file (or any other parameter), you will need to stop and restart all Docker containers:

```shell
docker compose --profile ndt --env-file env down
docker compose --profile ndt --env-file env up -d
```

## Host names

The server will automatically receive a public DNS name, which is generated by
the Autojoin API. The name will follow this pattern:

```shell
ndt-<IATA><ASN>-<IPv4 HEX>.<ORGANIZATION>.autojoin.measurement-lab.org
```

- IATA: the 3-letter IATA code specified in the Docker Compose file
- ASN: the AS number of the IPv4 address of the machine (automatically
  determined using [CAIDA Routeviews
  data](https://www.caida.org/catalog/datasets/routeviews-prefix2as/))
- IPV4 HEX: A hexadecimal representation of the IPv4 address of the machine
- ORGANIZATION: the name of your organization

For example:

```shell
ndt-oma396982-22486078.mlab.autojoin.measurement-lab.org
```

## Monitoring and Server Availability

M-Lab will collect metrics from the various services that are running on your machine, but will **not** alert or notify you when a problem is detected. You should set up monitoring and alerting of your own, possibly collecting some or all of the same metrics that M-Lab collects. The following [Prometheus](https://github.com/prometheus/prometheus) metrics endpoints are exposed:

- [ndt-server](https://github.com/m-lab/ndt-server): http://<hostname/ip>:9990/metrics
- [jostler](https://github.com/m-lab/jostler): http://<hostname/ip>:9991/metrics
- [uuid-annotator](https://github.com/m-lab/uuid-annotator): http://<hostname/ip>:9992/metrics
- [heartbeat](https://github.com/m-lab/locate/tree/main/cmd/heartbeat): http://<hostname/ip>:9993/metrics
- [traceroute-caller](https://github.com/m-lab/traceroute-caller): http://<hostname/ip>:9994/metrics
- [node_exporter](https://github.com/prometheus/node_exporter): http://<hostname/ip>:9995/metrics

Of those metrics, you are probably only interested in those from ndt-server and node_exporter. The main metric from ndt-server that you may be interested in is *ndt7_client_test_results_total*, which allows you to calculate test rates on your server using [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/). For example, the following PromQL query would tell you how many tests your machine is serving per minute:

```shell
60 * sum(rate(ndt7_client_test_results_total{result!="error-without-rate"}[5m]))
```

node_exporter metrics allow you to monitor resource usage on your machine (e.g., CPU, memory, disk, etc.). There a many very good tutorials on the Web about how to set up Prometheus to scrape metrics, and how to visualize those using [Grafana](https://grafana.com/).

## Calibration

M-Lab will monitor server resource consumption and evidence of accuracy problems with the data. We may ask you to make configuration changes or other improvements. If your results are deemed inaccurate we reserve the right to minimize your test volume to protect M-Lab’s overall data quality.

## Autojoin Implementation

![Register & Measure](https://github.com/user-attachments/assets/d122e56a-3bba-42b2-a44a-51a4055eb045)

Once the machine is up and running, these operations will be performed automatically:

1. Register with the [Autojoin API](https://github.com/m-lab/autojoin)
2. Distribute credentials & metadata to local services
3. Report node health to the [Locate API](https://github.com/m-lab/locate)
4. Clients run [NDT tests](https://github.com/m-lab/ndt-server) targeting this node
5. NDT measurements are archived
6. NDT measurements are published to BigQuery
