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
exports.CrudOrderUseCase = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../../domain/entities/order.entity");
const order_item_entity_1 = require("../../domain/entities/order-item.entity");
const order_status_enum_1 = require("../../../common/enums/order-status.enum");
const product_status_enum_1 = require("../../../common/enums/product-status.enum");
const product_entity_1 = require("../../../products/domain/entities/product.entity");
const inventory_entity_1 = require("../../../inventory/domain/entities/inventory.entity");
const ingredients_entity_1 = require("../../../ingredients/domain/entities/ingredients.entity");
const roles_enum_1 = require("../../../common/enums/roles.enum");
const branch_entity_1 = require("../../../branches/domain/entities/branch.entity");
let CrudOrderUseCase = class CrudOrderUseCase {
    orderRepository;
    orderItemRepository;
    branchRepository;
    productRepository;
    inventoryRepository;
    ingredientsRepository;
    constructor(orderRepository, orderItemRepository, branchRepository, productRepository, inventoryRepository, ingredientsRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.branchRepository = branchRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
        this.ingredientsRepository = ingredientsRepository;
    }
    async create(createOrderDto, userId) {
        const branch = await this.branchRepository.findOne({
            where: { id: createOrderDto.branchId },
        });
        if (!branch) {
            throw new common_1.NotFoundException(`Branch with id ${createOrderDto.branchId} not found`);
        }
        let totalAmount = 0;
        for (const item of createOrderDto.items) {
            const product = await this.productRepository.findOne({
                where: { id: item.productId },
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with id ${item.productId} not found`);
            }
            totalAmount += item.unitPrice * item.quantity;
        }
        const order = this.orderRepository.create({
            branchId: createOrderDto.branchId,
            type: createOrderDto.type,
            status: order_status_enum_1.OrderStatus.PENDING,
            createdByUserId: userId,
            notes: createOrderDto.notes,
            totalAmount,
            realCost: 0,
            realMargin: 0,
        });
        const savedOrder = await this.orderRepository.save(order);
        for (const item of createOrderDto.items) {
            const orderItem = this.orderItemRepository.create({
                orderId: savedOrder.id,
                productId: item.productId,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                realCost: 0,
            });
            await this.orderItemRepository.save(orderItem);
        }
        return this.findOne(savedOrder.id);
    }
    async findAll(paginationDto, branchId) {
        const { limit = 10, offset = 0 } = paginationDto;
        return this.orderRepository.find({
            where: branchId ? { branchId } : {},
            relations: ['items', 'items.product', 'branch', 'createdByUser'],
            take: limit,
            skip: offset,
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['items', 'items.product', 'branch', 'createdByUser', 'lastStatusChangedByUser'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${id} not found`);
        }
        return order;
    }
    async updateStatus(id, updateOrderStatusDto, userId, userRoles) {
        const order = await this.findOne(id);
        this.validateStatusTransition(order.status, updateOrderStatusDto.status, userRoles);
        const previousStatus = order.status;
        if (updateOrderStatusDto.status === order_status_enum_1.OrderStatus.FINALIZADO && previousStatus !== order_status_enum_1.OrderStatus.FINALIZADO) {
            await this.applyInventoryDeduction(order);
        }
        order.status = updateOrderStatusDto.status;
        order.lastStatusChangedByUserId = userId;
        if (updateOrderStatusDto.notes) {
            order.notes = updateOrderStatusDto.notes;
        }
        if (updateOrderStatusDto.status === order_status_enum_1.OrderStatus.FINALIZADO) {
            order.completedAt = new Date();
        }
        return this.orderRepository.save(order);
    }
    async applyInventoryDeduction(order) {
        let totalRealCost = 0;
        for (const item of order.items) {
            const product = await this.productRepository.findOne({
                where: { id: item.productId },
                relations: ['ingredients', 'ingredients.inventoryItem'],
            });
            if (!product) {
                throw new common_1.NotFoundException(`Product with id ${item.productId} not found`);
            }
            if (product.type === product_status_enum_1.ProductType.SIMPLE) {
                const inventoryItem = await this.inventoryRepository.findOne({
                    where: { name: product.title, branchId: order.branchId },
                });
                if (inventoryItem) {
                    const adjustment = -item.quantity;
                    if (inventoryItem.quantity + adjustment < 0) {
                        throw new common_1.BadRequestException(`Insufficient inventory for product ${product.title}`);
                    }
                    inventoryItem.quantity += adjustment;
                    await this.inventoryRepository.save(inventoryItem);
                    const itemRealCost = item.quantity * inventoryItem.purchasePrice;
                    item.realCost = itemRealCost;
                    totalRealCost += itemRealCost;
                }
            }
            else if (product.type === product_status_enum_1.ProductType.PREPARADO && product.ingredients) {
                for (const ingredient of product.ingredients) {
                    const inventoryItem = ingredient.inventoryItem || (await this.inventoryRepository.findOne({
                        where: { id: ingredient.inventoryItemId },
                    }));
                    if (inventoryItem) {
                        const totalDeduction = ingredient.quantity * item.quantity;
                        const adjustment = -totalDeduction;
                        if (inventoryItem.quantity + adjustment < 0) {
                            throw new common_1.BadRequestException(`Insufficient inventory for ingredient in product ${product.title}`);
                        }
                        inventoryItem.quantity += adjustment;
                        await this.inventoryRepository.save(inventoryItem);
                        const ingredientCost = totalDeduction * inventoryItem.purchasePrice;
                        totalRealCost += ingredientCost;
                    }
                }
                item.realCost = totalRealCost;
            }
            await this.orderItemRepository.save(item);
        }
        order.realCost = totalRealCost;
        order.realMargin = order.totalAmount - totalRealCost;
    }
    validateStatusTransition(currentStatus, newStatus, userRoles) {
        if (userRoles.includes(roles_enum_1.Role.MESERO)) {
            if (![order_status_enum_1.OrderStatus.EN_PROCESO, order_status_enum_1.OrderStatus.PREPARADO].includes(newStatus)) {
                throw new common_1.ForbiddenException('MESERO can only change order status to EN_PROCESO or PREPARADO');
            }
            if (currentStatus !== order_status_enum_1.OrderStatus.PENDING && newStatus === order_status_enum_1.OrderStatus.EN_PROCESO) {
                throw new common_1.BadRequestException('Invalid status transition');
            }
            if (currentStatus !== order_status_enum_1.OrderStatus.EN_PROCESO && newStatus === order_status_enum_1.OrderStatus.PREPARADO) {
                throw new common_1.BadRequestException('Invalid status transition');
            }
        }
        if (userRoles.includes(roles_enum_1.Role.COCINA)) {
            if (newStatus !== order_status_enum_1.OrderStatus.EN_PROCESO) {
                throw new common_1.ForbiddenException('COCINA can only change order status to EN_PROCESO');
            }
        }
        if (userRoles.includes(roles_enum_1.Role.DOMICILIARIO)) {
            if (![order_status_enum_1.OrderStatus.ENTREGADO, order_status_enum_1.OrderStatus.RECHAZADO].includes(newStatus)) {
                throw new common_1.ForbiddenException('DOMICILIARIO can only change order status to ENTREGADO or RECHAZADO');
            }
            if (currentStatus !== order_status_enum_1.OrderStatus.ENVIADO) {
                throw new common_1.BadRequestException('Order must be in ENVIADO status');
            }
        }
        if (userRoles.includes(roles_enum_1.Role.ADMIN) || userRoles.includes(roles_enum_1.Role.SUPER_ADMIN)) {
            const validTransitions = {
                [order_status_enum_1.OrderStatus.PENDING]: [order_status_enum_1.OrderStatus.EN_PROCESO],
                [order_status_enum_1.OrderStatus.EN_PROCESO]: [order_status_enum_1.OrderStatus.PREPARADO, order_status_enum_1.OrderStatus.RECHAZADO],
                [order_status_enum_1.OrderStatus.PREPARADO]: [order_status_enum_1.OrderStatus.ENVIADO, order_status_enum_1.OrderStatus.ENTREGADO],
                [order_status_enum_1.OrderStatus.ENVIADO]: [order_status_enum_1.OrderStatus.ENTREGADO],
                [order_status_enum_1.OrderStatus.ENTREGADO]: [order_status_enum_1.OrderStatus.FINALIZADO],
                [order_status_enum_1.OrderStatus.RECHAZADO]: [],
                [order_status_enum_1.OrderStatus.FINALIZADO]: [],
            };
            if (!validTransitions[currentStatus]?.includes(newStatus)) {
                throw new common_1.BadRequestException(`Invalid transition from ${currentStatus} to ${newStatus}`);
            }
        }
    }
    async delete(id) {
        const order = await this.findOne(id);
        if (order.status !== order_status_enum_1.OrderStatus.PENDING) {
            throw new common_1.BadRequestException('Can only delete orders in PENDING status');
        }
        await this.orderRepository.remove(order);
    }
};
exports.CrudOrderUseCase = CrudOrderUseCase;
exports.CrudOrderUseCase = CrudOrderUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItemEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(branch_entity_1.BranchEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(product_entity_1.ProductEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(inventory_entity_1.InventoryEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(ingredients_entity_1.IngredientsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CrudOrderUseCase);
//# sourceMappingURL=crud-order.use-case.js.map