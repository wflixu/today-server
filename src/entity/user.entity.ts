import { Entity, Column, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  username: string;
  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;
  @Column({
    type: 'varchar',
    length: 30,
    default: Date.now().toString(),
  })
  nickname: string;
}
