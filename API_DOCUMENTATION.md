# 📋 Documentación Completa - Sistema de Gestión de Restaurante

## 🎯 Estado General del Proyecto

✅ **Compilación:** Exitosa  
✅ **Módulos:** 11 módulos implementados  
✅ **Documentación:** Swagger configurado en `http://localhost:3000/api`  
✅ **Arquitectura:** Hexagonal + SOLID + Clean Code  
✅ **Stack:** NestJS + TypeORM + PostgreSQL

---

## 📦 Módulos Implementados

### 1. **AUTHENTICATION (Auth Module)**
**Propósito:** Gestión de usuarios, autenticación y autorización

**Funcionalidades:**
- ✅ Registro de usuarios
- ✅ Login con JWT
- ✅ Cambio de contraseña
- ✅ Gestión de roles

**Endpoints:**
```
POST   /api/auth/register         - Registrar usuario
POST   /api/auth/login            - Iniciar sesión
PATCH  /api/auth/change-password  - Cambiar contraseña (requiere JWT)
```

**Roles Disponibles:**
- `super-admin`: Acceso total al sistema
- `admin`: Gestiona su sede/sedes asignadas
- `mesero`: Toma pedidos y cambia a "en-proceso" y "preparado"
- `cocina`: Visualiza y procesa pedidos
- `domiciliario`: Entrega pedidos

---

### 2. **BRANCHES (Sedes Module)**
**Propósito:** Gestión multi-sede del restaurante

**Funcionalidades:**
- ✅ Crear sedes
- ✅ Listar sedes
- ✅ Actualizar información de sede
- ✅ Eliminar sedes (solo SUPER_ADMIN)
- ✅ Aislamiento de datos por sede

**Endpoints:**
```
POST   /api/branches              - Crear sede
GET    /api/branches              - Listar sedes
GET    /api/branches/:id          - Obtener sede específica
PATCH  /api/branches/:id          - Actualizar sede
DELETE /api/branches/:id          - Eliminar sede
```

**Control de Acceso:**
- POST, PATCH: Requiere `ADMIN` o `SUPER_ADMIN`
- DELETE: Requiere `SUPER_ADMIN`

---

### 3. **PRODUCTS (Productos Module)**
**Propósito:** Gestión de productos del menú

**Propiedades de Producto:**
- `id`: UUID único
- `title`: Nombre del producto (único)
- `description`: Descripción
- `sellingPrice`: Precio de venta (decimal)
- `type`: Tipo de producto → `simple` o `preparado`
- `status`: Estado → `active` o `inactive` (soft delete)
- `branchId`: Relacionado a una sede
- `ingredients`: Array de insumos (solo para tipo "preparado")

**Endpoints:**
```
POST   /api/product               - Crear producto
GET    /api/product               - Listar productos
GET    /api/product/:id           - Obtener producto
PATCH  /api/product/:id           - Actualizar producto
DELETE /api/product/:id           - Marcar como inactivo
```

---

### 4. **INVENTORY (Inventario Module)**
**Propósito:** Control de stock por sede

**Propiedades de Inventario:**
- `id`: UUID único
- `name`: Nombre del artículo
- `description`: Descripción
- `quantity`: Cantidad disponible
- `purchasePrice`: Precio de compra unitario
- `branchId`: Sede a la que pertenece

**Funcionalidades:**
- ✅ Crear artículos de inventario
- ✅ Actualizar cantidad
- ✅ Ajuste automático al finalizar pedidos
- ✅ Validación de cantidad insuficiente

**Endpoints:**
```
POST   /api/inventory                    - Crear artículo
GET    /api/inventory                    - Listar inventario
GET    /api/inventory/branch/:branchId   - Inventario por sede
GET    /api/inventory/:id                - Obtener artículo
PATCH  /api/inventory/:id                - Actualizar artículo
PATCH  /api/inventory/:id/adjust         - Ajustar cantidad
DELETE /api/inventory/:id                - Eliminar artículo
```

---

### 5. **INGREDIENTS (Insumos/Recetas Module)**
**Propósito:** Vincular ingredientes con productos preparados

**Propiedades:**
- `id`: UUID único
- `productId`: Producto preparado
- `inventoryItemId`: Insumo del inventario
- `quantity`: Cantidad de insumo necesaria

**Flujo:**
- Producto simple → Sin ingredientes (es un insumo en sí)
- Producto preparado → Contiene múltiples ingredientes

**Endpoints:**
```
POST   /api/ingredients                        - Crear ingrediente
GET    /api/ingredients/product/:productId     - Ingredientes de producto
GET    /api/ingredients/:id                    - Obtener ingrediente
PATCH  /api/ingredients/:id                    - Actualizar ingrediente
DELETE /api/ingredients/:id                    - Eliminar ingrediente
```

---

### 6. **ORDERS (Pedidos Module)**
**Propósito:** Gestión completa del ciclo de vida de pedidos

**Estados de Pedido:**
```
PENDING (Pendiente)
  ↓
EN_PROCESO (En preparación)
  ↓
PREPARADO (Listo)
  ├─ ENVIADO (Solo delivery)
  │   ↓
  └─ ENTREGADO
      ↓
      FINALIZADO (Completado)

O en cualquier momento: RECHAZADO
```

**Flujo de Cambio de Estado por Rol:**

| Rol | Puede Cambiar a |
|-----|-----------------|
| MESERO | EN_PROCESO, PREPARADO |
| COCINA | EN_PROCESO |
| DOMICILIARIO | ENTREGADO, RECHAZADO (desde ENVIADO) |
| ADMIN/SUPER_ADMIN | Transiciones normales |

**Propiedades del Orden:**
- `id`: UUID
- `branchId`: Sede del pedido
- `type`: LOCAL o DELIVERY
- `status`: Estado actual
- `createdByUserId`: Usuario que creó el pedido
- `lastStatusChangedByUserId`: Último usuario que cambió estado
- `totalAmount`: Total de venta
- `realCost`: Costo real (calculado)
- `realMargin`: Margen real(venta - costo)
- `items`: Array de artículos del pedido

**Endpoints:**
```
POST   /api/orders                    - Crear pedido
GET    /api/orders                    - Listar pedidos
GET    /api/orders/:id                - Obtener pedido
PATCH  /api/orders/:id/status         - Cambiar estado
DELETE /api/orders/:id                - Eliminar (solo si PENDING)
```

**Lógica de Descuento de Inventario (al FINALIZAR):**
- **Producto Simple:** Descuenta 1 unidad × cantidad pedida
- **Producto Preparado:** Descuenta cada ingrediente × cantidad pedida
  - Ejemplo: Cubanito (2 panes + 1 relleno) con cantidad 5
  - Resultado: 10 panes, 5 rellenos se descuentan
- **Cálculo de Costo Real:**
  - Costo = Suma de (ingrediente.cantidad × ingrediente.purchasePrice)
  - Margen = Total Venta - Costo Real

---

### 7. **REPORTS (Reportes Module)**
**Propósito:** Análisis y reportes de la operación

**Tipos de Reportes:**
1. **Reporte de Ventas** - Ingresos, costos y márgenes
2. **Reporte de Estados de Órdenes** - Cantidad por estado
3. **Reporte de Productos** - Productos más vendidos

**Períodos Disponibles:**
- `daily`: Día actual (00:00 a 23:59)
- `weekly`: Semana actual (lunes a domingo)
- `monthly`: Mes actual

**Endpoints:**
```
GET /api/reports/sales                  - Reporte de ventas
GET /api/reports/order-status           - Reporte de estados
GET /api/reports/product-performance    - Reporte de productos
```

**Parámetros Query:**
```
period: daily|weekly|monthly (requerido)
branchId: UUID (opcional - filtra por sede)
startDate: ISO date (opcional - override período)
endDate: ISO date (opcional - override período)
```

**Respuesta ejemplo:**
```json
{
  "period": "daily",
  "totalSales": 500.5,
  "totalOrders": 15,
  "totalCost": 250.25,
  "totalMargin": 250.25,
  "marginPercentage": 50,
  "averageOrderValue": 33.37,
  "topProducts": [
    { "name": "Cubanito", "quantity": 30, "sales": 300 }
  ]
}
```

---

## 🔄 Flujo Completo de Un Pedido

### Escenario: Pedido Local

**1. MESERO - Crear Pedido**
```
POST /api/orders
{
  "branchId": "uuid-sede",
  "type": "local",
  "items": [
    { "productId": "uuid-cubanito", "quantity": 2, "unitPrice": 5.50 },
    { "productId": "uuid-gaseosa", "quantity": 2, "unitPrice": 2.50 }
  ]
}
```
→ Estado: PENDING
→ Usuario: Mesero (automático)

**2. MESERO - Cambiar a En Proceso**
```
PATCH /api/orders/:id/status
{
  "status": "en-proceso",
  "notes": "Cliente en mesa 5"
}
```

**3. COCINA - Recibe Notificación**
- Ve el pedido en estado EN_PROCESO
- Prepara los productos

**4. ADMIN - Marcar como Preparado**
```
PATCH /api/orders/:id/status
{
  "status": "preparado"
}
```

**5. MESERO - Sirve el Pedido**
```
PATCH /api/orders/:id/status
{
  "status": "entregado"
}
```

**6. ADMIN - Finalizar Pedido**
```
PATCH /api/orders/:id/status
{
  "status": "finalizado"
}
```
→ **Aquí se aplica la lógica de descuento de inventario**
→ Se calcula costo real y margen
→ Datos disponibles para reportes

---

### Escenario: Pedido Delivery

**1-3. Igual que orden local**

**4. ADMIN - Marcar como Enviado**
```
PATCH /api/orders/:id/status
{
  "status": "enviado"
}
```
→ Nota: Solo disponible para tipo DELIVERY

**5. DOMICILIARIO - Entrega o Rechaza**
```
PATCH /api/orders/:id/status
{
  "status": "entregado"  // o "rechazado"
}
```

**6. ADMIN - Finalizar**
```
PATCH /api/orders/:id/status
{
  "status": "finalizado"
}
```
→ Se aplica descuento de inventario

---

## 🔐 Autorización y Permisos

### Matriz de Permisos

| Recurso | SUPER_ADMIN | ADMIN | MESERO | COCINA | DOMICILIARIO |
|---------|-------------|-------|--------|--------|--------------|
| Crear producto | ✅ | ✅ | ❌ | ❌ | ❌ |
| Crear ingrediente | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestionar inventario | ✅ | ✅ | ❌ | ✅* | ❌ |
| Crear pedido | ✅ | ✅ | ✅ | ❌ | ❌ |
| Ver pedidos | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cambiar estado | ✅ | ✅ | Parcial¹ | Parcial² | Parcial³ |
| Ver reportes | ✅ | ✅ | ❌ | ❌ | ❌ |
| Gestionar sedes | ✅ | ✅ | ❌ | ❌ | ❌ |
| Eliminar sedes | ✅ | ❌ | ❌ | ❌ | ❌ |

**Notas:**
- *COCINA: Solo ajustar cantidad
- ¹MESERO: Solo → EN_PROCESO, PREPARADO
- ²COCINA: Solo → EN_PROCESO
- ³DOMICILIARIO: Solo → ENTREGADO, RECHAZADO

---

## 🔑 Autenticación

**JWT Token:**
- Valido por: 2 horas
- Se envía en el header: `Authorization: Bearer <token>`
- Se obtiene en login/register

**Proceso:**
```
1. POST /api/auth/register o /api/auth/login
2. Recibe { user: {...}, token: "jwt-token" }
3. Usa el token en todos los requests: Headers: { Authorization: "Bearer jwt-token" }
4. Al vencer → PATCH /api/auth/change-password o login nuevamente
```

---

## 📊 Cálculos Clave

### Ejemplo: Pedido con Producto Preparado

**Productos:**
- Cubanito (preparado): Precio venta $6
  - Ingredientes: Pan (₵0.50 c/u), Relleno (₵1 c/u), Salsa (₵0.25 c/u)
- Gaseosa (simple): Precio venta $2, Costo ₵1

**Pedido:**
- 2 Cubanitos + 2 Gaseosas = Total venta $16

**Cálculo de Costo Real:**
- Cubanitos: 2 × (0.50 + 1 + 0.25) = 2 × 1.75 = $3.50
- Gaseosas: 2 × 1 = $2
- **Costo Total Real: $5.50**

**Margen Real:**
- $16 - $5.50 = **$10.50**
- Porcentaje: 10.50/16 × 100 = **65.625%**

---

## 🚀 Endpoints Disponibles (Resumen)

```
AUTHENTICATION
POST   /api/auth/register
POST   /api/auth/login
PATCH  /api/auth/change-password

BRANCHES
POST   /api/branches
GET    /api/branches
GET    /api/branches/:id
PATCH  /api/branches/:id
DELETE /api/branches/:id

PRODUCTS
POST   /api/product
GET    /api/product
GET    /api/product/:id
PATCH  /api/product/:id
DELETE /api/product/:id

INVENTORY
POST   /api/inventory
GET    /api/inventory
GET    /api/inventory/branch/:branchId
GET    /api/inventory/:id
PATCH  /api/inventory/:id
PATCH  /api/inventory/:id/adjust
DELETE /api/inventory/:id

INGREDIENTS
POST   /api/ingredients
GET    /api/ingredients/product/:productId
GET    /api/ingredients/:id
PATCH  /api/ingredients/:id
DELETE /api/ingredients/:id

ORDERS
POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
PATCH  /api/orders/:id/status
DELETE /api/orders/:id

REPORTS
GET    /api/reports/sales
GET    /api/reports/order-status
GET    /api/reports/product-performance
```

---

## 📖 Acceder a Swagger

**URL:** `http://localhost:3000/api`

Una vez que accedas a Swagger UI:
1. Haz clic en "Authorize" (botón arriba a la derecha)
2. Pega tu JWT token
3. Prueba los endpoints interactivamente

---

## ✅ Validaciones Implementadas

### Productos
- ✅ Nombre único
- ✅ Tipo válido (simple/preparado)
- ✅ Estado válido (active/inactive)
- ✅ Precio positivo

### Inventario
- ✅ Cantidad no negativa
- ✅ Precio de compra positivo
- ✅ Sede debe existir
- ✅ No puede tener menos que cero upon ajuste

### Órdenes
- ✅ Tipo válido (local/delivery)
- ✅ Estado válido
- ✅ Transiciones permitidas por rol
- ✅ Producto debe existir
- ✅ Cantidad suficiente en inventario al finalizar

### Ingredientes
- ✅ Producto debe existir
- ✅ Insumo debe existir
- ✅ Cantidad positiva

---

## 🎯 Flujos Comunes

### Crear una Orden Completa

```bash
# 1. Crear pedido
curl -X POST http://localhost:3000/api/orders \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "branch-id",
    "type": "local",
    "items": [{
      "productId": "product-id",
      "quantity": 2,
      "unitPrice": 5.50
    }]
  }'

# 2. Cambiar a en proceso
curl -X PATCH http://localhost:3000/api/orders/:id/status \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "en-proceso"
  }'

# 3. Cambiar a preparado
curl -X PATCH http://localhost:3000/api/orders/:id/status \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "preparado"
  }'

# 4. Cambiar a entregado
curl -X PATCH http://localhost:3000/api/orders/:id/status \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "entregado"
  }'

# 5. Finalizar (aplica descuentos)
curl -X PATCH http://localhost:3000/api/orders/:id/status \
  -H "Authorization: Bearer JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "finalizado"
  }'

# 6. Obtener reporte del día
curl -X GET 'http://localhost:3000/api/reports/sales?period=daily' \
  -H "Authorization: Bearer JWT_TOKEN"
```

---

## 📝 Notas Finales

- ✅ La aplicación compila exitosamente
- ✅ Toda la lógica de negocio está implementada
- ✅ Swagger documenta todos los endpoints
- ✅ Las validaciones de rol están activas
- ✅ El descuento de inventario es automático al finalizar
- ✅ Los reportes están disponibles para análisis
- ✅ El cambio de contraseña está funcional
- ✅ Multi-sede está completamente soportada

---

**Generado:** 8 de marzo de 2026  
**Versión:** 1.0  
**Estado:** ✅ Producción Lista
