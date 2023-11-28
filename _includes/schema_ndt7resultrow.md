| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **id** | STRING | UUID of the connection under consideration. |
| **a** | RECORD | Fields summarizing or derived from the raw data. |
| a.**UUID** | STRING | UUID for TCP connection. |
| a.**TestTime** | TIMESTAMP | The date and time of the measurement in UTC. |
| a.**CongestionControl** | STRING | The congestion control algorithm used for connection. |
| a.**MeanThroughputMbps** | FLOAT | The measured rate as calculated by the server. Presented in megabits per second, or Mbit/s, this value is the average of tcp-info snapshots taken at the beginning and end of an ndt7 measurement. Therefore it is identified as "MeanThroughputMbps". |
| a.**MinRTT** | FLOAT | The minimum Round Trip Time observed during the measurement, recorded in milliseconds. |
| a.**LossRate** | FLOAT | Loss rate from the lifetime of the connection. |
| **parser** | RECORD | Metadata about how the parser processed this measurement row. |
| parser.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| parser.**Time** | TIMESTAMP | The time that the parser processed this row. |
| parser.**ArchiveURL** | STRING | The Google Cloud Storage URL to the archive containing the Filename for this row. |
| parser.**Filename** | STRING | The name of the file within the ArchiveURL originally created by the measurement service. Results in the raw record are derived from measurements in this file. |
| parser.**Priority** | INTEGER |  |
| parser.**GitCommit** | STRING | The git commit of this build of the parser. |
| parser.**ArchiveSize** | INTEGER | The original archive size as found in GCS. |
| parser.**FileSize** | INTEGER | The size of the file data provided to the parser for this row. |
| **date** | DATE | Date is used by BigQuery to partition data to improve query performance. |
| **raw** | RECORD | Fields from the raw data. |
| raw.**GitShortCommit** | STRING | GitShortCommit is the Git commit (short form) of the running server code that produced this measurement. |
| raw.**Version** | STRING | Version is the symbolic version (if any) of the running server code that produced this measurement. |
| raw.**ServerIP** | STRING | The IP address assigned to the M-Lab server that conducted the measurement. |
| raw.**ServerPort** | INTEGER | The port used by the server to conduct the measurement. |
| raw.**ClientIP** | STRING | The IP address assigned to the client that conducted the measurement. |
| raw.**ClientPort** | INTEGER | The port used by the client to conduct the measurement. |
| raw.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| raw.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| raw.**Upload** | RECORD | Metadata for the NDT7 protocol for this measurement. |
| raw.Upload.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Upload.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| raw.Upload.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| raw.Upload.**ServerMeasurements** | RECORD | Measurements reported by the M-Lab server.  Not all fields are reported by all versions of the server. |
| raw.Upload.ServerMeasurements.**AppInfo** | RECORD | Server measurements performed outside of the kernel |
| raw.Upload.ServerMeasurements.AppInfo.**NumBytes** | INTEGER | The number of bytes written to or read from the socket during the measurement. |
| raw.Upload.ServerMeasurements.AppInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.ServerMeasurements.**ConnectionInfo** | RECORD |  |
| raw.Upload.ServerMeasurements.ConnectionInfo.**Client** | STRING |  |
| raw.Upload.ServerMeasurements.ConnectionInfo.**Server** | STRING |  |
| raw.Upload.ServerMeasurements.ConnectionInfo.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Upload.ServerMeasurements.**BBRInfo** | RECORD | Instrumentation in the BBR TCP module in the kernel. |
| raw.Upload.ServerMeasurements.BBRInfo.**BW** | INTEGER | The maximum end-to-end bandwidth from the server to the client as measured by BBR. |
| raw.Upload.ServerMeasurements.BBRInfo.**MinRTT** | INTEGER | The minimum round trip time as measured by BBR. Recorded in microseconds. |
| raw.Upload.ServerMeasurements.BBRInfo.**PacingGain** | INTEGER | Fixed point multiplier used to set the pacing rate from the maximum bandwidth.  The binary point varies by kernel version but the statistical mode is always 1.0. |
| raw.Upload.ServerMeasurements.BBRInfo.**CwndGain** | INTEGER | Fixed point multiplier used to set the maximum window size from BW*MinRTT.   The denominator varies by kernel version. |
| raw.Upload.ServerMeasurements.BBRInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.ServerMeasurements.**TCPInfo** | RECORD | TCP Instrumentation in the kernel, as accessed by the server. |
| raw.Upload.ServerMeasurements.TCPInfo.**State** | INTEGER | TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| raw.Upload.ServerMeasurements.TCPInfo.**CAState** | INTEGER | Loss recovery state machine. For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence. Reset to zero on forward progress.<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered.<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter. Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd.<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale. See github.com/m-lab/etl/issues/790 |
| raw.Upload.ServerMeasurements.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks. Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RTO** | INTEGER | Retransmission Timeout. Quantized to system jiffies.<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout. Quantized to system jiffies.<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size. Note that this can be smaller than the negotiated MSS for various reasons.<br>Kernel: mss_cache in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host. Used to trigger delayed ACKs.<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una. Accounting for the Pipe algorithm.<br>Kernel: packets_out in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks. Accounting for the Pipe algorithm.<br>Kernel: sacked_out in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics. Accounting for the Pipe algorithm.<br>Kernel: lost_out in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted. Accounting for the Pipe algorithm.<br>Kernel: retrans_out in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Fackets** | INTEGER | Not Used - obsolete kernel instrument. |
| raw.Upload.ServerMeasurements.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent. Quantized to jiffies.<br>Kernel: lsndtime in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (not implemented). Present in TCP_INFO but not elsewhere in the kernel. |
| raw.Upload.ServerMeasurements.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received. Quantized to jiffies.<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path.<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp. Receiver algorithm to avoid allocating excessive receive buffers.<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT). The Linux implementation differs from the standard.<br>Kernel: srtt_us in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RTTVar** | INTEGER | The variation in round trip time during the upload measurement as measured by the M-Lab server. |
| raw.Upload.ServerMeasurements.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**SndCwnd** | INTEGER | Congestion Window. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_cwnd in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS.<br>Kernel: advmss in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance.<br>Kernel: reordering in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate.<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue. Typically updated by receiver side auto-tuning.<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data.<br>Kernel: total_retrans in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control.<br>Kernel: sk_pacing_rate in include/net/sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp. Set with setsockopt( ..SO_MAX_PACING_RATE.. ).<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received.<br>Kernel: bytes_acked in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received.<br>Kernel: bytes_received in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted. Includes data and pure ACKs.<br>Kernel: segs_out in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**SegsIn** | INTEGER | The number of segments received. Includes data and pure ACKs.<br>Kernel: segs_in in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent.<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| raw.Upload.ServerMeasurements.TCPInfo.**MinRTT** | INTEGER | Minimum Round Trip Time. Recorded in microseconds.<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0).<br>Kernel: data_segs_in in include/net/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0).<br>Kernel: data_segs_out in include/net/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate.<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| raw.Upload.ServerMeasurements.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data. Time when snd.una is not equal to snd.next.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ServerMeasurements.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ServerMeasurements.TCPInfo.**SndBufLimited** | INTEGER | Time spent waiting for sender buffer space. This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ServerMeasurements.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered_ce in include/linux/tcp.h |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions).<br>Kernel: bytes_sent |
| raw.Upload.ServerMeasurements.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted. May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| raw.Upload.ServerMeasurements.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK. Not reported by some Operating Systems.<br>Kernel: dsack_dups |
| raw.Upload.ServerMeasurements.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order. Estimates reordering on the return path.<br>Kernel: reord_seen |
| raw.Upload.ServerMeasurements.TCPInfo.**RcvOooPack** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**SndWnd** | INTEGER |  |
| raw.Upload.ServerMeasurements.TCPInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.**ClientMeasurements** | RECORD | Periodic measurements reported by the client. Not all clients report this information. |
| raw.Upload.ClientMeasurements.**AppInfo** | RECORD | Server measurements performed outside of the kernel |
| raw.Upload.ClientMeasurements.AppInfo.**NumBytes** | INTEGER | The number of bytes written to or read from the socket during the measurement. |
| raw.Upload.ClientMeasurements.AppInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.ClientMeasurements.**ConnectionInfo** | RECORD |  |
| raw.Upload.ClientMeasurements.ConnectionInfo.**Client** | STRING |  |
| raw.Upload.ClientMeasurements.ConnectionInfo.**Server** | STRING |  |
| raw.Upload.ClientMeasurements.ConnectionInfo.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Upload.ClientMeasurements.**BBRInfo** | RECORD | Instrumentation in the BBR TCP module in the kernel. |
| raw.Upload.ClientMeasurements.BBRInfo.**BW** | INTEGER | The maximum end-to-end bandwidth from the server to the client as measured by BBR. |
| raw.Upload.ClientMeasurements.BBRInfo.**MinRTT** | INTEGER | The minimum round trip time as measured by BBR. Recorded in microseconds. |
| raw.Upload.ClientMeasurements.BBRInfo.**PacingGain** | INTEGER | Fixed point multiplier used to set the pacing rate from the maximum bandwidth.  The binary point varies by kernel version but the statistical mode is always 1.0. |
| raw.Upload.ClientMeasurements.BBRInfo.**CwndGain** | INTEGER | Fixed point multiplier used to set the maximum window size from BW*MinRTT.   The denominator varies by kernel version. |
| raw.Upload.ClientMeasurements.BBRInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.ClientMeasurements.**TCPInfo** | RECORD | TCP Instrumentation in the kernel, as accessed by the server. |
| raw.Upload.ClientMeasurements.TCPInfo.**State** | INTEGER | TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| raw.Upload.ClientMeasurements.TCPInfo.**CAState** | INTEGER | Loss recovery state machine. For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence. Reset to zero on forward progress.<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered.<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter. Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd.<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale. See github.com/m-lab/etl/issues/790 |
| raw.Upload.ClientMeasurements.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks. Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RTO** | INTEGER | Retransmission Timeout. Quantized to system jiffies.<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout. Quantized to system jiffies.<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size. Note that this can be smaller than the negotiated MSS for various reasons.<br>Kernel: mss_cache in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host. Used to trigger delayed ACKs.<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una. Accounting for the Pipe algorithm.<br>Kernel: packets_out in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks. Accounting for the Pipe algorithm.<br>Kernel: sacked_out in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics. Accounting for the Pipe algorithm.<br>Kernel: lost_out in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted. Accounting for the Pipe algorithm.<br>Kernel: retrans_out in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Fackets** | INTEGER | Not Used - obsolete kernel instrument. |
| raw.Upload.ClientMeasurements.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent. Quantized to jiffies.<br>Kernel: lsndtime in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (not implemented). Present in TCP_INFO but not elsewhere in the kernel. |
| raw.Upload.ClientMeasurements.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received. Quantized to jiffies.<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path.<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp. Receiver algorithm to avoid allocating excessive receive buffers.<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT). The Linux implementation differs from the standard.<br>Kernel: srtt_us in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RTTVar** | INTEGER | The variation in round trip time during the upload measurement as measured by the M-Lab server. |
| raw.Upload.ClientMeasurements.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**SndCwnd** | INTEGER | Congestion Window. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_cwnd in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS.<br>Kernel: advmss in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance.<br>Kernel: reordering in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate.<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue. Typically updated by receiver side auto-tuning.<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data.<br>Kernel: total_retrans in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control.<br>Kernel: sk_pacing_rate in include/net/sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp. Set with setsockopt( ..SO_MAX_PACING_RATE.. ).<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received.<br>Kernel: bytes_acked in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received.<br>Kernel: bytes_received in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted. Includes data and pure ACKs.<br>Kernel: segs_out in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**SegsIn** | INTEGER | The number of segments received. Includes data and pure ACKs.<br>Kernel: segs_in in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent.<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| raw.Upload.ClientMeasurements.TCPInfo.**MinRTT** | INTEGER | Minimum Round Trip Time. Recorded in microseconds.<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0).<br>Kernel: data_segs_in in include/net/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0).<br>Kernel: data_segs_out in include/net/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate.<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| raw.Upload.ClientMeasurements.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data. Time when snd.una is not equal to snd.next.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ClientMeasurements.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ClientMeasurements.TCPInfo.**SndBufLimited** | INTEGER | Time spent waiting for sender buffer space. This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Upload.ClientMeasurements.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered_ce in include/linux/tcp.h |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions).<br>Kernel: bytes_sent |
| raw.Upload.ClientMeasurements.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted. May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| raw.Upload.ClientMeasurements.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK. Not reported by some Operating Systems.<br>Kernel: dsack_dups |
| raw.Upload.ClientMeasurements.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order. Estimates reordering on the return path.<br>Kernel: reord_seen |
| raw.Upload.ClientMeasurements.TCPInfo.**RcvOooPack** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**SndWnd** | INTEGER |  |
| raw.Upload.ClientMeasurements.TCPInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Upload.**ClientMetadata** | RECORD | Client-reported metadata as name/value pairs. |
| raw.Upload.ClientMetadata.**Name** | STRING | If set, contains text that identifies and provides context for the corresponding metadata value. For example, "OS" or "clientApplication" |
| raw.Upload.ClientMetadata.**Value** | STRING | If set, contains a value corresponding to metadata name. For example, "Windows 10" or "ndtJS" |
| raw.Upload.**ServerMetadata** | RECORD | Authoritative metadata added by the server configuration. |
| raw.Upload.ServerMetadata.**Name** | STRING | If set, contains the name of a single piece of metadata. This name will be the same for all measurements collected while this server was running with this configuration. |
| raw.Upload.ServerMetadata.**Value** | STRING | If name is set, contains the text of a server configuration value. This value will be the same for all measurements collected while this server was running with this configuration. |
| raw.**Download** | RECORD |  |
| raw.Download.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Download.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| raw.Download.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| raw.Download.**ServerMeasurements** | RECORD | Measurements reported by the M-Lab server.  Not all fields are reported by all versions of the server. |
| raw.Download.ServerMeasurements.**AppInfo** | RECORD | Server measurements performed outside of the kernel |
| raw.Download.ServerMeasurements.AppInfo.**NumBytes** | INTEGER | The number of bytes written to or read from the socket during the measurement. |
| raw.Download.ServerMeasurements.AppInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.ServerMeasurements.**ConnectionInfo** | RECORD |  |
| raw.Download.ServerMeasurements.ConnectionInfo.**Client** | STRING |  |
| raw.Download.ServerMeasurements.ConnectionInfo.**Server** | STRING |  |
| raw.Download.ServerMeasurements.ConnectionInfo.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Download.ServerMeasurements.**BBRInfo** | RECORD | Instrumentation in the BBR TCP module in the kernel. |
| raw.Download.ServerMeasurements.BBRInfo.**BW** | INTEGER | The maximum end-to-end bandwidth from the server to the client as measured by BBR. |
| raw.Download.ServerMeasurements.BBRInfo.**MinRTT** | INTEGER | The minimum round trip time as measured by BBR. Recorded in microseconds. |
| raw.Download.ServerMeasurements.BBRInfo.**PacingGain** | INTEGER | Fixed point multiplier used to set the pacing rate from the maximum bandwidth.  The binary point varies by kernel version but the statistical mode is always 1.0. |
| raw.Download.ServerMeasurements.BBRInfo.**CwndGain** | INTEGER | Fixed point multiplier used to set the maximum window size from BW*MinRTT.   The denominator varies by kernel version. |
| raw.Download.ServerMeasurements.BBRInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.ServerMeasurements.**TCPInfo** | RECORD | TCP Instrumentation in the kernel, as accessed by the server. |
| raw.Download.ServerMeasurements.TCPInfo.**State** | INTEGER | TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| raw.Download.ServerMeasurements.TCPInfo.**CAState** | INTEGER | Loss recovery state machine. For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence. Reset to zero on forward progress.<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered.<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter. Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd.<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale. See github.com/m-lab/etl/issues/790 |
| raw.Download.ServerMeasurements.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks. Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RTO** | INTEGER | Retransmission Timeout. Quantized to system jiffies.<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout. Quantized to system jiffies.<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size. Note that this can be smaller than the negotiated MSS for various reasons.<br>Kernel: mss_cache in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host. Used to trigger delayed ACKs.<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una. Accounting for the Pipe algorithm.<br>Kernel: packets_out in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks. Accounting for the Pipe algorithm.<br>Kernel: sacked_out in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics. Accounting for the Pipe algorithm.<br>Kernel: lost_out in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted. Accounting for the Pipe algorithm.<br>Kernel: retrans_out in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Fackets** | INTEGER | Not Used - obsolete kernel instrument. |
| raw.Download.ServerMeasurements.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent. Quantized to jiffies.<br>Kernel: lsndtime in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (not implemented). Present in TCP_INFO but not elsewhere in the kernel. |
| raw.Download.ServerMeasurements.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received. Quantized to jiffies.<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path.<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp. Receiver algorithm to avoid allocating excessive receive buffers.<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT). The Linux implementation differs from the standard.<br>Kernel: srtt_us in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RTTVar** | INTEGER | The variation in round trip time during the upload measurement as measured by the M-Lab server. |
| raw.Download.ServerMeasurements.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**SndCwnd** | INTEGER | Congestion Window. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_cwnd in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS.<br>Kernel: advmss in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance.<br>Kernel: reordering in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate.<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue. Typically updated by receiver side auto-tuning.<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data.<br>Kernel: total_retrans in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control.<br>Kernel: sk_pacing_rate in include/net/sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp. Set with setsockopt( ..SO_MAX_PACING_RATE.. ).<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| raw.Download.ServerMeasurements.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received.<br>Kernel: bytes_acked in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received.<br>Kernel: bytes_received in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted. Includes data and pure ACKs.<br>Kernel: segs_out in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**SegsIn** | INTEGER | The number of segments received. Includes data and pure ACKs.<br>Kernel: segs_in in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent.<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| raw.Download.ServerMeasurements.TCPInfo.**MinRTT** | INTEGER | Minimum Round Trip Time. Recorded in microseconds.<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0).<br>Kernel: data_segs_in in include/net/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0).<br>Kernel: data_segs_out in include/net/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate.<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| raw.Download.ServerMeasurements.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data. Time when snd.una is not equal to snd.next.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ServerMeasurements.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ServerMeasurements.TCPInfo.**SndBufLimited** | INTEGER | Time spent waiting for sender buffer space. This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ServerMeasurements.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered_ce in include/linux/tcp.h |
| raw.Download.ServerMeasurements.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions).<br>Kernel: bytes_sent |
| raw.Download.ServerMeasurements.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted. May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| raw.Download.ServerMeasurements.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK. Not reported by some Operating Systems.<br>Kernel: dsack_dups |
| raw.Download.ServerMeasurements.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order. Estimates reordering on the return path.<br>Kernel: reord_seen |
| raw.Download.ServerMeasurements.TCPInfo.**RcvOooPack** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**SndWnd** | INTEGER |  |
| raw.Download.ServerMeasurements.TCPInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.**ClientMeasurements** | RECORD | Periodic measurements reported by the client. Not all clients report this information. |
| raw.Download.ClientMeasurements.**AppInfo** | RECORD | Server measurements performed outside of the kernel |
| raw.Download.ClientMeasurements.AppInfo.**NumBytes** | INTEGER | The number of bytes written to or read from the socket during the measurement. |
| raw.Download.ClientMeasurements.AppInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.ClientMeasurements.**ConnectionInfo** | RECORD |  |
| raw.Download.ClientMeasurements.ConnectionInfo.**Client** | STRING |  |
| raw.Download.ClientMeasurements.ConnectionInfo.**Server** | STRING |  |
| raw.Download.ClientMeasurements.ConnectionInfo.**UUID** | STRING | UUID for TCP connection for this measurement. |
| raw.Download.ClientMeasurements.**BBRInfo** | RECORD | Instrumentation in the BBR TCP module in the kernel. |
| raw.Download.ClientMeasurements.BBRInfo.**BW** | INTEGER | The maximum end-to-end bandwidth from the server to the client as measured by BBR. |
| raw.Download.ClientMeasurements.BBRInfo.**MinRTT** | INTEGER | The minimum round trip time as measured by BBR. Recorded in microseconds. |
| raw.Download.ClientMeasurements.BBRInfo.**PacingGain** | INTEGER | Fixed point multiplier used to set the pacing rate from the maximum bandwidth.  The binary point varies by kernel version but the statistical mode is always 1.0. |
| raw.Download.ClientMeasurements.BBRInfo.**CwndGain** | INTEGER | Fixed point multiplier used to set the maximum window size from BW*MinRTT.   The denominator varies by kernel version. |
| raw.Download.ClientMeasurements.BBRInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.ClientMeasurements.**TCPInfo** | RECORD | TCP Instrumentation in the kernel, as accessed by the server. |
| raw.Download.ClientMeasurements.TCPInfo.**State** | INTEGER | TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| raw.Download.ClientMeasurements.TCPInfo.**CAState** | INTEGER | Loss recovery state machine. For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence. Reset to zero on forward progress.<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered.<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter. Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd.<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale. See github.com/m-lab/etl/issues/790 |
| raw.Download.ClientMeasurements.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks. Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RTO** | INTEGER | Retransmission Timeout. Quantized to system jiffies.<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout. Quantized to system jiffies.<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size. Note that this can be smaller than the negotiated MSS for various reasons.<br>Kernel: mss_cache in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host. Used to trigger delayed ACKs.<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una. Accounting for the Pipe algorithm.<br>Kernel: packets_out in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks. Accounting for the Pipe algorithm.<br>Kernel: sacked_out in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics. Accounting for the Pipe algorithm.<br>Kernel: lost_out in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted. Accounting for the Pipe algorithm.<br>Kernel: retrans_out in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Fackets** | INTEGER | Not Used - obsolete kernel instrument. |
| raw.Download.ClientMeasurements.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent. Quantized to jiffies.<br>Kernel: lsndtime in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (not implemented). Present in TCP_INFO but not elsewhere in the kernel. |
| raw.Download.ClientMeasurements.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received. Quantized to jiffies.<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**LastAckRecv** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path.<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp. Receiver algorithm to avoid allocating excessive receive buffers.<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT). The Linux implementation differs from the standard.<br>Kernel: srtt_us in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RTTVar** | INTEGER | The variation in round trip time during the upload measurement as measured by the M-Lab server. |
| raw.Download.ClientMeasurements.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**SndCwnd** | INTEGER | Congestion Window. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_cwnd in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS.<br>Kernel: advmss in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance.<br>Kernel: reordering in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate.<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue. Typically updated by receiver side auto-tuning.<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data.<br>Kernel: total_retrans in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control.<br>Kernel: sk_pacing_rate in include/net/sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp. Set with setsockopt( ..SO_MAX_PACING_RATE.. ).<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| raw.Download.ClientMeasurements.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received.<br>Kernel: bytes_acked in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received.<br>Kernel: bytes_received in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted. Includes data and pure ACKs.<br>Kernel: segs_out in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**SegsIn** | INTEGER | The number of segments received. Includes data and pure ACKs.<br>Kernel: segs_in in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent.<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| raw.Download.ClientMeasurements.TCPInfo.**MinRTT** | INTEGER | Minimum Round Trip Time. Recorded in microseconds.<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0).<br>Kernel: data_segs_in in include/net/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0).<br>Kernel: data_segs_out in include/net/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate.<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| raw.Download.ClientMeasurements.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data. Time when snd.una is not equal to snd.next.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ClientMeasurements.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ClientMeasurements.TCPInfo.**SndBufLimited** | INTEGER | Time spent waiting for sender buffer space. This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| raw.Download.ClientMeasurements.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered_ce in include/linux/tcp.h |
| raw.Download.ClientMeasurements.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions).<br>Kernel: bytes_sent |
| raw.Download.ClientMeasurements.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted. May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| raw.Download.ClientMeasurements.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK. Not reported by some Operating Systems.<br>Kernel: dsack_dups |
| raw.Download.ClientMeasurements.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order. Estimates reordering on the return path.<br>Kernel: reord_seen |
| raw.Download.ClientMeasurements.TCPInfo.**RcvOooPack** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**SndWnd** | INTEGER |  |
| raw.Download.ClientMeasurements.TCPInfo.**ElapsedTime** | INTEGER | The duration of the measurement as measured by the M-Lab server in milliseconds. |
| raw.Download.**ClientMetadata** | RECORD | Client-reported metadata as name/value pairs. |
| raw.Download.ClientMetadata.**Name** | STRING | If set, contains text that identifies and provides context for the corresponding metadata value. For example, "OS" or "clientApplication" |
| raw.Download.ClientMetadata.**Value** | STRING | If set, contains a value corresponding to metadata name. For example, "Windows 10" or "ndtJS" |
| raw.Download.**ServerMetadata** | RECORD | Authoritative metadata added by the server configuration. |
| raw.Download.ServerMetadata.**Name** | STRING | If set, contains the name of a single piece of metadata. This name will be the same for all measurements collected while this server was running with this configuration. |
| raw.Download.ServerMetadata.**Value** | STRING | If name is set, contains the text of a server configuration value. This value will be the same for all measurements collected while this server was running with this configuration. |
