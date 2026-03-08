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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusDto = exports.CreateOrderDto = exports.CreateOrderItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const order_status_enum_1 = require("../../../common/enums/order-status.enum");
const class_transformer_1 = require("class-transformer");
class CreateOrderItemDto {
    productId;
    quantity;
    unitPrice;
}
exports.CreateOrderItemDto = CreateOrderItemDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID del producto',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    __metadata("design:type", String)
], CreateOrderItemDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad del producto en el pedido',
        example: 2,
    }),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_1.ApiProperty)({
        description: 'Precio unitario del producto al momento del pedido',
        example: 3.5,
    }),
    __metadata("design:type", Number)
], CreateOrderItemDto.prototype, "unitPrice", void 0);
class CreateOrderDto {
    branchId;
    type;
    items;
    notes;
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID de la sede/branch',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "branchId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderType),
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de pedido: local o delivery',
        enum: order_status_enum_1.OrderType,
        example: order_status_enum_1.OrderType.LOCAL,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateOrderItemDto),
    (0, swagger_1.ApiProperty)({
        description: 'Array de items del pedido',
        type: [CreateOrderItemDto],
    }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Notas adicionales para el pedido',
        example: 'Sin picante',
        required: false,
    }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "notes", void 0);
class UpdateOrderStatusDto {
    status;
    notes;
}
exports.UpdateOrderStatusDto = UpdateOrderStatusDto;
__decorate([
    (0, class_validator_1.IsEnum)(order_status_enum_1.OrderStatus),
    (0, swagger_1.ApiProperty)({
        description: 'Nuevo estado del pedido',
        enum: order_status_enum_1.OrderStatus,
        example: order_status_enum_1.OrderStatus.EN_PROCESO,
    }),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Notas del cambio de estado',
        example: 'Comenzó la preparación',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateOrderStatusDto.prototype, "notes", void 0);
//# sourceMappingURL=order.dto.js.map