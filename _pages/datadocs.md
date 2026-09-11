---
layout: page
title: Data Docs
permalink: /data/docs/
breadcrumb: data
---

# M-Lab Data Documentation

Here we document how to work with M-Lab data, covering some of the most common topics, from basic to advanced use. If you have questions beyond what is covered here, please [contact us](mailto:support@measurementlab.net).

## Querying BigQuery (Basic)

The links below provide the basics of querying M-Lab data.

* [BigQuery QuickStart]({{ site.baseurl }}/data/docs/bq/quickstart/)
* [M-Lab Dataset Schemas and Changelog]({{ site.baseurl }}/data/docs/bq/schema/)

## Querying BigQuery (Advanced)

For researchers and others interested in advanced querying techniques, we provide some guidance on some common use cases in the advanced BigQuery topics below.

### Accessing Raw Data via GCS

Advanced users may also be interested in obtaining raw M-Lab test data for detailed analyses. For example, TCP packet captures are conducted for each NDT test, and are only available in M-Lab's raw data archives.

* [M-Lab Data in Google Cloud Storage]({{ site.baseurl }}/data/docs/gcs/)

### Querying the DISCO Switch Dataset

* [DISCO dataset]({{ site.baseurl }}/blog/disco-dataset/)

## Derived Datasets

Datasets M-Lab computes from its own measurements, rather than collecting directly.

* [HERMES]({{ site.baseurl }}/tests/hermes/) - detects statistically significant Internet performance degradations in groups of NDT measurements and identifies the network segments associated with them.
  * [Access and QuickStart]({{ site.baseurl }}/tests/hermes/quickstart/)
  * [Table schema]({{ site.baseurl }}/tests/hermes/schema/)
  * [Example queries and tutorials]({{ site.baseurl }}/tests/hermes/examples/)
  * [Methodology]({{ site.baseurl }}/tests/hermes/methodology/)

### Analyses

* [Discard Analysis 2018]({{ site.baseurl }}/data/docs/analysis/discard-analysis-2018/)

* [Exploring the African Internet]({{ site.baseurl }}/data/docs/analysis/exploring-african-internet/)
