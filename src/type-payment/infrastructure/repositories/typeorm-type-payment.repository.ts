import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypePaymentEntity } from 'src/type-payment/domain/entities/type-payment.entity';
import { TypePaymentRepository } from 'src/type-payment/domain/repository.interface';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TypeormTypePaymentRepository
  implements TypePaymentRepository<TypePaymenEntity>
{
  constructor(
    @InjectRepository(TypePaymenEntity)
    private readonly typePaymentRepository: Repository<TypePaymenEntity>,
  ) {}

  async findOne(id: string): Promise<TypePaymenEntity> {
    let typePayments: TypePaymenEntity | null = null;

    if (isUUID(id)) {
      typePayments = await this.typePaymentRepository.findOneBy({ id });
    }
    if (!typePayments)
      throw new NotFoundException(`Client with id ${id} not found`);

    return typePayments;
  }

  async findAll(pagintationDto: PaginationDto): Promise<TypePaymenEntity[]> {
    const { limit = 10, offset = 0, term = null } = pagintationDto;
    const where = term
      ? {
          name: ILike(`%${term}%`),
          fullName: ILike(`%${term}%`),
          identification: ILike(`%${term}%`),
        }
      : {};

    const typePayments = await this.typePaymentRepository.find({
      take: limit,
      skip: offset,
    });

    return typePayments;
  }
}
