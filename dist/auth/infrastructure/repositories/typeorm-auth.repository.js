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
exports.TypeormAuthRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../domain/entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const class_transformer_1 = require("class-transformer");
const database_exception_handler_1 = require("../../../common/exceptions/database-exception.handler");
let TypeormAuthRepository = class TypeormAuthRepository {
    userRepository;
    jwtService;
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                pawssowrd: bcrypt.hashSync(password, 10),
            });
            await this.userRepository.save(user);
            const userWithoutPassword = (0, class_transformer_1.instanceToInstance)(user);
            const response = {
                user: userWithoutPassword,
                token: this.getJwt({ id: user.id }),
            };
            return response;
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
    }
    getJwt(payload) {
        return this.jwtService.sign(payload);
    }
    async login(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: {
                email: true,
                fullName: true,
                roles: true,
                pawssowrd: true,
                id: true,
            },
        });
        if (!user)
            throw new common_1.UnauthorizedException('credentials are not valid(email)');
        if (!bcrypt.compareSync(password, user.pawssowrd))
            throw new common_1.UnauthorizedException('credentials are not valid (password)');
        const userWithoutPassword = (0, class_transformer_1.instanceToInstance)(user);
        const response = {
            user: userWithoutPassword,
            token: this.getJwt({ id: user.id }),
        };
        return response;
    }
    async changePassword(userId, changePasswordDto) {
        if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
            throw new common_1.BadRequestException('New password and confirm password do not match');
        }
        const user = await this.userRepository.findOne({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                pawssowrd: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        if (!bcrypt.compareSync(changePasswordDto.currentPassword, user.pawssowrd)) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        user.pawssowrd = bcrypt.hashSync(changePasswordDto.newPassword, 10);
        return this.userRepository.save(user);
    }
};
exports.TypeormAuthRepository = TypeormAuthRepository;
exports.TypeormAuthRepository = TypeormAuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], TypeormAuthRepository);
//# sourceMappingURL=typeorm-auth.repository.js.map