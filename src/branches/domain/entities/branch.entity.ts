import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';

/**
 * Entity que representa una sede o sucursal del restaurante
 * Permite la gestión multi-sede del sistema
 */
@Entity('branches')
export class BranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @OneToMany(() => ProductEntity, (product) => product.branch, {
    cascade: true,
  })
  products: ProductEntity[];

  @OneToMany(() => InventoryEntity, (inventory) => inventory.branch, {
    cascade: true,
  })
  inventories: InventoryEntity[];

  @OneToMany(() => OrderEntity, (order) => order.branch, {
    cascade: true,
  })
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
