/**
 * WedPlan - Timeline & Countdown View
 */

const TimelineView = {
  countdownInterval: null,

  render() {
    const user = window.store.getUser();
    const events = window.store.getTimeline();
    const timeRemaining = WedPlanUtils.getTimeRemaining(user.weddingDate);

    const categoryIcons = {
      "Preparation": "fa-spa",
      "Photos": "fa-camera",
      "Ceremony": "fa-ring",
      "Reception": "fa-champagne-glasses",
      "Send-Off": "fa-wand-magic-sparkles"
    };

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Wedding Day Timeline & Countdown</h1>
            <p class="view-subtitle">Master run-of-show itinerary for the bridal party, vendors, and family.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-outline" onclick="TimelineView.printSchedule()">
              <i class="fa-solid fa-print"></i> Print Itinerary
            </button>
            <button class="btn btn-primary" onclick="WedPlanModals.openAddTimelineModal()">
              <i class="fa-solid fa-plus"></i> Add Milestone
            </button>
          </div>
        </div>

        <!-- Master Countdown Banner -->
        <div class="timeline-countdown-hero">
          <div class="timeline-hero-text">
            <span class="badge badge-gold mb-2"><i class="fa-solid fa-heart"></i> The Big Day</span>
            <h2>${WedPlanUtils.escapeHtml(user.name)}'s Wedding</h2>
            <p><i class="fa-solid fa-calendar-check text-gold"></i> ${WedPlanUtils.formatDate(user.weddingDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${WedPlanUtils.escapeHtml(user.venueName || user.location)}</p>
          </div>

          <div class="timeline-counter-boxes">
            <div class="tl-counter-box">
              <span class="tl-number" id="tl-timer-days">${timeRemaining.days}</span>
              <span class="tl-label">Days</span>
            </div>
            <div class="tl-counter-sep">:</div>
            <div class="tl-counter-box">
              <span class="tl-number" id="tl-timer-hours">${String(timeRemaining.hours).padStart(2, '0')}</span>
              <span class="tl-label">Hours</span>
            </div>
            <div class="tl-counter-sep">:</div>
            <div class="tl-counter-box">
              <span class="tl-number" id="tl-timer-mins">${String(timeRemaining.minutes).padStart(2, '0')}</span>
              <span class="tl-label">Mins</span>
            </div>
            <div class="tl-counter-sep">:</div>
            <div class="tl-counter-box">
              <span class="tl-number" id="tl-timer-secs">${String(timeRemaining.seconds).padStart(2, '0')}</span>
              <span class="tl-label">Secs</span>
            </div>
          </div>
        </div>

        <!-- Schedule Flow -->
        <div class="timeline-schedule-container" id="printable-schedule">
          <div class="print-only-header">
            <h2>${WedPlanUtils.escapeHtml(user.name)} - Master Wedding Day Itinerary</h2>
            <p>${WedPlanUtils.formatDate(user.weddingDate)} · ${WedPlanUtils.escapeHtml(user.venueName)}</p>
          </div>

          <div class="timeline-tree">
            ${events.length === 0 ? `
              <div class="empty-state-full">
                <i class="fa-solid fa-clock text-muted fa-3x"></i>
                <h3>No timeline events yet</h3>
                <p>Build your day-of schedule to keep everyone coordinated.</p>
                <button class="btn btn-primary" onclick="WedPlanModals.openAddTimelineModal()">Add First Event</button>
              </div>
            ` : events.map(ev => {
              const icon = categoryIcons[ev.category] || "fa-clock";
              return `
                <div class="timeline-node">
                  <div class="timeline-time-col">
                    <span class="node-time">${ev.time}</span>
                  </div>

                  <div class="timeline-line-col">
                    <div class="node-icon-circle">
                      <i class="fa-solid ${icon}"></i>
                    </div>
                  </div>

                  <div class="timeline-card-col">
                    <div class="timeline-event-card">
                      <div class="event-card-header">
                        <span class="badge badge-category badge-sm">${WedPlanUtils.escapeHtml(ev.category)}</span>
                        <button class="btn-icon text-danger hide-on-print" title="Delete Milestone" onclick="TimelineView.deleteEvent('${ev.id}')">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                      <h4 class="event-title">${WedPlanUtils.escapeHtml(ev.title)}</h4>
                      ${ev.location ? `<div class="event-loc"><i class="fa-solid fa-location-dot text-gold"></i> ${WedPlanUtils.escapeHtml(ev.location)}</div>` : ''}
                      ${ev.notes ? `<p class="event-notes">${WedPlanUtils.escapeHtml(ev.notes)}</p>` : ''}
                    </div>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.startCountdown();
  },

  startCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    this.countdownInterval = setInterval(() => {
      const user = window.store.getUser();
      const res = WedPlanUtils.getTimeRemaining(user.weddingDate);

      const d = document.getElementById("tl-timer-days");
      const h = document.getElementById("tl-timer-hours");
      const m = document.getElementById("tl-timer-mins");
      const s = document.getElementById("tl-timer-secs");

      if (d && h && m && s) {
        d.textContent = res.days;
        h.textContent = String(res.hours).padStart(2, "0");
        m.textContent = String(res.minutes).padStart(2, "0");
        s.textContent = String(res.seconds).padStart(2, "0");
      }
    }, 1000);
  },

  printSchedule() {
    window.print();
  },

  deleteEvent(id) {
    if (confirm("Remove this event from the day-of timeline?")) {
      window.store.deleteTimelineEvent(id);
      WedPlanUtils.showToast("Milestone removed from timeline.", "success");
      window.app.renderActiveView();
    }
  }
};

if (typeof window !== "undefined") {
  window.TimelineView = TimelineView;
}
