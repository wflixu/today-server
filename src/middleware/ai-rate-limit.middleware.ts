import { Middleware, IMiddleware, Config } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, Between, MoreThanOrEqual, LessThan } from 'typeorm';
import { ApiLog } from '../entity/ApiLog';

@Middleware()
export class AIRateLimitMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('aiRateLimit')
  configAiRateLimit: { maxDailyRequests: number };

  @InjectEntityModel(ApiLog)
  apiLog: Repository<ApiLog>;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // Only apply to /ai routes
      if (!ctx.path.startsWith('/ai/')) {
        return await next();
      }

      const realIp = ctx.headers['x-real-ip'] as string;
      const ip = realIp ?? ctx.ip;

      // Get today's start and end
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Count today's requests for this IP on /ai routes
      const count = await this.apiLog.count({
        where: {
          ip,
          date: Between(today, tomorrow) as any,
        },
      });

      if (count >= this.configAiRateLimit.maxDailyRequests) {
        ctx.status = 429;
        ctx.body = {
          error: {
            message: 'Rate limit exceeded. Maximum 10000 requests per day per IP.',
            code: 'RATE_LIMIT_EXCEEDED',
          },
        };
        return;
      }

      // Log this request
      await this.apiLog.save({
        ip,
        url: ctx.path,
        date: new Date(),
        userId: ctx.state.user?.id || 0,
      });

      return await next();
    };
  }

  static getName(): string {
    return 'aiRateLimit';
  }
}
