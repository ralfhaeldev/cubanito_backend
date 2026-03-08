"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePaymentModule = void 0;
const common_1 = require("@nestjs/common");
const type_paymen_controller_1 = require("./interfaces/controllers/type-paymen.controller");
const typeorm_1 = require("@nestjs/typeorm");
const type_paymen_entity_1 = require("./domain/entities/type-paymen.entity");
const auth_module_1 = require("../auth/auth.module");
const crud_type_paymen_use_case_1 = require("./application/use-cases/crud-type-paymen.use-case");
const typeorm_type_paymen_repository_1 = require("./infrastructure/repositories/typeorm-type-paymen.repository");
const repository_interface_1 = require("./domain/repository.interface");
let TypePaymentModule = class TypePaymentModule {
};
exports.TypePaymentModule = TypePaymentModule;
exports.TypePaymentModule = TypePaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([type_paymen_entity_1.TypePaymenEntity]), auth_module_1.AuthModule],
        controllers: [type_paymen_controller_1.TypePaymenController],
        providers: [
            crud_type_paymen_use_case_1.CrudTypePaymenUseCase,
            typeorm_type_paymen_repository_1.TypeormTypePaymenRepository,
            {
                provide: repository_interface_1.TypePaymentRepository,
                useExisting: typeorm_type_paymen_repository_1.TypeormTypePaymenRepository,
            },
        ],
    })
], TypePaymentModule);
//# sourceMappingURL=type-payment.module.js.map