---
layout: post
title: "A Short-Term Mission at Salomon"
emoji: "👟"
date: 2026-01-10
reading_time: 8
author: "Jules Espinoux"
tags: [Salomon, Data Engineering, PLM, Automation, Industry]
permalink: /blog/salomon-data-engineering-mission/
excerpt: "A five-day data engineering mission at Salomon: from customs compliance to building the foundations of an automated data pipeline."
---

## Context

From January 5th to January 9th, 2026, I completed a short-term contract at **Salomon**, where I previously did my second gap-year internship of 6 months.

In mid-December, I was contacted by Salomon’s **Footwear R&D Director** (Thomas GAUTHEY), who explained that there was an urgent need related to *data management*. I had been recommended by a Salomon employee with whom I had made a positive impression earlier in the year.

Accepting this mission meant missing a full week of classes. While it was a relatively light week due to the return from the Christmas holidays, I still missed the start of some courses, notably **Reinforcement Learning** and **Cloud Computing**. After discussing the situation with my professors, I decided to take on the challenge. I like challenges and this one really excited me.

---

## Problem Definition

On Monday morning, I met my colleagues, all experts in product development. Together, we analyzed the need and clarified the scope of the mission.

The customs authority of a specific country had recently increased the strictness of its requirements regarding the disclosure of **material compositions** for all products exported to that country. The main objective was therefore to complete a detailed file to be shared with customs.

Beyond this immediate goal, a secondary (but strategically important) objective was defined: **start building a data pipeline** that could automate this process in the future. This long-term perspective is why my manager deliberately chose an engineering profile rather than assigning the task to a purely manual role.

---

## Technical and Organizational Constraints

Once the scope was defined and the introductory meetings completed, I was introduced to Salomon’s current **Product Lifecycle Management (PLM)** software.

Very quickly, several constraints became clear:

- No available API
- Outdated user interfaces
- Significant latency when loading pages
- Data exports limited to **Excel** or **XML**

Later that day, I learned that a file containing most of the required data already existed (50% of required data actually). While this initially raised concerns about redundancy, it quickly became clear that this file needed to be **linked with other datasets** containing material-level information and detailed material compositions.

---

## Results

I skip a detailed day-by-day account of the five working days and focus instead on the outcomes.

- The primary objective (**completing the customs file**) was fully achieved.
- The secondary objective (**building a reusable data pipeline**) was significantly more complex than anticipated.

The datasets were highly heterogeneous and originated from multiple sources. Some data was missing and required direct follow-ups with **product managers**, who had the best knowledge of the products.

Units were manually entered and did not follow any standardized format or naming convention:
- Examples: `CM*M`, `cm * M`, `ft2`, `inch*yard`, etc.

While some inconsistencies could be handled using regular expressions, others went far beyond simple unit conversion. I intentionally simplify the reality: the challenges were deeper and more structural.

---

## Key Learnings

This short mission turned into an impactful lesson in real-world data engineering:

1. **Data quality is the foundation of automation**  
   End-to-end automation is impossible without consistent, well-structured, and reliable data.

2. **Heterogeneous data sources dramatically increase complexity**  
   Even simple business requirements become challenging when data originates from multiple tools and teams.

3. **Manual data entry is a major bottleneck**  
   A significant portion of the work still required manual input, validation, and correction.

4. **Traceability is critical**  
   Being able to follow transformations and manual edits is essential for debugging pipelines and understanding how final outputs are produced.

---

## Conclusion

Although this mission lasted only five days, it provided valuable exposure to the realities of industrial data workflows. It strongly contrasted with the clean, well-defined datasets often used in academic settings and highlighted the importance of robust data foundations before attempting automation (large-scale or not).

This experience reinforced my interest in data engineering and system design in real-world, constrained environments where technical solutions must adapt to imperfect tools, processes, and data.