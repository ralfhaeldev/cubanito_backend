import { Module } from '@nestjs/common';
import { TypePaymenController } from './interfaces/controllers/type-paymen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypePaymenEntity } from './domain/entities/type-paymen.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CrudTypePaymenUseCase } from './application/use-cases/crud-type-paymen.use-case';
import { TypeormTypePaymenRepository } from './infrastructure/repositories/typeorm-type-paymen.repository';
import { TypePaymentRepository } from './domain/repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TypePaymenEntity]), AuthModule],
  controllers: [TypePaymenController],
  providers: [
    CrudTypePaymenUseCase,
    TypeormTypePaymenRepository,
    {
      provide: TypePaymentRepository,
      useExisting: TypeormTypePaymenRepository,
    },
  ],
})
export class TypePaymentModule {}
