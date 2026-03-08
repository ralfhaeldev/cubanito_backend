import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsController } from './interfaces/controllers/ingredients.controller';
import { IngredientsEntity } from './domain/entities/ingredients.entity';
import { CrudIngredientsUseCase } from './application/use-cases/crud-ingredients.use-case';
import { TypeormIngredientsRepository } from './infrastructure/repositories/typeorm-ingredients.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientsEntity, ProductEntity, InventoryEntity]),
    AuthModule,
  ],
  controllers: [IngredientsController],
  providers: [CrudIngredientsUseCase, TypeormIngredientsRepository],
  exports: [TypeormIngredientsRepository],
})
export class IngredientsModule {}
