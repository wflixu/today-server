import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entity/App';
import { Chunk } from '../entity/Chunk';

@Provide()
export class AppService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(App)
  appModel: Repository<App>;
  @InjectEntityModel(Chunk)
  chunkModel: Repository<Chunk>;

  async addRelease(pc: Partial<App>) {
    const chunk = await this.chunkModel.findOneBy({ id: pc.file_id });
    const release = this.appModel.create(pc);
    release.chunk = chunk;
    return this.appModel.save(release);
  }

  async getLatest() {
    const one = await this.appModel
      .createQueryBuilder('app')
      .orderBy('app.pub_date', 'DESC')
      .take(1)
      .getOne();

    return one;
  }
}
