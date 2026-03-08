import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
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

  async create(createOrderDto: CreateOrderDto, userId: string): Promise<OrderEntity> {
    const branch = await this.branchRepository.findOne({
      where: { id: createOrderDto.branchId },
    });

    if (!branch) {
      throw new NotFoundException(
        `Branch with id ${createOrderDto.branchId} not found`,
      );
    }

    let totalAmount = 0;

    // Validar productos y calcular total
    for (const item of createOrderDto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${item.productId} not found`,
        );
      }

      totalAmount += item.unitPrice * item.quantity;
    }

    const order = this.orderRepository.create({
      branchId: createOrderDto.branchId,
      type: createOrderDto.type,
      status: OrderStatus.PENDING,
      createdByUserId: userId,
      notes: createOrderDto.notes,
      totalAmount,
      realCost: 0,
      realMargin: 0,
    });

    const savedOrder = await this.orderRepository.save(order);

    // Crear items del pedido
    for (const item of createOrderDto.items) {
      const orderItem = this.orderItemRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        realCost: 0,
      });

      await this.orderItemRepository.save(orderItem);
    }

    return this.findOne(savedOrder.id);
  }

  async findAll(
    paginationDto: PaginationDto,
    branchId?: string,
  ): Promise<OrderEntity[]> {
    const { limit = 10, offset = 0 } = paginationDto;

    return this.orderRepository.find({
      where: branchId ? { branchId } : {},
      relations: ['items', 'items.product', 'branch', 'createdByUser'],
      take: limit,
      skip: offset,
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'branch', 'createdByUser', 'lastStatusChangedByUser'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }

  async updateStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto,
    userId: string,
    userRoles: Role[],
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    // Validar transiciones de estado permitidas según el rol
    this.validateStatusTransition(order.status, updateOrderStatusDto.status, userRoles);

    const previousStatus = order.status;

    // Si cambiar a FINALIZADO, aplicar lógica de descuento de inventario
    if (updateOrderStatusDto.status === OrderStatus.FINALIZADO && previousStatus !== OrderStatus.FINALIZADO) {
      await this.applyInventoryDeduction(order);
    }

    order.status = updateOrderStatusDto.status;
    order.lastStatusChangedByUserId = userId;

    if (updateOrderStatusDto.notes) {
      order.notes = updateOrderStatusDto.notes;
    }

    if (updateOrderStatusDto.status === OrderStatus.FINALIZADO) {
      order.completedAt = new Date();
    }

    return this.orderRepository.save(order);
  }

  /**
   * Aplicar lógica de descuento de inventario al finalizar un pedido
   * Simple: descuenta 1 unidad del ítem × cantidad pedida
   * Preparado: descuenta cada ingrediente × cantidad pedida
   */
  private async applyInventoryDeduction(order: OrderEntity): Promise<void> {
    let totalRealCost = 0;

    for (const item of order.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
        relations: ['ingredients', 'ingredients.inventoryItem'],
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${item.productId} not found`);
      }

      if (product.type === ProductType.SIMPLE) {
        // Para productos simples: buscar el insumo en inventario
        const inventoryItem = await this.inventoryRepository.findOne({
          where: { name: product.title, branchId: order.branchId },
        });

        if (inventoryItem) {
          // Descontar del inventario
          const adjustment = -item.quantity;
          if (inventoryItem.quantity + adjustment < 0) {
            throw new BadRequestException(
              `Insufficient inventory for product ${product.title}`,
            );
          }

          inventoryItem.quantity += adjustment;
          await this.inventoryRepository.save(inventoryItem);

          // Calcular costo real
          const itemRealCost = item.quantity * inventoryItem.purchasePrice;
          item.realCost = itemRealCost;
          totalRealCost += itemRealCost;
        }
      } else if (product.type === ProductType.PREPARADO && product.ingredients) {
        // Para productos preparados: descontar cada ingrediente
        for (const ingredient of product.ingredients) {
          const inventoryItem = ingredient.inventoryItem || (await this.inventoryRepository.findOne({
            where: { id: ingredient.inventoryItemId },
          }));

          if (inventoryItem) {
            // Descontar cantidad: ingrediente.quantity × item.quantity
            const totalDeduction = ingredient.quantity * item.quantity;
            const adjustment = -totalDeduction;

            if (inventoryItem.quantity + adjustment < 0) {
              throw new BadRequestException(
                `Insufficient inventory for ingredient in product ${product.title}`,
              );
            }

            inventoryItem.quantity += adjustment;
            await this.inventoryRepository.save(inventoryItem);

            // Sumar al costo real
            const ingredientCost = totalDeduction * inventoryItem.purchasePrice;
            totalRealCost += ingredientCost;
          }
        }

        item.realCost = totalRealCost;
      }

      await this.orderItemRepository.save(item);
    }

    // Calcular margen real
    order.realCost = totalRealCost;
    order.realMargin = order.totalAmount - totalRealCost;
  }

  /**
   * Validar transiciones de estado permitidas según el rol del usuario
   */
  private validateStatusTransition(
    currentStatus: OrderStatus,
    newStatus: OrderStatus,
    userRoles: Role[],
  ): void {
    // MESERO: Solo puede cambiar a EN_PROCESO y PREPARADO
    if (userRoles.includes(Role.MESERO)) {
      if (![OrderStatus.EN_PROCESO, OrderStatus.PREPARADO].includes(newStatus)) {
        throw new ForbiddenException(
          'MESERO can only change order status to EN_PROCESO or PREPARADO',
        );
      }
      if (currentStatus !== OrderStatus.PENDING && newStatus === OrderStatus.EN_PROCESO) {
        throw new BadRequestException('Invalid status transition');
      }
      if (currentStatus !== OrderStatus.EN_PROCESO && newStatus === OrderStatus.PREPARADO) {
        throw new BadRequestException('Invalid status transition');
      }
    }

    // COCINA: Solo puede ver y cambiar a EN_PROCESO
    if (userRoles.includes(Role.COCINA)) {
      if (newStatus !== OrderStatus.EN_PROCESO) {
        throw new ForbiddenException('COCINA can only change order status to EN_PROCESO');
      }
    }

    // DOMICILIARIO: Solo puede cambiar a ENTREGADO o RECHAZADO
    if (userRoles.includes(Role.DOMICILIARIO)) {
      if (![OrderStatus.ENTREGADO, OrderStatus.RECHAZADO].includes(newStatus)) {
        throw new ForbiddenException(
          'DOMICILIARIO can only change order status to ENTREGADO or RECHAZADO',
        );
      }
      if (currentStatus !== OrderStatus.ENVIADO) {
        throw new BadRequestException('Order must be in ENVIADO status');
      }
    }

    // ADMIN: Puede hacer transiciones normales
    if (userRoles.includes(Role.ADMIN) || userRoles.includes(Role.SUPER_ADMIN)) {
      // ADMIN puede pasar de PREPARADO a ENVIADO (solo delivery)
      // ADMIN puede pasar a FINALIZADO
      const validTransitions: { [key in OrderStatus]?: OrderStatus[] } = {
        [OrderStatus.PENDING]: [OrderStatus.EN_PROCESO],
        [OrderStatus.EN_PROCESO]: [OrderStatus.PREPARADO, OrderStatus.RECHAZADO],
        [OrderStatus.PREPARADO]: [OrderStatus.ENVIADO, OrderStatus.ENTREGADO],
        [OrderStatus.ENVIADO]: [OrderStatus.ENTREGADO],
        [OrderStatus.ENTREGADO]: [OrderStatus.FINALIZADO],
        [OrderStatus.RECHAZADO]: [],
        [OrderStatus.FINALIZADO]: [],
      };

      if (!validTransitions[currentStatus]?.includes(newStatus)) {
        throw new BadRequestException(`Invalid transition from ${currentStatus} to ${newStatus}`);
      }
    }
  }

  async delete(id: string): Promise<void> {
    const order = await this.findOne(id);

    if (order.status !== OrderStatus.PENDING) {
      throw new BadRequestException('Can only delete orders in PENDING status');
    }

    await this.orderRepository.remove(order);
  }
}
