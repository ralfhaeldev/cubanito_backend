import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateTypeIdentificatioUseCase } from 'src/type-identification/application/use-cases/create-type-identification.use-case';

@Controller('type-identification')
export class TypeIdentificationController {
  constructor(
    private readonly createTypeIdentificatioUseCase: CreateTypeIdentificatioUseCase,
  ) {}

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.createTypeIdentificatioUseCase.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createTypeIdentificatioUseCase.findOne(id);
  }
}
