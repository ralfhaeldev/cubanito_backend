import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CashboxEntity } from '../../domain/entities/cashbox.entity';
import { MovementEntity } from '../../domain/entities/movement.entity';
import { OpenCashboxDto, CloseCashboxDto, CreateMovementDto } from '../../interfaces/dtos/cashbox.dto';

@Injectable()
export class CashboxUseCase {
  constructor(
    @InjectRepository(CashboxEntity)
    private readonly cashboxRepository: Repository<CashboxEntity>,
    @InjectRepository(MovementEntity)
    private readonly movementRepository: Repository<MovementEntity>,
  ) {}

  /** Gets the current open cashbox (most recently opened) */
  async getCurrentCashbox(branchId?: string): Promise<CashboxEntity | null> {
    const where: any = { abierta: true };
    if (branchId) where.branchId = branchId;
    return this.cashboxRepository.findOne({
      where,
      order: { createdAt: 'DESC' },
      relations: ['movements'],
    });
  }

  async openCashbox(dto: OpenCashboxDto, userId: string, userName: string): Promise<CashboxEntity> {
    // Verify that there is no open cashbox for the same branch
    const openCashbox = await this.getCurrentCashbox(dto.branchId);
    if (openCashbox) {
      throw new BadRequestException('There is already an open cashbox for this branch');
    }

    const cashbox = this.cashboxRepository.create({
      fecha: new Date().toISOString().split('T')[0],
      montoInicial: dto.initialAmount,
      montoFinal: null,
      abierta: true,
      abiertaPorId: userId,
      abiertaPor: userName,
      cerradaPorId: null,
      cerradaPor: null,
      branchId: dto.branchId ?? null,
    });

    return this.cashboxRepository.save(cashbox);
  }

  async closeCashbox(dto: CloseCashboxDto, userId: string, userName: string, branchId?: string): Promise<CashboxEntity> {
    const cashbox = await this.getCurrentCashbox(branchId);
    if (!cashbox) throw new NotFoundException('No open cashbox found');

    cashbox.montoFinal = dto.finalAmount;
    cashbox.abierta = false;
    cashbox.cerradaPorId = userId;
    cashbox.cerradaPor = userName;

    return this.cashboxRepository.save(cashbox);
  }

  async getHistory(branchId?: string): Promise<CashboxEntity[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    return this.cashboxRepository.find({
      where,
      order: { createdAt: 'DESC' },
      take: 30,
    });
  }

  // ── Movements ─────────────────────────────────────────────────────────────

  async getMovements(cashboxId?: string): Promise<MovementEntity[]> {
    if (cashboxId) {
      return this.movementRepository.find({
        where: { cashboxId },
        order: { createdAt: 'DESC' },
      });
    }
    // If cashboxId is not provided, return movements from current open cashbox
    const cashbox = await this.getCurrentCashbox();
    if (!cashbox) return [];
    return this.movementRepository.find({
      where: { cashboxId: cashbox.id },
      order: { createdAt: 'DESC' },
    });
  }

  async createMovement(dto: CreateMovementDto, branchId?: string): Promise<MovementEntity> {
    const cashbox = await this.getCurrentCashbox(branchId);
    if (!cashbox) throw new BadRequestException('No open cashbox found. Please open the cashbox first.');

    const movement = this.movementRepository.create({
      cashboxId: cashbox.id,
      type: dto.type,
      amount: dto.amount,
      description: dto.description,
    });

    return this.movementRepository.save(movement);
  }
}
