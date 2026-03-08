"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientsModule = void 0;
const common_1 = require("@nestjs/common");
const client_controller_1 = require("./interfaces/controllers/client.controller");
const client_entity_1 = require("./domain/entities/client.entity");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const crud_client_use_case_1 = require("./application/use-cases/crud-client.use-case");
const typeorm_client_repository_1 = require("./infrastructure/repositories/typeorm-client.repository");
const clients_repository_interface_1 = require("./domain/clients-repository.interface");
const type_identification_module_1 = require("../type-identification/type-identification.module");
let ClientsModule = class ClientsModule {
};
exports.ClientsModule = ClientsModule;
exports.ClientsModule = ClientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([client_entity_1.ClientEntity]),
            auth_module_1.AuthModule,
            type_identification_module_1.TypeIdentificationModule,
        ],
        controllers: [client_controller_1.ClientController],
        providers: [
            crud_client_use_case_1.CrudClientUseCase,
            typeorm_client_repository_1.TypeormClientRepository,
            {
                provide: clients_repository_interface_1.ClientRepository,
                useExisting: typeorm_client_repository_1.TypeormClientRepository,
            },
        ],
    })
], ClientsModule);
//# sourceMappingURL=clients.module.js.map