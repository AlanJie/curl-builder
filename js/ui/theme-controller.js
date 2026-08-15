/**
 * Theme Controller
 * Handles Dark / Light theme switching with localStorage persistence
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThemeController = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const STORAGE_KEY = 'curl_builder_theme';

  class ThemeController {
    constructor(toggleBtnId) {
      this.toggleBtn = document.getElementById(toggleBtnId);
      this.currentTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
      this.init();
    }

    init() {
      this.applyTheme(this.currentTheme);

      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => {
          const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
          this.applyTheme(nextTheme);
        });
      }
    }

    applyTheme(theme) {
      this.currentTheme = theme;
      localStorage.setItem(STORAGE_KEY, theme);

      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      if (this.toggleBtn) {
        this.toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        this.toggleBtn.title = theme === 'dark' ? '切换为明亮模式' : '切换为暗色模式';
      }
    }
  }

  return ThemeController;
}));
