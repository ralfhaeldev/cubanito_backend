import { Repository } from 'typeorm';
import { BranchEntity } from '../../domain/entities/branch.entity';
import { CreateBranchDto, UpdateBranchDto } from '../../interfaces/dtos/branch.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class CrudBranchUseCase {
    private readonly branchRepository;
    constructor(branchRepository: Repository<BranchEntity>);
    create(createBranchDto: CreateBranchDto): Promise<BranchEntity>;
    findAll(paginationDto: PaginationDto): Promise<BranchEntity[]>;
    findOne(id: string): Promise<BranchEntity>;
    update(id: string, updateBranchDto: UpdateBranchDto): Promise<BranchEntity>;
    delete(id: string): Promise<void>;
}
