---
layout: blog
title: "Run a private ndt-server (updated)"
author: "Chris Ritzo"
date: 2022-02-16
breadcrumb: blog
categories:
  - ndt-server
  - tutorial
---

Back in 2019, I wrote about how to install the open source `ndt-server` that
M-Lab uses, on a server of your own. Our goal is that others can use M-Lab's
tools to measure their own networks. This post is an update, with a couple more
features.<!--more-->

Since we originally wrote about this, M-Lab has moved to stock Ubuntu server
releases for the core operating system on our servers ([Ubuntu 20.04 LTS
server](https://ubuntu.com/download/server)) with the stock 5.4.0-26-generic
#30-Ubuntu kernel, and TCP BBR v1.0 enabled. This makes it very easy to
replicate what our engineering team uses, without having to install and upgrade
to a non-stock kernel in order to enable TCP BBR.

On our servers, multiple Docker containers that serve each experiment and core
service are  managed by Kubernetes, but on our self-provisioned `ndt-server`
we'll just install the base OS, install a TLS/SSL certificate, and then run
`ndt-server` using the full stack Docker image provided on our Dockerhub. If you
give this demo a try yourself and need help, reach out to us at
[support@measurementlab.net](mailto:support@measurementlab.ndt).

## Setup and run an ndt-server on Ubuntu Server 20.04.3 LTS

For this guide, we installed Ubuntu Server 20.04.3 LTS on an Intel NuC model
10i7FNH1 with 8GB RAM and a 1TB SSD drive. It's important to use the server
edition, since it uses the kernel: **Ubuntu 5.4.0-89.100-generic_5.4.143**

You also need to install Docker. I used [this guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04).

Enable `tcp_bbr` using the command: `sudo modprobe tcp_bbr`. This ensures that
ndt7 download tests will use BBR congestion control.

Your server should be reachable on your network at a static IP address. There
are different ways to do this, but I prefer assigning my server a static IP
address reservation using my DHCP server.

## Running ndt-server Full Stack Image

For this guide, we'll be using the "full stack" `ndt-server` Docker image that our team
publishes to
[Dockerhub](https://github.com/m-lab/ndt-server/tree/master/fullstack). You can
also build your own Docker images yourself or install without Docker.

"Full stack" `ndt-server` includes the "sidecar" services that our team uses on
our servers: `tcp_info`, `traceroute`, `uuid`, and `packet-headers`.

Once the server is up, then also demo how to run NDT client tests from a Docker
container to your local server.

* Next, create folders for your certificates and test data: `install -d certs
  datadir`
* You can generate your own self-signed certificates, or use a small script
  included in the `ndt-server` repository,
  [gen_local_test_certs.bash](https://github.com/m-lab/ndt-server/blob/master/gen_local_test_certs.bash).
  * Save the generated certificates in the `certs/` folder.
  * If you use `./gen_local_test_certs.bash`, two files are automatically saved:
    `certs/cert.pem` and `certs/key.pem`  
* If your server is using a firewall, ensure that the ports (see Docker command
  below) used by your `ndt-server` are open.

Then run the "fullstack" ndt server container, `measurementlab/ndt`, image from
Measurement Lab's Dockerhub. Of course, substitute the IP address of your server
in the command below, and change the ports if desired.

```~bash
docker run -d --network=host                \
           --user `id -u`:`id -g`           \
           --volume `pwd`/certs:/certs:ro   \
           --volume `pwd`/datadir:/var/spool/ndt  \
           --volume `pwd`/var-local:/var/local \
           --cap-drop=all                   \
        measurementlab/ndt                  \
           -cert /certs/cert.pem            \
           -key /certs/key.pem              \
           -datadir /datadir                \
           -ndt7_addr 10.10.20.15:4443    \
           -ndt7_addr_cleartext 10.10.20.15:8080 \
           -ndt5_addr 10.10.20.15:3001    \
           -ndt5_wss_addr 10.10.20.15:3010

```
Here we're starting the container in daemon mode, which results in a container
ID getting printed to the terminal. For example:
`2820cd8907550a55fdb5663b6b5718184359d86ab371f277b8f2e8b49fa6562e`.

Next, copy the container ID, and view/follow the container's running logs using:
`docker logs --follow 2820cd8907550a55fdb5663b6b5718184359d86ab371f277b8f2e8b49fa6562e`

The NDT server is now running on the local network. If you have the server logs
in your terminal, you can scroll up to find the URLs to use for supported client
tests. For example:

```
2021/10/28 18:13:29 ndt-server.go:175: About to listen for unencrypted ndt5 NDT tests on 127.0.0.1:3002
2021/10/28 18:13:29 ndt-server.go:195: About to listen for ndt7 cleartext tests on 10.10.20.15:8080
2021/10/28 18:13:29 ndt-server.go:209: About to listen for ndt5 WsS tests on 10.10.20.15:3010
2021/10/28 18:13:29 ndt-server.go:218: About to listen for ndt7 tests on 10.10.20.15:4443
```

## Running NDT Protocol Tests from Clients to Your ndt-server

We can use the addresses from our container logs to run tests from other clients in your network
using the available NDT protocols. We'll do that next using two command line
client libraries:

* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go)
* [ndt5-client-go](https://github.com/m-lab/ndt5-client-go)

We are using these official command line client libraries, because we include
them in our [Murakami software](https://github.com/m-lab/murakami), which makes
it fairly easy to run M-Lab tests automatically from a dedicated computer like a
Raspberry Pi.

Here are the commands you can use to test the various NDT protocols:

* ndt7, using a TLS encrypted secure websocket: `ndt7-client --no-verify -scheme
  wss --server 10.10.20.15:4443`
* ndt7, using an unencrypted websocket: `ndt7-client -scheme ws --server 10.10.20.15:8080`
* ndt7, plaintext: `ndt7-client -server 10.10.20.15:8080`
* ndt5, plaintext: `ndt5-client -protocol ndt5 -server 10.10.20.15`
* ndt5, using a secure websocket: `ndt5-client -protocol ndt5+wss -server 10.10.20.15`
 
If you're following the container logs in one terminal, and then run each test
from another computer in your network, you can watch the logs on the server side
as the tests are conducted.

## Reviewing ndt-server Test Data

When running the full stack `ndt-server`, additional directories are saved in
your data folder, `datadir`:.

```~bash
$ ls datadir/
pcap  tcpinfo  traceroute
```

* NDT test results are saved in `tcpinfo`
* [Packet header captures](https://www.measurementlab.net/tests/pcap/) for each
  test are saved in `pcap`
* [Traceroutes](https://www.measurementlab.net/tests/traceroute/) from your
  server back to the IP address of each client initiating a test are saved in `traceroute`

Let's look at some NDT tests:

```~bash
$ ls datadir/tcpinfo/2021/10/28/
ndt_1635357954_0000000000000021.00000.jsonl.zst
ndt_1635357954_0000000000000021.00001.jsonl.zst
ndt_1635357954_0000000000000029.00000.jsonl.zst
ndt_1635357954_000000000000002A.00000.jsonl.zst
ndt_1635357954_000000000000002B.00000.jsonl.zst
ndt_1635357954_000000000000002C.00000.jsonl.zst
ndt_1635357954_000000000000002D.00000.jsonl.zst
ndt_1635357954_000000000000002E.00000.jsonl.zst
ndt_1635357954_000000000000002F.00000.jsonl.zst
ndt_1635357954_0000000000000030.00000.jsonl.zst
ndt_1635357954_0000000000000031.00000.jsonl.zst
ndt_1635357954_0000000000000032.00000.jsonl.zst
```

Each is an archive compressed by the `zstd` utility. You'll need to install it
using `sudo apt install zstd`, then use a command like this to extract a result:
`zstd -d ndt_1635357954_0000000000000021.00000.jsonl.zst`. The result is a
single JSONL test result: `ndt_1635357954_0000000000000021.00000.jsonl`

## Optional Bonus! Generating and Using an SSL Certificate from Let's Encrypt

When we host production services on the Internet, we usually deploy a TLS
certificate instead of a self-signed one, so that we can connect to the service
using `https://` without having browsers warn us about the self-signed cert.

You can also do this when you're running things on your local network if you own
a domain name and the ability to generate SSL certificates for it. [Let's
Encrypt](https://letsencrypt.org/) is a free certificate authority, so you can
generate a certificate at no cost.

[Let's Encrypt has some good documentation](https://letsencrypt.org/docs) about
their service, but basically they validate that you control domain names in a
certificate using different types of "challenges" that follow the ACME standard.
HTTP-01 is the most common challenge type, but requires port 80 or 443. To get a
certificate issued from a computer within your home network using the HTTP-01
challenge, you would have to expose these ports to the Internet. Doing this is a
security risk.

But if you have your domain name hosted with any number of supported [DNS
providers](https://community.letsencrypt.org/t/dns-providers-who-easily-integrate-with-lets-encrypt-dns-validation/86438)
you can use the [DNS-01
challenge](https://letsencrypt.org/docs/challenge-types/#dns-01-challenge) to
generate certificates and use them for devices in your home network.

My domain is hosted with Linode, and I'm using the [acme/lego
client](https://github.com/go-acme/lego) Docker container to request
certificates from Let's Encrypt. Here's the command I use:

```
docker run -it -e "LINODE_TOKEN=<LINODE API TOKEN>" -v "/<path>/<to
my>/<certificates>/certs:/tmp/certs" goacme/lego -a --email <my linode email> --path
"/tmp/certs" --dns linode --domains ndt.<my domain name>.<tld> run
```

This runs the ACME client, requests the certificate, and assuming my Linode API
token has the rights to read and write DNS entries, the Let's Encrypt
certificate authority returns a series of files used to secure my ndt-server web
service. I then have to copy them onto my server and also update them every 90
days. To make sure I don't forget to update, I have a script that runs as a
crontab once a month, runs commands like the one above, and then copies
certificates to the appropriate host in my network.

One advantage of generating a "real" certificate for use in the local network is
that our server could be moved to the Internet later, with only a change in the
DNS. But if you don't have a domain name or want to just test things out, you
can generate a self-signed certificate.

For the server to respond to your URL, you also must set its hostname to that
URL, and use the certificates in your `ndt-server` Docker container. On Ubuntu
Server 20.04.3, you can set the hostname to your Fully Qualified Domain Name
(FQDN) using:

`sudo hostnamectl set-hostname ndt.<my domain name>.<tld>`

Of course, substitute your domain in the command above, and use the same exact
domain from your certificate request. Let's Encrypt defaults return certificates
and related files like this:

```
ndt.<my domain name>.<tld>.crt
ndt.<my domain name>.<tld>.json
ndt.<my domain name>.<tld>.issuer.crt
ndt.<my domain name>.<tld>.key
```

Copy or move these files into the `certs/` folder on your server.

And finally, refer to the `.crt` and `.key` filenames and your server's FQDN in
the `ndt-server` Docker command:

```~bash
docker run -d --network=host                \
           --user `id -u`:`id -g`           \
           --volume `pwd`/certs:/certs:ro   \
           --volume `pwd`/datadir:/var/spool/ndt  \
           --volume `pwd`/var-local:/var/local \
           --cap-drop=all                   \
        measurementlab/ndt                  \
           -cert /certs/ndt.<my domain name>.<tld>.crt            \
           -key /certs/ndt.<my domain name>.<tld>.key              \
           -datadir /datadir                \
           -ndt7_addr ndt.<my domain name>.<tld>:4443    \
           -ndt7_addr_cleartext ndt.<my domain name>.<tld>:8080 \
           -ndt5_addr ndt.<my domain name>.<tld>:3001    \
           -ndt5_wss_addr ndt.<my domain name>.<tld>:3010

```

Test file names will now include your domain name as well. For example: `ndt.<my domain name>.<tld>_1635357954_000000000000005B.00000.jsonl.zst`.

Finally, you may want to have the container start automatically when Docker
starts so the server always starts when the server reboots or restarts.

* Enable Docker: `sudo systemctl enable docker`'
* Then use the `--restart=always` flag with your Docker command using the
  `--restart=always` flag:

```~bash
docker run -d --restart=always       \
...
```
<br>

## Wrap up

With an `ndt-server` instance, many of M-Lab's tools can be used to test your
networks. This is already happening out in our community as we've seen in [recent
discussions](https://groups.google.com/a/measurementlab.net/g/discuss/c/l3N7sW3p4-E/m/1H4ZbQcDAQAJ)
on our Google Group. This demo gets an `ndt-server` up and running and
collecting test data from clients using it on the network. But there's obviously
more to M-Lab's platform infrastructure. M-Lab test results get pushed to our [data
archive](https://console.developers.google.com/storage/browser/archive-measurement-lab/ndt/)
and [BigQuery
datasets](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab)
by way of our [ETL
pipeline](https://github.com/m-lab/etl). You probably want to do things with
your data as well. In the coming year, our engineers will be focusing on enabling our entire
platform replicable in private infrastructure, which will enable anyone to run
our tools in their own networks.
