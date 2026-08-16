import re
import json
import os
from bs4 import BeautifulSoup

with open("manpage.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

contents = soup.find(class_="contents")
elements = contents.find_all(['p', 'pre', 'h2'])

in_options = False
options = []
cur_opt = None

for el in elements:
    if el.name == 'h2':
        text = el.get_text().strip()
        if text == 'All options':
            in_options = True
            continue
        elif in_options:
            break
    if not in_options:
        continue
    
    if el.name == 'p' and 'level0' in el.get('class', []):
        nroffip = el.find(class_='nroffip')
        if nroffip and nroffip.get_text().strip().startswith('-'):
            if cur_opt:
                options.append(cur_opt)
            cur_opt = {
                'header': nroffip.get_text().strip(),
                'elements': []
            }
            continue
    if cur_opt:
        cur_opt['elements'].append(el)

if cur_opt:
    options.append(cur_opt)

print(f"Total raw options: {len(options)}")

CURATED_CHOICES = {
    '--cert-type': [
        {'value': 'PEM', 'desc': 'PEM format certificate (default)'},
        {'value': 'DER', 'desc': 'DER format certificate'},
        {'value': 'ENG', 'desc': 'Crypto engine certificate'},
        {'value': 'P12', 'desc': 'PKCS#12 format certificate'}
    ],
    '--key-type': [
        {'value': 'PEM', 'desc': 'PEM format private key (default)'},
        {'value': 'DER', 'desc': 'DER format private key'},
        {'value': 'ENG', 'desc': 'Crypto engine private key'}
    ],
    '--proxy-type': [
        {'value': 'http', 'desc': 'HTTP proxy (default)'},
        {'value': 'https', 'desc': 'HTTPS proxy'},
        {'value': 'socks4', 'desc': 'SOCKS4 proxy'},
        {'value': 'socks4a', 'desc': 'SOCKS4a proxy (DNS on proxy)'},
        {'value': 'socks5', 'desc': 'SOCKS5 proxy'},
        {'value': 'socks5h', 'desc': 'SOCKS5 proxy with hostname resolving on proxy'}
    ],
    '--ftp-ssl-ccc-mode': [
        {'value': 'active', 'desc': 'Initiates the shutdown from client'},
        {'value': 'passive', 'desc': 'Waits for the server to initiate shutdown'}
    ],
    '--ssl-reqd': [
        {'value': 'true', 'desc': 'Require SSL/TLS for connection'}
    ],
    '--trace-config': [
        {'value': 'all', 'desc': 'Enable all components'},
        {'value': 'ids', 'desc': 'Include transfer and connection IDs'},
        {'value': 'time', 'desc': 'Include timestamps with microsecond resolution'},
        {'value': 'http/2', 'desc': 'HTTP/2 protocol trace'},
        {'value': 'http/3', 'desc': 'HTTP/3 protocol trace'},
        {'value': 'ssl', 'desc': 'SSL/TLS protocol trace'}
    ]
}

EXPLICIT_DATA = {
    '--location': {'category': 'http', 'type': 'boolean', 'label': 'Follow Redirects (跟从重定向)'},
    '-L': {'category': 'http', 'type': 'boolean', 'label': 'Follow Redirects (跟从重定向)'},
    '--insecure': {'category': 'security', 'type': 'boolean', 'label': 'Insecure SSL (忽略SSL证书检查)'},
    '-k': {'category': 'security', 'type': 'boolean', 'label': 'Insecure SSL (忽略SSL证书检查)'},
    '--header': {'category': 'http', 'type': 'string', 'label': 'Custom Header (自定义请求头)'},
    '-H': {'category': 'http', 'type': 'string', 'label': 'Custom Header (自定义请求头)'},
    '--data': {'category': 'http', 'type': 'string', 'label': 'HTTP POST Data (提交数据)'},
    '-d': {'category': 'http', 'type': 'string', 'label': 'HTTP POST Data (提交数据)'},
    '--data-raw': {'category': 'http', 'type': 'string', 'label': 'Raw POST Data (不转义@符号的数据)'},
    '--form': {'category': 'http', 'type': 'string', 'label': 'Multipart Form Data (表单提交)'},
    '-F': {'category': 'http', 'type': 'string', 'label': 'Multipart Form Data (表单提交)'},
    '--user': {'category': 'auth', 'type': 'string', 'label': 'User & Password (认证用户名密码)'},
    '-u': {'category': 'auth', 'type': 'string', 'label': 'User & Password (认证用户名密码)'},
    '--silent': {'category': 'output', 'type': 'boolean', 'label': 'Silent Mode (静默模式/不显示进度)'},
    '-s': {'category': 'output', 'type': 'boolean', 'label': 'Silent Mode (静默模式/不显示进度)'},
    '--show-error': {'category': 'output', 'type': 'boolean', 'label': 'Show Error (在静默时仍显示错误)'},
    '-S': {'category': 'output', 'type': 'boolean', 'label': 'Show Error (在静默时仍显示错误)'},
    '--verbose': {'category': 'output', 'type': 'boolean', 'label': 'Verbose Mode (详细调试输出)'},
    '-v': {'category': 'output', 'type': 'boolean', 'label': 'Verbose Mode (详细调试输出)'},
    '--output': {'category': 'output', 'type': 'filepath', 'label': 'Output to File (输出保存到文件)'},
    '-o': {'category': 'output', 'type': 'filepath', 'label': 'Output to File (输出保存到文件)'},
    '--remote-name': {'category': 'output', 'type': 'boolean', 'label': 'Remote Name (使用远程文件名保存)'},
    '-O': {'category': 'output', 'type': 'boolean', 'label': 'Remote Name (使用远程文件名保存)'},
    '--request': {'category': 'http', 'type': 'string', 'label': 'Custom Method (指定HTTP请求方法)'},
    '-X': {'category': 'http', 'type': 'string', 'label': 'Custom Method (指定HTTP请求方法)'},
    '--user-agent': {'category': 'http', 'type': 'string', 'label': 'User-Agent (指定客户端UA标识)'},
    '-A': {'category': 'http', 'type': 'string', 'label': 'User-Agent (指定客户端UA标识)'},
    '--referer': {'category': 'http', 'type': 'string', 'label': 'Referer URL (请求来源地址)'},
    '-e': {'category': 'http', 'type': 'string', 'label': 'Referer URL (请求来源地址)'},
    '--cookie': {'category': 'http', 'type': 'string', 'label': 'HTTP Cookie (发送Cookie)'},
    '-b': {'category': 'http', 'type': 'string', 'label': 'HTTP Cookie (发送Cookie)'},
    '--cookie-jar': {'category': 'http', 'type': 'filepath', 'label': 'Cookie Jar (写入Cookie到文件)'},
    '-c': {'category': 'http', 'type': 'filepath', 'label': 'Cookie Jar (写入Cookie到文件)'},
    '--compressed': {'category': 'http', 'type': 'boolean', 'label': 'Request Compressed (支持Gzip/Deflate压缩)'},
    '--head': {'category': 'http', 'type': 'boolean', 'label': 'Fetch Headers Only (仅获取响应头)'},
    '-I': {'category': 'http', 'type': 'boolean', 'label': 'Fetch Headers Only (仅获取响应头)'},
    '--include': {'category': 'http', 'type': 'boolean', 'label': 'Include Protocol Headers (输出包含响应头)'},
    '-i': {'category': 'http', 'type': 'boolean', 'label': 'Include Protocol Headers (输出包含响应头)'},
    '--fail': {'category': 'output', 'type': 'boolean', 'label': 'Fail on HTTP Errors (HTTP错误状态码时静默失败)'},
    '-f': {'category': 'output', 'type': 'boolean', 'label': 'Fail on HTTP Errors (HTTP错误状态码时静默失败)'},
    '--fail-with-body': {'category': 'output', 'type': 'boolean', 'label': 'Fail With Body (HTTP错误时仍输出响应体)'},
    '--connect-timeout': {'category': 'network', 'type': 'number', 'label': 'Connect Timeout (连接超时秒数)'},
    '--max-time': {'category': 'network', 'type': 'number', 'label': 'Max Operation Time (整个请求最大耗时秒数)'},
    '-m': {'category': 'network', 'type': 'number', 'label': 'Max Operation Time (整个请求最大耗时秒数)'},
    '--retry': {'category': 'network', 'type': 'number', 'label': 'Retry Count (网络失败时重试次数)'},
    '--retry-delay': {'category': 'network', 'type': 'number', 'label': 'Retry Delay (重试等待间隔秒数)'},
    '--proxy': {'category': 'proxy', 'type': 'string', 'label': 'Proxy Server (HTTP/HTTPS/SOCKS代理)'},
    '-x': {'category': 'proxy', 'type': 'string', 'label': 'Proxy Server (HTTP/HTTPS/SOCKS代理)'},
    '--proxy-user': {'category': 'proxy', 'type': 'string', 'label': 'Proxy User & Pass (代理服务器认证)'},
    '-U': {'category': 'proxy', 'type': 'string', 'label': 'Proxy User & Pass (代理服务器认证)'},
    '--socks5': {'category': 'proxy', 'type': 'string', 'label': 'SOCKS5 Proxy (SOCKS5代理)'},
    '--noproxy': {'category': 'proxy', 'type': 'string', 'label': 'No Proxy List (不走代理的域名白名单)'},
    '--cacert': {'category': 'security', 'type': 'filepath', 'label': 'CA Certificate (CA根证书文件)'},
    '--cert': {'category': 'security', 'type': 'filepath', 'label': 'Client Certificate (客户端SSL证书文件)'},
    '-E': {'category': 'security', 'type': 'filepath', 'label': 'Client Certificate (客户端SSL证书文件)'},
    '--key': {'category': 'security', 'type': 'filepath', 'label': 'Private Key (私钥文件)'},
    '--tlsv1.2': {'category': 'security', 'type': 'boolean', 'label': 'TLS 1.2 Minimum (强制使用TLS 1.2以上)'},
    '--tlsv1.3': {'category': 'security', 'type': 'boolean', 'label': 'TLS 1.3 Minimum (强制使用TLS 1.3)'},
    '--http1.1': {'category': 'protocol', 'type': 'boolean', 'label': 'HTTP/1.1 (使用HTTP 1.1协议)'},
    '--http2': {'category': 'protocol', 'type': 'boolean', 'label': 'HTTP/2 (优先使用HTTP 2协议)'},
    '--http3': {'category': 'protocol', 'type': 'boolean', 'label': 'HTTP/3 (使用HTTP 3 QUIC协议)'},
    '--limit-rate': {'category': 'network', 'type': 'string', 'label': 'Limit Speed Rate (限速如 200K, 1M)'},
    '--interface': {'category': 'network', 'type': 'string', 'label': 'Network Interface (绑定特定网卡/IP)'},
    '--resolve': {'category': 'network', 'type': 'string', 'label': 'Custom DNS Resolve (自定义HOST解析 HOST:PORT:IP)'},
    '--dump-header': {'category': 'output', 'type': 'filepath', 'label': 'Dump Response Headers (将响应头存至文件)'},
    '-D': {'category': 'output', 'type': 'filepath', 'label': 'Dump Response Headers (将响应头存至文件)'},
    '--oauth2-bearer': {'category': 'auth', 'type': 'string', 'label': 'OAuth2 Bearer Token'},
    '--digest': {'category': 'auth', 'type': 'boolean', 'label': 'Use HTTP Digest Auth (启用摘要认证)'},
    '--ipv4': {'category': 'network', 'type': 'boolean', 'label': 'IPv4 Only (强制使用IPv4解析)'},
    '-4': {'category': 'network', 'type': 'boolean', 'label': 'IPv4 Only (强制使用IPv4解析)'},
    '--ipv6': {'category': 'network', 'type': 'boolean', 'label': 'IPv6 Only (强制使用IPv6解析)'},
    '-6': {'category': 'network', 'type': 'boolean', 'label': 'IPv6 Only (强制使用IPv6解析)'},
    '--ech': {'category': 'security', 'type': 'choice', 'label': 'Encrypted Client Hello (加密客户端问候)'},
    '--tls-max': {'category': 'security', 'type': 'choice', 'label': 'Maximum TLS Version (最大TLS版本)'},
    '--delegation': {'category': 'auth', 'type': 'choice', 'label': 'GSS/Kerberos Delegation Level (委托级别)'},
    '--ftp-method': {'category': 'protocol', 'type': 'choice', 'label': 'FTP CWD Method (FTP目录获取方式)'},
}

POPULAR_FLAGS = {
    '--location': 100, '-L': 100,
    '--insecure': 100, '-k': 100,
    '--header': 100, '-H': 100,
    '--data': 100, '-d': 100,
    '--data-raw': 95,
    '--form': 95, '-F': 95,
    '--user': 95, '-u': 95,
    '--silent': 95, '-s': 95,
    '--show-error': 90, '-S': 90,
    '--verbose': 95, '-v': 95,
    '--output': 95, '-o': 95,
    '--remote-name': 90, '-O': 90,
    '--request': 90, '-X': 90,
    '--user-agent': 90, '-A': 90,
    '--referer': 85, '-e': 85,
    '--cookie': 90, '-b': 90,
    '--cookie-jar': 85, '-c': 85,
    '--connect-timeout': 90,
    '--max-time': 90, '-m': 90,
    '--retry': 85,
    '--retry-delay': 80,
    '--proxy': 90, '-x': 90,
    '--compressed': 90,
    '--head': 85, '-I': 85,
    '--include': 85, '-i': 85,
    '--fail': 85, '-f': 85,
    '--fail-with-body': 80,
    '--limit-rate': 80,
    '--cacert': 80,
    '--cert': 80, '-E': 80,
    '--key': 80,
    '--tlsv1.2': 75,
    '--tlsv1.3': 75,
    '--http1.1': 80,
    '--http2': 85,
    '--http3': 80,
    '--ipv4': 75, '-4': 75,
    '--ipv6': 75, '-6': 75,
    '--dump-header': 80, '-D': 80,
    '--oauth2-bearer': 85,
    '--digest': 80,
    '--resolve': 75,
    '--ech': 80,
    '--tls-max': 75
}

def auto_categorize(name, short, desc):
    d = (name + " " + (short or "") + " " + desc).lower()
    if any(k in d for k in ['ssl', 'tls', 'cert', 'insecure', 'cacert', 'ciphers', 'key-type', 'pubkey', 'hsts', 'pinnedpubkey', 'crlfile', 'ech']):
        return 'security'
    if any(k in d for k in ['auth', 'password', 'oauth', 'bearer', 'digest', 'ntlm', 'negotiate', 'aws-sigv4', 'netrc', 'delegation']):
        return 'auth'
    if any(k in d for k in ['proxy', 'socks', 'noproxy', 'socks5', 'socks4', 'proxy-user']):
        return 'proxy'
    if any(k in d for k in ['header', 'cookie', 'user-agent', 'referer', 'etag', 'compressed', 'location', 'head', 'range', 'altsvc', 'alt-svc']):
        return 'http'
    if any(k in d for k in ['timeout', 'retry', 'connect-timeout', 'max-time', 'limit-rate', 'speed-limit', 'speed-time', 'interface', 'dns-', 'ipv4', 'ipv6', 'resolve', 'tcp-', 'keepalive', 'doh-url']):
        return 'network'
    if any(k in d for k in ['output', 'silent', 'verbose', 'trace', 'write-out', 'remote-name', 'progress', 'show-error', 'fail', 'stderr', 'dump-header']):
        return 'output'
    if any(k in d for k in ['http1', 'http2', 'http3', 'ftp', 'sftp', 'tftp', 'smtp', 'pop3', 'imap', 'ldap', 'mqtt', 'telnet', 'rtsp', 'gopher', 'ws', 'websocket']):
        return 'protocol'
    return 'general'

def auto_detect_type(header, arg_str, choices):
    if choices and len(choices) > 0:
        return 'choice'
    if not arg_str:
        return 'boolean'
    arg_lower = arg_str.lower()
    if any(k in arg_lower for k in ['<file', '<path', '<dir', 'file>', 'filename>', 'cert>']):
        return 'filepath'
    if any(k in arg_lower for k in ['<seconds>', '<num>', '<number>', '<count>', '<bytes>', '<speed>', '<offset>', '<fractional']):
        return 'number'
    return 'string'

parsed_flags = []
seen_names = set()

for opt in options:
    header = opt['header'].strip()
    short_name = None
    long_name = None
    arg_name = None
    
    m = re.match(r'^(-[a-zA-Z0-9])(?:,\s*(--[a-zA-Z0-9-]+))?(?:\s+(.*))?$', header)
    if m:
        short_name = m.group(1)
        long_name = m.group(2)
        arg_name = m.group(3)
    else:
        m2 = re.match(r'^(--[a-zA-Z0-9-]+)(?:\s+(.*))?$', header)
        if m2:
            long_name = m2.group(1)
            arg_name = m2.group(2)
        else:
            m3 = re.match(r'^(-[a-zA-Z0-9])(?:\s+(.*))?$', header)
            if m3:
                short_name = m3.group(1)
                arg_name = m3.group(2)
            else:
                parts = header.split()
                long_name = parts[0]
                arg_name = " ".join(parts[1:]) if len(parts) > 1 else None

    primary_name = long_name or short_name
    if not primary_name or primary_name in seen_names:
        continue
    seen_names.add(primary_name)
    
    flag_id = primary_name.lstrip('-')
    
    # Parse elements
    choices = []
    paragraphs = []
    examples = []
    cur_choice = None
    added_in = None
    see_also = []
    
    for el in opt['elements']:
        if el.name == 'pre':
            examples.append(el.get_text().strip())
            continue
            
        classes = el.get('class', [])
        nroffip = el.find(class_='nroffip')
        text = el.get_text().strip()
        
        # Check Added in / See also
        m_added = re.search(r'Added in\s+([0-9\.]+)', text)
        if m_added:
            added_in = m_added.group(1)
            
        if 'See also' in text:
            see_links = [a.get_text().strip() for a in el.find_all('a') if a.get_text().strip().startswith('-')]
            if see_links:
                see_also.extend(see_links)
        
        # Choice header (level1 + nroffip)
        if el.name == 'p' and 'level1' in classes and nroffip:
            val = nroffip.get_text().strip()
            if val and not val.startswith('-') and not val.startswith('http') and len(val) < 60:
                if cur_choice:
                    choices.append(cur_choice)
                cur_choice = {'value': val, 'desc': []}
                continue
                
        # Choice description (level2)
        if cur_choice and el.name == 'p' and 'level2' in classes:
            if text:
                cur_choice['desc'].append(text)
            continue
        else:
            if cur_choice:
                choices.append(cur_choice)
                cur_choice = None
            if text:
                paragraphs.append(text)
                
    if cur_choice:
        choices.append(cur_choice)
        
    for c in choices:
        c['desc'] = " ".join(c['desc']).strip()
        
    # Merge with curated choices if applicable
    if primary_name in CURATED_CHOICES:
        choices = CURATED_CHOICES[primary_name]
    elif short_name and short_name in CURATED_CHOICES:
        choices = CURATED_CHOICES[short_name]
        
    full_doc = "\n\n".join(paragraphs).strip()
    summary = paragraphs[0] if paragraphs else full_doc
    
    override = EXPLICIT_DATA.get(primary_name, EXPLICIT_DATA.get(short_name, {}))
    category = override.get('category', auto_categorize(primary_name, short_name, full_doc))
    param_type = override.get('type', auto_detect_type(header, arg_name, choices))
    label = override.get('label', f"{primary_name} {arg_name or ''}".strip())
    popularity = POPULAR_FLAGS.get(primary_name, POPULAR_FLAGS.get(short_name, 15))
    
    parsed_flags.append({
        'id': flag_id,
        'name': primary_name,
        'short': short_name if long_name else None,
        'arg': arg_name,
        'label': label,
        'type': param_type,
        'category': category,
        'popularity': popularity,
        'summary': summary,
        'description': full_doc,
        'choices': choices,
        'examples': examples,
        'addedIn': added_in,
        'seeAlso': see_also
    })

CATEGORY_ORDER = {'http': 1, 'network': 2, 'security': 3, 'output': 4, 'auth': 5, 'proxy': 6, 'protocol': 7, 'general': 8}
parsed_flags.sort(key=lambda x: (-x['popularity'], CATEGORY_ORDER.get(x['category'], 99), x['name']))

flags_json = json.dumps(parsed_flags, indent=2, ensure_ascii=False)

js_content = """/**
 * cURL Man Page Options Metadata Registry
 * Generated directly from cURL official Man Page (Detailed Docs & Structured Choices)
 * Total Flags: """ + str(len(parsed_flags)) + """
 */

(function(root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CurlFlagsData = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const CATEGORIES = {
    all: { id: 'all', name: '全部参数', icon: '⚡' },
    http: { id: 'http', name: 'HTTP & 头部', icon: '🌐' },
    network: { id: 'network', name: '网络传输与超时', icon: '⏱️' },
    security: { id: 'security', name: '安全与 SSL/TLS', icon: '🔒' },
    output: { id: 'output', name: '输出与调试', icon: '📄' },
    auth: { id: 'auth', name: '认证授权', icon: '🔑' },
    proxy: { id: 'proxy', name: '网络代理', icon: '🛡️' },
    protocol: { id: 'protocol', name: '协议版本', icon: '🔌' },
    general: { id: 'general', name: '通用选项', icon: '⚙️' }
  };

  const FLAGS = """ + flags_json + """;

  function getFlagById(id) {
    return FLAGS.find(f => f.id === id || f.name === id || f.short === id);
  }

  function searchFlags(query, category) {
    const q = (query || '').trim().toLowerCase();
    return FLAGS.filter(f => {
      const matchCat = !category || category === 'all' || f.category === category;
      if (!matchCat) return false;
      if (!q) return true;
      return f.name.toLowerCase().includes(q) ||
             (f.short && f.short.toLowerCase().includes(q)) ||
             f.label.toLowerCase().includes(q) ||
             f.summary.toLowerCase().includes(q) ||
             f.description.toLowerCase().includes(q) ||
             f.category.toLowerCase().includes(q) ||
             (f.choices && f.choices.some(c => c.value.toLowerCase().includes(q) || (c.desc && c.desc.toLowerCase().includes(q))));
    });
  }

  return {
    CATEGORIES,
    FLAGS,
    getFlagById,
    searchFlags
  };
}));
"""

with open("js/core/curl-flags-data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated js/core/curl-flags-data.js with {len(parsed_flags)} flags.")
