---
layout: page
permalink: /aup/
title: "M-Lab Acceptable Use Policy"
---

# M-Lab Acceptable Use Policy Summary

This Summary was last modified on _July 1, 2019_

This section provides a summary of the Acceptable Use Policy (“AUP”) that governs the _experiments_ and _clients_ that use the Measurement Lab _platform_. Please see the table of definitions below for explanations of italicized terms.

<div class="table-responsive" markdown="1">

| Term       | Definition                    |
| ---------- | ----------------------------- |
| experiments | The network measurement tests developed by external researchers, which run on the M-Lab platform infrastructure. Experiments have both a server and a client component. The server part runs on the M-Lab platform. The client part is what people use to test to M-Lab servers. |
| clients | The code that people use to run network measurement tests. Each experiment publishes one or more reference clients. Third parties may use these reference clients to publish their own "client". |
| platform | M-Lab's servers and associated infrastructure which enable experiments to be available for clients to test against. |

</div>

This summary is provided as a resource to the public to introduce how partners are required to comply with the foundational values and privacy rules of M-Lab. These rules apply to both partners with a direct relationship to M-Lab as well as third parties that independently use our open source and open access resources to interact with the platform. This section does not describe the full operational requirements placed on partners, such as rules on how experiments are administered, uniqueness of experiment methods, or where test data is stored. The full requirements that partners must adhere to prior to use of the platform are outlined in the [M-Lab Conceptual & Technical Scope & Policies document]({{ site.baseurl }}/mlab-scope/).

The requirements for experiments and client include:

## Open Source and Open Data

The goal of M-Lab is to advance network research and empower the public with useful information about the characteristics of their broadband connections. For the purpose of transparency and reproducibility, the software (both client and server) running the experiment must be released under an Open Source Initiative (OSI) approved license. This ensures that its source code and methodology can be examined by interested parties, and that the client-side tools can be integrated into a variety of applications.

The data produced by the experiment must be released into the public domain (using an [OSI-approved license](https://opensource.org/licenses){:target="_blank"}). It must also be made available for free in a portable format so that the data may be examined and freely used for other research purposes for the foreseeable future. The data must be released within a short period of collection for the duration of the tool’s use of the M-Lab platform. Further information on the licensing of data can be found on [M-Lab's Data page]({{ site.baseurl }}/data/).

## Privacy Policies and GDPR Compliant Practices
M-Lab provides measurement services to citizens of the European Union, and as such provides complete details of our compliance with the European Union’s General Data Protection Regulation (GDPR) in our Privacy Policy. Further, M-Lab requires that each third-party researcher hosting measurement “experiments” or tests on M-Lab’s infrastructure also openly publish a privacy policy demonstrating compliance with GDPR and how data subjects in the EU may express their rights.

In summary with respect to GDPR, M-Lab is primarily a data controller (GDPR Art. 4.7) insofar as we determine the means and purposes of the data collected by a test hosted on our infrastructure and make it public under our the test’s methodology. For running tests developed by third-party researchers (further “experimenters”), M-Lab takes the role of joint controller with the experimenter, insofar as the experimenter leverages M-Lab tools to process and host the data resulting from their experiment. Some experimenters may choose to not leverage M-Lab tools for this purpose, in which case they are sole data controllers, with M-Lab simply hosting experiment code and not data. We recommend reading the privacy policy found on the website of each experimenter’s website for complete information. Links to experimenters’ websites can be found on our pages describing each M-Lab hosted test. All M-Lab hosted tests are listed on our [tests page]({{ site.baseurl }}/tests/).

## Active Measurements

Since M-Lab is dedicated to the publication of raw data, its policies require that experiments ensure that user privacy is protected by design within test methods. M-Lab hosted experiments may only use active measurement methods in order to allow for the full public release of the raw data without the need to anonymize or obfuscate personally identifying information. Tests running on M-Lab must not utilize M-Lab's infrastructure to conduct passive monitoring of user traffic. The transmitted data used by experiments must be synthetic (e.g. random content or mimicking a protocol) or data that has been generated in a controlled environment independent of the user to remove any risk of the exposure of sensitive information. The test should not collect or transmit any data that does not directly pertain to the test.

## No Personal Information

M-Lab is committed to preserving user privacy. M-Lab does not permit collection of information about content of communications, such as emails, names, or Internet searches. M-Lab collects and publishes the public-facing Internet Protocol (IP) address of the client that conducted the measurement. This is necessary to understand and describe experimental results, including to identify which Internet service provider the test was conducted from.

Clients or experiments may collect additional, generalized information about the user's environment in order to support analysis of measurement data, such as web browser and operating system version. However, M-Lab does not allow the storage of descriptive information on the platform that would associate individuals or clients to their history of tests or devices, such as the hardware identifier, service plan, or network signal metrics.

While an experiment may wish to collect personal information for research purposes, M-Lab infrastructure cannot be used for collection or storage of this information. The collection of personal information by an experiment should be clearly indicated to users. Any experiment hosted on M-Lab that intends to begin collecting personal information even where outside of M-Lab must get approval from the Experiment Review Committee prior to such collection, and be voluntary and gathered based on user consent.

## Contact

If you have any questions, comments, or requests regarding M-Lab's Acceptable Use Policy, please feel free to contact us at [privacy@measurementlab.net](mailto:privacy@measurementlab.net)
