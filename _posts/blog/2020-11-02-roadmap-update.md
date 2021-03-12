---
layout: blog
title: "M-Lab Roadmap Update - Q4 2020"
author: "Lai Yi Ohlsen"
date: 2020-11-02
breadcrumb: blog
categories:
  - roadmap
---

In an effort to communicate more about the status and trajectory of the M-Lab platform with our community, we’re pleased to provide this first roadmap update which will cover Q4 2020- Q1 2021. Our team currently plans our milestones and tasks every ~6 months, with regular internal meetings and updates in between.<!--more--> Our goal with this and future roadmap posts will be to summarize our milestones at a high level for the upcoming 6 months, with incremental updates to each milestone as separate posts as progress is made.

## M-Lab Roadmap : Q4 2020 - Q1 2021 Milestones

### User migration to standard columns

Following our platform upgrade in November 2019, we then focused on implementing new strategies for data publication. The first step in that strategy was the publication of [NDT Unified Views][ndt-unified-views], which provide the most commonly used fields and includes only tests that reflect [our current best understanding of all NDT download and upload data][helpful-views] across the entire platform over all time. The unified views were the first step toward a larger initiative to standardize the columns we provide to enable better [long term supported schemas][lts-support].

[ndt-unified-views]: {{ site.baseurl }}/blog/new-ndt-unified-views/
[helpful-views]: {{ site.baseurl }}/tests/ndt/#helpful-views
[lts-support]: {{ site.baseurl }}/blog/long-term-schema-support-standard-columns/
[announce-changes]: https://groups.google.com/a/measurementlab.net/g/discuss

### Datatype migration to universal gardener / standard columns

[Standardizing the columns provided in our schemas][std-cols] requires migrating the various datatypes we provide to standard columns. This will also involve migrating some datatypes to use newer releases of our gardener service and UUID annotator. The [gardener service][gardener] maintains and reprocesses M-Lab data. The [UUID annotator][annotation] generates and saves per-connection metadata as annotations to user conducted measurements in real-time on M-Lab's edge systems. Additionally, when we launched the upgraded M-Lab platform in Nov. 2019, [we replaced the Paris-Traceroute core service with a new Traceroute core service][scamper-post] backed by the Scamper application from CAIDA. We are now preparing to complete the work to finish the launch of this new service by releasing a new traceroute schema using our Standard Columns framework.

[std-cols]: {{ site.baseurl }}/blog/long-term-schema-support-standard-columns/
[gardener]: https://github.com/m-lab/etl-gardener/
[annotation]: https://github.com/m-lab/uuid-annotator/
[scamper-post]: {{ site.baseurl }}/blog/scamper-data/

### Migrate the majority of NDT clients to ndt7

Following our [release of ndt7][ndt7-release], we began working with NDT client integrators to support their [migration to ndt7][ndt7-migration]. While [most clients have completed that migration][most-clients], we hope to complete work to support those that remain that primarily use JavaScript.

[ndt7-release]: {{ site.baseurl }}/blog/ndt7-introduction/
[ndt7-migration]: {{ site.baseurl }}/blog/migrating-ndt-clients-to-ndt7/
[most-clients]: {{ site.baseurl }}/blog/most-ndt-clients-migrated-to-ndt7/

### Deploy Wehe on the production platform and data is in BigQuery

Our newest measurement service, Wehe, has been in the final stages of testing prior to rollout on the production M-Lab platform. This milestone will complete the rollout of this great new test, which attempts to detect traffic differentiation or manipulation.

### Visualization site provides new visualizations for Calibrated SLIs

Earlier this year we began working on an [upgrade to data visualizations][vis-upgrade]. To provide aggregate data in the interim, we published [two interactive DataStudio reports][datastudio]. In addition to aggregate measurements by time and location, the new visualizations will implement a new approach to contextualizing M-Lab measurements by what people could or could not accomplish with their measured speeds. Calibrated SLIs or “Service Level Indicators” will provide the percentage of tests that could or could not perform video streaming or other applications, as well as the percentage of testers whose measured speeds were in various speed tiers.

[vis-upgrade]: {{ site.baseurl }}/blog/vis-site-upgrade/
[datastudio]: {{ site.baseurl }}/visualizations/

### Make Piecewise is available via self-deployment

[Piecewise][piecewise] is a web application developed by M-Lab that aggregates user-volunteered Internet performance test results data from Measurement Lab, with survey data. Piecewise is one of several [community tools][tools] that integrate both an NDT test and NDT data. M-Lab’s default geolocation of tests is based on the IP address, which has limits in its geographic precision as [discussed in this blog post][geo-precision]. One of the advantages of this type of integration is the ability to request more accurate location information from testers, using it in the application to present more accurate aggregations, but remaining true to [M-Lab’s policies][policies] by only submitting the measurement itself to our public dataset. The original Piecewise application is being redeveloped to allow easy deployment using Docker, either as a standalone application, or as a SaaS service that can deploy multiple instances of the application.

[piecewise]: https://github.com/m-lab/piecewise
[tools]: {{ site.baseurl }}/data/tools/#community
[geo-precision]: {{ site.baseurl }}/blog/exploring-geographic-limits-of-ip-geolocation/
[policies]: {{ site.baseurl }}/policies/
