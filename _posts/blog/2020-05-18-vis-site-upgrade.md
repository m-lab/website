---
layout: blog
title: "Data Visualization Site Upgrade"
author: "Chris Ritzo"
date: 2020-05-18
breadcrumb: blog
categories:
  - data
  - visualization
---

The M-Lab team completed a major platform upgrade in November 2019, which required publication of NDT data to new BigQuery tables and views. Consequently, the aggregate NDT data presented on our [visualization website](https://viz.measurementlab.net) has not been updated. We're pleased to report that the M-Lab data visualization site will soon be upgraded.<!--more-->

While all NDT test data is published in raw format and in BigQuery, the data visualization website was tied to one set of cannonical BigQuery tables. Because the platform upgrade last winter began publishing data to new tables and views, NDT data beyond mid-November was not available. Further delaying the update of the visualization site has been the publishing of unified views of the NDT data in BigQuery.

The NDT unified views are available in preliminarily form now, and a first version of their stable schema format will be published soon. The unified views' will provide a schema that can be queried across all of the NDT archive. M-Lab is proceeding with the backend work to upgrade the visualization site now, we're [seeking a contract developer]({{ site.baseurl }}/jobs/2020-05/visualization-site/) to complete the frontend work. Check out this and other opportunities to work with M-Lab on our [Jobs Page]({{ site.baseurl }}/jobs/).

## If you need current data before then

NDT data beyond November 2019 has continued to be published to BigQuery. [Now that the NDT unified views are available]({{ site.baseurl }}/blog/), M-Lab recommends that most people use them to query NDT data.

If you've never queried M-Lab data in BigQuery, please visit our [BigQuery Quickstart guide]({{ site.baseurl }}/quickstart/) and [documentation]({{ site.baseurl }}/data/docs/) to get started! You can also reach out for help at support@measurementlab.net, or watch for one of our upcoming community calls.
