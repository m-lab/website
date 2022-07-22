---
layout: blog
title: "Extracting Single-Path Traceroutes"
author: "Saied Kazemi"
date: 2022-07-22
breadcrumb: blog
categories:
  - traceroute
  - research
  - data
---

In response to community feedback, we've developed a proof-of-concept tool that extracts single-paths from examines <code>scamper</code>‘s MDA traceroutes. <!--more-->



M-Lab’s `traceroute-caller` (TRC) uses `scamper` to collect traceroute data to any remote IP address after it closes its TCP connection to an M-Lab server. `scamper`, in turn, uses `tracelb` to infer all per-flow load-balanced paths between a source and destination using the Multipath Discovery Algorithm (MDA).  Traceroute data that M-Lab collects is publicly available as `scamper1` datatype.  For additional details on `scamper1` and M-Lab’s traceroute data, see the [Traceroute page](https://www.measurementlab.net/tests/traceroute/).  To learn about MDA traceroutes, you can read the original paper: [Failure Control in Multipath Route Tracing](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.169.7024&rep=rep1&type=pdf).

While the community [provided feedback](https://www.measurementlab.net/blog/traceroute-access-and-rfc-results/#traceroute-format-change-rfc-results) to our RFC and asked us to continue running MDA traceroutes, the community also wanted us to provide a simple tool to extract single-path traceroutes from MDA traceroutes.  Therefore, we have developed a “proof of concept” tool, called [`trex`](https://github.com/m-lab/traceroute-caller/#traceroute-examiner-tool-trex) (short for traceroute examiner), that examines <code>scamper</code>‘s MDA traceroutes and extracts single-paths from it.

In the remainder of this blog post, we describe how the single-path extraction algorithm works. However, since “flow” plays a central role in MDA traceroutes, we briefly describe it here.  The following paragraph is from the MDA paper cited earlier:


>Two types of load balancers cause problems with traceroute.  Per-flow load balancers are widespread: they ascribe each packet to a flow defined by a flow identifier, which is the header five-tuple (i.e., IP source and destination addresses, source and destination ports, and protocol), and each flow to an outgoing interface. Per-packet load balancers are much rarer: they assign packets to interfaces regardless of flow.  A new traceroute implementation called Paris traceroute maintains a constant flow identifier in all the probes it sends and hence solves the problem of inferring false links under perflow load balancing._

The flow identifier, `flowid`, in `scamper`’s output is an integer that identifies a single-path flow.

The order of the hops (nodes) with the same `flowid` is determined by the probe’s TTL value.  We generally expect to see sequential `flowid` values (1, 2, 3, …) but, depending on the paths leading up to a node, an individual node might not be observed with sequential `flowid` values.  So it’s possible to see jumps in `flowid` values.

The number of initial flows depends on the confidence level.  For example, the default confidence level of 95% (used in M-Lab’s traceroute runs) requires six flows.  This means that if we see the same router interface at a given TTL for all six flows, then we know with 95% confidence that there is no more than one interface at this TTL.  But if we see more than one router at a given TTL, we need to send more flows to build up confidence that there are no more interfaces.  For instance, if we see three different interfaces at a given TTL with the first six flows, then the MDA algorithm stipulates that we need ten additional flows to ensure that there are no more interfaces.  But in practice we don’t need to send these additional flows for every TTL; we can send them only for the TTLs where multiple interfaces were detected.  This means that flows greater than six are almost always “partial traceroutes”.  However, we can have a complete traceroute in the unlikely case that more than one router interface was seen at every TTL from the first to the last.

The output of `scamper` in JSON format for MDA traceroute using the `tracelb` command consists of the following three lines:



* Line 1: `cycle-start`
* Line 2: `tracelb`
* Line 3: `cycle-stop`

For extracting single-path traceroutes, we only need the `tracelb` line which has the following structure, _significantly simplified and reformatted_ here to show only the fields we are interested in:


```
…
{
 "nodes": [
  { 
   "addr": "209.170.110.193",
   "links": [[{
     "addr": "213.248.100.57", 
     "probes": [
       {"ttl": 2, "flowid": 1, "replies": []},
       {"ttl": 2, "flowid": 2, "replies": []},
      ]
   }]]
  },
  {
   "addr": "213.248.100.57",
   "links": [[{
     "addr": "199.19.248.6", 
     "probes": [{"ttl": 3, "flowid": 1, "replies": []}]
   }]]
  } 
 ]  
}
…

```



* `nodes` is an array containing all of the nodes on different traceroute paths.
* `addr` is the IP address of a node.
* `links` is a two-dimensional array because when there is a per-packet load balancer or an unresponsive hop, `scamper` creates a link structure that crosses that load balancer or hop until the path converges at a later hop (the nodes observed are in that array).
* `probes` is an array of the probes sent to a hop.
* `replies` is an array that contains replies to the probes (there can be zero, one, or multiple replies to the same probe).
* `ttl` is an integer that specifies each probe’s time to live.  Notice that scamper JSON output does not include a `ttl` field for the very first node (209.170.110.193 in the example above).
* `flowid` is an integer that identifies a single-path flow.

The gist of the algorithm for extracting and printing single-paths consists of two parts and is shown in pseudo-Go code below.  The first part creates a map of `flowid`s to instances of hops.


```
type Hop struct {
  addr     string
  flowid   int6
  ttl      int
  complete bool // true if this hop completes the traceroute
}

func extractSinglePaths(scamper1 *parser.Scamper1) map[int64][]Hop {
  routes := make(map[int64][]Hop)
  for i, node := range scamper1.Tracelb.Nodes {
    for j, links := range node.Links {
      for k, link := range links {
        for l, probe := range link.Probes {
          flowid := probe.Flowid        
          // If this is the first hop in the flow, add Nodes[0].Addr at TTL 1.
          if len(routes[flowid]) == 0 { 
            hop := Hop{addr: scamper1.Tracelb.Nodes[0].Addr, flowid: flowid, ttl: 1}
            routes[flowid] = append(routes[flowid], hop)
          }                             
          // Now add this hop to the flow.              
          hop := Hop{addr: link.Addr, flowid: flowid, ttl: int(probe.TTL)}
         if hop.addr == scamper1.Tracelb.Dst {
           hop.complete = true
         }
          routes[flowid] = append(routes[flowid], hop) 
        }                       
      }                 
    }           
  }     
}
```


The second part iterates through all `flowid`s and prints the single-paths.  Please note that not all traceroutes are complete (i.e., do not trace all the way to the destination IP address).  Also, hops that were unresponsive will be marked as an asterisk ("*").


```
func printSinglePaths(routes map[int64][]Hop) {
  for flowid := range sortedFlowids {
    printHops(routes[flowid])
  }             
}

func printHops(hops []Hop) {
  prevTTL := 1
  for _, hop := range hops {
    // Print "*" for the missing TTLs because the 
    // corresponding hops were unresponsive.
    for ttl := prevTTL; ttl < hop.ttl; ttl++ {
      fmt.Printf("*\n")  
    }           
    prevTTL = hop.ttl + 1 
    fmt.Printf("%s\n", hop.addr)      
  }
}     
```


If you are interested in experimenting with `trex`, you can download an archive of `scamper1` files using the instructions outlined in the [Traceroute Data in GCS](https://www.measurementlab.net/tests/traceroute/#traceroute-data-in-gcs) section of M-Lab’s website.  Then you can build `trex` by following [these instructions](https://github.com/m-lab/traceroute-caller/#traceroute-examiner-tool-trex) on GitHub’s `traceroute-caller` repo.

We would like to thank [Maxime Mouchet](https://www.maxmouchet.com/) for explaining how flows work in MDA traceroutes.  We would love to hear from you and appreciate your feedback.
