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
exports.InventoryEntity = void 0;
const typeorm_1 = require("typeorm");
const branch_entity_1 = require("../../../branches/domain/entities/branch.entity");
const ingredients_entity_1 = require("../../../ingredients/domain/entities/ingredients.entity");
let InventoryEntity = class InventoryEntity {
    id;
    name;
    description;
    quantity;
    purchasePrice;
    branchId;
    branch;
    ingredients;
    createdAt;
    updatedAt;
};
exports.InventoryEntity = InventoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InventoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], InventoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], InventoryEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InventoryEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InventoryEntity.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], InventoryEntity.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => branch_entity_1.BranchEntity, (branch) => branch.inventories, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'branchId' }),
    __metadata("design:type", branch_entity_1.BranchEntity)
], InventoryEntity.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ingredients_entity_1.IngredientsEntity, (ingredient) => ingredient.inventoryItem),
    __metadata("design:type", Array)
], InventoryEntity.prototype, "ingredients", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], InventoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], InventoryEntity.prototype, "updatedAt", void 0);
exports.InventoryEntity = InventoryEntity = __decorate([
    (0, typeorm_1.Entity)('inventory')
], InventoryEntity);
//# sourceMappingURL=inventory.entity.js.map