/**
 * cURL Command Generation Compiler
 * Compiles a structured Request State into executable cURL commands across multiple platforms.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    const ShellEscaper = require('./shell-escaper');
    module.exports = factory(ShellEscaper);
  } else {
    root.CurlGenerator = factory(root.ShellEscaper);
  }
}(typeof self !== 'undefined' ? self : this, function(ShellEscaper) {
  'use strict';

  /**
   * Build complete URL from base URL and query parameters list
   */
  function buildUrlWithParams(baseUrl, queryParams = []) {
    let urlStr = (baseUrl || '').trim();
    if (!urlStr) return '';

    // Collect active params
    const activeParams = queryParams.filter(p => p && p.enabled !== false && (p.key || p.value));
    if (activeParams.length === 0) {
      return urlStr;
    }

    try {
      // Check if baseUrl has a protocol, if not add dummy for URL parsing
      const hasProto = /^[a-zA-Z]+:\/\//.test(urlStr);
      const parseUrl = hasProto ? urlStr : 'http://' + urlStr;
      const urlObj = new URL(parseUrl);

      // Add params
      activeParams.forEach(param => {
        if (param.key) {
          urlObj.searchParams.append(param.key, param.value || '');
        }
      });

      if (hasProto) {
        return urlObj.toString();
      } else {
        // Strip dummy http://
        return urlObj.toString().replace(/^http:\/\//, '');
      }
    } catch (e) {
      // Fallback manual query string append
      const queryString = activeParams
        .map(p => `${encodeURIComponent(p.key || '')}=${encodeURIComponent(p.value || '')}`)
        .join('&');
      const separator = urlStr.includes('?') ? '&' : '?';
      return `${urlStr}${separator}${queryString}`;
    }
  }

  /**
   * Compile full request state into token array
   */
  function compileTokens(state) {
    const tokens = [];
    const method = (state.method || 'GET').toUpperCase();
    
    // 1. HTTP Method
    if (method !== 'GET') {
      tokens.push({ flag: '-X', value: method });
    }

    // 2. Target URL (with query params + API Key if query mode)
    let queryParams = [...(state.queryParams || [])];
    if (state.auth && state.auth.type === 'apiKey' && state.auth.apiKeyIn === 'query' && state.auth.apiKeyName) {
      queryParams.push({
        key: state.auth.apiKeyName,
        value: state.auth.apiKeyValue || '',
        enabled: true
      });
    }

    const fullUrl = buildUrlWithParams(state.url, queryParams) || 'https://api.example.com';
    tokens.push({ flag: '--url', value: fullUrl });

    // 3. Request Headers
    const headers = [];
    const existingHeaderKeys = new Set();

    // From headers table
    (state.headers || []).forEach(h => {
      if (h && h.enabled !== false && h.key && h.key.trim()) {
        const headerLine = `${h.key.trim()}: ${h.value !== undefined ? h.value : ''}`;
        headers.push(headerLine);
        existingHeaderKeys.add(h.key.trim().toLowerCase());
      }
    });

    // From Auth configuration
    if (state.auth) {
      if (state.auth.type === 'bearer' && state.auth.bearerToken) {
        headers.push(`Authorization: Bearer ${state.auth.bearerToken.trim()}`);
      } else if (state.auth.type === 'apiKey' && state.auth.apiKeyIn === 'header' && state.auth.apiKeyName) {
        headers.push(`${state.auth.apiKeyName.trim()}: ${state.auth.apiKeyValue || ''}`);
      }
    }

    // Auto Content-Type header based on body type if not already specified
    const body = state.body || { type: 'none' };
    if (!existingHeaderKeys.has('content-type')) {
      if (body.type === 'json' && body.json && body.json.trim()) {
        headers.push('Content-Type: application/json');
      } else if (body.type === 'urlencoded' && body.urlEncoded && body.urlEncoded.length > 0) {
        headers.push('Content-Type: application/x-www-form-urlencoded');
      } else if (body.type === 'raw' && body.rawType) {
        const rawMimeMap = {
          'json': 'application/json',
          'xml': 'application/xml',
          'html': 'text/html',
          'javascript': 'application/javascript',
          'text': 'text/plain'
        };
        if (rawMimeMap[body.rawType]) {
          headers.push(`Content-Type: ${rawMimeMap[body.rawType]}`);
        }
      }
    }

    // Add headers to tokens
    headers.forEach(hdr => {
      tokens.push({ flag: '-H', value: hdr });
    });

    // 4. Basic / Digest Auth flag
    if (state.auth) {
      if (state.auth.type === 'basic' && (state.auth.basicUser || state.auth.basicPass)) {
        const creds = `${state.auth.basicUser || ''}:${state.auth.basicPass || ''}`;
        tokens.push({ flag: '-u', value: creds });
      } else if (state.auth.type === 'digest' && (state.auth.digestUser || state.auth.digestPass)) {
        tokens.push({ flag: '--digest' });
        const creds = `${state.auth.digestUser || ''}:${state.auth.digestPass || ''}`;
        tokens.push({ flag: '-u', value: creds });
      }
    }

    // 5. Request Body
    if (body.type === 'json' && body.json && body.json.trim()) {
      tokens.push({ flag: '--data-raw', value: body.json.trim() });
    } else if (body.type === 'form-data' && body.formData && body.formData.length > 0) {
      body.formData.forEach(item => {
        if (item && item.enabled !== false && item.key) {
          if (item.type === 'file' || item.isFile) {
            tokens.push({ flag: '-F', value: `${item.key}=@${item.value || ''}` });
          } else {
            tokens.push({ flag: '-F', value: `${item.key}=${item.value || ''}` });
          }
        }
      });
    } else if (body.type === 'urlencoded' && body.urlEncoded && body.urlEncoded.length > 0) {
      body.urlEncoded.forEach(item => {
        if (item && item.enabled !== false && item.key) {
          tokens.push({ flag: '--data-urlencode', value: `${item.key}=${item.value || ''}` });
        }
      });
    } else if (body.type === 'raw' && body.raw && body.raw.trim()) {
      tokens.push({ flag: '--data-raw', value: body.raw.trim() });
    } else if (body.type === 'binary' && body.binaryPath) {
      tokens.push({ flag: '--data-binary', value: `@${body.binaryPath.trim()}` });
    }

    // 6. Advanced cURL Man Page Flags
    if (state.activeFlags) {
      Object.keys(state.activeFlags).forEach(flagId => {
        const flagConfig = state.activeFlags[flagId];
        if (flagConfig && flagConfig.enabled) {
          const flagName = flagConfig.name || (flagId.startsWith('-') ? flagId : `--${flagId}`);
          if (flagConfig.type === 'boolean' || flagConfig.value === undefined || flagConfig.value === null || flagConfig.value === '') {
            tokens.push({ flag: flagName });
          } else {
            tokens.push({ flag: flagName, value: String(flagConfig.value) });
          }
        }
      });
    }

    return tokens;
  }

  /**
   * Generate cURL command in all supported shell formats
   * @param {Object} state - Application state snapshot
   * @returns {Object} { bash, powershell, cmd, single, tokens }
   */
  function generate(state) {
    const tokens = compileTokens(state);

    return {
      bash: ShellEscaper.formatCommand(tokens, 'bash'),
      powershell: ShellEscaper.formatCommand(tokens, 'powershell'),
      cmd: ShellEscaper.formatCommand(tokens, 'cmd'),
      single: ShellEscaper.formatCommand(tokens, 'single'),
      tokens: tokens
    };
  }

  return {
    buildUrlWithParams,
    compileTokens,
    generate
  };
}));
