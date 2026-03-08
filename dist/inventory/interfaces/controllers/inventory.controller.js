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
exports.InventoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_inventory_use_case_1 = require("../../application/use-cases/crud-inventory.use-case");
const inventory_dto_1 = require("../dtos/inventory.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
const roles_enum_1 = require("../../../common/enums/roles.enum");
let InventoryController = class InventoryController {
    crudInventoryUseCase;
    constructor(crudInventoryUseCase) {
        this.crudInventoryUseCase = crudInventoryUseCase;
    }
    create(createInventoryDto) {
        return this.crudInventoryUseCase.create(createInventoryDto);
    }
    findAll(paginationDto) {
        return this.crudInventoryUseCase.findAll(paginationDto);
    }
    findByBranchId(branchId) {
        return this.crudInventoryUseCase.findByBranchId(branchId);
    }
    findOne(id) {
        return this.crudInventoryUseCase.findOne(id);
    }
    update(id, updateInventoryDto) {
        return this.crudInventoryUseCase.update(id, updateInventoryDto);
    }
    adjustQuantity(id, adjustInventoryDto) {
        return this.crudInventoryUseCase.adjustQuantity(id, adjustInventoryDto);
    }
    delete(id) {
        return this.crudInventoryUseCase.delete(id);
    }
};
exports.InventoryController = InventoryController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear artículo de inventario',
        description: 'Crea un nuevo artículo de inventario. Puede ser un producto simple o un insumo para productos preparados.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Artículo de inventario creado exitosamente',
        schema: {
            example: {
                id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                name: 'Pan de cubanito',
                description: 'Pan fresco para cubanitos',
                quantity: 100,
                purchasePrice: 0.5,
                branchId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                createdAt: '2024-03-08T12:00:00Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede no encontrada',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inventory_dto_1.CreateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar artículos de inventario',
        description: 'Retorna todos los artículos de inventario con paginación',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de artículos de inventario',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('branch/:branchId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener inventario de una sede',
        description: 'Retorna todos los artículos de inventario de una sede específica',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Inventario de la sede',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede no encontrada',
    }),
    __param(0, (0, common_1.Param)('branchId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findByBranchId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener artículo de inventario',
        description: 'Retorna los detalles de un artículo específico de inventario',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Artículo encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Artículo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar artículo de inventario',
        description: 'Actualiza los detalles de un artículo de inventario',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Artículo actualizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Artículo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.UpdateInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/adjust'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN, roles_enum_1.Role.COCINA),
    (0, swagger_1.ApiOperation)({
        summary: 'Ajustar cantidad de inventario',
        description: 'Ajusta la cantidad de un artículo. Positivo suma, negativo resta.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ajuste realizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Cantidad insuficiente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Artículo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, inventory_dto_1.AdjustInventoryDto]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "adjustQuantity", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar artículo de inventario',
        description: 'Elimina un artículo de inventario',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Artículo eliminado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Artículo no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "delete", null);
exports.InventoryController = InventoryController = __decorate([
    (0, swagger_1.ApiTags)('Inventory'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('inventory'),
    __metadata("design:paramtypes", [crud_inventory_use_case_1.CrudInventoryUseCase])
], InventoryController);
//# sourceMappingURL=inventory.controller.js.map