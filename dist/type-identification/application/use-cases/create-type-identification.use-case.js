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
exports.CreateTypeIdentificatioUseCase = void 0;
const type_identification_repository_interface_1 = require("../../domain/type-identification-repository.interface");
const common_1 = require("@nestjs/common");
let CreateTypeIdentificatioUseCase = class CreateTypeIdentificatioUseCase {
    typeIdentificationRepository;
    constructor(typeIdentificationRepository) {
        this.typeIdentificationRepository = typeIdentificationRepository;
    }
    async findOne(id) {
        const typeIdentification = await this.typeIdentificationRepository.findOne(id);
        return typeIdentification;
    }
    async findAll(paginationDto) {
        const typeIdentifications = await this.typeIdentificationRepository.findAll(paginationDto);
        return typeIdentifications;
    }
};
exports.CreateTypeIdentificatioUseCase = CreateTypeIdentificatioUseCase;
exports.CreateTypeIdentificatioUseCase = CreateTypeIdentificatioUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [type_identification_repository_interface_1.TypeIdentificationRepository])
], CreateTypeIdentificatioUseCase);
//# sourceMappingURL=create-type-identification.use-case.js.map