---
layout: redirect
title: "Traceroute - BigQuery Schema"
permalink: /data/docs/bq/schema/traceroute/
breadcrumb: data
redirect_to: "https://measurementlab.net/tests/traceroute/#traceroute-schema"
---

# Traceroute BigQuery Schema

Paris Traceroute collects network path information for every connection used by the measurement tests running on the M-Lab platform. In addition to the route and network topology data provided by regular traceroute, Paris Traceroute detects load balancing, noting when a transmission is split between two paths. Like SideStream, Paris Traceroute runs when another M-Lab test makes a connection with the platform.

## Traceroute BigQuery Views

* [measurement-lab.aggregate.traceroute](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=aggregate&t=traceroute&page=table){:target="_blank"}

## Traceroute Schema - measurement-lab.aggregate.traceroute

<div class="table-responsive" markdown="1">

| Field name                                           |     Type     |  Description                              |
| :----------------------------------------------------|:------------:|:------------------------------------------|
| `partition_date`                                    | `date`  |  The day (in UTC) in which the data was loaded. |
| `test_id`                                           |  `string`    |  ID of the test. It represents the Google Cloud Storage path, M-Lab server, and filename of the log that contains the data generated during the test (e.g. `2016/11/04/mlab1.acc02/20161104T01:44:19Z-191.255.241.135-55746-196.49.14.203-58132.paris.gz`). |
| `task_filename`                                      | `string`     |  The raw data file in Google Cloud Storage from which the test row was parsed. |
| `parse_time`                                         | `timestamp`  |  The timestamp of when test data was parsed into BigQuery from Google Cloud Storage. |
| `parser_version`    | `string` | A link to the tagged version of the M-Lab ETL parser which processed the test row. |
| `project`                              | `integer` | |
| `log_time`  | `integer` |                                        |
| `type`                                | `integer` |                                        |
| `connection_spec` | `record` |                                        |
| `connection_spec.client_af` | `integer` |                                        |
| `connection_spec.client_application` | `string` |                                        |
| `connection_spec.client_browser` | `string` |                                        |
| `connection_spec.client_hostname`  | `string` |                                        |
| `connection_spec.client_ip` | `string` |                                        |
| `connection_spec.client_kernel_version` | `string` |                                        |
| `connection_spec.client_os` | `string` |                                        |
| `connection_spec.client_version` | `string` |                                        |
| `connection_spec.data_direction` | `integer` |                                        |
| `connection_spec.server_af` | `integer` |                                        |
| `connection_spec.server_hostname` | `string` |                                        |
| `connection_spec.server_ip` | `string` |                                        |
| `connection_spec.server_kernel_version` | `string` |                                        |
| `connection_spec.client_geolocation` | `record` |                                        |
| `connection_spec.client_geolocation.area_code` | `integer` |                                        |
| `connection_spec.client_geolocation.city` | `string` |                                        |
| `connection_spec.client_geolocation.continent_code` | `string` |                                       |
| `connection_spec.client_geolocation.country_code` | `string` |                                        |
| `connection_spec.client_geolocation.country_code3` | `string` |                                        |
| `connection_spec.client_geolocation.country_name` | `string` |                                        |
| `connection_spec.client_geolocation.latitude` | `float` |                                        |
| `connection_spec.client_geolocation.longitude` | `float` |                                        |
| `connection_spec.client_geolocation.metro_code` | `integer` |                                        |
| `connection_spec.client_geolocation.postal_code` | `string` |                                        |
| `connection_spec.client_geolocation.region` | `string` |                                        |
| `connection_spec.server_geolocation` | `record` |                                        |
| `connection_spec.server_geolocation.area_code` | `integer` |                                        |
| `connection_spec.server_geolocation.city` | `string` |                                        |
| `connection_spec.server_geolocation.continent_code` | `string` |                                        |
| `connection_spec.server_geolocation.country_code` | `string` |                                        |
| `connection_spec.server_geolocation.country_code3` | `string` |                                        |
| `connection_spec.server_geolocation.country_name` | `string` |                                        |
| `connection_spec.server_geolocation.latitude` | `float` |                                        |
| `connection_spec.server_geolocation.longitude` | `float` |                                        |
| `connection_spec.server_geolocation.metro_code` | `integer` |                                        |
| `connection_spec.server_geolocation.postal_code` | `string` |                                        |
| `connection_spec.server_geolocation.region` | `string` |                                        |
| `paris_traceroute_hop` | `record` |                                        |
| `paris_traceroute_hop.protocol` | `string` |                                        |
| `paris_traceroute_hop.src_ip` | `string` |                                        |
| `paris_traceroute_hop.src_af` | `integer` |<br>AF_UNSPEC = `0`<br>AF_INET (IPv4) = `2`<br>AF_INET6 (IPv6) = `10`             |
| `paris_traceroute_hop.src_hostname` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation` | `record` |                                        |
| `paris_traceroute_hop.src_geolocation.area_code` | `integer` |                                        |
| `paris_traceroute_hop.src_geolocation.city` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.continent_code` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.country_code` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.country_code3` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.country_name` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.latitude` | `float` |                                        |
| `paris_traceroute_hop.src_geolocation.longitude` | `float` |                                        |
| `paris_traceroute_hop.src_geolocation.metro_code` | `integer` |                                        |
| `paris_traceroute_hop.src_geolocation.postal_code` | `string` |                                        |
| `paris_traceroute_hop.src_geolocation.region` | `string` |                                        |
| `paris_traceroute_hop.dest_ip` | `string` |                                        |
| `paris_traceroute_hop.dest_af` | `integer` | <br>AF_UNSPEC = `0`<br>AF_INET (IPv4) = `2`<br>AF_INET6 (IPv6) = `10`         |
| `paris_traceroute_hop.dest_hostname` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation` | `record` |                                        |
| `paris_traceroute_hop.dest_geolocation.area_code` | `integer` |                                        |
| `paris_traceroute_hop.dest_geolocation.continent_code` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.country_code` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.country_code3` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.country_name` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.latitude` | `float` |                                        |
| `paris_traceroute_hop.dest_geolocation.longitude` | `float` |                                        |
| `paris_traceroute_hop.dest_geolocation.metro_code` | `integer` |                                        |
| `paris_traceroute_hop.dest_geolocation.postal_code` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.region` | `string` |                                        |
| `paris_traceroute_hop.dest_geolocation.rtt` | `float (repeated)` |                                        |

</div>
