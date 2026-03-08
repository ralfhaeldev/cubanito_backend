"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceOptionsModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_option_controller_1 = require("./interfaces/controllers/attendance-option.controller");
const typeorm_1 = require("@nestjs/typeorm");
const attendance_option_entity_1 = require("./domain/entities/attendance-option.entity");
const auth_module_1 = require("../auth/auth.module");
const create_attendance_option_use_case_1 = require("./application/use-cases/create-attendance-option.use-case");
const typeorm_attendance_option_repository_1 = require("./infrastructure/repositories/typeorm-attendance-option.repository");
const attendance_options_repository_interface_1 = require("./domain/attendance-options-repository.interface");
let AttendanceOptionsModule = class AttendanceOptionsModule {
};
exports.AttendanceOptionsModule = AttendanceOptionsModule;
exports.AttendanceOptionsModule = AttendanceOptionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([attendance_option_entity_1.AttendanceOptionEntity]), auth_module_1.AuthModule],
        controllers: [attendance_option_controller_1.AttendanceOptionController],
        providers: [
            create_attendance_option_use_case_1.CreateAttendanceOptionUseCase,
            typeorm_attendance_option_repository_1.TypeormAttendanceOptionRepository,
            {
                provide: attendance_options_repository_interface_1.AttendanceOptionsRepository,
                useExisting: typeorm_attendance_option_repository_1.TypeormAttendanceOptionRepository,
            },
        ],
        exports: [typeorm_1.TypeOrmModule],
    })
], AttendanceOptionsModule);
//# sourceMappingURL=attendance-options.module.js.map