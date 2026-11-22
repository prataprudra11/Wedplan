/**
 * WedPlan - Photo Gallery & Moodboard View (Bonus Feature)
 */

const GalleryView = {
  activeCategory: "All",
  activeLightboxIndex: 0,

  render() {
    const photos = window.store.getGallery(this.activeCategory);
    const categories = ["All", "Venues", "Dresses", "Decor", "Florals", "Cakes", "Moments"];

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Inspiration Gallery & Moodboard</h1>
            <p class="view-subtitle">Visual aesthetic ideas, florals, attire, and decor palettes for your wedding day.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-primary" onclick="WedPlanModals.openAddPhotoModal()">
              <i class="fa-solid fa-plus"></i> Add Inspiration Photo
            </button>
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="table-controls-bar">
          <div class="filter-chips-scroll">
            ${categories.map(c => `
              <button 
                class="filter-chip ${this.activeCategory === c ? 'active' : ''}" 
                onclick="GalleryView.setCategory('${c}')">
                ${c}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-masonry-grid">
          ${photos.map((photo, index) => `
            <div class="gallery-item-card" onclick="GalleryView.openLightbox(${index})">
              <img src="${photo.url}" alt="${WedPlanUtils.escapeHtml(photo.title)}" loading="lazy" />
              <div class="gallery-overlay">
                <span class="gallery-badge">${WedPlanUtils.escapeHtml(photo.category)}</span>
                <h4 class="gallery-item-title">${WedPlanUtils.escapeHtml(photo.title)}</h4>
                <p class="gallery-item-desc">${WedPlanUtils.escapeHtml(photo.caption || '')}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Lightbox Modal -->
      <div id="gallery-lightbox-modal" class="custom-modal" aria-hidden="true">
        <div class="modal-backdrop" onclick="GalleryView.closeLightbox()"></div>
        <div class="lightbox-dialog">
          <button class="lightbox-close" onclick="GalleryView.closeLightbox()">&times;</button>
          <div class="lightbox-body" id="lightbox-content">
            <!-- Lightbox dynamic view -->
          </div>
        </div>
      </div>
    `;
  },

  setCategory(cat) {
    this.activeCategory = cat;
    window.app.renderActiveView();
  },

  openLightbox(index) {
    const photos = window.store.getGallery(this.activeCategory);
    if (!photos[index]) return;
    this.activeLightboxIndex = index;

    const p = photos[index];
    const content = document.getElementById("lightbox-content");
    content.innerHTML = `
      <div class="lightbox-img-wrap">
        <img src="${p.url}" alt="${WedPlanUtils.escapeHtml(p.title)}" />
      </div>
      <div class="lightbox-caption-bar">
        <div>
          <span class="badge badge-gold">${WedPlanUtils.escapeHtml(p.category)}</span>
          <h3>${WedPlanUtils.escapeHtml(p.title)}</h3>
          <p class="text-muted small">${WedPlanUtils.escapeHtml(p.caption || '')}</p>
        </div>
        <div class="lightbox-nav-buttons">
          <button class="btn btn-sm btn-outline-light" onclick="GalleryView.prevPhoto(${index})"><i class="fa-solid fa-chevron-left"></i> Prev</button>
          <button class="btn btn-sm btn-outline-light" onclick="GalleryView.nextPhoto(${index})">Next <i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </div>
    `;

    WedPlanUtils.openModal("gallery-lightbox-modal");
  },

  closeLightbox() {
    WedPlanUtils.closeModal("gallery-lightbox-modal");
  },

  prevPhoto(currIdx) {
    const photos = window.store.getGallery(this.activeCategory);
    const prev = (currIdx - 1 + photos.length) % photos.length;
    this.openLightbox(prev);
  },

  nextPhoto(currIdx) {
    const photos = window.store.getGallery(this.activeCategory);
    const next = (currIdx + 1) % photos.length;
    this.openLightbox(next);
  }
};

if (typeof window !== "undefined") {
  window.GalleryView = GalleryView;
}
