"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatus = exports.OrderType = exports.OrderStatus = void 0;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDING"] = "pending";
    OrderStatus["EN_PROCESO"] = "en-proceso";
    OrderStatus["PREPARADO"] = "preparado";
    OrderStatus["ENVIADO"] = "enviado";
    OrderStatus["ENTREGADO"] = "entregado";
    OrderStatus["RECHAZADO"] = "rechazado";
    OrderStatus["FINALIZADO"] = "finalizado";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
var OrderType;
(function (OrderType) {
    OrderType["LOCAL"] = "local";
    OrderType["DELIVERY"] = "delivery";
})(OrderType || (exports.OrderType = OrderType = {}));
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["PENDING"] = "pending";
    PaymentStatus["COMPLETED"] = "completed";
    PaymentStatus["CANCELLED"] = "cancelled";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
//# sourceMappingURL=order-status.enum.js.map