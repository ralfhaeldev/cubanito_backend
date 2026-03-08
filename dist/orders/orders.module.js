"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_controller_1 = require("./interfaces/controllers/order.controller");
const order_entity_1 = require("./domain/entities/order.entity");
const order_item_entity_1 = require("./domain/entities/order-item.entity");
const crud_order_use_case_1 = require("./application/use-cases/crud-order.use-case");
const typeorm_order_repository_1 = require("./infrastructure/repositories/typeorm-order.repository");
const auth_module_1 = require("../auth/auth.module");
const branch_entity_1 = require("../branches/domain/entities/branch.entity");
const product_entity_1 = require("../products/domain/entities/product.entity");
const inventory_entity_1 = require("../inventory/domain/entities/inventory.entity");
const ingredients_entity_1 = require("../ingredients/domain/entities/ingredients.entity");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.OrderEntity,
                order_item_entity_1.OrderItemEntity,
                branch_entity_1.BranchEntity,
                product_entity_1.ProductEntity,
                inventory_entity_1.InventoryEntity,
                ingredients_entity_1.IngredientsEntity,
            ]),
            auth_module_1.AuthModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [crud_order_use_case_1.CrudOrderUseCase, typeorm_order_repository_1.TypeormOrderRepository],
        exports: [typeorm_order_repository_1.TypeormOrderRepository],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map