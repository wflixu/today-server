import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Post } from './Post'; // 假设 Post 实体已经定义
import { User } from './User'; // 假设 User 实体已经定义

@Entity('participant')
export class Participant {
  @PrimaryGeneratedColumn()
  participant_id: number;

  @Column({ name: 'post_id', type: 'int' })
  post_id: number;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'post_id' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({
    name: 'joined_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  joinedAt: Date;
}
