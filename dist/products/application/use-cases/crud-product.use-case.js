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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudProductUseCase = void 0;
const product_repository_interface_1 = require("../../domain/product-repository.interface");
const common_1 = require("@nestjs/common");
let CrudProductUseCase = class CrudProductUseCase {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async create(productDto) {
        const product = await this.productRepository.create(productDto);
        return product;
    }
    async update(id, updateproduct) {
        const product = await this.productRepository.update(id, updateproduct);
        return product;
    }
    async findOne(term) {
        const product = await this.productRepository.findOne(term);
        return product;
    }
    async findAll(paginationDto) {
        const producs = await this.productRepository.findAll(paginationDto);
        return producs;
    }
    async delete(id) {
        return await this.productRepository.delete(id);
    }
};
exports.CrudProductUseCase = CrudProductUseCase;
exports.CrudProductUseCase = CrudProductUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_interface_1.ProductRepository])
], CrudProductUseCase);
//# sourceMappingURL=crud-product.use-case.js.map