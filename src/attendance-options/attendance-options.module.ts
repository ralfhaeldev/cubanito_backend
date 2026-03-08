import { Module } from '@nestjs/common';
import { AttendanceOptionController } from './interfaces/controllers/attendance-option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceOptionEntity } from './domain/entities/attendance-option.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CreateAttendanceOptionUseCase } from './application/use-cases/create-attendance-option.use-case';
import { TypeormAttendanceOptionRepository } from './infrastructure/repositories/typeorm-attendance-option.repository';
import { AttendanceOptionsRepository } from './domain/attendance-options-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceOptionEntity]), AuthModule],
  controllers: [AttendanceOptionController],
  providers: [
    CreateAttendanceOptionUseCase,
    TypeormAttendanceOptionRepository,
    {
      provide: AttendanceOptionsRepository,
      useExisting: TypeormAttendanceOptionRepository,
    },
  ],
  exports: [TypeOrmModule],
})
export class AttendanceOptionsModule {}
