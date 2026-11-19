# ⚡ 2027 Research Project (IT4010) Journey Tracker

<p align="center">
  <img src="https://raw.githubusercontent.com/Afnath-max/rp-journey-tracker/afn-1/public/preview.png" alt="2027 RP Journey Tracker Preview" width="100%" />
</p>

<p align="center">
  <strong>An executive, interactive milestone tracking engine and chronological roadmap for final-year computing research teams.</strong>
</p>

<p align="center">
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-16.4-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.3-20232a?style=flat-square&logo=react&logoColor=61DAFB" alt="React" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://github.com/Afnath-max/rp-journey-tracker/actions"><img src="https://img.shields.io/github/actions/workflow/status/Afnath-max/rp-journey-tracker/ci.yml?branch=main&style=flat-square&label=CI%20Build" alt="CI" /></a>
  <a href="https://rp-journey-tracker.vercel.app"><img src="https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel" /></a>
</p>

<p align="center">
  <i>"Start before January — the strongest teams do not wait for the semester to begin."</i>
</p>

---

## 📌 Overview

The **RP Journey Tracker** transforms traditional academic roadmap handouts into a reactive, high-contrast, interactive web application. It guides students and researchers through the entire lifecycle of the **IT4010 Research Project** (Faculty of Computing)—from initial topic awareness and supervisor confirmation to proposal presentation viva and mid-year progress defense.

---

## 🌟 Key Features

* **🕒 Real-Time Dynamic Deadlines:** Compares today's calendar date against official university cutoff dates, auto-calculating exact remaining days (`21d Left`, `Due Today`, `Overdue`).
* **📡 Priority Radar Signal:** Autonomous pulse animation that highlights the current nearest incomplete target until marked as done.
* **🐝 Bumblebee Carbon Theme:** High-contrast obsidian dark palette (`#0f0e0c`) coupled with an organic, breathing hexagonal honeycomb canvas backdrop.
* **📋 Comprehensive Milestone Intel:** Clickable modals featuring exact deliverable checklists, evaluator expectations, and pro-tips for scoring high on panel vivas.
* **💾 Persistent Progress State:** Local state synchronization with celebration confetti upon milestone completion.
* **🛡️ Zero Hydration Collision:** Engineered with client-mount isolation and custom head sanitizers to eliminate extension-induced React 19 hydration mismatches.

---

## 🗺️ The 2027 RP Roadmap at a Glance

| # | Milestone | Target Date | Phase & Focus |
|:---:|:---|:---:|:---|
| **01** | **RP Awareness Session** | `30 Sep 2026` | Project scope, guidelines, marking schemes & team scouting |
| **02** | **Design Thinking Workshop** | `11 & 18 Oct 2026` | Problem space mapping, empathy definition & 400–2000w synthesis |
| **03** | **Supervisor Confirmation** | `20 Nov 2026` | Academic supervisor sign-off & 4-member group lock-in |
| **04** | **TAF Submission** | `10 Dec 2026` | Formal Topic Assessment Form upload (*Crucial pre-Jan target*) |
| **05** | **TAF Evaluation** | `14–16 Dec 2026` | Panel defense, research viability screening & approval |
| **06** | **Project Charter** | `04 Jan 2027` | Contractual milestone agreement, risk assessment & sprint plan |
| **07** | **Proposal Presentation** | `04–08 Mar 2027` | Formal mid-term proposal viva & architecture presentation |
| **08** | **Proposal Report** | `15 Mar 2027` | Comprehensive written report submission (IEEE format) |
| **09** | **Progress Presentation 1** | `29 Apr–03 May 2027`| 40–50% working implementation demonstration & evaluation |

---

## 🛠️ Tech Stack & Architecture

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
* **Language:** [TypeScript 5](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
* **Animation & Motion:** [Framer Motion](https://www.framer.com/motion/) & [Canvas-Confetti](https://www.npmjs.com/package/canvas-confetti)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Visual Effects:** HTML5 Canvas Honeycomb Matrix with sinusoidal breathing algorithms
* **Deployment & CI:** Vercel Global Edge & GitHub Actions CI

---

## 🚀 Getting Started Locally

### Prerequisites
* **Node.js:** `v20.x` or later
* **npm:** `v10.x` or later

### Installation

```bash
# Clone the repository
git clone https://github.com/Afnath-max/rp-journey-tracker.git
cd rp-journey-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structure

```text
rp-journey-tracker/
├── .github/
│   └── workflows/
│       └── ci.yml             # Automated CI build & verification workflow
├── public/                    # Static assets & showcase banners
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind CSS imports & theme definitions
│   │   ├── layout.tsx         # Root layout with extension sanitization & metadata
│   │   └── page.tsx           # Client-mounted home page
│   ├── components/
│   │   ├── HexagonBackground.tsx  # Dynamic HTML5 canvas breathing honeycomb matrix
│   │   ├── MilestoneCard.tsx      # Individual timeline milestone cards
│   │   ├── MilestoneModal.tsx     # Detailed deliverable & pro-tip modal dialog
│   │   └── TimelineBoard.tsx      # Central chronological vertical spine engine
│   └── data/
│       └── timelineData.ts    # Single source of truth for milestone specs & dates
├── next.config.ts             # Turbopack & Next.js compiler settings
├── package.json               # Dependencies & scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🔒 Security & Branch Governance

* **Branch Rulesets:** Direct pushes and force pushes (`git push --force`) to `main` are strictly blocked.
* **Pull Request Workflow:** All changes must originate on feature branches (`afn-*`, `dev`) and pass CI checks before merging.
* **Automated Scanners:** CodeQL Static Security Testing and Push Protection for secrets are permanently active.

---

## 📄 License

This project is created for academic research tracking and educational guidance for the IT4010 Research Project.
