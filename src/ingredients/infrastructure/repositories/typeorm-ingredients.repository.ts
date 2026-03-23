import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientEntity } from '../../domain/entities/ingredient.entity';
import { IIngredientsRepository } from '../../domain/ingredients-repository.interface';

@Injectable()
export class TypeormIngredientsRepository implements IIngredientsRepository {
  constructor(
    @InjectRepository(IngredientEntity)
    private readonly ingredientsRepository: Repository<IngredientEntity>,
  ) {}

  async create(ingredient: IngredientEntity): Promise<IngredientEntity> {
    return this.ingredientsRepository.save(ingredient);
  }

  async findById(id: string): Promise<IngredientEntity | null> {
    return this.ingredientsRepository.findOne({ where: { id } });
  }

  async findByProductId(productId: string): Promise<IngredientEntity[]> {
    return this.ingredientsRepository.find({
      where: { productId },
      relations: ['inventoryItem'],
    });
  }

  async update(
    id: string,
    ingredient: Partial<IngredientEntity>,
  ): Promise<IngredientEntity> {
    await this.ingredientsRepository.update(id, ingredient);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    await this.ingredientsRepository.delete(id);
  }
}
