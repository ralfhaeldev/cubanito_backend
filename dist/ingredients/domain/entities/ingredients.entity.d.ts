import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
export declare class IngredientsEntity {
    id: string;
    productId: string;
    product: ProductEntity;
    inventoryItemId: string;
    inventoryItem: InventoryEntity;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}
