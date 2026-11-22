/**
 * WedPlan - Data Store & State Management
 * Persistent reactive store backed by browser LocalStorage
 */

class WedPlanStore {
  constructor() {
    this.STORAGE_KEY = "wedplan_state_v1";
    this.THEME_KEY = "wedplan_theme_pref";
    this.listeners = {};
    this.state = this.loadState();
  }

  /**
   * Load state from localStorage or initialize with default data
   */
  loadState() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.user && parsed.budgetItems) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not parse WedPlan store from localStorage, reinitializing with defaults.", e);
    }

    // Fallback to default copy
    return this.getCleanDefaultState();
  }

  /**
   * Return deep clone of default sample data
   */
  getCleanDefaultState() {
    if (typeof window !== "undefined" && window.WedPlanDefaultData) {
      return JSON.parse(JSON.stringify(window.WedPlanDefaultData));
    }
    return {
      user: {
        id: "couple_demo_1",
        name: "Sophia & Alexander",
        email: "sophia.alexander@wedplan.demo",
        partner1: "Sophia Bennett",
        partner2: "Alexander Wright",
        weddingDate: "2027-06-18T16:00:00",
        venueName: "St. Clair Vineyards & Estate",
        location: "Napa Valley, California",
        totalBudget: 35000,
        theme: "Romantic Garden & Rose Gold Elegance"
      },
      vendors: [],
      budgetItems: [],
      guests: [],
      tables: [],
      tasks: [],
      timelineEvents: [],
      gallery: [],
      messages: [],
      bookings: []
    };
  }

  /**
   * Persist current state to localStorage and notify listeners
   */
  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error("Error saving state to localStorage:", e);
    }
  }

  /**
   * Subscribe to state change events
   */
  subscribe(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    };
  }

  /**
   * Notify registered listeners of state changes
   */
  emit(event, data) {
    this.saveState();
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in listener for event '${event}':`, err);
        }
      });
    }
    // Also trigger general 'change' event
    if (event !== "change" && this.listeners["change"]) {
      this.listeners["change"].forEach(cb => cb({ event, data }));
    }
  }

  /**
   * Hard reset store to factory default demo data
   */
  resetToDefault() {
    this.state = this.getCleanDefaultState();
    this.saveState();
    this.emit("reset", this.state);
    this.emit("user_updated", this.state.user);
    this.emit("budget_updated", this.getBudgetSummary());
    this.emit("tasks_updated", this.getTaskSummary());
    this.emit("guests_updated", this.getGuestSummary());
  }

  /* =========================================================================
     USER & WEDDING PROFILE
     ========================================================================= */

  getUser() {
    return this.state.user;
  }

  updateUser(userData) {
    this.state.user = { ...this.state.user, ...userData };
    this.emit("user_updated", this.state.user);
    return this.state.user;
  }

  /* =========================================================================
     BUDGET MANAGEMENT
     ========================================================================= */

  getBudgetItems() {
    return this.state.budgetItems || [];
  }

  getBudgetSummary() {
    const items = this.getBudgetItems();
    const totalBudget = Number(this.state.user.totalBudget) || 35000;
    
    let totalEstimated = 0;
    let totalActual = 0;
    let totalPaid = 0;

    const categoryMap = {};

    items.forEach(item => {
      const est = Number(item.estimated) || 0;
      const act = Number(item.actual) || 0;
      totalEstimated += est;
      totalActual += act;

      if (item.paidStatus === "Paid") {
        totalPaid += act || est;
      } else if (item.paidStatus === "Deposit Paid") {
        totalPaid += (act || est) * 0.5; // Estimated 50% deposit
      }

      const cat = item.category || "Other";
      if (!categoryMap[cat]) {
        categoryMap[cat] = { category: cat, estimated: 0, actual: 0, count: 0 };
      }
      categoryMap[cat].estimated += est;
      categoryMap[cat].actual += act;
      categoryMap[cat].count += 1;
    });

    const remainingBudget = totalBudget - totalActual;
    const percentSpent = totalBudget > 0 ? Math.min(100, Math.round((totalActual / totalBudget) * 100)) : 0;

    return {
      totalBudget,
      totalEstimated,
      totalActual,
      totalPaid,
      remainingBudget,
      percentSpent,
      categories: Object.values(categoryMap)
    };
  }

  addBudgetItem(item) {
    const newItem = {
      id: WedPlanUtils.generateId("b"),
      category: item.category || "General",
      name: item.name || "Expense Item",
      estimated: Number(item.estimated) || 0,
      actual: Number(item.actual) || 0,
      paidStatus: item.paidStatus || "Pending",
      notes: item.notes || "",
      dueDate: item.dueDate || ""
    };
    this.state.budgetItems.push(newItem);
    this.emit("budget_updated", this.getBudgetSummary());
    return newItem;
  }

  updateBudgetItem(id, updatedFields) {
    const index = this.state.budgetItems.findIndex(b => b.id === id);
    if (index !== -1) {
      this.state.budgetItems[index] = { ...this.state.budgetItems[index], ...updatedFields };
      this.emit("budget_updated", this.getBudgetSummary());
      return this.state.budgetItems[index];
    }
    return null;
  }

  deleteBudgetItem(id) {
    const originalLength = this.state.budgetItems.length;
    this.state.budgetItems = this.state.budgetItems.filter(b => b.id !== id);
    if (this.state.budgetItems.length !== originalLength) {
      this.emit("budget_updated", this.getBudgetSummary());
      return true;
    }
    return false;
  }

  /* =========================================================================
     VENDORS & BOOKINGS
     ========================================================================= */

  getVendors(filter = {}) {
    let list = this.state.vendors || [];

    if (filter.category && filter.category !== "all") {
      list = list.filter(v => v.category === filter.category);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.location.toLowerCase().includes(q) ||
        (v.bio && v.bio.toLowerCase().includes(q)) ||
        (v.categoryLabel && v.categoryLabel.toLowerCase().includes(q))
      );
    }
    if (filter.priceTier && filter.priceTier !== "all") {
      list = list.filter(v => v.priceTier === filter.priceTier);
    }
    if (filter.minRating) {
      list = list.filter(v => v.rating >= Number(filter.minRating));
    }

    return list;
  }

  getVendorById(id) {
    return (this.state.vendors || []).find(v => v.id === id);
  }

  addVendorReview(vendorId, reviewData) {
    const vendor = this.getVendorById(vendorId);
    if (!vendor) return false;

    if (!vendor.reviews) vendor.reviews = [];
    const newRev = {
      user: reviewData.user || "Happy Couple",
      rating: Number(reviewData.rating) || 5,
      date: "Just now",
      comment: reviewData.comment || "Wonderful service!"
    };
    vendor.reviews.unshift(newRev);
    vendor.reviewCount = (vendor.reviewCount || 0) + 1;

    // Recalculate average rating
    const sum = vendor.reviews.reduce((acc, r) => acc + r.rating, 0);
    vendor.rating = Math.round((sum / vendor.reviews.length) * 10) / 10;

    this.emit("vendors_updated", this.state.vendors);
    return true;
  }

  bookVendor(bookingData) {
    if (!this.state.bookings) this.state.bookings = [];

    const newBooking = {
      id: WedPlanUtils.generateId("bk"),
      vendorId: bookingData.vendorId,
      vendorName: bookingData.vendorName,
      category: bookingData.category || "Service",
      eventDate: bookingData.eventDate || this.state.user.weddingDate,
      guestCount: bookingData.guestCount || 100,
      status: "Confirmed",
      packageSelected: bookingData.packageSelected || "Custom Package",
      inquiryDate: new Date().toISOString().split("T")[0],
      totalQuote: Number(bookingData.totalQuote) || 0,
      notes: bookingData.notes || ""
    };

    this.state.bookings.push(newBooking);

    // Also mark vendor as booked in vendor list
    const vendor = this.getVendorById(bookingData.vendorId);
    if (vendor) {
      vendor.booked = true;
    }

    this.emit("bookings_updated", this.state.bookings);
    this.emit("vendors_updated", this.state.vendors);
    return newBooking;
  }

  getBookings() {
    return this.state.bookings || [];
  }

  /* =========================================================================
     GUEST LIST & RSVP
     ========================================================================= */

  getGuests() {
    return this.state.guests || [];
  }

  getGuestSummary() {
    const guests = this.getGuests();
    let attending = 0;
    let declined = 0;
    let pending = 0;
    let plusOnes = 0;
    const dietaryMap = {};

    guests.forEach(g => {
      if (g.rsvpStatus === "Attending") attending += 1;
      else if (g.rsvpStatus === "Declined") declined += 1;
      else pending += 1;

      if (g.plusOne) plusOnes += 1;

      const diet = g.dietary || "None";
      if (diet !== "None") {
        dietaryMap[diet] = (dietaryMap[diet] || 0) + 1;
      }
    });

    const totalInvited = guests.length;
    const totalPotentialAttendees = attending + plusOnes;

    return {
      totalInvited,
      attending,
      declined,
      pending,
      plusOnes,
      totalPotentialAttendees,
      dietaryBreakdown: dietaryMap
    };
  }

  addGuest(guest) {
    const newGuest = {
      id: WedPlanUtils.generateId("g"),
      name: guest.name || "Guest",
      email: guest.email || "",
      phone: guest.phone || "",
      side: guest.side || "Mutual",
      rsvpStatus: guest.rsvpStatus || "Pending",
      plusOne: Boolean(guest.plusOne),
      plusOneName: guest.plusOneName || "",
      dietary: guest.dietary || "None",
      tableId: guest.tableId || null
    };

    this.state.guests.push(newGuest);
    this.emit("guests_updated", this.getGuestSummary());
    return newGuest;
  }

  updateGuest(id, updatedFields) {
    const index = this.state.guests.findIndex(g => g.id === id);
    if (index !== -1) {
      this.state.guests[index] = { ...this.state.guests[index], ...updatedFields };
      this.emit("guests_updated", this.getGuestSummary());
      return this.state.guests[index];
    }
    return null;
  }

  deleteGuest(id) {
    const originalLength = this.state.guests.length;
    this.state.guests = this.state.guests.filter(g => g.id !== id);
    if (this.state.guests.length !== originalLength) {
      this.emit("guests_updated", this.getGuestSummary());
      return true;
    }
    return false;
  }

  /* =========================================================================
     TABLES & SEATING ARRANGEMENT
     ========================================================================= */

  getTables() {
    return this.state.tables || [];
  }

  addTable(table) {
    const newTable = {
      id: WedPlanUtils.generateId("t"),
      name: table.name || `Table ${this.state.tables.length + 1}`,
      shape: table.shape || "round",
      capacity: Number(table.capacity) || 8
    };
    this.state.tables.push(newTable);
    this.emit("tables_updated", this.state.tables);
    return newTable;
  }

  assignGuestToTable(guestId, tableId) {
    const guest = this.state.guests.find(g => g.id === guestId);
    if (guest) {
      guest.tableId = tableId || null;
      this.emit("guests_updated", this.getGuestSummary());
      this.emit("tables_updated", this.state.tables);
      return true;
    }
    return false;
  }

  /* =========================================================================
     TASKS & CHECKLIST
     ========================================================================= */

  getTasks() {
    return this.state.tasks || [];
  }

  getTaskSummary() {
    const tasks = this.getTasks();
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const pending = total - completed;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      percent
    };
  }

  addTask(task) {
    const newTask = {
      id: WedPlanUtils.generateId("tk"),
      title: task.title || "New Wedding Task",
      timeframe: task.timeframe || "1-2 Months",
      category: task.category || "General",
      priority: task.priority || "Medium",
      completed: false,
      dueDate: task.dueDate || "",
      notes: task.notes || ""
    };

    this.state.tasks.push(newTask);
    this.emit("tasks_updated", this.getTaskSummary());
    return newTask;
  }

  toggleTask(id) {
    const task = this.state.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      this.emit("tasks_updated", this.getTaskSummary());
      return task;
    }
    return null;
  }

  updateTask(id, updatedFields) {
    const index = this.state.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.state.tasks[index] = { ...this.state.tasks[index], ...updatedFields };
      this.emit("tasks_updated", this.getTaskSummary());
      return this.state.tasks[index];
    }
    return null;
  }

  deleteTask(id) {
    const originalLength = this.state.tasks.length;
    this.state.tasks = this.state.tasks.filter(t => t.id !== id);
    if (this.state.tasks.length !== originalLength) {
      this.emit("tasks_updated", this.getTaskSummary());
      return true;
    }
    return false;
  }

  /* =========================================================================
     DAY-OF TIMELINE
     ========================================================================= */

  getTimeline() {
    return (this.state.timelineEvents || []).slice();
  }

  addTimelineEvent(event) {
    const newEvent = {
      id: WedPlanUtils.generateId("tm"),
      time: event.time || "12:00 PM",
      title: event.title || "Wedding Milestone",
      category: event.category || "Ceremony",
      location: event.location || "",
      notes: event.notes || "",
      completed: false
    };

    this.state.timelineEvents.push(newEvent);
    this.emit("timeline_updated", this.state.timelineEvents);
    return newEvent;
  }

  deleteTimelineEvent(id) {
    const orig = this.state.timelineEvents.length;
    this.state.timelineEvents = this.state.timelineEvents.filter(t => t.id !== id);
    if (this.state.timelineEvents.length !== orig) {
      this.emit("timeline_updated", this.state.timelineEvents);
      return true;
    }
    return false;
  }

  /* =========================================================================
     MESSAGE BOARD
     ========================================================================= */

  getMessages(channelId = "all") {
    let msgs = this.state.messages || [];
    if (channelId && channelId !== "all") {
      msgs = msgs.filter(m => m.channelId === channelId);
    }
    return msgs;
  }

  addMessage(channelId, text, senderName, senderRole) {
    if (!this.state.messages) this.state.messages = [];
    const newMsg = {
      id: WedPlanUtils.generateId("msg"),
      channelId: channelId || "general",
      senderName: senderName || this.state.user.partner1 || "Couple",
      senderRole: senderRole || "Bride & Groom",
      avatar: this.state.user.avatar1 || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      text: text,
      timestamp: "Just now"
    };

    this.state.messages.push(newMsg);
    this.emit("messages_updated", this.state.messages);
    return newMsg;
  }

  /* =========================================================================
     GALLERY
     ========================================================================= */

  getGallery(category = "All") {
    const items = this.state.gallery || [];
    if (!category || category === "All") return items;
    return items.filter(img => img.category.toLowerCase() === category.toLowerCase());
  }

  addGalleryPhoto(photo) {
    const newPhoto = {
      id: WedPlanUtils.generateId("gal"),
      title: photo.title || "Wedding Inspiration",
      category: photo.category || "Moments",
      url: photo.url || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      caption: photo.caption || ""
    };
    this.state.gallery.push(newPhoto);
    this.emit("gallery_updated", this.state.gallery);
    return newPhoto;
  }

  /* =========================================================================
     THEME MANAGEMENT (DARK / ROMANTIC LIGHT MODE)
     ========================================================================= */

  getThemePreference() {
    return localStorage.getItem(this.THEME_KEY) || "light";
  }

  setThemePreference(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
    this.emit("theme_changed", theme);
  }

  toggleTheme() {
    const current = this.getThemePreference();
    const next = current === "dark" ? "light" : "dark";
    this.setThemePreference(next);
    return next;
  }
}

// Global singleton instance
if (typeof window !== "undefined") {
  window.store = new WedPlanStore();
}
