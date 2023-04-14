import { Context, Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    // @ts-ignore
    const ignore = ctx.path.indexOf('/passport/login') !== -1;
    return !ignore;
  }
}
