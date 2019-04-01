---
layout: blog
title: "M-Lab Visualization Site Update"
author: "Georgia Bullen, Chris Ritzo"
date: 2019-04-01
breadcrumb: blog
categories:
  - data
  - data-analysis
  - visualization
---

# Visualization Site Update

If you’ve clicked on the [Visualizations]({{ site.baseurl }}/visualizations) page on our website in the last year or so, and tried to find recent data for any location, you’ve likely been disappointed.

**TLDR; - Our visualization site is BACK! Continue reading to learn more..**

## Background

When we launched our [visualization site]({{ site.baseurl }}/blog/new-dataviz-site) in March 2017, our data was made much more accessible, helping us support more of and expand the M-Lab community. In May 2017, [we transitioned to a new backend pipeline]({{ site.baseurl }})/transitioning-data-pipeline/) which allowed us to deal with an ever increasing volume of data, as well as improve our latency for publishing our raw data and BigQuery data to ~1 day. Prior to May 11, 2017, our annotator code was not public, and was embedded within a data processing pipeline that pulled test data from our servers and packaged it into the [raw and queryable formats]({{ site.baseurl }}/data/) that we publish. The annotation code at that time used the [FIPS 10-4 codes](https://en.wikipedia.org/wiki/FIPS_10-4){:target=”_blank”} for this field, selecting location using IP geolocation.

M-Lab has used BigQuery since before it was a Google product or service, and early in our history our team members working at Google to leveraged internal APIs and tools to pipeline our data into accessible locations. Our pipeline needed an upgrade and was one of the only pieces of M-Lab’s code that wasn’t open source. This also allowed our team to separate the data processing functions from the data annotations, and developed a much more scalable set of services in the end.

## Scalable Annotation Service

The new annotation [annotation service](https://github.com/m-lab/annotation-service){:target=”_blank”} provided a way for M-Lab to post-process test data, adding annotation fields, for example: continent, country, region, city, latitude, and longitude, are added based on IP address geo-location. This was an awesome new feature since adding new annotators would be easily added in the future. But being a new service there have been some bugs which in this case affected the visualization website display.

The new annotation service initially used ISO 3166-2 subdivision names instead of FIPS 10-4 region codes for the field, `connection_spec.client_geolocation.region`, introducing inconsistencies in this field’s contents. Because the visualization site code pulls in our data from BigQuery, then computes aggregated statistics by location, different region codes for the same place began causing some issues with the display of those numbers for some locations. The query and abbreviated result below illustrates the difference for the United States:

~~~sql
SELECT partition_date, connection_spec.client_geolocation.region FROM `measurement-lab.release.ndt_all`
WHERE connection_spec.client_geolocation.country_code = 'US'
AND partition_date BETWEEN '2017-05-10' AND '2017-05-11'
GROUP BY partition_date, connection_spec.client_geolocation.region
ORDER BY partition_date, connection_spec.client_geolocation.region

# Results:
partition_date  region
2017-05-10      AE
2017-05-10      AK
2017-05-10      AL
2017-05-10      AR
2017-05-10      AZ
…
2017-05-11      Alabama
2017-05-11      Alaska
2017-05-11      Arizona
2017-05-11      Arkansas
~~~

The difference in annotation for this field was more pronounced when examining other countries, as shown in the query and annotated results below:

~~~sql
SELECT partition_date, connection_spec.client_geolocation.region FROM `measurement-lab.release.ndt_all`
WHERE connection_spec.client_geolocation.country_code = 'GB'
AND partition_date BETWEEN '2017-05-10' AND '2017-05-12'
GROUP BY partition_date, connection_spec.client_geolocation.region
ORDER BY partition_date, connection_spec.client_geolocation.region

# Result:
partition_date  region
2017-05-10      A1
2017-05-10      A2
2017-05-10      A3
# + 195 more FIPS 10-4 regions in Great Britain
...
2017-05-11      England
2017-05-11      Northern Ireland
2017-05-11      Scotland
2017-05-11      Wales
~~~

## Updates to the Annotation Service

We needed to migrate to ISO 3166 codes since FIPS 10-4 was being deprecated by Maxmind, but the initial annotation change introduced complexity for downstream data clients like our visualization site. We were faced with the choice of updating the visualization site code to aggregate using region code and region name, as well as attempting to map FIPS 10-4 codes with ISO 3166 codes; or correcting the raw data annotations. Since the better long-term decision was to correct the raw data annotations, we decided to go with the second option, since we needed to add support for both the [ISO 3166-2 region codes](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2){:target=”_blank”} as well as the ISO 3166-2 subdivision codes for each country. This work has been ongoing since that time, and is still in progress.

Since 2018-03-23, `connection_spec.client_geolocation.region` has been annotated with the ISO 3166 region code, as shown in the results below:

~~~sql
SELECT partition_date, connection_spec.client_geolocation.region FROM `measurement-lab.release.ndt_all`
WHERE connection_spec.client_geolocation.country_code = 'GB'
AND partition_date BETWEEN '2017-05-10' AND '2019-01-01'
GROUP BY partition_date, connection_spec.client_geolocation.region
ORDER BY partition_date, connection_spec.client_geolocation.region

# Results:
...
2018-03-22  England
2018-03-22  Northern Ireland
2018-03-22  Scotland
2018-03-22  Wales
2018-03-23  ENG
2018-03-23  NIR
2018-03-23  SCT
2018-03-23  WLS
...
~~~

## “Gardener” Service to Automate Data Re-processing

As part of this effort, we realized it’d be better to have a system that would allow us to be regularly improving our parsed data. So in March 2018, our team began developing an additional service called [etl-gardener](https://github.com/m-lab/etl-gardener){:target=”_blank”} as a general purpose service to reprocess past data, allowing us the ability to correct for issues like the case discussed above or add new meta-data in the event of a schema change or new information is added. The gardener service performs a variety of tasks, including correcting or adding missing annotations, some quality control measures, deduplication in the event that a measurement was added to the dataset more than once, etc. With Gardener, when we make changes to the annotation service for newly collected data, the service works in the background to apply the annotation changes or additions to past data. We’re hopeful that the addition of ISO 3166 subdivision annotations for `connection_spec.client_geolocation.region` can be added to the annotation service sometime this year. If you are interested in helping to make that happen, check out the code, and feel free to send us a pull-request. If you have questions, reach out to us via support@measurementlab.net or by contributing issues on the Github repository.

## New ASN Annotation and Visualization Site Update

In February 2019, we contracted to [Aliz](https://aliz.ai){:target=”_blank”}, a Google Cloud service partner firm, to make several updates to the visualization website and annotation service:

* Upgrading the visualization pipelines to the latest version of the Dataflow API
* Expanding the annotation service to include Autonomous System Numbers (ASN) annotations based on the [CAIDA Route Views dataset](https://www.caida.org/data/routing/routeviews-prefix2as.xml){:target=”_blank”}
* Updating the M-Lab etl-pipeline to call the newly created ASN annotator and add the returned information to a new field in each table row.
* Simplifying the pipeline that powers the visualization site by using the new ASN and geo annotations available in the tables.

We’re excited about these changes for a number of reasons. Fixing access to the visualization site will allow us to return to better supporting our community in a more readily accessible way. The visualization site is incredibly powerful for M-Lab data users who aren’t as comfortable using tools like BigQuery to pull the subset of data that they are interested in working with for their research or analysis, or for users that want to access aggregates of [data from the API](http://data-api.measurementlab.net/){:target=”_blank”}. For many other community members, having the visualization site up to date will restore much needed access to the M-Lab data.

Perhaps more exciting is the addition of the new ASN annotation, leveraging [CAIDA’s historical Route Views dataset](https://www.caida.org/data/routing/routeviews-prefix2as.xml){:target=”_blank”}. For the first time, ASN fields will be annotated for each test result, and will be historically accurate-- the IP address from a client test will match the ASN that used that IP address at the time the test was run. Researchers using our BigQuery datasets will no longer need to leverage a third party dataset like Maxmind to get the ASN for an IP collected by NDT. They will be able to get that with a single query to our dataset, powered and supported by the work of CAIDA. For the visualization website, this also will mean richer data aggregations that are more accurate when selecting past data. We’re excited to leverage another great open data set from the community, and extremely thankful for CAIDA’s work to make that available for research and analysis.
