import { ProductStatus, ProductType } from 'src/common/enums/product-status.enum';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';
export declare class ProductEntity {
    id: string;
    title: string;
    description: string;
    sellingPrice: number;
    type: ProductType;
    status: ProductStatus;
    branchId: string;
    branch: BranchEntity;
    ingredients: IngredientsEntity[];
    createdAt: Date;
    updatedAt: Date;
}
