import { AppService } from './../service/app.service';
import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  SetHeader,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { App } from '../entity/App';
import { versionDiff } from '../utils/version';
import { IPagination } from '../interface';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

export interface INewReleaseParam {
  name: string;
  version: string;
  notes: string;
  file_id: number;
}

@Controller('/release')
export class ReleaseController {
  @Inject()
  ctx: Context;
  @Inject()
  appService: AppService;

  @Post('/add')
  async addRelease(@Body() param: INewReleaseParam) {
    return await this.appService.addRelease(param);
  }
  @Del('/:id')
  async delRelease(@Param('id') id: number) {
    return await this.appService.removeRelease(id);
  }
  @Post('/page')
  async relseseList(@Body() pag: IPagination) {
    return await this.appService.getPagRecords(pag);
  }

  @Get('/update/:id')
  @SetHeader({
    'Cache-Control': 'public, max-age=864000',
  })
  async getAppUpdateInfo(@Param('id') id: number) {
    const chunk = await this.appService.getAppUpdateJson(id);
    console.warn(chunk);
    if (chunk && chunk.data) {
      this.ctx.type = chunk.mimeType;
      this.ctx.body = createReadStream(resolve(chunk.data));
    } else {
      this.ctx.body = '';
    }
  }
}
