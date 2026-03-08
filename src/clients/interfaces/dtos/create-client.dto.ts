import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Sex } from 'src/clients/domain/enums/sex.enum';

export class CreateClientDto {
  @IsString()
  @IsUUID()
  @MinLength(1)
  @IsNotEmpty({ message: 'typeIdentificationId should not be empty' })
  @ApiProperty({
    description: 'UUID of type identification (e.g. CC, CE, Passport)',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  typeIdentificationId: string;

  @IsString()
  @MaxLength(10)
  @IsNotEmpty({ message: 'identification should not be empty' })
  @ApiProperty({
    description: 'identification client',
    maximum: 10,
  })
  identification: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'name client',
    minimum: 1,
  })
  name: string;

  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'full name client',
    minimum: 1,
  })
  fullName: string;
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'address client',
    minimum: 1,
  })
  address: string;

  @IsString()
  @Length(10)
  @IsNotEmpty({ message: 'phone should not be empty' })
  @Matches(/^\d+$/, { message: 'The value must contain only numbers' })
  @ApiProperty({ description: 'Client phone number', example: '3001234567' })
  phone: string;

  @IsDateString()
  @ApiProperty({
    description: 'Birth date client',
    example: '1995-08-27T00:00:00.000Z',
  })
  birthDate: Date;

  @ApiProperty({
    description: 'The value must contain',
    example: 'Masculino',
    enum: ['Masculino', 'Femenino', 'Otro'],
  })
  @IsEnum(Sex)
  sex: Sex;
}
