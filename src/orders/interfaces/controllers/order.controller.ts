import {
  Controller, Post, Get, Patch, Delete, Body, Param, Query,
  ParseUUIDPipe, UseGuards, Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CrudOrderUseCase } from '../../application/use-cases/crud-order.use-case';
import { CreateOrderDto, UpdateOrderStatusDto, FinalizarOrderDto } from '../dtos/order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly crudOrderUseCase: CrudOrderUseCase) {}

  @Post()
  @Auth(Role.MESERO, Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  create(@Body() dto: CreateOrderDto, @Request() req: any) {
    return this.crudOrderUseCase.create(dto, req.user.id, req.user.branchId ?? req.user.sedeId);
  }

  @Get('activos')
  @UseGuards(AuthGuard())
  findActive(@Query('branchId') branchId?: string) {
    return this.crudOrderUseCase.findActive(branchId);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto, @Query('branchId') branchId?: string) {
    return this.crudOrderUseCase.findAll(paginationDto, branchId);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudOrderUseCase.findOne(id);
  }

  @Patch(':id/status')
  @Auth(Role.MESERO, Role.COCINA, Role.DOMICILIARIO, Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateOrderStatusDto,
    @Request() req: any,
  ) {
    return this.crudOrderUseCase.updateStatus(id, dto, req.user.id, req.user.rol);
  }

  @Post(':id/finalizar')
  @Auth(Role.MESERO, Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Finalizar pedido y descontar inventario' })
  finalizar(@Param('id', ParseUUIDPipe) id: string, @Request() req: any) {
    return this.crudOrderUseCase.finalizar(id, req.user.id, req.user.rol);
  }

  @Delete(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudOrderUseCase.delete(id);
  }
}
