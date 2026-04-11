import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('expenditure')
export class Expenditure {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('numeric', { precision: 5, scale: 2 })
  count: number;

  @Column('int2', { default: 1 })
  kind: number;

  @Column('timestamp without time zone', { default: new Date() })
  created: Date;

  @Column('int4', { name: 'user_id' })
  userId: number;
}
