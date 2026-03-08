import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypePaymenEntity } from 'src/type-payment/domain/entities/type-paymen.entity';
import { TypePaymentRepository } from 'src/type-payment/domain/repository.interface';
export declare class CrudTypePaymenUseCase {
    private readonly typePaymentRepository;
    constructor(typePaymentRepository: TypePaymentRepository<TypePaymenEntity>);
    findAll(paginationDto: PaginationDto): Promise<TypePaymenEntity[]>;
    findOne(id: string): Promise<TypePaymenEntity>;
}
