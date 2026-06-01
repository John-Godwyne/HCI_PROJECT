/**
 * UnityHub UI enhancements — image fallbacks, skeletons, dashboard greeting
 * Preserves all existing app.js behavior; load after storage.js, before app.js
 */
(function () {
  'use strict';

  const PLACEHOLDER =
    'data:image/svg+xml,' +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="#EEF2FF" width="400" height="300"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8892A4" font-family="system-ui,sans-serif" font-size="14">UnityHub</text></svg>'
    );

  function initImageFallbacks() {
    document.querySelectorAll('img').forEach((img) => {
      if (img.dataset.fallbackBound) return;
      img.dataset.fallbackBound = '1';
      img.addEventListener('error', function onErr() {
        if (this.dataset.fallbackApplied) return;
        this.dataset.fallbackApplied = '1';
        this.src = PLACEHOLDER;
        this.classList.add('img-fallback');
      });
      if (img.complete && img.naturalWidth === 0 && img.src) {
        img.dispatchEvent(new Event('error'));
      }
    });
  }

  function showPageSkeleton() {
    const main = document.querySelector('.main-content');
    if (!main || main.dataset.skeletonDone) return;
    if (document.body.classList.contains('auth-page')) return;

    const hasContent =
      main.querySelector('.event-card, .event-list-item, .resource-card, .dashboard-hero, .page-header');
    if (!hasContent) return;

    main.classList.add('page-loading');
    const overlay = document.createElement('div');
    overlay.className = 'skeleton-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.innerHTML =
      '<div class="skeleton-grid">' +
      '<div class="skeleton skeleton-hero"></div>' +
      '<div class="skeleton skeleton-card"></div>' +
      '<div class="skeleton skeleton-card"></div>' +
      '<div class="skeleton skeleton-card"></div>' +
      '</div>';

    main.style.position = 'relative';
    main.appendChild(overlay);

    requestAnimationFrame(() => {
      setTimeout(() => {
        overlay.classList.add('skeleton-fade-out');
        main.classList.remove('page-loading');
        setTimeout(() => {
          overlay.remove();
          main.dataset.skeletonDone = '1';
        }, 350);
      }, 380);
    });
  }

  function updateDashboardGreeting() {
    const title = document.getElementById('dashboard-greeting');
    if (!title || !window.UH) return;

    const user = UH.getCurrentUser();
    const first = (user && user.name && user.name.split(' ')[0]) || 'Volunteer';
    title.textContent = 'Hello, ' + first + '! 👋';

    const eventsEl = document.getElementById('impact-events-count');
    const savedEl = document.getElementById('impact-resources-count');
    const orgsEl = document.getElementById('impact-orgs-count');

    if (eventsEl) eventsEl.textContent = String(UH.getRegistrations().length || 0);
    if (savedEl) savedEl.textContent = String(UH.getSaved().length || 0);
    if (orgsEl) orgsEl.textContent = '3';
  }

  function enhanceEmptyStates() {
    const configs = {
      'events-empty': {
        icon: '📅',
        title: 'No Events Found',
        text: 'Try different filters or search terms to discover community activities.',
        cta: { href: 'events.html', label: 'Browse all events' },
      },
      'resources-empty': {
        icon: '📦',
        title: 'No Resources Available',
        text: 'No resources match your search. Try another category or clear filters.',
        cta: { href: 'resources.html', label: 'View all resources' },
      },
    };

    Object.keys(configs).forEach((id) => {
      const el = document.getElementById(id);
      if (!el || el.dataset.enhanced) return;
      const c = configs[id];
      el.dataset.enhanced = '1';
      el.classList.add('empty-state');
      el.innerHTML =
        '<div class="empty-state-icon" aria-hidden="true">' +
        c.icon +
        '</div>' +
        '<h3>' +
        c.title +
        '</h3>' +
        '<p>' +
        c.text +
        '</p>' +
        '<div class="empty-state-actions"><a href="' +
        c.cta.href +
        '" class="btn btn-primary">' +
        c.cta.label +
        '</a></div>';
    });
  }

  function boot() {
    initImageFallbacks();
    showPageSkeleton();
    enhanceEmptyStates();
    updateDashboardGreeting();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  window.UnityHubUI = {
    initImageFallbacks,
    updateDashboardGreeting,
    PLACEHOLDER,
  };
})();
