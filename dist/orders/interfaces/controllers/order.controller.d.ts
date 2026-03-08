import { CrudOrderUseCase } from '../../application/use-cases/crud-order.use-case';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class OrderController {
    private readonly crudOrderUseCase;
    constructor(crudOrderUseCase: CrudOrderUseCase);
    create(createOrderDto: CreateOrderDto, request: any): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    findAll(paginationDto: PaginationDto, branchId?: string): Promise<import("../../domain/entities/order.entity").OrderEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto, request: any): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    delete(id: string): Promise<void>;
}
