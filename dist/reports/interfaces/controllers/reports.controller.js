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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_use_case_1 = require("../../application/use-cases/reports.use-case");
const report_dto_1 = require("../dtos/report.dto");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
const roles_enum_1 = require("../../../common/enums/roles.enum");
let ReportsController = class ReportsController {
    reportsUseCase;
    constructor(reportsUseCase) {
        this.reportsUseCase = reportsUseCase;
    }
    getSalesReport(filters) {
        return this.reportsUseCase.getSalesReport(filters);
    }
    getOrderStatusReport(filters) {
        return this.reportsUseCase.getOrderStatusReport(filters);
    }
    getProductPerformance(filters) {
        return this.reportsUseCase.getProductPerformance(filters);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('sales'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Reporte de ventas',
        description: 'Retorna un reporte de ventas agrupado por período (diario, semanal, mensual) con datos de ingresos, costos y margen',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reporte de ventas generado',
        schema: {
            example: {
                period: 'daily (2024-03-08T00:00:00Z - 2024-03-08T23:59:59Z)',
                totalSales: 500.5,
                totalOrders: 15,
                totalCost: 250.25,
                totalMargin: 250.25,
                marginPercentage: 50,
                averageOrderValue: 33.37,
                topProducts: [
                    {
                        name: 'Cubanito',
                        quantity: 30,
                        sales: 300,
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No hay órdenes para el período especificado',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportFiltersDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getSalesReport", null);
__decorate([
    (0, common_1.Get)('order-status'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Reporte de estados de órdenes',
        description: 'Retorna la cantidad de órdenes agrupadas por estado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reporte de estados generado',
        schema: {
            example: {
                pending: 5,
                'en-proceso': 3,
                preparado: 2,
                entregado: 20,
            },
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportFiltersDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getOrderStatusReport", null);
__decorate([
    (0, common_1.Get)('product-performance'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Reporte de rendimiento de productos',
        description: 'Retorna datos de productos más vendidos, ingresos generados y otros indicadores',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Reporte de productos generado',
        schema: {
            example: [
                {
                    name: 'Cubanito',
                    quantity: 50,
                    revenue: 300,
                    averagePrice: 6,
                },
                {
                    name: 'Gaseosa',
                    quantity: 30,
                    revenue: 75,
                    averagePrice: 2.5,
                },
            ],
        },
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [report_dto_1.ReportFiltersDto]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "getProductPerformance", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [reports_use_case_1.ReportsUseCase])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map