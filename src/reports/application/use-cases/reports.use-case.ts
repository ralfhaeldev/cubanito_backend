import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from 'src/orders/domain/entities/order-item.entity';
import { OrderStatus } from 'src/common/enums/order-status.enum';
import { ReportFiltersDto, ReportPeriod, SalesReportDto } from '../../interfaces/dtos/report.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';

@Injectable()
export class ReportsUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
  ) {}

  async getSalesReport(filters: ReportFiltersDto): Promise<SalesReportDto> {
    const { period, branchId, startDate, endDate } = filters;

    // Validar branch si se proporciona
    if (branchId) {
      const branch = await this.branchRepository.findOne({
        where: { id: branchId },
      });

      if (!branch) {
        throw new NotFoundException(`Branch with id ${branchId} not found`);
      }
    }

    // Calcular fechas basado en período
    const { start, end } = this.calculateDateRange(period, startDate, endDate);

    // Obtener órdenes finalizadas en el período
    const orders = await this.orderRepository.find({
      where: {
        status: OrderStatus.FINALIZADO,
        createdAt: Between(start, end),
        ...(branchId ? { branchId } : {}),
      },
      relations: ['items', 'items.product'],
    });

    if (orders.length === 0) {
      throw new BadRequestException('No orders found for the specified period');
    }

    let totalSales = 0;
    let totalCost = 0;
    const productCount: { [key: string]: number } = {};
    const productSales: { [key: string]: number } = {};

    for (const order of orders) {
      totalSales += order.totalAmount;
      totalCost += order.realCost;

      for (const item of order.items) {
        const productName = item.product.title;
        productCount[productName] = (productCount[productName] || 0) + item.quantity;
        productSales[productName] = (productSales[productName] || 0) + item.quantity * item.unitPrice;
      }
    }

    // Top productos
    const topProducts = Object.entries(productCount)
      .map(([name, quantity]) => ({
        name,
        quantity,
        sales: productSales[name],
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);

    const totalMargin = totalSales - totalCost;
    const marginPercentage = totalSales > 0 ? (totalMargin / totalSales) * 100 : 0;
    const averageOrderValue = totalSales / orders.length;

    return {
      period: `${period} (${start.toISOString()} - ${end.toISOString()})`,
      totalSales,
      totalOrders: orders.length,
      totalCost,
      totalMargin,
      marginPercentage: Math.round(marginPercentage * 100) / 100,
      averageOrderValue: Math.round(averageOrderValue * 100) / 100,
      topProducts,
    };
  }

  async getOrderStatusReport(
    filters: ReportFiltersDto,
  ): Promise<{ [key in OrderStatus]: number }> {
    const { branchId, startDate, endDate } = filters;
    const { start, end } = this.calculateDateRange(filters.period, startDate, endDate);

    const orders = await this.orderRepository.find({
      where: {
        createdAt: Between(start, end),
        ...(branchId ? { branchId } : {}),
      },
    });

    const statusCounts: { [key in OrderStatus]?: number } = {};

    for (const order of orders) {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    }

    return statusCounts as { [key in OrderStatus]: number };
  }

  async getProductPerformance(filters: ReportFiltersDto): Promise<any[]> {
    const { branchId, startDate, endDate } = filters;
    const { start, end } = this.calculateDateRange(filters.period, startDate, endDate);

    const items = await this.orderItemRepository.find({
      where: {
        order: {
          createdAt: Between(start, end),
          status: OrderStatus.FINALIZADO,
          ...(branchId ? { branchId } : {}),
        },
      },
      relations: ['product'],
    });

    const productStats: { [key: string]: any } = {};

    for (const item of items) {
      if (!productStats[item.product.title]) {
        productStats[item.product.title] = {
          name: item.product.title,
          quantity: 0,
          revenue: 0,
          averagePrice: 0,
        };
      }

      productStats[item.product.title].quantity += item.quantity;
      productStats[item.product.title].revenue += item.quantity * item.unitPrice;
    }

    // Calcular promedio
    for (const product of Object.values(productStats)) {
      product.averagePrice = product.revenue / product.quantity;
    }

    return Object.values(productStats);
  }

  private calculateDateRange(
    period: ReportPeriod,
    startDate?: Date,
    endDate?: Date,
  ): { start: Date; end: Date } {
    const now = new Date();

    if (startDate && endDate) {
      return { start: new Date(startDate), end: new Date(endDate) };
    }

    switch (period) {
      case ReportPeriod.DAILY:
        const dayStart = new Date(now);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(now);
        dayEnd.setHours(23, 59, 59, 999);
        return { start: dayStart, end: dayEnd };

      case ReportPeriod.WEEKLY:
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        return { start: weekStart, end: weekEnd };

      case ReportPeriod.MONTHLY:
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        monthStart.setHours(0, 0, 0, 0);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        monthEnd.setHours(23, 59, 59, 999);
        return { start: monthStart, end: monthEnd };

      default:
        throw new BadRequestException('Invalid report period');
    }
  }
}
