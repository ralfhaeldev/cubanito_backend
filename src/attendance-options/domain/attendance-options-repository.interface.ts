import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateAttendanceOptionDto } from '../interfaces/dtos/create-attendance-option.dto';
import { UpdateAttendanceOptionDto } from '../interfaces/dtos/update-attendance-option.dto';

export abstract class AttendanceOptionsRepository<T> {
  abstract create(
    createAttendanceOptionDto: CreateAttendanceOptionDto,
  ): Promise<T>;
  abstract update(
    id: string,
    updateAttendanceOptionDto: UpdateAttendanceOptionDto,
  ): Promise<T>;
  abstract findOne(term: string): Promise<T>;
  abstract findAll(pagintationDto: PaginationDto): Promise<T[]>;
  abstract delete(id: string): void;
}
