import { Guard, IGuard } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

@Guard()
export class AuthGuard implements IGuard<Context> {
  async canActivate(
    context: Context,
    supplierClz,
    methodName: string
  ): Promise<boolean> {
    // ...
    console.log(context, supplierClz, methodName);
    console.log(context);

    return true;
  }
}
