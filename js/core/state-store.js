/**
 * Central Reactive State Store
 * Manages HTTP request models, bidirectional URL-query synchronization, and emits change events.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.StateStore = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  function createInitialState() {
    return {
      method: 'POST',
      url: 'https://httpbin.org/post',
      queryParams: [
        { id: 'qp-1', key: 'version', value: '1.0', enabled: true },
        { id: 'qp-2', key: 'format', value: 'json', enabled: true }
      ],
      headers: [
        { id: 'hdr-1', key: 'Accept', value: 'application/json', enabled: true },
        { id: 'hdr-2', key: 'User-Agent', value: 'cURL-Builder/1.0', enabled: true }
      ],
      body: {
        type: 'json', // none | json | form-data | urlencoded | raw | binary
        json: JSON.stringify({
          message: "Hello from cURL Builder!",
          timestamp: "2026-08-16",
          tags: ["api", "curl", "developer-tool"],
          active: true
        }, null, 2),
        formData: [
          { id: 'fd-1', key: 'username', value: 'antigravity_dev', type: 'text', enabled: true },
          { id: 'fd-2', key: 'avatar', value: '/path/to/avatar.png', type: 'file', enabled: false }
        ],
        urlEncoded: [
          { id: 'ue-1', key: 'grant_type', value: 'client_credentials', enabled: true },
          { id: 'ue-2', key: 'scope', value: 'read write', enabled: true }
        ],
        raw: '',
        rawType: 'json',
        binaryPath: ''
      },
      auth: {
        type: 'bearer', // none | bearer | basic | apiKey | digest
        bearerToken: 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0',
        basicUser: '',
        basicPass: '',
        apiKeyName: 'X-API-Key',
        apiKeyValue: '',
        apiKeyIn: 'header', // header | query
        digestUser: '',
        digestPass: ''
      },
      activeFlags: {
        'location': { id: 'location', name: '--location', type: 'boolean', enabled: true },
        'connect-timeout': { id: 'connect-timeout', name: '--connect-timeout', type: 'number', value: '10', enabled: true }
      },
      outputFormat: 'bash' // bash | powershell | cmd | single
    };
  }

  class Store {
    constructor() {
      this.state = createInitialState();
      this.listeners = new Set();
      this.isSyncingUrl = false;
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    notify() {
      this.listeners.forEach(fn => {
        try {
          fn(this.state);
        } catch (err) {
          console.error('[Store] Listener error:', err);
        }
      });
    }

    setMethod(method) {
      this.state.method = (method || 'GET').toUpperCase();
      this.notify();
    }

    /**
     * Set URL directly from user input.
     * Parses query params if any and synchronizes with queryParams table.
     */
    setUrl(urlStr) {
      if (this.isSyncingUrl) return;
      this.state.url = urlStr;

      // Extract query parameters from URL
      try {
        const queryIndex = urlStr.indexOf('?');
        if (queryIndex !== -1) {
          const queryString = urlStr.substring(queryIndex + 1);
          const searchParams = new URLSearchParams(queryString);
          const newParams = [];
          let idx = 1;
          searchParams.forEach((val, key) => {
            newParams.push({
              id: `qp-auto-${idx++}`,
              key: key,
              value: val,
              enabled: true
            });
          });
          // Update query params without recursive loop
          this.state.queryParams = newParams;
        }
      } catch (e) {
        // ignore parse error
      }

      this.notify();
    }

    /**
     * Update query parameters table.
     * Synchronizes URL query string.
     */
    setQueryParams(params) {
      this.state.queryParams = params;
      this.syncUrlFromParams();
      this.notify();
    }

    syncUrlFromParams() {
      if (this.isSyncingUrl) return;
      this.isSyncingUrl = true;

      try {
        const currentUrl = this.state.url || '';
        const base = currentUrl.split('?')[0];
        const activeParams = (this.state.queryParams || []).filter(p => p && p.enabled !== false && (p.key || p.value));

        if (activeParams.length === 0) {
          this.state.url = base;
        } else {
          const searchParams = new URLSearchParams();
          activeParams.forEach(p => {
            if (p.key) searchParams.append(p.key, p.value || '');
          });
          const qs = searchParams.toString();
          this.state.url = qs ? `${base}?${qs}` : base;
        }
      } catch (e) {
        // ignore
      } finally {
        this.isSyncingUrl = false;
      }
    }

    setHeaders(headers) {
      this.state.headers = headers;
      this.notify();
    }

    setBody(bodyUpdates) {
      this.state.body = { ...this.state.body, ...bodyUpdates };
      this.notify();
    }

    setAuth(authUpdates) {
      this.state.auth = { ...this.state.auth, ...authUpdates };
      this.notify();
    }

    toggleFlag(flagMeta, enabled, value) {
      const id = flagMeta.id || flagMeta.name.replace(/^-+/, '');
      if (!this.state.activeFlags) {
        this.state.activeFlags = {};
      }

      if (!enabled) {
        delete this.state.activeFlags[id];
      } else {
        this.state.activeFlags[id] = {
          id: id,
          name: flagMeta.name,
          short: flagMeta.short,
          type: flagMeta.type,
          enabled: true,
          value: value !== undefined ? value : (flagMeta.type === 'boolean' ? true : '')
        };
      }
      this.notify();
    }

    setFlagValue(flagId, value) {
      if (this.state.activeFlags && this.state.activeFlags[flagId]) {
        this.state.activeFlags[flagId].value = value;
        this.notify();
      }
    }

    removeFlag(flagId) {
      if (this.state.activeFlags && this.state.activeFlags[flagId]) {
        delete this.state.activeFlags[flagId];
        this.notify();
      }
    }

    setOutputFormat(format) {
      this.state.outputFormat = format;
      this.notify();
    }

    reset() {
      this.state = {
        method: 'GET',
        url: '',
        queryParams: [],
        headers: [],
        body: {
          type: 'none',
          json: '',
          formData: [],
          urlEncoded: [],
          raw: '',
          rawType: 'text',
          binaryPath: ''
        },
        auth: {
          type: 'none',
          bearerToken: '',
          basicUser: '',
          basicPass: '',
          apiKeyName: 'X-API-Key',
          apiKeyValue: '',
          apiKeyIn: 'header',
          digestUser: '',
          digestPass: ''
        },
        activeFlags: {},
        outputFormat: this.state.outputFormat || 'bash'
      };
      this.notify();
    }

    loadSample() {
      this.state = createInitialState();
      this.notify();
    }
  }

  return Store;
}));
