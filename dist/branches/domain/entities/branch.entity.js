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
exports.BranchEntity = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("../../../products/domain/entities/product.entity");
const inventory_entity_1 = require("../../../inventory/domain/entities/inventory.entity");
const order_entity_1 = require("../../../orders/domain/entities/order.entity");
let BranchEntity = class BranchEntity {
    id;
    name;
    address;
    phone;
    isActive;
    products;
    inventories;
    orders;
    createdAt;
    updatedAt;
};
exports.BranchEntity = BranchEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BranchEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        unique: true,
    }),
    __metadata("design:type", String)
], BranchEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], BranchEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], BranchEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', { default: true }),
    __metadata("design:type", Boolean)
], BranchEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.ProductEntity, (product) => product.branch, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], BranchEntity.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => inventory_entity_1.InventoryEntity, (inventory) => inventory.branch, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], BranchEntity.prototype, "inventories", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (order) => order.branch, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], BranchEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], BranchEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], BranchEntity.prototype, "updatedAt", void 0);
exports.BranchEntity = BranchEntity = __decorate([
    (0, typeorm_1.Entity)('branches')
], BranchEntity);
//# sourceMappingURL=branch.entity.js.map