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
exports.TypeormOrderRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../domain/entities/order.entity");
let TypeormOrderRepository = class TypeormOrderRepository {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async create(order) {
        return this.orderRepository.save(order);
    }
    async findById(id) {
        return this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product', 'branch', 'createdByUser', 'lastStatusChangedByUser'],
        });
    }
    async findByBranchId(branchId, skip = 0, take = 10) {
        return this.orderRepository.find({
            where: { branchId },
            relations: ['items', 'items.product', 'branch'],
            order: { createdAt: 'DESC' },
            skip,
            take,
        });
    }
    async findByStatus(status, branchId) {
        return this.orderRepository.find({
            where: branchId ? { status, branchId } : { status },
            relations: ['items', 'items.product', 'branch'],
            order: { createdAt: 'DESC' },
        });
    }
    async update(id, order) {
        await this.orderRepository.update(id, order);
        const updated = await this.findById(id);
        return updated;
    }
    async delete(id) {
        await this.orderRepository.delete(id);
    }
};
exports.TypeormOrderRepository = TypeormOrderRepository;
exports.TypeormOrderRepository = TypeormOrderRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormOrderRepository);
//# sourceMappingURL=typeorm-order.repository.js.map