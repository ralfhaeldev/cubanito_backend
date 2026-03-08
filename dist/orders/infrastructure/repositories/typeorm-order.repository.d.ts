import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { IOrderRepository } from '../../domain/order-repository.interface';
import { OrderStatus } from 'src/common/enums/order-status.enum';
export declare class TypeormOrderRepository implements IOrderRepository {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    create(order: OrderEntity): Promise<OrderEntity>;
    findById(id: string): Promise<OrderEntity | null>;
    findByBranchId(branchId: string, skip?: number, take?: number): Promise<OrderEntity[]>;
    findByStatus(status: OrderStatus, branchId?: string): Promise<OrderEntity[]>;
    update(id: string, order: Partial<OrderEntity>): Promise<OrderEntity>;
    delete(id: string): Promise<void>;
}
