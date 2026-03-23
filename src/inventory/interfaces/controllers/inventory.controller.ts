import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrudInventoryUseCase } from '../../application/use-cases/crud-inventory.use-case';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
  AdjustInventoryDto,
  CreateAdjustmentDto,
} from '../dtos/inventory.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Inventory')
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly crudInventoryUseCase: CrudInventoryUseCase) {}

  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Crear artículo de inventario' })
  @ApiResponse({ status: 201, description: 'Artículo creado' })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.crudInventoryUseCase.create(createInventoryDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar artículos de inventario' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crudInventoryUseCase.findAll(paginationDto);
  }

  /** Historial de ajustes de inventario */
  @Get('ajustes')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar ajustes de inventario' })
  findAllAdjustments(@Query() paginationDto: PaginationDto) {
    return this.crudInventoryUseCase.findAllAdjustments(paginationDto);
  }

  /** Crear un ajuste de inventario (entrada/salida/ajuste) */
  @Post('ajustes')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Crear ajuste de inventario' })
  @ApiResponse({ status: 201, description: 'Ajuste registrado' })
  createAdjustment(@Body() dto: CreateAdjustmentDto, @Request() req: any) {
    const createdByName = req?.user?.fullName ?? req?.user?.nombre ?? 'Admin';
    return this.crudInventoryUseCase.createAdjustment(dto, createdByName);
  }

  @Get('branch/:branchId')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Inventario de una sede' })
  findByBranchId(@Param('branchId', ParseUUIDPipe) branchId: string) {
    return this.crudInventoryUseCase.findByBranchId(branchId);
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Obtener artículo de inventario' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudInventoryUseCase.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Actualizar artículo de inventario' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.crudInventoryUseCase.update(id, updateInventoryDto);
  }

  @Patch(':id/adjust')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER, Role.COCINA)
  @ApiOperation({ summary: 'Ajustar cantidad (positivo suma, negativo resta)' })
  adjustQuantity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() adjustInventoryDto: AdjustInventoryDto,
  ) {
    return this.crudInventoryUseCase.adjustQuantity(id, adjustInventoryDto);
  }

  @Delete(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Eliminar artículo de inventario' })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudInventoryUseCase.delete(id);
  }
}
