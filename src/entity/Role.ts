import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RolePermission } from './RolePermission';
import { UserRole } from './UserRole';

@Index('role_pkey', ['id'], { unique: true })
@Entity('role', { schema: 'public' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @PrimaryGeneratedColumn({ type: 'integer', name: 'parent_id' })
  parentId: number;

  @Column('character varying', { name: 'code', nullable: true, length: 64 })
  code: string | null;

  @Column('character varying', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @Column('character varying', { name: 'desc', nullable: true, length: 255 })
  desc: string | null;

  @Column('timestamp without time zone', { name: 'created', nullable: true })
  created: Date | null;

  @Column('character varying', { name: 'creator', nullable: true, length: 64 })
  creator: string | null;

  @Column('timestamp without time zone', { name: 'edited', nullable: true })
  edited: Date | null;

  @Column('character varying', { name: 'editor', nullable: true, length: 64 })
  editor: string | null;

  @Column('smallint', { name: 'deleted', nullable: true, default: () => '0' })
  deleted: number | null;

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];
}
