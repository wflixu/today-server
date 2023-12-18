import { Body, Controller, Inject, Post, RequestIP } from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { LocalPassportMiddleware } from '../middleware/local.middleware';
import { Context } from '@midwayjs/koa';
import * as _ from 'lodash';
import { SmsService } from 'midway-tencent-cloud-sms';
import { User } from '../entity/User';
import { AuthService } from '../service/auth.service';

@Controller('/passport')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Inject()
  authService: AuthService;

  @Inject()
  smsService: SmsService;

  @Post('/login', {
    middleware: [LocalPassportMiddleware],
  })
  async login(
    @Body('username') username: string,
    @Body('password') password: string
  ) {
    console.log('local user: ', this.ctx.state.user);
    return this.ctx.state.user;
    // const user = await this.authService.loginByPassword(username, password);
    // if (user) {
    //   return user;
    // } else {
    //   return {
    //     code: 213,
    //     msg: '用户名或密码不正确',
    //     data: null,
    //   };
    // }
  }

  @Post('/sign')
  async sign(
    @Body('username') name: string,
    @Body('password') password: string,
    @Body('phone') phone: string,
    @Body('code') code: number
  ) {
    const isRightPhone = await this.authService.veriflyPhoneCode(phone, code);

    if (!isRightPhone) {
      return {
        code: 210,
        msg: '手机验证码和手机号不匹配',
        data: null,
      };
    }

    const oldUser = await this.userService.hasUser(phone, name);
    if (oldUser) {
      return {
        code: 211,
        msg: '手机验证码和手机号已经存在',
        data: null,
      };
    }
    const user = await this.userService.addUser({
      name,
      password,
      phone,
    } as unknown as User);
    this.ctx.logger.info('sign', name, password, phone, code);
    return user;
  }
  /**
   *
   * @param phone
   * @param ip
   * @returns
   * return 1 ip 发送的过多的验证码，2 已经发送过，
   */
  @Post('/sms')
  async sms(@Body('phone') phone: string, @RequestIP() ip: string) {
    const count = await this.authService.codeCount(ip);
    if (count > 10) {
      return 1;
    }
    console.log(count, ip);
    if (count > 0) {
      const activeCode = await this.authService.activingCode(phone);
      if (activeCode) {
        return 2;
      }
    }

    const code = _.random(100000, 999999);
    // const { SendStatusSet } = await this.smsService.sendSms(
    //   code.toString(),
    //   phone
    // );
    // console.warn(SendStatusSet);
    // if (SendStatusSet[0].Code === 'Ok') {
    await this.authService.addPhoneCode(phone, code, ip);
    return code;
    // } else {
    //   return 3;
    // }
  }
}
