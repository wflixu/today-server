import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Post,
  Redirect,
  RequestIP,
} from '@midwayjs/core';
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
  async ping(@RequestIP() ip: string, @Headers() headers): Promise<any> {
    return {
      ip,
      headers,
    };
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
