"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const product_controller_1 = require("./interfaces/controllers/product.controller");
const typeorm_1 = require("@nestjs/typeorm");
const product_entity_1 = require("./domain/entities/product.entity");
const crud_product_use_case_1 = require("./application/use-cases/crud-product.use-case");
const typeorm_product_repository_1 = require("./infrastructure/repositories/typeorm-product.repository");
const auth_module_1 = require("../auth/auth.module");
const product_repository_interface_1 = require("./domain/product-repository.interface");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.ProductEntity]), auth_module_1.AuthModule],
        controllers: [product_controller_1.ProductController],
        providers: [
            crud_product_use_case_1.CrudProductUseCase,
            typeorm_product_repository_1.TypeormProductRepository,
            {
                provide: product_repository_interface_1.ProductRepository,
                useExisting: typeorm_product_repository_1.TypeormProductRepository,
            },
        ],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map