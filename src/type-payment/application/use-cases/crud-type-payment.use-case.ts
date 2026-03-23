import { Injectable } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { TypePaymentEntity } from 'src/type-payment/domain/entities/type-payment.entity';
import { TypePaymentRepository } from 'src/type-payment/domain/repository.interface';

@Injectable()
export class CrudTypePaymentUseCase {
  constructor(
    private readonly typePaymentRepository: TypePaymentRepository<TypePaymentEntity>,
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
