import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CajaEntity } from '../../domain/entities/caja.entity';
import { MovimientoEntity } from '../../domain/entities/movimiento.entity';
import { AbrirCajaDto, CerrarCajaDto, CreateMovimientoDto } from '../../interfaces/dtos/caja.dto';

@Injectable()
export class CajaUseCase {
  constructor(
    @InjectRepository(CajaEntity)
    private readonly cajaRepository: Repository<CajaEntity>,
    @InjectRepository(MovimientoEntity)
    private readonly movimientoRepository: Repository<MovimientoEntity>,
  ) {}

  /** Obtiene la caja abierta actual (la más reciente abierta) */
  async getCajaActual(branchId?: string): Promise<CajaEntity | null> {
    const where: any = { abierta: true };
    if (branchId) where.branchId = branchId;
    return this.cajaRepository.findOne({
      where,
      order: { createdAt: 'DESC' },
      relations: ['movimientos'],
    });
  }

  async abrirCaja(dto: AbrirCajaDto, userId: string, userName: string): Promise<CajaEntity> {
    // Verificar que no haya una caja abierta para la misma sede
    const cajaAbierta = await this.getCajaActual(dto.branchId);
    if (cajaAbierta) {
      throw new BadRequestException('Ya existe una caja abierta para esta sede');
    }

    const caja = this.cajaRepository.create({
      fecha: new Date().toISOString().split('T')[0],
      montoInicial: dto.montoInicial,
      montoFinal: null,
      abierta: true,
      abiertaPorId: userId,
      abiertaPor: userName,
      cerradaPorId: null,
      cerradaPor: null,
      branchId: dto.branchId ?? null,
    });

    return this.cajaRepository.save(caja);
  }

  async cerrarCaja(dto: CerrarCajaDto, userId: string, userName: string, branchId?: string): Promise<CajaEntity> {
    const caja = await this.getCajaActual(branchId);
    if (!caja) throw new NotFoundException('No hay una caja abierta');

    caja.montoFinal = dto.montoFinal;
    caja.abierta = false;
    caja.cerradaPorId = userId;
    caja.cerradaPor = userName;

    return this.cajaRepository.save(caja);
  }

  async getHistorial(branchId?: string): Promise<CajaEntity[]> {
    const where: any = {};
    if (branchId) where.branchId = branchId;
    return this.cajaRepository.find({
      where,
      order: { createdAt: 'DESC' },
      take: 30,
    });
  }

  // ── Movimientos ─────────────────────────────────────────────────────────────

  async getMovimientos(cajaId?: string): Promise<MovimientoEntity[]> {
    if (cajaId) {
      return this.movimientoRepository.find({
        where: { cajaId },
        order: { createdAt: 'DESC' },
      });
    }
    // Si no se pasa cajaId, devuelve los de la caja abierta actual
    const caja = await this.getCajaActual();
    if (!caja) return [];
    return this.movimientoRepository.find({
      where: { cajaId: caja.id },
      order: { createdAt: 'DESC' },
    });
  }

  async createMovimiento(dto: CreateMovimientoDto, branchId?: string): Promise<MovimientoEntity> {
    const caja = await this.getCajaActual(branchId);
    if (!caja) throw new BadRequestException('No hay una caja abierta. Abra la caja primero.');

    const movimiento = this.movimientoRepository.create({
      cajaId: caja.id,
      tipo: dto.tipo,
      monto: dto.monto,
      descripcion: dto.descripcion,
    });

    return this.movimientoRepository.save(movimiento);
  }
}
