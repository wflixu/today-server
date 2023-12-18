import { Body, Controller, Get, Headers, Inject, Post, Redirect } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'home';
  }
  @Get('/ping')
  async ping(@Headers() headers): Promise<string> {
    console.log(headers);
    return 'ping success !';
  }
  @Post('/ping')
  async pingup(@Body() body) {
    return body;
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
