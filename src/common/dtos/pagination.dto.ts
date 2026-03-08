import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { string } from 'joi';
import { Role } from '../enums/roles.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Type(() => Number) // enableImplicitConversions: true
  @ApiPropertyOptional({
    description: 'Número de resultados por página',
    example: 10,
  })
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number) // enableImplicitConversions: true
  @ApiPropertyOptional({
    description: 'Cantidad de resultados a saltar',
    example: 0,
  })
  offset?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'Término de búsqueda',
    example: 'search-term',
  })
  term: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
