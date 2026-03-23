import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './interfaces/controllers/order.controller';
import { OrderEntity } from './domain/entities/order.entity';
import { OrderItemEntity } from './domain/entities/order-item.entity';
import { CrudOrderUseCase } from './application/use-cases/crud-order.use-case';
import { TypeormOrderRepository } from './infrastructure/repositories/typeorm-order.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
import { IngredientEntity } from 'src/ingredients/domain/entities/ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      BranchEntity,
      ProductEntity,
      InventoryEntity,
      IngredientEntity,
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [CrudOrderUseCase, TypeormOrderRepository],
  exports: [TypeormOrderRepository],
})
export class OrdersModule {}
