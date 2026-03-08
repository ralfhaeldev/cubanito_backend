import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
export declare class BranchEntity {
    id: string;
    name: string;
    address: string;
    phone: string;
    isActive: boolean;
    products: ProductEntity[];
    inventories: InventoryEntity[];
    orders: OrderEntity[];
    createdAt: Date;
    updatedAt: Date;
}
