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
exports.TypeormTypeIdentificationRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const type_identification_entity_1 = require("../../domain/entities/type-identification.entity");
const typeorm_2 = require("typeorm");
let TypeormTypeIdentificationRepository = class TypeormTypeIdentificationRepository {
    typeIdentificationrepository;
    constructor(typeIdentificationrepository) {
        this.typeIdentificationrepository = typeIdentificationrepository;
    }
    async findOne(id) {
        let typePayments = null;
        if ((0, class_validator_1.isUUID)(id)) {
            typePayments = await this.typeIdentificationrepository.findOneBy({ id });
        }
        if (!typePayments)
            throw new common_1.NotFoundException(`type identification with id ${id} not found`);
        return typePayments;
    }
    async findAll(pagintationDto) {
        const { limit = 10, offset = 0, term = null } = pagintationDto;
        const where = term
            ? {
                name: (0, typeorm_2.ILike)(`%${term}%`),
                fullName: (0, typeorm_2.ILike)(`%${term}%`),
                identification: (0, typeorm_2.ILike)(`%${term}%`),
            }
            : {};
        const typePayments = await this.typeIdentificationrepository.find({
            take: limit,
            skip: offset,
        });
        return typePayments;
    }
};
exports.TypeormTypeIdentificationRepository = TypeormTypeIdentificationRepository;
exports.TypeormTypeIdentificationRepository = TypeormTypeIdentificationRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(type_identification_entity_1.TypeIdentificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormTypeIdentificationRepository);
//# sourceMappingURL=typeorm-type-identification.repository.js.map