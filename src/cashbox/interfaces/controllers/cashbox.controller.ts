import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/roles.enum';
import { CashboxUseCase } from '../../application/use-cases/cashbox.use-case';
import { OpenCashboxDto, CloseCashboxDto, CreateMovementDto } from '../dtos/cashbox.dto';

@ApiTags('Cashbox')
@ApiBearerAuth()
@Controller('cashbox')
export class CashboxController {
  constructor(private readonly cashboxUseCase: CashboxUseCase) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'Get current open cashbox' })
  @ApiResponse({ status: 200, description: 'Current cashbox or null if none opened' })
  getCurrentCashbox(@Query('branchId') branchId?: string) {
    return this.cashboxUseCase.getCurrentCashbox(branchId);
  }

  @Post('open')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Open new cashbox session' })
  @ApiResponse({ status: 201, description: 'Cashbox opened successfully' })
  openCashbox(@Body() dto: OpenCashboxDto, @Request() req: any) {
    const userId = req.user?.id ?? 'system';
    const userName = req.user?.fullName ?? 'Admin';
    return this.cashboxUseCase.openCashbox(dto, userId, userName);
  }

  @Post('close')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Close current cashbox session' })
  @ApiResponse({ status: 200, description: 'Cashbox closed successfully' })
  closeCashbox(
    @Body() dto: CloseCashboxDto,
    @Request() req: any,
    @Query('branchId') branchId?: string,
  ) {
    const userId = req.user?.id ?? 'system';
    const userName = req.user?.fullName ?? 'Admin';
    return this.cashboxUseCase.closeCashbox(dto, userId, userName, branchId);
  }

  @Get('history')
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Closed cashbox history' })
  getHistory(@Query('branchId') branchId?: string) {
    return this.cashboxUseCase.getHistory(branchId);
  }
}

@ApiTags('Movements')
@ApiBearerAuth()
@Controller('movements')
export class MovementsController {
  constructor(private readonly cashboxUseCase: CashboxUseCase) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: 'List movements of current cashbox' })
  getMovements(@Query('cashboxId') cashboxId?: string) {
    return this.cashboxUseCase.getMovements(cashboxId);
  }

  @Post()
  @Auth(Role.ADMIN_SEDE, Role.SUPER_ADMIN, Role.OWNER)
  @ApiOperation({ summary: 'Register a cashbox movement' })
  @ApiResponse({ status: 201, description: 'Movement registered' })
  createMovement(
    @Body() dto: CreateMovementDto,
    @Query('branchId') branchId?: string,
  ) {
    return this.cashboxUseCase.createMovement(dto, branchId);
  }
}
