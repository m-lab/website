---
layout: page
permalink: /tests/traceroute/
title: "Traceroute"
breadcrumb: tests
---


# Traceroute

For every TCP connection to an M-Lab server, the Traceroute core service collects network path information from the M-Lab server back to the client IP that initiated the connection. This traceroute collection is done by M-Lab’s [`traceroute-caller`](https://github.com/m-lab/traceroute-caller/) which uses traceroute tools like [Paris Traceroute](https://paris-traceroute.net/) and [scamper](https://www.caida.org/catalog/software/scamper/) (from the [Center for Applied Internet Data Analysis](https://www.caida.org/)) to collect the actual traceroute data between the M-Lab server and the client.

Traceroute is both one of the most unique and the most complex datatypes on the M-Lab platform. The traceroute format has evolved over time, so in the context of M-Lab the name `traceroute` has meant several things:



* Starting in 2013, traceroutes were collected by running the `Paris Traceroute` tool. The output of `Paris Traceroute` was unstructured text, stored as a `.paris` file.
* In 2019, `traceroute-caller` was developed to use `scamper` because this tool was actively maintained and provided structured output formats like `.jsonl`. `traceroute-caller` caches results obtained in the past 10 minutes to avoid running back to back traceroutes to the same IP address. In addition to the traceroute data, the `.jsonl` file has some metadata that includes the TCP connection UUID and whether the results are from a recent test that is in the cache.
* In 2020, the real-time UUID annotator became an architectural requirement.
* In September 2021, we stopped using the datatype name `traceroute` in favor of `scamper1` (`traceroute` and `scamper1` datatypes are identical) and made traceroute data generated before September 2021 available as `scamper1`. Also, for hop annotations at runtime, we started generating a structured `.json` file for a new datatype called `hopannotation1`. We also synthetically generated `hopannotation1` for historical `scamper1` (i.e., for traceroute data that was not annotated in real-time). 

In short, for every TCP connection from a client to an M-Lab server, `traceroute-caller` invokes `scamper` to collect a [Multipath Detection Algorithm](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.169.7024&rep=rep1&type=pdf) (MDA) traceroute and uses the [uuid-annotator](https://github.com/m-lab/uuid-annotator) to annotate the hops in the traceroute data. Therefore, for every TCP connection, `traceroute-caller` generates the following two files that are archived in Google Cloud Storage (GCS) and parsed into Google BigQuery `scamper1` and `hopannotation1` tables:



* Traceroute data (`scamper1` datatype)
* Hop annotations (`hopannotation1` dataype)



## Source Code

* [`traceroute-caller` source code](https://github.com/m-lab/traceroute-caller/)
* [`scamper` source code](https://www.caida.org/catalog/software/scamper/#H2157)
* [`paris-traceroute` source code](https://github.com/libparistraceroute)



## Citing the M-Lab Traceroute Dataset


Please cite this dataset as follows: **The M-Lab Traceroute Dataset, &lt;date range used>. https://measurementlab.net/tests/traceroute**



## Traceroute Data in GCS

Data collected by `traceroute-caller` is available in raw format in Google Cloud Storage (GCS) for each one of the Host, NDT, and Neubot measurement services.

As mentioned earlier, up until early September 2021, traceroutes were archived in GCS as `traceroute` datatype. Since then, they are archived as `scamper1` datatype without any changes to the content. You can visit the links below to access traceroute archives:



* `scamper1` (March 2019 to Present) 
    * [NDT](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/scamper1)
    * [Host](https://console.cloud.google.com/storage/browser/archive-measurement-lab/host/scamper1)
    * [Neubot](https://console.cloud.google.com/storage/browser/archive-measurement-lab/neubot/scamper1)
* [paris-traceroute](https://console.cloud.google.com/storage/browser/archive-measurement-lab/paris-traceroute) (May 2013 to November 2019)

Each bucket contains thousands of compressed files in `tar` format organized by date and each `tar` file contains individual traceroutes between an M-Lab server and a client.

`Paris Traceroute` `tar` files are organized by the M-Lab server (e.g., `mlab1.lax04`) that ran the traceroute and individual files are normal text files with a `.paris` suffix. For example, below is a snippet of the `tar` file `20190610T000000Z-mlab1-lax04-paris-traceroute-0000.tgz`:


```
2019
|-- 06
|   |-- 09
|   |   `-- mlab1.lax04
|   |       |-- 20190609T23:59:36Z-72.222.137.81-34679-4.15.166.17-6805.paris
|   |       |-- 20190609T23:59:41Z-97.93.28.238-58197-4.15.166.17-6003.paris
|   |       |-- 20190609T23:59:46Z-70.95.95.173-54236-4.15.166.17-6003.paris
```


`scamper` `tar` files are organized in [JSONL](https://jsonlines.org/) format and each JSONL file contains four lines.  The first line is a metadata line created by `traceroute-caller` followed by `scamper` output as the next three lines:



* Line 1: M-Lab metadata
* Line 2: cycle start
* Line 3: MDA traceroute data
* Line 4: cycle stop

It is worth noting that the idea of a cycle is somewhat outdated. The original idea around 2003 was that `scamper` would do cycles across the same set of addresses over time. A list was a unique set of addresses, and a cycle was a pass over it. This might be an artifact of [`skitter`](https://catalog.caida.org/details/software/skitter), or [`arts++`](https://catalog.caida.org/details/software/arts). So the cycle id probably starts at zero, and increments by one each pass through a list.

The commands below show how an individual traceroute file can be viewed in a human-readable format using the `jq` tool.  When printed in human-readable format, the JSONL files can be anywhere in size from around 100 lines to more than 4,000 lines. In the example below, “...” denotes output lines that were removed for brevity:


```
$ gsutil cp gs://archive-measurement-lab/ndt/scamper1/2022/02/23/20220223T003000.022331Z-scamper1-mlab2-mnl01-ndt.tgz . 
$ tar xzf 20220223T003000.022331Z-scamper1-mlab2-mnl01-ndt.tgz 
$ cd 2022/02/23
$ jq . < 20220223T002735Z_ndt-4fwxc_1642668804_000000000036DEB2.jsonl | more
{
  "UUID": "ndt-4fwxc_1642668804_000000000036DEB2",
  "TracerouteCallerVersion": "d84ea3d",
  "CachedResult": false,
  "CachedUUID": ""
}
{
  "type": "cycle-start",
  "list_name": "default",
  "id": 0,
  "hostname": "ndt-4fwxc",
  "start_time": 1645576055
}
{
  "type": "tracelb",
  "version": "0.1",
  "userid": 0,
  "method": "icmp-echo",
  "src": "202.90.156.24",
  "dst": "46.146.32.198",
  "start": {
    "sec": 1645576055,
    "usec": 822330,
    "ftime": "2022-02-23 00:27:35"
  },
  "probe_size": 44,
  "firsthop": 1,
  "attempts": 3,
  "confidence": 95,
  "tos": 0,
  "gaplimit": 3,
  "wait_timeout": 5,
  "wait_probe": 150,
  "probec": 149,
  "probec_max": 3000,
  "nodec": 24,
  "linkc": 23,
  "nodes": [
    {
      "addr": "202.90.156.1",
      "q_ttl": 1,
      "linkc": 1,
      "links": [
        [
          {+
            "addr": "202.90.128.117",
            "probes": [
              {
                "tx": {
                  "sec": 1645576055,
                  "usec": 972656
                },
                "replyc": 1,
                "ttl": 2,
                "attempt": 0,
                "flowid": 1,
                "replies": [
                  {
                    "rx": {
                      "sec": 1645576055,
                      "usec": 972964
                    },
                    "ttl": 254,
                    "rtt": 0.308,
                    "ipid": 47888,
                    "icmp_type": 11,
                    "icmp_code": 0,
                    "icmp_q_tos": 0,
                    "icmp_q_ttl": 1
                  }
                ]
              },
. . .
            ]
          }
        ]
      ]
    },
    {
      "addr": "202.90.128.117",
      "q_ttl": 1,
      "linkc": 1,
      "links": [
        [
          {
            "addr": "202.90.129.229",
            "probes": [
              {
                "tx": {
                  "sec": 1645576056,
                  "usec": 876202
                },
                "replyc": 1,
                "ttl": 3,
                "attempt": 0,
                "flowid": 1,
                "replies": [
                  {
                    "rx": {
                      "sec": 1645576056,
                      "usec": 876922
                    },
                    "ttl": 254,
                    "rtt": 0.72,
                    "ipid": 30297,
                    "icmp_type": 11,
                    "icmp_code": 0,
                    "icmp_q_tos": 0,
                    "icmp_q_ttl": 1
                  }
                ]
              },
. . .
            ]
          }
        ]
      ]
    }
  ]
}
{
  "type": "cycle-stop",
  "list_name": "default",
  "id": 0,
  "hostname": "ndt-4fwxc",
  "stop_time": 1645576154
}
```


Note that `links` is a two-dimensional array.  This is because when there might be a per-packet load balancer, or an unresponsive hop, `scamper` creates a link structure that crosses that per-packet load balancer, or unresponsive hop, until the path converges at a hop.  The nodes observed are in that array.


## Traceroute Data in BigQuery

M-Lab parses all traceroute data from NDT measurement services into BigQuery tables and views, and makes query access available for free by subscription to a Google Group. Find out more about how to get access on our [BigQuery QuickStart page](https://www.measurementlab.net/data/docs/bq/quickstart/).

BigQuery Tables/Views/Schema(s) for traceroute data.

As the schema names suggest, `scamper1` is created by the [scamper](https://www.caida.org/catalog/software/scamper/) tool and `paris1_legacy` is created by the [Paris Traceroute](https://paris-traceroute.net/) tool.  The `scamper1` schema uses standard columns as described in the blog post [Long Term Supported Schemas Using Standardized BigQuery Columns]({{ site.baseurl }}/blog/long-term-schema-support-standard-columns/#long-term-supported-schemas-using-standardized-bigquery-columns).  The `paris1_legacy` schema does not use standard columns and, therefore, has the `_legacy` suffix. As mentioned above, M-Lab is not using the `Paris Traceroute` tool anymore.


* scamper1: [measurement-lab.ndt_raw.scamper1](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt_raw&t=scamper1&page=table)
* paris1_legacy: [measurement-lab.ndt_raw.paris1_legacy](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt_raw&t=paris1_legacy&page=table)

## Traceroute Schemas

* [scamper1 schema]({{ site.baseurl }}/tests/traceroute/scamper1)


