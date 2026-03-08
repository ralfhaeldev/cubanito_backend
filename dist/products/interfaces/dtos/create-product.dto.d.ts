import { ProductType, ProductStatus } from 'src/common/enums/product-status.enum';
export declare class CreateProductDto {
    title: string;
    description: string;
    sellingPrice: number;
    type: ProductType;
    status?: ProductStatus;
    branchId: string;
}
