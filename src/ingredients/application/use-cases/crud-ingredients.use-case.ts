import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from '../../domain/entities/ingredient.entity';
import { CreateIngredientDto, UpdateIngredientDto } from '../../interfaces/dtos/ingredients.dto';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { InventoryEntity } from 'src/inventory/domain/entities/inventory.entity';

@Injectable()
export class CrudIngredientsUseCase {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientsRepository: Repository<IngredientEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(InventoryEntity)
    private readonly inventoryRepository: Repository<InventoryEntity>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto): Promise<IngredientEntity> {
    const product = await this.productRepository.findOne({
      where: { id: createIngredientDto.productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${createIngredientDto.productId} not found`);
    }

    const inventoryItem = await this.inventoryRepository.findOne({
      where: { id: createIngredientDto.inventoryItemId },
    });

    if (!inventoryItem) {
      throw new NotFoundException(
        `Inventory item with id ${createIngredientDto.inventoryItemId} not found`,
      );
    }

    const ingredient = this.ingredientsRepository.create({
      productId: createIngredientDto.productId,
      inventoryItemId: createIngredientDto.inventoryItemId,
      quantity: createIngredientDto.quantity,
    });

    return this.ingredientsRepository.save(ingredient);
  }

  async findByProductId(productId: string): Promise<IngredientEntity[]> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    return this.ingredientsRepository.find({
      where: { productId },
      relations: ['inventoryItem'],
    });
  }

  async findOne(id: string): Promise<IngredientEntity> {
    const ingredient = await this.ingredientsRepository.findOne({
      where: { id },
      relations: ['inventoryItem', 'product'],
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id ${id} not found`);
    }

    return ingredient;
  }

  async update(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<IngredientEntity> {
    const ingredient = await this.findOne(id);

    if (updateIngredientDto.quantity !== undefined) {
      ingredient.quantity = updateIngredientDto.quantity;
    }

    return this.ingredientsRepository.save(ingredient);
  }

  async delete(id: string): Promise<void> {
    const ingredient = await this.findOne(id);
    await this.ingredientsRepository.remove(ingredient);
  }
}
