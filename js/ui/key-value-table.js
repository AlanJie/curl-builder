/**
 * Reusable Key-Value Table Component
 * Used for Query Params, Headers, Form Data, and URL Encoded fields.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.KeyValueTable = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class KeyValueTable {
    /**
     * @param {Object} options
     * @param {HTMLElement} options.container - DOM element container
     * @param {string} options.keyPlaceholder - Placeholder for key input
     * @param {string} options.valuePlaceholder - Placeholder for value input
     * @param {boolean} [options.showTypeSelect=false] - Whether to show text/file type select
     * @param {Array<string>} [options.keySuggestions=[]] - Autocomplete suggestions for keys
     * @param {Function} options.onChange - Callback on data change: (dataArray) => void
     */
    constructor(options) {
      this.container = options.container;
      this.keyPlaceholder = options.keyPlaceholder || 'Key';
      this.valuePlaceholder = options.valuePlaceholder || 'Value';
      this.showTypeSelect = !!options.showTypeSelect;
      this.keySuggestions = options.keySuggestions || [];
      this.onChange = options.onChange || (() => {});
      this.items = [];

      this.init();
    }

    init() {
      this.container.classList.add('kv-table-container');
      this.render();
    }

    setData(items) {
      this.items = (items || []).map((item, idx) => ({
        id: item.id || `kv-${Date.now()}-${idx}`,
        key: item.key || '',
        value: item.value || '',
        type: item.type || 'text',
        enabled: item.enabled !== false
      }));

      // Ensure at least one empty row at the bottom
      if (this.items.length === 0 || this.items[this.items.length - 1].key || this.items[this.items.length - 1].value) {
        this.items.push(this.createEmptyItem());
      }

      this.renderRows();
    }

    createEmptyItem() {
      return {
        id: `kv-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        key: '',
        value: '',
        type: 'text',
        enabled: true
      };
    }

    getData() {
      // Return non-empty items
      return this.items.filter(item => item.key || item.value);
    }

    render() {
      const datalistId = `list-${Math.random().toString(36).substr(2, 7)}`;
      let datalistHtml = '';
      if (this.keySuggestions.length > 0) {
        datalistHtml = `<datalist id="${datalistId}">
          ${this.keySuggestions.map(s => `<option value="${s}">`).join('')}
        </datalist>`;
      }

      this.container.innerHTML = `
        ${datalistHtml}
        <table class="kv-table">
          <thead>
            <tr>
              <th class="kv-checkbox-cell"></th>
              ${this.showTypeSelect ? '<th style="width: 80px;">类型</th>' : ''}
              <th>参数名 (${this.keyPlaceholder})</th>
              <th>参数值 (${this.valuePlaceholder})</th>
              <th class="kv-action-cell"></th>
            </tr>
          </thead>
          <tbody class="kv-tbody"></tbody>
        </table>
        <button type="button" class="btn btn-sm btn-ghost kv-add-btn">
          <span>+ 添加一行</span>
        </button>
      `;

      this.datalistId = datalistId;
      this.tbody = this.container.querySelector('.kv-tbody');
      const addBtn = this.container.querySelector('.kv-add-btn');

      addBtn.addEventListener('click', () => {
        this.items.push(this.createEmptyItem());
        this.renderRows();
        this.focusLastKeyInput();
      });

      this.renderRows();
    }

    renderRows() {
      if (!this.tbody) return;
      this.tbody.innerHTML = '';

      this.items.forEach((item, index) => {
        const tr = document.createElement('tr');

        // Checkbox cell
        const tdCheck = document.createElement('td');
        tdCheck.className = 'kv-checkbox-cell';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'kv-checkbox';
        checkbox.checked = item.enabled;
        checkbox.addEventListener('change', () => {
          item.enabled = checkbox.checked;
          this.emitChange();
        });
        tdCheck.appendChild(checkbox);
        tr.appendChild(tdCheck);

        // Type select cell if enabled (for form-data)
        if (this.showTypeSelect) {
          const tdType = document.createElement('td');
          const select = document.createElement('select');
          select.className = 'kv-type-select';
          select.innerHTML = `
            <option value="text" ${item.type === 'text' ? 'selected' : ''}>Text</option>
            <option value="file" ${item.type === 'file' ? 'selected' : ''}>File (@)</option>
          `;
          select.addEventListener('change', () => {
            item.type = select.value;
            this.emitChange();
          });
          tdType.appendChild(select);
          tr.appendChild(tdType);
        }

        // Key input cell
        const tdKey = document.createElement('td');
        const keyInput = document.createElement('input');
        keyInput.type = 'text';
        keyInput.className = 'kv-input kv-key-input';
        keyInput.placeholder = this.keyPlaceholder;
        keyInput.value = item.key;
        if (this.keySuggestions.length > 0) {
          keyInput.setAttribute('list', this.datalistId);
        }
        keyInput.addEventListener('input', () => {
          item.key = keyInput.value;
          this.checkAutoAddRow(index);
          this.emitChange();
        });
        tdKey.appendChild(keyInput);
        tr.appendChild(tdKey);

        // Value input cell
        const tdVal = document.createElement('td');
        const valInput = document.createElement('input');
        valInput.type = 'text';
        valInput.className = 'kv-input kv-val-input';
        valInput.placeholder = item.type === 'file' ? '本地文件路径 (如: /tmp/file.png)' : this.valuePlaceholder;
        valInput.value = item.value;
        valInput.addEventListener('input', () => {
          item.value = valInput.value;
          this.checkAutoAddRow(index);
          this.emitChange();
        });
        tdVal.appendChild(valInput);
        tr.appendChild(tdVal);

        // Action cell (Delete)
        const tdAction = document.createElement('td');
        tdAction.className = 'kv-action-cell';
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'kv-del-btn';
        delBtn.innerHTML = '✕';
        delBtn.title = '删除此行';
        delBtn.addEventListener('click', () => {
          this.items.splice(index, 1);
          if (this.items.length === 0) {
            this.items.push(this.createEmptyItem());
          }
          this.renderRows();
          this.emitChange();
        });
        tdAction.appendChild(delBtn);
        tr.appendChild(tdAction);

        this.tbody.appendChild(tr);
      });
    }

    checkAutoAddRow(index) {
      if (index === this.items.length - 1) {
        this.items.push(this.createEmptyItem());
        this.renderRows();
      }
    }

    focusLastKeyInput() {
      const inputs = this.tbody.querySelectorAll('.kv-key-input');
      if (inputs.length > 0) {
        inputs[inputs.length - 1].focus();
      }
    }

    emitChange() {
      this.onChange(this.getData());
    }
  }

  return KeyValueTable;
}));
