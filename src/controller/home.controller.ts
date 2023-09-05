import { Controller, Get, Inject, Redirect } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/foo')
  async foo() {
    // TODO
    return this.ctx.state.user;
  }
  @Get('/bar')
  async bar() {
    // TODO
    return 'bar';
  }
}
