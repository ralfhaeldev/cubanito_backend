import { Injectable } from '@nestjs/common';
import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';
import { ChangePasswordDto } from 'src/auth/interfaces/dtos/change-password.dto';
import { UserEntity } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class CreateAuthUseCase {
  constructor(private authRepository: AuthRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.authRepository.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return this.authRepository.login(loginUserDto);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserEntity> {
    return this.authRepository.changePassword(userId, changePasswordDto);
  }

  async findAllUsers() {
    return this.authRepository.findAll();
  }

  async findOneUser(id: string) {
    return this.authRepository.findOne(id);
  }

  async updateUser(id: string, updateDto: Partial<CreateUserDto & { isActive: boolean; branchId: string | null }>) {
    return this.authRepository.updateUser(id, updateDto);
  }
}
