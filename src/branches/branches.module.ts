import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BranchController } from './interfaces/controllers/branch.controller';
import { BranchEntity } from './domain/entities/branch.entity';
import { CrudBranchUseCase } from './application/use-cases/crud-branch.use-case';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([BranchEntity]), AuthModule],
  controllers: [BranchController],
  providers: [CrudBranchUseCase],
  exports: [CrudBranchUseCase],
})
export class BranchesModule {}
