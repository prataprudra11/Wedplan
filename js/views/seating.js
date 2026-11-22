/**
 * WedPlan - Seating Arrangement Planner (Bonus Feature)
 */

const SeatingView = {
  render() {
    const tables = window.store.getTables();
    const guests = window.store.getGuests().filter(g => g.rsvpStatus === "Attending");
    const unassignedGuests = guests.filter(g => !g.tableId);

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Seating Arrangement Planner</h1>
            <p class="view-subtitle">Organize reception tables, track guest counts, and seat your loved ones harmoniously.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-primary" onclick="WedPlanModals.openAddTableModal()">
              <i class="fa-solid fa-plus"></i> Add New Table
            </button>
          </div>
        </div>

        <!-- Seating Layout Grid: Tables + Unassigned Sidebar -->
        <div class="seating-layout-grid">
          <!-- Tables Grid -->
          <div class="seating-tables-area">
            <div class="tables-grid">
              ${tables.map(table => {
                const seatedGuests = guests.filter(g => g.tableId === table.id);
                const isFull = seatedGuests.length >= table.capacity;
                const fillPercent = Math.min(100, Math.round((seatedGuests.length / table.capacity) * 100));

                return `
                  <div class="table-card ${table.shape === 'rectangular' ? 'table-rect' : 'table-round'} ${isFull ? 'table-full' : ''}">
                    <div class="table-card-header">
                      <div>
                        <h4>${WedPlanUtils.escapeHtml(table.name)}</h4>
                        <span class="text-muted small">${table.shape === 'rectangular' ? 'Long Banquet' : 'Round Table'}</span>
                      </div>
                      <span class="table-capacity-badge ${isFull ? 'badge-danger' : 'badge-gold'}">
                        ${seatedGuests.length} / ${table.capacity} Seats
                      </span>
                    </div>

                    <!-- Visual Table Diagram -->
                    <div class="table-visual-wrap">
                      <div class="table-visual-shape ${table.shape === 'rectangular' ? 'shape-rect' : 'shape-round'}">
                        <i class="fa-solid fa-champagne-glasses text-gold"></i>
                      </div>
                    </div>

                    <div class="progress-bar-wrap mb-3">
                      <div class="progress-bar-fill ${isFull ? 'bg-rose' : 'bg-gold'}" style="width: ${fillPercent}%"></div>
                    </div>

                    <!-- Seated Guests List -->
                    <div class="seated-guests-list">
                      ${seatedGuests.length === 0 ? `
                        <div class="text-muted small text-center py-2">No guests assigned yet.</div>
                      ` : seatedGuests.map(sg => `
                        <div class="seated-guest-tag">
                          <span><i class="fa-solid fa-user-tag text-rose"></i> ${WedPlanUtils.escapeHtml(sg.name)}</span>
                          <button class="btn-remove-seat" title="Remove from table" onclick="SeatingView.unassignGuest('${sg.id}')">&times;</button>
                        </div>
                      `).join("")}
                    </div>

                    <!-- Quick Seat Dropdown -->
                    ${!isFull && unassignedGuests.length > 0 ? `
                      <div class="quick-seat-row mt-3">
                        <select id="quick-seat-select-${table.id}" class="form-control-sm">
                          <option value="">+ Assign Guest...</option>
                          ${unassignedGuests.map(ug => `
                            <option value="${ug.id}">${WedPlanUtils.escapeHtml(ug.name)} (${ug.side})</option>
                          `).join("")}
                        </select>
                        <button class="btn btn-sm btn-outline" onclick="SeatingView.seatSelectedGuest('${table.id}')">Seat</button>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <!-- Unassigned Guests Sidebar -->
          <div class="seating-sidebar">
            <div class="unassigned-panel">
              <div class="unassigned-header">
                <h3><i class="fa-solid fa-user-clock text-gold"></i> Unseated Guests</h3>
                <span class="badge badge-gold">${unassignedGuests.length}</span>
              </div>
              <p class="small text-muted mb-3">Confirmed guests awaiting a table assignment.</p>

              <div class="unassigned-list">
                ${unassignedGuests.length === 0 ? `
                  <div class="all-seated-celebration">
                    <i class="fa-solid fa-circle-check text-success fa-2x mb-2"></i>
                    <p>Hooray! All confirmed guests have been assigned to tables.</p>
                  </div>
                ` : unassignedGuests.map(ug => `
                  <div class="unassigned-item">
                    <div>
                      <strong>${WedPlanUtils.escapeHtml(ug.name)}</strong>
                      <div class="text-muted small">${ug.side}'s Side · ${ug.dietary !== 'None' ? ug.dietary : 'Standard'}</div>
                    </div>
                    <div class="assign-action">
                      <select onchange="SeatingView.assignGuestDirect('${ug.id}', this.value)" class="form-control-xs">
                        <option value="">Assign to...</option>
                        ${tables.map(t => `<option value="${t.id}">${WedPlanUtils.escapeHtml(t.name)}</option>`).join("")}
                      </select>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  seatSelectedGuest(tableId) {
    const select = document.getElementById(`quick-seat-select-${tableId}`);
    if (!select || !select.value) {
      WedPlanUtils.showToast("Please choose a guest to assign.", "info");
      return;
    }
    window.store.assignGuestToTable(select.value, tableId);
    WedPlanUtils.showToast("Guest seated successfully!", "success");
    window.app.renderActiveView();
  },

  assignGuestDirect(guestId, tableId) {
    if (!tableId) return;
    window.store.assignGuestToTable(guestId, tableId);
    WedPlanUtils.showToast("Guest assigned to table.", "success");
    window.app.renderActiveView();
  },

  unassignGuest(guestId) {
    window.store.assignGuestToTable(guestId, null);
    WedPlanUtils.showToast("Guest removed from table.", "info");
    window.app.renderActiveView();
  }
};

if (typeof window !== "undefined") {
  window.SeatingView = SeatingView;
}
