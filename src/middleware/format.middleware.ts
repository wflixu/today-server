import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      if (result === null) {
        ctx.status = 200;
      }
      if (result?.code && result?.msg) {
        return result;
      } else {
        return {
          code: 200,
          msg: 'OK',
          data: result,
        };
      }
    };
  }
}
