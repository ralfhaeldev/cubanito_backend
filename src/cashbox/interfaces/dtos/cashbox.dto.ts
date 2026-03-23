import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min, IsIn } from 'class-validator';

export class AbrirCajaDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Monto inicial en caja', example: 50000 })
  montoInicial: number;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: 'UUID de la sede', required: false })
  branchId?: string;
}

export class CerrarCajaDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Monto final contado en caja', example: 180000 })
  montoFinal: number;
}

export class CreateMovimientoDto {
  @IsIn(['ingreso', 'egreso', 'gasto'])
  @ApiProperty({ description: 'Tipo de movimiento', enum: ['ingreso', 'egreso', 'gasto'] })
  tipo: 'ingreso' | 'egreso' | 'gasto';

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Monto del movimiento', example: 15000 })
  monto: number;

  @IsString()
  @ApiProperty({ description: 'Descripción del movimiento', example: 'Pago pedido #123' })
  descripcion: string;
}
