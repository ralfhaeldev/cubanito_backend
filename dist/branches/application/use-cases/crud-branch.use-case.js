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
exports.CrudBranchUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const branch_entity_1 = require("../../domain/entities/branch.entity");
let CrudBranchUseCase = class CrudBranchUseCase {
    branchRepository;
    constructor(branchRepository) {
        this.branchRepository = branchRepository;
    }
    async create(createBranchDto) {
        const existingBranch = await this.branchRepository.findOne({
            where: { name: createBranchDto.name },
        });
        if (existingBranch) {
            throw new common_1.ConflictException(`Branch with name ${createBranchDto.name} already exists`);
        }
        const branch = this.branchRepository.create({
            name: createBranchDto.name,
            address: createBranchDto.address,
            phone: createBranchDto.phone,
        });
        return this.branchRepository.save(branch);
    }
    async findAll(paginationDto) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.branchRepository.find({
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const branch = await this.branchRepository.findOne({
            where: { id },
            relations: ['products', 'inventories', 'orders'],
        });
        if (!branch) {
            throw new common_1.NotFoundException(`Branch with id ${id} not found`);
        }
        return branch;
    }
    async update(id, updateBranchDto) {
        const branch = await this.findOne(id);
        if (updateBranchDto.name && updateBranchDto.name !== branch.name) {
            const existingBranch = await this.branchRepository.findOne({
                where: { name: updateBranchDto.name },
            });
            if (existingBranch) {
                throw new common_1.ConflictException(`Branch with name ${updateBranchDto.name} already exists`);
            }
        }
        Object.assign(branch, updateBranchDto);
        return this.branchRepository.save(branch);
    }
    async delete(id) {
        const branch = await this.findOne(id);
        await this.branchRepository.remove(branch);
    }
};
exports.CrudBranchUseCase = CrudBranchUseCase;
exports.CrudBranchUseCase = CrudBranchUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(branch_entity_1.BranchEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CrudBranchUseCase);
//# sourceMappingURL=crud-branch.use-case.js.map