// UnityHub localStorage data layer
const UH = {

  // ── Auth ──────────────────────────────────────────
  getCurrentUser() {
    const u = localStorage.getItem('uh_user');
    return u ? JSON.parse(u) : null;
  },
  saveUser(user) {
    localStorage.setItem('uh_user', JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem('uh_user');
    window.location.href = 'login.html';
  },
  requireAuth() {
    if (!this.getCurrentUser()) window.location.href = 'login.html';
  },

  getAccounts() {
    return JSON.parse(localStorage.getItem('uh_accounts') || '[]');
  },
  saveAccounts(accounts) {
    localStorage.setItem('uh_accounts', JSON.stringify(accounts));
  },
  updateUser(updates) {
    const user = this.getCurrentUser();
    if (!user) return;
    const updated = { ...user, ...updates };
    this.saveUser(updated);
    const accounts = this.getAccounts();
    const idx = accounts.findIndex((a) => a.email === user.email);
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], name: updated.name, role: updated.role };
      this.saveAccounts(accounts);
    }
  },

  clearAllData() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('uh_')) localStorage.removeItem(key);
    });
  },

  // ── Registered Events ─────────────────────────────
  getRegistrations() {
    return JSON.parse(localStorage.getItem('uh_registrations') || '[]');
  },
  isRegistered(eventId) {
    return this.getRegistrations().includes(eventId);
  },
  register(eventId) {
    const list = this.getRegistrations();
    if (!list.includes(eventId)) {
      list.push(eventId);
      localStorage.setItem('uh_registrations', JSON.stringify(list));
    }
  },
  cancelRegistration(eventId) {
    const list = this.getRegistrations().filter((id) => id !== eventId);
    localStorage.setItem('uh_registrations', JSON.stringify(list));
  },

  // ── Borrow Requests ───────────────────────────────
  getBorrowRequests() {
    return JSON.parse(localStorage.getItem('uh_borrows') || '[]');
  },
  addBorrowRequest(request) {
    const list = this.getBorrowRequests();
    list.unshift(request);
    localStorage.setItem('uh_borrows', JSON.stringify(list));
  },
  hasBorrowRequest(resourceId) {
    return this.getBorrowRequests().some((r) => r.resourceId === resourceId && r.status === 'pending');
  },

  // ── Saved Resources ───────────────────────────────
  getSaved() {
    return JSON.parse(localStorage.getItem('uh_saved') || '[]');
  },
  toggleSaved(resourceId) {
    const list = this.getSaved();
    const idx = list.indexOf(resourceId);
    if (idx === -1) list.push(resourceId);
    else list.splice(idx, 1);
    localStorage.setItem('uh_saved', JSON.stringify(list));
    return idx === -1;
  },
  isSaved(resourceId) {
    return this.getSaved().includes(resourceId);
  },

  // ── Notifications ─────────────────────────────────
  getNotifications() {
    const defaults = [
      { id: 'n1', icon: '📅', title: 'Reminder: Coastal Clean-up', body: 'Your event starts in 2 days — don\'t forget gloves!', time: '2h ago', read: false },
      { id: 'n2', icon: '📦', title: 'Resource request approved', body: 'Music Society approved your sound system request.', time: '1d ago', read: false },
      { id: 'n3', icon: '🤝', title: 'New partnership invite', body: 'Eco Warriors invited you to collaborate on a tree planting project.', time: '3d ago', read: true },
    ];
    const stored = localStorage.getItem('uh_notifications');
    if (!stored) {
      localStorage.setItem('uh_notifications', JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(stored);
  },
  markAllRead() {
    const list = this.getNotifications().map((n) => ({ ...n, read: true }));
    localStorage.setItem('uh_notifications', JSON.stringify(list));
  },
  markNotificationRead(id) {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem('uh_notifications', JSON.stringify(list));
  },
  addNotification(notif) {
    const list = this.getNotifications();
    list.unshift({ id: 'n' + Date.now(), read: false, ...notif });
    localStorage.setItem('uh_notifications', JSON.stringify(list));
  },
  getUnreadCount() {
    return this.getNotifications().filter((n) => !n.read).length;
  },

  // ── Settings ──────────────────────────────────────
  getSettings() {
    const defaults = {
      emailEvents: true,
      eventReminders: true,
      resourceUpdates: true,
    };
    const stored = localStorage.getItem('uh_settings');
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults;
  },
  saveSettings(settings) {
    localStorage.setItem('uh_settings', JSON.stringify(settings));
  },
};

window.UH = UH;
