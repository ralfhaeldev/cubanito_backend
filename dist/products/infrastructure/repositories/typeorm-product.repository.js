"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormProductRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const database_exception_handler_1 = require("../../../common/exceptions/database-exception.handler");
const product_entity_1 = require("../../domain/entities/product.entity");
const typeorm_2 = require("typeorm");
let TypeormProductRepository = class TypeormProductRepository {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async update(id, updateProductDto) {
        const product = await this.productRepository.preload({
            id,
            ...updateProductDto,
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        }
        return await this.productRepository.save(product);
    }
    async delete(id) {
        const product = await this.findOne(id);
        await this.productRepository.remove(product);
    }
    async create(createProductDto) {
        try {
            const product = await this.productRepository.save(createProductDto);
            return product;
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
    }
    async findOne(term) {
        let product = null;
        if ((0, class_validator_1.isUUID)(term)) {
            product = await this.productRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.productRepository.createQueryBuilder('prod');
            product = await queryBuilder
                .where('UPPER(title) =:title or slug =:slug', {
                title: term.toUpperCase(),
                slug: term.toLowerCase(),
            })
                .leftJoinAndSelect('prod.images', 'prodImages')
                .getOne();
        }
        if (!product)
            throw new common_1.NotFoundException(`Product with ${term} not found`);
        return product;
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        const products = await this.productRepository.find({
            take: limit,
            skip: offset,
        });
        return products;
    }
};
exports.TypeormProductRepository = TypeormProductRepository;
exports.TypeormProductRepository = TypeormProductRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormProductRepository);
//# sourceMappingURL=typeorm-product.repository.js.map