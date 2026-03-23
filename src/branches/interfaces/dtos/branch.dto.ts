import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateBranchDto {
  @IsString()
  @MinLength(2)
  @ApiProperty({ example: 'Sede Centro' })
  nombre: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  activa?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  address?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  phone?: string;
}

export class UpdateBranchDto extends PartialType(CreateBranchDto) {}
