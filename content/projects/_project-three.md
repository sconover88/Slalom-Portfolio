---
title: "Mobile Onboarding Experience"
description: "Designed a streamlined onboarding flow that increased user activation by 40%"
thumbnail: "project-two-thumb.svg"
role: "UX Designer"
tools:
  - "Figma"
  - "Maze"
  - "Hotjar"
  - "Figma Make"
methods:
  - "Journey Mapping"
  - "Prototyping"
  - "A/B Testing"
  - "Interaction Design"
  - "AI-Assisted Iteration"
problem: "New users were dropping off during the onboarding process, with only 23% completing setup and reaching the app's core value proposition."
order: 3
date: "2025-06-20"
images:
  - "project-two-journey.svg"
  - "project-two-prototype.svg"
  - "project-two-screens.svg"
---

## Overview

This project focused on redesigning the mobile onboarding experience for a consumer app with over 2 million monthly active users. The existing onboarding flow was losing 77% of new users before they reached the app's core value proposition, representing a massive opportunity for improvement.

I owned the end-to-end design process, from initial data analysis through A/B testing and final implementation handoff.

## Research & Analysis

We started by analyzing **Hotjar session recordings** and funnel data to pinpoint exactly where users were abandoning the onboarding flow. The data revealed three critical drop-off points: account creation, permission requests, and the initial configuration wizard.

Next, we conducted **journey mapping workshops** with the product and engineering teams to align on the current experience and identify opportunities for improvement.

![User journey map](project-two-journey.svg)

Key insights from our research:

- Users felt overwhelmed by the number of steps (originally 8 screens)
- Permission requests lacked context — users didn't understand *why* the app needed access
- The configuration wizard asked for too much information upfront before showing any value
- Competitors were getting users to their "aha moment" in under 60 seconds

## Design Exploration

We adopted a **progressive disclosure** approach, redesigning the flow to get users to the "aha moment" as quickly as possible. The new design:

- Reduced onboarding from 8 screens to 4
- Deferred non-essential permissions until contextually relevant moments
- Added a guided tour that showcased value before asking for configuration

I used **Figma Make** to rapidly generate interaction pattern variations for the permission request screens. This let us explore 12 different approaches in the time it would normally take to create 3, and we were able to test more options with users.

![Onboarding prototype screens](project-two-prototype.svg)

## Mobile Screen Design

The final screens were designed with a mobile-first approach, using large touch targets, clear visual hierarchy, and micro-interactions that guided users through each step. Each screen had a single primary action to reduce cognitive load.

![Mobile onboarding screens](project-two-screens.svg)

## Validation & Testing

We validated the redesign through **unmoderated testing on Maze** with 50 participants, followed by an **A/B test** comparing the old and new flows with 2,000 real users over two weeks.

The A/B test was structured as a 50/50 split with the following success metrics:
- **Primary**: Onboarding completion rate
- **Secondary**: Day 7 retention, NPS score
- **Guardrail**: App crash rate, support ticket volume

## Deliverables

- **Redesigned onboarding flow** reduced from 8 screens to 4 core steps
- **Interactive Figma prototype** with micro-interactions and transition animations
- **A/B test plan and analysis report** with statistical significance calculations
- **Interaction design specifications** for the engineering team
- **Progressive permission request patterns** reusable across the product
- **Design system contributions** — 8 new mobile components added to the shared library

## Metrics & Impact

The A/B test results showed clear improvements across all key metrics:

- **40% increase** in user activation rate (from 23% to 32%)
- **52% reduction** in onboarding abandonment at the permission request step
- **18% improvement** in Day 7 retention for users who completed the new flow
- **NPS score increased by 12 points** among new users in their first week
- **Time to "aha moment"** reduced from 4 minutes to 45 seconds
