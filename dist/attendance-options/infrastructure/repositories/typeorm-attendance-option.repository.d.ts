import { AttendanceOptionsRepository } from 'src/attendance-options/domain/attendance-options-repository.interface';
import { AttendanceOptionEntity } from 'src/attendance-options/domain/entities/attendance-option.entity';
import { CreateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/create-attendance-option.dto';
import { UpdateAttendanceOptionDto } from 'src/attendance-options/interfaces/dtos/update-attendance-option.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Repository } from 'typeorm';
export declare class TypeormAttendanceOptionRepository implements AttendanceOptionsRepository<AttendanceOptionEntity> {
    private readonly attendanceOptionRepository;
    constructor(attendanceOptionRepository: Repository<AttendanceOptionEntity>);
    create(createAttendanceOptionDto: CreateAttendanceOptionDto): Promise<AttendanceOptionEntity>;
    update(id: string, updateAttendanceOptionDto: UpdateAttendanceOptionDto): Promise<AttendanceOptionEntity>;
    findOne(id: string): Promise<AttendanceOptionEntity>;
    findAll(pagintationDto: PaginationDto): Promise<AttendanceOptionEntity[]>;
    delete(id: string): void;
}
