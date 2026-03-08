import { CrudIngredientsUseCase } from '../../application/use-cases/crud-ingredients.use-case';
import { CreateIngredientDto, UpdateIngredientDto } from '../dtos/ingredient.dto';
export declare class IngredientsController {
    private readonly crudIngredientsUseCase;
    constructor(crudIngredientsUseCase: CrudIngredientsUseCase);
    create(createIngredientDto: CreateIngredientDto): Promise<import("../../domain/entities/ingredients.entity").IngredientsEntity>;
    findByProductId(productId: string): Promise<import("../../domain/entities/ingredients.entity").IngredientsEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/ingredients.entity").IngredientsEntity>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<import("../../domain/entities/ingredients.entity").IngredientsEntity>;
    delete(id: string): Promise<void>;
}
