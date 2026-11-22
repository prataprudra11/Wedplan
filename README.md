# 💍 WedPlan – Dream Wedding Planning Portal

> **A luxury, all-in-one frontend wedding planning web application designed to help couples manage their budget, curated vendors, guest RSVPs, seating charts, planning checklists, and day-of timelines.**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Responsive](https://img.shields.io/badge/Design-Fully%20Responsive-rose?style=for-the-badge)](#)
[![Zero Build](https://img.shields.io/badge/Zero%20Build-Instant%20Deploy-gold?style=for-the-badge)](#)

---

## 🌟 Table of Contents
- [Project Overview](#-project-overview)
- [Design System & Palette](#-design-system--palette)
- [Key Modules & Pages](#-key-modules--pages)
- [Bonus & Advanced Features](#-bonus--advanced-features)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Quick Start / Local Setup](#-quick-start--local-setup)
- [Deployment Guide (GitHub Pages / Netlify / Vercel)](#-deployment-guide)
- [Video Demonstration Guide (3–5 Min Script)](#-video-demonstration-guide)
- [Screenshots & Visual Guide](#-screenshots--visual-guide)
- [Project Report Reference](#-project-report-reference)

---

## 📖 Project Overview

**WedPlan** is a comprehensive, client-side wedding planning platform built for modern couples. Planning a wedding often involves juggling multiple spreadsheets, vendor contracts, guest lists, and schedules. WedPlan consolidates the entire wedding journey into an intuitive, elegant, single-page application (SPA).

WedPlan runs entirely in modern browsers with **zero build steps** and **zero external database dependencies**. It utilizes reactive state management synchronized with the browser's `localStorage` and comes pre-populated with a rich, realistic dataset for **Sophia & Alexander's vineyard wedding in Napa Valley**.

---

## 🎨 Design System & Palette

Crafted according to the official project design specifications:

| Role | Color Name | Hex Code | Visual Preview |
| :--- | :--- | :--- | :--- |
| **Primary Accent** | Luxury Gold | `#D4A574` | `rgb(212, 165, 116)` |
| **Secondary Accent** | Romantic Rose | `#E85D7A` | `rgb(232, 93, 122)` |
| **Surface / Background**| Warm Cream / Ivory | `#FDF6F0` / `#FAF5F0` | `rgb(253, 246, 240)` |
| **Pure White** | Card Surface | `#FFFFFF` | `rgb(255, 255, 255)` |
| **Typography** | Deep Charcoal Slate | `#2D2424` / `#4A3E3D` | `rgb(45, 36, 36)` |

### Typography
- **Headings**: `'Playfair Display'` & `'Cormorant Garamond'` — romantic, editorial, celebratory serif typefaces.
- **UI & Body**: `'Plus Jakarta Sans'` — clean, highly legible, accessible modern sans-serif.

### Vibe & Aesthetics
- **Romantic Luxury**: Soft golden glows, delicate shadows, glassmorphism overlays, and card elevations.
- **Midnight Romance (Dark Mode)**: Seamless one-click dark mode toggle switching into an atmospheric charcoal and champagne aesthetic (`#161312`).

---

## 📋 Key Modules & Pages

### 1. Home Page (`#home`)
- **Hero Banner**: Atmospheric golden hour imagery with couple celebration badge and live ticking countdown pill.
- **Key Planning Features**: Feature cards leading directly to all planning sub-tools.
- **Featured Vendors Preview**: Top-rated venues and artists with pricing tiers and quick detail modals.
- **Real Couple Testimonials**: Verified newlywed feedback with 5-star ratings.
- **Call-to-Action**: Direct conversion gateway into the planning suite.

### 2. Wedding Dashboard (`#dashboard`)
- **Couple Banner**: Dynamic partner names, wedding date, venue, and live countdown ticker ticking down to the exact second.
- **Four Key Planning Metrics**:
  - Total Budget spent vs. overall target limit with progress bar.
  - Confirmed RSVP guest attendance count vs. total invited.
  - Checklist tasks completed percentage.
  - Booked vendors overview.
- **Quick Actions Row**: Instant one-click triggers to add expenses, guests, tasks, or view seating.
- **Priority Tasks List**: Fast checkbox completion of immediate upcoming tasks.
- **Timeline Snapshot**: High-level run-of-show summary.

### 3. Budget Planner (`#budget`)
- **Financial Analytics**: Total budget cap, total spent, estimated allocation, and remaining balance.
- **Visual Category Breakdown**: Color-coded category spending bars and proportion metrics (Venue, Catering, Photography, Florals, Music, Attire, Rings, Stationery).
- **Interactive Expense Table**:
  - Filter by category and real-time search.
  - Interactive payment status toggles (`Pending` ➔ `Deposit Paid` ➔ `Paid`).
  - Add, edit, and delete expense items with instant recalculation.
  - Dynamic budget cap adjustment.

### 4. Vendor Directory & Detail (`#vendors`)
- **Smart Filtering**: Filter by category (Venues, Photographers, Caterers, Florists, Planners, Music/DJs, Attire, Cakes), price tier (`$$` to `$$$$`), and minimum star rating (`4.5+`, `5.0`).
- **Instant Search**: Debounced live search across vendor names, bios, and locations.
- **Interactive Vendor Detail Modal**:
  - High-res cover image and verified badge.
  - Full vendor overview and services checklist.
  - Package breakdown with pricing descriptions.
  - **Simulated Booking & Inquiry System**: Select event date, guest count, and service package; upon submission, the vendor is marked as booked and added to the user's dashboard!
  - **Live Reviews & Ratings**: Read verified reviews and submit new star ratings that dynamically recalculate the vendor's average score.

### 5. Guest List & RSVP Management (`#guests`)
- **Invitation Statistics**: Total invited, confirmed attending, declined, pending, plus-ones count, and catering headcount.
- **Dietary Alert Strip**: Real-time summary of dietary restrictions (Vegetarian, Vegan, Gluten-Free, Halal, Kosher, Nut Allergy) to assist caterers.
- **Filter & Search**: Segment by RSVP status or party side (Bride, Groom, Mutual).
- **Actions**:
  - Add new guest with plus-one and dietary details.
  - Edit guest details and table assignment.
  - Instant one-click RSVP status cycling.
  - **Export to CSV**: Instant client-side CSV download formatted for calligraphers and caterers.

### 6. Wedding Checklist (`#checklist`)
- **Progress Tracking**: Master completion bar displaying exact percentage and task counts.
- **Timeframe Segmentation**: Filter tasks across standardized wedding phases (`12+ Months`, `9-11 Months`, `6-8 Months`, `3-5 Months`, `1-2 Months`, `Week Of`, `Day Of`).
- **Interactive Checkboxes**: Real-time task completion toggle with strike-through styling.
- **Task Management**: Create custom tasks with priority levels (`High`, `Medium`, `Low`), due dates, categories, and notes.

### 7. Day-Of Timeline & Countdown (`#timeline`)
- **Live Master Countdown**: Seconds, minutes, hours, and days counting down live.
- **Milestone Tree**: Chronological run-of-show schedule connecting hair & makeup, first look, vows, cocktail hour, dinner, dances, and sparkler send-off.
- **Add Milestone**: Custom event modal for time, title, location, category, and notes.
- **Printable Itinerary**: Dedicated print stylesheet formatted cleanly for day-of paper distribution.

### 8. Message Board (`#messages`)
- **Coordination Channels**: Multi-channel communication hub for `#Vendor Coordination`, `#Bridal Party & Groomsmen`, `#General Announcements`, and `#Immediate Family`.
- **Real-Time Simulation**: Post messages, select sender identity (Bride, Groom, Maid of Honor, Planner), and persist chat history in `localStorage`.

### 9. User Authentication & Profile (`#dashboard` / Modal)
- **Simulated Auth**: Sign up, log in, switch couple profiles, and log out.
- **One-Click Demo Access**: Instant login to Sophia & Alexander's pre-populated account.
- **Couple Profile Editor**: Update partner names, wedding date, venue, location, and total budget cap with immediate application across all views.

---

## 🎁 Bonus & Advanced Features

| Feature | Description |
| :--- | :--- |
| 🪑 **Seating Arrangement Planner** | Interactive table layout supporting Round and Banquet tables with capacity limits, seated guest tags, and quick-assignment dropdowns from unseated guests. |
| 🌐 **Wedding Website Builder** | Couple mini-site generator with live preview frame. Couples can edit their tagline, love story, schedule, and dress code, and guests can submit RSVPs directly through the public preview! |
| 📸 **Inspiration Gallery & Lightbox** | Curated visual moodboard categorized by Venues, Dresses, Decor, Florals, Cakes, and Moments with full-screen lightbox modal navigation. |
| 🌓 **Dark Mode Toggle** | Elegant transition between Romantic Light (Ivory & Gold) and Midnight Romance (Dark Charcoal & Champagne) persisted in `localStorage`. |
| 📥 **CSV Export Utility** | One-click export of the complete guest roster into an Excel/Google Sheets-compatible `.csv` file. |
| 🔄 **Demo Data Reset** | Reset button in the footer to restore the realistic Sophia & Alexander sample dataset anytime for grading or demonstration. |

---

## 🛠 Architecture & Tech Stack

```
internship/
├── index.html                 # Main Single Page Application shell & layout
├── css/
│   ├── main.css              # Design tokens, variables, typography, navigation, dark mode
│   ├── components.css        # Buttons, cards, badges, modal dialogs, forms, tables
│   └── views.css             # Page-specific views (Home, Dash, Budget, Vendors, Seating, etc.)
├── js/
│   ├── app.js                # Application coordinator, hash router & lifecycle
│   ├── store.js              # Reactive state store backed by LocalStorage
│   ├── auth.js               # Simulated user authentication & profile management
│   ├── modals.js             # Add/Edit modal dialog controllers
│   ├── utils.js              # Formatting (currency, date, countdown, CSV exporter, toasts)
│   └── views/
│       ├── home.js           # Home landing page renderer
│       ├── dashboard.js      # Main dashboard with live countdown
│       ├── budget.js         # Budget manager & category breakdown
│       ├── vendors.js        # Vendor directory, detail modal, bookings, and reviews
│       ├── guests.js         # Guest list, RSVP tracker, and CSV export
│       ├── checklist.js      # Milestone checklist with progress tracking
│       ├── timeline.js       # Day-of timeline with print stylesheet
│       ├── seating.js        # Interactive seating arrangement planner
│       ├── websiteBuilder.js # Couple public wedding website builder & preview
│       ├── gallery.js        # Inspiration gallery with lightbox viewer
│       └── messages.js       # Vendor & wedding party message board
├── data/
│   └── sampleData.js         # Rich, authentic default wedding dataset
├── assets/
│   └── favicon.svg           # Elegant SVG intertwined wedding rings monogram
├── README.md                 # Complete project documentation & guide
└── PROJECT_REPORT.md         # Formal academic/internship project report
```

- **Frontend Core**: Vanilla HTML5, CSS3 (Modern Flexbox & CSS Grid, Custom Properties), JavaScript (ES6+ Modules & Singletons).
- **Routing**: Client-side URL hash router (`#home`, `#dashboard`, `#budget`, `#vendors`, etc.) providing smooth transitions without page reloads.
- **State Management**: Reactive `WedPlanStore` using the Observer Pattern with `localStorage` persistence.
- **Typography & Icons**: Google Fonts (`Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`) and Font Awesome 6 CDN.

---

## 🚀 Quick Start / Local Setup

WedPlan requires **no Node.js build process, bundler, or package installation**.

### Option 1: Direct Browser Launch
1. Clone or download this repository.
2. Double-click `index.html` or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Local HTTP Server (Recommended)
Using Python (pre-installed on most systems):
```bash
# In the project root directory:
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

Using Node.js:
```bash
npx serve .
```

---

## 🌐 Deployment Guide

### Deploying to GitHub Pages (Free)
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of WedPlan portal"
   git branch -M main
   git remote add origin https://github.com/<your-username>/wedplan.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website will be live in ~60 seconds at `https://<your-username>.github.io/wedplan/`.

### Deploying to Netlify (Free)
1. Drag and drop the project folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or connect your GitHub repository; set **Build command** to blank and **Publish directory** to `.`.

### Deploying to Vercel (Free)
1. Run `npx vercel` in the project root or import the repository on [vercel.com](https://vercel.com).
2. Accept the default static site configuration.

---

## 🎥 Video Demonstration Guide (3–5 Min Script)

When recording your submission video for YouTube (Public or Unlisted), follow this structured walkthrough:

| Timestamp | Section | Talking Points & Actions to Show |
| :--- | :--- | :--- |
| **0:00 – 0:35** | **Introduction** | Introduce yourself, the project name (**WedPlan**), the internship program, and the project objective: an all-in-one wedding portal for modern couples. |
| **0:35 – 1:15** | **Home & Dashboard** | Show the hero banner, countdown preview, and testimonials. Navigate to `#dashboard`. Point out the live ticking countdown timer, key budget and RSVP metrics, and priority tasks. |
| **1:15 – 2:00** | **Budget Planner** | Navigate to `#budget`. Explain the spending by category chart. Demonstrate adding a new expense item, updating status from `Pending` to `Paid`, and adjusting the total budget limit. |
| **2:00 – 2:40** | **Vendors & Booking** | Navigate to `#vendors`. Demonstrate the instant category filters and price tier selector. Open a vendor detail modal (e.g. *St. Clair Vineyards* or *Luminary Photography*). Show the simulated booking inquiry form and leave a 5-star review. |
| **2:40 – 3:20** | **Guests, RSVPs & Seating** | Navigate to `#guests`. Filter by RSVP status, demonstrate the dietary restrictions breakdown, and click **Export to CSV**. Next, show the **Seating Chart Planner** (`#seating`) and assign an unseated guest to a table. |
| **3:20 – 4:00** | **Checklist, Timeline & Website** | Check off tasks on `#checklist`. Open `#timeline` and highlight the day-of run-of-show. Switch to `#website` to preview the public couple wedding website. Show `#messages` and `#gallery`. |
| **4:00 – 4:30** | **Mobile View & Dark Mode** | Open DevTools (`F12`), toggle device emulation to iPhone/Pixel, show responsive hamburger navigation. Click the **Moon icon** to toggle Dark Mode. Conclude the video. |

---

## 📸 Screenshots & Visual Guide

For your submission documentation, capture these high-resolution screenshots:

1. `screenshot-home.png`: Landing hero banner, countdown preview, and planning tools grid.
2. `screenshot-dashboard.png`: Couple overview card, live timer, and 4 KPI metrics.
3. `screenshot-budget.png`: Expense tracking table and category progress breakdown.
4. `screenshot-vendors.png`: Vendor directory grid and open vendor booking modal.
5. `screenshot-guests.png`: Guest list with RSVP badges and dietary alert strip.
6. `screenshot-seating.png`: Visual reception table cards and unassigned guests panel.
7. `screenshot-mobile.png`: Mobile view showing responsive layout and hamburger menu.
8. `screenshot-darkmode.png`: Dashboard or Budget in Midnight Elegance Dark Mode.

---

## 📄 Project Report Reference

A formal 2-page project report has been compiled and is available in [PROJECT_REPORT.md](file:///c:/Users/RUDRA/OneDrive/Desktop/FOLDERS/coding/internship/PROJECT_REPORT.md), covering:
- Formal Project Objectives & Scope
- Software Architecture & Technical Frameworks
- Complete Functional Module Breakdown
- Key Engineering Learning Outcomes
- Challenges Encountered & Technical Solutions
- Future Roadmap for Backend & Database Scalability

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
