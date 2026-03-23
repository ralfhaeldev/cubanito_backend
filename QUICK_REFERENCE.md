# Referencia Rápida: Inconsistencias de Nomenclatura

## 🎯 LIST OF ALL ISSUES AT A GLANCE

### TRUNCATED/TYPO FILENAMES (9 files)

```
AUTH MODULE
├─ aut.controller.ts                    ❌ → auth.controller.ts
├─ aut.controller.spec.ts               ❌ → auth.controller.spec.ts
├─ create-aut.use-case.ts               ❌ → create-auth.use-case.ts
└─ jwt-payload.interace.ts              ❌ → jwt-payload.interface.ts (typo)

TYPE-PAYMENT MODULE
├─ type-paymen.controller.ts            ❌ → type-payment.controller.ts
├─ create-type-paymen.dto.ts            ❌ → create-type-payment.dto.ts
├─ create-type-paymen.dto.spec.ts       ❌ → create-type-payment.dto.spec.ts
└─ type-paymen.entity.ts                ❌ → type-payment.entity.ts

TYPE-IDENTIFICATION MODULE
└─ create-type-identificatio.dto.ts     ❌ → create-type-identification.dto.ts

COMMON MODULE
└─ description-passwprd.enum.ts         ❌ → description-password.enum.ts (typo)

REPORTS MODULE
└─ reportes.controller.ts               ❌ → DELETE (duplicate)
```

---

### SPANISH NAMES - ENTIRE MODULES (critical)

```
CAJA MODULE (should be CASHBOX)
src/caja/
├─ caja.module.ts                       ❌ → cashbox.module.ts
├─ interfaces/
│  ├─ controllers/
│  │  └─ caja.controller.ts             ❌ → cashbox.controller.ts
│  │     (exports: CajaController, MovimientosController)
│  │     (routes: /caja, /movimientos)
│  └─ dtos/
│     └─ caja.dto.ts                    ❌ SPLIT INTO 3:
│        ├─ open-cashbox.dto.ts         (AbrirCajaDto)
│        ├─ close-cashbox.dto.ts        (CerrarCajaDto)
│        └─ create-movement.dto.ts      (CreateMovimientoDto)
├─ domain/
│  └─ entities/
│     ├─ caja.entity.ts                 ❌ → cashbox.entity.ts
│     └─ movimiento.entity.ts           ❌ → movement.entity.ts
└─ application/
   └─ use-cases/
      └─ caja.use-case.ts               ❌ → cashbox.use-case.ts
```

**All methods inside are in SPANISH:**
- `abrirCaja()` → `openCashbox()`
- `cerrarCaja()` → `closeCashbox()`
- `getMovimientos()` → `getMovements()`
- `createMovimiento()` → `createMovement()`

---

### SINGULAR/PLURAL INCONSISTENCIES (2 files)

```
INGREDIENTS MODULE
├─ interfaces/dtos/ingredient.dto.ts           ⚠️ (singular) → ingredients.dto.ts (plural)
└─ domain/entities/ingredients.entity.ts       ⚠️ (plural)   → ingredient.entity.ts (singular)

EXPECTED PATTERN:
├─ Controller:  plural (IngredientsController) ✅
├─ DTO:         plural (ingredients.dto)
├─ Entity:      singular (ingredient.entity)
└─ Class:       singular (IngredientEntity)
```

---

## 📋 COMPLETE IMPORT CHANGES REQUIRED

### Files that import these problematic names:

```
1. src/app.module.ts
   - CajaModule → CashboxModule
   
2. src/reports/reports.module.ts
   - CajaEntity → CashboxEntity
   - MovimientoEntity → MovementEntity
   - ReportesController → ReportsController
   
3. src/reports/application/use-cases/reports.use-case.ts
   - All caja/movimiento references → cashbox/movement
   
4. src/seed/seed.ts
   - CajaEntity, MovimientoEntity, aut.controller imports
   - All seed methods that create test data
   - TRUNCATE TABLE query with old names
   
5. src/auth/auth.module.ts
   - AutController → AuthController
   - CreateAutUseCase → CreateAuthUseCase
   
6. src/type-payment/type-payment.module.ts
   - TypePaymentController (verify name)
   - type-paymen.* files → type-payment.*
   
7. src/type-identification/type-identification.module.ts
   - create-type-identificatio.dto → create-type-identification.dto
   
8. All .spec.ts files
   - Update all imports
```

---

## 🔄 DEPENDENCY GRAPH

```
app.module.ts
├─ CajaModule → CashboxModule
│  ├─ CajaEntity → CashboxEntity
│  └─ MovimientoEntity → MovementEntity
├─ AuthModule
│  ├─ AutController → AuthController
│  └─ CreateAutUseCase → CreateAuthUseCase
├─ TypePaymentModule
│  ├─ type-paymen.controller → type-payment.controller
│  └─ type-paymen.entity → type-payment.entity
└─ ReportsModule
   ├─ CajaEntity → CashboxEntity
   ├─ MovimientoEntity → MovementEntity
   └─ ReportesController → ReportsController (or delete)

seed.ts (depends on most of above)
```

---

## 📊 IMPACT MATRIX

| Change | Files Affected | Complexity | Risk | Time |
|--------|----------------|-----------|------|------|
| auth truncations | 5 | Low | Low | 15min |
| type-payment truncations | 4 | Low | Low | 10min |
| type-identification truncation | 1 | Low | Low | 5min |
| password typo | 1 | Low | Low | 2min |
| reportes cleanup | 2 | Low | Low | 5min |
| **caja → cashbox** | **15+** | **High** | **Medium** | **60min** |
| singular/plural | 4 | Low | Low | 10min |
| **TOTAL** | **32+** | - | - | **107min** |

---

## ✅ VALIDATION CHECKLIST

After making changes, verify:

```
[ ] npm run build              # No TypeScript errors
[ ] npm run lint:fix           # Tests lint rules
[ ] npm run test               # Unit tests pass
[ ] npm run test:e2e           # E2E tests pass
[ ] git diff --stat            # Review number of file changes
[ ] grep -r "caja\|movimiento" # No remaining Spanish references
    src/                       # (except in comments)
[ ] grep -r "aut\.controller"  # Confirm imports updated
[ ] Server starts:             # npm run start:dev
    - GET  /auth/login         # ✅ works
    - GET  /cashbox            # ✅ works  
    - GET  /movements          # ✅ works
    - GET  /type-payment       # ✅ works
```

---

## 🚨 POTENTIAL RISKS & MITIGATIONS

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Breaking API changes | HIGH | Add API versioning or deprecation warnings |
| Database table mismatch | HIGH | Verify migrations match new names |
| Broken imports | HIGH | Use IDE refactor or script automation |
| Missed references | MEDIUM | Use grep to find remaining old names |
| Test failures | MEDIUM | Update test files and imports |
| TypeOrmModule imports | MEDIUM | Verify all entity registrations |

---

## 🤖 AUTOMATION OPTIONS

**Option 1: Manual (safest)**
- Edit files one by one
- Use IDE refactor tools
- Verify after each step

**Option 2: Script (semi-automated)**
- Use provided `refactor-naming.sh`
- Can run phases individually
- Has built-in logging and rollback

**Option 3: Full automation (risky)**
- Use sed/grep for mass replacement
- Less control, harder to debug
- Only recommended for simple changes

---

## 📞 QUICK COMMANDS

```bash
# See all truncated files
find src -name "*paymen*" -o -name "*identificatio*" -o -name "aut.controller*"

# Find Spanish entity references
grep -r "CajaEntity\|MovimientoEntity" src/ --include="*.ts"

# Search for Spanish method names
grep -r "abrirCaja\|cerrarCaja\|getMovimientos" src/ --include="*.ts"

# Check for database references
grep -r "movimientos\|'caja'" src/ --include="*.ts"

# Make script executable
chmod +x refactor-naming.sh

# Run script
./refactor-naming.sh
```

---

## 📚 RELATED DOCUMENTATION

- **ANALYSIS_NAMING_ISSUES.md** - Detailed issue breakdown
- **REFACTOR_ACTION_PLAN.md** - Step-by-step execution guide
- **refactor-naming.sh** - Automated bash script
- **NAMING_REFACTOR_SUMMARY.md** - Executive summary

---

**Last Updated:** March 23, 2026  
**Status:** Ready to execute refactor
