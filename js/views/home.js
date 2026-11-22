/**
 * WedPlan - Home Page View
 */

const HomeView = {
  render() {
    const user = window.store.getUser();
    const vendors = window.store.getVendors().slice(0, 3);
    const timeRemaining = WedPlanUtils.getTimeRemaining(user.weddingDate);

    return `
      <section class="home-hero">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <div class="hero-pill animate-fade-in">
            <i class="fa-solid fa-sparkles"></i> The All-in-One Wedding Planning Portal
          </div>
          <h1 class="hero-title animate-slide-up">Plan Your Dream Wedding <span class="text-gold">With Ease & Elegance</span></h1>
          <p class="hero-subtitle animate-slide-up delay-1">
            From budget management and curated vendor sourcing to interactive seating arrangements and day-of timelines, WedPlan turns your wedding vision into reality.
          </p>

          <div class="hero-actions animate-slide-up delay-2">
            <a href="#dashboard" class="btn btn-primary btn-lg">
              <i class="fa-solid fa-compass"></i> Open Wedding Dashboard
            </a>
            <a href="#vendors" class="btn btn-secondary btn-lg">
              <i class="fa-solid fa-magnifying-glass"></i> Explore Top Vendors
            </a>
          </div>

          <!-- Hero Countdown Preview -->
          <div class="hero-countdown-card animate-slide-up delay-3">
            <div class="countdown-label">
              <i class="fa-solid fa-heart text-rose"></i> Celebrating <strong>${WedPlanUtils.escapeHtml(user.name)}</strong>
            </div>
            <div class="countdown-units">
              <div class="unit-box">
                <span class="unit-number">${timeRemaining.days}</span>
                <span class="unit-text">Days</span>
              </div>
              <div class="unit-sep">:</div>
              <div class="unit-box">
                <span class="unit-number">${String(timeRemaining.hours).padStart(2, "0")}</span>
                <span class="unit-text">Hours</span>
              </div>
              <div class="unit-sep">:</div>
              <div class="unit-box">
                <span class="unit-number">${String(timeRemaining.minutes).padStart(2, "0")}</span>
                <span class="unit-text">Mins</span>
              </div>
              <div class="unit-sep">:</div>
              <div class="unit-box">
                <span class="unit-number">${String(timeRemaining.seconds).padStart(2, "0")}</span>
                <span class="unit-text">Secs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Planning Features Section -->
      <section class="section planning-features">
        <div class="container">
          <div class="section-header text-center">
            <span class="badge-subtitle">Comprehensive Tools</span>
            <h2 class="section-title">Everything You Need To Plan With Peace Of Mind</h2>
            <p class="section-desc">Designed thoughtfully for modern couples who want effortless coordination without the stress.</p>
          </div>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon icon-gold">
                <i class="fa-solid fa-wallet"></i>
              </div>
              <h3>Budget Planner</h3>
              <p>Allocate expenses, monitor estimated vs actual costs, categorize invoices, and avoid unexpected overruns.</p>
              <a href="#budget" class="feature-link">Manage Budget <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <div class="feature-card">
              <div class="feature-icon icon-rose">
                <i class="fa-solid fa-store"></i>
              </div>
              <h3>Vendor Directory</h3>
              <p>Discover top-tier venues, photographers, caterers, and florists. Check packages, reviews, and book instantly.</p>
              <a href="#vendors" class="feature-link">Browse Vendors <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <div class="feature-card">
              <div class="feature-icon icon-gold">
                <i class="fa-solid fa-users"></i>
              </div>
              <h3>Guest List & RSVPs</h3>
              <p>Track guest invitations, meal preferences, dietary allergies, plus-ones, and export complete rosters to CSV.</p>
              <a href="#guests" class="feature-link">Manage Guests <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <div class="feature-card">
              <div class="feature-icon icon-rose">
                <i class="fa-solid fa-list-check"></i>
              </div>
              <h3>Wedding Checklist</h3>
              <p>Step-by-step master checklist organized by countdown phases, from 12 months before down to the wedding morning.</p>
              <a href="#checklist" class="feature-link">Track Tasks <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <div class="feature-card">
              <div class="feature-icon icon-gold">
                <i class="fa-solid fa-clock"></i>
              </div>
              <h3>Day-Of Timeline</h3>
              <p>Coordinate minute-by-minute schedules for hair & makeup, first look, vows, speeches, and sparkler send-offs.</p>
              <a href="#timeline" class="feature-link">View Timeline <i class="fa-solid fa-arrow-right"></i></a>
            </div>

            <div class="feature-card">
              <div class="feature-icon icon-rose">
                <i class="fa-solid fa-chair"></i>
              </div>
              <h3>Seating Arrangement</h3>
              <p>Interactive table planning with capacity tracking, table shapes, and drag-and-drop guest assignment.</p>
              <a href="#seating" class="feature-link">Plan Seating <i class="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      <!-- Featured Vendors Preview -->
      <section class="section bg-cream featured-vendors-section">
        <div class="container">
          <div class="section-header-row">
            <div>
              <span class="badge-subtitle">Handpicked Excellence</span>
              <h2 class="section-title">Featured Wedding Professionals</h2>
              <p class="section-desc">Trusted venues and artists with stellar ratings and verified reviews.</p>
            </div>
            <a href="#vendors" class="btn btn-outline">View All Vendors <i class="fa-solid fa-arrow-right"></i></a>
          </div>

          <div class="vendors-grid">
            ${vendors.map(v => `
              <div class="vendor-card">
                <div class="vendor-img-wrap">
                  <img src="${v.image}" alt="${WedPlanUtils.escapeHtml(v.name)}" loading="lazy" />
                  <span class="vendor-badge">${WedPlanUtils.escapeHtml(v.badge || v.categoryLabel)}</span>
                  <div class="vendor-price-tag">${v.priceTier}</div>
                </div>
                <div class="vendor-card-body">
                  <div class="vendor-rating">
                    <i class="fa-solid fa-star text-gold"></i>
                    <strong>${v.rating.toFixed(1)}</strong>
                    <span class="text-muted">(${v.reviewCount} reviews)</span>
                  </div>
                  <h3 class="vendor-name">${WedPlanUtils.escapeHtml(v.name)}</h3>
                  <div class="vendor-location"><i class="fa-solid fa-location-dot"></i> ${WedPlanUtils.escapeHtml(v.location)}</div>
                  <p class="vendor-bio">${WedPlanUtils.escapeHtml(v.bio)}</p>
                  <div class="vendor-card-footer">
                    <span class="vendor-price-range">${WedPlanUtils.escapeHtml(v.priceRange)}</span>
                    <button class="btn btn-sm btn-primary" onclick="VendorsView.openVendorModal('${v.id}')">View Details</button>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>

      <!-- Testimonials -->
      <section class="section testimonials-section">
        <div class="container">
          <div class="section-header text-center">
            <span class="badge-subtitle">Real Love Stories</span>
            <h2 class="section-title">Loved by Thousands of Newlyweds</h2>
          </div>

          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="stars text-gold">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
              </div>
              <p class="testimonial-quote">"WedPlan transformed what felt like an overwhelming mountain into an organized, fun journey. The budget tracker saved us over \$4,000 in unexpected fees!"</p>
              <div class="testimonial-author">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80" alt="Sarah & David" />
                <div>
                  <h4>Sarah & David</h4>
                  <span>Married at Meadowood Estate, September 2026</span>
                </div>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="stars text-gold">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
              </div>
              <p class="testimonial-quote">"The seating arrangement planner and day-of timeline were our wedding coordinator's favorite tools. Everything ran on schedule down to the exact minute."</p>
              <div class="testimonial-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="Liam & Emma" />
                <div>
                  <h4>Liam & Emma</h4>
                  <span>Married at Big Sur Coastal Cliffs, August 2026</span>
                </div>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="stars text-gold">
                <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i>
              </div>
              <p class="testimonial-quote">"Being able to share the live website with our guests and collect RSVPs with their dietary preferences in one click was an absolute dream."</p>
              <div class="testimonial-author">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="Maya & Jordan" />
                <div>
                  <h4>Maya & Jordan</h4>
                  <span>Married at The Glasshouse, October 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Call To Action Banner -->
      <section class="cta-banner">
        <div class="container text-center">
          <h2>Start Planning Your Celebration Today</h2>
          <p>Your wedding day happens once in a lifetime. Let's make every detail unforgettable.</p>
          <a href="#dashboard" class="btn btn-primary btn-lg">Go to My Dashboard</a>
        </div>
      </section>
    `;
  },

  init() {
    // Any live ticker hooks for hero if needed
  }
};

if (typeof window !== "undefined") {
  window.HomeView = HomeView;
}
