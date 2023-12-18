import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expenditure')
export class Expenditure {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('int4')
  count: number;

  @Column('int2', { default: 1 })
  kind: number;

  @Column('timestamp without time zone', { default: new Date() })
  created: Date;

  @Column('int4', { name: 'user_id' })
  userId: number;
}
