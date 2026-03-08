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
exports.UpdateProductDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const product_status_enum_1 = require("../../../common/enums/product-status.enum");
class UpdateProductDto {
    title;
    description;
    sellingPrice;
    type;
    status;
    branchId;
}
exports.UpdateProductDto = UpdateProductDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product title/name',
        example: 'Cubanito Clásico',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Product description',
        example: 'Pan con relleno y salsas',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, swagger_1.ApiProperty)({
        description: 'Selling price',
        example: 6.50,
        required: false,
    }),
    __metadata("design:type", Number)
], UpdateProductDto.prototype, "sellingPrice", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(product_status_enum_1.ProductType),
    (0, swagger_1.ApiProperty)({
        description: 'Product type: simple or preparado (recipe)',
        enum: product_status_enum_1.ProductType,
        example: product_status_enum_1.ProductType.SIMPLE,
        required: false,
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(product_status_enum_1.ProductStatus),
    (0, swagger_1.ApiProperty)({
        description: 'Product status',
        enum: product_status_enum_1.ProductStatus,
        example: product_status_enum_1.ProductStatus.ACTIVE,
        required: false,
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    (0, swagger_1.ApiProperty)({
        description: 'Branch ID where product belongs',
        example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "branchId", void 0);
//# sourceMappingURL=update-product.dto.js.map