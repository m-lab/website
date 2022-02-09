---
layout: blog
title: "Migration to the v2 Data Pipeline"
author: "Stephen Soltesz"
date: 2022-02-10
breadcrumb: blog
categories:
  - pipeline
  - ndt
  - traceroute
  - data
---

If you typically use the `measurement-lab.ndt.unified_uploads` or
`measurement-lab.ndt.unified_downloads` views, then nothing will change. We are
updating the ndt5, switch, and tcpinfo schemas, removing obsolete views, and
renaming some views in preparation for improving ease of use and documentation.
<!--more-->

## Migration to the v2 Data Pipeline

Since completing the tcpinfo [platform migration][platform] in 2020, the first
generation [v1 data pipeline][v1-pipeline] has continued to process datatypes
collected from the web100 platform *and* many datatypes from the tcpinfo
platform. Datatypes processed by the v1 data pipeline have "v1 schemas". These
schemas typically use ad-hoc naming conventions that may be inconsistent between
datatypes making use and documentation onerous. As well, these datatypes have had
long standing data quality issues, such as accurate server annotations.

Now we are migrating all datatypes collected from the tcpinfo platform to the v2
data pipeline. The v2 data pipeline provides uniform naming conventions,
[standard BigQuery column][standard-columns] names, general data quality
improvements (e.g. fixing server annotations), and allows us to easily generate
reference schema documentation for the website (e.g. like [ndt7][ndt7]). All
data types processed by the v2 data pipeline will adopt the "v2 schema" naming
conventions.

Some datatypes are already processed by the v2 data pipeline, such as ndt7,
annotation, scamper1 (i.e. traceroute), and a pcap index.

This announcement heralds a set of changes coming in the next few weeks and
months that will update datatypes to the v2 data pipeline (ndt5, traceroute,
tcpinfo, switch) or clearly label them as "legacy" schemas from the v1 data
pipeline (paris-traceroute, ndt web100, sidestream).

Users of the `measurement-lab.ndt.unified_uploads` and
`measurement-lab.ndt.unified_downloads` views should experience no changes.

## Coming Changes

The views in the `measurement-lab.library` dataset are now obsolete. Each can be
replaced by the equivalent view with the same datatype and direction suffix from
the `ndt_intermediate` dataset.

|	To be removed	 |	 Use instead  |
| -------------- | -------------- |
| `library.ndt_unified_ndt5_downloads`   | `ndt_intermediate.extended_ndt5_downloads` |
| `library.ndt_unified_ndt5_uploads`	   | `ndt_intermediate.extended_ndt5_uploads` |
| `library.ndt_unified_ndt7_downloads`   | `ndt_intermediate.extended_ndt7_downloads` |
| `library.ndt_unified_ndt7_uploads`     | `ndt_intermediate.extended_ndt7_uploads` |
| `library.ndt_unified_web100_downloads` | `ndt_intermediate.extended_web100_downloads` |
| `library.ndt_unified_web100_uploads`   | `ndt_intermediate.extended_web100_uploads` |

Views in the `measurement-lab.ndt` dataset that use v1 schemas must be removed
before we replace them with views using v2 schemas. This should be minimally
disruptive because these v1 views are redundant to identical views that are
already present in the `measurement-lab.ndt_raw` dataset.

| To be removed | Use instead |
| --------------| ----------- |
| `ndt.traceroute` (v1)	| `ndt_raw.traceroute_legacy` |
| `ndt.ndt5` (v1)       | `ndt_raw.ndt5_legacy` |
| `ndt.tcpinfo` (v1)    | `ndt_raw.tcpinfo_legacy` |
| `ndt.web100` (v1)     | `ndt_raw.web100_legacy` |

The following views that use v1 schemas will be renamed with a "_legacy" suffix
to be consistent with other v1 schema views. As well, this allows a view using a
v2 schema to be deployed later without causing a conflict.

|	To be renamed	| New name |
| ------------- | -------- |
| `sidestream.web100` (v1)  | `sidestream.web100_legacy` |
| `utilization.switch` (v1) | `utilization.switch_legacy`|

The traceroute datatypes have historically been combined into a single table.
Going forward they will be separated and named by their underlying format and
tool of origin. So, the following changes are planned.

|	To be removed	| To be replaced by |
|	-------------	| ----------------- |
|	`aggregate.traceroute` | `traceroute.scamper1` |
|					               | `traceroute.paris1_legacy` |

Once the above changes are complete, they will be followed by deployment of the
updated v2 data pipeline parsers for the switch, ndt5 and tcpinfo datatypes.

Once these changes are complete, we will be updating the website with up-to-date
schema documentation for these raw datatypes using the v2, standard column
naming conventions, including:

* ndt7
* annotation
* ndt5
* switch
* scamper1
* tcpinfo
* pcap

[platform]: https://www.measurementlab.net/blog/the-platform-has-landed
[v1-pipeline]: https://www.measurementlab.net/blog/etl-pipeline
[standard-columns]: https://www.measurementlab.net/blog/long-term-schema-support-standard-columns/
[ndt7]: https://www.measurementlab.net/tests/ndt/ndt7/
