import { Module } from '@nestjs/common';
import { ClientController } from './interfaces/controllers/client.controller';
import { ClientEntity } from './domain/entities/client.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrudClientUseCase } from './application/use-cases/crud-client.use-case';
import { TypeormClientRepository } from './infrastructure/repositories/typeorm-client.repository';
import { ClientRepository } from './domain/clients-repository.interface';
import { TypeIdentificationModule } from 'src/type-identification/type-identification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientEntity]),
    AuthModule,
    TypeIdentificationModule,
  ],
  controllers: [ClientController],
  providers: [
    CrudClientUseCase,
    TypeormClientRepository,
    {
      provide: ClientRepository,
      useExisting: TypeormClientRepository,
    },
  ],
})
export class ClientsModule {}
