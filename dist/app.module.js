"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const products_module_1 = require("./products/products.module");
const common_module_1 = require("./common/common.module");
const auth_module_1 = require("./auth/auth.module");
const clients_module_1 = require("./clients/clients.module");
const type_payment_module_1 = require("./type-payment/type-payment.module");
const type_identification_module_1 = require("./type-identification/type-identification.module");
const attendance_options_module_1 = require("./attendance-options/attendance-options.module");
const branches_module_1 = require("./branches/branches.module");
const inventory_module_1 = require("./inventory/inventory.module");
const ingredients_module_1 = require("./ingredients/ingredients.module");
const orders_module_1 = require("./orders/orders.module");
const reports_module_1 = require("./reports/reports.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +(process.env.DB_PORT || 5432),
                database: process.env.DB_NAME,
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                autoLoadEntities: true,
                synchronize: true,
            }),
            products_module_1.ProductsModule,
            common_module_1.CommonModule,
            auth_module_1.AuthModule,
            clients_module_1.ClientsModule,
            type_payment_module_1.TypePaymentModule,
            type_identification_module_1.TypeIdentificationModule,
            attendance_options_module_1.AttendanceOptionsModule,
            branches_module_1.BranchesModule,
            inventory_module_1.InventoryModule,
            ingredients_module_1.IngredientsModule,
            orders_module_1.OrdersModule,
            reports_module_1.ReportsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map