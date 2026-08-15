/**
 * Application Bootstrap & Coordinator
 * Connects reactive store, UI components, and global events.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Instantiate Core Store & Engine
  const store = new StateStore();
  const generator = CurlGenerator;
  const flagsData = CurlFlagsData;

  // 2. Initialize Theme Controller
  const themeController = new ThemeController('theme-toggle-btn');

  // Common Headers Autocompletions
  const COMMON_HEADERS = [
    'Accept',
    'Accept-Encoding',
    'Accept-Language',
    'Authorization',
    'Cache-Control',
    'Content-Type',
    'Cookie',
    'Host',
    'Origin',
    'Referer',
    'User-Agent',
    'X-Requested-With',
    'X-API-Key',
    'X-Forwarded-For'
  ];

  // 3. Initialize Top Bar Elements
  const methodSelect = document.getElementById('method-select');
  const urlInput = document.getElementById('url-input');
  const urlClearBtn = document.getElementById('url-clear-btn');
  const resetBtn = document.getElementById('reset-btn');
  const loadSampleBtn = document.getElementById('load-sample-btn');

  // Update method select styling
  function updateMethodColor(method) {
    methodSelect.setAttribute('data-method', method);
  }

  methodSelect.addEventListener('change', () => {
    const method = methodSelect.value;
    updateMethodColor(method);
    store.setMethod(method);
  });

  urlInput.addEventListener('input', () => {
    store.setUrl(urlInput.value);
  });

  urlClearBtn.addEventListener('click', () => {
    urlInput.value = '';
    store.setUrl('');
    urlInput.focus();
  });

  resetBtn.addEventListener('click', () => {
    if (confirm('确定要清空并重置所有请求配置吗？')) {
      store.reset();
    }
  });

  loadSampleBtn.addEventListener('click', () => {
    store.loadSample();
  });

  // 4. Initialize Tabs View
  const tabBtns = document.querySelectorAll('.builder-nav-tabs .tab-btn');
  const tabPanes = document.querySelectorAll('.builder-tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      tabPanes.forEach(pane => {
        pane.style.display = pane.id === `tab-pane-${targetTab}` ? 'block' : 'none';
      });
    });
  });

  // 5. Initialize Sub-Components
  // 5.1 Query Params Table
  const paramsTableContainer = document.getElementById('params-table-container');
  const paramsTable = new KeyValueTable({
    container: paramsTableContainer,
    keyPlaceholder: 'Param Name (参数名)',
    valuePlaceholder: 'Param Value (参数值)',
    onChange: (data) => {
      store.setQueryParams(data);
    }
  });

  // 5.2 Headers Table
  const headersTableContainer = document.getElementById('headers-table-container');
  const headersTable = new KeyValueTable({
    container: headersTableContainer,
    keyPlaceholder: 'Header Name (如 Content-Type)',
    valuePlaceholder: 'Header Value',
    keySuggestions: COMMON_HEADERS,
    onChange: (data) => {
      store.setHeaders(data);
    }
  });

  // 5.3 Body Editor
  const bodyContainer = document.getElementById('body-editor-container');
  const bodyEditor = new BodyEditor({
    container: bodyContainer,
    store: store
  });

  // 5.4 Auth Panel
  const authContainer = document.getElementById('auth-panel-container');
  const authPanel = new AuthPanel({
    container: authContainer,
    store: store
  });

  // 5.5 cURL Man Page Flags Explorer
  const flagsContainer = document.getElementById('flags-explorer-container');
  const flagsExplorer = new FlagsExplorer({
    container: flagsContainer,
    store: store,
    flagsData: flagsData
  });

  // 5.6 Terminal Output View
  const terminalContainer = document.getElementById('terminal-container');
  const terminalOutput = new TerminalOutput({
    container: terminalContainer,
    store: store,
    generator: generator
  });

  // 6. Update Tab Badges Count
  function updateTabBadges(state) {
    // Params count
    const activeParamsCount = (state.queryParams || []).filter(p => p.enabled !== false && (p.key || p.value)).length;
    const paramsBadge = document.getElementById('badge-params-count');
    if (paramsBadge) {
      paramsBadge.textContent = activeParamsCount > 0 ? activeParamsCount : '';
      paramsBadge.style.display = activeParamsCount > 0 ? 'inline-block' : 'none';
    }

    // Headers count
    const activeHeadersCount = (state.headers || []).filter(h => h.enabled !== false && h.key).length;
    const headersBadge = document.getElementById('badge-headers-count');
    if (headersBadge) {
      headersBadge.textContent = activeHeadersCount > 0 ? activeHeadersCount : '';
      headersBadge.style.display = activeHeadersCount > 0 ? 'inline-block' : 'none';
    }

    // Body badge
    const bodyBadge = document.getElementById('badge-body-type');
    if (bodyBadge) {
      const hasBody = state.body && state.body.type !== 'none';
      bodyBadge.textContent = hasBody ? state.body.type.toUpperCase() : '';
      bodyBadge.style.display = hasBody ? 'inline-block' : 'none';
    }

    // Auth badge
    const authBadge = document.getElementById('badge-auth-type');
    if (authBadge) {
      const hasAuth = state.auth && state.auth.type !== 'none';
      authBadge.textContent = hasAuth ? state.auth.type : '';
      authBadge.style.display = hasAuth ? 'inline-block' : 'none';
    }

    // Flags badge
    const activeFlagsCount = Object.keys(state.activeFlags || {}).length;
    const flagsBadge = document.getElementById('badge-flags-count');
    if (flagsBadge) {
      flagsBadge.textContent = activeFlagsCount > 0 ? activeFlagsCount : '';
      flagsBadge.style.display = activeFlagsCount > 0 ? 'inline-block' : 'none';
    }
  }

  // 7. Subscribe to Store State Changes
  store.subscribe(state => {
    // Sync Top Bar
    if (methodSelect.value !== state.method) {
      methodSelect.value = state.method;
      updateMethodColor(state.method);
    }

    if (urlInput.value !== state.url && document.activeElement !== urlInput) {
      urlInput.value = state.url || '';
    }

    // Sync Components
    paramsTable.setData(state.queryParams);
    headersTable.setData(state.headers);
    bodyEditor.syncWithState(state.body);
    authPanel.syncWithState(state.auth);
    flagsExplorer.syncWithState(state);
    terminalOutput.syncWithState(state);

    // Update Tab Badges
    updateTabBadges(state);
  });

  // Initial Sync
  const initialState = store.getState();
  methodSelect.value = initialState.method;
  updateMethodColor(initialState.method);
  urlInput.value = initialState.url;
  paramsTable.setData(initialState.queryParams);
  headersTable.setData(initialState.headers);
  bodyEditor.syncWithState(initialState.body);
  authPanel.syncWithState(initialState.auth);
  updateTabBadges(initialState);
  terminalOutput.updateOutput();
});
