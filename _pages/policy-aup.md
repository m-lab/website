---
layout: page
permalink: /aup/
title: "M-Lab Acceptable Use Policy (July 1, 2019 to July 14, 2025)"
breadcrumb: "about"
---



# M-Lab Acceptable Use Policy

Last updated: _July 15, 2025_

([Previous version July 1, 2019](https://www.measurementlab.net/aup-2019/))

This Acceptable Use Policy (“AUP”) governs all access to, use of, and/or interaction with the Measurement Lab platform, associated measurement tools, and data (referred to collectively as the “*platform*”). This policy applies to all *experiment developers, integration developers, researchers, hosting providers,* and *users* (as those terms are defined below), including partners with a direct relationship to M-Lab as well as third parties that independently use our open source and open access resources to interact with the *platform*. By accessing, using, or interacting with the Measurement Lab *platform* or any associated measurement tools or data, you acknowledge and agree that you have read, understand, and agree to abide by this AUP (including any other technical and policy documents incorporated herein by reference) as well as our [Privacy Policy](https://www.measurementlab.net/privacy/). 

We may update this AUP from time to time by posting the updated policy on this website. The updated AUP will take effect upon posting and will apply on a going-forward basis, unless otherwise noted. It is your responsibility to periodically review this AUP to stay informed of updates. By continuing to access and/or use the Measurement Lab *platform* after the posting of an updated AUP, as indicated by the date at the top of this page, you agree to the AUP as amended.

## Defined Terms 

Italicized terms used in this AUP have the following meanings:

| Term | Definition |
| :---- | :---- |
| clients | The code (e.g. applications and tools) used to run network measurement *tests*. Each *test* publishes one or more reference clients. Third parties may use these reference clients to publish their own “client”. |
| experiments | Network measurement systems in which the server component is deployed on the M-Lab platform. Each experiment consists of a server component that runs on M-Lab infrastructure and a client component used to initiate measurements. The *client* is what people use to test the network connection between them and the M-Lab server(s). All *experiments* are vetted by M-Lab’s Experiment Review Committee. |
| experiment developers | Individuals or organizations that create and maintain internet measurement *experiments* that run on the M-Lab platform |
| clients/client libraries | Software applications that implement the client component of an experiment and initiate tests by communicating with the experiment’s server component on the M-Lab platform. |
| integration developers | Individuals or organizations that use existing published clients or develop new clients to initiate measurements against published M-Lab experiments.  |
| platform | M-Lab’s servers (including servers donated by hosting providers) and associated infrastructure. |
| hosting providers | Organizations contributing server capacity to the *platform inclusive of servers managed by hosts or M-Lab.* |
| researchers | Individuals who access M-Lab data to study current and past measurements. |
| tests | The active use of an internet measurement experiment to measure a network connection.   |
| users | An individual or automated system that initiates a test by running the client component of an experiment.  |

## General Usage Policies and Restrictions

* By accessing, using, or otherwise interacting with the Measurement Lab *platform* (or any associated measurement tools or data)*,* you agree to comply with the following rules and requirements to the extent they are applicable to you:  
  * the operational rules and requirements set forth in our [M-Lab Conceptual & Technical Scope & Policies document](https://www.measurementlab.net/mlab-scope/) (including, without limitation, the rules and requirements relating to the *experiment* application and review process, how *experiments* are administered, uniqueness of *experiment* methods, and *experiment* best practices);  
  * the rules and requirements for [Developing with the M-Lab Platform](https://www.measurementlab.net/develop/); and  
  * all rules and requirements set forth on our [Ways to Contribute](https://www.measurementlab.net/contribute/) page.

* Offering compensation to or other incentivizes to run a *test* is strictly prohibited.

* *Integration developers* with commercial applications need to contribute to the *platform* in some way through financial sponsorship or in-kind contributions. Contact M-Lab at [hello@measurementlab.net](mailto:hello@measurementlab.net) to learn more.

* M-Lab is a fiscally sponsored project of Code for Science and Society, a US-based 501(c)(3) nonprofit supporting open collaboration in public interest technology through fiscal sponsorship and other programs supporting sustainable open source. As such, any use of the *platform* must comply with [IRS regulations](https://www.irs.gov/charities-non-profits/charitable-organizations/exemption-requirements-501c3-organizations) pertaining to charitable organizations, and you agree that you will not use the *platform* or any associated measurement tools or data to intervene in any election or support or oppose any political party or candidate for public office, or engage in any lobbying or otherwise attempt to influence legislation, as defined in Internal Revenue Code Sections 501(c)(3), 501(h) and 4911, and their implementing regulations, or as defined by any federal, state, or local jurisdiction.

* M-Lab reserves the right to adjust *test* limits and requirements for usage tiers, including requiring registration and the payment of fees.  
    
* *Users* should be aware that some servers are M-Lab-managed and some are donor- managed by *hosting providers*. The server a *test* was run on is disclosed in the data resulting from the *test*. To retrieve this data, you will need to know your IP address when the *test* was taken. M-Lab can’t guarantee that specific *users’* *tests* will *test* to specific servers.

 

* M-Lab reserves the right to adopt any and all necessary technical measures to inhibit access to the platform by a specific *user*, group of *users*, or *client* integration, including both temporary and permanent bans, for any or no reason, at M-Lab's discretion.

* Automated and repeated *testing* requires *user* consent and care in implementation so that *clients* do not unintentionally overload the *platform*. The M-Lab *platform* is well provisioned to handle a large amount of concurrent *tests*. However, in order to avoid potential site-reliability issues, M-Lab may impose per *client*, per day rate limits. Interactive *users* must not run more than 40 *tests* per day.  Automated software or hardware *clients* should not run more than 4 *tests* per day, and *test* times should be randomized to avoid overloading the system with a large number of synchronized *tests*.  
    
* You may not use the M-Lab platform or any associated measurement tools or data in any manner that is or could be perceived as unlawful, harmful, threatening, abusive, harassing, tortuous, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful, or otherwise objectionable, or that does or could interfere with or disrupt the *platform* or any servers or networks connected to the *platform*.  
    
* You agree not to take any action which would or could: (1) interfere with or disrupt the M-Lab *platform*, or any servers or networks connected to the *platform*, (2) modify, falsify, misrepresent, or alter any *test* results, or (3) disparage, tarnish, or otherwise harm M-Lab.


## Open Source and Open Data Requirements

The goal of M-Lab is to advance network research and empower the public with useful information about the characteristics of their broadband connections. To further M-Lab’s goals of transparency and reproducibility, all *experiment developers* agree that: 

1. The software (both *client* and server) running the *experiment* will be released under an [Open Source Initiative (OSI) approved license](https://opensource.org/licenses). This ensures that its source code and methodology can be examined by interested parties, and that the *client*-side tools can be integrated into a variety of applications.  

	-and-  
   
2. The data produced by the *experiment* on the *platform* will be released into the public domain (using an [OSI-approved license](https://opensource.org/licenses)) and will be made available for free in a portable format so that the data may be examined and freely used for other research purposes for the foreseeable future. The data must be released within a short period of collection for the duration of the tool’s use of the M-Lab platform. Further information on the licensing of data can be found on [M-Lab’s Data page](https://www.measurementlab.net/data/).

3. M-Lab reserves the right to impose data access quotas to prevent abuse of the platform and/or to manage platform resources.



<br><br>

## Privacy Requirements

Software *clients* developed by *experiment developers* using open source *test(s)* provided by M-Lab, and/or which leverage the M-Lab *platform* as a service, and entities developing third party software *clients*, must comply with, and must maintain a published privacy policy that is consistent with, M-Lab’s [Privacy Policy](https://www.measurementlab.net/privacy/) and the privacy requirements set forth below.


1. Developers Must Document GDPR Compliance

	We provide measurement services to citizens of the European Union, and as such we detail our compliance with the European Union’s General Data Protection Regulation (GDPR) in our [Privacy Policy](https://www.measurementlab.net/privacy/). We also require *experiment developers* hosting *experiments* on M-Lab’s infrastructure or developing third party software *clients* to openly publish a privacy policy demonstrating their compliance with GDPR and how data subjects in the EU may express their rights.

	With respect to GDPR, M-Lab is primarily a data controller (GDPR Art. 4.7) insofar as we determine the means and purposes of the data collected by a *test* hosted on our infrastructure and make it public under the *test*’s methodology. For running *tests* developed by third-party *experiment developers*, M-Lab takes the role of joint controller with such third party, insofar as the third party leverages M-Lab tools to process and host the data resulting from their *test*. If the third party chooses to not leverage M-Lab tools to process and host the resulting data, they will be the sole data controller, with M-Lab simply hosting *experiment* code and not data. We recommend reading the privacy policy found on the website of the applicable *experiment developer’s* or *integration developer’s* website for complete information. Links to such third-party websites can be found on our [tests page](https://www.measurementlab.net/tests/), which describes each M-Lab-hosted *test*.
<br><br>

2. Experiments Must Only Perform Active Measurements

	Since M-Lab is dedicated to the publication of raw data, our policies require that *experiments* ensure that *user* privacy is protected by design within *test* methods. M-Lab-hosted experiments may only use active measurement methods in order to allow for the full public release of the raw data without the need to anonymize or obfuscate personally identifying information. *Tests* running on the M-Lab *platform* must not utilize M-Lab’s infrastructure to conduct passive monitoring of *user* traffic. The transmitted data used by *tests* must be synthetic (e.g. random content or mimicking a protocol) or data that has been generated in a controlled environment independent of the *user* to remove any risk of the exposure of sensitive information. The *test* should not collect or transmit any data that does not directly pertain to the *test*.
<br><br>
	

3. Experiments Hosted on the Platform May Not Collect PII

	M-Lab is committed to preserving *user* privacy. We do not permit collection of information about the content of communications or Internet searches. We collect and publish the public-facing Internet Protocol (IP) address of the *client* that conducted the *test*. This is necessary to understand and describe experimental results, including to identify which Internet service provider the *test* was conducted from. 

	*Clients* or *experiments* may collect additional, generalized information about the *user*’s environment, such as web browser and operating system version, in order to support analysis of measurement data. However, M-Lab does not allow the storage of descriptive information on the *platform* that would associate individual *users* or *clients* to their history of *tests* or devices, such as the hardware identifier, service plan, or network signal metrics. Refer to M-Lab’s [Privacy Policy](https://www.measurementlab.net/privacy/) for more details. 

	While you may wish to collect personally identifying information for research purposes, M-Lab infrastructure cannot be used for collection or storage of this information unless you have received M-Lab’s prior approval to do so. Any *experiment* hosted on M-Lab that wishes to begin collecting personally identifying information, even where outside of M-Lab, must get approval from the Experiment Review Committee prior to such collection and must ensure that such data collection is voluntary on the part of the *user*, with personally identifying information collected only with *user* consent.


<br><br>

## Host-Managed Deployment Policies

One of the ways companies, organizations, and other institutions can [contribute to M-Lab](https://www.measurementlab.net/contribute/) is by deploying one or more donated servers as part of M-Lab's [Host Managed Deployment Program](https://www.measurementlab.net/contribute/#host-managed-deployment) as a *platform* *hosting* *provider*. 

If you are contributing servers to M-Lab as a *hosting* *provider*, you acknowledge and agree that:

* You will comply with the technical requirements set forth on this page under [“Host Managed Deployment](https://www.measurementlab.net/contribute/),” you have the ability to set traffic parameters and probability according to your servers’ capacity and machine specifications, and you will maintain adequate server and network requirements as communicated by M-Lab from time to time.

* You will ensure your contributed servers are accessible to the public, and to any monitoring system(s) deployed by M-Lab.

* You are and will remain responsible for the operation, management, maintenance, and updating of your contributed servers. M-Lab will communicate updates and issues that may impact *hosting providers* but is not responsible for the performance of *hosting* *providers’* machines.

* You have read and agree to the terms of M-Lab’s [Privacy Policy](https://www.measurementlab.net/privacy/).

* M-Lab is an open source platform that publishes [all data collected](https://www.measurementlab.net/data/) under a [No Rights Reserved Creative Commons Zero Waiver](http://creativecommons.org/about/cc0) license.

* If you are contributing a large amount of servers/locations, you may be asked to sign an MOU with M-Lab. 

* M-Lab reserves the right to approve or reject applicants to the Host Managed Deployment Program and reserves the right to remove any *hosting* *providers from*      the Host Managed Deployment Program, for any or no reason, in M-Lab’s sole discretion. 

* M-Lab reserves the right to remove or limit contributed servers for any reason, in its sole discretion (including if there are issues with data quality or reliability).   
    
* M-Lab has sole discretion regarding the manner in which contributed servers, and the data generated by them, are made available and displayed within the M-Lab *platform*.

* M-Lab can’t guarantee that specific *users’* *tests* will use specific servers. *Hosting* *providers* accept that their server(s) will receive *tests* from other networks in addition to *tests* from their own network. Depending on circumstances, *hosting* *providers’* *users* might not test against the *hosting* *provider’s* server(s). *Hosting providers* understand that their own server may get substantial traffic from *users* outside of their network.    
    
* M-Lab is a fiscally sponsored project of Code for Science and Society, a US-based 501(c)(3) nonprofit supporting open collaboration in public interest technology through fiscal sponsorship and other programs supporting sustainable open source. As such, any use of the *platform* must comply with [IRS regulations](https://www.irs.gov/charities-non-profits/charitable-organizations/exemption-requirements-501c3-organizations) pertaining to charitable organizations, and you agree that your contributed servers are not and will not be affiliated or associated with any political party, candidate, group, or committee, and that neither your contributed servers nor your website(s) contain any language endorsing a political party, candidate, group, committee, movement, or purpose.  



## Indemnification Obligation

You agree to release, defend, indemnify, and hold harmless us and our fiscal sponsor, and our and their respective officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debts, and expenses (including but not limited to attorneys’ fees) arising from: (1) your access to, use of, and/or interaction with the M-Lab *platform* or any associated measurement tools and/or data (except for claims caused by M-Lab’s gross negligence or willful misconduct); (2) your violation of any term of this AUP or any other policies posted on the M-Lab website; or (3) your violation of any third party right or any applicable law(s), including without limitation any copyright, trademark, property, or privacy right of any third party. Notwithstanding the foregoing, we reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it. You may not settle any such claim without our prior written consent.



## Disclaimer of Warranties and Limitation of Liability

THE M-LAB *PLATFORM*, AND ALL ASSOCIATED TOOLS AND DATA, ARE PROVIDED ON AN “AS IS” BASIS WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, M-LAB AND ITS FISCAL SPONSOR HEREBY DISCLAIM ALL WARRANTIES, REPRESENTATIONS, CONDITIONS, AND GUARANTEES OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES, REPRESENTATIONS, CONDITIONS, OR GUARANTEES OF QUALITY, MERCHANTABILITY, ACCURACY AND COMPLETENESS, FITNESS FOR A PARTICULAR PURPOSE, UNINTERRUPTED OR ERROR-FREE SERVICE, AND NON-INFRINGEMENT. NEITHER M-LAB NOR ITS FISCAL SPONSOR OR ANY OTHER THIRD PARTY MAKES ANY WARRANTY OR GUARANTEE THAT THE M-LAB *PLATFORM* WILL MEET YOUR REQUIREMENTS OR WILL BE UNINTERRUPTED OR ERROR FREE, OR THAT ALL ERRORS OR DEFECTS WILL BE CORRECTED. THE ENTIRE RISK ARISING OUT OF YOUR ACCESS TO, USE OF, AND/OR INTERACTION WITH THE M-LAB *PLATFORM* OR ANY ASSOCIATED MEASUREMENT TOOLS AND/OR DATA REMAINS WITH YOU.

IN NO EVENT WILL WE OR OUR FISCAL SPONSOR, OR ANY OF OUR OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS, BE LIABLE TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF YOUR ACCESS TO, USE OF, AND/OR INTERACTION WITH THE M-LAB *PLATFORM* OR ANY ASSOCIATED MEASUREMENT TOOLS AND/OR DATA, OR FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL DAMAGES, EXEMPLARY DAMAGES, LOSS OF PROFITS, BUSINESS INTERRUPTION, REPUTATIONAL HARM, OR LOSS OF DATA (EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES OR SUCH DAMAGES ARE FORESEEABLE) OR ANY OTHER DAMAGES OF ANY KIND WHETHER IN AN ACTION IN CONTRACT, TORT OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED TO YOUR ACCESS TO, USE OF, AND/OR INTERACTION WITH THE M-LAB *PLATFORM* OR ANY ASSOCIATED MEASUREMENT TOOLS AND/OR DATA. THE FOREGOING LIMITATIONS OF LIABILITY SHALL APPLY TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.

You acknowledge and agree that the foregoing disclaimer and limitation of liability provisions are a material term of this AUP, that M-Lab is making the *platform* available predicated on the enforceability of these provisions, and that the *platform* would be substantially limited if M-Lab could not limit its liability and disclaim warranties as provided herein.

## Miscellaneous

This AUP constitutes a binding agreement between you and M-Lab. If any provision of this AUP is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions, which shall remain in full force and effect. No waiver of any term of this AUP shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under this AUP shall not constitute a waiver of such right or provision.  This AUP shall be governed by the laws of the State of Delaware, without regard to conflict of laws principles.

## Contact Us

If you have any questions or comments about this Acceptable Use Policy, please contact us at [privacy@measurementlab.net](mailto:privacy@measurementlab.net).