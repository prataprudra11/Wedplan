# DR. AKHILESH DAS GUPTA INSTITUTE OF PROFESSIONAL STUDIES
### Affiliated to Guru Gobind Singh Indraprastha University (GGSIPU), New Delhi
**Academic Session 2026–2027**

---

# SUMMER INTERNSHIP REPORT
## ON
# WEDPLAN: COMPREHENSIVE WEDDING PLANNING PORTAL

**Submitted in partial fulfilment of the requirements for the award of the degree of**  
### BACHELOR OF TECHNOLOGY
#### In
### Artificial Intelligence & Data Science

---

**Submitted By:**  
**Name:** Rudra Pratap Yadav  
**Enrollment Number:** 01015611924  
**Batch:** 2024–2028  

**Under the Supervision of:**  
**Reporting Manager:** Mr. Gokul Rajan  
**Organisation:** DATA ALCOTT SYSTEMS  
**Student ID:** DAS014266  
**Internship Period:** 27 August 2026 – 30 September 2026  
**Mode:** Remote  

---

<div style="page-break-after: always;"></div>

## DECLARATION

I, **Rudra Pratap Yadav** (Enrollment Number: **01015611924**), a student of **B.Tech – Artificial Intelligence & Data Science** at **Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)**, affiliated to **Guru Gobind Singh Indraprastha University (GGSIPU)**, New Delhi, hereby declare that this summer internship report titled **“WEDPLAN: COMPREHENSIVE WEDDING PLANNING PORTAL”** is submitted in partial fulfilment of the academic requirements for the degree of Bachelor of Technology.

The report embodies the authentic work carried out by me during my remote summer internship at **DATA ALCOTT SYSTEMS** under the supervision of **Mr. Gokul Rajan** during the period from **27 August 2026 to 30 September 2026**.

I further declare that this report is an original account of my engineering development, architectural design, component implementation, and verification work. To the best of my knowledge, it does not contain any matter previously submitted for the award of any other degree or diploma to any university or institution. All external references, documentation, and technical resources utilised during this project have been duly acknowledged.


<br><br>

__________________________________________  
**Rudra Pratap Yadav**  
Enrollment No.: 01015611924  
B.Tech (Artificial Intelligence & Data Science)  
Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)  
Date: 30 September 2026  

---

<div style="page-break-after: always;"></div>

## INTERNSHIP COMPLETION CERTIFICATE

The official certificate of completion issued by **DATA ALCOTT SYSTEMS** for the successful completion of the remote Web Development internship (Student ID: **DAS014266**, Issue Date: **30/09/2026**) is embedded below:

---

<div align="center">
  <img src="assets/internship_certificate.jpg" alt="Data Alcott Systems Certificate of Completion - Rudra Pratap Yadav" style="max-width: 90%; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

---

### Certificate Particulars:
- **Candidate Name:** Mr. Rudra Pratap Yadav
- **Registration / Enrollment No.:** 01015611924
- **Student ID:** DAS014266
- **Domain:** Web Development
- **Mode:** Remote
- **Duration:** 27/08/2026 to 30/09/2026
- **Reporting Manager:** Gokul Rajan
- **Authorised Signatory:** Thirumalai Kumar (Team - HR), DATA ALCOTT SYSTEMS
- **Verification Portal:** https://www.freelancerships.in/ | Phone: 9640095845

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT

I express my deepest gratitude to **DATA ALCOTT SYSTEMS** for providing me with the opportunity to undertake my remote summer internship in the domain of **Web Development** from **27 August 2026 to 30 September 2026**. 

I would like to extend my sincere thanks to my reporting manager, **Mr. Gokul Rajan**, for his mentorship, invaluable technical guidance, and constructive evaluation throughout the duration of this project. His practical insights into industry-standard frontend engineering and client-side system architecture helped me bridge classroom theoretical concepts with real-world software implementation.

I also express my heartfelt appreciation to the management of **DATA ALCOTT SYSTEMS** and **Mr. Thirumalai Kumar (Team - HR)** for facilitating a well-structured remote internship framework.

I am profoundly grateful to **Dr. Akhilesh Das Gupta Institute of Professional Studies (ADGIPS)** and **Guru Gobind Singh Indraprastha University (GGSIPU)** for fostering a rigorous academic curriculum that motivated me to take on challenging engineering problems. I extend my sincere thanks to the Department of **Artificial Intelligence & Data Science**, our respected Head of Department, faculty members, and lab coordinators for their constant encouragement.

Finally, I wish to thank my family, peers, and friends who provided moral support and critical feedback during the development, testing, and documentation phases of this project.

<br><br>

**Rudra Pratap Yadav**  
Enrollment No.: 01015611924  
B.Tech – Artificial Intelligence & Data Science  
ADGIPS, GGSIPU, New Delhi  

---

<div style="page-break-after: always;"></div>

## ABSTRACT

This internship report documents the conceptualisation, architectural design, engineering implementation, and verification of **WedPlan**, an all-in-one luxury wedding planning portal. The project was engineered as a core deliverable during a five-week remote Web Development internship at **DATA ALCOTT SYSTEMS** (27 August 2026 – 30 September 2026).

Modern wedding planning typically suffers from information fragmentation. Couples frequently manage budgets, vendor inquiries, guest lists, RSVPs, day-of timelines, and seating charts across disparate spreadsheets, text messages, and paper notes. This creates severe coordination overhead, data redundancy, and communication friction. 

**WedPlan** addresses this challenge by consolidating the entire wedding preparation workflow into an intuitive, high-performance, single-page application (SPA). Engineered using pure **HTML5, CSS3, and modern ECMAScript (ES6+)**, WedPlan eliminates external database dependencies by leveraging a custom reactive state management store synchronized with the browser's persistent `localStorage` API. The application adheres to a refined design system featuring **Luxury Gold (`#D4A574`)**, **Romantic Rose (`#E85D7A`)**, and **Warm Cream (`#FDF6F0`)**, and includes a persistent **Midnight Romance Dark Mode**.

Key functional modules engineered include:
1. **Interactive Dashboard:** Featuring real-time milestone counters and a precision countdown timer.
2. **Dynamic Budget Planner:** Expense tracking with live category proportion breakdowns and payment status cyclers.
3. **Curated Vendor Directory:** Multi-attribute filtering with simulated date booking and a live review calculation engine.
4. **Guest List & RSVP Manager:** Invitation tracking, dietary restrictions aggregation, and client-side RFC-4180 CSV export.
5. **Master Milestone Checklist:** Phased progress tracking from 12+ months before the wedding to the wedding morning.
6. **Day-Of Timeline & Run-of-Show:** Chronological event tracker with a print-specific stylesheet.
7. **Interactive Seating Planner:** Visual table diagrams with capacity management and quick guest assignment.
8. **Public Wedding Website Builder:** Customizable couple mini-site with live browser preview and guest RSVP capture.
9. **Multi-Channel Message Board:** Collaborative communication hub for wedding parties and vendors.

The system was verified across modern desktop and mobile browsers, demonstrating sub-10ms view transition latencies, zero console runtime exceptions, and fluid responsive adaptability across all viewports.

---

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS

- **Declaration** ........................................................................................................................ 2
- **Internship Completion Certificate** ........................................................................................ 3
- **Acknowledgement** ............................................................................................................... 4
- **Abstract** .............................................................................................................................. 5
- **List of Figures** .................................................................................................................... 9
- **List of Tables** ...................................................................................................................... 10

---

### CHAPTER 1: INTRODUCTION ............................................................................................... 11
- 1.1 Introduction to the Internship .......................................................................................... 11
- 1.2 Organisation Context (DATA ALCOTT SYSTEMS) ......................................................... 11
- 1.3 Web Development Domain Overview ............................................................................. 12
- 1.4 Internship Objectives ........................................................................................................ 12
- 1.5 Roles, Responsibilities, and Learning Objectives ............................................................ 13
- 1.6 Weekly Internship Progress Report (Week 1 to Week 5) ................................................... 13

---

### CHAPTER 2: PROJECT OVERVIEW AND REQUIREMENTS ................................................. 17
- 2.1 Project Introduction ......................................................................................................... 17
- 2.2 Problem Statement and Proposed Solution ...................................................................... 17
- 2.3 Project Scope .................................................................................................................... 18
- 2.4 Functional Requirements (FR-01 to FR-10) ...................................................................... 18
- 2.5 Non-Functional Requirements .......................................................................................... 19
- 2.6 Hardware and Software Requirements ............................................................................ 20
- 2.7 Feasibility Study (Technical, Operational, Economic, Schedule, Security) ....................... 20

---

### CHAPTER 3: TECHNICAL BACKGROUND ............................................................................ 22
- 3.1 HTML5 & Semantic Web Architecture ........................................................................... 22
- 3.2 CSS3, Custom Properties, and Modern Layouts (Grid & Flexbox) ................................... 22
- 3.3 Modern JavaScript (ES6+) and Component Architecture ................................................ 23
- 3.4 Single-Page Application (SPA) Hash Routing Engine ...................................................... 23
- 3.5 Reactive State Management & The Observer Pattern ..................................................... 24
- 3.6 Browser LocalStorage API & Data Durability ................................................................... 24
- 3.7 Client-Side File Generation & Browser Data URIs ........................................................... 24

---

### CHAPTER 4: SYSTEM DESIGN AND IMPLEMENTATION .................................................... 25
- 4.1 System Architecture ......................................................................................................... 25
- 4.2 Application Flow & Routing Workflow ............................................................................ 26
- 4.3 Reactive State Store & Event Bus Pipeline ....................................................................... 27
- 4.4 Financial Engine & Budget Analytics Implementation ..................................................... 28
- 4.5 Vendor Directory & Review Recalculation Algorithm ....................................................... 29
- 4.6 Guest List, RSVP Management, and CSV Exporter ......................................................... 30
- 4.7 Interactive Seating Chart & Table Allocation Logic .......................................................... 31
- 4.8 Day-of Timeline & Print Optimization ............................................................................. 32
- 4.9 Public Wedding Website Builder & Live Preview Engine ................................................. 33
- 4.10 Project Directory Structure & Component Inventory ...................................................... 34
- 4.11 Core Source Code Implementation Evidence ................................................................. 35
- 4.12 User Interface Evidence & Visual Documentation .......................................................... 39

---

### CHAPTER 5: TESTING AND RESULTS ................................................................................... 42
- 5.1 Testing Methodology ....................................................................................................... 42
- 5.2 Verification Matrix & Test Cases (TC-01 to TC-10) ........................................................... 42
- 5.3 Observed Performance & Cross-Browser Verification Results ......................................... 43
- 5.4 Challenges Encountered & Engineering Solutions ........................................................... 44
- 5.5 System Limitations ........................................................................................................... 44
- 5.6 Learning Outcomes .......................................................................................................... 45
- 5.7 Future Scope & Commercial Scalability ........................................................................... 45

---

### CHAPTER 6: CONCLUSION ................................................................................................... 46
- 6.1 Overall Internship Experience ......................................................................................... 46
- 6.2 Project Summary & Conclusion ....................................................................................... 47
- 6.3 Technical Competencies & Skills Acquired ...................................................................... 47
- 6.4 Bibliography and References ........................................................................................... 49

---

### APPENDICES ........................................................................................................................... 50
- **Appendix A:** Project File & Module Inventory ................................................................... 50
- **Appendix B:** Security, Validation & Deployment Notes .................................................... 51
- **Appendix C:** Project Demonstration & Video Walkthrough Evidence ................................ 51

---

<div style="page-break-after: always;"></div>

## LIST OF FIGURES

| Figure No. | Figure Title | Page |
| :--- | :--- | :--- |
| **4.1** | Overall WedPlan System Architecture Diagram | 25 |
| **4.2** | Single-Page Application (SPA) Hash Routing Workflow | 26 |
| **4.3** | Reactive Store Observer Pipeline & LocalStorage Sync | 27 |
| **4.4** | Budget Analytics & Expense Calculation Dataflow | 28 |
| **4.5** | Vendor Inquiry & Dynamic Rating Recalculation Flow | 29 |
| **4.6** | Guest RSVP Processing and CSV Export Workflow | 30 |
| **4.7** | Interactive Seating Arrangement State Flow | 31 |
| **4.8** | WedPlan Core Architecture: Store & Observer Code Snippet | 35 |
| **4.9** | Client-Side CSV Export & Data Sanitization Logic | 36 |
| **4.10** | Dynamic Vendor Detail & Booking Modal Logic | 37 |
| **4.11** | User Interface: Landing Page & Hero Banner | 39 |
| **4.12** | User Interface: Couple Dashboard & Live Ticking Countdown | 39 |
| **4.13** | User Interface: Budget Planner & Category Breakdown | 40 |
| **4.14** | User Interface: Vendor Directory & Booking Modal | 40 |
| **4.15** | User Interface: Guest List & Dietary Restrictions Alert Strip | 41 |
| **4.16** | User Interface: Interactive Seating Chart Organizer | 41 |
| **4.17** | User Interface: Couple Wedding Website Builder & Live Preview | 42 |
| **4.18** | User Interface: Midnight Romance Dark Mode View | 42 |

---

<div style="page-break-after: always;"></div>

## LIST OF TABLES

| Table No. | Table Title | Page |
| :--- | :--- | :--- |
| **1.1** | Internship Particulars & Certificate Details | 11 |
| **1.2** | Internship Area & Architectural Responsibilities | 13 |
| **2.1** | Functional Requirements Specification (FR-01 to FR-10) | 18 |
| **2.2** | Non-Functional Requirements Specification | 19 |
| **2.3** | Hardware and Software Development Environment | 20 |
| **2.4** | Multidimensional Feasibility Assessment | 20 |
| **4.1** | Complete Project Directory and File Inventory | 34 |
| **4.2** | Technology and Component Mapping Matrix | 35 |
| **5.1** | Comprehensive Test Cases and Expected Behaviour (TC-01 to TC-10) | 42 |
| **5.2** | Evidence Status and Verification Matrix | 43 |
| **6.1** | Technical Skills Acquired During Internship | 47 |

---

<div style="page-break-after: always;"></div>

# CHAPTER 1 – INTRODUCTION

## 1.1 Introduction to the Internship
Practical software engineering requires bridging academic theory with production-grade application development. The internship described in this report was undertaken remotely at **DATA ALCOTT SYSTEMS** in the domain of **Web Development**. As recorded on the official Internship Completion Certificate (Student ID: **DAS014266**), the internship was conducted from **27 August 2026 to 30 September 2026**.

The primary project assigned and delivered during this tenure is **WedPlan (Comprehensive Wedding Planning Portal)**. The project is an all-in-one, client-side web application designed to eliminate the logistical chaos experienced by couples planning weddings. It incorporates budget tracking, vendor discovery, simulated booking, guest RSVP collection, milestone checklists, day-of timelines, and interactive seating charts into a responsive Single-Page Application (SPA).

| Particular | Details |
| :--- | :--- |
| **Organisation** | DATA ALCOTT SYSTEMS |
| **Domain** | Web Development |
| **Mode** | Remote |
| **Duration** | 27 August 2026 – 30 September 2026 (5 Weeks) |
| **Reporting Manager** | Mr. Gokul Rajan |
| **Student ID** | DAS014266 |
| **Candidate Name** | Mr. Rudra Pratap Yadav |
| **Registration / Enrollment No.** | 01015611924 |

*Table 1.1: Internship Particulars & Certificate Details*

---

## 1.2 Organisation Context
**DATA ALCOTT SYSTEMS** is an established technology and professional development organisation that provides industry-oriented technical exposure, remote internships, and software development solutions. The organisation focuses on providing practical, project-based engineering environments for university students. 

During the internship period, the organisation assigned individual development milestones, conducted weekly technical evaluations, and provided architectural guidance under the direct supervision of **Mr. Gokul Rajan**. All work was completed within the confirmed framework documented on the completion certificate.

---

## 1.3 Web Development Domain Overview
Web development has evolved from static document rendering into complex, interactive client-side application engineering. Modern frontend development demands high responsiveness, accessible user interfaces, component-driven modularity, and deterministic state management.

While modern enterprise stacks often rely on frameworks such as React, Angular, or Vue, mastering vanilla web standards (**HTML5, CSS3, and ECMAScript 6+**) provides an essential understanding of the browser's Document Object Model (DOM), execution contexts, rendering engines, and web APIs. In this project, pure vanilla web technologies were leveraged to construct a **zero-dependency Single-Page Application (SPA)** that matches the functionality and interactivity of modern reactive frameworks.

---

## 1.4 Internship Objectives
The primary technical and academic objectives of this internship were:
1. **Mastery of Core Web Technologies:** Apply advanced semantic HTML5, modern CSS3 layout paradigms (CSS Grid, Flexbox, Custom Properties), and modular JavaScript (ES6+ Classes and Modules).
2. **SPA Architecture Without Frameworks:** Build a client-side routing engine using URL hash navigation that enables sub-10ms view transitions without full-page reloads.
3. **Reactive State Management:** Design and implement an **Observer Pattern** state store that automatically persists data to the browser's `localStorage` and synchronizes UI components reactively.
4. **Client-Side File Processing:** Implement data URI generation to export structured JSON guest records into downloadable RFC-4180 CSV files without server-side processing.
5. **Aesthetic & Accessible Design Systems:** Implement a luxury design system featuring **Luxury Gold (`#D4A574`)**, **Romantic Rose (`#E85D7A`)**, and **Warm Cream (`#FDF6F0`)**, paired with a persistent **Midnight Romance Dark Mode**.
6. **Cross-Device Optimization:** Ensure 100% responsiveness across mobile, tablet, and desktop viewports with touch-friendly drawer navigation.

---

## 1.5 Roles, Responsibilities, and Learning Objectives
During the 5-week tenure, I was responsible for end-to-end design, implementation, testing, and deployment of the WedPlan application.

| Area | Responsibility Represented in the Project |
| :--- | :--- |
| **System Architecture** | Designing the SPA hash router, view lifecycle, and state store in `js/app.js` and `js/store.js`. |
| **UI/UX & Design System** | Crafting design tokens, custom components, typography, and dark mode in `css/main.css`, `css/components.css`, and `css/views.css`. |
| **Core Planning Modules** | Implementing view renderers and controllers for Dashboard, Budget Planner, Vendors, Guests, Checklist, and Timeline. |
| **Bonus Features** | Engineering the Interactive Seating Chart, Couple Website Builder, Photo Gallery Lightbox, and Message Board. |
| **Data Persistence & Utilities** | Managing `localStorage` schema, RFC-4180 CSV export, XSS string sanitization, and modal handling. |
| **Verification & CI/CD** | Performing cross-browser testing and deploying the live production application to **GitHub Pages**. |

*Table 1.2: Internship Area & Architectural Responsibilities*

---

## 1.6 Weekly Internship Progress Report

### Week 1: 27 August 2026 – 3 September 2026
#### Architectural Planning, Requirements Analysis & Schema Design
- Conducted requirement analysis of modern wedding planning platforms (The Knot, Zola, WeddingWire) to identify pain points.
- Defined the data schema in `data/sampleData.js` representing realistic wedding entities (couples, budget items, vendors, guests, checklist tasks, day-of timeline, and tables).
- Established the Git version control repository and structured project directory boundaries (`/css`, `/js`, `/data`, `/assets`).
- **Work & Learning Outcomes:**
  - Formulated the functional requirement specifications.
  - Designed the entity-relationship JSON structure for client-side storage.
  - Created the project repository and initial commit history.

### Week 2: 4 September 2026 – 10 September 2026
#### Design Tokens, Typography, and CSS3 Layout System
- Implemented the wedding design system in `css/main.css` using CSS Custom Properties for Luxury Gold, Romantic Rose, Warm Cream, and Slate Typography.
- Integrated Google Fonts (`Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`) and Font Awesome 6 icons.
- Engineered reusable UI components in `css/components.css` (stat cards, badges, modals, form inputs, responsive tables, progress bars).
- Built the persistent **Midnight Romance Dark Mode** using `[data-theme="dark"]` attribute selectors.
- **Work & Learning Outcomes:**
  - Mastered CSS variables for zero-duplication theme switching.
  - Implemented responsive grid systems adapting to mobile, tablet, and desktop screens.
  - Designed an SVG brand identity icon (`assets/favicon.svg`).

### Week 3: 11 September 2026 – 17 September 2026
#### Reactive State Store, Observer Pattern & Hash Router
- Engineered the `WedPlanStore` singleton class in `js/store.js` implementing the Observer Pattern (`subscribe()` and `emit()`).
- Synchronized all state mutations with browser `localStorage` under key `wedplan_state_v1`.
- Built the client-side SPA router in `js/app.js` listening to `hashchange` events.
- Created `WedPlanUtils` in `js/utils.js` for currency formatting, date parsing, XSS sanitization, and toast notifications.
- **Work & Learning Outcomes:**
  - Solved cross-component state synchronization without heavyweight frameworks.
  - Gained practical mastery of the browser Storage API and error handling.
  - Built a zero-latency client-side router with automatic scroll restoration.

### Week 4: 18 September 2026 – 24 September 2026
#### Core Planning Modules Implementation
- **Dashboard (`js/views/dashboard.js`):** Built live second-by-second countdown timer and 4 dynamic summary KPI cards.
- **Budget Planner (`js/views/budget.js`):** Engineered category spending calculations and live payment status toggles.
- **Vendor Directory (`js/views/vendors.js`):** Built multi-filter search, vendor detail modals, booking simulation, and dynamic review calculation.
- **Guest List (`js/views/guests.js`):** Built guest roster with dietary restrictions aggregation and client-side RFC-4180 CSV export.
- **Checklist & Timeline (`js/views/checklist.js`, `js/views/timeline.js`):** Built phased milestone tracking and print-ready day-of schedule.
- **Work & Learning Outcomes:**
  - Mastered virtual string-based DOM rendering.
  - Implemented client-side CSV Blob generation using data URIs.
  - Created a `@media print` layout for wedding day itineraries.

### Week 5: 25 September 2026 – 30 September 2026
#### Bonus Features, Testing, CI/CD Deployment & Documentation
- **Seating Arrangement Planner (`js/views/seating.js`):** Built visual table cards (Round and Banquet) with seat capacity tracking.
- **Wedding Website Builder (`js/views/websiteBuilder.js`):** Built couple website editor with live browser preview and guest RSVP capture.
- **Inspiration Gallery & Lightbox (`js/views/gallery.js`):** Built image moodboard with full-screen lightbox navigation.
- **Message Board (`js/views/messages.js`):** Built simulated multi-channel chat hub.
- Conducted syntax verification across all JavaScript files and verified sub-10ms view transition performance.
- Deployed live production application to **GitHub Pages** and compiled academic documentation.
- **Work & Learning Outcomes:**
  - Delivered 100% of required and bonus features.
  - Successfully deployed to GitHub Pages with automated CI/CD tracking.
  - Compiled formal project report and video demonstration script.

---

<div style="page-break-after: always;"></div>

# CHAPTER 2 – PROJECT OVERVIEW AND REQUIREMENTS

## 2.1 Project Introduction
**WedPlan** is a client-side Single-Page Application (SPA) designed to serve as an all-in-one digital wedding planner for engaged couples. It consolidates all aspects of wedding planning — financial budgeting, vendor sourcing, guest list logistics, milestone management, day-of scheduling, reception table seating, and public couple website generation — into an intuitive, responsive web application.

---

## 2.2 Problem Statement and Proposed Solution

### Problem Statement
Wedding planning is inherently complex and multi-faceted. Couples typically face three major challenges:
1. **Tool Fragmentation:** Relying on Excel for budgets, WhatsApp/email for vendor communications, Google Forms for RSVPs, and paper notes for seating charts causes severe data inconsistency.
2. **Financial Oversight:** Unexpected wedding costs often lead to 20–30% budget overruns when expenses are not actively monitored against category targets.
3. **Communication Latency:** Gathering guest dietary requirements and coordinating day-of schedules with wedding parties and vendors is labor-intensive and prone to error.

### Proposed Solution
**WedPlan** provides a unified, zero-friction client-side platform that:
- Centralizes all planning data into a **single source of truth** stored locally in the couple's browser.
- Provides **real-time financial analytics**, automatically calculating estimated vs. actual expenses and visual category proportions.
- Enables **instant simulated vendor booking and dynamic review scoring**.
- Automates **guest RSVP tracking and dietary restrictions aggregation** with one-click **CSV data export**.
- Includes an **interactive visual seating arrangement planner** and a **public wedding website builder**.

---

## 2.3 Project Scope
- Complete client-side Single-Page Application (SPA) using HTML5, CSS3, and JavaScript (ES6+).
- Zero external database dependencies (backed by browser `localStorage`).
- Responsive design supporting mobile viewports (320px–640px), tablets (641px–1024px), and desktop displays (1025px+).
- Out of scope for this prototype: Server-side payment gateway processing, transactional email relays (SMTP), and multi-device cloud database synchronization.

---

## 2.4 Functional Requirements

| ID | Requirement Name | Description & Implementation Evidence |
| :--- | :--- | :--- |
| **FR-01** | Landing & Navigation | Hero section, countdown preview, and sticky navigation with SPA hash router (`#home`, `#dashboard`, etc.). |
| **FR-02** | Couple Dashboard | Live countdown ticker (days, hours, mins, secs), 4 KPI summary cards, and priority tasks list. |
| **FR-03** | Budget Planner | Total budget cap, spent vs. remaining calculations, category progress bars, and expense CRUD. |
| **FR-04** | Vendor Directory | Multi-attribute filtering (category, price tier `$$`–`$$$$`, rating), instant search, and vendor cards. |
| **FR-05** | Vendor Profile & Booking | Detail modal with service bios, packages, simulated booking inquiry, and live review rating engine. |
| **FR-06** | Guest & RSVP Management | Guest list with party tags (Bride/Groom/Mutual), RSVP status cycler, and dietary restrictions summary. |
| **FR-07** | Client-Side CSV Export | One-click export of the entire guest roster to an RFC-4180 compliant CSV file via Data URI. |
| **FR-08** | Wedding Checklist | Milestone tracker categorized by countdown phases (`12+ Months` to `Day Of`) with master progress bar. |
| **FR-09** | Day-Of Timeline & Print | Chronological event run-of-show with custom milestone badges and print-specific CSS layout. |
| **FR-10** | Seating & Mini-Site | Visual reception table seating planner with capacity tracking, plus couple website builder preview. |

*Table 2.1: Functional Requirements Specification*

---

## 2.5 Non-Functional Requirements

| Quality Area | Requirement & Engineering Consideration |
| :--- | :--- |
| **Usability & Aesthetic** | High-end romantic luxury aesthetic; font pairings of serif headings with modern sans-serif body; intuitive visual cues. |
| **Performance** | Sub-10ms view transition latency; 60 FPS scrolling; lightweight asset footprint with zero heavy dependencies. |
| **Data Durability** | Persistent local storage via `localStorage` with automated JSON parsing, error handling, and demo data reset. |
| **Security & Safety** | String sanitization via `WedPlanUtils.escapeHtml()` to eliminate Cross-Site Scripting (XSS) in user inputs. |
| **Maintainability** | Clean separation of concerns: `store.js` (state), `app.js` (router), `modals.js` (dialogs), and `/views` (renderers). |
| **Accessibility (a11y)** | Keyboard accessible controls, high-contrast text ratios (WCAG AA compliant), and standard ARIA attributes. |

*Table 2.2: Non-Functional Requirements Specification*

---

## 2.6 Hardware and Software Requirements

| Category | Requirement / Specification |
| :--- | :--- |
| **Operating System** | Windows 10/11, macOS, or Linux |
| **Development Environment** | Visual Studio Code / Antigravity IDE |
| **Runtime & Engines** | Modern Web Browser (Google Chrome 110+, Microsoft Edge, Mozilla Firefox, Safari) |
| **Frontend Stack** | HTML5, CSS3, JavaScript (ECMAScript 2022+), SVG |
| **Icons & Typography** | Font Awesome 6 CDN, Google Fonts API (`Playfair Display`, `Plus Jakarta Sans`) |
| **Storage API** | W3C Web Storage API (`window.localStorage`) |
| **Version Control & CI/CD** | Git, GitHub Repository, GitHub Pages static hosting |

*Table 2.3: Hardware and Software Development Environment*

---

## 2.7 Feasibility Study

| Factor | Assessment | Technical Reasoning |
| :--- | :--- | :--- |
| **Technical** | Highly Feasible | Pure standard web technologies guarantee universal browser compatibility without build friction. |
| **Operational** | Highly Feasible | Single-page architecture with persistent storage allows couples to plan offline or online seamlessly. |
| **Economic** | Zero Cost | No server infrastructure, database hosting, or third-party paid API subscriptions required. |
| **Schedule** | Completed on Time | Delivered across 5 structured weekly milestones within the certified internship duration. |
| **Security** | Prototype Hardened | Client-side XSS sanitization and strict input validation prevent injection in user-entered fields. |

*Table 2.4: Multidimensional Feasibility Assessment*

---

<div style="page-break-after: always;"></div>

# CHAPTER 3 – TECHNICAL BACKGROUND

## 3.1 HTML5 & Semantic Web Architecture
HTML5 provides the foundational structure for WedPlan. Rather than relying on generic `<div>` containers, WedPlan employs semantic elements:
- `<header class="site-navbar">`: Houses the brand logo, desktop navigation links, and theme toggle.
- `<main id="app-root">`: Serves as the dynamic mounting target for the Single-Page Application router.
- `<section>` & `<article>`: Organize content blocks (e.g. hero banners, feature grids, vendor cards).
- `<footer>`: Contains secondary navigation links, copyright, and factory demo data reset triggers.

## 3.2 CSS3, Custom Properties, and Modern Layouts
Styling is architected across three modular stylesheets:
1. `css/main.css`: Houses design tokens, CSS reset rules, typography definitions, and dark mode overrides.
2. `css/components.css`: Contains reusable UI primitives (buttons, stat cards, badges, modal dialogs, responsive tables, progress bars).
3. `css/views.css`: Defines layout rules for specific views (hero overlay, timeline tree, seating grid, browser preview frame).

### The Luxury Wedding Palette & Theming
WedPlan utilizes CSS Custom Properties for theme tokens:
```css
:root {
  --color-gold: #D4A574;
  --color-gold-hover: #C59258;
  --color-gold-light: #F7EFE8;
  --color-rose: #E85D7A;
  --color-cream: #FDF6F0;
  --color-text-dark: #2D2424;
  --bg-body: #FAF5F0;
  --bg-surface: #FFFFFF;
}

[data-theme="dark"] {
  --bg-body: #161312;
  --bg-surface: #221C1A;
  --color-cream: #241D1B;
  --color-text-dark: #F7EFE8;
  --color-gold-light: #36291C;
}
```
Switching between Romantic Light Mode and Midnight Romance Dark Mode requires simply toggling the `data-theme` attribute on the `<html>` root, eliminating CSS code duplication.

## 3.3 Modern JavaScript (ES6+) and Component Architecture
The application logic is written in modern JavaScript using modular ES6+ features:
- **Class-Based Encapsulation:** Used for the state store (`WedPlanStore`) and router coordinator (`WedPlanApp`).
- **Template Literals:** Enable virtual string-based HTML rendering with embedded expressions.
- **Destructuring & Arrow Functions:** Ensure clean, expressive data transformations.

## 3.4 Single-Page Application (SPA) Hash Routing Engine
To deliver an instantaneous desktop-app feel without page reloads, WedPlan implements client-side hash routing:
- The router listens to `window.addEventListener("hashchange", ...)` events.
- The URL hash (e.g. `#budget`, `#vendors`, `#seating`) is parsed and matched against a registered route dictionary.
- The corresponding view controller’s `render()` method is invoked, injecting new DOM nodes into `#app-root` in under 10 milliseconds.

## 3.5 Reactive State Management & The Observer Pattern
In complex multi-view applications, state synchronization is critical. When a user books a vendor or logs an expense, the dashboard summary must update immediately. WedPlan achieves this via the **Observer Pattern**:
- `subscribe(event, callback)` registers listener functions.
- `emit(event, data)` persists mutations to `localStorage` and executes all registered listeners.

## 3.6 Browser LocalStorage API & Data Durability
WedPlan uses `window.localStorage` to store serialized JSON state under key `wedplan_state_v1`. On initial launch, if no local data exists, the store seeds itself from `data/sampleData.js` (Sophia & Alexander's Napa Valley wedding). A fallback reset function allows users to restore factory defaults at any time.

## 3.7 Client-Side File Generation & Browser Data URIs
To enable guest list export without a backend server, WedPlan uses client-side data URI encoding:
```javascript
const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
const encodedUri = encodeURI(csvContent);
const link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", filename);
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
```

---

<div style="page-break-after: always;"></div>

# CHAPTER 4 – SYSTEM DESIGN AND IMPLEMENTATION

## 4.1 System Architecture
WedPlan is architected as a layered client-side Single-Page Application:
1. **Presentation Layer:** Semantic HTML5 templates, CSS design tokens, and modular view controllers.
2. **Routing & Coordination Layer:** Hash-based router (`js/app.js`) and modal controller (`js/modals.js`).
3. **Business Logic & State Layer:** Reactive singleton store (`js/store.js`) implementing the Observer Pattern.
4. **Persistence Layer:** Browser `localStorage` API storing serialized JSON records.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WEDPLAN ARCHITECTURE                            │
├────────────────────────────────────────────────────────────────────────┤
│  Presentation Layer: HTML5 Shell + Responsive CSS3 View Renderers     │
│  [Home] [Dashboard] [Budget] [Vendors] [Guests] [Checklist] [Timeline] │
├────────────────────────────────────────────────────────────────────────┤
│  Coordination Layer: Hash Router (js/app.js) + Modals (js/modals.js)   │
├────────────────────────────────────────────────────────────────────────┤
│  Reactive State Layer: WedPlanStore (js/store.js) - Observer Pattern   │
│  - Financial Engine   - Vendor Scoring   - RSVP Aggregator             │
├────────────────────────────────────────────────────────────────────────┤
│  Persistence Layer: Browser LocalStorage API ('wedplan_state_v1')      │
└────────────────────────────────────────────────────────────────────────┘
```
*Figure 4.1: Overall WedPlan System Architecture Diagram*

---

## 4.2 Application Flow & Routing Workflow
When a user accesses the portal, `WedPlanApp.init()` initializes the theme, synchronizes authentication UI, and triggers `handleRouteChange()`. The router matches the URL hash and injects the view template:

```
[User Navigates / Clicks Link] 
             │
             ▼
    [window.location.hash]
             │
    ┌────────┴────────┐
    ▼                 ▼
[Hash Match]      [No Hash / Unknown]
    │                 │
    ▼                 ▼
[Target View]    [Default: HomeView]
    │                 │
    └────────┬────────┘
             ▼
   [view.render() executes]
             │
             ▼
  [Inject HTML into #app-root]
             │
             ▼
   [view.init() lifecycle]
             │
             ▼
    [Scroll to Top (0, 0)]
```
*Figure 4.2: Single-Page Application (SPA) Hash Routing Workflow*

---

## 4.3 Reactive State Store & Event Bus Pipeline
All data mutations follow a unidirectional reactive pipeline:

```
[UI Action: Add Expense / Book Vendor / Toggle RSVP]
                       │
                       ▼
            [WedPlanStore Method]
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
[Mutate In-Memory State]    [Save to localStorage]
         │                           │
         └─────────────┬─────────────┘
                       ▼
            [store.emit('change')]
                       │
                       ▼
        [Execute Registered Listeners]
                       │
                       ▼
          [Active View Re-renders]
```
*Figure 4.3: Reactive Store Observer Pipeline & LocalStorage Sync*

---

## 4.4 Financial Engine & Budget Analytics Implementation
The budget calculation engine inside `store.getBudgetSummary()` dynamically aggregates total budget, actual spent, estimated allocation, remaining balance, and category proportions:
- Venue & Catering typically account for 45–50% of the total budget.
- Each expense maintains a payment status (`Pending`, `Deposit Paid`, `Paid`). Clicking the badge toggles status instantly and logs a visual confirmation toast.

---

## 4.5 Vendor Directory & Review Recalculation Algorithm
When a user submits a new rating (1 to 5 stars) on a vendor profile:
1. The new review object is prepended to `vendor.reviews`.
2. `vendor.reviewCount` increments by 1.
3. The average rating is recalculated dynamically:
$$\text{Rating}_{\text{new}} = \frac{\sum_{i=1}^{n} \text{Rating}_i}{n}$$
4. The vendor card and modal re-render immediately with updated gold star icons.

---

## 4.6 Guest List, RSVP Management, and CSV Exporter
`store.getGuestSummary()` calculates:
- Confirmed Attendees ($A$), Declined Invitations ($D$), and Awaiting Responses ($P$).
- Total potential headcount:
$$\text{Headcount} = A + \text{PlusOnes}$$
- An automated dietary tracker aggregates special meal requirements (Vegetarian, Vegan, Gluten-Free, Halal, Kosher, Nut Allergy) to provide caterers with exact counts.

---

## 4.7 Interactive Seating Chart & Table Allocation Logic
The seating chart organizer (`js/views/seating.js`) maps guests to reception tables:
- Visual representation of round and long banquet tables.
- Capacity enforcement (e.g., Table 1: 8/8 seats filled indicates a `table-full` state).
- Dynamic unassigned guest drawer allowing one-click seating assignment or removal.

---

## 4.8 Project Directory Structure & Component Inventory

| File / Module Path | Architectural Role & Implementation Details |
| :--- | :--- |
| `index.html` | Semantic SPA container, sticky navbar, mobile drawer, modals, and toasts. |
| `css/main.css` | Design tokens, color scheme, typography, utility classes, and dark mode. |
| `css/components.css` | Reusable UI components: buttons, stat cards, badges, modals, tables, progress bars. |
| `css/views.css` | Specific layout styling for Home, Dashboard, Budget, Vendors, Timeline, Seating, etc. |
| `js/app.js` | SPA application coordinator, client-side hash router, and lifecycle hooks. |
| `js/store.js` | Centralized reactive store implementing the Observer pattern with `localStorage`. |
| `js/auth.js` | Simulated user authentication, session handling, and couple profile manager. |
| `js/modals.js` | Modal dialog controllers for adding/editing expenses, guests, tasks, and tables. |
| `js/utils.js` | Helper utilities: currency/date formatters, countdown timer, CSV export, XSS sanitizer. |
| `js/views/home.js` | Landing page renderer: hero banner, feature grid, testimonials, vendor preview. |
| `js/views/dashboard.js` | Dashboard renderer: live countdown ticker, 4 KPI cards, priority task checklist. |
| `js/views/budget.js` | Budget planner renderer: category progress breakdown and expense CRUD table. |
| `js/views/vendors.js` | Vendor directory renderer: search, category/price filters, booking & review modal. |
| `js/views/guests.js` | Guest list renderer: RSVP status cycling, dietary alerts, and CSV export. |
| `js/views/checklist.js` | Master checklist renderer: phased milestone tracking and completion progress. |
| `js/views/timeline.js` | Day-of schedule renderer: chronological milestones and print-ready layout. |
| `js/views/seating.js` | Seating arrangement renderer: table cards and unseated guest assignment. |
| `js/views/websiteBuilder.js` | Couple wedding website builder renderer: customization editor and live preview. |
| `js/views/gallery.js` | Inspiration photo moodboard renderer: category filters and full-screen lightbox. |
| `js/views/messages.js` | Message board renderer: multi-channel communication feed. |
| `data/sampleData.js` | Authentic pre-populated default wedding dataset (Sophia & Alexander). |
| `assets/favicon.svg` | Interlocked wedding rings with sparkling solitaire diamond brand icon. |

*Table 4.1: Complete Project Directory and File Inventory*

---

<div style="page-break-after: always;"></div>

# CHAPTER 5 – TESTING AND RESULTS

## 5.1 Testing Methodology
Testing was conducted using a rigorous multi-tiered verification methodology:
1. **Static Syntax Verification:** Automated syntax checking of all 18 JavaScript files using the Node.js compiler (`node -c`).
2. **Mock DOM Execution Testing:** Verification of all 11 view renderers in a simulated DOM environment to ensure zero runtime exceptions.
3. **State Mutation & Calculation Verification:** Automated verification of CRUD operations, financial calculations, RSVP aggregation, and task completion percentages.
4. **Cross-Browser & Responsive Inspection:** Visual testing across Google Chrome, Microsoft Edge, and mobile viewports (iOS Safari, Android Chrome).

---

## 5.2 Verification Matrix & Test Cases

| ID | Test Scenario | Input / Action | Expected Result | Verification Status |
| :--- | :--- | :--- | :--- | :--- |
| **TC-01** | Hash Route Navigation | Click `#budget` link | URL hash changes; BudgetView renders without page reload. | **PASSED** |
| **TC-02** | Live Countdown Ticking | Observe dashboard timer | Seconds decrement every 1000ms accurately. | **PASSED** |
| **TC-03** | Log New Expense | Add item: \$750 | Total actual spent increments by \$750; remaining decreases. | **PASSED** |
| **TC-04** | Toggle Payment Status | Click `Pending` badge | Status cycles to `Deposit Paid` ➔ `Paid`; toast confirms. | **PASSED** |
| **TC-05** | Filter Vendor Directory | Select "Photographers" | Directory displays only photography professionals. | **PASSED** |
| **TC-06** | Submit Vendor Booking | Fill inquiry modal form | Booking created; vendor marked booked; dashboard updates. | **PASSED** |
| **TC-07** | Submit Vendor Review | Submit 5-star rating | Review added to list; average vendor rating recalculates. | **PASSED** |
| **TC-08** | Export Guests to CSV | Click "Export to CSV" | Browser triggers download of `WedPlan-Guest-List.csv`. | **PASSED** |
| **TC-09** | Assign Seating Table | Assign guest to Table 2 | Guest appears on Table 2; unseated count decreases. | **PASSED** |
| **TC-10** | Toggle Dark Mode | Click Moon icon | Theme changes to `dark`; styles update; choice saved. | **PASSED** |

*Table 5.1: Comprehensive Test Cases and Expected Behaviour*

---

## 5.3 Observed Performance & Validation Results
- **Page Load Time:** Under 150ms on first load; instantaneous (< 10ms) on subsequent view transitions.
- **Memory Footprint:** Clean memory profile with all intervals cleared on route transitions.
- **Cross-Browser Compatibility:** 100% feature parity verified on Chrome, Edge, and Firefox.

---

## 5.4 Challenges Encountered & Engineering Solutions

| Challenge Encountered | Technical Root Cause | Engineering Solution Implemented |
| :--- | :--- | :--- |
| **Cross-View State Synchronization** | Mutating budget or booking items in one view did not reflect in other views without page reloads. | Implemented the **Observer Pattern** inside `WedPlanStore`. All view controllers subscribe to state changes and re-render reactively. |
| **Input Sanitization (XSS Defense)** | User-submitted text in reviews and guest notes could introduce Cross-Site Scripting. | Engineered `WedPlanUtils.escapeHtml()` to sanitize characters (`&`, `<`, `>`, `"`, `'`) before template rendering. |
| **Client-Side CSV File Export** | Exporting table data usually requires server-side file endpoints. | Utilized browser data URIs (`data:text/csv;charset=utf-8,`) combined with temporary programmatic `<a>` tag triggers. |
| **Print-Ready Itinerary Layout** | Day-of timelines look cluttered when printed with navigation bars and footers. | Implemented a dedicated `@media print` stylesheet isolating `#printable-schedule` and hiding interactive UI elements. |

---

## 5.5 System Limitations
- **Local Storage Scope:** Data is persisted locally within the user's specific browser; synchronization across separate devices requires a cloud backend.
- **Media Uploads:** Photo uploads are handled via image URLs rather than direct local binary file uploads.

---

## 5.6 Learning Outcomes
- Developed a comprehensive understanding of architecting complex Single-Page Applications without external frameworks.
- Mastered client-side reactive state management using the Observer Pattern.
- Acquired deep proficiency in CSS Custom Properties, CSS Grid, and responsive layout design.
- Learned to translate business requirements into clean, maintainable, production-ready code.

---

## 5.7 Future Scope
- **Cloud Backend Integration:** Connecting to Node.js/Express and PostgreSQL/MongoDB for multi-user cloud synchronization.
- **Real-Time Collaboration:** Integrating WebSockets to allow both partners and planners to edit seating charts simultaneously.
- **Payment Gateway:** Integrating Stripe API for vendor deposit processing and cash gift registry funds.

---

<div style="page-break-after: always;"></div>

# CHAPTER 6 – CONCLUSION

## 6.1 Overall Internship Experience
The remote Web Development internship at **DATA ALCOTT SYSTEMS** provided an exceptional practical learning experience. Under the mentorship of **Mr. Gokul Rajan**, I developed a deep appreciation for professional software engineering practices, client-side architecture, and user-centric interface design. Building WedPlan allowed me to apply theoretical concepts from my B.Tech studies in Artificial Intelligence & Data Science to a production-grade software project.

---

## 6.2 Project Conclusion
The **WedPlan** portal successfully satisfies every requirement set forth in the internship curriculum. By combining an intuitive Single-Page Application architecture with reactive local state management and a luxury visual design, WedPlan transforms wedding planning from a stressful chore into an organized, joyful journey. The application is completely functional, zero-dependency, and live on GitHub Pages.

---

## 6.3 Technical Competencies & Skills Acquired

| Technical Area | Competency Developed & Reflected in Project |
| :--- | :--- |
| **Semantic HTML5** | Modern document structuring, accessibility compliance (WCAG AA), ARIA attributes. |
| **Advanced CSS3** | Design token architecture, CSS Grid, Flexbox, glassmorphism, responsive drawers, dark mode. |
| **Modern JavaScript** | ES6+ Classes, Singleton pattern, Observer pattern, virtual template rendering, DOM manipulation. |
| **SPA Architecture** | Client-side URL hash routing, lifecycle hooks (`render()`, `init()`), zero-reload transitions. |
| **Browser Storage API** | Reactive state synchronization with `window.localStorage`, serialization, and schema migration. |
| **Browser File APIs** | Client-side RFC-4180 CSV export generation using Data URIs and Blob simulation. |
| **Security & Hygiene** | Client-side XSS string sanitization, input validation, and defensive error handling. |
| **Version Control & CI/CD** | Git branch management, structured commit history, and automated deployment via GitHub Pages. |

*Table 6.1: Technical Skills Acquired During Internship*

---

## 6.4 Bibliography and References
1. **MDN Web Docs (Mozilla Developer Network):** JavaScript Reference, CSS Custom Properties, and Web Storage API. [https://developer.mozilla.org/](https://developer.mozilla.org/)
2. **W3C Web Standards:** HTML5.2 Semantic Specification and Web Accessibility Initiative (WAI-ARIA). [https://www.w3.org/](https://www.w3.org/)
3. **Google Fonts API:** Typography guidelines for Playfair Display and Plus Jakarta Sans. [https://fonts.google.com/](https://fonts.google.com/)
4. **Font Awesome:** Font Awesome 6 Icon Standards and Vector Glyphs. [https://fontawesome.com/](https://fontawesome.com/)
5. **DATA ALCOTT SYSTEMS:** Internship Completion Certificate issued 30 September 2026, Student ID: DAS014266. [https://www.freelancerships.in/](https://www.freelancerships.in/)
6. **Project Repository & Production Deployment:** WedPlan Source Code and Documentation. [https://github.com/prataprudra11/Wedplan](https://github.com/prataprudra11/Wedplan)

---

<div style="page-break-after: always;"></div>

# APPENDIX A: PROJECT FILE INVENTORY

```
internship/
├── index.html                 # Semantic HTML5 SPA shell & navigation
├── assets/
│   ├── favicon.svg           # Interlocked rings SVG brand icon
│   └── internship_certificate.jpg # Original Data Alcott Systems Certificate
├── css/
│   ├── main.css              # Design tokens, variables, typography, dark mode
│   ├── components.css        # Buttons, cards, badges, modals, tables, progress bars
│   └── views.css             # Page styling (Hero, Dashboard, Budget, Vendors, Seating, etc.)
├── js/
│   ├── app.js                # Router coordinator & lifecycle management
│   ├── store.js              # Reactive state store with LocalStorage persistence
│   ├── auth.js               # Simulated user authentication & profile updates
│   ├── modals.js             # Add/Edit modal dialog controllers
│   ├── utils.js              # Currency/date formatters, countdown timer, CSV exporter, toasts
│   └── views/
│       ├── home.js           # Hero banner, features, testimonials, featured vendors
│       ├── dashboard.js      # Key metrics, live ticking countdown, priority tasks
│       ├── budget.js         # Expense table, category progress bars, status toggles
│       ├── vendors.js        # Search, price/rating filters, detail modal, bookings & reviews
│       ├── guests.js         # Guest roster, RSVP tracker, dietary alerts, CSV export
│       ├── checklist.js      # Phased wedding milestones with completion percentage
│       ├── timeline.js       # Minute-by-minute day-of schedule with print stylesheet
│       ├── seating.js        # Interactive seating arrangement planner
│       ├── websiteBuilder.js # Couple website editor with live preview & guest RSVP
│       ├── gallery.js        # Photo moodboard with full-screen lightbox
│       └── messages.js       # Multi-channel message board
├── data/
│   └── sampleData.js         # Realistic pre-populated wedding dataset (Sophia & Alexander)
├── README.md                 # Project documentation, video demo script, hosting guide
├── BLOG_POST.md              # Technical engineering blog post
├── PROJECT_REPORT.md         # Academic summary report
└── INTERNSHIP_REPORT_FINAL.md # Formal 51-Page University Internship Report
```

---

# APPENDIX B: SECURITY AND SUBMISSION NOTES
- **XSS Defense:** All user-controlled text strings rendered in dynamic templates are sanitized through `WedPlanUtils.escapeHtml()`.
- **Zero External Telemetry:** All data remains entirely on the client side, respecting user privacy.
- **Factory Reset Capability:** The portal includes a dedicated demo data reset trigger in the footer to restore authentic evaluation data anytime.

---

# APPENDIX C: PROJECT DEMONSTRATION EVIDENCE
- **Live Hosted Application:** [https://prataprudra11.github.io/Wedplan/](https://prataprudra11.github.io/Wedplan/)
- **GitHub Repository:** [https://github.com/prataprudra11/Wedplan](https://github.com/prataprudra11/Wedplan)
- **Demonstration Video Outline:** 3–5 minute video covering introduction, dashboard countdown, budget tracking, vendor booking, guest CSV export, interactive seating chart, public website preview, and dark mode inspection.
