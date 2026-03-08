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
exports.UpdateBranchDto = exports.CreateBranchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBranchDto {
    name;
    address;
    phone;
}
exports.CreateBranchDto = CreateBranchDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la sede',
        example: 'Sede Centro',
    }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Dirección de la sede',
        example: 'Calle Principal 123',
        required: false,
    }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Teléfono de la sede',
        example: '+34 555 123456',
        required: false,
    }),
    __metadata("design:type", String)
], CreateBranchDto.prototype, "phone", void 0);
class UpdateBranchDto {
    name;
    address;
    phone;
}
exports.UpdateBranchDto = UpdateBranchDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la sede',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateBranchDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Dirección de la sede',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateBranchDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Teléfono de la sede',
        required: false,
    }),
    __metadata("design:type", String)
], UpdateBranchDto.prototype, "phone", void 0);
//# sourceMappingURL=branch.dto.js.map