import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryEntity } from '../../domain/entities/inventory.entity';
import { InventoryAdjustmentEntity } from '../../domain/entities/inventory-adjustment.entity';
import { CreateInventoryDto, UpdateInventoryDto, AdjustInventoryDto, CreateAdjustmentDto } from '../../interfaces/dtos/inventory.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';

@Injectable()
export class CrudInventoryUseCase {
  constructor(
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(InventoryAdjustmentEntity)
    private readonly adjustmentRepository: Repository<InventoryAdjustmentEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  async create(dto: CreateInventoryDto): Promise<any> {
    if (dto.branchId) {
      const branch = await this.branchRepository.findOne({ where: { id: dto.branchId } });
      if (!branch) throw new NotFoundException(`Sede con id ${dto.branchId} no encontrada`);
    }

    const inventory = this.inventoryRepository.create({
      name: dto.nombre,
      description: dto.description,
      quantity: dto.stockActual,
      minQuantity: dto.stockMinimo ?? 0,
      idealQuantity: dto.stockIdeal ?? 0,
      purchasePrice: dto.purchasePrice ?? 0,
      unit: dto.unidad ?? 'und',
      category: dto.categoria,
      isActive: dto.activo !== false,
      branchId: dto.branchId,
    });

    const saved = await this.inventoryRepository.save(inventory);
    return this.mapInventory(saved);
  }

  async findAll(paginationDto: PaginationDto): Promise<any[]> {
    const { limit = 100, offset = 0 } = paginationDto;
    const items = await this.inventoryRepository.find({
      take: limit, skip: offset, order: { category: 'ASC', name: 'ASC' },
    });
    return items.map(this.mapInventory);
  }

  async findByBranchId(branchId: string): Promise<any[]> {
    const branch = await this.branchRepository.findOne({ where: { id: branchId } });
    if (!branch) throw new NotFoundException(`Sede con id ${branchId} no encontrada`);
    const items = await this.inventoryRepository.find({ where: { branchId }, order: { category: 'ASC', name: 'ASC' } });
    return items.map(this.mapInventory);
  }

  async findOne(id: string): Promise<any> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) throw new NotFoundException(`Ítem de inventario con id ${id} no encontrado`);
    return this.mapInventory(inventory);
  }

  async update(id: string, dto: UpdateInventoryDto): Promise<any> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) throw new NotFoundException(`Ítem de inventario con id ${id} no encontrado`);

    if (dto.nombre !== undefined) inventory.name = dto.nombre;
    if (dto.stockActual !== undefined) inventory.quantity = dto.stockActual;
    if (dto.stockMinimo !== undefined) inventory.minQuantity = dto.stockMinimo;
    if (dto.stockIdeal !== undefined) inventory.idealQuantity = dto.stockIdeal;
    if (dto.unidad !== undefined) inventory.unit = dto.unidad;
    if (dto.categoria !== undefined) inventory.category = dto.categoria;
    if (dto.activo !== undefined) inventory.isActive = dto.activo;
    if (dto.purchasePrice !== undefined) inventory.purchasePrice = dto.purchasePrice;

    const saved = await this.inventoryRepository.save(inventory);
    return this.mapInventory(saved);
  }

  async adjustQuantity(id: string, dto: AdjustInventoryDto): Promise<any> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) throw new NotFoundException(`Ítem de inventario con id ${id} no encontrado`);
    const newQuantity = Number(inventory.quantity) + dto.adjustment;
    if (newQuantity < 0) throw new BadRequestException('Cantidad insuficiente en inventario');
    inventory.quantity = newQuantity;
    inventory.lastAdjustedAt = new Date();
    const saved = await this.inventoryRepository.save(inventory);
    return this.mapInventory(saved);
  }

  async delete(id: string): Promise<void> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) throw new NotFoundException(`Ítem de inventario con id ${id} no encontrado`);
    await this.inventoryRepository.remove(inventory);
  }

  async findAllAdjustments(paginationDto: PaginationDto): Promise<any[]> {
    const { limit = 100, offset = 0 } = paginationDto;
    const adjustments = await this.adjustmentRepository.find({
      take: limit, skip: offset,
      order: { createdAt: 'DESC' },
      relations: ['inventoryItem'],
    });
    return adjustments.map(this.mapAdjustment);
  }

  async createAdjustment(dto: CreateAdjustmentDto, createdByName?: string): Promise<any> {
    const item = await this.inventoryRepository.findOne({ where: { id: dto.itemId } });
    if (!item) throw new NotFoundException(`Ítem de inventario con id ${dto.itemId} no encontrado`);

    let newStock = Number(item.quantity);
    if (dto.tipo === 'entrada') newStock += dto.cantidad;
    else if (dto.tipo === 'salida') newStock = Math.max(0, newStock - dto.cantidad);
    else newStock = dto.cantidad;

    item.quantity = newStock;
    item.lastAdjustedAt = new Date();
    await this.inventoryRepository.save(item);

    const adjustment = this.adjustmentRepository.create({
      inventoryItemId: dto.itemId,
      type: dto.tipo,
      quantity: dto.cantidad,
      reason: dto.motivo,
      createdByName: createdByName ?? 'Sistema',
    });

    const saved = await this.adjustmentRepository.save(adjustment);
    return {
      ...this.mapAdjustment(saved),
      itemNombre: item.name,
    };
  }

  private mapInventory(i: InventoryEntity): any {
    return {
      id: i.id,
      nombre: i.name,
      unidad: i.unit,
      stockActual: Number(i.quantity),
      stockMinimo: Number(i.minQuantity),
      stockIdeal: Number(i.idealQuantity),
      categoria: i.category ?? '',
      activo: i.isActive,
      ultimoAjuste: i.lastAdjustedAt ? i.lastAdjustedAt.toISOString() : null,
    };
  }

  private mapAdjustment(a: InventoryAdjustmentEntity): any {
    return {
      id: a.id,
      itemId: a.inventoryItemId,
      itemNombre: (a as any).inventoryItem?.name ?? a.createdByName ?? '',
      tipo: a.type,
      cantidad: Number(a.quantity),
      motivo: a.reason,
      creadoPor: a.createdByName ?? 'Sistema',
      createdAt: a.createdAt,
    };
  }
}
