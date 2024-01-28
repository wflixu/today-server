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

  @Column('character varying', { name: 'version', default: '' })
  version: string;

  @Column('character varying', { name: 'notes', default: '' })
  notes: string;

  @Column('timestamp without time zone', { name: 'date', default: new Date() })
  date: Date;

  @OneToOne(type => Chunk)
  @JoinColumn({ name: 'file_id', referencedColumnName: 'id' })
  chunk: Chunk;
}
