import { OrderType, OrderStatus } from 'src/common/enums/order-status.enum';
export declare class CreateOrderItemDto {
    productId: string;
    quantity: number;
    unitPrice: number;
}
export declare class CreateOrderDto {
    branchId: string;
    type: OrderType;
    items: CreateOrderItemDto[];
    notes?: string;
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
    notes?: string;
}
