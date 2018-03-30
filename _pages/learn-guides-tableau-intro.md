---
layout: page
permalink: /learn/tableau-intro/
title: "Using Tableau with M-Lab BigQuery Tables"
page-title: "Using Tableau with M-Lab BigQuery Tables"
breadcrumb: learn
---

# Using Tableau with M-Lab BigQuery Tables

[Tableau](https://www.tableau.com/) is a widely used data analysis and visualization program. This guide explains how to use the M-Lab BigQuery tables as a data source in your Tableau projects without incurring billing for BigQuery.

First review our [BigQuery Quickstart]({{ site.baseurl }}/data/docs/bq/quickstart/) page, which explains how to get a Gmail account whitelisted to query M-Lab tables at no charge.

Next, [use this guide from Tableau](https://onlinehelp.tableau.com/current/pro/desktop/en-us/examples_googlebigquery.html), and the images below to select the M-Lab public project and tables relevant to your research. You may wish to also review our [recent blog post regarding our datasets, tables, views]({{ site.baseurl }}/blog/etl-pipeline/), and our [schema page]({{ site.baseurl }}/data/docs/bq/schema/).

| 1. Connect to a Server data source, selecting _Google BigQuery_ under _More._ | [![Tableau M-Lab setup image 1]({{ site.baseurl }}/images/learn/tableau-1.png)]({{ site.baseurl }}/images/learn/tableau-1.png) |
| 2. Sign in using a Google account that is subscribed to the [M-Lab Discuss Group](https://groups.google.com/a/measurementlab.net/forum/#!forum/discuss)| [![Tableau M-Lab setup image 3]({{ site.baseurl }}/images/learn/tableau-3.png)]({{ site.baseurl }}/images/learn/tableau-3.png) |
|  | [![Tableau M-Lab setup image 5]({{ site.baseurl }}/images/learn/tableau-5.png)]({{ site.baseurl }}/images/learn/tableau-5.png) |
| 3. If you use two-factor authentication, you'll be prompted for a code or your security key.| [![Tableau M-Lab setup image 6]({{ site.baseurl }}/images/learn/tableau-6.png)]({{ site.baseurl }}/images/learn/tableau-6.png) |
| 4. Once the login is completed, click _Allow_ to authorize Tableau Desktop. | [![Tableau M-Lab setup image 7]({{ site.baseurl }}/images/learn/tableau-7.png)]({{ site.baseurl }}/images/learn/tableau-7.png) |
| 5. You can safely close the window at this point. | [![Tableau M-Lab setup image 8]({{ site.baseurl }}/images/learn/tableau-8.png)]({{ site.baseurl }}/images/learn/tableau-8.png) |
| 6. Back in Tableau Desktop, for _Billing Project_ and _Project_ select _MLab project - public BigQuery_ | [![Tableau M-Lab setup image 9]({{ site.baseurl }}/images/learn/tableau-9.png)]({{ site.baseurl }}/images/learn/tableau-9.png) |
| 7. For _Dataset_, select the M-Lab dataset most relevant to your work. We recommend starting with the _Release_ dataset. | [![Tableau M-Lab setup image 10]({{ site.baseurl }}/images/learn/tableau-10.png)]({{ site.baseurl }}/images/learn/tableau-10.png) |
| A list of the tables and views within the selected dataset will now be listed, and useable within Tableau Desktop. You may wish to review our [recent blog post regarding our datasets, tables, views]({{ site.baseurl }}/blog/etl-pipeline/), and our [schema page]({{ site.baseurl }}/data/docs/bq/schema/). | [![Tableau M-Lab setup image 11]({{ site.baseurl }}/images/learn/tableau-11.png)]({{ site.baseurl }}/images/learn/tableau-11.png) |
