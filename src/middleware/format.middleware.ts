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
      return {
        code: 0,
        msg: 'OK',
        data: result,
      };
    };
  }
}
