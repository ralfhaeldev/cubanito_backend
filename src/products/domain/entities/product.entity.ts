import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductStatus, ProductType } from 'src/common/enums/product-status.enum';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { IngredientsEntity } from 'src/ingredients/domain/entities/ingredients.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sellingPrice: number;

  @Column('enum', { enum: ProductType, default: ProductType.SIMPLE })
  type: ProductType;

  @Column('enum', { enum: ProductStatus, default: ProductStatus.ACTIVE })
  status: ProductStatus;

  @Column('uuid', { nullable: true })
  branchId: string;

  @ManyToOne(() => BranchEntity, (branch) => branch.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @OneToMany(() => IngredientsEntity, (ingredient) => ingredient.product, {
    cascade: true,
  })
  ingredients: IngredientsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
