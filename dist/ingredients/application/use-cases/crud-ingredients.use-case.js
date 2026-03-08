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
exports.CrudIngredientsUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ingredients_entity_1 = require("../../domain/entities/ingredients.entity");
const product_entity_1 = require("../../../products/domain/entities/product.entity");
const inventory_entity_1 = require("../../../inventory/domain/entities/inventory.entity");
let CrudIngredientsUseCase = class CrudIngredientsUseCase {
    ingredientsRepository;
    productRepository;
    inventoryRepository;
    constructor(ingredientsRepository, productRepository, inventoryRepository) {
        this.ingredientsRepository = ingredientsRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }
    async create(createIngredientDto) {
        const product = await this.productRepository.findOne({
            where: { id: createIngredientDto.productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${createIngredientDto.productId} not found`);
        }
        const inventoryItem = await this.inventoryRepository.findOne({
            where: { id: createIngredientDto.inventoryItemId },
        });
        if (!inventoryItem) {
            throw new common_1.NotFoundException(`Inventory item with id ${createIngredientDto.inventoryItemId} not found`);
        }
        const ingredient = this.ingredientsRepository.create({
            productId: createIngredientDto.productId,
            inventoryItemId: createIngredientDto.inventoryItemId,
            quantity: createIngredientDto.quantity,
        });
        return this.ingredientsRepository.save(ingredient);
    }
    async findByProductId(productId) {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found`);
        }
        return this.ingredientsRepository.find({
            where: { productId },
            relations: ['inventoryItem'],
        });
    }
    async findOne(id) {
        const ingredient = await this.ingredientsRepository.findOne({
            where: { id },
            relations: ['inventoryItem', 'product'],
        });
        if (!ingredient) {
            throw new common_1.NotFoundException(`Ingredient with id ${id} not found`);
        }
        return ingredient;
    }
    async update(id, updateIngredientDto) {
        const ingredient = await this.findOne(id);
        if (updateIngredientDto.quantity !== undefined) {
            ingredient.quantity = updateIngredientDto.quantity;
        }
        return this.ingredientsRepository.save(ingredient);
    }
    async delete(id) {
        const ingredient = await this.findOne(id);
        await this.ingredientsRepository.remove(ingredient);
    }
};
exports.CrudIngredientsUseCase = CrudIngredientsUseCase;
exports.CrudIngredientsUseCase = CrudIngredientsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingredients_entity_1.IngredientsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(inventory_entity_1.InventoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CrudIngredientsUseCase);
//# sourceMappingURL=crud-ingredients.use-case.js.map