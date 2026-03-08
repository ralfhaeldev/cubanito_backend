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
exports.TypeIdentificationController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const create_type_identification_use_case_1 = require("../../application/use-cases/create-type-identification.use-case");
let TypeIdentificationController = class TypeIdentificationController {
    createTypeIdentificatioUseCase;
    constructor(createTypeIdentificatioUseCase) {
        this.createTypeIdentificatioUseCase = createTypeIdentificatioUseCase;
    }
    findAll(paginationDto) {
        return this.createTypeIdentificatioUseCase.findAll(paginationDto);
    }
    findOne(id) {
        return this.createTypeIdentificatioUseCase.findOne(id);
    }
};
exports.TypeIdentificationController = TypeIdentificationController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], TypeIdentificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypeIdentificationController.prototype, "findOne", null);
exports.TypeIdentificationController = TypeIdentificationController = __decorate([
    (0, common_1.Controller)('type-identification'),
    __metadata("design:paramtypes", [create_type_identification_use_case_1.CreateTypeIdentificatioUseCase])
], TypeIdentificationController);
//# sourceMappingURL=type-identification.controller.js.map