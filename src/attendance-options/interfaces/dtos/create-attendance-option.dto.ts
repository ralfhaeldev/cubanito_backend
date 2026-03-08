import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateAttendanceOptionDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty({ message: 'name should not be empty' })
  @ApiProperty({
    description:
      'Name of the attendance option (e.g. Daily, Monthly, Quarterly)',
    example: 'Mensual',
    maxLength: 100,
  })
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive({ message: 'amount must be greater than 0' })
  @IsNotEmpty({ message: 'amount should not be empty' })
  @ApiProperty({
    description: 'Amount for this attendance option',
    example: 50000.0,
  })
  amount: number;
}
