/**
 * WedPlan - Authentication & Profile Manager
 * Handles simulated login, registration, couple profile switching & session management
 */

const WedPlanAuth = {
  SESSION_KEY: "wedplan_auth_session",

  /**
   * Check if user is currently authenticated
   */
  isLoggedIn() {
    const session = localStorage.getItem(this.SESSION_KEY);
    return session !== null ? JSON.parse(session) : true; // Default to true for demo accessibility
  },

  /**
   * Get currently active session user
   */
  getCurrentUser() {
    return window.store ? window.store.getUser() : null;
  },

  /**
   * Simulated user login
   */
  login(email, password) {
    if (!email || !password) {
      WedPlanUtils.showToast("Please enter both email and password.", "error");
      return false;
    }

    // Accept demo or any valid email
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      email,
      loggedInAt: new Date().toISOString()
    }));

    WedPlanUtils.showToast("Welcome back to WedPlan!", "success");
    this.updateAuthUI();
    return true;
  },

  /**
   * Quick demo login with pre-populated couple
   */
  quickDemoLogin() {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      email: "sophia.alexander@wedplan.demo",
      loggedInAt: new Date().toISOString()
    }));
    WedPlanUtils.showToast("Signed in as Sophia & Alexander (Demo Account)", "success");
    this.updateAuthUI();
    return true;
  },

  /**
   * Register new couple profile
   */
  register(coupleData) {
    if (!coupleData.partner1 || !coupleData.email) {
      WedPlanUtils.showToast("Please provide your name and email address.", "error");
      return false;
    }

    const coupleName = coupleData.partner2 
      ? `${coupleData.partner1} & ${coupleData.partner2}`
      : coupleData.partner1;

    window.store.updateUser({
      name: coupleName,
      partner1: coupleData.partner1,
      partner2: coupleData.partner2 || "",
      email: coupleData.email,
      weddingDate: coupleData.weddingDate ? `${coupleData.weddingDate}T16:00:00` : "2027-06-18T16:00:00",
      venueName: coupleData.venueName || "Dream Venue",
      location: coupleData.location || "California",
      totalBudget: Number(coupleData.totalBudget) || 30000
    });

    localStorage.setItem(this.SESSION_KEY, JSON.stringify({
      email: coupleData.email,
      loggedInAt: new Date().toISOString()
    }));

    WedPlanUtils.showToast(`Congratulations ${coupleName}! Your wedding portal is ready.`, "success");
    this.updateAuthUI();
    return true;
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(this.SESSION_KEY);
    WedPlanUtils.showToast("You have been signed out.", "info");
    this.updateAuthUI();
  },

  /**
   * Update header & user badges across views
   */
  updateAuthUI() {
    const user = this.getCurrentUser();
    const isLogged = this.isLoggedIn();

    const authBtn = document.getElementById("nav-auth-btn");
    const userBadge = document.getElementById("nav-user-badge");
    const userNameSpan = document.getElementById("nav-user-name");

    if (authBtn && userBadge) {
      if (isLogged && user) {
        authBtn.classList.add("hidden");
        userBadge.classList.remove("hidden");
        if (userNameSpan) userNameSpan.textContent = user.name || "My Wedding";
      } else {
        authBtn.classList.remove("hidden");
        userBadge.classList.add("hidden");
      }
    }

    // Refresh active view to reflect updated names if needed
    if (window.app && typeof window.app.renderActiveView === "function") {
      window.app.renderActiveView();
    }
  }
};

if (typeof window !== "undefined") {
  window.WedPlanAuth = WedPlanAuth;
}
