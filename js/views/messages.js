/**
 * WedPlan - Message Board View
 */

const MessagesView = {
  activeChannel: "vendors",

  render() {
    const user = window.store.getUser();
    const messages = window.store.getMessages(this.activeChannel);

    const channels = [
      { id: "vendors", name: "Vendor Coordination", icon: "fa-store", desc: "Photographer, Caterer, Florist & Venue Staff" },
      { id: "party", name: "Bridal Party & Groomsmen", icon: "fa-champagne-glasses", desc: "Maid of Honor, Best Man & Attendants" },
      { id: "general", name: "General Announcements", icon: "fa-bullhorn", desc: "Shared updates for all wedding attendees" },
      { id: "family", name: "Immediate Family", icon: "fa-house-chimney-user", desc: "Parents, siblings, and close relatives" }
    ];

    const currentChannelObj = channels.find(c => c.id === this.activeChannel) || channels[0];

    return `
      <div class="view-page-container">
        <!-- View Header -->
        <div class="view-header-row">
          <div>
            <h1 class="view-title">Wedding Message Board</h1>
            <p class="view-subtitle">Collaborate in real-time with your vendors, bridal party, and family.</p>
          </div>
          <div class="view-header-actions">
            <span class="badge badge-success"><i class="fa-solid fa-circle text-xs"></i> 4 Active Channels</span>
          </div>
        </div>

        <div class="messages-board-card">
          <!-- Channels Left Sidebar -->
          <div class="msg-channels-sidebar">
            <div class="msg-sidebar-header">
              <h4><i class="fa-solid fa-comments text-gold"></i> Channels</h4>
            </div>
            <div class="msg-channels-list">
              ${channels.map(ch => `
                <button 
                  class="msg-channel-item ${this.activeChannel === ch.id ? 'active' : ''}" 
                  onclick="MessagesView.switchChannel('${ch.id}')">
                  <div class="channel-icon-wrap">
                    <i class="fa-solid ${ch.icon}"></i>
                  </div>
                  <div class="channel-meta-wrap">
                    <strong>${WedPlanUtils.escapeHtml(ch.name)}</strong>
                    <span class="channel-desc-text">${WedPlanUtils.escapeHtml(ch.desc)}</span>
                  </div>
                </button>
              `).join("")}
            </div>
          </div>

          <!-- Active Message Feed Area -->
          <div class="msg-chat-area">
            <div class="msg-chat-header">
              <div class="msg-header-left">
                <i class="fa-solid ${currentChannelObj.icon} text-gold fa-lg"></i>
                <div>
                  <h3>${WedPlanUtils.escapeHtml(currentChannelObj.name)}</h3>
                  <p class="text-muted small">${WedPlanUtils.escapeHtml(currentChannelObj.desc)}</p>
                </div>
              </div>
            </div>

            <!-- Messages Stream -->
            <div class="msg-stream" id="chat-stream">
              ${messages.length === 0 ? `
                <div class="empty-state-sm">
                  <i class="fa-solid fa-comment-dots text-muted fa-2x"></i>
                  <p>No messages in this channel yet. Be the first to start the conversation!</p>
                </div>
              ` : messages.map(m => `
                <div class="msg-bubble-row">
                  <img src="${m.avatar}" alt="${WedPlanUtils.escapeHtml(m.senderName)}" class="msg-avatar" />
                  <div class="msg-bubble-content">
                    <div class="msg-meta-line">
                      <strong class="msg-sender-name">${WedPlanUtils.escapeHtml(m.senderName)}</strong>
                      <span class="badge badge-sm badge-outline-gold">${WedPlanUtils.escapeHtml(m.senderRole || 'Participant')}</span>
                      <span class="msg-time">${WedPlanUtils.escapeHtml(m.timestamp)}</span>
                    </div>
                    <div class="msg-text-body">
                      ${WedPlanUtils.escapeHtml(m.text)}
                    </div>
                  </div>
                </div>
              `).join("")}
            </div>

            <!-- Message Input Form -->
            <div class="msg-input-bar">
              <div class="msg-sender-picker">
                <label>Send as:</label>
                <select id="msg-sender-select">
                  <option value="${WedPlanUtils.escapeHtml(user.partner1 || 'Sophia Bennett')}">${WedPlanUtils.escapeHtml(user.partner1 || 'Sophia')} (Bride)</option>
                  <option value="${WedPlanUtils.escapeHtml(user.partner2 || 'Alexander Wright')}">${WedPlanUtils.escapeHtml(user.partner2 || 'Alexander')} (Groom)</option>
                  <option value="Amelia Thorne">Amelia Thorne (Maid of Honor)</option>
                  <option value="Seraphina Events">Wedding Coordinator</option>
                </select>
              </div>

              <div class="msg-text-input-row">
                <textarea 
                  id="msg-input-textarea" 
                  rows="2" 
                  placeholder="Type a message or update to #${currentChannelObj.name}..."
                  onkeydown="MessagesView.handleKeyDown(event)"></textarea>
                <button class="btn btn-primary" onclick="MessagesView.sendMessage()">
                  <i class="fa-solid fa-paper-plane"></i> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  switchChannel(chId) {
    this.activeChannel = chId;
    window.app.renderActiveView();
  },

  handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.sendMessage();
    }
  },

  sendMessage() {
    const textarea = document.getElementById("msg-input-textarea");
    const senderSelect = document.getElementById("msg-sender-select");
    if (!textarea || !textarea.value.trim()) return;

    const text = textarea.value.trim();
    const sender = senderSelect ? senderSelect.value : "Couple";
    let role = "Bride & Groom";
    if (sender.includes("Amelia")) role = "Maid of Honor";
    if (sender.includes("Coordinator") || sender.includes("Seraphina")) role = "Wedding Planner";

    window.store.addMessage(this.activeChannel, text, sender, role);
    WedPlanUtils.showToast("Message posted!", "success");
    textarea.value = "";
    window.app.renderActiveView();

    // Scroll chat to bottom
    setTimeout(() => {
      const stream = document.getElementById("chat-stream");
      if (stream) stream.scrollTop = stream.scrollHeight;
    }, 100);
  }
};

if (typeof window !== "undefined") {
  window.MessagesView = MessagesView;
}
