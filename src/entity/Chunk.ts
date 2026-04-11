import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chunk')
export class Chunk {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('character varying', { name: 'filename' })
  filename: string;

  @Column('character varying', { name: 'data' })
  data: string;

  @Column('character varying', { name: 'mime_type' })
  mimeType: string;

  @Column('character varying', { name: 'field_name' })
  fieldName: string;

  @Column('int4', { name: 'user_id' })
  userId: number;
}
