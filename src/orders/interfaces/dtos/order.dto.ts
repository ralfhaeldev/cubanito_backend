import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsEnum, IsString, IsOptional, IsArray, ValidateNested, IsNumber, Min } from 'class-validator';
import { OrderType, OrderStatus } from 'src/common/enums/order-status.enum';
import { Type } from 'class-transformer';

export class CreateOrderItemDto {
  @IsUUID()
  productoId: string;

  @IsOptional()
  @IsString()
  productoNombre?: string;

  @IsNumber()
  @Min(1)
  cantidad: number;

  @IsNumber()
  @Min(0)
  precioUnitario: number;

  @IsOptional()
  @IsNumber()
  subtotal?: number;
}

export class ClienteDomicilioDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;

  @IsString()
  direccion: string;
}

export class CreateOrderDto {
  @IsEnum(OrderType)
  @ApiProperty({ enum: OrderType, example: OrderType.LOCAL })
  tipo: OrderType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ClienteDomicilioDto)
  clienteDomicilio?: ClienteDomicilioDto;

  @IsOptional()
  @IsUUID()
  branchId?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  @ApiProperty({ enum: OrderStatus })
  estado: OrderStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class FinalizarOrderDto {
  @IsEnum(['efectivo', 'transferencia'])
  metodo: string;

  @IsNumber()
  monto: number;

  @IsOptional()
  @IsNumber()
  vuelto?: number;
}
