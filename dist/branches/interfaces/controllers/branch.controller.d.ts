import { CrudBranchUseCase } from '../../application/use-cases/crud-branch.use-case';
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class BranchController {
    private readonly crudBranchUseCase;
    constructor(crudBranchUseCase: CrudBranchUseCase);
    create(createBranchDto: CreateBranchDto): Promise<import("../../domain/entities/branch.entity").BranchEntity>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/branch.entity").BranchEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/branch.entity").BranchEntity>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<import("../../domain/entities/branch.entity").BranchEntity>;
    delete(id: string): Promise<void>;
}
