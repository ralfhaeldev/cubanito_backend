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
exports.IngredientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_ingredients_use_case_1 = require("../../application/use-cases/crud-ingredients.use-case");
const ingredient_dto_1 = require("../dtos/ingredient.dto");
const passport_1 = require("@nestjs/passport");
const auth_decorator_1 = require("../../../auth/decorators/auth.decorator");
const roles_enum_1 = require("../../../common/enums/roles.enum");
let IngredientsController = class IngredientsController {
    crudIngredientsUseCase;
    constructor(crudIngredientsUseCase) {
        this.crudIngredientsUseCase = crudIngredientsUseCase;
    }
    create(createIngredientDto) {
        return this.crudIngredientsUseCase.create(createIngredientDto);
    }
    findByProductId(productId) {
        return this.crudIngredientsUseCase.findByProductId(productId);
    }
    findOne(id) {
        return this.crudIngredientsUseCase.findOne(id);
    }
    update(id, updateIngredientDto) {
        return this.crudIngredientsUseCase.update(id, updateIngredientDto);
    }
    delete(id) {
        return this.crudIngredientsUseCase.delete(id);
    }
};
exports.IngredientsController = IngredientsController;
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear ingrediente',
        description: 'Crea un nuevo ingrediente vinculando un producto preparado con un insumo del inventario',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Ingrediente creado exitosamente',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Producto o artículo de inventario no encontrado',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ingredient_dto_1.CreateIngredientDto]),
    __metadata("design:returntype", void 0)
], IngredientsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('product/:productId'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener ingredientes por producto',
        description: 'Retorna todos los ingredientes/insumos necesarios para preparar un producto específico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Lista de ingredientes obtenida',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Producto no encontrado',
    }),
    __param(0, (0, common_1.Param)('productId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientsController.prototype, "findByProductId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener ingrediente',
        description: 'Obtiene los detalles de un ingrediente específico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ingrediente encontrado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Ingrediente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Actualizar ingrediente',
        description: 'Actualiza la cantidad de un ingrediente específico',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ingrediente actualizado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Ingrediente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ingredient_dto_1.UpdateIngredientDto]),
    __metadata("design:returntype", void 0)
], IngredientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, auth_decorator_1.Auth)(roles_enum_1.Role.ADMIN, roles_enum_1.Role.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({
        summary: 'Eliminar ingrediente',
        description: 'Elimina un ingrediente de un producto preparado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Ingrediente eliminado',
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Ingrediente no encontrado',
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IngredientsController.prototype, "delete", null);
exports.IngredientsController = IngredientsController = __decorate([
    (0, swagger_1.ApiTags)('Ingredients'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('ingredients'),
    __metadata("design:paramtypes", [crud_ingredients_use_case_1.CrudIngredientsUseCase])
], IngredientsController);
//# sourceMappingURL=ingredients.controller.js.map