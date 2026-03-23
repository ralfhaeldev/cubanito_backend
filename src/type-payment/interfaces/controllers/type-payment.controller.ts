import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CrudTypePaymentUseCase } from 'src/type-payment/application/use-cases/crud-type-payment.use-case';

@Controller('type-payment')
export class TypePaymentController {
  constructor(private readonly curdTypePayment: CrudTypePaymentUseCase) {}
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.curdTypePayment.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curdTypePayment.findOne(id);
  }
}
