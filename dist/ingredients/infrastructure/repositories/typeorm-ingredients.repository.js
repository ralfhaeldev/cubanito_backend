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
exports.TypeormIngredientsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ingredients_entity_1 = require("../../domain/entities/ingredients.entity");
let TypeormIngredientsRepository = class TypeormIngredientsRepository {
    ingredientsRepository;
    constructor(ingredientsRepository) {
        this.ingredientsRepository = ingredientsRepository;
    }
    async create(ingredient) {
        return this.ingredientsRepository.save(ingredient);
    }
    async findById(id) {
        return this.ingredientsRepository.findOne({ where: { id } });
    }
    async findByProductId(productId) {
        return this.ingredientsRepository.find({
            where: { productId },
            relations: ['inventoryItem'],
        });
    }
    async update(id, ingredient) {
        await this.ingredientsRepository.update(id, ingredient);
        const updated = await this.findById(id);
        return updated;
    }
    async delete(id) {
        await this.ingredientsRepository.delete(id);
    }
};
exports.TypeormIngredientsRepository = TypeormIngredientsRepository;
exports.TypeormIngredientsRepository = TypeormIngredientsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ingredients_entity_1.IngredientsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormIngredientsRepository);
//# sourceMappingURL=typeorm-ingredients.repository.js.map