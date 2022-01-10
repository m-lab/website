---
layout: blog
title: "Traceroute Format Change Request for Comments (RFC)"
author: "Saied Kazemi"
date: 2022-01-10
breadcrumb: blog
categories:
  - traceroute
---

M-Lab’s [traceroute-caller](https://github.com/m-lab/traceroute-caller/) (TRC)
tool was designed and developed in early 2019 as a sidecar service running on
M-Lab servers. Its purpose is to collect traceroute data to any remote IP
address after it closes its TCP connection to an M-Lab server. TRC uses the
[scamper](https://www.caida.org/catalog/software/scamper/) tool for running
traceroutes.<!--more-->

The initial version of TRC called `scamper` to run the `tracelb` command and
saved the resulting traceroute as traceroute datatype which was renamed to
`scamper1` datatype.

As described in `scamper`’s manual page, the `tracelb` command is used to infer
all per-flow load-balanced paths between a source and destination using the
Multipath Discovery Algorithm (MDA). Starting in 1Q22, TRC also supports
regular traceroutes which take much less time to run and return a simpler result
that is saved as `scamper2` datatype.

M-Lab would like to start collecting regular traceroutes (in addition to MDA
traceroutes) in 1Q22 and stop collecting MDA traceroutes by the end of 2Q22.

## Request for Comments

We are publishing this RFC to get feedback from the community regarding our
decision to stop running MDA traceroutes by the end of 2Q22 and, instead, run
regular traceroutes with the Paris traceroute algorithm.

If you use MDA traceroutes (scamper1 datatype) and this decision impacts you, please let us know via reply to the discuss@measurementlab.net mailing list.  Also, please let us know if you are planning research that would benefit from regular traceroutes (scamper2 datatype).

Based on your feedback, we will decide if we need to continue running MDA traceroutes and how to support it beyond what we already have.

## Discussion

As it is described below,
[scamper2](https://github.com/m-lab/traceroute-caller/blob/master/parser/scamper2.go#L36)
datatype is much simpler than `scamper1` datatype and is easier to query and
analyze.  It is also much faster to run. Therefore, we believe it will be the
preferred traceroute data for use by the community unless we hear otherwise.

### scamper1 datatype (ending 2Q22)

TRC invokes scamper to run an MDA traceroute as follows:

`scamper -I "tracelb -P icmp-echo -q 3 -W 25 -O ptr <ip-address>" <additional args>`

An MDA traceroute (`tracelb`) finds load balanced paths between two addresses by
varying the first 4 bytes of the transport header, but keeping the first 4 bytes
constant when probing consecutive hops.  The `-P` parameter to `tracelb` says
what type of probes to send, and while the names have overlap with the `-P`
parameter to `trace` (see below), they mean different things.

MDA traceroutes are archived as
[scamper1](https://github.com/m-lab/traceroute-caller/blob/master/parser/scamper1.go#L67)
datatype defined in the Go programming language as shown below in
[parser/scamper1.go](https://github.com/m-lab/traceroute-caller/blob/master/parser/scamper1.go#L67):

```
// Scamper1 encapsulates the four lines of a traceroute:
//   {"UUID":...}
//   {"type":"cycle-start"...}
//   {"type":"tracelb"...}
//   {"type":"cycle-stop"...}
type Scamper1 struct {
        Metadata   tracer.Metadata
        CycleStart CyclestartLine
        Tracelb    TracelbLine
        CycleStop  CyclestopLine
}

// TracelbLine contains the actual scamper MDA traceroute details.
type TracelbLine struct {
        Type        string        `json:"type" bigquery:"type"`
        Version     string        `json:"version" bigquery:"version"`
        Userid      float64       `json:"userid" bigquery:"userid"`
        Method      string        `json:"method" bigquery:"method"`
        Src         string        `json:"src" bigquery:"src"`
        Dst         string        `json:"dst" bigquery:"dst"`
        Start       TS            `json:"start" bigquery:"start"`
        ProbeSize   float64       `json:"probe_size" bigquery:"probe_size"`
        Firsthop    float64       `json:"firsthop" bigquery:"firsthop"`
        Attempts    float64       `json:"attempts" bigquery:"attempts"`
        Confidence  float64       `json:"confidence" bigquery:"confidence"`
        Tos         float64       `json:"tos" bigquery:"tos"`
        Gaplint     float64       `json:"gaplint" bigquery:"gaplint"`
        WaitTimeout float64       `json:"wait_timeout" bigquery:"wait_timeout"`
        WaitProbe   float64       `json:"wait_probe" bigquery:"wait_probe"`
        Probec      float64       `json:"probec" bigquery:"probec"`
        ProbecMax   float64       `json:"probec_max" bigquery:"probec_max"`
        Nodec       float64       `json:"nodec" bigquery:"nodec"`
        Linkc       float64       `json:"linkc" bigquery:"linkc"`
        Nodes       []ScamperNode `json:"nodes" bigquery:"nodes"`
}

// ScamperNode describes a layer of links.
type ScamperNode struct {     
       Addr  string          `json:"addr" bigquery:"addr"`
        Name  string          `json:"name" bigquery:"name"`
        QTTL  int             `json:"q_ttl" bigquery:"q_ttl"`
        Linkc int64           `json:"linkc" bigquery:"linkc"`
        Links [][]ScamperLink `json:"links" bigquery:"links"`
}

// ScamperLink describes a single step in the trace.
type ScamperLink struct {
        Addr   string  `json:"addr" bigquery:"addr"`
        Probes []Probe `json:"probes" bigquery:"probes"`
}

// Probe describes a single probe message, and all the associated replies.
type Probe struct {
        Tx      TS      `json:"tx" bigquery:"tx"`
        Replyc  int     `json:"replyc" bigquery:"replyc"`
        TTL     int64   `json:"ttl" bigquery:"ttl"`
        Attempt int     `json:"attempt" bigquery:"attempt"`
        Flowid  int64   `json:"flowid" bigquery:"flowid"`
        Replies []Reply `json:"replies" bigquery:"replies"` // usually a single reply
}

// Reply describes a single reply message.
type Reply struct {
        Rx       TS      `json:"rx" bigquery:"rx"`
        TTL      int     `json:"ttl" bigquery:"ttl"`
        RTT      float64 `json:"rtt" bigquery:"rtt"`
        IcmpType int     `json:"icmp_type" bigquery:"icmp_type"`
        IcmpCode int     `json:"icmp_code" bigquery:"icmp_code"`
        IcmpQTos int     `json:"icmp_q_tos" bigquery:"icmp_q_tos"`
        IcmpQTTL int     `json:"icmp_q_ttl" bigquery:"icmp_q_ttl"`
}
```

### scamper2 datatype (starting 1Q22)

TRC invokes `scamper` to run a regular traceroute as follows:

`scamper -I "trace -P icmp-paris <ip-address>" <additional args>`

Paris traceroute (`trace -P icmp-paris`) finds a single path between two addresses by keeping the first 4 bytes of the transport header constant.

Regular traceroutes are archived as [scamper2](https://github.com/m-lab/traceroute-caller/blob/master/parser/scamper2.go#L36) datatype defined in the Go programming language as shown below in [parser/scamper2.go](https://github.com/m-lab/traceroute-caller/blob/master/parser/scamper2.go#L36):

```
// Scamper2 encapsulates the four lines of a traceroute:
//   {"UUID":...}
//   {"type":"cycle-start"...}
//   {"type":"trace"...}
//   {"type":"cycle-stop"...}
type Scamper2 struct {
        Metadata   tracer.Metadata
        CycleStart CyclestartLine
        Trace      TraceLine
        CycleStop  CyclestopLine
}

// TraceLine contains the actual scamper regular traceroute details.
type TraceLine struct {
        Type       string       `json:"type" bigquery:"type"`
        Version    string       `json:"version" bigquery:"version"`
        UserID     int32        `json:"userid" bigquery:"userid"`
        Method     string       `json:"method" bigquery:"method"`
        Src        string       `json:"src" bigquery:"src"`
        Dst        string       `json:"dst" bigquery:"dst"`
        ICMPSum    int32        `json:"icmp_sum" bigquery:"icmp_sum"`
        StopReason string       `json:"stop_reason" bigquery:"stop_reason"`
        StopData   int32        `json:"stop_data" bigquery:"stop_data"`
        Start      TS           `json:"start" bigquery:"start"`
        HopCount   int32        `json:"hop_count" bigquery:"hop_count"`
        Attempts   int32        `json:"attempts" bigquery:"attempts"`
        HopLimit   int32        `json:"hoplimit" bigquery:"hoplimit"`
        FirstHop   int32        `json:"firsthop" bigquery:"firsthop"`
        Wait       int32        `json:"wait" bigquery:"wait"`
        WaitProbe  int32        `json:"wait_probe" bigquery:"wait_probe"`
        Tos        int32        `json:"tos" bigquery:"tos"`
        ProbeSize  int32        `json:"probe_size" bigquery:"probe_size"`
        ProbeCount int32        `json:"probe_count" bigquery:"probe_count"`
        Hops       []ScamperHop `json:"hops" bigquery:"hops"`
}

// ScamperHop describes a layer of hops.
type ScamperHop struct {
        Addr      string  `json:"addr" bigquery:"addr"`
        ProbeTTL  int32   `json:"probe_ttl" bigquery:"probe_ttl"`
        ProbeID   int32   `json:"probe_id" bigquery:"probe_id"`
        ProbeSize int32   `json:"probe_size" bigquery:"probe_size"`
        Tx        TS      `json:"tx" bigquery:"tx"`
        RTT       float64 `json:"rtt" bigquery:"rtt"`
        ReplyTTL  int32   `json:"reply_ttl" bigquery:"reply_ttl"`
        ReplyTOS  int32   `json:"reply_tos" bigquery:"reply_tos"`
        ReplyIPID int32   `json:"reply_ipid" bigquery:"reply_ipid"`
        ReplySize int32   `json:"reply_size" bigquery:"reply_size"`
        ICMPType  int32   `json:"icmp_type" bigquery:"icmp_type"`
        ICMPCode  int32   `json:"icmp_code" bigquery:"icmp_code"`
        ICMPQTTL  int32   `json:"icmp_q_ttl" bigquery:"icmp_q_ttl"`
        ICMPQIPL  int32   `json:"icmp_q_ipl" bigquery:"icmp_q_ipl"`
        ICMPQTOS  int32   `json:"icmp_q_tos" bigquery:"icmp_q_tos"`
}
```

### GCS Archives

The following buckets contain publicly accessible traceroute archives: 

* [traceroute](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/traceroute;tab=objects?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=measurement-lab&prefix=&forceOnObjectsSortingFiltering=false)
* [scamper1](https://console.cloud.google.com/storage/browser/archive-measurement-lab/ndt/scamper1?pageState=(%22StorageObjectListTable%22:(%22f%22:%22%255B%255D%22))&project=measurement-lab&prefix=&forceOnObjectsSortingFiltering=false)

### BigQuery Schemas

The following links define publicly accessible traceroute schemas in BigQuery:

* [traceroute](https://console.cloud.google.com/bigquery?project=measurement-lab&page=table&d=ndt_raw&p=mlab-oti&t=traceroute_legacy)
* [scamper1](https://console.cloud.google.com/bigquery?project=measurement-lab&page=table&d=ndt_raw&p=mlab-oti&t=scamper1)
