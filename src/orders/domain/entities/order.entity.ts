import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { OrderStatus, OrderType } from 'src/common/enums/order-status.enum';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { OrderItemEntity } from './order-item.entity';

/**
 * Entity que representa un pedido en el sistema
 * Gestiona el flujo completo: Pendiente → En Proceso → Preparado → [Enviado] → Entregado → Finalizado
 * Rastrea qué usuario cambió el estado del pedido
 */
@Entity('orders')
@Index(['branchId', 'status'])
@Index(['createdAt'])
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  branchId: string;

  @ManyToOne(() => BranchEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @Column('enum', { enum: OrderType, default: OrderType.LOCAL })
  type: OrderType;

  @Column('enum', { enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column('uuid')
  createdByUserId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'createdByUserId' })
  createdByUser: UserEntity;

  @Column('uuid', { nullable: true })
  lastStatusChangedByUserId: string;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'lastStatusChangedByUserId' })
  lastStatusChangedByUser: UserEntity;

  @Column('text', { nullable: true })
  notes: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  realCost: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  realMargin: number;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('timestamp', { nullable: true })
  completedAt: Date;
}
