import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';
import { ChangePasswordDto } from 'src/auth/interfaces/dtos/change-password.dto';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
export declare class CreateAutUseCase {
    private authRepository;
    constructor(authRepository: AuthRepository);
    create(createUserDto: CreateUserDto): Promise<import("../../interfaces/dtos/login-response.dto").LoginResponse>;
    login(loginUserDto: LoginUserDto): Promise<import("../../interfaces/dtos/login-response.dto").LoginResponse>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserEntity>;
}
