import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { IInventoryRepository } from '../../domain/inventory-repository.interface';

@Injectable()
export class TypeormInventoryRepository implements IInventoryRepository {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async create(inventory: InventoryEntity): Promise<InventoryEntity> {
    return this.inventoryRepository.save(inventory);
  }

  async findById(id: string): Promise<InventoryEntity | null> {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async findByBranchId(branchId: string): Promise<InventoryEntity[]> {
    return this.inventoryRepository.find({ where: { branchId } });
  }

  async findAll(): Promise<InventoryEntity[]> {
    return this.inventoryRepository.find();
  }

  async update(id: string, inventory: Partial<InventoryEntity>): Promise<InventoryEntity> {
    await this.inventoryRepository.update(id, inventory);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    await this.inventoryRepository.delete(id);
  }

  async adjustQuantity(id: string, adjustment: number): Promise<InventoryEntity> {
    const inventory = await this.findById(id);

    if (!inventory) {
      throw new BadRequestException(`Inventory item with id ${id} not found`);
    }

    const newQuantity = inventory.quantity + adjustment;

    if (newQuantity < 0) {
      throw new BadRequestException('Insufficient inventory quantity');
    }

    inventory.quantity = newQuantity;
    return this.inventoryRepository.save(inventory);
  }
}
