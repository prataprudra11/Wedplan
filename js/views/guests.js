/**
 * WedPlan - Guest List & RSVP Management View
 */

const GuestsView = {
  activeRsvpFilter: "All",
  activePartyFilter: "All",
  searchQuery: "",

  render() {
    const summary = window.store.getGuestSummary();
    const tables = window.store.getTables();
    let guests = window.store.getGuests();

    // Filtering
    if (this.activeRsvpFilter !== "All") {
      guests = guests.filter(g => g.rsvpStatus.toLowerCase() === this.activeRsvpFilter.toLowerCase());
    }
    if (this.activePartyFilter !== "All") {
      guests = guests.filter(g => g.side.toLowerCase() === this.activePartyFilter.toLowerCase());
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      guests = guests.filter(g =>
        g.name.toLowerCase().includes(q) ||
        (g.email && g.email.toLowerCase().includes(q)) ||
        (g.plusOneName && g.plusOneName.toLowerCase().includes(q)) ||
        (g.dietary && g.dietary.toLowerCase().includes(q))
      );
    }

    const tableMap = {};
    tables.forEach(t => { tableMap[t.id] = t.name; });

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Guest List & RSVP Tracker</h1>
            <p class="view-subtitle">Organize invitations, monitor attendance, dietary requirements, and table assignments.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-outline" onclick="GuestsView.exportCSV()">
              <i class="fa-solid fa-file-csv"></i> Export to CSV
            </button>
            <button class="btn btn-primary" onclick="WedPlanModals.openAddGuestModal()">
              <i class="fa-solid fa-user-plus"></i> Add New Guest
            </button>
          </div>
        </div>

        <!-- 4 Summary Stat Cards -->
        <div class="dash-stats-grid">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Total Invited</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-users"></i></div>
            </div>
            <div class="stat-value">${summary.totalInvited}</div>
            <div class="stat-subtext">${summary.totalPotentialAttendees} potential attendees (with +1s)</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Attending (Confirmed)</span>
              <div class="stat-icon icon-rose"><i class="fa-solid fa-circle-check"></i></div>
            </div>
            <div class="stat-value text-success">${summary.attending} Confirmed</div>
            <div class="stat-subtext">${summary.plusOnes} confirmed plus-ones included</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Awaiting Response</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-hourglass-half"></i></div>
            </div>
            <div class="stat-value text-gold">${summary.pending} Pending</div>
            <div class="stat-subtext">Follow-up reminder suggested</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Declined Invitations</span>
              <div class="stat-icon icon-rose"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
            <div class="stat-value text-danger">${summary.declined} Declined</div>
            <div class="stat-subtext">Seats liberated for B-list</div>
          </div>
        </div>

        <!-- Dietary Restrictions Alert Strip -->
        <div class="dietary-alert-box">
          <i class="fa-solid fa-utensils text-gold"></i>
          <div class="dietary-info">
            <strong>Dietary Summary for Catering:</strong>
            ${Object.entries(summary.dietaryBreakdown).map(([diet, count]) => `
              <span class="badge badge-sm badge-outline-gold">${diet}: ${count}</span>
            `).join(" ") || '<span class="text-muted">No special dietary restrictions recorded yet.</span>'}
          </div>
        </div>

        <!-- Table Controls: Search & Filters -->
        <div class="table-controls-bar">
          <div class="filter-chips-scroll">
            <span class="filter-group-lbl">RSVP:</span>
            ${["All", "Attending", "Pending", "Declined"].map(r => `
              <button class="filter-chip ${this.activeRsvpFilter === r ? 'active' : ''}" onclick="GuestsView.setRsvpFilter('${r}')">
                ${r}
              </button>
            `).join("")}

            <span class="filter-group-lbl ml-3">Side:</span>
            ${["All", "Bride", "Groom", "Mutual"].map(p => `
              <button class="filter-chip ${this.activePartyFilter === p ? 'active' : ''}" onclick="GuestsView.setPartyFilter('${p}')">
                ${p}
              </button>
            `).join("")}
          </div>

          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search by name, email, dietary..." 
              value="${WedPlanUtils.escapeHtml(this.searchQuery)}" 
              oninput="GuestsView.handleSearch(this.value)" 
            />
          </div>
        </div>

        <!-- Guests Table -->
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Side</th>
                <th>RSVP Status</th>
                <th>Plus One (+1)</th>
                <th>Dietary Preference</th>
                <th>Table</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${guests.length === 0 ? `
                <tr>
                  <td colspan="7" class="text-center py-5">
                    <div class="empty-state">
                      <i class="fa-solid fa-user-group text-muted fa-2x"></i>
                      <p>No guests match your active filters.</p>
                      <button class="btn btn-sm btn-primary" onclick="WedPlanModals.openAddGuestModal()">Add a Guest</button>
                    </div>
                  </td>
                </tr>
              ` : guests.map(g => `
                <tr>
                  <td>
                    <div class="guest-name-cell">
                      <strong>${WedPlanUtils.escapeHtml(g.name)}</strong>
                      <span class="guest-contact-small">${WedPlanUtils.escapeHtml(g.email || g.phone || 'No contact')}</span>
                    </div>
                  </td>
                  <td>
                    <span class="badge badge-party badge-${g.side.toLowerCase()}">${g.side}'s Side</span>
                  </td>
                  <td>
                    <button class="badge-status-btn badge-status-${g.rsvpStatus.toLowerCase()}" 
                            title="Click to cycle status" 
                            onclick="GuestsView.cycleRsvpStatus('${g.id}', '${g.rsvpStatus}')">
                      ${g.rsvpStatus}
                    </button>
                  </td>
                  <td>
                    ${g.plusOne ? `
                      <span class="badge badge-plus-one"><i class="fa-solid fa-user-check"></i> ${WedPlanUtils.escapeHtml(g.plusOneName || 'Guest')}</span>
                    ` : '<span class="text-muted">None</span>'}
                  </td>
                  <td>
                    ${g.dietary && g.dietary !== "None" ? `
                      <span class="badge badge-dietary"><i class="fa-solid fa-wheat-awn-circle-exclamation"></i> ${WedPlanUtils.escapeHtml(g.dietary)}</span>
                    ` : '<span class="text-muted">Standard</span>'}
                  </td>
                  <td>
                    ${g.tableId && tableMap[g.tableId] ? `
                      <span class="badge badge-table"><i class="fa-solid fa-chair"></i> ${WedPlanUtils.escapeHtml(tableMap[g.tableId])}</span>
                    ` : '<span class="text-muted small">Unassigned</span>'}
                  </td>
                  <td class="text-right">
                    <button class="btn-icon" title="Edit Guest" onclick="WedPlanModals.openEditGuestModal('${g.id}')">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon text-danger" title="Delete Guest" onclick="GuestsView.deleteGuest('${g.id}')">
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  setRsvpFilter(filter) {
    this.activeRsvpFilter = filter;
    window.app.renderActiveView();
  },

  setPartyFilter(party) {
    this.activePartyFilter = party;
    window.app.renderActiveView();
  },

  handleSearch(val) {
    this.searchQuery = val;
    window.app.renderActiveView();
  },

  cycleRsvpStatus(guestId, current) {
    const list = ["Attending", "Pending", "Declined"];
    const nextIdx = (list.indexOf(current) + 1) % list.length;
    const nextStatus = list[nextIdx];

    window.store.updateGuest(guestId, { rsvpStatus: nextStatus });
    WedPlanUtils.showToast(`RSVP status changed to "${nextStatus}"`, "info");
    window.app.renderActiveView();
  },

  deleteGuest(guestId) {
    if (confirm("Are you sure you want to remove this guest from your list?")) {
      window.store.deleteGuest(guestId);
      WedPlanUtils.showToast("Guest removed.", "success");
      window.app.renderActiveView();
    }
  },

  exportCSV() {
    const guests = window.store.getGuests();
    WedPlanUtils.exportGuestsToCSV(guests);
  }
};

if (typeof window !== "undefined") {
  window.GuestsView = GuestsView;
}
