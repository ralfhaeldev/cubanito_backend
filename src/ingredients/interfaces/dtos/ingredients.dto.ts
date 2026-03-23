import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateIngredientDto {
  @IsUUID()
  @ApiProperty({
    description: 'UUID del producto preparado',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  productId: string;

  @IsUUID()
  @ApiProperty({
    description: 'UUID del artículo de inventario (insumo)',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  inventoryItemId: string;

  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    description: 'Cantidad del ingrediente necesaria para el producto',
    example: 2.5,
  })
  quantity: number;
}

export class UpdateIngredientDto {
  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    description: 'Cantidad del ingrediente necesaria para el producto',
    example: 3,
  })
  quantity?: number;
}
