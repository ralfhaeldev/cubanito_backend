"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeIdentificationModule = void 0;
const common_1 = require("@nestjs/common");
const type_identification_controller_1 = require("./interfaces/controllers/type-identification.controller");
const typeorm_1 = require("@nestjs/typeorm");
const type_identification_entity_1 = require("./domain/entities/type-identification.entity");
const auth_module_1 = require("../auth/auth.module");
const create_type_identification_use_case_1 = require("./application/use-cases/create-type-identification.use-case");
const typeorm_type_identification_repository_1 = require("./infrastructure/repositories/typeorm-type-identification.repository");
const type_identification_repository_interface_1 = require("./domain/type-identification-repository.interface");
let TypeIdentificationModule = class TypeIdentificationModule {
};
exports.TypeIdentificationModule = TypeIdentificationModule;
exports.TypeIdentificationModule = TypeIdentificationModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_identification_entity_1.TypeIdentificationEntity]), auth_module_1.AuthModule],
        controllers: [type_identification_controller_1.TypeIdentificationController],
        providers: [
            create_type_identification_use_case_1.CreateTypeIdentificatioUseCase,
            typeorm_type_identification_repository_1.TypeormTypeIdentificationRepository,
            {
                provide: type_identification_repository_interface_1.TypeIdentificationRepository,
                useExisting: typeorm_type_identification_repository_1.TypeormTypeIdentificationRepository,
            },
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], TypeIdentificationModule);
//# sourceMappingURL=type-identification.module.js.map