import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CrudIngredientsUseCase } from '../../application/use-cases/crud-ingredients.use-case';
import { CreateIngredientDto, UpdateIngredientDto } from '../dtos/ingredient.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Ingredients')
@ApiBearerAuth()
@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly crudIngredientsUseCase: CrudIngredientsUseCase) {}

  /**
   * Crear un nuevo ingrediente/insumo para un producto preparado
   * Solo ADMIN y SUPER_ADMIN pueden crear ingredientes
   */
  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Crear ingrediente',
    description: 'Crea un nuevo ingrediente vinculando un producto preparado con un insumo del inventario',
  })
  @ApiResponse({
    status: 201,
    description: 'Ingrediente creado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto o artículo de inventario no encontrado',
  })
  create(@Body() createIngredientDto: CreateIngredientDto) {
    return this.crudIngredientsUseCase.create(createIngredientDto);
  }

  /**
   * Obtener ingredientes de un producto específico
   * Retorna todos los insumos necesarios para preparar un producto
   */
  @Get('product/:productId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener ingredientes por producto',
    description: 'Retorna todos los ingredientes/insumos necesarios para preparar un producto específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de ingredientes obtenida',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado',
  })
  findByProductId(@Param('productId', ParseUUIDPipe) productId: string) {
    return this.crudIngredientsUseCase.findByProductId(productId);
  }

  /**
   * Obtener un ingrediente específico
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener ingrediente',
    description: 'Obtiene los detalles de un ingrediente específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente encontrado',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingrediente no encontrado',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudIngredientsUseCase.findOne(id);
  }

  /**
   * Actualizar cantidad de un ingrediente
   * Solo ADMIN y SUPER_ADMIN pueden actualizar ingredientes
   */
  @Patch(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Actualizar ingrediente',
    description: 'Actualiza la cantidad de un ingrediente específico',
  })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente actualizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingrediente no encontrado',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ) {
    return this.crudIngredientsUseCase.update(id, updateIngredientDto);
  }

  /**
   * Eliminar un ingrediente
   * Solo ADMIN y SUPER_ADMIN pueden eliminar ingredientes
   */
  @Delete(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Eliminar ingrediente',
    description: 'Elimina un ingrediente de un producto preparado',
  })
  @ApiResponse({
    status: 200,
    description: 'Ingrediente eliminado',
  })
  @ApiResponse({
    status: 404,
    description: 'Ingrediente no encontrado',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudIngredientsUseCase.delete(id);
  }
}
