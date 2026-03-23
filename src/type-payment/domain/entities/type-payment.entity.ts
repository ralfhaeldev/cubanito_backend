import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type_payment')
export class TypePaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  type: string;
}
