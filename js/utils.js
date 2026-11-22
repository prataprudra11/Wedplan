/**
 * WedPlan - Utility Functions
 * Helper methods for UI, math, dates, formatters, and notifications
 */

const WedPlanUtils = {
  /**
   * Format number as USD currency
   */
  formatCurrency(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "$0";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);
  },

  /**
   * Format ISO date string to human-readable format
   */
  formatDate(dateStr, options = { month: "short", day: "numeric", year: "numeric" }) {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", options);
  },

  /**
   * Calculate detailed remaining time until wedding date
   */
  getTimeRemaining(targetDateStr) {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    return { total: difference, days, hours, minutes, seconds, isPast: false };
  },

  /**
   * Generate clean unique ID
   */
  generateId(prefix = "id") {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 7)}`;
  },

  /**
   * Sanitize HTML to prevent XSS
   */
  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  /**
   * Toast notification display
   */
  showToast(message, type = "success", duration = 3500) {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-exclamation";
    if (type === "info") icon = "fa-circle-info";
    if (type === "warning") icon = "fa-triangle-exclamation";

    toast.innerHTML = `
      <div class="toast-content">
        <i class="fa-solid ${icon} toast-icon"></i>
        <span class="toast-message">${this.escapeHtml(message)}</span>
      </div>
      <button type="button" class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    // Animation in
    requestAnimationFrame(() => {
      toast.classList.add("toast-show");
    });

    const removeToast = () => {
      toast.classList.remove("toast-show");
      toast.classList.add("toast-hide");
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", removeToast);
    setTimeout(removeToast, duration);
  },

  /**
   * Export array of guest objects to downloadable CSV
   */
  exportGuestsToCSV(guests, filename = "WedPlan-Guest-List.csv") {
    if (!guests || !guests.length) {
      this.showToast("No guests to export", "info");
      return;
    }

    const headers = ["Name", "Email", "Phone", "Side", "RSVP Status", "Plus One", "Plus One Name", "Dietary Restrictions", "Table"];
    const rows = guests.map(g => [
      `"${(g.name || "").replace(/"/g, '""')}"`,
      `"${(g.email || "").replace(/"/g, '""')}"`,
      `"${(g.phone || "").replace(/"/g, '""')}"`,
      `"${(g.side || "").replace(/"/g, '""')}"`,
      `"${(g.rsvpStatus || "").replace(/"/g, '""')}"`,
      g.plusOne ? "Yes" : "No",
      `"${(g.plusOneName || "").replace(/"/g, '""')}"`,
      `"${(g.dietary || "None").replace(/"/g, '""')}"`,
      `"${(g.tableId || "Unassigned").replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.showToast("Guest list exported successfully to CSV!", "success");
  },

  /**
   * Open modal by DOM id
   */
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add("modal-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-backdrop-active");
  },

  /**
   * Close modal by DOM id
   */
  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove("modal-open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal-open")) {
      document.body.classList.remove("modal-backdrop-active");
    }
  }
};

if (typeof window !== "undefined") {
  window.WedPlanUtils = WedPlanUtils;
}
