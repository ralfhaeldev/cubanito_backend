import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';

/**
 * Entity que representa los ingredientes/insumos de un producto preparado
 * Vincula un producto con sus componentes del inventario y las cantidades necesarias
 */
@Entity('ingredients')
export class IngredientsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => ProductEntity, (product) => product.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column('uuid')
  inventoryItemId: string;

  @ManyToOne(() => InventoryEntity, (inventory) => inventory.ingredients, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'inventoryItemId' })
  inventoryItem: InventoryEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
