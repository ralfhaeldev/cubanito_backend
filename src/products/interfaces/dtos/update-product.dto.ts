import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsUUID, IsOptional, Min } from 'class-validator';
import { ProductType, ProductStatus } from 'src/common/enums/product-status.enum';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product title/name',
    example: 'Cubanito Clásico',
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Product description',
    example: 'Pan con relleno y salsas',
    required: false,
  })
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'Selling price',
    example: 6.50,
    required: false,
  })
  sellingPrice?: number;

  @IsOptional()
  @IsEnum(ProductType)
  @ApiProperty({
    description: 'Product type: simple or preparado (recipe)',
    enum: ProductType,
    example: ProductType.SIMPLE,
    required: false,
  })
  type?: ProductType;

  @IsOptional()
  @IsEnum(ProductStatus)
  @ApiProperty({
    description: 'Product status',
    enum: ProductStatus,
    example: ProductStatus.ACTIVE,
    required: false,
  })
  status?: ProductStatus;

  @IsOptional()
  @IsUUID()
  @ApiProperty({
    description: 'Branch ID where product belongs',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    required: false,
  })
  branchId?: string;
}
