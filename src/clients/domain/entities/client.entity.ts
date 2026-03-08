import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Sex } from '../enums/sex.enum';

@Entity('clients')
export class ClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => TypeIdentificationEntity, { eager: true, nullable: false })
  @JoinColumn({ name: 'type_identification_id' }) // columna FK en la tabla clients
  typeIdentification: TypeIdentificationEntity;

  @Column('text', { unique: true })
  identification: string;

  @Column('text')
  name: string;

  @Column('text')
  fullName: string;

  @Column('text')
  address: string;

  @Column('date')
  birthDate: Date;

  @Column('text', { unique: true })
  phone: string;

  @Column({
    type: 'enum',
    enum: Sex,
    nullable: false,
  })
  sex: Sex;
}
