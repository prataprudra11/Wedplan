/**
 * WedPlan - Dashboard View
 */

const DashboardView = {
  countdownInterval: null,

  render() {
    const user = window.store.getUser();
    const budget = window.store.getBudgetSummary();
    const guests = window.store.getGuestSummary();
    const tasks = window.store.getTaskSummary();
    const allTasks = window.store.getTasks().filter(t => !t.completed).slice(0, 4);
    const bookings = window.store.getBookings();
    const timeline = window.store.getTimeline().slice(0, 4);
    const timeRemaining = WedPlanUtils.getTimeRemaining(user.weddingDate);

    return `
      <div class="dashboard-container">
        <!-- Hero Couple Banner -->
        <div class="dash-hero-card">
          <div class="dash-hero-content">
            <div class="dash-hero-badge"><i class="fa-solid fa-crown text-gold"></i> Couple Portal</div>
            <h1 class="dash-title">${WedPlanUtils.escapeHtml(user.name)}</h1>
            <div class="dash-meta">
              <span><i class="fa-solid fa-calendar-day text-rose"></i> ${WedPlanUtils.formatDate(user.weddingDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span><i class="fa-solid fa-location-dot text-gold"></i> ${WedPlanUtils.escapeHtml(user.venueName || user.location)}</span>
            </div>
          </div>

          <!-- Live Countdown Counter -->
          <div class="dash-countdown-box">
            <span class="countdown-heading"><i class="fa-solid fa-hourglass-half"></i> Countdown to I Do</span>
            <div class="dash-timer-grid" id="dash-live-timer">
              <div class="dash-timer-item">
                <span class="timer-num" id="dash-timer-days">${timeRemaining.days}</span>
                <span class="timer-lbl">Days</span>
              </div>
              <div class="dash-timer-item">
                <span class="timer-num" id="dash-timer-hours">${String(timeRemaining.hours).padStart(2, "0")}</span>
                <span class="timer-lbl">Hours</span>
              </div>
              <div class="dash-timer-item">
                <span class="timer-num" id="dash-timer-mins">${String(timeRemaining.minutes).padStart(2, "0")}</span>
                <span class="timer-lbl">Mins</span>
              </div>
              <div class="dash-timer-item">
                <span class="timer-num" id="dash-timer-secs">${String(timeRemaining.seconds).padStart(2, "0")}</span>
                <span class="timer-lbl">Secs</span>
              </div>
            </div>
            <button class="btn btn-xs btn-outline-light" onclick="WedPlanModals.openEditProfileModal()">
              <i class="fa-solid fa-pen"></i> Edit Date & Details
            </button>
          </div>
        </div>

        <!-- Quick Actions Row -->
        <div class="dash-quick-actions">
          <button class="btn-action" onclick="WedPlanModals.openAddExpenseModal()">
            <div class="btn-action-icon icon-gold"><i class="fa-solid fa-plus"></i></div>
            <span>Add Expense</span>
          </button>
          <button class="btn-action" onclick="WedPlanModals.openAddGuestModal()">
            <div class="btn-action-icon icon-rose"><i class="fa-solid fa-user-plus"></i></div>
            <span>Add Guest</span>
          </button>
          <button class="btn-action" onclick="WedPlanModals.openAddTaskModal()">
            <div class="btn-action-icon icon-gold"><i class="fa-solid fa-check"></i></div>
            <span>New Task</span>
          </button>
          <a href="#seating" class="btn-action">
            <div class="btn-action-icon icon-rose"><i class="fa-solid fa-chair"></i></div>
            <span>Seating Plan</span>
          </a>
          <a href="#website" class="btn-action">
            <div class="btn-action-icon icon-gold"><i class="fa-solid fa-globe"></i></div>
            <span>Our Website</span>
          </a>
        </div>

        <!-- Four Key Metric Cards -->
        <div class="dash-stats-grid">
          <!-- Budget Card -->
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Budget Overview</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-wallet"></i></div>
            </div>
            <div class="stat-value">${WedPlanUtils.formatCurrency(budget.totalActual)}</div>
            <div class="stat-subtext">Spent of ${WedPlanUtils.formatCurrency(budget.totalBudget)} limit</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill bg-gold" style="width: ${budget.percentSpent}%"></div>
            </div>
            <div class="stat-footer">
              <span>Remaining: <strong>${WedPlanUtils.formatCurrency(budget.remainingBudget)}</strong></span>
              <a href="#budget" class="stat-link">Details <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- Guest RSVP Card -->
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Guest RSVPs</span>
              <div class="stat-icon icon-rose"><i class="fa-solid fa-envelope-open-text"></i></div>
            </div>
            <div class="stat-value">${guests.attending} Attending</div>
            <div class="stat-subtext">${guests.pending} Pending · ${guests.declined} Declined</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill bg-rose" style="width: ${guests.totalInvited > 0 ? Math.round((guests.attending / guests.totalInvited) * 100) : 0}%"></div>
            </div>
            <div class="stat-footer">
              <span>Total Invited: <strong>${guests.totalInvited} (${guests.totalPotentialAttendees} with +1s)</strong></span>
              <a href="#guests" class="stat-link">Roster <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- Task Progress Card -->
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Checklist Progress</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-list-check"></i></div>
            </div>
            <div class="stat-value">${tasks.percent}% Done</div>
            <div class="stat-subtext">${tasks.completed} completed of ${tasks.total} tasks</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill bg-gold" style="width: ${tasks.percent}%"></div>
            </div>
            <div class="stat-footer">
              <span>${tasks.pending} pending tasks remaining</span>
              <a href="#checklist" class="stat-link">Checklist <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>

          <!-- Vendor Bookings Card -->
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Booked Vendors</span>
              <div class="stat-icon icon-rose"><i class="fa-solid fa-handshake"></i></div>
            </div>
            <div class="stat-value">${bookings.length} Booked</div>
            <div class="stat-subtext">Venue & Photography secured</div>
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill bg-rose" style="width: 50%"></div>
            </div>
            <div class="stat-footer">
              <span>Need: Florist, DJ, Cake</span>
              <a href="#vendors" class="stat-link">Browse <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>

        <!-- Two Column Content Row -->
        <div class="dash-columns-grid">
          <!-- Left Column: Pending Tasks -->
          <div class="dash-panel">
            <div class="dash-panel-header">
              <h3><i class="fa-solid fa-clock text-gold"></i> Priority Tasks To Do</h3>
              <a href="#checklist" class="btn btn-xs btn-outline">View All (${tasks.pending})</a>
            </div>
            <div class="dash-task-list">
              ${allTasks.length === 0 ? `
                <div class="empty-state-sm">
                  <i class="fa-solid fa-circle-check text-gold"></i>
                  <p>All priority tasks are completed!</p>
                </div>
              ` : allTasks.map(t => `
                <div class="dash-task-item">
                  <label class="custom-checkbox">
                    <input type="checkbox" onchange="DashboardView.toggleTaskQuick('${t.id}')" />
                    <span class="checkmark"></span>
                  </label>
                  <div class="dash-task-info">
                    <span class="dash-task-title">${WedPlanUtils.escapeHtml(t.title)}</span>
                    <div class="dash-task-tags">
                      <span class="badge badge-sm badge-${t.priority.toLowerCase()}">${t.priority}</span>
                      <span class="text-muted"><i class="fa-regular fa-calendar"></i> Due ${WedPlanUtils.formatDate(t.dueDate)}</span>
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Right Column: Day-of Timeline Preview -->
          <div class="dash-panel">
            <div class="dash-panel-header">
              <h3><i class="fa-solid fa-calendar-check text-rose"></i> Wedding Day Timeline Snapshot</h3>
              <a href="#timeline" class="btn btn-xs btn-outline">Full Schedule</a>
            </div>
            <div class="dash-timeline-list">
              ${timeline.map(tm => `
                <div class="dash-timeline-item">
                  <div class="dash-tm-time">${tm.time}</div>
                  <div class="dash-tm-bullet"></div>
                  <div class="dash-tm-desc">
                    <strong>${WedPlanUtils.escapeHtml(tm.title)}</strong>
                    <div class="text-muted"><i class="fa-solid fa-location-dot"></i> ${WedPlanUtils.escapeHtml(tm.location)}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  },

  init() {
    this.startLiveCountdown();
  },

  startLiveCountdown() {
    if (this.countdownInterval) clearInterval(this.countdownInterval);

    this.countdownInterval = setInterval(() => {
      const user = window.store.getUser();
      const res = WedPlanUtils.getTimeRemaining(user.weddingDate);
      
      const d = document.getElementById("dash-timer-days");
      const h = document.getElementById("dash-timer-hours");
      const m = document.getElementById("dash-timer-mins");
      const s = document.getElementById("dash-timer-secs");

      if (d && h && m && s) {
        d.textContent = res.days;
        h.textContent = String(res.hours).padStart(2, "0");
        m.textContent = String(res.minutes).padStart(2, "0");
        s.textContent = String(res.seconds).padStart(2, "0");
      }
    }, 1000);
  },

  toggleTaskQuick(taskId) {
    window.store.toggleTask(taskId);
    WedPlanUtils.showToast("Task completed!", "success");
    if (window.app) window.app.renderActiveView();
  }
};

if (typeof window !== "undefined") {
  window.DashboardView = DashboardView;
}
