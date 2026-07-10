# 配置

| 环境变量 | 必填 | 默认值 | 说明 |
|---|---|---|---|
| `ARK_API_KEY` | 是 | 无 | 火山方舟 API Key，仅服务端可读 |
| `ARK_API_URL` | 否 | `https://ark.cn-beijing.volces.com/api/v3/chat/completions` | Chat Completions 接口 |
| `ARK_MODEL_ID` | 否 | `ep-m-20260704212204-cqqj7` | 推理接入点 ID |

本地配置写入 `.env.local`；部署时写入托管平台的加密环境变量。禁止创建任何 `NEXT_PUBLIC_` 前缀的密钥变量。
