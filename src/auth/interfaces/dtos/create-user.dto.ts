import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsEnum, IsOptional, IsBoolean, IsUUID } from 'class-validator';
import { Role } from 'src/common/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Ana Administrador' })
  nombre: string;

  @IsEmail()
  @ApiProperty({ example: 'ana@cubanitos.co' })
  email: string;

  @IsString()
  @MinLength(4)
  @ApiProperty({ example: '1234' })
  password: string;

  @IsEnum(Role)
  @ApiProperty({ enum: Role, example: Role.MESERO })
  rol: Role;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  sedeId?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  activo?: boolean;
}
