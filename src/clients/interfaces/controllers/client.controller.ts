import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CrudClientUseCase } from 'src/clients/application/use-cases/crud-client.use-case';
import { CreateClientDto } from '../dtos/create-client.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly crudClientUseCase: CrudClientUseCase) {}
  @Post()
  create(@Body() client: CreateClientDto) {
    return this.crudClientUseCase.create(client);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crudClientUseCase.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudClientUseCase.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateClienteDto: UpdateClientDto,
  ) {
    return this.crudClientUseCase.update(id, updateClienteDto);
  }
}
