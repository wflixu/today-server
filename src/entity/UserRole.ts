import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Role } from './Role';
import { User } from './User';

@Index('_copy_2', ['id'], { unique: true })
@Entity('user_role', { schema: 'public' })
export class UserRole {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

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

  @ManyToOne(() => Role, role => role.userRoles)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;

  @ManyToOne(() => User, user => user.userRoles)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
