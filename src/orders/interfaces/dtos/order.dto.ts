import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { OrderType, OrderStatus } from 'src/common/enums/order-status.enum';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsUUID()
  @ApiProperty({
    description: 'UUID del producto',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  productId: string;

  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Cantidad del producto en el pedido',
    example: 2,
  })
  quantity: number;

  @IsNumber()
  @Min(0.01)
  @ApiProperty({
    description: 'Precio unitario del producto al momento del pedido',
    example: 3.5,
  })
  unitPrice: number;
}

export class CreateOrderDto {
  @IsUUID()
  @ApiProperty({
    description: 'UUID de la sede/branch',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  branchId: string;

  @IsEnum(OrderType)
  @ApiProperty({
    description: 'Tipo de pedido: local o delivery',
    enum: OrderType,
    example: OrderType.LOCAL,
  })
  type: OrderType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @ApiProperty({
    description: 'Array de items del pedido',
    type: [CreateOrderItemDto],
  })
  items: CreateOrderItemDto[];

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Notas adicionales para el pedido',
    example: 'Sin picante',
    required: false,
  })
  notes?: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @ApiProperty({
    description: 'Nuevo estado del pedido',
    enum: OrderStatus,
    example: OrderStatus.EN_PROCESO,
  })
  status: OrderStatus;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Notas del cambio de estado',
    example: 'Comenzó la preparación',
    required: false,
  })
  notes?: string;
}
