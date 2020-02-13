| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **ParseInfo** | RECORD | Metadata about how the parser processed the measurement. |
| ParseInfo.**TaskFileName** | STRING | GCS URL to the archive containing the test_id for this row. |
| ParseInfo.**ParseTime** | TIMESTAMP | Time that the parser processed this row. |
| ParseInfo.**ParserVersion** | STRING | Version of the parser that processed this row. |
| **test_id** | STRING | Original filename of measurement as written to disk and in the GCS archive. |
| **log_time** | INTEGER | Original measurement collection timestamp. |
| result.**GitShortCommit** | STRING | GitShortCommit is the Git commit (short form) of the running server code. |
| result.**Version** | STRING | Version is the symbolic version (if any) of the running server code. |
| result.**Control** | RECORD | Metadata for TCP connections to the NDT5 control channel. All NDT5 measurements have a control channel. |
| result.Control.**UUID** | STRING | UUID for control channel. |
| result.Control.**Protocol** | STRING | Protocol used for S2C and C2S measurements. Values include WS, WSS, and PLAIN. |
| result.Control.**MessageProtocol** | STRING | Individual messages are sent with the MessageProtocol. Values include JSON, TLV. |
| result.Control.**ClientMetadata** | RECORD | Client-reported metadata as name/value pairs. |
| result.**C2S** | RECORD | Metadata for Client-to-Server measurements performed using the NDT5 protocol, e.g. "Upload". |
| result.C2S.**UUID** | STRING | UUID for C2S TCP connection. |
| result.C2S.**MeanThroughputMbps** | FLOAT | Server calculated average upload rate. |
| result.**S2C** | RECORD | Metadata for Server-to-Client measurements performed using the NDT5 protocol, e.g. "Download". |
| result.S2C.**UUID** | STRING | UUID for S2C TCP connection. |
| result.S2C.**MeanThroughputMbps** | FLOAT | Server calculated average download rate. |
| result.S2C.**MinRTT** | INTEGER | The minimum RTT observed during the download measurement. |
| result.S2C.**ClientReportedMbps** | FLOAT | The client reported average download rate. |
