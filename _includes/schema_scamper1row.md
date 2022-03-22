| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | UUID of the connection under consideration. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING | The name of the file within the ArchiveURL originally created by the measurement service. Results in the raw record are derived from measurements in this file. |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING | The git commit of this build of the parser. |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
| **raw** | RECORD | Fields from the raw data. |
| raw.**Metadata** | RECORD |  |
| raw.Metadata.**UUID** | STRING |  |
| raw.Metadata.**TracerouteCallerVersion** | STRING | The version of traceroute-caller. |
| raw.Metadata.**CachedResult** | BOOLEAN | Traceroute data was found in the cache. |
| raw.Metadata.**CachedUUID** | STRING | UUID of the cached traceroute data. |
| raw.**CycleStart** | RECORD |  |
| raw.CycleStart.**Type** | STRING | The string "cycle-start". |
| raw.CycleStart.**list_name** | STRING | The name of the IP list file ("/tmp/scamperctl:<nnn>" for daemon mode, "default" for CLI). |
| raw.CycleStart.**ID** | FLOAT | Some ID assigned to identify the list by a person (deprecated). |
| raw.CycleStart.**Hostname** | STRING | The hostname of the machine running the traceroute. |
| raw.CycleStart.**start_time** | FLOAT | When traceroute started in Unix epoch. |
| raw.**Tracelb** | RECORD |  |
| raw.Tracelb.**type** | STRING | The string "tracelb". |
| raw.Tracelb.**version** | STRING | The version of tracelb. |
| raw.Tracelb.**userid** | FLOAT | The user ID passed via -U flag of the tracelb command (not set by M-Lab). |
| raw.Tracelb.**method** | STRING | The trace method used by tracelb ("icmp-echo" for MDA traceroutes). |
| raw.Tracelb.**src** | STRING | Source address. |
| raw.Tracelb.**dst** | STRING | Destination address. |
| raw.Tracelb.**start** | RECORD | A timestamp when the traceroute started. |
| raw.Tracelb.start.**Sec** | INTEGER | Number of seconds since Unix epoch when the traceroute started. |
| raw.Tracelb.start.**Usec** | INTEGER | Microseconds elapsed within the second when this traceroute started. |
| raw.Tracelb.**probe_size** | FLOAT | Size of the probe to send. |
| raw.Tracelb.**firsthop** | FLOAT | Where to start probing. |
| raw.Tracelb.**attempts** | FLOAT | Number of attempts per probe. |
| raw.Tracelb.**confidence** | FLOAT | Confidence level to attain. |
| raw.Tracelb.**tos** | FLOAT | Type-of-service byte to use. |
| raw.Tracelb.**gaplimit** | FLOAT | Maximum consecutive unresponsive hops. |
| raw.Tracelb.**wait_timeout** | FLOAT | Seconds to wait before timeout. |
| raw.Tracelb.**wait_probe** | FLOAT | Minimum inter-probe time in 1/100th of seconds per TTL. |
| raw.Tracelb.**probec** | FLOAT | Count of probes sent, including retries. |
| raw.Tracelb.**probec_max** | FLOAT | Maximum number of probes to send. |
| raw.Tracelb.**nodec** | FLOAT | The number of nodes in the traceroute. |
| raw.Tracelb.**linkc** | FLOAT | The number of links in the traceroute. |
| raw.Tracelb.**nodes** | RECORD |  |
| raw.Tracelb.nodes.**hop_id** | STRING |  |
| raw.Tracelb.nodes.**addr** | STRING | The IP address of the node. |
| raw.Tracelb.nodes.**name** | STRING | The hostname for the IP address. |
| raw.Tracelb.nodes.**q_ttl** | INTEGER | The TTL value of the quoted traceroute probe. |
| raw.Tracelb.nodes.**linkc** | INTEGER | The number of links for this node. |
| raw.Tracelb.nodes.**links** | RECORD |  |
| raw.Tracelb.nodes.links.**Links** | RECORD |  |
| raw.Tracelb.nodes.links.Links.**Addr** | STRING | The address in a link ("*" for unresponsive hosts). |
| raw.Tracelb.nodes.links.Links.**Probes** | RECORD | The probes that observed this link. |
| raw.Tracelb.nodes.links.Links.Probes.**Tx** | RECORD | The timestamp of a probe. |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Sec** | INTEGER | The seconds portion of the timestamp of the probe. |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Usec** | INTEGER | The microsecond portion of the timestamp of the probe. |
| raw.Tracelb.nodes.links.Links.Probes.**Replyc** | INTEGER | The number of replies this probe received from this address. |
| raw.Tracelb.nodes.links.Links.Probes.**TTL** | INTEGER | The TTL of the probe sent. |
| raw.Tracelb.nodes.links.Links.Probes.**Attempt** | INTEGER | The attempt number of this probe. |
| raw.Tracelb.nodes.links.Links.Probes.**Flowid** | INTEGER | The flow identifier of this probe. |
| raw.Tracelb.nodes.links.Links.Probes.**Replies** | RECORD |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**Rx** | RECORD | The timestamp of a response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Sec** | INTEGER | The seconds portion of the response timestamp. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Usec** | INTEGER | The microsecond portion of the response timestamp. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**TTL** | INTEGER | The TTL of the received response packet. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**RTT** | FLOAT | The round trip time in milliseconds. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_type** | INTEGER | The type of ICMP response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_code** | INTEGER | The code of the ICMP response. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_tos** | INTEGER | The "type of service" byte in the quoted IP packet probe. |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_ttl** | INTEGER | The "time to live" byte in the quoted IP packet probe. |
| raw.**CycleStop** | RECORD |  |
| raw.CycleStop.**Type** | STRING | The string "cycle-stop". |
| raw.CycleStop.**list_name** | STRING | The name of the IP list file ("/tmp/scamperctl:<nnn>" for daemon mode, "default" for CLI). |
| raw.CycleStop.**ID** | FLOAT | Some ID assigned to identify the list by a person (deprecated). |
| raw.CycleStop.**Hostname** | STRING | The hostname of the system that this traceroute was collected on. |
| raw.CycleStop.**stop_time** | FLOAT | When traceroute finished in Unix epoch. |
