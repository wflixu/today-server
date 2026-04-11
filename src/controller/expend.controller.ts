import {
  Body,
  Controller,
  Del,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { ExpenditureService } from '../service/expenditure.service';
@Controller('/expend')
export class ExpendController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;
  @Inject()
  expenditureService: ExpenditureService;

  @Post('/')
  async addExpend(@Body('count') count: number, @Body('kind') kind: number) {
    const result = await this.expenditureService.addExpend(count, kind);
    return result;
  }
  @Get('/')
  async getList(@Query('kind') kind: number) {
    return await this.expenditureService.getExpendList(kind);
  }
  @Del('/:id')
  async delExpend(@Param('id') id: number) {
    return await this.expenditureService.delGasRecord(id);
  }

  @Post('/gas')
  async recordGas(@Body('count') count: number) {
    const result = await this.expenditureService.addGasRecord(count);
    return result;
  }

  @Get('/gas')
  async getGasList() {
    return await this.expenditureService.getGasList();
  }
  @Del('/gas/:id')
  async delGasRecord(@Param('id') id: number) {
    return await this.expenditureService.delGasRecord(id);
  }
  @Post('/gas/:id')
  async updateGasRecord(@Param('id') id: number, @Body('count') count: number) {
    return await this.expenditureService.updateGasRecord(id, count);
  }
}
