import { Controller, Get, Redirect } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/foo')
  @Redirect('/bar', 302)
  async foo() {
    // TODO
    return 'foo';
  }
  @Get('/bar')
  async bar() {
    // TODO
    return 'bar';
  }
}
