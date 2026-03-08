import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../domain/order-repository.interface';
import { OrderStatus } from 'src/common/enums/order-status.enum';

@Injectable()
export class TypeormOrderRepository implements IOrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async create(order: OrderEntity): Promise<OrderEntity> {
    return this.orderRepository.save(order);
  }

  async findById(id: string): Promise<OrderEntity | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['items', 'items.product', 'branch', 'createdByUser', 'lastStatusChangedByUser'],
    });
  }

  async findByBranchId(branchId: string, skip = 0, take = 10): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: { branchId },
      relations: ['items', 'items.product', 'branch'],
      order: { createdAt: 'DESC' },
      skip,
      take,
    });
  }

  async findByStatus(status: OrderStatus, branchId?: string): Promise<OrderEntity[]> {
    return this.orderRepository.find({
      where: branchId ? { status, branchId } : { status },
      relations: ['items', 'items.product', 'branch'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, order: Partial<OrderEntity>): Promise<OrderEntity> {
    await this.orderRepository.update(id, order);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }
}
