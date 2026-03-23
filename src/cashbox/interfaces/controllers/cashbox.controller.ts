import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { CajaUseCase } from '../../application/use-cases/caja.use-case';
import { AbrirCajaDto, CerrarCajaDto, CreateMovimientoDto } from '../dtos/caja.dto';

@ApiTags('Caja')
@ApiBearerAuth()
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaUseCase: CajaUseCase) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Obtener caja actual abierta' })
  @ApiResponse({ status: 200, description: 'Caja actual o null si no hay ninguna abierta' })
  getCajaActual(@Query('branchId') branchId?: string) {
    return this.cajaUseCase.getCajaActual(branchId);
  }

  @Post('abrir')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Abrir nueva sesión de caja' })
  @ApiResponse({ status: 201, description: 'Caja abierta exitosamente' })
  abrirCaja(@Body() dto: AbrirCajaDto, @Request() req: any) {
    const userId = req.user?.id ?? 'system';
    const userName = req.user?.fullName ?? 'Admin';
    return this.cajaUseCase.abrirCaja(dto, userId, userName);
  }

  @Post('cerrar')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Cerrar sesión de caja actual' })
  @ApiResponse({ status: 200, description: 'Caja cerrada exitosamente' })
  cerrarCaja(
    @Body() dto: CerrarCajaDto,
    @Request() req: any,
    @Query('branchId') branchId?: string,
  ) {
    const userId = req.user?.id ?? 'system';
    const userName = req.user?.fullName ?? 'Admin';
    return this.cajaUseCase.cerrarCaja(dto, userId, userName, branchId);
  }

  @Get('historial')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Historial de cajas cerradas' })
  getHistorial(@Query('branchId') branchId?: string) {
    return this.cajaUseCase.getHistorial(branchId);
  }
}

@ApiTags('Movimientos')
@ApiBearerAuth()
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly cajaUseCase: CajaUseCase) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Listar movimientos de la caja actual' })
  getMovimientos(@Query('cajaId') cajaId?: string) {
    return this.cajaUseCase.getMovimientos(cajaId);
  }

  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Registrar un movimiento de caja' })
  @ApiResponse({ status: 201, description: 'Movimiento registrado' })
  createMovimiento(
    @Body() dto: CreateMovimientoDto,
    @Query('branchId') branchId?: string,
  ) {
    return this.cajaUseCase.createMovimiento(dto, branchId);
  }
}
