import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('api_log')
export class ApiLog {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'ip' })
  ip: string;

  @Column('character varying', { name: 'url' })
  url: string;

  @Column('timestamp', { name: 'date' })
  date: Date;

  @Column('int4', { name: 'user_id' })
  userId: number;
}
