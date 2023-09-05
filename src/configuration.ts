import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import { ReportMiddleware } from './middleware/report.middleware';
// import { AuthGuard } from './guard/auth.guard';
import * as orm from '@midwayjs/typeorm';
import * as crossDomain from '@midwayjs/cross-domain';
import { FormatMiddleware } from './middleware/format.middleware';
import { NotFoundFilter } from './filter/notfound.filter';
import { DefaultErrorFilter } from './filter/default.filter';
import { UnauthorizedErrorFilter } from './filter/unauthorize.filter';
import * as tencenCloudSms from 'midway-tencent-cloud-sms';
import * as dotenv from 'dotenv';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import * as upload from '@midwayjs/upload';


dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    orm,
    crossDomain,
    tencenCloudSms,
    jwt,
    upload,
    passport,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      FormatMiddleware,
      JwtPassportMiddleware,
      ReportMiddleware,
    ]);
    // 获取中间件的名字
    // console.warn(this.app.getMiddleware().getNames());
    // add filter
    this.app.useFilter([
      NotFoundFilter,
      UnauthorizedErrorFilter,
      DefaultErrorFilter,
    ]);
    // add Guard
    // this.app.useGuard(AuthGuard);
  }
}
