# Connectivity Community of Practice: Community Organizing Plan

*A guide for community managers stewarding the M-Lab / Giga Connectivity Community of Practice (CCoP)*

---

## Where We Are Now

The Connectivity Community of Practice launched on March 11, 2026, with 51 global participants and 53 members already in the CoP Google Group. The CCoP builds on a longer arc of community-building work: four Open Measurement Gatherings with OONI, IODA, and Censored Planet (2024–2025), a multi-year research fellowship program, monthly community calls running since 2021, and the publication of the Internet Quality Barometer (IQB) framework in mid-2025.

The four active workstreams are:
1. **Improving measurement tools** — refining how we collect data
2. **Characterization of facility-based connectivity** — understanding how networks perform in schools and public institutions
3. **IQB-Edu** — adapting the Internet Quality Barometer for education contexts
4. **New insights from existing measurement data** — mining the existing M-Lab corpus for answers we haven't asked for yet

Members have already surfaced additional ideas: student Internet usage patterns, proximity of CDNs and IXPs to schools, connectivity infrastructure development, and the right to access content free of throttling and censorship. These are the seedbeds for new workstreams.

---

## Who We Are Activating

The CCoP brings together people who often work in parallel but rarely in the same room. The community manager's job is to make visible what each group offers and needs:

| Audience | What they bring | What they need |
|---|---|---|
| **Internet researchers** (academic & independent) | Methods, publications, credibility | Datasets, collaboration, real-world problem statements |
| **Network engineers & implementers** | Infrastructure, operational knowledge | Research findings translated into actionable specs |
| **Policy advocates & digital rights activists** | On-the-ground context, political reach | Data they can cite, visualizations, comparisons |
| **Policymakers & regulators** | Authority, funding, mandates | Standardized metrics, clear executive summaries |
| **Educators & school network managers** | Knowledge of end-user context in facilities | Tools that speak to their reality, not just lab conditions |
| **Civil society & international NGOs** | Relationships in underserved regions | Open access to data, simplified onboarding |
| **Funders** | Sustainability | Evidence of impact, community momentum |

The common thread: everyone is working at the intersection of Internet measurement and connectivity equity. The CCoP's organizing principle is **"better together"** — no single group can do this alone.

---

## Core Organizing Principles

These come directly from the language the community has used:

- **Open data, open tools, open collaboration.** Everything the CCoP produces should be releasable and reusable. The M-Lab dataset is CC0 — no rights reserved. Hold that standard.
- **Learning in the open.** Share work before it's polished. The OMG convenings built trust by previewing findings publicly before formal publication.
- **Impact-centered research.** Keep asking: who is most impacted by poor connectivity, and are we measuring what matters to them? Avoid decentering the communities the data is meant to serve.
- **Technically rigorous, globally comparable, practical.** This three-part test should guide every decision about what to measure and how to present it.
- **BYOI — Bring Your Own Ideas.** Participants bring real problems. The community manager's job is to hold space for those problems to become workstreams.

---

## Activating the Community: A 12-Month Cadence

### Phase 1: Establish the Rhythm (Months 1–3)

**Monthly calls with a consistent structure.**
The CCoP should follow M-Lab's proven model: first Thursday of the month, 60–90 minutes, Zoom, recorded and posted to YouTube. Rotate focus: one month on tools/measurement, one on policy/advocacy, one on data access/analysis. This gives different audience segments a reason to show up.

**Working group formation.**
Use the inaugural community document to cluster members into working groups around the four workstreams. Keep groups small (5–8 people) so they can actually move. Name a convener for each group — not a gatekeeper, but someone who keeps the conversation alive between calls.

**Office hours for data newcomers.**
Maintain the existing format (third Thursday of the month, up to five participants per session) but explicitly market it to CCoP members who are new to BigQuery or M-Lab data. The goal is zero barriers between a civil society researcher and their first meaningful query.

**Publish governance documents.**
Superbloom Design is supporting governance. Get governance documents out early so members understand how decisions are made. Governance transparency is itself a form of community trust-building.

### Phase 2: Deepen and Connect (Months 4–8)

**Cross-workstream synthesis sessions.**
Every two months, bring workstream conveners together to share what they've learned. Fragmented workstreams stay siloed unless the community manager actively bridges them. A finding in the "characterization of facility-based connectivity" workstream might directly inform IQB-Edu. Create the conditions for that connection to happen.

**Community-contributed blog posts.**
The geolocation post from May 2025 — written by a Ph.D. candidate and a Google research scientist, published on the M-Lab blog — is an excellent model. Invite CCoP members to document their work in progress as blog posts. This is "learning in the open" applied to the community.

**AMA-style public events.**
The OMG AMA in June 2025 drew ~60 participants and was explicitly for "advocacy organizations, digital rights researchers, anti-censorship tool developers, journalists, lawyers, activists, policy makers, and funders." Run a similar event for the CCoP, where working groups present their progress and take questions from the broader Internet freedom community. Record and caption it.

**Hackathon affiliation.**
Continue the tradition of co-organizing a hackathon at IMC (Internet Measurement Conference) each fall. Frame the CCoP as the year-round community that hackathon teams can stay connected to afterward.

### Phase 3: Sustain and Expand (Months 9–12)

**Year-end review and planning.**
Hold a structured reflection session, as M-Lab did at Pulse Research Week in December 2025: what did the community learn, what gaps remain, what workstreams should continue or sunset, and what new ideas have emerged from participants?

**Research fellowship round.**
The M-Lab fellowship model (open call, 3–5 fellows, short-term funded engagement, public presentations) is proven. Consider a CCoP-specific fellowship track for researchers focused on school connectivity or IQB-Edu.

**Expand the membership pipeline.**
Target specific networks: RightsCon, IGF, AfricaCom, APRICOT, and LACNOG all attract the kinds of internet activists and implementers who should be in this community. The CCoP's presence at these events should come with a clear "here's how to join and what you'll get" message.

---

## Demystifying BigQuery: A Community Access Plan

BigQuery is the primary interface to M-Lab's data for researchers, but it carries a reputation for being inaccessible to non-technical users. The community manager can break this barrier with a structured progression:

### Step 0: Join the M-Lab Discuss Google Group
This is the literal prerequisite for free query access. M-Lab pays the query costs for group members. Frame this not as a bureaucratic step but as joining a community of practice in its own right — the Discuss list is where researchers have asked questions and shared results for over a decade.

### Step 1: Browser-first orientation
Start every new member with the Google Cloud Console at `console.cloud.google.com/bigquery?project=measurement-lab`. No software install required. The project is pre-selected; the data is already there. Have them run a single query:

```sql
SELECT
  date,
  COUNT(*) AS tests,
  AVG(a.MeanThroughputMbps) AS avg_download_mbps
FROM `measurement-lab.ndt.ndt7`
WHERE date = '2025-01-01'
  AND client.Geo.CountryCode = 'KE'
GROUP BY date
```

Replace `'KE'` with their country. That's a result they can hold.

### Step 2: Use the community-contributed query library
The blog archive contains worked examples — the geolocation consistency query, the reverse traceroute notebook, the NDT schema documentation. Turn these into a navigable query library, grouped by use case: broadband mapping, policy analysis, net neutrality research, school connectivity.

### Step 3: Colab notebooks as the on-ramp for non-SQL users
The reverse traceroute tutorial (November 2025) uses a Google Colab notebook linked directly from the blog post. This pattern — BigQuery + Colab + a specific research question — should become the default tutorial format. A CCoP member who is a policy researcher but not a data scientist can run a notebook without writing SQL.

### Step 4: Know the key tables
Community managers should be able to orient members to the landscape without deep technical expertise:

| Table | What it contains | Who it's for |
|---|---|---|
| `measurement-lab.ndt.ndt7` | Download/upload speed, latency — the core dataset | Broadband researchers, advocates, policymakers |
| `measurement-lab.ndt.ndt7_union` | Legacy + dynamic fleet combined | Researchers needing full coverage |
| `measurement-lab.wehe_raw` | ISP throttling detection per-app | Net neutrality researchers |
| `measurement-lab.revtr_raw.revtr1` | Reverse network paths from clients to servers | Routing and infrastructure researchers |
| `measurement-lab.sorbonne` (iprs_data1, iprs_index1) | Global IP routing survey from Dioptra | Topology and routing researchers |

### Step 5: Geolocation caveats up front
Many newcomers are surprised when they filter by city and get noisy results. The May 2025 community-contributed post on geolocation is essential reading. The core message: country-level data is ~99.8% accurate; city-level is ~66%. For school connectivity work, always acknowledge the geolocation limitations and, where precision matters, use the consistency filter the post describes.

---

## Demystifying IQB: From Framework to Community Tool

The Internet Quality Barometer is a framework, not yet a tool — and that distinction needs to be communicated clearly to avoid frustration. Here is how to present it to different audiences:

### For researchers
IQB is a consensus framework developed with 60+ experts across academia, policy, digital inclusion, ISPs, and content providers (November 2023–March 2025). It defines Internet quality across use cases (web browsing, video streaming, gaming, audio conferencing, etc.), each with specific network requirements. The "IQB Score" is a composite metric. Phase 2 will build the actual tool. Researchers can engage now by proposing use cases or testing the framework against their existing datasets.

### For advocates and policymakers
The core message: speed alone does not equal quality. "High-speed" Internet that buffers on a video call, drops packets during a live lesson, or has variable latency is not serving its users. IQB gives policymakers a vocabulary and a rubric for procurement, regulation, and investment decisions that goes beyond megabits per second.

### For school network managers and Giga partners
IQB-Edu is the adaptation of the IQB framework for education contexts. The questions it tries to answer: Is this school's connectivity adequate for the learning that happens here? Can students stream video? Load a web page reliably? Join a video conference? The CCoP is the primary community shaping this workstream — school-side implementers are the most valuable contributors here, because the framework must reflect on-the-ground conditions.

### Activation approach
- Host a dedicated IQB-Edu working group session within the first three months of CCoP operation.
- Invite Giga partners to present specific connectivity scenarios where current measurement methodologies fall short (as described in the CCoP launch event).
- Use those scenarios to define what "IQB-Edu" needs to measure that current NDT data does not capture.
- Publish the working group's findings as a community blog post — continuing the pattern of "learning in the open."

---

## Shared Infrastructure and Tools

### The dynamic fleet expansion
As of July 2025, M-Lab has expanded to a "dynamic fleet" of servers deployed through the Host Managed Deployment Program, currently in a second pilot phase. This is an opportunity for CCoP members — particularly ISPs, NGOs, and universities in underserved regions — to contribute measurement infrastructure. The contribution process is documented and the automation handles most of the complexity.

Frame infrastructure contribution as a form of advocacy: hosting a measurement server means producing data about your region's Internet that is publicly available to researchers, advocates, and regulators worldwide.

### OMG collaboration
The CCoP should stay actively connected to the Open Measurement Gathering community (OONI, IODA, Censored Planet). The OMG User Guide — produced for the 2025 Global Gathering — is a practical resource for helping CCoP members understand which measurement tool answers which kind of question. Use it in onboarding.

---

## Community Health Metrics

Track these indicators to assess whether the community is thriving:

- **Membership growth**: CoP Google Group size over time
- **Active participation**: Number of unique participants in monthly calls (not just registrations)
- **Working group output**: Blog posts, shared queries, presentations, or publications produced per workstream
- **Data access adoption**: Number of new M-Lab Discuss subscribers (a proxy for new BigQuery users)
- **Geographic diversity**: Are members from underserved regions present and contributing, not just observing?
- **Cross-workstream citations**: Are working groups building on each other's findings?
- **New measurement questions raised**: Are members bringing real problems that the community can pursue?

---

## Key Relationships and Partners

| Partner | Role |
|---|---|
| **Giga (UNICEF/ITU)** | Co-steward of CCoP, school connectivity context, global government relationships |
| **Superbloom Design** | Governance support |
| **OONI / IODA / Censored Planet** | OMG partners; collaborative measurement community |
| **Internet Society / Pulse** | Research partnership, infrastructure relationships |
| **Dioptra / Sorbonne** | IPRS data, traceroute expertise |
| **Cloudflare Radar** | AIM data; hackathon collaboration |
| **Internet Society Foundation** | IQB funding; fellowship potential |
| **Superbloom** | M-Lab fiscal sponsor; donation conduit |

---

## Getting Involved: Entry Points by Audience

**Just getting started with the data?**
→ Join M-Lab Discuss, run your first BigQuery query, sign up for office hours.

**A researcher with a question?**
→ Propose a blog post, apply for a fellowship, or bring your question to a monthly call.

**An implementer or ISP?**
→ Consider hosting a measurement server through the Host Managed Deployment Program.

**An advocate or policymaker?**
→ Bring a specific policy question to the CCoP. The community can help translate measurement data into evidence.

**A school network manager or Giga partner?**
→ Join the IQB-Edu working group. Your operational experience is the most important input.

**Interested but short on time?**
→ Watch the monthly call recordings on YouTube. Subscribe to the blog. When you're ready, join a working group.

---

## Contact and Community Channels

- **CCoP Google Group**: [Join here](https://forms.gle/SBrd63EgMja1owDt8)
- **M-Lab Discuss (BigQuery access)**: [groups.google.com/a/measurementlab.net/g/discuss](https://groups.google.com/a/measurementlab.net/g/discuss)
- **Monthly community calls**: First Thursday, 11am ET — register at hello@measurementlab.net
- **Office hours**: Third Thursday, 11am ET — [sign-up form](https://docs.google.com/forms/d/e/1FAIpQLSdIBk55Jmc0lT0v0X0o-qX4t0rUrK6DZFAb0lxUU51yWwx0MQ/viewform)
- **General contact**: hello@measurementlab.net
- **Data and technical support**: support@measurementlab.net
- **GitHub**: [github.com/unicef/giga-mlab-school-connectivity-cop](https://github.com/unicef/giga-mlab-school-connectivity-cop)
- **CCoP community document**: [Interactive planning doc](https://docs.google.com/document/d/10LuFzy9Pyz98GcoagzutCZ4nsi9TWl6G3HLO7yNwVbY/edit)
