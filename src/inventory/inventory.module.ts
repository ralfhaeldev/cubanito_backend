import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './interfaces/controllers/inventory.controller';
import { InventoryEntity } from './domain/entities/inventory.entity';
import { InventoryAdjustmentEntity } from './domain/entities/inventory-adjustment.entity';
import { CrudInventoryUseCase } from './application/use-cases/crud-inventory.use-case';
import { TypeormInventoryRepository } from './infrastructure/repositories/typeorm-inventory.repository';
import { AuthModule } from 'src/auth/auth.module';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryEntity, InventoryAdjustmentEntity, BranchEntity]),
    AuthModule,
  ],
  controllers: [InventoryController],
  providers: [CrudInventoryUseCase, TypeormInventoryRepository],
  exports: [TypeormInventoryRepository, CrudInventoryUseCase, TypeOrmModule],
})
export class InventoryModule {}
