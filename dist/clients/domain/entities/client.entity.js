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
exports.ClientEntity = void 0;
const type_identification_entity_1 = require("../../../type-identification/domain/entities/type-identification.entity");
const typeorm_1 = require("typeorm");
const sex_enum_1 = require("../enums/sex.enum");
let ClientEntity = class ClientEntity {
    id;
    typeIdentification;
    identification;
    name;
    fullName;
    address;
    birthDate;
    phone;
    sex;
};
exports.ClientEntity = ClientEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ClientEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => type_identification_entity_1.TypeIdentificationEntity, { eager: true, nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'type_identification_id' }),
    __metadata("design:type", type_identification_entity_1.TypeIdentificationEntity)
], ClientEntity.prototype, "typeIdentification", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], ClientEntity.prototype, "identification", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ClientEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ClientEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ClientEntity.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], ClientEntity.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { unique: true }),
    __metadata("design:type", String)
], ClientEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: sex_enum_1.Sex,
        nullable: false,
    }),
    __metadata("design:type", String)
], ClientEntity.prototype, "sex", void 0);
exports.ClientEntity = ClientEntity = __decorate([
    (0, typeorm_1.Entity)('clients')
], ClientEntity);
//# sourceMappingURL=client.entity.js.map