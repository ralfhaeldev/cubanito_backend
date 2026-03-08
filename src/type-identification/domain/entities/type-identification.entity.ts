import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type_identifications')
export class TypeIdentificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  type: string;
}
