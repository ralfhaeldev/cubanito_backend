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
exports.UserEntity = void 0;
const class_transformer_1 = require("class-transformer");
const roles_enum_1 = require("../../../common/enums/roles.enum");
const typeorm_1 = require("typeorm");
let UserEntity = class UserEntity {
    id;
    email;
    pawssowrd;
    fullName;
    isActive;
    roles;
    checkFieldInsert() {
        this.email = this.email.toLocaleLowerCase().trim();
    }
    checkFieldUpdate() {
        this.checkFieldInsert();
    }
    json() {
        return {
            id: this.id,
            fullName: this.fullName,
            roles: this.roles,
        };
    }
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', {
        unique: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)('text', { select: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "pawssowrd", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)('bool', {
        default: true,
    }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: [roles_enum_1.Role.USER] }),
    __metadata("design:type", Array)
], UserEntity.prototype, "roles", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "checkFieldInsert", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserEntity.prototype, "checkFieldUpdate", null);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);
//# sourceMappingURL=user.entity.js.map