import { CreateProductDto } from 'src/products/interfaces/dtos/create-product.dto';
import { ProductRepository } from 'src/products/domain/product-repository.interface';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { UpdateProductDto } from '../../interfaces/dtos/update-product.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
export declare class CrudProductUseCase {
    private readonly productRepository;
    constructor(productRepository: ProductRepository<ProductEntity>);
    create(productDto: CreateProductDto): Promise<ProductEntity>;
    update(id: string, updateproduct: UpdateProductDto): Promise<ProductEntity>;
    findOne(term: string): Promise<ProductEntity>;
    findAll(paginationDto: PaginationDto): Promise<ProductEntity[]>;
    delete(id: string): Promise<void>;
}
