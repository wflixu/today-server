# Today-server

midway.js

主要技术栈为：

| 名称                | 版本   | 名称       | 版本   |
| ------------------- | ------ | ---------- | ------ |
| midway.js           | 3.0.x  | TypeScript | 4.8.x  |
| postgresql          | 14.x   | typeorm    | 0.3.x  |
| node                | 18.x+  |            |        |
| 详见 `package.json` | 😁     | 🥰         | 🤗     |

## QuickStart

see [midway docs][midway] for more detail.

### Development

```bash
$ pnpm install
$ pnpm run dev
$ open http://localhost:8443/
```

### Deploy

```bash
$ npm run build
$  npm start

pm2 start ./bootstrap.js --name today_server

$ pm2 start     # 启动一个服务
$ pm2 list      # 列出当前的服务
$ pm2 stop          # 停止某个服务
$ pm2 restart       # 重启某个服务
$ pm2 delete        # 删除某个服务
$ pm2 logs          # 查看服务的输出日志


```

### npm scripts

- Use `pnpm run lint` to check code style.
- Use `pnpm test` to run unit test.

## API 接口

### AI 代理接口

统一的 AI 服务代理接口，支持多个 AI 平台。

#### 1. 获取模型列表

```bash
GET /ai/:platform/v1/models
```

支持的平台：`deepseek`、`aliyun`

阿里云平台支持的模型：
- 千问：qwen3.5-plus, qwen3-max-2026-01-23, qwen3-coder-next, qwen3-coder-plus
- 智谱：glm-5, glm-4.7
- Kimi：kimi-k2.5
- MiniMax：MiniMax-M2.5

示例：
```bash
# 获取 DeepSeek 模型列表
curl http://localhost:8443/ai/deepseek/v1/models

# 获取阿里云模型列表
curl http://localhost:8443/ai/aliyun/v1/models
```

响应：
```json
{
  "object": "list",
  "data": [
    { "id": "deepseek-chat", "object": "model", "created": 1677610602, "owned_by": "deepseek" },
    { "id": "deepseek-reasoner", "object": "model", "created": 1677610602, "owned_by": "deepseek" }
  ]
}
```

#### 2. 聊天补全

```bash
POST /ai/:platform/v1/chat/completions
```

请求头需要携带平台 API Key：

```bash
curl -X POST http://localhost:8443/ai/deepseek/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "你好"}]
  }'
```

响应：
```json
{
  "id": "22ff339a-6e4b-454f-a529-913565709a72",
  "object": "chat.completion",
  "created": 1773464832,
  "model": "deepseek-chat",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "你好！我是 DeepSeek..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 11,
    "completion_tokens": 28,
    "total_tokens": 39
  }
}
```

[midway]: https://midwayjs.org




