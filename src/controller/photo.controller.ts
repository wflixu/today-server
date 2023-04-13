import { Inject, Controller,  Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { PhotoService } from '../service/photo.service';
import { Photo } from '../entity/photo.entity';

@Controller('/photo')
export class PhotoController {
  @Inject()
  ctx: Context;

  @Inject()
  photoService: PhotoService;

  //   @Get('/get_user')
  //   async getUser(@Query('uid') uid) {
  //     const user = await this.userService.getUser({ uid });
  //     return { success: true, message: 'OK', data: user };
  //   }
  @Post('/')
  async savePhone(@Body() photo: Photo) {
    console.log(photo);
    await this.photoService.savePhoto();
    return { success: true, message: 'OK', data: null };
  }
}
