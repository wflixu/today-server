import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('location')
export class QLocation {
  @PrimaryGeneratedColumn()
  location_id: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  latitude: number;

  @Column({ type: 'numeric', precision: 9, scale: 6 })
  longitude: number;
}
