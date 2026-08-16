/**
 * cURL Man Page Options Explorer Component
 * Searchable, categorised catalog for all 280+ cURL command-line flags.
 * Includes complete official docs, structured choice selectors, and collapsible details.
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
      this.expandedDocs = new Set(); // Track which flag docs are expanded

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
              <input type="text" id="flags-search-input" class="flags-search-input" placeholder="搜索 280+ cURL 参数 (如: timeout, proxy, -k, --location, ssl, ech)...">
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
        const isDocExpanded = this.expandedDocs.has(flagId);

        const card = document.createElement('div');
        card.className = `flag-card ${isActive ? 'active' : ''}`;
        card.id = `flag-card-${flagId}`;

        // 1. Header: Badge + Label + Toggle
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

        // 2. Summary / Description
        const summaryEl = document.createElement('div');
        summaryEl.className = 'flag-card-summary';
        summaryEl.textContent = flag.summary || flag.description;
        card.appendChild(summaryEl);

        let valInput = null;
        let choicePillsWrap = null;

        // 3. Choices Section (if flag has predefined options like --ech, --tls-max, etc.)
        if (flag.choices && flag.choices.length > 0) {
          const choicesSec = document.createElement('div');
          choicesSec.className = 'flag-choices-section';

          const choicesHeader = document.createElement('div');
          choicesHeader.className = 'flag-choices-header';
          choicesHeader.innerHTML = `<span>可选项 (Allowed Values):</span>`;
          choicesSec.appendChild(choicesHeader);

          choicePillsWrap = document.createElement('div');
          choicePillsWrap.className = 'flag-choices-pills';

          flag.choices.forEach(choice => {
            const pill = document.createElement('button');
            pill.type = 'button';
            pill.className = `flag-choice-pill ${String(currentVal) === String(choice.value) ? 'selected' : ''}`;
            pill.textContent = choice.value;
            pill.title = choice.desc || choice.value;

            pill.addEventListener('click', () => {
              // Select this choice
              const val = choice.value;
              if (valInput) {
                valInput.value = val;
                valInput.disabled = false;
              }
              checkbox.checked = true;
              card.classList.add('active');

              // Update active state on all pills in this card
              choicePillsWrap.querySelectorAll('.flag-choice-pill').forEach(p => p.classList.remove('selected'));
              pill.classList.add('selected');

              this.store.toggleFlag(flag, true, val);
            });

            choicePillsWrap.appendChild(pill);
          });

          choicesSec.appendChild(choicePillsWrap);
          card.appendChild(choicesSec);
        }

        // 4. Value Input (if takes argument / not boolean)
        if (flag.type !== 'boolean') {
          const inputGroup = document.createElement('div');
          inputGroup.className = 'flag-input-group';

          valInput = document.createElement('input');
          valInput.type = flag.type === 'number' ? 'number' : 'text';
          valInput.className = 'flag-val-input';
          valInput.placeholder = flag.choices && flag.choices.length > 0
            ? `选择上方可选项或输入自定义值 ${flag.arg || ''}`
            : `参数值 ${flag.arg || ''} (例如: ${flag.type === 'number' ? '10' : 'value'})`;
          valInput.value = currentVal;
          valInput.disabled = !isActive;

          valInput.addEventListener('input', () => {
            const v = valInput.value;
            if (choicePillsWrap) {
              choicePillsWrap.querySelectorAll('.flag-choice-pill').forEach(p => {
                p.classList.toggle('selected', p.textContent === v);
              });
            }
            this.store.setFlagValue(flagId, v);
          });

          inputGroup.appendChild(valInput);
          card.appendChild(inputGroup);

          checkbox.addEventListener('change', () => {
            const checked = checkbox.checked;
            valInput.disabled = !checked;
            card.classList.toggle('active', checked);
            this.store.toggleFlag(flag, checked, valInput.value);
            if (checked && !valInput.value) {
              // If has choices, default to first choice or focus input
              if (flag.choices && flag.choices.length > 0) {
                valInput.value = flag.choices[0].value;
                if (choicePillsWrap) {
                  const firstPill = choicePillsWrap.querySelector('.flag-choice-pill');
                  if (firstPill) firstPill.classList.add('selected');
                }
                this.store.setFlagValue(flagId, valInput.value);
              } else {
                valInput.focus();
              }
            }
          });
        } else {
          checkbox.addEventListener('change', () => {
            const checked = checkbox.checked;
            card.classList.toggle('active', checked);
            this.store.toggleFlag(flag, checked);
          });
        }

        // 5. Collapsible Documentation Details Section
        const hasDetailedDoc = (flag.description && flag.description.length > 100) ||
                               (flag.choices && flag.choices.length > 0) ||
                               (flag.examples && flag.examples.length > 0) ||
                               flag.addedIn ||
                               (flag.seeAlso && flag.seeAlso.length > 0);

        if (hasDetailedDoc) {
          const docToggleWrap = document.createElement('div');
          docToggleWrap.className = 'flag-doc-toggle-wrap';

          const docToggleBtn = document.createElement('button');
          docToggleBtn.type = 'button';
          docToggleBtn.className = `flag-doc-toggle-btn ${isDocExpanded ? 'expanded' : ''}`;
          docToggleBtn.innerHTML = `
            <span class="flag-doc-toggle-icon">${isDocExpanded ? '▾' : '▸'}</span>
            <span class="flag-doc-toggle-text">${isDocExpanded ? '收起官方文档' : '展开官方文档详情'}</span>
          `;

          const fullDocSec = document.createElement('div');
          fullDocSec.className = 'flag-full-doc';
          fullDocSec.style.display = isDocExpanded ? 'flex' : 'none';

          // Choices details list (descriptions of each allowed choice)
          if (flag.choices && flag.choices.length > 0) {
            const choicesList = document.createElement('div');
            choicesList.className = 'flag-choices-list';
            choicesList.innerHTML = `<div style="font-weight:600; font-size:12px; margin-bottom:4px; color:var(--text-primary);">各选项功能详解：</div>` +
              flag.choices.map(c => `
                <div class="flag-choice-item">
                  <code class="flag-choice-code">${c.value}</code>: ${c.desc || '（无额外说明）'}
                </div>
              `).join('');
            fullDocSec.appendChild(choicesList);
          }

          // Full Description
          if (flag.description) {
            const docBody = document.createElement('div');
            docBody.className = 'flag-doc-text';
            docBody.textContent = flag.description;
            fullDocSec.appendChild(docBody);
          }

          // Examples
          if (flag.examples && flag.examples.length > 0) {
            const exTitle = document.createElement('div');
            exTitle.style.cssText = 'font-weight: 600; font-size: 12px; color: var(--text-primary); margin-top: 4px;';
            exTitle.textContent = '使用示例 (Examples):';
            fullDocSec.appendChild(exTitle);

            flag.examples.forEach(ex => {
              const exBlock = document.createElement('pre');
              exBlock.className = 'flag-doc-example';
              exBlock.textContent = ex;
              fullDocSec.appendChild(exBlock);
            });
          }

          // Meta Info
          const metaWrap = document.createElement('div');
          metaWrap.className = 'flag-doc-meta';
          if (flag.addedIn) {
            const addedSpan = document.createElement('span');
            addedSpan.className = 'flag-doc-meta-badge';
            addedSpan.textContent = `引入版本: curl ${flag.addedIn}`;
            metaWrap.appendChild(addedSpan);
          }
          if (flag.seeAlso && flag.seeAlso.length > 0) {
            const seeSpan = document.createElement('span');
            seeSpan.className = 'flag-doc-meta-badge';
            seeSpan.textContent = `相关参数: ${flag.seeAlso.join(', ')}`;
            metaWrap.appendChild(seeSpan);
          }
          if (metaWrap.children.length > 0) {
            fullDocSec.appendChild(metaWrap);
          }

          docToggleBtn.addEventListener('click', () => {
            const currentlyExpanded = this.expandedDocs.has(flagId);
            if (currentlyExpanded) {
              this.expandedDocs.delete(flagId);
              fullDocSec.style.display = 'none';
              docToggleBtn.classList.remove('expanded');
              docToggleBtn.querySelector('.flag-doc-toggle-icon').textContent = '▸';
              docToggleBtn.querySelector('.flag-doc-toggle-text').textContent = '展开官方文档详情';
            } else {
              this.expandedDocs.add(flagId);
              fullDocSec.style.display = 'flex';
              docToggleBtn.classList.add('expanded');
              docToggleBtn.querySelector('.flag-doc-toggle-icon').textContent = '▾';
              docToggleBtn.querySelector('.flag-doc-toggle-text').textContent = '收起官方文档';
            }
          });

          docToggleWrap.appendChild(docToggleBtn);
          card.appendChild(docToggleWrap);
          card.appendChild(fullDocSec);
        }

        this.cardsGrid.appendChild(card);
      });
    }

    syncWithState(state) {
      const activeFlags = state.activeFlags || {};
      const activeCount = Object.keys(activeFlags).length;
      if (this.activeStat) {
        this.activeStat.textContent = activeCount > 0 ? `已启用 ${activeCount} 项参数` : '';
      }
    }
  }

  return FlagsExplorer;
}));
