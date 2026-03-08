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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const crud_product_use_case_1 = require("../../application/use-cases/crud-product.use-case");
const create_product_dto_1 = require("../dtos/create-product.dto");
const update_product_dto_1 = require("../dtos/update-product.dto");
const pagination_dto_1 = require("../../../common/dtos/pagination.dto");
const passport_1 = require("@nestjs/passport");
const roles_enum_1 = require("../../../common/enums/roles.enum");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
let ProductController = class ProductController {
    crudProductUseCase;
    constructor(crudProductUseCase) {
        this.crudProductUseCase = crudProductUseCase;
    }
    create(createProductDto) {
        return this.crudProductUseCase.create(createProductDto);
    }
    findOne(term) {
        return this.crudProductUseCase.findOne(term);
    }
    findAll(paginationDto) {
        return this.crudProductUseCase.findAll(paginationDto);
    }
    update(id, updateProductDto) {
        return this.crudProductUseCase.update(id, updateProductDto);
    }
    delete(id) {
        return this.crudProductUseCase.delete(id);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':term'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.USER),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "delete", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [crud_product_use_case_1.CrudProductUseCase])
], ProductController);
//# sourceMappingURL=product.controller.js.map