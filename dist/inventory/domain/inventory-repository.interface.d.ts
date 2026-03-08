import { InventoryEntity } from './entities/inventory.entity';
export interface IInventoryRepository {
    create(inventory: InventoryEntity): Promise<InventoryEntity>;
    findById(id: string): Promise<InventoryEntity | null>;
    findByBranchId(branchId: string): Promise<InventoryEntity[]>;
    findAll(): Promise<InventoryEntity[]>;
    update(id: string, inventory: Partial<InventoryEntity>): Promise<InventoryEntity>;
    delete(id: string): Promise<void>;
    adjustQuantity(id: string, adjustment: number): Promise<InventoryEntity>;
}
export declare const InventoryRepository: unique symbol;
