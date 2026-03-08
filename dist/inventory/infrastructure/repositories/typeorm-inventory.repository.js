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
exports.TypeormInventoryRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../../domain/entities/inventory.entity");
let TypeormInventoryRepository = class TypeormInventoryRepository {
    inventoryRepository;
    constructor(inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }
    async create(inventory) {
        return this.inventoryRepository.save(inventory);
    }
    async findById(id) {
        return this.inventoryRepository.findOne({ where: { id } });
    }
    async findByBranchId(branchId) {
        return this.inventoryRepository.find({ where: { branchId } });
    }
    async findAll() {
        return this.inventoryRepository.find();
    }
    async update(id, inventory) {
        await this.inventoryRepository.update(id, inventory);
        const updated = await this.findById(id);
        return updated;
    }
    async delete(id) {
        await this.inventoryRepository.delete(id);
    }
    async adjustQuantity(id, adjustment) {
        const inventory = await this.findById(id);
        if (!inventory) {
            throw new common_1.BadRequestException(`Inventory item with id ${id} not found`);
        }
        const newQuantity = inventory.quantity + adjustment;
        if (newQuantity < 0) {
            throw new common_1.BadRequestException('Insufficient inventory quantity');
        }
        inventory.quantity = newQuantity;
        return this.inventoryRepository.save(inventory);
    }
};
exports.TypeormInventoryRepository = TypeormInventoryRepository;
exports.TypeormInventoryRepository = TypeormInventoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.InventoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormInventoryRepository);
//# sourceMappingURL=typeorm-inventory.repository.js.map