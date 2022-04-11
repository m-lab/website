---
layout: blog
title: "Updates to Geo Filters"
author: "Lai Yi Ohlsen"
date: 2022-03-24
breadcrumb: blog
categories:
  - research
  - data
  - pipeline
  - annotations
---

Changes to our geographic annotations have resulted in changes to geographic filters. <!--more-->



## Takeaways 

* As of 2022-03-16, M-Lab client geographic annotations now refer to the [ISO3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) Subdivision standard for geographic annotations for all NDT data types. 
* Queries that previously used `client.Geo.Region` to identify US states, should now use `client.Geo.Subdivision1ISOCode` instead.
Queries filtering on `client.Geo.Region` will return “no data.” 
* If you ran queries prior to 2022-03-17 that used `client.Geo.Region` for dates between 2020-02 and 2022-03-17, you should rerun these queries using `client.Geo.Subdivsion1ISOCode` to get results that include ndt7.
* These changes are part of a [long-term effort](https://www.measurementlab.net/blog/evolution-of-annotations/#evolution-of-m-lab's-geographic-and-network-annotations) to normalize and improve our geographic annotations by standardizing on ISO 3166-2 subdivision used by maxmind geo2 (vs FIPS-10-4 region coding used by maxmind geo1 formats). 


## Background 
Since we began collecting data, M-Lab has used MaxMind's [free GeoLite geoip databases](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data?lang=en) to annotate measurements. We call them client or server annotations, or “geographic annotations”. Until 2017-09, MaxMind published a "Geo1 format" that used the FIPS-10-4 standard for region codes. After 2017-09, Maxmind introduced the "Geo2 format" that adopted the ISO3166-2 Subdivision standard. These databases included field names that corresponded to these conventions. So, Geo1 included a "Region" field (with values from the FIPS standard), and Geo2 included "Subdivision1ISOCode” field (ISO3166-2 standard, e.g. Subdivision1ISOCode, Subdivision2ISOCode, etc). These standards are [very different for some locales](https://github.com/m-lab/annotation-service/blob/master/data/fips-iso-map.csv).


## M-Lab’s Geo Annotations

![geo-annotations-table]({{ site.baseurl }}/images/blog/2022-03-updates-to-geo-filters/2022-03-21 GeoAnnotations.png)

Since M-Lab data spans 2009 to the present, we had to make a choice when developing our [Unified Views]({{ site.baseurl }}/blog/new-ndt-unified-views/#ndt-unified-views-now-published) - should we mix conventions (i.e. use both “.Region” and “.Subdivision1ISOCode”) or standardize on one? We chose to standardize on the Geo2 ISO3166 conventions. However, our published data has used a mixture of these conventions since 2017-09, when the “Geo2 format” was introduced. 

The introduction of ndt7, the Unified Views, and this mixture of annotation conventions resulted in only ndt5 data being returned when users ran queries that used `client.Geo.Region`. To ensure data includes all relevant results, queries run prior to 2022-03-17 for dates between 2020-02 and 2022-03-17 and used `client.Geo.Region` should be rerun.

On March 16, 2022 we released a version of etl-schema after which both ndt5 and ndt7, and therefore the unified views, use the Geo2 format based on ISO 3166-2. As a result, queries that previously used `client.Geo.Region` to identify US states should now use the filter `client.Geo.Subdivision1ISOCode`. Queries that use `client.Geo.Region` will return “no data.” 
