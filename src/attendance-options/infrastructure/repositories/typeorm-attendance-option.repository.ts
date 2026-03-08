import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceOptionsRepository } from 'src/attendance-options/domain/attendance-options-repository.interface';
import { AttendanceOptionEntity } from 'src/attendance-options/domain/entities/attendance-option.entity';
import { CreateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/create-attendance-option.dto';
import { UpdateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/update-attendance-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { handleDBExceptions } from 'src/common/exceptions/database-exception.handler';
import { ILike, Repository } from 'typeorm';

export class TypeormAttendanceOptionRepository
  implements AttendanceOptionsRepository<AttendanceOptionEntity>
{
  constructor(
    @InjectRepository(AttendanceOptionEntity)
    private readonly attendanceOptionRepository: Repository<AttendanceOptionEntity>,
  ) {}

  async create(
    createAttendanceOptionDto: CreateAttendanceOptionDto,
  ): Promise<AttendanceOptionEntity> {
    try {
      const attendanceOption = this.attendanceOptionRepository.create(
        createAttendanceOptionDto,
      );
      return await this.attendanceOptionRepository.save(attendanceOption);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async update(
    id: string,
    updateAttendanceOptionDto: UpdateAttendanceOptionDto,
  ): Promise<AttendanceOptionEntity> {
    try {
      const attendanceOption = await this.attendanceOptionRepository.preload({
        id,
        ...updateAttendanceOptionDto,
      });
      if (!attendanceOption)
        throw new NotFoundException(
          `Attendance option with id ${id} not found`,
        );

      return await this.attendanceOptionRepository.save(attendanceOption);
    } catch (error) {
      handleDBExceptions(error);
    }
  }

  async findOne(id: string): Promise<AttendanceOptionEntity> {
    const attendanceOption = await this.attendanceOptionRepository.findOneBy({
      id: id,
    });
    if (!attendanceOption)
      throw new NotFoundException(`Attendance option with id ${id} not found`);
    return attendanceOption;
  }

  async findAll(
    pagintationDto: PaginationDto,
  ): Promise<AttendanceOptionEntity[]> {
    const { limit = 10, offset = 0, term = null } = pagintationDto;
    const where = term
      ? {
          name: ILike(`%${term}%`),
        }
      : {};

    const clients = await this.attendanceOptionRepository.find({
      where,
      take: limit,
      skip: offset,
    });

    return clients;
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
}
