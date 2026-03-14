# AI Proxy Layer - OpenAI 兼容 API 路由层

## 目标

为国产 AI 模型（DeepSeek、阿里百炼等）创建 OpenAI 兼容的 API 路由层，使 XCode 等工具可以调用这些模型。

## 技术方案

### 路由设计

- `GET /ai/:platform/v1/models` - 返回指定平台的模型列表
- `POST /ai/:platform/v1/chat/completions` - 转发聊天请求到指定平台

### 支持的平台

| 平台 | 路径前缀 | 默认 API 地址 |
|------|----------|---------------|
| DeepSeek | `/ai/deepseek/v1/` | `https://api.deepseek.com/v1` |
| 阿里百炼 | `/ai/aliyun/v1/` | `https://dashscope.aliyuncs.com/compatible-mode/v1` |

### 实现细节

1. **不保存 Token** - 从请求头 `Authorization` 中提取并转发
2. **模型列表配置化** - 从配置文件读取各平台支持的模型
3. **多平台聚合** - 通过路由路径参数区分不同平台

## 已完成

- [x] 创建 `src/controller/ai.controller.ts`
- [x] 更新 `src/config/config.default.ts` 添加 `aiProxy` 配置
- [x] 配置 JWT 忽略 `/ai/` 路径
- [x] 配置 resultFormat 忽略 `/ai/` 路径

## 环境变量

可通过环境变量覆盖默认 API 地址：

```bash
DEEPSEEK_API_BASE=https://api.deepseek.com/v1
ALIYUN_API_BASE=https://dashscope.aliyuncs.com/compatible-mode/v1
```

## 使用示例

```bash
# DeepSeek 模型列表
curl http://localhost:8443/ai/deepseek/v1/models

# 阿里百炼模型列表
curl http://localhost:8443/ai/aliyun/v1/models

# 聊天请求
curl -X POST http://localhost:8443/ai/deepseek/v1/chat/completions \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "deepseek-chat",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

## 待测试

等待用户配置好环境后进行单元测试。
