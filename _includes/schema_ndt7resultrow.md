| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING |  |
| **a** | RECORD | Fields summarizing or derived from the raw data. |
| a.**UUID** | STRING | UUID for TCP connection. |
| a.**TestTime** | TIMESTAMP |  |
| a.**CongestionControl** | STRING | Congestion control algorithm used for connection. |
| a.**MeanThroughputMbps** | FLOAT | Server calculated average rate. |
| a.**MinRTT** | FLOAT | The minimum RTT observed during the measurement. |
| a.**LossRate** | FLOAT | Loss rate from the lifetime of the connection. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version of the parser that processed this row. |
| parser.**Time** | TIMESTAMP | Time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | GCS URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING |  |
| parser.**Priority** | INTEGER |  |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
| **raw** | RECORD |  |
| raw.**GitShortCommit** | STRING | GitShortCommit is the Git commit (short form) of the running server code. |
| raw.**Version** | STRING | Version is the symbolic version (if any) of the running server code. |
| raw.**ServerIP** | STRING |  |
| raw.**ServerPort** | INTEGER |  |
| raw.**ClientIP** | STRING |  |
| raw.**ClientPort** | INTEGER |  |
| raw.**StartTime** | TIMESTAMP |  |
| raw.**EndTime** | TIMESTAMP |  |
| raw.**Upload** | RECORD | Metadata for the NDT7 upload protocol. |
| raw.Upload.**UUID** | STRING | UUID for upload TCP connection. |
| raw.Upload.**StartTime** | TIMESTAMP |  |
| raw.Upload.**EndTime** | TIMESTAMP |  |
| raw.Upload.**ServerMeasurements** | RECORD | Server calculated measurements collected throughout the lifetime of the connection. |
| raw.Upload.ServerMeasurements.**AppInfo** | RECORD |  |
| raw.Upload.ServerMeasurements.AppInfo.**NumBytes** | INTEGER |  |
| raw.Upload.ServerMeasurements.AppInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.ServerMeasurements.**BBRInfo** | RECORD |  |
| raw.Upload.ServerMeasurements.BBRInfo.**BW** | INTEGER |  |
| raw.Upload.ServerMeasurements.BBRInfo.**MinRTT** | INTEGER |  |
| raw.Upload.ServerMeasurements.BBRInfo.**PacingGain** | INTEGER |  |
| raw.Upload.ServerMeasurements.BBRInfo.**CwndGain** | INTEGER |  |
| raw.Upload.ServerMeasurements.BBRInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.ServerMeasurements.**TCPInfo** | RECORD |  |
| raw.Upload.ServerMeasurements.TCPInfo.**State** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**CAState** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Retransmits** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Probes** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Backoff** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Options** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**WScale** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**AppLimited** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RTO** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**ATO** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SndMSS** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvMSS** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Unacked** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Sacked** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Lost** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Retrans** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Fackets** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**LastDataSent** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**LastAckSent** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**LastDataRecv** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**PMTU** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvSsThresh** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RTT** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RTTVar** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SndSsThresh** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SndCwnd** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**AdvMSS** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Reordering** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvRTT** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvSpace** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**TotalRetrans** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**PacingRate** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**MaxPacingRate** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesAcked** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesReceived** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SegsOut** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SegsIn** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**NotsentBytes** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**MinRTT** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**DataSegsIn** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**DataSegsOut** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**DeliveryRate** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**BusyTime** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**RWndLimited** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SndBufLimited** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**Delivered** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**DeliveredCE** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesSent** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesRetrans** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**DSackDups** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**ReordSeen** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.**ClientMeasurements** | RECORD | Client calculated measurements collected and reported throughout the lifetime of the connection. |
| raw.Upload.ClientMeasurements.**AppInfo** | RECORD |  |
| raw.Upload.ClientMeasurements.AppInfo.**NumBytes** | INTEGER |  |
| raw.Upload.ClientMeasurements.AppInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.ClientMeasurements.**BBRInfo** | RECORD |  |
| raw.Upload.ClientMeasurements.BBRInfo.**BW** | INTEGER |  |
| raw.Upload.ClientMeasurements.BBRInfo.**MinRTT** | INTEGER |  |
| raw.Upload.ClientMeasurements.BBRInfo.**PacingGain** | INTEGER |  |
| raw.Upload.ClientMeasurements.BBRInfo.**CwndGain** | INTEGER |  |
| raw.Upload.ClientMeasurements.BBRInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.ClientMeasurements.**TCPInfo** | RECORD |  |
| raw.Upload.ClientMeasurements.TCPInfo.**State** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**CAState** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Retransmits** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Probes** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Backoff** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Options** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**WScale** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**AppLimited** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RTO** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**ATO** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SndMSS** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvMSS** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Unacked** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Sacked** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Lost** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Retrans** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Fackets** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**LastDataSent** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**LastAckSent** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**LastDataRecv** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**PMTU** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvSsThresh** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RTT** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RTTVar** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SndSsThresh** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SndCwnd** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**AdvMSS** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Reordering** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvRTT** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvSpace** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**TotalRetrans** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**PacingRate** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**MaxPacingRate** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesAcked** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesReceived** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SegsOut** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SegsIn** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**NotsentBytes** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**MinRTT** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**DataSegsIn** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**DataSegsOut** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**DeliveryRate** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**BusyTime** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**RWndLimited** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SndBufLimited** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**Delivered** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**DeliveredCE** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesSent** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesRetrans** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**DSackDups** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**ReordSeen** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**ElapsedTime** | INTEGER |  |
| raw.Upload.**ClientMetadata** | RECORD | The client reported metadata. |
| raw.Upload.ClientMetadata.**Name** | STRING |  |
| raw.Upload.ClientMetadata.**Value** | STRING |  |
| raw.**Download** | RECORD | Metadata for the NDT7 download protocol. |
| raw.Download.**UUID** | STRING | UUID for download TCP connection. |
| raw.Download.**StartTime** | TIMESTAMP |  |
| raw.Download.**EndTime** | TIMESTAMP |  |
| raw.Download.**ServerMeasurements** | RECORD | Server calculated measurements collected throughout the lifetime of the connection. |
| raw.Download.ServerMeasurements.**AppInfo** | RECORD |  |
| raw.Download.ServerMeasurements.AppInfo.**NumBytes** | INTEGER |  |
| raw.Download.ServerMeasurements.AppInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.ServerMeasurements.**BBRInfo** | RECORD |  |
| raw.Download.ServerMeasurements.BBRInfo.**BW** | INTEGER |  |
| raw.Download.ServerMeasurements.BBRInfo.**MinRTT** | INTEGER |  |
| raw.Download.ServerMeasurements.BBRInfo.**PacingGain** | INTEGER |  |
| raw.Download.ServerMeasurements.BBRInfo.**CwndGain** | INTEGER |  |
| raw.Download.ServerMeasurements.BBRInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.ServerMeasurements.**TCPInfo** | RECORD |  |
| raw.Download.ServerMeasurements.TCPInfo.**State** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**CAState** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Retransmits** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Probes** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Backoff** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Options** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**WScale** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**AppLimited** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RTO** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**ATO** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SndMSS** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RcvMSS** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Unacked** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Sacked** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Lost** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Retrans** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Fackets** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**LastDataSent** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**LastAckSent** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**LastDataRecv** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**PMTU** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RcvSsThresh** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RTT** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RTTVar** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SndSsThresh** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SndCwnd** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**AdvMSS** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Reordering** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RcvRTT** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RcvSpace** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**TotalRetrans** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**PacingRate** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**MaxPacingRate** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**BytesAcked** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**BytesReceived** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SegsOut** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SegsIn** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**NotsentBytes** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**MinRTT** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**DataSegsIn** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**DataSegsOut** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**DeliveryRate** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**BusyTime** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**RWndLimited** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SndBufLimited** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**Delivered** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**DeliveredCE** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**BytesSent** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**BytesRetrans** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**DSackDups** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**ReordSeen** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.**ClientMeasurements** | RECORD | Client calculated measurements collected and reported throughout the lifetime of the connection. |
| raw.Download.ClientMeasurements.**AppInfo** | RECORD |  |
| raw.Download.ClientMeasurements.AppInfo.**NumBytes** | INTEGER |  |
| raw.Download.ClientMeasurements.AppInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.ClientMeasurements.**BBRInfo** | RECORD |  |
| raw.Download.ClientMeasurements.BBRInfo.**BW** | INTEGER |  |
| raw.Download.ClientMeasurements.BBRInfo.**MinRTT** | INTEGER |  |
| raw.Download.ClientMeasurements.BBRInfo.**PacingGain** | INTEGER |  |
| raw.Download.ClientMeasurements.BBRInfo.**CwndGain** | INTEGER |  |
| raw.Download.ClientMeasurements.BBRInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.ClientMeasurements.**TCPInfo** | RECORD |  |
| raw.Download.ClientMeasurements.TCPInfo.**State** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**CAState** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Retransmits** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Probes** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Backoff** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Options** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**WScale** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**AppLimited** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RTO** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**ATO** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SndMSS** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RcvMSS** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Unacked** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Sacked** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Lost** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Retrans** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Fackets** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**LastDataSent** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**LastAckSent** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**LastDataRecv** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**PMTU** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RcvSsThresh** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RTT** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RTTVar** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SndSsThresh** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SndCwnd** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**AdvMSS** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Reordering** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RcvRTT** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RcvSpace** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**TotalRetrans** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**PacingRate** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**MaxPacingRate** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**BytesAcked** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**BytesReceived** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SegsOut** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SegsIn** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**NotsentBytes** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**MinRTT** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**DataSegsIn** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**DataSegsOut** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**DeliveryRate** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**BusyTime** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**RWndLimited** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SndBufLimited** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**Delivered** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**DeliveredCE** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**BytesSent** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**BytesRetrans** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**DSackDups** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**ReordSeen** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**ElapsedTime** | INTEGER |  |
| raw.Download.**ClientMetadata** | RECORD | The client reported metadata. |
| raw.Download.ClientMetadata.**Name** | STRING |  |
| raw.Download.ClientMetadata.**Value** | STRING |  |