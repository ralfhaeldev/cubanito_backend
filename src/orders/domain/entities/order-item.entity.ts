import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/products/domain/entities/product.entity';

/**
 * Entity que representa un producto dentro de un pedido
 * Almacena la información del producto al momento del pedido (historial de precios)
 */
@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  orderId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity;

  @Column('uuid')
  productId: string;

  @ManyToOne(() => ProductEntity, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'productId' })
  product: ProductEntity;

  @Column('int')
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  realCost: number;

  @CreateDateColumn()
  createdAt: Date;
}
