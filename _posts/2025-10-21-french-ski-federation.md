---
layout: post
title: "My Work for the French Ski Federation"
date: 2025-10-21
tags: [Biathlon, Data Engineering, Web Scraping, DevOps]
image: "/images/ffs_good_logo.jpg"
permalink: /blog/french-ski-federation/
---

## Context
As part of my second gap-year internship, I worked for the French Ski Federation at the CNSNMM in Prémanon (see the [internship description](/internships/cnsnmm-internship-2024/)), where I developed a platform for national coaches to analyze athletes’ performances during World Cup events. During the first races, I followed each event and triggered data updates immediately after finishes to ensure the system worked and kept the platform simple and reliable; full scraping usually takes about a minute, which can feel long when coaches want immediate feedback.

## Scope and Responsibilities
I finished my internship about four months before the season started (late November 2024). As the only technical person, I knew the coaches and my manager would rely on me to maintain the platform, fix issues, and iterate on KPIs and features. By the end of the internship the platform was close to production-ready. The data pipelines depended on web scraping, which is sensitive to layout changes on source websites. I anticipated final checks and fixes would be needed shortly before the season (and during it).

## First Issues and Rapid Fixes
While flying back from my Erasmus at the University of Limerick, I landed to a missed call and unread messages. Simon FOURCADE (coach of the French men’s biathlon team) reported missing data for the latest race. I checked the platform from my phone and identified the cause: the browser driver needed an update. Still on the plane, I powered up my laptop, downloaded the data locally, and pushed it to production. A few weeks later, another coach reported the same issue by email, automatic driver updates remain a tricky topic.

## Post‑Season: Migration to INSEP (Sport Data Hub)
After the first active season and a few months completely off, my manager informed me that the platform had to be containerized and migrated from the CNSNMM servers to INSEP’s Sport Data Hub in Paris. I coordinated with INSEP architects and engineers, learned Docker over a couple of weekends, produced the required files, and handed them over for deployment on their infrastructure. I then connected the code to their CI/CD pipelines. I had been away from my code for a few months, as I was doing my internship at Salomon at the time. When reading my code, I realized just how important it is to document and write clear code when building software. Not only had I failed to document my code at all, but I also realized that my code was syntactically poor and not optimized. Having code reviews during my months at Salomon helped me understand this. Why use lists of lists when a simple hashmap would improve both code clarity and complexity? I went back over the small Data Structures course I had in my first year at Supaero and realized how much I still had to learn to write good code.

## Looking Ahead to Season Two
Recently, I met with my manager to review UX/UI issues and potential new KPIs. A new project is also being discussed; I will write about it!



