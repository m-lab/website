---
layout: blog
title: "Naming BQ Datasets after M-Lab Measurement Services & Data Types"
author: "Stephen Soltesz"
date: 2019-05-02
breadcrumb: blog
categories:
  - data
  - bigquery
  - schema
---

Earlier this year, M-Lab published [blog post outlining our new ETL pipeline and transition to new BigQuery tables]({{ site.baseurl }}/blog/etl-pipeline/). That post also outlined where we’ve saved our datasets, tables, and views in BigQuery historically, and recommended tables and views for most researchers to use. At that time we also implemented semantic versioning to new dataset and table releases at that time, and began publishing BigQuery views that unify our NDT data across multiple schema iterations and migrations.<!--more-->

Today, the `measurement-lab` BigQuery project contains 22 datasets, with many tables and views within. While some are documented, others are not, the list can certainly be simplified. Now in April 2019, our development team is beginning work toward a new release and in the process will begin naming our BigQuery datasets and views after M-Lab measurement services  and data types. We expect this change to simplify the list of our public datasets for BigQuery users but will initially require some changes to queries within your applications or workflows.

Going forward, datasets in the `measurement-lab` project will be named for each _measurement service_, and views within each dataset will contain data relevant to that service.

Below is a summary of upcoming changes:

* For each measurement service (ndt, traceroute, sidestream, utilization), we will create a corresponding BigQuery dataset and view in the `measurement-lab` project that are managed by our [data reprocessing service (a.k.a. Gardener)](https://github.com/m-lab/etl-gardener).
* The current views for release candidates, versioned intermediate tables, and releases will remain unchanged as we migrate them to the per-measurement service dataset.
* LegacySQL support will be deprecated. We may keep a single LegacySQL view of the legacy data, but only support StandardSQL in any new views of the comprehensive reprocessed data.
* We will no longer offer any views that combine legacy tables and recently parsed data.

The table below describes the new datasets and views:

<table>
  <tr>
    <th>Measurement Service</th>
    <th>Old Datasets and Views</th>
    <th>New Datasets and Views</th>
  </tr>
  <tr>
    <td>NDT</td>
    <td>
      <ul>
        <li>N/A</li>
        <li>measurement-lab.release.ndt_all</li>
        <li>measurement-lab.release.ndt_downloads</li>
        <li>measurement-lab.release.ndt_uploads</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>measurement-lab.ndt.web100</li>
        <li>measurement-lab.ndt.recommended</li>
        <li>measurement-lab.ndt.downloads</li>
        <li>measurement-lab.ndt.uploads</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Paris Traceroute</td>
    <td>
      <ul>
        <li>measurement-lab.base_tables.traceroute</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>measurement-lab.aggregate.traceroute</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Sidestream</td>
    <td>
      <ul>
        <li>measurement-lab.base_tables.sidestream</li>
      </ul>
    </td>
    <td>
      <ul>
        <li>measurement-lab.sidestream.web100</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>Switch</td>
    <td>
      <ul>
        <li>measurement-lab.base_tables.switch</li>
      </ul>
    </td>
    <td>
       <ul>
         <li>measurement-lab.utilization.switch</li>
       </ul>
    </td>
  </tr>
</table>

## Detail of Upcoming Changes to BigQuery Datasets

For each M-Lab measurement service that uses the ETL pipeline to publish to BigQuery, we will create a BigQuery dataset in the `measurement-lab` project. Today this includes `ndt`, `sidestream`, and `utilization`. After this change is implemented, within each dataset, BigQuery views will provide access to the corresponding reprocessed tables.

Historically, Paris Traceroute data was collected for every measurement service. So for this data type, we will create a view in the `aggregate` dataset. Over the next year, we will restructure the traceroute schema to support reprocessing using the [Gardener service](https://github.com/m-lab/etl-gardener), and to unify the schema for historical and future data collection by [Scamper](https://www.caida.org/tools/measurement/scamper/) So, while there is data available now, consider the schema an “alpha” release that will change.

The [current release convention]({{ site.baseurl }}/blog/etl-pipeline/#new-etl-pipeline-and-transition-to-new-bigquery-tables) supports a hierarchy of releases, release candidates “rc”, versioned release candidates, and versioned intermediate views. For now, these will remain unchanged until June 1, 2019. However, they will cease being updated with new data starting May 6, 2019. As we validate the output from [Gardener](https://github.com/m-lab/etl-gardener), and retire the contents of legacy tables, new releases and release candidates views will be migrated to the corresponding dataset.

As we upgrade M-Lab nodes to the new software stack, some measurement services will save new formats and new data types. For example, all measurement services will be deployed with the [tcpinfo](https://github.com/m-lab/tcp-info) sidecar. The tcpinfo data type will be published with the measurement service dataset in BigQuery. For example:

* `measurement-lab.ndt.summary` - NDT measurement summary metadata
* `measurement-lab.ndt.tcpinfo` - TCP_INFO snapshots of performance measurement
* `measurement-lab.ndt.traceroute` - Scamper collected traceroute

Let us know if you have any questions at [support@measurementlab.net](mailto:support@measuermentlab.net).
