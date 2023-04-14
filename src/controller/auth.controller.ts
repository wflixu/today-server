import { Body, Context, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { LocalPassportMiddleware } from '../middleware/local.middleware';

@Controller('/passport')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    console.warn('---------login');
    // @ts-ignore
    return { success: true, message: 'OK', data: this.ctx.state!.user };
  }
}
