import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { InventoryEntity } from './inventory.entity';

export type AdjustmentType = 'entrada' | 'salida' | 'ajuste';

/**
 * Registro histórico de todos los ajustes de inventario.
 * Incluye ajustes manuales, ventas y compras.
 */
@Entity('inventory_adjustments')
export class InventoryAdjustmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  inventoryItemId: string;

  @ManyToOne(() => InventoryEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'inventoryItemId' })
  inventoryItem: InventoryEntity;

  /** entrada = suma stock, salida = resta stock, ajuste = establece valor absoluto */
  @Column({ type: 'varchar', length: 20 })
  type: AdjustmentType;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('text')
  reason: string;

  /** Nombre del usuario que realizó el ajuste (desnormalizado para historial) */
  @Column('text', { nullable: true })
  createdByName: string;

  @CreateDateColumn()
  createdAt: Date;
}
