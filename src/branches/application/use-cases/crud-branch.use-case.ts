import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BranchEntity } from '../../domain/entities/branch.entity';
import { CreateBranchDto, UpdateBranchDto } from '../../interfaces/dtos/branch.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CrudBranchUseCase {
  constructor(
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  async create(createBranchDto: CreateBranchDto): Promise<BranchEntity> {
    const existingBranch = await this.branchRepository.findOne({
      where: { name: createBranchDto.name },
    });

    if (existingBranch) {
      throw new ConflictException(`Branch with name ${createBranchDto.name} already exists`);
    }

    const branch = this.branchRepository.create({
      name: createBranchDto.name,
      address: createBranchDto.address,
      phone: createBranchDto.phone,
    });

    return this.branchRepository.save(branch);
  }

  async findAll(paginationDto: PaginationDto): Promise<BranchEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.branchRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<BranchEntity> {
    const branch = await this.branchRepository.findOne({
      where: { id },
      relations: ['products', 'inventories', 'orders'],
    });

    if (!branch) {
      throw new NotFoundException(`Branch with id ${id} not found`);
    }

    return branch;
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<BranchEntity> {
    const branch = await this.findOne(id);

    if (updateBranchDto.name && updateBranchDto.name !== branch.name) {
      const existingBranch = await this.branchRepository.findOne({
        where: { name: updateBranchDto.name },
      });

      if (existingBranch) {
        throw new ConflictException(
          `Branch with name ${updateBranchDto.name} already exists`,
        );
      }
    }

    Object.assign(branch, updateBranchDto);

    return this.branchRepository.save(branch);
  }

  async delete(id: string): Promise<void> {
    const branch = await this.findOne(id);
    await this.branchRepository.remove(branch);
  }
}
