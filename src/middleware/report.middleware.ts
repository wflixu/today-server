import { ApiLogService } from './../service/apilog.service';
import { Middleware, IMiddleware, Config } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { UnauthorizedError } from '@midwayjs/core/dist/error/http';

@Middleware()
export class ReportMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('ipBan')
  configIpBan: { maxTimes: number };

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 控制器前执行的逻辑
      const startTime = Date.now();

      ctx.logger.info('ReportMiddleware', startTime);
      // 执行下一个 Web 中间件，最后执行到控制器
      ctx.logger.warn('user:', ctx.state.user);

      const apiLogService = await ctx.requestContext.getAsync<ApiLogService>(
        ApiLogService
      );

      const count = await apiLogService.getIpTimes();
      if (count > this.configIpBan.maxTimes) {
        throw new UnauthorizedError();
      }
      await apiLogService.addApiLog();
      // 这里可以拿到下一个中间件或者控制器的返回值
      const result = await next();
      // 控制器之后执行的逻辑
      ctx.logger.info(
        `Report in "src/middleware/report.middleware.ts", rt = ${Date.now() - startTime
        }ms`
      );
      // 返回给上一个中间件的结果
      return result;
    };
  }

  static getName(): string {
    return 'report';
  }
}
