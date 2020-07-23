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
| result.**ServerIP** | STRING | The IP address assigned to the M-Lab server that conducted the measurement. |
| result.**ServerPort** | INTEGER | The port used by the server to conduct the measurement. |
| result.**ClientIP** | STRING | The IP address assigned to the client that conducted the measurement. |
| result.**ClientPort** | INTEGER | The port used by the client to conduct the measurement. |
| result.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| result.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| result.**Control** | RECORD | Metadata for TCP connections to the NDT5 control channel. All NDT5 measurements have a control channel. |
| result.Control.**UUID** | STRING | The Universally Unique Identifier for the measurement's control channel. |
| result.Control.**Protocol** | STRING | The protocol used for S2C and C2S measurements. Values include WS, WSS, and PLAIN. |
| result.Control.**MessageProtocol** | STRING | Individual messages are sent with the MessageProtocol. Values include JSON, TLV. |
| result.Control.**ClientMetadata** | RECORD | Client-reported metadata as name/value pairs. |
| result.Control.ClientMetadata.**Name** | STRING | If set, contains text that identifies and provides context for the corresponding metadata value. For example, "OS" or "clientApplication" |
| result.Control.ClientMetadata.**Value** | STRING | If set, contains a value corresponding to metadata name. For example, "Windows 10" or "ndtJS" |
| result.**C2S** | RECORD | Metadata for Client-to-Server (upload) measurements performed using the ndt5 protocol. |
| result.C2S.**ServerIP** | STRING | The IP address assigned to the M-Lab server that conducted the measurement. |
| result.C2S.**ServerPort** | INTEGER | The port used by the server to conduct the measurement. |
| result.C2S.**ClientIP** | STRING | The IP address assigned to the client that conducted the measurement. |
| result.C2S.**ClientPort** | INTEGER | The port used by the client to conduct the measurement. |
| result.C2S.**UUID** | STRING | The Universally Unique Identifier assigned to the meeasurement. |
| result.C2S.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| result.C2S.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| result.C2S.**MeanThroughputMbps** | FLOAT | The measured rate as calculated by the server. Presented in megabits per second, or Mbit/s, this value is the average of tcp-info snapshots taken at the beginning and end of an ndt5 measurement. Therefore it is identified as "MeanThroughputMbps". |
| result.C2S.**Error** | STRING | Any error message(s) recorded during a measurement. |
| result.**S2C** | RECORD | Metadata for Server-to-Client (download) measurements performed using the ndt5 protocol. |
| result.S2C.**UUID** | STRING | The Universally Unique Identifier assigned to the meeasurement. |
| result.S2C.**ServerIP** | STRING | The IP address assigned to the M-Lab server that conducted the measurement. |
| result.S2C.**ServerPort** | INTEGER | The port used by the server to conduct the measurement. |
| result.S2C.**ClientIP** | STRING | The IP address assigned to the client that conducted the measurement. |
| result.S2C.**ClientPort** | INTEGER | The port used by the client to conduct the measurement. |
| result.S2C.**StartTime** | TIMESTAMP | The date and time when the measurement began in UTC. |
| result.S2C.**EndTime** | TIMESTAMP | The date and time when the measurement ended in UTC. |
| result.S2C.**MeanThroughputMbps** | FLOAT | The measured rate as calculated by the server. Presented in megabits per second, or Mbit/s, this value is the average of tcp-info snapshots taken at the beginning and end of an ndt5 measurement. Therefore it is identified as "MeanThroughputMbps". |
| result.S2C.**MinRTT** | INTEGER | The minimum RTT observed during the download measurement, recorded in milliseconds. |
| result.S2C.**MaxRTT** | INTEGER | The maximum sampled round trip time, recorded in milliseconds. |
| result.S2C.**SumRTT** | INTEGER | The sum of all sampled round trip times, recorded in milliseconds. |
| result.S2C.**CountRTT** | INTEGER | The number of round trip time samples included in S2C.SumRTT, reported in milliseconds. |
| result.S2C.**ClientReportedMbps** | FLOAT | The download rate as calculated by the client, in megabits per second, or Mbit/s. Not all clients report this value. |
| result.S2C.**TCPInfo** | RECORD | The TCPInfo record provides results from the TCP_INFO netlink socket. These are the same values returned to clients at the end of the download (S2C) measurement. |
| result.S2C.TCPInfo.**State** | INTEGER | TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| result.S2C.TCPInfo.**CAState** | INTEGER | Loss recovery state machine. For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| result.S2C.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence. Reset to zero on forward progress.<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered.<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter. Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd.<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| result.S2C.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale. See github.com/m-lab/etl/issues/790 |
| result.S2C.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks. Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| result.S2C.TCPInfo.**RTO** | INTEGER | Retransmission Timeout. Quantized to system jiffies.<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout. Quantized to system jiffies.<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size. Note that this can be smaller than the negotiated MSS for various reasons.<br>Kernel: mss_cache in include/linux/tcp.h |
| result.S2C.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host. Used to trigger delayed ACKs.<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una. Accounting for the Pipe algorithm.<br>Kernel: packets_out in include/linux/tcp.h |
| result.S2C.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks. Accounting for the Pipe algorithm.<br>Kernel: sacked_out in include/linux/tcp.h |
| result.S2C.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics. Accounting for the Pipe algorithm.<br>Kernel: lost_out in include/linux/tcp.h |
| result.S2C.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted. Accounting for the Pipe algorithm.<br>Kernel: retrans_out in include/linux/tcp.h |
| result.S2C.TCPInfo.**Fackets** | INTEGER |  |
| result.S2C.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent. Quantized to jiffies.<br>Kernel: lsndtime in include/linux/tcp.h |
| result.S2C.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (not implemented). Present in TCP_INFO but not elsewhere in the kernel. |
| result.S2C.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received. Quantized to jiffies.<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**LastAckRecv** | INTEGER |  |
| result.S2C.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path.<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| result.S2C.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp. Receiver algorithm to avoid allocating excessive receive buffers.<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| result.S2C.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT). The Linux implementation differs from the standard.<br>Kernel: srtt_us in include/linux/tcp.h |
| result.S2C.TCPInfo.**RTTVar** | INTEGER | RTT variance. The Linux implementation differs from the standard.<br>Kernel: mdev_us in include/linux/tcp.h |
| result.S2C.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| result.S2C.TCPInfo.**SndCwnd** | INTEGER | Congestion Window. Value controlled by the selected congestion control algorithm.<br>Kernel: snd_cwnd in include/linux/tcp.h |
| result.S2C.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS.<br>Kernel: advmss in include/linux/tcp.h |
| result.S2C.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance.<br>Kernel: reordering in include/linux/tcp.h |
| result.S2C.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate.<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| result.S2C.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue. Typically updated by receiver side auto-tuning.<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| result.S2C.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data.<br>Kernel: total_retrans in include/linux/tcp.h |
| result.S2C.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control.<br>Kernel: sk_pacing_rate in include/net/sock.h |
| result.S2C.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp. Set with setsockopt( ..SO_MAX_PACING_RATE.. ).<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| result.S2C.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received.<br>Kernel: bytes_acked in include/linux/tcp.h |
| result.S2C.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received.<br>Kernel: bytes_received in include/linux/tcp.h |
| result.S2C.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted. Includes data and pure ACKs.<br>Kernel: segs_out in include/linux/tcp.h |
| result.S2C.TCPInfo.**SegsIn** | INTEGER | The number of segments received. Includes data and pure ACKs.<br>Kernel: segs_in in include/linux/tcp.h |
| result.S2C.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent.<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| result.S2C.TCPInfo.**MinRTT** | INTEGER | Minimum Round Trip Time. From an older, pre-BBR algorithm.<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| result.S2C.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0).<br>Kernel: data_segs_in in include/net/tcp.h |
| result.S2C.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0).<br>Kernel: data_segs_out in include/net/tcp.h |
| result.S2C.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate.<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| result.S2C.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data. Time when snd.una is not equal to snd.next.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| result.S2C.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| result.S2C.TCPInfo.**SndBufLimited** | INTEGER | Time spent waiting for sender buffer space. This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| result.S2C.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered in include/linux/tcp.h |
| result.S2C.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits. As reported by returning ACKs, used by ECN.<br>Kernel: delivered_ce in include/linux/tcp.h |
| result.S2C.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions).<br>Kernel: bytes_sent |
| result.S2C.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted. May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| result.S2C.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK. Not reported by some Operating Systems.<br>Kernel: dsack_dups |
| result.S2C.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order. Estimates reordering on the return path.<br>Kernel: reord_seen |
| result.S2C.**Error** | STRING | Any error message(s) recorded during a measurement. |
