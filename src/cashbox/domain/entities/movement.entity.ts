import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { CashboxEntity } from './cashbox.entity';

export type MovementType = 'income' | 'expense' | 'cost';

/**
 * Cash movement in a cashbox session.
 */
@Entity('movement')
export class MovementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  cashboxId: string;

  @ManyToOne(() => CashboxEntity, (cashbox) => cashbox.movements, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cashboxId' })
  cashbox: CashboxEntity;

  @Column({ type: 'varchar', length: 20 })
  type: MovementType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('text')
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
