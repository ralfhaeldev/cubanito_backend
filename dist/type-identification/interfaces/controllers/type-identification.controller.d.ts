import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateTypeIdentificatioUseCase } from 'src/type-identification/application/use-cases/create-type-identification.use-case';
export declare class TypeIdentificationController {
    private readonly createTypeIdentificatioUseCase;
    constructor(createTypeIdentificatioUseCase: CreateTypeIdentificatioUseCase);
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/type-identification.entity").TypeIdentificationEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/type-identification.entity").TypeIdentificationEntity>;
}
