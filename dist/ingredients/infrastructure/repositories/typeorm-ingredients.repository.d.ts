import { Repository } from 'typeorm';
import { IngredientsEntity } from '../../domain/entities/ingredients.entity';
import { IIngredientsRepository } from '../../domain/ingredients-repository.interface';
export declare class TypeormIngredientsRepository implements IIngredientsRepository {
    private readonly ingredientsRepository;
    constructor(ingredientsRepository: Repository<IngredientsEntity>);
    create(ingredient: IngredientsEntity): Promise<IngredientsEntity>;
    findById(id: string): Promise<IngredientsEntity | null>;
    findByProductId(productId: string): Promise<IngredientsEntity[]>;
    update(id: string, ingredient: Partial<IngredientsEntity>): Promise<IngredientsEntity>;
    delete(id: string): Promise<void>;
}
