import { TypeIdentificationEntity } from 'src/type-identification/domain/entities/type-identification.entity';
import { TypeIdentificationRepository } from 'src/type-identification/domain/type-identification-repository.interface';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTypeIdentificatioUseCase {
  constructor(
    private readonly typeIdentificationRepository: TypeIdentificationRepository<TypeIdentificationEntity>,
  ) {}

  async findOne(id: string) {
    const typeIdentification =
      await this.typeIdentificationRepository.findOne(id);
    return typeIdentification;
  }
  async findAll(paginationDto: PaginationDto) {
    const typeIdentifications =
      await this.typeIdentificationRepository.findAll(paginationDto);
    return typeIdentifications;
  }
}
