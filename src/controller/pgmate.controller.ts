import { IConnection } from '../interface';
import { PgmateService } from './../service/pgmate.service';
import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Post,
  Query,
} from '@midwayjs/core';

@Controller('/pg')
export class PgmateController {
  @Inject()
  pgmateService: PgmateService;

  @Post('/connect')
  async connect(@Body() connection: IConnection) {
    const res = await this.pgmateService.connect(connection);
    return res;
  }
  @Post('/db')
  async createDb(@Body('conn') conn: string, @Body('datname') datname: string) {
    const res = await this.pgmateService.createDb(conn, datname);
    return res;
  }
  @Del('/db')
  async delDb(@Query('id') id: string) {
    const [conn, datname] = id.split('-');
    console.warn('db', id);
    const res = await this.pgmateService.delDb(conn, datname);
    return res;
  }
  @Get('/db')
  async getDbInfo(@Query('id') id: string) {
    const [conn, datname] = id.split('-');
    console.warn('db', id);
    const res = await this.pgmateService.getDbInfo(conn, datname);
    return res;
  }
}
