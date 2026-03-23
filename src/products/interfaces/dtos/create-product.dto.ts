import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsEnum, IsUUID, IsOptional, IsBoolean, IsArray, ValidateNested, Min } from 'class-validator';
import { ProductType } from 'src/common/enums/product-status.enum';

export class CreateIngredienteDto {
  @IsUUID()
  itemInventarioId: string;

  @IsString()
  itemNombre: string;

  @IsNumber()
  @Min(0)
  cantidad: number;

  @IsString()
  unidad: string;
}

export class CreateProductDto {
  @IsString()
  @ApiProperty({ example: 'Cubanito Clásico' })
  nombre: string;

  @IsEnum(ProductType)
  @ApiProperty({ enum: ProductType, example: ProductType.PREPARADO })
  tipo: ProductType;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 6000 })
  precioVenta: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({ example: 2400 })
  precioCompra: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false, default: true })
  activo?: boolean;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  itemInventarioId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty({ required: false })
  branchId?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateIngredienteDto)
  @ApiProperty({ required: false, type: [CreateIngredienteDto] })
  ingredientes?: CreateIngredienteDto[];
}
