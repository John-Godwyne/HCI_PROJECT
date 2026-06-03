/**
 * UnityHub — shared stroke icons for sidebar, topbar, and chrome
 */
(function (global) {
  'use strict';

  const s = 'fill="none" stroke="currentColor" stroke-width="2"';

  global.UnityHubIcons = {
    menu: `<svg width="24" height="24" viewBox="0 0 24 24" ${s} aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    search: `<svg viewBox="0 0 24 24" ${s} aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
    bell: `<svg width="22" height="22" viewBox="0 0 24 24" ${s} aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    bellNav: `<svg viewBox="0 0 24 24" ${s} aria-hidden="true"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
    logout: `<svg width="20" height="20" viewBox="0 0 24 24" ${s} aria-hidden="true"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>`,
    logo: `<svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#E8EAF6"/><circle cx="16" cy="20" r="6" fill="#3F51B5"/><circle cx="32" cy="20" r="6" fill="#5C6BC0"/><circle cx="24" cy="32" r="6" fill="#7986CB"/></svg>`,
    SEARCH_PLACEHOLDER: 'Search for events, organizations, or resources...',
  };
})(typeof window !== 'undefined' ? window : globalThis);
