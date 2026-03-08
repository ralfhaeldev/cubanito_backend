import { Injectable } from '@nestjs/common';
import { ClientRepository } from 'src/clients/domain/clients-repository.interface';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { CreateClientDto } from 'src/clients/interfaces/dtos/create-client.dto';
import { UpdateClientDto } from 'src/clients/interfaces/dtos/update-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CrudClientUseCase {
  constructor(
    private readonly clientRepository: ClientRepository<ClientEntity>,
  ) {}

  async create(createClientDto: CreateClientDto) {
    const client = await this.clientRepository.create(createClientDto);
    return client;
  }

  async findAll(paginationDto: PaginationDto) {
    const clients = await this.clientRepository.findAll(paginationDto); // TODO: add pagination
    return clients;
  }

  async findOne(id: string) {
    const client = await this.clientRepository.findOne(id);
    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.update(id, updateClientDto);
    return client;
  }
}
