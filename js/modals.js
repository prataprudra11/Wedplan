/**
 * WedPlan - Global Modal Controllers
 * Handles Add/Edit modals for Budget, Guests, Tasks, Timeline, Profile, and Auth
 */

const WedPlanModals = {
  activeEditId: null,

  /* =========================================================================
     BUDGET EXPENSE MODALS
     ========================================================================= */

  openAddExpenseModal() {
    this.activeEditId = null;
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-receipt text-gold"></i> Add Wedding Expense</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Category *</label>
          <select id="modal-exp-category">
            <option value="Venue">Venue</option>
            <option value="Catering">Catering</option>
            <option value="Photography">Photography</option>
            <option value="Floral & Decor">Floral & Decor</option>
            <option value="Music & DJ">Music & DJ</option>
            <option value="Attire & Beauty">Attire & Beauty</option>
            <option value="Cake & Sweets">Cake & Sweets</option>
            <option value="Stationery">Stationery</option>
            <option value="Favors & Gifts">Favors & Gifts</option>
            <option value="Wedding Rings">Wedding Rings</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label>Item Description / Vendor *</label>
          <input type="text" id="modal-exp-name" placeholder="e.g. Wedding Cake Tasting & Design" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Estimated Amount ($)</label>
            <input type="number" id="modal-exp-estimated" placeholder="0" min="0" />
          </div>
          <div class="form-group col-6">
            <label>Actual Amount ($)</label>
            <input type="number" id="modal-exp-actual" placeholder="0" min="0" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Payment Status</label>
            <select id="modal-exp-status">
              <option value="Pending">Pending</option>
              <option value="Deposit Paid">Deposit Paid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Due Date</label>
            <input type="date" id="modal-exp-duedate" />
          </div>
        </div>
        <div class="form-group">
          <label>Notes / Contract Details</label>
          <textarea id="modal-exp-notes" rows="2" placeholder="Deposit amount, invoice link or vendor terms..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveExpense()">Save Expense</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  openEditExpenseModal(id) {
    this.activeEditId = id;
    const item = window.store.getBudgetItems().find(b => b.id === id);
    if (!item) return;

    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-pen text-gold"></i> Edit Expense Item</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Category *</label>
          <select id="modal-exp-category">
            ${["Venue", "Catering", "Photography", "Floral & Decor", "Music & DJ", "Attire & Beauty", "Cake & Sweets", "Stationery", "Favors & Gifts", "Wedding Rings", "Other"].map(c => `
              <option value="${c}" ${item.category === c ? 'selected' : ''}>${c}</option>
            `).join("")}
          </select>
        </div>
        <div class="form-group">
          <label>Item Description / Vendor *</label>
          <input type="text" id="modal-exp-name" value="${WedPlanUtils.escapeHtml(item.name)}" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Estimated Amount ($)</label>
            <input type="number" id="modal-exp-estimated" value="${item.estimated}" />
          </div>
          <div class="form-group col-6">
            <label>Actual Amount ($)</label>
            <input type="number" id="modal-exp-actual" value="${item.actual}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Payment Status</label>
            <select id="modal-exp-status">
              <option value="Pending" ${item.paidStatus === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Deposit Paid" ${item.paidStatus === "Deposit Paid" ? "selected" : ""}>Deposit Paid</option>
              <option value="Paid" ${item.paidStatus === "Paid" ? "selected" : ""}>Paid</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Due Date</label>
            <input type="date" id="modal-exp-duedate" value="${item.dueDate || ''}" />
          </div>
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea id="modal-exp-notes" rows="2">${WedPlanUtils.escapeHtml(item.notes || '')}</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveExpense()">Update Expense</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveExpense() {
    const category = document.getElementById("modal-exp-category").value;
    const name = document.getElementById("modal-exp-name").value.trim();
    const estimated = Number(document.getElementById("modal-exp-estimated").value) || 0;
    const actual = Number(document.getElementById("modal-exp-actual").value) || 0;
    const paidStatus = document.getElementById("modal-exp-status").value;
    const dueDate = document.getElementById("modal-exp-duedate").value;
    const notes = document.getElementById("modal-exp-notes").value;

    if (!name) {
      WedPlanUtils.showToast("Please provide an expense description.", "error");
      return;
    }

    if (this.activeEditId) {
      window.store.updateBudgetItem(this.activeEditId, {
        category, name, estimated, actual, paidStatus, dueDate, notes
      });
      WedPlanUtils.showToast("Expense updated successfully!", "success");
    } else {
      window.store.addBudgetItem({
        category, name, estimated, actual, paidStatus, dueDate, notes
      });
      WedPlanUtils.showToast("New expense logged!", "success");
    }

    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  openAdjustBudgetModal() {
    const user = window.store.getUser();
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-sliders text-gold"></i> Adjust Total Wedding Budget Limit</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <p class="small text-muted mb-3">Set your total target budget cap. All analytics and alerts update accordingly.</p>
        <div class="form-group">
          <label>Target Budget ($ USD)</label>
          <input type="number" id="modal-budget-target" value="${user.totalBudget || 35000}" step="500" min="1000" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveAdjustBudget()">Update Budget Cap</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveAdjustBudget() {
    const target = Number(document.getElementById("modal-budget-target").value);
    if (!target || target <= 0) {
      WedPlanUtils.showToast("Please enter a valid budget amount.", "error");
      return;
    }
    window.store.updateUser({ totalBudget: target });
    WedPlanUtils.showToast(`Budget cap updated to ${WedPlanUtils.formatCurrency(target)}`, "success");
    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     GUEST MODALS
     ========================================================================= */

  openAddGuestModal() {
    this.activeEditId = null;
    const tables = window.store.getTables();
    const container = document.getElementById("global-modal-content");

    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-user-plus text-rose"></i> Add Guest to Roster</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Guest Full Name *</label>
          <input type="text" id="modal-guest-name" placeholder="e.g. Julian Thorne" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Email Address</label>
            <input type="email" id="modal-guest-email" placeholder="julian@example.com" />
          </div>
          <div class="form-group col-6">
            <label>Phone Number</label>
            <input type="tel" id="modal-guest-phone" placeholder="+1 (555) 000-0000" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Party / Side</label>
            <select id="modal-guest-side">
              <option value="Bride">Bride's Side</option>
              <option value="Groom">Groom's Side</option>
              <option value="Mutual" selected>Mutual Friends</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>RSVP Status</label>
            <select id="modal-guest-rsvp">
              <option value="Pending" selected>Pending</option>
              <option value="Attending">Attending</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Plus-One Allowed?</label>
            <select id="modal-guest-plusone" onchange="document.getElementById('plusone-name-group').classList.toggle('hidden', this.value !== 'true')">
              <option value="false">No Plus-One</option>
              <option value="true">Yes (+1 Included)</option>
            </select>
          </div>
          <div class="form-group col-6 hidden" id="plusone-name-group">
            <label>Plus-One Name</label>
            <input type="text" id="modal-guest-plusone-name" placeholder="Guest Name" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Dietary Restrictions</label>
            <select id="modal-guest-dietary">
              <option value="None">Standard / No Restrictions</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Gluten-Free">Gluten-Free</option>
              <option value="Halal">Halal</option>
              <option value="Kosher">Kosher</option>
              <option value="Nut Allergy">Nut Allergy</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Assign Table</label>
            <select id="modal-guest-table">
              <option value="">Unassigned</option>
              ${tables.map(t => `<option value="${t.id}">${WedPlanUtils.escapeHtml(t.name)}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveGuest()">Add Guest</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  openEditGuestModal(id) {
    this.activeEditId = id;
    const guest = window.store.getGuests().find(g => g.id === id);
    if (!guest) return;
    const tables = window.store.getTables();
    const container = document.getElementById("global-modal-content");

    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-pen text-rose"></i> Edit Guest Details</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Guest Full Name *</label>
          <input type="text" id="modal-guest-name" value="${WedPlanUtils.escapeHtml(guest.name)}" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Email Address</label>
            <input type="email" id="modal-guest-email" value="${WedPlanUtils.escapeHtml(guest.email || '')}" />
          </div>
          <div class="form-group col-6">
            <label>Phone Number</label>
            <input type="tel" id="modal-guest-phone" value="${WedPlanUtils.escapeHtml(guest.phone || '')}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Party / Side</label>
            <select id="modal-guest-side">
              <option value="Bride" ${guest.side === "Bride" ? "selected" : ""}>Bride's Side</option>
              <option value="Groom" ${guest.side === "Groom" ? "selected" : ""}>Groom's Side</option>
              <option value="Mutual" ${guest.side === "Mutual" ? "selected" : ""}>Mutual Friends</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>RSVP Status</label>
            <select id="modal-guest-rsvp">
              <option value="Attending" ${guest.rsvpStatus === "Attending" ? "selected" : ""}>Attending</option>
              <option value="Pending" ${guest.rsvpStatus === "Pending" ? "selected" : ""}>Pending</option>
              <option value="Declined" ${guest.rsvpStatus === "Declined" ? "selected" : ""}>Declined</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Plus-One Allowed?</label>
            <select id="modal-guest-plusone" onchange="document.getElementById('plusone-name-group').classList.toggle('hidden', this.value !== 'true')">
              <option value="false" ${!guest.plusOne ? "selected" : ""}>No Plus-One</option>
              <option value="true" ${guest.plusOne ? "selected" : ""}>Yes (+1 Included)</option>
            </select>
          </div>
          <div class="form-group col-6 ${!guest.plusOne ? 'hidden' : ''}" id="plusone-name-group">
            <label>Plus-One Name</label>
            <input type="text" id="modal-guest-plusone-name" value="${WedPlanUtils.escapeHtml(guest.plusOneName || '')}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Dietary Restrictions</label>
            <select id="modal-guest-dietary">
              ${["None", "Vegetarian", "Vegan", "Gluten-Free", "Halal", "Kosher", "Nut Allergy"].map(d => `
                <option value="${d}" ${guest.dietary === d ? 'selected' : ''}>${d}</option>
              `).join("")}
            </select>
          </div>
          <div class="form-group col-6">
            <label>Assign Table</label>
            <select id="modal-guest-table">
              <option value="">Unassigned</option>
              ${tables.map(t => `<option value="${t.id}" ${guest.tableId === t.id ? 'selected' : ''}>${WedPlanUtils.escapeHtml(t.name)}</option>`).join("")}
            </select>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveGuest()">Update Guest</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveGuest() {
    const name = document.getElementById("modal-guest-name").value.trim();
    const email = document.getElementById("modal-guest-email").value.trim();
    const phone = document.getElementById("modal-guest-phone").value.trim();
    const side = document.getElementById("modal-guest-side").value;
    const rsvpStatus = document.getElementById("modal-guest-rsvp").value;
    const plusOne = document.getElementById("modal-guest-plusone").value === "true";
    const plusOneName = plusOne ? document.getElementById("modal-guest-plusone-name").value.trim() : "";
    const dietary = document.getElementById("modal-guest-dietary").value;
    const tableId = document.getElementById("modal-guest-table").value || null;

    if (!name) {
      WedPlanUtils.showToast("Please enter a guest name.", "error");
      return;
    }

    if (this.activeEditId) {
      window.store.updateGuest(this.activeEditId, {
        name, email, phone, side, rsvpStatus, plusOne, plusOneName, dietary, tableId
      });
      WedPlanUtils.showToast("Guest record updated!", "success");
    } else {
      window.store.addGuest({
        name, email, phone, side, rsvpStatus, plusOne, plusOneName, dietary, tableId
      });
      WedPlanUtils.showToast("Guest added to list!", "success");
    }

    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     TASK / CHECKLIST MODALS
     ========================================================================= */

  openAddTaskModal() {
    this.activeEditId = null;
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-list-check text-gold"></i> Add Wedding Task</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Task Title *</label>
          <input type="text" id="modal-task-title" placeholder="e.g. Schedule Cake Tasting Appointment" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Timeframe / Phase</label>
            <select id="modal-task-timeframe">
              <option value="12+ Months">12+ Months</option>
              <option value="9-11 Months">9-11 Months</option>
              <option value="6-8 Months">6-8 Months</option>
              <option value="3-5 Months" selected>3-5 Months</option>
              <option value="1-2 Months">1-2 Months</option>
              <option value="Week Of">Week Of</option>
              <option value="Day Of">Day Of</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Category</label>
            <select id="modal-task-category">
              <option value="General">General</option>
              <option value="Venue">Venue</option>
              <option value="Attire">Attire</option>
              <option value="Catering">Catering</option>
              <option value="Photography">Photography</option>
              <option value="Music">Music</option>
              <option value="Stationery">Stationery</option>
              <option value="Legal">Legal & Officiant</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Priority</label>
            <select id="modal-task-priority">
              <option value="High">High</option>
              <option value="Medium" selected>Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Target Due Date</label>
            <input type="date" id="modal-task-duedate" />
          </div>
        </div>
        <div class="form-group">
          <label>Notes / Checklist steps</label>
          <textarea id="modal-task-notes" rows="2" placeholder="Contact numbers, appointment details..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveTask()">Save Task</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  openEditTaskModal(id) {
    this.activeEditId = id;
    const task = window.store.getTasks().find(t => t.id === id);
    if (!task) return;
    const container = document.getElementById("global-modal-content");

    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-pen text-gold"></i> Edit Task</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Task Title *</label>
          <input type="text" id="modal-task-title" value="${WedPlanUtils.escapeHtml(task.title)}" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Timeframe</label>
            <select id="modal-task-timeframe">
              ${["12+ Months", "9-11 Months", "6-8 Months", "3-5 Months", "1-2 Months", "Week Of", "Day Of"].map(tf => `
                <option value="${tf}" ${task.timeframe === tf ? 'selected' : ''}>${tf}</option>
              `).join("")}
            </select>
          </div>
          <div class="form-group col-6">
            <label>Priority</label>
            <select id="modal-task-priority">
              <option value="High" ${task.priority === "High" ? "selected" : ""}>High</option>
              <option value="Medium" ${task.priority === "Medium" ? "selected" : ""}>Medium</option>
              <option value="Low" ${task.priority === "Low" ? "selected" : ""}>Low</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Category</label>
            <input type="text" id="modal-task-category" value="${WedPlanUtils.escapeHtml(task.category || 'General')}" />
          </div>
          <div class="form-group col-6">
            <label>Due Date</label>
            <input type="date" id="modal-task-duedate" value="${task.dueDate || ''}" />
          </div>
        </div>
        <div class="form-group">
          <label>Notes</label>
          <textarea id="modal-task-notes" rows="2">${WedPlanUtils.escapeHtml(task.notes || '')}</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveTask()">Update Task</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveTask() {
    const title = document.getElementById("modal-task-title").value.trim();
    const timeframe = document.getElementById("modal-task-timeframe").value;
    const category = document.getElementById("modal-task-category").value;
    const priority = document.getElementById("modal-task-priority").value;
    const dueDate = document.getElementById("modal-task-duedate").value;
    const notes = document.getElementById("modal-task-notes").value;

    if (!title) {
      WedPlanUtils.showToast("Please enter a task title.", "error");
      return;
    }

    if (this.activeEditId) {
      window.store.updateTask(this.activeEditId, { title, timeframe, category, priority, dueDate, notes });
      WedPlanUtils.showToast("Task updated!", "success");
    } else {
      window.store.addTask({ title, timeframe, category, priority, dueDate, notes });
      WedPlanUtils.showToast("Task added to checklist!", "success");
    }

    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     TIMELINE EVENT MODAL
     ========================================================================= */

  openAddTimelineModal() {
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-clock text-rose"></i> Add Day-Of Event Milestone</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group col-4">
            <label>Time *</label>
            <input type="text" id="modal-tl-time" placeholder="e.g. 02:30 PM" required />
          </div>
          <div class="form-group col-8">
            <label>Milestone Title *</label>
            <input type="text" id="modal-tl-title" placeholder="e.g. First Look & Couple Portraits" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Category</label>
            <select id="modal-tl-category">
              <option value="Preparation">Preparation</option>
              <option value="Ceremony">Ceremony</option>
              <option value="Photos">Photos</option>
              <option value="Reception">Reception</option>
              <option value="Send-Off">Send-Off</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Location</label>
            <input type="text" id="modal-tl-location" placeholder="e.g. Cypress Alley Lawn" />
          </div>
        </div>
        <div class="form-group">
          <label>Instructions / Vendor Notes</label>
          <textarea id="modal-tl-notes" rows="2" placeholder="Photographer arrival, mic checks, bouquet placement..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveTimelineEvent()">Add to Schedule</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveTimelineEvent() {
    const time = document.getElementById("modal-tl-time").value.trim();
    const title = document.getElementById("modal-tl-title").value.trim();
    const category = document.getElementById("modal-tl-category").value;
    const location = document.getElementById("modal-tl-location").value.trim();
    const notes = document.getElementById("modal-tl-notes").value.trim();

    if (!time || !title) {
      WedPlanUtils.showToast("Please provide both time and milestone title.", "error");
      return;
    }

    window.store.addTimelineEvent({ time, title, category, location, notes });
    WedPlanUtils.showToast("Timeline milestone added!", "success");
    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     TABLE & SEATING MODAL
     ========================================================================= */

  openAddTableModal() {
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-chair text-gold"></i> Add Reception Table</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Table Name or Number *</label>
          <input type="text" id="modal-table-name" placeholder="e.g. Table 6 - Lavender Terrace" required />
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Table Shape</label>
            <select id="modal-table-shape">
              <option value="round">Round Table</option>
              <option value="rectangular">Banquet / Rectangular</option>
            </select>
          </div>
          <div class="form-group col-6">
            <label>Seating Capacity</label>
            <input type="number" id="modal-table-capacity" value="8" min="2" max="24" />
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveTable()">Create Table</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveTable() {
    const name = document.getElementById("modal-table-name").value.trim();
    const shape = document.getElementById("modal-table-shape").value;
    const capacity = Number(document.getElementById("modal-table-capacity").value) || 8;

    if (!name) {
      WedPlanUtils.showToast("Please provide a name for the table.", "error");
      return;
    }

    window.store.addTable({ name, shape, capacity });
    WedPlanUtils.showToast("New table created!", "success");
    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     GALLERY PHOTO MODAL
     ========================================================================= */

  openAddPhotoModal() {
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-image text-gold"></i> Add Inspiration Photo</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label>Photo Title *</label>
          <input type="text" id="modal-photo-title" placeholder="e.g. Candlelit Table Setting" required />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select id="modal-photo-category">
            <option value="Venues">Venues</option>
            <option value="Dresses">Dresses & Attire</option>
            <option value="Decor">Decor & Styling</option>
            <option value="Florals">Florals & Bouquets</option>
            <option value="Cakes">Cakes & Sweets</option>
            <option value="Moments">Moments & Photography</option>
          </select>
        </div>
        <div class="form-group">
          <label>Image URL *</label>
          <input type="url" id="modal-photo-url" placeholder="https://images.unsplash.com/..." required />
          <span class="small text-muted">Paste any high-resolution image link or Unsplash photo link.</span>
        </div>
        <div class="form-group">
          <label>Inspiration Notes / Caption</label>
          <textarea id="modal-photo-caption" rows="2" placeholder="Colors, design ideas, or vendor notes..."></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.savePhoto()">Add to Gallery</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  savePhoto() {
    const title = document.getElementById("modal-photo-title").value.trim();
    const category = document.getElementById("modal-photo-category").value;
    const url = document.getElementById("modal-photo-url").value.trim();
    const caption = document.getElementById("modal-photo-caption").value.trim();

    if (!title || !url) {
      WedPlanUtils.showToast("Please enter photo title and a valid image URL.", "error");
      return;
    }

    window.store.addGalleryPhoto({ title, category, url, caption });
    WedPlanUtils.showToast("Inspiration photo added to moodboard!", "success");
    WedPlanUtils.closeModal("global-modal");
    window.app.renderActiveView();
  },

  /* =========================================================================
     COUPLE PROFILE & WEDDING DETAILS MODAL
     ========================================================================= */

  openEditProfileModal() {
    const user = window.store.getUser();
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-heart text-rose"></i> Edit Couple & Wedding Details</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="form-row">
          <div class="form-group col-6">
            <label>Partner 1 Name *</label>
            <input type="text" id="modal-prof-p1" value="${WedPlanUtils.escapeHtml(user.partner1 || '')}" required />
          </div>
          <div class="form-group col-6">
            <label>Partner 2 Name *</label>
            <input type="text" id="modal-prof-p2" value="${WedPlanUtils.escapeHtml(user.partner2 || '')}" required />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-6">
            <label>Wedding Date *</label>
            <input type="date" id="modal-prof-date" value="${(user.weddingDate || '').split('T')[0]}" required />
          </div>
          <div class="form-group col-6">
            <label>Total Budget Goal ($)</label>
            <input type="number" id="modal-prof-budget" value="${user.totalBudget || 35000}" />
          </div>
        </div>
        <div class="form-group">
          <label>Venue Name</label>
          <input type="text" id="modal-prof-venue" value="${WedPlanUtils.escapeHtml(user.venueName || '')}" placeholder="e.g. St. Clair Vineyards" />
        </div>
        <div class="form-group">
          <label>Location / City</label>
          <input type="text" id="modal-prof-loc" value="${WedPlanUtils.escapeHtml(user.location || '')}" placeholder="e.g. Napa Valley, California" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="WedPlanUtils.closeModal('global-modal')">Cancel</button>
        <button class="btn btn-primary" onclick="WedPlanModals.saveProfile()">Save Changes</button>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  saveProfile() {
    const p1 = document.getElementById("modal-prof-p1").value.trim();
    const p2 = document.getElementById("modal-prof-p2").value.trim();
    const date = document.getElementById("modal-prof-date").value;
    const budget = Number(document.getElementById("modal-prof-budget").value) || 35000;
    const venue = document.getElementById("modal-prof-venue").value.trim();
    const loc = document.getElementById("modal-prof-loc").value.trim();

    if (!p1 || !date) {
      WedPlanUtils.showToast("Partner name and wedding date are required.", "error");
      return;
    }

    const coupleName = p2 ? `${p1} & ${p2}` : p1;
    window.store.updateUser({
      name: coupleName,
      partner1: p1,
      partner2: p2,
      weddingDate: `${date}T16:00:00`,
      totalBudget: budget,
      venueName: venue,
      location: loc
    });

    WedPlanUtils.showToast("Couple profile & countdown updated!", "success");
    WedPlanUtils.closeModal("global-modal");
    WedPlanAuth.updateAuthUI();
    window.app.renderActiveView();
  },

  /* =========================================================================
     AUTH / LOGIN / REGISTER MODAL
     ========================================================================= */

  openAuthModal(defaultTab = "login") {
    const container = document.getElementById("global-modal-content");
    container.innerHTML = `
      <div class="modal-header">
        <h3><i class="fa-solid fa-lock text-gold"></i> Couple Account Access</h3>
        <button class="modal-close-btn" onclick="WedPlanUtils.closeModal('global-modal')">&times;</button>
      </div>
      <div class="modal-body">
        <div class="auth-tabs-row">
          <button class="auth-tab ${defaultTab === 'login' ? 'active' : ''}" onclick="WedPlanModals.switchAuthTab('login')">Log In</button>
          <button class="auth-tab ${defaultTab === 'register' ? 'active' : ''}" onclick="WedPlanModals.switchAuthTab('register')">Create Account</button>
        </div>

        <div id="auth-login-pane" class="${defaultTab === 'login' ? '' : 'hidden'}">
          <div class="demo-login-callout mb-3">
            <p><strong>Demo Mode Available!</strong> One-click sign-in to test the pre-populated couple profile with real data.</p>
            <button class="btn btn-sm btn-outline-gold btn-block mt-2" onclick="WedPlanModals.handleDemoLogin()">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Instant Demo Login (Sophia & Alexander)
            </button>
          </div>

          <div class="form-group">
            <label>Email Address</label>
            <input type="email" id="auth-login-email" value="sophia.alexander@wedplan.demo" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="auth-login-pass" value="wedplan2027" />
          </div>
          <button class="btn btn-primary btn-block" onclick="WedPlanModals.handleLogin()">Sign In to WedPlan</button>
        </div>

        <div id="auth-register-pane" class="${defaultTab === 'register' ? '' : 'hidden'}">
          <div class="form-row">
            <div class="form-group col-6">
              <label>Partner 1 Name *</label>
              <input type="text" id="auth-reg-p1" placeholder="e.g. Maya" required />
            </div>
            <div class="form-group col-6">
              <label>Partner 2 Name</label>
              <input type="text" id="auth-reg-p2" placeholder="e.g. Jordan" />
            </div>
          </div>
          <div class="form-group">
            <label>Email Address *</label>
            <input type="email" id="auth-reg-email" placeholder="couple@example.com" required />
          </div>
          <div class="form-row">
            <div class="form-group col-6">
              <label>Wedding Date</label>
              <input type="date" id="auth-reg-date" value="2027-09-25" />
            </div>
            <div class="form-group col-6">
              <label>Target Budget ($)</label>
              <input type="number" id="auth-reg-budget" value="30000" />
            </div>
          </div>
          <button class="btn btn-primary btn-block" onclick="WedPlanModals.handleRegister()">Create Wedding Portal</button>
        </div>
      </div>
    `;
    WedPlanUtils.openModal("global-modal");
  },

  switchAuthTab(tab) {
    const loginPane = document.getElementById("auth-login-pane");
    const regPane = document.getElementById("auth-register-pane");
    const tabs = document.querySelectorAll(".auth-tab");
    tabs.forEach(t => t.classList.remove("active"));

    if (tab === "login") {
      loginPane.classList.remove("hidden");
      regPane.classList.add("hidden");
      tabs[0].classList.add("active");
    } else {
      loginPane.classList.add("hidden");
      regPane.classList.remove("hidden");
      tabs[1].classList.add("active");
    }
  },

  handleDemoLogin() {
    WedPlanAuth.quickDemoLogin();
    WedPlanUtils.closeModal("global-modal");
    window.location.hash = "#dashboard";
  },

  handleLogin() {
    const email = document.getElementById("auth-login-email").value;
    const pass = document.getElementById("auth-login-pass").value;
    if (WedPlanAuth.login(email, pass)) {
      WedPlanUtils.closeModal("global-modal");
      window.location.hash = "#dashboard";
    }
  },

  handleRegister() {
    const p1 = document.getElementById("auth-reg-p1").value.trim();
    const p2 = document.getElementById("auth-reg-p2").value.trim();
    const email = document.getElementById("auth-reg-email").value.trim();
    const weddingDate = document.getElementById("auth-reg-date").value;
    const totalBudget = document.getElementById("auth-reg-budget").value;

    if (WedPlanAuth.register({ partner1: p1, partner2: p2, email, weddingDate, totalBudget })) {
      WedPlanUtils.closeModal("global-modal");
      window.location.hash = "#dashboard";
    }
  }
};

if (typeof window !== "undefined") {
  window.WedPlanModals = WedPlanModals;
}
