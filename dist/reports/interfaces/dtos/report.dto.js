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
exports.CashReportDto = exports.SalesReportDto = exports.ReportFiltersDto = exports.ReportPeriod = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var ReportPeriod;
(function (ReportPeriod) {
    ReportPeriod["DAILY"] = "daily";
    ReportPeriod["WEEKLY"] = "weekly";
    ReportPeriod["MONTHLY"] = "monthly";
})(ReportPeriod || (exports.ReportPeriod = ReportPeriod = {}));
class ReportFiltersDto {
    period;
    branchId;
    startDate;
    endDate;
}
exports.ReportFiltersDto = ReportFiltersDto;
__decorate([
    (0, class_validator_1.IsEnum)(ReportPeriod),
    (0, swagger_1.ApiProperty)({
        description: 'Período del reporte',
        enum: ReportPeriod,
        example: ReportPeriod.DAILY,
    }),
    __metadata("design:type", String)
], ReportFiltersDto.prototype, "period", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'UUID de la sede (opcional)',
        required: false,
    }),
    __metadata("design:type", String)
], ReportFiltersDto.prototype, "branchId", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Fecha inicial (ISO format)',
        example: '2024-03-01T00:00:00Z',
        required: false,
    }),
    __metadata("design:type", Date)
], ReportFiltersDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        description: 'Fecha final (ISO format)',
        example: '2024-03-08T23:59:59Z',
        required: false,
    }),
    __metadata("design:type", Date)
], ReportFiltersDto.prototype, "endDate", void 0);
class SalesReportDto {
    period;
    totalSales;
    totalOrders;
    totalCost;
    totalMargin;
    marginPercentage;
    averageOrderValue;
    topProducts;
}
exports.SalesReportDto = SalesReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SalesReportDto.prototype, "period", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "totalSales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "totalOrders", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "totalCost", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "totalMargin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "marginPercentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SalesReportDto.prototype, "averageOrderValue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Array)
], SalesReportDto.prototype, "topProducts", void 0);
class CashReportDto {
    openingDate;
    closingDate;
    openingAmount;
    closingAmount;
    totalIncome;
    totalExpenses;
    difference;
}
exports.CashReportDto = CashReportDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CashReportDto.prototype, "openingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CashReportDto.prototype, "closingDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CashReportDto.prototype, "openingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CashReportDto.prototype, "closingAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CashReportDto.prototype, "totalIncome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CashReportDto.prototype, "totalExpenses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CashReportDto.prototype, "difference", void 0);
//# sourceMappingURL=report.dto.js.map