import { ProductType, ProductStatus } from 'src/common/enums/product-status.enum';
export declare class UpdateProductDto {
    title?: string;
    description?: string;
    sellingPrice?: number;
    type?: ProductType;
    status?: ProductStatus;
    branchId?: string;
}
