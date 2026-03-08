import { Repository } from 'typeorm';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from 'src/orders/domain/entities/order-item.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { ReportFiltersDto, SalesReportDto } from '../../interfaces/dtos/report.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
export declare class ReportsUseCase {
    private readonly orderRepository;
    private readonly orderItemRepository;
    private readonly branchRepository;
    constructor(orderRepository: Repository<OrderEntity>, orderItemRepository: Repository<OrderItemEntity>, branchRepository: Repository<BranchEntity>);
    getSalesReport(filters: ReportFiltersDto): Promise<SalesReportDto>;
    getOrderStatusReport(filters: ReportFiltersDto): Promise<{
        [key in OrderStatus]: number;
    }>;
    getProductPerformance(filters: ReportFiltersDto): Promise<any[]>;
    private calculateDateRange;
}
