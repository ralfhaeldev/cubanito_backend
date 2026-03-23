import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductType } from 'src/common/enums/product-status.enum';
import { BranchEntity } from 'src/branches/domain/entities/branch.entity';
import { IngredientEntity } from 'src/ingredients/domain/entities/ingredient.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('decimal', { precision: 10, scale: 2 })
  sellingPrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  purchaseCost: number;

  @Column('enum', { enum: ProductType, default: ProductType.SIMPLE })
  type: ProductType;

  @Column('bool', { default: true })
  isActive: boolean;

  /** Only for tipo === 'simple': link to the inventory item */
  @Column('uuid', { nullable: true })
  itemInventarioId: string | null;

  @Column('uuid', { nullable: true })
  branchId: string | null;

  @ManyToOne(() => BranchEntity, (branch) => branch.products, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'branchId' })
  branch: BranchEntity;

  @OneToMany(() => IngredientEntity, (ingredient) => ingredient.product, { cascade: true })
  ingredients: IngredientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
