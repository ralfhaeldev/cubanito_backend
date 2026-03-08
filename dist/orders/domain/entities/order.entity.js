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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
const order_status_enum_1 = require("../../../common/enums/order-status.enum");
const branch_entity_1 = require("../../../branches/domain/entities/branch.entity");
const user_entity_1 = require("../../../auth/domain/entities/user.entity");
const order_item_entity_1 = require("./order-item.entity");
let OrderEntity = class OrderEntity {
    id;
    branchId;
    branch;
    type;
    status;
    createdByUserId;
    createdByUser;
    lastStatusChangedByUserId;
    lastStatusChangedByUser;
    notes;
    totalAmount;
    realCost;
    realMargin;
    items;
    createdAt;
    updatedAt;
    completedAt;
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => branch_entity_1.BranchEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'branchId' }),
    __metadata("design:type", branch_entity_1.BranchEntity)
], OrderEntity.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: order_status_enum_1.OrderType, default: order_status_enum_1.OrderType.LOCAL }),
    __metadata("design:type", String)
], OrderEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('enum', { enum: order_status_enum_1.OrderStatus, default: order_status_enum_1.OrderStatus.PENDING }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "createdByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'createdByUserId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "createdByUser", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "lastStatusChangedByUserId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { onDelete: 'SET NULL', nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'lastStatusChangedByUserId' }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderEntity.prototype, "lastStatusChangedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "realCost", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "realMargin", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_item_entity_1.OrderItemEntity, (item) => item.order, { cascade: true }),
    __metadata("design:type", Array)
], OrderEntity.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp', { nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "completedAt", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('orders'),
    (0, typeorm_1.Index)(['branchId', 'status']),
    (0, typeorm_1.Index)(['createdAt'])
], OrderEntity);
//# sourceMappingURL=order.entity.js.map