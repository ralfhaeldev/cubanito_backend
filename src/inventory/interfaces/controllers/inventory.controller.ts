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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrudInventoryUseCase } from '../../application/use-cases/crud-inventory.use-case';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
  AdjustInventoryDto,
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

  /**
   * Crear nuevo artículo de inventario
   * Solo ADMIN y SUPER_ADMIN pueden crear artículos
   * El inventario es por sede/branch
   */
  @Post()
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Crear artículo de inventario',
    description:
      'Crea un nuevo artículo de inventario. Puede ser un producto simple o un insumo para productos preparados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Artículo de inventario creado exitosamente',
    schema: {
      example: {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        name: 'Pan de cubanito',
        description: 'Pan fresco para cubanitos',
        quantity: 100,
        purchasePrice: 0.5,
        branchId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        createdAt: '2024-03-08T12:00:00Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Sede no encontrada',
  })
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.crudInventoryUseCase.create(createInventoryDto);
  }

  /**
   * Obtener todos los artículos de inventario
   * Retorna con paginación
   */
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Listar artículos de inventario',
    description: 'Retorna todos los artículos de inventario con paginación',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de artículos de inventario',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crudInventoryUseCase.findAll(paginationDto);
  }

  /**
   * Obtener inventario por sede
   * Retorna todos los artículos de una sede específica
   */
  @Get('branch/:branchId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener inventario de una sede',
    description: 'Retorna todos los artículos de inventario de una sede específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventario de la sede',
  })
  @ApiResponse({
    status: 404,
    description: 'Sede no encontrada',
  })
  findByBranchId(@Param('branchId', ParseUUIDPipe) branchId: string) {
    return this.crudInventoryUseCase.findByBranchId(branchId);
  }

  /**
   * Obtener artículo específico
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener artículo de inventario',
    description: 'Retorna los detalles de un artículo específico de inventario',
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudInventoryUseCase.findOne(id);
  }

  /**
   * Actualizar artículo de inventario
   * Solo ADMIN y SUPER_ADMIN
   */
  @Patch(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Actualizar artículo de inventario',
    description: 'Actualiza los detalles de un artículo de inventario',
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo actualizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.crudInventoryUseCase.update(id, updateInventoryDto);
  }

  /**
   * Ajustar cantidad de inventario
   * El ajuste puede ser positivo (suma) o negativo (resta)
   */
  @Patch(':id/adjust')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN, Role.COCINA)
  @ApiOperation({
    summary: 'Ajustar cantidad de inventario',
    description: 'Ajusta la cantidad de un artículo. Positivo suma, negativo resta.',
  })
  @ApiResponse({
    status: 200,
    description: 'Ajuste realizado',
  })
  @ApiResponse({
    status: 400,
    description: 'Cantidad insuficiente',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  adjustQuantity(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() adjustInventoryDto: AdjustInventoryDto,
  ) {
    return this.crudInventoryUseCase.adjustQuantity(id, adjustInventoryDto);
  }

  /**
   * Eliminar artículo de inventario
   * Solo ADMIN y SUPER_ADMIN
   */
  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Eliminar artículo de inventario',
    description: 'Elimina un artículo de inventario',
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudInventoryUseCase.delete(id);
  }
}
