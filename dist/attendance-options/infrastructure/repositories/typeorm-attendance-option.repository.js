"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormAttendanceOptionRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_option_entity_1 = require("../../domain/entities/attendance-option.entity");
const database_exception_handler_1 = require("../../../common/exceptions/database-exception.handler");
const typeorm_2 = require("typeorm");
let TypeormAttendanceOptionRepository = class TypeormAttendanceOptionRepository {
    attendanceOptionRepository;
    constructor(attendanceOptionRepository) {
        this.attendanceOptionRepository = attendanceOptionRepository;
    }
    async create(createAttendanceOptionDto) {
        try {
            const attendanceOption = this.attendanceOptionRepository.create(createAttendanceOptionDto);
            return await this.attendanceOptionRepository.save(attendanceOption);
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
    }
    async update(id, updateAttendanceOptionDto) {
        try {
            const attendanceOption = await this.attendanceOptionRepository.preload({
                id,
                ...updateAttendanceOptionDto,
            });
            if (!attendanceOption)
                throw new common_1.NotFoundException(`Attendance option with id ${id} not found`);
            return await this.attendanceOptionRepository.save(attendanceOption);
        }
        catch (error) {
            (0, database_exception_handler_1.handleDBExceptions)(error);
        }
    }
    async findOne(id) {
        const attendanceOption = await this.attendanceOptionRepository.findOneBy({
            id: id,
        });
        if (!attendanceOption)
            throw new common_1.NotFoundException(`Attendance option with id ${id} not found`);
        return attendanceOption;
    }
    async findAll(pagintationDto) {
        const { limit = 10, offset = 0, term = null } = pagintationDto;
        const where = term
            ? {
                name: (0, typeorm_2.ILike)(`%${term}%`),
            }
            : {};
        const clients = await this.attendanceOptionRepository.find({
            where,
            take: limit,
            skip: offset,
        });
        return clients;
    }
    delete(id) {
        throw new Error('Method not implemented.');
    }
};
exports.TypeormAttendanceOptionRepository = TypeormAttendanceOptionRepository;
exports.TypeormAttendanceOptionRepository = TypeormAttendanceOptionRepository = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(attendance_option_entity_1.AttendanceOptionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TypeormAttendanceOptionRepository);
//# sourceMappingURL=typeorm-attendance-option.repository.js.map