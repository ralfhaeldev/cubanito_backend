"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inventory_controller_1 = require("./interfaces/controllers/inventory.controller");
const inventory_entity_1 = require("./domain/entities/inventory.entity");
const crud_inventory_use_case_1 = require("./application/use-cases/crud-inventory.use-case");
const typeorm_inventory_repository_1 = require("./infrastructure/repositories/typeorm-inventory.repository");
const auth_module_1 = require("../auth/auth.module");
const branch_entity_1 = require("../branches/domain/entities/branch.entity");
let InventoryModule = class InventoryModule {
};
exports.InventoryModule = InventoryModule;
exports.InventoryModule = InventoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([inventory_entity_1.InventoryEntity, branch_entity_1.BranchEntity]), auth_module_1.AuthModule],
        controllers: [inventory_controller_1.InventoryController],
        providers: [crud_inventory_use_case_1.CrudInventoryUseCase, typeorm_inventory_repository_1.TypeormInventoryRepository],
        exports: [typeorm_inventory_repository_1.TypeormInventoryRepository],
    })
], InventoryModule);
//# sourceMappingURL=inventory.module.js.map