/**
 * WedPlan - Budget Planner View
 */

const BudgetView = {
  activeCategoryFilter: "All",
  searchTerm: "",

  render() {
    const summary = window.store.getBudgetSummary();
    let items = window.store.getBudgetItems();

    // Filtering
    if (this.activeCategoryFilter !== "All") {
      items = items.filter(i => i.category.toLowerCase() === this.activeCategoryFilter.toLowerCase());
    }
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      items = items.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q) ||
        (i.notes && i.notes.toLowerCase().includes(q))
      );
    }

    // Categories list for pills
    const allCategories = ["All", "Venue", "Catering", "Photography", "Floral & Decor", "Music & DJ", "Attire & Beauty", "Cake & Sweets", "Stationery", "Favors & Gifts", "Wedding Rings"];

    // Category colors for chart
    const catColors = {
      "Venue": "#D4A574",
      "Catering": "#E85D7A",
      "Photography": "#B8860B",
      "Floral & Decor": "#7EA172",
      "Music & DJ": "#5E81AC",
      "Attire & Beauty": "#D08770",
      "Cake & Sweets": "#B48EAD",
      "Stationery": "#EBCB8B",
      "Favors & Gifts": "#A3BE8C",
      "Wedding Rings": "#88C0D0",
      "Other": "#8FBCBB"
    };

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Budget Planner</h1>
            <p class="view-subtitle">Track your wedding expenditures, analyze category allocations, and stay on target.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-outline" onclick="WedPlanModals.openAdjustBudgetModal()">
              <i class="fa-solid fa-sliders"></i> Edit Total Budget Limit
            </button>
            <button class="btn btn-primary" onclick="WedPlanModals.openAddExpenseModal()">
              <i class="fa-solid fa-plus"></i> Add New Expense
            </button>
          </div>
        </div>

        <!-- 4 Metric Cards -->
        <div class="dash-stats-grid budget-summary-cards">
          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Total Budget Cap</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-sack-dollar"></i></div>
            </div>
            <div class="stat-value text-gold">${WedPlanUtils.formatCurrency(summary.totalBudget)}</div>
            <div class="stat-subtext">Overall target wedding limit</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Total Actual Spent</span>
              <div class="stat-icon icon-rose"><i class="fa-solid fa-receipt"></i></div>
            </div>
            <div class="stat-value text-rose">${WedPlanUtils.formatCurrency(summary.totalActual)}</div>
            <div class="stat-subtext">${summary.percentSpent}% of total budget used</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Estimated Allocation</span>
              <div class="stat-icon icon-gold"><i class="fa-solid fa-calculator"></i></div>
            </div>
            <div class="stat-value">${WedPlanUtils.formatCurrency(summary.totalEstimated)}</div>
            <div class="stat-subtext">Difference: ${WedPlanUtils.formatCurrency(summary.totalEstimated - summary.totalActual)}</div>
          </div>

          <div class="stat-card">
            <div class="stat-header">
              <span class="stat-title">Remaining Budget</span>
              <div class="stat-icon ${summary.remainingBudget >= 0 ? 'icon-gold' : 'icon-rose'}">
                <i class="fa-solid ${summary.remainingBudget >= 0 ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
              </div>
            </div>
            <div class="stat-value ${summary.remainingBudget >= 0 ? 'text-success' : 'text-danger'}">
              ${WedPlanUtils.formatCurrency(summary.remainingBudget)}
            </div>
            <div class="stat-subtext">${summary.remainingBudget >= 0 ? 'Comfortably within limit' : 'Over budget threshold!'}</div>
          </div>
        </div>

        <!-- Breakdown Section: Chart + Category Progress Bars -->
        <div class="budget-analytics-grid">
          <div class="budget-chart-panel">
            <h3><i class="fa-solid fa-chart-pie text-gold"></i> Spending by Category</h3>
            <div class="category-bars-list">
              ${summary.categories.map(cat => {
                const color = catColors[cat.category] || "#D4A574";
                const pct = summary.totalActual > 0 ? Math.round((cat.actual / summary.totalActual) * 100) : 0;
                return `
                  <div class="cat-bar-item">
                    <div class="cat-bar-meta">
                      <span class="cat-bar-name">
                        <span class="color-dot" style="background-color: ${color}"></span>
                        ${WedPlanUtils.escapeHtml(cat.category)}
                      </span>
                      <span class="cat-bar-amounts">
                        <strong>${WedPlanUtils.formatCurrency(cat.actual)}</strong> 
                        <span class="text-muted">(${pct}%)</span>
                      </span>
                    </div>
                    <div class="progress-bar-wrap">
                      <div class="progress-bar-fill" style="width: ${pct}%; background-color: ${color}"></div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>

          <div class="budget-tips-panel">
            <h3><i class="fa-solid fa-lightbulb text-gold"></i> Wedding Budget Tips</h3>
            <ul class="budget-tips-list">
              <li>
                <i class="fa-solid fa-check-circle text-rose"></i>
                <div>
                  <strong>Catering & Venue Rule:</strong> Usually accounts for 40-50% of the entire budget. Yours currently sits at <strong>${Math.round(((items.filter(i => i.category === 'Venue' || i.category === 'Catering').reduce((acc, i) => acc + (i.actual || 0), 0)) / (summary.totalActual || 1)) * 100)}%</strong>.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-check-circle text-rose"></i>
                <div>
                  <strong>5-10% Buffer Fund:</strong> Keep \$1,500-\$2,500 unallocated for last-minute tips, rush delivery, or unexpected rain tents.
                </div>
              </li>
              <li>
                <i class="fa-solid fa-check-circle text-rose"></i>
                <div>
                  <strong>Status Tracking:</strong> Click any 'Status' badge in the table below to quickly cycle from <em>Pending</em> to <em>Deposit Paid</em> or <em>Paid</em>.
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="table-controls-bar">
          <div class="filter-chips-scroll">
            ${allCategories.map(cat => `
              <button 
                class="filter-chip ${this.activeCategoryFilter === cat ? 'active' : ''}" 
                onclick="BudgetView.setCategoryFilter('${cat}')">
                ${cat}
              </button>
            `).join("")}
          </div>

          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search expenses..." 
              value="${WedPlanUtils.escapeHtml(this.searchTerm)}" 
              oninput="BudgetView.handleSearch(this.value)" 
            />
          </div>
        </div>

        <!-- Expense Table -->
        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Expense Item</th>
                <th>Estimated</th>
                <th>Actual</th>
                <th>Paid Status</th>
                <th>Due Date</th>
                <th>Notes</th>
                <th class="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${items.length === 0 ? `
                <tr>
                  <td colspan="8" class="text-center py-5">
                    <div class="empty-state">
                      <i class="fa-solid fa-receipt text-muted fa-2x"></i>
                      <p>No expense items match your criteria.</p>
                      <button class="btn btn-sm btn-primary" onclick="WedPlanModals.openAddExpenseModal()">Add Expense</button>
                    </div>
                  </td>
                </tr>
              ` : items.map(item => `
                <tr>
                  <td><span class="badge badge-category">${WedPlanUtils.escapeHtml(item.category)}</span></td>
                  <td><strong>${WedPlanUtils.escapeHtml(item.name)}</strong></td>
                  <td>${WedPlanUtils.formatCurrency(item.estimated)}</td>
                  <td><strong class="text-gold">${WedPlanUtils.formatCurrency(item.actual)}</strong></td>
                  <td>
                    <button class="badge-status-btn badge-status-${(item.paidStatus || 'pending').toLowerCase().replace(' ', '-')}" 
                            title="Click to toggle status" 
                            onclick="BudgetView.cyclePaidStatus('${item.id}', '${item.paidStatus}')">
                      ${item.paidStatus || 'Pending'}
                    </button>
                  </td>
                  <td>${WedPlanUtils.formatDate(item.dueDate)}</td>
                  <td class="text-muted small">${WedPlanUtils.escapeHtml(item.notes || '-')}</td>
                  <td class="text-right">
                    <button class="btn-icon" title="Edit Expense" onclick="WedPlanModals.openEditExpenseModal('${item.id}')">
                      <i class="fa-solid fa-pen"></i>
                    </button>
                    <button class="btn-icon text-danger" title="Delete Expense" onclick="BudgetView.deleteItem('${item.id}')">
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

  setCategoryFilter(cat) {
    this.activeCategoryFilter = cat;
    window.app.renderActiveView();
  },

  handleSearch(val) {
    this.searchTerm = val;
    window.app.renderActiveView();
  },

  cyclePaidStatus(id, currentStatus) {
    const statuses = ["Pending", "Deposit Paid", "Paid"];
    const nextIdx = (statuses.indexOf(currentStatus) + 1) % statuses.length;
    const nextStatus = statuses[nextIdx];
    window.store.updateBudgetItem(id, { paidStatus: nextStatus });
    WedPlanUtils.showToast(`Status updated to "${nextStatus}"`, "info");
    window.app.renderActiveView();
  },

  deleteItem(id) {
    if (confirm("Are you sure you want to remove this expense item?")) {
      window.store.deleteBudgetItem(id);
      WedPlanUtils.showToast("Expense item removed.", "success");
      window.app.renderActiveView();
    }
  }
};

if (typeof window !== "undefined") {
  window.BudgetView = BudgetView;
}
