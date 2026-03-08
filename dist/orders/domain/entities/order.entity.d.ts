import { OrderStatus, OrderType } from 'src/common/enums/order-status.enum';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { OrderItemEntity } from './order-item.entity';
export declare class OrderEntity {
    id: string;
    branchId: string;
    branch: BranchEntity;
    type: OrderType;
    status: OrderStatus;
    createdByUserId: string;
    createdByUser: UserEntity;
    lastStatusChangedByUserId: string;
    lastStatusChangedByUser: UserEntity;
    notes: string;
    totalAmount: number;
    realCost: number;
    realMargin: number;
    items: OrderItemEntity[];
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
}
