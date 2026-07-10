# 文案生产 · 设计规范

> 像一张被认真铺开的编辑桌：安静、可靠，让灵感自然落成文字。

## 1. Visual Theme & Atmosphere

**Style**: 暖白编辑工作台（Warm Editorial Workspace）  
**Keywords**: 编辑感、中文排版、克制、温暖、专注、可信、轻盈  
**Tone**: 专业但不严肃，聪明但不卖弄；不是赛博控制台，也不是花哨营销页。  
**Feel**: 像一本排版精良的创意手册与现代 AI 工具自然结合。

**Interaction Tier**: L2 流畅交互  
**Dependencies**: React 内置能力 + CSS；不引入动画库。

## 2. Color Palette & Roles

```css
:root {
  --bg: #f5f1e8;
  --surface: #fffdf8;
  --surface-alt: #eee8dc;
  --surface-hover: #faf6ee;
  --overlay: rgba(29, 27, 24, 0.42);

  --border: #ddd5c8;
  --border-hover: #bcb1a1;
  --border-strong: #1d1b18;

  --text: #1d1b18;
  --text-secondary: #615c54;
  --text-tertiary: #8d8579;
  --text-on-accent: #fffdf8;

  --accent: #d95f35;
  --accent-hover: #bd4724;
  --accent-soft: #f5dfd5;

  --bg-rgb: 245, 241, 232;
  --surface-rgb: 255, 253, 248;
  --text-rgb: 29, 27, 24;
  --accent-rgb: 217, 95, 53;

  --success: #2f7d58;
  --error: #b83a35;
  --warning: #a86b19;
}
```

**Color Rules:**

- 所有颜色必须通过变量引用，组件内禁止硬编码颜色。
- 朱橙色只用于主操作、选中状态、生成进度与少量品牌标记。
- 长文本始终使用深墨色；禁止使用低对比灰色承载模型回答。
- 消息气泡依靠表面色、边框和留白区分，不用大面积高饱和底色。

## 3. Typography Rules

```css
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Serif+SC:wght@600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|---|---|---:|---:|---:|---:|
| Brand/Hero | Noto Serif SC | clamp(32px, 5vw, 58px) | 700 | 1.2 | 0.02em |
| Section H2 | Noto Serif SC | 26px | 700 | 1.4 | 0.02em |
| H3 | Noto Sans SC | 18px | 600 | 1.55 | 0.02em |
| Body | Noto Sans SC | 16px | 400 | 1.8 | 0.02em |
| Label | Noto Sans SC | 13px | 600 | 1.5 | 0.08em |
| Mono/Code | JetBrains Mono | 13px | 400 | 1.7 | 0 |

**Typography Rules:**

- 中文字体始终位于字体栈首位；正文最小 15px。
- 模型回答行高不低于 1.8，段落宽度不超过 76 个汉字。
- 一级品牌标题使用衬线体，操作界面与正文使用无衬线体。
- **NEVER use**: Comic Sans、Impact、仅英文字体且无中文 fallback 的字体栈。

**Text Decoration:**

- 标题不使用渐变文字或文字阴影，依靠字重和留白建立层级。
- 小标签允许使用朱橙色短下划线；正文不得使用装饰效果。
- 链接使用带 offset 的下划线，hover 时切换为强调色。

## 4. Component Stylings

### Buttons

```css
.button {
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid var(--border-strong);
  border-radius: 12px;
  background: var(--text);
  color: var(--text-on-accent);
  font: 600 15px/1 'Noto Sans SC', sans-serif;
  cursor: pointer;
  transition: transform 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
}
.button:hover { transform: translateY(-1px); background: var(--accent-hover); box-shadow: 0 8px 24px rgba(var(--text-rgb), .12); }
.button:active { transform: translateY(1px); box-shadow: none; }
.button:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .28); outline-offset: 3px; }
.button:disabled { cursor: not-allowed; opacity: .46; transform: none; box-shadow: none; }
.button--accent { border-color: var(--accent); background: var(--accent); }
.button--ghost { border-color: var(--border); background: transparent; color: var(--text); }
.button--ghost:hover { border-color: var(--border-hover); background: var(--surface-hover); }
```

### Cards / Message Blocks

```css
.card {
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: 0 1px 0 rgba(var(--text-rgb), .04);
  transition: border-color 180ms ease, transform 180ms ease, box-shadow 180ms ease;
}
.card:hover { border-color: var(--border-hover); }
.card:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(var(--accent-rgb), .12); }
.message--user { margin-left: auto; background: var(--surface-alt); }
.message--assistant { margin-right: auto; background: var(--surface); }
```

### Navigation / Sidebar

```css
.sidebar {
  border-right: 1px solid var(--border);
  background: rgba(var(--surface-rgb), .82);
}
.sidebar-item {
  min-height: 44px;
  border-radius: 10px;
  color: var(--text-secondary);
  transition: background-color 160ms ease, color 160ms ease;
}
.sidebar-item:hover { background: var(--surface-hover); color: var(--text); }
.sidebar-item[aria-current='page'] { background: var(--accent-soft); color: var(--text); }
.sidebar-item:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .24); outline-offset: 2px; }
```

### Links

```css
a { color: var(--text); text-decoration-color: var(--border-hover); text-underline-offset: 4px; transition: color 150ms ease; }
a:hover { color: var(--accent-hover); text-decoration-color: currentColor; }
a:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .24); outline-offset: 3px; border-radius: 3px; }
```

### Tags / Prompt Suggestions

```css
.tag {
  min-height: 40px;
  padding: 8px 13px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text-secondary);
  transition: border-color 150ms ease, color 150ms ease, transform 150ms ease;
}
.tag:hover { border-color: var(--accent); color: var(--accent-hover); transform: translateY(-1px); }
.tag:active { transform: translateY(0); }
.tag:focus-visible { outline: 3px solid rgba(var(--accent-rgb), .22); outline-offset: 2px; }
.tag:disabled { opacity: .45; cursor: not-allowed; transform: none; }
```

### Composer

```css
.composer {
  border: 1px solid var(--border-hover);
  border-radius: 18px;
  background: var(--surface);
  box-shadow: 0 16px 44px rgba(var(--text-rgb), .09);
}
.composer:focus-within { border-color: var(--accent); box-shadow: 0 0 0 4px rgba(var(--accent-rgb), .10), 0 16px 44px rgba(var(--text-rgb), .09); }
.composer textarea { min-height: 58px; color: var(--text); background: transparent; resize: none; }
.composer textarea::placeholder { color: var(--text-tertiary); }
.composer textarea:disabled { cursor: not-allowed; opacity: .56; }
```

## 5. Layout Principles

**Container:**

- App max width: 1440px
- Content max width: 880px
- Desktop padding: 28px；mobile padding: 16px
- Reading width: 760px

**Spacing Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 72px  
**App Layout:** 264px sidebar + flexible conversation canvas  
**Composer:** sticky at bottom of conversation canvas with safe-area support

```css
.app-shell {
  display: grid;
  grid-template-columns: 264px minmax(0, 1fr);
  min-height: 100dvh;
}
.conversation {
  width: min(100% - 48px, 880px);
  margin-inline: auto;
}
.message-list { display: flex; flex-direction: column; gap: 24px; }
```

## 6. Depth & Elevation

| Level | Treatment | Use |
|---|---|---|
| Flat | 无阴影，仅边框 | 侧栏、普通消息、标签 |
| Subtle | `0 1px 0 rgba(29,27,24,.04)` | 卡片、代码块 |
| Elevated | `0 16px 44px rgba(29,27,24,.09)` | 固定输入框、弹出菜单 |
| Modal | 遮罩 + `0 28px 80px rgba(29,27,24,.18)` | 设置对话框、错误详情 |

阴影只表达层级，不作为装饰；同屏最多出现一个 Elevated 元素。

## 7. Animation & Interaction

**Motion Philosophy**: 像纸页轻放到桌面，只使用 opacity 与 transform。  
**Tier**: L2

### Dependencies

无第三方动画依赖。

### Entrance Animation

```css
@keyframes rise-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.app-enter { animation: rise-in 480ms cubic-bezier(.22, 1, .36, 1) both; }
.message-enter { animation: rise-in 320ms cubic-bezier(.22, 1, .36, 1) both; }
```

### Streaming / Generation

- 模型生成时，回答末端显示低调的朱橙色呼吸光标。
- “停止生成”替代发送按钮，布局位置不变化，避免界面跳动。
- 新消息完成后只在用户仍接近底部时自动滚动；用户向上阅读时不抢夺位置。
- 复制成功显示 1.5 秒的“已复制”，并提供 `aria-live` 反馈。

```css
@keyframes caret-pulse { 50% { opacity: .25; } }
.stream-caret { display: inline-block; width: 7px; height: 1.1em; background: var(--accent); animation: caret-pulse 900ms steps(1) infinite; }
```

### Hover & Focus States

- hover 只在支持 hover 的设备启用位移效果。
- 所有键盘焦点使用统一的 3px 半透明强调色外轮廓。
- 发送快捷键为 Enter；Shift + Enter 换行，并在输入框附近明确提示。

### Special Effects

- 空状态标题按行轻柔入场，4 个提示词依次延迟 50ms。
- 品牌印章图形只做一次 4° 回正动画，随后保持静止。
- 不使用视差、滚动劫持、自定义光标或持续背景动画。

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}
```

## 8. Do's and Don'ts

### Do

- 优先展示用户与模型的对话内容，让工具界面退居其后。
- 默认提供“短视频口播、朋友圈、产品卖点、标题灵感”四个提示词。
- 模型回答支持 Markdown、代码块、复制和重新生成。
- 明确展示加载、空状态、网络错误、鉴权错误和频率限制状态。
- 在手机端保持输入框始终可触达，并处理虚拟键盘与安全区域。
- 使用语义化 HTML、清晰的焦点顺序和 ARIA live region。

### Don't

- ❌ 不在前端代码、构建产物、日志或 Git 仓库中出现 API Key。
- ❌ 不使用满屏渐变、霓虹发光或赛博朋克视觉。
- ❌ 不把所有内容塞进大量同质化圆角卡片。
- ❌ 不用纯图标表达关键操作；图标旁必须有文字或可访问标签。
- ❌ 不使用低于 4.5:1 的正文颜色对比度。
- ❌ 不自动播放声音，不用振动或闪烁制造反馈。
- ❌ 不在用户向上阅读历史消息时强制滚回底部。
- ❌ 不把系统提示词、调用参数或服务端错误堆栈暴露给访客。
- ❌ 不使用 emoji 充当主要界面图标。
- ❌ 不加入与写作目标无关的登录、社区、积分等功能。

## 9. Responsive Behavior

| Name | Width | Key Changes |
|---|---:|---|
| Desktop | > 1024px | 264px 常驻侧栏，居中对话画布 |
| Tablet | 641–1024px | 侧栏折叠为 72px 图标栏，对话区扩展 |
| Mobile | ≤ 640px | 单列布局，侧栏进入抽屉，顶部保留品牌与新对话 |

**Touch Targets:** 最小 44 × 44px  
**Collapsing Strategy:** 历史会话、设置和说明收入抽屉；核心对话、提示词与输入框始终在主页面。长标题单行省略，回答正文不截断。

```css
@media (max-width: 1024px) {
  .app-shell { grid-template-columns: 72px minmax(0, 1fr); }
  .sidebar-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
}
@media (max-width: 640px) {
  .app-shell { display: block; }
  .sidebar { position: fixed; inset: 0 auto 0 0; width: min(86vw, 320px); transform: translateX(-100%); z-index: 30; }
  .sidebar[data-open='true'] { transform: translateX(0); }
  .conversation { width: calc(100% - 32px); }
  .composer { border-radius: 15px; }
}
```

## 产品与安全约束

- 产品名固定为「文案生产」。
- 模型：火山方舟推理接入点 `ep-20260710183900-84zfb`。
- 浏览器仅请求本站服务端 `/api/chat`；服务端再调用模型接口。
- API Key 只通过部署平台的加密环境变量 `ARK_API_KEY` 注入。
- GitHub 仓库只提交 `.env.example`，绝不提交真实 `.env`。
- GitHub 用于源码托管；正式网页使用支持服务端函数的托管平台部署，避免 GitHub Pages 泄露密钥。
