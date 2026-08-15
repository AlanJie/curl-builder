/**
 * Automated Verification & Unit Test Suite for cURL Command Generator
 * Runs under Node.js: node test/verify-generator.js
 */

const assert = require('assert');
const ShellEscaper = require('../js/core/shell-escaper');
const CurlGenerator = require('../js/core/curl-generator');
const StateStore = require('../js/core/state-store');
const CurlFlagsData = require('../js/core/curl-flags-data');

let passedCount = 0;
let totalCount = 0;

function runTest(title, testFn) {
  totalCount++;
  try {
    testFn();
    console.log(`  \x1b[32m✔\x1b[0m ${title}`);
    passedCount++;
  } catch (err) {
    console.error(`  \x1b[31m✘\x1b[0m ${title}`);
    console.error(`    \x1b[33mError: ${err.message}\x1b[0m`);
    if (err.expected !== undefined && err.actual !== undefined) {
      console.error(`    Expected: ${err.expected}`);
      console.error(`    Actual:   ${err.actual}`);
    }
  }
}

console.log('\n========================================');
console.log('  cURL Generator Test Suite');
console.log('========================================\n');

// 1. Shell Escaper Tests
console.log('1. Testing Shell Escaper:');

runTest('Bash escaping with simple URL string', () => {
  assert.strictEqual(ShellEscaper.escapeBash('https://api.example.com/users'), 'https://api.example.com/users');
});

runTest('Bash escaping with spaces and single quotes', () => {
  const input = "user's data with space";
  const output = ShellEscaper.escapeBash(input);
  assert.strictEqual(output, "'user'\\''s data with space'");
});

runTest('PowerShell escaping with single quotes', () => {
  const input = "user's data with space";
  const output = ShellEscaper.escapePowerShell(input);
  assert.strictEqual(output, "'user''s data with space'");
});

runTest('Windows CMD escaping with double quotes and spaces', () => {
  const input = '{"name": "test", "age": 25}';
  const output = ShellEscaper.escapeCmd(input);
  assert.strictEqual(output, '"{\\"name\\": \\"test\\", \\"age\\": 25}"');
});

runTest('Windows CMD escaping % variable expansion', () => {
  const input = 'value_with_%path%';
  const output = ShellEscaper.escapeCmd(input);
  assert.strictEqual(output, '"value_with_%%path%%"');
});

// 2. Command Formatting Tests
console.log('\n2. Testing Multi-Platform Command Formatting:');

runTest('Bash multi-line with backslash continuation', () => {
  const tokens = [
    { flag: '-X', value: 'POST' },
    { flag: '--url', value: 'https://api.example.com' },
    { flag: '-H', value: 'Content-Type: application/json' }
  ];
  const bashCmd = ShellEscaper.formatCommand(tokens, 'bash');
  assert.ok(bashCmd.includes('curl \\'));
  assert.ok(bashCmd.includes('-X POST \\'));
  assert.ok(bashCmd.includes('--url https://api.example.com \\'));
  assert.ok(bashCmd.includes("-H 'Content-Type: application/json'"));
});

runTest('PowerShell multi-line with backtick continuation', () => {
  const tokens = [
    { flag: '-X', value: 'POST' },
    { flag: '--url', value: 'https://api.example.com' }
  ];
  const psCmd = ShellEscaper.formatCommand(tokens, 'powershell');
  assert.ok(psCmd.includes('curl `'));
  assert.ok(psCmd.includes('-X POST `'));
});

runTest('Windows CMD multi-line with caret continuation', () => {
  const tokens = [
    { flag: '-X', value: 'POST' },
    { flag: '--url', value: 'https://api.example.com' }
  ];
  const cmd = ShellEscaper.formatCommand(tokens, 'cmd');
  assert.ok(cmd.includes('curl ^'));
  assert.ok(cmd.includes('-X POST ^'));
});

runTest('Single line format with compact spacing', () => {
  const tokens = [
    { flag: '-X', value: 'POST' },
    { flag: '--url', value: 'https://api.example.com' },
    { flag: '-H', value: 'Accept: text/plain' }
  ];
  const singleCmd = ShellEscaper.formatCommand(tokens, 'single');
  assert.ok(!singleCmd.includes('\n'));
  assert.ok(singleCmd.includes('curl -X POST --url https://api.example.com -H \'Accept: text/plain\''));
});

// 3. Full Request Generation Tests
console.log('\n3. Testing Full Request Compilation:');

runTest('GET request with query params and headers', () => {
  const state = {
    method: 'GET',
    url: 'https://api.example.com/items',
    queryParams: [
      { key: 'page', value: '1', enabled: true },
      { key: 'limit', value: '20', enabled: true },
      { key: 'archived', value: 'false', enabled: false }
    ],
    headers: [
      { key: 'Accept', value: 'application/json', enabled: true }
    ],
    body: { type: 'none' },
    auth: { type: 'none' },
    activeFlags: {}
  };

  const output = CurlGenerator.generate(state);
  assert.ok(output.bash.includes("'https://api.example.com/items?page=1&limit=20'"));
  assert.ok(!output.bash.includes('archived'));
  assert.ok(output.bash.includes("-H 'Accept: application/json'"));
});

runTest('POST request with JSON body & Bearer Token', () => {
  const state = {
    method: 'POST',
    url: 'https://api.example.com/v1/auth',
    queryParams: [],
    headers: [],
    body: {
      type: 'json',
      json: '{"user": "alice", "active": true}'
    },
    auth: {
      type: 'bearer',
      bearerToken: 'secret_token_12345'
    },
    activeFlags: {}
  };

  const output = CurlGenerator.generate(state);
  assert.ok(output.bash.includes('-X POST'));
  assert.ok(output.bash.includes("-H 'Authorization: Bearer secret_token_12345'"));
  assert.ok(output.bash.includes("-H 'Content-Type: application/json'"));
  assert.ok(output.bash.includes("--data-raw '{\"user\": \"alice\", \"active\": true}'"));
  
  // Verify CMD double quote escaping for JSON
  assert.ok(output.cmd.includes('--data-raw "{\\"user\\": \\"alice\\", \\"active\\": true}"'));
});

runTest('Multipart Form Data with file upload', () => {
  const state = {
    method: 'POST',
    url: 'https://api.example.com/upload',
    queryParams: [],
    headers: [],
    body: {
      type: 'form-data',
      formData: [
        { key: 'title', value: 'Report 2026', type: 'text', enabled: true },
        { key: 'document', value: '/tmp/report.pdf', type: 'file', enabled: true }
      ]
    },
    auth: { type: 'none' },
    activeFlags: {}
  };

  const output = CurlGenerator.generate(state);
  assert.ok(output.bash.includes("-F 'title=Report 2026'"));
  assert.ok(output.bash.includes("-F 'document=@/tmp/report.pdf'"));
});

runTest('Basic Auth with user and password', () => {
  const state = {
    method: 'GET',
    url: 'https://api.example.com/secure',
    queryParams: [],
    headers: [],
    body: { type: 'none' },
    auth: {
      type: 'basic',
      basicUser: 'admin',
      basicPass: 'p@ssw0rd!'
    },
    activeFlags: {}
  };

  const output = CurlGenerator.generate(state);
  assert.ok(output.bash.includes("-u 'admin:p@ssw0rd!'"));
});

runTest('Advanced cURL Man Page Flags incorporation', () => {
  const state = {
    method: 'GET',
    url: 'https://api.example.com/data',
    queryParams: [],
    headers: [],
    body: { type: 'none' },
    auth: { type: 'none' },
    activeFlags: {
      'location': { id: 'location', name: '--location', type: 'boolean', enabled: true },
      'insecure': { id: 'insecure', name: '--insecure', type: 'boolean', enabled: true },
      'connect-timeout': { id: 'connect-timeout', name: '--connect-timeout', type: 'number', value: '15', enabled: true },
      'proxy': { id: 'proxy', name: '--proxy', type: 'string', value: 'http://127.0.0.1:7890', enabled: true }
    }
  };

  const output = CurlGenerator.generate(state);
  assert.ok(output.bash.includes('--location'));
  assert.ok(output.bash.includes('--insecure'));
  assert.ok(output.bash.includes('--connect-timeout 15'));
  assert.ok(output.bash.includes('--proxy http://127.0.0.1:7890'));
});

// 4. State Store & Synchronization Tests
console.log('\n4. Testing Reactive State Store:');

runTest('Store initial state & subscriptions', () => {
  const store = new StateStore();
  let receivedState = null;
  const unsubscribe = store.subscribe(s => { receivedState = s; });

  store.setMethod('DELETE');
  assert.strictEqual(receivedState.method, 'DELETE');
  unsubscribe();
});

runTest('URL change parses Query Parameters into table', () => {
  const store = new StateStore();
  store.setUrl('https://test.com/api?tag=tech&sort=desc');
  const params = store.getState().queryParams;
  assert.strictEqual(params.length, 2);
  assert.strictEqual(params[0].key, 'tag');
  assert.strictEqual(params[0].value, 'tech');
  assert.strictEqual(params[1].key, 'sort');
  assert.strictEqual(params[1].value, 'desc');
});

runTest('Query Parameters table edits update URL', () => {
  const store = new StateStore();
  store.setUrl('https://test.com/api');
  store.setQueryParams([
    { key: 'filter', value: 'active', enabled: true },
    { key: 'page', value: '2', enabled: true }
  ]);
  assert.strictEqual(store.getState().url, 'https://test.com/api?filter=active&page=2');
});

// 5. Man Page Data Integrity Tests
console.log('\n5. Testing cURL Man Page Registry:');

runTest('Registry contains > 250 flags parsed from official man page', () => {
  assert.ok(CurlFlagsData.FLAGS.length >= 250, `Found ${CurlFlagsData.FLAGS.length} flags`);
});

runTest('Search flags by keyword returns matches', () => {
  const timeoutFlags = CurlFlagsData.searchFlags('timeout');
  assert.ok(timeoutFlags.length > 0);
  assert.ok(timeoutFlags.some(f => f.name === '--connect-timeout'));
});

runTest('Category filter returns correct flags', () => {
  const secFlags = CurlFlagsData.searchFlags('', 'security');
  assert.ok(secFlags.length > 0);
  assert.ok(secFlags.some(f => f.name === '--insecure'));
});

console.log('\n========================================');
console.log(`  Results: ${passedCount}/${totalCount} tests passed`);
console.log('========================================\n');

if (passedCount !== totalCount) {
  process.exit(1);
}
