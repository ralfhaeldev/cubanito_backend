import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/auth/domain/auth-repository.interface';
import { UserEntity } from 'src/auth/domain/entities/user.entity';
import { CreateUserDto } from 'src/auth/interfaces/dtos/create-user.dto';
import { LoginResponse } from 'src/auth/interfaces/dtos/login-response.dto';
import { LoginUserDto } from 'src/auth/interfaces/dtos/login-user.dto';
import { ChangePasswordDto } from 'src/auth/interfaces/dtos/change-password.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/auth/interfaces/dtos/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';
import { Role } from 'src/common/enums/roles.enum';

@Injectable()
export class TypeormAuthRepository implements AuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<LoginResponse> {
    try {
      const { password, nombre, rol, sedeId, ...rest } = createUserDto as any;
      const user = this.userRepository.create({
        ...rest,
        fullName: nombre ?? rest.fullName,
        password: bcrypt.hashSync(password, 10),
        rol: rol ?? Role.MESERO,
        branchId: sedeId ?? rest.branchId ?? null,
      });

      await this.userRepository.save(user);
      return this.buildLoginResponse(user);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    const { email, password } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, fullName: true, rol: true, password: true, id: true, branchId: true },
    });

    if (!user) throw new UnauthorizedException('Credenciales inválidas');
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credenciales inválidas');

    return this.buildLoginResponse(user);
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<UserEntity> {
    if (changePasswordDto.newPassword !== changePasswordDto.confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: { id: true, email: true, password: true },
    });

    if (!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`);

    if (!bcrypt.compareSync(changePasswordDto.currentPassword, user.password)) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    user.password = bcrypt.hashSync(changePasswordDto.newPassword, 10);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<any[]> {
    const users = await this.userRepository.find({
      select: { id: true, email: true, fullName: true, rol: true, isActive: true, branchId: true },
      order: { fullName: 'ASC' },
    });
    return users.map(this.mapUserResponse);
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { id: true, email: true, fullName: true, rol: true, isActive: true, branchId: true },
    });
    if (!user) throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    return user;
  }

  async updateUser(id: string, updateDto: any): Promise<any> {
    const user = await this.findOne(id);

    if (updateDto.password) user.password = bcrypt.hashSync(updateDto.password, 10);
    if (updateDto.nombre !== undefined) user.fullName = updateDto.nombre;
    if (updateDto.fullName !== undefined) user.fullName = updateDto.fullName;
    if (updateDto.email !== undefined) user.email = updateDto.email;
    if (updateDto.rol !== undefined) user.rol = updateDto.rol;
    if (updateDto.activo !== undefined) user.isActive = updateDto.activo;
    if (updateDto.isActive !== undefined) user.isActive = updateDto.isActive;
    if (updateDto.sedeId !== undefined) user.branchId = updateDto.sedeId;
    if (updateDto.branchId !== undefined) user.branchId = updateDto.branchId;

    const saved = await this.userRepository.save(user);
    return this.mapUserResponse(saved);
  }

  private mapUserResponse(user: UserEntity) {
    return {
      id: user.id,
      nombre: user.fullName,
      email: user.email,
      rol: user.rol,
      activo: user.isActive,
      sedeId: user.branchId ?? null,
    };
  }

  private buildLoginResponse(user: UserEntity): LoginResponse {
    const payload: JwtPayload = {
      id: user.id,
      sub: user.id,
      nombre: user.fullName,
      email: user.email,
      rol: user.rol,
      sedeId: user.branchId ?? null,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        nombre: user.fullName,
        email: user.email,
        rol: user.rol,
        sedeId: user.branchId ?? null,
      },
    };
  }
}
