import { IngredientsEntity } from './entities/ingredients.entity';
export interface IIngredientsRepository {
    create(ingredient: IngredientsEntity): Promise<IngredientsEntity>;
    findById(id: string): Promise<IngredientsEntity | null>;
    findByProductId(productId: string): Promise<IngredientsEntity[]>;
    update(id: string, ingredient: Partial<IngredientsEntity>): Promise<IngredientsEntity>;
    delete(id: string): Promise<void>;
}
export declare const IngredientsRepository: unique symbol;
