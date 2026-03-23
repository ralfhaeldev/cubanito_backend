import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './interfaces/controllers/reports.controller';
import { ReportsUseCase } from './application/use-cases/reports.use-case';
import { OrderEntity } from 'src/orders/domain/entities/order.entity';
import { OrderItemEntity } from 'src/orders/domain/entities/order-item.entity';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { CashboxEntity } from 'src/cashbox/domain/entities/cashbox.entity';
import { MovementEntity } from 'src/cashbox/domain/entities/movement.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, BranchEntity, CashboxEntity, MovementEntity]),
    AuthModule,
  ],
  controllers: [ReportsController],
  providers: [ReportsUseCase],
  exports: [ReportsUseCase],
})
export class ReportsModule {}
