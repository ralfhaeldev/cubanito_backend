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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("../dtos/create-user.dto");
const create_aut_use_case_1 = require("../../application/use-cases/create-aut.use-case");
const login_user_dto_1 = require("../dtos/login-user.dto");
const change_password_dto_1 = require("../dtos/change-password.dto");
const passport_1 = require("@nestjs/passport");
let AutController = class AutController {
    createAutUseCase;
    constructor(createAutUseCase) {
        this.createAutUseCase = createAutUseCase;
    }
    create(createUserDto) {
        return this.createAutUseCase.create(createUserDto);
    }
    login(loginUserDto) {
        return this.createAutUseCase.login(loginUserDto);
    }
    changePassword(changePasswordDto, request) {
        return this.createAutUseCase.changePassword(request.user.id, changePasswordDto);
    }
};
exports.AutController = AutController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrar usuario',
        description: 'Crea una nueva cuenta de usuario en el sistema',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Usuario registrado exitosamente',
        schema: {
            example: {
                user: {
                    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                    email: 'user@example.com',
                    fullName: 'John Doe',
                    roles: ['user'],
                },
                token: 'jwt-token-here',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Email ya existe o datos inválidos',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AutController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Iniciar sesión',
        description: 'Autentica el usuario y devuelve un JWT token',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login exitoso',
        schema: {
            example: {
                user: {
                    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                    email: 'user@example.com',
                    fullName: 'John Doe',
                    roles: ['mesero'],
                },
                token: 'jwt-token-here',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Credenciales inválidas',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AutController.prototype, "login", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Cambiar contraseña',
        description: 'Permite al usuario autenticado cambiar su contraseña',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Contraseña cambiada exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Contraseñas no coinciden o datos inválidos',
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Contraseña actual incorrecta',
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AutController.prototype, "changePassword", null);
exports.AutController = AutController = __decorate([
    (0, swagger_1.ApiTags)('Authentication'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [create_aut_use_case_1.CreateAutUseCase])
], AutController);
//# sourceMappingURL=aut.controller.js.map