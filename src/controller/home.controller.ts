import {
  Body,
  Controller,
  Get,
  Headers,
  Inject,
  Param,
  Post,
  RequestIP,
  SetHeader,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { HomeService } from '../service/home.service';
import { resolve } from 'node:path';
import { UPLOAD_DIR } from '../constant';
import { Chunk } from '../entity/Chunk';
import { writeFile } from 'node:fs/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { getNow } from '../utils/datetime';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  homeService: HomeService;

  @Get('/')
  async home(): Promise<string> {
    return 'home';
  }
  @Get('/ping')
  async ping(@RequestIP() ip: string, @Headers() headers): Promise<any> {
    return 'PING';
  }
  @Get('/ip')
  async youIp(@RequestIP() ip: string, @Headers() headers): Promise<any> {
    return headers['x-real-ip'] ?? ip;
  }
  @Post('/ping')
  async pingup(@Body() body) {
    return body;
  }


  @Get('/wallpaper/:date/:lang/:mode')
  @Get('/wallpaper')
  @SetHeader({
    'Cache-Control': 'public, max-age=360000',
    'Content-Type': 'image/jpeg',
    'Content-Disposition': 'inline',
  })
  async wallpaper(@Param('date') dateStr: string = getNow(),
    @Param('lang') lang: 'zh-ch' | 'en-us' | 'en-gb' = 'zh-ch',
    @Param('mode') mode: 'UHD' | 'FHD' | 'MBL' | 'MAK' = 'UHD') {
    // https://dailybing.com/show/20250428/zh-cn/FHD.html
    let wpURL = `https://dailybing.com/show/${dateStr}/${lang}/${mode}.html`
    const chunk = await this.homeService.getURLChunk(wpURL)

    if (chunk?.id) {
      this.ctx.logger.info("used cached chunk", chunk)
      this.ctx.type = chunk.mimeType;
      this.ctx.set("Cache-Control", "public, max-age=360000");
      this.ctx.body = createReadStream(resolve(chunk.data));
    } else {
      this.ctx.logger.info("no caced, get new image ,start ...", chunk)
      let fetchImage = await fetch(wpURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'image/*'
        }
      })

      if (fetchImage.status === 200) {

        this.ctx.logger.info("---fetch wallpaper", fetchImage)
        this.ctx.set('Content-Type', fetchImage.headers.get('Content-Type'));
        this.ctx.set('Content-Length', fetchImage.headers.get('Content-Length'));

        const buffer = Buffer.from(await fetchImage.arrayBuffer());
        let filename = dateStr + '_' + fetchImage.url.split('/').pop();
        const dest = resolve(UPLOAD_DIR, filename);

        await writeFile(dest, buffer, 'binary');
        let chunk = await this.homeService.addChunk({ filename, mimeType: 'image/jpeg', fieldName: 'paper', data: dest } as Chunk)
        let urlchunk = await this.homeService.addURLChunk(wpURL, chunk)
        this.ctx.body = buffer;
        this.ctx.status = 200;
      } else {
        this.ctx.logger.warn("fetch wallpaper failed", fetchImage)
        this.ctx.status = 500;
      }
    }


  }

  @Get('/foo')
  async foo() {
    // TODO
    return this.ctx.state.user;
  }
  @Get('/bar')
  async bar() {
    // TODO
    return 'bar';
  }
}
