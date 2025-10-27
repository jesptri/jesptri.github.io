---
layout: post
title: "My Work for the French Ski Federation"
emoji: "⛷️"
date: 2025-10-21
reading_time: 8
author: "Jules Espinoux"
tags: [Biathlon, Data Engineering, Web Scraping, DevOps]
image: "/images/ffs_good_logo.jpg"
permalink: /blog/french-ski-federation/
excerpt: "Building and maintaining the biathlon analytics platform for French coaches. From real-time race data to bug fixes on the go."
---

## Context

During my second gap-year internship, I worked with the French Ski Federation at the CNSNMM in Prémanon (see the [internship description](/internships/cnsnmm-internship-2024/)). My mission was to develop a platform for national coaches to analyze athlete performances during World Cup events.

During the first races, I monitored each event closely, triggering data updates immediately after finishes. As the scraping typically takes about a minute, I made sure it worked in real condition before letting the coaches deal with it.

## When Maintenance Calls at 9,000 Meters

I completed my internship about four months before the season started in late November 2024. As the only technical person behind the platform, I knew the coaches and my manager would depend on me to maintain the system and fix issues.

By the end of the internship, the platform was almost production ready (or so I thought). The data pipelines relied heavily on web scraping, which is sensitive to layout changes on source websites (fortunately they have not changed much so far!). In the final days before launch, everything seemed in order, the checks passed, and there were no issues to report during the first stages. But I didn't expect what came next.

It was the weekend of a Biathlon World Cup stage. While flying back from my Erasmus semester at the University of Limerick, I landed to discover a missed call and several unread messages. Simon FOURCADE, coach of the French men's biathlon team, reported missing data for the latest race. I immediately checked the platform from my phone and identified the issue: the browser driver needed an update.

I was still on the plane, waiting for passengers to leave it, I powered up my laptop, downloaded the data locally, and pushed it to production. This would not be the last time. A few weeks later, another coach reported the same issue via email. Automatic driver updates remained a persistent challenge until I discovered Docker.

## Post-Season: Migration to INSEP's Sport Data Hub

After the first active season concluded and several months away from the codebase, my manager contacted me with new requirements. The platform needed to be containerized and migrated from CNSNMM's servers to INSEP's Sport Data Hub in Paris.

I coordinated with INSEP's architects and engineers, learned Docker over a couple of weekends, and created the necessary containerization files for deployment on their infrastructure. Next, I integrated the platform with their CI/CD pipelines. As mentioned above, Docker helped me resolve the web driver issue, since using consistent versions of Chrome and the driver prevented version conflicts.

**Here's where I learned an important lesson.** After months away, I was interning at Salomon at the time and returning to my own code was humbling. I realized just how important documentation and code clarity are when building software that others (including your future self) will maintain.

Not only had I failed to document my code properly, but I also recognized that my implementation was syntactically poor and unoptimized. Code reviews during my time at Salomon had sharpened my eye for quality. I asked myself questions I should have asked earlier: Why use lists of lists when a simple hashmap would improve both code clarity and computational complexity?

I revisited the Data Structures course from my first year at ISAE-SUPAERO and realized how much growth still lay ahead. Good code isn't just about making things work; it's about making them maintainable, readable, and efficient.

## Looking Ahead to Season Two

My final year at school focuses heavily on data science, and I constantly find myself thinking of models and KPIs that could add value to the platform. Recently, I met with my manager to review UX/UI improvements and discuss potential new features, as I'm writing these notes I'm still working on the platform during my free time and I'm looking forward to season 2!

There's also a new project on the horizon, but that's a story for another post!



