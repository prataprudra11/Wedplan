/**
 * WedPlan - Application Coordinator & SPA Router
 */

class WedPlanApp {
  constructor() {
    this.root = document.getElementById("app-root");
    this.currentRoute = "home";
    this.routes = {
      "home": window.HomeView,
      "dashboard": window.DashboardView,
      "budget": window.BudgetView,
      "vendors": window.VendorsView,
      "guests": window.GuestsView,
      "checklist": window.ChecklistView,
      "timeline": window.TimelineView,
      "seating": window.SeatingView,
      "website": window.WebsiteBuilderView,
      "gallery": window.GalleryView,
      "messages": window.MessagesView
    };
  }

  /**
   * Initialize App lifecycle
   */
  init() {
    // 1. Initialize Theme from storage
    const currentTheme = window.store.getThemePreference();
    window.store.setThemePreference(currentTheme);

    // 2. Setup Route listener
    window.addEventListener("hashchange", () => this.handleRouteChange());

    // 3. Setup mobile menu toggle
    const menuBtn = document.getElementById("mobile-menu-toggle");
    const drawer = document.getElementById("mobile-nav-drawer");
    if (menuBtn && drawer) {
      menuBtn.addEventListener("click", () => {
        drawer.classList.toggle("open");
        const isOpen = drawer.classList.contains("open");
        menuBtn.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      });

      // Close drawer when any mobile nav link is clicked
      drawer.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
          drawer.classList.remove("open");
          menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
      });
    }

    // 4. Setup Theme Toggle button
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const next = window.store.toggleTheme();
        this.updateThemeIcon(next);
      });
      this.updateThemeIcon(currentTheme);
    }

    // 5. Auth UI update
    WedPlanAuth.updateAuthUI();

    // 6. Handle initial route
    this.handleRouteChange();

    // 7. Subscribe to global store changes to re-render active view smoothly
    window.store.subscribe("change", () => {
      // Re-render active view if on data-dependent page
      if (this.currentRoute !== "home") {
        this.renderActiveView();
      }
    });

    console.log("WedPlan Application initialized successfully.");
  }

  updateThemeIcon(theme) {
    const themeBtn = document.getElementById("theme-toggle-btn");
    if (!themeBtn) return;
    if (theme === "dark") {
      themeBtn.innerHTML = '<i class="fa-solid fa-sun text-gold"></i>';
      themeBtn.title = "Switch to Romantic Light Mode";
    } else {
      themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
      themeBtn.title = "Switch to Midnight Elegance Dark Mode";
    }
  }

  /**
   * Resolve and switch views based on URL Hash
   */
  handleRouteChange() {
    let hash = window.location.hash.replace("#", "").trim();
    if (!hash || !this.routes[hash]) {
      hash = "home";
    }

    this.currentRoute = hash;
    this.updateActiveNavLinks(hash);
    this.renderActiveView();

    // Scroll to top of page on view change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  updateActiveNavLinks(route) {
    document.querySelectorAll(".nav-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href === `#${route}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  renderActiveView() {
    const view = this.routes[this.currentRoute] || this.routes["home"];
    if (view && typeof view.render === "function") {
      this.root.innerHTML = view.render();
      if (typeof view.init === "function") {
        view.init();
      }
    }
  }
}

// Global initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.app = new WedPlanApp();
  window.app.init();
});
