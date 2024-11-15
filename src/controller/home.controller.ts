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
import { createReadStream } from 'node:fs';

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
  @SetHeader({
    'Cache-Control': 'public, max-age=360000',
    'Content-Type': 'image/jpeg',
    'Content-Disposition': 'inline',
  })
  async wallpaper(@Param('date') dateStr: string = new Date().toLocaleDateString(),
    @Param('lang') lang: 'zh-ch' | 'en-us' | 'en-gb' = 'zh-ch',
    @Param('mode') mode: 'UHD' | 'FHD' | 'MBL' | 'MAK' = 'FHD') {
    let wpURL = `https://dailybing.com/api/v1/${dateStr}/${lang}/${mode}`
    const chunk = await this.homeService.getURLChunk(wpURL)

    if (chunk?.id) {
      console.warn("used cached chunk", chunk)
      this.ctx.type = chunk.mimeType;
      this.ctx.body = createReadStream(resolve(chunk.data));
    } else {
      let firstRes = await fetch(`https://dailybing.com/api/v1/${dateStr}/${lang}/${mode}`)
      console.warn(firstRes)
      if (firstRes.status === 200) {
        const realFetch = await fetch(firstRes.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'image/*'
          }
        })
        if (!realFetch.ok) {
          return this.ctx.body = 'fetch failed';
        }
        console.warn(realFetch.status)

        const buffer = Buffer.from(await realFetch.arrayBuffer());
        this.ctx.set('Content-Type', 'image/jpeg');
        // this.ctx.set('Cache-Control', 'public, max-age=0');
        this.ctx.set('Content-Length', buffer.length.toString());
        let filename = Date.now().toString() + firstRes.url.split('=').pop();
        const dest = resolve(UPLOAD_DIR, filename);
        console.warn(dest)
        await writeFile(dest, buffer, 'binary');
        let chunk = await this.homeService.addChunk({ filename, mimeType: 'image/jpeg', fieldName: 'paper', data: dest } as Chunk)
        let urlchunk = await this.homeService.addURLChunk(wpURL, chunk)
        this.ctx.body = buffer;
        this.ctx.status = 200;
      } else {
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
