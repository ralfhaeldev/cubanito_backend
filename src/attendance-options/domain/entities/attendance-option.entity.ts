import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attendance_options')
export class AttendanceOptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  amount: number;
}
