import {
  ContentType,
  Controller,
  Del,
  Fields,
  Files,
  Get,
  Inject,
  Param,
  Post,
  Query,
  SetHeader,
} from '@midwayjs/core';
import { ChunkService } from '../service/chunk.service';
import { Chunk } from '../entity/Chunk';
import { Context } from '@midwayjs/koa';
import { createReadStream } from 'fs';
import { stat, access } from 'node:fs/promises';
import { resolve } from 'path';
import { F_OK } from 'node:constants';
import { copyFile } from 'fs/promises';

import { UPLOAD_DIR } from '../constant';

@Controller('/chunk')
export class ChunkController {
  @Inject()
  ctx: Context;
  @Inject()
  chunkService: ChunkService;

  @Post('/upload')
  async upload(@Files() files, @Fields() fields) {
    for (const file of files) {
      const dest = resolve(UPLOAD_DIR, file.data.split('/').pop());
      console.warn(file);
      await copyFile(resolve(file.data), dest);
      file.data = dest;
      await this.chunkService.addChunk(file as unknown as Chunk);
    }
    return {
      user: this.ctx.state.user,
      files,
      fields,
    };
  }
  @Get('/show')
  @SetHeader({
    'Cache-Control': 'public, max-age=864000',
  })
  async showChunk(@Query('id') id: number) {
    const chunk = await this.chunkService.getChunk(id);
    if (chunk.data) {
      this.ctx.type = chunk.mimeType;
      this.ctx.body = createReadStream(resolve(chunk.data));
    }
  }
  @Get('/down')
  async downloadChunk(@Query('id') id: number) {
    const chunk = await this.chunkService.getChunk(id);
    if (chunk.data) {
      this.ctx.type = chunk.mimeType;
      this.ctx.set(
        'Content-Disposition',
        `attachment; filename=${chunk.filename}`
      );
      this.ctx.body = createReadStream(resolve(chunk.data));
    }
  }
  @Del('/:id')
  async delChunk(@Param('id') id: number) {
    const chunk = await this.chunkService.getChunk(id);
    console.warn(chunk);
    if (chunk.data) {
      await this.chunkService.delChunkAndFile(chunk);
    }
    return chunk;
  }
  @Get('/check')
  async check() {
    const chunks = await this.chunkService.getChunks();
    const ids = [];
    chunks.forEach(async chunk => {
      try {
        await access(resolve(chunk.data), F_OK);
      } catch (error) {
        await this.chunkService.delChunk(chunk);
        ids.push(chunk.id);
        console.log('error', error);
      }
    });

    return ids;
  }
  @Get('/list')
  async list() {
    const chunks = await this.chunkService.getUserChunks();
    return chunks.map(item => {
      const { userId, data, ...rest } = item;
      return rest;
    });
  }
  @Get('/imgs')
  async imglist() {
    const chunks = await this.chunkService.getUserChunks();
    return chunks
      .filter(item => {
        return item.mimeType.startsWith('image/');
      })
      .map(item => {
        const { userId, data, ...rest } = item;
        return rest;
      });
  }
}
