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
exports.IngredientsEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../../products/domain/entities/product.entity");
const inventory_entity_1 = require("../../../inventory/domain/entities/inventory.entity");
let IngredientsEntity = class IngredientsEntity {
    id;
    productId;
    product;
    inventoryItemId;
    inventoryItem;
    quantity;
    createdAt;
    updatedAt;
};
exports.IngredientsEntity = IngredientsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], IngredientsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], IngredientsEntity.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.ProductEntity, (product) => product.ingredients, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productId' }),
    __metadata("design:type", product_entity_1.ProductEntity)
], IngredientsEntity.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], IngredientsEntity.prototype, "inventoryItemId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => inventory_entity_1.InventoryEntity, (inventory) => inventory.ingredients, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'inventoryItemId' }),
    __metadata("design:type", inventory_entity_1.InventoryEntity)
], IngredientsEntity.prototype, "inventoryItem", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], IngredientsEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], IngredientsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], IngredientsEntity.prototype, "updatedAt", void 0);
exports.IngredientsEntity = IngredientsEntity = __decorate([
    (0, typeorm_1.Entity)('ingredients')
], IngredientsEntity);
//# sourceMappingURL=ingredients.entity.js.map