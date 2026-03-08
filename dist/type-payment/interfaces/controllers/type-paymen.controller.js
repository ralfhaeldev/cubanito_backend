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
exports.TypePaymenController = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const crud_type_paymen_use_case_1 = require("../../application/use-cases/crud-type-paymen.use-case");
let TypePaymenController = class TypePaymenController {
    curdTypePayment;
    constructor(curdTypePayment) {
        this.curdTypePayment = curdTypePayment;
    }
    findAll(paginationDto) {
        return this.curdTypePayment.findAll(paginationDto);
    }
    findOne(id) {
        return this.curdTypePayment.findOne(id);
    }
};
exports.TypePaymenController = TypePaymenController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], TypePaymenController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TypePaymenController.prototype, "findOne", null);
exports.TypePaymenController = TypePaymenController = __decorate([
    (0, common_1.Controller)('type-payment'),
    __metadata("design:paramtypes", [crud_type_paymen_use_case_1.CrudTypePaymenUseCase])
], TypePaymenController);
//# sourceMappingURL=type-paymen.controller.js.map