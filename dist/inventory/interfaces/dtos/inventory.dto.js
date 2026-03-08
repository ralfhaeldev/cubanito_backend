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
exports.AdjustInventoryDto = exports.UpdateInventoryDto = exports.CreateInventoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInventoryDto {
    name;
    description;
    quantity;
    purchasePrice;
    branchId;
}
exports.CreateInventoryDto = CreateInventoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del artículo de inventario',
        example: 'Pan de cubanito',
    }),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del artículo',
        example: 'Pan fresco para cubanitos',
        required: false,
    }),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad disponible en el inventario',
        example: 100,
    }),
    __metadata("design:type", Number)
], CreateInventoryDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_1.ApiProperty)({
        description: 'Precio de compra unitario',
        example: 0.5,
    }),
    __metadata("design:type", Number)
], CreateInventoryDto.prototype, "purchasePrice", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID de la sede (sucursal)',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    __metadata("design:type", String)
], CreateInventoryDto.prototype, "branchId", void 0);
class UpdateInventoryDto {
    name;
    description;
    quantity;
    purchasePrice;
}
exports.UpdateInventoryDto = UpdateInventoryDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del artículo',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Descripción del artículo',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateInventoryDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad disponible',
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateInventoryDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Precio de compra unitario',
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateInventoryDto.prototype, "purchasePrice", void 0);
class AdjustInventoryDto {
    adjustment;
}
exports.AdjustInventoryDto = AdjustInventoryDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad a ajustar (positivo suma, negativo resta)',
        example: -5,
    }),
    __metadata("design:type", Number)
], AdjustInventoryDto.prototype, "adjustment", void 0);
//# sourceMappingURL=inventory.dto.js.map