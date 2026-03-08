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
exports.AttendanceOptionController = void 0;
const common_1 = require("@nestjs/common");
const create_attendance_option_dto_1 = require("../dtos/create-attendance-option.dto");
const create_attendance_option_use_case_1 = require("../../application/use-cases/create-attendance-option.use-case");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const update_attendance_option_dto_1 = require("../dtos/update-attendance-option.dto");
let AttendanceOptionController = class AttendanceOptionController {
    createAttendanceOptionUseCase;
    constructor(createAttendanceOptionUseCase) {
        this.createAttendanceOptionUseCase = createAttendanceOptionUseCase;
    }
    create(createAttendanceOptionDto) {
        return this.createAttendanceOptionUseCase.create(createAttendanceOptionDto);
    }
    findAll(paginationDto) {
        return this.createAttendanceOptionUseCase.findAll(paginationDto);
    }
    findOne(id) {
        return this.createAttendanceOptionUseCase.findOne(id);
    }
    update(id, updateAttendanceOptionDto) {
        return this.createAttendanceOptionUseCase.update(id, updateAttendanceOptionDto);
    }
};
exports.AttendanceOptionController = AttendanceOptionController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_option_dto_1.CreateAttendanceOptionDto]),
    __metadata("design:returntype", void 0)
], AttendanceOptionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], AttendanceOptionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AttendanceOptionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_attendance_option_dto_1.UpdateAttendanceOptionDto]),
    __metadata("design:returntype", void 0)
], AttendanceOptionController.prototype, "update", null);
exports.AttendanceOptionController = AttendanceOptionController = __decorate([
    (0, common_1.Controller)('attendance-options'),
    __metadata("design:paramtypes", [create_attendance_option_use_case_1.CreateAttendanceOptionUseCase])
], AttendanceOptionController);
//# sourceMappingURL=attendance-option.controller.js.map