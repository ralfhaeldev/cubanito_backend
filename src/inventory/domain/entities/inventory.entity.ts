import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';

/**
 * Entity que representa los artículos del inventario
 * Puede ser tanto un producto simple como un insumo para productos preparados
 * Gestiona el stock y el costo de compra por sede
 */
@Entity('inventory')
export class InventoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  minQuantity: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  idealQuantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  /** Unidad de medida: kg, g, und, lt, ml */
  @Column('text', { default: 'und' })
  unit: string;

  /** Categoría del ítem (Panadería, Carnes, Lácteos, etc.) */
  @Column('text', { nullable: true })
  category: string;

  @Column('bool', { default: true })
  isActive: boolean;

  /** Fecha del último ajuste de inventario */
  @Column('timestamp', { nullable: true })
  lastAdjustedAt: Date | null;

  @Column('uuid', { nullable: true })
  branchId: string;

  @ManyToOne(() => BranchEntity, (branch) => branch.inventories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @OneToMany(() => IngredientsEntity, (ingredient) => ingredient.inventoryItem)
  ingredients: IngredientsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
