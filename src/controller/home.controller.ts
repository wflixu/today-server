import { Controller, Get, Inject, Post } from '@midwayjs/core';
// import { JwtService } from '@midwayjs/jwt';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
