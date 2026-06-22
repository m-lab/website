---
layout: blog
title: "Connectivity CoP — May Session Recap: Shaping the Internet Quality Barometer for Education (IQB-Edu)"
author: "Jonah Duckles"
date: 2026-06-12
breadcrumb: blog
categories:
  - event
  - community
  - research
  - education
---

Two months after our [March launch](https://youtu.be/J5cvJLu1F6c), the Connectivity Community of Practice (CCoP) gathered again on May 18–19, spanning time zones from Michigan to Uganda, Washington DC to Barcelona. The conversation centered on the Internet Quality Barometer for Education (IQB-Edu) — a new measurement framework designed specifically for school connectivity.<!--more-->

## Who Was in the Room

The session drew a diverse mix of researchers, engineers, policy advisors, and practitioners from Merit Network, UC Santa Barbara, Michigan State University, the Internet Society, UCL, the Africa Raspberry Pi Foundation, Giga, M-Lab, and more. The range of expertise — broadband research, Indigenous community networking, rural connectivity in Uganda and Kenya — is a good reminder of how broad the application areas for Internet measurement data are.

## Community Updates

### Interactive Jupyter Notebooks

We're working to make it easier to explore M-Lab data without any local setup. Using MyBinder.org — an open-science project from the JupyterHub community — anyone can click a link and immediately work with M-Lab data in an interactive Jupyter notebook, right in their browser. No login required. The current notebook explores school connectivity data from Moldova, and the community response was enthusiastic. Many participants expressed interest in adapting notebooks for their own data and contexts, and we plan to build on that energy to help others create and share their own. We have also created a simpler view of IQB-Edu in Moldova:

- **[Detailed IQB-Edu for Moldova MyBinder notebook](https://mybinder.org/v2/gh/unicef/giga-mlab-school-connectivity-cop/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fmaterials%2F2026-05-IQB-Edu%2Fnotebooks%2FIQB-Edu_Moldova_schools.ipynb)**: contains code, data and visualizations; how to use the IQB library, calculate IQB-Edu scores, and adapt the parameters of the framework; detailed insights on school connectivity in Moldova
- **[Simple IQB-Edu for Moldova MyBinder notebook](https://mybinder.org/v2/gh/unicef/giga-mlab-school-connectivity-cop/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fmaterials%2F2026-05-IQB-Edu%2Fnotebooks%2FIQB_Edu_Policy_Linkage.ipynb)**: (hidden code) notebook with simple UI for easy parametrization of IQB-Edu and visualization of scores; can be used for experimentation and quick insights

To learn more about how Giga and M-Lab are helping countries around the world with their internet, have a look at [this recent blog post about work in Mongolia](https://giga.global/two-internets-one-classroom-why-mongolias-130-mbps-tells-only-half-the-story/).

### Knowledge Base Coming Soon

The M-Lab and CCoP teams also previewed an upcoming knowledge base — a shared hub for guides, data tutorials, and community documentation. The community had plenty of ideas for what to include: an "M-Lab data bootcamp," code libraries for speed and traceroute analysis, guidance on how measurement server distance affects results, country-level summaries of download/upload speeds, jitter, and latency, and thresholds for characterizing connectivity quality at different levels of aggregation. Stay tuned, the team are working to bring out several knowledge base articles soon. 

## IQB-Edu: Vision, Data, and Discussion

During the call, [Pavlos Sermpezis](https://www.linkedin.com/in/pavlos-sermpezis/) [walked the group through the IQB-Edu framework](https://drive.google.com/file/d/11oc7pcYQXuAl5vDMEOsT30QercQKtpjk/) — a school-specific adaptation of M-Lab's existing Internet Quality Barometer. You can find the presentation and related material at the [CCoP GitHub repository](https://github.com/unicef/giga-mlab-school-connectivity-cop). The initial prototype draws on data from 66 urban and 15 rural schools in Moldova's "Model School" cohort, using two key metrics: 95th percentile performance as a proxy for network capacity, and 50th percentile performance as a proxy for typical user experience. Measurements currently run four times per day, timed around when devices are active and sized to avoid overwhelming data-capped networks.

## What the Community Wants to Fine-Tune

The discussion surfaced a rich set of open questions:

**IQB-Edu weights — and how you can help shape them.** The IQB framework works in two layers: first, network thresholds that define minimum and high-quality performance for each use case (video conferencing, content delivery, administrative tasks, etc.); second, weights that determine how much each use case counts toward the overall score for a given setting — schools look different from homes or offices. Both layers are currently calibrated from expert opinion, and both need real-world validation.

This is where researchers and practitioners in the community can make a concrete contribution. The [IQB-Edu Jupyter notebook](https://mybinder.org/v2/gh/unicef/giga-mlab-school-connectivity-cop/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fmaterials%2F2026-05-IQB-Edu%2Fnotebooks%2FIQB-Edu_Moldova_schools.ipynb) is designed to be hands-on: you can adjust the parameters yourself and see how different threshold or weight choices change what the scores say about Moldova's schools. Does a configuration that emphasizes video conferencing match what you'd expect from your own context? Does it flag the schools you'd expect to flag? That kind of ground-truth check from you would be a great contribution to the community.

Contributions could take several forms: written recommendations on thresholds grounded in existing research or policy standards; analysis using the notebook showing which parameter choices produce meaningful or misleading results in your context; or a list of research questions and ways to visualize the data to better support policy decisions. Share whatever form works best for you with [connectivity-cop@measurementlab.net](mailto:connectivity-cop@measurementlab.net) (we want it to be an iteractive space) or open an issue on the [CoP GitHub](https://github.com/unicef/giga-mlab-school-connectivity-cop).

**Measurement density.** Community feedback suggested that four measurements per day may not be enough. US anchor institution data showed clear performance dips between 11am and 7–8pm — patterns that hourly speed tests or more frequent pings could help explain.

**Adjusting for school size.** Thresholds don't yet account for the number of students or expected concurrent connections. M-Lab has per-school enrollment data; the community will help figure out how best to use it.

**Schools as community hubs.** School networks often serve the surrounding neighborhood, not just enrolled students. Whether a network is school-only or shared with the community changes how measurements should be read.

**eduroam as a measurement opportunity.** One participant raised the idea of using eduroam connection data — as more locations (cafés, libraries, museums) broadcast eduroam signals — to understand student and staff Internet experience beyond the school campus.

**Policy engagement.** The Moldova prototype is a first step toward making IQB-Edu useful for policymakers. The team hopes to present progress at TPRC later this year.

**Resources**  
📃 [CCoP GitHub Repository](https://github.com/unicef/giga-mlab-school-connectivity-cop)  
🔗 [Join the CCoP Google Group](https://forms.gle/SBrd63EgMja1owDt8)  
📧 [connectivity-cop@measurementlab.net](mailto:connectivity-cop@measurementlab.net)  
📊 [IQB-Edu Moldova Notebooks](https://mybinder.org/v2/gh/unicef/giga-mlab-school-connectivity-cop/HEAD?urlpath=%2Fdoc%2Ftree%2F%2Fmaterials%2F2026-05-IQB-Edu%2Fnotebooks%2FIQB-Edu_Moldova_schools.ipynb)

Can't make it live? Join the [CCoP Google Group](https://groups.google.com/a/measurementlab.net/g/connectivity-cop) for materials and updates. Meeting notes and resources live on the [CoP Community GitHub](https://github.com/unicef/giga-mlab-school-connectivity-cop).

Whether you're a researcher, engineer, educator, or policy advocate — your perspectives are welcome here! We hope to see you in June.

---

_As the world's largest open collection of Internet performance data, M-Lab provides powerful, real-world telemetry that helps illuminate how networks actually perform. Through this collaboration, we're working with Giga to strengthen how connectivity is measured and understood for public facilities, especially schools, using open measurement approaches that reflect on-the-ground conditions._

_Giga is a joint initiative of UNICEF and the International Telecommunication Union (ITU), working to connect every school to the internet and every young person to information, opportunity, and choice. Through its global focus on school connectivity, Giga supports governments and partners with data, technical expertise, and financing tools to accelerate meaningful access to the internet for education._
