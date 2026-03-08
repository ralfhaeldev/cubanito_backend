import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateClientDto } from '../interfaces/dtos/create-client.dto';
import { UpdateClientDto } from '../interfaces/dtos/update-client.dto';

export abstract class ClientRepository<T> {
  abstract create(createClientDto: CreateClientDto): Promise<T>;
  abstract update(id: string, updateClientDto: UpdateClientDto): Promise<T>;
  abstract findOne(term: string): Promise<T>;
  abstract findAll(pagintationDto: PaginationDto): Promise<T[]>;
  abstract delete(id: string): void;
}
