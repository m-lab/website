| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | UUID of the connection under consideration. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING |  |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING |  |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
| **raw** | RECORD | Fields from the raw data. |
| raw.**Metadata** | RECORD |  |
| raw.Metadata.**UUID** | STRING |  |
| raw.Metadata.**TracerouteCallerVersion** | STRING |  |
| raw.Metadata.**CachedResult** | BOOLEAN |  |
| raw.Metadata.**CachedUUID** | STRING |  |
| raw.**CycleStart** | RECORD |  |
| raw.CycleStart.**Type** | STRING |  |
| raw.CycleStart.**list_name** | STRING |  |
| raw.CycleStart.**ID** | FLOAT |  |
| raw.CycleStart.**Hostname** | STRING |  |
| raw.CycleStart.**start_time** | FLOAT |  |
| raw.**Tracelb** | RECORD |  |
| raw.Tracelb.**type** | STRING |  |
| raw.Tracelb.**version** | STRING |  |
| raw.Tracelb.**userid** | FLOAT |  |
| raw.Tracelb.**method** | STRING |  |
| raw.Tracelb.**src** | STRING |  |
| raw.Tracelb.**dst** | STRING |  |
| raw.Tracelb.**start** | RECORD |  |
| raw.Tracelb.start.**Sec** | INTEGER |  |
| raw.Tracelb.start.**Usec** | INTEGER |  |
| raw.Tracelb.**probe_size** | FLOAT |  |
| raw.Tracelb.**firsthop** | FLOAT |  |
| raw.Tracelb.**attempts** | FLOAT |  |
| raw.Tracelb.**confidence** | FLOAT |  |
| raw.Tracelb.**tos** | FLOAT |  |
| raw.Tracelb.**gaplimit** | FLOAT |  |
| raw.Tracelb.**wait_timeout** | FLOAT |  |
| raw.Tracelb.**wait_probe** | FLOAT |  |
| raw.Tracelb.**probec** | FLOAT |  |
| raw.Tracelb.**probec_max** | FLOAT |  |
| raw.Tracelb.**nodec** | FLOAT |  |
| raw.Tracelb.**linkc** | FLOAT |  |
| raw.Tracelb.**nodes** | RECORD |  |
| raw.Tracelb.nodes.**hop_id** | STRING |  |
| raw.Tracelb.nodes.**addr** | STRING |  |
| raw.Tracelb.nodes.**name** | STRING |  |
| raw.Tracelb.nodes.**q_ttl** | INTEGER |  |
| raw.Tracelb.nodes.**linkc** | INTEGER |  |
| raw.Tracelb.nodes.**links** | RECORD |  |
| raw.Tracelb.nodes.links.**Links** | RECORD |  |
| raw.Tracelb.nodes.links.Links.**Addr** | STRING |  |
| raw.Tracelb.nodes.links.Links.**Probes** | RECORD |  |
| raw.Tracelb.nodes.links.Links.Probes.**Tx** | RECORD |  |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Sec** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Tx.**Usec** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.**Replyc** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.**TTL** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.**Attempt** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.**Flowid** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.**Replies** | RECORD |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**Rx** | RECORD |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Sec** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.Rx.**Usec** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**TTL** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**RTT** | FLOAT |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_type** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_code** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_tos** | INTEGER |  |
| raw.Tracelb.nodes.links.Links.Probes.Replies.**icmp_q_ttl** | INTEGER |  |
| raw.**CycleStop** | RECORD |  |
| raw.CycleStop.**Type** | STRING |  |
| raw.CycleStop.**list_name** | STRING |  |
| raw.CycleStop.**ID** | FLOAT |  |
| raw.CycleStop.**Hostname** | STRING |  |
| raw.CycleStop.**stop_time** | FLOAT |  |
