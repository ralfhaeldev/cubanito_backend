import { Repository } from 'typeorm';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderItemEntity } from '../../domain/entities/order-item.entity';
import { CreateOrderDto, UpdateOrderStatusDto } from '../../interfaces/dtos/order.dto';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';
import { Role } from 'src/common/enums/roles.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
export declare class CrudOrderUseCase {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly branchRepository;
    private readonly productRepository;
    private readonly inventoryRepository;
    private readonly ingredientsRepository;
    constructor(orderRepository: Repository<OrderEntity>, orderItemRepository: Repository<OrderItemEntity>, branchRepository: Repository<BranchEntity>, productRepository: Repository<ProductEntity>, inventoryRepository: Repository<InventoryEntity>, ingredientsRepository: Repository<IngredientsEntity>);
    create(createOrderDto: CreateOrderDto, userId: string): Promise<OrderEntity>;
    findAll(paginationDto: PaginationDto, branchId?: string): Promise<OrderEntity[]>;
    findOne(id: string): Promise<OrderEntity>;
    updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto, userId: string, userRoles: Role[]): Promise<OrderEntity>;
    private applyInventoryDeduction;
    private validateStatusTransition;
    delete(id: string): Promise<void>;
}
