---
layout: page
title: "BigQuery QuickStart"
permalink: /data/bq/quickstart/
breadcrumb: data
---

## BigQuery QuickStart - Using M-Lab Data

To search M-Lab's data using BigQuery, follow these quick steps to get started:

### Configure Google Cloud Platform Project

Create a project and enable billing in [Google Cloud Platform Console](https://console.developers.google.com/) (or use an existing project with billing enabled)

You will **not** be charged for queries against tables in the M-Lab dataset. M-Lab is committed to open data and offering our data free of charge is part of that commitment.

### Configure M-Lab Table Access

Join the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss) with the same account you used to create your Google Cloud Platform project. Joining this group whitelists your account so that you can make queries against M-Lab's BigQuery tables.

### Using a Service Account

If you are querying BigQuery via a service account (e.g. @developer.gserviceaccount.com) that cannot join the M-Lab discussion group, please email [support@measurementlab.net](mailto:support@measurementlab.net) so that we can provision your account manually.

## BigQuery Web Interface

BigQuery offers a web interface so that you can query M-Lab BigQuery data from your browser. To query from the web interface, go to:

[https://bigquery.cloud.google.com](https://bigquery.cloud.google.com)

Try the following query as an example:

~~~sql
-- Calculate how many NDT tests were performed per day since M-Lab epoch
SELECT
  STRFTIME_UTC_USEC(web100_log_entry.log_time * 1000000, '%Y-%m-%d') AS day,
    COUNT(*) AS num_tests
  FROM
    plx.google:m_lab.ndt.all
  GROUP BY
    day
  ORDER BY
    day ASC;
~~~


## BigQuery tools in the Google Cloud SDK

You may also run queries at the command line using BigQuery tools in the Google Cloud SDK.

Download and Install [Google’s Cloud SDK](https://cloud.google.com/sdk/) using the Installation and Quick Start instructions for your operating system.

After installation, authentication and restarting your terminal, BigQuery’s command line tools are available in your shell. 

Try the following query as an example:

~~~sql
$ bq query --format=csv "
-- Calculate how many NDT tests were performed per day since M-Lab epoch
SELECT
  STRFTIME_UTC_USEC(web100_log_entry.log_time * 1000000, '%Y-%m-%d') AS day,
  COUNT(*) AS num_tests
FROM
  plx.google:m_lab.ndt.all
GROUP BY
  day
ORDER BY
  day ASC"
~~~

If you are new to BigQuery, we suggest that you next consult the resources below to get started:

-   [Google’s BigQuery documentation](https://cloud.google.com/bigquery/what-is-bigquery)
-   [Google's bq Command-Line Tool Quickstart documentation](https://cloud.google.com/bigquery/bq-command-line-tool-quickstart)

## BigQuery API

Given the resources and expertise, you can develop your own application that uses M-Lab data. To learn more about building your own custom application in the [Google Cloud Platform documentation](https://cloud.google.com/docs/).

**Telescope** is an example of an application that M-Lab developed which uses the BigQuery Python API to download M-Lab data.

[Telescope is available from M-Lab on Github](https://github.com/m-lab/telescope).

## Further Reading

-   [BigQuery Examples](/data/bq/examples)
-   [BigQuery Schema](/data/bq/schema)