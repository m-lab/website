---
layout: page
title: "BigQuery QuickStart"
permalink: /data/docs/bq/quickstart/
breadcrumb: data
---

# BigQuery QuickStart

M-Lab provides query access to our datasets in BigQuery at no charge to interested users. Following the steps below will allow you to use BigQuery to search M-Lab datasets without charge when the `measurement-lab` project is selected in your Google Cloud Platform console, or set as your project in the Google Cloud SDK. **Queries from projects you create, saving query results to BigQuery tables, etc. will incur costs to you.**

Please follow the steps below to configure free query access. If you have questions, please contact us at [support@measurementlab.net](mailto:support@measurementlab.net)

## Subscribe your Google account to the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/forum/#%21forum/discuss){:target="_blank"}

Members of this group are whitelisted to use the `measurement-lab` project in the Google Cloud Platform console or Google Cloud SDK so that queries charges are paid for by M-Lab.

## Setup Access to M-Lab Datasets in the Google Cloud Console

Visit the [Google Cloud Console BigQuery page for the measurement-lab project](https://console.cloud.google.com/bigquery?project=measurement-lab){:target="_blank"}. If you've never used BigQuery before, you'll see a welcome message as shown in the image below. Click "Let's Go!"

![Welcome to BigQuery in the Cloud Console]({{ site.baseurl }}/images/bqquickstart/1_bq_first_time_use.png)

Next, you may need to read and agree to the Terms of Service Updates and click "Accept", as shown in the image below.

![Updates to Terms of Service]({{ site.baseurl }}/images/bqquickstart/2_accept_bq_terms.png)

After you agree to the terms of service, your Google Cloud Platform should look like the image below. M-Lab datasets, tables, and views can be displayed by clicking the project text `measurement-lab` in the left column under **Resources**.

![measurement-lab Project in Google Cloud Platform console]({{ site.baseurl }}/images/bqquickstart/3_measurement_lab_proj.png)

You may now query M-Lab datasets from this project at no charge. Note also that you do not need to activate Google's $300 credit as shown at the top of the image above, unless you wish to do so.

## Setup Access to M-Lab Datasets in the Google Cloud SDK

You may prefer to use the Google Cloud SDK to query M-Lab data. The SDK provides a convenient command line interface for interacting with Google Cloud products.

### First, subscribe the Google account you wish to use to the [M-Lab Discuss group](https://groups.google.com/a/measurementlab.net/forum/#%21forum/discuss){:target="_blank"}.

Members of this group are whitelisted to use the `measurement-lab` project in the Google Cloud Platform console or Google Cloud SDK so that query charges are paid for by M-Lab.

### Next, download and install the [Google Cloud SDK](https://cloud.google.com/sdk/){:target="_blank"}.

Use the installation and Quick Start instructions for your operating system.

### Authenticate the SDK installation using the Gmail account you subscribed to M-Lab Discuss.

Use the command `$ gcloud auth login` and follow the instructions to authenticate:

![Google Cloud SDK - command line login]({{ site.baseurl }}/images/bqquickstart/cli-sdk/1-cli-sdk.png)

![Google Cloud SDK - browser authentication]({{ site.baseurl }}/images/bqquickstart/cli-sdk/2-cli-sdk.png)

![Google Cloud SDK - allow SDK]({{ site.baseurl }}/images/bqquickstart/cli-sdk/3-cli-sdk.png)

![Google Cloud SDK - successfully authenticated]({{ site.baseurl }}/images/bqquickstart/cli-sdk/3-cli-sdk-authd.png)

After installation and authentication, your terminal should show something like:

![Google Cloud SDK - terminal success message]({{ site.baseurl }}/images/bqquickstart/cli-sdk/4-cli-sdk-authd-terminal.png)

### Finally, set your default project to `measurement-lab`:

![Google Cloud SDK - set project]({{ site.baseurl }}/images/bqquickstart/cli-sdk/5-cli-sdk-set-proj.png)

## Next Steps

BigQuery's command-line tools should now be available in your terminal and you should be able to query datasets, tables, and views in the `measurement-lab` project.

If you are new to BigQuery, we suggest that you next consult the following resources:

* [BigQuery Examples]({{ site.baseurl }}/data/docs/bq/examples)
* [BigQuery Schema]({{ site.baseurl }}/data/docs/bq/schema)
* [Google's BigQuery documentation](https://cloud.google.com/bigquery/what-is-bigquery){:target="_blank"}
* [Querying Date Partitioned Tables](https://cloud.google.com/bigquery/docs/querying-partitioned-tables){:target="_blank"}
* [Google's bq Command-Line Tool Quickstart documentation](https://cloud.google.com/bigquery/bq-command-line-tool-quickstart){:target="_blank"}

## BigQuery API

Given the resources and expertise, you can develop your own application that uses M-Lab data using your own Google Cloud Platform Project. To learn more about building a custom application, refer to the [Google Cloud Platform Console documentation](https://cloud.google.com/docs/){:target="_blank"}.

### Using a Service Account

If you want to query M-Lab data using a service account (e.g., @developer.gserviceaccount.com) associated with your GCP application, please email [support@measurementlab.net](mailto:support@measurementlab.net) so that we can add your account to M-Lab Discuss manually.

Please note that M-Lab does not extensively test applications that use service accounts to query our data to check which operations may or may not incur billing. Because of the means by which M-Lab must whitelist query users, we cannot guarantee that no charges will be incurred by applications using service accounts which query M-Lab datasets, tables, and views.

M-Lab has confirmed that the following test did not incur billing:

* A GCP project was created using a test Gmail account.
* A service account was created with the IAM roles in the test GCP project: _BigQuery User, BigQuery Job User, BigQuery Data Viewer_.
* The service account was added to the M-Lab Discuss Google Group.
* The Google Cloud SDK was installed on a Linux computer and configured to use the test GCP project and its service account.
* Several queries were made to datasets within the `measurement-lab` project.
* Though these queries appeared in the GCP BigQuery query history for the test project, no billing transactions were present for the queries.
