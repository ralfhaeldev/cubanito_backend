import { CrudInventoryUseCase } from '../../application/use-cases/crud-inventory.use-case';
import { CreateInventoryDto, UpdateInventoryDto, AdjustInventoryDto } from '../dtos/inventory.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class InventoryController {
    private readonly crudInventoryUseCase;
    constructor(crudInventoryUseCase: CrudInventoryUseCase);
    create(createInventoryDto: CreateInventoryDto): Promise<import("../../domain/entities/inventory.entity").InventoryEntity>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/inventory.entity").InventoryEntity[]>;
    findByBranchId(branchId: string): Promise<import("../../domain/entities/inventory.entity").InventoryEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/inventory.entity").InventoryEntity>;
    update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<import("../../domain/entities/inventory.entity").InventoryEntity>;
    adjustQuantity(id: string, adjustInventoryDto: AdjustInventoryDto): Promise<import("../../domain/entities/inventory.entity").InventoryEntity>;
    delete(id: string): Promise<void>;
}
