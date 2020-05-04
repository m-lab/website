---
layout: blog
title: "NDT Unified Views Now Published"
author: "Chris Ritzo"
date: 2020-05-04
breadcrumb: blog
categories:
  - ndt
  - bigquery
  - data
---

In November 2019, M-Lab reached a milestone after upgrading the operating system, virtualization, and TCP measurement instrumentation running on our servers worldwide. The upgrade also included a completely re-written ndt-server, providing backward compatibility to old clients, as well as the new ndt7 protocol. With the change in system architecture and the changes to ndt-server, our team wanted to provide unified, longitudinal views of the data in BigQuery that embed the provenance for all tests.<!--more-->

## NDT “Helpful Views” and "Raw Views" in BigQuery

In April 2020, the team published a preliminary release of “unified views” for NDT:

* [measurement-lab.ndt.unified_downloads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}
* [measurement-lab.ndt.unified_uploads](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_uploads&page=table){:target="_blank"}

We refer to these as “Helpful Views”, since they present the most commonly used fields in NDT data, and only show tests that meet our current, best understanding of test completeness:

* At least 8 KB of data was transferred
* Test duration was between 9 and 60 seconds
* Congestion was detected
* Tests with NULL results are excluded
* Tests from M-Lab Operations and Management infrastructure are excluded

Helpful BigQuery Views are intended to support the majority of data users, who wish to understand what NDT data measured in a given locale and time period. Most people will want to use the NDT unified views, since they provide ground truth from NDT’s perspective on the service quality as measured by NDT.

Archived measurement data from the M-Lab fleet is parsed directly into the "Raw Views". Raw views are a faithful representation of the data as originally collected, with minimal to no translations before insertion into BigQuery. Raw views are always the foundation to helpful views. Unlike helpful views, raw views also include aborted or failed tests, measurements that exhibit non-network bottlenecks, and M-Lab's own test traffic used to manage the fleet. Because raw views include rows filtered by the helpful views, they may be less helpful for most users. However, for experiment authors and researchers interested in all testing conditions and results, raw views are the authoritative source for all recorded and parsed measurement data.

We provide the raw views so that researchers can:

* understand what has been excluded from the helpful views;
* prototype new columns or algorithms that might be promoted into the helpful views;
* and understand the provenance of all of our data

## Most Commonly Used Fields Provided in NDT Unified Views

While NDT does collect very fine grained fields associated with each TCP connection, the vast majority of people querying our data select a small subset of those fields. The NDT unified views provide only the most commonly used fields. You can review the [full schema for NDT unified views](https://console.cloud.google.com/bigquery?project=measurement-lab&p=measurement-lab&d=ndt&t=unified_downloads&page=table){:target="_blank"}, which consist of the test metrics: Mean Throughput, Minimum Round Trip Time, and Loss Rate; test metadata fields like Client IP address, Test Date, Test Time, and others; and the geographic annotation fields for each test.

For researchers interested in studying not just completed tests, but all types of test conditions-- tests that failed, specific TCP window sizes, etc.-- M-Lab still saves all NDT test data and supports your research with it using the Faithful Views. We also plan to provide additional Helpful Views for advanced users.

## New Fields Provided in NDT Unified Views

Some new fields are available in the unified views that are worth mentioning:

* **Client & Server ASNumber**
  * Provides the [Autonomous System Number](https://en.wikipedia.org/wiki/Autonomous_system_(Internet)){:target="_blank"} associated with the client’s connection, and the ASN associated with the connection used by the M-Lab server which conducted the measurement. This field is useful to identify the provider associated with the test IP address.
* **UUID**
  * Provides a Universally Unique Identifier for each test. This field is useful to match or join results from Raw Views that may not be in the Helpful Views.
* **Congestion Control**
  * Identifies the TCP congestion control algorithm used for the test. This field is useful in establishing provenance of the test with respect to the instrumentation and protocol used.

## Long Term Support

Helpful Views will allow M-Lab to provide a better long-term supported schema for the most widely used parts of the NDT dataset. We intend to make incremental changes to the unified views schemas, but to ensure they are stable for use by researchers and also applications that integrate our data. Early testing of the NDT unified views has helped identify a couple changes needed before their first official release. For example, the annotated geographic fields will be standardized to use camel case rather than the current mix of field naming conventions. Future updates to these schemas will be tested to confirm that no breaking changes are added without proper notification.  Names with an underscore prefix ("_") are provisional, and likely to change in the future.  Our team is in the process of establishing a quality control check that includes confirming that schema changes don’t break the queries used by your applications. If you’d like us to include your query in our quality control checks, please email us at support@measurementlab.net
