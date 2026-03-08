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
exports.UpdateIngredientDto = exports.CreateIngredientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateIngredientDto {
    productId;
    inventoryItemId;
    quantity;
}
exports.CreateIngredientDto = CreateIngredientDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID del producto preparado',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    __metadata("design:type", String)
], CreateIngredientDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID del artículo de inventario (insumo)',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    }),
    __metadata("design:type", String)
], CreateIngredientDto.prototype, "inventoryItemId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad del ingrediente necesaria para el producto',
        example: 2.5,
    }),
    __metadata("design:type", Number)
], CreateIngredientDto.prototype, "quantity", void 0);
class UpdateIngredientDto {
    quantity;
}
exports.UpdateIngredientDto = UpdateIngredientDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad del ingrediente necesaria para el producto',
        example: 3,
    }),
    __metadata("design:type", Number)
], UpdateIngredientDto.prototype, "quantity", void 0);
//# sourceMappingURL=ingredient.dto.js.map