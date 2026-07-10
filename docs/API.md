# API

## POST `/api/chat`

发送对话历史并返回火山方舟兼容的 Server-Sent Events 流。

请求体：

```json
{
  "messages": [
    { "role": "user", "content": "写一段产品文案" }
  ]
}
```

约束：消息数量为 1–40 条；角色只能是 `user` 或 `assistant`；单条内容为 1–20,000 个字符。系统提示词由服务端添加，客户端不能覆盖。

成功响应使用 `text/event-stream`。服务端允许模型流最长运行 240 秒；客户端必须收到 `[DONE]` 或非空 `finish_reason` 才能将回答视为完整。失败响应格式：

```json
{ "error": { "code": "INVALID_REQUEST", "message": "消息内容无效，请检查后重试" } }
```
