/**
 * WedPlan - Vendor Directory & Detail Modal View
 */

const VendorsView = {
  activeCategory: "all",
  searchQuery: "",
  priceTierFilter: "all",
  minRating: 0,
  activeVendorModalId: null,

  render() {
    const vendors = window.store.getVendors({
      category: this.activeCategory,
      search: this.searchQuery,
      priceTier: this.priceTierFilter,
      minRating: this.minRating
    });

    const categories = [
      { id: "all", label: "All Categories", icon: "fa-border-all" },
      { id: "venues", label: "Venues", icon: "fa-hotel" },
      { id: "photographers", label: "Photographers", icon: "fa-camera" },
      { id: "caterers", label: "Catering", icon: "fa-utensils" },
      { id: "florists", label: "Floral & Decor", icon: "fa-spa" },
      { id: "planners", label: "Planners", icon: "fa-clipboard-list" },
      { id: "music", label: "Music & DJs", icon: "fa-music" },
      { id: "attire", label: "Attire & Glam", icon: "fa-gem" },
      { id: "cakes", label: "Cakes & Sweets", icon: "fa-cake-candles" }
    ];

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Wedding Vendor Directory</h1>
            <p class="view-subtitle">Browse curated wedding professionals, read real reviews, and secure your dream creative team.</p>
          </div>
          <div class="view-header-actions">
            <span class="badge badge-lg badge-gold">
              <i class="fa-solid fa-store"></i> ${vendors.length} Vendors Available
            </span>
          </div>
        </div>

        <!-- Filter Controls Bar -->
        <div class="vendors-filter-box">
          <div class="vendor-search-bar">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input 
              type="text" 
              placeholder="Search vendors by name, city, or specialty..." 
              value="${WedPlanUtils.escapeHtml(this.searchQuery)}" 
              oninput="VendorsView.handleSearch(this.value)" 
            />
          </div>

          <div class="vendor-dropdown-filters">
            <div class="filter-select-group">
              <label><i class="fa-solid fa-dollar-sign"></i> Price:</label>
              <select onchange="VendorsView.setPriceTier(this.value)">
                <option value="all" ${this.priceTierFilter === "all" ? "selected" : ""}>Any Price</option>
                <option value="$$" ${this.priceTierFilter === "$$" ? "selected" : ""}>$$ (Moderate)</option>
                <option value="$$$" ${this.priceTierFilter === "$$$" ? "selected" : ""}>$$$ (Upscale)</option>
                <option value="$$$$" ${this.priceTierFilter === "$$$$" ? "selected" : ""}>$$$$ (Luxury)</option>
              </select>
            </div>

            <div class="filter-select-group">
              <label><i class="fa-solid fa-star text-gold"></i> Rating:</label>
              <select onchange="VendorsView.setMinRating(this.value)">
                <option value="0" ${this.minRating === 0 ? "selected" : ""}>All Ratings</option>
                <option value="4.5" ${this.minRating === 4.5 ? "selected" : ""}>4.5 & Above</option>
                <option value="4.8" ${this.minRating === 4.8 ? "selected" : ""}>4.8 & Above</option>
                <option value="5.0" ${this.minRating === 5.0 ? "selected" : ""}>5.0 Stars Only</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Category Tabs -->
        <div class="vendor-category-tabs">
          ${categories.map(cat => `
            <button 
              class="cat-tab-btn ${this.activeCategory === cat.id ? 'active' : ''}" 
              onclick="VendorsView.setCategory('${cat.id}')">
              <i class="fa-solid ${cat.icon}"></i>
              <span>${cat.label}</span>
            </button>
          `).join("")}
        </div>

        <!-- Vendor Cards Grid -->
        <div class="vendors-directory-grid">
          ${vendors.length === 0 ? `
            <div class="empty-state-full">
              <i class="fa-solid fa-store-slash text-muted fa-3x"></i>
              <h3>No vendors found</h3>
              <p>Try resetting your search query or price filters to see more results.</p>
              <button class="btn btn-outline" onclick="VendorsView.resetFilters()">Clear Filters</button>
            </div>
          ` : vendors.map(v => `
            <div class="vendor-card animate-fade-in">
              <div class="vendor-img-wrap">
                <img src="${v.image}" alt="${WedPlanUtils.escapeHtml(v.name)}" loading="lazy" />
                <span class="vendor-badge">${WedPlanUtils.escapeHtml(v.badge || v.categoryLabel)}</span>
                <div class="vendor-price-tag">${v.priceTier}</div>
                ${v.booked ? `<div class="vendor-booked-ribbon"><i class="fa-solid fa-check"></i> Booked</div>` : ''}
              </div>
              <div class="vendor-card-body">
                <div class="vendor-rating">
                  <div class="stars text-gold">
                    ${this.renderStarIcons(v.rating)}
                  </div>
                  <strong>${v.rating.toFixed(1)}</strong>
                  <span class="text-muted">(${v.reviewCount})</span>
                </div>
                <h3 class="vendor-name">${WedPlanUtils.escapeHtml(v.name)}</h3>
                <div class="vendor-location">
                  <i class="fa-solid fa-location-dot"></i> ${WedPlanUtils.escapeHtml(v.location)}
                </div>
                <p class="vendor-bio">${WedPlanUtils.escapeHtml(v.bio)}</p>

                <div class="vendor-services-chips">
                  ${(v.services || []).slice(0, 3).map(s => `
                    <span class="service-chip">${WedPlanUtils.escapeHtml(s)}</span>
                  `).join("")}
                  ${(v.services || []).length > 3 ? `<span class="service-chip">+${v.services.length - 3} more</span>` : ''}
                </div>

                <div class="vendor-card-footer">
                  <span class="vendor-price-range">${WedPlanUtils.escapeHtml(v.priceRange)}</span>
                  <button class="btn btn-sm btn-primary" onclick="VendorsView.openVendorModal('${v.id}')">
                    ${v.booked ? 'View Profile' : 'View & Book'}
                  </button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Vendor Detail & Booking Modal Container -->
      <div id="vendor-detail-modal" class="custom-modal" aria-hidden="true">
        <div class="modal-backdrop" onclick="VendorsView.closeVendorModal()"></div>
        <div class="modal-dialog modal-lg">
          <div class="modal-content" id="vendor-modal-content">
            <!-- Dynamic modal content -->
          </div>
        </div>
      </div>
    `;
  },

  renderStarIcons(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars += `<i class="fa-solid fa-star"></i>`;
      } else if (rating >= i - 0.5) {
        stars += `<i class="fa-solid fa-star-half-stroke"></i>`;
      } else {
        stars += `<i class="fa-regular fa-star"></i>`;
      }
    }
    return stars;
  },

  setCategory(catId) {
    this.activeCategory = catId;
    window.app.renderActiveView();
  },

  handleSearch(val) {
    this.searchQuery = val;
    window.app.renderActiveView();
  },

  setPriceTier(tier) {
    this.priceTierFilter = tier;
    window.app.renderActiveView();
  },

  setMinRating(r) {
    this.minRating = Number(r);
    window.app.renderActiveView();
  },

  resetFilters() {
    this.activeCategory = "all";
    this.searchQuery = "";
    this.priceTierFilter = "all";
    this.minRating = 0;
    window.app.renderActiveView();
  },

  openVendorModal(vendorId) {
    const v = window.store.getVendorById(vendorId);
    if (!v) return;

    this.activeVendorModalId = vendorId;
    const modalContent = document.getElementById("vendor-modal-content");
    const user = window.store.getUser();

    modalContent.innerHTML = `
      <div class="vendor-modal-header" style="background-image: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.75)), url('${v.image}')">
        <button class="modal-close-btn" onclick="VendorsView.closeVendorModal()">&times;</button>
        <div class="vendor-modal-title-wrap">
          <span class="badge badge-gold">${v.categoryLabel}</span>
          <h2>${WedPlanUtils.escapeHtml(v.name)}</h2>
          <div class="vendor-modal-meta">
            <span><i class="fa-solid fa-location-dot"></i> ${v.location}</span>
            <span><i class="fa-solid fa-star text-gold"></i> ${v.rating.toFixed(1)} (${v.reviewCount} reviews)</span>
            <span><i class="fa-solid fa-tag"></i> ${v.priceRange}</span>
          </div>
        </div>
      </div>

      <div class="vendor-modal-body">
        <div class="vendor-modal-grid">
          <!-- Left Column: Details & Reviews -->
          <div class="vendor-modal-main">
            <h3>About ${WedPlanUtils.escapeHtml(v.name)}</h3>
            <p class="vendor-modal-bio">${WedPlanUtils.escapeHtml(v.bio)}</p>

            <h4>Services & Specialties</h4>
            <div class="vendor-services-chips mb-4">
              ${(v.services || []).map(s => `<span class="service-chip"><i class="fa-solid fa-check text-gold"></i> ${WedPlanUtils.escapeHtml(s)}</span>`).join("")}
            </div>

            <h4>Packages & Pricing</h4>
            <div class="vendor-packages-list">
              ${(v.packages || []).map((p, idx) => `
                <div class="package-card">
                  <div class="package-header">
                    <h5>${WedPlanUtils.escapeHtml(p.name)}</h5>
                    <span class="package-price">${WedPlanUtils.formatCurrency(p.price)}</span>
                  </div>
                  <p class="package-desc">${WedPlanUtils.escapeHtml(p.desc)}</p>
                </div>
              `).join("")}
            </div>

            <!-- Reviews Section -->
            <div class="vendor-reviews-section">
              <div class="reviews-header">
                <h4>Verified Reviews (${(v.reviews || []).length})</h4>
                <button class="btn btn-xs btn-outline" onclick="VendorsView.toggleReviewForm()">
                  <i class="fa-solid fa-pen"></i> Write a Review
                </button>
              </div>

              <!-- Write Review Form (Initially hidden) -->
              <div id="vendor-review-form" class="review-form-box hidden">
                <h5>Leave Your Review for ${WedPlanUtils.escapeHtml(v.name)}</h5>
                <div class="form-group">
                  <label>Rating:</label>
                  <select id="review-rating-select">
                    <option value="5">⭐⭐⭐⭐⭐ 5 Stars (Exceptional)</option>
                    <option value="4">⭐⭐⭐⭐ 4 Stars (Great)</option>
                    <option value="3">⭐⭐⭐ 3 Stars (Good)</option>
                    <option value="2">⭐⭐ 2 Stars (Fair)</option>
                    <option value="1">⭐ 1 Star (Poor)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Your Name:</label>
                  <input type="text" id="review-user-name" value="${WedPlanUtils.escapeHtml(user.name)}" />
                </div>
                <div class="form-group">
                  <label>Review Comments:</label>
                  <textarea id="review-comment" rows="3" placeholder="Share your experience working with this vendor..."></textarea>
                </div>
                <button class="btn btn-sm btn-primary" onclick="VendorsView.submitReview('${v.id}')">Submit Review</button>
              </div>

              <div class="reviews-list">
                ${(v.reviews || []).map(r => `
                  <div class="review-item">
                    <div class="review-item-header">
                      <strong>${WedPlanUtils.escapeHtml(r.user)}</strong>
                      <span class="text-gold">${'★'.repeat(r.rating)}</span>
                      <span class="text-muted small">${r.date}</span>
                    </div>
                    <p class="review-comment">"${WedPlanUtils.escapeHtml(r.comment)}"</p>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <!-- Right Column: Simulated Booking / Inquiry Card -->
          <div class="vendor-modal-sidebar">
            <div class="booking-card">
              <div class="booking-card-header">
                <h4><i class="fa-solid fa-calendar-check text-rose"></i> Inquire & Book</h4>
                <span class="status-indicator-available"><i class="fa-solid fa-circle"></i> ${v.availability}</span>
              </div>
              <p class="small text-muted mb-3">Reserve your date directly. We will add this vendor to your dashboard and budget tracker.</p>

              <div class="form-group">
                <label>Wedding Date</label>
                <input type="date" id="book-wedding-date" value="${(user.weddingDate || '').split('T')[0]}" />
              </div>

              <div class="form-group">
                <label>Estimated Guests</label>
                <input type="number" id="book-guest-count" value="120" />
              </div>

              <div class="form-group">
                <label>Select Package</label>
                <select id="book-package-select">
                  ${(v.packages || []).map(p => `
                    <option value="${WedPlanUtils.escapeHtml(p.name)}" data-price="${p.price}">
                      ${WedPlanUtils.escapeHtml(p.name)} - ${WedPlanUtils.formatCurrency(p.price)}
                    </option>
                  `).join("")}
                </select>
              </div>

              <div class="form-group">
                <label>Special Requests / Notes</label>
                <textarea id="book-notes" rows="2" placeholder="Any special notes or vision for the vendor..."></textarea>
              </div>

              <button class="btn btn-primary btn-block" onclick="VendorsView.confirmBooking('${v.id}')">
                <i class="fa-solid fa-paper-plane"></i> Submit Booking / Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    WedPlanUtils.openModal("vendor-detail-modal");
  },

  closeVendorModal() {
    WedPlanUtils.closeModal("vendor-detail-modal");
  },

  toggleReviewForm() {
    const form = document.getElementById("vendor-review-form");
    if (form) form.classList.toggle("hidden");
  },

  submitReview(vendorId) {
    const rating = document.getElementById("review-rating-select").value;
    const user = document.getElementById("review-user-name").value;
    const comment = document.getElementById("review-comment").value;

    if (!comment.trim()) {
      WedPlanUtils.showToast("Please enter a comment for your review.", "error");
      return;
    }

    window.store.addVendorReview(vendorId, { rating, user, comment });
    WedPlanUtils.showToast("Thank you! Your review has been published.", "success");
    this.openVendorModal(vendorId); // Re-render modal with updated reviews
  },

  confirmBooking(vendorId) {
    const v = window.store.getVendorById(vendorId);
    if (!v) return;

    const eventDate = document.getElementById("book-wedding-date").value;
    const guestCount = document.getElementById("book-guest-count").value;
    const packageSelect = document.getElementById("book-package-select");
    const packageSelected = packageSelect ? packageSelect.value : "Standard";
    const selectedOption = packageSelect ? packageSelect.options[packageSelect.selectedIndex] : null;
    const price = selectedOption ? Number(selectedOption.getAttribute("data-price")) : 2500;
    const notes = document.getElementById("book-notes").value;

    window.store.bookVendor({
      vendorId: v.id,
      vendorName: v.name,
      category: v.category,
      eventDate,
      guestCount,
      packageSelected,
      totalQuote: price,
      notes
    });

    // Also auto-suggest adding to budget if not already there
    WedPlanUtils.showToast(`Congratulations! Booking request confirmed with ${v.name}.`, "success");
    this.closeVendorModal();
    window.app.renderActiveView();
  }
};

if (typeof window !== "undefined") {
  window.VendorsView = VendorsView;
}
