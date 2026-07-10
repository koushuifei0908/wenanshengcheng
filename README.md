# 文案生产

## 项目简介

一个使用火山方舟模型生成、改写中文文案的流式 AI 对话工作台。

## 快速开始

运行环境需要 Node.js 20.9 或更高版本。依赖版本均由 `package-lock.json` 锁定；PostCSS 通过 npm override 固定到已修复安全版本。

1. 安装依赖：`npm install`
2. 复制 `.env.example` 为 `.env.local`
3. 将火山方舟 API Key 写入 `ARK_API_KEY`
4. 启动开发环境：`npm run dev`
5. 打开 `http://localhost:3000`

## 功能列表

- 与火山方舟模型进行流式对话
- 中文文案场景快捷提示
- 停止生成、复制回答与新建对话
- 桌面、平板和手机响应式布局
- 服务端密钥保护、请求校验与友好错误反馈

## 配置说明

配置通过服务端环境变量注入，默认使用已验证的火山方舟接入点 `ep-m-20260704212204-cqqj7`，详见 [docs/CONFIGURATION.md](docs/CONFIGURATION.md)。不要将 `.env.local` 提交到 Git。

## 项目结构

- `src/core`：纯类型、业务常量和业务错误
- `src/services`：请求验证与对话用例
- `src/adapters`：火山方舟和日志适配
- `src/components`：界面组件
- `src/hooks`：前端对话状态
- `src/utils`：无副作用的 SSE 解析
- `src/tests`：单元测试

## 测试

运行 `npm test`、`npm run typecheck` 和 `npm run build`。测试策略详见 [docs/TESTING.md](docs/TESTING.md)。

## 变更日志

参见 [CHANGELOG.md](CHANGELOG.md)。
