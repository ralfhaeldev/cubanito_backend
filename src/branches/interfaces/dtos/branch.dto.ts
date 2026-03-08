import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre de la sede',
    example: 'Sede Centro',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Dirección de la sede',
    example: 'Calle Principal 123',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Teléfono de la sede',
    example: '+34 555 123456',
    required: false,
  })
  phone?: string;
}

export class UpdateBranchDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nombre de la sede',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Dirección de la sede',
    required: false,
  })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Teléfono de la sede',
    required: false,
  })
  phone?: string;
}
