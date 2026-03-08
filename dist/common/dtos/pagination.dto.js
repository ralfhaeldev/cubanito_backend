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
exports.PaginationDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const roles_enum_1 = require("../enums/roles.enum");
const swagger_1 = require("@nestjs/swagger");
class PaginationDto {
    limit;
    offset;
    term;
    role;
}
exports.PaginationDto = PaginationDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPositive)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Número de resultados por página',
        example: 10,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cantidad de resultados a saltar',
        example: 0,
    }),
    __metadata("design:type", Number)
], PaginationDto.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Término de búsqueda',
        example: 'search-term',
    }),
    __metadata("design:type", String)
], PaginationDto.prototype, "term", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(roles_enum_1.Role),
    __metadata("design:type", String)
], PaginationDto.prototype, "role", void 0);
//# sourceMappingURL=pagination.dto.js.map