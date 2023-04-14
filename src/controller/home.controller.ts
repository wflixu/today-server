import { Controller, Get, Inject, Post } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Controller('/')
export class HomeController {
  @Inject()
  jwt: JwtService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Post('/jwt')
  async genJwt() {
    return {
      token: await this.jwt.sign({ msg: 'Hello Midway' }),
    };
  }
}
