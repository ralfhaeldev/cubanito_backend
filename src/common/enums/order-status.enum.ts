export enum OrderStatus {
  PENDING = 'pendiente',
  EN_PROCESO = 'en_proceso',
  ENVIADO = 'enviado',
  ENTREGADO = 'entregado',
  RECHAZADO = 'rechazado',
  FINALIZADO = 'finalizado',
}

export enum OrderType {
  LOCAL = 'local',
  DOMICILIO = 'domicilio',
}

export enum PaymentMethod {
  EFECTIVO = 'efectivo',
  TRANSFERENCIA = 'transferencia',
}
