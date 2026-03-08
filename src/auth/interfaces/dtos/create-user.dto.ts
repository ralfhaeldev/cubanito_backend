import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'Email único del usuario',
    example: 'admin@restaurant.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @ApiProperty({
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
    example: 'SecurePassword123',
    minLength: 6,
    maxLength: 50,
  })
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez García',
    minLength: 3,
    maxLength: 100,
  })
  fullName: string;

  @IsArray()
  @IsEnum(Role, { each: true })
  @ApiProperty({
    description: 'Array de roles del usuario',
    enum: Role,
    isArray: true,
    example: [Role.MESERO, Role.ADMIN],
  })
  roles: Role[];
}
