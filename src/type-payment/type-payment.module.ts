import { Module } from '@nestjs/common';
import { TypePaymentController } from './interfaces/controllers/type-payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypePaymentEntity } from './domain/entities/type-payment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CrudTypePaymentUseCase } from './application/use-cases/crud-type-payment.use-case';
import { TypeormTypePaymentRepository } from './infrastructure/repositories/typeorm-type-payment.repository';
import { TypePaymentRepository } from './domain/repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TypePaymentEntity]), AuthModule],
  controllers: [TypePaymentController],
  providers: [
    CrudTypePaymentUseCase,
    TypeormTypePaymentRepository,
    {
      provide: TypePaymentRepository,
      useExisting: TypeormTypePaymentRepository,
    },
  ],
})
export class TypePaymentModule {}
