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
exports.BranchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_branch_use_case_1 = require("../../application/use-cases/crud-branch.use-case");
const branch_dto_1 = require("../dtos/branch.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
const roles_enum_1 = require("../../../common/enums/roles.enum");
let BranchController = class BranchController {
    crudBranchUseCase;
    constructor(crudBranchUseCase) {
        this.crudBranchUseCase = crudBranchUseCase;
    }
    create(createBranchDto) {
        return this.crudBranchUseCase.create(createBranchDto);
    }
    findAll(paginationDto) {
        return this.crudBranchUseCase.findAll(paginationDto);
    }
    findOne(id) {
        return this.crudBranchUseCase.findOne(id);
    }
    update(id, updateBranchDto) {
        return this.crudBranchUseCase.update(id, updateBranchDto);
    }
    delete(id) {
        return this.crudBranchUseCase.delete(id);
    }
};
exports.BranchController = BranchController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear sede',
        description: 'Crea una nueva sede/sucursal del restaurante',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Sede creada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Sede con ese nombre ya existe',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_dto_1.CreateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Listar sedes',
        description: 'Retorna todas las sedes del restaurante',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de sedes',
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener sede',
        description: 'Retorna los datos de una sede específica',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Sede encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar sede',
        description: 'Actualiza los datos de una sede',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Sede actualizada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede no encontrada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Nombre ya existe',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, branch_dto_1.UpdateBranchDto]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar sede',
        description: 'Elimina una sede del sistema',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Sede eliminada',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Sede no encontrada',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BranchController.prototype, "delete", null);
exports.BranchController = BranchController = __decorate([
    (0, swagger_1.ApiTags)('Branches'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('branches'),
    __metadata("design:paramtypes", [crud_branch_use_case_1.CrudBranchUseCase])
], BranchController);
//# sourceMappingURL=branch.controller.js.map