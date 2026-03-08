"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reports_controller_1 = require("./interfaces/controllers/reports.controller");
const reports_use_case_1 = require("./application/use-cases/reports.use-case");
const order_entity_1 = require("../orders/domain/entities/order.entity");
const order_item_entity_1 = require("../orders/domain/entities/order-item.entity");
const branch_entity_1 = require("../branches/domain/entities/branch.entity");
const auth_module_1 = require("../auth/auth.module");
let ReportsModule = class ReportsModule {
};
exports.ReportsModule = ReportsModule;
exports.ReportsModule = ReportsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([order_entity_1.OrderEntity, order_item_entity_1.OrderItemEntity, branch_entity_1.BranchEntity]),
            auth_module_1.AuthModule,
        ],
        controllers: [reports_controller_1.ReportsController],
        providers: [reports_use_case_1.ReportsUseCase],
        exports: [reports_use_case_1.ReportsUseCase],
    })
], ReportsModule);
//# sourceMappingURL=reports.module.js.map