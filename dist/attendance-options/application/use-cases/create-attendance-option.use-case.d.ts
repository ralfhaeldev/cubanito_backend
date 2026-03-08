import { AttendanceOptionsRepository } from 'src/attendance-options/domain/attendance-options-repository.interface';
import { AttendanceOptionEntity } from 'src/attendance-options/domain/entities/attendance-option.entity';
import { CreateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/create-attendance-option.dto';
import { UpdateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/update-attendance-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class CreateAttendanceOptionUseCase {
    private readonly attendanceOptionRepository;
    constructor(attendanceOptionRepository: AttendanceOptionsRepository<AttendanceOptionEntity>);
    create(reateAttendanceOptionDto: CreateAttendanceOptionDto): Promise<AttendanceOptionEntity>;
    findAll(paginationDto: PaginationDto): Promise<AttendanceOptionEntity[]>;
    findOne(id: string): Promise<AttendanceOptionEntity>;
    update(id: string, updateAttendanceOptionDto: UpdateAttendanceOptionDto): Promise<AttendanceOptionEntity>;
}
