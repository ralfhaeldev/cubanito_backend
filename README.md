# 🍔 Restaurant Manager — Backend

API REST construida con **NestJS** bajo **Arquitectura Hexagonal**, principios **SOLID** y **TypeORM**. Soporta multitenancy con base de datos separada por sede y comunicación en tiempo real mediante WebSockets.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| NestJS | 10+ | Framework principal |
| TypeScript | 5.x | Lenguaje base |
| TypeORM | 0.3.x | ORM y conexiones dinámicas |
| PostgreSQL | 15+ | Base de datos (maestra y tenants) |
| Socket.IO | 4.x | WebSockets en tiempo real |
| Passport + JWT | - | Autenticación y guards |
| class-validator | - | Validación de DTOs |

---

## 📁 Estructura del Proyecto

```
src/
├── core/                              # Dominio puro — sin dependencias de infraestructura
│   ├── domain/
│   │   ├── entities/                  # Entidades del negocio
│   │   │   ├── pedido.entity.ts
│   │   │   ├── producto.entity.ts
│   │   │   ├── caja.entity.ts
│   │   │   └── ...
│   │   ├── value-objects/             # Objetos de valor inmutables
│   │   │   ├── estado-pedido.vo.ts    # Pendiente | En Proceso | Enviado | Entregado | Finalizado | Rechazado
│   │   │   └── metodo-pago.vo.ts     # Efectivo | Transferencia
│   │   └── repositories/             # Interfaces (puertos de salida)
│   │       ├── pedido.repository.ts
│   │       ├── producto.repository.ts
│   │       └── ...
│   │
│   └── use-cases/                     # Lógica de negocio pura
│       ├── pedidos/
│       │   ├── crear-pedido.use-case.ts
│       │   ├── actualizar-estado.use-case.ts
│       │   └── finalizar-pedido.use-case.ts
│       ├── productos/
│       ├── caja/
│       │   ├── abrir-caja.use-case.ts
│       │   └── cerrar-caja.use-case.ts
│       ├── movimientos/
│       └── reportes/
│
├── infrastructure/
│   ├── database/
│   │   ├── master/                    # Conexión a BD maestra (sedes + super admin)
│   │   │   ├── master.datasource.ts
│   │   │   └── entities/
│   │   │       ├── sede.orm-entity.ts
│   │   │       └── super-admin.orm-entity.ts
│   │   └── tenant/                    # Resolución dinámica de BD por sede
│   │       ├── tenant.datasource.ts
│   │       └── tenant-connection.manager.ts
│   ├── repositories/                  # Implementaciones TypeORM de los puertos
│   │   ├── pedido.typeorm-repository.ts
│   │   └── ...
│   └── websockets/
│       └── pedidos.gateway.ts         # Gateway de Socket.IO segmentado por sede
│
├── application/
│   └── http/
│       ├── controllers/               # Controladores REST
│       │   ├── pedidos.controller.ts
│       │   ├── productos.controller.ts
│       │   ├── caja.controller.ts
│       │   └── ...
│       ├── dtos/                      # Data Transfer Objects con validaciones
│       └── guards/
│           ├── jwt-auth.guard.ts
│           ├── roles.guard.ts
│           └── tenant.guard.ts        # Verifica que el request pertenece al tenant correcto
│
└── shared/
    ├── tenant.middleware.ts           # Resuelve la BD del request a partir del JWT
    ├── decorators/
    │   └── roles.decorator.ts
    └── logger/
        └── audit-logger.service.ts    # Registro de acciones para trazabilidad
```

---

## 🗄️ Modelo de Bases de Datos

### BD Maestra (`restaurant_master`)

Almacena únicamente la configuración global del sistema.

```
sedes
  id, nombre, db_host, db_port, db_name, db_user, db_pass, activa, created_at

super_admin
  id, nombre, email, password_hash, created_at
```

### BD por Sede (`restaurant_sede_<id>`)

Cada sede tiene su instancia aislada con el siguiente esquema:

```
usuarios          → id, nombre, email, password_hash, rol, activo
productos         → id, nombre, precio_venta, precio_compra, activo
pedidos           → id, tipo [local|domicilio], estado, mesero_id, created_at, updated_at
pedido_items      → id, pedido_id, producto_id, cantidad, precio_unitario
clientes_domicilio→ id, pedido_id, nombre, telefono, direccion
pagos             → id, pedido_id, metodo [efectivo|transferencia], monto, vuelto, created_at
caja              → id, fecha, monto_inicial, monto_final, abierta_por, cerrada_por
movimientos       → id, caja_id, tipo [ingreso|egreso|gasto], monto, descripcion, created_at
logs              → id, usuario_id, accion, entidad, entidad_id, metadata, created_at
```

---

## 🔄 Flujo de Pedido y Transiciones de Estado

```
[Mesero]  Pendiente
              ↓
[Cocina]  En Proceso
              ↓         ↘
[Admin]   Entregado    Enviado (domicilio) ← [Domiciliario]
              ↓
[Admin]   Finalizado   ← Admin confirma pago y cierra el pedido
              
          Rechazado    ← Desde cualquier estado antes de Finalizado
```

> El **Admin de Sede** es el único con permiso para ejecutar `Entregado → Finalizado`.  
> Al finalizar, el pago queda registrado y el monto ingresa a la caja del día.

---

## ⚡ WebSockets — Gateway por Sede

El gateway de Socket.IO segmenta las conexiones por sede usando **rooms**.

| Evento emitido | Descripción | Destinatarios |
|---|---|---|
| `pedido:nuevo` | Se registró un pedido nuevo | Room cocina de la sede |
| `pedido:estado_actualizado` | Cambio de estado en un pedido | Room de la sede completo |
| `pedido:finalizado` | Pedido cobrado y cerrado | Room admin de la sede |

```typescript
// Ejemplo de emisión al room de cocina de una sede
this.server.to(`sede:${sedeId}:cocina`).emit('pedido:nuevo', pedidoDto);
```

---

## 🏛️ Arquitectura Hexagonal

```
┌──────────────────────────────────────┐
│            HTTP / WebSocket          │  ← Adaptadores de entrada
│         Controllers / Gateway        │
└────────────────┬─────────────────────┘
                 │ DTOs / Commands
┌────────────────▼─────────────────────┐
│           Use Cases (Core)           │  ← Lógica de negocio pura
│    crear-pedido / cerrar-caja / ...  │
└────────────────┬─────────────────────┘
                 │ Repository interfaces (ports)
┌────────────────▼─────────────────────┐
│     TypeORM Repositories (Infra)     │  ← Adaptadores de salida
│      tenant.datasource (dinámico)    │
└──────────────────────────────────────┘
```

Los **use cases** nunca importan nada de `infrastructure/`. Solo conocen las interfaces definidas en `core/domain/repositories/`.

---

## 🔐 Autenticación y Multitenancy

### Flujo de Login

1. El usuario envía credenciales + `sedeId` (o email para Super Admin)
2. El sistema resuelve si es Super Admin (BD maestra) o usuario de sede (BD tenant)
3. Se genera un JWT con payload: `{ userId, rol, sedeId }`
4. En cada request, `TenantMiddleware` extrae `sedeId` del JWT y establece la conexión dinámica a la BD correcta

### Conexión Dinámica por Tenant

```typescript
// tenant-connection.manager.ts
async getDataSource(sedeId: string): Promise<DataSource> {
  if (this.connections.has(sedeId)) return this.connections.get(sedeId);
  const sede = await this.masterRepo.findOne({ where: { id: sedeId } });
  const ds = new DataSource({ ...sede.dbConfig, entities: tenantEntities });
  await ds.initialize();
  this.connections.set(sedeId, ds);
  return ds;
}
```

---

## 🚀 Instalación y Ejecución

### Prerrequisitos

- Node.js >= 18
- npm >= 9
- PostgreSQL >= 15 (instancia local o remota)

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-org/restaurant-manager-backend.git
cd restaurant-manager-backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con las credenciales de la BD maestra

# 4. Ejecutar migraciones de la BD maestra
npm run migration:run:master

# 5. Ejecutar en desarrollo
npm run start:dev

# 6. Build de producción
npm run build && npm run start:prod
```

### Variables de entorno

```env
# BD Maestra
DB_MASTER_HOST=localhost
DB_MASTER_PORT=5432
DB_MASTER_NAME=restaurant_master
DB_MASTER_USER=postgres
DB_MASTER_PASS=secret

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=8h

# App
PORT=3000
NODE_ENV=development
```

---

## 🧪 Tests

```bash
# Tests unitarios (use cases y dominio)
npm run test

# Tests e2e
npm run test:e2e

# Cobertura
npm run test:cov
```

---

## 📋 Endpoints Principales

| Método | Ruta | Descripción | Roles |
|---|---|---|---|
| `POST` | `/auth/login` | Login por sede o Super Admin | Público |
| `GET` | `/pedidos` | Listar pedidos activos de la sede | Admin, Mesero, Cocina |
| `POST` | `/pedidos` | Crear nuevo pedido | Mesero |
| `PATCH` | `/pedidos/:id/estado` | Actualizar estado del pedido | Cocina, Domiciliario, Admin |
| `POST` | `/pedidos/:id/finalizar` | Finalizar y registrar pago | Admin |
| `GET` | `/productos` | Listar productos de la sede | Todos |
| `POST` | `/productos` | Crear producto | Admin |
| `POST` | `/caja/abrir` | Apertura de caja del día | Admin |
| `POST` | `/caja/cerrar` | Cierre de caja del día | Admin |
| `GET` | `/reportes/ventas` | Reporte de ventas por rango de fechas | Admin, Super Admin |

---

## 🔍 Trazabilidad & Logs

Todas las acciones relevantes quedan registradas en la tabla `logs` de cada sede:

- Creación y cambio de estado de pedidos
- Apertura y cierre de caja
- Modificaciones a productos
- Registros de pagos

El servicio `AuditLoggerService` se inyecta en cada use case que lo requiera y persiste el log de forma asíncrona sin afectar el flujo principal.

---

## 📌 Roadmap Backend

- [ ] Módulo de insumos y recetas por producto
- [ ] Descuento automático de inventario al procesar pedidos
- [ ] Asignación de domiciliario a pedidos específicos
- [ ] Reportes consolidados de eficiencia (tiempos por estado)
- [ ] Zona pública — API de menú sin autenticación