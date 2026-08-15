/**
 * Request Body Editor Component
 * Supports None, JSON (format/minify/validate), Multipart Form-Data, x-www-form-urlencoded, Raw, and Binary.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.BodyEditor = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class BodyEditor {
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
        <div class="body-type-selector">
          <button type="button" class="body-type-pill active" data-type="none">None (无)</button>
          <button type="button" class="body-type-pill" data-type="json">JSON</button>
          <button type="button" class="body-type-pill" data-type="form-data">Form-Data</button>
          <button type="button" class="body-type-pill" data-type="urlencoded">x-www-form-urlencoded</button>
          <button type="button" class="body-type-pill" data-type="raw">Raw (纯文本)</button>
          <button type="button" class="body-type-pill" data-type="binary">Binary (文件)</button>
        </div>

        <div class="body-content-area">
          <!-- None State -->
          <div id="body-panel-none" class="body-panel" style="padding: 24px; text-align: center; color: var(--text-muted);">
            当前请求不包含 Body 载荷
          </div>

          <!-- JSON Panel -->
          <div id="body-panel-json" class="body-panel" style="display: none;">
            <div class="body-toolbar" style="margin-bottom: 8px;">
              <div class="json-status-badge valid" id="json-validation-status">
                <span>✓ 有效 JSON</span>
              </div>
              <div style="display: flex; gap: 6px;">
                <button type="button" class="btn btn-sm" id="btn-json-beautify">格式化 Beautify</button>
                <button type="button" class="btn btn-sm btn-ghost" id="btn-json-minify">压缩 Minify</button>
              </div>
            </div>
            <textarea class="json-textarea" id="json-input" placeholder='{\n  "key": "value"\n}' spellcheck="false"></textarea>
          </div>

          <!-- Form Data Panel -->
          <div id="body-panel-form-data" class="body-panel" style="display: none;">
            <div id="form-data-table-container"></div>
          </div>

          <!-- URL Encoded Panel -->
          <div id="body-panel-urlencoded" class="body-panel" style="display: none;">
            <div id="urlencoded-table-container"></div>
          </div>

          <!-- Raw Panel -->
          <div id="body-panel-raw" class="body-panel" style="display: none;">
            <div class="body-toolbar" style="margin-bottom: 8px;">
              <select id="raw-type-select" class="kv-type-select" style="width: 140px; height: 30px;">
                <option value="text">Text (text/plain)</option>
                <option value="json">JSON (application/json)</option>
                <option value="xml">XML (application/xml)</option>
                <option value="html">HTML (text/html)</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
            <textarea class="raw-textarea" id="raw-input" placeholder="输入 Raw 请求体内容..." spellcheck="false"></textarea>
          </div>

          <!-- Binary Panel -->
          <div id="body-panel-binary" class="body-panel" style="display: none;">
            <div class="auth-card">
              <div class="form-group">
                <label class="form-label">本地文件绝对路径 (--data-binary "@/path/to/file")</label>
                <input type="text" id="binary-path-input" class="form-control" placeholder="如: C:/data/payload.bin 或 /tmp/payload.bin">
              </div>
            </div>
          </div>
        </div>
      `;

      // Init sub tables
      this.initSubTables();
    }

    initSubTables() {
      const fdContainer = this.container.querySelector('#form-data-table-container');
      this.formDataTable = new KeyValueTable({
        container: fdContainer,
        keyPlaceholder: 'Field Name',
        valuePlaceholder: 'Field Value',
        showTypeSelect: true,
        onChange: (data) => {
          this.store.setBody({ formData: data });
        }
      });

      const ueContainer = this.container.querySelector('#urlencoded-table-container');
      this.urlencodedTable = new KeyValueTable({
        container: ueContainer,
        keyPlaceholder: 'Parameter',
        valuePlaceholder: 'Value',
        onChange: (data) => {
          this.store.setBody({ urlEncoded: data });
        }
      });
    }

    bindEvents() {
      // Body type pills
      const pills = this.container.querySelectorAll('.body-type-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          const type = pill.dataset.type;
          this.store.setBody({ type: type });
        });
      });

      // JSON input
      const jsonInput = this.container.querySelector('#json-input');
      const statusBadge = this.container.querySelector('#json-validation-status');

      jsonInput.addEventListener('input', () => {
        const val = jsonInput.value;
        this.validateJson(val, statusBadge);
        this.store.setBody({ json: val });
      });

      // JSON Beautify
      const beautifyBtn = this.container.querySelector('#btn-json-beautify');
      beautifyBtn.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(jsonInput.value);
          const formatted = JSON.stringify(parsed, null, 2);
          jsonInput.value = formatted;
          this.validateJson(formatted, statusBadge);
          this.store.setBody({ json: formatted });
        } catch (e) {
          // ignore if invalid
        }
      });

      // JSON Minify
      const minifyBtn = this.container.querySelector('#btn-json-minify');
      minifyBtn.addEventListener('click', () => {
        try {
          const parsed = JSON.parse(jsonInput.value);
          const minified = JSON.stringify(parsed);
          jsonInput.value = minified;
          this.validateJson(minified, statusBadge);
          this.store.setBody({ json: minified });
        } catch (e) {
          // ignore
        }
      });

      // Raw input & type
      const rawInput = this.container.querySelector('#raw-input');
      const rawSelect = this.container.querySelector('#raw-type-select');

      rawInput.addEventListener('input', () => {
        this.store.setBody({ raw: rawInput.value });
      });

      rawSelect.addEventListener('change', () => {
        this.store.setBody({ rawType: rawSelect.value });
      });

      // Binary path input
      const binInput = this.container.querySelector('#binary-path-input');
      binInput.addEventListener('input', () => {
        this.store.setBody({ binaryPath: binInput.value });
      });
    }

    validateJson(str, badge) {
      if (!str.trim()) {
        badge.className = 'json-status-badge valid';
        badge.innerHTML = '<span>JSON 留空 (无内容)</span>';
        return;
      }
      try {
        JSON.parse(str);
        badge.className = 'json-status-badge valid';
        badge.innerHTML = '<span>✓ 有效 JSON</span>';
      } catch (err) {
        badge.className = 'json-status-badge invalid';
        badge.innerHTML = `<span>✕ JSON 格式错误: ${err.message}</span>`;
      }
    }

    syncWithState(bodyState) {
      if (!bodyState) return;

      // Update active pill
      const pills = this.container.querySelectorAll('.body-type-pill');
      pills.forEach(p => {
        if (p.dataset.type === bodyState.type) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });

      // Update panels visibility
      const panels = this.container.querySelectorAll('.body-panel');
      panels.forEach(panel => {
        panel.style.display = panel.id === `body-panel-${bodyState.type}` ? 'block' : 'none';
      });

      // Sync sub fields
      const jsonInput = this.container.querySelector('#json-input');
      if (jsonInput && jsonInput.value !== bodyState.json && document.activeElement !== jsonInput) {
        jsonInput.value = bodyState.json || '';
        const statusBadge = this.container.querySelector('#json-validation-status');
        this.validateJson(jsonInput.value, statusBadge);
      }

      const rawInput = this.container.querySelector('#raw-input');
      if (rawInput && rawInput.value !== bodyState.raw && document.activeElement !== rawInput) {
        rawInput.value = bodyState.raw || '';
      }

      const rawSelect = this.container.querySelector('#raw-type-select');
      if (rawSelect && rawSelect.value !== bodyState.rawType) {
        rawSelect.value = bodyState.rawType || 'json';
      }

      const binInput = this.container.querySelector('#binary-path-input');
      if (binInput && binInput.value !== bodyState.binaryPath && document.activeElement !== binInput) {
        binInput.value = bodyState.binaryPath || '';
      }

      if (this.formDataTable && bodyState.formData) {
        this.formDataTable.setData(bodyState.formData);
      }

      if (this.urlencodedTable && bodyState.urlEncoded) {
        this.urlencodedTable.setData(bodyState.urlEncoded);
      }
    }
  }

  return BodyEditor;
}));
