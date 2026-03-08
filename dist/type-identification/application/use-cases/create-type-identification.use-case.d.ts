import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { TypeIdentificationRepository } from 'src/type-identification/domain/type-identification-repository.interface';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class CreateTypeIdentificatioUseCase {
    private readonly typeIdentificationRepository;
    constructor(typeIdentificationRepository: TypeIdentificationRepository<TypeIdentificationEntity>);
    findOne(id: string): Promise<TypeIdentificationEntity>;
    findAll(paginationDto: PaginationDto): Promise<TypeIdentificationEntity[]>;
}
