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
import { CrudBranchUseCase } from '../../application/use-cases/crud-branch.use-case';
import { CreateBranchDto, UpdateBranchDto } from '../dtos/branch.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';

@ApiTags('Branches')
@ApiBearerAuth()
@Controller('branches')
export class BranchController {
  constructor(private readonly crudBranchUseCase: CrudBranchUseCase) {}

  /**
   * Crear nueva sede
   * Solo ADMIN y SUPER_ADMIN
   */
  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Crear sede',
    description: 'Crea una nueva sede/sucursal del restaurante',
  })
  @ApiResponse({
    status: 201,
    description: 'Sede creada',
  })
  @ApiResponse({
    status: 409,
    description: 'Sede con ese nombre ya existe',
  })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.crudBranchUseCase.create(createBranchDto);
  }

  /**
   * Listar todas las sedes
   */
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Listar sedes',
    description: 'Retorna todas las sedes del restaurante',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de sedes',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.crudBranchUseCase.findAll(paginationDto);
  }

  /**
   * Obtener sede específica
   */
  @Get(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Obtener sede',
    description: 'Retorna los datos de una sede específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Sede encontrada',
  })
  @ApiResponse({
    status: 404,
    description: 'Sede no encontrada',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudBranchUseCase.findOne(id);
  }

  /**
   * Actualizar datos de sede
   * Solo ADMIN y SUPER_ADMIN
   */
  @Patch(':id')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Actualizar sede',
    description: 'Actualiza los datos de una sede',
  })
  @ApiResponse({
    status: 200,
    description: 'Sede actualizada',
  })
  @ApiResponse({
    status: 404,
    description: 'Sede no encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Nombre ya existe',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBranchDto: UpdateBranchDto,
  ) {
    return this.crudBranchUseCase.update(id, updateBranchDto);
  }

  /**
   * Eliminar sede
   * Solo SUPER_ADMIN
   */
  @Delete(':id')
  @Auth(Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({
    summary: 'Eliminar sede',
    description: 'Elimina una sede del sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Sede eliminada',
  })
  @ApiResponse({
    status: 404,
    description: 'Sede no encontrada',
  })
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.crudBranchUseCase.delete(id);
  }
}
