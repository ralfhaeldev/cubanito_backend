import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IngredientsEntity } from '../../domain/entities/ingredients.entity';
import { IIngredientsRepository } from '../../domain/ingredients-repository.interface';

@Injectable()
export class TypeormIngredientsRepository implements IIngredientsRepository {
  constructor(
    @InjectRepository(IngredientsEntity)
    private readonly ingredientsRepository: Repository<IngredientsEntity>,
  ) {}

  async create(ingredient: IngredientsEntity): Promise<IngredientsEntity> {
    return this.ingredientsRepository.save(ingredient);
  }

  async findById(id: string): Promise<IngredientsEntity | null> {
    return this.ingredientsRepository.findOne({ where: { id } });
  }

  async findByProductId(productId: string): Promise<IngredientsEntity[]> {
    return this.ingredientsRepository.find({
      where: { productId },
      relations: ['inventoryItem'],
    });
  }

  async update(
    id: string,
    ingredient: Partial<IngredientsEntity>,
  ): Promise<IngredientsEntity> {
    await this.ingredientsRepository.update(id, ingredient);
    const updated = await this.findById(id);
    return updated!;
  }

  async delete(id: string): Promise<void> {
    await this.ingredientsRepository.delete(id);
  }
}
