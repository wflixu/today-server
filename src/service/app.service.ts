import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { App } from '../entity/App';
import { Chunk } from '../entity/Chunk';
import { IPagination } from '../interface';
import { INewReleaseParam } from '../controller/release.controller';

@Provide()
export class AppService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(App)
  appModel: Repository<App>;
  @InjectEntityModel(Chunk)
  chunkModel: Repository<Chunk>;

  async addRelease(pr: INewReleaseParam) {
    const release = this.appModel.create({
      ...pr,
    } as Partial<App>);
    if (pr.file_id) {
      const chunk = await this.chunkModel.findOneBy({
        id: pr.file_id,
      });
      release.chunk = chunk;
    }

    return this.appModel.save(release);
  }
  async getPagRecords(pag: IPagination) {
    const pagRecords = await this.appModel
      .createQueryBuilder('app')
      .innerJoinAndSelect('app.chunk', 'chunk')
      .orderBy('app.date', 'DESC')
      .skip(pag.pageSize * (pag.current - 1))
      .take(pag.pageSize)
      .getMany();
    const total = await this.appModel
      .createQueryBuilder('app')
      .orderBy('app.date', 'DESC')
      .getCount();

    return {
      records: pagRecords,
      ...pag,
      total,
    };
  }
  async getLatest() {
    const one = await this.appModel
      .createQueryBuilder('app')
      .orderBy('app.date', 'DESC')
      .take(1)
      .getOne();

    return one;
  }
  async removeRelease(id: number) {
    return await this.appModel.delete(id);
  }
  async getAppUpdateJson(id: number) {
    const app = await this.appModel.findOne({
      where: {
        id,
      },
      relations: {
        chunk: true,
      },
    });
    if (app && app.chunk) {
      return app.chunk;
    }
  }
}
