import {
  Inject,
  Controller,
  Get,
  Body,
  Post,
  Param,
  Del,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { QDZService } from '../service/qdz.service';
import { QLocation } from '../entity/QLocation';
import type { INPost, INLocal } from './../interface';

@Controller('/qdz')
export class QDZController {
  @Inject()
  ctx: Context;

  @Inject()
  qdzService: QDZService;

  @Post('/parti')
  async addParti(
    @Body('post_id') post_id: number,
    @Body('message') message: string
  ) {
    const parti = await this.qdzService.addParticipant(
      post_id,
      this.ctx.state.user.id,
      message
    );
    return { success: true, message: 'OK', data: parti };
  }
  @Get('/parti/:id')
  async getPostParti(@Param('id') post_id: number) {
    const partis = await this.qdzService.getPostParticipants(post_id);
    return { success: true, message: 'OK', data: partis };
  }

  @Del('/parti/:id')
  async delParti(@Param('id') id: number) {
    const partis = await this.qdzService.delParticipant(id);
    return { success: true, message: 'OK', data: partis };
  }

  @Post('/post')
  async addPost(@Body() param: INPost) {
    const post = await this.qdzService.addPost(param, this.ctx.state.user.id);
    return { success: true, message: 'OK', data: post };
  }
  @Post('/post/:id')
  async updatePost(@Body() param: INPost, @Param('id') id: number) {
    const post = await this.qdzService.updatePost({ ...param, post_id: id });
    return { success: true, message: 'OK', data: post };
  }

  @Del('/post/:id')
  async delPost(@Param('id') id: number) {
    const res = await this.qdzService.deletePost(id);
    return { success: true, message: 'OK', data: res };
  }

  @Get('/post/list')
  async getPostList() {
    const posts = await this.qdzService.list();
    return { success: true, message: 'OK', data: posts };
  }

  // 位置信息
  @Post('/location')
  async addLocal(@Body() param: INLocal) {
    const local = await this.qdzService.addLocal(param);
    return { success: true, message: 'OK', data: local };
  }

  @Get('/location/list')
  async getLocationList() {
    const posts = await this.qdzService.locationList();
    return { success: true, message: 'OK', data: posts };
  }
}
