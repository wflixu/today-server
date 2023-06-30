import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Permission } from './Permission';
import { Role } from './Role';

@Index('_copy_1', ['id'], { unique: true })
@Entity('role_permission', { schema: 'public' })
export class RolePermission {
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

  @ManyToOne(() => Permission, permission => permission.rolePermissions)
  @JoinColumn([{ name: 'permission_id', referencedColumnName: 'id' }])
  permission: Permission;

  @ManyToOne(() => Role, role => role.rolePermissions)
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Role;
}
