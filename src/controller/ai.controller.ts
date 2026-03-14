import {
  Controller,
  Get,
  Post,
  Inject,
  Headers,
  Body,
  Config,
  Param,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/ai')
export class AIController {
  @Inject()
  ctx: Context;

  @Config('aiProxy')
  aiProxyConfig: Record<
    string,
    { apiBase: string; models: Array<{ id: string; owned_by: string }> }
  >;

  // Helper method to get platform config
  private getPlatformConfig(platform: string) {
    const config = this.aiProxyConfig[platform];
    if (!config) {
      this.ctx.status = 404;
      throw new Error(`Platform "${platform}" not found`);
    }
    return config;
  }

  // GET /ai/:platform/v1/models - Returns available models for the platform
  @Get('/:platform/v1/models')
  async getModels(@Param('platform') platform: string) {
    const config = this.getPlatformConfig(platform);
    const models = config.models.map(model => ({
      id: model.id,
      object: 'model',
      created: 1677610602,
      owned_by: model.owned_by,
    }));

    return {
      object: 'list',
      data: models,
    };
  }

  // POST /ai/:platform/v1/chat/completions - Forwards to platform's API
  @Post('/:platform/v1/chat/completions')
  async chatCompletions(
    @Param('platform') platform: string,
    @Body() body: any,
    @Headers() headers: any
  ) {
    const config = this.getPlatformConfig(platform);
    // Handle both 'authorization' and 'Authorization'
    let authHeader = headers['authorization'] || headers['Authorization'];

    if (!authHeader) {
      this.ctx.status = 401;
      return { error: { message: 'Missing Authorization header' } };
    }

    // Add Bearer prefix if not present
    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      authHeader = `Bearer ${authHeader}`;
    }

    const isStream = body?.stream === true;

    try {
      const url = `${config.apiBase}/chat/completions`;
      this.ctx.logger.info(`Proxying to: ${url}, stream: ${isStream}`);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
      });

      this.ctx.status = response.status;

      // Handle streaming response
      if (isStream) {
        this.ctx.set('Content-Type', 'text/event-stream');
        this.ctx.set('Cache-Control', 'no-cache');
        this.ctx.set('Connection', 'keep-alive');

        // Pipe the stream directly to client
        if (response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          try {
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              this.ctx.res.write(chunk);
            }
          } finally {
            this.ctx.res.end();
          }
        }
        return; // Don't return anything for streaming
      }

      // Handle non-streaming response
      const responseText = await response.text();

      // Try to parse as JSON
      let responseBody;
      try {
        responseBody = JSON.parse(responseText);
      } catch {
        // If not JSON, return raw text
        responseBody = { message: responseText };
      }

      return responseBody;
    } catch (error: any) {
      this.ctx.logger.error('Proxy error:', error?.message || error);
      this.ctx.status = 500;
      return { error: { message: 'Proxy request failed', details: error?.message } };
    }
  }
}
