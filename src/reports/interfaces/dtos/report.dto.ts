import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export enum ReportPeriod {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export class ReportFiltersDto {
  @IsEnum(ReportPeriod)
  @ApiProperty({
    description: 'Período del reporte',
    enum: ReportPeriod,
    example: ReportPeriod.DAILY,
  })
  period: ReportPeriod;

  @IsUUID()
  @IsOptional()
  @ApiProperty({
    description: 'UUID de la sede (opcional)',
    required: false,
  })
  branchId?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Fecha inicial (ISO format)',
    example: '2024-03-01T00:00:00Z',
    required: false,
  })
  startDate?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  @ApiProperty({
    description: 'Fecha final (ISO format)',
    example: '2024-03-08T23:59:59Z',
    required: false,
  })
  endDate?: Date;
}

export class SalesReportDto {
  @ApiProperty()
  period: string;

  @ApiProperty()
  totalSales: number;

  @ApiProperty()
  totalOrders: number;

  @ApiProperty()
  totalCost: number;

  @ApiProperty()
  totalMargin: number;

  @ApiProperty()
  marginPercentage: number;

  @ApiProperty()
  averageOrderValue: number;

  @ApiProperty()
  topProducts: any[];
}

export class CashReportDto {
  @ApiProperty()
  openingDate: Date;

  @ApiProperty()
  closingDate: Date;

  @ApiProperty()
  openingAmount: number;

  @ApiProperty()
  closingAmount: number;

  @ApiProperty()
  totalIncome: number;

  @ApiProperty()
  totalExpenses: number;

  @ApiProperty()
  difference: number;
}
