import { Module } from '@nestjs/common';
import { ProductController } from './interfaces/controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './domain/entities/product.entity';
import { IngredientEntity } from 'src/ingredients/domain/entities/ingredient.entity';
import { CrudProductUseCase } from './application/use-cases/crud-product.use-case';
import { TypeormProductRepository } from './infrastructure/repositories/typeorm-product.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ProductRepository } from './domain/product-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, IngredientEntity]), AuthModule],
  controllers: [ProductController],
  providers: [
    CrudProductUseCase,
    TypeormProductRepository,
    {
      provide: ProductRepository,
      useExisting: TypeormProductRepository,
    },
  ],
})
export class ProductsModule {}
