import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovementEntity } from './movement.entity';

/**
 * Representa una sesión de caja registradora por día/turno.
 * Solo puede haber una caja abierta a la vez por sede.
 */
@Entity('cashbox')
export class CashboxEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  fecha: string;

  @Column('decimal', { precision: 10, scale: 2 })
  montoInicial: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  montoFinal: number | null;

  @Column('bool', { default: true })
  abierta: boolean;

  /** ID del usuario que abrió la caja */
  @Column('uuid')
  abiertaPorId: string;

  /** Nombre del usuario (desnormalizado para display) */
  @Column('text', { nullable: true })
  abiertaPor: string;

  /** ID del usuario que cerró la caja */
  @Column('uuid', { nullable: true })
  cerradaPorId: string | null;

  @Column('text', { nullable: true })
  cerradaPor: string | null;

  @Column('uuid', { nullable: true })
  branchId: string | null;

  @OneToMany(() => MovementEntity, (mov) => mov.cashbox, { cascade: true })
  movements: MovementEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
