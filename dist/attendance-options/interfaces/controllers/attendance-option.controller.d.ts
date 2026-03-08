import { CreateAttendanceOptionDto } from '../dtos/create-attendance-option.dto';
import { CreateAttendanceOptionUseCase } from 'src/attendance-options/application/use-cases/create-attendance-option.use-case';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateAttendanceOptionDto } from '../dtos/update-attendance-option.dto';
export declare class AttendanceOptionController {
    private readonly createAttendanceOptionUseCase;
    constructor(createAttendanceOptionUseCase: CreateAttendanceOptionUseCase);
    create(createAttendanceOptionDto: CreateAttendanceOptionDto): Promise<import("../../domain/entities/attendance-option.entity").AttendanceOptionEntity>;
    findAll(paginationDto: PaginationDto): Promise<import("../../domain/entities/attendance-option.entity").AttendanceOptionEntity[]>;
    findOne(id: string): Promise<import("../../domain/entities/attendance-option.entity").AttendanceOptionEntity>;
    update(id: string, updateAttendanceOptionDto: UpdateAttendanceOptionDto): Promise<import("../../domain/entities/attendance-option.entity").AttendanceOptionEntity>;
}
