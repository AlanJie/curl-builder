/**
 * cURL Man Page Options Metadata Registry
 * Generated directly from cURL official Man Page (Detailed Docs & Structured Choices)
 * Total Flags: 278
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

  const FLAGS = [
  {
    "id": "data",
    "name": "--data",
    "short": "-d",
    "arg": "<data>",
    "label": "HTTP POST Data (提交数据)",
    "type": "string",
    "category": "http",
    "popularity": 100,
    "summary": "(HTTP MQTT) Send the specified data to a server.",
    "description": "(HTTP MQTT) Send the specified data to a server.\n\nFor HTTP(S), this is done with the POST method in the same way that a browser does when a user has filled in an HTML form and presses the submit button. This option makes curl pass the data to the server using the content-type application/x-www-form-urlencoded.\n\nFor MQTT, the data is sent as a PUBLISH.\n\n--data-raw is almost the same but does not have a special interpretation of the @ character. To post data purely binary, you should instead use the --data-binary option. To URL-encode the value of a form field you may use --data-urlencode.\n\nIf any of these options is used more than once on the same command line, the data pieces specified are merged with a separating &-symbol. Thus, using '-d name=daniel -d skill=lousy' would generate a post chunk that looks like 'name=daniel&skill=lousy'.\n\nIf you start the data with the letter @, the rest should be a filename to read the data from, or - if you want curl to read the data from stdin. Posting data from a file named 'foobar' would thus be done with --data @foobar. When --data is told to read from a file like that, carriage returns, newlines and null bytes are stripped out. If you do not want the @ character to have a special interpretation use --data-raw instead.\n\nThe data for this option is passed on to the server exactly as provided on the command line. curl does not convert, change or improve it. It is up to the user to provide the data in the correct form.\n\n--data can be used several times in a command line.\n\nExamples:\n\nThis option is mutually exclusive with --form, --head and --upload-file. See also --data-binary, --data-urlencode, --data-raw and --form.",
    "choices": [],
    "examples": [
      "curl -d \"name=curl\" https://example.com\ncurl -d \"name=curl\" -d \"tool=cmdline\" https://example.com\ncurl -d @filename https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--form",
      "--head",
      "--upload-file",
      "--data-binary",
      "--data-urlencode",
      "--data-raw",
      "--form"
    ]
  },
  {
    "id": "header",
    "name": "--header",
    "short": "-H",
    "arg": "<header/@file>",
    "label": "Custom Header (自定义请求头)",
    "type": "string",
    "category": "http",
    "popularity": 100,
    "summary": "(HTTP IMAP SMTP) Extra header to include in information sent. When used within an HTTP request, it is added to the regular request headers.",
    "description": "(HTTP IMAP SMTP) Extra header to include in information sent. When used within an HTTP request, it is added to the regular request headers.\n\nFor an IMAP or SMTP MIME uploaded mail built with --form options, it is prepended to the resulting MIME document, effectively including it at the mail global level. It does not affect raw uploaded mails.\n\nYou may specify any number of extra headers. Note that if you should add a custom header that has the same name as one of the internal ones curl would use, your externally set header is used instead of the internal one. This allows you to make even trickier stuff than curl would normally do. You should not replace internally set headers without knowing perfectly well what you are doing. Remove an internal header by giving a replacement without content on the right side of the colon, as in: -H \"Host:\". If you send the custom header with no-value then its header must be terminated with a semicolon, such as -H \"X-Custom-Header;\" to send \"X-Custom-Header:\".\n\ncurl makes sure that each header you add/replace is sent with the proper end-of-line marker, you should thus not add that as a part of the header content: do not add newlines or carriage returns, they only mess things up for you. curl passes on the verbatim string you give it without any filter or other safe guards. That includes white space and control characters.\n\nThis option can take an argument in @filename style, which then adds a header for each line in the input file. Using @- makes curl read the header file from stdin.\n\nPlease note that most anti-spam utilities check the presence and value of several MIME mail headers: these are \"From:\", \"To:\", \"Date:\" and \"Subject:\" among others and should be added with this option.\n\nYou need --proxy-header to send custom headers intended for an HTTP proxy.\n\nPassing on a \"Transfer-Encoding: chunked\" header when doing an HTTP request with a request body, makes curl send the data using chunked encoding.\n\nWARNING: headers set with this option are set in all HTTP requests - even after redirects are followed, like when told with --location. This can lead to the header being sent to other hosts than the original host, so sensitive headers should be used with caution combined with following redirects.\n\n\"Authorization:\" and \"Cookie:\" headers are explicitly not passed on in HTTP requests when following redirects to other origins, unless --location-trusted is used.\n\n--header can be used several times in a command line.\n\nExamples:\n\nSee also --user-agent, --referer and --proxy-header.",
    "choices": [],
    "examples": [
      "curl -H \"X-First-Name: Joe\" https://example.com\ncurl -H \"User-Agent: yes-please/2000\" https://example.com\ncurl -H \"Host:\" https://example.com\ncurl -H @headers.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user-agent",
      "--referer",
      "--proxy-header"
    ]
  },
  {
    "id": "location",
    "name": "--location",
    "short": "-L",
    "arg": null,
    "label": "Follow Redirects (跟从重定向)",
    "type": "boolean",
    "category": "http",
    "popularity": 100,
    "summary": "(HTTP) If the server reports that the requested page has moved to a different location (indicated with a Location: header and a 3XX response code), this option makes curl redo the request to the new place. If used together with --show-headers or --head, headers from all requested pages are shown.",
    "description": "(HTTP) If the server reports that the requested page has moved to a different location (indicated with a Location: header and a 3XX response code), this option makes curl redo the request to the new place. If used together with --show-headers or --head, headers from all requested pages are shown.\n\nWhen authentication is provided on the command line (for example --user or --oauth2-bearer), or when sending a cookie with \"-H Cookie:\", curl only sends its credentials to the initial host. If a redirect takes curl to a different host, it does not get the credentials passed on. See --location-trusted on how to change this. When --netrc is used in combination with this option, credentials for the followed-to hosts may also be selected from that file.\n\nLimit the amount of redirects to follow by using the --max-redirs option.\n\nWhen curl follows a redirect and if the request is a POST, it sends the following request with a GET if the HTTP response was 301, 302, or 303. If the response code was any other 3xx code, curl resends the following request using the same unmodified method.\n\nYou can tell curl to not change POST requests to GET after a 30x response by using the dedicated options for that: --post301, --post302 and --post303.\n\nThe method set with --request overrides the method curl would otherwise select to use.\n\nRestrict which protocols a redirect is accepted to follow with --proto-redir.\n\nProviding --location multiple times has no extra effect. Disable it again with --no-location.\n\nExample:\n\nSee also --resolve, --alt-svc, --follow, --proto-redir and --max-redirs.",
    "choices": [],
    "examples": [
      "curl -L https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--resolve",
      "--alt-svc",
      "--follow",
      "--proto-redir",
      "--max-redirs"
    ]
  },
  {
    "id": "insecure",
    "name": "--insecure",
    "short": "-k",
    "arg": null,
    "label": "Insecure SSL (忽略SSL证书检查)",
    "type": "boolean",
    "category": "security",
    "popularity": 100,
    "summary": "(TLS SFTP SCP) By default, every secure connection curl makes is verified to be secure before the transfer takes place. This option makes curl skip the verification step and proceed without checking.",
    "description": "(TLS SFTP SCP) By default, every secure connection curl makes is verified to be secure before the transfer takes place. This option makes curl skip the verification step and proceed without checking.\n\nWhen this option is not used for protocols using TLS, curl verifies the server's TLS certificate before it continues: that the certificate contains the right name which matches the hostname used in the URL and that the certificate has been signed by a CA certificate present in the cert store. See this online resource for further details: https://curl.se/docs/sslcerts.html\n\nFor SFTP and SCP, this option makes curl skip the known_hosts verification. known_hosts is a file normally stored in the user's home directory in the \".ssh\" subdirectory, which contains hostnames and their public keys.\n\nWARNING: using this option makes the transfer insecure.\n\nWhen curl uses secure protocols it trusts responses and allows for example HSTS and Alt-Svc information to be stored and used subsequently. Using --insecure can make curl trust and use such information from malicious servers.\n\nProviding --insecure multiple times has no extra effect. Disable it again with --no-insecure.\n\nExample:\n\nSee also --proxy-insecure, --cacert and --capath.",
    "choices": [],
    "examples": [
      "curl --insecure https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-insecure",
      "--cacert",
      "--capath"
    ]
  },
  {
    "id": "data-raw",
    "name": "--data-raw",
    "short": null,
    "arg": "<data>",
    "label": "Raw POST Data (不转义@符号的数据)",
    "type": "string",
    "category": "http",
    "popularity": 95,
    "summary": "(HTTP) Post data similarly to --data but without the special interpretation of the @ character.",
    "description": "(HTTP) Post data similarly to --data but without the special interpretation of the @ character.\n\n--data-raw can be used several times in a command line.\n\nExamples:\n\nSee also --data.",
    "choices": [],
    "examples": [
      "curl --data-raw \"hello\" https://example.com\ncurl --data-raw \"@at@at@\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data"
    ]
  },
  {
    "id": "form",
    "name": "--form",
    "short": "-F",
    "arg": "<name=content>",
    "label": "Multipart Form Data (表单提交)",
    "type": "string",
    "category": "http",
    "popularity": 95,
    "summary": "(HTTP SMTP IMAP) For the HTTP protocol family, emulate a filled-in form in which a user has pressed the submit button. This makes curl POST data using the Content-Type multipart/form-data according to RFC 2388.",
    "description": "(HTTP SMTP IMAP) For the HTTP protocol family, emulate a filled-in form in which a user has pressed the submit button. This makes curl POST data using the Content-Type multipart/form-data according to RFC 2388.\n\nFor SMTP and IMAP protocols, this composes a multipart mail message to transmit.\n\nThis enables uploading of binary files etc. To force the 'content' part to be a file, prefix the filename with an @ sign. To get the content part from a file, prefix the filename with the symbol <. The difference between @ and < is then that @ makes a file get attached in the post as a file upload, while the < makes a text field and gets the contents for that text field from a file.\n\nRead content from stdin instead of a file by using a single \"-\" as filename. This goes for both @ and < constructs. When stdin is used, the contents is buffered in memory first by curl to determine its size and allow a possible resend. Defining a part's data from a named non-regular file (such as a named pipe or similar) is not subject to buffering and is instead read at transmission time; since the full size is unknown before the transfer starts, such data is sent as chunks by HTTP and rejected by IMAP.\n\nExample: send an image to an HTTP server, where 'profile' is the name of the form-field to which the file portrait.jpg is the input:\n\nExample: send your name and shoe size in two text fields to the server:\n\nExample: send your essay in a text field to the server. Send it as a plain text field, but get the contents for it from a local file:\n\nYou can also instruct curl what Content-Type to use by using \"type=\", in a manner similar to:\n\nor\n\nYou can also explicitly change the name field of a file upload part by setting filename=, like this:\n\nIf filename/path contains ',' or ';', it must be quoted by double-quotes like:\n\nor\n\nNote that if a filename/path is quoted by double-quotes, any double-quote or backslash within the filename must be escaped by backslash.\n\nQuoting must also be applied to non-file data if it contains semicolons, leading/trailing spaces or leading double quotes:\n\nYou can add custom headers to the field by setting headers=, like\n\nor\n\nThe headers= keyword may appear more than once and above notes about quoting apply. When headers are read from a file, empty lines and lines starting with '#' are ignored; each header can be folded by splitting between two words and starting the continuation line with a space; embedded carriage-returns and trailing spaces are stripped. Here is an example of a header file contents:\n\nTo support sending multipart mail messages, the syntax is extended as follows:\n\n- name can be omitted: the equal sign is the first character of the argument,\n\n- if data starts with '(', this signals to start a new multipart: it can be followed by a content type specification.\n\n- a multipart can be terminated with a '=)' argument.\n\nExample: the following command sends an SMTP mime email consisting in an inline part in two alternative formats: plain text and HTML. It attaches a text file:\n\nData can be encoded for transfer using encoder=. Available encodings are binary and 8bit that do nothing else than adding the corresponding Content-Transfer-Encoding header, 7bit that only rejects 8-bit characters with a transfer error, quoted-printable and base64 that encodes data according to the corresponding schemes, limiting lines length to 76 characters.\n\nExample: send multipart mail with a quoted-printable text message and a base64 attached file:\n\n--form can be used several times in a command line.\n\nExample:\n\nThis option is mutually exclusive with --data, --head and --upload-file. See also --data, --form-string and --form-escape.",
    "choices": [],
    "examples": [
      "curl -F profile=@portrait.jpg https://example.com/upload.cgi",
      "curl -F name=John -F shoesize=11 https://example.com/",
      "curl -F \"story=<hugefile.txt\" https://example.com/",
      "curl -F \"web=@index.html;type=text/html\" example.com",
      "curl -F \"name=daniel;type=text/foo\" example.com",
      "curl -F \"file=@localfile;filename=nameinpost\" example.com",
      "curl -F \"file=@\\\"local,file\\\";filename=\\\"name;in;post\\\"\" \\\n    https://example.com",
      "curl -F 'file=@\"local,file\";filename=\"name;in;post\"' \\\n    https://example.com",
      "curl -F 'colors=\"red; green; blue\";type=text/x-myapp' \\\n   https://example.com",
      "curl -F \"submit=OK;headers=\\\"X-submit-type: OK\\\"\" example.com",
      "curl -F \"submit=OK;headers=@headerfile\" example.com",
      "# This file contains two headers.\nX-header-1: this is a header\n \n# The following header is folded.\nX-header-2: this is\n another header",
      "curl -F '=(;type=multipart/alternative' \\\n     -F '=plain text message' \\\n     -F '= <body>HTML message</body>;type=text/html' \\\n     -F '=)' -F '=@textfile.txt' ... smtp://example.com",
      "curl -F '=text message;encoder=quoted-printable' \\\n     -F '=@localfile;encoder=base64' ... smtp://example.com",
      "curl --form \"name=curl\" --form \"file=@loadthis\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data",
      "--head",
      "--upload-file",
      "--data",
      "--form-string",
      "--form-escape"
    ]
  },
  {
    "id": "output",
    "name": "--output",
    "short": "-o",
    "arg": "<file>",
    "label": "Output to File (输出保存到文件)",
    "type": "filepath",
    "category": "output",
    "popularity": 95,
    "summary": "Write output to the given file instead of stdout. If you are using globbing in the URL to fetch multiple documents, you should quote the URL and you can use \"#\" followed by a number in the filename. That variable gets replaced with the current glob text. Like in:",
    "description": "Write output to the given file instead of stdout. If you are using globbing in the URL to fetch multiple documents, you should quote the URL and you can use \"#\" followed by a number in the filename. That variable gets replaced with the current glob text. Like in:\n\nor use several variables like:\n\nYou may use this option as many times as the number of URLs you have. For example, if you specify two URLs on the same command line, you can use it like this:\n\nand the order of the -o options and the URLs does not matter, only that the first -o is for the first URL and so on, so the above command line can also be written as\n\nSee also the --create-dirs option to create the local directories dynamically. Specifying the output as '-' (a single dash) passes the output to stdout.\n\nTo suppress response bodies, you can redirect output to /dev/null:\n\nOr for Windows:\n\nOr, even more efficient and portable, use\n\nSpecify the filename as single minus to force the output to stdout, to override curl's internal binary output in terminal prevention:\n\nNote that the binary output may be caused by the response being compressed, in which case you may want to use the --compressed option.\n\nSince curl 8.21.0, the separate globbing parts can be named and referenced by their names. The case sensitive alphanumeric name is set enclosed within angle brackets after the opening character. Examples:\n\nReferencing a named glob that is not set, causes an error.\n\nSince curl 8.21.0, you can use parts of the upload filename when it uses globbing by setting a glob name and referencing it the same way you reference named URL globs. For example, if you upload three files to a single fixed HTTP URL and want to save the corresponding responses in separate files:\n\n--output is associated with a single URL. Use it once per URL when you use several URLs in a command line.\n\nExamples:\n\nSee also --out-null, --remote-name, --remote-name-all, --remote-header-name and --compressed.",
    "choices": [],
    "examples": [
      "curl \"http://{one,two}.example.com\" -o \"file_#1.txt\"",
      "curl \"http://{site,host}.host[1-5].example\" -o \"#1_#2\"",
      "curl -o aa example.com -o bb example.net",
      "curl example.com example.net -o aa -o bb",
      "curl example.com -o /dev/null",
      "curl example.com -o nul",
      "curl example.com --out-null",
      "curl https://example.com/jpeg -o -",
      "curl \"https://fun.example/{<num>one,two}.jpg\" -o \"save-#<num>\"\n \ncurl \"ftp://ftp.example/file[<range>1-100].txt\" \\\n  -o \"save-#<range>.txt\"",
      "curl -T 'file{<num>1,2,3}' \\\n  https://upload.example/ -o 'response-#<num>'",
      "curl -o file https://example.com\ncurl \"http://{one,two}.example.com\" -o \"file_#1.txt\"\ncurl \"http://{site,host}.host[1-5].example\" -o \"#1_#2\"\ncurl -o file https://example.com -o file2 https://example.net"
    ],
    "addedIn": null,
    "seeAlso": [
      "--create-dirs",
      "--out-null",
      "--remote-name",
      "--remote-name-all",
      "--remote-header-name",
      "--compressed"
    ]
  },
  {
    "id": "silent",
    "name": "--silent",
    "short": "-s",
    "arg": null,
    "label": "Silent Mode (静默模式/不显示进度)",
    "type": "boolean",
    "category": "output",
    "popularity": 95,
    "summary": "Silent or quiet mode. Do not show progress meter, note messages, warning messages or error messages. Makes curl mute. It still outputs the data you ask for, potentially even to the terminal/stdout unless you redirect it.",
    "description": "Silent or quiet mode. Do not show progress meter, note messages, warning messages or error messages. Makes curl mute. It still outputs the data you ask for, potentially even to the terminal/stdout unless you redirect it.\n\nUse --show-error in addition to this option to disable progress meter but still show error messages.\n\nProviding --silent multiple times has no extra effect. Disable it again with --no-silent.\n\nExample:\n\nSee also --verbose, --stderr and --no-progress-meter.",
    "choices": [],
    "examples": [
      "curl -s https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose",
      "--stderr",
      "--no-progress-meter"
    ]
  },
  {
    "id": "verbose",
    "name": "--verbose",
    "short": "-v",
    "arg": null,
    "label": "Verbose Mode (详细调试输出)",
    "type": "boolean",
    "category": "output",
    "popularity": 95,
    "summary": "Make curl output verbose information during the operation. Useful for debugging and seeing what's going on under the hood. Verbose output lines are prefixed with letters:",
    "description": "Make curl output verbose information during the operation. Useful for debugging and seeing what's going on under the hood. Verbose output lines are prefixed with letters:\n\nIf you only want HTTP headers in the output, --show-headers or --dump-header might be more suitable options.\n\nSince curl 8.10, mentioning this option several times in the same argument increases the level of the trace output. As before, a single --verbose or --no-verbose reverts any additions by previous \"-vv\" again. This means that \"-vv -v\" is equivalent to a single -v. This avoids unwanted verbosity when the option is mentioned in the command line and curl config files.\n\nUsing it twice, e.g. \"-vv\", outputs time (--trace-time) and transfer ids (--trace-ids), as well as enabling tracing for all protocols (--trace-config protocol).\n\nAdding a third verbose outputs transfer content (--trace-ascii %) and enables tracing of more components (--trace-config read,write,ssl).\n\nA fourth time adds tracing of all network components. (--trace-config network).\n\nAny addition of the verbose option after that has no effect.\n\nIf you think this option does not give you the right details, consider using --trace or --trace-ascii instead. Or use it only once and use --trace-config to trace the specific components you wish to see.\n\nNote that verbose output of curl activities and network traffic might contain sensitive data, including usernames, credentials or secret data content. Be aware and be careful when sharing trace logs with others.\n\nWhen the output contains protocol headers, those lines might include carriage return (ASCII code 13) characters, even on platforms that otherwise normally only use linefeed to signify line separations - as curl shows the exact contents arriving from the server.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --verbose multiple times has no extra effect. Disable it again with --no-verbose.\n\nExample:\n\nThis option is mutually exclusive with --trace and --trace-ascii. See also --show-headers, --silent, --trace and --trace-ascii.",
    "choices": [
      {
        "value": ">",
        "desc": "header sent by curl"
      },
      {
        "value": "<",
        "desc": "header received by curl"
      },
      {
        "value": "}",
        "desc": "data sent by curl"
      },
      {
        "value": "{",
        "desc": "data received by curl"
      },
      {
        "value": "*",
        "desc": "additional info provided by curl. Text that adds explanations what goes on and about choices curl does."
      }
    ],
    "examples": [
      "curl --verbose https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--trace",
      "--trace-ascii",
      "--show-headers",
      "--silent",
      "--trace",
      "--trace-ascii"
    ]
  },
  {
    "id": "user",
    "name": "--user",
    "short": "-u",
    "arg": "<user:password>",
    "label": "User & Password (认证用户名密码)",
    "type": "string",
    "category": "auth",
    "popularity": 95,
    "summary": "Specify the username and password to use for server authentication. Overrides --netrc and --netrc-optional.",
    "description": "Specify the username and password to use for server authentication. Overrides --netrc and --netrc-optional.\n\nIf you specify only the username, curl prompts for a password.\n\nThe username and passwords are split up on the first colon, which makes it impossible to use a colon in the username with this option. The password can, still.\n\nOn systems where it works, curl hides the given option argument from process listings. This is not enough to protect credentials from possibly getting seen by other users on the same system as they still are visible for a moment before being cleared. Such sensitive data should be retrieved from a file instead or similar and never used in clear text in a command line.\n\nWhen using Kerberos V5 with a Windows based server you should include the Windows domain name in the username, in order for the server to successfully obtain a Kerberos Ticket. If you do not, then the initial authentication handshake may fail.\n\nWhen using NTLM, the username can be specified without the domain, if there is a single domain and forest in your setup for example.\n\nTo specify the domain name use either Down-Level Logon Name or UPN (User Principal Name) formats. For example, EXAMPLE\\user and user@example.com respectively.\n\nIf you use a Windows SSPI-enabled curl binary and perform Kerberos V5, Negotiate, NTLM or Digest authentication then you can tell curl to select the username and password from your environment by specifying a single colon with this option: \"-u :\".\n\nIf --user is provided several times, the last set value is used.\n\nExample:\n\nSee also --netrc and --config.",
    "choices": [],
    "examples": [
      "curl -u user:secret https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--netrc",
      "--config"
    ]
  },
  {
    "id": "compressed",
    "name": "--compressed",
    "short": null,
    "arg": null,
    "label": "Request Compressed (支持Gzip/Deflate压缩)",
    "type": "boolean",
    "category": "http",
    "popularity": 90,
    "summary": "(HTTP) Request a compressed response using one of the algorithms curl supports, and automatically decompress the content.",
    "description": "(HTTP) Request a compressed response using one of the algorithms curl supports, and automatically decompress the content.\n\nResponse headers are not modified when saved, so if they are \"interpreted\" separately again at a later point they might appear to be saying that the content is (still) compressed; while in fact it has already been decompressed.\n\nIf this option is used and the server sends an unsupported encoding, curl reports an error. This is a request, not an order; the server may or may not deliver data compressed.\n\nWARNING: when decompressing data, even tiny transfers might be expanded and generate a huge amount of bytes. You might want to limit using this option to only known and trusted sites using secure protocols, perhaps in combination with --max-filesize.\n\nProviding --compressed multiple times has no extra effect. Disable it again with --no-compressed.\n\nExample:\n\nSee also --compressed-ssh.",
    "choices": [],
    "examples": [
      "curl --compressed https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--compressed-ssh"
    ]
  },
  {
    "id": "cookie",
    "name": "--cookie",
    "short": "-b",
    "arg": "<data|filename>",
    "label": "HTTP Cookie (发送Cookie)",
    "type": "string",
    "category": "http",
    "popularity": 90,
    "summary": "(HTTP) This option has two slightly separate cookie sending functions.",
    "description": "(HTTP) This option has two slightly separate cookie sending functions.\n\nEither: pass the exact data to send to the HTTP server in the Cookie header. It is supposedly data previously received from the server in a \"Set-Cookie:\" line. The data should be in the format \"NAME1=VALUE1; NAME2=VALUE2\". When given a set of specific cookies, curl populates its cookie header with this content explicitly in all outgoing request(s). If multiple requests are done due to authentication, followed redirects or similar, they all get this cookie header passed on.\n\nOr: If no \"=\" symbol is used in the argument, it is instead treated as a filename to read previously stored cookie from. This option also activates the cookie engine which makes curl record incoming cookies, which may be handy if you are using this in combination with the --location option or do multiple URL transfers on the same invoke.\n\nIf the filename is a single minus (\"-\"), curl reads the contents from stdin. If the filename is an empty string (\"\") and is the only cookie input, curl activates the cookie engine without any cookies.\n\nThe file format of the file to read cookies from should be plain HTTP headers (Set-Cookie style) or the Netscape/Mozilla cookie file format. We discourage the use of the HTTP header style.\n\nThe file specified with --cookie is only used as input. No cookies are written to that file. To store cookies, use the --cookie-jar option.\n\nIf you read cookies from a plain HTTP headers file, make sure each \"Set-Cookie\" line specifies a \"Domain\" attribute. Without an explicit domain, the cookie cannot be reliably matched to a target host and may be applied in unexpected ways. We suggest using the Netscape file format instead.\n\nUsers often want to both read cookies from a file and write updated cookies back to a file, so using both --cookie and --cookie-jar in the same command line is common. curl ignores filenames specified with --cookie which do not exist or point to a directory.\n\nIf curl is built with PSL (Public Suffix List) support, it detects and discards cookies that are specified for such suffix domains that should not be allowed to have cookies. If curl is not built with PSL support, it has no ability to stop super cookies.\n\n--cookie can be used several times in a command line.\n\nExamples:\n\nSee also --cookie-jar and --junk-session-cookies.",
    "choices": [],
    "examples": [
      "curl -b \"\" https://example.com\ncurl -b cookiefile https://example.com\ncurl -b cookiefile -c cookiefile https://example.com\ncurl -b name=Jane https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cookie-jar",
      "--junk-session-cookies"
    ]
  },
  {
    "id": "request",
    "name": "--request",
    "short": "-X",
    "arg": "<method>",
    "label": "Custom Method (指定HTTP请求方法)",
    "type": "string",
    "category": "http",
    "popularity": 90,
    "summary": "Change the method to use when starting the transfer.",
    "description": "Change the method to use when starting the transfer.\n\ncurl passes on the verbatim string you give it in the request without any filter or other safe guards. That includes white space and control characters.\n\nIf --request is provided several times, the last set value is used.\n\nExamples:\n\nSee also --request-target and --follow.",
    "choices": [
      {
        "value": "HTTP",
        "desc": "Specifies a custom request method to use when communicating with the HTTP server. The specified request method is used instead of the method otherwise used (which defaults to GET). Read the HTTP 1.1 specification for details and explanations. Common additional HTTP requests include PUT and DELETE, while related technologies like WebDAV offers PROPFIND, COPY, MOVE and more. Normally you do not need this option. All sorts of GET, HEAD, POST and PUT requests are rather invoked by using dedicated command line options. This option only changes the actual word used in the HTTP request, it does not alter the way curl behaves. For example if you want to make a proper HEAD request, using -X HEAD does not suffice. You need to use the --head option. If --location is used, the method string you set with --request is used for all requests, which may cause unintended side-effects when curl does not change request method according to the HTTP 30x response codes - and similar. Consider using --follow instead in combination with --request."
      },
      {
        "value": "FTP",
        "desc": "Specifies a custom FTP command to use instead of LIST when doing file lists with FTP."
      },
      {
        "value": "POP3",
        "desc": "Specifies a custom POP3 command to use instead of LIST or RETR."
      },
      {
        "value": "IMAP",
        "desc": "Specifies a custom IMAP command to use instead of LIST."
      },
      {
        "value": "SMTP",
        "desc": "Specifies a custom SMTP command to use instead of HELP or VRFY."
      }
    ],
    "examples": [
      "curl --request \"DELETE\" https://example.com\ncurl -X NLST ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--request-target",
      "--follow"
    ]
  },
  {
    "id": "user-agent",
    "name": "--user-agent",
    "short": "-A",
    "arg": "<name>",
    "label": "User-Agent (指定客户端UA标识)",
    "type": "string",
    "category": "http",
    "popularity": 90,
    "summary": "(HTTP) Specify the User-Agent string to send to the HTTP server. To encode blanks in the string, surround the string with single or double quote marks. This header can also be set with the --header or the --proxy-header options.",
    "description": "(HTTP) Specify the User-Agent string to send to the HTTP server. To encode blanks in the string, surround the string with single or double quote marks. This header can also be set with the --header or the --proxy-header options.\n\nIf you give an empty argument to --user-agent (\"\"), it removes the header completely from the request. If you prefer a blank header, you can set it to a single space (\" \").\n\nBy default, curl uses curl/VERSION, such as User-Agent: curl/8.22.1.\n\nIf --user-agent is provided several times, the last set value is used.\n\nExample:\n\nSee also --header and --proxy-header.",
    "choices": [],
    "examples": [
      "curl -A \"Agent 007\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--header",
      "--proxy-header"
    ]
  },
  {
    "id": "connect-timeout",
    "name": "--connect-timeout",
    "short": null,
    "arg": "<seconds>",
    "label": "Connect Timeout (连接超时秒数)",
    "type": "number",
    "category": "network",
    "popularity": 90,
    "summary": "Maximum time in seconds that you allow curl's connection to take. This only limits the connection phase, so if curl connects within the given period it continues - if not it exits.",
    "description": "Maximum time in seconds that you allow curl's connection to take. This only limits the connection phase, so if curl connects within the given period it continues - if not it exits.\n\nThis option accepts decimal values. The decimal value needs to be provided using a dot (.) as decimal separator - not the local version even if it might be using another separator.\n\nThe connection phase is considered complete when the DNS lookup and requested TCP, TLS or QUIC handshakes are done.\n\nIf --connect-timeout is provided several times, the last set value is used.\n\nExamples:\n\nSee also --max-time.",
    "choices": [],
    "examples": [
      "curl --connect-timeout 20 https://example.com\ncurl --connect-timeout 3.14 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--max-time"
    ]
  },
  {
    "id": "max-time",
    "name": "--max-time",
    "short": "-m",
    "arg": "<seconds>",
    "label": "Max Operation Time (整个请求最大耗时秒数)",
    "type": "number",
    "category": "network",
    "popularity": 90,
    "summary": "Set the maximum time in seconds that you allow each transfer to take. Prevents your batch jobs from hanging for hours due to slow networks or links going down. This option accepts decimal values.",
    "description": "Set the maximum time in seconds that you allow each transfer to take. Prevents your batch jobs from hanging for hours due to slow networks or links going down. This option accepts decimal values.\n\nIf you enable retrying the transfer (--retry) then the maximum time counter is reset each time the transfer is retried. You can use --retry-max-time to limit the retry time.\n\nThe decimal value needs to be provided using a dot (.) as decimal separator - not the local version even if it might be using another separator.\n\nIf --max-time is provided several times, the last set value is used.\n\nExamples:\n\nSee also --connect-timeout and --retry-max-time.",
    "choices": [],
    "examples": [
      "curl --max-time 10 https://example.com\ncurl --max-time 2.92 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--connect-timeout",
      "--retry-max-time"
    ]
  },
  {
    "id": "remote-name",
    "name": "--remote-name",
    "short": "-O",
    "arg": null,
    "label": "Remote Name (使用远程文件名保存)",
    "type": "boolean",
    "category": "output",
    "popularity": 90,
    "summary": "Write output to a local file named like the remote file we get. (Only the file part of the remote file is used, the path is cut off.)",
    "description": "Write output to a local file named like the remote file we get. (Only the file part of the remote file is used, the path is cut off.)\n\nThe file is saved in the current working directory. If you want the file saved in a different directory, make sure you change the current working directory before invoking curl with this option or use --output-dir.\n\nThe remote filename to use for saving is extracted from the given URL, nothing else, and if it already exists it is overwritten. If you want the server to be able to choose the filename refer to --remote-header-name which can be used in addition to this option. If the server chooses a filename and that name already exists it is not overwritten.\n\nThere is no URL decoding done on the filename. If it has %20 or other URL encoded parts of the name, they end up as-is as filename.\n\nYou may use this option as many times as the number of URLs you have.\n\nBefore curl 8.10.0, curl returned an error if the URL ended with a slash, which means that there is no filename part in the URL. Starting in 8.10.0, curl sets the filename to the last directory part of the URL or if that also is missing to \"curl_response\" (without extension) for this situation.\n\n--remote-name is associated with a single URL. Use it once per URL when you use several URLs in a command line.\n\nExamples:\n\nSee also --remote-name-all, --output-dir and --remote-header-name.",
    "choices": [],
    "examples": [
      "curl -O https://example.com/filename\ncurl -O https://example.com/filename -O https://example.com/file2"
    ],
    "addedIn": null,
    "seeAlso": [
      "--remote-name-all",
      "--output-dir",
      "--remote-header-name"
    ]
  },
  {
    "id": "show-error",
    "name": "--show-error",
    "short": "-S",
    "arg": null,
    "label": "Show Error (在静默时仍显示错误)",
    "type": "boolean",
    "category": "output",
    "popularity": 90,
    "summary": "When used with --silent, it makes curl show an error message if it fails.",
    "description": "When used with --silent, it makes curl show an error message if it fails.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --show-error multiple times has no extra effect. Disable it again with --no-show-error.\n\nExample:\n\nSee also --no-progress-meter.",
    "choices": [],
    "examples": [
      "curl --show-error --silent https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--no-progress-meter"
    ]
  },
  {
    "id": "proxy",
    "name": "--proxy",
    "short": "-x",
    "arg": "<[protocol://]host[:port]>",
    "label": "Proxy Server (HTTP/HTTPS/SOCKS代理)",
    "type": "string",
    "category": "proxy",
    "popularity": 90,
    "summary": "Use the specified proxy.",
    "description": "Use the specified proxy.\n\nThe proxy string can be specified with a \"protocol://\" prefix. No protocol specified or http:// it is treated as an HTTP proxy. Use \"socks4://\", \"socks4a://\", \"socks5://\" or \"socks5h://\" to request a specific SOCKS version to be used.\n\nUnix domain sockets are supported for socks proxy. Set localhost for the host part. e.g. socks5h://localhost/path/to/socket.sock\n\nHTTPS proxy support works with the \"https://\" protocol prefix for OpenSSL and GnuTLS. It also works for mbedTLS, Rustls, Schannel and wolfSSL (added in 7.87.0).\n\nUnrecognized and unsupported proxy protocol schemes cause an error.\n\nIf the port number is not specified in the proxy string, it is assumed to be 1080.\n\nThis option overrides existing environment variables that set the proxy to use. If there is an environment variable setting a proxy, you can set proxy to \"\" to override it.\n\nAll operations that are performed over an HTTP proxy are transparently converted to HTTP. It means that certain protocol specific operations might not be available. This is not the case if you can tunnel through the proxy, as one with the --proxytunnel option.\n\nUser and password that might be provided in the proxy string are URL decoded by curl. This allows you to pass in special characters such as @ by using %40 or pass in a colon with %3a.\n\nThe proxy host can be specified the same way as the proxy environment variables, including the protocol prefix (\"http://\") and the embedded user + password.\n\nWhen a proxy is used, the active FTP mode as set with --ftp-port, cannot be used.\n\nDoing FTP over an HTTP proxy without --proxytunnel makes curl do HTTP with an FTP URL over the proxy. For such transfers, common FTP specific options do not work, including --ssl-reqd and --ftp-ssl-control.\n\nIf --proxy is provided several times, the last set value is used.\n\nExample:\n\nSee also --socks5 and --proxy-basic.",
    "choices": [],
    "examples": [
      "curl --proxy http://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--socks5",
      "--proxy-basic"
    ]
  },
  {
    "id": "cookie-jar",
    "name": "--cookie-jar",
    "short": "-c",
    "arg": "<filename>",
    "label": "Cookie Jar (写入Cookie到文件)",
    "type": "filepath",
    "category": "http",
    "popularity": 85,
    "summary": "(HTTP) Specify to which file you want curl to write all cookies after a completed operation. curl writes all cookies from its in-memory cookie storage to the given file at the end of operations. Even if no cookies are known, a file is created so that it removes any formerly existing cookies from the file. The file uses the Netscape cookie file format. If you set the filename to a single minus, \"-\", the cookies are written to stdout.",
    "description": "(HTTP) Specify to which file you want curl to write all cookies after a completed operation. curl writes all cookies from its in-memory cookie storage to the given file at the end of operations. Even if no cookies are known, a file is created so that it removes any formerly existing cookies from the file. The file uses the Netscape cookie file format. If you set the filename to a single minus, \"-\", the cookies are written to stdout.\n\nThe file specified with --cookie-jar is only used for output. No cookies are read from the file. To read cookies, use the --cookie option. Both options can specify the same file.\n\nThis command line option activates the cookie engine that makes curl record and use cookies. The --cookie option also activates it.\n\nIf the cookie jar cannot be created or written to, the whole curl operation does not fail or even report an error clearly. Using --verbose gets a warning displayed, but that is the only visible feedback you get about this possibly lethal situation.\n\nYou may want to restrict your umask to prevent other users on the same system to access the created file.\n\nIf --cookie-jar is provided several times, the last set value is used.\n\nExamples:\n\nSee also --cookie and --junk-session-cookies.",
    "choices": [],
    "examples": [
      "curl -c store-here.txt https://example.com\ncurl -c store-here.txt -b read-these https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cookie",
      "--junk-session-cookies"
    ]
  },
  {
    "id": "head",
    "name": "--head",
    "short": "-I",
    "arg": null,
    "label": "Fetch Headers Only (仅获取响应头)",
    "type": "boolean",
    "category": "http",
    "popularity": 85,
    "summary": "(HTTP FTP FILE) Fetch the headers only. HTTP-servers feature the command HEAD which this uses to get nothing but the header of a document. When used on an FTP or FILE URL, curl displays the file size and last modification time only.",
    "description": "(HTTP FTP FILE) Fetch the headers only. HTTP-servers feature the command HEAD which this uses to get nothing but the header of a document. When used on an FTP or FILE URL, curl displays the file size and last modification time only.\n\nProviding --head multiple times has no extra effect. Disable it again with --no-head.\n\nExample:\n\nSee also --get, --verbose and --trace-ascii.",
    "choices": [],
    "examples": [
      "curl -I https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--get",
      "--verbose",
      "--trace-ascii"
    ]
  },
  {
    "id": "referer",
    "name": "--referer",
    "short": "-e",
    "arg": "<URL>",
    "label": "Referer URL (请求来源地址)",
    "type": "string",
    "category": "http",
    "popularity": 85,
    "summary": "(HTTP) Set the referrer URL in the HTTP request. This can also be set with the --header flag of course. When used with --location you can append \";auto\"\" to the --referer URL to make curl automatically set the previous URL when it follows a Location: header. The \";auto\" string can be used alone, even if you do not set an initial --referer.",
    "description": "(HTTP) Set the referrer URL in the HTTP request. This can also be set with the --header flag of course. When used with --location you can append \";auto\"\" to the --referer URL to make curl automatically set the previous URL when it follows a Location: header. The \";auto\" string can be used alone, even if you do not set an initial --referer.\n\nIf --referer is provided several times, the last set value is used.\n\nExamples:\n\nSee also --user-agent and --header.",
    "choices": [],
    "examples": [
      "curl --referer \"https://fake.example\" https://example.com\ncurl --referer \"https://fake.example;auto\" -L https://example.com\ncurl --referer \";auto\" -L https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user-agent",
      "--header"
    ]
  },
  {
    "id": "show-headers",
    "name": "--show-headers",
    "short": "-i",
    "arg": null,
    "label": "Include Protocol Headers (输出包含响应头)",
    "type": "boolean",
    "category": "http",
    "popularity": 85,
    "summary": "(HTTP FTP) Show response headers in the output. HTTP response headers can include things like server name, cookies, date of the document, HTTP version and more. With non-HTTP protocols, the \"headers\" are other server communication.",
    "description": "(HTTP FTP) Show response headers in the output. HTTP response headers can include things like server name, cookies, date of the document, HTTP version and more. With non-HTTP protocols, the \"headers\" are other server communication.\n\nThis option makes the response headers get saved in the same stream/output as the data. --dump-header exists to save headers in a separate stream.\n\nWhen HTTP headers are output to a tty, curl may use escape codes to make the header field names appear in bold and URLs in \"Location:\" headers be especially marked as such. Disable the use of terminal escape codes with --no-styled-output. (This means using the --styled-output option with a \"--no-\" prefix to disable it.)\n\nTo view the request headers, consider the --verbose option.\n\nPrior to 7.75.0 curl did not print the headers if --fail was used in combination with this option and there was an error reported by the server.\n\nThis option was called --include before 8.10.0. The previous name remains functional.\n\nProviding --show-headers multiple times has no extra effect. Disable it again with --no-show-headers.\n\nExample:\n\nSee also --verbose and --dump-header.",
    "choices": [],
    "examples": [
      "curl -i https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose",
      "--dump-header"
    ]
  },
  {
    "id": "retry",
    "name": "--retry",
    "short": null,
    "arg": "<num>",
    "label": "Retry Count (网络失败时重试次数)",
    "type": "number",
    "category": "network",
    "popularity": 85,
    "summary": "If a transient error is returned when curl tries to perform a transfer, it retries this number of times before giving up. Setting the number to 0 makes curl do no retries (which is the default). Transient error means either: a timeout, an FTP 4xx response code or an HTTP 408, 429, 500, 502, 503, 504, 522 or 524 response code.",
    "description": "If a transient error is returned when curl tries to perform a transfer, it retries this number of times before giving up. Setting the number to 0 makes curl do no retries (which is the default). Transient error means either: a timeout, an FTP 4xx response code or an HTTP 408, 429, 500, 502, 503, 504, 522 or 524 response code.\n\nWhen curl is about to retry a transfer, it first waits one second and then for all forthcoming retries it doubles the waiting time until it reaches 10 minutes, which then remains the set fixed delay time between the rest of the retries. By using --retry-delay you disable this exponential backoff algorithm. See also --retry-max-time to limit the total time allowed for retries.\n\ncurl complies with the Retry-After: response header if one was present to know when to issue the next retry (added in 7.66.0).\n\nIf --retry is provided several times, the last set value is used.\n\nExample:\n\nSee also --retry-max-time, --retry-connrefused and --retry-delay.",
    "choices": [],
    "examples": [
      "curl --retry 7 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--retry-delay",
      "--retry-max-time",
      "--retry-max-time",
      "--retry-connrefused",
      "--retry-delay"
    ]
  },
  {
    "id": "fail",
    "name": "--fail",
    "short": "-f",
    "arg": null,
    "label": "Fail on HTTP Errors (HTTP错误状态码时静默失败)",
    "type": "boolean",
    "category": "output",
    "popularity": 85,
    "summary": "(HTTP) Fail with error code 22 and with no response body output at all for HTTP transfers returning HTTP response codes at 400 or greater.",
    "description": "(HTTP) Fail with error code 22 and with no response body output at all for HTTP transfers returning HTTP response codes at 400 or greater.\n\nIn normal cases when an HTTP server fails to deliver a document, it returns a body of text stating so (which often also describes why and more) and a 4xx HTTP response code. This command line option prevents curl from outputting that data and instead returns error 22 early. By default, curl does not consider HTTP response codes to indicate failure.\n\nTo get both the error code and also save the content, use --fail-with-body instead.\n\nThis method is not fail-safe and there are occasions where non-successful response codes slip through, especially when authentication is involved (response codes 401 and 407).\n\nProviding --fail multiple times has no extra effect. Disable it again with --no-fail.\n\nExample:\n\nThis option is mutually exclusive with --fail-with-body. See also --fail-with-body and --fail-early.",
    "choices": [],
    "examples": [
      "curl --fail https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--fail-with-body",
      "--fail-with-body",
      "--fail-early"
    ]
  },
  {
    "id": "oauth2-bearer",
    "name": "--oauth2-bearer",
    "short": null,
    "arg": "<token>",
    "label": "OAuth2 Bearer Token",
    "type": "string",
    "category": "auth",
    "popularity": 85,
    "summary": "(IMAP LDAP POP3 SMTP HTTP) Specify the Bearer Token for OAUTH 2.0 server authentication. The Bearer Token is used in conjunction with the username which can be specified as part of the --url or --user options.",
    "description": "(IMAP LDAP POP3 SMTP HTTP) Specify the Bearer Token for OAUTH 2.0 server authentication. The Bearer Token is used in conjunction with the username which can be specified as part of the --url or --user options.\n\nThe Bearer Token and username are formatted according to RFC 6750.\n\nIf --oauth2-bearer is provided several times, the last set value is used.\n\nExample:\n\nSee also --basic, --ntlm and --digest.",
    "choices": [],
    "examples": [
      "curl --oauth2-bearer \"mF_9.B5f-4.1JqM\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--basic",
      "--ntlm",
      "--digest"
    ]
  },
  {
    "id": "http2",
    "name": "--http2",
    "short": null,
    "arg": null,
    "label": "HTTP/2 (优先使用HTTP 2协议)",
    "type": "boolean",
    "category": "protocol",
    "popularity": 85,
    "summary": "(HTTP) Use HTTP/2.",
    "description": "(HTTP) Use HTTP/2.\n\nFor HTTPS, this means curl negotiates HTTP/2 in the TLS handshake. curl does this by default.\n\nFor HTTP, this means curl attempts to upgrade the request to HTTP/2 using the Upgrade: request header.\n\nWhen curl uses HTTP/2 over HTTPS, it does not itself insist on TLS 1.2 or higher even though that is required by the specification. A user can add this version requirement with --tlsv1.2.\n\nProviding --http2 multiple times has no extra effect.\n\nExample:\n\nFor --http2 to work, it requires that the underlying libcurl is built to support HTTP/2. This option is mutually exclusive with --http1.1, --http1.0, --http2-prior-knowledge and --http3. See also --http1.1, --http3, --no-alpn and --proxy-http2.",
    "choices": [],
    "examples": [
      "curl --http2 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--http2",
      "--http1.1",
      "--http1.0",
      "--http2-prior-knowledge",
      "--http3",
      "--http1.1",
      "--http3",
      "--no-alpn",
      "--proxy-http2"
    ]
  },
  {
    "id": "limit-rate",
    "name": "--limit-rate",
    "short": null,
    "arg": "<speed>",
    "label": "Limit Speed Rate (限速如 200K, 1M)",
    "type": "string",
    "category": "network",
    "popularity": 80,
    "summary": "Specify the maximum transfer rate you want curl to use - for both downloads and uploads. This feature is useful if you have a limited pipe and you would like your transfer not to use your entire bandwidth. To make it slower than it otherwise would be.",
    "description": "Specify the maximum transfer rate you want curl to use - for both downloads and uploads. This feature is useful if you have a limited pipe and you would like your transfer not to use your entire bandwidth. To make it slower than it otherwise would be.\n\nThe given speed is measured in bytes/second, unless a suffix is appended. Appending 'k' or 'K' counts the number as kilobytes, 'm' or 'M' makes it megabytes etc. The supported suffixes (k, M, G, T, P) are 1024-based. For example 1k is 1024. Examples: 200K, 3m and 1G.\n\nThe rate limiting logic works on averaging the transfer speed to no more than the set threshold over a period of multiple seconds.\n\nIf you also use the --speed-limit option, that option takes precedence and might cripple the rate-limiting slightly, to help keep the speed-limit logic working.\n\nStarting in curl 8.19.0, the rate can be specified using a fraction as in \"2.5M\" for two and a half megabytes per second. It only works with a period (\".\") delimiter, independent of what your locale might prefer.\n\nIf --limit-rate is provided several times, the last set value is used.\n\nExamples:\n\nSee also --rate, --speed-limit and --speed-time.",
    "choices": [],
    "examples": [
      "curl --limit-rate 123.45K https://example.com\ncurl --limit-rate 1000 https://example.com\ncurl --limit-rate 10M https://example.com\ncurl --limit-rate 200K --max-time 60 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--rate",
      "--speed-limit",
      "--speed-time"
    ]
  },
  {
    "id": "retry-delay",
    "name": "--retry-delay",
    "short": null,
    "arg": "<seconds>",
    "label": "Retry Delay (重试等待间隔秒数)",
    "type": "number",
    "category": "network",
    "popularity": 80,
    "summary": "Make curl sleep this amount of time before each retry when a transfer has failed with a transient error (it changes the default backoff time algorithm between retries). This option is only interesting if --retry is also used. Setting this delay to zero makes curl use the default backoff time.",
    "description": "Make curl sleep this amount of time before each retry when a transfer has failed with a transient error (it changes the default backoff time algorithm between retries). This option is only interesting if --retry is also used. Setting this delay to zero makes curl use the default backoff time.\n\nBy default, curl uses an exponentially increasing timeout between retries.\n\nStarting in curl 8.16.0, this option accepts a time as decimal number for parts of seconds. The decimal value needs to be provided using a dot (.) as decimal separator - not the local version even if it might be using another separator.\n\nIf --retry-delay is provided several times, the last set value is used.\n\nExample:\n\nSee also --retry and --retry-max-time.",
    "choices": [],
    "examples": [
      "curl --retry-delay 5 --retry 7 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--retry",
      "--retry-max-time"
    ]
  },
  {
    "id": "cacert",
    "name": "--cacert",
    "short": null,
    "arg": "<file>",
    "label": "CA Certificate (CA根证书文件)",
    "type": "filepath",
    "category": "security",
    "popularity": 80,
    "summary": "(TLS) Use the specified certificate file to verify the peer. The file may contain multiple CA certificates. The certificate(s) must be in PEM format. Normally curl is built to use a default file for this, so this option is typically used to alter that default file.",
    "description": "(TLS) Use the specified certificate file to verify the peer. The file may contain multiple CA certificates. The certificate(s) must be in PEM format. Normally curl is built to use a default file for this, so this option is typically used to alter that default file.\n\ncurl recognizes the environment variable named 'CURL_CA_BUNDLE' if it is set and the TLS backend is not Schannel, and uses the given path as a path to a CA cert bundle. This option overrides that variable.\n\n(Windows) curl automatically looks for a CA certs file named 'curl-ca-bundle.crt', either in the same directory as curl.exe, or in the Current Working Directory, or in any folder along your PATH.\n\ncurl 8.11.0 added a build-time option to disable this search behavior, and another option to restrict search to the application's directory.\n\n(Schannel) This option is supported for Schannel in Windows 7 or later (added in 7.60.0). This option is supported for backward compatibility with other SSL engines; instead it is recommended to use Windows' store of root certificates (the default for Schannel).\n\nIf --cacert is provided several times, the last set value is used.\n\nExample:\n\nSee also --capath, --dump-ca-embed and --insecure.",
    "choices": [],
    "examples": [
      "curl --cacert CA-file.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--capath",
      "--dump-ca-embed",
      "--insecure"
    ]
  },
  {
    "id": "cert",
    "name": "--cert",
    "short": "-E",
    "arg": "<certificate[:password]>",
    "label": "Client Certificate (客户端SSL证书文件)",
    "type": "filepath",
    "category": "security",
    "popularity": 80,
    "summary": "(TLS) Use the specified client certificate file when getting a file with HTTPS, FTPS or another SSL-based protocol. The certificate must be PEM format. If the optional password is not specified, it is queried for on the terminal. Note that this option assumes a certificate file that is the private key and the client certificate concatenated. See --cert and --key to specify them independently.",
    "description": "(TLS) Use the specified client certificate file when getting a file with HTTPS, FTPS or another SSL-based protocol. The certificate must be PEM format. If the optional password is not specified, it is queried for on the terminal. Note that this option assumes a certificate file that is the private key and the client certificate concatenated. See --cert and --key to specify them independently.\n\nIn the <certificate> portion of the argument, you must escape the character \":\" as \"\\:\" so that it is not recognized as the password delimiter. Similarly, you must escape the double quote character as \\\" so that it is not recognized as an escape character.\n\nIf curl is built against OpenSSL, and the engine pkcs11 or pkcs11 provider is available, then a PKCS#11 URI (RFC 7512) can be used to specify a certificate located in a PKCS#11 device. A string beginning with \"pkcs11:\" is interpreted as a PKCS#11 URI. If a PKCS#11 URI is provided, then the --engine option is set as \"pkcs11\" if none was provided and the --cert-type option is set as \"ENG\" or \"PROV\" if none was provided (depending on OpenSSL version).\n\nIf curl is built against GnuTLS, a PKCS#11 URI can be used to specify a certificate located in a PKCS#11 device. A string beginning with \"pkcs11:\" is interpreted as a PKCS#11 URI.\n\n(Schannel) Client certificates must be specified by a path expression to a certificate store. (Loading PFX is not supported; you can import it to a store first). You can use \"<store location>\\<store name>\\<thumbprint>\" to refer to a certificate in the system certificates store, for example, \"CurrentUser\\MY\\934a7ac6f8a5d579285a74fa61e19f23ddfe8d7a\". Thumbprint is usually a SHA-1 hex string which you can see in certificate details. Following store locations are supported: CurrentUser, LocalMachine, CurrentService, Services, CurrentUserGroupPolicy, LocalMachineGroupPolicy and LocalMachineEnterprise.\n\nIf --cert is provided several times, the last set value is used.\n\nExample:\n\nSee also --cert-type, --key and --key-type.",
    "choices": [],
    "examples": [
      "curl --cert certfile --key keyfile https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cert-type",
      "--key",
      "--key-type"
    ]
  },
  {
    "id": "ech",
    "name": "--ech",
    "short": null,
    "arg": "<config>",
    "label": "Encrypted Client Hello (加密客户端问候)",
    "type": "choice",
    "category": "security",
    "popularity": 80,
    "summary": "(HTTPS) Specify how to do ECH (Encrypted Client Hello).",
    "description": "(HTTPS) Specify how to do ECH (Encrypted Client Hello).\n\nThe values allowed for <config> can be:\n\nMost ECH related errors cause error CURLE_ECH_REQUIRED (101).\n\nIf --ech is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.8.0. See also --doh-url.",
    "choices": [
      {
        "value": "false",
        "desc": "Do not attempt ECH. The is the default."
      },
      {
        "value": "grease",
        "desc": "Send a GREASE ECH extension"
      },
      {
        "value": "true",
        "desc": "Attempt ECH if possible, but do not fail if ECH is not attempted. (The connection fails if ECH is attempted but fails.)"
      },
      {
        "value": "hard",
        "desc": "Attempt ECH and fail if that is not possible. ECH only works with TLS 1.3 and also requires using DoH or providing an ECHConfigList on the command line."
      },
      {
        "value": "ecl:<b64val>",
        "desc": "A base64 encoded ECHConfigList that is used for ECH."
      },
      {
        "value": "pn:<name>",
        "desc": "A name to use to over-ride the \"public_name\" field of an ECHConfigList (only available with OpenSSL TLS support)"
      }
    ],
    "examples": [
      "curl --ech true https://example.com"
    ],
    "addedIn": "8.8.0.",
    "seeAlso": [
      "--doh-url"
    ]
  },
  {
    "id": "key",
    "name": "--key",
    "short": null,
    "arg": "<key>",
    "label": "Private Key (私钥文件)",
    "type": "filepath",
    "category": "security",
    "popularity": 80,
    "summary": "(TLS SCP SFTP) Private key filename. Allows you to provide your private key in this separate file. For SSH, if not specified, curl tries the following candidates in order: \"~/.ssh/id_rsa\", \"~/.ssh/id_dsa\", \"./id_rsa\", \"./id_dsa\".",
    "description": "(TLS SCP SFTP) Private key filename. Allows you to provide your private key in this separate file. For SSH, if not specified, curl tries the following candidates in order: \"~/.ssh/id_rsa\", \"~/.ssh/id_dsa\", \"./id_rsa\", \"./id_dsa\".\n\nIf curl is built against OpenSSL library, and the engine pkcs11 or pkcs11 provider is available, then a PKCS#11 URI (RFC 7512) can be used to specify a private key located in a PKCS#11 device. A string beginning with \"pkcs11:\" is interpreted as a PKCS#11 URI. If a PKCS#11 URI is provided, then the --engine option is set as \"pkcs11\" if none was provided and the --key-type option is set as \"ENG\" or \"PROV\" if none was provided (depending on OpenSSL version).\n\nIf curl is built against Schannel then this option is ignored for TLS protocols (HTTPS, etc). That backend expects the private key to be already present in the keychain or PKCS#12 file containing the certificate.\n\nIf --key is provided several times, the last set value is used.\n\nExample:\n\nSee also --key-type and --cert.",
    "choices": [],
    "examples": [
      "curl --cert certificate --key here https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--key-type",
      "--cert"
    ]
  },
  {
    "id": "dump-header",
    "name": "--dump-header",
    "short": "-D",
    "arg": "<filename>",
    "label": "Dump Response Headers (将响应头存至文件)",
    "type": "filepath",
    "category": "output",
    "popularity": 80,
    "summary": "(HTTP FTP) Write the received protocol headers to the specified file. If no headers are received, the use of this option creates an empty file. Specify \"-\" as filename (a single minus) to have it written to stdout.",
    "description": "(HTTP FTP) Write the received protocol headers to the specified file. If no headers are received, the use of this option creates an empty file. Specify \"-\" as filename (a single minus) to have it written to stdout.\n\nStarting in curl 8.10.0, specify \"%\" (a single percent sign) as filename writes the output to stderr.\n\nWhen used in FTP, the FTP server response lines are considered being \"headers\" and thus are saved there.\n\nStarting in curl 8.11.0, using the --create-dirs option can also create missing directory components for the path provided in --dump-header.\n\nHaving multiple transfers in one set of operations (i.e. the URLs in one --next clause), appends them to the same file, separated by a blank line.\n\nIf --dump-header is provided several times, the last set value is used.\n\nExamples:\n\nSee also --output.",
    "choices": [],
    "examples": [
      "curl --dump-header store.txt https://example.com\ncurl --dump-header - https://example.com -o save"
    ],
    "addedIn": null,
    "seeAlso": [
      "--output"
    ]
  },
  {
    "id": "fail-with-body",
    "name": "--fail-with-body",
    "short": null,
    "arg": null,
    "label": "Fail With Body (HTTP错误时仍输出响应体)",
    "type": "boolean",
    "category": "output",
    "popularity": 80,
    "summary": "(HTTP) Return an error on server errors where the HTTP response code is 400 or greater). In normal cases when an HTTP server fails to deliver a document, it returns an HTML document stating so (which often also describes why and more). This option allows curl to output and save that content but also to return error 22.",
    "description": "(HTTP) Return an error on server errors where the HTTP response code is 400 or greater). In normal cases when an HTTP server fails to deliver a document, it returns an HTML document stating so (which often also describes why and more). This option allows curl to output and save that content but also to return error 22.\n\nThis is an alternative option to --fail which makes curl fail for the same circumstances but without saving the content.\n\nProviding --fail-with-body multiple times has no extra effect. Disable it again with --no-fail-with-body.\n\nExample:\n\nThis option is mutually exclusive with --fail. Added in 7.76.0. See also --fail and --fail-early.",
    "choices": [],
    "examples": [
      "curl --fail-with-body https://example.com"
    ],
    "addedIn": "7.76.0.",
    "seeAlso": [
      "--fail",
      "--fail",
      "--fail-early"
    ]
  },
  {
    "id": "digest",
    "name": "--digest",
    "short": null,
    "arg": null,
    "label": "Use HTTP Digest Auth (启用摘要认证)",
    "type": "boolean",
    "category": "auth",
    "popularity": 80,
    "summary": "(HTTP) Enable HTTP Digest authentication. This authentication scheme avoids sending the password over the wire in clear text. Use this in combination with the normal --user option to set username and password.",
    "description": "(HTTP) Enable HTTP Digest authentication. This authentication scheme avoids sending the password over the wire in clear text. Use this in combination with the normal --user option to set username and password.\n\nProviding --digest multiple times has no extra effect. Disable it again with --no-digest.\n\nExample:\n\nSee also --user, --proxy-digest and --anyauth.",
    "choices": [],
    "examples": [
      "curl -u name:password --digest https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user",
      "--proxy-digest",
      "--anyauth"
    ]
  },
  {
    "id": "http1.1",
    "name": "--http1.1",
    "short": null,
    "arg": null,
    "label": "HTTP/1.1 (使用HTTP 1.1协议)",
    "type": "boolean",
    "category": "protocol",
    "popularity": 80,
    "summary": "(HTTP) Use HTTP version 1.1. This is the default with \"http://\" URLs.",
    "description": "(HTTP) Use HTTP version 1.1. This is the default with \"http://\" URLs.\n\nProviding --http1.1 multiple times has no extra effect.\n\nExample:\n\nThis option is mutually exclusive with --http1.0, --http2, --http2-prior-knowledge and --http3. See also --http1.0 and --http0.9.",
    "choices": [],
    "examples": [
      "curl --http1.1 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--http1.0",
      "--http2",
      "--http2-prior-knowledge",
      "--http3",
      "--http1.0",
      "--http0.9"
    ]
  },
  {
    "id": "http3",
    "name": "--http3",
    "short": null,
    "arg": null,
    "label": "HTTP/3 (使用HTTP 3 QUIC协议)",
    "type": "boolean",
    "category": "protocol",
    "popularity": 80,
    "summary": "(HTTP) Attempt HTTP/3 to the host in the URL, but fallback to earlier HTTP versions if the HTTP/3 connection establishment fails or is slow. HTTP/3 is only available for HTTPS and not for HTTP URLs.",
    "description": "(HTTP) Attempt HTTP/3 to the host in the URL, but fallback to earlier HTTP versions if the HTTP/3 connection establishment fails or is slow. HTTP/3 is only available for HTTPS and not for HTTP URLs.\n\nThis option allows a user to avoid using the Alt-Svc method of upgrading to HTTP/3 when you know or suspect that the target speaks HTTP/3 on the given host and port.\n\nWhen asked to use HTTP/3, curl issues a separate attempt to use older HTTP versions with a slight delay, so if the HTTP/3 transfer fails or is slow, curl still tries to proceed with an older HTTP version. The fallback performs the regular negotiation between HTTP/1 and HTTP/2.\n\nUse --http3-only for similar functionality without a fallback.\n\ncurl cannot do HTTP/3 over any proxy.\n\nProviding --http3 multiple times has no extra effect.\n\nExample:\n\nFor --http3 to work, it requires that the underlying libcurl is built to support HTTP/3. This option is mutually exclusive with --http1.1, --http1.0, --http2, --http2-prior-knowledge and --http3-only. Added in 7.66.0. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --http3 https://example.com"
    ],
    "addedIn": "7.66.0.",
    "seeAlso": [
      "--http3",
      "--http1.1",
      "--http1.0",
      "--http2",
      "--http2-prior-knowledge",
      "--http3-only",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "ipv4",
    "name": "--ipv4",
    "short": "-4",
    "arg": null,
    "label": "IPv4 Only (强制使用IPv4解析)",
    "type": "boolean",
    "category": "network",
    "popularity": 75,
    "summary": "Request only IPv4 addresses when resolving hostnames, and not for example any IPv6.",
    "description": "Request only IPv4 addresses when resolving hostnames, and not for example any IPv6.\n\nProviding --ipv4 multiple times has no extra effect.\n\nExample:\n\nThis option is mutually exclusive with --ipv6. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --ipv4 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ipv6",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "ipv6",
    "name": "--ipv6",
    "short": "-6",
    "arg": null,
    "label": "IPv6 Only (强制使用IPv6解析)",
    "type": "boolean",
    "category": "network",
    "popularity": 75,
    "summary": "Request only IPv6 addresses when resolving hostnames, and not for example any IPv4.",
    "description": "Request only IPv6 addresses when resolving hostnames, and not for example any IPv4.\n\nYour resolver may still respond to an IPv6-only resolve request by returning IPv6 addresses that contain \"mapped\" IPv4 addresses for compatibility purposes. macOS is known to do this.\n\nProviding --ipv6 multiple times has no extra effect.\n\nExample:\n\nThis option is mutually exclusive with --ipv4. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --ipv6 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ipv4",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "resolve",
    "name": "--resolve",
    "short": null,
    "arg": "<[+]host:port:addr[,addr]...>",
    "label": "Custom DNS Resolve (自定义HOST解析 HOST:PORT:IP)",
    "type": "string",
    "category": "network",
    "popularity": 75,
    "summary": "Provide a custom address for a specific host and port pair. Using this, you can make the curl requests(s) use a specified address and prevent the otherwise normally resolved address to be used. Consider it a sort of /etc/hosts alternative provided on the command line. The port number should be the number used for the specific protocol the host is used for. It means you need several entries if you want to provide addresses for the same host but different ports.",
    "description": "Provide a custom address for a specific host and port pair. Using this, you can make the curl requests(s) use a specified address and prevent the otherwise normally resolved address to be used. Consider it a sort of /etc/hosts alternative provided on the command line. The port number should be the number used for the specific protocol the host is used for. It means you need several entries if you want to provide addresses for the same host but different ports.\n\nBy specifying \"*\" as host you can tell curl to resolve any host and specific port pair to the specified address. Wildcard is resolved last so any --resolve with a specific host and port is used first.\n\nThe provided address set by this option is used even if --ipv4 or --ipv6 is set to make curl use another IP version.\n\nBy prefixing the host with a '+' you can make the entry time out after curl's default timeout (1 minute). Note that this only makes sense for long running parallel transfers with a lot of files. In such cases, if this option is used curl tries to resolve the host as it normally would once the timeout has expired.\n\nProvide IPv6 addresses within [brackets].\n\nTo redirect connects from a specific hostname or any hostname, independently of port number, consider the --connect-to option.\n\nSupport for resolving with wildcard was added in 7.64.0.\n\nSupport for the '+' prefix was added in 7.75.0.\n\nSupport for specifying the host component as an IPv6 address was added in 8.13.0.\n\n--resolve can be used several times in a command line.\n\nExamples:\n\nSee also --connect-to and --alt-svc.",
    "choices": [],
    "examples": [
      "curl --resolve example.com:443:127.0.0.1 https://example.com\ncurl --resolve example.com:443:[2001:db8::252f:efd6] https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--connect-to",
      "--alt-svc"
    ]
  },
  {
    "id": "tls-max",
    "name": "--tls-max",
    "short": null,
    "arg": "<VERSION>",
    "label": "Maximum TLS Version (最大TLS版本)",
    "type": "choice",
    "category": "security",
    "popularity": 75,
    "summary": "(TLS) Set the maximum allowed TLS version. The minimum acceptable version is set by tlsv1.0, tlsv1.1, tlsv1.2 or tlsv1.3.",
    "description": "(TLS) Set the maximum allowed TLS version. The minimum acceptable version is set by tlsv1.0, tlsv1.1, tlsv1.2 or tlsv1.3.\n\nIf the connection is done without TLS, this option has no effect. This includes QUIC-using (HTTP/3) transfers.\n\nIf --tls-max is provided several times, the last set value is used.\n\nExamples:\n\nFor --tls-max to work, it requires that the underlying libcurl is built to support TLS. See also --tlsv1.0, --tlsv1.1, --tlsv1.2 and --tlsv1.3.",
    "choices": [
      {
        "value": "default",
        "desc": "Use up to the recommended TLS version."
      },
      {
        "value": "1.0",
        "desc": "Use up to TLSv1.0."
      },
      {
        "value": "1.1",
        "desc": "Use up to TLSv1.1."
      },
      {
        "value": "1.2",
        "desc": "Use up to TLSv1.2."
      },
      {
        "value": "1.3",
        "desc": "Use up to TLSv1.3."
      }
    ],
    "examples": [
      "curl --tls-max 1.2 https://example.com\ncurl --tls-max 1.3 --tlsv1.2 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tls-max",
      "--tlsv1.0",
      "--tlsv1.1",
      "--tlsv1.2",
      "--tlsv1.3"
    ]
  },
  {
    "id": "tlsv1.2",
    "name": "--tlsv1.2",
    "short": null,
    "arg": null,
    "label": "TLS 1.2 Minimum (强制使用TLS 1.2以上)",
    "type": "boolean",
    "category": "security",
    "popularity": 75,
    "summary": "(TLS) Force curl to use TLS version 1.2 or later when connecting to a remote TLS server.",
    "description": "(TLS) Force curl to use TLS version 1.2 or later when connecting to a remote TLS server.\n\nIn old versions of curl this option was documented to allow _only_ TLS 1.2. That behavior was inconsistent depending on the TLS library. Use --tls-max if you want to set a maximum TLS version.\n\nProviding --tlsv1.2 multiple times has no extra effect.\n\nExample:\n\nSee also --tlsv1.3 and --tls-max.",
    "choices": [],
    "examples": [
      "curl --tlsv1.2 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsv1.3",
      "--tls-max"
    ]
  },
  {
    "id": "tlsv1.3",
    "name": "--tlsv1.3",
    "short": null,
    "arg": null,
    "label": "TLS 1.3 Minimum (强制使用TLS 1.3)",
    "type": "boolean",
    "category": "security",
    "popularity": 75,
    "summary": "(TLS) Force curl to use TLS version 1.3 or later when connecting to a remote TLS server.",
    "description": "(TLS) Force curl to use TLS version 1.3 or later when connecting to a remote TLS server.\n\nIf the connection is done without TLS, this option has no effect. This includes QUIC-using (HTTP/3) transfers.\n\nNote that TLS 1.3 is not supported by all TLS backends.\n\nProviding --tlsv1.3 multiple times has no extra effect.\n\nExample:\n\nSee also --tlsv1.2 and --tls-max.",
    "choices": [],
    "examples": [
      "curl --tlsv1.3 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsv1.2",
      "--tls-max"
    ]
  },
  {
    "id": "alt-svc",
    "name": "--alt-svc",
    "short": null,
    "arg": "<filename>",
    "label": "--alt-svc <filename>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTPS) Enable the alt-svc parser. If the filename points to an existing alt-svc cache file, that gets used. After a completed transfer, the cache is saved to the filename again if it has been modified.",
    "description": "(HTTPS) Enable the alt-svc parser. If the filename points to an existing alt-svc cache file, that gets used. After a completed transfer, the cache is saved to the filename again if it has been modified.\n\nSpecify a \"\" filename (zero length) to avoid loading/saving and make curl handle the cache in memory.\n\nYou may want to restrict your umask to prevent other users on the same system to access the created file.\n\nIf this option is used several times, curl loads contents from all the files but the last one is used for saving.\n\n--alt-svc can be used several times in a command line.\n\nExample:\n\nSee also --resolve and --connect-to.",
    "choices": [],
    "examples": [
      "curl --alt-svc svc.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--resolve",
      "--connect-to"
    ]
  },
  {
    "id": "append",
    "name": "--append",
    "short": "-a",
    "arg": null,
    "label": "--append",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(FTP SFTP) When used in an upload, this option makes curl append to the target file instead of overwriting it. If the remote file does not exist, it is created. Note that this flag is ignored by some SFTP servers (including OpenSSH).",
    "description": "(FTP SFTP) When used in an upload, this option makes curl append to the target file instead of overwriting it. If the remote file does not exist, it is created. Note that this flag is ignored by some SFTP servers (including OpenSSH).\n\nProviding --append multiple times has no extra effect. Disable it again with --no-append.\n\nExample:\n\nSee also --range and --continue-at.",
    "choices": [],
    "examples": [
      "curl --upload-file local --append ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--range",
      "--continue-at"
    ]
  },
  {
    "id": "compressed-ssh",
    "name": "--compressed-ssh",
    "short": null,
    "arg": null,
    "label": "--compressed-ssh",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(SCP SFTP) Enable SSH compression. This is a request, not an order; the server may or may not do it. This allows the data to be sent compressed over the wire, and automatically decompressed in the receiving end, to save bandwidth.",
    "description": "(SCP SFTP) Enable SSH compression. This is a request, not an order; the server may or may not do it. This allows the data to be sent compressed over the wire, and automatically decompressed in the receiving end, to save bandwidth.\n\nProviding --compressed-ssh multiple times has no extra effect. Disable it again with --no-compressed-ssh.\n\nExample:\n\nSee also --compressed.",
    "choices": [],
    "examples": [
      "curl --compressed-ssh sftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--compressed"
    ]
  },
  {
    "id": "config",
    "name": "--config",
    "short": "-K",
    "arg": "<file>",
    "label": "--config <file>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "Specify a text file to read curl arguments from. The command line arguments found in the text file are used as if they were provided on the command line.",
    "description": "Specify a text file to read curl arguments from. The command line arguments found in the text file are used as if they were provided on the command line.\n\nOptions and their parameters must be specified on the same line in the file, separated by whitespace, colon, or the equals sign. Long option names can optionally be given in the config file without the initial double dashes and if so, the colon or equals characters can be used as separators. If the option is specified with one or two dashes, there can be no colon or equals character between the option and its parameter.\n\nIf the parameter contains whitespace or starts with a colon (:) or equals sign (=), it must be specified enclosed within double quotes (\"like this\"). Within double quotes the following escape sequences are available: \\ \\\", \\t, \\n, \\r and \\v. A backslash preceding any other letter is ignored.\n\nIf the first non-blank column of a config line is a '#' character, that line is treated as a comment.\n\nOnly write one option per physical line in the config file. A single line is required to be no more than 10 megabytes (since 8.2.0).\n\nSpecify the filename to --config as minus \"-\" to make curl read the file from stdin.\n\nNote that to be able to specify a URL in the config file, you need to specify it using the --url option, and not by writing the URL on its own line. It could look similar to this:\n\nWhen curl is invoked, it (unless --disable is used) checks for a default config file and uses it if found, even when --config is used. The default config file is checked for in the following places in this order:\n\n1) \"$CURL_HOME/.curlrc\"\n\n2) \"$XDG_CONFIG_HOME/curlrc\" (Added in 7.73.0)\n\n3) \"$HOME/.curlrc\"\n\n4) Windows: \"%USERPROFILE%\\.curlrc\"\n\n5) Windows: \"%APPDATA%\\.curlrc\"\n\n6) Windows: \"%USERPROFILE%\\Application Data\\.curlrc\"\n\n7) Non-Windows: use getpwuid to find the home directory\n\n8) On Windows, if it finds no .curlrc file in the sequence described above, it checks for one in the same directory the curl executable is placed.\n\nOn Windows two filenames are checked per location: .curlrc and _curlrc, preferring the former. Older versions on Windows checked for _curlrc only.\n\n--config can be used several times in a command line.\n\nExample:\n\nSee also --disable.",
    "choices": [],
    "examples": [
      "url = \"https://curl.se/docs/\"\n \n# --- Example file ---\n# this is a comment\nurl = \"example.com\"\noutput = \"curlhere.html\"\nuser-agent = \"superagent/1.0\"\n \n# and fetch another URL too\nurl = \"example.com/docs/manpage.html\"\n-O\nreferer = \"http://nowhereatall.example.com/\"\n# --- End of example file ---",
      "curl --config file.txt https://example.com"
    ],
    "addedIn": "7.73.0",
    "seeAlso": [
      "--disable"
    ]
  },
  {
    "id": "continue-at",
    "name": "--continue-at",
    "short": "-C",
    "arg": "<offset>",
    "label": "--continue-at <offset>",
    "type": "number",
    "category": "http",
    "popularity": 15,
    "summary": "Resume a previous transfer from the given byte offset. The given offset is the exact number of bytes that are skipped, counting from the beginning of the source file before it is transferred to the destination. If used with uploads, the FTP server command SIZE is not used by curl.",
    "description": "Resume a previous transfer from the given byte offset. The given offset is the exact number of bytes that are skipped, counting from the beginning of the source file before it is transferred to the destination. If used with uploads, the FTP server command SIZE is not used by curl.\n\nUse \"-C -\" to instruct curl to automatically find out where/how to resume the transfer. It then uses the given output/input files to figure that out.\n\nWhen using this option for HTTP uploads using POST or PUT, functionality is not guaranteed. The HTTP protocol has no standard interoperable resume upload and curl uses a set of headers for this purpose that once proved working for some servers and have been left for those who find that useful.\n\nThis command line option is mutually exclusive with --range: you can only use one of them for a single transfer.\n\nThe --no-clobber and --remove-on-error options cannot be used together with --continue-at.\n\nIf --continue-at is provided several times, the last set value is used.\n\nExamples:\n\nSee also --range.",
    "choices": [],
    "examples": [
      "curl -C - https://example.com\ncurl -C 400 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--range"
    ]
  },
  {
    "id": "etag-compare",
    "name": "--etag-compare",
    "short": null,
    "arg": "<file>",
    "label": "--etag-compare <file>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Make a conditional HTTP request for the specific ETag read from the given file by sending a custom If-None-Match header using the stored ETag.",
    "description": "(HTTP) Make a conditional HTTP request for the specific ETag read from the given file by sending a custom If-None-Match header using the stored ETag.\n\nFor correct results, make sure that the specified file contains only a single line with the desired ETag. A non-existing or empty file is treated as an empty ETag.\n\nUse the option --etag-save to first save the ETag from a response, and then use this option to compare against the saved ETag in a subsequent request.\n\nUse this option with a single URL only.\n\nIf --etag-compare is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.68.0. See also --etag-save and --time-cond.",
    "choices": [],
    "examples": [
      "curl --etag-compare etag.txt https://example.com"
    ],
    "addedIn": "7.68.0.",
    "seeAlso": [
      "--etag-save",
      "--time-cond"
    ]
  },
  {
    "id": "etag-save",
    "name": "--etag-save",
    "short": null,
    "arg": "<file>",
    "label": "--etag-save <file>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Save an HTTP ETag to the specified file. An ETag is a caching related header, usually returned in a response. Use this option with a single URL only.",
    "description": "(HTTP) Save an HTTP ETag to the specified file. An ETag is a caching related header, usually returned in a response. Use this option with a single URL only.\n\nIf no ETag is sent by the server, an empty file is created.\n\nIn many situations you want to use an existing etag in the request to avoid downloading the same resource again but also save the new etag if it has indeed changed, by using both etag options --etag-save and --etag-compare with the same filename, in the same command line.\n\nStarting in curl 8.12.0, using the --create-dirs option can also create missing directory components for the path provided in --etag-save.\n\nIf --etag-save is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.68.0. See also --etag-compare.",
    "choices": [],
    "examples": [
      "curl --etag-save storetag.txt https://example.com"
    ],
    "addedIn": "7.68.0.",
    "seeAlso": [
      "--etag-compare"
    ]
  },
  {
    "id": "expect100-timeout",
    "name": "--expect100-timeout",
    "short": null,
    "arg": "<seconds>",
    "label": "--expect100-timeout <seconds>",
    "type": "number",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Maximum time in seconds that you allow curl to wait for a 100-continue response when curl emits an Expects: 100-continue header in its request. By default curl waits one second. This option accepts decimal values. When curl stops waiting, it continues as if a response was received.",
    "description": "(HTTP) Maximum time in seconds that you allow curl to wait for a 100-continue response when curl emits an Expects: 100-continue header in its request. By default curl waits one second. This option accepts decimal values. When curl stops waiting, it continues as if a response was received.\n\nThe decimal value needs to be provided using a dot (\".\") as decimal separator - not the local version even if it might be using another separator.\n\nIf --expect100-timeout is provided several times, the last set value is used.\n\nExample:\n\nSee also --connect-timeout.",
    "choices": [],
    "examples": [
      "curl --expect100-timeout 2.5 -T file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--connect-timeout"
    ]
  },
  {
    "id": "ftp-port",
    "name": "--ftp-port",
    "short": "-P",
    "arg": "<address>",
    "label": "--ftp-port <address>",
    "type": "choice",
    "category": "http",
    "popularity": 15,
    "summary": "(FTP) Reverse the default initiator/listener roles when connecting with FTP. This option makes curl use active mode. curl then commands the server to connect back to the client's specified address and port, while passive mode asks the server to setup an IP address and port for it to connect to. <address> should be one of:",
    "description": "(FTP) Reverse the default initiator/listener roles when connecting with FTP. This option makes curl use active mode. curl then commands the server to connect back to the client's specified address and port, while passive mode asks the server to setup an IP address and port for it to connect to. <address> should be one of:\n\n-\n\nmake curl pick the same IP address that is already used for the control connection. This is the recommended choice.\n\nDisable the use of PORT with --ftp-pasv. Disable the attempt to use the EPRT command instead of PORT by using --disable-eprt. EPRT is really PORT++.\n\nYou can also append \":[start]-[end]\" to the right of the address, to tell curl what TCP port range to use. That means you specify a port range, from a lower to a higher number. A single number works as well, but do note that it increases the risk of failure since the port may not be available.\n\nIf --ftp-port is provided several times, the last set value is used.\n\nExamples:\n\nSee also --ftp-pasv and --disable-eprt.",
    "choices": [
      {
        "value": "interface",
        "desc": "e.g. eth0 to specify which interface's IP address you want to use (Unix only)"
      },
      {
        "value": "IP address",
        "desc": "e.g. 192.168.10.1 to specify the exact IP address"
      },
      {
        "value": "hostname",
        "desc": "e.g. my.host.domain to specify the machine"
      }
    ],
    "examples": [
      "curl -P - ftp:/example.com\ncurl -P eth0 ftp:/example.com\ncurl -P 192.168.0.2 ftp:/example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-pasv",
      "--disable-eprt"
    ]
  },
  {
    "id": "get",
    "name": "--get",
    "short": "-G",
    "arg": null,
    "label": "--get",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) When used, this option makes all data specified with --data, --data-binary or --data-urlencode to be used in an HTTP GET request instead of the POST request that otherwise would be used. curl appends the provided data to the URL as a query string.",
    "description": "(HTTP) When used, this option makes all data specified with --data, --data-binary or --data-urlencode to be used in an HTTP GET request instead of the POST request that otherwise would be used. curl appends the provided data to the URL as a query string.\n\nIf used in combination with --head, the POST data is instead appended to the URL with a HEAD request.\n\nProviding --get multiple times has no extra effect. Disable it again with --no-get.\n\nExamples:\n\nSee also --data and --request.",
    "choices": [],
    "examples": [
      "curl --get https://example.com\ncurl --get -d \"tool=curl\" -d \"age=old\" https://example.com\ncurl --get -I -d \"tool=curl\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data",
      "--request"
    ]
  },
  {
    "id": "happy-eyeballs-timeout-ms",
    "name": "--happy-eyeballs-timeout-ms",
    "short": null,
    "arg": "<ms>",
    "label": "--happy-eyeballs-timeout-ms <ms>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "Set the timeout for Happy Eyeballs.",
    "description": "Set the timeout for Happy Eyeballs.\n\nHappy Eyeballs is an algorithm that attempts to connect to both IPv4 and IPv6 addresses for dual-stack hosts, giving IPv6 a head-start of the specified number of milliseconds. If the IPv6 address cannot be connected to within that time, then a connection attempt is made to the IPv4 address in parallel. The first connection to be established is the one that is used.\n\nThe range of suggested useful values is limited. Happy Eyeballs RFC 6555 says \"It is RECOMMENDED that connection attempts be paced 150-250 ms apart to balance human factors against network load.\" libcurl currently defaults to 200 ms. Firefox and Chrome currently default to 300 ms.\n\nIf --happy-eyeballs-timeout-ms is provided several times, the last set value is used.\n\nExample:\n\nSee also --max-time and --connect-timeout.",
    "choices": [],
    "examples": [
      "curl --happy-eyeballs-timeout-ms 500 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--max-time",
      "--connect-timeout"
    ]
  },
  {
    "id": "http0.9",
    "name": "--http0.9",
    "short": null,
    "arg": null,
    "label": "--http0.9",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Accept an HTTP version 0.9 response.",
    "description": "(HTTP) Accept an HTTP version 0.9 response.\n\nHTTP/0.9 is a response without headers and therefore you can also connect with this to non-HTTP servers and still get a response since curl transparently downgrades - if allowed.\n\nHTTP/0.9 is disabled by default (added in 7.66.0)\n\nProviding --http0.9 multiple times has no extra effect. Disable it again with --no-http0.9.\n\nExample:\n\nSee also --http1.1, --http2 and --http3.",
    "choices": [],
    "examples": [
      "curl --http0.9 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--http1.1",
      "--http2",
      "--http3"
    ]
  },
  {
    "id": "http3-only",
    "name": "--http3-only",
    "short": null,
    "arg": null,
    "label": "--http3-only",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Instruct curl to use HTTP/3 to the host in the URL, with no fallback to earlier HTTP versions. HTTP/3 can only be used for HTTPS and not for HTTP URLs. For HTTP, this option triggers an error.",
    "description": "(HTTP) Instruct curl to use HTTP/3 to the host in the URL, with no fallback to earlier HTTP versions. HTTP/3 can only be used for HTTPS and not for HTTP URLs. For HTTP, this option triggers an error.\n\nThis option allows a user to avoid using the Alt-Svc method of upgrading to HTTP/3 when you know that the target speaks HTTP/3 on the given host and port.\n\nThis option makes curl fail if a QUIC connection cannot be established, it does not attempt any other HTTP versions on its own. Use --http3 for similar functionality with a fallback.\n\nProviding --http3-only multiple times has no extra effect.\n\nExample:\n\nFor --http3-only to work, it requires that the underlying libcurl is built to support HTTP/3. This option is mutually exclusive with --http1.1, --http1.0, --http2, --http2-prior-knowledge and --http3. Added in 7.88.0. See also --http1.1, --http2 and --http3.",
    "choices": [],
    "examples": [
      "curl --http3-only https://example.com"
    ],
    "addedIn": "7.88.0.",
    "seeAlso": [
      "--http3-only",
      "--http1.1",
      "--http1.0",
      "--http2",
      "--http2-prior-knowledge",
      "--http3",
      "--http1.1",
      "--http2",
      "--http3"
    ]
  },
  {
    "id": "httpsig-keyid",
    "name": "--httpsig-keyid",
    "short": null,
    "arg": "<id>",
    "label": "--httpsig-keyid <id>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) **WARNING**: this option is experimental. Do not use in production.",
    "description": "(HTTP) **WARNING**: this option is experimental. Do not use in production.\n\nThe key identifier to include in the \"Signature-Input\" header when using RFC 9421 HTTP Message Signatures. This value appears as the \"keyid\" parameter and allows the server to look up the correct verification key.\n\nIf --httpsig-keyid is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.22.0. See also --httpsig-algo and --httpsig-key.",
    "choices": [],
    "examples": [
      "curl --httpsig-algo ed25519 --httpsig-key key.hex --httpsig-keyid \"my-key\" https://example.com"
    ],
    "addedIn": "8.22.0.",
    "seeAlso": [
      "--httpsig-algo",
      "--httpsig-key"
    ]
  },
  {
    "id": "ignore-content-length",
    "name": "--ignore-content-length",
    "short": null,
    "arg": null,
    "label": "--ignore-content-length",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(FTP HTTP) For HTTP, ignore the Content-Length header. This is particularly useful for servers running Apache 1.x, which reports incorrect Content-Length for files larger than 2 gigabytes.",
    "description": "(FTP HTTP) For HTTP, ignore the Content-Length header. This is particularly useful for servers running Apache 1.x, which reports incorrect Content-Length for files larger than 2 gigabytes.\n\nFor FTP, this makes curl skip the SIZE command to figure out the size before downloading a file.\n\nProviding --ignore-content-length multiple times has no extra effect. Disable it again with --no-ignore-content-length.\n\nExample:\n\nSee also --ftp-skip-pasv-ip.",
    "choices": [],
    "examples": [
      "curl --ignore-content-length https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-skip-pasv-ip"
    ]
  },
  {
    "id": "json",
    "name": "--json",
    "short": null,
    "arg": "<data>",
    "label": "--json <data>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Send the specified JSON data in a POST request to the HTTP server. --json works as a shortcut for passing on these three options:",
    "description": "(HTTP) Send the specified JSON data in a POST request to the HTTP server. --json works as a shortcut for passing on these three options:\n\nThere is no verification that the passed in data is actual JSON or that the syntax is correct.\n\nIf you start the data with the letter @, the rest should be a filename to read the data from, or a single dash (-) if you want curl to read the data from stdin. Posting data from a file named 'foobar' would thus be done with --json @foobar and to instead read the data from stdin, use --json @-.\n\nIf this option is used more than once on the same command line, the additional data pieces are concatenated to the previous before sending.\n\nThe headers this option sets can be overridden with --header as usual.\n\n--json can be used several times in a command line.\n\nExamples:\n\nThis option is mutually exclusive with --form, --head and --upload-file. Added in 7.82.0. See also --data-binary and --data-raw.",
    "choices": [],
    "examples": [
      "--data-binary [arg]\n--header \"Content-Type: application/json\"\n--header \"Accept: application/json\"",
      "curl --json '{ \"drink\": \"coffee\" }' https://example.com\ncurl --json '{ \"drink\":' --json ' \"coffee\" }' https://example.com\ncurl --json @prepared https://example.com\ncurl --json @- https://example.com < json.txt"
    ],
    "addedIn": "7.82.0.",
    "seeAlso": [
      "--form",
      "--head",
      "--upload-file",
      "--data-binary",
      "--data-raw"
    ]
  },
  {
    "id": "junk-session-cookies",
    "name": "--junk-session-cookies",
    "short": "-j",
    "arg": null,
    "label": "--junk-session-cookies",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) When curl is told to read cookies from a given file, this option makes it discard all session cookies. This has the same effect as if a new session is started. Typical browsers discard session cookies when they are closed down.",
    "description": "(HTTP) When curl is told to read cookies from a given file, this option makes it discard all session cookies. This has the same effect as if a new session is started. Typical browsers discard session cookies when they are closed down.\n\nSession cookies are cookies without a set expiry time. They are meant to only last for \"a session\".\n\nProviding --junk-session-cookies multiple times has no extra effect. Disable it again with --no-junk-session-cookies.\n\nExample:\n\nSee also --cookie and --cookie-jar.",
    "choices": [],
    "examples": [
      "curl --junk-session-cookies -b cookies.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cookie",
      "--cookie-jar"
    ]
  },
  {
    "id": "local-port",
    "name": "--local-port",
    "short": null,
    "arg": "<range>",
    "label": "--local-port <range>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "Set a preferred single number or range (FROM-TO) of local port numbers to use for the connection(s). Note that port numbers by nature are a scarce resource so setting this range to something too narrow might cause unnecessary connection setup failures.",
    "description": "Set a preferred single number or range (FROM-TO) of local port numbers to use for the connection(s). Note that port numbers by nature are a scarce resource so setting this range to something too narrow might cause unnecessary connection setup failures.\n\nIf --local-port is provided several times, the last set value is used.\n\nExample:\n\nSee also --globoff.",
    "choices": [],
    "examples": [
      "curl --local-port 1000-3000 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--globoff"
    ]
  },
  {
    "id": "location-trusted",
    "name": "--location-trusted",
    "short": null,
    "arg": null,
    "label": "--location-trusted",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Instruct curl to follow HTTP redirects like --location, but permit curl to send credentials and other secrets along to other hosts than the initial one.",
    "description": "(HTTP) Instruct curl to follow HTTP redirects like --location, but permit curl to send credentials and other secrets along to other hosts than the initial one.\n\nThis may or may not introduce a security breach if the site redirects you to a site to which you send this sensitive data to. Another host means that one or more of hostname, protocol scheme or port number changed.\n\nThis option also allows curl to pass long cookies set explicitly with --header.\n\nProviding --location-trusted multiple times has no extra effect. Disable it again with --no-location-trusted.\n\nExamples:\n\nSee also --user and --follow.",
    "choices": [],
    "examples": [
      "curl --location-trusted -u user:password https://example.com\ncurl --location-trusted -H \"Cookie: session=abc\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user",
      "--follow"
    ]
  },
  {
    "id": "max-filesize",
    "name": "--max-filesize",
    "short": null,
    "arg": "<bytes>",
    "label": "--max-filesize <bytes>",
    "type": "number",
    "category": "http",
    "popularity": 15,
    "summary": "(FTP HTTP MQTT) When set to a non-zero value, it specifies the maximum size (in bytes) of a file to download. If the file requested is larger than this value, the transfer does not start and curl returns with exit code 63.",
    "description": "(FTP HTTP MQTT) When set to a non-zero value, it specifies the maximum size (in bytes) of a file to download. If the file requested is larger than this value, the transfer does not start and curl returns with exit code 63.\n\nSetting the maximum value to zero disables the limit.\n\nA unit suffix letter can be used. Appending 'k' or 'K' counts the number as kilobytes, 'm' or 'M' makes it megabytes etc. The supported suffixes (k, M, G, T, P) are 1024-based. Examples: 200K, 3m and 1G.\n\nNOTE: before curl 8.4.0, when the file size is not known prior to download, for such files this option has no effect even if the file transfer ends up being larger than this given limit.\n\nStarting with curl 8.4.0, this option aborts the transfer if it reaches the threshold during transfer.\n\nStarting in curl 8.19.0, the maximum size can be specified using a fraction as in \"2.5M\" for two and a half megabytes. It only works with a period (\".\") delimiter, independent of what your locale might prefer.\n\nSince 8.20.0, this option also stops ongoing transfers that would reach this threshold due to automatic decompression using --compressed.\n\nIf --max-filesize is provided several times, the last set value is used.\n\nExamples:\n\nSee also --limit-rate.",
    "choices": [],
    "examples": [
      "curl --max-filesize 100K https://example.com\ncurl --max-filesize 2.6M https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--limit-rate"
    ]
  },
  {
    "id": "max-redirs",
    "name": "--max-redirs",
    "short": null,
    "arg": "<num>",
    "label": "--max-redirs <num>",
    "type": "number",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Set the maximum number of redirections to follow. When --location or --follow are used, this option prevents curl from following too many redirects. By default the limit is set to 50 redirects. Set this option to -1 to make it unlimited.",
    "description": "(HTTP) Set the maximum number of redirections to follow. When --location or --follow are used, this option prevents curl from following too many redirects. By default the limit is set to 50 redirects. Set this option to -1 to make it unlimited.\n\nIf --max-redirs is provided several times, the last set value is used.\n\nExample:\n\nSee also --location and --follow.",
    "choices": [],
    "examples": [
      "curl --max-redirs 3 --location https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--location",
      "--follow"
    ]
  },
  {
    "id": "no-clobber",
    "name": "--no-clobber",
    "short": null,
    "arg": null,
    "label": "--no-clobber",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "When used in conjunction with the --output, --remote-header-name, --remote-name, or --remote-name-all options, curl avoids overwriting files that already exist. Instead, a dot and a number gets appended to the name of the file that would be created, up to filename.9999 after which it does not create any file.",
    "description": "When used in conjunction with the --output, --remote-header-name, --remote-name, or --remote-name-all options, curl avoids overwriting files that already exist. Instead, a dot and a number gets appended to the name of the file that would be created, up to filename.9999 after which it does not create any file.\n\nNote that this is the negated option name documented. You can thus use --clobber to enforce the clobbering, even if --remote-header-name is specified.\n\nThe --continue-at option cannot be used together with --no-clobber.\n\nProviding --no-clobber multiple times has no extra effect. Disable it again with --clobber.\n\nExample:\n\nAdded in 7.83.0. See also --output and --remote-name.",
    "choices": [],
    "examples": [
      "curl --no-clobber --output local/dir/file https://example.com"
    ],
    "addedIn": "7.83.0.",
    "seeAlso": [
      "--output",
      "--remote-name"
    ]
  },
  {
    "id": "out-null",
    "name": "--out-null",
    "short": null,
    "arg": null,
    "label": "--out-null",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "Discard all response output of a transfer silently. This is the more efficient and portable version of",
    "description": "Discard all response output of a transfer silently. This is the more efficient and portable version of\n\nThe transfer is done in full, all data is received and checked, but the bytes are not written anywhere.\n\n--out-null is associated with a single URL. Use it once per URL when you use several URLs in a command line.\n\nExample:\n\nAdded in 8.16.0. See also --output, --remote-name, --remote-name-all and --remote-header-name.",
    "choices": [],
    "examples": [
      "curl https://host.example -o /dev/null",
      "curl \"https://example.com\" --out-null"
    ],
    "addedIn": "8.16.0.",
    "seeAlso": [
      "--output",
      "--remote-name",
      "--remote-name-all",
      "--remote-header-name"
    ]
  },
  {
    "id": "output-dir",
    "name": "--output-dir",
    "short": null,
    "arg": "<dir>",
    "label": "--output-dir <dir>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "Specify the directory in which files should be stored, when --remote-name or --output are used.",
    "description": "Specify the directory in which files should be stored, when --remote-name or --output are used.\n\nThe given output directory is used for all URLs and output options on the command line, up until the first --next.\n\nIf the specified target directory does not exist, the operation fails unless --create-dirs is also used.\n\nIf --output-dir is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.73.0. See also --remote-name and --remote-header-name.",
    "choices": [],
    "examples": [
      "curl --output-dir \"tmp\" -O https://example.com"
    ],
    "addedIn": "7.73.0.",
    "seeAlso": [
      "--remote-name",
      "--remote-header-name"
    ]
  },
  {
    "id": "post301",
    "name": "--post301",
    "short": null,
    "arg": null,
    "label": "--post301",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Respect RFC 7231/6.4.2 and do not convert POST requests into GET requests when following a 301 redirect. The non-RFC behavior is ubiquitous in web browsers, so curl does the conversion by default to maintain consistency. A server may require a POST to remain a POST after such a redirection. This option is meaningful only when using --location.",
    "description": "(HTTP) Respect RFC 7231/6.4.2 and do not convert POST requests into GET requests when following a 301 redirect. The non-RFC behavior is ubiquitous in web browsers, so curl does the conversion by default to maintain consistency. A server may require a POST to remain a POST after such a redirection. This option is meaningful only when using --location.\n\nProviding --post301 multiple times has no extra effect. Disable it again with --no-post301.\n\nExample:\n\nSee also --post302, --post303 and --location.",
    "choices": [],
    "examples": [
      "curl --post301 --location -d \"data\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--post302",
      "--post303",
      "--location"
    ]
  },
  {
    "id": "post302",
    "name": "--post302",
    "short": null,
    "arg": null,
    "label": "--post302",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Respect RFC 7231/6.4.3 and do not convert POST requests into GET requests when following a 302 redirect. The non-RFC behavior is ubiquitous in web browsers, so curl does the conversion by default to maintain consistency. A server may require a POST to remain a POST after such a redirection. This option is meaningful only when using --location.",
    "description": "(HTTP) Respect RFC 7231/6.4.3 and do not convert POST requests into GET requests when following a 302 redirect. The non-RFC behavior is ubiquitous in web browsers, so curl does the conversion by default to maintain consistency. A server may require a POST to remain a POST after such a redirection. This option is meaningful only when using --location.\n\nProviding --post302 multiple times has no extra effect. Disable it again with --no-post302.\n\nExample:\n\nSee also --post301, --post303 and --location.",
    "choices": [],
    "examples": [
      "curl --post302 --location -d \"data\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--post301",
      "--post303",
      "--location"
    ]
  },
  {
    "id": "post303",
    "name": "--post303",
    "short": null,
    "arg": null,
    "label": "--post303",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Violate RFC 7231/6.4.4 and do not convert POST requests into GET requests when following 303 redirect. A server may require a POST to remain a POST after a 303 redirection. This option is meaningful only when using --location.",
    "description": "(HTTP) Violate RFC 7231/6.4.4 and do not convert POST requests into GET requests when following 303 redirect. A server may require a POST to remain a POST after a 303 redirection. This option is meaningful only when using --location.\n\nProviding --post303 multiple times has no extra effect. Disable it again with --no-post303.\n\nExample:\n\nSee also --post302, --post301 and --location.",
    "choices": [],
    "examples": [
      "curl --post303 --location -d \"data\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--post302",
      "--post301",
      "--location"
    ]
  },
  {
    "id": "range",
    "name": "--range",
    "short": "-r",
    "arg": "<range>",
    "label": "--range <range>",
    "type": "choice",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP FTP SFTP FILE) Retrieve a byte range (i.e. a partial document) from an HTTP/1.1, FTP or SFTP server or a local FILE. Ranges can be specified in a number of ways.",
    "description": "(HTTP FTP SFTP FILE) Retrieve a byte range (i.e. a partial document) from an HTTP/1.1, FTP or SFTP server or a local FILE. Ranges can be specified in a number of ways.\n\n-500\n\nspecifies the last 500 bytes\n\n(*) = NOTE that if specifying multiple ranges and the server supports it then it replies with a multiple part response that curl returns as-is. It contains meta information in addition to the requested bytes. Parsing or otherwise transforming this response is the responsibility of the caller.\n\nOnly digit characters (0-9) are valid in the 'start' and 'stop' fields of the 'start-stop' range syntax. If a non-digit character is given in the range, the server's response is unspecified, depending on the server's configuration.\n\nMany HTTP/1.1 servers do not have this feature enabled, so that when you attempt to get a range, curl instead gets the whole document.\n\nFTP and SFTP range downloads only support the simple 'start-stop' syntax (optionally with one of the numbers omitted). FTP use depends on the extended FTP command SIZE.\n\nWhen using this option for HTTP uploads using POST or PUT, functionality is not guaranteed. The HTTP protocol has no standard interoperable resume upload and curl uses a set of headers for this purpose that once proved working for some servers and have been left for those who find that useful.\n\nThis command line option is mutually exclusive with --continue-at: you can only use one of them for a single transfer.\n\nIf --range is provided several times, the last set value is used.\n\nExample:\n\nSee also --continue-at and --append.",
    "choices": [
      {
        "value": "0-499",
        "desc": "specifies the first 500 bytes"
      },
      {
        "value": "500-999",
        "desc": "specifies the second 500 bytes"
      },
      {
        "value": "9500-",
        "desc": "specifies the bytes from offset 9500 and forward"
      },
      {
        "value": "0-0,-1",
        "desc": "specifies the first and last byte only(*)(HTTP)"
      },
      {
        "value": "100-199,500-599",
        "desc": "specifies two separate 100-byte ranges(*) (HTTP)"
      }
    ],
    "examples": [
      "curl --range 22-44 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--continue-at",
      "--append"
    ]
  },
  {
    "id": "remote-header-name",
    "name": "--remote-header-name",
    "short": "-J",
    "arg": null,
    "label": "--remote-header-name",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Tell the --remote-name option to use the server-specified Content-Disposition filename instead of extracting a filename from the URL. If the server-provided filename contains a path, that is stripped off before the filename is used.",
    "description": "(HTTP) Tell the --remote-name option to use the server-specified Content-Disposition filename instead of extracting a filename from the URL. If the server-provided filename contains a path, that is stripped off before the filename is used.\n\nThe file is saved in the current directory, or in the directory specified with --output-dir.\n\nIf the server specifies a filename and a file with that name already exists in the destination directory, it is not overwritten and an error occurs - unless you allow it by using the --clobber option. If the server does not specify a filename then this option has no effect.\n\nThere is no attempt to decode %-sequences (yet) in the provided filename, so this option may provide you with rather unexpected filenames.\n\nThis feature uses the name from the \"filename\" field, it does not yet support the \"filename*\" field (filenames with explicit character sets).\n\nStarting in 8.19.0, curl falls back and uses the filename extracted from the last redirect header if no \"Content-Disposition:\" header provides a filename.\n\nWARNING: Exercise judicious use of this option, especially on Windows. A rogue server could send you the name of a DLL or other file that could be loaded automatically by Windows or some third party software.\n\nProviding --remote-header-name multiple times has no extra effect. Disable it again with --no-remote-header-name.\n\nExample:\n\nSee also --remote-name.",
    "choices": [],
    "examples": [
      "curl -OJ https://example.com/file"
    ],
    "addedIn": null,
    "seeAlso": [
      "--remote-name"
    ]
  },
  {
    "id": "styled-output",
    "name": "--styled-output",
    "short": null,
    "arg": null,
    "label": "--styled-output",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "Enable automatic use of bold font styles when writing HTTP headers to the terminal. Use --no-styled-output to switch them off.",
    "description": "Enable automatic use of bold font styles when writing HTTP headers to the terminal. Use --no-styled-output to switch them off.\n\nStyled output requires a terminal that supports bold fonts. This feature is not present on curl for Windows due to lack of this capability.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --styled-output multiple times has no extra effect. Disable it again with --no-styled-output.\n\nExample:\n\nSee also --head and --verbose.",
    "choices": [],
    "examples": [
      "curl --styled-output -I https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--head",
      "--verbose"
    ]
  },
  {
    "id": "tcp-nodelay",
    "name": "--tcp-nodelay",
    "short": null,
    "arg": null,
    "label": "--tcp-nodelay",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "Turn on the TCP_NODELAY option.",
    "description": "Turn on the TCP_NODELAY option.\n\nThis option disables the Nagle algorithm on TCP connections. The purpose of this algorithm is to minimize the number of small packets on the network (where \"small packets\" means TCP segments less than the Maximum Segment Size for the network).\n\nMaximizing the amount of data sent per TCP segment is good because it amortizes the overhead of the send. In some cases small segments may need to be sent without delay. This is less efficient than sending larger amounts of data at a time, and can contribute to congestion on the network if overdone.\n\ncurl sets this option by default and you need to explicitly switch it off if you do not want it on.\n\nProviding --tcp-nodelay multiple times has no extra effect. Disable it again with --no-tcp-nodelay.\n\nExample:\n\nSee also --no-buffer.",
    "choices": [],
    "examples": [
      "curl --tcp-nodelay https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--no-buffer"
    ]
  },
  {
    "id": "time-cond",
    "name": "--time-cond",
    "short": "-z",
    "arg": "<time>",
    "label": "--time-cond <time>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP FTP) Request a file that has been modified later than the given time and date, or one that has been modified before that time. The date expression can be all sorts of date strings or if it does not match any internal ones, it is treated as a filename and curl tries to get the modification date (mtime) from that file instead. See the curl_getdate man page for date expression details.",
    "description": "(HTTP FTP) Request a file that has been modified later than the given time and date, or one that has been modified before that time. The date expression can be all sorts of date strings or if it does not match any internal ones, it is treated as a filename and curl tries to get the modification date (mtime) from that file instead. See the curl_getdate man page for date expression details.\n\nStart the date expression with a dash (-) to make it request for a document that is older than the given date/time, default is a document that is newer than the specified date/time.\n\nIf provided a non-existing file, curl outputs a warning about that fact and proceeds to do the transfer without a time condition.\n\nIf --time-cond is provided several times, the last set value is used.\n\nExamples:\n\nSee also --etag-compare and --remote-time.",
    "choices": [],
    "examples": [
      "curl -z \"Wed 01 Sep 2021 12:18:00\" https://example.com\ncurl -z \"-Wed 01 Sep 2021 12:18:00\" https://example.com\ncurl -z file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--etag-compare",
      "--remote-time"
    ]
  },
  {
    "id": "tr-encoding",
    "name": "--tr-encoding",
    "short": null,
    "arg": null,
    "label": "--tr-encoding",
    "type": "boolean",
    "category": "http",
    "popularity": 15,
    "summary": "(HTTP) Request a compressed Transfer-Encoding response using one of the algorithms curl supports, and uncompress the data while receiving it.",
    "description": "(HTTP) Request a compressed Transfer-Encoding response using one of the algorithms curl supports, and uncompress the data while receiving it.\n\nThis method was once intended to be the way to do automatic data compression for HTTP but for all practical purposes using Content-Encoding as done with --compressed has superseded transfer encoding. The --tr-encoding option is therefore often not be one you want.\n\nProviding --tr-encoding multiple times has no extra effect. Disable it again with --no-tr-encoding.\n\nExample:\n\nSee also --compressed.",
    "choices": [],
    "examples": [
      "curl --tr-encoding https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--compressed"
    ]
  },
  {
    "id": "upload-file",
    "name": "--upload-file",
    "short": "-T",
    "arg": "<file>",
    "label": "--upload-file <file>",
    "type": "filepath",
    "category": "http",
    "popularity": 15,
    "summary": "Upload the specified local file to the remote URL.",
    "description": "Upload the specified local file to the remote URL.\n\nIf there is no file part in the specified URL, curl appends the local file name to the end of the URL before the operation starts. You must use a trailing slash (\"/\") on the last directory to prove to curl that there is no filename or curl thinks that your last directory name is the remote filename to use.\n\nWhen putting the local filename at the end of the URL, curl ignores what is on the left side of any slash (\"/\") or backslash (\"\\\\\") used in the filename and only appends what is on the right side of the rightmost such character.\n\nUse the filename \"-\" (a single dash) to use stdin instead of a given file. Alternately, the filename \".\" (a single period) may be specified instead of \"-\" to use stdin in non-blocking mode to allow reading server output while stdin is being uploaded.\n\nIf this option is used with an HTTP(S) URL, the PUT method is used.\n\nYou can specify one --upload-file for each URL on the command line. Each --upload-file + URL pair specifies what to upload and to where. curl also supports globbing of the --upload-file argument, meaning that you can upload multiple files to a single URL by using the same URL globbing style supported in the URL. Example:\n\nSince curl 8.21.0, you can use parts of the upload filename when it uses globbing by setting a glob name and referencing that in the same way you reference named URL globs. For example, if you upload three files to a single fixed HTTP URL and want to save the corresponding responses in separate files:\n\nWhen uploading to an SMTP server (aka \"sending email\"): the uploaded data is assumed to be RFC 5322 formatted. It has to feature the necessary set of headers and mail body formatted correctly by the user as curl does not transcode nor encode it further in any way.\n\n--upload-file is associated with a single URL. Use it once per URL when you use several URLs in a command line.\n\nExamples:\n\nSee also --get, --head, --request and --data.",
    "choices": [],
    "examples": [
      "curl --upload-file 'file{1,2,3}' ftp://ftp.example/",
      "curl -T 'file{<num>1,2,3}' \\\n  https://upload.example/ -o 'response-#<num>'",
      "curl -T file https://example.com\ncurl -T \"img[1-1000].png\" ftp://ftp.example.com/\ncurl --upload-file \"{file1,file2}\" https://example.com\ncurl -T file -T file2 https://example.com https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--get",
      "--head",
      "--request",
      "--data"
    ]
  },
  {
    "id": "variable",
    "name": "--variable",
    "short": null,
    "arg": "<[%]name=text/@file>",
    "label": "--variable <[%]name=text/@file>",
    "type": "choice",
    "category": "http",
    "popularity": 15,
    "summary": "Set a variable with \"name=content\" or \"name@file\" (where \"file\" can be stdin if set to a single dash (\"-\")). The name is a case sensitive identifier that must consist of no other letters than a-z, A-Z, 0-9 or underscore. The specified content is then associated with this identifier.",
    "description": "Set a variable with \"name=content\" or \"name@file\" (where \"file\" can be stdin if set to a single dash (\"-\")). The name is a case sensitive identifier that must consist of no other letters than a-z, A-Z, 0-9 or underscore. The specified content is then associated with this identifier.\n\nSetting the same variable name again overwrites the old contents with the new.\n\nThe contents of a variable can be referenced in a later command line option when that option name is prefixed with \"--expand-\", and the name is used as \"{{name}}\".\n\n--variable can import environment variables into the name space. Opt to either require the environment variable to be set or provide a default value for the variable in case it is not already set.\n\n--variable %name imports the variable called \"name\" but exits with an error if that environment variable is not already set. To provide a default value if the environment variable is not set, use --variable %name=content or --variable %name@content. Note that on some systems - but not all - environment variables are case insensitive.\n\nAdded in curl 8.12.0: you can get a byte range from the source by appending \"[start-end]\" to the variable name, where start and end are byte offsets to include from the contents. For example, asking for offset \"2-10\" means offset two to offset ten, inclusive, resulting in 9 bytes in total. \"2-2\" means a single byte at offset 2. Not providing a second number implies to the end of data. The start offset cannot be larger than the end offset. Asking for a range that is outside of the file size makes the variable contents empty. For example, getting the first one hundred bytes from a given file:\n\nGiven a byte range that has no data results in an empty string. Asking for a range that is larger than the content makes curl use the piece of the data that exists.\n\nTo assign a variable using contents from another variable, use --expand-variable. Like for example assigning a new variable using contents from two other:\n\nWhen expanding variables, curl supports a set of functions that can make the variable contents more convenient to use. You apply a function to a variable expansion by adding a colon and then list the desired functions in a comma-separated list that is evaluated in a left-to-right order. Variable content holding null bytes that are not encoded when expanded causes an error.\n\nAvailable functions:\n\n--variable can be used several times in a command line.\n\nExample:\n\nAdded in 8.3.0. See also --config.",
    "choices": [
      {
        "value": "trim",
        "desc": "removes all leading and trailing white space. Example:"
      },
      {
        "value": "json",
        "desc": "outputs the content using JSON string quoting rules. Example:"
      },
      {
        "value": "url",
        "desc": "shows the content URL (percent) encoded. Example:"
      },
      {
        "value": "b64",
        "desc": "expands the variable base64 encoded Example:"
      },
      {
        "value": "64dec",
        "desc": "decodes a base64 encoded character sequence. If the sequence is not possible to decode, it instead outputs \"[64dec-fail]\" Example: (Added in 8.13.0)"
      }
    ],
    "examples": [
      "curl --variable \"fraction[0-99]@filename\"",
      "curl --expand-variable \"user={{firstname}} {{lastname}}\"",
      "curl --expand-url https://example.com/{{var:trim}}",
      "curl --expand-data {{data:json}} https://example.com",
      "curl --expand-url https://example.com/{{path:url}}",
      "curl --expand-url https://example.com/{{var:b64}}",
      "curl --expand-url https://example.com/{{var:64dec}}",
      "curl --variable name=smith --expand-url \"https://example.com/{{name}}\""
    ],
    "addedIn": "8.3.0.",
    "seeAlso": [
      "--config"
    ]
  },
  {
    "id": "vlan-priority",
    "name": "--vlan-priority",
    "short": null,
    "arg": "<priority>",
    "label": "--vlan-priority <priority>",
    "type": "string",
    "category": "http",
    "popularity": 15,
    "summary": "Set VLAN priority as defined in IEEE 802.1Q.",
    "description": "Set VLAN priority as defined in IEEE 802.1Q.\n\nThis field is set on Ethernet level, and only works within a local network.\n\nThe valid range for <priority> is 0 to 7.\n\nIf --vlan-priority is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.9.0. See also --ip-tos.",
    "choices": [],
    "examples": [
      "curl --vlan-priority 4 https://example.com"
    ],
    "addedIn": "8.9.0.",
    "seeAlso": [
      "--ip-tos"
    ]
  },
  {
    "id": "disable-eprt",
    "name": "--disable-eprt",
    "short": null,
    "arg": null,
    "label": "--disable-eprt",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "(FTP) Disable the use of the EPRT and LPRT commands when doing active FTP transfers. curl normally first attempts to use EPRT before using PORT, but with this option, it uses PORT right away. EPRT is an extension to the original FTP protocol, and does not work on all servers, but enables more functionality in a better way than the traditional PORT command.",
    "description": "(FTP) Disable the use of the EPRT and LPRT commands when doing active FTP transfers. curl normally first attempts to use EPRT before using PORT, but with this option, it uses PORT right away. EPRT is an extension to the original FTP protocol, and does not work on all servers, but enables more functionality in a better way than the traditional PORT command.\n\n--eprt can be used to explicitly enable EPRT again and --no-eprt is an alias for --disable-eprt.\n\nIf the server is accessed using IPv6, this option has no effect as EPRT is necessary then.\n\nDisabling EPRT only changes the active behavior. If you want to switch to passive mode you need to not use --ftp-port or force it with --ftp-pasv.\n\nProviding --disable-eprt multiple times has no extra effect. Disable it again with --no-disable-eprt.\n\nExample:\n\nSee also --disable-epsv and --ftp-port.",
    "choices": [],
    "examples": [
      "curl --disable-eprt ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--disable-epsv",
      "--ftp-port"
    ]
  },
  {
    "id": "disable-epsv",
    "name": "--disable-epsv",
    "short": null,
    "arg": null,
    "label": "--disable-epsv",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "(FTP) Disable the use of the EPSV command when doing passive FTP transfers. curl normally first attempts to use EPSV before PASV, but with this option, it does not try EPSV.",
    "description": "(FTP) Disable the use of the EPSV command when doing passive FTP transfers. curl normally first attempts to use EPSV before PASV, but with this option, it does not try EPSV.\n\n--epsv can be used to explicitly enable EPSV again and --no-epsv is an alias for --disable-epsv.\n\nIf the server is an IPv6 host, this option has no effect as EPSV is necessary then.\n\nDisabling EPSV only changes the passive behavior. If you want to switch to active mode you need to use --ftp-port.\n\nProviding --disable-epsv multiple times has no extra effect. Disable it again with --no-disable-epsv.\n\nExample:\n\nSee also --disable-eprt and --ftp-port.",
    "choices": [],
    "examples": [
      "curl --disable-epsv ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--disable-eprt",
      "--ftp-port"
    ]
  },
  {
    "id": "dns-interface",
    "name": "--dns-interface",
    "short": null,
    "arg": "<interface>",
    "label": "--dns-interface <interface>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "(DNS) Send outgoing DNS requests through the given interface. This option is a counterpart to --interface (which does not affect DNS). The supplied string must be an interface name (not an address).",
    "description": "(DNS) Send outgoing DNS requests through the given interface. This option is a counterpart to --interface (which does not affect DNS). The supplied string must be an interface name (not an address).\n\nIf --dns-interface is provided several times, the last set value is used.\n\nExample:\n\nFor --dns-interface to work, it requires that the underlying libcurl is built to support c-ares. See also --dns-ipv4-addr and --dns-ipv6-addr.",
    "choices": [],
    "examples": [
      "curl --dns-interface eth0 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dns-interface",
      "--dns-ipv4-addr",
      "--dns-ipv6-addr"
    ]
  },
  {
    "id": "dns-ipv4-addr",
    "name": "--dns-ipv4-addr",
    "short": null,
    "arg": "<address>",
    "label": "--dns-ipv4-addr <address>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "(DNS) Bind to a specific IP address when making IPv4 DNS requests, so that the DNS requests originate from this address. The argument should be a single IPv4 address.",
    "description": "(DNS) Bind to a specific IP address when making IPv4 DNS requests, so that the DNS requests originate from this address. The argument should be a single IPv4 address.\n\nIf --dns-ipv4-addr is provided several times, the last set value is used.\n\nExample:\n\nFor --dns-ipv4-addr to work, it requires that the underlying libcurl is built to support c-ares. See also --dns-interface and --dns-ipv6-addr.",
    "choices": [],
    "examples": [
      "curl --dns-ipv4-addr 10.1.2.3 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dns-ipv4-addr",
      "--dns-interface",
      "--dns-ipv6-addr"
    ]
  },
  {
    "id": "dns-ipv6-addr",
    "name": "--dns-ipv6-addr",
    "short": null,
    "arg": "<address>",
    "label": "--dns-ipv6-addr <address>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "(DNS) Bind to a specific IP address when making IPv6 DNS requests, so that the DNS requests originate from this address. The argument should be a single IPv6 address.",
    "description": "(DNS) Bind to a specific IP address when making IPv6 DNS requests, so that the DNS requests originate from this address. The argument should be a single IPv6 address.\n\nIf --dns-ipv6-addr is provided several times, the last set value is used.\n\nExample:\n\nFor --dns-ipv6-addr to work, it requires that the underlying libcurl is built to support c-ares. See also --dns-interface and --dns-ipv4-addr.",
    "choices": [],
    "examples": [
      "curl --dns-ipv6-addr 2a04:4e42::561 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dns-ipv6-addr",
      "--dns-interface",
      "--dns-ipv4-addr"
    ]
  },
  {
    "id": "dns-servers",
    "name": "--dns-servers",
    "short": null,
    "arg": "<addresses>",
    "label": "--dns-servers <addresses>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "(DNS) Set the list of DNS servers to be used instead of the system default. The list of IP addresses should be separated with commas. Port numbers may also optionally be given, appended to the IP address separated with a colon.",
    "description": "(DNS) Set the list of DNS servers to be used instead of the system default. The list of IP addresses should be separated with commas. Port numbers may also optionally be given, appended to the IP address separated with a colon.\n\nIf --dns-servers is provided several times, the last set value is used.\n\nExamples:\n\nFor --dns-servers to work, it requires that the underlying libcurl is built to support c-ares. See also --dns-interface and --dns-ipv4-addr.",
    "choices": [],
    "examples": [
      "curl --dns-servers 192.168.0.1,192.168.0.2 https://example.com\ncurl --dns-servers 10.0.0.1:53 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dns-servers",
      "--dns-interface",
      "--dns-ipv4-addr"
    ]
  },
  {
    "id": "globoff",
    "name": "--globoff",
    "short": "-g",
    "arg": null,
    "label": "--globoff",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "Switch off the URL globbing function. When you set this option, you can specify URLs that contain the letters {}[] without having curl itself interpret them. Note that these letters are not normal legal URL contents but they should be encoded according to the URI standard.",
    "description": "Switch off the URL globbing function. When you set this option, you can specify URLs that contain the letters {}[] without having curl itself interpret them. Note that these letters are not normal legal URL contents but they should be encoded according to the URI standard.\n\ncurl detects numerical IPv6 addresses when used in URLs and excludes them from the treatment, so they can still be used without having to disable globbing.\n\nProviding --globoff multiple times has no extra effect. Disable it again with --no-globoff.\n\nExample:\n\nSee also --config and --disable.",
    "choices": [],
    "examples": [
      "curl -g \"https://example.com/{[]}}}}\""
    ],
    "addedIn": null,
    "seeAlso": [
      "--config",
      "--disable"
    ]
  },
  {
    "id": "interface",
    "name": "--interface",
    "short": null,
    "arg": "<name>",
    "label": "Network Interface (绑定特定网卡/IP)",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "Perform the operation using a specified interface. You can enter interface name, IP address or hostname. If you prefer to be specific, you can use the following special syntax:",
    "description": "Perform the operation using a specified interface. You can enter interface name, IP address or hostname. If you prefer to be specific, you can use the following special syntax:\n\ncurl does not support using network interface names for this option on Windows.\n\nThat name resolve operation if a hostname is provided does not use DNS-over-HTTPS even if --doh-url is set.\n\nOn Linux this option can be used to specify a VRF (Virtual Routing and Forwarding) device, but the binary then needs to either have the CAP_NET_RAW capability set or to be run as root.\n\nIf --interface is provided several times, the last set value is used.\n\nExamples:\n\nSee also --dns-interface.",
    "choices": [
      {
        "value": "if!<name>",
        "desc": "Interface name. If the provided name does not match an existing interface, curl returns with error 45."
      },
      {
        "value": "host!<name>",
        "desc": "IP address or hostname."
      },
      {
        "value": "ifhost!<interface>!<host>",
        "desc": "Interface name and IP address or hostname. This syntax requires libcurl 8.9.0 or later. If the provided name does not match an existing interface, curl returns with error 45."
      }
    ],
    "examples": [
      "curl --interface eth0 https://example.com\ncurl --interface \"host!10.0.0.1\" https://example.com\ncurl --interface \"if!enp3s0\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dns-interface"
    ]
  },
  {
    "id": "ip-tos",
    "name": "--ip-tos",
    "short": null,
    "arg": "<string>",
    "label": "--ip-tos <string>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "Set Type of Service (TOS) for IPv4 or Traffic Class for IPv6.",
    "description": "Set Type of Service (TOS) for IPv4 or Traffic Class for IPv6.\n\nThe values allowed for <string> can be a numeric value between 1 and 255 or one of the following:\n\nCS0, CS1, CS2, CS3, CS4, CS5, CS6, CS7, AF11, AF12, AF13, AF21, AF22, AF23, AF31, AF32, AF33, AF41, AF42, AF43, EF, VOICE-ADMIT, ECT1, ECT0, CE, LE, LOWCOST, LOWDELAY, THROUGHPUT, RELIABILITY, MINCOST\n\nIf --ip-tos is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.9.0. See also --tcp-nodelay and --vlan-priority.",
    "choices": [],
    "examples": [
      "curl --ip-tos CS5 https://example.com"
    ],
    "addedIn": "8.9.0.",
    "seeAlso": [
      "--tcp-nodelay",
      "--vlan-priority"
    ]
  },
  {
    "id": "keepalive-cnt",
    "name": "--keepalive-cnt",
    "short": null,
    "arg": "<integer>",
    "label": "--keepalive-cnt <integer>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "Set the maximum number of keepalive probes TCP should send but get no response before dropping the connection. This option is usually used in conjunction with --keepalive-time.",
    "description": "Set the maximum number of keepalive probes TCP should send but get no response before dropping the connection. This option is usually used in conjunction with --keepalive-time.\n\nThis option is supported on Linux, *BSD/macOS, Windows >=10.0.16299, Solaris 11.4, and recent AIX, HP-UX and more. This option has no effect if --no-keepalive is used.\n\nIf unspecified, the option defaults to 9.\n\nIf --keepalive-cnt is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.9.0. See also --keepalive-time and --no-keepalive.",
    "choices": [],
    "examples": [
      "curl --keepalive-cnt 3 https://example.com"
    ],
    "addedIn": "8.9.0.",
    "seeAlso": [
      "--keepalive-time",
      "--no-keepalive"
    ]
  },
  {
    "id": "keepalive-time",
    "name": "--keepalive-time",
    "short": null,
    "arg": "<seconds>",
    "label": "--keepalive-time <seconds>",
    "type": "number",
    "category": "network",
    "popularity": 15,
    "summary": "Set the time a connection needs to remain idle before sending keepalive probes and the time between individual keepalive probes. It is currently effective on operating systems offering the \"TCP_KEEPIDLE\" and \"TCP_KEEPINTVL\" socket options (meaning Linux, *BSD/macOS, Windows, Solaris, and recent AIX, HP-UX and more). Keepalive is used by the TCP stack to detect broken networks on idle connections. The number of missed keepalive probes before declaring the connection down is OS dependent and is commonly 8 (*BSD/macOS/AIX), 9 (Linux/AIX) or 5/10 (Windows), and this number can be changed by specifying the curl option \"keepalive-cnt\". Note that this option has no effect if --no-keepalive is used.",
    "description": "Set the time a connection needs to remain idle before sending keepalive probes and the time between individual keepalive probes. It is currently effective on operating systems offering the \"TCP_KEEPIDLE\" and \"TCP_KEEPINTVL\" socket options (meaning Linux, *BSD/macOS, Windows, Solaris, and recent AIX, HP-UX and more). Keepalive is used by the TCP stack to detect broken networks on idle connections. The number of missed keepalive probes before declaring the connection down is OS dependent and is commonly 8 (*BSD/macOS/AIX), 9 (Linux/AIX) or 5/10 (Windows), and this number can be changed by specifying the curl option \"keepalive-cnt\". Note that this option has no effect if --no-keepalive is used.\n\nIf unspecified, the option defaults to 60 seconds.\n\nIf --keepalive-time is provided several times, the last set value is used.\n\nExample:\n\nSee also --no-keepalive, --keepalive-cnt and --max-time.",
    "choices": [],
    "examples": [
      "curl --keepalive-time 20 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--no-keepalive",
      "--keepalive-cnt",
      "--max-time"
    ]
  },
  {
    "id": "no-keepalive",
    "name": "--no-keepalive",
    "short": null,
    "arg": null,
    "label": "--no-keepalive",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "Disable the use of keepalive messages on the TCP connection. curl otherwise enables them by default.",
    "description": "Disable the use of keepalive messages on the TCP connection. curl otherwise enables them by default.\n\nNote that this is the negated option name documented. You can thus use --keepalive to enforce keepalive.\n\nProviding --no-keepalive multiple times has no extra effect. Disable it again with --keepalive.\n\nExample:\n\nSee also --keepalive-time and --keepalive-cnt.",
    "choices": [],
    "examples": [
      "curl --no-keepalive https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--keepalive-time",
      "--keepalive-cnt"
    ]
  },
  {
    "id": "rate",
    "name": "--rate",
    "short": null,
    "arg": "<max request rate>",
    "label": "--rate <max request rate>",
    "type": "string",
    "category": "network",
    "popularity": 15,
    "summary": "Specify the maximum transfer frequency you allow curl to use - in number of transfer starts per time unit (sometimes called request rate). Without this option, curl starts the next transfer as fast as possible.",
    "description": "Specify the maximum transfer frequency you allow curl to use - in number of transfer starts per time unit (sometimes called request rate). Without this option, curl starts the next transfer as fast as possible.\n\nIf given several URLs and a transfer completes faster than the allowed rate, curl waits until the next transfer is started to maintain the requested rate. This option has no effect when --parallel is used.\n\nThe request rate is provided as \"N/U\" where N is an integer number and U is a time unit. Supported units are 's' (second), 'm' (minute), 'h' (hour) and 'd' /(day, as in a 24 hour unit). The default time unit, if no \"/U\" is provided, is number of transfers per hour.\n\nIf curl is told to allow 10 requests per minute, it does not start the next request until 6 seconds have elapsed since the previous transfer was started.\n\nThis function uses millisecond resolution. If the allowed frequency is set more than 1000 per second, it instead runs unrestricted.\n\nWhen retrying transfers, enabled with --retry, the separate retry delay logic is used and not this setting.\n\nStarting in version 8.10.0, you can specify the number of time units in the rate expression. Make curl do no more than 5 transfers per 15 seconds with \"5/15s\" or limit it to 3 transfers per 4 hours with \"3/4h\". No spaces allowed.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --rate is provided several times, the last set value is used.\n\nExamples:\n\nAdded in 7.84.0. See also --limit-rate and --retry-delay.",
    "choices": [],
    "examples": [
      "curl --rate 2/s https://example.com ...\ncurl --rate 3/h https://example.com ...\ncurl --rate 14/m https://example.com ..."
    ],
    "addedIn": "7.84.0.",
    "seeAlso": [
      "--limit-rate",
      "--retry-delay"
    ]
  },
  {
    "id": "retry-all-errors",
    "name": "--retry-all-errors",
    "short": null,
    "arg": null,
    "label": "--retry-all-errors",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "Retry on any error. This option is used together with --retry.",
    "description": "Retry on any error. This option is used together with --retry.\n\nThis option is the \"sledgehammer\" of retrying. Do not use this option by default (for example in your curlrc), there may be unintended consequences such as sending or receiving duplicate data. Do not use with redirected input or output. You might be better off handling your unique problems in a shell script. Please read the example below.\n\nWARNING: For server compatibility curl attempts to retry failed flaky transfers as close as possible to how they were started, but this is not possible with redirected input or output. For example, before retrying it removes output data from a failed partial transfer that was written to an output file. However this is not true of data redirected to a | pipe or > file, which are not reset. We strongly suggest you do not parse or record output via redirect in combination with this option, since you may receive duplicate data.\n\nBy default curl does not return an error for transfers with an HTTP response code that indicates an HTTP error, if the transfer was successful. For example, if a server replies 404 Not Found and the reply is fully received then that is not an error. When --retry is used then curl retries on some HTTP response codes that indicate transient HTTP errors, but that does not include most 4xx response codes such as 404. If you want to retry on all response codes that indicate HTTP errors (4xx and 5xx) then combine with --fail.\n\nProviding --retry-all-errors multiple times has no extra effect. Disable it again with --no-retry-all-errors.\n\nExample:\n\nAdded in 7.71.0. See also --retry.",
    "choices": [],
    "examples": [
      "curl --retry 5 --retry-all-errors https://example.com"
    ],
    "addedIn": "7.71.0.",
    "seeAlso": [
      "--retry"
    ]
  },
  {
    "id": "retry-connrefused",
    "name": "--retry-connrefused",
    "short": null,
    "arg": null,
    "label": "--retry-connrefused",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "In addition to the other conditions, also consider ECONNREFUSED as a transient error for --retry. This option is used together with --retry. Normally, a refused connection is not considered a transient error and therefore would not otherwise trigger a retry.",
    "description": "In addition to the other conditions, also consider ECONNREFUSED as a transient error for --retry. This option is used together with --retry. Normally, a refused connection is not considered a transient error and therefore would not otherwise trigger a retry.\n\nProviding --retry-connrefused multiple times has no extra effect. Disable it again with --no-retry-connrefused.\n\nExample:\n\nSee also --retry and --retry-all-errors.",
    "choices": [],
    "examples": [
      "curl --retry-connrefused --retry 7 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--retry",
      "--retry-all-errors"
    ]
  },
  {
    "id": "retry-max-time",
    "name": "--retry-max-time",
    "short": null,
    "arg": "<seconds>",
    "label": "--retry-max-time <seconds>",
    "type": "number",
    "category": "network",
    "popularity": 15,
    "summary": "The retry timer is reset before the first transfer attempt. Retries are done as usual (see --retry) as long as the timer has not reached this given limit. Notice that if the timer has not reached the limit, the request is made and while performing, it may take longer than this given time period. To limit a single request's maximum time, use --max-time. Set this option to zero to not timeout retries.",
    "description": "The retry timer is reset before the first transfer attempt. Retries are done as usual (see --retry) as long as the timer has not reached this given limit. Notice that if the timer has not reached the limit, the request is made and while performing, it may take longer than this given time period. To limit a single request's maximum time, use --max-time. Set this option to zero to not timeout retries.\n\nThe retry timer starts immediately before the first transfer attempt and includes time spent sleeping between retries (such as delays defined by --retry-delay). Before each new retry is started, curl checks whether the elapsed time has reached the specified limit. If it has, no further retries are performed.\n\nA transfer that has already started is allowed to run to completion even if this makes the total wall clock time exceed the limit. Use --max-time to also cap the duration of each individual transfer attempt.\n\nStarting in curl 8.16.0, this option accepts a time as decimal number for parts of seconds. The decimal value needs to be provided using a dot (.) as decimal separator - not the local version even if it might be using another separator.\n\nIf --retry-max-time is provided several times, the last set value is used.\n\nExample:\n\nSee also --retry and --retry-delay.",
    "choices": [],
    "examples": [
      "curl --retry-max-time 30 --retry 10 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--retry",
      "--retry-delay"
    ]
  },
  {
    "id": "speed-limit",
    "name": "--speed-limit",
    "short": "-Y",
    "arg": "<speed>",
    "label": "--speed-limit <speed>",
    "type": "number",
    "category": "network",
    "popularity": 15,
    "summary": "If a transfer is slower than this set speed (in bytes per second) for a given number of seconds, it gets aborted. The time period is set with --speed-time and is 30 seconds by default.",
    "description": "If a transfer is slower than this set speed (in bytes per second) for a given number of seconds, it gets aborted. The time period is set with --speed-time and is 30 seconds by default.\n\nIf --speed-limit is provided several times, the last set value is used.\n\nExample:\n\nSee also --speed-time, --limit-rate and --max-time.",
    "choices": [],
    "examples": [
      "curl --speed-limit 300 --speed-time 10 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--speed-time",
      "--limit-rate",
      "--max-time"
    ]
  },
  {
    "id": "speed-time",
    "name": "--speed-time",
    "short": "-y",
    "arg": "<seconds>",
    "label": "--speed-time <seconds>",
    "type": "number",
    "category": "network",
    "popularity": 15,
    "summary": "If a transfer runs slower than speed-limit bytes per second during a speed-time period, the transfer is aborted. If speed-time is used, the default speed-limit is 1 unless set with --speed-limit.",
    "description": "If a transfer runs slower than speed-limit bytes per second during a speed-time period, the transfer is aborted. If speed-time is used, the default speed-limit is 1 unless set with --speed-limit.\n\nThis option controls transfers (in both directions) but does not affect slow connects etc. If this is a concern for you, try the --connect-timeout option.\n\nIf --speed-time is provided several times, the last set value is used.\n\nExample:\n\nSee also --speed-limit and --limit-rate.",
    "choices": [],
    "examples": [
      "curl --speed-limit 300 --speed-time 10 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--speed-limit",
      "--limit-rate"
    ]
  },
  {
    "id": "tcp-fastopen",
    "name": "--tcp-fastopen",
    "short": null,
    "arg": null,
    "label": "--tcp-fastopen",
    "type": "boolean",
    "category": "network",
    "popularity": 15,
    "summary": "Enable use of TCP Fast Open (RFC 7413). TCP Fast Open is a TCP extension that allows data to be sent earlier over the connection (before the final handshake ACK) if the client and server have been connected previously.",
    "description": "Enable use of TCP Fast Open (RFC 7413). TCP Fast Open is a TCP extension that allows data to be sent earlier over the connection (before the final handshake ACK) if the client and server have been connected previously.\n\nProviding --tcp-fastopen multiple times has no extra effect. Disable it again with --no-tcp-fastopen.\n\nExample:\n\nSee also --false-start.",
    "choices": [],
    "examples": [
      "curl --tcp-fastopen https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--false-start"
    ]
  },
  {
    "id": "ca-native",
    "name": "--ca-native",
    "short": null,
    "arg": null,
    "label": "--ca-native",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use the operating system's native CA store for certificate verification.",
    "description": "(TLS) Use the operating system's native CA store for certificate verification.\n\nThis option is independent of other CA certificate locations set at run time or build time. Those locations are searched in addition to the native CA store.\n\nThis option works with OpenSSL and its forks (BoringSSL, LibreSSL, etc) on Windows (Added in 7.71.0) and on Apple OS when libcurl is built with Apple SecTrust enabled. (Added in 8.17.0)\n\nThis option works with wolfSSL on Windows, Linux (Debian, Ubuntu, Gentoo, Fedora, RHEL), macOS, Android and iOS. (Added in 8.3.0)\n\nThis option works with GnuTLS (Added in 8.5.0) and also uses Apple SecTrust when libcurl is built with it. (Added in 8.17.0)\n\nThis option works with Rustls on Windows, macOS, Android and iOS. On Linux it is equivalent to using the Mozilla CA certificate bundle. When used with Rustls _only_ the native CA store is consulted, not other locations set at run time or build time. (Added in 8.13.0)\n\nThis option currently has no effect for Schannel. This is the native TLS library from Microsoft, that by default uses the native CA store for verification unless overridden by a CA certificate location setting.\n\nProviding --ca-native multiple times has no extra effect. Disable it again with --no-ca-native.\n\nExample:\n\nAdded in 8.2.0. See also --cacert, --capath, --dump-ca-embed, --insecure and --proxy-ca-native.",
    "choices": [],
    "examples": [
      "curl --ca-native https://example.com"
    ],
    "addedIn": "8.2.0.",
    "seeAlso": [
      "--cacert",
      "--capath",
      "--dump-ca-embed",
      "--insecure",
      "--proxy-ca-native"
    ]
  },
  {
    "id": "capath",
    "name": "--capath",
    "short": null,
    "arg": "<dir>",
    "label": "--capath <dir>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use the specified certificate directory to verify the peer. If curl is built against OpenSSL, multiple paths can be provided by separating them with the appropriate platform-specific separator (e.g. \"path1:path2:path3\" on Unix-style platforms for \"path1;path2;path3\" on Windows).",
    "description": "(TLS) Use the specified certificate directory to verify the peer. If curl is built against OpenSSL, multiple paths can be provided by separating them with the appropriate platform-specific separator (e.g. \"path1:path2:path3\" on Unix-style platforms for \"path1;path2;path3\" on Windows).\n\nThe certificates must be in PEM format, and if curl is built against OpenSSL, the directory must have been processed using the c_rehash utility supplied with OpenSSL. Using --capath can allow OpenSSL-powered curl to make SSL-connections much more efficiently than using --cacert if the --cacert file contains many CA certificates.\n\nIf this option is set, the default capath value is ignored.\n\nIf --capath is provided several times, the last set value is used.\n\nExample:\n\nSee also --cacert, --dump-ca-embed and --insecure.",
    "choices": [],
    "examples": [
      "curl --capath /local/directory https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cacert",
      "--dump-ca-embed",
      "--insecure"
    ]
  },
  {
    "id": "cert-status",
    "name": "--cert-status",
    "short": null,
    "arg": null,
    "label": "--cert-status",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Verify the status of the server certificate by using the Certificate Status Request (aka. OCSP stapling) TLS extension.",
    "description": "(TLS) Verify the status of the server certificate by using the Certificate Status Request (aka. OCSP stapling) TLS extension.\n\nIf this option is enabled and the server sends an invalid (e.g. expired) response, if the response suggests that the server certificate has been revoked, or no response at all is received, the verification fails.\n\nThis support is currently only implemented in the OpenSSL and GnuTLS backends.\n\nProviding --cert-status multiple times has no extra effect. Disable it again with --no-cert-status.\n\nExample:\n\nSee also --pinnedpubkey.",
    "choices": [],
    "examples": [
      "curl --cert-status https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--pinnedpubkey"
    ]
  },
  {
    "id": "cert-type",
    "name": "--cert-type",
    "short": null,
    "arg": "<type>",
    "label": "--cert-type <type>",
    "type": "choice",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Set type of the provided client certificate. PEM, DER, ENG, PROV and P12 are recognized types.",
    "description": "(TLS) Set type of the provided client certificate. PEM, DER, ENG, PROV and P12 are recognized types.\n\nThe default type depends on the TLS backend and is usually PEM. For Schannel it is P12. If --cert is a pkcs11: URI then ENG or PROV is the default type (depending on OpenSSL version).\n\nIf --cert-type is provided several times, the last set value is used.\n\nExample:\n\nSee also --cert, --key and --key-type.",
    "choices": [
      {
        "value": "PEM",
        "desc": "PEM format certificate (default)"
      },
      {
        "value": "DER",
        "desc": "DER format certificate"
      },
      {
        "value": "ENG",
        "desc": "Crypto engine certificate"
      },
      {
        "value": "P12",
        "desc": "PKCS#12 format certificate"
      }
    ],
    "examples": [
      "curl --cert-type PEM --cert file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cert",
      "--key",
      "--key-type"
    ]
  },
  {
    "id": "ciphers",
    "name": "--ciphers",
    "short": null,
    "arg": "<list>",
    "label": "--ciphers <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Specify which cipher suites to use in the connection if it negotiates TLS 1.2 (1.1, 1.0). The list of ciphers suites must specify valid ciphers. Read up on cipher suite details on this URL:",
    "description": "(TLS) Specify which cipher suites to use in the connection if it negotiates TLS 1.2 (1.1, 1.0). The list of ciphers suites must specify valid ciphers. Read up on cipher suite details on this URL:\n\nhttps://curl.se/docs/ssl-ciphers.html\n\nIf --ciphers is provided several times, the last set value is used.\n\nExample:\n\nSee also --tls13-ciphers, --proxy-ciphers and --curves.",
    "choices": [],
    "examples": [
      "curl --ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tls13-ciphers",
      "--proxy-ciphers",
      "--curves"
    ]
  },
  {
    "id": "connect-to",
    "name": "--connect-to",
    "short": null,
    "arg": "<HOST1:PORT1:HOST2:PORT2>",
    "label": "--connect-to <HOST1:PORT1:HOST2:PORT2>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "For a request intended for the \"HOST1:PORT1\" pair, connect to \"HOST2:PORT2\" instead. This option is only used to establish the network connection. It does NOT affect the hostname/port number that is used for TLS/SSL (e.g. SNI, certificate verification) or for the application protocols.",
    "description": "For a request intended for the \"HOST1:PORT1\" pair, connect to \"HOST2:PORT2\" instead. This option is only used to establish the network connection. It does NOT affect the hostname/port number that is used for TLS/SSL (e.g. SNI, certificate verification) or for the application protocols.\n\n\"HOST1\" and \"PORT1\" may be empty strings, meaning any host or any port number. \"HOST2\" and \"PORT2\" may also be empty strings, meaning use the request's original hostname and port number.\n\nA hostname specified to this option is compared as a string, so it needs to match the name used in the request URL. It can be either numerical such as \"127.0.0.1\" or the full hostname such as \"example.org\".\n\nExample: redirect connects from the example.com hostname to 127.0.0.1 independently of port number:\n\nExample: redirect connects from all hostnames to 127.0.0.1 independently of port number:\n\n--connect-to can be used several times in a command line.\n\nExample:\n\nSee also --resolve and --header.",
    "choices": [],
    "examples": [
      "curl --connect-to example.com::127.0.0.1: https://example.com/",
      "curl --connect-to ::127.0.0.1: http://example.com/",
      "curl --connect-to example.com:443:example.net:8443 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--resolve",
      "--header"
    ]
  },
  {
    "id": "crlfile",
    "name": "--crlfile",
    "short": null,
    "arg": "<file>",
    "label": "--crlfile <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Provide a file using PEM format with a Certificate Revocation List that may specify peer certificates that are to be considered revoked.",
    "description": "(TLS) Provide a file using PEM format with a Certificate Revocation List that may specify peer certificates that are to be considered revoked.\n\nIf --crlfile is provided several times, the last set value is used.\n\nExample:\n\nSee also --cacert and --capath.",
    "choices": [],
    "examples": [
      "curl --crlfile rejects.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--cacert",
      "--capath"
    ]
  },
  {
    "id": "curves",
    "name": "--curves",
    "short": null,
    "arg": "<list>",
    "label": "--curves <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Set specific curves to use during SSL session establishment according to RFC 8422, 5.1. Multiple algorithms can be provided by separating them with \":\" (e.g. \"X25519:P-521\"). The parameter is available identically in the OpenSSL \"s_client\" and \"s_server\" utilities.",
    "description": "(TLS) Set specific curves to use during SSL session establishment according to RFC 8422, 5.1. Multiple algorithms can be provided by separating them with \":\" (e.g. \"X25519:P-521\"). The parameter is available identically in the OpenSSL \"s_client\" and \"s_server\" utilities.\n\n--curves allows a OpenSSL powered curl to make SSL-connections with exactly the (EC) curve requested by the client, avoiding nontransparent client/server negotiations.\n\nIf this option is set, the default curves list built into OpenSSL are ignored.\n\nIf --curves is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.73.0. See also --ciphers.",
    "choices": [],
    "examples": [
      "curl --curves X25519 https://example.com"
    ],
    "addedIn": "7.73.0.",
    "seeAlso": [
      "--ciphers"
    ]
  },
  {
    "id": "doh-cert-status",
    "name": "--doh-cert-status",
    "short": null,
    "arg": null,
    "label": "--doh-cert-status",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(DNS) Same as --cert-status but used for DoH (DNS-over-HTTPS).",
    "description": "(DNS) Same as --cert-status but used for DoH (DNS-over-HTTPS).\n\nVerify the status of the DoH servers' certificate by using the Certificate Status Request (aka. OCSP stapling) TLS extension.\n\nIf this option is enabled and the DoH server sends an invalid (e.g. expired) response, if the response suggests that the server certificate has been revoked, or no response at all is received, the verification fails.\n\nThis support is currently only implemented in the OpenSSL and GnuTLS backends.\n\nProviding --doh-cert-status multiple times has no extra effect. Disable it again with --no-doh-cert-status.\n\nExample:\n\nAdded in 7.76.0. See also --doh-insecure.",
    "choices": [],
    "examples": [
      "curl --doh-cert-status --doh-url https://doh.example https://example.com"
    ],
    "addedIn": "7.76.0.",
    "seeAlso": [
      "--doh-insecure"
    ]
  },
  {
    "id": "doh-insecure",
    "name": "--doh-insecure",
    "short": null,
    "arg": null,
    "label": "--doh-insecure",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(DNS) By default, every connection curl makes to a DoH server is verified to be secure before the transfer takes place. This option tells curl to skip the verification step and proceed without checking.",
    "description": "(DNS) By default, every connection curl makes to a DoH server is verified to be secure before the transfer takes place. This option tells curl to skip the verification step and proceed without checking.\n\nWARNING: using this option makes the DoH transfer and name resolution insecure.\n\nThis option is equivalent to --insecure and --proxy-insecure but used for DoH (DNS-over-HTTPS) only.\n\nProviding --doh-insecure multiple times has no extra effect. Disable it again with --no-doh-insecure.\n\nExample:\n\nAdded in 7.76.0. See also --doh-url, --insecure and --proxy-insecure.",
    "choices": [],
    "examples": [
      "curl --doh-insecure --doh-url https://doh.example https://example.com"
    ],
    "addedIn": "7.76.0.",
    "seeAlso": [
      "--doh-url",
      "--insecure",
      "--proxy-insecure"
    ]
  },
  {
    "id": "doh-url",
    "name": "--doh-url",
    "short": null,
    "arg": "<URL>",
    "label": "--doh-url <URL>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(DNS) Specify which DNS-over-HTTPS (DoH) server to use to resolve hostnames, instead of using the default name resolver mechanism. The URL must be HTTPS.",
    "description": "(DNS) Specify which DNS-over-HTTPS (DoH) server to use to resolve hostnames, instead of using the default name resolver mechanism. The URL must be HTTPS.\n\nSome SSL options that you set for your transfer also apply to DoH since the name lookups take place over SSL. The certificate verification settings are not inherited but are controlled separately via --doh-insecure and --doh-cert-status.\n\nBy default, DoH is bypassed when initially looking up DNS records of the DoH server. You can specify the IP address(es) of the DoH server with --resolve to avoid this.\n\nThis option is unset if an empty string \"\" is used as the URL. (Added in 7.85.0)\n\nIf --doh-url is provided several times, the last set value is used.\n\nExamples:\n\nSee also --doh-insecure.",
    "choices": [],
    "examples": [
      "curl --doh-url https://doh.example https://example.com\ncurl --doh-url https://doh.example --resolve doh.example:443:192.0.2.1 https://example.com"
    ],
    "addedIn": "7.85.0",
    "seeAlso": [
      "--doh-insecure"
    ]
  },
  {
    "id": "dump-ca-embed",
    "name": "--dump-ca-embed",
    "short": null,
    "arg": null,
    "label": "--dump-ca-embed",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Write the CA bundle embedded in curl to standard output, then quit.",
    "description": "(TLS) Write the CA bundle embedded in curl to standard output, then quit.\n\nIf curl was not built with a default CA bundle embedded, the output is empty.\n\nProviding --dump-ca-embed multiple times has no extra effect. Disable it again with --no-dump-ca-embed.\n\nExample:\n\nAdded in 8.10.0. See also --ca-native, --cacert, --capath, --proxy-ca-native, --proxy-cacert and --proxy-capath.",
    "choices": [],
    "examples": [
      "curl --dump-ca-embed"
    ],
    "addedIn": "8.10.0.",
    "seeAlso": [
      "--ca-native",
      "--cacert",
      "--capath",
      "--proxy-ca-native",
      "--proxy-cacert",
      "--proxy-capath"
    ]
  },
  {
    "id": "egd-file",
    "name": "--egd-file",
    "short": null,
    "arg": "<file>",
    "label": "--egd-file <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Deprecated option (added in 7.84.0). Prior to that it only had an effect on curl if built to use old versions of OpenSSL.",
    "description": "(TLS) Deprecated option (added in 7.84.0). Prior to that it only had an effect on curl if built to use old versions of OpenSSL.\n\nSpecify the path name to the Entropy Gathering Daemon socket. The socket is used to seed the random engine for SSL connections.\n\nIf --egd-file is provided several times, the last set value is used.\n\nExample:\n\nSee also --random-file.",
    "choices": [],
    "examples": [
      "curl --egd-file /random/here https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--random-file"
    ]
  },
  {
    "id": "engine",
    "name": "--engine",
    "short": null,
    "arg": "<name>",
    "label": "--engine <name>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Select the OpenSSL crypto engine to use for cipher operations. Use \"--engine list\" to print a list of build-time supported engines. Note that not all (and possibly none) of the engines may be available at runtime.",
    "description": "(TLS) Select the OpenSSL crypto engine to use for cipher operations. Use \"--engine list\" to print a list of build-time supported engines. Note that not all (and possibly none) of the engines may be available at runtime.\n\nThe OpenSSL concept \"engines\" has been superseded by \"providers\" in OpenSSL 3, and this option should work fine to specify such as well.\n\nIf --engine is provided several times, the last set value is used.\n\nExample:\n\nSee also --ciphers and --curves.",
    "choices": [],
    "examples": [
      "curl --engine flavor https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ciphers",
      "--curves"
    ]
  },
  {
    "id": "false-start",
    "name": "--false-start",
    "short": null,
    "arg": null,
    "label": "--false-start",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) No TLS backend currently supports this feature.",
    "description": "(TLS) No TLS backend currently supports this feature.\n\nUse false start during the TLS handshake. False start is a mode where a TLS client starts sending application data before verifying the server's Finished message, thus saving a round trip when performing a full handshake.\n\nProviding --false-start multiple times has no extra effect. Disable it again with --no-false-start.\n\nExample:\n\nSee also --tcp-fastopen.",
    "choices": [],
    "examples": [
      "curl --false-start https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tcp-fastopen"
    ]
  },
  {
    "id": "ftp-alternative-to-user",
    "name": "--ftp-alternative-to-user",
    "short": null,
    "arg": "<command>",
    "label": "--ftp-alternative-to-user <command>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) If authenticating with the USER and PASS commands fails, send this command. When connecting to Tumbleweed's Secure Transport server over FTPS using a client certificate, using \"SITE AUTH\" tells the server to retrieve the username from the certificate.",
    "description": "(FTP) If authenticating with the USER and PASS commands fails, send this command. When connecting to Tumbleweed's Secure Transport server over FTPS using a client certificate, using \"SITE AUTH\" tells the server to retrieve the username from the certificate.\n\nIf --ftp-alternative-to-user is provided several times, the last set value is used.\n\nExample:\n\nSee also --ftp-account and --user.",
    "choices": [],
    "examples": [
      "curl --ftp-alternative-to-user \"U53r\" ftp://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-account",
      "--user"
    ]
  },
  {
    "id": "ftp-pret",
    "name": "--ftp-pret",
    "short": null,
    "arg": null,
    "label": "--ftp-pret",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) Send a PRET command before PASV (and EPSV). Certain FTP servers, mainly drftpd, require this non-standard command for directory listings as well as up and downloads in PASV mode.",
    "description": "(FTP) Send a PRET command before PASV (and EPSV). Certain FTP servers, mainly drftpd, require this non-standard command for directory listings as well as up and downloads in PASV mode.\n\nProviding --ftp-pret multiple times has no extra effect. Disable it again with --no-ftp-pret.\n\nExample:\n\nSee also --ftp-port and --ftp-pasv.",
    "choices": [],
    "examples": [
      "curl --ftp-pret ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-port",
      "--ftp-pasv"
    ]
  },
  {
    "id": "ftp-ssl-ccc",
    "name": "--ftp-ssl-ccc",
    "short": null,
    "arg": null,
    "label": "--ftp-ssl-ccc",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) Use CCC (Clear Command Channel) Shuts down the SSL/TLS layer after authenticating. The rest of the control channel communication is unencrypted. This allows NAT routers to follow the FTP transaction. The default mode is passive.",
    "description": "(FTP) Use CCC (Clear Command Channel) Shuts down the SSL/TLS layer after authenticating. The rest of the control channel communication is unencrypted. This allows NAT routers to follow the FTP transaction. The default mode is passive.\n\nProviding --ftp-ssl-ccc multiple times has no extra effect. Disable it again with --no-ftp-ssl-ccc.\n\nExample:\n\nSee also --ssl and --ftp-ssl-ccc-mode.",
    "choices": [],
    "examples": [
      "curl --ftp-ssl-ccc ftps://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ssl",
      "--ftp-ssl-ccc-mode"
    ]
  },
  {
    "id": "ftp-ssl-ccc-mode",
    "name": "--ftp-ssl-ccc-mode",
    "short": null,
    "arg": "<active/passive>",
    "label": "--ftp-ssl-ccc-mode <active/passive>",
    "type": "choice",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) Set the CCC mode. The passive mode does not initiate the shutdown, but instead waits for the server to do it, and does not reply to the shutdown from the server. The active mode initiates the shutdown and waits for a reply from the server.",
    "description": "(FTP) Set the CCC mode. The passive mode does not initiate the shutdown, but instead waits for the server to do it, and does not reply to the shutdown from the server. The active mode initiates the shutdown and waits for a reply from the server.\n\nProviding --ftp-ssl-ccc-mode multiple times has no extra effect. Disable it again with --no-ftp-ssl-ccc-mode.\n\nExample:\n\nSee also --ftp-ssl-ccc.",
    "choices": [
      {
        "value": "active",
        "desc": "Initiates the shutdown from client"
      },
      {
        "value": "passive",
        "desc": "Waits for the server to initiate shutdown"
      }
    ],
    "examples": [
      "curl --ftp-ssl-ccc-mode active --ftp-ssl-ccc ftps://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-ssl-ccc"
    ]
  },
  {
    "id": "ftp-ssl-control",
    "name": "--ftp-ssl-control",
    "short": null,
    "arg": null,
    "label": "--ftp-ssl-control",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) Require SSL/TLS for the FTP login, clear for transfer. Allows secure authentication, but non-encrypted data transfers for efficiency. Fails the transfer if the server does not support SSL/TLS.",
    "description": "(FTP) Require SSL/TLS for the FTP login, clear for transfer. Allows secure authentication, but non-encrypted data transfers for efficiency. Fails the transfer if the server does not support SSL/TLS.\n\nIf set, this option overrides --ssl.\n\nProviding --ftp-ssl-control multiple times has no extra effect. Disable it again with --no-ftp-ssl-control.\n\nExample:\n\nSee also --ssl.",
    "choices": [],
    "examples": [
      "curl --ftp-ssl-control ftp://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ssl"
    ]
  },
  {
    "id": "hsts",
    "name": "--hsts",
    "short": null,
    "arg": "<filename>",
    "label": "--hsts <filename>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(HTTPS) Enable HSTS for the transfer. If the filename points to an existing HSTS cache file, that is used. After a completed transfer, the cache is saved to the filename again if it has been modified. If you run multiple curl invokes at the same time using the same HSTS cache file, they might interfere with each other in possibly undesired ways.",
    "description": "(HTTPS) Enable HSTS for the transfer. If the filename points to an existing HSTS cache file, that is used. After a completed transfer, the cache is saved to the filename again if it has been modified. If you run multiple curl invokes at the same time using the same HSTS cache file, they might interfere with each other in possibly undesired ways.\n\nIf curl is told to use \"http://\" for a transfer involving a hostname that exists in the HSTS cache, it upgrades the transfer to use HTTPS. Each HSTS cache entry has an individual lifetime after which the upgrade is no longer performed.\n\nSpecify a \"\" filename (zero length) to avoid loading/saving and make curl handle HSTS in memory.\n\nYou may want to restrict your umask to prevent other users on the same system to access the created file.\n\nIf this option is used several times, curl loads contents from all the files but the last one is used for saving.\n\nSince curl 8.20.0, curl keeps no more than the most recently added 10,000 unique HSTS hostnames.\n\n--hsts can be used several times in a command line.\n\nExample:\n\nAdded in 7.74.0. See also --proto.",
    "choices": [],
    "examples": [
      "curl --hsts cache.txt https://example.com"
    ],
    "addedIn": "7.74.0.",
    "seeAlso": [
      "--proto"
    ]
  },
  {
    "id": "http2-prior-knowledge",
    "name": "--http2-prior-knowledge",
    "short": null,
    "arg": null,
    "label": "--http2-prior-knowledge",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(HTTP) Issue a non-TLS HTTP request using HTTP/2 directly without HTTP/1.1 Upgrade. It requires prior knowledge that the server supports HTTP/2 straight away. HTTPS requests still do HTTP/2 the standard way with negotiated protocol versions in the TLS handshake.",
    "description": "(HTTP) Issue a non-TLS HTTP request using HTTP/2 directly without HTTP/1.1 Upgrade. It requires prior knowledge that the server supports HTTP/2 straight away. HTTPS requests still do HTTP/2 the standard way with negotiated protocol versions in the TLS handshake.\n\nSince 8.10.0 if this option is set for an HTTPS request then the application layer protocol version (ALPN) offered to the server is only HTTP/2. Prior to that both HTTP/1.1 and HTTP/2 were offered.\n\nProviding --http2-prior-knowledge multiple times has no extra effect. Disable it again with --no-http2-prior-knowledge.\n\nExample:\n\nFor --http2-prior-knowledge to work, it requires that the underlying libcurl is built to support HTTP/2. This option is mutually exclusive with --http1.1, --http1.0, --http2 and --http3. See also --http2 and --http3.",
    "choices": [],
    "examples": [
      "curl --http2-prior-knowledge https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--http2-prior-knowledge",
      "--http1.1",
      "--http1.0",
      "--http2",
      "--http3",
      "--http2",
      "--http3"
    ]
  },
  {
    "id": "ipfs-gateway",
    "name": "--ipfs-gateway",
    "short": null,
    "arg": "<URL>",
    "label": "--ipfs-gateway <URL>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(IPFS) Specify which gateway to use for IPFS and IPNS URLs. Not specifying this instead makes curl check if the IPFS_GATEWAY environment variable is set, or if a \"~/.ipfs/gateway\" file holding the gateway URL exists.",
    "description": "(IPFS) Specify which gateway to use for IPFS and IPNS URLs. Not specifying this instead makes curl check if the IPFS_GATEWAY environment variable is set, or if a \"~/.ipfs/gateway\" file holding the gateway URL exists.\n\nIf you run a local IPFS node, this gateway is by default available under \"http://localhost:8080\". A full example URL would look like:\n\nThere are many public IPFS gateways. See for example: https://ipfs.github.io/public-gateway-checker/\n\nIf you opt to go for a remote gateway you need to be aware that you completely trust the gateway. This might be fine in local gateways that you host yourself. With remote gateways there could potentially be malicious actors returning you data that does not match the request you made, inspect or even interfere with the request. You may not notice this when using curl. A mitigation could be to go for a \"trustless\" gateway. This means you locally verify the data. Consult the docs page on trusted vs trustless: https://docs.ipfs.tech/reference/http/gateway/#trusted-vs-trustless\n\nIf --ipfs-gateway is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.4.0. See also --help and --manual.",
    "choices": [],
    "examples": [
      "curl --ipfs-gateway http://localhost:8080 \\\n   ipfs://bafybeigagd5nmnn2iys2f3",
      "curl --ipfs-gateway https://example.com ipfs://"
    ],
    "addedIn": "8.4.0.",
    "seeAlso": [
      "--help",
      "--manual"
    ]
  },
  {
    "id": "key-type",
    "name": "--key-type",
    "short": null,
    "arg": "<type>",
    "label": "--key-type <type>",
    "type": "choice",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Private key file type. Specify which type your --key provided private key is. DER, PEM, and ENG are supported. If not specified, PEM is assumed.",
    "description": "(TLS) Private key file type. Specify which type your --key provided private key is. DER, PEM, and ENG are supported. If not specified, PEM is assumed.\n\nIf --key-type is provided several times, the last set value is used.\n\nExample:\n\nSee also --key.",
    "choices": [
      {
        "value": "PEM",
        "desc": "PEM format private key (default)"
      },
      {
        "value": "DER",
        "desc": "DER format private key"
      },
      {
        "value": "ENG",
        "desc": "Crypto engine private key"
      }
    ],
    "examples": [
      "curl --key-type DER --key here https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--key"
    ]
  },
  {
    "id": "knownhosts",
    "name": "--knownhosts",
    "short": null,
    "arg": "<file>",
    "label": "--knownhosts <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(SCP SFTP) When doing SCP and SFTP transfers, curl automatically checks a database containing identification for all hosts it has ever been used with to verify that the host it connects to is the same as previously. Host keys are stored in such a known hosts file. curl uses the ~/.ssh/known_hosts in the user's home directory by default.",
    "description": "(SCP SFTP) When doing SCP and SFTP transfers, curl automatically checks a database containing identification for all hosts it has ever been used with to verify that the host it connects to is the same as previously. Host keys are stored in such a known hosts file. curl uses the ~/.ssh/known_hosts in the user's home directory by default.\n\nThis option lets a user specify a specific file to check the host against.\n\nThe known hosts check can be disabled with --insecure, but that makes the transfer insecure and is strongly discouraged.\n\nIf --knownhosts is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.17.0. See also --hostpubsha256, --hostpubmd5, --insecure and --key.",
    "choices": [],
    "examples": [
      "curl --knownhosts filename --key here https://example.com"
    ],
    "addedIn": "8.17.0.",
    "seeAlso": [
      "--hostpubsha256",
      "--hostpubmd5",
      "--insecure",
      "--key"
    ]
  },
  {
    "id": "krb",
    "name": "--krb",
    "short": null,
    "arg": "<level>",
    "label": "--krb <level>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP) Deprecated option (added in 8.17.0). It has no function anymore.",
    "description": "(FTP) Deprecated option (added in 8.17.0). It has no function anymore.\n\nEnable Kerberos authentication and use. The level must be entered and should be one of \"clear\", \"safe\", \"confidential\", or \"private\". Should you use a level that is not one of these, \"private\" is used.\n\nIf --krb is provided several times, the last set value is used.\n\nExample:\n\nFor --krb to work, it requires that the underlying libcurl is built to support Kerberos. See also --delegation and --ssl.",
    "choices": [],
    "examples": [
      "curl --krb clear ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--krb",
      "--delegation",
      "--ssl"
    ]
  },
  {
    "id": "mptcp",
    "name": "--mptcp",
    "short": null,
    "arg": null,
    "label": "--mptcp",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "Enable the use of Multipath TCP (MPTCP) for connections. MPTCP is an extension to the standard TCP that allows multiple TCP streams over different network paths between the same source and destination. This can enhance bandwidth and improve reliability by using multiple paths simultaneously.",
    "description": "Enable the use of Multipath TCP (MPTCP) for connections. MPTCP is an extension to the standard TCP that allows multiple TCP streams over different network paths between the same source and destination. This can enhance bandwidth and improve reliability by using multiple paths simultaneously.\n\nMPTCP is beneficial in networks where multiple paths exist between clients and servers, such as mobile networks where a device may switch between WiFi and cellular data or in wired networks with multiple Internet Service Providers.\n\nThis option is currently only supported on Linux starting from kernel 5.6. Only TCP connections are modified, hence this option does not affect HTTP/3 (QUIC) or UDP connections.\n\nThe server curl connects to must also support MPTCP. If not, the connection seamlessly falls back to TCP.\n\nProviding --mptcp multiple times has no extra effect. Disable it again with --no-mptcp.\n\nExample:\n\nAdded in 8.9.0. See also --tcp-fastopen.",
    "choices": [],
    "examples": [
      "curl --mptcp https://example.com"
    ],
    "addedIn": "8.9.0.",
    "seeAlso": [
      "--tcp-fastopen"
    ]
  },
  {
    "id": "no-alpn",
    "name": "--no-alpn",
    "short": null,
    "arg": null,
    "label": "--no-alpn",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(HTTPS) Disable the ALPN TLS extension. ALPN is enabled by default if libcurl was built with an SSL library that supports ALPN. ALPN is used by a libcurl that supports HTTP/2 to negotiate HTTP/2 support with the server during https sessions.",
    "description": "(HTTPS) Disable the ALPN TLS extension. ALPN is enabled by default if libcurl was built with an SSL library that supports ALPN. ALPN is used by a libcurl that supports HTTP/2 to negotiate HTTP/2 support with the server during https sessions.\n\nNote that this is the negated option name documented. You can use --alpn to enable ALPN.\n\nProviding --no-alpn multiple times has no extra effect. Disable it again with --alpn.\n\nExample:\n\nFor --no-alpn to work, it requires that the underlying libcurl is built to support TLS. See also --no-npn and --http2.",
    "choices": [],
    "examples": [
      "curl --no-alpn https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--no-alpn",
      "--no-npn",
      "--http2"
    ]
  },
  {
    "id": "no-npn",
    "name": "--no-npn",
    "short": null,
    "arg": null,
    "label": "--no-npn",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(HTTPS) curl never uses NPN, this option has no effect (added in 7.86.0).",
    "description": "(HTTPS) curl never uses NPN, this option has no effect (added in 7.86.0).\n\nDisable the NPN TLS extension. NPN is enabled by default if libcurl was built with an SSL library that supports NPN. NPN is used by a libcurl that supports HTTP/2 to negotiate HTTP/2 support with the server during https sessions.\n\nProviding --no-npn multiple times has no extra effect. Disable it again with --npn.\n\nExample:\n\nFor --no-npn to work, it requires that the underlying libcurl is built to support TLS. See also --no-alpn and --http2.",
    "choices": [],
    "examples": [
      "curl --no-npn https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--no-npn",
      "--no-alpn",
      "--http2"
    ]
  },
  {
    "id": "no-sessionid",
    "name": "--no-sessionid",
    "short": null,
    "arg": null,
    "label": "--no-sessionid",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Disable curl's use of SSL session-ID caching. By default all transfers are done using the cache. Note that while nothing should ever get hurt by attempting to reuse SSL session-IDs, there seem to be broken SSL implementations in the wild that may require you to disable this in order for you to succeed.",
    "description": "(TLS) Disable curl's use of SSL session-ID caching. By default all transfers are done using the cache. Note that while nothing should ever get hurt by attempting to reuse SSL session-IDs, there seem to be broken SSL implementations in the wild that may require you to disable this in order for you to succeed.\n\nNote that this is the negated option name documented. You can thus use --sessionid to enforce session-ID caching.\n\nProviding --no-sessionid multiple times has no extra effect. Disable it again with --sessionid.\n\nExample:\n\nSee also --insecure.",
    "choices": [],
    "examples": [
      "curl --no-sessionid https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--insecure"
    ]
  },
  {
    "id": "ntlm",
    "name": "--ntlm",
    "short": null,
    "arg": null,
    "label": "--ntlm",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(HTTP) Use NTLM authentication. The NTLM authentication method was designed by Microsoft and is used by IIS web servers. It is a proprietary protocol, reverse-engineered by clever people and implemented in curl based on their efforts. This kind of behavior should not be endorsed, you should encourage everyone who uses NTLM to switch to a public and documented authentication method instead, such as Digest.",
    "description": "(HTTP) Use NTLM authentication. The NTLM authentication method was designed by Microsoft and is used by IIS web servers. It is a proprietary protocol, reverse-engineered by clever people and implemented in curl based on their efforts. This kind of behavior should not be endorsed, you should encourage everyone who uses NTLM to switch to a public and documented authentication method instead, such as Digest.\n\nIf you want to enable NTLM for your proxy authentication, then use --proxy-ntlm.\n\nProviding --ntlm multiple times has no extra effect. Disable it again with --no-ntlm.\n\nExample:\n\nFor --ntlm to work, it requires that the underlying libcurl is built to support TLS. See also --proxy-ntlm.",
    "choices": [],
    "examples": [
      "curl --ntlm -u user:password https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ntlm",
      "--proxy-ntlm"
    ]
  },
  {
    "id": "pass",
    "name": "--pass",
    "short": null,
    "arg": "<phrase>",
    "label": "--pass <phrase>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS SCP SFTP) Passphrase for the private key used for SSH or TLS.",
    "description": "(TLS SCP SFTP) Passphrase for the private key used for SSH or TLS.\n\nIf --pass is provided several times, the last set value is used.\n\nExample:\n\nSee also --key and --user.",
    "choices": [],
    "examples": [
      "curl --pass secret --key file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--key",
      "--user"
    ]
  },
  {
    "id": "pinnedpubkey",
    "name": "--pinnedpubkey",
    "short": null,
    "arg": "<hashes>",
    "label": "--pinnedpubkey <hashes>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use the specified public key file (or hashes) to verify the peer. This can be a path to a file which contains a single public key in PEM or DER format, or any number of base64 encoded sha256 hashes preceded by 'sha256//' and separated by ';'.",
    "description": "(TLS) Use the specified public key file (or hashes) to verify the peer. This can be a path to a file which contains a single public key in PEM or DER format, or any number of base64 encoded sha256 hashes preceded by 'sha256//' and separated by ';'.\n\nWhen negotiating a TLS or SSL connection, the server sends a certificate indicating its identity. A public key is extracted from this certificate and if it does not exactly match the public key provided to this option, curl aborts the connection before sending or receiving any data.\n\nThis option is independent of option --insecure. If you use both options together then the peer is still verified by public key.\n\nPEM/DER support:\n\nOpenSSL and GnuTLS, wolfSSL, mbedTLS, Schannel\n\nsha256 support:\n\nOpenSSL, GnuTLS and wolfSSL, mbedTLS, Schannel\n\nOther SSL backends not supported.\n\nIf --pinnedpubkey is provided several times, the last set value is used.\n\nExamples:\n\nSee also --hostpubsha256.",
    "choices": [],
    "examples": [
      "curl --pinnedpubkey keyfile https://example.com\ncurl --pinnedpubkey 'sha256//ce118b51897f4452dc' https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--hostpubsha256"
    ]
  },
  {
    "id": "proxy-ca-native",
    "name": "--proxy-ca-native",
    "short": null,
    "arg": null,
    "label": "--proxy-ca-native",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use the operating system's native CA store for certificate verification of the HTTPS proxy.",
    "description": "(TLS) Use the operating system's native CA store for certificate verification of the HTTPS proxy.\n\nThis option is independent of other HTTPS proxy CA certificate locations set at run time or build time. Those locations are searched in addition to the native CA store.\n\nEquivalent to --ca-native but used in HTTPS proxy context. Refer to --ca-native for TLS backend limitations.\n\nProviding --proxy-ca-native multiple times has no extra effect. Disable it again with --no-proxy-ca-native.\n\nExample:\n\nAdded in 8.2.0. See also --ca-native, --cacert, --capath, --dump-ca-embed and --insecure.",
    "choices": [],
    "examples": [
      "curl --proxy-ca-native https://example.com"
    ],
    "addedIn": "8.2.0.",
    "seeAlso": [
      "--ca-native",
      "--cacert",
      "--capath",
      "--dump-ca-embed",
      "--insecure"
    ]
  },
  {
    "id": "proxy-cacert",
    "name": "--proxy-cacert",
    "short": null,
    "arg": "<file>",
    "label": "--proxy-cacert <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "Use the specified certificate file to verify the HTTPS proxy. The file may contain multiple CA certificates. The certificate(s) must be in PEM format.",
    "description": "Use the specified certificate file to verify the HTTPS proxy. The file may contain multiple CA certificates. The certificate(s) must be in PEM format.\n\nThis allows you to use a different trust for the proxy compared to the remote server connected to via the proxy.\n\nEquivalent to --cacert but used in HTTPS proxy context.\n\nIf --proxy-cacert is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-capath, --cacert, --capath, --dump-ca-embed and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-cacert CA-file.txt -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-capath",
      "--cacert",
      "--capath",
      "--dump-ca-embed",
      "--proxy"
    ]
  },
  {
    "id": "proxy-capath",
    "name": "--proxy-capath",
    "short": null,
    "arg": "<dir>",
    "label": "--proxy-capath <dir>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "Same as --capath but used in HTTPS proxy context.",
    "description": "Same as --capath but used in HTTPS proxy context.\n\nUse the specified certificate directory to verify the proxy. Multiple paths can be provided by separating them with colon (\":\") (e.g. \"path1:path2:path3\"). The certificates must be in PEM format, and if curl is built against OpenSSL, the directory must have been processed using the c_rehash utility supplied with OpenSSL. Using --proxy-capath can allow OpenSSL-powered curl to make SSL-connections much more efficiently than using --proxy-cacert if the --proxy-cacert file contains many CA certificates.\n\nIf this option is set, the default capath value is ignored.\n\nIf --proxy-capath is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-cacert, --proxy, --capath and --dump-ca-embed.",
    "choices": [],
    "examples": [
      "curl --proxy-capath /local/directory -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-cacert",
      "--proxy",
      "--capath",
      "--dump-ca-embed"
    ]
  },
  {
    "id": "proxy-cert",
    "name": "--proxy-cert",
    "short": null,
    "arg": "<cert[:passwd]>",
    "label": "--proxy-cert <cert[:passwd]>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Use the specified client certificate file when communicating with an HTTPS proxy. The certificate must be PEM format. If the optional password is not specified, it is queried for on the terminal. Use --proxy-key to provide the private key.",
    "description": "Use the specified client certificate file when communicating with an HTTPS proxy. The certificate must be PEM format. If the optional password is not specified, it is queried for on the terminal. Use --proxy-key to provide the private key.\n\nThis option is the equivalent to --cert but used in HTTPS proxy context.\n\nIf --proxy-cert is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy, --proxy-key and --proxy-cert-type.",
    "choices": [],
    "examples": [
      "curl --proxy-cert file -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-key",
      "--proxy-cert-type"
    ]
  },
  {
    "id": "proxy-cert-type",
    "name": "--proxy-cert-type",
    "short": null,
    "arg": "<type>",
    "label": "--proxy-cert-type <type>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Set type of the provided client certificate when using HTTPS proxy. PEM, DER, ENG, PROV and P12 are recognized types.",
    "description": "Set type of the provided client certificate when using HTTPS proxy. PEM, DER, ENG, PROV and P12 are recognized types.\n\nThe default type depends on the TLS backend and is usually PEM. For Schannel it is P12. If --proxy-cert is a pkcs11: URI then ENG or PROV is the default type (depending on OpenSSL version).\n\nEquivalent to --cert-type but used in HTTPS proxy context.\n\nIf --proxy-cert-type is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-cert and --proxy-key.",
    "choices": [],
    "examples": [
      "curl --proxy-cert-type PEM --proxy-cert file -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-cert",
      "--proxy-key"
    ]
  },
  {
    "id": "proxy-ciphers",
    "name": "--proxy-ciphers",
    "short": null,
    "arg": "<list>",
    "label": "--proxy-ciphers <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Same as --ciphers but used in HTTPS proxy context.",
    "description": "(TLS) Same as --ciphers but used in HTTPS proxy context.\n\nSpecify which cipher suites to use in the connection to your HTTPS proxy when it negotiates TLS 1.2 (1.1, 1.0). The list of ciphers suites must specify valid ciphers. Read up on cipher suite details on this URL:\n\nhttps://curl.se/docs/ssl-ciphers.html\n\nIf --proxy-ciphers is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-tls13-ciphers, --ciphers and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256 -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-tls13-ciphers",
      "--ciphers",
      "--proxy"
    ]
  },
  {
    "id": "proxy-crlfile",
    "name": "--proxy-crlfile",
    "short": null,
    "arg": "<file>",
    "label": "--proxy-crlfile <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "Provide filename for a PEM formatted file with a Certificate Revocation List that specifies peer certificates that are considered revoked when communicating with an HTTPS proxy.",
    "description": "Provide filename for a PEM formatted file with a Certificate Revocation List that specifies peer certificates that are considered revoked when communicating with an HTTPS proxy.\n\nEquivalent to --crlfile but only used in HTTPS proxy context.\n\nIf --proxy-crlfile is provided several times, the last set value is used.\n\nExample:\n\nSee also --crlfile and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-crlfile rejects.txt -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--crlfile",
      "--proxy"
    ]
  },
  {
    "id": "proxy-insecure",
    "name": "--proxy-insecure",
    "short": null,
    "arg": null,
    "label": "--proxy-insecure",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "Same as --insecure but used in HTTPS proxy context.",
    "description": "Same as --insecure but used in HTTPS proxy context.\n\nEvery secure connection curl makes is verified to be secure before the transfer takes place. This option makes curl skip the verification step with a proxy and proceed without checking.\n\nWhen this option is not used for a proxy using HTTPS, curl verifies the proxy's TLS certificate before it continues: that the certificate contains the right name which matches the hostname and that the certificate has been signed by a CA certificate present in the cert store. See this online resource for further details: https://curl.se/docs/sslcerts.html\n\nWARNING: using this option makes the transfer to the proxy insecure.\n\nProviding --proxy-insecure multiple times has no extra effect. Disable it again with --no-proxy-insecure.\n\nExample:\n\nSee also --proxy and --insecure.",
    "choices": [],
    "examples": [
      "curl --proxy-insecure -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--insecure"
    ]
  },
  {
    "id": "proxy-key",
    "name": "--proxy-key",
    "short": null,
    "arg": "<key>",
    "label": "--proxy-key <key>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Specify the filename for your private key when using client certificates with your HTTPS proxy. This option is the equivalent to --key but used in HTTPS proxy context.",
    "description": "Specify the filename for your private key when using client certificates with your HTTPS proxy. This option is the equivalent to --key but used in HTTPS proxy context.\n\nIf --proxy-key is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-key-type and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-key here -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-key-type",
      "--proxy"
    ]
  },
  {
    "id": "proxy-key-type",
    "name": "--proxy-key-type",
    "short": null,
    "arg": "<type>",
    "label": "--proxy-key-type <type>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Specify the private key file type your --proxy-key provided private key uses. DER, PEM, and ENG are supported. If not specified, PEM is assumed.",
    "description": "Specify the private key file type your --proxy-key provided private key uses. DER, PEM, and ENG are supported. If not specified, PEM is assumed.\n\nEquivalent to --key-type but used in HTTPS proxy context.\n\nIf --proxy-key-type is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-key and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-key-type DER --proxy-key here -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-key",
      "--proxy"
    ]
  },
  {
    "id": "proxy-pass",
    "name": "--proxy-pass",
    "short": null,
    "arg": "<phrase>",
    "label": "--proxy-pass <phrase>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Passphrase for the private key for HTTPS proxy client certificate.",
    "description": "Passphrase for the private key for HTTPS proxy client certificate.\n\nEquivalent to --pass but used in HTTPS proxy context.\n\nIf --proxy-pass is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy and --proxy-key.",
    "choices": [],
    "examples": [
      "curl --proxy-pass secret --proxy-key here -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-key"
    ]
  },
  {
    "id": "proxy-pinnedpubkey",
    "name": "--proxy-pinnedpubkey",
    "short": null,
    "arg": "<hashes>",
    "label": "--proxy-pinnedpubkey <hashes>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use the specified public key file (or hashes) to verify the proxy. This can be a path to a file which contains a single public key in PEM or DER format, or any number of base64 encoded sha256 hashes preceded by 'sha256//' and separated by ';'.",
    "description": "(TLS) Use the specified public key file (or hashes) to verify the proxy. This can be a path to a file which contains a single public key in PEM or DER format, or any number of base64 encoded sha256 hashes preceded by 'sha256//' and separated by ';'.\n\nWhen negotiating a TLS or SSL connection, the server sends a certificate indicating its identity. A public key is extracted from this certificate and if it does not exactly match the public key provided to this option, curl aborts the connection before sending or receiving any data.\n\nBefore curl 8.10.0 this option did not work due to a bug.\n\nIf --proxy-pinnedpubkey is provided several times, the last set value is used.\n\nExamples:\n\nSee also --pinnedpubkey and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-pinnedpubkey keyfile https://example.com\ncurl --proxy-pinnedpubkey 'sha256//ce118b51897f4452dc' https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--pinnedpubkey",
      "--proxy"
    ]
  },
  {
    "id": "proxy-ssl-allow-beast",
    "name": "--proxy-ssl-allow-beast",
    "short": null,
    "arg": null,
    "label": "--proxy-ssl-allow-beast",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "Do not work around a security flaw in the TLS1.0 protocol known as BEAST when communicating to an HTTPS proxy. If this option is not used, the TLS layer may use workarounds known to cause interoperability problems with some older server implementations.",
    "description": "Do not work around a security flaw in the TLS1.0 protocol known as BEAST when communicating to an HTTPS proxy. If this option is not used, the TLS layer may use workarounds known to cause interoperability problems with some older server implementations.\n\nThis option only changes how curl does TLS 1.0 with an HTTPS proxy and has no effect on later TLS versions.\n\nWARNING: this option loosens the TLS security, and by using this flag you ask for exactly that.\n\nEquivalent to --ssl-allow-beast but used in HTTPS proxy context.\n\nProviding --proxy-ssl-allow-beast multiple times has no extra effect. Disable it again with --no-proxy-ssl-allow-beast.\n\nExample:\n\nSee also --ssl-allow-beast and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-ssl-allow-beast -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ssl-allow-beast",
      "--proxy"
    ]
  },
  {
    "id": "proxy-ssl-auto-client-cert",
    "name": "--proxy-ssl-auto-client-cert",
    "short": null,
    "arg": null,
    "label": "--proxy-ssl-auto-client-cert",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "Same as --ssl-auto-client-cert but used in HTTPS proxy context.",
    "description": "Same as --ssl-auto-client-cert but used in HTTPS proxy context.\n\nThis is only supported by Schannel.\n\nProviding --proxy-ssl-auto-client-cert multiple times has no extra effect. Disable it again with --no-proxy-ssl-auto-client-cert.\n\nExample:\n\nAdded in 7.77.0. See also --ssl-auto-client-cert and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-ssl-auto-client-cert -x https://proxy.example https://example.com"
    ],
    "addedIn": "7.77.0.",
    "seeAlso": [
      "--ssl-auto-client-cert",
      "--proxy"
    ]
  },
  {
    "id": "proxy-tls13-ciphers",
    "name": "--proxy-tls13-ciphers",
    "short": null,
    "arg": "<list>",
    "label": "--proxy-tls13-ciphers <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Same as --tls13-ciphers but used in HTTPS proxy context.",
    "description": "(TLS) Same as --tls13-ciphers but used in HTTPS proxy context.\n\nSpecify which cipher suites to use in the connection to your HTTPS proxy when it negotiates TLS 1.3. The list of ciphers suites must specify valid ciphers. Read up on TLS 1.3 cipher suite details on this URL:\n\nhttps://curl.se/docs/ssl-ciphers.html\n\nThis option is used when curl is built to use OpenSSL 1.1.1 or later, Schannel, wolfSSL, or mbedTLS 3.6.0 or later.\n\nBefore curl 8.10.0 with mbedTLS or wolfSSL, TLS 1.3 cipher suites were set by using the --proxy-ciphers option.\n\nIf --proxy-tls13-ciphers is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-ciphers, --tls13-ciphers and --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-tls13-ciphers TLS_AES_128_GCM_SHA256 -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-ciphers",
      "--tls13-ciphers",
      "--proxy"
    ]
  },
  {
    "id": "proxy-tlsauthtype",
    "name": "--proxy-tlsauthtype",
    "short": null,
    "arg": "<type>",
    "label": "--proxy-tlsauthtype <type>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Deprecated option. This has no functionality since 8.22.0.",
    "description": "Deprecated option. This has no functionality since 8.22.0.\n\nSet TLS authentication type with HTTPS proxy. The only supported option is \"SRP\", for TLS-SRP (RFC 5054). This option works only if the underlying libcurl is built with TLS-SRP support.\n\nEquivalent to --tlsauthtype but used in HTTPS proxy context.\n\nIf --proxy-tlsauthtype is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy, --proxy-tlsuser and --proxy-tlspassword.",
    "choices": [],
    "examples": [
      "curl --proxy-tlsauthtype SRP -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-tlsuser",
      "--proxy-tlspassword"
    ]
  },
  {
    "id": "proxy-tlspassword",
    "name": "--proxy-tlspassword",
    "short": null,
    "arg": "<string>",
    "label": "--proxy-tlspassword <string>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Deprecated option. This has no functionality since 8.22.0.",
    "description": "Deprecated option. This has no functionality since 8.22.0.\n\nSet password to use with the TLS authentication method specified with --proxy-tlsauthtype when using HTTPS proxy. Requires that --proxy-tlsuser is set.\n\nThis option does not work with TLS 1.3.\n\nEquivalent to --tlspassword but used in HTTPS proxy context.\n\nIf --proxy-tlspassword is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy and --proxy-tlsuser.",
    "choices": [],
    "examples": [
      "curl --proxy-tlspassword passwd -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-tlsuser"
    ]
  },
  {
    "id": "proxy-tlsuser",
    "name": "--proxy-tlsuser",
    "short": null,
    "arg": "<name>",
    "label": "--proxy-tlsuser <name>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "Deprecated option. This has no functionality since 8.22.0.",
    "description": "Deprecated option. This has no functionality since 8.22.0.\n\nSet username for use for HTTPS proxy with the TLS authentication method specified with --proxy-tlsauthtype. Requires that --proxy-tlspassword also is set.\n\nThis option does not work with TLS 1.3.\n\nIf --proxy-tlsuser is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy and --proxy-tlspassword.",
    "choices": [],
    "examples": [
      "curl --proxy-tlsuser smith -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-tlspassword"
    ]
  },
  {
    "id": "proxy-tlsv1",
    "name": "--proxy-tlsv1",
    "short": null,
    "arg": null,
    "label": "--proxy-tlsv1",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "Use at least TLS version 1.x when negotiating with an HTTPS proxy. That means TLS version 1.0 or higher",
    "description": "Use at least TLS version 1.x when negotiating with an HTTPS proxy. That means TLS version 1.0 or higher\n\nEquivalent to --tlsv1 but for an HTTPS proxy context.\n\nProviding --proxy-tlsv1 multiple times has no extra effect.\n\nExample:\n\nSee also --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-tlsv1 -x https://proxy.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy"
    ]
  },
  {
    "id": "pubkey",
    "name": "--pubkey",
    "short": null,
    "arg": "<key>",
    "label": "--pubkey <key>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(SFTP SCP) Public key filename. Allows you to provide your public key in this separate file.",
    "description": "(SFTP SCP) Public key filename. Allows you to provide your public key in this separate file.\n\ncurl attempts to automatically extract the public key from the private key file, so passing this option is generally not required. Note that this public key extraction requires libcurl to be linked against a copy of libssh2 1.2.8 or higher that is itself linked against OpenSSL.\n\nIf --pubkey is provided several times, the last set value is used.\n\nExample:\n\nSee also --pass.",
    "choices": [],
    "examples": [
      "curl --pubkey file.pub sftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--pass"
    ]
  },
  {
    "id": "random-file",
    "name": "--random-file",
    "short": null,
    "arg": "<file>",
    "label": "--random-file <file>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "Deprecated option. This option is ignored (added in 7.84.0). Prior to that it only had an effect on curl if built to use old versions of OpenSSL.",
    "description": "Deprecated option. This option is ignored (added in 7.84.0). Prior to that it only had an effect on curl if built to use old versions of OpenSSL.\n\nSpecify the path name to file containing random data. The data may be used to seed the random engine for SSL connections.\n\nIf --random-file is provided several times, the last set value is used.\n\nExample:\n\nSee also --egd-file.",
    "choices": [],
    "examples": [
      "curl --random-file rubbish https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--egd-file"
    ]
  },
  {
    "id": "sasl-ir",
    "name": "--sasl-ir",
    "short": null,
    "arg": null,
    "label": "--sasl-ir",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(LDAP IMAP POP3 SMTP) Enable initial response in SASL authentication. Such an \"initial response\" is a message sent by the client to the server after the client selects an authentication mechanism.",
    "description": "(LDAP IMAP POP3 SMTP) Enable initial response in SASL authentication. Such an \"initial response\" is a message sent by the client to the server after the client selects an authentication mechanism.\n\nProviding --sasl-ir multiple times has no extra effect. Disable it again with --no-sasl-ir.\n\nExample:\n\nSee also --sasl-authzid.",
    "choices": [],
    "examples": [
      "curl --sasl-ir imap://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--sasl-authzid"
    ]
  },
  {
    "id": "sigalgs",
    "name": "--sigalgs",
    "short": null,
    "arg": "<list>",
    "label": "--sigalgs <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Set specific signature algorithms to use during SSL session establishment according to RFC 5246, 7.4.1.4.1.",
    "description": "(TLS) Set specific signature algorithms to use during SSL session establishment according to RFC 5246, 7.4.1.4.1.\n\nAn algorithm can use either a signature algorithm and a hash algorithm pair separated by a \"+\" (e.g. \"ECDSA+SHA224\"), or its TLS 1.3 signature scheme name (e.g. \"ed25519\").\n\nMultiple algorithms can be provided by separating them with \":\" (e.g. \"DSA+SHA256:rsa_pss_pss_sha256\"). The parameter is available as \"-sigalgs\" in the OpenSSL \"s_client\" and \"s_server\" utilities.\n\n\"--sigalgs\" allows a OpenSSL powered curl to make SSL-connections with exactly the signature algorithms requested by the client, avoiding nontransparent client/server negotiations.\n\nIf this option is set, the default signature algorithm list built into OpenSSL are ignored.\n\nIf --sigalgs is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.14.0. See also --ciphers.",
    "choices": [],
    "examples": [
      "curl --sigalgs ecdsa_secp256r1_sha256 https://example.com"
    ],
    "addedIn": "8.14.0.",
    "seeAlso": [
      "--ciphers"
    ]
  },
  {
    "id": "ssl",
    "name": "--ssl",
    "short": null,
    "arg": null,
    "label": "--ssl",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP IMAP POP3 SMTP LDAP) Warning: this is considered an insecure option. Consider using --ssl-reqd instead to be sure curl upgrades to a secure connection.",
    "description": "(FTP IMAP POP3 SMTP LDAP) Warning: this is considered an insecure option. Consider using --ssl-reqd instead to be sure curl upgrades to a secure connection.\n\nTry to use SSL/TLS for the connection - often referred to as STARTTLS or STLS because of the involved commands. Reverts to a non-secure connection if the server does not support SSL/TLS. See also --ftp-ssl-control and --ssl-reqd for different levels of encryption required.\n\nThis option is handled in LDAP (added in 7.81.0). It is fully supported by the OpenLDAP backend and ignored by the generic ldap backend.\n\nPlease note that a server may close the connection if the negotiation fails.\n\nIf set, this option overrides --ftp-ssl-control.\n\nThis option was formerly known as --ftp-ssl. That option name can still be used but might be removed in a future version.\n\nProviding --ssl multiple times has no extra effect. Disable it again with --no-ssl.\n\nExample:\n\nSee also --ssl-reqd, --insecure and --ciphers.",
    "choices": [],
    "examples": [
      "curl --ssl pop3://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-ssl-control",
      "--ssl-reqd",
      "--ssl-reqd",
      "--insecure",
      "--ciphers"
    ]
  },
  {
    "id": "ssl-allow-beast",
    "name": "--ssl-allow-beast",
    "short": null,
    "arg": null,
    "label": "--ssl-allow-beast",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Do not work around a security flaw in the TLS1.0 protocol known as BEAST. If this option is not used, the TLS layer may use workarounds known to cause interoperability problems with some older server implementations.",
    "description": "(TLS) Do not work around a security flaw in the TLS1.0 protocol known as BEAST. If this option is not used, the TLS layer may use workarounds known to cause interoperability problems with some older server implementations.\n\nThis option only changes how curl does TLS 1.0 and has no effect on later TLS versions.\n\nWARNING: this option loosens the TLS security, and by using this flag you ask for exactly that.\n\nProviding --ssl-allow-beast multiple times has no extra effect. Disable it again with --no-ssl-allow-beast.\n\nExample:\n\nSee also --proxy-ssl-allow-beast and --insecure.",
    "choices": [],
    "examples": [
      "curl --ssl-allow-beast https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-ssl-allow-beast",
      "--insecure"
    ]
  },
  {
    "id": "ssl-auto-client-cert",
    "name": "--ssl-auto-client-cert",
    "short": null,
    "arg": null,
    "label": "--ssl-auto-client-cert",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) (Schannel) Automatically locate and use a client certificate for authentication, when requested by the server. Since the server can request any certificate that supports client authentication in the OS certificate store it could be a privacy violation and unexpected.",
    "description": "(TLS) (Schannel) Automatically locate and use a client certificate for authentication, when requested by the server. Since the server can request any certificate that supports client authentication in the OS certificate store it could be a privacy violation and unexpected.\n\nProviding --ssl-auto-client-cert multiple times has no extra effect. Disable it again with --no-ssl-auto-client-cert.\n\nExample:\n\nAdded in 7.77.0. See also --proxy-ssl-auto-client-cert.",
    "choices": [],
    "examples": [
      "curl --ssl-auto-client-cert https://example.com"
    ],
    "addedIn": "7.77.0.",
    "seeAlso": [
      "--proxy-ssl-auto-client-cert"
    ]
  },
  {
    "id": "ssl-no-revoke",
    "name": "--ssl-no-revoke",
    "short": null,
    "arg": null,
    "label": "--ssl-no-revoke",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) (Schannel) Disable certificate revocation checks. WARNING: this option loosens the SSL security, and by using this flag you ask for exactly that.",
    "description": "(TLS) (Schannel) Disable certificate revocation checks. WARNING: this option loosens the SSL security, and by using this flag you ask for exactly that.\n\nProviding --ssl-no-revoke multiple times has no extra effect. Disable it again with --no-ssl-no-revoke.\n\nExample:\n\nSee also --crlfile.",
    "choices": [],
    "examples": [
      "curl --ssl-no-revoke https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--crlfile"
    ]
  },
  {
    "id": "ssl-reqd",
    "name": "--ssl-reqd",
    "short": null,
    "arg": null,
    "label": "--ssl-reqd",
    "type": "choice",
    "category": "security",
    "popularity": 15,
    "summary": "(FTP IMAP POP3 SMTP LDAP) Require SSL/TLS for the connection - often referred to as STARTTLS or STLS because of the involved commands. Terminates the connection if the transfer cannot be upgraded to use SSL/TLS.",
    "description": "(FTP IMAP POP3 SMTP LDAP) Require SSL/TLS for the connection - often referred to as STARTTLS or STLS because of the involved commands. Terminates the connection if the transfer cannot be upgraded to use SSL/TLS.\n\nThis option is handled in LDAP (added in 7.81.0). It is fully supported by the OpenLDAP backend and rejected by the generic ldap backend if explicit TLS is required.\n\nThis option is unnecessary if you use a URL scheme that in itself implies immediate and implicit use of TLS, like for FTPS, IMAPS, POP3S, SMTPS and LDAPS. Such a transfer always fails if the TLS handshake does not work.\n\nThis option was formerly known as --ftp-ssl-reqd.\n\nProviding --ssl-reqd multiple times has no extra effect. Disable it again with --no-ssl-reqd.\n\nExample:\n\nSee also --ssl and --insecure.",
    "choices": [
      {
        "value": "true",
        "desc": "Require SSL/TLS for connection"
      }
    ],
    "examples": [
      "curl --ssl-reqd ftp://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ssl",
      "--insecure"
    ]
  },
  {
    "id": "ssl-revoke-best-effort",
    "name": "--ssl-revoke-best-effort",
    "short": null,
    "arg": null,
    "label": "--ssl-revoke-best-effort",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) (Schannel) Ignore certificate revocation checks when they failed due to missing/offline distribution points for the revocation check lists.",
    "description": "(TLS) (Schannel) Ignore certificate revocation checks when they failed due to missing/offline distribution points for the revocation check lists.\n\nProviding --ssl-revoke-best-effort multiple times has no extra effect. Disable it again with --no-ssl-revoke-best-effort.\n\nExample:\n\nAdded in 7.70.0. See also --crlfile and --insecure.",
    "choices": [],
    "examples": [
      "curl --ssl-revoke-best-effort https://example.com"
    ],
    "addedIn": "7.70.0.",
    "seeAlso": [
      "--crlfile",
      "--insecure"
    ]
  },
  {
    "id": "ssl-sessions",
    "name": "--ssl-sessions",
    "short": null,
    "arg": "<filename>",
    "label": "--ssl-sessions <filename>",
    "type": "filepath",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) **WARNING**: this option is experimental. Do not use in production.",
    "description": "(TLS) **WARNING**: this option is experimental. Do not use in production.\n\nUse the given file to load SSL session tickets into curl's cache before starting any transfers. At the end of a successful curl run, the cached SSL sessions tickets are saved to the file, replacing any previous content.\n\nThe file does not have to exist, but curl reports an error if it is unable to create it. Unused loaded tickets are saved again, unless they get replaced or purged from the cache for space reasons.\n\nUsing a session file allows \"--tls-earlydata\" to send the first request in \"0-RTT\" mode, should an SSL session with the feature be found. Note that a server may not support early data. Also note that early data does not provide forward secrecy, e.g. is not as secure.\n\nThe SSL session tickets are stored as base64 encoded text, each ticket on its own line. The hostnames are cryptographically salted and hashed. While this prevents someone from easily seeing the hosts you contacted, they could still check if a specific hostname matches one of the values.\n\nThis feature requires that the underlying libcurl was built with the experimental SSL session import/export feature (SSLS-EXPORT) enabled.\n\nIf --ssl-sessions is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.12.0. See also --tls-earlydata.",
    "choices": [],
    "examples": [
      "curl --ssl-sessions sessions.txt https://example.com"
    ],
    "addedIn": "8.12.0.",
    "seeAlso": [
      "--tls-earlydata"
    ]
  },
  {
    "id": "sslv2",
    "name": "--sslv2",
    "short": "-2",
    "arg": null,
    "label": "--sslv2",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(SSL) This option previously asked curl to use SSLv2, but is now ignored (added in 7.77.0). SSLv2 is widely considered insecure (see RFC 6176).",
    "description": "(SSL) This option previously asked curl to use SSLv2, but is now ignored (added in 7.77.0). SSLv2 is widely considered insecure (see RFC 6176).\n\nProviding --sslv2 multiple times has no extra effect.\n\nExample:\n\nFor --sslv2 to work, it requires that the underlying libcurl is built to support TLS. This option is mutually exclusive with --sslv3, --tlsv1, --tlsv1.1 and --tlsv1.2. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --sslv2 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--sslv2",
      "--sslv3",
      "--tlsv1",
      "--tlsv1.1",
      "--tlsv1.2",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "sslv3",
    "name": "--sslv3",
    "short": "-3",
    "arg": null,
    "label": "--sslv3",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(SSL) This option previously asked curl to use SSLv3, but is now ignored (added in 7.77.0). SSLv3 is widely considered insecure (see RFC 7568).",
    "description": "(SSL) This option previously asked curl to use SSLv3, but is now ignored (added in 7.77.0). SSLv3 is widely considered insecure (see RFC 7568).\n\nProviding --sslv3 multiple times has no extra effect.\n\nExample:\n\nFor --sslv3 to work, it requires that the underlying libcurl is built to support TLS. This option is mutually exclusive with --sslv2, --tlsv1, --tlsv1.1 and --tlsv1.2. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --sslv3 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--sslv3",
      "--sslv2",
      "--tlsv1",
      "--tlsv1.1",
      "--tlsv1.2",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "tls-earlydata",
    "name": "--tls-earlydata",
    "short": null,
    "arg": null,
    "label": "--tls-earlydata",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Enable the use of TLSv1.3 early data, also known as '0RTT' where possible. This has security implications for the requests sent that way.",
    "description": "(TLS) Enable the use of TLSv1.3 early data, also known as '0RTT' where possible. This has security implications for the requests sent that way.\n\nThis option can be used when curl is built to use GnuTLS, OpenSSL, quictls and wolfSSL as a TLS provider (but not AWS-LC, BoringSSL, or Rustls).\n\nIf a server supports this TLSv1.3 feature, and to what extent, is announced as part of the TLS \"session\" sent back to curl. Until curl has seen such a session in a previous request, early data cannot be used.\n\nWhen a new connection is initiated with a known TLSv1.3 session, and that session announced early data support, the first request on this connection is sent before the TLS handshake is complete. While the early data is also encrypted, it is not protected against replays. An attacker can send your early data to the server again and the server would accept it.\n\nIf your request contacts a public server and only retrieves a file, there may be no harm in that. If the first request orders a refrigerator for you, it is probably not a good idea to use early data for it. curl cannot deduce what the security implications of your requests actually are and make this decision for you.\n\nThe amount of early data sent can be inspected by using the \"--write-out\" variable \"tls_earlydata\".\n\nWARNING: this option has security implications. See above for more details.\n\nProviding --tls-earlydata multiple times has no extra effect. Disable it again with --no-tls-earlydata.\n\nExample:\n\nAdded in 8.11.0. See also --tlsv1.3, --tls-max and --ssl-sessions.",
    "choices": [],
    "examples": [
      "curl --tls-earlydata https://example.com"
    ],
    "addedIn": "8.11.0.",
    "seeAlso": [
      "--tlsv1.3",
      "--tls-max",
      "--ssl-sessions"
    ]
  },
  {
    "id": "tls13-ciphers",
    "name": "--tls13-ciphers",
    "short": null,
    "arg": "<list>",
    "label": "--tls13-ciphers <list>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Set which cipher suites to use in the connection if it negotiates TLS 1.3. The list of ciphers suites must specify valid ciphers. Read up on TLS 1.3 cipher suite details on this URL:",
    "description": "(TLS) Set which cipher suites to use in the connection if it negotiates TLS 1.3. The list of ciphers suites must specify valid ciphers. Read up on TLS 1.3 cipher suite details on this URL:\n\nhttps://curl.se/docs/ssl-ciphers.html\n\nThis option is used when curl is built to use OpenSSL 1.1.1 or later, wolfSSL, or mbedTLS 3.6.0 or later.\n\nBefore curl 8.10.0 with mbedTLS or wolfSSL, TLS 1.3 cipher suites were set by using the --ciphers option.\n\nIf --tls13-ciphers is provided several times, the last set value is used.\n\nExample:\n\nSee also --ciphers, --proxy-tls13-ciphers and --curves.",
    "choices": [],
    "examples": [
      "curl --tls13-ciphers TLS_AES_128_GCM_SHA256 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ciphers",
      "--proxy-tls13-ciphers",
      "--curves"
    ]
  },
  {
    "id": "tlsauthtype",
    "name": "--tlsauthtype",
    "short": null,
    "arg": "<type>",
    "label": "--tlsauthtype <type>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Deprecated option. This has no functionality since 8.22.0.",
    "description": "(TLS) Deprecated option. This has no functionality since 8.22.0.\n\nSet TLS authentication type. Currently, the only supported option is \"SRP\", for TLS-SRP (RFC 5054). If --tlsuser and --tlspassword are specified but --tlsauthtype is not, then this option defaults to \"SRP\". This option works only if the underlying libcurl is built with TLS-SRP support, which requires OpenSSL or GnuTLS with TLS-SRP support.\n\nIf --tlsauthtype is provided several times, the last set value is used.\n\nExample:\n\nSee also --tlsuser.",
    "choices": [],
    "examples": [
      "curl --tlsauthtype SRP https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsuser"
    ]
  },
  {
    "id": "tlspassword",
    "name": "--tlspassword",
    "short": null,
    "arg": "<string>",
    "label": "--tlspassword <string>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Deprecated option. This has no functionality since 8.22.0.",
    "description": "(TLS) Deprecated option. This has no functionality since 8.22.0.\n\nSet password to use with the TLS authentication method specified with --tlsauthtype. Requires that --tlsuser is set.\n\nThis option does not work with TLS 1.3.\n\nIf --tlspassword is provided several times, the last set value is used.\n\nExample:\n\nSee also --tlsuser.",
    "choices": [],
    "examples": [
      "curl --tlspassword pwd --tlsuser user https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsuser"
    ]
  },
  {
    "id": "tlsuser",
    "name": "--tlsuser",
    "short": null,
    "arg": "<name>",
    "label": "--tlsuser <name>",
    "type": "string",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Deprecated option. This has no functionality since 8.22.0.",
    "description": "(TLS) Deprecated option. This has no functionality since 8.22.0.\n\nSet username for use with the TLS authentication method specified with --tlsauthtype. Requires that --tlspassword also is set.\n\nThis option does not work with TLS 1.3.\n\nIf --tlsuser is provided several times, the last set value is used.\n\nExample:\n\nSee also --tlspassword.",
    "choices": [],
    "examples": [
      "curl --tlspassword pwd --tlsuser user https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlspassword"
    ]
  },
  {
    "id": "tlsv1",
    "name": "--tlsv1",
    "short": "-1",
    "arg": null,
    "label": "--tlsv1",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Use at least TLS version 1.x when negotiating with a remote TLS server. That means TLS version 1.0 or higher",
    "description": "(TLS) Use at least TLS version 1.x when negotiating with a remote TLS server. That means TLS version 1.0 or higher\n\nProviding --tlsv1 multiple times has no extra effect.\n\nExample:\n\nFor --tlsv1 to work, it requires that the underlying libcurl is built to support TLS. This option is mutually exclusive with --tlsv1.1, --tlsv1.2 and --tlsv1.3. See also --http1.1 and --http2.",
    "choices": [],
    "examples": [
      "curl --tlsv1 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsv1",
      "--tlsv1.1",
      "--tlsv1.2",
      "--tlsv1.3",
      "--http1.1",
      "--http2"
    ]
  },
  {
    "id": "tlsv1.0",
    "name": "--tlsv1.0",
    "short": null,
    "arg": null,
    "label": "--tlsv1.0",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Force curl to use TLS version 1.0 or later when connecting to a remote TLS server.",
    "description": "(TLS) Force curl to use TLS version 1.0 or later when connecting to a remote TLS server.\n\nIn old versions of curl this option was documented to allow _only_ TLS 1.0. That behavior was inconsistent depending on the TLS library. Use --tls-max if you want to set a maximum TLS version.\n\nProviding --tlsv1.0 multiple times has no extra effect.\n\nExample:\n\nSee also --tlsv1.3.",
    "choices": [],
    "examples": [
      "curl --tlsv1.0 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsv1.3"
    ]
  },
  {
    "id": "tlsv1.1",
    "name": "--tlsv1.1",
    "short": null,
    "arg": null,
    "label": "--tlsv1.1",
    "type": "boolean",
    "category": "security",
    "popularity": 15,
    "summary": "(TLS) Force curl to use TLS version 1.1 or later when connecting to a remote TLS server.",
    "description": "(TLS) Force curl to use TLS version 1.1 or later when connecting to a remote TLS server.\n\nIn old versions of curl this option was documented to allow _only_ TLS 1.1. That behavior was inconsistent depending on the TLS library. Use --tls-max if you want to set a maximum TLS version.\n\nProviding --tlsv1.1 multiple times has no extra effect.\n\nExample:\n\nSee also --tlsv1.3 and --tls-max.",
    "choices": [],
    "examples": [
      "curl --tlsv1.1 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tlsv1.3",
      "--tls-max"
    ]
  },
  {
    "id": "version",
    "name": "--version",
    "short": "-V",
    "arg": null,
    "label": "--version",
    "type": "choice",
    "category": "security",
    "popularity": 15,
    "summary": "Display information about curl and the libcurl version it uses.",
    "description": "Display information about curl and the libcurl version it uses.\n\nThe first line includes the full version of curl, libcurl and other 3rd party libraries linked with the executable.\n\nThis line may contain one or more TLS libraries. curl can be built to support more than one TLS library which then makes curl - at start-up - select which particular backend to use for this invocation.\n\nIf curl supports more than one TLS library like this, the ones that are not selected by default are listed within parentheses. Thus, if you do not specify which backend to use (with the \"CURL_SSL_BACKEND\" environment variable) the one listed without parentheses is used. Such builds also have \"MultiSSL\" set as a feature.\n\nThe second line (starts with \"Release-Date:\") shows the release date.\n\nThe third line (starts with \"Protocols:\") shows all protocols that libcurl reports to support.\n\nThe fourth line (starts with \"Features:\") shows specific features libcurl reports to offer. Available features include:\n\nExample:\n\nSee also --help and --manual.",
    "choices": [
      {
        "value": "alt-svc",
        "desc": "Support for the Alt-Svc: header is provided."
      },
      {
        "value": "AsynchDNS",
        "desc": "This curl uses asynchronous name resolves. Asynchronous name resolves can be done using either the c-ares or the threaded resolver backends."
      },
      {
        "value": "brotli",
        "desc": "Support for automatic brotli compression over HTTP(S)."
      },
      {
        "value": "CharConv",
        "desc": "curl was built with support for character set conversions (like EBCDIC)"
      },
      {
        "value": "Debug",
        "desc": "This curl uses a libcurl built with Debug. This enables more error-tracking and memory debugging etc. For curl-developers only."
      },
      {
        "value": "ECH",
        "desc": "ECH support is present."
      },
      {
        "value": "gsasl",
        "desc": "The built-in SASL authentication includes extensions to support SCRAM because libcurl was built with libgsasl."
      },
      {
        "value": "GSS-API",
        "desc": "GSS-API is supported."
      },
      {
        "value": "HSTS",
        "desc": "HSTS support is present."
      },
      {
        "value": "HTTP2",
        "desc": "HTTP/2 support has been built-in."
      },
      {
        "value": "HTTP3",
        "desc": "HTTP/3 support has been built-in."
      },
      {
        "value": "HTTPS-proxy",
        "desc": "This curl is built to support HTTPS proxy."
      },
      {
        "value": "IDN",
        "desc": "This curl supports IDN - international domain names."
      },
      {
        "value": "IPv6",
        "desc": "You can use IPv6 with this."
      },
      {
        "value": "Kerberos",
        "desc": "Kerberos V5 authentication is supported."
      },
      {
        "value": "Largefile",
        "desc": "This curl supports transfers of large files, files larger than 2GB."
      },
      {
        "value": "libz",
        "desc": "Automatic decompression (via gzip, deflate) of compressed files over HTTP is supported."
      },
      {
        "value": "MultiSSL",
        "desc": "This curl supports multiple TLS backends."
      },
      {
        "value": "NTLM",
        "desc": "NTLM authentication is supported."
      },
      {
        "value": "NTLM_WB",
        "desc": "NTLM delegation to winbind helper is supported. This feature was removed from curl in 8.8.0."
      },
      {
        "value": "PSL",
        "desc": "PSL is short for Public Suffix List and means that this curl has been built with knowledge about \"public suffixes\"."
      },
      {
        "value": "SPNEGO",
        "desc": "SPNEGO authentication is supported."
      },
      {
        "value": "SSL",
        "desc": "SSL versions of various protocols are supported, such as HTTPS, FTPS, POP3S and so on."
      },
      {
        "value": "SSLS-EXPORT",
        "desc": "This build supports TLS session export/import, like with the --ssl-sessions."
      },
      {
        "value": "SSPI",
        "desc": "SSPI is supported."
      },
      {
        "value": "Unicode",
        "desc": "Unicode support on Windows."
      },
      {
        "value": "UnixSockets",
        "desc": "Unix sockets support is provided."
      },
      {
        "value": "zstd",
        "desc": "Automatic decompression (via zstd) of compressed files over HTTP is supported."
      }
    ],
    "examples": [
      "curl --version"
    ],
    "addedIn": null,
    "seeAlso": [
      "--help",
      "--manual"
    ]
  },
  {
    "id": "#,",
    "name": "-#,",
    "short": null,
    "arg": "--progress-bar",
    "label": "-#, --progress-bar",
    "type": "string",
    "category": "output",
    "popularity": 15,
    "summary": "Make curl display transfer progress as a simple progress bar instead of the standard, more informational, meter.",
    "description": "Make curl display transfer progress as a simple progress bar instead of the standard, more informational, meter.\n\nThis progress bar draws a single line of '#' characters across the screen and shows a percentage if the transfer size is known. For transfers without a known size, there is a space ship (-=o=-) that moves back and forth but only while data is being transferred, with a set of flying hash sign symbols on top.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --progress-bar multiple times has no extra effect. Disable it again with --no-progress-bar.\n\nExample:\n\nSee also --styled-output.",
    "choices": [],
    "examples": [
      "curl -# -O https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--styled-output"
    ]
  },
  {
    "id": "create-dirs",
    "name": "--create-dirs",
    "short": null,
    "arg": null,
    "label": "--create-dirs",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "When used in conjunction with the --output option, curl creates the necessary local directory hierarchy as needed. This option creates the directories mentioned with the --output option combined with the path possibly set with --output-dir. If the combined output filename uses no directory, or if the directories it mentions already exist, no directories are created.",
    "description": "When used in conjunction with the --output option, curl creates the necessary local directory hierarchy as needed. This option creates the directories mentioned with the --output option combined with the path possibly set with --output-dir. If the combined output filename uses no directory, or if the directories it mentions already exist, no directories are created.\n\nCreated directories are made with mode 0750 on Unix-style file systems.\n\nTo create remote directories when using FTP or SFTP, try --ftp-create-dirs.\n\nProviding --create-dirs multiple times has no extra effect. Disable it again with --no-create-dirs.\n\nExample:\n\nSee also --ftp-create-dirs and --output-dir.",
    "choices": [],
    "examples": [
      "curl --create-dirs --output local/dir/file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-create-dirs",
      "--output-dir"
    ]
  },
  {
    "id": "fail-early",
    "name": "--fail-early",
    "short": null,
    "arg": null,
    "label": "--fail-early",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Fail and exit on the first detected transfer error.",
    "description": "Fail and exit on the first detected transfer error.\n\nWhen curl is used to do multiple transfers on the command line, it attempts to operate on each given URL, one by one. By default, it ignores errors if there are more URLs given and the last URL's success determines the error code curl returns. Early failures are \"hidden\" by subsequent successful transfers.\n\nUsing this option, curl instead returns an error on the first transfer that fails, independent of the amount of URLs that are given on the command line. This way, no transfer failures go undetected by scripts and similar.\n\nThis option does not imply --fail, which causes transfers to fail due to the server's HTTP status code. You can combine the two options, however note --fail is not global and is therefore contained by --next.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --fail-early multiple times has no extra effect. Disable it again with --no-fail-early.\n\nExample:\n\nSee also --fail and --fail-with-body.",
    "choices": [],
    "examples": [
      "curl --fail-early https://example.com https://two.example"
    ],
    "addedIn": null,
    "seeAlso": [
      "--fail",
      "--fail-with-body"
    ]
  },
  {
    "id": "ftp-create-dirs",
    "name": "--ftp-create-dirs",
    "short": null,
    "arg": null,
    "label": "--ftp-create-dirs",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "(FTP SFTP) When an FTP or SFTP URL/operation uses a path that does not currently exist on the server, the standard behavior of curl is to fail. Using this option, curl instead attempts to create missing directories.",
    "description": "(FTP SFTP) When an FTP or SFTP URL/operation uses a path that does not currently exist on the server, the standard behavior of curl is to fail. Using this option, curl instead attempts to create missing directories.\n\nProviding --ftp-create-dirs multiple times has no extra effect. Disable it again with --no-ftp-create-dirs.\n\nExample:\n\nSee also --create-dirs.",
    "choices": [],
    "examples": [
      "curl --ftp-create-dirs -T file ftp://example.com/remote/path/file"
    ],
    "addedIn": null,
    "seeAlso": [
      "--create-dirs"
    ]
  },
  {
    "id": "help",
    "name": "--help",
    "short": "-h",
    "arg": "<subject>",
    "label": "--help <subject>",
    "type": "string",
    "category": "output",
    "popularity": 15,
    "summary": "Usage help. Provide help for the subject given as an optional argument.",
    "description": "Usage help. Provide help for the subject given as an optional argument.\n\nIf no argument is provided, curl displays the most important command line arguments.\n\nThe argument can either be a category or a command line option. When a category is provided, curl shows all command line options within the given category. Specify category \"all\" to list all available options.\n\nIf \"category\" is specified, curl displays all available help categories.\n\nIf the provided subject is instead an existing command line option, specified either in its short form with a single dash and a single letter, or in the long form with two dashes and a longer name, curl displays a help text for that option in the terminal.\n\nThe help output is extensive for some options.\n\nIf the provided command line option is not known, curl says so.\n\nExamples:\n\nSee also --verbose.",
    "choices": [],
    "examples": [
      "curl --help all\ncurl --help --insecure\ncurl --help -f"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose"
    ]
  },
  {
    "id": "libcurl",
    "name": "--libcurl",
    "short": null,
    "arg": "<file>",
    "label": "--libcurl <file>",
    "type": "filepath",
    "category": "output",
    "popularity": 15,
    "summary": "Append this option to any ordinary curl command line, and you get libcurl-using C source code written to the file that does the equivalent of what your command-line operation does.",
    "description": "Append this option to any ordinary curl command line, and you get libcurl-using C source code written to the file that does the equivalent of what your command-line operation does.\n\nThe source code output should be considered example code and is not production ready. You must double-check that the code actually does what you want it do.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --libcurl is provided several times, the last set value is used.\n\nExample:\n\nSee also --verbose.",
    "choices": [],
    "examples": [
      "curl --libcurl client.c https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose"
    ]
  },
  {
    "id": "mail-rcpt",
    "name": "--mail-rcpt",
    "short": null,
    "arg": "<address>",
    "label": "--mail-rcpt <address>",
    "type": "string",
    "category": "output",
    "popularity": 15,
    "summary": "(SMTP) Specify a single email address, username or mailing list name. Repeat this option several times to send to multiple recipients.",
    "description": "(SMTP) Specify a single email address, username or mailing list name. Repeat this option several times to send to multiple recipients.\n\nWhen performing an address verification (VRFY command), the recipient should be specified as the username or username and domain (as per Section 3.5 of RFC 5321).\n\nWhen performing a mailing list expand (EXPN command), the recipient should be specified using the mailing list name, such as \"Friends\" or \"London-Office\".\n\n--mail-rcpt can be used several times in a command line.\n\nExample:\n\nSee also --mail-rcpt-allowfails.",
    "choices": [],
    "examples": [
      "curl --mail-rcpt user@example.net smtp://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--mail-rcpt-allowfails"
    ]
  },
  {
    "id": "mail-rcpt-allowfails",
    "name": "--mail-rcpt-allowfails",
    "short": null,
    "arg": null,
    "label": "--mail-rcpt-allowfails",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "(SMTP) When sending data to multiple recipients, by default curl aborts SMTP conversation if at least one of the recipients causes RCPT TO command to return an error.",
    "description": "(SMTP) When sending data to multiple recipients, by default curl aborts SMTP conversation if at least one of the recipients causes RCPT TO command to return an error.\n\nThe default behavior can be changed by passing --mail-rcpt-allowfails command-line option which makes curl ignore errors and proceed with the remaining valid recipients.\n\nIf all recipients trigger RCPT TO failures and this flag is specified, curl still aborts the SMTP conversation and returns the error received from to the last RCPT TO command.\n\nProviding --mail-rcpt-allowfails multiple times has no extra effect. Disable it again with --no-mail-rcpt-allowfails.\n\nExample:\n\nAdded in 7.69.0. See also --mail-rcpt.",
    "choices": [],
    "examples": [
      "curl --mail-rcpt-allowfails --mail-rcpt dest@example.com smtp://example.com"
    ],
    "addedIn": "7.69.0.",
    "seeAlso": [
      "--mail-rcpt"
    ]
  },
  {
    "id": "manual",
    "name": "--manual",
    "short": "-M",
    "arg": null,
    "label": "--manual",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Manual. Display the huge help text.",
    "description": "Manual. Display the huge help text.\n\nExample:\n\nSee also --verbose, --libcurl and --trace.",
    "choices": [],
    "examples": [
      "curl --manual"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose",
      "--libcurl",
      "--trace"
    ]
  },
  {
    "id": "no-buffer",
    "name": "--no-buffer",
    "short": "-N",
    "arg": null,
    "label": "--no-buffer",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Disable the buffering of the output stream. In normal work situations, curl uses a standard buffered output stream that has the effect that it outputs the data in chunks, not necessarily exactly when the data arrives. Using this option disables that buffering.",
    "description": "Disable the buffering of the output stream. In normal work situations, curl uses a standard buffered output stream that has the effect that it outputs the data in chunks, not necessarily exactly when the data arrives. Using this option disables that buffering.\n\nNote that this is the negated option name documented. You can use --buffer to enable buffering again.\n\nProviding --no-buffer multiple times has no extra effect. Disable it again with --buffer.\n\nExample:\n\nSee also --progress-bar.",
    "choices": [],
    "examples": [
      "curl --no-buffer https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--progress-bar"
    ]
  },
  {
    "id": "no-progress-meter",
    "name": "--no-progress-meter",
    "short": null,
    "arg": null,
    "label": "--no-progress-meter",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Option to switch off the progress meter output without muting or otherwise affecting warning and informational messages like --silent does.",
    "description": "Option to switch off the progress meter output without muting or otherwise affecting warning and informational messages like --silent does.\n\nNote that this is the negated option name documented. You can thus use --progress-meter to enable the progress meter again.\n\nProviding --no-progress-meter multiple times has no extra effect. Disable it again with --progress-meter.\n\nExample:\n\nAdded in 7.67.0. See also --verbose and --silent.",
    "choices": [],
    "examples": [
      "curl --no-progress-meter -o store https://example.com"
    ],
    "addedIn": "7.67.0.",
    "seeAlso": [
      "--verbose",
      "--silent"
    ]
  },
  {
    "id": "parallel",
    "name": "--parallel",
    "short": "-Z",
    "arg": null,
    "label": "--parallel",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Make curl perform all transfers in parallel as compared to the regular serial manner. Parallel transfer means that curl runs up to N concurrent transfers simultaneously and if there are more than N transfers to handle, it starts new ones when earlier transfers finish.",
    "description": "Make curl perform all transfers in parallel as compared to the regular serial manner. Parallel transfer means that curl runs up to N concurrent transfers simultaneously and if there are more than N transfers to handle, it starts new ones when earlier transfers finish.\n\nWith parallel transfers, the progress meter output is different from when doing serial transfers, as it then displays the transfer status for multiple transfers in a single line.\n\nThe maximum amount of concurrent transfers is set with --parallel-max and it defaults to 50.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --parallel multiple times has no extra effect. Disable it again with --no-parallel.\n\nExample:\n\nAdded in 7.66.0. See also --next, --verbose, --parallel-max and --parallel-immediate.",
    "choices": [],
    "examples": [
      "curl --parallel https://example.com -o file1 https://example.com -o file2"
    ],
    "addedIn": "7.66.0.",
    "seeAlso": [
      "--next",
      "--verbose",
      "--parallel-max",
      "--parallel-immediate"
    ]
  },
  {
    "id": "parallel-max-host",
    "name": "--parallel-max-host",
    "short": null,
    "arg": "<num>",
    "label": "--parallel-max-host <num>",
    "type": "number",
    "category": "output",
    "popularity": 15,
    "summary": "When asked to do parallel transfers, using --parallel, this option controls the maximum amount of concurrent connections curl is allowed to do to the same protocol + hostname + port number target.",
    "description": "When asked to do parallel transfers, using --parallel, this option controls the maximum amount of concurrent connections curl is allowed to do to the same protocol + hostname + port number target.\n\nThe limit is enforced by libcurl and queued \"internally\", which means that transfers that are waiting for an available connection still look like started transfers in the progress meter.\n\nThe default is 0 (unlimited). 65535 is the largest supported value.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --parallel-max-host is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.16.0. See also --parallel and --parallel-max.",
    "choices": [],
    "examples": [
      "curl --parallel-max-host 5 -Z https://example.com ftp://example.com/"
    ],
    "addedIn": "8.16.0.",
    "seeAlso": [
      "--parallel",
      "--parallel-max"
    ]
  },
  {
    "id": "quote",
    "name": "--quote",
    "short": "-Q",
    "arg": "<command>",
    "label": "--quote <command>",
    "type": "choice",
    "category": "output",
    "popularity": 15,
    "summary": "(FTP SFTP) Send an arbitrary command to the remote FTP or SFTP server. Quote commands are sent BEFORE the transfer takes place (immediately after the initial PWD command in an FTP transfer, to be exact). To make commands take place after a successful transfer, prefix them with a dash '-'.",
    "description": "(FTP SFTP) Send an arbitrary command to the remote FTP or SFTP server. Quote commands are sent BEFORE the transfer takes place (immediately after the initial PWD command in an FTP transfer, to be exact). To make commands take place after a successful transfer, prefix them with a dash '-'.\n\n(FTP only) To make commands be sent after curl has changed the working directory, immediately before the file transfer command(s), prefix the command with a '+'.\n\nYou may specify any number of commands.\n\nBy default curl stops at first failure. To make curl continue even if the command fails, prefix the command with an asterisk (*). Otherwise, if the server returns failure for one of the commands, the entire operation is aborted.\n\nYou must send syntactically correct FTP commands as RFC 959 defines to FTP servers, or one of the commands listed below to SFTP servers.\n\nSFTP is a binary protocol. Unlike for FTP, curl interprets SFTP quote commands itself before sending them to the server. Filenames must be provided within double quotes to embed spaces, backslashes, quotes or double quotes. Within double quotes the following escape sequences are available for that purpose: \\ \\\", and \\'.\n\nFollowing is the list of all supported SFTP quote commands:\n\n--quote can be used several times in a command line.\n\nExample:\n\nSee also --request.",
    "choices": [
      {
        "value": "atime date file",
        "desc": "The atime command sets the last access time of the file named by the file operand. The date expression can be all sorts of date strings, see the curl_getdate man page for date expression details. (Added in 7.73.0)"
      },
      {
        "value": "chgrp group file",
        "desc": "The chgrp command sets the group ID of the file named by the file operand to the group ID specified by the group operand. The group operand is a decimal integer group ID."
      },
      {
        "value": "chmod mode file",
        "desc": "The chmod command modifies the file mode bits of the specified file. The mode operand is an octal integer mode number."
      },
      {
        "value": "chown user file",
        "desc": "The chown command sets the owner of the file named by the file operand to the user ID specified by the user operand. The user operand is a decimal integer user ID."
      },
      {
        "value": "ln source_file target_file",
        "desc": "The ln and symlink commands create a symbolic link at the target_file location pointing to the source_file location."
      },
      {
        "value": "mkdir directory_name",
        "desc": "The mkdir command creates the directory named by the directory_name operand."
      },
      {
        "value": "mtime date file",
        "desc": "The mtime command sets the last modification time of the file named by the file operand. The date expression can be all sorts of date strings, see the curl_getdate man page for date expression details. (Added in 7.73.0)"
      },
      {
        "value": "pwd",
        "desc": "The pwd command returns the absolute path name of the current working directory."
      },
      {
        "value": "rename source target",
        "desc": "The rename command renames the file or directory named by the source operand to the destination path named by the target operand."
      },
      {
        "value": "rm file",
        "desc": "The rm command removes the file specified by the file operand."
      },
      {
        "value": "rmdir directory",
        "desc": "The rmdir command removes the directory entry specified by the directory operand, provided it is empty."
      },
      {
        "value": "symlink source_file target_file",
        "desc": "See ln."
      }
    ],
    "examples": [
      "curl --quote \"DELE file\" ftp://example.com/foo"
    ],
    "addedIn": "7.73.0",
    "seeAlso": [
      "--request"
    ]
  },
  {
    "id": "remote-name-all",
    "name": "--remote-name-all",
    "short": null,
    "arg": null,
    "label": "--remote-name-all",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Change the default action for all given URLs to be dealt with as if --remote-name were used for each one. If you want to disable that for a specific URL after --remote-name-all has been used, you must use \"-o -\" or --no-remote-name.",
    "description": "Change the default action for all given URLs to be dealt with as if --remote-name were used for each one. If you want to disable that for a specific URL after --remote-name-all has been used, you must use \"-o -\" or --no-remote-name.\n\nProviding --remote-name-all multiple times has no extra effect. Disable it again with --no-remote-name-all.\n\nExample:\n\nSee also --remote-name.",
    "choices": [],
    "examples": [
      "curl --remote-name-all ftp://example.com/file1 ftp://example.com/file2"
    ],
    "addedIn": null,
    "seeAlso": [
      "--remote-name"
    ]
  },
  {
    "id": "remote-time",
    "name": "--remote-time",
    "short": "-R",
    "arg": null,
    "label": "--remote-time",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Make curl attempt to figure out the timestamp of the remote file that is getting downloaded, and if that is available make the local file get that same timestamp.",
    "description": "Make curl attempt to figure out the timestamp of the remote file that is getting downloaded, and if that is available make the local file get that same timestamp.\n\nProviding --remote-time multiple times has no extra effect. Disable it again with --no-remote-time.\n\nExample:\n\nSee also --remote-name and --time-cond.",
    "choices": [],
    "examples": [
      "curl --remote-time -o foo https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--remote-name",
      "--time-cond"
    ]
  },
  {
    "id": "remove-on-error",
    "name": "--remove-on-error",
    "short": null,
    "arg": null,
    "label": "--remove-on-error",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Remove the output file if an error occurs. If curl returns an error when told to save output in a local file. This prevents curl from leaving a partial file in the case of an error during transfer.",
    "description": "Remove the output file if an error occurs. If curl returns an error when told to save output in a local file. This prevents curl from leaving a partial file in the case of an error during transfer.\n\nIf the output is not a regular file, this option has no effect.\n\nThe --continue-at option cannot be used together with --remove-on-error.\n\nProviding --remove-on-error multiple times has no extra effect. Disable it again with --no-remove-on-error.\n\nExample:\n\nAdded in 7.83.0. See also --fail.",
    "choices": [],
    "examples": [
      "curl --remove-on-error -o output https://example.com"
    ],
    "addedIn": "7.83.0.",
    "seeAlso": [
      "--fail"
    ]
  },
  {
    "id": "skip-existing",
    "name": "--skip-existing",
    "short": null,
    "arg": null,
    "label": "--skip-existing",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "If there is a local file present when a download is requested, the operation is skipped. Note that curl cannot know if the local file was previously downloaded fine, or if it is incomplete etc, it knows if there is a filename present in the file system or not and it skips the transfer if it is.",
    "description": "If there is a local file present when a download is requested, the operation is skipped. Note that curl cannot know if the local file was previously downloaded fine, or if it is incomplete etc, it knows if there is a filename present in the file system or not and it skips the transfer if it is.\n\nProviding --skip-existing multiple times has no extra effect. Disable it again with --no-skip-existing.\n\nExample:\n\nAdded in 8.10.0. See also --output, --remote-name and --no-clobber.",
    "choices": [],
    "examples": [
      "curl --skip-existing --output local/dir/file https://example.com"
    ],
    "addedIn": "8.10.0.",
    "seeAlso": [
      "--output",
      "--remote-name",
      "--no-clobber"
    ]
  },
  {
    "id": "stderr",
    "name": "--stderr",
    "short": null,
    "arg": "<file>",
    "label": "--stderr <file>",
    "type": "filepath",
    "category": "output",
    "popularity": 15,
    "summary": "Redirect all writes to stderr to the specified file instead. If the filename is a plain '-', it is instead written to stdout.",
    "description": "Redirect all writes to stderr to the specified file instead. If the filename is a plain '-', it is instead written to stdout.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --stderr is provided several times, the last set value is used.\n\nExample:\n\nSee also --verbose and --silent.",
    "choices": [],
    "examples": [
      "curl --stderr output.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose",
      "--silent"
    ]
  },
  {
    "id": "trace",
    "name": "--trace",
    "short": null,
    "arg": "<file>",
    "label": "--trace <file>",
    "type": "filepath",
    "category": "output",
    "popularity": 15,
    "summary": "Save a full trace dump of all incoming and outgoing data, including descriptive information, in the given output file. Use \"-\" as filename to have the output sent to stdout. Use \"%\" as filename to have the output sent to stderr.",
    "description": "Save a full trace dump of all incoming and outgoing data, including descriptive information, in the given output file. Use \"-\" as filename to have the output sent to stdout. Use \"%\" as filename to have the output sent to stderr.\n\nNote that verbose output of curl activities and network traffic might contain sensitive data, including usernames, credentials or secret data content. Be aware and be careful when sharing trace logs with others.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --trace is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --verbose and --trace-ascii. See also --trace-ascii, --trace-config, --trace-ids and --trace-time.",
    "choices": [],
    "examples": [
      "curl --trace log.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--verbose",
      "--trace-ascii",
      "--trace-ascii",
      "--trace-config",
      "--trace-ids",
      "--trace-time"
    ]
  },
  {
    "id": "trace-ascii",
    "name": "--trace-ascii",
    "short": null,
    "arg": "<file>",
    "label": "--trace-ascii <file>",
    "type": "filepath",
    "category": "output",
    "popularity": 15,
    "summary": "Save a full trace dump of all incoming and outgoing data, including descriptive information, in the given output file. Use \"-\" as filename to have the output sent to stdout. Use \"%\" as filename to send the output to stderr.",
    "description": "Save a full trace dump of all incoming and outgoing data, including descriptive information, in the given output file. Use \"-\" as filename to have the output sent to stdout. Use \"%\" as filename to send the output to stderr.\n\nThis is similar to --trace, but leaves out the hex part and only shows the ASCII part of the dump. It makes smaller output that might be easier to read for untrained humans.\n\nNote that verbose output of curl activities and network traffic might contain sensitive data, including usernames, credentials or secret data content. Be aware and be careful when sharing trace logs with others.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --trace-ascii is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --trace and --verbose. See also --verbose and --trace.",
    "choices": [],
    "examples": [
      "curl --trace-ascii log.txt https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--trace",
      "--verbose",
      "--verbose",
      "--trace"
    ]
  },
  {
    "id": "trace-config",
    "name": "--trace-config",
    "short": null,
    "arg": "<string>",
    "label": "--trace-config <string>",
    "type": "choice",
    "category": "output",
    "popularity": 15,
    "summary": "Set configuration for trace output. A comma-separated list of components where detailed output can be made available from. Names are case-insensitive. Specify 'all' to enable all trace components.",
    "description": "Set configuration for trace output. A comma-separated list of components where detailed output can be made available from. Names are case-insensitive. Specify 'all' to enable all trace components.\n\nIn addition to trace component names, specify \"ids\" and \"time\" to avoid extra --trace-ids or --trace-time parameters.\n\nSee the curl_global_trace man page for more details.\n\nThis option is global and does not need to be specified for each use of --next.\n\n--trace-config can be used several times in a command line.\n\nExample:\n\nAdded in 8.3.0. See also --verbose and --trace.",
    "choices": [
      {
        "value": "all",
        "desc": "Enable all components"
      },
      {
        "value": "ids",
        "desc": "Include transfer and connection IDs"
      },
      {
        "value": "time",
        "desc": "Include timestamps with microsecond resolution"
      },
      {
        "value": "http/2",
        "desc": "HTTP/2 protocol trace"
      },
      {
        "value": "http/3",
        "desc": "HTTP/3 protocol trace"
      },
      {
        "value": "ssl",
        "desc": "SSL/TLS protocol trace"
      }
    ],
    "examples": [
      "curl --trace-config ids,http/2 https://example.com"
    ],
    "addedIn": "8.3.0.",
    "seeAlso": [
      "--verbose",
      "--trace"
    ]
  },
  {
    "id": "trace-ids",
    "name": "--trace-ids",
    "short": null,
    "arg": null,
    "label": "--trace-ids",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Prepend the transfer and connection identifiers to each trace or verbose line that curl displays.",
    "description": "Prepend the transfer and connection identifiers to each trace or verbose line that curl displays.\n\nThe identifiers are unique numbers assigned to each connection and transfer to allow a user to better understand which transfer and connection each verbose output line refers to.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --trace-ids multiple times has no extra effect. Disable it again with --no-trace-ids.\n\nExample:\n\nAdded in 8.2.0. See also --trace and --verbose.",
    "choices": [],
    "examples": [
      "curl --trace-ids --trace-ascii output https://example.com"
    ],
    "addedIn": "8.2.0.",
    "seeAlso": [
      "--trace",
      "--verbose"
    ]
  },
  {
    "id": "trace-time",
    "name": "--trace-time",
    "short": null,
    "arg": null,
    "label": "--trace-time",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Prepend a time stamp to each trace or verbose line that curl displays.",
    "description": "Prepend a time stamp to each trace or verbose line that curl displays.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --trace-time multiple times has no extra effect. Disable it again with --no-trace-time.\n\nExample:\n\nSee also --trace and --verbose.",
    "choices": [],
    "examples": [
      "curl --trace-time --trace-ascii output https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--trace",
      "--verbose"
    ]
  },
  {
    "id": "url",
    "name": "--url",
    "short": null,
    "arg": "<url/file>",
    "label": "--url <url/file>",
    "type": "filepath",
    "category": "output",
    "popularity": 15,
    "summary": "Specify a URL to fetch or send data to.",
    "description": "Specify a URL to fetch or send data to.\n\nIf the given URL is missing a scheme (such as \"http://\" or \"ftp://\" etc) curl guesses which scheme to use based on the hostname. If the outermost subdomain name matches DICT, FTP, IMAP, LDAP, POP3 or SMTP case insensitively, then that protocol is used, otherwise it assumes HTTP. Scheme guessing can be avoided by providing a full URL including the scheme, or disabled by setting a default protocol, see --proto-default for details.\n\nTo control where the contents of a retrieved URL is written instead of the default stdout, use the --output or the --remote-name options. When retrieving multiple URLs in a single invoke, each provided URL needs its own dedicated destination option unless --remote-name-all is used.\n\nOn Windows, \"file://\" accesses can be converted to network accesses by the operating system.\n\nStarting in curl 8.13.0, curl can be told to download URLs provided in a text file, one URL per line. It is done with \"--url @filename\": so instead of a URL, you specify a filename prefixed with the \"@\" symbol. It can be told to load the list of URLs from stdin by providing an argument like \"@-\".\n\nWhen downloading URLs given in a file, it implies using --remote-name for each provided URL. The URLs are full, there is no globbing applied or done on these. Features such as --skip-existing work fine in combination with this.\n\nLines in the URL file that start with \"#\" are treated as comments and are skipped.\n\n--url can be used several times in a command line.\n\nExamples:\n\nSee also --next, --config, --path-as-is and --disallow-username-in-url.",
    "choices": [],
    "examples": [
      "curl --url https://example.com\ncurl --url @file"
    ],
    "addedIn": null,
    "seeAlso": [
      "--next",
      "--config",
      "--path-as-is",
      "--disallow-username-in-url"
    ]
  },
  {
    "id": "xattr",
    "name": "--xattr",
    "short": null,
    "arg": null,
    "label": "--xattr",
    "type": "boolean",
    "category": "output",
    "popularity": 15,
    "summary": "Store metadata in the extended file attributes.",
    "description": "Store metadata in the extended file attributes.\n\nWhen saving output to a file, tell curl to store file metadata in extended file attributes. Currently, \"curl\" is stored in the \"creator\" attribute, the URL is stored in the \"xdg.origin.url\" attribute, for HTTP, the content type is stored in the \"mime_type\" attribute, and if set, the referrer URL in \"user.xdg.referrer.url\". If the file system does not support extended attributes, a warning is issued.\n\nSince curl 8.22.0 this option is also supported on Windows, where it creates an Alternate Data Stream named \"Zone.Identifier\". It contains an INI formatted \"ZoneTransfer\" section, with values: \"HostUrl\", \"ReferrerUrl\" (if set).\n\nProviding --xattr multiple times has no extra effect. Disable it again with --no-xattr.\n\nExample:\n\nSee also --remote-time, --write-out and --verbose.",
    "choices": [],
    "examples": [
      "curl --xattr -o storage https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--remote-time",
      "--write-out",
      "--verbose"
    ]
  },
  {
    "id": ":,",
    "name": "-:,",
    "short": null,
    "arg": "--next",
    "label": "-:, --next",
    "type": "string",
    "category": "output",
    "popularity": 15,
    "summary": "Use a separate operation for the following URL and associated options. This allows you to send several URL requests, each with their own specific options, for example, such as different usernames or custom requests for each.",
    "description": "Use a separate operation for the following URL and associated options. This allows you to send several URL requests, each with their own specific options, for example, such as different usernames or custom requests for each.\n\n--next resets all local options and only global ones have their values survive over to the operation following the --next instruction. Global options include --verbose, --trace, --trace-ascii and --fail-early.\n\nFor example, you can do both a GET and a POST in a single command line:\n\n--next can be used several times in a command line.\n\nExamples:\n\nSee also --parallel and --config.",
    "choices": [],
    "examples": [
      "curl www1.example.com --next -d postthis www2.example.com",
      "curl https://example.com --next -d postthis www2.example.com\ncurl -I https://example.com --next https://example.net/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--parallel",
      "--config"
    ]
  },
  {
    "id": "anyauth",
    "name": "--anyauth",
    "short": null,
    "arg": null,
    "label": "--anyauth",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Figure out authentication method automatically, and use the most secure one the remote site claims to support. This is done by first doing a request and checking the response-headers, thus possibly inducing an extra network round-trip. This option is used instead of setting a specific authentication method, which you can do with --basic, --digest, --ntlm, and --negotiate.",
    "description": "(HTTP) Figure out authentication method automatically, and use the most secure one the remote site claims to support. This is done by first doing a request and checking the response-headers, thus possibly inducing an extra network round-trip. This option is used instead of setting a specific authentication method, which you can do with --basic, --digest, --ntlm, and --negotiate.\n\nUsing --anyauth is not recommended if you do uploads from stdin, since it may require data to be sent twice and then the client must be able to rewind. If the need should arise when uploading from stdin, the upload operation fails.\n\nUsed together with --user.\n\nExample:\n\nSee also --proxy-anyauth, --basic and --digest.",
    "choices": [],
    "examples": [
      "curl --anyauth --user me:pwd https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-anyauth",
      "--basic",
      "--digest"
    ]
  },
  {
    "id": "aws-sigv4",
    "name": "--aws-sigv4",
    "short": null,
    "arg": "<provider1[:prvdr2[:reg[:srv]]]>",
    "label": "--aws-sigv4 <provider1[:prvdr2[:reg[:srv]]]>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Use AWS V4 signature authentication in the transfer.",
    "description": "(HTTP) Use AWS V4 signature authentication in the transfer.\n\nThe provider argument is a string that is used by the algorithm when creating outgoing authentication headers.\n\nThe region argument is a string that points to a geographic area of a resources collection (region-code) when the region name is omitted from the endpoint.\n\nThe service argument is a string that points to a function provided by a cloud (service-code) when the service name is omitted from the endpoint.\n\nIf --aws-sigv4 is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.75.0. See also --basic and --user.",
    "choices": [],
    "examples": [
      "curl --aws-sigv4 \"aws:amz:us-east-2:es\" --user \"key:secret\" https://example.com"
    ],
    "addedIn": "7.75.0.",
    "seeAlso": [
      "--basic",
      "--user"
    ]
  },
  {
    "id": "basic",
    "name": "--basic",
    "short": null,
    "arg": null,
    "label": "--basic",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Use HTTP Basic authentication with the remote host. This method is the default and this option is usually pointless, unless you use it to override a previously set option that sets a different authentication method (such as --ntlm, --digest, or --negotiate).",
    "description": "(HTTP) Use HTTP Basic authentication with the remote host. This method is the default and this option is usually pointless, unless you use it to override a previously set option that sets a different authentication method (such as --ntlm, --digest, or --negotiate).\n\nUsed together with --user.\n\nProviding --basic multiple times has no extra effect. Disable it again with --no-basic.\n\nExample:\n\nSee also --proxy-basic.",
    "choices": [],
    "examples": [
      "curl -u name:password --basic https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-basic"
    ]
  },
  {
    "id": "delegation",
    "name": "--delegation",
    "short": null,
    "arg": "<LEVEL>",
    "label": "GSS/Kerberos Delegation Level (委托级别)",
    "type": "choice",
    "category": "auth",
    "popularity": 15,
    "summary": "(GSS/kerberos) Set LEVEL what curl is allowed to delegate when it comes to user credentials.",
    "description": "(GSS/kerberos) Set LEVEL what curl is allowed to delegate when it comes to user credentials.\n\nIf --delegation is provided several times, the last set value is used.\n\nExample:\n\nSee also --insecure and --ssl.",
    "choices": [
      {
        "value": "none",
        "desc": "Do not allow any delegation."
      },
      {
        "value": "policy",
        "desc": "Delegates if and only if the OK-AS-DELEGATE flag is set in the Kerberos service ticket, which is a matter of realm policy."
      },
      {
        "value": "always",
        "desc": "Unconditionally allow the server to delegate."
      }
    ],
    "examples": [
      "curl --delegation \"none\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--insecure",
      "--ssl"
    ]
  },
  {
    "id": "follow",
    "name": "--follow",
    "short": null,
    "arg": null,
    "label": "--follow",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Instructs curl to follow HTTP redirects and to do the custom request method set with --request when following redirects as the HTTP specification says.",
    "description": "(HTTP) Instructs curl to follow HTTP redirects and to do the custom request method set with --request when following redirects as the HTTP specification says.\n\nThe method string set with --request is used in subsequent requests for the status codes 307 or 308, but may be reset to GET for 301, 302 and 303.\n\nThis is subtly different than --location, as that option always sets the custom method in all subsequent requests independent of response code.\n\nRestrict which protocols a redirect is accepted to follow with --proto-redir.\n\nWhen --netrc is used in combination with this option, credentials for the followed-to hosts may also be selected from that file.\n\nProviding --follow multiple times has no extra effect. Disable it again with --no-follow.\n\nExample:\n\nAdded in 8.16.0. See also --request, --location, --proto-redir and --max-redirs.",
    "choices": [],
    "examples": [
      "curl -X POST --follow https://example.com"
    ],
    "addedIn": "8.16.0.",
    "seeAlso": [
      "--request",
      "--location",
      "--proto-redir",
      "--max-redirs"
    ]
  },
  {
    "id": "ftp-account",
    "name": "--ftp-account",
    "short": null,
    "arg": "<data>",
    "label": "--ftp-account <data>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(FTP) When an FTP server asks for \"account data\" after username and password has been provided, this data is sent off using the ACCT command.",
    "description": "(FTP) When an FTP server asks for \"account data\" after username and password has been provided, this data is sent off using the ACCT command.\n\nIf --ftp-account is provided several times, the last set value is used.\n\nExample:\n\nSee also --user.",
    "choices": [],
    "examples": [
      "curl --ftp-account \"mr.robot\" ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user"
    ]
  },
  {
    "id": "httpsig-algo",
    "name": "--httpsig-algo",
    "short": null,
    "arg": "<algorithm>",
    "label": "--httpsig-algo <algorithm>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) **WARNING**: this option is experimental. Do not use in production.",
    "description": "(HTTP) **WARNING**: this option is experimental. Do not use in production.\n\nSign outgoing HTTP requests using RFC 9421 HTTP Message Signatures.\n\nThis option specifies which signing algorithm to use. Supported values are ed25519 and hmac-sha256. If not specified, ed25519 is used. Any other value causes curl to exit with an error.\n\nHTTP Message Signatures are enabled when any of --httpsig-algo, --httpsig-key, --httpsig-keyid or --httpsig-headers is given. When enabled, --httpsig-key and --httpsig-keyid are required. Without any of these options no signing is performed.\n\nBy default, the signed components are \"method\", \"authority\", \"path\", and \"query\" (when a query string is present). Use --httpsig-headers to override the set of components included in the signature.\n\nIf --httpsig-algo is provided several times, the last set value is used.\n\nExamples:\n\nAdded in 8.22.0. See also --httpsig-key, --httpsig-keyid and --httpsig-headers.",
    "choices": [],
    "examples": [
      "curl --httpsig-key key.hex --httpsig-keyid \"my-key\" https://example.com\ncurl --httpsig-algo hmac-sha256 --httpsig-key secret.hex --httpsig-keyid \"shared\" https://example.com"
    ],
    "addedIn": "8.22.0.",
    "seeAlso": [
      "--httpsig-key",
      "--httpsig-keyid",
      "--httpsig-headers"
    ]
  },
  {
    "id": "httpsig-headers",
    "name": "--httpsig-headers",
    "short": null,
    "arg": "<components>",
    "label": "--httpsig-headers <components>",
    "type": "choice",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) **WARNING**: this option is experimental. Do not use in production.",
    "description": "(HTTP) **WARNING**: this option is experimental. Do not use in production.\n\nSpace-separated list of components to include in the RFC 9421 HTTP Message Signature. Derived components are given as bare names: \"method\", \"authority\", \"path\", and \"query\". HTTP header fields are given with a trailing colon, for example \"content-type:\" and \"content-digest:\".\n\nIf not specified, the default set is \"method authority path\" (plus \"query\" when a query string is present in the URL).\n\nIf --httpsig-headers is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.22.0. See also --httpsig-algo, --httpsig-key and --httpsig-keyid.",
    "choices": [
      {
        "value": "Signing request headers",
        "desc": "Header components are taken from \"-H\" / \"--header\" options only. Headers curl adds by default (such as \"User-Agent\") are not signed unless you set them explicitly, for example: Each component may appear only once. Duplicate identifiers in \"--httpsig-headers\" cause curl to exit with an error."
      }
    ],
    "examples": [
      "curl --httpsig-algo ed25519 \\\n  --httpsig-key k.hex \\\n  --httpsig-keyid mykey \\\n  -H \"User-Agent: MyApp/1.0\" \\\n  --httpsig-headers \\\n  \"method authority path user-agent:\" \\\n  $URL",
      "curl --httpsig-algo ed25519 --httpsig-key key.hex --httpsig-keyid \"my-key\" --httpsig-headers \"method authority content-type:\" https://example.com"
    ],
    "addedIn": "8.22.0.",
    "seeAlso": [
      "--httpsig-algo",
      "--httpsig-key",
      "--httpsig-keyid"
    ]
  },
  {
    "id": "login-options",
    "name": "--login-options",
    "short": null,
    "arg": "<options>",
    "label": "--login-options <options>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(IMAP LDAP POP3 SMTP) Specify the login options to use during server authentication.",
    "description": "(IMAP LDAP POP3 SMTP) Specify the login options to use during server authentication.\n\nYou can use login options to specify protocol specific options that may be used during authentication. At present only IMAP, POP3 and SMTP support login options. For more information about login options please see RFC 2384, RFC 5092 and the IETF draft https://datatracker.ietf.org/doc/html/draft-earhart-url-smtp-00\n\nSince 8.2.0, IMAP supports the login option \"AUTH=+LOGIN\". With this option, curl uses the plain (not SASL) \"LOGIN IMAP\" command even if the server advertises SASL authentication. Care should be taken in using this option, as it sends your password over the network in plain text. This does not work if the IMAP server disables the plain \"LOGIN\" (e.g. to prevent password snooping).\n\nIf --login-options is provided several times, the last set value is used.\n\nExample:\n\nSee also --user.",
    "choices": [],
    "examples": [
      "curl --login-options 'AUTH=*' imap://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--user"
    ]
  },
  {
    "id": "mail-auth",
    "name": "--mail-auth",
    "short": null,
    "arg": "<address>",
    "label": "--mail-auth <address>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(SMTP) Specify a single address. This is used to specify the authentication address (identity) of a submitted message that is being relayed to another server.",
    "description": "(SMTP) Specify a single address. This is used to specify the authentication address (identity) of a submitted message that is being relayed to another server.\n\nIf --mail-auth is provided several times, the last set value is used.\n\nExample:\n\nSee also --mail-rcpt and --mail-from.",
    "choices": [],
    "examples": [
      "curl --mail-auth user@example.com -T mail smtp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--mail-rcpt",
      "--mail-from"
    ]
  },
  {
    "id": "mail-from",
    "name": "--mail-from",
    "short": null,
    "arg": "<address>",
    "label": "--mail-from <address>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(SMTP) Specify a single address that the given mail should get sent from.",
    "description": "(SMTP) Specify a single address that the given mail should get sent from.\n\nIf --mail-from is provided several times, the last set value is used.\n\nExample:\n\nSee also --mail-rcpt and --mail-auth.",
    "choices": [],
    "examples": [
      "curl --mail-from user@example.com -T mail smtp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--mail-rcpt",
      "--mail-auth"
    ]
  },
  {
    "id": "negotiate",
    "name": "--negotiate",
    "short": null,
    "arg": null,
    "label": "--negotiate",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Enable Negotiate (SPNEGO) authentication.",
    "description": "(HTTP) Enable Negotiate (SPNEGO) authentication.\n\nThis option requires a library built with GSS-API or SSPI support. Use --version to see if your curl supports GSS-API/SSPI or SPNEGO.\n\nWhen using this option, you must also provide a fake --user option to activate the authentication code properly. Sending a '-u :' is enough as the username and password from the --user option are not actually used.\n\nProviding --negotiate multiple times has no extra effect. Disable it again with --no-negotiate.\n\nExample:\n\nSee also --basic, --ntlm, --anyauth and --proxy-negotiate.",
    "choices": [],
    "examples": [
      "curl --negotiate -u : https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--basic",
      "--ntlm",
      "--anyauth",
      "--proxy-negotiate"
    ]
  },
  {
    "id": "netrc",
    "name": "--netrc",
    "short": "-n",
    "arg": null,
    "label": "--netrc",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Make curl scan the .netrc file in the user's home directory for login name and password. This is typically used for FTP on Unix. If used with HTTP, curl enables user authentication. See netrc(5) and ftp(1) for details on the file format. curl does not complain if that file does not have the right permissions (it should be neither world- nor group-readable). The environment variable \"HOME\" is used to find the home directory. If the \"NETRC\" environment variable is set, that filename is used as the netrc file. (Added in 8.16.0)",
    "description": "Make curl scan the .netrc file in the user's home directory for login name and password. This is typically used for FTP on Unix. If used with HTTP, curl enables user authentication. See netrc(5) and ftp(1) for details on the file format. curl does not complain if that file does not have the right permissions (it should be neither world- nor group-readable). The environment variable \"HOME\" is used to find the home directory. If the \"NETRC\" environment variable is set, that filename is used as the netrc file. (Added in 8.16.0)\n\nIf --netrc-file is used, that overrides all other ways to figure out the file.\n\nThe netrc file provides credentials for a hostname independent of which protocol and port number that are used.\n\nOn Windows two filenames in the home directory are checked: .netrc and _netrc, preferring the former. Older versions on Windows checked for _netrc only.\n\nA quick and simple example of how to setup a .netrc to allow curl to access the machine host.example.com with username \"myself\" and password \"secret\" could look similar to:\n\ncurl also supports the \"default\" keyword. This is the same as machine name except that default matches any name. There can be only one \"default\" token, and it must be after all machine tokens.\n\nWhen providing a username in the URL and a .netrc file, curl looks for the password for that specific user for the given host if such an entry appears in the file before a \"generic\" \"machine\" entry without \"login\" specified.\n\nProviding --netrc multiple times has no extra effect. Disable it again with --no-netrc.\n\nExample:\n\nThis option is mutually exclusive with --netrc-file and --netrc-optional. See also --netrc-file, --config and --user.",
    "choices": [],
    "examples": [
      "machine host.example.com\nlogin myself\npassword secret",
      "curl --netrc https://example.com"
    ],
    "addedIn": "8.16.0",
    "seeAlso": [
      "--netrc-file",
      "--netrc-optional",
      "--netrc-file",
      "--config",
      "--user"
    ]
  },
  {
    "id": "netrc-file",
    "name": "--netrc-file",
    "short": null,
    "arg": "<filename>",
    "label": "--netrc-file <filename>",
    "type": "filepath",
    "category": "auth",
    "popularity": 15,
    "summary": "Set the netrc file to use. Similar to --netrc, except that you also provide the path (absolute or relative).",
    "description": "Set the netrc file to use. Similar to --netrc, except that you also provide the path (absolute or relative).\n\nIt abides by --netrc-optional if specified.\n\nIf --netrc-file is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --netrc. See also --netrc, --user and --config.",
    "choices": [],
    "examples": [
      "curl --netrc-file netrc https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--netrc",
      "--netrc",
      "--user",
      "--config"
    ]
  },
  {
    "id": "netrc-optional",
    "name": "--netrc-optional",
    "short": null,
    "arg": null,
    "label": "--netrc-optional",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Similar to --netrc, but this option makes the .netrc usage optional and not mandatory as the --netrc option does.",
    "description": "Similar to --netrc, but this option makes the .netrc usage optional and not mandatory as the --netrc option does.\n\nProviding --netrc-optional multiple times has no extra effect. Disable it again with --no-netrc-optional.\n\nExample:\n\nThis option is mutually exclusive with --netrc. See also --netrc-file.",
    "choices": [],
    "examples": [
      "curl --netrc-optional https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--netrc",
      "--netrc-file"
    ]
  },
  {
    "id": "ntlm-wb",
    "name": "--ntlm-wb",
    "short": null,
    "arg": null,
    "label": "--ntlm-wb",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Deprecated option (added in 8.8.0).",
    "description": "(HTTP) Deprecated option (added in 8.8.0).\n\nEnabled NTLM much in the style --ntlm does, but handed over the authentication to a separate executable that was executed when needed.\n\nProviding --ntlm-wb multiple times has no extra effect.\n\nExample:\n\nSee also --ntlm and --proxy-ntlm.",
    "choices": [],
    "examples": [
      "curl --ntlm-wb -u user:password https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ntlm",
      "--proxy-ntlm"
    ]
  },
  {
    "id": "preproxy",
    "name": "--preproxy",
    "short": null,
    "arg": "<[protocol://]host[:port]>",
    "label": "--preproxy <[protocol://]host[:port]>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "Use the specified SOCKS proxy before connecting to an HTTP or HTTPS --proxy. In such a case curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy. Hence pre proxy.",
    "description": "Use the specified SOCKS proxy before connecting to an HTTP or HTTPS --proxy. In such a case curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy. Hence pre proxy.\n\nThe pre proxy string should be specified with a \"protocol://\" prefix to specify alternative proxy protocols. Use \"socks4://\", \"socks4a://\", \"socks5://\" or \"socks5h://\" to request the specific SOCKS version to be used. No protocol specified makes curl default to SOCKS4.\n\nIf the port number is not specified in the proxy string, it is assumed to be 1080.\n\nUser and password that might be provided in the proxy string are URL decoded by curl. This allows you to pass in special characters such as @ by using %40 or pass in a colon with %3a.\n\nIf --preproxy is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy and --socks5.",
    "choices": [],
    "examples": [
      "curl --preproxy socks5://proxy.example -x http://http.example https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks5"
    ]
  },
  {
    "id": "proxy-anyauth",
    "name": "--proxy-anyauth",
    "short": null,
    "arg": null,
    "label": "--proxy-anyauth",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Automatically pick a suitable authentication method when communicating with the given HTTP proxy. This might cause an extra request/response round-trip.",
    "description": "Automatically pick a suitable authentication method when communicating with the given HTTP proxy. This might cause an extra request/response round-trip.\n\nExample:\n\nSee also --proxy, --proxy-basic and --proxy-digest.",
    "choices": [],
    "examples": [
      "curl --proxy-anyauth --proxy-user user:passwd -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-basic",
      "--proxy-digest"
    ]
  },
  {
    "id": "proxy-basic",
    "name": "--proxy-basic",
    "short": null,
    "arg": null,
    "label": "--proxy-basic",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Use HTTP Basic authentication when communicating with the given proxy. Use --basic for enabling HTTP Basic with a remote host. Basic is the default authentication method curl uses with proxies.",
    "description": "Use HTTP Basic authentication when communicating with the given proxy. Use --basic for enabling HTTP Basic with a remote host. Basic is the default authentication method curl uses with proxies.\n\nProviding --proxy-basic multiple times has no extra effect. Disable it again with --no-proxy-basic.\n\nExample:\n\nSee also --proxy, --proxy-anyauth and --proxy-digest.",
    "choices": [],
    "examples": [
      "curl --proxy-basic --proxy-user user:passwd -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-anyauth",
      "--proxy-digest"
    ]
  },
  {
    "id": "proxy-digest",
    "name": "--proxy-digest",
    "short": null,
    "arg": null,
    "label": "--proxy-digest",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Use HTTP Digest authentication when communicating with the given proxy. Use --digest for enabling HTTP Digest with a remote host.",
    "description": "Use HTTP Digest authentication when communicating with the given proxy. Use --digest for enabling HTTP Digest with a remote host.\n\nProviding --proxy-digest multiple times has no extra effect. Disable it again with --no-proxy-digest.\n\nExample:\n\nSee also --proxy, --proxy-anyauth and --proxy-basic.",
    "choices": [],
    "examples": [
      "curl --proxy-digest --proxy-user user:passwd -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--proxy-anyauth",
      "--proxy-basic"
    ]
  },
  {
    "id": "proxy-http2",
    "name": "--proxy-http2",
    "short": null,
    "arg": null,
    "label": "--proxy-http2",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Negotiate HTTP/2 with an HTTPS proxy. The proxy might still only offer HTTP/1 and then curl sticks to using that version.",
    "description": "(HTTP) Negotiate HTTP/2 with an HTTPS proxy. The proxy might still only offer HTTP/1 and then curl sticks to using that version.\n\nThis has no effect for any other kinds of proxies.\n\nThis option is mutually exclusive with \"--proxy-http3\".\n\nProviding --proxy-http2 multiple times has no extra effect. Disable it again with --no-proxy-http2.\n\nExample:\n\nFor --proxy-http2 to work, it requires that the underlying libcurl is built to support HTTP/2. This option is mutually exclusive with --proxy-http3. Added in 8.1.0. See also --proxy.",
    "choices": [],
    "examples": [
      "curl --proxy-http2 -x proxy https://example.com"
    ],
    "addedIn": "8.1.0.",
    "seeAlso": [
      "--proxy-http2",
      "--proxy-http3",
      "--proxy"
    ]
  },
  {
    "id": "proxy-http3",
    "name": "--proxy-http3",
    "short": null,
    "arg": null,
    "label": "--proxy-http3",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(HTTP) Negotiate HTTP/3 with an HTTPS proxy. Fails to perform the transfer if the given proxy does not support HTTP/3.",
    "description": "(HTTP) Negotiate HTTP/3 with an HTTPS proxy. Fails to perform the transfer if the given proxy does not support HTTP/3.\n\nThis has no effect for any other kinds of proxies.\n\nThis option is mutually exclusive with \"--proxy-http2\".\n\nThis feature is experimental and requires a build with HTTP/3 proxy support enabled. For autotools builds, use \"--enable-proxy-http3\". For CMake builds, use \"-DUSE_PROXY_HTTP3=ON\".\n\nProviding --proxy-http3 multiple times has no extra effect. Disable it again with --no-proxy-http3.\n\nExample:\n\nFor --proxy-http3 to work, it requires that the underlying libcurl is built to support HTTP/3. This option is mutually exclusive with --proxy-http2. Added in 8.21.0. See also --proxy and --proxy-http2.",
    "choices": [],
    "examples": [
      "curl --proxy-http3 -x proxy https://example.com"
    ],
    "addedIn": "8.21.0.",
    "seeAlso": [
      "--proxy-http3",
      "--proxy-http2",
      "--proxy",
      "--proxy-http2"
    ]
  },
  {
    "id": "proxy-negotiate",
    "name": "--proxy-negotiate",
    "short": null,
    "arg": null,
    "label": "--proxy-negotiate",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Use HTTP Negotiate (SPNEGO) authentication when communicating with the given proxy. Use --negotiate for enabling HTTP Negotiate (SPNEGO) with a remote host.",
    "description": "Use HTTP Negotiate (SPNEGO) authentication when communicating with the given proxy. Use --negotiate for enabling HTTP Negotiate (SPNEGO) with a remote host.\n\nProviding --proxy-negotiate multiple times has no extra effect.\n\nExample:\n\nSee also --proxy-anyauth, --proxy-basic and --proxy-service-name.",
    "choices": [],
    "examples": [
      "curl --proxy-negotiate --proxy-user user:passwd -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-anyauth",
      "--proxy-basic",
      "--proxy-service-name"
    ]
  },
  {
    "id": "proxy-ntlm",
    "name": "--proxy-ntlm",
    "short": null,
    "arg": null,
    "label": "--proxy-ntlm",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Use HTTP NTLM authentication when communicating with the given proxy. Use --ntlm for enabling NTLM with a remote host.",
    "description": "Use HTTP NTLM authentication when communicating with the given proxy. Use --ntlm for enabling NTLM with a remote host.\n\nProviding --proxy-ntlm multiple times has no extra effect. Disable it again with --no-proxy-ntlm.\n\nExample:\n\nSee also --proxy-negotiate, --proxy-anyauth and --proxy-user.",
    "choices": [],
    "examples": [
      "curl --proxy-ntlm --proxy-user user:passwd -x http://proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-negotiate",
      "--proxy-anyauth",
      "--proxy-user"
    ]
  },
  {
    "id": "proxy-service-name",
    "name": "--proxy-service-name",
    "short": null,
    "arg": "<name>",
    "label": "--proxy-service-name <name>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "Set the service name for SPNEGO when doing proxy authentication.",
    "description": "Set the service name for SPNEGO when doing proxy authentication.\n\nIf --proxy-service-name is provided several times, the last set value is used.\n\nExample:\n\nSee also --service-name, --proxy and --proxy-negotiate.",
    "choices": [],
    "examples": [
      "curl --proxy-service-name \"shrubbery\" -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--service-name",
      "--proxy",
      "--proxy-negotiate"
    ]
  },
  {
    "id": "sasl-authzid",
    "name": "--sasl-authzid",
    "short": null,
    "arg": "<identity>",
    "label": "--sasl-authzid <identity>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "(LDAP IMAP POP3 SMTP) Use this authorization identity (authzid), during SASL PLAIN authentication, in addition to the authentication identity (authcid) as specified by --user.",
    "description": "(LDAP IMAP POP3 SMTP) Use this authorization identity (authzid), during SASL PLAIN authentication, in addition to the authentication identity (authcid) as specified by --user.\n\nIf the option is not specified, the server derives the authzid from the authcid, but if specified, and depending on the server implementation, it may be used to access another user's inbox, that the user has been granted access to, or a shared mailbox for example.\n\nIf --sasl-authzid is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.66.0. See also --login-options.",
    "choices": [],
    "examples": [
      "curl --sasl-authzid zid imap://example.com/"
    ],
    "addedIn": "7.66.0.",
    "seeAlso": [
      "--login-options"
    ]
  },
  {
    "id": "service-name",
    "name": "--service-name",
    "short": null,
    "arg": "<name>",
    "label": "--service-name <name>",
    "type": "string",
    "category": "auth",
    "popularity": 15,
    "summary": "Set the service name for SPNEGO.",
    "description": "Set the service name for SPNEGO.\n\nIf --service-name is provided several times, the last set value is used.\n\nExample:\n\nSee also --negotiate and --proxy-service-name.",
    "choices": [],
    "examples": [
      "curl --service-name sockd/server https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--negotiate",
      "--proxy-service-name"
    ]
  },
  {
    "id": "socks5-basic",
    "name": "--socks5-basic",
    "short": null,
    "arg": null,
    "label": "--socks5-basic",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "Use username/password authentication when connecting to a SOCKS5 proxy. The username/password authentication is enabled by default. Use --socks5-gssapi to force GSS-API authentication to SOCKS5 proxies.",
    "description": "Use username/password authentication when connecting to a SOCKS5 proxy. The username/password authentication is enabled by default. Use --socks5-gssapi to force GSS-API authentication to SOCKS5 proxies.\n\nProviding --socks5-basic multiple times has no extra effect.\n\nExample:\n\nSee also --socks5.",
    "choices": [],
    "examples": [
      "curl --socks5-basic --socks5 hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--socks5"
    ]
  },
  {
    "id": "socks5-gssapi",
    "name": "--socks5-gssapi",
    "short": null,
    "arg": null,
    "label": "--socks5-gssapi",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(GSS/kerberos) Use GSS-API authentication when connecting to a SOCKS5 proxy. The GSS-API authentication is enabled by default (if curl is compiled with GSS-API support). Use --socks5-basic to force username/password authentication to SOCKS5 proxies.",
    "description": "(GSS/kerberos) Use GSS-API authentication when connecting to a SOCKS5 proxy. The GSS-API authentication is enabled by default (if curl is compiled with GSS-API support). Use --socks5-basic to force username/password authentication to SOCKS5 proxies.\n\nProviding --socks5-gssapi multiple times has no extra effect. Disable it again with --no-socks5-gssapi.\n\nExample:\n\nSee also --socks5.",
    "choices": [],
    "examples": [
      "curl --socks5-gssapi --socks5 hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--socks5"
    ]
  },
  {
    "id": "socks5-gssapi-nec",
    "name": "--socks5-gssapi-nec",
    "short": null,
    "arg": null,
    "label": "--socks5-gssapi-nec",
    "type": "boolean",
    "category": "auth",
    "popularity": 15,
    "summary": "(GSS/kerberos) As part of the GSS-API negotiation a protection mode is negotiated. RFC 1961 says in section 4.3/4.4 it should be protected, but the NEC reference implementation does not. The option --socks5-gssapi-nec allows the unprotected exchange of the protection mode negotiation.",
    "description": "(GSS/kerberos) As part of the GSS-API negotiation a protection mode is negotiated. RFC 1961 says in section 4.3/4.4 it should be protected, but the NEC reference implementation does not. The option --socks5-gssapi-nec allows the unprotected exchange of the protection mode negotiation.\n\nProviding --socks5-gssapi-nec multiple times has no extra effect. Disable it again with --no-socks5-gssapi-nec.\n\nExample:\n\nSee also --socks5.",
    "choices": [],
    "examples": [
      "curl --socks5-gssapi-nec --socks5 hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--socks5"
    ]
  },
  {
    "id": "haproxy-clientip",
    "name": "--haproxy-clientip",
    "short": null,
    "arg": "<ip>",
    "label": "--haproxy-clientip <ip>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "(HTTP) Set a client IP in HAProxy PROXY protocol v1 header at the beginning of the connection.",
    "description": "(HTTP) Set a client IP in HAProxy PROXY protocol v1 header at the beginning of the connection.\n\nFor valid requests, IPv4 addresses must be indicated as a series of exactly 4 integers in the range [0..255] inclusive written in decimal representation separated by exactly one dot between each other. Heading zeroes are not permitted in front of numbers in order to avoid any possible confusion with octal numbers. IPv6 addresses must be indicated as series of 4 hexadecimal digits (upper or lower case) delimited by colons between each other, with the acceptance of one double colon sequence to replace the largest acceptable range of consecutive zeroes. The total number of decoded bits must be exactly 128.\n\nOtherwise, any string can be accepted for the client IP and get sent.\n\nIt replaces --haproxy-protocol if used, it is not necessary to specify both flags.\n\nIf --haproxy-clientip is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.2.0. See also --proxy.",
    "choices": [],
    "examples": [
      "curl --haproxy-clientip $IP"
    ],
    "addedIn": "8.2.0.",
    "seeAlso": [
      "--proxy"
    ]
  },
  {
    "id": "haproxy-protocol",
    "name": "--haproxy-protocol",
    "short": null,
    "arg": null,
    "label": "--haproxy-protocol",
    "type": "boolean",
    "category": "proxy",
    "popularity": 15,
    "summary": "(HTTP) Send a HAProxy PROXY protocol v1 header at the beginning of the connection. This is used by some load balancers and reverse proxies to indicate the client's true IP address and port.",
    "description": "(HTTP) Send a HAProxy PROXY protocol v1 header at the beginning of the connection. This is used by some load balancers and reverse proxies to indicate the client's true IP address and port.\n\nThis option is primarily useful when sending test requests to a service that expects this header.\n\nProviding --haproxy-protocol multiple times has no extra effect. Disable it again with --no-haproxy-protocol.\n\nExample:\n\nSee also --proxy.",
    "choices": [],
    "examples": [
      "curl --haproxy-protocol https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy"
    ]
  },
  {
    "id": "noproxy",
    "name": "--noproxy",
    "short": null,
    "arg": "<no-proxy-list>",
    "label": "No Proxy List (不走代理的域名白名单)",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Comma-separated list of hosts for which not to use a proxy, if one is specified. The only wildcard is a single \"*\" character, which matches all hosts, and effectively disables the proxy. Each name in this list is matched as either a domain which contains the hostname, or the hostname itself. For example, \"local.com\" would match \"local.com\", \"local.com:80\", and \"www.local.com\", but not \"www.notlocal.com\".",
    "description": "Comma-separated list of hosts for which not to use a proxy, if one is specified. The only wildcard is a single \"*\" character, which matches all hosts, and effectively disables the proxy. Each name in this list is matched as either a domain which contains the hostname, or the hostname itself. For example, \"local.com\" would match \"local.com\", \"local.com:80\", and \"www.local.com\", but not \"www.notlocal.com\".\n\nTo use international hostnames in this list, add the punycode version of the hostname.\n\nThis option overrides the environment variables that disable the proxy (\"no_proxy\" and \"NO_PROXY\"). If there is an environment variable disabling a proxy, you can set the no proxy list to \"\" to override it.\n\nIP addresses specified to this option can be provided using CIDR notation (added in 7.86.0): an appended slash and number specifies the number of network bits out of the address to use in the comparison. For example \"192.168.0.0/16\" would match all addresses starting with \"192.168\".\n\nIf --noproxy is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy.",
    "choices": [],
    "examples": [
      "curl --noproxy \"www.example\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy"
    ]
  },
  {
    "id": "proto-default",
    "name": "--proto-default",
    "short": null,
    "arg": "<protocol>",
    "label": "--proto-default <protocol>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use protocol for any provided URL missing a scheme. The case-insensitive name should be given without any \"://\" suffix.",
    "description": "Use protocol for any provided URL missing a scheme. The case-insensitive name should be given without any \"://\" suffix.\n\nAn unknown or unsupported protocol causes error CURLE_UNSUPPORTED_PROTOCOL.\n\nThis option does not change the default proxy protocol (http).\n\nWithout this option set, curl guesses protocol based on the hostname, see --url for details.\n\nThe default protocol cannot be set to \"ipfs\" or \"ipns\". Those schemes need to be used explicitly in the URL.\n\nIf --proto-default is provided several times, the last set value is used.\n\nExample:\n\nSee also --proto and --proto-redir.",
    "choices": [],
    "examples": [
      "curl --proto-default https ftp.example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proto",
      "--proto-redir"
    ]
  },
  {
    "id": "proxy-header",
    "name": "--proxy-header",
    "short": null,
    "arg": "<header/@file>",
    "label": "--proxy-header <header/@file>",
    "type": "filepath",
    "category": "proxy",
    "popularity": 15,
    "summary": "(HTTP) Extra header to include in the request when sending HTTP to a proxy. You may specify any number of extra headers. This is the equivalent option to --header but is for proxy communication only like in CONNECT requests when you want a separate header sent to the proxy to what is sent to the actual remote host.",
    "description": "(HTTP) Extra header to include in the request when sending HTTP to a proxy. You may specify any number of extra headers. This is the equivalent option to --header but is for proxy communication only like in CONNECT requests when you want a separate header sent to the proxy to what is sent to the actual remote host.\n\ncurl makes sure that each header you add/replace is sent with the proper end-of-line marker, you should thus not add that as a part of the header content: do not add newlines or carriage returns, they only mess things up for you.\n\nHeaders specified with this option are not included in requests that curl knows are not to be sent to a proxy.\n\nThis option can take an argument in @filename style, which then adds a header for each line in the input file. Using @- makes curl read the headers from stdin.\n\nThis option can be used multiple times to add/replace/remove multiple headers.\n\n--proxy-header can be used several times in a command line.\n\nExamples:\n\nSee also --proxy and --header.",
    "choices": [],
    "examples": [
      "curl --proxy-header \"X-First-Name: Joe\" -x http://proxy https://example.com\ncurl --proxy-header \"User-Agent: surprise\" -x http://proxy https://example.com\ncurl --proxy-header \"Host:\" -x http://proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--header"
    ]
  },
  {
    "id": "proxy-user",
    "name": "--proxy-user",
    "short": "-U",
    "arg": "<user:password>",
    "label": "Proxy User & Pass (代理服务器认证)",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Specify the username and password to use for proxy authentication.",
    "description": "Specify the username and password to use for proxy authentication.\n\nIf you use a Windows SSPI-enabled curl binary and do either Negotiate or NTLM authentication then you can tell curl to select the username and password from your environment by specifying a single colon with this option: \"-U :\".\n\nOn systems where it works, curl hides the given option argument from process listings. This is not enough to protect credentials from possibly getting seen by other users on the same system as they still are visible for a moment before being cleared. Such sensitive data should be retrieved from a file instead or similar and never used in clear text in a command line.\n\nIf --proxy-user is provided several times, the last set value is used.\n\nExample:\n\nSee also --proxy-pass.",
    "choices": [],
    "examples": [
      "curl --proxy-user smith:secret -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy-pass"
    ]
  },
  {
    "id": "proxy1.0",
    "name": "--proxy1.0",
    "short": null,
    "arg": "<host[:port]>",
    "label": "--proxy1.0 <host[:port]>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use the specified HTTP 1.0 proxy. If the port number is not specified, it is assumed at port 1080.",
    "description": "Use the specified HTTP 1.0 proxy. If the port number is not specified, it is assumed at port 1080.\n\nThe only difference between this and the HTTP proxy option --proxy, is that attempts to use CONNECT through the proxy specifies an HTTP 1.0 protocol instead of the default HTTP 1.1.\n\nProviding --proxy1.0 multiple times has no extra effect.\n\nExample:\n\nSee also --proxy, --socks5 and --preproxy.",
    "choices": [],
    "examples": [
      "curl --proxy1.0 http://proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks5",
      "--preproxy"
    ]
  },
  {
    "id": "proxytunnel",
    "name": "--proxytunnel",
    "short": "-p",
    "arg": null,
    "label": "--proxytunnel",
    "type": "boolean",
    "category": "proxy",
    "popularity": 15,
    "summary": "When an HTTP proxy is used --proxy, this option makes curl tunnel the traffic through the proxy. The tunnel approach is made with the HTTP proxy CONNECT request and requires that the proxy allows direct connection to the remote port number curl wants to tunnel through to.",
    "description": "When an HTTP proxy is used --proxy, this option makes curl tunnel the traffic through the proxy. The tunnel approach is made with the HTTP proxy CONNECT request and requires that the proxy allows direct connection to the remote port number curl wants to tunnel through to.\n\nTo suppress proxy CONNECT response headers when curl is set to output headers use --suppress-connect-headers.\n\nProviding --proxytunnel multiple times has no extra effect. Disable it again with --no-proxytunnel.\n\nExample:\n\nSee also --proxy.",
    "choices": [],
    "examples": [
      "curl --proxytunnel -x http://proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy"
    ]
  },
  {
    "id": "socks4",
    "name": "--socks4",
    "short": null,
    "arg": "<host[:port]>",
    "label": "--socks4 <host[:port]>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use the specified SOCKS4 proxy. If the port number is not specified, it is assumed at port 1080. Using this socket type makes curl resolve the hostname and pass the address on to the proxy.",
    "description": "Use the specified SOCKS4 proxy. If the port number is not specified, it is assumed at port 1080. Using this socket type makes curl resolve the hostname and pass the address on to the proxy.\n\nTo specify the proxy on a Unix domain socket, use localhost for host and append the absolute path to the domain socket. For example: \"socks4://localhost/path/to/socket.sock\" (the scheme may be omitted).\n\nThis option overrides any previous use of --proxy, as they are mutually exclusive.\n\nThis option is superfluous since you can specify a socks4 proxy with --proxy using a \"socks4://\" protocol prefix.\n\n--preproxy can be used to specify a SOCKS proxy at the same time proxy is used with an HTTP/HTTPS proxy. In such a case, curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy.\n\nIf --socks4 is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --proxy, --socks4a, --socks5 and --socks5-hostname. See also --socks4a, --socks5 and --socks5-hostname.",
    "choices": [],
    "examples": [
      "curl --socks4 hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks4a",
      "--socks5",
      "--socks5-hostname",
      "--socks4a",
      "--socks5",
      "--socks5-hostname"
    ]
  },
  {
    "id": "socks4a",
    "name": "--socks4a",
    "short": null,
    "arg": "<host[:port]>",
    "label": "--socks4a <host[:port]>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use the specified SOCKS4a proxy. If the port number is not specified, it is assumed at port 1080. This asks the proxy to resolve the hostname.",
    "description": "Use the specified SOCKS4a proxy. If the port number is not specified, it is assumed at port 1080. This asks the proxy to resolve the hostname.\n\nTo specify the proxy on a Unix domain socket, use localhost for host and append the absolute path to the domain socket. For example: \"socks4a://localhost/path/to/socket.sock\" (the scheme may be omitted).\n\nThis option overrides any previous use of --proxy, as they are mutually exclusive.\n\nThis option is superfluous since you can specify a socks4a proxy with --proxy using a \"socks4a://\" protocol prefix.\n\n--preproxy can be used to specify a SOCKS proxy at the same time --proxy is used with an HTTP/HTTPS proxy. In such a case, curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy.\n\nIf --socks4a is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --proxy, --socks4, --socks5 and --socks5-hostname. See also --socks4, --socks5 and --socks5-hostname.",
    "choices": [],
    "examples": [
      "curl --socks4a hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks4",
      "--socks5",
      "--socks5-hostname",
      "--socks4",
      "--socks5",
      "--socks5-hostname"
    ]
  },
  {
    "id": "socks5",
    "name": "--socks5",
    "short": null,
    "arg": "<host[:port]>",
    "label": "SOCKS5 Proxy (SOCKS5代理)",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use the specified SOCKS5 proxy - but resolve the hostname locally. If the port number is not specified, it is assumed at port 1080.",
    "description": "Use the specified SOCKS5 proxy - but resolve the hostname locally. If the port number is not specified, it is assumed at port 1080.\n\nTo specify the proxy on a Unix domain socket, use localhost for host and append the absolute path to the domain socket. For example: \"socks5://localhost/path/to/socket.sock\" (the scheme may be omitted).\n\nThis option overrides any previous use of --proxy, as they are mutually exclusive.\n\nThis option is superfluous since you can specify a socks5 proxy with --proxy using a \"socks5://\" protocol prefix.\n\n--preproxy can be used to specify a SOCKS proxy at the same time --proxy is used with an HTTP/HTTPS proxy. In such a case, curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy.\n\nThis option does not work with FTPS or LDAP.\n\nIf --socks5 is provided several times, the last set value is used.\n\nExamples:\n\nThis option is mutually exclusive with --proxy, --socks4, --socks4a and --socks5-hostname. See also --socks5-hostname and --socks4a.",
    "choices": [],
    "examples": [
      "curl --socks5 proxy.example:7000 https://example.com\ncurl --socks5 localhost/path/unix-domain https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks4",
      "--socks4a",
      "--socks5-hostname",
      "--socks5-hostname",
      "--socks4a"
    ]
  },
  {
    "id": "socks5-gssapi-service",
    "name": "--socks5-gssapi-service",
    "short": null,
    "arg": "<name>",
    "label": "--socks5-gssapi-service <name>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Set the service name for a socks server. Default is rcmd/server-fqdn.",
    "description": "Set the service name for a socks server. Default is rcmd/server-fqdn.\n\nIf --socks5-gssapi-service is provided several times, the last set value is used.\n\nExample:\n\nSee also --socks5.",
    "choices": [],
    "examples": [
      "curl --socks5-gssapi-service sockd --socks5 hostname:4096 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--socks5"
    ]
  },
  {
    "id": "socks5-hostname",
    "name": "--socks5-hostname",
    "short": null,
    "arg": "<host[:port]>",
    "label": "--socks5-hostname <host[:port]>",
    "type": "string",
    "category": "proxy",
    "popularity": 15,
    "summary": "Use the specified SOCKS5 proxy (and let the proxy resolve the hostname). If the port number is not specified, it is assumed at port 1080.",
    "description": "Use the specified SOCKS5 proxy (and let the proxy resolve the hostname). If the port number is not specified, it is assumed at port 1080.\n\nTo specify the proxy on a Unix domain socket, use localhost for host and append the absolute path to the domain socket. For example: \"socks5h://localhost/path/to/socket.sock\" (the scheme may be omitted).\n\nThis option overrides any previous use of --proxy, as they are mutually exclusive.\n\nThis option is superfluous since you can specify a socks5 hostname proxy with --proxy using a \"socks5h://\" protocol prefix.\n\n--preproxy can be used to specify a SOCKS proxy at the same time --proxy is used with an HTTP/HTTPS proxy. In such a case, curl first connects to the SOCKS proxy and then connects (through SOCKS) to the HTTP or HTTPS proxy.\n\nIf --socks5-hostname is provided several times, the last set value is used.\n\nExample:\n\nThis option is mutually exclusive with --proxy, --socks4, --socks4a and --socks5. See also --socks5 and --socks4a.",
    "choices": [],
    "examples": [
      "curl --socks5-hostname proxy.example:7000 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proxy",
      "--socks4",
      "--socks4a",
      "--socks5",
      "--socks5",
      "--socks4a"
    ]
  },
  {
    "id": "suppress-connect-headers",
    "name": "--suppress-connect-headers",
    "short": null,
    "arg": null,
    "label": "--suppress-connect-headers",
    "type": "boolean",
    "category": "proxy",
    "popularity": 15,
    "summary": "When --proxytunnel is used and a CONNECT request is made, do not output proxy CONNECT response headers. This option is meant to be used with --dump-header or --show-headers which are used to show protocol headers in the output. It has no effect on debug options such as --verbose or --trace, or any statistics.",
    "description": "When --proxytunnel is used and a CONNECT request is made, do not output proxy CONNECT response headers. This option is meant to be used with --dump-header or --show-headers which are used to show protocol headers in the output. It has no effect on debug options such as --verbose or --trace, or any statistics.\n\nProviding --suppress-connect-headers multiple times has no extra effect. Disable it again with --no-suppress-connect-headers.\n\nExample:\n\nSee also --dump-header, --show-headers and --proxytunnel.",
    "choices": [],
    "examples": [
      "curl --suppress-connect-headers --show-headers -x proxy https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--dump-header",
      "--show-headers",
      "--proxytunnel"
    ]
  },
  {
    "id": "unix-socket",
    "name": "--unix-socket",
    "short": null,
    "arg": "<path>",
    "label": "--unix-socket <path>",
    "type": "filepath",
    "category": "proxy",
    "popularity": 15,
    "summary": "(HTTP) Connect to the server through this Unix domain socket, instead of using the network.",
    "description": "(HTTP) Connect to the server through this Unix domain socket, instead of using the network.\n\nTo connect to a proxy over Unix domain socket, see --proxy.\n\nIf --unix-socket is provided several times, the last set value is used.\n\nExample:\n\nSee also --abstract-unix-socket.",
    "choices": [],
    "examples": [
      "curl --unix-socket socket-path https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--abstract-unix-socket"
    ]
  },
  {
    "id": "write-out",
    "name": "--write-out",
    "short": "-w",
    "arg": "<format>",
    "label": "--write-out <format>",
    "type": "choice",
    "category": "proxy",
    "popularity": 15,
    "summary": "Make curl display information on stdout after a completed transfer. The format is a string that may contain plain text mixed with any number of variables. The format can be specified as a literal \"string\", or you can have curl read the format from a file with \"@filename\" and to tell curl to read the format from stdin you write \"@-\".",
    "description": "Make curl display information on stdout after a completed transfer. The format is a string that may contain plain text mixed with any number of variables. The format can be specified as a literal \"string\", or you can have curl read the format from a file with \"@filename\" and to tell curl to read the format from stdin you write \"@-\".\n\nThe variables present in the output format are substituted by the value or text that curl thinks fit, as described below. All variables are specified as %{variable_name} and to output a normal % you write them as %%. You can output a newline by using \\n, a carriage return with \\r and a tab space with \\t.\n\nThe output is by default written to standard output, but can be changed with %{stderr} and %output{}.\n\nOutput HTTP header values from the transfer's most recent server response by using %header{name} where name is the case insensitive name of the header (without the trailing colon). The header contents are exactly as delivered over the network but with leading and trailing whitespace and newlines stripped off (added in 7.84.0).\n\nSelect a specific target destination file to write the output to, by using %output{name} (added in curl 8.3.0) where name is the full filename. The output following that instruction is then written to that file. More than one %output{} instruction can be specified in the same write-out argument. If the filename cannot be created, curl leaves the output destination to the one used prior to the %output{} instruction. Use %output{>>name} to append data to an existing file.\n\nThis output is done independently of if the file transfer was successful or not.\n\nIf the specified action or output specified with this option fails in any way, it does not make curl return a (different) error.\n\nNOTE: On Windows, the %-symbol is a special symbol used to expand environment variables. In batch files, all occurrences of % must be doubled when using this option to properly escape. If this option is used at the command prompt then the % cannot be escaped and unintended expansion is possible.\n\nThe variables available are:\n\nhttp_code\n\nThe numerical response code that was found in the last retrieved HTTP(S) or FTP(s) transfer.\n\nhttp_connect\n\nThe numerical code that was found in the last response (from a proxy) to a curl CONNECT request.\n\nhttp_version\n\nThe http version that was effectively used.\n\nTIME OUTPUT FORMAT\n\nTo show time with \"%time{}\" the characters within \"{}\" create a special format string that may contain special character sequences called conversion specifications. Each conversion specification starts with \"%\" and is followed by a character that instructs curl to output a particular time detail. All other characters used are displayed as-is.\n\nThe following conversion specification are available:\n\nIf --write-out is provided several times, the last set value is used.\n\nExample:\n\nSee also --verbose and --head.",
    "choices": [
      {
        "value": "certs",
        "desc": "Output the certificate chain with details. Supported only by the OpenSSL, GnuTLS, Schannel and Rustls backends. (Added in 7.88.0)"
      },
      {
        "value": "conn_id",
        "desc": "The connection identifier last used by the transfer. The connection id is unique number among all connections using the same connection cache. (Added in 8.2.0)"
      },
      {
        "value": "content_type",
        "desc": "The Content-Type of the requested document, if there was any."
      },
      {
        "value": "errormsg",
        "desc": "The error message. (Added in 7.75.0)"
      },
      {
        "value": "exitcode",
        "desc": "The numerical exit code of the transfer. (Added in 7.75.0)"
      },
      {
        "value": "filename_effective",
        "desc": "The ultimate filename that curl writes out to. This is only meaningful if curl is told to write to a file with the --remote-name or --output option. It is most useful in combination with the --remote-header-name option."
      },
      {
        "value": "ftp_entry_path",
        "desc": "The initial path curl ended up in when logging on to the remote FTP server."
      },
      {
        "value": "header{name}",
        "desc": "The value of header \"name\" from the transfer's most recent server response. Unlike other variables, the variable name \"header\" is not in braces. For example \"%header{date}\". Refer to --write-out remarks. (Added in 7.84.0) Starting with 8.17.0, output the contents of all header fields using a specific name - even for a whole redirect \"chain\" by appending \":all:[separator]\" to the header name. The \"[separator]\" string (if not blank) is output between the headers if there are more than one. When more than one header is shown, they are output in the chronological order of appearance over the wire. To include a close brace (\"}\") in the separator, escape it with a backslash: \"\\}\"."
      },
      {
        "value": "header_json",
        "desc": "A JSON object with all HTTP response headers from the recent transfer. Values are provided as arrays, since in the case of multiple headers there can be multiple values. (Added in 7.83.0) The header names provided in lowercase, listed in order of appearance over the wire. Except for duplicated headers. They are grouped on the first occurrence of that header, each value is presented in the JSON array."
      },
      {
        "value": "json",
        "desc": "A JSON object with all available keys except \"header_json\". (Added in 7.70.0)"
      },
      {
        "value": "local_ip",
        "desc": "The IP address of the local end of the most recently done connection - can be either IPv4 or IPv6."
      },
      {
        "value": "local_port",
        "desc": "The local port number of the most recently done connection."
      },
      {
        "value": "method",
        "desc": "The http method used in the most recent HTTP request. (Added in 7.72.0)"
      },
      {
        "value": "num_certs",
        "desc": "Number of server certificates received in the TLS handshake. Supported only by the OpenSSL, GnuTLS, Schannel and Rustls backends. (Added in 7.88.0)"
      },
      {
        "value": "num_connects",
        "desc": "Number of new connects made in the recent transfer."
      },
      {
        "value": "num_headers",
        "desc": "The number of response headers in the most recent request (restarted at each redirect). Note that the status line IS NOT a header. (Added in 7.73.0)"
      },
      {
        "value": "num_redirects",
        "desc": "Number of redirects that were followed in the request."
      },
      {
        "value": "num_retries",
        "desc": "Number of retries actually performed when \"--retry\" has been used. (Added in 8.9.0)"
      },
      {
        "value": "onerror",
        "desc": "The rest of the output is only shown if the transfer returned a non-zero error. (Added in 7.75.0)"
      },
      {
        "value": "output{filename}",
        "desc": "From this point on, the --write-out output is written to the filename specified in braces. The filename can be prefixed with \">>\" to append to the file. Unlike other variables, the variable name \"output\" is not in braces. For example \"%output{>>stats.txt}\". Refer to --write-out remarks. (Added in 8.3.0)"
      },
      {
        "value": "proxy_ssl_verify_result",
        "desc": "The result of the HTTPS proxy's SSL peer certificate verification that was requested. 0 means the verification was successful."
      },
      {
        "value": "proxy_used",
        "desc": "Returns 1 if the previous transfer used a proxy, otherwise 0. Useful for example to determine if a \"NOPROXY\" pattern matched the hostname or not. (Added in 8.7.0)"
      },
      {
        "value": "redirect_url",
        "desc": "When an HTTP request was made without --location to follow redirects (or when --max-redirs is met), this variable shows the actual URL a redirect would have gone to."
      },
      {
        "value": "referer",
        "desc": "The Referer: header, if there was any. (Added in 7.76.0)"
      },
      {
        "value": "remote_ip",
        "desc": "The remote IP address of the most recently done connection - can be either IPv4 or IPv6."
      },
      {
        "value": "remote_port",
        "desc": "The remote port number of the most recently done connection."
      },
      {
        "value": "response_code",
        "desc": "The numerical response code that was found in the last transfer (formerly known as \"http_code\")."
      },
      {
        "value": "scheme",
        "desc": "The URL scheme (sometimes called protocol) that was effectively used."
      },
      {
        "value": "size_delivered",
        "desc": "The total amount of data that were saved or written to stdout. When --compressed is used, this is likely different than \"size_download\". Includes the headers in the count if --include is used."
      },
      {
        "value": "size_download",
        "desc": "The total amount of bytes that were downloaded. This is the size of the body/data that was transferred, excluding headers."
      },
      {
        "value": "size_header",
        "desc": "The total amount of bytes of the downloaded headers, as represented in HTTP/1-style header format."
      },
      {
        "value": "size_request",
        "desc": "The total amount of bytes that were sent in the HTTP request."
      },
      {
        "value": "size_upload",
        "desc": "The total amount of bytes that were uploaded. This is the size of the body/data that was transferred, excluding headers."
      },
      {
        "value": "speed_download",
        "desc": "The average download speed that curl measured for the complete download. Bytes per second."
      },
      {
        "value": "speed_upload",
        "desc": "The average upload speed that curl measured for the complete upload. Bytes per second."
      },
      {
        "value": "ssl_verify_result",
        "desc": "The result of the SSL peer certificate verification that was requested. 0 means the verification was successful."
      },
      {
        "value": "stderr",
        "desc": "From this point on, the --write-out output is written to standard error."
      },
      {
        "value": "stdout",
        "desc": "From this point on, the --write-out output is written to standard output. This is the default, but can be used to switch back after switching to stderr."
      },
      {
        "value": "time{format}",
        "desc": "Output the current UTC time using \"strftime()\" format. See TIME OUTPUT FORMAT below for details. (Added in 8.16.0)"
      },
      {
        "value": "time_appconnect",
        "desc": "The time, in seconds, it took from the start until the SSL/SSH/etc connect/handshake to the remote host was completed."
      },
      {
        "value": "time_connect",
        "desc": "The time, in seconds, it took from the start until the TCP connect to the remote host (or proxy) was completed."
      },
      {
        "value": "time_namelookup",
        "desc": "The time, in seconds, it took from the start until the name resolving was completed."
      },
      {
        "value": "time_posttransfer",
        "desc": "The time, in seconds, it took from the start until the last byte is sent by libcurl. (Added in 8.10.0)"
      },
      {
        "value": "time_pretransfer",
        "desc": "The time, in seconds, it took from the start until immediately before the file transfer was about to begin. This includes all pre-transfer commands and negotiations that are specific to the particular protocol(s) involved."
      },
      {
        "value": "time_queue",
        "desc": "The time, in seconds, the transfer was queued during its run. This adds the queue time for each redirect step that may have happened. Transfers may be queued for significant amounts of time when connection or parallel limits are in place. (Added in 8.12.0)"
      },
      {
        "value": "time_redirect",
        "desc": "The time, in seconds, it took for all redirection steps including name lookup, connect, pretransfer and transfer before the final transaction was started. \"time_redirect\" shows the complete execution time for multiple redirections."
      },
      {
        "value": "time_starttransfer",
        "desc": "The time, in seconds, it took from the start until the first byte was received. This includes time_pretransfer and also the time the server needed to calculate the result."
      },
      {
        "value": "time_total",
        "desc": "The total time, in seconds, that the full operation lasted."
      },
      {
        "value": "tls_earlydata",
        "desc": "The amount of bytes that were sent as TLSv1.3 early data. This is 0 if this TLS feature was not used and negative if the data sent had been rejected by the server. The use of early data is enabled via the command line option \"--tls-earlydata\". (Added in 8.13.0)"
      },
      {
        "value": "url",
        "desc": "The URL that was fetched. (Added in 7.75.0)"
      },
      {
        "value": "url.scheme",
        "desc": "The scheme part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.user",
        "desc": "The user part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.password",
        "desc": "The password part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.options",
        "desc": "The options part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.host",
        "desc": "The host part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.port",
        "desc": "The port number of the URL that was fetched. If no port number was specified and the URL scheme is known, that scheme's default port number is shown. (Added in 8.1.0)"
      },
      {
        "value": "url.path",
        "desc": "The path part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.query",
        "desc": "The query part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.fragment",
        "desc": "The fragment part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "url.zoneid",
        "desc": "The zone id part of the URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.scheme",
        "desc": "The scheme part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.user",
        "desc": "The user part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.password",
        "desc": "The password part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.options",
        "desc": "The options part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.host",
        "desc": "The host part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.port",
        "desc": "The port number of the effective (last) URL that was fetched. If no port number was specified, but the URL scheme is known, that scheme's default port number is shown. (Added in 8.1.0)"
      },
      {
        "value": "urle.path",
        "desc": "The path part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.query",
        "desc": "The query part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.fragment",
        "desc": "The fragment part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urle.zoneid",
        "desc": "The zone id part of the effective (last) URL that was fetched. (Added in 8.1.0)"
      },
      {
        "value": "urlnum",
        "desc": "The URL index number of this transfer, 0-indexed. Unglobbed URLs share the same index number as the origin globbed URL. (Added in 7.75.0)"
      },
      {
        "value": "url_effective",
        "desc": "The URL that was fetched last. This is most meaningful if you have told curl to follow location: headers."
      },
      {
        "value": "xfer_id",
        "desc": "The numerical identifier of the last transfer done. -1 if no transfer has been started yet for the handle. The transfer id is unique among all transfers performed using the same connection cache. (Added in 8.2.0)"
      },
      {
        "value": "%a",
        "desc": "The abbreviated name of the day of the week according to the current locale."
      },
      {
        "value": "%A",
        "desc": "The full name of the day of the week according to the current locale."
      },
      {
        "value": "%b",
        "desc": "The abbreviated month name according to the current locale."
      },
      {
        "value": "%B",
        "desc": "The full month name according to the current locale."
      },
      {
        "value": "%c",
        "desc": "The preferred date and time representation for the current locale. (In the POSIX locale this is equivalent to \"%a %b %e %H:%M:%S %Y\".)"
      },
      {
        "value": "%C",
        "desc": "The century number (year/100) as a 2-digit integer."
      },
      {
        "value": "%d",
        "desc": "The day of the month as a decimal number (range 01 to 31)."
      },
      {
        "value": "%D",
        "desc": "Equivalent to \"%m/%d/%y\". In international contexts, this format is ambiguous and should be avoided.)"
      },
      {
        "value": "%e",
        "desc": "Like \"%d\", the day of the month as a decimal number, but a leading zero is replaced by a space."
      },
      {
        "value": "%f",
        "desc": "The number of microseconds elapsed of the current second. (This a curl special code and not a standard one.)"
      },
      {
        "value": "%F",
        "desc": "Equivalent to \"%Y-%m-%d\" (the ISO 8601 date format)."
      },
      {
        "value": "%G",
        "desc": "The ISO 8601 week-based year with century as a decimal number. The 4-digit year corresponding to the ISO week number (see \"%V\"). This has the same format and value as \"%Y\", except that if the ISO week number belongs to the previous or next year, that year is used instead."
      },
      {
        "value": "%g",
        "desc": "Like \"%G\", but without century, that is, with a 2-digit year (00-99)."
      },
      {
        "value": "%h",
        "desc": "Equivalent to \"%b\"."
      },
      {
        "value": "%H",
        "desc": "The hour as a decimal number using a 24-hour clock (range 00 to 23)."
      },
      {
        "value": "%I",
        "desc": "The hour as a decimal number using a 12-hour clock (range 01 to 12)."
      },
      {
        "value": "%j",
        "desc": "The day of the year as a decimal number (range 001 to 366)."
      },
      {
        "value": "%k",
        "desc": "The hour (24-hour clock) as a decimal number (range 0 to 23); single digits are preceded by a blank."
      },
      {
        "value": "%l",
        "desc": "The hour (12-hour clock) as a decimal number (range 1 to 12); single digits are preceded by a blank."
      },
      {
        "value": "%m",
        "desc": "The month as a decimal number (range 01 to 12)."
      },
      {
        "value": "%M",
        "desc": "The minute as a decimal number (range 00 to 59)."
      },
      {
        "value": "%p",
        "desc": "Either \"AM\" or \"PM\" according to the given time value, or the corresponding strings for the current locale. Noon is treated as \"PM\" and midnight as \"AM\"."
      },
      {
        "value": "%P",
        "desc": "Like \"%p\" but in lowercase: \"am\" or \"pm\" or a corresponding string for the current locale."
      },
      {
        "value": "%r",
        "desc": "The time in am or pm notation."
      },
      {
        "value": "%R",
        "desc": "The time in 24-hour notation (\"%H:%M\"). For a version including the seconds, see \"%T\" below."
      },
      {
        "value": "%s",
        "desc": "The number of seconds since the Epoch, 1970-01-01 00:00:00 +0000 (UTC)."
      },
      {
        "value": "%S",
        "desc": "The second as a decimal number (range 00 to 60). (The range is up to 60 to allow for occasional leap seconds.) See \"%f\" for microseconds."
      },
      {
        "value": "%T",
        "desc": "The time in 24-hour notation (\"%H:%M:%S\")."
      },
      {
        "value": "%u",
        "desc": "The day of the week as a decimal, range 1 to 7, Monday being 1."
      },
      {
        "value": "%U",
        "desc": "The week number of the current year as a decimal number, range 00 to 53, starting with the first Sunday as the first day of week 01. See also \"%V\" and \"%W\"."
      },
      {
        "value": "%V",
        "desc": "The ISO 8601 week number (see NOTES) of the current year as a decimal number, range 01 to 53, where week 1 is the first week that has at least 4 days in the new year. See also \"%U\" and \"%W\"."
      },
      {
        "value": "%w",
        "desc": "The day of the week as a decimal, range 0 to 6, Sunday being 0. See also \"%u\"."
      },
      {
        "value": "%W",
        "desc": "The week number of the current year as a decimal number, range 00 to 53, starting with the first Monday as the first day of week 01."
      },
      {
        "value": "%x",
        "desc": "The preferred date representation for the current locale without the time."
      },
      {
        "value": "%X",
        "desc": "The preferred time representation for the current locale without the date."
      },
      {
        "value": "%y",
        "desc": "The year as a decimal number without a century (range 00 to 99)."
      },
      {
        "value": "%Y",
        "desc": "The year as a decimal number including the century."
      },
      {
        "value": "%z",
        "desc": "The \"+hhmm\" or \"-hhmm\" numeric timezone (that is, the hour and minute offset from UTC). As time is always UTC, this outputs \"+0000\"."
      },
      {
        "value": "%Z",
        "desc": "The timezone name. For some reason \"GMT\"."
      },
      {
        "value": "%%",
        "desc": "A literal \"%\" character."
      }
    ],
    "examples": [
      "curl -w '%{response_code}\\n' https://example.com"
    ],
    "addedIn": "8.2.0",
    "seeAlso": [
      "--verbose",
      "--head"
    ]
  },
  {
    "id": "abstract-unix-socket",
    "name": "--abstract-unix-socket",
    "short": null,
    "arg": "<path>",
    "label": "--abstract-unix-socket <path>",
    "type": "filepath",
    "category": "protocol",
    "popularity": 15,
    "summary": "(HTTP) Connect to the server through an abstract Unix domain socket, instead of using the network. Note: netstat shows the path of an abstract socket prefixed with \"@\", however the <path> argument should not have this leading character.",
    "description": "(HTTP) Connect to the server through an abstract Unix domain socket, instead of using the network. Note: netstat shows the path of an abstract socket prefixed with \"@\", however the <path> argument should not have this leading character.\n\nIf --abstract-unix-socket is provided several times, the last set value is used.\n\nExample:\n\nSee also --unix-socket.",
    "choices": [],
    "examples": [
      "curl --abstract-unix-socket socketpath https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--unix-socket"
    ]
  },
  {
    "id": "create-file-mode",
    "name": "--create-file-mode",
    "short": null,
    "arg": "<mode>",
    "label": "--create-file-mode <mode>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(SFTP SCP FILE) When curl is used to create files remotely using one of the supported protocols, this option allows the user to set which 'mode' to set on the file at creation time, instead of the default 0644.",
    "description": "(SFTP SCP FILE) When curl is used to create files remotely using one of the supported protocols, this option allows the user to set which 'mode' to set on the file at creation time, instead of the default 0644.\n\nThis option takes an octal number as argument.\n\nIf --create-file-mode is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.75.0. See also --ftp-create-dirs.",
    "choices": [],
    "examples": [
      "curl --create-file-mode 0777 -T localfile sftp://example.com/new"
    ],
    "addedIn": "7.75.0.",
    "seeAlso": [
      "--ftp-create-dirs"
    ]
  },
  {
    "id": "crlf",
    "name": "--crlf",
    "short": null,
    "arg": null,
    "label": "--crlf",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP SMTP) Convert line feeds to carriage return plus line feeds in upload. Useful for MVS (OS/390).",
    "description": "(FTP SMTP) Convert line feeds to carriage return plus line feeds in upload. Useful for MVS (OS/390).\n\nProviding --crlf multiple times has no extra effect. Disable it again with --no-crlf.\n\nExample:\n\nSee also --use-ascii.",
    "choices": [],
    "examples": [
      "curl --crlf -T file ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--use-ascii"
    ]
  },
  {
    "id": "form-escape",
    "name": "--form-escape",
    "short": null,
    "arg": null,
    "label": "--form-escape",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(HTTP IMAP SMTP) Pass on names of multipart form fields and files using backslash-escaping instead of percent-encoding.",
    "description": "(HTTP IMAP SMTP) Pass on names of multipart form fields and files using backslash-escaping instead of percent-encoding.\n\nIf --form-escape is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.81.0. See also --form.",
    "choices": [],
    "examples": [
      "curl --form-escape -F 'field\\name=curl' -F 'file=@load\"this' https://example.com"
    ],
    "addedIn": "7.81.0.",
    "seeAlso": [
      "--form"
    ]
  },
  {
    "id": "form-string",
    "name": "--form-string",
    "short": null,
    "arg": "<name=string>",
    "label": "--form-string <name=string>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(HTTP SMTP IMAP) Similar to --form except that the value string for the named parameter is used literally. Leading @ and < characters, and the \";type=\" string in the value have no special meaning. Use this in preference to --form if there is any possibility that the string value may accidentally trigger the @ or < features of --form.",
    "description": "(HTTP SMTP IMAP) Similar to --form except that the value string for the named parameter is used literally. Leading @ and < characters, and the \";type=\" string in the value have no special meaning. Use this in preference to --form if there is any possibility that the string value may accidentally trigger the @ or < features of --form.\n\n--form-string can be used several times in a command line.\n\nExample:\n\nSee also --form.",
    "choices": [],
    "examples": [
      "curl --form-string \"name=data\" https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--form"
    ]
  },
  {
    "id": "ftp-method",
    "name": "--ftp-method",
    "short": null,
    "arg": "<method>",
    "label": "FTP CWD Method (FTP目录获取方式)",
    "type": "choice",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP) Control what method curl should use to reach a file on an FTP(S) server. The method argument should be one of the following alternatives:",
    "description": "(FTP) Control what method curl should use to reach a file on an FTP(S) server. The method argument should be one of the following alternatives:\n\nIf --ftp-method is provided several times, the last set value is used.\n\nExamples:\n\nSee also --list-only.",
    "choices": [
      {
        "value": "multicwd",
        "desc": "Do a single CWD operation for each path part in the given URL. For deep hierarchies this means many commands. This is how RFC 1738 says it should be done. This is the default but the slowest behavior."
      },
      {
        "value": "nocwd",
        "desc": "Do no CWD at all. curl does SIZE, RETR, STOR etc and gives the full path to the server for each of these commands. This is the fastest behavior."
      },
      {
        "value": "singlecwd",
        "desc": "Do one CWD with the full target directory and then operate on the file \"normally\" (like in the multicwd case). This is somewhat more standards compliant than \"nocwd\" but without the full penalty of \"multicwd\"."
      }
    ],
    "examples": [
      "curl --ftp-method multicwd ftp://example.com/dir1/dir2/file\ncurl --ftp-method nocwd ftp://example.com/dir1/dir2/file\ncurl --ftp-method singlecwd ftp://example.com/dir1/dir2/file"
    ],
    "addedIn": null,
    "seeAlso": [
      "--list-only"
    ]
  },
  {
    "id": "ftp-pasv",
    "name": "--ftp-pasv",
    "short": null,
    "arg": null,
    "label": "--ftp-pasv",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP) Use passive mode for the data connection. Passive is the internal default behavior, but using this option can be used to override a previous --ftp-port option.",
    "description": "(FTP) Use passive mode for the data connection. Passive is the internal default behavior, but using this option can be used to override a previous --ftp-port option.\n\nReversing an enforced passive really is not doable but you must then instead enforce the correct --ftp-port again.\n\nPassive mode means that curl tries the EPSV command first and then PASV, unless --disable-epsv is used.\n\nProviding --ftp-pasv multiple times has no extra effect.\n\nExample:\n\nThis option is mutually exclusive with --ftp-port. See also --disable-epsv.",
    "choices": [],
    "examples": [
      "curl --ftp-pasv ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-port",
      "--disable-epsv"
    ]
  },
  {
    "id": "ftp-skip-pasv-ip",
    "name": "--ftp-skip-pasv-ip",
    "short": null,
    "arg": null,
    "label": "--ftp-skip-pasv-ip",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP) Do not use the IP address the server suggests in its response to curl's PASV command when curl connects the data connection. Instead curl reuses the same IP address it already uses for the control connection.",
    "description": "(FTP) Do not use the IP address the server suggests in its response to curl's PASV command when curl connects the data connection. Instead curl reuses the same IP address it already uses for the control connection.\n\nThis option is enabled by default (added in 7.74.0).\n\nThis option has no effect if PORT, EPRT or EPSV is used instead of PASV.\n\nProviding --ftp-skip-pasv-ip multiple times has no extra effect. Disable it again with --no-ftp-skip-pasv-ip.\n\nExample:\n\nSee also --ftp-pasv.",
    "choices": [],
    "examples": [
      "curl --ftp-skip-pasv-ip ftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--ftp-pasv"
    ]
  },
  {
    "id": "hostpubmd5",
    "name": "--hostpubmd5",
    "short": null,
    "arg": "<md5>",
    "label": "--hostpubmd5 <md5>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(SFTP SCP) Pass a string containing 32 hexadecimal digits. The string should be the 128 bit MD5 checksum of the remote host's public key, curl refuses the connection with the host unless the checksums match.",
    "description": "(SFTP SCP) Pass a string containing 32 hexadecimal digits. The string should be the 128 bit MD5 checksum of the remote host's public key, curl refuses the connection with the host unless the checksums match.\n\nIf --hostpubmd5 is provided several times, the last set value is used.\n\nExample:\n\nSee also --hostpubsha256.",
    "choices": [],
    "examples": [
      "curl --hostpubmd5 e5c1c49020640a5ab0f2034854c321a8 sftp://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--hostpubsha256"
    ]
  },
  {
    "id": "hostpubsha256",
    "name": "--hostpubsha256",
    "short": null,
    "arg": "<sha256>",
    "label": "--hostpubsha256 <sha256>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(SFTP SCP) Pass a string containing a Base64-encoded SHA256 hash of the remote host's public key. curl refuses the connection with the host unless the hashes match.",
    "description": "(SFTP SCP) Pass a string containing a Base64-encoded SHA256 hash of the remote host's public key. curl refuses the connection with the host unless the hashes match.\n\nIf --hostpubsha256 is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.80.0. See also --hostpubmd5.",
    "choices": [],
    "examples": [
      "curl --hostpubsha256 NDVkMTQxMGQ1ODdmMjQ3MjczYjAyOTY5MmRkMjVmNDQ= sftp://example.com/"
    ],
    "addedIn": "7.80.0.",
    "seeAlso": [
      "--hostpubmd5"
    ]
  },
  {
    "id": "list-only",
    "name": "--list-only",
    "short": "-l",
    "arg": null,
    "label": "--list-only",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP POP3 SFTP FILE) When listing an FTP directory, force a name-only view. Maybe particularly useful if the user wants to machine-parse the contents of an FTP directory since the normal directory view does not use a standard look or format. When used like this, the option causes an NLST command to be sent to the server instead of LIST.",
    "description": "(FTP POP3 SFTP FILE) When listing an FTP directory, force a name-only view. Maybe particularly useful if the user wants to machine-parse the contents of an FTP directory since the normal directory view does not use a standard look or format. When used like this, the option causes an NLST command to be sent to the server instead of LIST.\n\nNote: Some FTP servers list only files in their response to NLST; they do not include subdirectories and symbolic links.\n\nWhen listing an SFTP directory, this switch forces a name-only view, one per line. This is especially useful if the user wants to machine-parse the contents of an SFTP directory since the normal directory view provides more information than filenames.\n\nWhen retrieving a specific email from POP3, this switch forces a LIST command to be performed instead of RETR. This is particularly useful if the user wants to see if a specific message-id exists on the server and what size it is.\n\nFor FILE, this option has no effect yet as directories are always listed in this mode.\n\nNote: When combined with --request, this option can be used to send a UIDL command instead, so the user may use the email's unique identifier rather than its message-id to make the request.\n\nProviding --list-only multiple times has no extra effect. Disable it again with --no-list-only.\n\nExample:\n\nSee also --quote and --request.",
    "choices": [],
    "examples": [
      "curl --list-only ftp://example.com/dir/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--quote",
      "--request"
    ]
  },
  {
    "id": "proto",
    "name": "--proto",
    "short": null,
    "arg": "<protocols>",
    "label": "--proto <protocols>",
    "type": "choice",
    "category": "protocol",
    "popularity": 15,
    "summary": "Limit what protocols to allow for transfers. Protocols are evaluated left to right, are comma separated, and are each a protocol name or 'all', optionally prefixed by a modifier. Available modifiers are:",
    "description": "Limit what protocols to allow for transfers. Protocols are evaluated left to right, are comma separated, and are each a protocol name or 'all', optionally prefixed by a modifier. Available modifiers are:\n\n-\n\nDeny this protocol, removing it from the list of protocols already permitted.\n\nFor example: --proto -ftps uses the default protocols, but disables ftps\n\n--proto -all,https,+http only enables http and https\n\n--proto =http,https also only enables http and https\n\nUnknown and disabled protocols produce a warning. This allows scripts to safely rely on being able to disable potentially dangerous protocols, without relying upon support for that protocol being built into curl to avoid an error.\n\nThis option can be used multiple times, in which case the effect is the same as concatenating the protocols into one instance of the option.\n\nIf --proto is provided several times, the last set value is used.\n\nExample:\n\nSee also --proto-redir and --proto-default.",
    "choices": [
      {
        "value": "+",
        "desc": "Permit this protocol in addition to protocols already permitted (this is the default if no modifier is used)."
      },
      {
        "value": "=",
        "desc": "Permit only this protocol (ignoring the list already permitted), though subject to later modification by subsequent entries in the comma separated list."
      }
    ],
    "examples": [
      "curl --proto =http,https,sftp https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proto-redir",
      "--proto-default"
    ]
  },
  {
    "id": "proto-redir",
    "name": "--proto-redir",
    "short": null,
    "arg": "<protocols>",
    "label": "--proto-redir <protocols>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "Limit what protocols to allow on redirects. Protocols denied by --proto are not overridden by this option. See --proto for how protocols are represented.",
    "description": "Limit what protocols to allow on redirects. Protocols denied by --proto are not overridden by this option. See --proto for how protocols are represented.\n\nExample, allow only HTTP and HTTPS on redirect:\n\nBy default curl only allows HTTP, HTTPS, FTP and FTPS on redirects . Specifying all or +all enables all protocols on redirects, which is not good for security.\n\nIf --proto-redir is provided several times, the last set value is used.\n\nExample:\n\nSee also --proto and --follow.",
    "choices": [],
    "examples": [
      "curl --proto-redir -all,http,https --follow http://example.com",
      "curl --proto-redir =http,https --follow https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proto",
      "--follow"
    ]
  },
  {
    "id": "telnet-option",
    "name": "--telnet-option",
    "short": "-t",
    "arg": "<opt=val>",
    "label": "--telnet-option <opt=val>",
    "type": "choice",
    "category": "protocol",
    "popularity": 15,
    "summary": "(TELNET) Pass options to the telnet protocol. Supported options are:",
    "description": "(TELNET) Pass options to the telnet protocol. Supported options are:\n\n--telnet-option can be used several times in a command line.\n\nExample:\n\nSee also --config.",
    "choices": [
      {
        "value": "TTYPE=<term>",
        "desc": "Sets the terminal type."
      },
      {
        "value": "XDISPLOC=<X display>",
        "desc": "Sets the X display location."
      },
      {
        "value": "NEW_ENV=<var,val>",
        "desc": "Sets an environment variable."
      }
    ],
    "examples": [
      "curl -t TTYPE=vt100 telnet://example.com/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--config"
    ]
  },
  {
    "id": "tftp-blksize",
    "name": "--tftp-blksize",
    "short": null,
    "arg": "<value>",
    "label": "--tftp-blksize <value>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(TFTP) Set the TFTP BLKSIZE option (must be 512 or larger). This is the block size that curl tries to use when transferring data to or from a TFTP server. By default 512 bytes are used.",
    "description": "(TFTP) Set the TFTP BLKSIZE option (must be 512 or larger). This is the block size that curl tries to use when transferring data to or from a TFTP server. By default 512 bytes are used.\n\nIf --tftp-blksize is provided several times, the last set value is used.\n\nExample:\n\nSee also --tftp-no-options.",
    "choices": [],
    "examples": [
      "curl --tftp-blksize 1024 tftp://example.com/file"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tftp-no-options"
    ]
  },
  {
    "id": "tftp-no-options",
    "name": "--tftp-no-options",
    "short": null,
    "arg": null,
    "label": "--tftp-no-options",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(TFTP) Do not send TFTP options requests. This improves interop with some legacy servers that do not acknowledge or properly implement TFTP options. When this option is used --tftp-blksize is ignored.",
    "description": "(TFTP) Do not send TFTP options requests. This improves interop with some legacy servers that do not acknowledge or properly implement TFTP options. When this option is used --tftp-blksize is ignored.\n\nProviding --tftp-no-options multiple times has no extra effect. Disable it again with --no-tftp-no-options.\n\nExample:\n\nSee also --tftp-blksize.",
    "choices": [],
    "examples": [
      "curl --tftp-no-options tftp://192.168.0.1/"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tftp-blksize"
    ]
  },
  {
    "id": "upload-flags",
    "name": "--upload-flags",
    "short": null,
    "arg": "<flags>",
    "label": "--upload-flags <flags>",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(IMAP) Specify additional behavior to apply to uploaded files. Flags are specified as either a single flag value or a comma-separated list of flag values. These values are case-sensitive and may be negated by prepending them with a '-' character. Currently the following flag values are accepted: answered, deleted, draft, flagged, and seen. The currently accepted flag values are used to set flags on IMAP uploads.",
    "description": "(IMAP) Specify additional behavior to apply to uploaded files. Flags are specified as either a single flag value or a comma-separated list of flag values. These values are case-sensitive and may be negated by prepending them with a '-' character. Currently the following flag values are accepted: answered, deleted, draft, flagged, and seen. The currently accepted flag values are used to set flags on IMAP uploads.\n\nIf --upload-flags is provided several times, the last set value is used.\n\nExample:\n\nAdded in 8.13.0. See also --upload-file.",
    "choices": [],
    "examples": [
      "curl --upload-flags Flagged,!Seen --upload-file local/dir/file https://example.com"
    ],
    "addedIn": "8.13.0.",
    "seeAlso": [
      "--upload-file"
    ]
  },
  {
    "id": "use-ascii",
    "name": "--use-ascii",
    "short": "-B",
    "arg": null,
    "label": "--use-ascii",
    "type": "boolean",
    "category": "protocol",
    "popularity": 15,
    "summary": "(FTP LDAP TFTP) Enable ASCII transfer mode. For FTP, this can also be enforced by using a URL that ends with \";type=A\". For TFTP, this can also be enforced by using a URL that ends with \";mode=netascii\". This option causes data sent to stdout to be in text mode for Win32 systems.",
    "description": "(FTP LDAP TFTP) Enable ASCII transfer mode. For FTP, this can also be enforced by using a URL that ends with \";type=A\". For TFTP, this can also be enforced by using a URL that ends with \";mode=netascii\". This option causes data sent to stdout to be in text mode for Win32 systems.\n\nProviding --use-ascii multiple times has no extra effect. Disable it again with --no-use-ascii.\n\nExample:\n\nSee also --crlf and --data-ascii.",
    "choices": [],
    "examples": [
      "curl -B ftp://example.com/README"
    ],
    "addedIn": null,
    "seeAlso": [
      "--crlf",
      "--data-ascii"
    ]
  },
  {
    "id": "0,",
    "name": "-0,",
    "short": null,
    "arg": "--http1.0",
    "label": "-0, --http1.0",
    "type": "string",
    "category": "protocol",
    "popularity": 15,
    "summary": "(HTTP) Use HTTP version 1.0 instead of using its internally preferred HTTP version.",
    "description": "(HTTP) Use HTTP version 1.0 instead of using its internally preferred HTTP version.\n\nProviding --http1.0 multiple times has no extra effect.\n\nExample:\n\nThis option is mutually exclusive with --http1.1, --http2, --http2-prior-knowledge and --http3. See also --http0.9 and --http1.1.",
    "choices": [],
    "examples": [
      "curl --http1.0 https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--http1.1",
      "--http2",
      "--http2-prior-knowledge",
      "--http3",
      "--http0.9",
      "--http1.1"
    ]
  },
  {
    "id": "data-ascii",
    "name": "--data-ascii",
    "short": null,
    "arg": "<data>",
    "label": "--data-ascii <data>",
    "type": "string",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) This option is an alias for --data.",
    "description": "(HTTP) This option is an alias for --data.\n\n--data-ascii can be used several times in a command line.\n\nExample:\n\nSee also --data-binary, --data-raw and --data-urlencode.",
    "choices": [],
    "examples": [
      "curl --data-ascii @file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data-binary",
      "--data-raw",
      "--data-urlencode"
    ]
  },
  {
    "id": "data-binary",
    "name": "--data-binary",
    "short": null,
    "arg": "<data>",
    "label": "--data-binary <data>",
    "type": "string",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) Post data exactly as specified with no extra processing whatsoever.",
    "description": "(HTTP) Post data exactly as specified with no extra processing whatsoever.\n\nIf you start the data with the letter @, the rest should be a filename. \"@-\" makes curl read the data from stdin. Data is posted in a similar manner as --data does, except that newlines and carriage returns are preserved and conversions are never done.\n\nLike --data the default content-type sent to the server is application/x-www-form-urlencoded. If you want the data to be treated as arbitrary binary data by the server then set the content-type to octet-stream: -H \"Content-Type: application/octet-stream\".\n\nIf this option is used several times, the ones following the first append data as described in --data.\n\n--data-binary can be used several times in a command line.\n\nExample:\n\nSee also --data-ascii.",
    "choices": [],
    "examples": [
      "curl --data-binary @filename https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data-ascii"
    ]
  },
  {
    "id": "data-urlencode",
    "name": "--data-urlencode",
    "short": null,
    "arg": "<data>",
    "label": "--data-urlencode <data>",
    "type": "choice",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) Post data, similar to the other --data options with the exception that this performs URL-encoding.",
    "description": "(HTTP) Post data, similar to the other --data options with the exception that this performs URL-encoding.\n\nTo be CGI-compliant, the <data> part should begin with a name followed by a separator and a content specification. The <data> part can be passed to curl using one of the following syntaxes:\n\n--data-urlencode can be used several times in a command line.\n\nExamples:\n\nSee also --data and --data-raw.",
    "choices": [
      {
        "value": "content",
        "desc": "URL-encode the content and pass that on. Be careful so that the content does not contain any \"=\" or \"@\" symbols, as that makes the syntax match one of the other cases below."
      },
      {
        "value": "=content",
        "desc": "URL-encode the content and pass that on. The preceding \"=\" symbol is not included in the data."
      },
      {
        "value": "name=content",
        "desc": "URL-encode the content part and pass that on. Note that the name part is expected to be URL-encoded already."
      },
      {
        "value": "@filename",
        "desc": "load data from the given file (including any newlines), URL-encode that data and pass it on in the POST. Using \"@-\" makes curl read the data from stdin."
      },
      {
        "value": "name@filename",
        "desc": "load data from the given file (including any newlines), URL-encode that data and pass it on in the POST. The name part gets an equal sign appended, resulting in name=urlencoded-file-content. Note that the name is expected to be URL-encoded already."
      }
    ],
    "examples": [
      "curl --data-urlencode name=val https://example.com\ncurl --data-urlencode =encodethis https://example.com\ncurl --data-urlencode name@file https://example.com\ncurl --data-urlencode @fileonly https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--data",
      "--data-raw"
    ]
  },
  {
    "id": "disable",
    "name": "--disable",
    "short": "-q",
    "arg": null,
    "label": "--disable",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "If used as the first parameter on the command line, the curlrc config file is not read or used. See the --config for details on the default config file search path.",
    "description": "If used as the first parameter on the command line, the curlrc config file is not read or used. See the --config for details on the default config file search path.\n\nProviding --disable multiple times has no extra effect. Disable it again with --no-disable.\n\nExample:\n\nSee also --config.",
    "choices": [],
    "examples": [
      "curl -q https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--config"
    ]
  },
  {
    "id": "disallow-username-in-url",
    "name": "--disallow-username-in-url",
    "short": null,
    "arg": null,
    "label": "--disallow-username-in-url",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "Exit with error if passed a URL containing a username. Probably most useful when the URL is being provided at runtime or similar.",
    "description": "Exit with error if passed a URL containing a username. Probably most useful when the URL is being provided at runtime or similar.\n\nAccepting and using credentials in a URL is normally considered a security hazard as they are easily leaked that way.\n\nProviding --disallow-username-in-url multiple times has no extra effect. Disable it again with --no-disallow-username-in-url.\n\nExample:\n\nSee also --proto.",
    "choices": [],
    "examples": [
      "curl --disallow-username-in-url https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--proto"
    ]
  },
  {
    "id": "httpsig-key",
    "name": "--httpsig-key",
    "short": null,
    "arg": "<key/file>",
    "label": "--httpsig-key <key/file>",
    "type": "choice",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) **WARNING**: this option is experimental. Do not use in production.",
    "description": "(HTTP) **WARNING**: this option is experimental. Do not use in production.\n\nThe key to use for RFC 9421 HTTP Message Signatures. Provide it as-is, or as \"@filename\". If the argument starts with an \"@\", the rest is treated as a file name for the key.\n\nThe key is formatted as a series of hexadecimal digits in a single line. For ed25519, this is the 32-byte private seed (64 hex characters). For hmac-sha256, this is the shared secret. PEM files are not supported.\n\nIf --httpsig-key is provided several times, the last set value is used.\n\nExamples:\n\nAdded in 8.22.0. See also --httpsig-algo and --httpsig-keyid.",
    "choices": [
      {
        "value": "Generating Ed25519 keys",
        "desc": "With OpenSSL 3: Use \"@k.hex\" with \"--httpsig-key\"."
      }
    ],
    "examples": [
      "openssl genpkey -algorithm ED25519 -out k.pem\nopenssl pkey -in k.pem -outform RAW -out k.raw\nxxd -p -c 64 k.raw | tr -d '\\n' > k.hex",
      "curl --httpsig-algo ed25519 --httpsig-key @key.hex --httpsig-keyid \"my-key\" https://example.com\ncurl --httpsig-key 123a56fb72197633bc --httpsig-keyid \"my-key\" https://example.com"
    ],
    "addedIn": "8.22.0.",
    "seeAlso": [
      "--httpsig-algo",
      "--httpsig-keyid"
    ]
  },
  {
    "id": "metalink",
    "name": "--metalink",
    "short": null,
    "arg": null,
    "label": "--metalink",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "This option was previously used to specify a Metalink resource. Metalink support is disabled in curl for security reasons (added in 7.78.0).",
    "description": "This option was previously used to specify a Metalink resource. Metalink support is disabled in curl for security reasons (added in 7.78.0).\n\nIf --metalink is provided several times, the last set value is used.\n\nExample:\n\nSee also --parallel.",
    "choices": [],
    "examples": [
      "curl --metalink file https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--parallel"
    ]
  },
  {
    "id": "parallel-immediate",
    "name": "--parallel-immediate",
    "short": null,
    "arg": null,
    "label": "--parallel-immediate",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "When doing parallel transfers, this option instructs curl to prefer opening up more connections in parallel at once rather than waiting to see if new transfers can be added as multiplexed streams on another connection.",
    "description": "When doing parallel transfers, this option instructs curl to prefer opening up more connections in parallel at once rather than waiting to see if new transfers can be added as multiplexed streams on another connection.\n\nBy default, without this option set, curl prefers to wait a little and multiplex new transfers over existing connections. It keeps the number of connections low at the expense of risking a slightly slower transfer startup.\n\nThis option is global and does not need to be specified for each use of --next.\n\nProviding --parallel-immediate multiple times has no extra effect. Disable it again with --no-parallel-immediate.\n\nExample:\n\nAdded in 7.68.0. See also --parallel and --parallel-max.",
    "choices": [],
    "examples": [
      "curl --parallel-immediate -Z https://example.com -o file1 https://example.com -o file2"
    ],
    "addedIn": "7.68.0.",
    "seeAlso": [
      "--parallel",
      "--parallel-max"
    ]
  },
  {
    "id": "parallel-max",
    "name": "--parallel-max",
    "short": null,
    "arg": "<num>",
    "label": "--parallel-max <num>",
    "type": "number",
    "category": "general",
    "popularity": 15,
    "summary": "When asked to do parallel transfers, using --parallel, this option controls the maximum amount of transfers to do simultaneously.",
    "description": "When asked to do parallel transfers, using --parallel, this option controls the maximum amount of transfers to do simultaneously.\n\nThe default is 50. 65535 is the largest supported value.\n\nThis option is global and does not need to be specified for each use of --next.\n\nIf --parallel-max is provided several times, the last set value is used.\n\nExample:\n\nAdded in 7.66.0. See also --parallel and --parallel-max-host.",
    "choices": [],
    "examples": [
      "curl --parallel-max 100 -Z https://example.com ftp://example.com/"
    ],
    "addedIn": "7.66.0.",
    "seeAlso": [
      "--parallel",
      "--parallel-max-host"
    ]
  },
  {
    "id": "path-as-is",
    "name": "--path-as-is",
    "short": null,
    "arg": null,
    "label": "--path-as-is",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "Do not handle sequences of /../ or /./ in the given URL path. Normally curl squashes or merges them according to standards but with this option set you tell it not to do that.",
    "description": "Do not handle sequences of /../ or /./ in the given URL path. Normally curl squashes or merges them according to standards but with this option set you tell it not to do that.\n\nProviding --path-as-is multiple times has no extra effect. Disable it again with --no-path-as-is.\n\nExample:\n\nSee also --request-target.",
    "choices": [],
    "examples": [
      "curl --path-as-is https://example.com/../../etc/passwd"
    ],
    "addedIn": null,
    "seeAlso": [
      "--request-target"
    ]
  },
  {
    "id": "raw",
    "name": "--raw",
    "short": null,
    "arg": null,
    "label": "--raw",
    "type": "boolean",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) When used, it disables all internal HTTP decoding of content or transfer encodings and instead makes them passed on unaltered, raw.",
    "description": "(HTTP) When used, it disables all internal HTTP decoding of content or transfer encodings and instead makes them passed on unaltered, raw.\n\nProviding --raw multiple times has no extra effect. Disable it again with --no-raw.\n\nExample:\n\nSee also --tr-encoding.",
    "choices": [],
    "examples": [
      "curl --raw https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--tr-encoding"
    ]
  },
  {
    "id": "request-target",
    "name": "--request-target",
    "short": null,
    "arg": "<path>",
    "label": "--request-target <path>",
    "type": "filepath",
    "category": "general",
    "popularity": 15,
    "summary": "(HTTP) Use an alternative target (path) instead of using the path as provided in the URL. Particularly useful when wanting to issue HTTP requests without leading slash or other data that does not follow the regular URL pattern, like \"OPTIONS *\".",
    "description": "(HTTP) Use an alternative target (path) instead of using the path as provided in the URL. Particularly useful when wanting to issue HTTP requests without leading slash or other data that does not follow the regular URL pattern, like \"OPTIONS *\".\n\ncurl passes on the verbatim string you give it in the request without any filter or other safe guards. That includes white space and control characters.\n\nIf --request-target is provided several times, the last set value is used.\n\nExample:\n\nSee also --request.",
    "choices": [],
    "examples": [
      "curl --request-target \"*\" -X OPTIONS https://example.com"
    ],
    "addedIn": null,
    "seeAlso": [
      "--request"
    ]
  },
  {
    "id": "url-query",
    "name": "--url-query",
    "short": null,
    "arg": "<data>",
    "label": "--url-query <data>",
    "type": "string",
    "category": "general",
    "popularity": 15,
    "summary": "Add a piece of data, usually a name + value pair, to the end of the URL query part. The syntax is identical to that used for --data-urlencode with one extension:",
    "description": "Add a piece of data, usually a name + value pair, to the end of the URL query part. The syntax is identical to that used for --data-urlencode with one extension:\n\nIf the argument starts with a '+' (plus), the rest of the string is provided as-is unencoded.\n\nThe query part of a URL is the one following the question mark on the right end.\n\n--url-query can be used several times in a command line.\n\nExamples:\n\nAdded in 7.87.0. See also --data-urlencode and --get.",
    "choices": [],
    "examples": [
      "curl --url-query name=val https://example.com\ncurl --url-query =encodethis http://example.net/foo\ncurl --url-query name@file https://example.com\ncurl --url-query @fileonly https://example.com\ncurl --url-query \"+name=%20foo\" https://example.com"
    ],
    "addedIn": "7.87.0.",
    "seeAlso": [
      "--data-urlencode",
      "--get"
    ]
  }
];

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
