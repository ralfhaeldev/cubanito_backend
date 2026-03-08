import { ClientRepository } from 'src/clients/domain/clients-repository.interface';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { CreateClientDto } from 'src/clients/interfaces/dtos/create-client.dto';
import { UpdateClientDto } from 'src/clients/interfaces/dtos/update-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class CrudClientUseCase {
    private readonly clientRepository;
    constructor(clientRepository: ClientRepository<ClientEntity>);
    create(createClientDto: CreateClientDto): Promise<ClientEntity>;
    findAll(paginationDto: PaginationDto): Promise<ClientEntity[]>;
    findOne(id: string): Promise<ClientEntity>;
    update(id: string, updateClientDto: UpdateClientDto): Promise<ClientEntity>;
}
