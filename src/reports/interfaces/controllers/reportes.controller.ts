import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { ReportsUseCase } from '../../application/use-cases/reports.use-case';

/**
 * Controller separado con prefijo /reportes para compatibilidad con el frontend.
 * El mock interceptor usa /reportes/caja-historial.
 */
@ApiTags('Reportes')
@ApiBearerAuth()
@Controller('reportes')
export class ReportesController {
  constructor(private readonly reportsUseCase: ReportsUseCase) {}

  @Get('caja-historial')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Historial de sesiones de caja' })
  @ApiResponse({ status: 200, description: 'Historial de cajas' })
  getCajaHistorial(@Query('branchId') branchId?: string) {
    return this.reportsUseCase.getCajaHistorial(branchId);
  }
}
