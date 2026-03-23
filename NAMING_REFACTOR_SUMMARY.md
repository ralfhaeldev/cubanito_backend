# RESUMEN EJECUTIVO: Inconsistencias de Nomenclatura

## 🎯 Hallazgos Principales

Se identificaron **49+ incidencias** de falta de estandarización en nomenclatura del backend NestJS:

### 🔴 Críticos (9 archivos con truncamientos/typos)

| Archivo Actual | Debe Ser |
|---|---|
| `aut.controller.ts` | `auth.controller.ts` |
| `create-aut.use-case.ts` | `create-auth.use-case.ts` |
| `jwt-payload.interace.ts` | `jwt-payload.interface.ts` |
| `type-paymen.controller.ts` | `type-payment.controller.ts` |
| `create-type-paymen.dto.ts` | `create-type-payment.dto.ts` |
| `type-paymen.entity.ts` | `type-payment.entity.ts` |
| `create-type-identificatio.dto.ts` | `create-type-identification.dto.ts` |
| `description-passwprd.enum.ts` | `description-password.enum.ts` |
| `reportes.controller.ts` | *ELIMINAR (duplicado)* |

### 🔴 Críticos (Módulos completos en español)

| Carpeta Actual | Debe Ser | Contiene |
|---|---|---|
| `src/caja/` | `src/cashbox/` | Entidades, DTOs, Controladores, Use Cases |
| `src/caja/domain/entities/movimiento.entity.ts` | `src/cashbox/domain/entities/movement.entity.ts` | - |
| Métodos: `abrirCaja()`, `cerrarCaja()`, `getMovimientos()` | En inglés | - |

### 🟡 Medianos (Inconsistencias singular/plural)

| Archivo Actual | Debe Ser |
|---|---|
| `ingredients/interfaces/dtos/ingredient.dto.ts` | `ingredients.dto.ts` |
| `ingredients/domain/entities/ingredients.entity.ts` | `ingredient.entity.ts` |

---

## 📊 Estadísticas

- **Módulos problemáticos:** 3 (caja, auth, type-payment)
- **Archivos a renombrar:** 13+
- **Typos encontrados:** 2 (interace, passwprd)
- **Archivos duplicados:** 1 (reportes.controller.ts)
- **Métodos en español:** 30+ (en caja module)
- **Archivos afectados indirectamente:** 20+

---

## 📚 Documentación Generada

Se han creado 3 documentos de referencia en la raíz del proyecto:

### 1. **ANALYSIS_NAMING_ISSUES.md** (Análisis Completo)
- Listado detallado de todos los problemas
- Estructurado por categoría y severidad
- Tablas completas de módulos, DTOs, entidades, controladores
- Estadísticas finales

### 2. **REFACTOR_ACTION_PLAN.md** (Plan Paso a Paso)
- 6 fases bien definidas con instrucciones exactas
- Comandos `mv` y cambios de strings específicos
- Sección de testing y validación
- Timeline estimado: **4.5 horas**
- Rollback plan incluido

### 3. **refactor-naming.sh** (Script Automatizado)
- Bash script ejecutable con menú interactivo
- Puede ejecutar fases individuales o todas en secuencia
- Validaciones incorporadas (git status, file existence, etc)
- Logging automático de cambios
- Opciones inmediatas:
  ```bash
  bash refactor-naming.sh 1          # Fase 1: Fix truncamientos
  bash refactor-naming.sh 2          # Fase 2: Rename caja → cashbox
  bash refactor-naming.sh all        # Ejecutar TODO
  bash refactor-naming.sh            # Mostrar menú interactivo
  ```

---

## 🚀 Próximas Acciones Recomendadas

### Inmediato (sin riesgos):
1. ✅ **Crear rama:** `git checkout -b refactor/naming-consistency`
2. ✅ **Revisar documentos** de análisis
3. ✅ **Decidir ejecutar** script o hacerlo manualmente

### Corto plazo (1-2 días):
1. **Ejecutar Fase 1:** Arreglar truncamientos (30 min, bajo riesgo)
   - Prueba rápida: `npm run build`
2. **Verificar tests:** `npm run test`
3. **Push y crear PR** para review

### Mediano plazo (1 semana):
1. **Fases 2-4:** Refactor completo de módulo caja y componentes
2. **Testing exhaustivo:** Tests e2e, manual testing
3. **Merge a main** después de review

---

## ⚠️ Consideraciones Importantes

1. **Split DTOs de caja:** El archivo `caja.dto.ts` contiene 3 DTOs distintos que deben dividirse en:
   - `open-cashbox.dto.ts`
   - `close-cashbox.dto.ts`
   - `create-movement.dto.ts`

2. **Métodos en español:** Hay ~30+ métodos con nombres en español que necesitarán traducción manual (no es automatizable)

3. **Backward compatibility:** Decidir si mantener rutas antiguas con deprecation warnings o hacer breaking change

4. **Database:** Verificar si hay:
   - Migraciones con nombres de tablas en español
   - Seeds que referencien estos nombres
   - Queries hardcodeadas

5. **Documentación API:** Las descriptions en Swagger también están en español y necesitarán actualización

---

## 📋 Checklist Pre-Refactor

- [ ] Clonar/crear branch feature
- [ ] Revisar todas las fases en REFACTOR_ACTION_PLAN.md
- [ ] Backup del código (git branch backup)
- [ ] Ejecutar tests actuales: `npm run test`
- [ ] Estar familiarizado con la estructura de carpetas
- [ ] Tener permisos para hacer push a repositorio
- [ ] Comunicar cambios al equipo (posibles breaking changes)

---

## 🔗 Referencias Rápidas

| Documento | Propósito | Ubicación |
|---|---|---|
| ANALYSIS_NAMING_ISSUES.md | Análisis detallado | `/ANALYSIS_NAMING_ISSUES.md` |
| REFACTOR_ACTION_PLAN.md | Instrucciones paso a paso | `/REFACTOR_ACTION_PLAN.md` |
| refactor-naming.sh | Script automatizado | `/refactor-naming.sh` |

---

## 📞 Si Algo Sale Mal

```bash
# Revertir cambios
git reset --hard HEAD
git checkout main

# O revertir commit específico
git revert <commit-hash>

# Ver log de cambios
git log --oneline -10
```

---

**Generado:** 23 de marzo de 2026  
**Estado:** Listo para ejecutar refactor  
**Próximo paso:** Elegir ejecutar script o seguir plan manual
