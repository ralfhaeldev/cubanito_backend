import { Repository } from 'typeorm';
import { IngredientsEntity } from '../../domain/entities/ingredients.entity';
import { CreateIngredientDto, UpdateIngredientDto } from '../../interfaces/dtos/ingredient.dto';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';
export declare class CrudIngredientsUseCase {
    private readonly ingredientsRepository;
    private readonly productRepository;
    private readonly inventoryRepository;
    constructor(ingredientsRepository: Repository<IngredientsEntity>, productRepository: Repository<ProductEntity>, inventoryRepository: Repository<InventoryEntity>);
    create(createIngredientDto: CreateIngredientDto): Promise<IngredientsEntity>;
    findByProductId(productId: string): Promise<IngredientsEntity[]>;
    findOne(id: string): Promise<IngredientsEntity>;
    update(id: string, updateIngredientDto: UpdateIngredientDto): Promise<IngredientsEntity>;
    delete(id: string): Promise<void>;
}
