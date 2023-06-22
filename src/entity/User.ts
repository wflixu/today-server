import {
  Column,
  Index,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './UserRole';

// @Index("_copy_4", ["id"], { unique: true })
@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('smallint', { name: 'state', nullable: true })
  state: number | null;

  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @Column('character varying', { name: 'img_url', nullable: true, length: 255 })
  imgUrl: string | null;

  @Column('character varying', { name: 'mobile', nullable: true, length: 11 })
  mobile: string | null;

  @Column('character varying', { name: 'salt', nullable: true, length: 64 })
  salt: string | null;

  @Column('character varying', { name: 'password', nullable: true, length: 64 })
  password: string | null;

  @Column('timestamp without time zone', { name: 'created', nullable: true })
  created: Date | null;

  @Column('character varying', { name: 'creator', nullable: true, length: 32 })
  creator: string | null;

  @Column('timestamp without time zone', { name: 'edited', nullable: true })
  edited: Date | null;

  @Column('character varying', { name: 'editor', nullable: true, length: 32 })
  editor: string | null;

  @Column('smallint', { name: 'deleted', nullable: true, default: () => '0' })
  deleted: number | null;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];
}
