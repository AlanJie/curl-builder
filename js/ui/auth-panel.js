/**
 * Authentication Settings Panel Component
 * Supports None, Bearer Token, Basic Auth, API Key, and Digest Auth.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.AuthPanel = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class AuthPanel {
    constructor(options) {
      this.container = options.container;
      this.store = options.store;
      this.init();
    }

    init() {
      this.render();
      this.bindEvents();
    }

    render() {
      this.container.innerHTML = `
        <div class="auth-type-nav">
          <button type="button" class="body-type-pill active" data-auth="none">No Auth (无认证)</button>
          <button type="button" class="body-type-pill" data-auth="bearer">Bearer Token</button>
          <button type="button" class="body-type-pill" data-auth="basic">Basic Auth</button>
          <button type="button" class="body-type-pill" data-auth="apiKey">API Key</button>
          <button type="button" class="body-type-pill" data-auth="digest">Digest Auth</button>
        </div>

        <div class="auth-forms-container">
          <!-- None -->
          <div id="auth-panel-none" class="auth-subpanel" style="padding: 20px; text-align: center; color: var(--text-muted);">
            此请求不附加任何身份验证头或凭据。
          </div>

          <!-- Bearer Token -->
          <div id="auth-panel-bearer" class="auth-subpanel" style="display: none;">
            <div class="auth-card">
              <div class="form-group">
                <label class="form-label">Bearer Token</label>
                <input type="text" id="auth-bearer-token" class="form-control" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...">
                <span style="font-size: 11.5px; color: var(--text-muted);">将自动生成请求头 <code>Authorization: Bearer &lt;token&gt;</code></span>
              </div>
            </div>
          </div>

          <!-- Basic Auth -->
          <div id="auth-panel-basic" class="auth-subpanel" style="display: none;">
            <div class="auth-card">
              <div class="form-group">
                <label class="form-label">Username (用户名)</label>
                <input type="text" id="auth-basic-user" class="form-control" placeholder="username">
              </div>
              <div class="form-group">
                <label class="form-label">Password (密码)</label>
                <input type="password" id="auth-basic-pass" class="form-control" placeholder="password">
              </div>
              <span style="font-size: 11.5px; color: var(--text-muted);">将自动追加 cURL 参数 <code>-u "user:pass"</code></span>
            </div>
          </div>

          <!-- API Key -->
          <div id="auth-panel-apiKey" class="auth-subpanel" style="display: none;">
            <div class="auth-card">
              <div class="form-group">
                <label class="form-label">Key (参数名)</label>
                <input type="text" id="auth-apikey-name" class="form-control" placeholder="如: X-API-Key 或 api_key">
              </div>
              <div class="form-group">
                <label class="form-label">Value (密钥值)</label>
                <input type="text" id="auth-apikey-val" class="form-control" placeholder="API Key 字符串">
              </div>
              <div class="form-group">
                <label class="form-label">Add to (添加位置)</label>
                <select id="auth-apikey-in" class="form-control" style="width: 200px;">
                  <option value="header">Header (请求头)</option>
                  <option value="query">Query Params (URL 参数)</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Digest Auth -->
          <div id="auth-panel-digest" class="auth-subpanel" style="display: none;">
            <div class="auth-card">
              <div class="form-group">
                <label class="form-label">Username (用户名)</label>
                <input type="text" id="auth-digest-user" class="form-control" placeholder="username">
              </div>
              <div class="form-group">
                <label class="form-label">Password (密码)</label>
                <input type="password" id="auth-digest-pass" class="form-control" placeholder="password">
              </div>
              <span style="font-size: 11.5px; color: var(--text-muted);">将自动追加 cURL 参数 <code>--digest -u "user:pass"</code></span>
            </div>
          </div>
        </div>
      `;
    }

    bindEvents() {
      // Type pills
      const pills = this.container.querySelectorAll('.auth-type-nav .body-type-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const authType = pill.dataset.auth;
          this.store.setAuth({ type: authType });
        });
      });

      // Bearer token input
      const bearerInput = this.container.querySelector('#auth-bearer-token');
      bearerInput.addEventListener('input', () => {
        this.store.setAuth({ bearerToken: bearerInput.value });
      });

      // Basic auth inputs
      const basicUser = this.container.querySelector('#auth-basic-user');
      const basicPass = this.container.querySelector('#auth-basic-pass');
      const updateBasic = () => {
        this.store.setAuth({ basicUser: basicUser.value, basicPass: basicPass.value });
      };
      basicUser.addEventListener('input', updateBasic);
      basicPass.addEventListener('input', updateBasic);

      // API Key inputs
      const apiKeyName = this.container.querySelector('#auth-apikey-name');
      const apiKeyVal = this.container.querySelector('#auth-apikey-val');
      const apiKeyIn = this.container.querySelector('#auth-apikey-in');
      const updateApiKey = () => {
        this.store.setAuth({
          apiKeyName: apiKeyName.value,
          apiKeyValue: apiKeyVal.value,
          apiKeyIn: apiKeyIn.value
        });
      };
      apiKeyName.addEventListener('input', updateApiKey);
      apiKeyVal.addEventListener('input', updateApiKey);
      apiKeyIn.addEventListener('change', updateApiKey);

      // Digest auth inputs
      const digestUser = this.container.querySelector('#auth-digest-user');
      const digestPass = this.container.querySelector('#auth-digest-pass');
      const updateDigest = () => {
        this.store.setAuth({ digestUser: digestUser.value, digestPass: digestPass.value });
      };
      digestUser.addEventListener('input', updateDigest);
      digestPass.addEventListener('input', updateDigest);
    }

    syncWithState(authState) {
      if (!authState) return;

      // Update pills
      const pills = this.container.querySelectorAll('.auth-type-nav .body-type-pill');
      pills.forEach(p => {
        if (p.dataset.auth === authState.type) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      // Update subpanels
      const panels = this.container.querySelectorAll('.auth-subpanel');
      panels.forEach(p => {
        p.style.display = p.id === `auth-panel-${authState.type}` ? 'block' : 'none';
      });

      // Sync inputs
      const bearerInput = this.container.querySelector('#auth-bearer-token');
      if (bearerInput && bearerInput.value !== authState.bearerToken && document.activeElement !== bearerInput) {
        bearerInput.value = authState.bearerToken || '';
      }

      const basicUser = this.container.querySelector('#auth-basic-user');
      if (basicUser && basicUser.value !== authState.basicUser && document.activeElement !== basicUser) {
        basicUser.value = authState.basicUser || '';
      }
      const basicPass = this.container.querySelector('#auth-basic-pass');
      if (basicPass && basicPass.value !== authState.basicPass && document.activeElement !== basicPass) {
        basicPass.value = authState.basicPass || '';
      }

      const apiKeyName = this.container.querySelector('#auth-apikey-name');
      if (apiKeyName && apiKeyName.value !== authState.apiKeyName && document.activeElement !== apiKeyName) {
        apiKeyName.value = authState.apiKeyName || '';
      }
      const apiKeyVal = this.container.querySelector('#auth-apikey-val');
      if (apiKeyVal && apiKeyVal.value !== authState.apiKeyValue && document.activeElement !== apiKeyVal) {
        apiKeyVal.value = authState.apiKeyValue || '';
      }
      const apiKeyIn = this.container.querySelector('#auth-apikey-in');
      if (apiKeyIn && apiKeyIn.value !== authState.apiKeyIn) {
        apiKeyIn.value = authState.apiKeyIn || 'header';
      }

      const digestUser = this.container.querySelector('#auth-digest-user');
      if (digestUser && digestUser.value !== authState.digestUser && document.activeElement !== digestUser) {
        digestUser.value = authState.digestUser || '';
      }
      const digestPass = this.container.querySelector('#auth-digest-pass');
      if (digestPass && digestPass.value !== authState.digestPass && document.activeElement !== digestPass) {
        digestPass.value = authState.digestPass || '';
      }
    }
  }

  return AuthPanel;
}));
