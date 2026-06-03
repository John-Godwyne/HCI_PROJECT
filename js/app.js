/**
 * UnityHub — Shared UI interactions + localStorage integration
 */

(function () {
  'use strict';

  const PUBLIC_PAGES = ['landing.html', 'login.html', 'signup.html'];
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isPublicPage = PUBLIC_PAGES.includes(page);

  const SIDEBAR_ACTIVE_BY_PAGE = {
    'index.html': 'dashboard',
    'events.html': 'events',
    'event-detail.html': 'events',
    'resources.html': 'resources',
    'resource-detail.html': 'resources',
    'organization.html': 'organizations',
    'notifications.html': 'notifications',
    'profile.html': 'profile',
    'settings.html': 'settings',
  };

  const SIDEBAR_NAV_ITEMS = [
    {
      key: 'dashboard',
      href: 'index.html',
      label: 'Dashboard',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    },
    {
      key: 'events',
      href: 'events.html',
      label: 'Events',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    },
    {
      key: 'resources',
      href: 'resources.html',
      label: 'Resources',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>',
    },
    {
      key: 'organizations',
      href: 'organization.html',
      label: 'Organizations',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
    },
    {
      key: 'messages',
      href: '#',
      label: 'Messages',
      extraClass: 'nav-item-messages',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    },
    {
      key: 'notifications',
      href: 'notifications.html',
      label: 'Notifications',
      icon:
        (window.UnityHubIcons && UnityHubIcons.bellNav) ||
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
    },
    {
      key: 'profile',
      href: 'profile.html',
      label: 'Profile',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    },
    {
      key: 'settings',
      href: 'settings.html',
      label: 'Settings',
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
    },
  ];

  function initSidebarNav() {
    if (isPublicPage) return;
    const nav = document.querySelector('.sidebar-nav');
    if (!nav) return;
    const activeKey = SIDEBAR_ACTIVE_BY_PAGE[page] || '';
    nav.innerHTML = SIDEBAR_NAV_ITEMS.map((item) => {
      const isActive = item.key === activeKey;
      const classes = ['nav-item', item.extraClass, isActive ? 'active' : ''].filter(Boolean).join(' ');
      const aria = isActive ? ' aria-current="page"' : '';
      return `<a href="${item.href}" class="${classes}"${aria}>${item.icon} ${item.label}</a>`;
    }).join('');
  }

  function initAppChrome() {
    if (isPublicPage || !window.UnityHubIcons) return;
    const icons = UnityHubIcons;

    const logoWrap = document.querySelector('.sidebar-logo');
    if (logoWrap) {
      const label = logoWrap.querySelector(':scope > div');
      if (label) logoWrap.innerHTML = icons.logo + label.outerHTML;
    }

    document.querySelectorAll('.btn-logout').forEach((btn) => {
      const label = btn.textContent.replace(/\s+/g, ' ').trim() || 'Logout';
      btn.innerHTML = `${icons.logout} ${label}`;
    });

    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    const menuToggle = topbar.querySelector('.menu-toggle');
    if (menuToggle) {
      menuToggle.innerHTML = icons.menu;
      menuToggle.setAttribute('aria-label', 'Open menu');
    }

    const searchBar = topbar.querySelector('.search-bar');
    if (searchBar) {
      const input = searchBar.querySelector('input[type="search"]');
      if (input) {
        if (!input.id) input.id = 'global-search';
        input.placeholder = icons.SEARCH_PLACEHOLDER;
        input.setAttribute('aria-label', 'Global search');
      }
      const searchSvg = searchBar.querySelector('svg');
      if (searchSvg) searchSvg.outerHTML = icons.search;
      else if (input) input.insertAdjacentHTML('beforebegin', icons.search);
    }

    const actions = topbar.querySelector('.topbar-actions');
    if (actions) {
      let notifLink = actions.querySelector('a[href*="notifications"]');
      if (!notifLink) {
        notifLink = document.createElement('a');
        actions.insertBefore(notifLink, actions.firstChild);
      }
      notifLink.href = 'notifications.html';
      notifLink.className = 'btn-icon';
      notifLink.setAttribute('aria-label', 'Notifications');
      notifLink.innerHTML = `${icons.bell}<span class="notification-dot" aria-hidden="true"></span>`;

      let profile = actions.querySelector('.user-profile');
      if (profile?.tagName === 'DIV') {
        const link = document.createElement('a');
        link.href = 'profile.html';
        link.className = 'user-profile';
        link.innerHTML = profile.innerHTML;
        profile.replaceWith(link);
        profile = link;
      }
      if (profile) {
        profile.removeAttribute('style');
        if (profile.tagName === 'A') profile.href = 'profile.html';
      }
    }
  }

  function wireEventDetailLinks() {
    if (!window.UnityHubEvents) return;
    document.querySelectorAll('[data-event-id]').forEach((el) => {
      const id = el.dataset.eventId;
      if (!id) return;
      const url = UnityHubEvents.detailUrl(id);
      el.querySelectorAll('a[href="event-detail.html"], a[href^="event-detail.html"]').forEach((link) => {
        link.href = url;
      });
    });
  }

  function initEventDetailPage() {
    if (page !== 'event-detail.html' || !window.UnityHubEvents) return;

    const params = new URLSearchParams(window.location.search);
    const eventId = params.get('id') || document.body.dataset.eventId || UnityHubEvents.defaultId;
    const event = UnityHubEvents.getEvent(eventId);
    if (!event) return;

    document.body.dataset.eventId = eventId;
    document.title = `${event.title} | UnityHub`;

    const heroImg = document.querySelector('.detail-hero-wrap img');
    if (heroImg) {
      heroImg.src = event.image;
      heroImg.alt = event.imageAlt;
    }

    const tagEl = document.querySelector('.detail-content .tag');
    if (tagEl) {
      tagEl.textContent = event.tag;
      tagEl.className = `tag ${event.tagClass}`;
    }

    const titleEl = document.querySelector('.detail-content h1');
    if (titleEl) titleEl.textContent = event.title;

    const sections = document.querySelectorAll('.detail-content .detail-section');
    const aboutP = sections[0]?.querySelector('p');
    if (aboutP) aboutP.textContent = event.about;

    const bringList = sections[1]?.querySelector('ul');
    if (bringList && event.bring) {
      bringList.innerHTML = event.bring.map((item) => `<li>${item}</li>`).join('');
    }

    const reqP = sections[2]?.querySelector('p');
    if (reqP) reqP.textContent = event.requirements;

    const meta = document.querySelector('.detail-meta');
    if (meta) {
      meta.innerHTML = [
        `<span>📅 ${event.date}</span>`,
        `<span>🕐 ${event.time}</span>`,
        `<span>📍 ${event.location}</span>`,
        `<span>👥 ${event.participants}</span>`,
      ].join('');
    }

    const organizerName = document.querySelector('.organizer-box strong a');
    if (organizerName) organizerName.textContent = event.organizer;
  }

  if (!isPublicPage) {
    initSidebarNav();
    initAppChrome();
    wireEventDetailLinks();
    initEventDetailPage();
  }

  // Auth guard + dynamic user display
  if (window.UH && !isPublicPage) {
    UH.requireAuth();
    const user = UH.getCurrentUser();
    if (user) {
      const nameEl = document.querySelector('.user-name');
      const roleEl = document.querySelector('.user-role');
      const avatarEl = document.querySelector('.user-avatar');
      if (nameEl) nameEl.textContent = user.name;
      if (roleEl) roleEl.textContent = user.role;
      if (avatarEl) {
        avatarEl.src = user.avatar;
        avatarEl.alt = user.name + ' avatar';
      }
      updateNotificationDot();
      if (window.UnityHubUI?.updateDashboardGreeting) {
        UnityHubUI.updateDashboardGreeting();
      }
    }
  }

  function updateNotificationDot() {
    if (!window.UH) return;
    const count = UH.getUnreadCount();
    document.querySelectorAll('.notification-dot').forEach((dot) => {
      dot.textContent = count > 0 ? (count > 9 ? '9+' : count) : '';
      dot.style.display = count > 0 ? 'flex' : 'none';
    });
  }

  window.UnityHub = window.UnityHub || {};
  window.UnityHub.updateNotificationDot = updateNotificationDot;

  // Logout
  document.querySelectorAll('.btn-logout').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.UH) UH.logout();
    });
  });

  // Messages nav
  document.querySelectorAll('.nav-item-messages').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Messages — coming in full version');
    });
  });

  // Mobile sidebar toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay?.classList.toggle('open');
    });
    overlay?.addEventListener('click', () => {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Event filter chips
  document.querySelectorAll('.filters-row').forEach((row) => {
    row.querySelectorAll('.filter-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        row.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
        chip.classList.add('active');
        const category = chip.dataset.filter || 'all';
        filterEvents(category);
      });
    });
  });

  function filterEvents(category) {
    const q = (document.querySelector('#events-search')?.value || '').toLowerCase();
    document.querySelectorAll('.event-list-item').forEach((item) => {
      const cat = item.dataset.category;
      const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
      const matchCat = category === 'all' || cat === category;
      const matchSearch = !q || title.includes(q);
      item.style.display = matchCat && matchSearch ? '' : 'none';
    });
    updateEventsEmptyState();
  }

  function updateEventsEmptyState() {
    const list = document.querySelector('.events-list');
    const empty = document.getElementById('events-empty');
    if (!list || !empty) return;
    const visible = [...list.querySelectorAll('.event-list-item')].filter((el) => el.style.display !== 'none');
    empty.style.display = visible.length === 0 ? 'block' : 'none';
  }

  function updateResourcesEmptyState() {
    const grid = document.querySelector('.resources-grid');
    const empty = document.getElementById('resources-empty');
    if (!grid || !empty) return;
    const visible = [...grid.querySelectorAll('.resource-card')].filter((el) => el.style.display !== 'none');
    empty.style.display = visible.length === 0 ? 'block' : 'none';
  }

  // Events search
  const eventsSearch = document.querySelector('#events-search');
  if (eventsSearch) {
    eventsSearch.addEventListener('input', () => {
      const active = document.querySelector('.filter-chip.active');
      filterEvents(active?.dataset.filter || 'all');
    });
  }

  // Resources search & category
  const resourceSearch = document.querySelector('#resource-search');
  const resourceCategory = document.querySelector('#resource-category');

  function filterResources() {
    const q = (resourceSearch?.value || '').toLowerCase();
    const cat = resourceCategory?.value || 'all';
    document.querySelectorAll('.resource-card').forEach((card) => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const cardCat = card.dataset.category || '';
      const matchQ = !q || title.includes(q);
      const matchCat = cat === 'all' || cardCat === cat;
      card.style.display = matchQ && matchCat ? '' : 'none';
    });
    updateResourcesEmptyState();
  }

  resourceSearch?.addEventListener('input', filterResources);
  resourceCategory?.addEventListener('change', filterResources);

  // Global search
  const globalSearch = document.querySelector('#global-search');
  if (globalSearch) {
    globalSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const q = e.target.value.trim();
        if (q) window.location.href = `events.html?q=${encodeURIComponent(q)}`;
      }
    });
  }

  // ── Events registration (events.html) ─────────────
  let pendingEventId = null;
  let pendingEventName = null;

  function renderEventRegistrationState() {
    if (!window.UH) return;

    document.querySelectorAll('.event-card[data-event-id]').forEach((card) => {
      const eventId = card.dataset.eventId;
      const footer = card.querySelector('.event-card-footer');
      if (!footer) return;
      const registerBtn = footer.querySelector('[data-action="register"]');
      let badge = footer.querySelector('.badge-registered');

      if (UH.isRegistered(eventId)) {
        if (registerBtn) registerBtn.remove();
        if (!badge) {
          badge = document.createElement('span');
          badge.className = 'badge badge-registered';
          badge.textContent = 'Registered';
          footer.insertBefore(badge, footer.firstChild);
        }
      } else {
        if (badge) badge.remove();
        if (!footer.querySelector('[data-action="register"]')) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-primary btn-sm';
        btn.dataset.action = 'register';
        btn.textContent = 'Register';
        footer.insertBefore(btn, footer.firstChild);
        }
      }
    });

    document.querySelectorAll('.event-list-item[data-event-id]').forEach((item) => {
      const eventId = item.dataset.eventId;
      const actions = item.querySelector('.event-list-actions');
      if (!actions) return;

      const existingBtn = actions.querySelector('[data-action="register"]');
      const existingBadge = actions.querySelector('.badge-registered');

      if (UH.isRegistered(eventId)) {
        if (existingBtn) existingBtn.remove();
        if (!existingBadge) {
          const badge = document.createElement('span');
          badge.className = 'badge badge-registered';
          badge.textContent = 'Registered';
          actions.insertBefore(badge, actions.firstChild);
        }
      } else {
        if (existingBadge) existingBadge.remove();
        if (!existingBtn) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'btn btn-primary btn-sm';
          btn.dataset.action = 'register';
          btn.textContent = 'Register';
          actions.insertBefore(btn, actions.firstChild);
        }
      }
    });
  }

  function bindRegisterButtons() {
    document.querySelectorAll('[data-action="register"]:not([data-register-bound])').forEach((btn) => {
      btn.dataset.registerBound = '1';
      btn.addEventListener('click', onRegisterClick);
    });
  }

  function onRegisterClick() {
    const btn = this;
    const item = btn.closest('.event-list-item');
    if (item) {
      pendingEventId = item.dataset.eventId;
      pendingEventName = item.dataset.eventName || item.querySelector('h3')?.textContent?.trim();
    } else {
      const card = btn.closest('[data-event-id]');
      pendingEventId = card?.dataset.eventId || document.body.dataset.eventId || 'event-coastal';
      pendingEventName =
        card?.querySelector('h3')?.textContent?.trim() ||
        document.querySelector('.detail-content h1, h1')?.textContent?.trim();
    }
    openModal('register');
  }

  renderEventRegistrationState();
  bindRegisterButtons();

  function updateEventDetailButton() {
    const eventId = document.body.dataset.eventId;
    if (!eventId || !window.UH) return;
    document.querySelectorAll('[data-action="register"]').forEach((btn) => {
      if (btn.closest('.event-list-item')) return;
      if (UH.isRegistered(eventId)) {
        btn.textContent = 'Registered ✓';
        btn.disabled = true;
        btn.classList.add('registered', 'btn-outline');
        btn.classList.remove('btn-primary');
      } else {
        btn.textContent = 'Register Now';
        btn.disabled = false;
        btn.classList.remove('registered', 'btn-outline');
        btn.classList.add('btn-primary');
      }
    });
  }

  updateEventDetailButton();

  // ── Resource bookmarks ────────────────────────────
  function initBookmarks() {
    if (!window.UH) return;
    document.querySelectorAll('.resource-card[data-resource-id]').forEach((card) => {
      const id = card.dataset.resourceId;
      const btn = card.querySelector('.bookmark-btn');
      if (btn && UH.isSaved(id)) btn.classList.add('saved');
    });
  }

  initBookmarks();

  document.querySelectorAll('.bookmark-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('[data-resource-id]');
      const id = card?.dataset.resourceId;
      if (!id || !window.UH) return;
      const nowSaved = UH.toggleSaved(id);
      btn.classList.toggle('saved', nowSaved);
      showToast(nowSaved ? 'Resource saved to your list' : 'Removed from saved');
    });
  });

  // ── Resource borrow (resource-detail) ─────────────
  const resourceDetailId = document.body.dataset.resourceId || 'res-projector';

  function updateBorrowButtonState() {
    if (!window.UH || !document.body.dataset.resourceId) return;
    const resId = document.body.dataset.resourceId;
    document.querySelectorAll('[data-action="borrow"]').forEach((btn) => {
      if (UH.hasBorrowRequest(resId)) {
        btn.textContent = 'Request Pending';
        btn.disabled = true;
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
      }
    });
  }

  updateBorrowButtonState();


  document.querySelectorAll('[data-action="borrow"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      openModal('borrow');
    });
  });

  document.querySelectorAll('[data-action="message"]').forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Message feature coming soon — use organization contact for now.');
    });
  });

  // Organization tabs
  document.querySelectorAll('.tabs').forEach((tabBar) => {
    tabBar.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const panelId = tab.dataset.tab;
        tabBar.querySelectorAll('.tab').forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        const container = tabBar.closest('.org-profile') || document;
        container.querySelectorAll('.tab-panel').forEach((panel) => {
          panel.classList.toggle('active', panel.id === panelId);
        });
      });
    });
  });

  // Modal
  const modalOverlay = document.getElementById('modal-overlay');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalConfirm = document.getElementById('modal-confirm');
  const modalCancel = document.getElementById('modal-cancel');

  const modalCopy = {
    register: {
      title: 'Confirm Registration',
      body: 'You are about to register for this event. You will receive a reminder notification before the event date.',
    },
    borrow: {
      title: 'Request to Borrow',
      body: 'Your request will be sent to the organization. They will contact you to arrange pickup and return dates.',
    },
  };

  let pendingAction = null;

  function openModal(type) {
    pendingAction = type;
    const copy = modalCopy[type];
    if (modalTitle) modalTitle.textContent = copy.title;
    if (modalBody) modalBody.textContent = copy.body;
    modalOverlay?.classList.add('open');
    modalOverlay?.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modalOverlay?.classList.remove('open');
    modalOverlay?.setAttribute('aria-hidden', 'true');
    pendingAction = null;
  }

  modalCancel?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  modalConfirm?.addEventListener('click', () => {
    if (pendingAction === 'register' && window.UH && pendingEventId) {
      UH.register(pendingEventId);
      UH.addNotification({
        icon: '✅',
        title: 'Registered!',
        body: 'You joined ' + (pendingEventName || 'the event'),
        time: 'Just now',
      });
      showToast('Successfully registered! Check your notifications for reminders.', 'success');
      renderEventRegistrationState();
      bindRegisterButtons();
      updateEventDetailButton();
      updateNotificationDot();
    } else if (pendingAction === 'borrow' && window.UH) {
      const resId = document.body.dataset.resourceId || 'res-projector';
      UH.addBorrowRequest({
        id: Date.now().toString(),
        resourceId: resId,
        resourceName: document.querySelector('.detail-content h1, h1')?.textContent?.trim() || 'HD Projector',
        org: 'IT Society',
        requestedAt: new Date().toLocaleDateString(),
        status: 'pending',
      });
      UH.addNotification({
        icon: '📦',
        title: 'Borrow request submitted',
        body: 'Your request was sent. The organization will respond within 48 hours.',
        time: 'Just now',
      });
      showToast('Borrow request submitted. The organization will respond soon.', 'success');
      updateBorrowButtonState();
      updateNotificationDot();
    }
    closeModal();
  });

  function showToast(message, type = 'default') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('role', 'status');
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast${type === 'success' ? ' success' : ''}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  window.UnityHub.showToast = showToast;
  window.UnityHub.openModal = openModal;
  window.UnityHub.closeModal = closeModal;

  const params = new URLSearchParams(window.location.search);
  const searchQ = params.get('q');
  if (searchQ && eventsSearch) {
    eventsSearch.value = searchQ;
    eventsSearch.dispatchEvent(new Event('input'));
  }

  updateEventsEmptyState();
  updateResourcesEmptyState();
})();
