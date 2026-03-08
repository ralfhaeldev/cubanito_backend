import { Module } from '@nestjs/common';
import { TypeIdentificationController } from './interfaces/controllers/type-identification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeIdentificationEntity } from './domain/entities/type-identification.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateTypeIdentificatioUseCase } from './application/use-cases/create-type-identification.use-case';
import { TypeormTypeIdentificationRepository } from './infrastructure/repositories/typeorm-type-identification.repository';
import { TypeIdentificationRepository } from './domain/type-identification-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([TypeIdentificationEntity]), AuthModule],
  controllers: [TypeIdentificationController],
  providers: [
    CreateTypeIdentificatioUseCase,
    TypeormTypeIdentificationRepository,
    {
      provide: TypeIdentificationRepository,
      useExisting: TypeormTypeIdentificationRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class TypeIdentificationModule {}
