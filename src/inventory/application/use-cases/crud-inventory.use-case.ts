import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
  AdjustInventoryDto,
} from '../../interfaces/dtos/inventory.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';

@Injectable()
export class CrudInventoryUseCase {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<InventoryEntity> {
    if (createInventoryDto.branchId) {
      const branch = await this.branchRepository.findOne({
        where: { id: createInventoryDto.branchId },
      });

      if (!branch) {
        throw new NotFoundException(
          `Branch with id ${createInventoryDto.branchId} not found`,
        );
      }
    }

    const inventory = this.inventoryRepository.create({
      name: createInventoryDto.name,
      description: createInventoryDto.description,
      quantity: createInventoryDto.quantity,
      purchasePrice: createInventoryDto.purchasePrice,
      branchId: createInventoryDto.branchId,
    });

    return this.inventoryRepository.save(inventory);
  }

  async findAll(paginationDto: PaginationDto): Promise<InventoryEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.inventoryRepository.find({
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findByBranchId(branchId: string): Promise<InventoryEntity[]> {
    const branch = await this.branchRepository.findOne({
      where: { id: branchId },
    });

    if (!branch) {
      throw new NotFoundException(`Branch with id ${branchId} not found`);
    }

    return this.inventoryRepository.find({
      where: { branchId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<InventoryEntity> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['branch', 'ingredients'],
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory item with id ${id} not found`);
    }

    return inventory;
  }

  async update(id: string, updateInventoryDto: UpdateInventoryDto): Promise<InventoryEntity> {
    const inventory = await this.findOne(id);

    Object.assign(inventory, updateInventoryDto);

    return this.inventoryRepository.save(inventory);
  }

  async adjustQuantity(
    id: string,
    adjustInventoryDto: AdjustInventoryDto,
  ): Promise<InventoryEntity> {
    const inventory = await this.findOne(id);

    const newQuantity = inventory.quantity + adjustInventoryDto.adjustment;

    if (newQuantity < 0) {
      throw new BadRequestException('Insufficient inventory quantity');
    }

    inventory.quantity = newQuantity;

    return this.inventoryRepository.save(inventory);
  }

  async delete(id: string): Promise<void> {
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
  }
}
