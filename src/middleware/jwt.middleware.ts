import { Config, Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/koa';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  @Config('jwtPassport')
  jwtPassportConfig: { ignore: string[];[key: string]: any };
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  public ignore(ctx: Context): boolean {
    let res = this.jwtPassportConfig.ignore.reduce((prev, cur) => {
      // console.warn('ignore', cur, ctx.path);
      return prev || ctx.path.startsWith(cur);
    }, false);
    return res;
  }

  static getName(): string {
    return 'jwtPassport';
  }
}
