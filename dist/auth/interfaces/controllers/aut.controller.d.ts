import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateAutUseCase } from '../../application/use-cases/create-aut.use-case';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
export declare class AutController {
    private readonly createAutUseCase;
    constructor(createAutUseCase: CreateAutUseCase);
    create(createUserDto: CreateUserDto): Promise<import("../dtos/login-response.dto").LoginResponse>;
    login(loginUserDto: LoginUserDto): Promise<import("../dtos/login-response.dto").LoginResponse>;
    changePassword(changePasswordDto: ChangePasswordDto, request: any): Promise<import("../../domain/entities/user.entity").UserEntity>;
}
