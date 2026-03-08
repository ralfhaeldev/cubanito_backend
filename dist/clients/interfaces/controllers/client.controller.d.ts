import { CrudClientUseCase } from 'src/clients/application/use-cases/crud-client.use-case';
import { CreateClientDto } from '../dtos/create-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
export declare class ClientController {
    private readonly crudClientUseCase;
    constructor(crudClientUseCase: CrudClientUseCase);
    create(client: CreateClientDto): Promise<import("../../domain/entities/client.entity").ClientEntity>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/client.entity").ClientEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/client.entity").ClientEntity>;
    update(id: string, updateClienteDto: UpdateClientDto): Promise<import("../../domain/entities/client.entity").ClientEntity>;
}
