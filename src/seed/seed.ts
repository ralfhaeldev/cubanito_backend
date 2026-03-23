/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SEED — Cubanito Backend
 * ─────────────────────────────────────────────────────────────────────────────
 * Inicializa la base de datos con datos equivalentes a los mocks del frontend.
 *
 * Uso:
 *   npx ts-node -r tsconfig-paths/register src/seed/seed.ts
 *
 * Requiere que las variables de entorno estén disponibles (.env).
 * Borra y recrea todos los datos en cada ejecución (idempotente).
 * ─────────────────────────────────────────────────────────────────────────────
 */

import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';

// ── Entities ─────────────────────────────────────────────────────────────────
import { BranchEntity } from '../branches/domain/entities/branch.entity';
import { UserEntity } from '../auth/domain/entities/user.entity';
import { InventoryEntity } from '../inventory/domain/entities/inventory.entity';
import { InventoryAdjustmentEntity } from '../inventory/domain/entities/inventory-adjustment.entity';
import { ProductEntity } from '../products/domain/entities/product.entity';
import { IngredientsEntity } from '../ingredients/domain/entities/ingredients.entity';
import { OrderEntity } from '../orders/domain/entities/order.entity';
import { OrderItemEntity } from '../orders/domain/entities/order-item.entity';
import { CashboxEntity } from '../cashbox/domain/entities/cashbox.entity';
import { MovementEntity } from '../cashbox/domain/entities/movement.entity';

// ── Enums ─────────────────────────────────────────────────────────────────────
import { Role } from '../common/enums/roles.enum';
import { ProductType, ProductStatus } from '../common/enums/product-status.enum';
import { OrderStatus, OrderType } from '../common/enums/order-status.enum';

// ─────────────────────────────────────────────────────────────────────────────
// DataSource
// ─────────────────────────────────────────────────────────────────────────────

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: +(process.env.DB_PORT ?? 5432),
  database: process.env.DB_NAME ?? 'cubanitos',
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  synchronize: true,
  entities: [
    BranchEntity,
    UserEntity,
    InventoryEntity,
    InventoryAdjustmentEntity,
    ProductEntity,
    IngredientsEntity,
    OrderEntity,
    OrderItemEntity,
    CashboxEntity,
    MovementEntity,
  ],
});

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const daysAgo = (n: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
};

const minutesAgo = (n: number): Date => {
  return new Date(Date.now() - n * 60000);
};

// ─────────────────────────────────────────────────────────────────────────────
// Main seed
// ─────────────────────────────────────────────────────────────────────────────

async function seed() {
  console.log('🌱 Conectando a la base de datos...');
  await AppDataSource.initialize();
  console.log('✅ Conexión establecida.\n');

  const branchRepo = AppDataSource.getRepository(BranchEntity);
  const userRepo = AppDataSource.getRepository(UserEntity);
  const inventoryRepo = AppDataSource.getRepository(InventoryEntity);
  const adjustmentRepo = AppDataSource.getRepository(InventoryAdjustmentEntity);
  const productRepo = AppDataSource.getRepository(ProductEntity);
  const ingredientRepo = AppDataSource.getRepository(IngredientsEntity);
  const orderRepo = AppDataSource.getRepository(OrderEntity);
  const orderItemRepo = AppDataSource.getRepository(OrderItemEntity);
  const cajaRepo = AppDataSource.getRepository(CashboxEntity);
  const movimientoRepo = AppDataSource.getRepository(MovementEntity);

  // ── 1. Limpiar datos existentes (en orden correcto por FK) ──────────────────
  console.log('🗑️  Limpiando datos existentes...');
  await AppDataSource.query('TRUNCATE TABLE movement, cashbox, order_items, orders, ingredients, inventory_adjustments, products, inventory, users, branches RESTART IDENTITY CASCADE');
  console.log('✅ Datos eliminados.\n');

  // ── 2. Sedes (Branches) ───────────────────────────────────────────────────
  console.log('🏢 Creando sedes...');
  const [sedeCentro, sedeNorte, sedeSur] = await branchRepo.save([
    branchRepo.create({ name: 'Sede Centro', address: 'Cra 10 #15-20', phone: '6012345678', isActive: true }),
    branchRepo.create({ name: 'Sede Norte', address: 'Av 68 #92-15', phone: '6019876543', isActive: true }),
    branchRepo.create({ name: 'Sede Sur', address: 'Cll 40Sur #50-10', phone: '6015551234', isActive: false }),
  ]);
  console.log(`  ✅ ${sedeCentro.name}, ${sedeNorte.name}, ${sedeSur.name}\n`);

  // ── 3. Usuarios ───────────────────────────────────────────────────────────
  console.log('👤 Creando usuarios...');
  const hashPwd = (pwd: string) => bcrypt.hashSync(pwd, 10);

  const [, adminUser, meseroUser, cocinaUser, domUser] = await userRepo.save([
    userRepo.create({
      email: 'superadmin@test.com',
      pawssowrd: hashPwd('1234'),
      fullName: 'Carlos Super',
      roles: [Role.SUPER_ADMIN],
      isActive: true,
      branchId: null,
    }),
    userRepo.create({
      email: 'admin@sede1.com',
      pawssowrd: hashPwd('1234'),
      fullName: 'Ana Admin',
      roles: [Role.ADMIN],
      isActive: true,
      branchId: sedeCentro.id,
    }),
    userRepo.create({
      email: 'mesero@sede1.com',
      pawssowrd: hashPwd('1234'),
      fullName: 'Pedro Mesero',
      roles: [Role.MESERO],
      isActive: true,
      branchId: sedeCentro.id,
    }),
    userRepo.create({
      email: 'cocina@sede1.com',
      pawssowrd: hashPwd('1234'),
      fullName: 'Luis Cocina',
      roles: [Role.COCINA],
      isActive: true,
      branchId: sedeCentro.id,
    }),
    userRepo.create({
      email: 'domiciliario@sede1.com',
      pawssowrd: hashPwd('1234'),
      fullName: 'Mario Domicilio',
      roles: [Role.DOMICILIARIO],
      isActive: true,
      branchId: sedeCentro.id,
    }),
  ]);
  console.log('  ✅ 5 usuarios creados (password: 1234)\n');

  // ── 4. Inventario ─────────────────────────────────────────────────────────
  console.log('📦 Creando inventario...');
  const inventoryItems = await inventoryRepo.save([
    // Panadería
    inventoryRepo.create({ name: 'Pan de hamburguesa', unit: 'und', quantity: 45, minQuantity: 20, idealQuantity: 100, purchasePrice: 500, category: 'Panadería', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Pan de perro', unit: 'und', quantity: 8, minQuantity: 15, idealQuantity: 60, purchasePrice: 400, category: 'Panadería', branchId: sedeCentro.id }),
    // Carnes
    inventoryRepo.create({ name: 'Carne molida', unit: 'kg', quantity: 4.5, minQuantity: 3, idealQuantity: 10, purchasePrice: 18000, category: 'Carnes', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Pollo desmechado', unit: 'kg', quantity: 1.2, minQuantity: 2, idealQuantity: 8, purchasePrice: 15000, category: 'Carnes', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Jamón serrano', unit: 'kg', quantity: 2.8, minQuantity: 1, idealQuantity: 5, purchasePrice: 35000, category: 'Carnes', branchId: sedeCentro.id }),
    // Lácteos
    inventoryRepo.create({ name: 'Queso mozzarella', unit: 'kg', quantity: 3.2, minQuantity: 2, idealQuantity: 6, purchasePrice: 22000, category: 'Lácteos', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Queso cheddar', unit: 'kg', quantity: 0.8, minQuantity: 1, idealQuantity: 4, purchasePrice: 28000, category: 'Lácteos', branchId: sedeCentro.id }),
    // Salsas
    inventoryRepo.create({ name: 'Mayonesa', unit: 'lt', quantity: 2.5, minQuantity: 1, idealQuantity: 5, purchasePrice: 8000, category: 'Salsas', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Salsa BBQ', unit: 'lt', quantity: 0.4, minQuantity: 0.5, idealQuantity: 3, purchasePrice: 12000, category: 'Salsas', branchId: sedeCentro.id }),
    // Verduras
    inventoryRepo.create({ name: 'Lechuga', unit: 'und', quantity: 12, minQuantity: 5, idealQuantity: 20, purchasePrice: 2000, category: 'Verduras', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Tomate', unit: 'kg', quantity: 2.1, minQuantity: 1, idealQuantity: 4, purchasePrice: 3500, category: 'Verduras', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Cebolla caramelizada', unit: 'kg', quantity: 0.3, minQuantity: 0.5, idealQuantity: 2, purchasePrice: 5000, category: 'Verduras', branchId: sedeCentro.id }),
    // Bebidas — nombres exactos = títulos de productos simples (para deducción de inventario)
    inventoryRepo.create({ name: 'Gaseosa', description: 'Gaseosa 350ml', unit: 'und', quantity: 24, minQuantity: 12, idealQuantity: 48, purchasePrice: 1500, category: 'Bebidas', branchId: sedeCentro.id }),
    inventoryRepo.create({ name: 'Agua', description: 'Agua 500ml', unit: 'und', quantity: 6, minQuantity: 10, idealQuantity: 36, purchasePrice: 800, category: 'Bebidas', branchId: sedeCentro.id }),
    // Tubérculos
    inventoryRepo.create({ name: 'Papa criolla', unit: 'kg', quantity: 5.5, minQuantity: 3, idealQuantity: 10, purchasePrice: 3000, category: 'Tubérculos', branchId: sedeCentro.id }),
  ]);
  // Destructurar en variables con nombre
  const [
    panHamburguesa, ,
    carneMolida, , jamonSerrano,
    quesoMozzarella, quesoCheddar,
    mayonesa, salsaBbq,
    lechuga, tomate, cebollaCaramelizada,
    , ,
    papaCriolla,
  ] = inventoryItems;

  console.log('  ✅ 15 ítems de inventario creados\n');

  // Ajustes históricos de inventario
  await adjustmentRepo.save([
    adjustmentRepo.create({ inventoryItemId: panHamburguesa.id, type: 'entrada', quantity: 50, reason: 'Compra proveedor panadería', createdByName: 'Ana Admin' }),
    adjustmentRepo.create({ inventoryItemId: carneMolida.id, type: 'salida', quantity: 2.5, reason: 'Uso en producción del día', createdByName: 'Ana Admin' }),
    adjustmentRepo.create({ inventoryItemId: salsaBbq.id, type: 'ajuste', quantity: 0.4, reason: 'Conteo físico de inventario', createdByName: 'Ana Admin' }),
  ]);

  // ── 5. Productos ──────────────────────────────────────────────────────────
  console.log('🍔 Creando productos...');
  const [cubanito, cubanitoespecial, cubanitoBbq, papaFrancesa, gaseosaP, aguaP] = await productRepo.save([
    productRepo.create({ title: 'Cubanito Clásico', description: 'Cubanito tradicional con carne, queso, lechuga y tomate', sellingPrice: 12000, type: ProductType.PREPARADO, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
    productRepo.create({ title: 'Cubanito Especial', description: 'Con jamón serrano, queso cheddar y cebolla caramelizada', sellingPrice: 15000, type: ProductType.PREPARADO, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
    productRepo.create({ title: 'Cubanito BBQ', description: 'Con salsa BBQ ahumada', sellingPrice: 14000, type: ProductType.PREPARADO, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
    productRepo.create({ title: 'Papa Francesa', description: 'Papas criollas fritas en aceite vegetal', sellingPrice: 6000, type: ProductType.PREPARADO, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
    productRepo.create({ title: 'Gaseosa', description: 'Gaseosa 350ml fría', sellingPrice: 3000, type: ProductType.SIMPLE, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
    productRepo.create({ title: 'Agua', description: 'Agua mineral 500ml', sellingPrice: 2000, type: ProductType.SIMPLE, status: ProductStatus.ACTIVE, branchId: sedeCentro.id }),
  ]);
  console.log('  ✅ 6 productos creados\n');

  // ── 6. Ingredientes (recetas para productos preparados) ───────────────────
  console.log('🧪 Creando ingredientes (recetas)...');
  await ingredientRepo.save([
    // Cubanito Clásico
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: panHamburguesa.id, quantity: 1 }),
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: carneMolida.id, quantity: 0.12 }),
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: quesoMozzarella.id, quantity: 0.04 }),
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: mayonesa.id, quantity: 0.02 }),
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: lechuga.id, quantity: 0.25 }),
    ingredientRepo.create({ productId: cubanito.id, inventoryItemId: tomate.id, quantity: 0.05 }),
    // Cubanito Especial
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: panHamburguesa.id, quantity: 1 }),
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: carneMolida.id, quantity: 0.15 }),
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: jamonSerrano.id, quantity: 0.05 }),
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: quesoCheddar.id, quantity: 0.05 }),
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: mayonesa.id, quantity: 0.02 }),
    ingredientRepo.create({ productId: cubanitoespecial.id, inventoryItemId: cebollaCaramelizada.id, quantity: 0.03 }),
    // Cubanito BBQ
    ingredientRepo.create({ productId: cubanitoBbq.id, inventoryItemId: panHamburguesa.id, quantity: 1 }),
    ingredientRepo.create({ productId: cubanitoBbq.id, inventoryItemId: carneMolida.id, quantity: 0.15 }),
    ingredientRepo.create({ productId: cubanitoBbq.id, inventoryItemId: quesoMozzarella.id, quantity: 0.04 }),
    ingredientRepo.create({ productId: cubanitoBbq.id, inventoryItemId: salsaBbq.id, quantity: 0.03 }),
    // Papa Francesa
    ingredientRepo.create({ productId: papaFrancesa.id, inventoryItemId: papaCriolla.id, quantity: 0.2 }),
  ]);
  console.log('  ✅ 17 ingredientes creados\n');

  // ── 7. Pedidos ────────────────────────────────────────────────────────────
  console.log('🛒 Creando pedidos...');

  // Pedido 1 — LOCAL, PENDING
  const order1 = await orderRepo.save(
    orderRepo.create({
      branchId: sedeCentro.id,
      type: OrderType.LOCAL,
      status: OrderStatus.PENDING,
      createdByUserId: meseroUser.id,
      totalAmount: 15000,
      realCost: 0,
      realMargin: 0,
    }),
  );
  await orderItemRepo.save([
    orderItemRepo.create({ orderId: order1.id, productId: cubanito.id, quantity: 1, unitPrice: 12000, realCost: 0 }),
    orderItemRepo.create({ orderId: order1.id, productId: gaseosaP.id, quantity: 1, unitPrice: 3000, realCost: 0 }),
  ]);

  // Pedido 2 — DELIVERY, EN_PROCESO
  const order2 = await orderRepo.save(
    orderRepo.create({
      branchId: sedeCentro.id,
      type: OrderType.DELIVERY,
      status: OrderStatus.EN_PROCESO,
      createdByUserId: meseroUser.id,
      notes: 'Entregar en Cra 45 #23-10. Cliente: Juan García — 3001234567',
      totalAmount: 33000,
      realCost: 0,
      realMargin: 0,
    }),
  );
  await orderItemRepo.save([
    orderItemRepo.create({ orderId: order2.id, productId: cubanitoespecial.id, quantity: 2, unitPrice: 15000, realCost: 0 }),
    orderItemRepo.create({ orderId: order2.id, productId: aguaP.id, quantity: 1, unitPrice: 2000, realCost: 0 }),
    orderItemRepo.create({ orderId: order2.id, productId: gaseosaP.id, quantity: 1, unitPrice: 3000, realCost: 0 }),
  ]);

  // Pedido 3 — LOCAL, FINALIZADO (40 min atrás)
  const order3 = await orderRepo.save(
    orderRepo.create({
      branchId: sedeCentro.id,
      type: OrderType.LOCAL,
      status: OrderStatus.FINALIZADO,
      createdByUserId: meseroUser.id,
      lastStatusChangedByUserId: adminUser.id,
      totalAmount: 20000,
      realCost: 4200,
      realMargin: 15800,
      completedAt: minutesAgo(20),
    }),
  );
  await orderItemRepo.save([
    orderItemRepo.create({ orderId: order3.id, productId: cubanitoBbq.id, quantity: 1, unitPrice: 14000, realCost: 3600 }),
    orderItemRepo.create({ orderId: order3.id, productId: papaFrancesa.id, quantity: 1, unitPrice: 6000, realCost: 600 }),
  ]);
  console.log('  ✅ 3 pedidos creados\n');

  // ── 8. Caja ───────────────────────────────────────────────────────────────
  console.log('💰 Creando caja y movimientos del día...');

  // Cajas históricas (cerradas)
  const cajasHistoricas = [
    { diasAtras: 6, montoInicial: 50000, montoFinal: 225000 },
    { diasAtras: 5, montoInicial: 60000, montoFinal: 278000 },
    { diasAtras: 4, montoInicial: 50000, montoFinal: 193000 },
    { diasAtras: 3, montoInicial: 70000, montoFinal: 347000 },
    { diasAtras: 2, montoInicial: 60000, montoFinal: 358000 },
    { diasAtras: 1, montoInicial: 50000, montoFinal: 304000 },
  ];

  for (const h of cajasHistoricas) {
    const fechaAntigua = daysAgo(h.diasAtras);
    const cajaH = await cajaRepo.save(
      cajaRepo.create({
        fecha: fechaAntigua.toISOString().split('T')[0],
        montoInicial: h.montoInicial,
        montoFinal: h.montoFinal,
        abierta: false,
        abiertaPorId: adminUser.id,
        abiertaPor: adminUser.fullName,
        cerradaPorId: adminUser.id,
        cerradaPor: adminUser.fullName,
        branchId: sedeCentro.id,
      }),
    );

    // Movimientos de ejemplo por caja histórica
    const ingreso = h.montoFinal - h.montoInicial;
    await movimientoRepo.save([
      movimientoRepo.create({ cajaId: cajaH.id, tipo: 'ingreso', monto: ingreso * 0.9, descripcion: 'Ventas del día' }),
      movimientoRepo.create({ cajaId: cajaH.id, tipo: 'gasto', monto: ingreso * 0.05, descripcion: 'Compra de insumos' }),
    ]);
  }

  // Caja actual (abierta)
  const cajaHoy = await cajaRepo.save(
    cajaRepo.create({
      fecha: new Date().toISOString().split('T')[0],
      montoInicial: 50000,
      montoFinal: null,
      abierta: true,
      abiertaPorId: adminUser.id,
      abiertaPor: adminUser.fullName,
      cerradaPorId: null,
      cerradaPor: null,
      branchId: sedeCentro.id,
    }),
  );

  // Movimientos de la caja actual
  await movimientoRepo.save([
    movimientoRepo.create({
      cajaId: cajaHoy.id,
      tipo: 'ingreso',
      monto: 20000,
      descripcion: 'Pago pedido Cubanito BBQ + Papa Francesa',
    }),
    movimientoRepo.create({
      cajaId: cajaHoy.id,
      tipo: 'gasto',
      monto: 8000,
      descripcion: 'Compra insumos — pan',
    }),
  ]);

  console.log('  ✅ 7 sesiones de caja creadas (6 cerradas + 1 abierta hoy)\n');

  // ── Fin ────────────────────────────────────────────────────────────────────
  console.log('═══════════════════════════════════════════════════════════');
  console.log('✅ Seed completado exitosamente.');
  console.log('');
  console.log('📋 Usuarios disponibles (password: 1234):');
  console.log('   superadmin@test.com  → SUPER_ADMIN (sin sede)');
  console.log('   admin@sede1.com      → ADMIN       (Sede Centro)');
  console.log('   mesero@sede1.com     → MESERO      (Sede Centro)');
  console.log('   cocina@sede1.com     → COCINA      (Sede Centro)');
  console.log('   domiciliario@sede1.com → DOMICILIARIO (Sede Centro)');
  console.log('═══════════════════════════════════════════════════════════\n');

  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('❌ Error durante el seed:', err);
  process.exit(1);
});
