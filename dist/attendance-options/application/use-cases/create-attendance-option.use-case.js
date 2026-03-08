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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAttendanceOptionUseCase = void 0;
const common_1 = require("@nestjs/common");
const attendance_options_repository_interface_1 = require("../../domain/attendance-options-repository.interface");
let CreateAttendanceOptionUseCase = class CreateAttendanceOptionUseCase {
    attendanceOptionRepository;
    constructor(attendanceOptionRepository) {
        this.attendanceOptionRepository = attendanceOptionRepository;
    }
    async create(reateAttendanceOptionDto) {
        const client = await this.attendanceOptionRepository.create(reateAttendanceOptionDto);
        return client;
    }
    async findAll(paginationDto) {
        const clients = await this.attendanceOptionRepository.findAll(paginationDto);
        return clients;
    }
    async findOne(id) {
        const client = await this.attendanceOptionRepository.findOne(id);
        return client;
    }
    async update(id, updateAttendanceOptionDto) {
        const client = await this.attendanceOptionRepository.update(id, updateAttendanceOptionDto);
        return client;
    }
};
exports.CreateAttendanceOptionUseCase = CreateAttendanceOptionUseCase;
exports.CreateAttendanceOptionUseCase = CreateAttendanceOptionUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [attendance_options_repository_interface_1.AttendanceOptionsRepository])
], CreateAttendanceOptionUseCase);
//# sourceMappingURL=create-attendance-option.use-case.js.map