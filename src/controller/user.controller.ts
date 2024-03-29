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
import { User } from '../entity/User';

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
  @Get('/')
  async getUsers() {
    const users = await this.userService.list();
    return users;
  }
  @Put('/:id')
  async updateUser(@Param('id') userId: number, @Body() user: Partial<User>) {
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
  async getUser(@Param('id') userId: number) {
    console.warn('id:', userId);
    const u = await this.userService.findUserById(userId);
    return { success: true, message: 'OK', data: u };
  }

  @Del('/:id')
  async deleteUser(@Param('id') userId: number) {
    const u = await this.userService.findUserById(userId);
    if (!u) {
      return { success: false, message: 'user not exist', data: userId };
    }
    const res = await this.userService.removeUser(u);
    return { success: true, message: 'ok', data: res };
  }
}
