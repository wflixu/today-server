import { Inject, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Chunk } from '../entity/Chunk';
import { Repository } from 'typeorm';
import { rm } from 'node:fs/promises';
import { resolve } from 'node:path';

@Provide()
export class ChunkService {
  @Inject()
  ctx: Context;

  @InjectEntityModel(Chunk)
  chunkModel: Repository<Chunk>;

  async addChunk(pc: Chunk) {
    const userId = this.ctx.state.user?.id ?? 22;
    const chunk = this.chunkModel.create({ userId, ...pc });
    return this.chunkModel.save(chunk);
  }
  async getChunk(id: number) {
    return this.chunkModel.findOneBy({ id });
  }

  async getChunks() {
    return this.chunkModel.findBy({});
  }
  async getUserChunks() {
    const userId: number = this.ctx.state.user?.id ?? 22;
    return this.chunkModel.findBy({
      userId,
    });
  }
  async delChunk(chunk: Chunk) {
    return this.chunkModel.remove(chunk);
  }

  async delChunkAndFile(chunk: Chunk) {
    await this.chunkModel.delete(chunk.id);
    await rm(resolve(chunk.data));
    return;
  }
}