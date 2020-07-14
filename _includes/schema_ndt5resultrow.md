| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **ParseInfo** | RECORD | Metadata about how the parser processed the measurement. |
| ParseInfo.**TaskFileName** | STRING | GCS URL to the archive containing the test_id for this row. |
| ParseInfo.**ParseTime** | TIMESTAMP | Time that the parser processed this row. |
| ParseInfo.**ParserVersion** | STRING | Version of the parser that processed this row. |
| ParseInfo.**Filename** | STRING |  |
| **test_id** | STRING | Original filename of measurement as written to disk and in the GCS archive. |
| **log_time** | INTEGER | Original measurement collection timestamp. |
| **result** | RECORD |  |
| result.**GitShortCommit** | STRING | GitShortCommit is the Git commit (short form) of the running server code. |
| result.**Version** | STRING | Version is the symbolic version (if any) of the running server code. |
| result.**ServerIP** | STRING |  |
| result.**ServerPort** | INTEGER |  |
| result.**ClientIP** | STRING |  |
| result.**ClientPort** | INTEGER |  |
| result.**StartTime** | TIMESTAMP |  |
| result.**EndTime** | TIMESTAMP |  |
| result.**Control** | RECORD | Metadata for TCP connections to the NDT5 control channel. All NDT5 measurements have a control channel. |
| result.Control.**UUID** | STRING | UUID for control channel. |
| result.Control.**Protocol** | STRING | Protocol used for S2C and C2S measurements. Values include WS, WSS, and PLAIN. |
| result.Control.**MessageProtocol** | STRING | Individual messages are sent with the MessageProtocol. Values include JSON, TLV. |
| result.Control.**ClientMetadata** | RECORD | Client-reported metadata as name/value pairs. |
| result.Control.ClientMetadata.**Name** | STRING |  |
| result.Control.ClientMetadata.**Value** | STRING |  |
| result.**C2S** | RECORD | Metadata for Client-to-Server measurements performed using the NDT5 protocol, e.g. "Upload". |
| result.C2S.**ServerIP** | STRING |  |
| result.C2S.**ServerPort** | INTEGER |  |
| result.C2S.**ClientIP** | STRING |  |
| result.C2S.**ClientPort** | INTEGER |  |
| result.C2S.**UUID** | STRING | UUID for C2S TCP connection. |
| result.C2S.**StartTime** | TIMESTAMP |  |
| result.C2S.**EndTime** | TIMESTAMP |  |
| result.C2S.**MeanThroughputMbps** | FLOAT | Server calculated average upload rate. |
| result.C2S.**Error** | STRING |  |
| result.**S2C** | RECORD | Metadata for Server-to-Client measurements performed using the NDT5 protocol, e.g. "Download". |
| result.S2C.**UUID** | STRING | UUID for S2C TCP connection. |
| result.S2C.**ServerIP** | STRING |  |
| result.S2C.**ServerPort** | INTEGER |  |
| result.S2C.**ClientIP** | STRING |  |
| result.S2C.**ClientPort** | INTEGER |  |
| result.S2C.**StartTime** | TIMESTAMP |  |
| result.S2C.**EndTime** | TIMESTAMP |  |
| result.S2C.**MeanThroughputMbps** | FLOAT | Server calculated average download rate. |
| result.S2C.**MinRTT** | INTEGER | The minimum RTT observed during the download measurement. |
| result.S2C.**MaxRTT** | INTEGER |  |
| result.S2C.**SumRTT** | INTEGER |  |
| result.S2C.**CountRTT** | INTEGER |  |
| result.S2C.**ClientReportedMbps** | FLOAT | The client reported average download rate. |
| result.S2C.**TCPInfo** | RECORD |  |
| result.S2C.TCPInfo.**State** | INTEGER |  |
| result.S2C.TCPInfo.**CAState** | INTEGER |  |
| result.S2C.TCPInfo.**Retransmits** | INTEGER |  |
| result.S2C.TCPInfo.**Probes** | INTEGER |  |
| result.S2C.TCPInfo.**Backoff** | INTEGER |  |
| result.S2C.TCPInfo.**Options** | INTEGER |  |
| result.S2C.TCPInfo.**WScale** | INTEGER |  |
| result.S2C.TCPInfo.**AppLimited** | INTEGER |  |
| result.S2C.TCPInfo.**RTO** | INTEGER |  |
| result.S2C.TCPInfo.**ATO** | INTEGER |  |
| result.S2C.TCPInfo.**SndMSS** | INTEGER |  |
| result.S2C.TCPInfo.**RcvMSS** | INTEGER |  |
| result.S2C.TCPInfo.**Unacked** | INTEGER |  |
| result.S2C.TCPInfo.**Sacked** | INTEGER |  |
| result.S2C.TCPInfo.**Lost** | INTEGER |  |
| result.S2C.TCPInfo.**Retrans** | INTEGER |  |
| result.S2C.TCPInfo.**Fackets** | INTEGER |  |
| result.S2C.TCPInfo.**LastDataSent** | INTEGER |  |
| result.S2C.TCPInfo.**LastAckSent** | INTEGER |  |
| result.S2C.TCPInfo.**LastDataRecv** | INTEGER |  |
| result.S2C.TCPInfo.**LastAckRecv** | INTEGER |  |
| result.S2C.TCPInfo.**PMTU** | INTEGER |  |
| result.S2C.TCPInfo.**RcvSsThresh** | INTEGER |  |
| result.S2C.TCPInfo.**RTT** | INTEGER |  |
| result.S2C.TCPInfo.**RTTVar** | INTEGER |  |
| result.S2C.TCPInfo.**SndSsThresh** | INTEGER |  |
| result.S2C.TCPInfo.**SndCwnd** | INTEGER |  |
| result.S2C.TCPInfo.**AdvMSS** | INTEGER |  |
| result.S2C.TCPInfo.**Reordering** | INTEGER |  |
| result.S2C.TCPInfo.**RcvRTT** | INTEGER |  |
| result.S2C.TCPInfo.**RcvSpace** | INTEGER |  |
| result.S2C.TCPInfo.**TotalRetrans** | INTEGER |  |
| result.S2C.TCPInfo.**PacingRate** | INTEGER |  |
| result.S2C.TCPInfo.**MaxPacingRate** | INTEGER |  |
| result.S2C.TCPInfo.**BytesAcked** | INTEGER |  |
| result.S2C.TCPInfo.**BytesReceived** | INTEGER |  |
| result.S2C.TCPInfo.**SegsOut** | INTEGER |  |
| result.S2C.TCPInfo.**SegsIn** | INTEGER |  |
| result.S2C.TCPInfo.**NotsentBytes** | INTEGER |  |
| result.S2C.TCPInfo.**MinRTT** | INTEGER |  |
| result.S2C.TCPInfo.**DataSegsIn** | INTEGER |  |
| result.S2C.TCPInfo.**DataSegsOut** | INTEGER |  |
| result.S2C.TCPInfo.**DeliveryRate** | INTEGER |  |
| result.S2C.TCPInfo.**BusyTime** | INTEGER |  |
| result.S2C.TCPInfo.**RWndLimited** | INTEGER |  |
| result.S2C.TCPInfo.**SndBufLimited** | INTEGER |  |
| result.S2C.TCPInfo.**Delivered** | INTEGER |  |
| result.S2C.TCPInfo.**DeliveredCE** | INTEGER |  |
| result.S2C.TCPInfo.**BytesSent** | INTEGER |  |
| result.S2C.TCPInfo.**BytesRetrans** | INTEGER |  |
| result.S2C.TCPInfo.**DSackDups** | INTEGER |  |
| result.S2C.TCPInfo.**ReordSeen** | INTEGER |  |
| result.S2C.**Error** | STRING |  |
