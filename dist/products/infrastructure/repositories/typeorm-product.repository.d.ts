import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/product-repository.interface';
import { CreateProductDto } from 'src/products/interfaces/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/interfaces/dtos/update-product.dto';
import { Repository } from 'typeorm';
export declare class TypeormProductRepository implements ProductRepository<ProductEntity> {
    private readonly productRepository;
    constructor(productRepository: Repository<ProductEntity>);
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity>;
    delete(id: string): Promise<void>;
    create(createProductDto: CreateProductDto): Promise<ProductEntity>;
    findOne(term: string): Promise<ProductEntity>;
    findAll(paginationDto: PaginationDto): Promise<ProductEntity[]>;
}
