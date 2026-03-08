import { OrderEntity } from './order.entity';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
export declare class OrderItemEntity {
    id: string;
    orderId: string;
    order: OrderEntity;
    productId: string;
    product: ProductEntity;
    quantity: number;
    unitPrice: number;
    realCost: number;
    createdAt: Date;
}
