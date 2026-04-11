import { Expenditure } from './../entity/Expenditure';
import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';

@Provide()
export class ExpenditureService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Expenditure)
  expenditureModel: Repository<Expenditure>;

  async addExpend(count: number, kind: number) {
    const userId = this.ctx.state.user?.id;
    const record = this.expenditureModel.create({ count, userId, kind });
    await this.expenditureModel.save(record);
    return record;
  }
  async addGasRecord(count: number) {
    const userId = this.ctx.state.user?.id;
    const record = this.expenditureModel.create({ count, userId });
    await this.expenditureModel.save(record);
    return record;
  }
  async delGasRecord(id: number) {
    return await this.expenditureModel.delete(id);
  }
  async updateGasRecord(id: number, count: number) {
    const row = await this.expenditureModel.findOneBy({ id });
    row.count = count;
    row.created = new Date();
    return await this.expenditureModel.save(row);
  }
  async getGasList() {
    const userId = this.ctx.state.user.id;
    return await this.expenditureModel.findBy({ userId, kind: 1 });
  }
  async getExpendList(kind) {
    const userId = this.ctx.state.user.id;
    const res = await this.expenditureModel.findBy({ userId, kind });
    return res.map(item => {
      return {
        ...item,
        count: Number(item.count),
      };
    });
  }
}
