import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'Email del usuario',
    example: 'admin@restaurant.com',
  })
  email: string;

  @IsString()
  @MinLength(2)
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'Password123',
    minLength: 2,
  })
  password: string;
}
