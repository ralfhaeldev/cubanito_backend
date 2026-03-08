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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CrudOrderUseCase } from '../../application/use-cases/crud-order.use-case';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
export class OrderController {
  constructor(private readonly crudOrderUseCase: CrudOrderUseCase) {}

  /**
   * Crear nuevo pedido
   * El MESERO crea pedidos en estado PENDING
   */
  @Post()
  @Auth(Role.MESERO, Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Crear nuevo pedido',
    description:
      'Crea un nuevo pedido con los items especificados. Comienza en estado PENDING.',
  })
  @ApiResponse({
    status: 201,
    description: 'Pedido creado exitosamente',
    schema: {
      example: {
        id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        branchId: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
        type: 'local',
        status: 'pending',
        totalAmount: 10.5,
        realCost: 0,
        items: [
          {
            productId: 'product-uuid',
            quantity: 2,
            unitPrice: 5.25,
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Sede o producto no encontrado',
  })
  create(@Body() createOrderDto: CreateOrderDto, @Request() request: any) {
    return this.crudOrderUseCase.create(createOrderDto, request.user.id);
  }

  /**
   * Listar todos los pedidos
   * Con paginación y filtro por sede
   */
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Listar pedidos',
    description: 'Retorna todos los pedidos con paginación y filtros opcionales',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Cantidad de registros por página',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Cantidad de registros a saltar',
  })
  @ApiQuery({
    name: 'branchId',
    required: false,
    type: String,
    description: 'Filtrar por UUID de sede',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de pedidos',
  })
  findAll(
    @Query() paginationDto: PaginationDto,
    @Query('branchId') branchId?: string,
  ) {
    return this.crudOrderUseCase.findAll(paginationDto, branchId);
  }

  /**
   * Obtener un pedido específico
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener pedido',
    description: 'Retorna los detalles completos de un pedido específico',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID del pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudOrderUseCase.findOne(id);
  }

  /**
   * Cambiar estado del pedido
   * Las transiciones permitidas dependen del rol del usuario:
   * - MESERO: Puede cambiar a EN_PROCESO y PREPARADO
   * - COCINA: Puede cambiar a EN_PROCESO
   * - DOMICILIARIO: Puede cambiar a ENTREGADO o RECHAZADO
   * - ADMIN/SUPER_ADMIN: Transiciones normales
   * - Una vez PREPARADO, ADMIN puede cambiar a ENVIADO (delivery)
   * - ADMIN Finaliza el pedido des que el domiciliario entrega
   */
  @Patch(':id/status')
  @Auth(Role.MESERO, Role.COCINA, Role.DOMICILIARIO, Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Actualizar estado del pedido',
    description:
      'Actualiza el estado del pedido. Las transiciones varía según el rol del usuario.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID del pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Estado actualizado',
  })
  @ApiResponse({
    status: 400,
    description: 'Transición de estado inválida',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuario no autorizado para esta transición',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
    @Request() request: any,
  ) {
    return this.crudOrderUseCase.updateStatus(
      id,
      updateOrderStatusDto,
      request.user.id,
      request.user.roles,
    );
  }

  /**
   * Eliminar pedido
   * Solo se pueden eliminar pedidos en estado PENDING
   */
  @Delete(':id')
  @Auth(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Eliminar pedido',
    description: 'Elimina un pedido. Solo se pueden eliminar pedidos en estado PENDING',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'UUID del pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido eliminado',
  })
  @ApiResponse({
    status: 400,
    description: 'No se puede eliminar un pedido que no está en PENDING',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido no encontrado',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudOrderUseCase.delete(id);
  }
}
