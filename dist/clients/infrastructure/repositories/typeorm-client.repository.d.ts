import { ClientRepository } from 'src/clients/domain/clients-repository.interface';
import { ClientEntity } from 'src/clients/domain/entities/client.entity';
import { CreateClientDto } from 'src/clients/interfaces/dtos/create-client.dto';
import { UpdateClientDto } from 'src/clients/interfaces/dtos/update-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
export declare class TypeormClientRepository implements ClientRepository<ClientEntity> {
    private readonly clientRepository;
    private readonly typeIdentificationRepository;
    constructor(clientRepository: Repository<ClientEntity>, typeIdentificationRepository: Repository<TypeIdentificationEntity>);
    create(clientDto: CreateClientDto): Promise<ClientEntity>;
    findAll(pagintationDto: PaginationDto): Promise<ClientEntity[]>;
    findOne(id: string): Promise<ClientEntity>;
    update(id: string, updateCliewntDto: UpdateClientDto): Promise<ClientEntity>;
    delete(id: string): Promise<void>;
}
