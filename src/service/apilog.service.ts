import { ApiLog } from './../entity/ApiLog';
import { Inject, Provide, RequestIP } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class ApiLogService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(ApiLog)
  apiLog: Repository<ApiLog>;

  async addApiLog() {
    const ip = this.ctx.ip;
    const realIp = this.ctx.headers['x-real-ip'];
    const url = this.ctx.path;
    const userId = this.ctx.state.user?.id;
    const param = {
      ip: (realIp ?? ip) as string,
      date: new Date(),
      url,
      userId,
    };
    const alog = this.apiLog.create(param);
    return await this.apiLog.save(alog);
  }
  async getIpTimes() {
    const realIp = this.ctx.headers['x-real-ip'] as string;
    const ip = realIp ?? this.ctx.ip;
    return await this.apiLog.countBy({ ip });
  }

}
