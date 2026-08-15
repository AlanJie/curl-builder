/**
 * Terminal Output & Syntax Highlighting Component
 * Renders real-time generated cURL commands with syntax highlighting and platform format switching.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TerminalOutput = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  class TerminalOutput {
    constructor(options) {
      this.container = options.container;
      this.store = options.store;
      this.generator = options.generator;
      this.currentFormat = this.store.getState().outputFormat || 'bash';
      this.currentCommand = '';

      this.init();
    }

    init() {
      this.render();
      this.bindEvents();
      this.updateOutput();
    }

    render() {
      this.container.innerHTML = `
        <div class="terminal-card">
          <!-- Terminal Header -->
          <div class="terminal-header">
            <div class="terminal-header-left">
              <div class="terminal-dots">
                <span class="terminal-dot dot-red"></span>
                <span class="terminal-dot dot-yellow"></span>
                <span class="terminal-dot dot-green"></span>
              </div>
              <span class="terminal-title">curl live output</span>
            </div>

            <!-- Format Switcher -->
            <div class="format-switcher">
              <button type="button" class="format-pill active" data-fmt="bash">Bash / Zsh</button>
              <button type="button" class="format-pill" data-fmt="powershell">PowerShell</button>
              <button type="button" class="format-pill" data-fmt="cmd">Windows CMD</button>
              <button type="button" class="format-pill" data-fmt="single">Single Line</button>
            </div>
          </div>

          <!-- Terminal Body (Code Area) -->
          <div class="terminal-body">
            <pre class="terminal-code"><code id="code-output"></code></pre>
          </div>

          <!-- Terminal Footer Actions -->
          <div class="terminal-footer">
            <div class="terminal-stats" id="terminal-stats">
              字符数: 0 | 行数: 1
            </div>
            <div class="terminal-actions">
              <button type="button" class="btn btn-sm btn-ghost" id="btn-download-script" title="下载为脚本文件">
                <span>💾 保存脚本</span>
              </button>
              <button type="button" class="btn-copy" id="btn-copy-cmd">
                <span id="copy-btn-icon">📋</span>
                <span id="copy-btn-text">一键复制</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Toast Notifications Container -->
        <div class="toast-container" id="toast-container"></div>
      `;

      this.codeOutput = this.container.querySelector('#code-output');
      this.statsEl = this.container.querySelector('#terminal-stats');
      this.copyBtn = this.container.querySelector('#btn-copy-cmd');
      this.copyIcon = this.container.querySelector('#copy-btn-icon');
      this.copyText = this.container.querySelector('#copy-btn-text');
      this.downloadBtn = this.container.querySelector('#btn-download-script');
      this.toastContainer = this.container.querySelector('#toast-container');
    }

    bindEvents() {
      // Format switch pills
      const pills = this.container.querySelectorAll('.format-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          pills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          this.currentFormat = pill.dataset.fmt;
          this.store.setOutputFormat(this.currentFormat);
          this.updateOutput();
        });
      });

      // Copy Button
      this.copyBtn.addEventListener('click', () => {
        if (!this.currentCommand) return;
        navigator.clipboard.writeText(this.currentCommand).then(() => {
          this.showCopySuccess();
          this.showToast('✓ cURL 命令已复制到剪贴板！', 'success');
        }).catch(() => {
          // Fallback textarea copy
          const ta = document.createElement('textarea');
          ta.value = this.currentCommand;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          this.showCopySuccess();
          this.showToast('✓ cURL 命令已复制到剪贴板！', 'success');
        });
      });

      // Download Script Button
      this.downloadBtn.addEventListener('click', () => {
        this.downloadScript();
      });
    }

    showCopySuccess() {
      this.copyBtn.classList.add('copied');
      this.copyIcon.textContent = '✓';
      this.copyText.textContent = '已复制!';
      setTimeout(() => {
        this.copyBtn.classList.remove('copied');
        this.copyIcon.textContent = '📋';
        this.copyText.textContent = '一键复制';
      }, 2000);
    }

    showToast(message, type = 'success') {
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span>${message}</span>
      `;
      this.toastContainer.appendChild(toast);
      setTimeout(() => {
        toast.style.animation = 'toast-out 0.25s forwards';
        setTimeout(() => toast.remove(), 250);
      }, 2500);
    }

    downloadScript() {
      const fmt = this.currentFormat;
      let filename = 'curl-request.sh';
      let content = this.currentCommand;

      if (fmt === 'powershell') {
        filename = 'curl-request.ps1';
      } else if (fmt === 'cmd') {
        filename = 'curl-request.bat';
        content = `@echo off\n\n${this.currentCommand}\n\npause`;
      } else {
        content = `#!/usr/bin/env bash\n\n${this.currentCommand}\n`;
      }

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this.showToast(`✓ 已导出脚本 ${filename}`, 'success');
    }

    /**
     * Syntax highlight cURL command line text
     */
    highlight(cmdText, format) {
      if (!cmdText) return '';

      // Escape HTML chars
      function escapeHtml(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      const lines = cmdText.split('\n');
      const highlightedLines = lines.map(line => {
        let safeLine = escapeHtml(line);

        const strings = [];
        let stringIndex = 0;

        // Extract strings first to prevent HTML attribute corruption
        safeLine = safeLine.replace(/'([^']*)'/g, (match) => {
          strings.push(`<span class="hl-str">${match}</span>`);
          return `__STR_${stringIndex++}__`;
        });
        safeLine = safeLine.replace(/"([^"]*)"/g, (match) => {
          strings.push(`<span class="hl-str">${match}</span>`);
          return `__STR_${stringIndex++}__`;
        });

        // Highlight curl keyword at start of line
        safeLine = safeLine.replace(/^(\s*)(curl)\b/, '$1<span class="hl-cmd">$2</span>');

        // Highlight continuation chars at end of line: \ or ` or ^
        safeLine = safeLine.replace(/(\s+)(\\|\^|`)$/, '$1<span class="hl-cont">$2</span>');

        // Highlight flags e.g. -X, --url, -H, --data-raw, -F, -u, etc.
        safeLine = safeLine.replace(/(\s)(-[a-zA-Z0-9]|--[a-zA-Z0-9-]+)/g, '$1<span class="hl-flag">$2</span>');

        // Highlight URLs
        safeLine = safeLine.replace(/(https?:\/\/[^\s\'\"]+)/g, '<span class="hl-url">$1</span>');

        // Restore strings
        strings.forEach((strHtml, idx) => {
          safeLine = safeLine.replace(`__STR_${idx}__`, strHtml);
        });

        return safeLine;
      });

      return highlightedLines.join('\n');
    }

    updateOutput() {
      const state = this.store.getState();
      const generated = this.generator.generate(state);

      this.currentCommand = generated[this.currentFormat] || generated.bash;
      this.codeOutput.innerHTML = this.highlight(this.currentCommand, this.currentFormat);

      // Update stats
      const charCount = this.currentCommand.length;
      const lineCount = this.currentCommand.split('\n').length;
      this.statsEl.textContent = `字符数: ${charCount} | 行数: ${lineCount}`;
    }

    syncWithState(state) {
      if (state.outputFormat && state.outputFormat !== this.currentFormat) {
        this.currentFormat = state.outputFormat;
        const pills = this.container.querySelectorAll('.format-pill');
        pills.forEach(p => {
          p.classList.toggle('active', p.dataset.fmt === this.currentFormat);
        });
      }
      this.updateOutput();
    }
  }

  return TerminalOutput;
}));
