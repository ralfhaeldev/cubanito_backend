import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateAuthUseCase } from '../../application/use-cases/create-auth.use-case';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly createAuthUseCase: CreateAuthUseCase) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createAuthUseCase.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.createAuthUseCase.login(loginUserDto);
  }

  @Patch('change-password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cambiar contraseña' })
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() request: any) {
    return this.createAuthUseCase.changePassword(request.user.id, changePasswordDto);
  }
}

// ─── Usuarios (User Management) ───────────────────────────────────────────────
@ApiTags('Usuarios')
@ApiBearerAuth()
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly createAuthUseCase: CreateAuthUseCase) {}

  @Get()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Listar usuarios' })
  findAll() {
    return this.createAuthUseCase.findAllUsers();
  }

  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createAuthUseCase.create(createUserDto);
  }

  @Patch(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Actualizar usuario' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: any,
  ) {
    return this.createAuthUseCase.updateUser(id, updateDto);
  }
}
