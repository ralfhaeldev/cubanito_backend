import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from '../../interfaces/dtos/order.dto';
import { OrderStatus, OrderType } from 'src/common/enums/order-status.enum';
import { ProductType } from 'src/common/enums/product-status.enum';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';
import { Role } from 'src/common/enums/roles.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';

@Injectable()
export class CrudOrderUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
    @InjectRepository(IngredientsEntity)
    private readonly ingredientsRepository: Repository<IngredientsEntity>,
  ) {}

  async create(createOrderDto: CreateOrderDto, userId: string, userBranchId?: string): Promise<any> {
    const branchId = createOrderDto.branchId ?? userBranchId;

    let totalAmount = 0;
    for (const item of createOrderDto.items) {
      totalAmount += (item.precioUnitario ?? 0) * item.cantidad;
    }

    const order = this.orderRepository.create({
      branchId: branchId ?? null,
      type: createOrderDto.tipo,
      status: OrderStatus.PENDING,
      createdByUserId: userId,
      notes: createOrderDto.notes ?? null,
      totalAmount,
      clienteNombre: createOrderDto.clienteDomicilio?.nombre ?? null,
      clienteTelefono: createOrderDto.clienteDomicilio?.telefono ?? null,
      clienteDireccion: createOrderDto.clienteDomicilio?.direccion ?? null,
    });

    const savedOrder = await this.orderRepository.save(order);

    for (const item of createOrderDto.items) {
      const product = item.productoId
        ? await this.productRepository.findOne({ where: { id: item.productoId } })
        : null;

      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.productoId,
        productoNombre: item.productoNombre ?? product?.title ?? '',
        quantity: item.cantidad,
        unitPrice: item.precioUnitario,
      });
      await this.orderItemRepository.save(orderItem);
    }

    return this.findOne(savedOrder.id);
  }

  async findActive(branchId?: string): Promise<any[]> {
    const inactiveStatuses = [OrderStatus.FINALIZADO, OrderStatus.RECHAZADO];
    const orders = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'items')
      .leftJoinAndSelect('order.createdByUser', 'createdByUser')
      .where('order.status NOT IN (:...statuses)', { statuses: inactiveStatuses })
      .andWhere(branchId ? 'order.branchId = :branchId' : '1=1', branchId ? { branchId } : {})
      .orderBy('order.createdAt', 'DESC')
      .getMany();
    return orders.map(this.mapOrder);
  }

  async findAll(paginationDto: PaginationDto, branchId?: string): Promise<any[]> {
    const { limit = 50, offset = 0 } = paginationDto;
    const orders = await this.orderRepository.find({
      where: branchId ? { branchId } : {},
      relations: ['items', 'createdByUser'],
      take: limit, skip: offset,
      order: { createdAt: 'DESC' },
    });
    return orders.map(this.mapOrder);
  }

  async findOne(id: string): Promise<any> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'createdByUser'],
    });
    if (!order) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    return this.mapOrder(order);
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, userRol: Role): Promise<any> {
    const order = await this.orderRepository.findOne({ where: { id }, relations: ['items'] });
    if (!order) throw new NotFoundException(`Pedido con id ${id} no encontrado`);

    this.validateStatusTransition(order.status, dto.estado, userRol);

    if (dto.estado === OrderStatus.FINALIZADO && order.status !== OrderStatus.FINALIZADO) {
      await this.applyInventoryDeduction(order);
    }

    order.status = dto.estado;
    order.lastStatusChangedByUserId = userId;
    if (dto.notes) order.notes = dto.notes;
    if (dto.estado === OrderStatus.FINALIZADO) order.completedAt = new Date();

    const saved = await this.orderRepository.save(order);
    return this.mapOrder(saved);
  }

  async finalizar(id: string, userId: string, userRol: Role): Promise<{ success: boolean }> {
    await this.updateStatus(id, { estado: OrderStatus.FINALIZADO }, userId, userRol);
    return { success: true };
  }

  private async applyInventoryDeduction(order: OrderEntity): Promise<void> {
    for (const item of order.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
        relations: ['ingredients', 'ingredients.inventoryItem'],
      });
      if (!product) continue;

      if (product.type === ProductType.SIMPLE && product.itemInventarioId) {
        const inv = await this.inventoryRepository.findOne({ where: { id: product.itemInventarioId } });
        if (inv) {
          inv.quantity = Math.max(0, Number(inv.quantity) - item.quantity);
          await this.inventoryRepository.save(inv);
        }
      } else if (product.type === ProductType.PREPARADO && product.ingredients?.length) {
        for (const ing of product.ingredients) {
          const inv = ing.inventoryItem ?? await this.inventoryRepository.findOne({ where: { id: ing.inventoryItemId } });
          if (inv) {
            const deduction = Number(ing.quantity) * item.quantity;
            inv.quantity = Math.max(0, Number(inv.quantity) - deduction);
            await this.inventoryRepository.save(inv);
          }
        }
      }
    }
  }

  private validateStatusTransition(current: OrderStatus, next: OrderStatus, rol: Role): void {
    if (rol === Role.COCINA) {
      if (next !== OrderStatus.EN_PROCESO) {
        throw new ForbiddenException('Cocina solo puede cambiar estado a en_proceso');
      }
    }
    if (rol === Role.DOMICILIARIO) {
      if (![OrderStatus.ENTREGADO, OrderStatus.RECHAZADO].includes(next)) {
        throw new ForbiddenException('Domiciliario solo puede cambiar estado a entregado o rechazado');
      }
      if (current !== OrderStatus.ENVIADO) {
        throw new BadRequestException('El pedido debe estar en estado enviado');
      }
    }
  }

  async delete(id: string): Promise<void> {
    const order = await this.orderRepository.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Pedido con id ${id} no encontrado`);
    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Solo se pueden eliminar pedidos en estado pendiente');
    }
    await this.orderRepository.remove(order);
  }

  private mapOrder(o: OrderEntity): any {
    return {
      id: o.id,
      tipo: o.type,
      estado: o.status,
      total: Number(o.totalAmount),
      meseroId: o.createdByUserId,
      meseroNombre: (o.createdByUser as any)?.fullName ?? '',
      clienteDomicilio: o.clienteNombre
        ? { nombre: o.clienteNombre, telefono: o.clienteTelefono, direccion: o.clienteDireccion }
        : undefined,
      items: (o.items ?? []).map(item => ({
        id: item.id,
        productoId: item.productId,
        productoNombre: item.productoNombre ?? (item.product as any)?.title ?? '',
        cantidad: item.quantity,
        precioUnitario: Number(item.unitPrice),
        subtotal: item.quantity * Number(item.unitPrice),
      })),
      createdAt: o.createdAt,
      updatedAt: o.updatedAt,
    };
  }
}
