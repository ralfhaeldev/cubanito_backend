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
exports.TypeormClientRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_validator_1 = require("class-validator");
const client_entity_1 = require("../../domain/entities/client.entity");
const database_exception_handler_1 = require("../../../common/exceptions/database-exception.handler");
const typeorm_2 = require("typeorm");
const type_identification_entity_1 = require("../../../type-identification/domain/entities/type-identification.entity");
let TypeormClientRepository = class TypeormClientRepository {
    clientRepository;
    typeIdentificationRepository;
    constructor(clientRepository, typeIdentificationRepository) {
        this.clientRepository = clientRepository;
        this.typeIdentificationRepository = typeIdentificationRepository;
    }
    async create(clientDto) {
        try {
            const { typeIdentificationId, ...rest } = clientDto;
            const typeIdentification = await this.typeIdentificationRepository.findOneBy({
                id: typeIdentificationId,
            });
            if (!typeIdentification) {
                throw new common_1.NotFoundException(`TypeIdentification with id ${typeIdentificationId} not found`);
            }
            const createClientEntity = this.clientRepository.create({
                ...rest,
                typeIdentification,
            });
            const client = await this.clientRepository.save(createClientEntity);
            return client;
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
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
        const clients = await this.clientRepository.find({
            where,
            take: limit,
            skip: offset,
        });
        return clients;
    }
    async findOne(id) {
        let client = null;
        if ((0, class_validator_1.isUUID)(id)) {
            client = await this.clientRepository.findOneBy({ id });
        }
        if (!client)
            throw new common_1.NotFoundException(`Client with id ${id} not found`);
        return client;
    }
    async update(id, updateCliewntDto) {
        try {
            const client = await this.clientRepository.preload({
                id,
                ...updateCliewntDto,
            });
            if (!client) {
                throw new common_1.NotFoundException(`Client with id ${id} not found`);
            }
            return await this.clientRepository.save(client);
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
};
exports.TypeormClientRepository = TypeormClientRepository;
exports.TypeormClientRepository = TypeormClientRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(client_entity_1.ClientEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(type_identification_entity_1.TypeIdentificationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TypeormClientRepository);
//# sourceMappingURL=typeorm-client.repository.js.map