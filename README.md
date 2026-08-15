# cURL Builder (cURL 命令可视化生成器)

> 基于官方 `cURL Man Page` 规范构建的现代化、纯前端、零依赖 cURL 命令可视化生成器。

---

## 🌟 核心特性

- **开箱即用 & 零依赖**：纯静态前端，直接双击 `index.html` 或托管于任意静态服务器即可运行，支持离线使用。
- **参考 cURL Man Page 规范**：从官方 Man Page 完整解析并内置 **280+ 个 cURL 命令行参数** 元数据库，支持长短参数、分类检索、一键勾选与参数值配置。
- **全功能 HTTP 请求构建**：
  - **HTTP Method**：支持 GET、POST、PUT、DELETE、PATCH、HEAD、OPTIONS 等常用方法。
  - **Query Params**：动态键值对表格，支持启用/禁用、URL 实时双向智能同步。
  - **Headers**：内置常见 Header 自动补全提示，支持动态增删改与多格式兼容。
  - **Body 载荷**：支持 JSON（内置智能语法高亮校验、一键格式化与压缩）、Multipart Form-Data（支持 `@` 文件标记）、x-www-form-urlencoded、Raw 纯文本及 Binary 二进制文件。
  - **认证授权 (Auth)**：支持 Bearer Token、Basic Auth (`-u`)、API Key（Header/Query）及 Digest Auth。
- **多平台 Shell 语法转义引擎**：
  - **Bash / Zsh (POSIX)**：标准 `\` 换行，POSIX 安全单双引号转义。
  - **PowerShell**：Windows PowerShell ``` ` ``` 反引号换行与单引号转义规则。
  - **Windows CMD**：Windows 命令提示符 `^` 换行、双引号强制包裹与 `\"` / `%%` 字符转义。
  - **Single Line**：紧凑单行无换行模式，便于在终端中一次性粘贴执行。
- **现代开发者体验**：
  - 代码语法实时高亮、字符与行数统计。
  - 一键复制到剪贴板（带 Toast 反馈提示）。
  - 一键下载为 `.sh`、`.ps1`、`.bat` 脚本文件。
  - 暗色 (Dark) / 明亮 (Light) 双主题无缝切换与持久化存储。

---

## 🏗️ 软件架构设计 (Architecture)

系统采用 **分层解耦架构 (Layered Decoupled Architecture)**，将核心编译生成逻辑与 UI 渲染完全隔离：

```
+-----------------------------------------------------------------------------+
|                                表现层 (UI Layer)                             |
|  - KeyValueTable (可复用表格)       - BodyEditor (多格式请求体编辑器)           |
|  - AuthPanel (认证授权面板)         - FlagsExplorer (Man Page 字典检索面板)     |
|  - TerminalOutput (高亮终端)       - ThemeController (深浅主题切换)           |
+-----------------------------------------------------------------------------+
                                      │ 调度与事件流 (User Events)
                                      ▼
+-----------------------------------------------------------------------------+
|                           状态管理层 (State & Store Layer)                    |
|  - StateStore: 集中式响应式数据流 (Method, URL, Params, Headers, Body, Auth)|
|  - URL <-> QueryParams 双向解析同步引擎                                      |
|  - 状态变更事件订阅分发 (State Change EventEmitter)                          |
+-----------------------------------------------------------------------------+
                                      │ 状态快照输入 (State Snapshot)
                                      ▼
+-----------------------------------------------------------------------------+
|                         核心引擎层 (Core Compilation Engine)                  |
|  - CurlGenerator: 语法组装编译器 (Flag 优先级、参数排序、格式化)               |
|  - ShellEscaper: 跨平台专属转义器 (Bash / PowerShell / Windows CMD)          |
|  - CurlFlagsData: cURL Man Page 强结构化参数元数据库 (280+ Flags)            |
+-----------------------------------------------------------------------------+
```

---

## 📂 项目目录结构

```
c:\Users\32153\Desktop\curl builder\
├── index.html                   # 核心 Web 应用主入口（语义化、可直接双击运行）
├── README.md                    # 详尽工程文档
├── manpage.html                 # cURL 官方 Man Page 原始文档源
├── generate_flags_data.py       # Man Page 解析与元数据自动生成脚本
├── css/
│   ├── variables.css            # 设计系统 Token（深浅色变量、字体、间距）
│   ├── layout.css               # 左右分栏工作台与响应式布局系统
│   ├── components.css           # 基础组件库（表格、Tabs、按钮、开关、徽章、输入框）
│   ├── terminal.css             # 终端代码预览、高亮配色与 Toast 提示组件
│   └── style.css                # 样式主入口（整合导入）
├── js/
│   ├── core/
│   │   ├── curl-flags-data.js   # cURL Man Page 参数元数据字典（280+ 常用与高级参数）
│   │   ├── shell-escaper.js     # 跨平台 (Bash/PS/CMD) 专用转义引擎
│   │   ├── curl-generator.js    # cURL 命令编译与组装引擎
│   │   └── state-store.js       # 响应式状态管理与 URL-Query 双向同步引擎
│   ├── ui/
│   │   ├── key-value-table.js   # 通用键值对表格视图组件
│   │   ├── body-editor.js       # 请求体编辑器组件（JSON/Form/UrlEncoded/Raw/Binary）
│   │   ├── auth-panel.js        # 认证授权管理面板组件
│   │   ├── flags-explorer.js    # cURL Man Page 高级参数搜索与索引面板
│   │   ├── terminal-output.js   # 实时命令终端输出、代码高亮、格式切换与复制导出
│   │   └── theme-controller.js  # 主题切换与偏好持久化
│   └── app.js                   # 应用装配、模块初始化与全局事件总线
└── test/
    └── verify-generator.js      # 自动化测试套件（覆盖各平台转义与复杂请求用例）
```

---

## ⚡ 跨平台转义矩阵 (Shell Escaping Matrix)

| 目标平台 | 续行连接符 | 引号规则 | 关键转义机制 |
| :--- | :---: | :--- | :--- |
| **Bash / Zsh (POSIX)** | `\` | 单引号 `'...'` (优先) | 单引号内部 `'` 转义为 `'\''`，双引号内部转义 `$`、`"`、`\` |
| **PowerShell** | `` ` `` | 单引号 `'...'` (字面量) | 单引号内部 `'` 转义为 `''`，消除变量求值风险 |
| **Windows CMD** | `^` | 双引号 `"..."` (强制) | CMD 不支持单引号参数，内部 `"` 转义为 `\"`，`%` 转义为 `%%` |
| **Single Line** | 无 | 单行紧凑 | 将所有参数精简排列于单行，去除换行符 |

---

## 🚀 快速开始

### 1. 直接运行
直接使用任意浏览器（Chrome / Edge / Firefox / Safari）双击打开项目根目录下的 `index.html` 即可开始使用。

### 2. 本地静态服务器运行 (可选)
```bash
# 使用 Python 启动本地静态服务器
python -m http.server 8080

# 或使用 Node npx serve
npx serve .
```
打开浏览器访问 `http://localhost:8080` 即可。

---

## 🧪 自动化测试验证

项目内置了完整的 Node.js 单元测试套件，对所有 Shell 平台转义规则、URL 参数双向同步、JSON 转义、Form-data 及 Man Page Flags 进行全面回归校验：

```bash
node test/verify-generator.js
```

测试覆盖范围：
1. **Shell Escaper 边界用例**（空格、单双引号嵌套、Windows `%` 环境变量转义）。
2. **多平台换行符与格式化**（`\`、``` ` ```、`^`、Single-Line）。
3. **HTTP 复合请求编译**（GET 带 Query、POST JSON、Multipart 文件上传、Basic/Bearer/API Key/Digest 认证）。
4. **状态管理与 URL-Query 双向同步**。
5. **cURL Man Page 参数字典完整性与检索过滤**。

---

## 🗺️ 后续演进计划 (Roadmap / Plan List)

- [ ] **cURL 逆向解析器 (Reverse Parser)**：支持直接粘贴现有 cURL 命令，自动拆解参数并反向回填到表单中。
- [ ] **多语言代码一键导出 (Code Exporter)**：一键转换导出为 Python (requests/httpx)、JavaScript (fetch/axios)、Go (net/http)、Java、PHP 等代码片段。
- [ ] **请求预设模板库 (Templates)**：内置 GraphQL、OAuth2 Token 获取、分片上传等常见场景模板。
- [ ] **本地历史记录与收藏夹**：基于 localStorage 实现请求历史记录检索与快捷载入。
