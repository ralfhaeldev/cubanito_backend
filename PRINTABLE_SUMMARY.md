# 📋 CUBANITO BACKEND - ANÁLISIS DE NOMENCLATURA (Versión Imprimible)

**Generado:** 23 de marzo de 2026 | **Estado:** ✅ Análisis Completo

---

## 🎯 HALLAZGOS EN 60 SEGUNDOS

**CRÍTICO:** 49+ problemas encontrados  
**Archivos afectados:** 32+  
**Tiempo estimado de refactor:** 4.5 horas  

### Los 3 Problemas Principales:

1. **TRUNCAMIENTOS:** 9 archivos con nombres incompletos
   - `aut.controller.ts` debe ser `auth.controller.ts`
   - `type-paymen.*` debe ser `type-payment.*`
   - `create-type-identificatio.dto.ts` debe ser `create-type-identification.dto.ts`

2. **ESPAÑOL:** Módulo `caja/` completo (15+ archivos)
   - Debe renombrarse a `cashbox/`
   - 30+ métodos en español: `abrirCaja()`, `cerrarCaja()`, etc.

3. **TYPOS:** 2 errores tipográficos
   - `jwt-payload.interace.ts` → `jwt-payload.interface.ts`
   - `description-passwprd.enum.ts` → `description-password.enum.ts`

---

## 📊 TABLA MAESTRA - TODOS LOS PROBLEMAS

| ID | Ubicación | Problema | Solución | Criticidad |
|----|-----------|----------|----------|-----------|
| 1 | `auth/interfaces/controllers/` | `aut.controller.ts` | `auth.controller.ts` | 🔴 CRÍTICO |
| 2 | `auth/application/use-cases/` | `create-aut.use-case.ts` | `create-auth.use-case.ts` | 🔴 CRÍTICO |
| 3 | `auth/interfaces/dtos/` | `jwt-payload.interace.ts` | `jwt-payload.interface.ts` | 🔴 CRÍTICO |
| 4 | `type-payment/interfaces/controllers/` | `type-paymen.controller.ts` | `type-payment.controller.ts` | 🔴 CRÍTICO |
| 5 | `type-payment/interfaces/dtos/` | `create-type-paymen.dto.ts` | `create-type-payment.dto.ts` | 🔴 CRÍTICO |
| 6 | `type-payment/domain/entities/` | `type-paymen.entity.ts` | `type-payment.entity.ts` | 🔴 CRÍTICO |
| 7 | `type-identification/interfaces/dtos/` | `create-type-identificatio.dto.ts` | `create-type-identification.dto.ts` | 🔴 CRÍTICO |
| 8 | `common/enums/` | `description-passwprd.enum.ts` | `description-password.enum.ts` | 🔴 CRÍTICO |
| 9 | `reports/interfaces/controllers/` | `reportes.controller.ts` | **ELIMINAR** | 🔴 CRÍTICO |
| 10 | `src/` | `caja/` (módulo completo) | `cashbox/` | 🔴 CRÍTICO |
| 11 | `caja/domain/entities/` | `caja.entity.ts` | `cashbox.entity.ts` | 🔴 CRÍTICO |
| 12 | `caja/domain/entities/` | `movimiento.entity.ts` | `movement.entity.ts` | 🔴 CRÍTICO |
| 13 | `ingredients/interfaces/dtos/` | `ingredient.dto.ts` (singul) | `ingredients.dto.ts` (plural) | 🟡 MEDIO |
| 14 | `ingredients/domain/entities/` | `ingredients.entity.ts` (plural) | `ingredient.entity.ts` (singular) | 🟡 MEDIO |

---

## 🛠️ DOCUMENTOS DE REFERENCIA DISPONIBLES

Ubicados en la raíz del proyecto: `/Users/antabla/Desktop/code/cubanitos/cubanito_backend/`

| Documento | Propósito | Páginas |
|-----------|----------|---------|
| **ANALYSIS_NAMING_ISSUES.md** | Análisis exhaustivo, tablas detalladas | 12 |
| **REFACTOR_ACTION_PLAN.md** | Instrucciones paso-a-paso, 6 fases | 15 |
| **QUICK_REFERENCE.md** | Visual ASCII con todos los cambios | 8 |
| **refactor-naming.sh** | Script bash automatizado executable | - |
| **NAMING_REFACTOR_SUMMARY.md** | Resumen ejecutivo | 3 |

### Para empezar ahora:

```bash
# Ver análisis rápido
cat QUICK_REFERENCE.md

# Ver plan detallado
cat REFACTOR_ACTION_PLAN.md

# Ejecutar script (menú interactivo)
./refactor-naming.sh
```

---

## ⚡ EJECUCIÓN RÁPIDA (30 SEGUNDOS)

```bash
# Opción 1: Script interactivo
bash refactor-naming.sh

# Opción 2: Ejecutar fase específica
bash refactor-naming.sh 1              # Fase 1: Arreglar truncamientos
bash refactor-naming.sh all            # Todo de una vez

# Opción 3: Ver ayuda
bash refactor-naming.sh help
```

---

## 🔍 VERIFICAR ESTADO ACTUAL

```bash
# Ver todos los archivos problemáticos
find src -name "*paymen*" -o -name "*identificatio*" -o -name "aut.controller*"

# Buscar referencias a "caja" en el código
grep -r "CajaEntity\|CajaModule\|CajaUseCase" src/

# Buscar typos
grep -r "interace\|passwprd" src/
```

---

## 📈 PLAN DE 4 FASES RECOMENDADO

### FASE 1: Truncamientos (30 minutos) ✅ BAJA COMPLEJIDAD
- Renombrar 9 archivos truncados
- Actualizar importaciones
- Ejecutar `npm run build`

### FASE 2: Módulo Caja → Cashbox (1 hora) ⚠️ ALTA COMPLEJIDAD
- Renombrar carpeta completa
- Actualizar 15+ archivos de importaciones
- Cambiar nombres de clases y DTOs

### FASE 3: Cleanup (10 minutos) ✅ BAJA COMPLEJIDAD
- Eliminar archivo duplicado `reportes.controller.ts`
- Actualizar importaciones en reports

### FASE 4: Singular/Plural (30 minutos) ✅ BAJA COMPLEJIDAD
- Renombrar archivos de ingredients
- Actualizar nombres de clases

**TIEMPO TOTAL: ~4.5 horas** (incluyendo testing)

---

## ✅ VALIDACIÓN POST-REFACTOR

```bash
# Verificar que compila
npm run build

# Ejecutar linter
npm run lint:fix

# Ejecutar tests
npm run test && npm run test:e2e

# Verificar no hay referencias antiguas
grep -r "caja\|movimiento" src/ 2>/dev/null | grep -v node_modules

# Iniciar servidor
npm run start:dev

# Probar endpoints:
curl http://localhost:3000/auth
curl http://localhost:3000/cashbox
curl http://localhost:3000/movements
```

---

## 📝 CHECKLIST PRE-EJECUCIÓN

- [ ] Estoy en una rama feature (no main)
- [ ] Todos los cambios están commiteados
- [ ] Tengo backup del código (git branch)
- [ ] He leído los documentos de referencia
- [ ] Tengo `npm` y `git` actualizados
- [ ] Los tests pasan actualmente
- [ ] Entiendo que habrá breaking changes en APIs

---

## ⚠️ RIESGOS Y MITIGACIONES

| Riesgo | Severidad | Mitigación |
|--------|-----------|-----------|
| Imports rotas | ALTA | Script automatizado verifica |
| Breaking API | ALTA | Documentar cambios de rutas |
| BD desincronizada | ALTA | Revisar migraciones |
| Tests fallando | MEDIA | Actualizar archivos .spec.ts |
| Cambios perdidos | MEDIA | Git rollback: `git reset --hard HEAD~1` |

---

## 🆘 SI ALGO SALE MAL

```bash
# Ver estado actual
git status
git diff --stat

# Revertir último commit
git reset --hard HEAD~1

# Volver a rama anterior
git checkout main

# Ver log
git log --oneline -20
```

---

## 📞 PRÓXIMOS PASOS

**INMEDIATO (Hoy):**
1. Revisar QUICK_REFERENCE.md
2. Decidir: ejecutar script vs. manual
3. Crear rama: `git checkout -b refactor/naming`

**CORTO PLAZO (Esta semana):**
1. Ejecutar Fase 1 (truncamientos)
2. Testear y pushear para review
3. Merge a main

**MEDIANO PLAZO (Próxima semana):**
1. Ejecutar Fases 2-4
2. Testing exhaustivo
3. Actualizar documentación

---

## 📚 RESUMEN ESTRUCTURAL

```
ANTES (Problemático)
─────────────────
src/
├─ caja/ (ESPAÑOL)
│  ├─ caja.controller.ts (ESPAÑOL)
│  ├─ caja.entity.ts (ESPAÑOL)
│  └─ movimiento.entity.ts (ESPAÑOL)
├─ auth/
│  ├─ aut.controller.ts (TRUNCADO)
│  └─ create-aut.use-case.ts (TRUNCADO)
├─ type-payment/
│  └─ type-paymen.* (TRUNCADO)
└─ type-identification/
   └─ create-type-identificatio.dto.ts (TRUNCADO)

DESPUÉS (Normalizado)
────────────────────
src/
├─ cashbox/
│  ├─ cashbox.controller.ts ✅
│  ├─ cashbox.entity.ts ✅
│  └─ movement.entity.ts ✅
├─ auth/
│  ├─ auth.controller.ts ✅
│  └─ create-auth.use-case.ts ✅
├─ type-payment/
│  └─ type-payment.* ✅
└─ type-identification/
   └─ create-type-identification.dto.ts ✅
```

---

## 📊 ESTADÍSTICAS FINALES

| Métrica | Número |
|---------|--------|
| Módulos problemáticos | 3 |
| Archivos a renombrar | 13+ |
| Archivos con typos | 2 |
| Archivos duplicados | 1 |
| Métodos en español | 30+ |
| Archivos afectados indirectamente | 32+ |
| **Total de incidencias** | **49+** |
| **Tiempo estimado refactor** | **4.5 hrs** |
| **Riesgo** | **Medio** |
| **Complejidad** | **Alta** |

---

**Generado:** 23 de marzo, 2026  
**Versión:** 1.0 - Análisis Completo  
**Estado:** ✅ Listo para ejecutar  
**Próximo:** Ejecutar `bash refactor-naming.sh`
