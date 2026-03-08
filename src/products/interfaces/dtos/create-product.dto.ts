import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber, IsEnum, IsUUID, IsOptional, Min } from 'class-validator';
import { ProductType, ProductStatus } from 'src/common/enums/product-status.enum';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @ApiProperty({
    description: 'Product title/name',
    example: 'Cubanito Clásico',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'Pan con relleno y salsas',
  })
  description: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Selling price',
    example: 6.50,
  })
  sellingPrice: number;

  @IsEnum(ProductType)
  @ApiProperty({
    description: 'Product type: simple or preparado (recipe)',
    enum: ProductType,
    example: ProductType.SIMPLE,
  })
  type: ProductType;

  @IsOptional()
  @IsEnum(ProductStatus)
  @ApiProperty({
    description: 'Product status (default: ACTIVE)',
    enum: ProductStatus,
    example: ProductStatus.ACTIVE,
  })
  status?: ProductStatus;

  @IsUUID()
  @ApiProperty({
    description: 'Branch ID where product belongs',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  branchId: string;
}
