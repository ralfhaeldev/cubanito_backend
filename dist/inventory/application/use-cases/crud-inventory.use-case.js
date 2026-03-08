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
exports.CrudInventoryUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const inventory_entity_1 = require("../../domain/entities/inventory.entity");
const branch_entity_1 = require("../../../branches/domain/entities/branch.entity");
let CrudInventoryUseCase = class CrudInventoryUseCase {
    inventoryRepository;
    branchRepository;
    constructor(inventoryRepository, branchRepository) {
        this.inventoryRepository = inventoryRepository;
        this.branchRepository = branchRepository;
    }
    async create(createInventoryDto) {
        if (createInventoryDto.branchId) {
            const branch = await this.branchRepository.findOne({
                where: { id: createInventoryDto.branchId },
            });
            if (!branch) {
                throw new common_1.NotFoundException(`Branch with id ${createInventoryDto.branchId} not found`);
            }
        }
        const inventory = this.inventoryRepository.create({
            name: createInventoryDto.name,
            description: createInventoryDto.description,
            quantity: createInventoryDto.quantity,
            purchasePrice: createInventoryDto.purchasePrice,
            branchId: createInventoryDto.branchId,
        });
        return this.inventoryRepository.save(inventory);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.inventoryRepository.find({
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
    }
    async findByBranchId(branchId) {
        const branch = await this.branchRepository.findOne({
            where: { id: branchId },
        });
        if (!branch) {
            throw new common_1.NotFoundException(`Branch with id ${branchId} not found`);
        }
        return this.inventoryRepository.find({
            where: { branchId },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const inventory = await this.inventoryRepository.findOne({
            where: { id },
            relations: ['branch', 'ingredients'],
        });
        if (!inventory) {
            throw new common_1.NotFoundException(`Inventory item with id ${id} not found`);
        }
        return inventory;
    }
    async update(id, updateInventoryDto) {
        const inventory = await this.findOne(id);
        Object.assign(inventory, updateInventoryDto);
        return this.inventoryRepository.save(inventory);
    }
    async adjustQuantity(id, adjustInventoryDto) {
        const inventory = await this.findOne(id);
        const newQuantity = inventory.quantity + adjustInventoryDto.adjustment;
        if (newQuantity < 0) {
            throw new common_1.BadRequestException('Insufficient inventory quantity');
        }
        inventory.quantity = newQuantity;
        return this.inventoryRepository.save(inventory);
    }
    async delete(id) {
        const inventory = await this.findOne(id);
        await this.inventoryRepository.remove(inventory);
    }
};
exports.CrudInventoryUseCase = CrudInventoryUseCase;
exports.CrudInventoryUseCase = CrudInventoryUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(inventory_entity_1.InventoryEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(branch_entity_1.BranchEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], CrudInventoryUseCase);
//# sourceMappingURL=crud-inventory.use-case.js.map