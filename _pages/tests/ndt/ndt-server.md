---
layout: page
permalink: /tests/ndt/ndt-server/
title: "ndt-server"
breadcrumb: tests
---

# ndt-server

## How to run your own ndt-server

In this guide we will go over how to run `ndt-server` on your own server to measure your own networks. Note that only measurements made to M-Lab servers are publicly archived, meaning no data collected using private instances of ndt-server will be published to M-Lab's public database.  

On M-Lab servers, multiple Docker containers that serve each experiment and core
service are  managed by Kubernetes, but on  self-provisioned `ndt-server`
you can just install the base OS, install a TLS/SSL certificate, and then run
`ndt-server` using the full stack Docker image provided on our Dockerhub. If you
give this demo a try yourself and need help, reach out to us at
[support@measurementlab.net](mailto:support@measurementlab.ndt).

## Setup and run an ndt-server on Ubuntu Server 20.04.3 LTS

For this guide, we installed Ubuntu Server 20.04.3 LTS on an Intel NuC model
10i7FNH1 with 8GB RAM and a 1TB SSD drive. It's important to use the server
edition, since it uses the kernel: **Ubuntu 5.4.0-89.100-generic_5.4.143**

You also need to [install Docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04).

Enable `tcp_bbr` using the command: `sudo modprobe tcp_bbr`. This ensures that
ndt7 download tests will use BBR congestion control.

Your server should be reachable on your network at a static IP address. You can do this by assigning your server a static IP address reservation using your DHCP server. 

## Running ndt-server Full Stack Image

For this guide, we'll be using the "full stack" `ndt-server` Docker image that our team
publishes to
[Dockerhub](https://github.com/m-lab/ndt-server/tree/master/fullstack). You can
also build your own Docker images yourself or install without Docker.

"Full stack" `ndt-server` includes the "sidecar" services that M-Lab uses on
M-Lab servers: `tcp_info`, `traceroute`, `uuid`, and `packet-headers`.

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
Measurement Lab's Dockerhub. Substitute the IP address of your server
in the command below, and change the ports if desired. Please note that some
components of the ndt fullstack image must be run as root.

```~bash
sudo docker run -d --network=bridge                \
           -p 8080:8080 -p 4443:4443               \
           -p 3001:3001 -p 3002:3002 -p 3010:3010  \
           --volume `pwd`/certs:/certs:ro          \
           --volume `pwd`/datadir:/var/spool/ndt   \
           --volume `pwd`/var-local:/var/local     \
        measurementlab/ndt:latest                  \
           -cert /certs/cert.pem                   \
           -key /certs/key.pem                     \
           -datadir /datadir                       \
           -ndt7_addr :4443                        \
           -ndt7_addr_cleartext :8080              \
           -ndt5_addr :3001                        \
           -ndt5_wss_addr :3010
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
using the available NDT protocols. We'll do that next using the ndt7 command line
client libraries:

* [ndt7-client-go](https://github.com/m-lab/ndt7-client-go)

Here are the commands you can use to test the ndt7 protocols:

* ndt7, using a TLS encrypted secure websocket: `ndt7-client --no-verify -scheme
  wss --server 10.10.20.15:4443`
* ndt7, using an unencrypted websocket: `ndt7-client -scheme ws --server 10.10.20.15:8080`
* ndt7, plaintext: `ndt7-client -server 10.10.20.15:8080`
 
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

NDT tests will look like this: 

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

Each is an archive compressed by the `zstd` utility. To uncompress the archive
and dump the json content into a usable format, the M-Lab engineering team
has [provided](https://github.com/m-lab/tcp-info/tree/master/cmd/csvtool#readme)
a tool called `csvtool`:

```
go get github.com/m-lab/tcp-info/cmd/csvtool 
docker run -v $PWD:/data --rm --entrypoint /bin/zstd -it measurementlab/tcp-info:v1.5.3 -cd /
data/ndt_1635357954_0000000000000032.00000.jsonl.zst | ~/bin/csvtool
```

## Optional: Generating and Using an SSL Certificate from Let's Encrypt

Here is a sample command demonstrating a domain hosted with Linode using the [acme/lego
client](https://github.com/go-acme/lego) to request certificates from Let's Encrypt. Replace the token information with the relevant information for your host. 

```
docker run -it -e "LINODE_TOKEN=<LINODE API TOKEN>" -v "/<path>/<to
my>/<certificates>/certs:/tmp/certs" goacme/lego -a --email <my linode email> --path
"/tmp/certs" --dns linode --domains ndt.<my domain name>.<tld> run
```

The command runs the ACME client, requests the certificate, and assuming the API
token has the rights to read and write DNS entries, the Let's Encrypt
certificate authority returns a series of files used to secure the ndt-server web
service. Then, copy them onto your server. (We recommend updating every 90 days.) 

By generating a "real" certificate for use in the local network you ensure that your server can be moved to the Internet later, with only a change in the DNS. If you don't have a domain name or want to just test things out, you
can generate a self-signed certificate.

For the server to respond to your URL, you also must set its hostname to that
URL, and use the certificates in your `ndt-server` Docker container. On Ubuntu
Server 20.04.3, you can set the hostname to your Fully Qualified Domain Name
(FQDN) using:

`sudo hostnamectl set-hostname ndt.<my domain name>.<tld>`

Substitute your domain in the command above, and use the same exact
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
  `--restart=always` flag in the Docker command above
