---
layout: page
permalink: /contribute/
title: "Contribute"
menu-item: true
breadcrumb: contribute
---

* Table of Contents
{:toc}

# Supporting or Contributing to M-Lab
{:.no_toc}

M-Lab welcomes the participation of individuals and researchers, as well as companies, organizations, and other institutions, that would like to help expand the platform and ensure its growth and success.

## Develop a Test

Researchers developing and maintaining open source network measurement tests may apply to host a new test on M-Lab. If your project fits within M-Lab's guidelines and principles, we invite you to [email us about M-Lab hosting](mailto:suppport@measurementlab.net).

Please review the documents below before applying:

* [M-Lab Conceptual & Technical Scope & Related Policies]({{ site.baseurl }}/mlab-scope/)
* [M-Lab Memorandum of Understanding for Experiment Developers]({{ site.baseurl }}/experimenter-mou/)
* [M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines]({{ site.baseurl }}/experimenter-requirements-guidelines/)

## Use an M-Lab Test in Your Website or Application

M-Lab's open source tests can be added to your website, mobile application, or other software, providing a service to your users and allowing M-Lab to reach more people and generate more data. If you are considering building an M-Lab test into your website or application, you should be familiar with M-Lab's [Privacy]({{ site.basurl }}/privacy) and [Acceptable Use]({{ site.baseurl }}/aup) policies.

You can find out more information:

* In our [Developers Guide]({{ site.baseurl }}/develop).
* In our support answer: [How can I add an M-Lab test to my website, mobile app, or other software?](https://support.measurementlab.net/help/en-us/5-supporting-or-contributing-to-m-lab/24-how-can-i-add-an-m-lab-test-to-my-website-app-or-other-software), in our [data documentation]({{ site.baseurl }}/data/docs)

## Host or Sponsor an M-Lab Measurement Site

In 2024, joining the M-Lab platform will be easier than ever with our new flexible options for contributing infrastructure. This following information provides an overview of the options for supporting the platform, increasing resilience, diversity, and reach of the platform in service of M-Lab’s mission.

All contributions are considered tax-deductible donations to Code for Science & Society, M-Lab’s nonprofit fiscal sponsor. To learn more, contact us at [hello@measurementlab.net](mailto:hello@measurementlab.net) and if you are interested in contributing, please fill out our [Infrastructure Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLSe1wXKfQ0VIt_hZFatCwCaoOeeDpRv3JZDM_eAmIaksMuwB4g/viewform?usp=sf_link).

### Cloud Credits for Virtual Servers

The easiest way to donate infrastructure to M-Lab is by donating resources for cloud credits from providers such as Google Cloud, Amazon Web Services, Azure, Equinix, Linode, IBM and others. M-Lab can host 1 site for $30,000 to $360,000 credits annually, where total price depends on user demand, service availability, and market rates. M-Lab services are highly configurable and can work within any budget in any market at lower availability.

This option is best for contributors who

* Currently offer Cloud services and want their infrastructure represented in reports using M-Lab data
* Only have access to virtual networks and resources
* Want M-Lab to manage the virtual resources on your behalf

### Full Hardware Deployment managed by M-Lab

To contribute resources to be managed and deployed by M-Lab using our full deployment model, the following will be required:

* A /26 IPv4 prefix and /64 IPv6 prefix, both globally routed, and statically assigned to M-Lab equipment
* Standard hardware[^1] including:
  * 4x Dell PowerEdges server with iDRAC
  * 1x Juniper switch with 10Gbit/s uplink
* 5U rackspace and power
* A 10Gbit/s uplink to the Internet
* Remote support in coordination with M-Lab for installation and periodic maintenance

This option is best for contributors who:

* Currently offer rack space and power
* Have network capacity to support high user demand
* Can sponsor all costs associated with a full site deployment managed by M-Lab on your behalf
* Can provide network locations that measure paths relevant for user experience accessing content & services on the Internet

### Minimal Hardware Deployment managed by M-Lab

To contribute resources to be managed and deployed by M-Lab using our minimal deployment model, the following will be required:

* A /28 or /29 IPv4 prefix and /64 IPv6 prefix, both globally routed, and statically assigned to M-Lab equipment
* Standard hardware* including:
  * 1x Dell PowerEdge server with iDRAC
* 1U rackspace and power
* A 10Gbit/s uplink to the Internet
* Remote support in coordination with M-Lab for installation and periodic maintenance, including secure access to the iDRAC

This option is best for contributors who:

* Can sponsor all costs associated with a minimal site deployment managed by M-Lab on your behalf
* Can provide network locations that measure paths relevant for user experience accessing content & services on the Internet
* Are not able to support a full scale deployment

We are open to Trusted Testers for Minimal Deployments in 2024 Q2 and plan to make this option generally available by 2024 Q3.

\* New hardware models may need to be qualified by M-Lab before we can accept them as part of the platform, but additional resources could be required to support the qualification process.

### Host Managed Deployment

Host managed deployments are managed and deployed by the contributor and can be physical or virtual. All data is collected and archived to the M-Lab data pipeline.

To run a host managed M-Lab server, the following is needed:

* Registration with M-Lab for a host managed deployment
* An IPv4/32 address and IPv6/128 address, both globally routed, and statically assigned to the contributed server
* A physical or virtual server with at least 4GB RAM & 4 CPUs (Intel class)
* At least 1Gbit/s uplink to the Internet

This option is best for contributors who:

* Currently offer or have easy access to a single physical or virtual server
* Already maintain an Network Diagnostic Tool, Measurement Swiss Army Knife, or Reverse Traceroute server and want to contribute data to M-Lab’s public dataset or
* Already maintain other speed test servers in their network or
* Are not able to to provide the resources necessary for M-Lab managed servers but are still interested in contributing infrastructure

We are open to Trusted Testers for Host-Managed deployment in 2024 Q3 and plan to make this option generally available by 2024 Q4.

### Interested?

Please fill out our [Infrastructure Contribution Form](https://docs.google.com/forms/d/e/1FAIpQLSe1wXKfQ0VIt_hZFatCwCaoOeeDpRv3JZDM_eAmIaksMuwB4g/viewform?usp=sf_link) and feel free to reach out to [hello@measurementlab.net](mailto:hello@measurementlab.net).

## Analyze and Visualize M-Lab Data

M-Lab welcomes researchers who want to dig into the M-Lab data, providing documentation and best-effort email support. If you are interested in working with M-Lab data in your research, please review our [data documentation]({{ site.baseurl }}/data) to help get you started, and [contact us](mailto:support@measurementlab.net) with any questions. We also suggest that you join our [public mailing list](https://groups.google.com/a/measurementlab.net/forum/?fromgroups#!forum/discuss){:target="_blank"} for news and announcements.

If you have experience in web or application development, data analysis, or visualization, you may be interested in working with M-Lab's tests, data, and analysis tools, all of which are open source and openly licensed.

* [M-Lab's conceptual and technical scope and policies]({{ site.baseurl }}/publications/mlab-founding-vision.pdf)
* [M-Lab's Roles &amp; Responsibilities for new researchers]({{ site.baseurl }}/publications/mlab-roles-responsibilities.pdf)
* [M-Lab's requirements and procedures for accepting new tools]({{ site.baseurl }}/publications/mlab-procedures-new-tools.pdf)

## Donate to M-Lab

M-Lab welcomes the direct financial contributions of organizations that find our work beneficial. If your organization is interested in supporting the M-Lab platform, please review our [sponsorship offerings]({{ site.baseurl }}/documents/mlab-sponsorship.pdf) and [contact us](mailto:hello@measurementlab.net).
