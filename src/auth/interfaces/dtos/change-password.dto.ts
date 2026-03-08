import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Contraseña actual del usuario',
    example: 'currentPassword123',
    minLength: 6,
  })
  currentPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Nueva contraseña',
    example: 'newPassword456',
    minLength: 6,
  })
  newPassword: string;

  @IsString()
  @MinLength(6)
  @ApiProperty({
    description: 'Confirmación de la nueva contraseña',
    example: 'newPassword456',
    minLength: 6,
  })
  confirmPassword: string;
}
