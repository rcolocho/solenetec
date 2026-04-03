# Solenetec — AI Consumer Advisory Platform
> Full-stack home electrification advisory platform built entirely solo. Live at solenetec.com. Visitors learn about solar, battery storage, heat pumps, and EV charging — then book a free consultation via an AI-powered chat agent.

**Live:** [solenetec.com](https://solenetec.com) · **Built by:** Robin Colocho · **Status:** Production

---

## What it does

Solenetec helps homeowners navigate the home electrification landscape — solar, battery storage, heat pumps, EV charging, IRA programs, California utility rebates (SDG&E, SCE, PG&E), and VPP/EaaS models. The platform qualifies leads via AI chat, captures them in HubSpot CRM, and books consultations automatically via Calendly.

## Tech stack

| Layer | Technology | Role |
|-------|-----------|------|
| AI Engine | Anthropic Claude API | Solen chat agent + AI Program Advisor |
| Serverless API | Cloudflare Worker (v2) | Claude API proxy + HubSpot contact/deal creation |
| CRM | HubSpot Sales Hub Starter | Lead capture, deal pipeline, automation workflows |
| Booking | Calendly + Microsoft Teams | Consultation booking, auto meeting links, email sequences |
| Email | Microsoft 365 (alex@solenetec.com) | Business email, Outlook calendar sync |
| Frontend | HTML5 + Tailwind CSS CDN + Chart.js | 6 pages, no framework, no build step |
| Hosting | Hostinger + Cloudflare CDN | Static hosting, DDoS protection, SSL, clean URLs |

## Key features

- **Solen AI Chat Agent** — Bilingual EN/ES, auto-detects language, creates HubSpot contacts/deals on lead capture, triggers Calendly booking popup (~$0.005/session)
- **AI Program Advisor** — 6-question quiz, prompt engineering, structured JSON response, Chart.js scored visualizations
- **Full CRM pipeline** — HubSpot 0→1: tracking script, deal stages (New Lead → Consultation → Proposal → Closed), native Calendly integration
- **6 live pages** — Home, Technologies, Rebates/ROI, Programs, Process, Schedule — all mobile-responsive
- **11 SOPs + technical documentation** — Full SOP library, video scripts, 9-section technical spec (v1.3), product roadmap

## Product decisions & what I learned

- Cloudflare Worker as proxy keeps the Anthropic API key off the client — a non-negotiable security decision that took 30 minutes to implement but protects the entire platform
- Education-first chat design (never gating content behind a form) increased engagement vs. traditional lead-gate approaches
- HubSpot Starter at $9/month handles everything a small business needs — the enterprise sales pitch for $800+/month is largely unnecessary at this scale
- Bilingual EN/ES support via localStorage toggle with Solen auto-detection expanded the addressable market in Southern California significantly

## Demo

Watch the build walkthrough: [youtube.com/@RobinColocho](https://www.youtube.com/@RobinColocho)

---
*Built by Robin Alexander Colocho · [Didim Digital](https://didimdigital.com) · [LinkedIn](https://linkedin.com/in/rcolocho)*
