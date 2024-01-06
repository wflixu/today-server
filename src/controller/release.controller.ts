import { AppService } from './../service/app.service';
import { Body, Controller, Get, Inject, Param, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { App } from '../entity/App';
import { versionDiff } from '../utils/version';

@Controller('/release')
export class ReleaseController {
  @Inject()
  ctx: Context;
  @Inject()
  appService: AppService;

  @Post('/add')
  async addRelease(@Body() pap: Partial<App>) {
    return await this.appService.addRelease(pap);
  }
  @Get('/:target/:arch/:cur')
  async getRelease(
    @Param('target') target,
    @Param('arch') arch,
    @Param('cur') cur
  ) {
    const latest = await this.appService.getLatest();
    console.warn(target, arch, cur, latest.version);

    if (versionDiff(latest.version, cur) > 0) {
      return {
        version: latest.version,
        pub_date: latest.pub_date,
        url: `https://api.wflixu.cn/chunk/down?id=${latest.file_id}`,
        signature: latest.signature,
        notes: latest.notes,
      };
    } else {
      this.ctx.status = 204;
    }
  }
}
