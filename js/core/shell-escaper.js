/**
 * Cross-Platform Shell Escaping Engine
 * Accurately handles quoting and character escaping for Bash (POSIX), PowerShell, and Windows CMD.
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ShellEscaper = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  // Characters strictly safe without quotes across standard shells: letters, digits, _, -, ., /, :, +
  // If string has spaces, quotes, &, ?, =, @, $, `, *, ;, <, >, |, (, ), {, }, %, then quoting is applied.
  const SAFE_TOKEN_REGEX = /^[a-zA-Z0-9_\-./:+]+$/;

  /**
   * Escape an argument for Bash / POSIX shells.
   */
  function escapeBash(arg) {
    if (arg === null || arg === undefined) return "''";
    const str = String(arg);
    if (str === '') return "''";

    if (SAFE_TOKEN_REGEX.test(str)) {
      return str;
    }

    return "'" + str.replace(/'/g, "'\\''") + "'";
  }

  /**
   * Escape an argument for PowerShell.
   */
  function escapePowerShell(arg) {
    if (arg === null || arg === undefined) return "''";
    const str = String(arg);
    if (str === '') return "''";

    if (SAFE_TOKEN_REGEX.test(str)) {
      return str;
    }

    return "'" + str.replace(/'/g, "''") + "'";
  }

  /**
   * Escape an argument for Windows CMD (Command Prompt).
   * Note: Windows CMD requires double quotes ("...").
   */
  function escapeCmd(arg) {
    if (arg === null || arg === undefined) return '""';
    const str = String(arg);
    if (str === '') return '""';

    if (SAFE_TOKEN_REGEX.test(str)) {
      return str;
    }

    let escaped = str
      .replace(/(\\*)"/g, '$1$1\\"')
      .replace(/%/g, '%%');

    return '"' + escaped + '"';
  }

  /**
   * Format tokens into a multi-line or single-line command for the target shell.
   *
   * @param {Array<string|{flag: string, value?: string}>} tokens
   * @param {'bash'|'powershell'|'cmd'|'single'} format
   * @returns {string} Formatted command
   */
  function formatCommand(tokens, format = 'bash') {
    if (!tokens || tokens.length === 0) return 'curl';

    const platform = (format || 'bash').toLowerCase();

    if (platform === 'single') {
      const parts = ['curl'];
      tokens.forEach(token => {
        if (typeof token === 'string') {
          if (token !== 'curl') parts.push(token);
        } else {
          const flag = token.flag;
          if (token.value === undefined || token.value === null) {
            parts.push(flag);
          } else {
            parts.push(`${flag} ${escapeBash(token.value)}`);
          }
        }
      });
      return parts.join(' ');
    }

    let continuationChar = '\\';
    let escaper = escapeBash;

    if (platform === 'powershell') {
      continuationChar = '`';
      escaper = escapePowerShell;
    } else if (platform === 'cmd') {
      continuationChar = '^';
      escaper = escapeCmd;
    }

    const lines = [];
    lines.push('curl');

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (typeof token === 'string') {
        if (i === 0 && token === 'curl') continue;
        lines.push(`  ${token}`);
      } else {
        const flag = token.flag;
        if (token.value === undefined || token.value === null) {
          lines.push(`  ${flag}`);
        } else {
          lines.push(`  ${flag} ${escaper(token.value)}`);
        }
      }
    }

    const formattedLines = lines.map((line, index) => {
      if (index === lines.length - 1) {
        return line;
      }
      return `${line} ${continuationChar}`;
    });

    return formattedLines.join('\n');
  }

  return {
    escapeBash,
    escapePowerShell,
    escapeCmd,
    formatCommand
  };
}));
