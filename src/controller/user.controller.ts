import {
  Body,
  Context,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@midwayjs/core';
import { UserService } from '../service/user.service';
import { User } from '../entity/user.entity';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post('/')
  async createUser(@Body() user: User) {
    console.warn('user', user);
    const u = await this.userService.addUser(user);
    console.warn('u:', u);
    return { success: true, message: 'OK', data: u };
  }
  @Put('/:id')
  async updateUser(@Param('id') userId: string, @Body() user: Partial<User>) {
    console.warn('id:', userId);
    const u = await this.userService.findUserById(userId);
    if (!u) {
      return { success: false, message: 'user not exist', data: userId };
    }

    const res = await this.userService.addUser({
      ...u,
      ...user,
      id: userId,
    });
    console.warn('res', res);
    if (res) {
      return { success: true, message: 'ok', data: res };
    } else {
      return { success: false, message: 'error', data: userId };
    }
  }
  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    console.warn('id:', userId.trim());
    const u = await this.userService.findUserById(userId);
    return { success: true, message: 'OK', data: u };
  }

  @Del('/:id')
  async deleteUser(@Param('id') userId: string) {
    const u = await this.userService.findUserById(userId.trim());
    if (!u) {
      return { success: false, message: 'user not exist', data: userId };
    }
    const res = await this.userService.removeUser(u);
    return { success: true, message: 'ok', data: res };
  }
}
