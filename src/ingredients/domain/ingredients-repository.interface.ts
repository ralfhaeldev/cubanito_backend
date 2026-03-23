import { IngredientEntity } from './entities/ingredient.entity';

export interface IIngredientsRepository {
  create(ingredient: IngredientEntity): Promise<IngredientEntity>;
  findById(id: string): Promise<IngredientEntity | null>;
  findByProductId(productId: string): Promise<IngredientEntity[]>;
  update(id: string, ingredient: Partial<IngredientEntity>): Promise<IngredientEntity>;
  delete(id: string): Promise<void>;
}

export const IngredientsRepository = Symbol('IngredientsRepository');
