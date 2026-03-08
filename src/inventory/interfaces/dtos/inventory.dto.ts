import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  @ApiProperty({
    description: 'Nombre del artículo de inventario',
    example: 'Pan de cubanito',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción del artículo',
    example: 'Pan fresco para cubanitos',
    required: false,
  })
  description?: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Cantidad disponible en el inventario',
    example: 100,
  })
  quantity: number;

  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    description: 'Precio de compra unitario',
    example: 0.5,
  })
  purchasePrice: number;

  @IsUUID()
  @ApiProperty({
    description: 'UUID de la sede (sucursal)',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  branchId: string;
}

export class UpdateInventoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nombre del artículo',
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Descripción del artículo',
    required: false,
  })
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({
    description: 'Cantidad disponible',
    required: false,
  })
  quantity?: number;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  @ApiProperty({
    description: 'Precio de compra unitario',
    required: false,
  })
  purchasePrice?: number;
}

export class AdjustInventoryDto {
  @IsNumber()
  @ApiProperty({
    description: 'Cantidad a ajustar (positivo suma, negativo resta)',
    example: -5,
  })
  adjustment: number;
}
