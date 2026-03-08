import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReportsUseCase } from '../../application/use-cases/reports.use-case';
import { ReportFiltersDto } from '../dtos/report.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsUseCase: ReportsUseCase) {}

  /**
   * Obtener reporte de ventas
   * Solo ADMIN y SUPER_ADMIN pueden acceder
   * Agrupa por período: daily, weekly, monthly
   */
  @Get('sales')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Reporte de ventas',
    description:
      'Retorna un reporte de ventas agrupado por período (diario, semanal, mensual) con datos de ingresos, costos y margen',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte de ventas generado',
    schema: {
      example: {
        period: 'daily (2024-03-08T00:00:00Z - 2024-03-08T23:59:59Z)',
        totalSales: 500.5,
        totalOrders: 15,
        totalCost: 250.25,
        totalMargin: 250.25,
        marginPercentage: 50,
        averageOrderValue: 33.37,
        topProducts: [
          {
            name: 'Cubanito',
            quantity: 30,
            sales: 300,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'No hay órdenes para el período especificado',
  })
  getSalesReport(@Query() filters: ReportFiltersDto) {
    return this.reportsUseCase.getSalesReport(filters);
  }

  /**
   * Obtener reporte de estados de órdenes
   * Muestra la cantidad de órdenes por estado
   */
  @Get('order-status')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Reporte de estados de órdenes',
    description: 'Retorna la cantidad de órdenes agrupadas por estado',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte de estados generado',
    schema: {
      example: {
        pending: 5,
        'en-proceso': 3,
        preparado: 2,
        entregado: 20,
      },
    },
  })
  getOrderStatusReport(@Query() filters: ReportFiltersDto) {
    return this.reportsUseCase.getOrderStatusReport(filters);
  }

  /**
   * Obtener reporte de rendimiento de productos
   * Muestra productos más vendidos y su desempeño
   */
  @Get('product-performance')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Reporte de rendimiento de productos',
    description: 'Retorna datos de productos más vendidos, ingresos generados y otros indicadores',
  })
  @ApiResponse({
    status: 200,
    description: 'Reporte de productos generado',
    schema: {
      example: [
        {
          name: 'Cubanito',
          quantity: 50,
          revenue: 300,
          averagePrice: 6,
        },
        {
          name: 'Gaseosa',
          quantity: 30,
          revenue: 75,
          averagePrice: 2.5,
        },
      ],
    },
  })
  getProductPerformance(@Query() filters: ReportFiltersDto) {
    return this.reportsUseCase.getProductPerformance(filters);
  }
}
