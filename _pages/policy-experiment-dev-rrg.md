---
layout: page
permalink: /experimenter-requirements-guidelines/
title: "M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines"
breadcrumb: "about"
---

# M-Lab Experiment Developer Responsibilities, Requirements, and Guidelines

This document outlines the responsibilities, requirements, and best practice
guidelines for experiment developers operating an experiment on the M-Lab
platform. Our team is available to consult with experiment developers on both
new and existing experiments.

## Experiment Application & Review Process

Measurement Lab (M-Lab) is an open platform for research, and welcomes the
involvement of new participants. Experiment Developers must first [apply]({{
site.baseurl }}/contribute/#develop-a-test) to host their tool on the M-Lab
platform. Experiments are vetted by the Experiment Design and Review Committee
for their potential usefulness for Internet users and research, differentiation
from other experiments, and other factors prior to approval and deployment. The
Experiment Design and Review Committee and/or the M-Lab team will provide
feedback to the Experiment Developer, and may ask for modifications to be made
to ensure the experiment meets all requirements and expectations.

In the interest of managing the use of resources and steering the mission of the
project, any experiment running on M-Lab must adhere to the following underlying
principles, unless waived by the Experiment Design and Review Committee due to
unusual circumstances:

* **The experiment being used must be open-source.**  The software running the
  experiment must be released under an [OSI-approved
  license](https://opensource.org/licenses){:target="_blank"}. This ensures that
  its source code and methodology can be examined by interested parties, and
  that the client-side tools can be integrated into a variety of applications.
  Each experiment must include client as well as server code, all of which must
  be licensed as open source. Only the original experiment, when deployed on the
  platform initially, must openly license client-side code as a reference
  implementation. The client-side reference implementation can be separate from
  the version actually deployed to users, as long as it provides a reference for
  the application-layer protocol deployed. The purpose of an open source client
  implementation is to allow third parties to more easily integrate the code
  into their own custom clients. The source code to the tools must be released
  prior to it being deployed to the M-Lab production platform and remain
  available to the public while hosted on the M-Lab platform.
* **The experiment must produce server-side data.** We expect that all
  experiments produce server-side data intended for public use. It is this
  public data that makes the work of deploying, maintaining, and running of the
  experiments valuable to M-Lab and the world.
* **The data must be released into the public domain.** All data produced by the
  experiment running on the M-Lab platform must be released into the public
  domain (using a Creative Commons Zero (CC0) license) and made available for
  free in a portable, machine readable format (e.g. JSON,
  [JSONL](http://jsonlines.org/){:target="_blank"}) so that it may be examined
  and freely used for research purposes for the foreseeable future. The data
  must be released immediately upon its collection. There is one exception for
  new experiments. New experiments may embargo data for the shorter of the two
  periods:
  * until a research paper is published utilizing data from the experiment as
    run on the M-Lab platform or
  * one year from the time of the experiment’s initial launch.

  After this initial optional embargo period the exception is over, and
  afterward all data must be released immediately.
* **The measurement must be client-initiated.** End users of the M-Lab platform
  must explicitly “opt-in” to running a measurement.
* **Experiments must only perform “active measurements”.** Here “active” means
  that the client and server generate the network traffic that is measured. In
  contrast, “passive” measurements involve observations of _user data unrelated_
  to the experiment. For example, an active measurement could send text (e.g.
  random, synthetic, or prerecorded) to measure download speed, while a passive
  measurement might record a user’s actual DNS lookups. In all cases, any
  transmitted data should be absent of any human subject information. M-Lab is
  for measuring the network not the user.
* **Experiments must actively seek to minimize the collection of PII on the
  M-Lab platform, ideally collecting none at all.** M-Lab seeks to measure the
  Internet infrastructure without tracking individual Internet users. M-Lab is
  committed to preserving user privacy, and experiments running on the platform
  must not collect any information on M-Lab which M-Lab is not permitted to
  publish. As such, any PII that is collected requires explicit user consent, as
  well as that the PII be required for the user's understanding of the data
  (that it be collected for a legitimate purpose). For example, the NDT
  experiment requires that users consent to the saving of their public IP
  address and no other data is required to be submitted to M-Lab to perform the
  test. Because NDT results don't make sense without the IP address, collection
  of this single instance of PII is required for the test results to make sense
  at all. Each experiment is different, and each experiment's data needs are
  different, but the principle is the same: strict data minimization is required
  for all data collected, saved, and published by the M-Lab platform. This
  minimization should restrict the data saved to the subset that is required for
  the test user to understand their own results, rather than the (much larger)
  set of all data that could potentially be of future interest to an
  experimenter. For most experiments, we anticipate that the only PII required
  by the experiment should be the public-facing IP address of the client.
  
  Many useful experiments require additional information which might include
  richer PII of interest to the experimenter (e.g. precise geolocation). In
  order to use M-Lab these experiments must segregate PII and non-PII data; they
  must use their own infrastructure for any data that might contain PII other
  than IP addresses; they must not use M-Lab servers or data collection to
  process PII (other than the IP addresses) in any way; they must provide public
  documentation of their experiment’s compliance with these requirements to be
  published on or referenced on the M-Lab website; and they must keep the
  Experiment Design and Review Committee informed and up to date about all of
  these practices.
* **Experiments are subject to operational auditing and tracing.** For all
  client connections initiated with experiments running on M-Lab servers, M-Lab
  will implement operational auditing and tracing of the connection. This
  includes packet capture (.pcap), tcp_info, and other tools used to observe the
  experiment behavior both in testing and production environments. Furthermore,
  all data resulting from this operational auditing and tracing is published
  openly in the M-Lab data archive.
* **Experimenters must document compliance as Data Controllers under GDPR.**
  Under the European Union’s General Data Protection Regulation (GDPR),
  experiment developers are considered the data controllers for their M-Lab
  hosted experiments and data, and must maintain separate GDPR compliant
  policies for their experiments and data. M-Lab requires all hosted experiments
  to maintain a publicly available privacy policy to which we may refer GDPR
  related or other inquiries.
  
  When experimenters leverage the M-Lab ETL pipeline to publish raw test data
  and/or BigQuery datasets, the experimenter consents to joint controllership of
  their experiment’s data, allowing M-Lab the legal basis for processing it and
  making it available publicly on the experimenter’s behalf. In this case,
  experimenters should reflect their roles as joint controllers on their own
  privacy policies, communicated at the time a person runs their test, which
  should clearly describe which data serves what purpose and what legal base is
  applied for each.

An experiment which fits these criteria may apply by submitting the following
information to the Experiment Design and Review Committee:

1. A description of the organization building and sponsoring the experiment, if
   applicable, and an introduction to the team that will be maintaining the
   experiment’s code and documentation supporting its users.
2. A narrative description of the value of hosting the experiment long term with M-Lab.
3. A narrative description of the experiment’s research goals and how those
   goals align with [M-Lab’s research goals]({{ site.baseurl }}/about). What do
   you hope to study by conducting this experiment? Over what period of time do
   you intend that this experiment run?
4. A description of the experiment’s methodology.
  * This should include an in-depth description of the data the experiment
    gathers and how it is gathered, as well as what information is transmitted
    in each direction (client to server, server to client). It should make clear
    how the experiment intends to fit within the principles described above and
    should additionally describe how the experiment differs from existing M-Lab
    experiments.
  * To the best of your abilities, please estimate the bandwidth needed for your
    experiment to give M-Lab a sense of the resources needed by the experiment.
  * Note: experiments should be novel for M-Lab, both in the data they collect
    and the experience they offer to the client relative to existing measurement
    tools available on the M-Lab platform. If the experiment proposed already
    exists and is open-source then links to access the source code should be
    included. If research papers or articles already exist describing the
    experiment, links to publicly available papers, articles, and other
    documentation should be included.
5. An example of the data files generated by the experiment.
6. A statement that the Experiment Developers submitting the experiment
   application have read and understood the [M-Lab Conceptual and Technical
   Scope and Policies document]({{ site.baseurl }}/mlab-scope/), and will
   operate the experiment in accordance with their responsibilities as laid out
   in that document.
7. A timeline for deploying the experiment, including what milestones exist and
   what effort is being put into meeting those milestones.
8. Documentation proving that the experiment has been approved or exemption by
   an Institutional Review Board (IRB), Human Subjects Research Board, or other
   equivalent reviewing entity as appropriate. As a platform that supports open
   science, M-Lab is concerned with ensuring that all experiments and services
   running on its platform infrastructure be compliant with accepted standards
   for human subjects research. Additionally, because all data resulting from
   experiments running on the M-Lab platform infrastructure is published in a
   publicly available data archive, all published data must not include
   Personally Identifiable Information (PII). To these ends, each Experiment
   Developer is required to ensure that their experiment code and the data it
   produces has been reviewed and approved for use in human subjects research by
   their host organization’s Institutional Review Board (IRB). If the host
   organization does not have an IRB, there are firms that can provide a human
   subjects review independently that M-Lab can provide contacts and referrals
   to. All experimenters must show that their experiment and the resulting data
   it produces do not produce significant risk to persons choosing to run the
   experiment, and that PII is not present in the resulting data.
9. M-Lab requires experiment developers hosting experiments on our platform to
   maintain a publicly available privacy policy to which we may refer GDPR
   related or other inquiries.
10. When experimenters leverage the M-Lab ETL pipeline to publish raw test data
    and/or BigQuery datasets, the experimenter must consent to M-Lab being a
    joint controller of the resulting data collected by the experiment by
    completing and signing the M-Lab Data Processing and Joint Controller
    Agreement in the [M-Lab/Experiment Developer Memorandum of
    Understanding]({{ site.baseurl }}/experimenter-mou/).

These materials should be submitted to M-Lab. The team will review for clarity
and questions around operational capacity and need before submitting to the
[Experiment Design & Review Committee]({{ site.baseurl
}}/who/#experiment-review-committee). Once the experiment application has been
submitted to the Experiment Design and Review Committee, they will discuss the
application at their next official meeting or via email, and decide whether or
not to support the new experiment. The Experiment Design and Review Committee
will consider applications based on their adherence to the principles outlined
in this document, the unique value add of the experiment, and benefit to the
Internet Measurement Community at large. The Committee will share their decision
and reasoning with the experiment developers and the M-Lab team.

## Experiment Requirements

### Docker containers

M-Lab uses [docker](https://www.docker.com/){:target="_blank"} for
virtualization and [kubernetes](https://kubernetes.io/){:target="_blank"} for
deployment. Your experiment must work inside a docker container. M-Lab expects a
dockerfile which will build your container from source and provide all expected
functionality for your experiment and for operational monitoring by the M-Lab
team.

### Experiments must write test data to a specified directory

Experiments should accept the directory name as a command line parameter or use
an environment variable to determine where resulting test data should be stored.
Data written to that directory will be automatically uploaded, archived and
published to Google Cloud Storage (GCS) by M-Lab.

Every running experiment will have a directory for spooling new measurement data
for upload. The name of this directory should be configurable. M-Lab will deploy
the experiment configured to save data to some subdirectory of `/var/spool`.  To
upload experiment results to M-Lab's public archive, simply save the data
file(s) to that directory. Immediately after a program calls `close()` on a file
in that directory, an event listener reads the file and prepares its contents
for upload. The uploader will delete the files after successful upload. The
current code for the system listener that pushes data to M-Lab's data archive
can be found at:
[https://github.com/m-lab/pusher](https://github.com/m-lab/pusher){:target="_blank"}.

Experiment Developers should refer to the M-Lab Pusher Design Doc to ensure
experiment code meets all of M-Lab’s essential design constraints and follows
best practices. Essentially, pusher requires that the files it uploads be:

* **Only closed once.** Once a file is closed after writing (or moved to the
  directory), it should never be opened for writing again. Pusher assumes
  ownership of the file after the file is closed, and Pusher reads files
  immediately after taking ownership of them.
* **Not needed by the system after being closed.** Once a file is closed (or
  moved to the directory), Pusher assumes ownership of the file, and that
  includes assuming that it is no longer needed and may be deleted after upload.
* **Not too old and not too gradually updated.** A tunable parameter for Pusher
  is an age limit. By default it is two hours. If the last-modified time of a
  file is more than two hours in the past, Pusher assumes that the file's
  CLOSE_WRITE event was missed (because delivery of those events is not
  guaranteed) and that the file is eligible for upload. Files that linger open
  for more than two hours without being modified therefore run the risk of being
  uploaded prematurely.

## Experiment Operating Environment

### Container life-cycle managed by M-Lab staff

To ensure that M-Lab staff can audit software running on the production
platform, apply emergency updates if necessary, and maintain production
deployment SLOs, M-Lab staff manage the complete container lifecycle. Experiment
Developers are required to provide the M-Lab team with access to the experiment
source code (which must be openly licensed) and the build process must be
automated. The M-Lab team will work with Experiment Developers to test and
confirm that experiment code functions as expected, and that all monitoring and
other operational requirements are met. M-Lab provides support to experiment
developers to test their docker container(s) on testing infrastructure to ensure
correct and expected operations. M-Lab will work with Experiment Developers to
iterate on issues until the experiment can be deployed safely to production
infrastructure.

### Access to production machines and containers

Experiment Developers will not have direct access to production servers or
individual containers running in the production kubernetes cluster.
Experimenters will develop using local docker containers and the M-Lab team will
work with Experiment Developers to test working containers on non-production
testing infrastructure.

### Containers are allocated dedicated public IP addresses

Experiments are allocated one IPv4 address and one IPv6 address per machine (if
IPv6 is available at that site). A container application that opens a listening
socket in the container will result in a listener on the public IPs on that same
port. To achieve the same effect when developing locally, provide the
`--net=host` argument to your docker run command.

### Resource Allocation per experiment

The M-Lab platform is finite: a finite number of sites, operational machines at
each site, available capacity per machine, and switch uplink capacity. So,
experiments are assigned “resource allocations” that limit the maximum resource
utilization over some short time period.

Default Resource Allocations:

* CPU: 1 core
* RAM: 1GB
* Disk space: 20GB
* Disk I/O: 10%
* Network bandwidth: 100 Mbps Avg over 5 min

Limited CPU and Network bandwidth are the most likely to interfere with
measurements. So, care must be taken to pace clients in such a way to respect
resource utilization limits. Based on the available capacity and experiment
requirements, default allocations may be adjusted. If you need more, let us
know. We are always interested in expanding available platform resources for all
experiments through third-party donations.

These limits safeguard the platform and all other experiments on the platform
that operate within resource limits.

## Experiment Best Practices

### Code version control & unit tests

For development, we strongly recommend:

* A publicly accessible, openly licensed source repository, and
* Unit tests that run every time your code is compiled.

To aid in development and satisfy these recommendations, M-Lab currently uses:

* [github.com](https://github.com){:target="_blank"} for our code repositories,
* [travis-ci.com](https://travis-ci.com){:target="_blank"} and [Google Cloud
  Build](https://cloud.google.com/cloud-build) to automatically build our code and run our unit tests (integrated
  with Github), and
* [coveralls.io](https://coveralls.io){:target="_blank"} for tracking test
  coverage of our code (integrated with both GitHub and Travis).

Updating experiment container images
* M-Lab makes a clone of your experiment repository on Github, and automates
  building of container images for repository pushes and tags.
* If you need to update your experiment, create a PR from the experiment’s
  upstream repository against M-Lab’s clone, and then notify M-Lab of the PR. To make a
  PR from an upstream repository against a clone of that repository requires
  [comparing across forks on Github](https://docs.github.com/en/github/committing-changes-to-your-project/comparing-commits#comparing-across-forks).
* M-Lab will review the PR and, when it is ready, merge it, after which M-Lab’s
  clone will be tagged, creating a versioned container image which M-Lab
  operators will deploy through its sandbox cluster, then to the staging
  cluster, and eventually into production. 

### Label experiment data with socket UUID

Experiment data should, to the maximum degree possible, be joinable with other
data. To aid in this, we recommend that you use the [UUID
library](https://github.com/m-lab/uuid){:target="_blank"} to label TCP
connection data saved by your experiment. The label may be the file name, or
additional metadata saved with experiment data. Within a standard M-Lab
environment, collecting the UUID for a TCP connection is as simple as:

  **uuid, err := uuid.FromTCPConn(conn)**

If your experiment creates multiple TCP connections per test, collect all UUIDs
associated with the test and save them together.

The socket UUID is recorded automatically by the
[traceroute-caller](https://github.com/m-lab/traceroute-caller){:target="_blank"}
and [tcp-info](https://github.com/m-lab/tcp-info){:target="_blank"} sidecar
services bundled with most experiments. When your experiment includes the UUID
of tests, then analysts (including you!) will be able to easily join the
experiment data with sidecar service data for richer analysis.

If your experiment is written in a language that does not currently have support
in the UUID library, let us know and we will write a library for you to use.

### Making your data available in BigQuery

We encourage all experiment developers to write a parser to convert the
individual data files generated by your experiment into JSON objects as part of
[http://github.com/m-lab/etl](http://github.com/m-lab/etl){:target="_blank"} .
This will allow M-Lab to provide BigQuery access to your parsed data in
BigQuery. The simplest example parser is the S[witch DISCO dataset
parser](https://github.com/m-lab/etl/blob/master/parser/disco.go){:target="_blank"}
because archive files are [JSONL](http://jsonlines.org/){:target="_blank"}.

### Monitoring support for your experiment

The M-Lab team maintains all aspects of deploying and managing M-Lab servers,
deploying and managing the lifecycle of experiments provided by Experiment
Developers, and are responsible for core operating system and package updates,
security, etc. of the platform infrastructure. M-Lab also maintains a robust
monitoring system of all platform infrastructure, and health checks for
experiment code running in virtual containers platform-wide. Experiment
Developers are expected to provide monitoring support within their code,
including:

* a [livenessProbe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/){:target="_blank"} command
* a simple counter that increments for every experiment run on each container
* metric labels indicating whether an experiment succeeded or failed
* any additional metrics as needed to allow effective monitoring and support
  SLOs, allowing M-Lab to more easily monitor the health of your service

The “Four Golden Signals” are the most helpful for creating an SLO for your service:

* Traffic - e.g. number of requests, requests / sec, bytes / sec.
* Errors - e.g. requests that fail, for any reason.
* Test duration - e.g. time to service a request, seconds / request.
* Saturation - e.g. system capacity, a fraction or percentage.

See “[SRE: Chapter 6: Four Golden
Signals](https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/#xref_monitoring_golden-signals){:target="_blank"}”
for more information. Prometheus client libraries are available in [most
languages](https://prometheus.io/docs/instrumenting/clientlibs/){:target="_blank"}.

## Experiment Support & M-Lab Community Expectations

Experiment Developers should provide links to documentation of their experiment
to support end users, as well as a support or contact email address where users
may be directed by M-Lab support staff. The M-Lab team will also coordinate with
Experiment Developers to place relevant documentation on the measurementlab.net
website if desired.

Third-party developers are frequently interested in integrating M-Lab hosted
tests into their applications. If this is of interest, then Experiment
Developers need to include documentation about how to approach developing with
the experiment.

The M-Lab team also maintains community lists/groups/forums where Experiment
Developers may engage with and support users directly. We encourage Experiment
Developers to be involved in M-Lab community forums.

## Experiment Lifecycle Expectations

M-Lab expects Experiment Developers to maintain and support experiment code
running on the platform for at least the period of their MoU with M-Lab.
Further, M-Lab expects experiments running on the platform to be actively
maintained and supported for the term of the MoU.

## Decommissioning

In the event that an Experiment Developer wishes to retire an experiment, M-Lab
will expect to coordinate on timing and communications to users with as much
advance notice as possible. Typically decommissioning will be scheduled during
the MoU renewal process if an Experiment Developer indicates a desire to
discontinue hosting. However, decommissioning an experiment outside of this
cycle is possible on a case by case basis.

The M-Lab team reserves the right to halt an experiment out of cycle in the
event that experiment:

* is overwhelming M-Lab pod switches, uplinks, or other infrastructure
* is the cause of any security related incident affects the performance of other
  hosted experiments
* or other reasons not outlined here, but which may necessitate administrative
  action to ensure our SLOs are met

In the event of such incidents as described above, M-Lab’s first action will be
to halt experiment containers and communicate with experiment developers on an
appropriate course of action. If an experiment developer is unresponsive, in
such an incident, or otherwise, this may be cause for M-Lab to consider
permanent decommissioning of the experiment.
