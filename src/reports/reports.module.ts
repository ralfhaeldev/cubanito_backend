import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './interfaces/controllers/reports.controller';
import { ReportesController } from './interfaces/controllers/reportes.controller';
import { ReportsUseCase } from './application/use-cases/reports.use-case';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from 'src/orders/domain/entities/order-item.entity';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { CajaEntity } from 'src/caja/domain/entities/caja.entity';
import { MovimientoEntity } from 'src/caja/domain/entities/movimiento.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, BranchEntity, CajaEntity, MovimientoEntity]),
    AuthModule,
  ],
  controllers: [ReportsController, ReportesController],
  providers: [ReportsUseCase],
  exports: [ReportsUseCase],
})
export class ReportsModule {}
