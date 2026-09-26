# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Hiring engineers and founders** at startups deciding on internships and junior roles. They read closely: the specific bugs fixed, the numbers, the code behind the claims.
- **Recruiters and screeners** who skim for role, stack, availability and outcomes in about thirty seconds.

The page has to survive the skim and reward the deep read.

## Product Purpose

The personal portfolio of Aditya Mittal, a B.Tech CSE student at Jaypee University (2023–2027, Noida, India) who is open to internships. Success means a visitor leaves knowing what he builds, trusting that it holds up, and having a clear way to reach him or download the resume.

## Positioning

"Full stack engineer who makes AI features hold up." His work sits in the parts that break under load (race conditions, batched queries, test coverage, security remediation), and every claim has a concrete, verifiable number or fix behind it. Other student portfolios list technologies; this one shows failure modes that were found and fixed.

## Operating Context

- A single static page, exported with Next.js (`output: "export"`) and served from Cloudflare's CDN.
- Visitors reach it from the resume, GitHub, LinkedIn and job applications, on both desktop and phone.
- A keyboard command palette (`/` or Cmd/Ctrl+K) and a devtools console greeting are existing features for technical visitors.

## Capabilities and Constraints

- Static export only: no server, API routes or server actions. Live data is client-side only (the GitHub public API for repo count and the profile).
- `next/image` runs unoptimized, so images in `public/` are pre-compressed WebP.
- Light and dark themes (system preference plus a manual toggle saved in localStorage) must both keep working.
- Resume download: `/aditya-mittal-resume.pdf`.
- No writing or blog exists yet. Do not link to one.
- No portrait photo. The design must not depend on one.

## Evidence on Hand

- Work: MedVault, Canopy and NexDev (live deploys), plus the portfolio itself, each with a screenshot in `public/work/`.
- Lab: x-flow, salvo-oss and dsa-sheet-cpp, with cover art in `public/lab/`.
- Experience:
  - Basepair, SDET Intern, Jun–Aug 2026: 89 PRs across 7 repos, Playwright E2E, 100+ BLOCKER/HIGH SonarQube findings resolved, an OAuth token-refresh race condition, and 96 sequential API calls reduced to 2.
  - Spelll Production, Frontend Intern, Jun–Jul 2024.
- Contact: email, phone, GitHub, LinkedIn and location, all in `src/lib/profile.ts`.
- Absent, and must not be fabricated: testimonials, employer logos, metrics beyond those above, writing, and a photo.

## Product Principles

1. Every claim has a receipt: a number, a named bug or a link.
2. The skim path and the deep path live on the same page. Nothing important hides behind interaction.
3. Engineering depth shows in how the site itself is built, not only in what it says.
4. Never ship placeholders or dead links.

## Accessibility & Inclusion

WCAG AA contrast in both themes, full keyboard operability (including the command palette), a skip link, and `prefers-reduced-motion` respected by every animation.
