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
exports.CreateAutUseCase = void 0;
const common_1 = require("@nestjs/common");
const auth_repository_interface_1 = require("../../domain/auth-repository.interface");
let CreateAutUseCase = class CreateAutUseCase {
    authRepository;
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    async create(createUserDto) {
        const user = await this.authRepository.create(createUserDto);
        return user;
    }
    async login(loginUserDto) {
        return this.authRepository.login(loginUserDto);
    }
    async changePassword(userId, changePasswordDto) {
        return this.authRepository.changePassword(userId, changePasswordDto);
    }
};
exports.CreateAutUseCase = CreateAutUseCase;
exports.CreateAutUseCase = CreateAutUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_interface_1.AuthRepository])
], CreateAutUseCase);
//# sourceMappingURL=create-aut.use-case.js.map