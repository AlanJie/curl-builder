/**
 * cURL Man Page Options Explorer Component
 * Searchable, categorised catalog for all 280+ cURL command-line flags.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.FlagsExplorer = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class FlagsExplorer {
    constructor(options) {
      this.container = options.container;
      this.store = options.store;
      this.flagsData = options.flagsData;
      this.currentCategory = 'all';
      this.searchQuery = '';

      this.init();
    }

    init() {
      this.render();
      this.bindEvents();
    }

    render() {
      const categories = this.flagsData.CATEGORIES;

      this.container.innerHTML = `
        <div class="flags-explorer-root">
          <!-- Search Bar -->
          <div class="flags-search-bar">
            <div class="flags-search-input-wrap">
              <span class="flags-search-icon">🔍</span>
              <input type="text" id="flags-search-input" class="flags-search-input" placeholder="搜索 280+ cURL 参数 (如: timeout, proxy, -k, --location, ssl)...">
              <button type="button" id="flags-search-clear" class="flags-search-clear">✕</button>
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="flags-categories-wrap" id="flags-category-pills">
            ${Object.values(categories).map(cat => `
              <button type="button" class="flags-cat-pill ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
                <span>${cat.icon}</span>
                <span>${cat.name}</span>
              </button>
            `).join('')}
          </div>

          <!-- Stats Bar -->
          <div class="flags-stats-bar">
            <span id="flags-count-stat">正在检索...</span>
            <span id="flags-active-stat" style="color: var(--accent-primary); font-weight: 600;"></span>
          </div>

          <!-- Flags Grid -->
          <div class="flags-grid" id="flags-cards-grid"></div>
        </div>
      `;

      this.searchInput = this.container.querySelector('#flags-search-input');
      this.searchClearBtn = this.container.querySelector('#flags-search-clear');
      this.cardsGrid = this.container.querySelector('#flags-cards-grid');
      this.countStat = this.container.querySelector('#flags-count-stat');
      this.activeStat = this.container.querySelector('#flags-active-stat');

      this.renderCards();
    }

    bindEvents() {
      // Search input
      this.searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderCards();
      });

      // Clear search
      this.searchClearBtn.addEventListener('click', () => {
        this.searchInput.value = '';
        this.searchQuery = '';
        this.renderCards();
        this.searchInput.focus();
      });

      // Category pills
      const catPills = this.container.querySelectorAll('.flags-cat-pill');
      catPills.forEach(pill => {
        pill.addEventListener('click', () => {
          catPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.currentCategory = pill.dataset.cat;
          this.renderCards();
        });
      });
    }

    renderCards() {
      const filteredFlags = this.flagsData.searchFlags(this.searchQuery, this.currentCategory);
      const activeFlags = this.store.getState().activeFlags || {};
      const activeCount = Object.keys(activeFlags).length;

      this.countStat.textContent = `显示 ${filteredFlags.length} / ${this.flagsData.FLAGS.length} 个 cURL 参数`;
      this.activeStat.textContent = activeCount > 0 ? `已启用 ${activeCount} 项参数` : '';

      if (filteredFlags.length === 0) {
        this.cardsGrid.innerHTML = `
          <div style="padding: 40px; text-align: center; color: var(--text-muted);">
            未找到匹配的 cURL 参数，请尝试其他关键词
          </div>
        `;
        return;
      }

      this.cardsGrid.innerHTML = '';

      filteredFlags.forEach(flag => {
        const flagId = flag.id;
        const isActive = !!activeFlags[flagId];
        const activeConfig = activeFlags[flagId] || {};
        const currentVal = activeConfig.value !== undefined ? activeConfig.value : '';

        const card = document.createElement('div');
        card.className = `flag-card ${isActive ? 'active' : ''}`;
        card.id = `flag-card-${flagId}`;

        // Header: Badge + Label + Toggle
        const header = document.createElement('div');
        header.className = 'flag-card-header';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'flag-title-group';

        const nameBadge = document.createElement('span');
        nameBadge.className = 'flag-name-badge';
        nameBadge.textContent = flag.name;
        titleGroup.appendChild(nameBadge);

        if (flag.short) {
          const shortBadge = document.createElement('span');
          shortBadge.className = 'flag-short-badge';
          shortBadge.textContent = flag.short;
          titleGroup.appendChild(shortBadge);
        }

        const labelText = document.createElement('span');
        labelText.className = 'flag-label-text';
        labelText.textContent = flag.label;
        titleGroup.appendChild(labelText);

        // Switch Toggle
        const switchLabel = document.createElement('label');
        switchLabel.className = 'switch';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = isActive;

        const slider = document.createElement('span');
        slider.className = 'slider';

        switchLabel.appendChild(checkbox);
        switchLabel.appendChild(slider);

        header.appendChild(titleGroup);
        header.appendChild(switchLabel);
        card.appendChild(header);

        // Description
        const desc = document.createElement('div');
        desc.className = 'flag-card-desc';
        desc.textContent = flag.description;
        card.appendChild(desc);

        // Value Input if takes argument
        if (flag.type !== 'boolean') {
          const inputGroup = document.createElement('div');
          inputGroup.className = 'flag-input-group';

          const valInput = document.createElement('input');
          valInput.type = flag.type === 'number' ? 'number' : 'text';
          valInput.className = 'flag-val-input';
          valInput.placeholder = `参数值 ${flag.arg || ''} (例如: ${flag.type === 'number' ? '10' : 'value'})`;
          valInput.value = currentVal;
          valInput.disabled = !isActive;

          valInput.addEventListener('input', () => {
            this.store.setFlagValue(flagId, valInput.value);
          });

          inputGroup.appendChild(valInput);
          card.appendChild(inputGroup);

          checkbox.addEventListener('change', () => {
            const checked = checkbox.checked;
            valInput.disabled = !checked;
            card.classList.toggle('active', checked);
            this.store.toggleFlag(flag, checked, valInput.value);
            if (checked && !valInput.value) {
              valInput.focus();
            }
          });
        } else {
          checkbox.addEventListener('change', () => {
            const checked = checkbox.checked;
            card.classList.toggle('active', checked);
            this.store.toggleFlag(flag, checked);
          });
        }

        this.cardsGrid.appendChild(card);
      });
    }

    syncWithState(state) {
      // Re-evaluate active counters and card states if needed
      const activeFlags = state.activeFlags || {};
      const activeCount = Object.keys(activeFlags).length;
      if (this.activeStat) {
        this.activeStat.textContent = activeCount > 0 ? `已启用 ${activeCount} 项参数` : '';
      }
    }
  }

  return FlagsExplorer;
}));
