import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';  // 假设你有一个 User 实体
import { QLocation } from './QLocation';


@Entity('post')
export class Post {
    @PrimaryGeneratedColumn()
    post_id: number;

    @ManyToOne(() => User)  // 关联到用户表
    @JoinColumn({ name: 'user_id' })  // 指定外键列名
    user: User;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    event_time: Date;

    @Column({ type: 'varchar', length: 255 })
    contact_name: string;

    @Column({ type: 'varchar', length: 20 })
    contact_phone: string;

    @ManyToOne(() => QLocation)  // 关联到位置表
    @JoinColumn({ name: 'location_id' })
    location: QLocation;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    update_at: Date;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}