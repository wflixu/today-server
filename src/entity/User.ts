import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRole } from './UserRole';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('smallint', { name: 'state', nullable: false, default: 0 })
  state: number | null;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', { name: 'img_url', nullable: true, length: 255 })
  imgUrl: string | null;

  @Column('character varying', { name: 'phone', nullable: true, length: 11 })
  phone: string | null;

  @Column('character varying', {
    name: 'password',
    nullable: true,
    length: 64,
    select: false,
  })
  password: string | null;

  @Column('character varying', {
    name: 'salt',
    nullable: true,
    length: 64,
    select: false,
  })
  salt: string | null;

  @Column({
    type: 'timestamp',
  })
  created: Date;

  @Column('character varying', { name: 'creator', nullable: true, length: 32 })
  creator: string | null;

  @Column({
    type: 'timestamp',
  })
  edited: Date;

  @Column('character varying', { name: 'editor', nullable: true, length: 32 })
  editor: string | null;

  @Column('smallint', { name: 'deleted', nullable: true, default: () => '0' })
  deleted: number | null;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];
}
