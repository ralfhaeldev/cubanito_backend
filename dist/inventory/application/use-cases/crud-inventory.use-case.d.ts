import { Repository } from 'typeorm';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { CreateInventoryDto, UpdateInventoryDto, AdjustInventoryDto } from '../../interfaces/dtos/inventory.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
export declare class CrudInventoryUseCase {
    private readonly inventoryRepository;
    private readonly branchRepository;
    constructor(inventoryRepository: Repository<InventoryEntity>, branchRepository: Repository<BranchEntity>);
    create(createInventoryDto: CreateInventoryDto): Promise<InventoryEntity>;
    findAll(paginationDto: PaginationDto): Promise<InventoryEntity[]>;
    findByBranchId(branchId: string): Promise<InventoryEntity[]>;
    findOne(id: string): Promise<InventoryEntity>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<InventoryEntity>;
    adjustQuantity(id: string, adjustInventoryDto: AdjustInventoryDto): Promise<InventoryEntity>;
    delete(id: string): Promise<void>;
}
