import { Config, Middleware } from '@midwayjs/core';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/koa';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  @Config('jwtPassport')
  jwtPassportConfig: { ignore: string[]; [key: string]: any };
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {};
  }

  public ignore(ctx: Context): boolean {
    return this.jwtPassportConfig.ignore.includes(ctx.path);
  }

  static getName(): string {
    return 'jwtPassport';
  }
}
