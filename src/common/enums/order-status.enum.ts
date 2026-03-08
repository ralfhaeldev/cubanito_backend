export enum OrderStatus {
  PENDING = 'pending',
  EN_PROCESO = 'en-proceso',
  PREPARADO = 'preparado',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
  RECHAZADO = 'rechazado',
  FINALIZADO = 'finalizado',
}

export enum OrderType {
  LOCAL = 'local',
  DELIVERY = 'delivery',
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}
