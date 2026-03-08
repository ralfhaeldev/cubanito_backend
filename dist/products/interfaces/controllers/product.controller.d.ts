import { CrudProductUseCase } from 'src/products/application/use-cases/crud-product.use-case';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class ProductController {
    private readonly crudProductUseCase;
    constructor(crudProductUseCase: CrudProductUseCase);
    create(createProductDto: CreateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    findOne(term: string): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/product.entity").ProductEntity[]>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    delete(id: string): Promise<void>;
}
