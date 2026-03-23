import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsUUID, IsEnum, Min } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateInventoryDto {
  @IsString()
  @ApiProperty({ example: 'Pan de hamburguesa' })
  nombre: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 100 })
  stockActual: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false, example: 20 })
  stockMinimo?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false, example: 150 })
  stockIdeal?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({ required: false, default: 0 })
  purchasePrice?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, default: 'und' })
  unidad?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  categoria?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  activo?: boolean;

  @IsOptional()
  @IsUUID()
  branchId?: string;
}

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {}

export class AdjustInventoryDto {
  @IsNumber()
  @ApiProperty({ description: 'Positive to add, negative to subtract', example: -5 })
  adjustment: number;
}

export class CreateAdjustmentDto {
  @IsUUID()
  @ApiProperty()
  itemId: string;

  @IsEnum(['entrada', 'salida', 'ajuste'])
  @ApiProperty({ enum: ['entrada', 'salida', 'ajuste'] })
  tipo: 'entrada' | 'salida' | 'ajuste';

  @IsNumber()
  @Min(0)
  @ApiProperty()
  cantidad: number;

  @IsString()
  @ApiProperty()
  motivo: string;
}
