import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { TypeIdentificationRepository } from 'src/type-identification/domain/type-identification-repository.interface';
import { Repository } from 'typeorm';
export declare class TypeormTypeIdentificationRepository implements TypeIdentificationRepository<TypeIdentificationEntity> {
    private readonly typeIdentificationrepository;
    constructor(typeIdentificationrepository: Repository<TypeIdentificationEntity>);
    findOne(id: string): Promise<TypeIdentificationEntity>;
    findAll(pagintationDto: PaginationDto): Promise<TypeIdentificationEntity[]>;
}
