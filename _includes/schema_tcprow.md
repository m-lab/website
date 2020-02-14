| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| **ParseInfo** | RECORD | Metadata about how the parser processed the measurement. |
| ParseInfo.**TaskFileName** | STRING | GCS URL to the archive containing the test_id for this row. |
| ParseInfo.**ParseTime** | TIMESTAMP | Time that the parser processed this row. |
| ParseInfo.**ParserVersion** | STRING | Version of the parser that processed this row. |
| FinalSnapshot.**TCPInfo** | RECORD | Results from getsockopt(..TCP_INFO..) |
| FinalSnapshot.TCPInfo.**State** | INTEGER | TCP State<br>In MLab data TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| FinalSnapshot.TCPInfo.**CAState** | INTEGER | Loss recovery state machine<br>For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| FinalSnapshot.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence.<br>Reset to zero on forward progress<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter<br>Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations<br> TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| FinalSnapshot.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale<br>See github.com/m-lab/etl/issues/790 |
| FinalSnapshot.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks<br>Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RTO** | INTEGER | Retransmission Timeout<br>Quantized to system jiffies<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout<br>Quantized to system jiffies<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size<br>Note that this can be smaller than the negotiated MSS for various reasons<br>Kernel: mss_cache in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host<br>Used to trigger delayed ACKs<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una<br>Accounting for the Pipe algorithm<br>Kernel: packets_out in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks<br>Accounting for the Pipe algorithm<br>Kernel: sacked_out in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics<br>Accounting for the Pipe algorithm<br>Kernel: lost_out in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted<br>Accounting for the Pipe algorithm<br>Kernel: retrans_out in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**Fackets** | INTEGER | BUG This is gone now????  What field overlays it? |
| FinalSnapshot.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent<br>Quantized to jiffies<br>Kernel: lsndtime in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (Not implemented)<br>Present in TCP_INFO but not elsewhere in the kernel |
| FinalSnapshot.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received<br>Quantized to jiffies<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**LastAckRecv** | INTEGER | Time since last ACK was received<br>Quantized to jiffies<br>Kernel: rcv_tstamp in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| FinalSnapshot.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp<br>Receiver algorithm to avoid allocating excessive receive buffers<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT)<br>The Linux implementation differs from the standard<br>Kernel: srtt_us in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RTTVar** | INTEGER | RTT variance<br>The Linux implementation differs from the standard<br>Kernel: mdev_us in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold<br>Value controlled by the selected congestion control algorithm<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**SndCwnd** | INTEGER | Congestion Window<br>Value controlled by the selected congestion control algorithm<br>Kernel: snd_cwnd in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS<br>Kernel: advmss in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance<br>Kernel: reordering in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue<br>Typically updated by receiver side auto-tuning<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data<br>Kernel: total_retrans in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control<br>Kernel: sk_pacing_rate in include/net/sock.h |
| FinalSnapshot.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp<br>Set with setsockopt( ..SO_MAX_PACING_RATE.. )<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| FinalSnapshot.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received<br>Kernel: bytes_acked in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received<br>Kernel: bytes_received in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted<br>Includes data and pure ACKs<br>Kernel: segs_out in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**SegsIn** | INTEGER | The number of segments received<br>Includes data and pure ACKs<br>Kernel: segs_in in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| FinalSnapshot.TCPInfo.**MinRTT** | INTEGER | Minimum RTT<br>From an older, pre-BBR algorithm<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| FinalSnapshot.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0)<br>Kernel: data_segs_in in include/net/tcp.h |
| FinalSnapshot.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0)<br>Kernel: data_segs_out in include/net/tcp.h |
| FinalSnapshot.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| FinalSnapshot.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data<br>Time when snd.una not equal to snd.next<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| FinalSnapshot.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| FinalSnapshot.TCPInfo.**SndBufLimited** | INTEGER | Time spend waiting for sender buffer space<br>This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| FinalSnapshot.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits<br>As reported by returning ACKs, used by ECN<br>Kernel: delivered in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits<br>As reported by returning ACKs, used by ECN<br>Kernel: delivered_ce in include/linux/tcp.h |
| FinalSnapshot.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions)<br>Kernel: bytes_sent |
| FinalSnapshot.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted<br>May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| FinalSnapshot.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK<br>Not reported by some OS<br>Kernel: dsack_dups |
| FinalSnapshot.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order<br>Estimates reordering on the return path<br>Kernel: reord_seen |
| FinalSnapshot.**MemInfo** | RECORD |  |
| FinalSnapshot.MemInfo.**Rmem** | INTEGER |  |
| FinalSnapshot.MemInfo.**Wmem** | INTEGER |  |
| FinalSnapshot.MemInfo.**Fmem** | INTEGER |  |
| FinalSnapshot.MemInfo.**Tmem** | INTEGER |  |
| FinalSnapshot.**SocketMem** | RECORD |  |
| FinalSnapshot.SocketMem.**RmemAlloc** | INTEGER |  |
| FinalSnapshot.SocketMem.**Rcvbuf** | INTEGER |  |
| FinalSnapshot.SocketMem.**WmemAlloc** | INTEGER |  |
| FinalSnapshot.SocketMem.**Sndbuf** | INTEGER |  |
| FinalSnapshot.SocketMem.**FwdAlloc** | INTEGER |  |
| FinalSnapshot.SocketMem.**WmemQueued** | INTEGER |  |
| FinalSnapshot.SocketMem.**Optmem** | INTEGER |  |
| FinalSnapshot.SocketMem.**Backlog** | INTEGER |  |
| FinalSnapshot.SocketMem.**Drops** | INTEGER |  |
| FinalSnapshot.**VegasInfo** | RECORD |  |
| FinalSnapshot.VegasInfo.**Enabled** | INTEGER |  |
| FinalSnapshot.VegasInfo.**RTTCount** | INTEGER |  |
| FinalSnapshot.VegasInfo.**RTT** | INTEGER |  |
| FinalSnapshot.VegasInfo.**MinRTT** | INTEGER |  |
| FinalSnapshot.**DCTCPInfo** | RECORD |  |
| FinalSnapshot.DCTCPInfo.**Enabled** | INTEGER |  |
| FinalSnapshot.DCTCPInfo.**CEState** | INTEGER |  |
| FinalSnapshot.DCTCPInfo.**Alpha** | INTEGER |  |
| FinalSnapshot.DCTCPInfo.**ABEcn** | INTEGER |  |
| FinalSnapshot.DCTCPInfo.**ABTot** | INTEGER |  |
| FinalSnapshot.**BBRInfo** | RECORD |  |
| FinalSnapshot.BBRInfo.**BW** | INTEGER |  |
| FinalSnapshot.BBRInfo.**MinRTT** | INTEGER |  |
| FinalSnapshot.BBRInfo.**PacingGain** | INTEGER |  |
| FinalSnapshot.BBRInfo.**CwndGain** | INTEGER |  |
| Snapshots.**TCPInfo** | RECORD | Results from getsockopt(..TCP_INFO..) |
| Snapshots.TCPInfo.**State** | INTEGER | TCP State<br>In MLab data TCP state is nominally 1 (Established). Other values reflect transient states having incomplete rows.<br>Kernel: See TCP_ESTABLISHED in include/net/tcp_states.h |
| Snapshots.TCPInfo.**CAState** | INTEGER | Loss recovery state machine<br>For traditional loss based congestion control algorithms, CAState is also used to control window adjustments.<br>Kernel: tcp_set_ca_state in include/net/tcp.h |
| Snapshots.TCPInfo.**Retransmits** | INTEGER | Number of timeouts (RTO based retransmissions) at this sequence.<br>Reset to zero on forward progress<br>Kernel: icsk_retransmits in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**Probes** | INTEGER | Consecutive zero window probes that have gone unanswered<br>Kernel: icsk_probes_out in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**Backoff** | INTEGER | Exponential timeout backoff counter<br>Increment on RTO, reset on successful RTT measurements.<br>Kernel: icsk_backoff in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**Options** | INTEGER | Bit encoded SYN options and other negotiations<br> TIMESTAMPS 0x1; SACK 0x2; WSCALE 0x4; ECN 0x8 - Was negotiated; ECN_SEEN - At least one ECT seen; SYN_DATA - SYN-ACK acknowledged data in SYN sent or rcvd<br>Kernel: TCPI_OPT_TIMESTAMPS in include/uapi/linux/tcp.h |
| Snapshots.TCPInfo.**WScale** | INTEGER | BUG Conflation of SndWScale and RcvWScale<br>See github.com/m-lab/etl/issues/790 |
| Snapshots.TCPInfo.**AppLimited** | INTEGER | Flag indicating that rate measurements reflect non-network bottlenecks<br>Note that even very short application stalls invalidate max_BW measurements.<br>Kernel: rate_app_limited in include/linux/tcp.h |
| Snapshots.TCPInfo.**RTO** | INTEGER | Retransmission Timeout<br>Quantized to system jiffies<br>Kernel: icsk_rto in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**ATO** | INTEGER | Delayed ACK Timeout<br>Quantized to system jiffies<br>Kernel: ato in icsk_ack in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**SndMSS** | INTEGER | Current Maximum Segment Size<br>Note that this can be smaller than the negotiated MSS for various reasons<br>Kernel: mss_cache in include/linux/tcp.h |
| Snapshots.TCPInfo.**RcvMSS** | INTEGER | Maximum observed segment size from the remote host<br>Used to trigger delayed ACKs<br>Kernel: rcv_mss in icsk_ack in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**Unacked** | INTEGER | Number of segments between snd.nxt and snd.una<br>Accounting for the Pipe algorithm<br>Kernel: packets_out in include/linux/tcp.h |
| Snapshots.TCPInfo.**Sacked** | INTEGER | Scoreboard segment marked SACKED by sack blocks<br>Accounting for the Pipe algorithm<br>Kernel: sacked_out in include/linux/tcp.h |
| Snapshots.TCPInfo.**Lost** | INTEGER | Scoreboard segments marked lost by loss detection heuristics<br>Accounting for the Pipe algorithm<br>Kernel: lost_out in include/linux/tcp.h |
| Snapshots.TCPInfo.**Retrans** | INTEGER | Scoreboard segments marked retransmitted<br>Accounting for the Pipe algorithm<br>Kernel: retrans_out in include/linux/tcp.h |
| Snapshots.TCPInfo.**Fackets** | INTEGER | BUG This is gone now????  What field overlays it? |
| Snapshots.TCPInfo.**LastDataSent** | INTEGER | Time since last data segment was sent<br>Quantized to jiffies<br>Kernel: lsndtime in include/linux/tcp.h |
| Snapshots.TCPInfo.**LastAckSent** | INTEGER | Time since last ACK was sent (Not implemented)<br>Present in TCP_INFO but not elsewhere in the kernel |
| Snapshots.TCPInfo.**LastDataRecv** | INTEGER | Time since last data segment was received<br>Quantized to jiffies<br>Kernel: lrcvtime in icsk_ack in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**LastAckRecv** | INTEGER | Time since last ACK was received<br>Quantized to jiffies<br>Kernel: rcv_tstamp in include/linux/tcp.h |
| Snapshots.TCPInfo.**PMTU** | INTEGER | Maximum IP Transmission Unit for this path<br>Kernel: icsk_pmtu_cookie in include/net/inet_connection_sock.h |
| Snapshots.TCPInfo.**RcvSsThresh** | INTEGER | Current Window Clamp<br>Receiver algorithm to avoid allocating excessive receive buffers<br>Kernel: rcv_ssthresh in include/linux/tcp.h |
| Snapshots.TCPInfo.**RTT** | INTEGER | Smoothed Round Trip Time (RTT)<br>The Linux implementation differs from the standard<br>Kernel: srtt_us in include/linux/tcp.h |
| Snapshots.TCPInfo.**RTTVar** | INTEGER | RTT variance<br>The Linux implementation differs from the standard<br>Kernel: mdev_us in include/linux/tcp.h |
| Snapshots.TCPInfo.**SndSsThresh** | INTEGER | Slow Start Threshold<br>Value controlled by the selected congestion control algorithm<br>Kernel: snd_ssthresh in include/linux/tcp.h |
| Snapshots.TCPInfo.**SndCwnd** | INTEGER | Congestion Window<br>Value controlled by the selected congestion control algorithm<br>Kernel: snd_cwnd in include/linux/tcp.h |
| Snapshots.TCPInfo.**AdvMSS** | INTEGER | Advertised MSS<br>Kernel: advmss in include/linux/tcp.h |
| Snapshots.TCPInfo.**Reordering** | INTEGER | Maximum observed reordering distance<br>Kernel: reordering in include/linux/tcp.h |
| Snapshots.TCPInfo.**RcvRTT** | INTEGER | Receiver Side RTT estimate<br>Kernel: rcv_rtt_est.rtt_us in include/linux/tcp.h |
| Snapshots.TCPInfo.**RcvSpace** | INTEGER | Space reserved for the receive queue<br>Typically updated by receiver side auto-tuning<br>Kernel: space in rcvq_space in include/linux/tcp.h |
| Snapshots.TCPInfo.**TotalRetrans** | INTEGER | Total number of segments containing retransmitted data<br>Kernel: total_retrans in include/linux/tcp.h |
| Snapshots.TCPInfo.**PacingRate** | INTEGER | Current Pacing Rate, nominally updated by congestion control<br>Kernel: sk_pacing_rate in include/net/sock.h |
| Snapshots.TCPInfo.**MaxPacingRate** | INTEGER | Settable pacing rate clamp<br>Set with setsockopt( ..SO_MAX_PACING_RATE.. )<br>Kernel: sk_max_pacing_rate in include/net/sock.h |
| Snapshots.TCPInfo.**BytesAcked** | INTEGER | The number of data bytes for which cumulative acknowledgments have been received<br>Kernel: bytes_acked in include/linux/tcp.h |
| Snapshots.TCPInfo.**BytesReceived** | INTEGER | The number of data bytes for which have been received<br>Kernel: bytes_received in include/linux/tcp.h |
| Snapshots.TCPInfo.**SegsOut** | INTEGER | The number of segments transmitted<br>Includes data and pure ACKs<br>Kernel: segs_out in include/linux/tcp.h |
| Snapshots.TCPInfo.**SegsIn** | INTEGER | The number of segments received<br>Includes data and pure ACKs<br>Kernel: segs_in in include/linux/tcp.h |
| Snapshots.TCPInfo.**NotsentBytes** | INTEGER | Number of bytes queued in the send buffer that have not been sent<br>Kernel: tcpi_notsent_bytes() in net/ipv4/tcp.c |
| Snapshots.TCPInfo.**MinRTT** | INTEGER | Minimum RTT<br>From an older, pre-BBR algorithm<br>Kernel: tcp_min_rtt in include/net/tcp.h |
| Snapshots.TCPInfo.**DataSegsIn** | INTEGER | Input segments carrying data (len>0)<br>Kernel: data_segs_in in include/net/tcp.h |
| Snapshots.TCPInfo.**DataSegsOut** | INTEGER | Transmitted segments carrying data (len>0)<br>Kernel: data_segs_out in include/net/tcp.h |
| Snapshots.TCPInfo.**DeliveryRate** | INTEGER | Observed Maximum Delivery Rate<br>Kernel: tcp_compute_delivery_rate() in net/ipv4/tcp.c |
| Snapshots.TCPInfo.**BusyTime** | INTEGER | Time with outstanding (unacknowledged) data<br>Time when snd.una not equal to snd.next<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| Snapshots.TCPInfo.**RWndLimited** | INTEGER | Time spend waiting for receiver window<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| Snapshots.TCPInfo.**SndBufLimited** | INTEGER | Time spend waiting for sender buffer space<br>This only includes the time when TCP transmissions are starved for data, but the application has been stopped because the buffer is full and can not be grown for some reason.<br>Kernel: tcp_get_info_chrono_stats() in net/ipv4/tcp.c |
| Snapshots.TCPInfo.**Delivered** | INTEGER | Data segments delivered to the receiver including retransmits<br>As reported by returning ACKs, used by ECN<br>Kernel: delivered in include/linux/tcp.h |
| Snapshots.TCPInfo.**DeliveredCE** | INTEGER | ECE marked data segments delivered to the receiver including retransmits<br>As reported by returning ACKs, used by ECN<br>Kernel: delivered_ce in include/linux/tcp.h |
| Snapshots.TCPInfo.**BytesSent** | INTEGER | Payload bytes sent (excludes headers, includes retransmissions)<br>Kernel: bytes_sent |
| Snapshots.TCPInfo.**BytesRetrans** | INTEGER | Bytes retransmitted<br>May include headers and new data carried with a retransmission (for thin flows).<br>Kernel: bytes_retrans |
| Snapshots.TCPInfo.**DSackDups** | INTEGER | Duplicate segments reported by DSACK<br>Not reported by some OS<br>Kernel: dsack_dups |
| Snapshots.TCPInfo.**ReordSeen** | INTEGER | Received ACKs that were out of order<br>Estimates reordering on the return path<br>Kernel: reord_seen |
| Snapshots.**MemInfo** | RECORD |  |
| Snapshots.MemInfo.**Rmem** | INTEGER |  |
| Snapshots.MemInfo.**Wmem** | INTEGER |  |
| Snapshots.MemInfo.**Fmem** | INTEGER |  |
| Snapshots.MemInfo.**Tmem** | INTEGER |  |
| Snapshots.**SocketMem** | RECORD |  |
| Snapshots.SocketMem.**RmemAlloc** | INTEGER |  |
| Snapshots.SocketMem.**Rcvbuf** | INTEGER |  |
| Snapshots.SocketMem.**WmemAlloc** | INTEGER |  |
| Snapshots.SocketMem.**Sndbuf** | INTEGER |  |
| Snapshots.SocketMem.**FwdAlloc** | INTEGER |  |
| Snapshots.SocketMem.**WmemQueued** | INTEGER |  |
| Snapshots.SocketMem.**Optmem** | INTEGER |  |
| Snapshots.SocketMem.**Backlog** | INTEGER |  |
| Snapshots.SocketMem.**Drops** | INTEGER |  |
| Snapshots.**VegasInfo** | RECORD |  |
| Snapshots.VegasInfo.**Enabled** | INTEGER |  |
| Snapshots.VegasInfo.**RTTCount** | INTEGER |  |
| Snapshots.VegasInfo.**RTT** | INTEGER |  |
| Snapshots.VegasInfo.**MinRTT** | INTEGER |  |
| Snapshots.**DCTCPInfo** | RECORD |  |
| Snapshots.DCTCPInfo.**Enabled** | INTEGER |  |
| Snapshots.DCTCPInfo.**CEState** | INTEGER |  |
| Snapshots.DCTCPInfo.**Alpha** | INTEGER |  |
| Snapshots.DCTCPInfo.**ABEcn** | INTEGER |  |
| Snapshots.DCTCPInfo.**ABTot** | INTEGER |  |
| Snapshots.**BBRInfo** | RECORD |  |
| Snapshots.BBRInfo.**BW** | INTEGER |  |
| Snapshots.BBRInfo.**MinRTT** | INTEGER |  |
| Snapshots.BBRInfo.**PacingGain** | INTEGER |  |
| Snapshots.BBRInfo.**CwndGain** | INTEGER |  |
