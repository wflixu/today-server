import { Body, Controller, Inject, Post } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { LocalPassportMiddleware } from '../middleware/local.middleware';
import { Context } from '@midwayjs/koa';
import * as _ from 'lodash';
import { SmsService } from 'midway-tencent-cloud-sms';

@Controller('/passport')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Inject()
  smsService: SmsService;

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    return this.ctx.state!.user;
  }

  @Post('/sign')
  async sign(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('code') code: string
  ) {

    this.ctx.logger.info('sign', username, password, phone, code);
    return {};
  }

  @Post('/sms')
  async sms(@Body('phone') phone: string) {
    const code = _.random(100000, 999999);
    // const res = await this.smsService.sendSMS(phone, code.toString());
    const res = await this.smsService.sendSms(code.toString(), phone);
    this.ctx.logger.info('sms', phone, res);
  }
}
