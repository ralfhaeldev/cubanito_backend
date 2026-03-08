import { CreateUserDto } from '../interfaces/dtos/create-user.dto';
import { LoginResponse } from '../interfaces/dtos/login-response.dto';
import { LoginUserDto } from '../interfaces/dtos/login-user.dto';
import { ChangePasswordDto } from '../interfaces/dtos/change-password.dto';
import { UserEntity } from './entities/user.entity';
export declare abstract class AuthRepository {
    abstract create(createUserDto: CreateUserDto): Promise<LoginResponse>;
    abstract login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    abstract changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserEntity>;
}
