"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ingredients_controller_1 = require("./interfaces/controllers/ingredients.controller");
const ingredients_entity_1 = require("./domain/entities/ingredients.entity");
const crud_ingredients_use_case_1 = require("./application/use-cases/crud-ingredients.use-case");
const typeorm_ingredients_repository_1 = require("./infrastructure/repositories/typeorm-ingredients.repository");
const auth_module_1 = require("../auth/auth.module");
const product_entity_1 = require("../products/domain/entities/product.entity");
const inventory_entity_1 = require("../inventory/domain/entities/inventory.entity");
let IngredientsModule = class IngredientsModule {
};
exports.IngredientsModule = IngredientsModule;
exports.IngredientsModule = IngredientsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([ingredients_entity_1.IngredientsEntity, product_entity_1.ProductEntity, inventory_entity_1.InventoryEntity]),
            auth_module_1.AuthModule,
        ],
        controllers: [ingredients_controller_1.IngredientsController],
        providers: [crud_ingredients_use_case_1.CrudIngredientsUseCase, typeorm_ingredients_repository_1.TypeormIngredientsRepository],
        exports: [typeorm_ingredients_repository_1.TypeormIngredientsRepository],
    })
], IngredientsModule);
//# sourceMappingURL=ingredients.module.js.map