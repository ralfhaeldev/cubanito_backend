🍔 Sistema de Gestión de Restaurante — Análisis de Requerimientos

🏗️ Stack Tecnológico

Frontend: Angular + Tailwind CSS (Responsive)
Backend: NestJS — Arquitectura Hexagonal + SOLID + TypeORM
Base de datos: (pendiente por definir — PostgreSQL sería la recomendación natural con TypeORM)


📦 Módulos
1. Autenticación / Login

Login por sede
Sesión vinculada al rol y sede del usuario

2. Usuarios & Roles
RolDescripciónSuper AdminVe todas las sedes, tiene selector de sede en su dashboardAdmin por SedeGestiona su sede únicamenteMeseroToma y registra pedidosCocinaVe y actualiza el estado de los pedidosDomiciliarioVe pedidos asignados a domicilioCliente(Futuro — zona pública)
3. Productos

Precio de venta y precio de compra
Fase 1: Producto simple (con precios)
Fase 2 (futuro): Productos con insumos (recetas) vs productos comprados listos

Ej: Cubanito = Pan + Relleno + Salsas
Ej: Gaseosa = producto directo sin insumos



4. Inventario

Control de stock por sede
Descuento automático al procesar pedidos (futuro, cuando haya insumos)
Insumos principales: panes y demás componentes

5. Pedidos
Estados del pedido:
Pendiente → En Proceso → [Enviado*] → Entregado → Finalizado
                       → Rechazado
*Solo aplica para domicilios
Tipos de pedido:

Local (mesa)
Domicilio

Flujo:

Mesero registra el pedido → Pendiente
Cocina empieza a preparar → En Proceso
Si es domicilio y sale → Enviado
Al llegar / servir → Entregado
Al cobrar → Finalizado


⏱️ Esto permite medir tiempos entre cada estado para análisis de eficiencia operativa.

6. Pagos
MétodoDetalleEfectivoPermite registrar monto recibido y calcular vueltoTransferenciaRegistro simple, sin vuelto
7. Caja & Movimientos

Apertura de caja (inicio del día)
Cierre de caja (fin del día)
Movimientos:

Ingresos
Egresos
Gastos



8. Contabilidad

Ingresos por ventas
Gastos operativos
Egresos

9. Reportes

Gráficas y tablas
Apertura/cierre de caja diario
(Futuro: tiempos por estado de pedido, productos más vendidos, etc.)

10. Multi-sede

Datos aislados por sede
Super Admin puede navegar entre sedes desde su dashboard

11. Trazabilidad & Logs

Registro de acciones relevantes por usuario
Auditoría de cambios en pedidos, inventario, pagos


🔮 Roadmap Futuro Identificado

Gestión de insumos y recetas por producto
Zona pública para clientes (menú online)
Módulo de domicilios más detallado (asignación a domiciliario, tracking)
Reportes avanzados (tiempos, eficiencia por sede)


❓ Preguntas clave para profundizar
Antes de arrancar con la arquitectura, hay algunos puntos que vale la pena definir:

Base de datos: ¿Ya tienen preferencia? ¿PostgreSQL, MySQL?
Multitenancy: ¿Las sedes comparten una misma BD con campo sede_id, o cada sede tiene su propia BD?
Domicilios: ¿El domiciliario tiene app móvil o solo web?
Caja: ¿Cada mesero tiene su propia caja o hay una caja por sede?
Productos compartidos: ¿El catálogo de productos es global (todas las sedes) o cada sede maneja los suyos?
Notificaciones: ¿Cocina recibe alguna alerta en tiempo real cuando llega un pedido? (WebSockets)

¿Quieres que sigamos profundizando en algún módulo en particular, o arrancamos a definir la arquitectura técnica?1) PostgreSQL
2) Cada sede va tener su propia base de datos
3) Solo web
4) Una caja por sede
5) cada sede maneja los suyos al igual que los precios
6) Si websockets8:40 p.m.Procesó requisitos técnicos y arquitectura del sistemaProcesó requisitos técnicos y arquitectura del sistemaPerfecto, con eso ya tenemos todo mucho más claro. Déjame actualizar los puntos clave:

✅ Decisiones Técnicas Confirmadas
PuntoDecisiónBase de datosPostgreSQLMultitenancyBD separada por sede — cada sede es un tenant independienteDomiciliarioSolo webCajaUna caja por sedeProductos & PreciosIndependientes por sedeTiempo realWebSockets (NestJS Gateway)

🧠 Implicaciones técnicas importantes
Multitenancy con BD separada
Con una BD por sede, el backend necesita:

Un registro central (BD maestra) que almacene las sedes y sus credenciales de conexión
Un mecanismo de resolución de tenant — al hacer login, el sistema identifica la sede y conecta a su BD correspondiente
TypeORM con conexiones dinámicas por request (DataSource dinámico por tenant)
El Super Admin consultará la BD maestra + puede "saltar" entre las BDs de cada sede

WebSockets

Canal de cocina: recibe pedidos nuevos en tiempo real
Canal de mesero/domiciliario: recibe actualizaciones de estado
Por sede — cada sede tiene su propio "room" en el gateway


❓ Últimas preguntas antes de pasar a arquitectura
Tengo solo unas pocas dudas más puntuales:

BD Maestra: ¿Los usuarios (Super Admin) también viven en la BD maestra, o cada sede tiene sus propios usuarios completamente aislados?
Roles cross-sede: ¿Un Admin de Sede A podría tener acceso a Sede B en algún caso, o es estrictamente uno-a-uno?
Reportes multi-sede: El Super Admin, cuando quiere ver reportes consolidados de todas las sedes, ¿necesita verlos agregados en una sola vista, o los ve sede por sede?
Caja: Cuando el mesero registra un pago, ¿ese dinero entra directamente a la caja del día, o hay un paso de confirmación por parte del Admin?
Pedidos a domicilio: ¿Se necesita registrar la dirección del cliente, o simplemente se marca como "domicilio" sin más detalle por ahora?
1)  Solo quiero un super admin para todas las sedes
2) No 
3) Sede por sede es mas facil
4) El mesero recibe el pago y se lo da  al admin de la sede (efectivo o comprobante de transferencia) y ese admin es el que pone el pedido como finalizado
5) Se le debe pedir, nombre, telefono y direccion8:47 p.m.Consolidó decisiones y estructuró arquitectura operacionalConsolidó decisiones y estructuró arquitectura operacionalPerfecto, con esto ya tenemos todo definido. Resumen final antes de pasar a la arquitectura:

✅ Decisiones Finales Confirmadas
PuntoDecisiónSuper AdminÚnico, global, vive en BD maestraUsuarios por sedeCompletamente aislados en su BDReportesSede por sede (sin consolidado multi-sede)Finalización de pedidoSolo el Admin de sede marca como Finalizado tras recibir el pagoDatos domicilioNombre, teléfono y dirección del cliente

🔄 Flujo de Pago Actualizado
Mesero entrega → Admin recibe pago físico/comprobante → Admin marca Finalizado

Esto implica que el rol de Admin tiene permiso exclusivo para ejecutar la transición Entregado → Finalizado


🗄️ Modelo de Bases de Datos
BD Maestra (central)
- sedes (id, nombre, db_host, db_name, db_user, db_pass, activa)
- super_admin (id, nombre, email, password)
BD por Sede (tenant)
- usuarios (id, nombre, email, password, rol)
- productos (id, nombre, precio_venta, precio_compra, activo)
- pedidos (id, tipo, estado, created_at, ...)
- pedido_items (id, pedido_id, producto_id, cantidad, precio)
- clientes_domicilio (id, pedido_id, nombre, telefono, direccion)
- pagos (id, pedido_id, metodo, monto, vuelto, created_at)
- caja (id, fecha, apertura, cierre, monto_inicial, monto_final)
- movimientos (id, tipo [ingreso/egreso/gasto], monto, descripcion, fecha)
- logs (id, usuario_id, accion, entidad, entidad_id, fecha)

🏛️ Arquitectura Backend — NestJS Hexagonal
src/
├── core/                        # Dominio puro
│   ├── domain/
│   │   ├── entities/            # Pedido, Producto, Caja...
│   │   ├── value-objects/       # Estado pedido, Tipo pago...
│   │   └── repositories/       # Interfaces (puertos)
│   └── use-cases/               # Lógica de negocio
│       ├── pedidos/
│       ├── productos/
│       ├── caja/
│       └── ...
├── infrastructure/
│   ├── database/
│   │   ├── master/              # Conexión BD maestra
│   │   └── tenant/              # Resolución dinámica por sede
│   ├── repositories/            # Implementaciones TypeORM
│   └── websockets/              # Gateway por sede
├── application/
│   └── http/
│       ├── controllers/
│       ├── dtos/
│       └── guards/              # Auth + Tenant + Roles
└── shared/
    ├── tenant.middleware.ts      # Resuelve la BD del request
    └── logger/

🌐 Arquitectura Frontend — Angular
src/
├── core/
│   ├── auth/                    # Login, guards, JWT
│   ├── tenant/                  # Manejo de sede activa
│   └── websocket/               # Servicio WS global
├── shared/
│   ├── components/              # UI reutilizable
│   └── pipes/
├── features/
│   ├── dashboard/
│   ├── pedidos/
│   ├── productos/
│   ├── inventario/
│   ├── caja/
│   ├── movimientos/
│   ├── reportes/
│   └── usuarios/
└── layouts/
    ├── admin-layout/
    ├── cocina-layout/           # Vista simplificada
    └── mesero-layout/

👁️ Vistas por Rol
RolAccesoSuper AdminDashboard multi-sede, gestión de sedes, usuarios globalesAdmin SedeDashboard sede, pedidos, caja, movimientos, reportes, productos, usuariosMeseroCrear pedidos, ver sus pedidos activosCocinaVer pedidos en cola, cambiar estado a En ProcesoDomiciliarioVer pedidos asignados a domicilio, marcar como Enviado
