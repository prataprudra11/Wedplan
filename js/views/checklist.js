/**
 * WedPlan - Wedding Checklist & Task Management View
 */

const ChecklistView = {
  activeTimeframe: "All",
  activePriority: "All",
  searchTerm: "",

  render() {
    const summary = window.store.getTaskSummary();
    let tasks = window.store.getTasks();

    // Filters
    if (this.activeTimeframe !== "All") {
      tasks = tasks.filter(t => t.timeframe === this.activeTimeframe);
    }
    if (this.activePriority !== "All") {
      tasks = tasks.filter(t => t.priority.toLowerCase() === this.activePriority.toLowerCase());
    }
    if (this.searchTerm) {
      const q = this.searchTerm.toLowerCase();
      tasks = tasks.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        (t.notes && t.notes.toLowerCase().includes(q))
      );
    }

    const timeframes = ["All", "12+ Months", "9-11 Months", "6-8 Months", "3-5 Months", "1-2 Months", "Week Of", "Day Of"];

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Wedding Checklist & Milestones</h1>
            <p class="view-subtitle">Stay on track with time-tested wedding milestones from engagement to the grand exit.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-primary" onclick="WedPlanModals.openAddTaskModal()">
              <i class="fa-solid fa-plus"></i> Add New Task
            </button>
          </div>
        </div>

        <!-- Master Progress Card -->
        <div class="checklist-progress-card">
          <div class="progress-info-row">
            <div>
              <span class="progress-big-pct text-gold">${summary.percent}%</span>
              <span class="progress-big-lbl">Completed (${summary.completed} of ${summary.total} tasks)</span>
            </div>
            <div class="progress-meta-counts">
              <span class="badge badge-success"><i class="fa-solid fa-check"></i> ${summary.completed} Done</span>
              <span class="badge badge-gold"><i class="fa-solid fa-hourglass-half"></i> ${summary.pending} To Do</span>
            </div>
          </div>
          <div class="progress-bar-wrap progress-bar-lg">
            <div class="progress-bar-fill bg-gold" style="width: ${summary.percent}%"></div>
          </div>
        </div>

        <!-- Filter Controls -->
        <div class="table-controls-bar">
          <div class="filter-chips-scroll">
            ${timeframes.map(tf => `
              <button 
                class="filter-chip ${this.activeTimeframe === tf ? 'active' : ''}" 
                onclick="ChecklistView.setTimeframe('${tf}')">
                ${tf}
              </button>
            `).join("")}
          </div>

          <div class="search-input-wrap">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search checklist tasks..." 
              value="${WedPlanUtils.escapeHtml(this.searchTerm)}" 
              oninput="ChecklistView.handleSearch(this.value)" 
            />
          </div>
        </div>

        <!-- Task List by Timeline Stage -->
        <div class="checklist-items-container">
          ${tasks.length === 0 ? `
            <div class="empty-state-full">
              <i class="fa-solid fa-clipboard-check text-muted fa-3x"></i>
              <h3>No tasks found</h3>
              <p>Try switching timeline filters or add a new custom planning task.</p>
              <button class="btn btn-primary" onclick="WedPlanModals.openAddTaskModal()">Add Task</button>
            </div>
          ` : tasks.map(t => `
            <div class="task-card-item ${t.completed ? 'task-completed' : ''}">
              <div class="task-checkbox-col">
                <label class="custom-checkbox">
                  <input type="checkbox" ${t.completed ? 'checked' : ''} onchange="ChecklistView.toggleTask('${t.id}')" />
                  <span class="checkmark"></span>
                </label>
              </div>

              <div class="task-content-col">
                <div class="task-title-row">
                  <h4 class="task-title">${WedPlanUtils.escapeHtml(t.title)}</h4>
                  <div class="task-badges">
                    <span class="badge badge-timeframe">${WedPlanUtils.escapeHtml(t.timeframe)}</span>
                    <span class="badge badge-category">${WedPlanUtils.escapeHtml(t.category)}</span>
                    <span class="badge badge-${t.priority.toLowerCase()}">${t.priority}</span>
                  </div>
                </div>
                ${t.notes ? `<p class="task-notes text-muted small">${WedPlanUtils.escapeHtml(t.notes)}</p>` : ''}
                <div class="task-meta-footer">
                  <span><i class="fa-regular fa-calendar"></i> Target: ${WedPlanUtils.formatDate(t.dueDate)}</span>
                </div>
              </div>

              <div class="task-actions-col">
                <button class="btn-icon" title="Edit Task" onclick="WedPlanModals.openEditTaskModal('${t.id}')">
                  <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon text-danger" title="Delete Task" onclick="ChecklistView.deleteTask('${t.id}')">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  setTimeframe(tf) {
    this.activeTimeframe = tf;
    window.app.renderActiveView();
  },

  handleSearch(val) {
    this.searchTerm = val;
    window.app.renderActiveView();
  },

  toggleTask(taskId) {
    const task = window.store.toggleTask(taskId);
    if (task) {
      WedPlanUtils.showToast(task.completed ? "Task marked completed!" : "Task marked active", "success");
      window.app.renderActiveView();
    }
  },

  deleteTask(taskId) {
    if (confirm("Are you sure you want to delete this task?")) {
      window.store.deleteTask(taskId);
      WedPlanUtils.showToast("Task deleted.", "success");
      window.app.renderActiveView();
    }
  }
};

if (typeof window !== "undefined") {
  window.ChecklistView = ChecklistView;
}
