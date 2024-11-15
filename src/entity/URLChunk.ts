import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Chunk } from './Chunk';

@Entity('url_chunk')
export class URLChunk {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'url' })
  url: string;

  @Column('int4', { name: 'chunk_id' })
  chunkId: number;
  // 建立与Chunk实体的一对一关系
  @OneToOne(() => Chunk)
  @JoinColumn({ name: 'chunk_id', referencedColumnName: 'id' })
  chunk: Chunk;
}
