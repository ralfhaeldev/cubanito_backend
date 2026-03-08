import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CrudTypePaymenUseCase } from 'src/type-payment/application/use-cases/crud-type-paymen.use-case';

@Controller('type-payment')
export class TypePaymenController {
  constructor(private readonly curdTypePayment: CrudTypePaymenUseCase) {}
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.curdTypePayment.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curdTypePayment.findOne(id);
  }
}
