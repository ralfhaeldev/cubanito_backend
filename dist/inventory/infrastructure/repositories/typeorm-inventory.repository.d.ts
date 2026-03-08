import { Repository } from 'typeorm';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { IInventoryRepository } from '../../domain/inventory-repository.interface';
export declare class TypeormInventoryRepository implements IInventoryRepository {
    private readonly inventoryRepository;
    constructor(inventoryRepository: Repository<InventoryEntity>);
    create(inventory: InventoryEntity): Promise<InventoryEntity>;
    findById(id: string): Promise<InventoryEntity | null>;
    findByBranchId(branchId: string): Promise<InventoryEntity[]>;
    findAll(): Promise<InventoryEntity[]>;
    update(id: string, inventory: Partial<InventoryEntity>): Promise<InventoryEntity>;
    delete(id: string): Promise<void>;
    adjustQuantity(id: string, adjustment: number): Promise<InventoryEntity>;
}
