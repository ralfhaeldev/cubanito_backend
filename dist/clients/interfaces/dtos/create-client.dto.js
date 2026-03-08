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
exports.CreateClientDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sex_enum_1 = require("../../domain/enums/sex.enum");
class CreateClientDto {
    typeIdentificationId;
    identification;
    name;
    fullName;
    address;
    phone;
    birthDate;
    sex;
}
exports.CreateClientDto = CreateClientDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.IsNotEmpty)({ message: 'typeIdentificationId should not be empty' }),
    (0, swagger_1.ApiProperty)({
        description: 'UUID of type identification (e.g. CC, CE, Passport)',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "typeIdentificationId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10),
    (0, class_validator_1.IsNotEmpty)({ message: 'identification should not be empty' }),
    (0, swagger_1.ApiProperty)({
        description: 'identification client',
        maximum: 10,
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "identification", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)({
        description: 'name client',
        minimum: 1,
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)({
        description: 'full name client',
        minimum: 1,
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, swagger_1.ApiProperty)({
        description: 'address client',
        minimum: 1,
    }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10),
    (0, class_validator_1.IsNotEmpty)({ message: 'phone should not be empty' }),
    (0, class_validator_1.Matches)(/^\d+$/, { message: 'The value must contain only numbers' }),
    (0, swagger_1.ApiProperty)({ description: 'Client phone number', example: '3001234567' }),
    __metadata("design:type", String)
], CreateClientDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiProperty)({
        description: 'Birth date client',
        example: '1995-08-27T00:00:00.000Z',
    }),
    __metadata("design:type", Date)
], CreateClientDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The value must contain',
        example: 'Masculino',
        enum: ['Masculino', 'Femenino', 'Otro'],
    }),
    (0, class_validator_1.IsEnum)(sex_enum_1.Sex),
    __metadata("design:type", String)
], CreateClientDto.prototype, "sex", void 0);
//# sourceMappingURL=create-client.dto.js.map