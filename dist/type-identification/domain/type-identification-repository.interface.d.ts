import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare abstract class TypeIdentificationRepository<T> {
    abstract findAll(paginationDto: PaginationDto): Promise<T[]>;
    abstract findOne(id: string): Promise<T>;
}
