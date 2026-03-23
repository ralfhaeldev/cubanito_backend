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

  async create(createBranchDto: CreateBranchDto): Promise<any> {
    const existingBranch = await this.branchRepository.findOne({
      where: { name: createBranchDto.nombre },
    });

    if (existingBranch) {
      throw new ConflictException(`Sede con nombre ${createBranchDto.nombre} ya existe`);
    }

    const branch = this.branchRepository.create({
      name: createBranchDto.nombre,
      isActive: createBranchDto.activa !== false,
      address: createBranchDto.address,
      phone: createBranchDto.phone,
    });

    const saved = await this.branchRepository.save(branch);
    return this.mapBranch(saved);
  }

  async findAll(paginationDto: PaginationDto): Promise<any[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    const branches = await this.branchRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
    return branches.map(this.mapBranch);
  }

  async findOne(id: string): Promise<any> {
    const branch = await this.branchRepository.findOne({
      where: { id },
    });

    if (!branch) {
      throw new NotFoundException(`Sede con id ${id} no encontrada`);
    }

    return this.mapBranch(branch);
  }

  async update(id: string, updateBranchDto: UpdateBranchDto): Promise<any> {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) throw new NotFoundException(`Sede con id ${id} no encontrada`);

    if (updateBranchDto.nombre && updateBranchDto.nombre !== branch.name) {
      const existingBranch = await this.branchRepository.findOne({
        where: { name: updateBranchDto.nombre },
      });

      if (existingBranch) {
        throw new ConflictException(
          `Sede con nombre ${updateBranchDto.nombre} ya existe`,
        );
      }
      branch.name = updateBranchDto.nombre;
    }

    if (updateBranchDto.activa !== undefined) branch.isActive = updateBranchDto.activa;
    if (updateBranchDto.address !== undefined) branch.address = updateBranchDto.address;
    if (updateBranchDto.phone !== undefined) branch.phone = updateBranchDto.phone;

    const saved = await this.branchRepository.save(branch);
    return this.mapBranch(saved);
  }

  async delete(id: string): Promise<void> {
    const branch = await this.branchRepository.findOne({ where: { id } });
    if (!branch) throw new NotFoundException(`Sede con id ${id} no encontrada`);
    await this.branchRepository.remove(branch);
  }

  private mapBranch(b: BranchEntity): any {
    return {
      id: b.id,
      nombre: b.name,
      activa: b.isActive,
      address: b.address,
      phone: b.phone,
    };
  }
}
