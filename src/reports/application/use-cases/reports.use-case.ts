import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from 'src/orders/domain/entities/order-item.entity';
import { OrderStatus, OrderType } from 'src/common/enums/order-status.enum';
import { ReportFiltersDto, ReportPeriod, SalesReportDto } from '../../interfaces/dtos/report.dto';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { CashboxEntity } from 'src/cashbox/domain/entities/cashbox.entity';

@Injectable()
export class ReportsUseCase {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemRepository: Repository<OrderItemEntity>,
    @InjectRepository(BranchEntity)
    private readonly branchRepository: Repository<BranchEntity>,
    @InjectRepository(CashboxEntity)
    private readonly cashboxRepository: Repository<CashboxEntity>,
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

  /**
   * Resumen de métricas para el dashboard.
   * Compatible con los parámetros del mock: periodo=today|7d|30d
   */
  async getSummary(periodo: string, branchId?: string): Promise<any> {
    const { start, end } = this.calculateDateRangeFromPeriodo(periodo);

    const orders = await this.orderRepository.find({
      where: {
        status: OrderStatus.FINALIZADO,
        createdAt: Between(start, end),
        ...(branchId ? { branchId } : {}),
      },
    });

    const deliveryOrders = orders.filter((o) => o.type === OrderType.DOMICILIO);
    const totalVentas = orders.reduce((s, o) => s + Number(o.totalAmount), 0);
    const totalPedidos = orders.length;
    const totalDomicilios = deliveryOrders.length;
    const ticketPromedio = totalPedidos > 0 ? Math.round(totalVentas / totalPedidos) : 0;

    return { totalVentas, totalPedidos, totalDomicilios, ticketPromedio };
  }

  /**
   * Reporte de ventas diarias. Acepta periodo=today|7d|30d o period=daily|weekly|monthly
   */
  async getVentasDiarias(periodo: string, branchId?: string): Promise<any[]> {
    const { start, end } = this.calculateDateRangeFromPeriodo(periodo);

    const orders = await this.orderRepository.find({
      where: {
        status: OrderStatus.FINALIZADO,
        createdAt: Between(start, end),
        ...(branchId ? { branchId } : {}),
      },
    });

    // Agrupar por fecha
    const byDate: Record<string, { ventas: number; pedidos: number; domicilios: number }> = {};
    for (const order of orders) {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!byDate[date]) byDate[date] = { ventas: 0, pedidos: 0, domicilios: 0 };
      byDate[date].ventas += Number(order.totalAmount);
      byDate[date].pedidos += 1;
      if (order.type === OrderType.DOMICILIO) byDate[date].domicilios += 1;
    }

    return Object.entries(byDate)
      .map(([fecha, data]) => ({ fecha, ...data }))
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  /** Historial de cajas para reportes */
  async getCajaHistorial(branchId?: string): Promise<any[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;

    const cajas = await this.cajaRepository.find({
      where,
      order: { createdAt: 'DESC' },
      take: 30,
      relations: ['movimientos'],
    });

    return cajas.map((c) => {
      const ingresos = c.movimientos
        ?.filter((m) => m.tipo === 'ingreso')
        .reduce((s, m) => s + Number(m.monto), 0) ?? 0;
      const egresos = c.movimientos
        ?.filter((m) => m.tipo !== 'ingreso')
        .reduce((s, m) => s + Number(m.monto), 0) ?? 0;
      return {
        id: c.id,
        fecha: c.fecha,
        montoInicial: Number(c.montoInicial),
        montoFinal: c.montoFinal !== null ? Number(c.montoFinal) : null,
        ingresos,
        egresos,
        abierta: c.abierta,
        abiertaPor: c.abiertaPor,
      };
    });
  }

  private calculateDateRangeFromPeriodo(periodo: string): { start: Date; end: Date } {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);

    if (periodo === 'today') {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }

    if (periodo === '30d') {
      const start = new Date(now);
      start.setDate(now.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      return { start, end };
    }

    // default: 7d
    const start = new Date(now);
    start.setDate(now.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return { start, end };
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
