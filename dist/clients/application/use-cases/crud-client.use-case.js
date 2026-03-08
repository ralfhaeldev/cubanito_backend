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
exports.CrudClientUseCase = void 0;
const common_1 = require("@nestjs/common");
const clients_repository_interface_1 = require("../../domain/clients-repository.interface");
let CrudClientUseCase = class CrudClientUseCase {
    clientRepository;
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async create(createClientDto) {
        const client = await this.clientRepository.create(createClientDto);
        return client;
    }
    async findAll(paginationDto) {
        const clients = await this.clientRepository.findAll(paginationDto);
        return clients;
    }
    async findOne(id) {
        const client = await this.clientRepository.findOne(id);
        return client;
    }
    async update(id, updateClientDto) {
        const client = await this.clientRepository.update(id, updateClientDto);
        return client;
    }
};
exports.CrudClientUseCase = CrudClientUseCase;
exports.CrudClientUseCase = CrudClientUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [clients_repository_interface_1.ClientRepository])
], CrudClientUseCase);
//# sourceMappingURL=crud-client.use-case.js.map