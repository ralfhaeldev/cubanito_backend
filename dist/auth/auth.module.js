"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const aut_controller_1 = require("./interfaces/controllers/aut.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./domain/entities/user.entity");
const create_aut_use_case_1 = require("./application/use-cases/create-aut.use-case");
const typeorm_auth_repository_1 = require("./infrastructure/repositories/typeorm-auth.repository");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const auth_repository_interface_1 = require("./domain/auth-repository.interface");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                useFactory: () => {
                    return {
                        secret: process.env.JWT_SECRET,
                        signOptions: {
                            expiresIn: '2h',
                        },
                    };
                },
            }),
        ],
        controllers: [aut_controller_1.AutController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            create_aut_use_case_1.CreateAutUseCase,
            typeorm_auth_repository_1.TypeormAuthRepository,
            {
                provide: auth_repository_interface_1.AuthRepository,
                useExisting: typeorm_auth_repository_1.TypeormAuthRepository,
            },
        ],
        exports: [typeorm_1.TypeOrmModule, jwt_strategy_1.JwtStrategy, passport_1.PassportModule, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map