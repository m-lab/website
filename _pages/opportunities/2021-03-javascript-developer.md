---
layout: page
permalink: /jobs/2021-03/javascript-developer/
title: "Javascript Developer contract position(s)"
page-title: "Javascript Developer contract position(s)"
breadcrumb: "contribute"
---

Measurement Lab is seeking a Javascript developer for a contract position to complete the following milestones.

## Contract Milestones

### Consolidation of M-Lab websites

**Background**

M-Lab currently has three web properties, each with different development/site generation frameworks, and two different hosting platforms:

| Field name       | Type       | Description    |
| :----------------|:----------:|:---------------|
| https://measurementlab.net | Jekyll | Firebase |
| https://speed.measurementlab.net | Angular | Firebase |
| https://viz.measurementlab.net | React | AppEngine |

We would like to standardize the web development framework on React, and combine
all three into one website. Other M-Lab projects such as Piecewise and
Murakami’s visualization service also employ React. Frameworks that use React as
a base provide additional features.

**Why React?**
* The React JS framework has become widely used for web and frontend development.
* Can be used to build native mobile and web apps from the same content/code,
  and static-generated websites with react-static.
* Better SEO built in
* Many plugins and features
* Closer to current developer practice and experience

**Summary**

The M-Lab website uses a static site generator, Jekyll, that is great for basic
sites. It filled our needs when we transitioned from the previous version. But
adding new, more dynamic features, such as jupyter notebooks, language
translation, and adding more data-driven content requires a different approach.
Further, we’ve developed two other micro or sub-sites using newer web frameworks
and wish to consolidate and settle on a new site framework that is more apt to
be supportable by web developers on contract and/or with a more current skill
set. After discussing options with our most recent contract developer,
[Next.js](https://nextjs.org/){:target="_blank"} was put forward as a good
option for this consolidation.

**Deliverables**

Design the new site
* Design a Next.js application that supports
  * Page and post content authored in markdown
  * Blog organized by date, category/tag, multiple authors
  * Embedding Jupyter notebooks in pages
  * 301 redirects for pages that have moved and others that will
  * Data driven pages such as [this page](https://github.com/m-lab/mlab-vis-client/tree/viz-dashboard/src/containers/DashboardPage)
  * Multiple languages using gettext / [i18next](https://www.i18next.com/overview/plugins-and-utils)
  * Automated, continuous integration and publishing using Travis-ci.com to
  sandbox and production environments
  * Basic web pages, good tools for organizing and presenting documentation
  * (Future) Language [translation](https://medium.com/swlh/how-to-build-a-multilingual-website-in-next-js-2924eeb462bc)
* Design (or select and customize) a site theme that is modern and responsive to all screen sizes.
  * Speed.measurementlab.net theme could be an example or starting point

Convert existing website to new site
* Convert the existing website to a React-based framework into the new next.js application
* Move/convert all existing content from the existing website into the new site framework and theme
  * Move/convert statistics dashboard  page into the new site framework
  * Create a page on the new site that provides the ndt7-js test, replacing mlab-speedtest.
* Host the new site as a service on Google AppEngine
* Documentation
  * Setting up a new developer environment for building, testing, and publishing

### ndt7-js client

**Background**

On each server of our global platform M-Lab hosts a suite of measurement
services, including our most popular service, NDT. In 2019 we released a new
version of NDT called [ndt7]({{ site.baseurl }}/blog/evolution-of-ndt/#evolution-of-ndt). In
order to enable users to run NDT tests using ndt7 from their devices we depend
upon a community of client integrations, which are often based on our open
source reference clients. Currently,  reference clients are available for ndt7
in Go and node.js.

**Summary**

We are looking for a contract developer to create a reference web implementation
for NDT integrators. The goal of this work is to make it as easy as possible to
integrate NDT into their websites.

**Deliverables**

Changes to ndt7 package (core library)
* Enhance client to [accept user-provided metadata](https://github.com/m-lab/ndt7-js/issues/4)
* Enhance client to [try all available
  servers](https://github.com/m-lab/ndt7-js/issues/9) if initial connections
  fail
* Add automation to publish npm updates for the ndt7 package on github tags
* Write documentation that describes the process of integrating ndt7 into a website

Create a reference web implementation with basic functionality
* Document example implementations for angular.js, react.js, and js

Demonstrate and document use of all callback functions
* Create a series of examples that demonstrate additional customizable options, including
* Enabling HTML5 geolocation
* Exporting results to a cloud service
* Customizing the user interface
* And any others that become apparent through collaborative discovery with the M-Lab team

## Interested?

Please send: a summary of your qualifications and a quote for your services to laiyi@measurementlab.net.

## About Measurement Lab

M-Lab aims to advance Internet research by empowering consumers with useful information about their Internet performance. By providing free, open Internet measurement data, researchers, regulators, advocacy groups, and the general public can get a better sense of how the Internet is working for them, and how to maintain and improve it for the future.

Measurement Lab is a fiscally sponsored project of [Code for Science & Society](https://codeforscience.org/){:target="_blank"}, a non-profit organization supporting open collaboration in public interest technology.
