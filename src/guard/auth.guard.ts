import { Guard, IGuard, Inject } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';
import { Context } from '@midwayjs/koa';

@Guard()
export class AuthGuard implements IGuard<Context> {
  @Inject()
  jwtService: JwtService;

  async canActivate(
    context: Context,
    supplierClz,
    methodName: string
  ): Promise<boolean> {
    // ...
    console.log('---------------');
    console.log(context, supplierClz, methodName);
    if (methodName === 'login') {
      return true;
    }

    return true;
    // const res = await this.jwtService.verify(context.)
    // return res;
  }
}
