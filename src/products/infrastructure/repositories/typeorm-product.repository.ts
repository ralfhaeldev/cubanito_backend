import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';
import { ProductEntity } from 'src/products/domain/entities/product.entity';
import { ProductRepository } from 'src/products/domain/product-repository.interface';
import { CreateProductDto } from 'src/products/interfaces/dtos/create-product.dto';
import { UpdateProductDto } from 'src/products/interfaces/dtos/update-product.dto';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormProductRepository implements ProductRepository<any> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(IngredientsEntity)
    private readonly ingredientRepository: Repository<IngredientsEntity>,
  ) {}

  async create(dto: CreateProductDto): Promise<any> {
    try {
      const product = this.productRepository.create({
        title: dto.nombre,
        sellingPrice: dto.precioVenta,
        purchaseCost: dto.precioCompra,
        type: dto.tipo,
        isActive: dto.activo !== false,
        itemInventarioId: dto.itemInventarioId ?? null,
        branchId: dto.branchId ?? null,
      });

      const saved = await this.productRepository.save(product);

      if (dto.ingredientes?.length) {
        for (const ing of dto.ingredientes) {
          const ingredient = this.ingredientRepository.create({
            productId: saved.id,
            inventoryItemId: ing.itemInventarioId,
            itemNombre: ing.itemNombre,
            quantity: ing.cantidad,
            unidad: ing.unidad,
          });
          await this.ingredientRepository.save(ingredient);
        }
      }

      return this.findOne(saved.id);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async update(id: string, dto: UpdateProductDto): Promise<any> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ['ingredients'] });
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);

    if (dto.nombre !== undefined) product.title = dto.nombre;
    if (dto.precioVenta !== undefined) product.sellingPrice = dto.precioVenta;
    if (dto.precioCompra !== undefined) product.purchaseCost = dto.precioCompra;
    if (dto.tipo !== undefined) product.type = dto.tipo;
    if (dto.activo !== undefined) product.isActive = dto.activo;
    if (dto.itemInventarioId !== undefined) product.itemInventarioId = dto.itemInventarioId ?? null;

    const saved = await this.productRepository.save(product);

    if (dto.ingredientes !== undefined) {
      await this.ingredientRepository.delete({ productId: id });
      for (const ing of dto.ingredientes) {
        const ingredient = this.ingredientRepository.create({
          productId: id,
          inventoryItemId: ing.itemInventarioId,
          itemNombre: ing.itemNombre,
          quantity: ing.cantidad,
          unidad: ing.unidad,
        });
        await this.ingredientRepository.save(ingredient);
      }
    }

    return this.findOne(saved.id);
  }

  async findOne(term: string): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id: term },
      relations: ['ingredients'],
    });
    if (!product) throw new NotFoundException(`Producto con id ${term} no encontrado`);
    return this.mapProduct(product);
  }

  async findAll(paginationDto: PaginationDto): Promise<any[]> {
    const { limit = 100, offset = 0 } = paginationDto;
    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
      relations: ['ingredients'],
      order: { title: 'ASC' },
    });
    return products.map(this.mapProduct);
  }

  async delete(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Producto con id ${id} no encontrado`);
    await this.productRepository.remove(product);
  }

  private mapProduct(p: ProductEntity): any {
    return {
      id: p.id,
      nombre: p.title,
      precioVenta: Number(p.sellingPrice),
      precioCompra: Number(p.purchaseCost),
      activo: p.isActive,
      tipo: p.type,
      itemInventarioId: p.itemInventarioId ?? undefined,
      ingredientes: p.ingredients?.map(ing => ({
        itemInventarioId: ing.inventoryItemId,
        itemNombre: ing.itemNombre,
        cantidad: Number(ing.quantity),
        unidad: ing.unidad,
      })) ?? [],
    };
  }
}
