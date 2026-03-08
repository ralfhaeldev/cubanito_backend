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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_order_use_case_1 = require("../../application/use-cases/crud-order.use-case");
const order_dto_1 = require("../dtos/order.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
const roles_enum_1 = require("../../../common/enums/roles.enum");
let OrderController = class OrderController {
    crudOrderUseCase;
    constructor(crudOrderUseCase) {
        this.crudOrderUseCase = crudOrderUseCase;
    }
    create(createOrderDto, request) {
        return this.crudOrderUseCase.create(createOrderDto, request.user.id);
    }
    findAll(paginationDto, branchId) {
        return this.crudOrderUseCase.findAll(paginationDto, branchId);
    }
    findOne(id) {
        return this.crudOrderUseCase.findOne(id);
    }
    updateStatus(id, updateOrderStatusDto, request) {
        return this.crudOrderUseCase.updateStatus(id, updateOrderStatusDto, request.user.id, request.user.roles);
    }
    delete(id) {
        return this.crudOrderUseCase.delete(id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.MESERO, roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear nuevo pedido',
        description: 'Crea un nuevo pedido con los items especificados. Comienza en estado PENDING.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Pedido creado exitosamente',
        schema: {
            example: {
                id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                branchId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
                type: 'local',
                status: 'pending',
                totalAmount: 10.5,
                realCost: 0,
                items: [
                    {
                        productId: 'product-uuid',
                        quantity: 2,
                        unitPrice: 5.25,
                    },
                ],
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Datos inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede o producto no encontrado',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar pedidos',
        description: 'Retorna todos los pedidos con paginación y filtros opcionales',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Cantidad de registros por página',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'offset',
        required: false,
        type: Number,
        description: 'Cantidad de registros a saltar',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'branchId',
        required: false,
        type: String,
        description: 'Filtrar por UUID de sede',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de pedidos',
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener pedido',
        description: 'Retorna los detalles completos de un pedido específico',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'UUID del pedido',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.MESERO, roles_enum_1.Role.COCINA, roles_enum_1.Role.DOMICILIARIO, roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar estado del pedido',
        description: 'Actualiza el estado del pedido. Las transiciones varía según el rol del usuario.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'UUID del pedido',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Estado actualizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Transición de estado inválida',
    }),
    (0, swagger_1.ApiResponse)({
        status: 403,
        description: 'Usuario no autorizado para esta transición',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar pedido',
        description: 'Elimina un pedido. Solo se pueden eliminar pedidos en estado PENDING',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        type: String,
        description: 'UUID del pedido',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Pedido eliminado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'No se puede eliminar un pedido que no está en PENDING',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Pedido no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "delete", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('Orders'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [crud_order_use_case_1.CrudOrderUseCase])
], OrderController);
//# sourceMappingURL=order.controller.js.map