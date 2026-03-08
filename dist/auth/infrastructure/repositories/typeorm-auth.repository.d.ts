import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginResponse } from 'src/auth/interfaces/dtos/login-response.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';
import { ChangePasswordDto } from 'src/auth/interfaces/dtos/change-password.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class TypeormAuthRepository implements AuthRepository {
    private userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<UserEntity>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<LoginResponse>;
    private getJwt;
    login(loginUserDto: LoginUserDto): Promise<LoginResponse>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserEntity>;
}
