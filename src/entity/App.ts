import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chunk } from './Chunk';

@Entity('app')
export class App {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'version' })
  version: string;

  @Column('character varying', { name: 'notes' })
  notes: string;

  @Column('timestamp with time zone', { name: 'pub_date' })
  pub_date: Date;

  @Column('character varying', { name: 'signature', length: 1024 })
  signature: string;
  @Column('int4', { name: 'file_id' })
  file_id: number;

  @OneToOne(type => Chunk)
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  chunk: Chunk;
}
