import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypePaymenEntity } from 'src/type-payment/domain/entities/type-paymen.entity';
import { TypePaymentRepository } from 'src/type-payment/domain/repository.interface';

@Injectable()
export class CrudTypePaymentUseCase {
  constructor(
    private readonly typePaymentRepository: TypePaymentRepository<TypePaymenEntity>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const typePayments =
      await this.typePaymentRepository.findAll(paginationDto);
    return typePayments;
  }

  async findOne(id: string) {
    const typePayment = await this.typePaymentRepository.findOne(id);
    return typePayment;
  }
}
