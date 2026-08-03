# Wiki.js — 页面树与 Vue 组件位置映射

> 本文档说明**编译后**每个 Vue 组件在页面树中的位置：即「服务端 URL → pug 视图 → 挂载的 Vue 组件」的对应关系，以及各区域内的组件层级。

## 总体架构

```
浏览器请求 URL
   │
   ▼
server/controllers/*.js   (服务端路由，按 URL 分发)
   │
   ▼
server/views/*.pug        (服务端模板，渲染 #root 根节点)
   │
   ▼
client/components/*.vue   (全局注册的 Vue 组件，挂载到 #root)
   │
   ├── 管理后台 Admin  → 内部 Vue Router（admin.vue）
   ├── 编辑器 Editor   → 按编辑器类型动态加载（editor.vue）
   └── 个人中心 Profile → 内部 Vue Router（profile.vue）
```

## 顶层页面（URL → 视图 → Vue 组件）

| URL | pug 视图 | 挂载元素 | Vue 组件文件 |
|---|---|---|---|
| `/`、`/任意路径`（页面已存在） | `page.pug` | `<page>` | `client/themes/default/components/page.vue` |
| `/`（首页未创建） | `welcome.pug` | `<welcome>` | `client/components/welcome.vue` |
| `/login` | `login.pug` | `<login>` | `client/components/login.vue` |
| `/register` | `register.pug` | `<register>` | `client/components/register.vue` |
| `/a`、`/a/*`（管理后台） | `admin.pug` | `<admin>` | `client/components/admin.vue` |
| `/e`、`/e/*`（编辑页面） | `editor.pug` | `<editor>` | `client/components/editor.vue` |
| `/h`、`/h/*`（历史） | `history.pug` | `<history>` | `client/components/history.vue` |
| `/p`、`/p/*`（个人中心） | `profile.pug` | `<profile>` | `client/components/profile.vue` |
| `/s`、`/s/*`（源码） | `source.pug` | `<page-source>` | `client/components/source.vue` |
| `/t`、`/t/*`（标签） | `tags.pug` | `<tags>` | `client/components/tags.vue` |
| `/setup`（安装向导） | `setup.pug` | `<setup>` | `client/components/setup.vue` |
| 404 页面 | `notfound.pug` | `<not-found>` | `client/components/not-found.vue` |
| 403 未授权 | `unauthorized.pug` | `<unauthorized>` | `client/components/unauthorized.vue` |
| 错误页 | `error.pug` | — | （纯静态错误页） |

> `/d`、`/d/*`（下载页面/版本）与 `/u`（上传）为二进制接口，不渲染页面组件。

---

## ① 内容页（主题区）

```
client/themes/default/components/page.vue      ← 页面主渲染（/ 及所有内容页）
├── nav-sidebar.vue                            ← 侧边导航
├── tabset.vue                                 ← 页内标签页切换
├── nav-footer.vue                             ← 页脚（全局组件）
└── (StatusIndicator、Prism、Mermaid 等第三方)
```

页面评论使用 `client/components/comments.vue`（注册为 `Comments`，由 `page.vue` 按配置加载）。

---

## ② 管理后台 Admin（`/a`）

`client/components/admin.vue` 内置 Vue Router，`/a` 下所有页面均为其子路由，编译后映射如下：

```
admin.vue
├── /dashboard          → admin/admin-dashboard.vue        （默认首页）
├── /general            → admin/admin-general.vue
├── /locale             → admin/admin-locale.vue
├── /navigation         → admin/admin-navigation.vue
├── /pages              → admin/admin-pages.vue
│   └── /pages/:id      → admin/admin-pages-edit.vue
├── /pages/visualize    → admin/admin-pages-visualize.vue
├── /tags               → admin/admin-tags.vue
├── /theme              → admin/admin-theme.vue
├── /groups             → admin/admin-groups.vue
│   └── /groups/:id     → admin/admin-groups-edit.vue
│       ├── admin-groups-edit-permissions.vue   （子标签）
│       ├── admin-groups-edit-rules.vue         （子标签）
│       └── admin-groups-edit-users.vue         （子标签）
├── /users              → admin/admin-users.vue
│   ├── /users/:id      → admin/admin-users-edit.vue
│   └── （新建）         → admin/admin-users-create.vue
├── /analytics          → admin/admin-analytics.vue
│   └── （统计）         → admin/admin-stats.vue
├── /auth               → admin/admin-auth.vue
├── /comments           → admin/admin-comments.vue
├── /rendering          → admin/admin-rendering.vue
├── /editor             → admin/admin-editor.vue
├── /extensions         → admin/admin-extensions.vue
├── /logging            → admin/admin-logging.vue
│   └── admin-logging-console.vue
├── /search             → admin/admin-search.vue
├── /storage            → admin/admin-storage.vue
├── /api                → admin/admin-api.vue
│   └── admin-api-create.vue
├── /mail               → admin/admin-mail.vue
├── /security           → admin/admin-security.vue
├── /ssl                → admin/admin-ssl.vue
├── /system             → admin/admin-system.vue
├── /utilities          → admin/admin-utilities.vue
│   ├── admin-utilities-auth.vue
│   ├── admin-utilities-cache.vue
│   ├── admin-utilities-content.vue
│   ├── admin-utilities-export.vue
│   ├── admin-utilities-importv1.vue
│   └── admin-utilities-telemetry.vue
├── /webhooks           → admin/admin-webhooks.vue
├── /dev-flags          → admin/admin-dev-flags.vue
└── /contribute         → admin/admin-contribute.vue
```

---

## ③ 编辑器 Editor（`/e`）

`client/components/editor.vue` 按页面配置的编辑器类型**动态加载**编辑器实现，并包含编辑弹窗：

```
editor.vue
├── 编辑器实现（按类型二选一）
│   ├── editor/editor-markdown.vue      ← Markdown 编辑器
│   ├── editor/editor-ckeditor.vue      ← CKEditor 富文本
│   ├── editor/editor-code.vue          ← 代码编辑器
│   ├── editor/editor-asciidoc.vue      ← AsciiDoc 编辑器
│   ├── editor/editor-api.vue           ← API 编辑器
│   └── editor/editor-redirect.vue      ← 重定向编辑器
├── 编辑弹窗
│   ├── editor/editor-modal-editorselect.vue
│   ├── editor/editor-modal-properties.vue
│   ├── editor/editor-modal-unsaved.vue
│   ├── editor/editor-modal-media.vue
│   ├── editor/editor-modal-blocks.vue
│   ├── editor/editor-modal-conflict.vue
│   └── editor/editor-modal-drawio.vue
└── 辅助子目录
    ├── editor/api/server-selector.vue
    ├── editor/ckeditor/conflict.vue
    ├── editor/markdown/help.vue（+ plantuml.js / tabset.js）
    └── editor/common/（cmFold.js / katex.js）
```

---

## ④ 个人中心 Profile（`/p`）

`client/components/profile.vue` 内置 Vue Router：

```
profile.vue
├── /profile   → profile/profile.vue   （默认首页）
├── /pages     → profile/pages.vue
└── /comments  → profile/comments.vue
```

---

## ⑤ 登录 / 注册 / 其他页面

```
login.vue        ← 登录（含背景图、第三方认证按钮）
register.vue     ← 注册
welcome.vue      ← 欢迎页（引导创建首页）
history.vue      ← 页面历史（/h）
source.vue       ← 页面源码（/s）
tags.vue         ← 标签页（/t，内部有选择器跳转）
not-found.vue    ← 404
unauthorized.vue ← 403
setup.vue        ← 安装向导（/setup）
```

---

## ⑥ 全局公共组件（`client/components/common/`）

供上述页面复用的通用组件：

| 组件 | 用途 |
|---|---|
| `nav-header.vue` | 顶部导航栏（所有页面共用） |
| `notify.vue` | 全局消息通知 |
| `loader.vue` | 加载指示 |
| `page-selector.vue` | 页面选择器 |
| `search-results.vue` | 搜索结果 |
| `social-sharing.vue` | 社交分享 |
| `v-card-chin.vue` / `v-card-info.vue` | 信息卡片 |
| `page-convert.vue` / `page-delete.vue` | 页面转换 / 删除 |
| `user-search.vue` | 用户搜索 |
| `password-strength.vue` | 密码强度 |
| `duration-picker.vue` | 时长选择 |

---

## 编译后产物说明

- 各组件通过 `webpack` 按 `webpackChunkName` 分包编译，产物输出到根目录 `assets/`（js/、css/、svg/ 等）。
- `server/views/master.pug`、`setup.pug`、`legacy/master.pug` 由 `dev/templates/` 经 `HtmlWebpackPlugin` 编译生成（`npm run build` / `npm run dev`）。
- 页面树层级由「服务端路由 → pug 视图」决定；`admin.vue`、`profile.vue` 内部再通过 Vue Router 渲染二级页面。
