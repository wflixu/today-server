import { Middleware, IMiddleware, Config } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('resultFormat')
  resultFormatConfig: { ignore: string[]; [key: string]: any };

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
  public ignore(ctx: Context): boolean {
    let ret = false;
    this.resultFormatConfig.ignore.forEach(item => {
      if (ctx.path.startsWith(item)) {
        ret = true;
      }
    });
    return ret;
  }
}
