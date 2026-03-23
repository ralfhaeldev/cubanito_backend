import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/roles.enum';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Exclude()
  @Column('text', { select: false })
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', { default: true })
  isActive: boolean;

  @Column({ type: 'varchar', length: 50, default: Role.MESERO })
  rol: Role;

  @Column('uuid', { nullable: true })
  branchId: string | null;

  @BeforeInsert()
  checkFieldInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldUpdate() {
    this.checkFieldInsert();
  }
}
