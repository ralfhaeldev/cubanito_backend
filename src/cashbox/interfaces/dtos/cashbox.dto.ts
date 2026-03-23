import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min, IsIn } from 'class-validator';

export class OpenCashboxDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Initial amount in cashbox', example: 50000 })
  initialAmount: number;

  @IsUUID()
  @IsOptional()
  @ApiProperty({ description: 'Branch UUID', required: false })
  branchId?: string;
}

export class CloseCashboxDto {
  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Final amount counted in cashbox', example: 180000 })
  finalAmount: number;
}

export class CreateMovementDto {
  @IsIn(['income', 'expense', 'cost'])
  @ApiProperty({ description: 'Movement type', enum: ['income', 'expense', 'cost'] })
  type: 'income' | 'expense' | 'cost';

  @IsNumber()
  @Min(0)
  @ApiProperty({ description: 'Movement amount', example: 15000 })
  amount: number;

  @IsString()
  @ApiProperty({ description: 'Movement description', example: 'Payment order #123' })
  description: string;
}
