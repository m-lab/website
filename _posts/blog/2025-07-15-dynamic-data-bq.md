---
layout: blog
title: "Measurement Lab publishes new dataset of NDT7 measurements"
author: "Matt Mathis, Roberto D’Auria, Nathan Kinkade, Pavlos Sermpezis, Melissa Newcomb"
date: 2025-07-15
breadcrumb: blog
categories:
  - data
  - bigquery
  - Ndt7
  - announcement
---

A new dataset of ndt7 measurements is now available in BigQuery, offering access to measurements from a set of servers whose data had not been previously published. <!--more-->


<div style="background-color: #E7F1FF; padding: 10px;">
  These servers and their corresponding datasets are still in the experimental phase. We invite users to explore this new dataset and provide feedback. If you encounter any issues or notice any inconsistencies, please let us know so that we can continue to improve the quality and reliability of this dataset.
</div>
<br>

**Where do these data come from?**

Measurement Lab is in the second pilot phase to test a new dynamic method for deploying and managing measurement servers.  As mentioned in our [Community Call in November 2024](https://www.youtube.com/watch?v=da3zinXuqnY), M-Lab’s platform is evolving to better measure the Internet today, by enabling the addition of new servers to the M-Lab fleet through the [Host Managed Deployment Program](https://github.com/m-lab/autonode/wiki/Host%E2%80%90managed-Deployments). 

[M-Lab’s platform](https://www.measurementlab.net/status/) consists of more than 400 servers in more than 40 countries and 100 metros. The majority of these servers belong to the “legacy” fleet, whose measurements are already available in [BiqQuery](https://console.cloud.google.com/bigquery?project=measurement-lab), e.g., in the table \``measurement-lab.ndt.ndt7`\`.

<img src="{{ site.baseurl }}/images/blog/2025-07-17_dynamic-data-bq/mlab-servers-legacy-july2025.png" alt="M-Lab servers legacy fleet" style="width: 80%; height: auto;" /> 
**Figure 1**: The “legacy” fleet of M-Lab servers. It consists of more than 370 servers.

A new set of servers, which we call as the *dynamic[^1]* fleet of servers–including those deployed through the Host Managed Deployment Program–has been gradually rolled out as part of a pilot phase. Although data collection from these servers has been ongoing for the past year, these data have not been publicly available until now.

<img src="{{ site.baseurl }}/images/blog/2025-07-17_dynamic-data-bq/mlab-servers-dynamic-july2025.png" alt="M-Lab servers dynamic fleet" style="width: 80%; height: auto;" />  
**Figure 2**: The “dynamic” fleet of M-Lab servers as of July 2025\. It consists of more than 35 servers in 9 countries.


**Accessing the new data in BigQuery**  
    
Until recently, data from the dynamic fleet was withheld to ensure integrity while we piloted the dynamic deployment system. Now, we would like to make the data available. However, we are still in an experimental stage and maintain separate tables to make it easy for researchers to see how the data is changing. 

There have been no changes to NDT itself, but the BigQuery schemas are slightly different due to changes in server metadata and the methods used to import the data into BigQuery. 

Specifically, to accommodate these schema differences, we're publishing three new views in the measurement-lab.ndt dataset:

* **ndt.ndt7\_legacy** \- The full legacy ndt7 view as currently published as ndt.ndt7.  This view will be preserved to support investigating the provenance of the legacy data.  It supports locating the raw data that was processed in order to populate BigQuery.  
* **ndt.ndt7\_dynamic** \- Fully annotated data from the dynamically registered fleet, including the provenance of the data, so researchers can locate the raw data in the archive.  
* **ndt.ndt7\_union** \- The union of ndt7\_legacy and ndt7\_dynamic, but without provenance because it is incompatible between the sources.

**Notes for researchers and future plans**

Most researchers using ndt7 data won't need to take any action. Your existing queries using ndt.ndt7 should continue to work seamlessly through this transition. 

If you would like to explore all data (both from legacy and dynamic fleets), we recommend temporarily switching to ndt7\_union.  Researchers using server metadata such as server DNS names, IP addresses, routing information and Anonymous System Numbers (ASNs) should still be able to parse the data, possibly with a few minor changes to generalize regular expressions. (Site names may now include more than two digits, e.g., abc1234). 

Currently, the dynamic fleet of servers provides tests and data only for ndt7; in the future, it will support measurements for other tools (reverse traceroute, WeHe, Neubot, etc).

At some point in the future we will redeploy ndt.ndt7\_union as ndt.ndt7, and ask that you update your queries accordingly.  Although we are not aware of any problems with the data from the dynamic fleet, we have not yet systematically validated the calibration of this data.

Moreover, if you're currently using the unified or intermediate views and are unable to easily switch to ndt7 or ndt7\_union, we’d like to hear from you. These views were originally developed to support the transition from ndt5 to ndt7, but as part of an upcoming update, we plan to revise our recommendations regarding their use (today, ndt5 accounts for less than 0.5% of newly collected data).

If you have any questions about these changes or how they might affect your work, please let us know at [support@measurementlab.net](mailto:support@measurementlab.net)   


[^1]:  The term “dynamic” refers to the more dynamic way of setup and operation, as well as the availability of the servers.

