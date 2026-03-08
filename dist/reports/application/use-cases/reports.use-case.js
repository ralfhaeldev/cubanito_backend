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
exports.ReportsUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../../orders/domain/entities/order.entity");
const order_item_entity_1 = require("../../../orders/domain/entities/order-item.entity");
const order_status_enum_1 = require("../../../common/enums/order-status.enum");
const report_dto_1 = require("../../interfaces/dtos/report.dto");
const branch_entity_1 = require("../../../branches/domain/entities/branch.entity");
let ReportsUseCase = class ReportsUseCase {
    orderRepository;
    orderItemRepository;
    branchRepository;
    constructor(orderRepository, orderItemRepository, branchRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.branchRepository = branchRepository;
    }
    async getSalesReport(filters) {
        const { period, branchId, startDate, endDate } = filters;
        if (branchId) {
            const branch = await this.branchRepository.findOne({
                where: { id: branchId },
            });
            if (!branch) {
                throw new common_1.NotFoundException(`Branch with id ${branchId} not found`);
            }
        }
        const { start, end } = this.calculateDateRange(period, startDate, endDate);
        const orders = await this.orderRepository.find({
            where: {
                status: order_status_enum_1.OrderStatus.FINALIZADO,
                createdAt: (0, typeorm_2.Between)(start, end),
                ...(branchId ? { branchId } : {}),
            },
            relations: ['items', 'items.product'],
        });
        if (orders.length === 0) {
            throw new common_1.BadRequestException('No orders found for the specified period');
        }
        let totalSales = 0;
        let totalCost = 0;
        const productCount = {};
        const productSales = {};
        for (const order of orders) {
            totalSales += order.totalAmount;
            totalCost += order.realCost;
            for (const item of order.items) {
                const productName = item.product.title;
                productCount[productName] = (productCount[productName] || 0) + item.quantity;
                productSales[productName] = (productSales[productName] || 0) + item.quantity * item.unitPrice;
            }
        }
        const topProducts = Object.entries(productCount)
            .map(([name, quantity]) => ({
            name,
            quantity,
            sales: productSales[name],
        }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);
        const totalMargin = totalSales - totalCost;
        const marginPercentage = totalSales > 0 ? (totalMargin / totalSales) * 100 : 0;
        const averageOrderValue = totalSales / orders.length;
        return {
            period: `${period} (${start.toISOString()} - ${end.toISOString()})`,
            totalSales,
            totalOrders: orders.length,
            totalCost,
            totalMargin,
            marginPercentage: Math.round(marginPercentage * 100) / 100,
            averageOrderValue: Math.round(averageOrderValue * 100) / 100,
            topProducts,
        };
    }
    async getOrderStatusReport(filters) {
        const { branchId, startDate, endDate } = filters;
        const { start, end } = this.calculateDateRange(filters.period, startDate, endDate);
        const orders = await this.orderRepository.find({
            where: {
                createdAt: (0, typeorm_2.Between)(start, end),
                ...(branchId ? { branchId } : {}),
            },
        });
        const statusCounts = {};
        for (const order of orders) {
            statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
        }
        return statusCounts;
    }
    async getProductPerformance(filters) {
        const { branchId, startDate, endDate } = filters;
        const { start, end } = this.calculateDateRange(filters.period, startDate, endDate);
        const items = await this.orderItemRepository.find({
            where: {
                order: {
                    createdAt: (0, typeorm_2.Between)(start, end),
                    status: order_status_enum_1.OrderStatus.FINALIZADO,
                    ...(branchId ? { branchId } : {}),
                },
            },
            relations: ['product'],
        });
        const productStats = {};
        for (const item of items) {
            if (!productStats[item.product.title]) {
                productStats[item.product.title] = {
                    name: item.product.title,
                    quantity: 0,
                    revenue: 0,
                    averagePrice: 0,
                };
            }
            productStats[item.product.title].quantity += item.quantity;
            productStats[item.product.title].revenue += item.quantity * item.unitPrice;
        }
        for (const product of Object.values(productStats)) {
            product.averagePrice = product.revenue / product.quantity;
        }
        return Object.values(productStats);
    }
    calculateDateRange(period, startDate, endDate) {
        const now = new Date();
        if (startDate && endDate) {
            return { start: new Date(startDate), end: new Date(endDate) };
        }
        switch (period) {
            case report_dto_1.ReportPeriod.DAILY:
                const dayStart = new Date(now);
                dayStart.setHours(0, 0, 0, 0);
                const dayEnd = new Date(now);
                dayEnd.setHours(23, 59, 59, 999);
                return { start: dayStart, end: dayEnd };
            case report_dto_1.ReportPeriod.WEEKLY:
                const weekStart = new Date(now);
                weekStart.setDate(now.getDate() - now.getDay());
                weekStart.setHours(0, 0, 0, 0);
                const weekEnd = new Date(weekStart);
                weekEnd.setDate(weekStart.getDate() + 6);
                weekEnd.setHours(23, 59, 59, 999);
                return { start: weekStart, end: weekEnd };
            case report_dto_1.ReportPeriod.MONTHLY:
                const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
                monthStart.setHours(0, 0, 0, 0);
                const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                monthEnd.setHours(23, 59, 59, 999);
                return { start: monthStart, end: monthEnd };
            default:
                throw new common_1.BadRequestException('Invalid report period');
        }
    }
};
exports.ReportsUseCase = ReportsUseCase;
exports.ReportsUseCase = ReportsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(branch_entity_1.BranchEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ReportsUseCase);
//# sourceMappingURL=reports.use-case.js.map