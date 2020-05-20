---
layout: page
permalink: /experimenter-mou/
title: "Memorandum of Understanding for M-Lab Experiment Developers"
breadcrumb: "about"
---

# Memorandum of Understanding for M-Lab Experiment Developers

This is the standard agreement between Measurement Lab and Experiment Developers whose network measurement experiment(s) has been [approved]({{ site.baseurl }}/contribute/#develop-a-test) to be hosted on M-Lab infrastructure. M-Lab is a fiscally sponsored project of Code for Science & Society. This MOU is an agreement between Code for Science & Society and each Experiment Developer, covering Measurement Lab team support of experiments. This agreement is non-negotiable, and is signed by the Experiment Developer as authorized by their host organization, an authorized member of the Measurement Lab team, and an officer of Code for Science and Society, Inc.

## Memorandum of Understanding - Measurement Lab, Experiment Developers

**Measurement Lab** (M-Lab)’s mission is to measure the Internet, save the data, and make it universally accessible and useful. M-Lab maintains a globally distributed server platform for deploying Internet measurement tools at scale. The data from these measurement tools is openly available for use by the public to analyze, study and understand the health of the Internet. All uses of M-Lab should be consistent with this high-level goal.

This document describes the _roles and responsibilities_ of the **Measurement Lab** (M-Lab) **team** and the **Experiment Developer**. The **M-Lab team** defines the software environment, operates, and supports the platform infrastructure on which experiments are hosted and run; and the **Experiment Developer** provides one or more containerized network measurement experiments to be deployed on the platform infrastructure.

## Related Resources & Policies

* [Application to host a network measurement experiment on the M-Lab platform]({{ site.baseurl }}/contribute/#develop-a-test)
* [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/)
* [M-Lab Acceptable Use Policy]({{ site.baseurl }}/aup/)
* [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/)

## M-Lab Responsibilities

### Platform Operations and Monitoring

The M-Lab team maintains all aspects of deploying and managing M-Lab servers, deploying and managing the lifecycle of containerized experiments provided by Experiment Developers, and are responsible for core operating system and package updates, security, etc. of the platform infrastructure. M-Lab also maintains a robust monitoring system of all platform infrastructure, and health checks for experiment code running in containers platform-wide. Experiment Developers are expected to provide monitoring support within their code, as outlined in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

M-Lab has established guidelines for provisioning experiments on M-Lab servers with vetted, scalable measurement tools, which are provided to Experiment Developers seeking to host experiment code on the platform. Guidelines specific to Experiment Developers are discussed in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### Operations Continuity Expectations

M-Lab maintains Service Level Objectives (SLOs) for the platform infrastructure and for the experiments we maintain. The M-Lab team will establish relevant SLOs with the Experiment Developer during the approval process. Platform SLOs include experiment resource allocation and utilization for CPU, RAM, network bandwidth, disk storage and I/O, among others. M-Lab will monitor experiment SLOs, experiment resource utilization, and general container health. If there is a problem with an experiment container, M-Lab may first make contact with the Experiment Developer and may suspend service of the offending experiment at our discretion, until the issue is resolved, as detailed in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### Infrastructure for Testing Experiment Containers

The M-Lab team will work with Experiment Developers to test and confirm that experiment code functions as expected, and that all monitoring and other operational requirements are met. M-Lab provides support to Experiment Developers to test their docker container(s) on testing infrastructure to ensure correct and expected operations, for both initial and subsequent releases. M-Lab will work with Experiment Developers to iterate on issues until the experiment can be deployed safely to production infrastructure.

### Experiment Release Rollouts

M-Lab is responsible for rolling out all experiment releases following internal rollout schedules and practices. Experiment developers should expect to coordinate with M-Lab staff for all releases of their experiment code.

### Data Publishing

M-Lab has established guidelines for archiving and accessing data generated by all M-Lab hosted experiments, and collected on M-Lab servers. M-Lab provides support for integrating all experiments’ test data into our standard [ETL pipeline](https://github.com/m-lab/etl){:target="_blank"}, and processing collected data into public BigQuery datasets. More detail on data publishing expectations and resources is provided in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### Communications

M-Lab operations maintains general contact address for the purposes of supporting general inquiries ([support@measurementlab.net](mailto:support@measurementlab.net)), as well as a group for Experiment Developers, server hosts, and others interested in M-Lab platform operations ([ops@measurementlab.net](mailto:ops@measurementlab.net)). M-Lab will subscribe at least one researcher per experiment to the M-Lab platform operations group, and other addresses as identified by the experiment developer. These contacts will be responsible for following platform changes and flagging concerns about impact to their experiment. In the event of major changes to the experiment management lifecycle, M-Lab will give reasonable notice of changes and allow time for transition to adjust to any infrastructure changes. If there are concerns, the M-Lab team is always reachable at the address listed above, and can answer specific questions and concerns. M-Lab operations will maintain current contact information for all Experiment Developers hosting experiment code on our platform, and will periodically be in communication for relevant issues with Experiment Developers directly. Per the M-Lab privacy policy, M-Lab will maintain your personal information for the purposes of communications for a period of 1 year following the termination or non-renewal of our MOU.

## Experiment Developer Responsibilities

As a platform that supports open science, M-Lab is concerned with ensuring that all experiments and services running on its platform infrastructure be compliant with accepted standards for human subjects research. Additionally, because all data resulting from experiments running on the M-Lab platform infrastructure is published in a publicly available data archive, all published data must not include Personally Identifiable Information (PII). Each Experiment Developer is required to ensure that their experiment code and the data it produces has been reviewed and approved for use in human subjects research by their host organization’s Institutional Review Board (IRB) or equivalent. If the host organization does not have an IRB or equivalent, M-Lab can provide contacts and referrals to independent firms that can provide a human subjects review. Alternately, the experimenter can undergo a [Data Protection Impact Assessment (DPIA)](https://gdpr-info.eu/art-35-gdpr/){:target="_blank"} as documentation for this requirement. All experimenters must show that their experiment and the resulting data it produces does not produce significant risk to persons choosing to run the experiment; that informed consent is obtained if the experiment involved interaction with, or measurements of, people; and that PII is not present in the resulting data. The only identifying information that can be collected by experiments are a client’s public IP address as issued by their Internet Service Provider (ISP). While a given experiment may wish to collect personal information, M-Lab infrastructure, as governed by the [M-Lab Privacy Policy]({{ site.baseurl }}/privacy/) and [Acceptable Use Policy]({{ site.baseurl }}/aup/), cannot be used for collection, or storage of this information; non-M-Lab infrastructure must be employed for this purpose. Documentation showing that the experiment has been reviewed by an IRB or equivalent, that the experiment does not publish PII, that the experiment does not produce significant risk to persons choosing to run it, and how the experimenter obtains consent of the persons running the experiment are required for an experiment to be deployed on M-Lab infrastructure, and must be current during the time the experiment is hosted on M-Lab infrastructure. This review is part of the experiment approval process, detailed in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

Under the EU General Data Protection Regulation, experiment developers are considered the data controllers for their M-Lab hosted experiments and data, and must maintain separate GDPR compliant policies for their experiments and data. M-Lab requires all hosted experiments to maintain a publicly available privacy policy to which we may refer GDPR related or other inquiries.

When experimenters leverage the M-Lab ETL pipeline to publish raw test data and/or BigQuery datasets, the experimenter consents to joint controllership of their experiment’s data, allowing M-Lab the legal basis for processing it and making it available publicly on your behalf.

### Contact Information & Communications (Point of Contact)

M-Lab operations requires Experiment Developers to provide current contact information, including email, address, and a phone number where they may be contacted for issues related to their experiment. Experiment developers are expected to respond to email communications from M-Lab operations **within five to seven business days**. Additionally, Experiment Developers are expected to subscribe to the relevant mailing list for experimenters, which is currently the M-Lab platform operations group, [ops@measurementlab.net](mailto:ops@measurementlab.net) to receive updates about the platform generally.

Experiment Developers are also expected to provide a method of contact for end-user support, as well as publicly available documentation to support the users of their client tests. M-Lab will refer to this documentation on its website, and will direct support inquiries to the contact provided.

Per the M-Lab privacy policy, M-Lab will maintain your personal information for the purposes of communications for a period of 1 year following the termination or non-renewal of our MOU.

### Experiment Code & Resource Requirements

Experiment Developers are expected to follow the requirements and guidelines for their code to operate on the M-Lab platform within available resource allocations. The software running the experiment must be released under an [OSI-approved license](https://opensource.org/licenses){:target="_blank"}. Detailed requirements for experiments running on the M-Lab platform are provided in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### M-Lab Data Processing Agreement

If Experiment Developers wish to use M-Lab’s ETL pipeline to archive test data in M-Lab’s Google Cloud Storage and/or in BigQuery datasets, they must agree to the terms of M-Lab’s Data Processing Agreement as outlined in **Appendix A**.

### Experiment Lifecycle Expectations

M-Lab expects Experiment Developers to maintain and support experiment code running on the platform for at least the period of this MoU. For example, support includes fixing security issues, addressing build failures, and reasonable changes required by M-Lab as the platform evolves. Further, M-Lab expects that experiments running on the platform be actively maintained and supported for the term of the MoU. Complete experiment lifecycle expectations are described in the corresponding section in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### Experiment Decommissioning

In the event that an Experiment Developer wishes to retire an experiment, M-Lab will expect to coordinate on timing and communications to users with as much advance notice as possible. Experiment Developers are expected to follow the experiment decommission guidelines, as outlined in the [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/).

### Term and Renewal of this Memorandum of Understanding

The standard term of this MoU is three (3) years, effective upon signing by both parties. M-Lab tracks active MoUs and will reach out to Experiment Developers about renewal 30 days in advance of the MoU renewal date.

### EU GDPR Regulatory Documentation Requirements
Under the European Union’s General Data Protection Regulation (GDPR), experiment developers are considered the data controllers for their M-Lab hosted experiments and data, and must maintain separate GDPR compliant policies for their experiments and data. M-Lab requires all hosted experiments to maintain a publicly available privacy policy to which we may refer GDPR related or other inquiries.

With respect to the EU General Data Protection Regulation (GDPR), M-Lab is a data controller (GDPR Art.4.7) only for experiments that we maintain, insofar as we maintain the experiment code and determine the means and purposes of the data collected to be made public.

When experimenters leverage the M-Lab ETL pipeline to publish raw test data and/or BigQuery datasets, the experimenter consents to joint controllership of their experiment’s data, allowing M-Lab the legal basis for processing it and making it available publicly on the experimenter’s behalf. In this case, experimenters should reflect their roles as joint controllers on their own privacy policies, communicated at the time a person runs their test, which should clearly describe which data serves what purpose and what legal base is applied for each.

## Memorandum of Understanding Agreement

As the maintainer of the network measurement experiment, name of experiment, hosted on the Measurement Lab platform, I/we consent to the terms outlined above in a Memorandum of Understanding with M-Lab for a period of three years.

**Signature(s) For Experiment Developer(s):**

Name:

Designation:

E-mail address:

Organization:

Physical Address:

Signature:

Date:

**Signature(s) For Measurement Lab:**

Name:

Designation:

E-mail address:

Organization:

  Measurement Lab

Physical Address:

  1221 SE 34th
  Portland, OR 97214

Signature:

Date:

## Appendix A - M-Lab Data Processing Agreement

When experimenters leverage the M-Lab ETL pipeline to publish raw test data and/or BigQuery datasets, the experimenter must consent to M-Lab being a data processor for the data collected by the experiment. This formalizes M-Lab’s role in processing the data and making it available publicly on the experimenter’s behalf. In this case, experimenters must also reflect M-Lab’s in their own experiment’s privacy policies, communicated at the time a person runs their test.

### Data Processing Agreement

As the maintainer of the network measurement experiment, _name of experiment_, hosted on the Measurement Lab platform, I/we consent to Measurement Lab’s role as a Data Processor with me/us. By this consent, I/we confirm that Measurement Lab will process and save the data resulting from data subject’s use of our experiment in M-Lab’s Google Cloud Storage and/or BigQuery datasets. Our experiment’s privacy policies will reiterate this Data Processor role.

**Signature(s) For Experiment Developer(s):**

Name:

Designation:

E-mail address:

Organization:

Physical Address:

Signature:

Date:

**Signature(s) For Measurement Lab:**

Name:

Designation:

E-mail address:

Organization:

  Measurement Lab

Physical Address:

  1221 SE 34th
  Portland, OR 97214

Signature:

Date:

## Appendix B - M-Lab Joint Controller Agreement

When an experimenter hosts their experiment with M-Lab, their experiment code will be available globally. If the experiment collects the ISP-provided IP address of originating client running the test, or any other data considered Personally Identifiable Information (PII) as defined under the European Union’s General Data Protection Regulation (GDPR), the California Consumer Protection Act (CCPA), or other applicable consumer protection or privacy legislation for other jurisdictions, the experimenter must consent to M-Lab being a joint controller of the resulting data collected by the experiment. This formalizes, and provides a legal basis under these consumer protection and privacy laws. In this case, experimenters must also reflect their roles as joint controllers with M-Lab in their own experiment’s privacy policies, communicated at the time a person runs their test, which should clearly describe which data serves what purpose and what legal base is applied for each.

### Joint Controller Agreement

As the maintainer of the network measurement experiment, _name of experiment_, hosted on the Measurement Lab platform, I/we consent to Measurement Lab’s role as a Joint Controller with me/us, under the terms of the European Union’s General Data Protection Regulation (GDPR) as well as any similar provisions in the California Consumer Protection Act (CCPA) or other similar laws in other jurisdictions. By this consent, I/we confirm that Measurement Lab will process and save the data resulting from data subject’s use of our experiment in M-Lab’s Google Cloud Storage and/or BigQuery datasets. Our experiment’s privacy policies will reiterate this Joint Controller role, and will comply with all requirements of the GDPR and the CCPA.

**Signature(s) For Experiment Developer(s):**

Name:

Designation:

E-mail address:

Organization:

Physical Address:

Signature:

Date:

**Signature(s) For Measurement Lab:**

Name:

Designation:

E-mail address:

Organization:

  Measurement Lab

Physical Address:

  1221 SE 34th
  Portland, OR 97214

Signature:

Date:
