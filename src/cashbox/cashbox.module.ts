import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashboxEntity } from './domain/entities/cashbox.entity';
import { MovementEntity } from './domain/entities/movement.entity';
import { CashboxUseCase } from './application/use-cases/cashbox.use-case';
import { CashboxController, MovementsController } from './interfaces/controllers/cashbox.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CashboxEntity, MovementEntity]), AuthModule],
  controllers: [CashboxController, MovementsController],
  providers: [CashboxUseCase],
  exports: [CashboxUseCase, TypeOrmModule],
})
export class CashboxModule {}
