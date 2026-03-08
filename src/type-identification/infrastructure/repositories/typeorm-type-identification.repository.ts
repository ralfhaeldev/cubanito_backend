import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { TypeIdentificationRepository } from 'src/type-identification/domain/type-identification-repository.interface';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class TypeormTypeIdentificationRepository
  implements TypeIdentificationRepository<TypeIdentificationEntity>
{
  constructor(
    @InjectRepository(TypeIdentificationEntity)
    private readonly typeIdentificationrepository: Repository<TypeIdentificationEntity>,
  ) {}
  async findOne(id: string): Promise<TypeIdentificationEntity> {
    let typePayments: TypeIdentificationEntity | null = null;

    if (isUUID(id)) {
      typePayments = await this.typeIdentificationrepository.findOneBy({ id });
    }
    if (!typePayments)
      throw new NotFoundException(
        `type identification with id ${id} not found`,
      );

    return typePayments;
  }

  async findAll(
    pagintationDto: PaginationDto,
  ): Promise<TypeIdentificationEntity[]> {
    const { limit = 10, offset = 0, term = null } = pagintationDto;
    const where = term
      ? {
          name: ILike(`%${term}%`),
          fullName: ILike(`%${term}%`),
          identification: ILike(`%${term}%`),
        }
      : {};

    const typePayments = await this.typeIdentificationrepository.find({
      take: limit,
      skip: offset,
    });

    return typePayments;
  }
}
