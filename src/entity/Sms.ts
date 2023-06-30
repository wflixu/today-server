import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms')
export class Sms {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'phone' })
  phone: string;

  @Column('smallint')
  code: number;

  @Column('inet')
  ip: string;

  @Column({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;
}
