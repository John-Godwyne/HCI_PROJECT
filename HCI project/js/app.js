/**
 * UnityHub — Shared UI interactions + localStorage integration
 */

(function () {
  'use strict';

  const PUBLIC_PAGES = ['landing.html', 'login.html', 'signup.html'];
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const isPublicPage = PUBLIC_PAGES.includes(page);

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

  // Mark active nav from current page
  document.querySelectorAll('.nav-item').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

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
