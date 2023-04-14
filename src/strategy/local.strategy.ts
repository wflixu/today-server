import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { Repository } from 'typeorm';
import { InjectEntityModel } from '@midwayjs/typeorm';

import { User } from '../entity/user.entity';
import { Inject, httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  @InjectEntityModel(User)
  userModel: Repository<User>;
  @Inject()
  jwtService: JwtService;

  // 策略的验证
  async validate(username: string, password: string) {
    const user = await this.userModel.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      throw new httpError.ForbiddenError('用户明不存在');
    }
    if (password !== user.password) {
      throw new httpError.ForbiddenError('密码错误');
    }

    const token = await this.jwtService.sign({ username });
    console.warn('---------ssss');
    return {
      username,
      token,
    };
  }

  // 当前策略的参数
  getStrategyOptions(): any {
    return {};
  }
}
