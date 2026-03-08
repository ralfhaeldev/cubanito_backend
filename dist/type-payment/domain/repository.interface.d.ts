import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare abstract class TypePaymentRepository<T> {
    abstract findAll(pagintationDto: PaginationDto): Promise<T[]>;
    abstract findOne(id: string): Promise<T>;
}
