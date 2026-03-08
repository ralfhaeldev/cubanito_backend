import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypePaymenEntity } from 'src/type-payment/domain/entities/type-paymen.entity';
import { TypePaymentRepository } from 'src/type-payment/domain/repository.interface';
import { Repository } from 'typeorm';
export declare class TypeormTypePaymenRepository implements TypePaymentRepository<TypePaymenEntity> {
    private readonly typePaymentRepository;
    constructor(typePaymentRepository: Repository<TypePaymenEntity>);
    findOne(id: string): Promise<TypePaymenEntity>;
    findAll(pagintationDto: PaginationDto): Promise<TypePaymenEntity[]>;
}
