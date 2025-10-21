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
I finished my internship about four months before the season started (late November 2024). As the only technical owner, I knew the coaches and my manager would rely on me to maintain the platform, fix issues, and iterate on KPIs and features. By the end of the internship the platform was close to production-ready. The data pipelines depended on web scraping, which is sensitive to layout changes on source websites. I anticipated final checks and fixes would be needed shortly before the season (and during it).

## First Issues and Rapid Fixes
While flying back from my Erasmus at the University of Limerick, I landed to a missed call and unread messages. Simon FOURCADE (coach of the French men’s biathlon team) reported missing data for the latest race. I checked the platform from my phone and identified the cause: the browser driver needed an update. Still on the plane, I powered up my laptop, downloaded the data locally, and pushed it to production. A few weeks later, another coach reported the same issue by email, automatic driver updates remain a tricky topic.

## Post‑Season: Migration to INSEP (Sport Data Hub)
After the first active season, my manager informed me the platform had to be containerized and migcerated from CNSNMM servers to INSEP’s Sport Data Hub in Paris. I coordinated with INSEP architects and engineers, learned Docker over a couple of weekends, produced the required files, and handed them over for deployment on their infrastructure. I then connected the code to their CI/CD pipelines.

## Looking Ahead to Season Two
Recently, I met with my manager to review UX/UI issues and potential new KPIs. A new project is also being discussed; I will write about it!



