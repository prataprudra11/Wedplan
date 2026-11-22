/**
 * WedPlan - Wedding Website Builder & Live Preview (Bonus Feature)
 */

const WebsiteBuilderView = {
  render() {
    const user = window.store.getUser();
    const settings = user.websiteSettings || {
      tagline: "Together is our favorite place to be",
      story: "We met on a rainy autumn day in San Francisco...",
      ceremonyTime: "4:00 PM - 5:00 PM",
      receptionTime: "5:30 PM - 11:30 PM",
      dressCode: "Black-Tie Optional / Romantic Elegance",
      rsvpDeadline: "2027-05-01",
      bannerImage: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80"
    };

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Wedding Website Builder</h1>
            <p class="view-subtitle">Customize and preview your personalized couple website to share with guests.</p>
          </div>
          <div class="view-header-actions">
            <button class="btn btn-primary" onclick="WebsiteBuilderView.saveSettings()">
              <i class="fa-solid fa-floppy-disk"></i> Save & Publish Changes
            </button>
          </div>
        </div>

        <div class="website-builder-grid">
          <!-- Left: Customization Settings Form -->
          <div class="wb-editor-pane">
            <div class="wb-panel">
              <h3><i class="fa-solid fa-pen-nib text-gold"></i> Website Content</h3>

              <div class="form-group">
                <label>Love Story Tagline</label>
                <input type="text" id="wb-tagline" value="${WedPlanUtils.escapeHtml(settings.tagline)}" />
              </div>

              <div class="form-group">
                <label>Our Love Story</label>
                <textarea id="wb-story" rows="4">${WedPlanUtils.escapeHtml(settings.story)}</textarea>
              </div>

              <div class="form-group">
                <label>Ceremony Time & Details</label>
                <input type="text" id="wb-ceremony" value="${WedPlanUtils.escapeHtml(settings.ceremonyTime)}" />
              </div>

              <div class="form-group">
                <label>Reception Time & Details</label>
                <input type="text" id="wb-reception" value="${WedPlanUtils.escapeHtml(settings.receptionTime)}" />
              </div>

              <div class="form-group">
                <label>Dress Code / Attire Note</label>
                <input type="text" id="wb-dresscode" value="${WedPlanUtils.escapeHtml(settings.dressCode)}" />
              </div>

              <div class="form-group">
                <label>RSVP Deadline</label>
                <input type="date" id="wb-rsvpdeadline" value="${settings.rsvpDeadline || ''}" />
              </div>

              <div class="form-group">
                <label>Hero Banner Photo URL</label>
                <input type="text" id="wb-banner" value="${WedPlanUtils.escapeHtml(settings.bannerImage)}" />
              </div>

              <button class="btn btn-outline-gold btn-block" onclick="WebsiteBuilderView.saveSettings()">
                Update Live Preview
              </button>
            </div>
          </div>

          <!-- Right: Live Website Device Preview Frame -->
          <div class="wb-preview-pane">
            <div class="preview-browser-frame">
              <div class="browser-top-bar">
                <div class="browser-dots">
                  <span class="dot dot-red"></span>
                  <span class="dot dot-yellow"></span>
                  <span class="dot dot-green"></span>
                </div>
                <div class="browser-address">
                  <i class="fa-solid fa-lock text-success"></i> https://wedplan.me/sophia-and-alexander
                </div>
              </div>

              <!-- Rendered Couple Website Container -->
              <div class="wb-public-site" id="wb-public-preview">
                <!-- Mini Hero -->
                <div class="public-hero" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${settings.bannerImage}')">
                  <span class="public-hero-pill">WE'RE GETTING MARRIED</span>
                  <h1 class="public-couple-names">${WedPlanUtils.escapeHtml(user.name)}</h1>
                  <p class="public-tagline">"${WedPlanUtils.escapeHtml(settings.tagline)}"</p>
                  <div class="public-date-venue">
                    <span>${WedPlanUtils.formatDate(user.weddingDate, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>${WedPlanUtils.escapeHtml(user.venueName || user.location)}</span>
                  </div>
                </div>

                <!-- Story Section -->
                <div class="public-section text-center">
                  <span class="badge-subtitle">Our Journey</span>
                  <h2 class="public-sec-title">How We Met & The Proposal</h2>
                  <p class="public-story-text">${WedPlanUtils.escapeHtml(settings.story)}</p>
                </div>

                <!-- Event Details Section -->
                <div class="public-section bg-cream">
                  <div class="public-details-grid">
                    <div class="public-detail-card">
                      <i class="fa-solid fa-ring text-gold fa-2x mb-2"></i>
                      <h3>Ceremony</h3>
                      <p><strong>${WedPlanUtils.escapeHtml(settings.ceremonyTime)}</strong></p>
                      <p class="small text-muted">${WedPlanUtils.escapeHtml(user.venueName || user.location)}</p>
                    </div>

                    <div class="public-detail-card">
                      <i class="fa-solid fa-champagne-glasses text-rose fa-2x mb-2"></i>
                      <h3>Reception</h3>
                      <p><strong>${WedPlanUtils.escapeHtml(settings.receptionTime)}</strong></p>
                      <p class="small text-muted">Dinner, Toasts & Dancing Under the Stars</p>
                    </div>

                    <div class="public-detail-card">
                      <i class="fa-solid fa-vest text-gold fa-2x mb-2"></i>
                      <h3>Dress Code</h3>
                      <p><strong>${WedPlanUtils.escapeHtml(settings.dressCode)}</strong></p>
                      <p class="small text-muted">RSVP Deadline: ${WedPlanUtils.formatDate(settings.rsvpDeadline)}</p>
                    </div>
                  </div>
                </div>

                <!-- Interactive Public RSVP Submission Form -->
                <div class="public-section text-center">
                  <span class="badge-subtitle">Celebrate With Us</span>
                  <h2 class="public-sec-title">Kindly RSVP</h2>
                  <p class="small text-muted mb-4">Please respond by ${WedPlanUtils.formatDate(settings.rsvpDeadline)} so we can finalize catering and seating.</p>

                  <div class="public-rsvp-form">
                    <div class="form-group text-left">
                      <label>Your Full Name *</label>
                      <input type="text" id="public-rsvp-name" placeholder="First and last name" />
                    </div>
                    <div class="form-group text-left">
                      <label>Email Address</label>
                      <input type="email" id="public-rsvp-email" placeholder="name@example.com" />
                    </div>
                    <div class="form-group text-left">
                      <label>Will You Be Attending?</label>
                      <select id="public-rsvp-attendance">
                        <option value="Attending">Joyfully Accept (Attending)</option>
                        <option value="Declined">Regretfully Decline (Cannot Attend)</option>
                      </select>
                    </div>
                    <div class="form-group text-left">
                      <label>Dietary Restrictions / Allergies</label>
                      <select id="public-rsvp-dietary">
                        <option value="None">No Dietary Restrictions</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Gluten-Free">Gluten-Free</option>
                        <option value="Halal">Halal</option>
                      </select>
                    </div>
                    <button class="btn btn-primary btn-block" onclick="WebsiteBuilderView.submitPublicRsvp()">
                      <i class="fa-solid fa-heart"></i> Submit Wedding RSVP
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveSettings() {
    const tagline = document.getElementById("wb-tagline").value;
    const story = document.getElementById("wb-story").value;
    const ceremonyTime = document.getElementById("wb-ceremony").value;
    const receptionTime = document.getElementById("wb-reception").value;
    const dressCode = document.getElementById("wb-dresscode").value;
    const rsvpDeadline = document.getElementById("wb-rsvpdeadline").value;
    const bannerImage = document.getElementById("wb-banner").value;

    const user = window.store.getUser();
    const updatedUser = {
      ...user,
      websiteSettings: {
        tagline,
        story,
        ceremonyTime,
        receptionTime,
        dressCode,
        rsvpDeadline,
        bannerImage
      }
    };

    window.store.updateUser(updatedUser);
    WedPlanUtils.showToast("Wedding website updated successfully!", "success");
    window.app.renderActiveView();
  },

  submitPublicRsvp() {
    const name = document.getElementById("public-rsvp-name").value;
    const email = document.getElementById("public-rsvp-email").value;
    const rsvpStatus = document.getElementById("public-rsvp-attendance").value;
    const dietary = document.getElementById("public-rsvp-dietary").value;

    if (!name.trim()) {
      WedPlanUtils.showToast("Please enter your name to RSVP.", "error");
      return;
    }

    // Add directly to couple's guest list!
    window.store.addGuest({
      name,
      email,
      rsvpStatus,
      dietary,
      side: "Mutual",
      plusOne: false
    });

    WedPlanUtils.showToast(`Thank you, ${name}! Your RSVP has been recorded in the couple's guest list.`, "success");
    document.getElementById("public-rsvp-name").value = "";
    document.getElementById("public-rsvp-email").value = "";
  }
};

if (typeof window !== "undefined") {
  window.WebsiteBuilderView = WebsiteBuilderView;
}
