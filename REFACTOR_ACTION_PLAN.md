# Plan de Acción: Refactor de Nomenclatura

**Objetivo:** Estandarizar toda la nomenclatura al inglés y corregir truncamientos/typos  
**Impacto:** 49+ cambios distribuidos en 15+ archivos  
**Riesgo:** Medio (impacto en múltiples importaciones)

---

## 📋 PRE-REFACTOR CHECKLIST

- [ ] Crear rama: `git checkout -b refactor/naming-consistency`
- [ ] Backup del estado actual: `git stash` (si hay cambios sin commitear)
- [ ] Instalar search-replace global tool o usar IDE
- [ ] Ejecutar tests existentes: `npm run test`

---

## FASE 1: ARREGLAR TRUNCAMIENTOS CRÍTICOS (30 min)

### 1.1 Renombrar archivos truncados en `auth/`

```bash
# auth/interfaces/controllers/
mv src/auth/interfaces/controllers/aut.controller.ts src/auth/interfaces/controllers/auth.controller.ts
mv src/auth/interfaces/controllers/aut.controller.spec.ts src/auth/interfaces/controllers/auth.controller.spec.ts

# auth/application/use-cases/
mv src/auth/application/use-cases/create-aut.use-case.ts src/auth/application/use-cases/create-auth.use-case.ts

# Corregir typo en DTOs
mv src/auth/interfaces/dtos/jwt-payload.interace.ts src/auth/interfaces/dtos/jwt-payload.interface.ts
```

### 1.2 Reemplazos de strings en archivos `auth/`

**En `src/auth/auth.module.ts`:**
- Cambiar: `AutController` → `AuthController`
- Cambiar: `CreateAutUseCase` → `CreateAuthUseCase`
- Cambiar importación de: `aut.controller` → `auth.controller`
- Cambiar importación de: `create-aut.use-case` → `create-auth.use-case`

**En `src/auth/interfaces/controllers/auth.controller.ts` (antes aut.controller.ts):**
- Cambiar: `export class AutController` → `export class AuthController`
- Cambiar: `createAutUseCase` → `createAuthUseCase`
- Cambiar importación: `CreateAutUseCase` → `CreateAuthUseCase`

**En `src/auth/application/use-cases/create-auth.use-case.ts` (antes create-aut.use-case.ts):**
- Cambiar: `export class CreateAutUseCase` → `export class CreateAuthUseCase`

**En `src/auth/infrastructure/repositories/typeorm-auth.repository.ts`:**
- Cambiar importación: `jwt-payload.interace` → `jwt-payload.interface`

**En `src/auth/strategies/jwt.strategy.ts`:**
- Cambiar importación: `jwt-payload.interace` → `jwt-payload.interface`

**En `src/app.module.ts`:**
- Cambiar importación: `AuthModule`
- Verificar que esté importando desde `src/auth/auth.module`

### 1.3 Renombrar archivos truncados en `type-payment/`

```bash
# type-payment/interfaces/controllers/
mv src/type-payment/interfaces/controllers/type-paymen.controller.ts \
   src/type-payment/interfaces/controllers/type-payment.controller.ts

# type-payment/interfaces/dtos/
mv src/type-payment/interfaces/dtos/create-type-paymen.dto.ts \
   src/type-payment/interfaces/dtos/create-type-payment.dto.ts
   
mv src/type-payment/interfaces/dtos/create-type-paymen.dto.spec.ts \
   src/type-payment/interfaces/dtos/create-type-payment.dto.spec.ts

# type-payment/domain/entities/
mv src/type-payment/domain/entities/type-paymen.entity.ts \
   src/type-payment/domain/entities/type-payment.entity.ts
```

### 1.4 Reemplazos de strings en archivos `type-payment/`

**En `src/type-payment/type-payment.module.ts`:**
- Cambiar: `type-paymen.controller` → `type-payment.controller`
- Cambiar: `type-paymen.entity` → `type-payment.entity`
- Cambiar clase: `TypePaymentController` (verificar nombre actual)
- Cambiar entidad: `TypePaymentEntity` o similar

**En `src/type-payment/interfaces/controllers/type-payment.controller.ts`:**
- Cambiar importación: `create-type-paymen.dto` → `create-type-payment.dto`
- Cambiar en importación de Entity: `type-paymen.entity` → `type-payment.entity`

### 1.5 Renombrar archivo truncado en `type-identification/`

```bash
# type-identification/interfaces/dtos/
mv src/type-identification/interfaces/dtos/create-type-identificatio.dto.ts \
   src/type-identification/interfaces/dtos/create-type-identification.dto.ts
```

### 1.6 Reemplazos de strings en archivos `type-identification/`

**En `src/type-identification/type-identification.module.ts`:**
- Cambiar importación: `create-type-identificatio.dto` → `create-type-identification.dto`

**En `src/type-identification/interfaces/controllers/type-identification.controller.ts`:**
- Cambiar importación: `create-type-identificatio.dto` → `create-type-identification.dto`

### 1.7 Corregir typo en common/enums

```bash
# common/enums/
mv src/common/enums/description-passwprd.enum.ts \
   src/common/enums/description-password.enum.ts
```

**Buscar y reemplazar en todo el repo:**
- Cambiar: `description-passwprd` → `description-password`
- Cambiar: `description-passwprd` → `description-password` (en importaciones)

---

## FASE 2: RENOMBRAR MÓDULO CAJA → CASHBOX (1 hora)

### 2.1 Renombrar carpeta principal

```bash
mv src/caja src/cashbox
```

### 2.2 Renombrar archivos dentro de cashbox

```bash
# Module
mv src/cashbox/caja.module.ts src/cashbox/cashbox.module.ts

# Controllers
mv src/cashbox/interfaces/controllers/caja.controller.ts \
   src/cashbox/interfaces/controllers/cashbox.controller.ts

# DTOs - SPLIT EN 3 ARCHIVOS
# Abrir src/cashbox/interfaces/dtos/caja.dto.ts y copiar contenido en 3 archivos

# Entities
mv src/cashbox/domain/entities/caja.entity.ts \
   src/cashbox/domain/entities/cashbox.entity.ts
   
mv src/cashbox/domain/entities/movimiento.entity.ts \
   src/cashbox/domain/entities/movement.entity.ts

# Use Cases
mv src/cashbox/application/use-cases/caja.use-case.ts \
   src/cashbox/application/use-cases/cashbox.use-case.ts
```

### 2.3 Crear los 3 nuevos DTOs (dividir de caja.dto.ts)

**Crear `src/cashbox/interfaces/dtos/open-cashbox.dto.ts`:**
```typescript
// Copiar AbrirCajaDto → OpenCashboxDto
// Actualizar ApiProperty descriptions
```

**Crear `src/cashbox/interfaces/dtos/close-cashbox.dto.ts`:**
```typescript
// Copiar CerrarCajaDto → CloseCashboxDto
// Actualizar ApiProperty descriptions
```

**Crear `src/cashbox/interfaces/dtos/create-movement.dto.ts`:**
```typescript
// Copiar CreateMovimientoDto → CreateMovementDto
// Actualizar ApiProperty descriptions
```

**Eliminar o deprecar:**
```bash
rm src/cashbox/interfaces/dtos/caja.dto.ts
```

### 2.4 Actualizar entityclass names dentro de archivos

**En `src/cashbox/domain/entities/cashbox.entity.ts`:**
- Cambiar: `export class CajaEntity` → `export class CashboxEntity`
- Cambiar: `@Entity('caja')` → `@Entity('cashbox')`
- Cambiar importación: `MovimientoEntity` → `MovementEntity`
- Cambiar: `movimientos` → `movements` (en relaciones)

**En `src/cashbox/domain/entities/movement.entity.ts`:**
- Cambiar: `export class MovimientoEntity` → `export class MovementEntity`
- Cambiar: `@Entity('movimientos')` → `@Entity('movements')`
- Cambiar: `CajaEntity` → `CashboxEntity`
- Cambiar toda la nomenclatura interna en español

**En `src/cashbox/application/use-cases/cashbox.use-case.ts`:**
- Cambiar: `export class CajaUseCase` → `export class CashboxUseCase`
- Cambiar importaciones de entities
- Cambiar decorador `@InjectRepository(CajaEntity)` → `@InjectRepository(CashboxEntity)`
- Cambiar método names de español a inglés
- Cambiar comentarios de español a inglés

**En `src/cashbox/interfaces/controllers/cashbox.controller.ts`:**
- Cambiar: `export class CajaController` → `export class CashboxController`
- Cambiar: `export class MovimientosController` → `export class MovementsController`
- Cambiar: `@Controller('caja')` → `@Controller('cashbox')`
- Cambiar: `@Controller('movimientos')` → `@Controller('movements')`
- Cambiar: `@ApiTags('Caja')` → `@ApiTags('Cashbox')`
- Cambiar: `@ApiTags('Movimientos')` → `@ApiTags('Movements')`
- Cambiar nombres de DTOs en imports
- Cambiar nombres de métodos (ej: `abrirCaja` → `openCashbox`)
- Cambiar comentarios/descriptions de español a inglés

**En `src/cashbox/cashbox.module.ts`:**
- Cambiar: `import { CajaEntity } from ...` → `import { CashboxEntity } from ...`
- Cambiar: `import { MovimientoEntity } from ...` → `import { MovementEntity } from ...`
- Cambiar: `TypeOrmModule.forFeature([CajaEntity, MovimientoEntity])` → `[CashboxEntity, MovementEntity]`
- Cambiar: `controllers: [CajaController, MovimientosController]` → `[CashboxController, MovementsController]`
- Cambiar: `providers: [CajaUseCase]` → `[CashboxUseCase]`
- Cambiar: `exports: [CajaUseCase, TypeOrmModule]` → `[CashboxUseCase, TypeOrmModule]`
- Cambiar: `export class CajaModule` → `export class CashboxModule`

### 2.5 Actualizar app.module.ts

**En `src/app.module.ts`:**
```typescript
// Cambiar:
import { CajaModule } from './caja/caja.module';
// A:
import { CashboxModule } from './cashbox/cashbox.module';

// En imports array:
// Cambiar: CajaModule
// A: CashboxModule
```

### 2.6 Actualizar reports.module.ts

**En `src/reports/reports.module.ts`:**
- Cambiar importación: `MovimientoEntity` → `MovementEntity`
- Cambiar importación: `import { ... } from 'src/cashbox/...'`
- Actualizar `TypeOrmModule.forFeature([..., MovementEntity])`

**En `src/reports/application/use-cases/reports.use-case.ts`:**
- Cambiar referencias a `MovimientoEntity` → `MovementEntity`
- Cambiar referencias a `CajaEntity` → `CashboxEntity`
- Cambiar método names de español a inglés
- Actualizar importaciones

### 2.7 Actualizar seed.ts

**En `src/seed/seed.ts`:**
```typescript
// Cambiar todas estas importaciones:
import { CajaEntity } from '../cashbox/domain/entities/cashbox.entity';
import { MovimientoEntity } from '../cashbox/domain/entities/movement.entity';

// Cambiar referencias en:
// - AppDataSource.getRepository(CajaEntity)
// - AppDataSource.getRepository(MovimientoEntity)
// - DataSource.synchronize()
// - TRUNCATE TABLE query (cambiar 'movimientos, caja' -> 'movements, cashbox')
// - Todos los métodos que manipulan estas entidades
```

---

## FASE 3: ELIMINAR DUPLICADOS EN REPORTS (10 min)

### 3.1 Eliminar archivo español duplicado

```bash
rm src/reports/interfaces/controllers/reportes.controller.ts
```

### 3.2 Verificar `reports.controller.ts` está funcionando

**En `src/reports/interfaces/controllers/reports.controller.ts`:**
- Verificar que esté exportando `ReportsController`
- Verificar que esté usando `@Controller('reports')`
- Verificar que tenga todos los métodos necesarios

### 3.3 Actualizar reports.module.ts

**En `src/reports/reports.module.ts`:**
- Verificar que importe `ReportsController` (no ReportesController)
- Cambiar: `ReportesController` → `ReportsController`

---

## FASE 4: ARREGLAR INCONSISTENCIAS SINGULAR/PLURAL (30 min)

### 4.1 Arreglar ingredients

```bash
# interfaces/dtos
mv src/ingredients/interfaces/dtos/ingredient.dto.ts \
   src/ingredients/interfaces/dtos/ingredients.dto.ts

# domain/entities
mv src/ingredients/domain/entities/ingredients.entity.ts \
   src/ingredients/domain/entities/ingredient.entity.ts
```

**En `src/ingredients/interfaces/controllers/ingredients.controller.ts`:**
- Cambiar importación: `ingredient.dto` → `ingredients.dto`

**En `src/ingredients/ingredients.module.ts`:**
- Cambiar importación: `ingredients.entity` → `ingredient.entity`
- Cambiar: `IngredientsEntity` → `IngredientEntity` (si aplica)

---

## FASE 5: ACTUALIZAR TESTS Y SPECS

### 5.1 Actualizar importaciones en archivos .spec.ts

- `src/auth/interfaces/controllers/auth.controller.spec.ts`
- `src/type-payment/interfaces/dtos/create-type-payment.dto.spec.ts`
- `src/products/domain/entities/product.entity.spec.ts`

```bash
# Buscar y reemplazar en todos los .spec.ts:
# - 'aut.controller' → 'auth.controller'
# - 'AutController' → 'AuthController'
# - 'create-type-paymen' → 'create-type-payment'
# - 'caja' → 'cashbox'
# etc.
```

---

## FASE 6: BÚSQUEDA Y REEMPLAZO GLOBAL

### Strings a buscar y reemplazar EN TODO EL REPO:

```
(Use IDE Replace in Files o sed/grep combinado)

1. Cambiar class names:
   - CajaUseCase → CashboxUseCase
   - CajaEntity → CashboxEntity
   - CajaController → CashboxController
   - MovimientosController → MovementsController
   - MovimientoEntity → MovementEntity
   - AutController → AuthController
   - CreateAutUseCase → CreateAuthUseCase
   - TypePaymentController (verificar nombre)
   - TypePaymentEntity (verificar nombre)

2. Cambiar module names:
   - CajaModule → CashboxModule

3. Cambiar imports:
   - './caja/ → './cashbox/
   - 'src/caja/ → 'src/cashbox/
   - 'caja.module' → 'cashbox.module'
   - 'caja.controller' → 'cashbox.controller'
   - 'caja.use-case' → 'cashbox.use-case'

4. Cambiar entity imports:
   - CajaEntity → CashboxEntity
   - MovimientoEntity → MovementEntity

5. Cambiar route decorators:
   - @Controller('caja') → @Controller('cashbox')
   - @Controller('movimientos') → @Controller('movements')
   - @ApiTags('Caja') → @ApiTags('Cashbox')
   - @ApiTags('Movimientos') → @ApiTags('Movements')

6. Cambiar API descriptions:
   - 'Obtener caja' → 'Get cashbox'
   - 'Abrir caja' → 'Open cashbox'
   - 'Cerrar caja' → 'Close cashbox'
   - 'Movimiento' → 'Movement'
```

---

## TESTING & VALIDATION

### Pre-Merge Checks:

```bash
# 1. Verificar que no hay importaciones rotas
npm run build

# 2. Ejecutar tests
npm run test

# 3. Ejecutar linter
npm run lint:fix

# 4. Ejecutar tests e2e (si existen)
npm run test:e2e

# 5. Revisar que no hay errores de TypeScript
npx tsc --noEmit
```

### Manual Testing:

- [ ] Verificar que el servidor inicia sin errores: `npm run start:dev`
- [ ] Probar endpoints de `/auth` (login/register)
- [ ] Probar endpoints de `/cashbox`
- [ ] Probar endpoints de `/movements`
- [ ] Probar endpoints de `/type-payment`
- [ ] Probar endpoints de `/type-identification`

---

## POST-REFACTOR

### Commit y merge:

```bash
git add .
git commit -m "refactor: standardize naming convention to English

- Rename caja module to cashbox
- Rename movimiento to movement
- Fix truncated filenames (aut → auth, type-paymen → type-payment, etc)
- Fix typo in jwt-payload.interace → jwt-payload.interface
- Fix typo in description-passwprd → description-password
- Remove duplicate reportes.controller.ts
- Fix singular/plural inconsistencies in ingredients
- Update all related imports and class names
- Update all API documentation strings"

git push origin refactor/naming-consistency
```

### Create PR and merge to main after review

---

## ROLLBACK PLAN (if needed)

```bash
# Si algo sale mal:
git reset --hard HEAD~1
git checkout main
```

---

## ESTIMATED TIMELINE

| Fase | Tiempo | Complejidad |
|------|--------|------------|
| Fase 1 - Truncamientos | 30 min | Media |
| Fase 2 - Caja → Cashbox | 1 hora | Alta |
| Fase 3 - Duplicados | 10 min | Baja |
| Fase 4 - Singular/Plural | 30 min | Baja |
| Fase 5 - Tests/Specs | 30 min | Media |
| Fase 6 - Búsqueda Global | 30 min | Media |
| Testing & Validation | 1 hora | Alta |
| **TOTAL** | **4.5 horas** | - |

---

## NOTAS IMPORTANTES

1. **Hacer cambios incrementales:** No hacer todo de una vez. Seguir el orden de fases.
2. **Testear después de cada fase:** Asegurar que cada cambio no rompa la build.
3. **Actualizar database migrations** si existen nombres de tablas en las migraciones.
4. **Actualizar documentación API** después de cambiar nombres de rutas.
5. **Considerar backward compatibility:** Si hay clientes externos usando las rutas antiguas, considerar deprecation warnings o redirecciones.
6. **Actualizar .env si hay referencias** a nombres de módulos o rutas.
7. **README y documentación:** Actualizar todos los ejemplos y referencias.
