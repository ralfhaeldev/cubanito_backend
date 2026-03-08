import { OrderEntity } from './entities/order.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';

export interface IOrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findById(id: string): Promise<OrderEntity | null>;
  findByBranchId(branchId: string, skip: number, take: number): Promise<OrderEntity[]>;
  findByStatus(status: OrderStatus, branchId?: string): Promise<OrderEntity[]>;
  update(id: string, order: Partial<OrderEntity>): Promise<OrderEntity>;
  delete(id: string): Promise<void>;
}

export const OrderRepository = Symbol('OrderRepository');
