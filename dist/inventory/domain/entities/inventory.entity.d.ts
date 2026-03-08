import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';
export declare class InventoryEntity {
    id: string;
    name: string;
    description: string;
    quantity: number;
    purchasePrice: number;
    branchId: string;
    branch: BranchEntity;
    ingredients: IngredientsEntity[];
    createdAt: Date;
    updatedAt: Date;
}
