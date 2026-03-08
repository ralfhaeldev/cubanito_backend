import { Body, Controller, Post, Patch, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateAutUseCase } from '../../application/use-cases/create-aut.use-case';
import { LoginUserDto } from '../dtos/login-user.dto';
import { ChangePasswordDto } from '../dtos/change-password.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Authentication')
@Controller('auth')
export class AutController {
  constructor(private readonly createAutUseCase: CreateAutUseCase) {}

  /**
   * Registrar nuevo usuario
   */
  @Post('register')
  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Crea una nueva cuenta de usuario en el sistema',
  })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 400,
    description: 'Email ya existe o datos inválidos',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.createAutUseCase.create(createUserDto);
  }

  /**
   * Login de usuario
   */
  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description: 'Autentica el usuario y devuelve un JWT token',
  })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.createAutUseCase.login(loginUserDto);
  }

  /**
   * Cambiar contraseña
   * Requiere JWT token válido
   */
  @Patch('change-password')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Cambiar contraseña',
    description: 'Permite al usuario autenticado cambiar su contraseña',
  })
  @ApiResponse({
    status: 200,
    description: 'Contraseña cambiada exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'Contraseñas no coinciden o datos inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Contraseña actual incorrecta',
  })
  changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() request: any,
  ) {
    return this.createAutUseCase.changePassword(request.user.id, changePasswordDto);
  }
}
