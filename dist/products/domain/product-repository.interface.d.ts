import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateProductDto } from '../interfaces/dtos/create-product.dto';
export declare abstract class ProductRepository<T> {
    abstract create(createProductDto: CreateProductDto): Promise<T>;
    abstract update(id: string, UpdateProductDto: any): Promise<T>;
    abstract findOne(term: string): Promise<T>;
    abstract findAll(pagintationDto: PaginationDto): Promise<T[]>;
    abstract delete(id: string): void;
}
