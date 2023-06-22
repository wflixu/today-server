import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Catch(httpError.UnauthorizedError)
export class UnauthorizedErrorFilter {
  async catch(err: MidwayHttpError, ctx: Context) {
    // 40 错误会到这里
    // ctx.redirect('/404.html');
    console.log(err)
    ctx.body = {
      code: 401,
      message: '没有授权',
      data: null,
    };
  }
}
