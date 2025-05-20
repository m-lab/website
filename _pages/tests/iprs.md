---
layout: page
permalink: /tests/iprs/
title: "IP Route Survey (IPRS)"
breadcrumb: tests
---

# IP Route Survey (IPRS)

[ IPRS](https://iprs.dioptra.io/) is an initiative to continuously monitor IP-level routing across the internet. This is done through the regular collection of traceroute-style measurements from multiple vantage points towards a significant portion of the internet's routable address blocks. The survey is conducted by the [Dioptra research group](https://dioptra.io) at [Sorbonne University](https://www.sorbonne-universite.fr/en/)'s [LIP6 computer science laboratory](https://www.lip6.fr/?LANG=en).

As of December 2023, IPRS conducts four daily IPv4 snapshots featuring multipath route traces from ten vantage points towards all routable IPv4 /24 prefixes. So as to economize on M-Lab data storage, a subset of these measurements is being selected to be offered through M-Lab.

Please cite this data set as follows: **M-Lab's Sorbonne IPRS Data Set, \<date range used\>. [https://measurementlab.net/tests/iprs](https://measurementlab.net/tests/iprs)** 

Any IPRS IPv4 snapshots that are not yet available through M-Lab can be obtained upon request from the Dioptra group.

In addition, IPRS conducts one daily IPv6 snapshot with single-path route traces towards a substantial number of routable prefixes. These, too, can be obtained upon request from the Dioptra group.

## Data

We provide two series of data sets for the IPRS data. 

The first, iprs_index1, consists of metadata. As mentioned, IPRS data consists of a series of snapshots of IP-level routing in the internet. Each snapshot is associated with a unique identifier, or UUID. The metadata data set includes, for each snapshot:

* its UUID  
* its date and time  
* whether it is present on M-Lab (if not, it can be obtained upon request from the Dioptra group)  
* whether it contains IPv4 data, IPv6 data, or both  
* additional metadata concerning the software versions that were used to obtain the snapshot, and their configuration

The second, iprs_data1, consists of the route trace data itself. The iprs1 schema is purposely compatible with the [scamper1 schema](https://www.measurementlab.net/tests/traceroute/scamper1/) that is used for M-Lab's extensive existing Traceroute data set, so as to ease users' ability to conduct queries across both data sets.

The differences between iprs1 and scamper1 are:

* An iprs1 route trace is not towards a single destination address, but towards a destination prefix (currently /24 prefix)  
* iprs1's **id** field allows IPRS data to be selected by snapshot, as indicated in the iprs_index1 table.  
* For the following data types that call for an integer value, iprs1 uses the INTEGER data type whereas scamper1 uses FLOAT:  
  * raw.CycleStart.**ID**  
  * raw.CycleStart.**start_time**  
  * raw.Tracelb.**userid**  
  * raw.Tracelb.**probe_size**  
  * raw.Tracelb.**firsthop**  
  * raw.Tracelb.**attempts**  
  * raw.Tracelb.**confidence**  
  * raw.Tracelb.**tos**  
  * raw.Tracelb.**gaplimit**  
  * raw.Tracelb.**wait_timeout**  
  * raw.Tracelb.**wait_probe**  
  * raw.Tracelb.**probec**  
  * raw.Tracelb.**probec_max**  
  * raw.Tracelb.**nodec**  
  * raw.Tracelb.**linkc**  
  * raw.CycleStop.**ID**  
  * raw.CycleStop.**stop_time**  
* The following fields do not apply to IPRS data and are therefore left as NULL:  
  * parser.**Version**  
  * parser.**Time**  
  * parser.**ArchiveURL**  
  * parser.**Filename**  
  * parser.**Priority**  
  * parser.**GitCommit**  
  * raw.Metadata.**TracerouteCallerVersion**  
  * raw.Metadata.**CachedResult**  
  * raw.Metadata.**CachedUUID**  
  * raw.CycleStart.**ID**  
  * raw.Tracelb.**version**  
  * raw.Tracelb.**userid**  
  * raw.Tracelb.start.**Usec**  
  * raw.Tracelb.**probe_size**  
  * raw.Tracelb.**tos**  
  * raw.Tracelb.**gaplimit**  
  * raw.Tracelb.**wait_timeout**  
  * raw.Tracelb.**wait_probe**  
  * raw.Tracelb.**probec**  
  * raw.Tracelb.**probec_max**  
  * raw.Tracelb.**nodes.name**  
  * raw.Tracelb.**nodes.q_ttl**  
  * raw.Tracelb.nodes.links.Links.Probes.Tx.**Sec**  
  * raw.Tracelb.nodes.links.Links.Probes.Tx.**Usec**  
  * raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Sec**  
  * raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Usec**  
  * raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_tos**  
  * raw.CycleStop.**ID**  
      
* Links do not include unresponsive hosts  
* In the case of amplification (one probe receiving more than one reply), only one reply is retained, while raw.Tracelb.nodes.links.Links.Probes.**Replyc** indicates the total number of replies the probe received from this address.

If you wish to obtain IPRS data in other formats, or in greater detail, or additional data not published here, such as data obtained from IPv6 measurements, please contact the Dioptra team at Sorbonne University.

If you are interested in accessing IPRS data in BigQuery, please [contact the M-Lab team](mailto:support@measurementlab.net)!

**Get more information** at [https://iprs.dioptra.io/](https://iprs.dioptra.io/)

## iprs_index1 Schema

| Field name | Type | Description |
| :---- | :---: | :---- |
| **id** | STRING | UUID of the snapshot. |
| **start_time** | TIMESTAMP | When snapshot started U UTC YYYY-MM-DD HH:MM:SS |
| **duration** | INTEGER | Duration of the snapshots in seconds. |
| **snapshot_status** | STRING | The status of the snapshot. Possible values: **finished** (completed successfully), **canceled** (manually stopped), **agent_failure** (failed due to agents issues). |
| **snapshot_labels** | STRING | Labels of the snapshot. |
| **num_agents** | INTEGER | The number of agents that participated in carrying out the snapshot. |
| **num_succesful_agents** | INTEGER | The number of agents that successfully completed the snapshot. |
| **sw_versions** | RECORD |  |
| sw_versions.**iris** | STRING | iris version |
| sw_versions.**diamond_miner** | STRING | diamond-miner version |
| sw_versions.**zeph** | STRING | zeph version |
| sw_versions.**caracal** | STRING | caracal version |
| sw_versions.**parser** | STRING | parser version |
| **IPV4** | BOOLEAN | Indicates whether the snapshot included route traces toward IPv4 addresses. |
| **IPV6** | BOOLEAN | Indicates whether the snapshot included route traces toward IPv6 addresses. |
| **is_published** | BOOLEAN | Indicates whether the snapshot has been published to the iprs_data1 table. |

## iprs_data1 Schema

| Field name | Type | Description |
| :---- | :---: | :---- |
| **id** | STRING | UUID of the snapshot. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | N/A |
| parser.**Time** | TIMESTAMP | N/A |
| parser.**ArchiveURL** | STRING | N/A |
| parser.**Filename** | STRING | N/A |
| parser.**Priority** | INTEGER | N/A |
| parser.**GitCommit** | STRING | N/A |
| **date** | DATE | Date of the snapshot. Date is used by BigQuery to partition data to improve query performance. UTC YYYY-MM-DD as in the index, but without HH-MM-SS |
| **raw** | RECORD | All the data and metadata for a single route trace. |
| raw.**Metadata** | RECORD |   |
| raw.Metadata.**UUID** | STRING | Agent UUID |
| raw.Metadata.**TracerouteCallerVersion** | STRING | N/A |
| raw.Metadata.**CachedResult** | BOOLEAN | N/A |
| raw.Metadata.**CachedUUID** | STRING | N/A |
| raw.**CycleStart** | RECORD |   |
| raw.CycleStart.**Type** | STRING | The string "cycle-start". |
| raw.CycleStart.**list_name** | STRING | The name of the IP list file ("/tmp/scamperctl:" for daemon mode, "default" for CLI). |
| raw.CycleStart.**ID** | INTEGER | N/A |
| raw.CycleStart.**Hostname** | STRING | The hostname of the machine running the traceroute. |
| raw.CycleStart.**start_time** | INTEGER | When traceroute started in Unix epoch. |
| raw.**Tracelb** | RECORD |   |
| raw.Tracelb.**type** | STRING | The string "tracelb". |
| raw.Tracelb.**version** | STRING | N/A |
| raw.Tracelb.**userid** | INTEGER | N/A |
| raw.Tracelb.**method** | STRING | The trace method used by tracelb ("icmp-echo" for MDA traceroutes). |
| raw.Tracelb.**src** | STRING | Source address. |
| raw.Tracelb.**dst** | STRING | Destination address. |
| raw.Tracelb.**start** | RECORD | A timestamp when the traceroute started. |
| raw.Tracelb.start.**Sec** | INTEGER | Number of seconds since Unix epoch when the traceroute started. |
| raw.Tracelb.start.**Usec** | INTEGER | N/A |
| raw.Tracelb.**probe_size** | INTEGER | N/A |
| raw.Tracelb.**firsthop** | INTEGER | Where to start probing. |
| raw.Tracelb.**attempts** | INTEGER | Number of attempts per probe. |
| raw.Tracelb.**confidence** | INTEGER | Confidence level to attain. |
| raw.Tracelb.**tos** | INTEGER | N/A |
| raw.Tracelb.**gaplimit** | INTEGER | N/A |
| raw.Tracelb.**wait_timeout** | INTEGER | N/A |
| raw.Tracelb.**wait_probe** | INTEGER | N/A |
| raw.Tracelb.**probec** | INTEGER | N/A |
| raw.Tracelb.**probec_max** | INTEGER | N/A |
| raw.Tracelb.**nodec** | INTEGER | The number of nodes in the traceroute. |
| raw.Tracelb.**linkc** | INTEGER | The number of unique links in the traceroute. |
| raw.Tracelb.**nodes** | RECORD |   |
| raw.Tracelb.nodes.**hop_id** | STRING |   |
| raw.Tracelb.nodes.**addr** | STRING | The IP address of the node. |
| raw.Tracelb.nodes.**name** | STRING | N/A |
| raw.Tracelb.nodes.**q_ttl** | INTEGER | N/A |
| raw.Tracelb.nodes.**linkc** | INTEGER | The number of unique links for this node. |
| raw.Tracelb.nodes.**links** | RECORD |   |
| raw.Tracelb.nodes.links.**Links** | RECORD |   |
| raw.Tracelb.nodes.links.Links.**Addr** | STRING | The address in a link.  |
| raw.Tracelb.nodes.links.Links.**Probes** | RECORD | The probes that observed this link. |
| raw.Tracelb.nodes.links.Links.Probes.**Tx** | RECORD | The timestamp of a probe. |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Sec** | INTEGER | N/A |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Usec** | INTEGER | N/A |
| raw.Tracelb.nodes.links.Links.Probes.**Replyc** | INTEGER | The number of replies this probe received from this address. |
| raw.Tracelb.nodes.links.Links.Probes.**TTL** | INTEGER | The TTL of the probe sent. |
| raw.Tracelb.nodes.links.Links.Probes.**Attempt** | INTEGER | The attempt number of this probe. |
| raw.Tracelb.nodes.links.Links.Probes.**Flowid** | INTEGER | The flow identifier of this probe. |
| raw.Tracelb.nodes.links.Links.Probes.**Replies** | RECORD |   |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**Rx** | RECORD | The timestamp of a response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Sec** | INTEGER | N/A |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Usec** | INTEGER | N/A |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**TTL** | INTEGER | The TTL of the received response packet. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**RTT** | FLOAT | The round trip time in milliseconds. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_type** | INTEGER | The type of ICMP response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_code** | INTEGER | The code of the ICMP response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_tos** | INTEGER | N/A |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_ttl** | INTEGER | The "time to live" byte in the quoted IP packet probe. |
| raw.**CycleStop** | RECORD |   |
| raw.CycleStop.**Type** | STRING | The string "cycle-stop". |
| raw.CycleStop.**list_name** | INTEGER | The name of the IP list file ("/tmp/scamperctl:" for daemon mode, "default" for CLI). |
| raw.CycleStop.**ID** | INTEGER | N/A |
| raw.CycleStop.**Hostname** | STRING | The hostname of the system that this traceroute was collected on. |
| raw.CycleStop.**stop_time** | INTEGER | When traceroute finished in Unix epoch. |

## Example queries

The following query provides an overview of metadata for snapshots that have been published:

**SELECT \***    
**FROM \`mlab-collaboration.sorbonne.iprs_index1\`**    
**WHERE is_published \= true;**

The following query fetches records from the **iprs_data1** table, but only for snapshots that meet specific criteria in the **iprs_index1** table.

Filtering Criteria:

* Timeframe: Includes snapshots taken in March 2025\.  
* Duration: Includes only snapshots lasting less than 2 hours.

**SELECT \***    
**FROM \`mlab-collaboration.sorbonne.iprs_data1\`**    
**WHERE id IN (**    
  **SELECT id**    
  **FROM \`mlab-collaboration.sorbonne.iprs_index1\`**    
  **WHERE start_time BETWEEN "2025-03-01" AND "2025-03-30"**    
	**AND duration \< 7200**    
**);**
