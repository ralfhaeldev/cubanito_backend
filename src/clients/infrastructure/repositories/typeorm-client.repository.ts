import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { ClientRepository } from 'src/clients/domain/clients-repository.interface';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { CreateClientDto } from 'src/clients/interfaces/dtos/create-client.dto';
import { UpdateClientDto } from 'src/clients/interfaces/dtos/update-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';
import { ILike, Repository } from 'typeorm';
import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { log } from 'console';

@Injectable()
export class TypeormClientRepository implements ClientRepository<ClientEntity> {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(TypeIdentificationEntity)
    private readonly typeIdentificationRepository: Repository<TypeIdentificationEntity>,
  ) {}

  async create(clientDto: CreateClientDto): Promise<ClientEntity> {
    try {
      const { typeIdentificationId, ...rest } = clientDto;

      const typeIdentification =
        await this.typeIdentificationRepository.findOneBy({
          id: typeIdentificationId,
        });

      if (!typeIdentification) {
        throw new NotFoundException(
          `TypeIdentification with id ${typeIdentificationId} not found`,
        );
      }

      const createClientEntity = this.clientRepository.create({
        ...rest,
        typeIdentification,
      });

      const client = await this.clientRepository.save(createClientEntity);
      return client;
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findAll(pagintationDto: PaginationDto): Promise<ClientEntity[]> {
    const { limit = 10, offset = 0, term = null } = pagintationDto;
    const where = term
      ? {
          name: ILike(`%${term}%`),
          fullName: ILike(`%${term}%`),
          identification: ILike(`%${term}%`),
        }
      : {};

    const clients = await this.clientRepository.find({
      where,
      take: limit,
      skip: offset,
    });

    return clients;
  }

  async findOne(id: string): Promise<ClientEntity> {
    let client: ClientEntity | null = null;

    if (isUUID(id)) {
      client = await this.clientRepository.findOneBy({ id });
    }
    if (!client) throw new NotFoundException(`Client with id ${id} not found`);

    return client;
  }

  async update(
    id: string,
    updateCliewntDto: UpdateClientDto,
  ): Promise<ClientEntity> {
    try {
      const client = await this.clientRepository.preload({
        id,
        ...updateCliewntDto,
      });

      if (!client) {
        throw new NotFoundException(`Client with id ${id} not found`);
      }

      return await this.clientRepository.save(client);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
