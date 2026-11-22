# 💍 Building WedPlan: How I Engineered a Luxury Wedding Planning Portal with Pure Vanilla JavaScript

*A comprehensive technical deep-dive into building a zero-dependency, reactive Single-Page Application (SPA) for wedding planning as part of my Web Development Internship.*

---

![WedPlan Hero Banner](https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80)

## 📌 Introduction: The Wedding Planning Dilemma

Planning a wedding is one of the most emotional, memorable, and financially significant milestones in anyone’s life. Yet, ask any couple about their planning experience, and you will hear a universal tale of chaos:
- Budgets tracked across multiple half-updated spreadsheets.
- Vendor inquiries buried in messy email threads and Instagram DMs.
- RSVP tracking scrawled in notebooks or lost in WhatsApp chats.
- Day-of timelines scribbled on sticky notes.

As part of my **Web Development Internship**, I set out to solve this fragmentation by creating **WedPlan** — an elegant, all-in-one client-side wedding planning portal that empowers couples to coordinate every detail of their dream wedding with confidence, clarity, and peace of mind.

Here is the story of how I built WedPlan from scratch, the architecture and technologies I leveraged, the engineering challenges I overcame, and the lessons I learned along the way.

---

## ⚡ The Project Requirements & Constraints

The internship brief came with clear, high-impact constraints:
1. **Frontend-Only Architecture:** No external database or server-side backend required. All data persistence needed to be handled natively in the browser via JavaScript objects, arrays, and browser storage APIs.
2. **Comprehensive Feature Suite:** Budget management, vendor sourcing with package comparisons, guest RSVP tracking, checklist milestones, countdown timers, and day-of timelines.
3. **Specific Design Language:** A bespoke, romantic palette featuring **Luxury Gold (`#D4A574`)**, **Romantic Rose (`#E85D7A`)**, **Warm Cream (`#FDF6F0`)**, and **Pure White (`#FFFFFF`)**.
4. **Zero-Build Deployment:** Must deploy seamlessly to **GitHub Pages / Netlify / Vercel** without complex build steps or node server dependencies.

---

## 🛠️ The Tech Stack: Why I Chose Pure Vanilla Web Technologies

In a web landscape dominated by heavyweight frameworks like React, Next.js, and Vue, I intentionally chose to master the fundamentals and engineer WedPlan using **pure, modern web standards**:

```
┌────────────────────────────────────────────────────────┐
│                   WEDPLAN TECH STACK                   │
├───────────────────┬────────────────────────────────────┤
│ Structure         │ HTML5 Semantic Elements            │
│ Styling           │ Modern CSS3 (Grid, Flexbox, Tokens)│
│ Interactivity     │ Vanilla JavaScript (ES6+ Classes)  │
│ State Engine      │ LocalStorage + Observer Pattern    │
│ Routing           │ Client-Side Hash Router (SPA)      │
│ Icons & Fonts     │ Font Awesome 6 + Google Fonts      │
│ Deployment        │ GitHub Pages (Zero-Build CI/CD)    │
└───────────────────┴────────────────────────────────────┘
```

### 1. HTML5 (Semantic & Accessible)
- Clean document outlines using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>`.
- Complete ARIA attributes (`aria-hidden`, `aria-label`, `aria-live`) for modal dialogs and notification toasts to maintain accessibility.

### 2. Modern CSS3 (Design Tokens & Responsive Systems)
- **CSS Custom Properties (Variables):** Allowed instantaneous theme toggling between **Romantic Light Mode** and **Midnight Romance Dark Mode** with zero style duplication.
- **CSS Grid & Flexbox:** Created responsive data tables, fluid stat cards, and dynamic visual seating charts without relying on bloated UI libraries.
- **Micro-Interactions & Glassmorphism:** Subtle hover elevations, backdrop blur filters (`backdrop-filter: blur(8px)`), and smooth cubic-bezier transitions that evoke a luxury bridal magazine aesthetic.

### 3. JavaScript ES6+ (Architecture & Patterns)
- **Single Page Application (SPA) Hash Router:** Handled routes (`#home`, `#dashboard`, `#budget`, `#vendors`, etc.) seamlessly without triggering full page refreshes.
- **Reactive State Management (Observer Pattern):** Created a centralized `WedPlanStore` class that automatically synchronizes state changes to browser `localStorage` and notifies subscribed views to re-render instantly.
- **Browser File APIs:** Implemented client-side CSV file generation using data URIs (`data:text/csv;charset=utf-8,`) for instant guest roster exports.

---

## 🏗️ How I Engineered the Application (Step-by-Step Journey)

### Step 1: Architectural Blueprint & Reactive Store
Before writing any UI code, I designed the single source of truth: `WedPlanStore`. 

Because no backend was allowed, I needed a way for changes made in one view (e.g., adding an expense or booking a vendor) to reflect immediately across the entire app (e.g., updating the dashboard metrics) without page reloads.

I implemented an **Observer Pattern** inside `js/store.js`:
```javascript
class WedPlanStore {
  constructor() {
    this.STORAGE_KEY = "wedplan_state_v1";
    this.listeners = {};
    this.state = this.loadState();
  }

  subscribe(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  emit(event, data) {
    this.saveState(); // Persist to LocalStorage
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => cb(data));
    }
    // Also trigger general change event
    if (this.listeners["change"]) {
      this.listeners["change"].forEach(cb => cb({ event, data }));
    }
  }
  // CRUD methods for budget, guests, tasks, vendors...
}
```
Whenever a user logs an expense or checks off a task, the store saves to `localStorage` and notifies active views in sub-10 milliseconds.

---

### Step 2: Client-Side Hash Routing (Zero-Reload SPA)
To provide an app-like experience without requiring a backend server to handle URL rewrites, I built a lightweight client-side router in `js/app.js`:
- Listening to `window.addEventListener("hashchange", ...)`
- Mapping URL hashes (`#budget`, `#vendors`, `#guests`) directly to modular view controllers (`BudgetView`, `VendorsView`, `GuestsView`).
- Automatically scrolling to the top on transition and updating active navbar states.

---

### Step 3: Engineering the Core Modules

#### 1. The Wedding Dashboard & Live Countdown
The dashboard acts as the couple’s command center. It features:
- A high-precision live countdown ticker updating days, hours, minutes, and seconds every 1,000ms.
- 4 dynamic Key Performance Indicators (Total Budget Spent vs. Cap, Confirmed RSVPs, Checklist Completion %, and Booked Vendors).
- Quick action buttons to immediately trigger add modals.

#### 2. The Budget Planner with Visual Breakdown
Couples often struggle to balance venue and catering costs against discretionary items. I engineered:
- A dynamic category spending breakdown displaying proportion bars for Venue, Catering, Photography, Florals, Music, and Attire.
- An interactive expense table where clicking payment badges cycles from **Pending** ➔ **Deposit Paid** ➔ **Paid** in real-time.
- An adjustable total budget cap modal that recalculates remaining balance and alert indicators automatically.

#### 3. Vendor Directory, Interactive Booking & Live Reviews
Wedding vendor research is traditionally tedious. In WedPlan:
- Users can filter across 8 vendor categories, price tiers (`$$`–`$$$$`), and star ratings (`4.5+`, `5.0`).
- Clicking any vendor opens a rich detail modal featuring bios, service tags, and pricing packages.
- A **Simulated Booking Form** lets couples reserve their date, immediately marking the vendor as booked and adding them to the dashboard.
- A **Live Review Engine** allows couples to submit ratings that dynamically recalculate the vendor's average score on the fly!

#### 4. Guest List, RSVP Tracking & Client-Side CSV Export
- Categorizes guests by party side (*Bride*, *Groom*, *Mutual Friends*) and RSVP status (*Attending*, *Pending*, *Declined*).
- An automated **Dietary Restrictions Strip** calculates exact counts for Vegetarian, Vegan, Gluten-Free, and Halal meals to assist caterers.
- An **Export to CSV** utility converts the guest array into an RFC-4180 compliant CSV file downloaded straight to the user’s computer using browser Blob encoding.

#### 5. Checklist & Minute-by-Minute Day-Of Timeline
- The checklist segments planning milestones across time horizons (`12+ Months`, `6-8 Months`, `Week Of`, `Day Of`) with a master percentage bar.
- The timeline connects the wedding day’s run-of-show with custom milestone badges and includes a `@media print` stylesheet for day-of paper distribution.

---

### Step 4: Building the Bonus Features

To deliver an exceptional experience, I went beyond the baseline requirements and built three advanced bonus features:

1. 🪑 **Interactive Seating Arrangement Planner:** Visual table cards representing round and banquet tables with capacity counters, seated guest tags, and quick-assignment dropdowns for unseated guests.
2. 🌐 **Wedding Website Builder & Live Preview:** A mini-site generator with a browser mock frame where couples can customize their love story and schedule, and guests can submit RSVPs directly into the database!
3. 📸 **Inspiration Gallery & Lightbox:** Curated moodboard categorized by Florals, Dresses, Decor, and Cakes with full-screen lightbox navigation.
4. 🌓 **Midnight Romance Dark Mode:** A one-click theme switcher that transforms the palette into an atmospheric dark charcoal and champagne theme persisted in storage.

---

## 💡 Engineering Challenges & How I Solved Them

| Challenge | Root Cause | Solution Implemented |
| :--- | :--- | :--- |
| **Cross-Component State Sync** | Adding an expense or booking a vendor in one view wasn't updating other views without full page reloads. | Implemented an Observer/Event Bus inside `WedPlanStore`. All view controllers subscribe to state changes and re-render instantly. |
| **XSS Prevention in User Inputs** | Injecting user-submitted guest names or reviews into `innerHTML` presented potential Cross-Site Scripting risks. | Built a custom `WedPlanUtils.escapeHtml()` sanitizer that encodes special characters (`&`, `<`, `>`, `"`, `'`) before template rendering. |
| **Client-Side CSV Export** | Exporting table data typically requires server-side endpoints like Python/Node. | Leveraged browser `encodeURI("data:text/csv;charset=utf-8," + csvContent)` with a temporary DOM `<a>` tag trigger. |
| **Print-Ready Itinerary Layout** | Day-of timelines look messy when printed with full website navigation and footers. | Wrote a dedicated `@media print` stylesheet that isolates `#printable-schedule`, hides navigation/buttons, and formats clean high-contrast text. |

---

## 📈 Key Takeaways & What I Learned

1. **Frameworks are powerful, but fundamentals are eternal:** Building a complete SPA in vanilla JavaScript reinforced my deep understanding of the DOM, browser event lifecycles, and design patterns.
2. **Design systems make or break an application:** Sticking strictly to a cohesive palette (Gold, Cream, Rose, Slate) elevated a student project into a portfolio piece that looks like a commercially designed SaaS product.
3. **User experience lies in the micro-details:** Adding toast notifications, live countdown tickers, and status toggles transformed static tables into an interactive, delightful tool.

---

## 🚀 Live Demo & Source Code

- 🌐 **Live Website:** [https://prataprudra11.github.io/Wedplan/](https://prataprudra11.github.io/Wedplan/)
- 💻 **GitHub Repository:** [https://github.com/prataprudra11/Wedplan](https://github.com/prataprudra11/Wedplan)
- 📄 **Full Project Report:** [PROJECT_REPORT.md](https://github.com/prataprudra11/Wedplan/blob/main/PROJECT_REPORT.md)

---

*Thank you for reading! If you found this write-up helpful or inspiring for your own frontend journey, feel free to give the repository a ⭐ on GitHub and connect with me on LinkedIn!*
