import { Injectable } from '@nestjs/common';
import { AttendanceOptionsRepository } from 'src/attendance-options/domain/attendance-options-repository.interface';
import { AttendanceOptionEntity } from 'src/attendance-options/domain/entities/attendance-option.entity';
import { CreateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/create-attendance-option.dto';
import { UpdateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/update-attendance-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class CreateAttendanceOptionUseCase {
  constructor(
    private readonly attendanceOptionRepository: AttendanceOptionsRepository<AttendanceOptionEntity>,
  ) {}
  async create(reateAttendanceOptionDto: CreateAttendanceOptionDto) {
    const client = await this.attendanceOptionRepository.create(
      reateAttendanceOptionDto,
    );
    return client;
  }

  async findAll(paginationDto: PaginationDto) {
    const clients =
      await this.attendanceOptionRepository.findAll(paginationDto); // TODO: add pagination
    return clients;
  }

  async findOne(id: string) {
    const client = await this.attendanceOptionRepository.findOne(id);
    return client;
  }

  async update(
    id: string,
    updateAttendanceOptionDto: UpdateAttendanceOptionDto,
  ) {
    const client = await this.attendanceOptionRepository.update(
      id,
      updateAttendanceOptionDto,
    );
    return client;
  }
}
