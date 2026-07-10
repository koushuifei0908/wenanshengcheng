# 安装与部署

需要 Node.js 20.9 或更高版本。执行 `npm install` 后创建 `.env.local`，按 `docs/CONFIGURATION.md` 配置变量。依赖使用锁文件固定；PostCSS 通过 npm override 固定为 `8.5.10`，用于规避上游间接依赖中的已知 XSS 问题。

生产部署推荐使用支持 Next.js 服务端函数的平台。GitHub 用于源码托管，不使用纯静态 GitHub Pages，因为静态页面无法安全保存模型密钥。
